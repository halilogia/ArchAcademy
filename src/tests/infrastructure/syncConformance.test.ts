import { afterAll, beforeAll, beforeEach, describe, expect, it } from 'vitest';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { CloudProgressRepository } from '../../infrastructure/repositories/CloudProgressRepository';
import { LocalProgressCache } from '../../infrastructure/repositories/LocalProgressCache';
import { SyncingProgressRepository } from '../../infrastructure/repositories/SyncingProgressRepository';
import { createMemoryStorage } from '../../infrastructure/storage/SafeStorage';
import { createProgressStore, createUserDirectory, hashPassword, parseUserTokens, startProgressServer, verifyPassword } from '../../../server/progressSyncServer.mjs';

const emptyProgress = (at = '2026-01-01T00:00:00.000Z') => ({
  completedSteps: [],
  lastVisited: null,
  quizAttempts: [],
  designs: [],
  updatedAt: at,
  revision: 0
});

const state = (overrides: Record<string, unknown> = {}) => ({ ...emptyProgress(), ...overrides });

let server: Awaited<ReturnType<typeof startProgressServer>>;
let origin: string;

beforeAll(async () => {
  server = await startProgressServer({ port: 0 });
  origin = server.origin;
});

afterAll(async () => {
  await server.close();
});

beforeEach(() => {
  server.store.remove('conformance-learner');
});

const cloudFor = (ownerId = 'conformance-learner', token = '', maxAttempts = 1) =>
  new CloudProgressRepository({
    endpoint: origin,
    token,
    timeoutMs: 2000,
    ownerId,
    maxAttempts
  });

describe('sync server health', () => {
  it('reports readiness', async () => {
    const response = await fetch(`${origin}/health`);
    expect(response.status).toBe(200);
    const body = await response.json();
    expect(body.status).toBe('ok');
    expect(body.authMode).toBe('open');
  });

  it('rejects unknown routes', async () => {
    expect((await fetch(`${origin}/nope`)).status).toBe(404);
  });
});

describe('rate limiting', () => {
  it('answers 429 once the client budget is exhausted and sets Retry-After', async () => {
    const limited = await startProgressServer({ port: 0, rateLimit: { windowMs: 60_000, max: 3 } });
    try {
      const statuses: number[] = [];
      for (let attempt = 0; attempt < 5; attempt += 1) {
        const response = await fetch(`${limited.origin}/progress/rate-limited-learner`);
        statuses.push(response.status);
        if (response.status === 429) {
          expect(response.headers.get('Retry-After')).toBeTruthy();
          expect(response.headers.get('X-RateLimit-Remaining')).toBe('0');
        }
      }
      expect(statuses.filter((status) => status === 429).length).toBeGreaterThan(0);
      expect(statuses[0]).toBe(404);
    } finally {
      await limited.close();
    }
  });
});

describe('per-user authentication', () => {
  it('parses owner scoped tokens', () => {
    expect(parseUserTokens('alice:token-a, bob:token-b, *:wildcard')).toEqual([
      { ownerId: 'alice', token: 'token-a' },
      { ownerId: 'bob', token: 'token-b' },
      { ownerId: '*', token: 'wildcard' }
    ]);
  });

  it('ignores an empty configuration', () => {
    expect(parseUserTokens('')).toEqual([]);
    expect(parseUserTokens(undefined)).toEqual([]);
  });

  it('lets a user read their own document and refuses another users', async () => {
    const secured = await startProgressServer({
      port: 0,
      userTokens: parseUserTokens('alice:token-alice,bob:token-bob')
    });
    try {
      const forAlice = new CloudProgressRepository({
        endpoint: secured.origin,
        token: 'token-alice',
        ownerId: 'alice',
        timeoutMs: 2000,
        maxAttempts: 1
      });
      const forBob = new CloudProgressRepository({
        endpoint: secured.origin,
        token: 'token-bob',
        ownerId: 'bob',
        timeoutMs: 2000,
        maxAttempts: 1
      });
      const anonymous = new CloudProgressRepository({
        endpoint: secured.origin,
        token: '',
        ownerId: 'alice',
        timeoutMs: 2000,
        maxAttempts: 1
      });

      await forAlice.push(state({ completedSteps: ['/alice'] }));
      expect((await forAlice.pull())?.completedSteps).toEqual(['/alice']);
      expect((await forBob.pull())?.completedSteps).toBeUndefined();
      await expect(anonymous.push(state())).rejects.toThrow(/401/);
    } finally {
      await secured.close();
    }
  });
});

describe('durable append-only store', () => {
  it('survives a restart by replaying the log', async () => {    const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), 'arch-sync-'));

    const first = await startProgressServer({ port: 0, dataDir });
    try {
      const cloud = new CloudProgressRepository({
        endpoint: first.origin,
        token: '',
        ownerId: 'durable-learner',
        timeoutMs: 2000,
        maxAttempts: 1
      });
      await cloud.push(state({ completedSteps: ['/durable'], lastVisited: '/durable' }));
    } finally {
      await first.close();
    }

    const second = await startProgressServer({ port: 0, dataDir });
    try {
      const cloud = new CloudProgressRepository({
        endpoint: second.origin,
        token: '',
        ownerId: 'durable-learner',
        timeoutMs: 2000,
        maxAttempts: 1
      });
      expect((await cloud.pull())?.completedSteps).toEqual(['/durable']);
    } finally {
      await second.close();
      fs.rmSync(dataDir, { recursive: true, force: true });
    }
  });

  it('compacts the log into a snapshot and can replay the snapshot alone', () => {
    const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), 'arch-sync-'));
    const store = createProgressStore({ dataDir, backend: 'file' });

    store.set('owner', { ownerId: 'owner', revision: 1, syncedAt: 'now', progress: state({ completedSteps: ['/x'] }) });
    store.compact?.();

    expect(fs.existsSync(path.join(dataDir, 'progress.snapshot.json'))).toBe(true);
    expect(fs.readFileSync(path.join(dataDir, 'progress.log'), 'utf8').trim()).toBe('');

    const reopened = createProgressStore({ dataDir, backend: 'file' });
    expect(reopened.get('owner')?.progress.completedSteps).toEqual(['/x']);
    fs.rmSync(dataDir, { recursive: true, force: true });
  });

  it('skips a torn trailing line instead of failing to boot', () => {
    const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), 'arch-sync-'));
    fs.mkdirSync(dataDir, { recursive: true });
    fs.writeFileSync(
      path.join(dataDir, 'progress.log'),
      `${JSON.stringify({ ownerId: 'good', envelope: { ownerId: 'good', revision: 1, syncedAt: 'now', progress: state() } })}\n{"ownerId":"torn","envel`,
      'utf8'
    );

    const store = createProgressStore({ dataDir, backend: 'file' });
    expect(store.get('good')).not.toBeNull();
    expect(store.get('torn')).toBeNull();
    fs.rmSync(dataDir, { recursive: true, force: true });
  });
});

describe('CloudProgressRepository against the reference server', () => {
  it('treats an unknown owner as an empty remote', async () => {
    expect(await cloudFor().pull()).toBeNull();
  });

  it('round-trips a document through pull after push', async () => {
    const cloud = cloudFor();
    const pushed = await cloud.push(state({ completedSteps: ['/sandbox'], lastVisited: '/sandbox' }));
    expect(pushed.completedSteps).toEqual(['/sandbox']);

    const pulled = await cloud.pull();
    expect(pulled?.completedSteps).toEqual(['/sandbox']);
    expect(pulled?.lastVisited).toBe('/sandbox');
  });

  it('preserves quiz attempts and sandbox designs', async () => {
    const document = state({
      quizAttempts: [{ quizId: 'architect-challenge', correct: 2, total: 3, score: 80, rank: 'senior', at: '2026-01-02T00:00:00.000Z' }],
      designs: [{ id: 'design-1', name: 'Checkout', nodes: [], edges: [], updatedAt: '2026-01-02T00:00:00.000Z' }]
    });
    const pulled = await cloudFor().push(document).then(() => cloudFor().pull());
    expect(pulled?.quizAttempts).toHaveLength(1);
    expect(pulled?.quizAttempts[0].score).toBe(80);
    expect(pulled?.designs[0].name).toBe('Checkout');
  });

  it('returns the authoritative copy including the stored revision', async () => {
    const pushed = await cloudFor().push({ ...state(), revision: 7 });
    expect(pushed.revision).toBe(7);
  });

  it('scopes documents per owner id', async () => {
    await cloudFor('conformance-learner').push(state({ completedSteps: ['/a'] }));
    await cloudFor('someone-else').push(state({ completedSteps: ['/b'] }));

    expect((await cloudFor('conformance-learner').pull())?.completedSteps).toEqual(['/a']);
    expect((await cloudFor('someone-else').pull())?.completedSteps).toEqual(['/b']);
  });

  it('refuses a stale write and hands back the stored document', async () => {
    const cloud = cloudFor();
    await cloud.push({ ...state(), revision: 5 });
    const conflict = await cloud.push({ ...state({ completedSteps: ['/stale'] }), revision: 2 });
    expect(conflict.revision).toBe(5);
    expect(conflict.completedSteps).toEqual([]);
  });

  it('rejects a malformed envelope', async () => {
    const response = await fetch(`${origin}/progress/conformance-learner`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nope: true })
    });
    expect(response.status).toBe(422);
  });

  it('enforces a bearer token when the server is configured with one', async () => {
    const secured = await startProgressServer({ port: 0, token: 'secret-token' });
    try {
      const unauthorized = new CloudProgressRepository({
        endpoint: secured.origin,
        token: '',
        ownerId: 'secured-learner',
        timeoutMs: 2000,
        maxAttempts: 1
      });
      await expect(unauthorized.push(state())).rejects.toThrow(/401/);

      const authorized = new CloudProgressRepository({
        endpoint: secured.origin,
        token: 'secret-token',
        ownerId: 'secured-learner',
        timeoutMs: 2000,
        maxAttempts: 1
      });
      await expect(authorized.push(state({ completedSteps: ['/ok'] }))).resolves.toBeTruthy();
    } finally {
      await secured.close();
    }
  });
});

describe('SyncingProgressRepository against the reference server', () => {
  const build = (storage = createMemoryStorage()) =>
    new SyncingProgressRepository(new LocalProgressCache(storage), cloudFor(), 'conformance-learner');

  it('starts empty when neither cache nor server has data', async () => {
    expect(await build().load()).toBeNull();
  });

  it('persists locally and remotely on save', async () => {
    const storage = createMemoryStorage();
    const repository = build(storage);
    await repository.save(state({ completedSteps: ['/adr-generator'] }));

    expect(new LocalProgressCache(storage).read()?.completedSteps).toEqual(['/adr-generator']);
    expect((await cloudFor().pull())?.completedSteps).toEqual(['/adr-generator']);
  });

  it('merges a divergent cache with the server copy on load', async () => {
    const storage = createMemoryStorage();
    new LocalProgressCache(storage).write(state({ completedSteps: ['/cached'] }), 'conformance-learner');
    await cloudFor().push(state({ completedSteps: ['/remote'], updatedAt: '2026-02-01T00:00:00.000Z' }));

    const merged = await build(storage).load();
    expect([...(merged?.completedSteps ?? [])].sort()).toEqual(['/cached', '/remote']);
  });

  it('keeps the best quiz score across two devices', async () => {
    const storage = createMemoryStorage();
    new LocalProgressCache(storage).write(
      state({
        quizAttempts: [{ quizId: 'architect-challenge', correct: 1, total: 3, score: 40, rank: 'specialist', at: '2026-01-01T00:00:00.000Z' }]
      }),
      'conformance-learner'
    );
    await cloudFor().push(
      state({
        quizAttempts: [{ quizId: 'architect-challenge', correct: 3, total: 3, score: 95, rank: 'principal', at: '2026-01-05T00:00:00.000Z' }]
      })
    );

    const merged = await build(storage).load();
    expect(merged?.quizAttempts[0].score).toBe(95);
  });

  it('survives a server outage by still writing the cache', async () => {
    const storage = createMemoryStorage();
    const unreachable = new SyncingProgressRepository(
      new LocalProgressCache(storage),
      new CloudProgressRepository({
        endpoint: 'http://127.0.0.1:1',
        token: '',
        ownerId: 'conformance-learner',
        timeoutMs: 300,
        maxAttempts: 1
      }),
      'conformance-learner'
    );

    await expect(unreachable.save(state({ completedSteps: ['/offline'] }))).rejects.toThrow();
    expect(new LocalProgressCache(storage).read()?.completedSteps).toEqual(['/offline']);
  });
});

describe('progress store behaviour', () => {
  it('rejects a lower revision without overwriting', () => {
    const store = createProgressStore();
    store.set('owner', { ownerId: 'owner', revision: 4, syncedAt: 'now', progress: state({ completedSteps: ['/keep'] }) });
    const result = store.set('owner', { ownerId: 'owner', revision: 2, syncedAt: 'now', progress: state({ completedSteps: ['/drop'] }) });
    expect(result.conflict).toBe(true);
    expect(store.get('owner')?.progress.completedSteps).toEqual(['/keep']);
  });

  it('accepts an equal revision as a normal write', () => {
    const store = createProgressStore();
    store.set('owner', { ownerId: 'owner', revision: 4, syncedAt: 'now', progress: state() });
    const result = store.set('owner', { ownerId: 'owner', revision: 4, syncedAt: 'now', progress: state({ lastVisited: '/x' }) });
    expect(result.conflict).toBe(false);
    expect(store.get('owner')?.progress.lastVisited).toBe('/x');
  });
});
describe('durable store backends', () => {
  const envelope = (completedSteps: string[]) => ({
    ownerId: 'learner',
    revision: 1,
    syncedAt: 'now',
    progress: state({ completedSteps })
  });

  it('reports which backend it selected', () => {
    const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), 'arch-store-'));
    const sqlite = createProgressStore({ dataDir });
    const file = createProgressStore({ dataDir, backend: 'file' });
    const memory = createProgressStore({ dataDir: null });

    expect(['sqlite', 'append-log']).toContain(sqlite.backend);
    expect(file.backend).toBe('append-log');
    expect(memory.backend).toBe('memory');

    sqlite.close();
    file.close();
    fs.rmSync(dataDir, { recursive: true, force: true });
  });

  it('round-trips through whichever backend is active', () => {
    const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), 'arch-store-'));
    const store = createProgressStore({ dataDir });
    store.set('learner', envelope(['/sandbox']));
    expect(store.get('learner')?.progress.completedSteps).toEqual(['/sandbox']);
    store.close();
    fs.rmSync(dataDir, { recursive: true, force: true });
  });
});

describe('account authentication', () => {
  const credentials = () => ({ ownerId: 'alice', password: 'correct horse battery' });

  it('hashes with scrypt and never stores the password', () => {
    const stored = hashPassword('correct horse battery');
    expect(stored).not.toContain('correct horse battery');
    expect(stored.split(':')).toHaveLength(3);
    expect(verifyPassword('correct horse battery', stored)).toBe(true);
    expect(verifyPassword('wrong password', stored)).toBe(false);
  });

  it('salts so two identical passwords hash differently', () => {
    expect(hashPassword('same password')).not.toBe(hashPassword('same password'));
  });

  it('rejects a malformed stored hash', () => {
    expect(verifyPassword('anything', 'not-a-hash')).toBe(false);
    expect(verifyPassword('anything', undefined as unknown as string)).toBe(false);
  });

  it('registers, logs in and resolves a session to its owner', () => {
    const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), 'arch-users-'));
    const directory = createUserDirectory({ dataDir });

    const registered = directory.register(credentials().ownerId, credentials().password);
    expect(registered.ok).toBe(true);
    expect(directory.register('alice', 'another password').ok).toBe(false);

    expect(directory.login('alice', 'wrong password').ok).toBe(false);
    const login = directory.login('alice', credentials().password);
    expect(login.ok).toBe(true);

    expect(directory.resolve(`Bearer ${login.token}`)?.ownerId).toBe('alice');
    expect(directory.resolve('Bearer not-a-real-token')).toBeNull();
    expect(directory.resolve(undefined)).toBeNull();

    directory.revoke('alice');
    expect(directory.resolve(`Bearer ${login.token}`)).toBeNull();
    fs.rmSync(dataDir, { recursive: true, force: true });
  });

  it('scopes a session to its own document and refuses another', async () => {
    const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), 'arch-users-'));
    const server = await startProgressServer({ port: 0, dataDir });
    try {
      const register = await fetch(`${server.origin}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials())
      });
      expect(register.status).toBe(201);
      const { token } = await register.json();

      const own = new CloudProgressRepository({
        endpoint: server.origin,
        token,
        ownerId: 'alice',
        timeoutMs: 2000,
        maxAttempts: 1
      });
      const other = new CloudProgressRepository({
        endpoint: server.origin,
        token,
        ownerId: 'bob',
        timeoutMs: 2000,
        maxAttempts: 1
      });

      await own.push(state({ completedSteps: ['/alice'] }));
      expect((await own.pull())?.completedSteps).toEqual(['/alice']);
      await expect(other.pull()).rejects.toThrow(/403/);
    } finally {
      await server.close();
      fs.rmSync(dataDir, { recursive: true, force: true });
    }
  });

  it('refuses a short password and a duplicate account at the endpoint', async () => {
    const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), 'arch-users-'));
    const server = await startProgressServer({ port: 0, dataDir });
    try {
      const post = (body: unknown) =>
        fetch(`${server.origin}/auth/register`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body)
        });

      expect((await post({ ownerId: 'x', password: 'short' })).status).toBe(422);
      expect((await post({ ownerId: 'x', password: 'long enough password' })).status).toBe(201);
      expect((await post({ ownerId: 'x', password: 'long enough password' })).status).toBe(409);

      const badLogin = await fetch(`${server.origin}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ownerId: 'x', password: 'wrong' })
      });
      expect(badLogin.status).toBe(401);
    } finally {
      await server.close();
      fs.rmSync(dataDir, { recursive: true, force: true });
    }
  });

  it('reports the active auth mode in health', async () => {
    const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), 'arch-users-'));
    const server = await startProgressServer({ port: 0, dataDir });
    try {
      const body = await (await fetch(`${server.origin}/health`)).json();
      expect(body.authMode).toBe('account');
      expect(body.backend).toBeDefined();
    } finally {
      await server.close();
      fs.rmSync(dataDir, { recursive: true, force: true });
    }
  });
});
