import { afterAll, beforeAll, beforeEach, describe, expect, it } from 'vitest';
import { CloudProgressRepository } from '../../infrastructure/repositories/CloudProgressRepository';
import { LocalProgressCache } from '../../infrastructure/repositories/LocalProgressCache';
import { SyncingProgressRepository } from '../../infrastructure/repositories/SyncingProgressRepository';
import { createMemoryStorage } from '../../infrastructure/storage/SafeStorage';
import { createProgressStore, startProgressServer } from '../../../server/progressSyncServer.mjs';

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
  });

  it('rejects unknown routes', async () => {
    expect((await fetch(`${origin}/nope`)).status).toBe(404);
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
