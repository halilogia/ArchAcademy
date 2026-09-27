import { beforeEach, describe, expect, it, vi } from 'vitest';
import { ProgressState, emptyProgress } from '../../domain/entities/Progress';
import { CloudProgressRepository } from '../../infrastructure/repositories/CloudProgressRepository';
import { LocalProgressCache } from '../../infrastructure/repositories/LocalProgressCache';
import { SyncingProgressRepository } from '../../infrastructure/repositories/SyncingProgressRepository';
import { KeyValueStorage, createMemoryStorage } from '../../infrastructure/storage/SafeStorage';

let storage: KeyValueStorage;

beforeEach(() => {
  storage = createMemoryStorage();
});

const ok = (body: unknown) =>
  ({
    ok: true,
    status: 200,
    json: async () => body
  }) as unknown as Response;

const notFound = () => ({ ok: false, status: 404, json: async () => ({}) }) as unknown as Response;

const state = (overrides: Partial<ProgressState> = {}): ProgressState => ({
  ...emptyProgress('2026-01-01T00:00:00.000Z'),
  ...overrides
});

const createCloud = (fetchImpl: ReturnType<typeof vi.fn>, now = () => 0) =>
  new CloudProgressRepository({
    endpoint: 'https://sync.example.com/api',
    token: 'token',
    timeoutMs: 500,
    ownerId: 'learner-1',
    maxAttempts: 2,
    fetchImpl: fetchImpl as unknown as typeof fetch,
    now
  });

describe('LocalProgressCache', () => {
  it('returns null when nothing is cached', () => {
    expect(new LocalProgressCache(storage).read()).toBeNull();
  });

  it('round-trips a written envelope', () => {
    const cache = new LocalProgressCache(storage);
    cache.write(state({ completedSteps: ['/sandbox'] }), 'learner-1');
    expect(cache.read()?.completedSteps).toEqual(['/sandbox']);
  });

  it('adopts and clears the legacy localStorage progress key', () => {
    const cache = new LocalProgressCache(storage);
    storage.set('arch_progress', JSON.stringify({ completedSteps: ['/clean-arch'], lastVisited: '/ddd', quizResult: { score: 70, rank: 'senior' } }));
    const legacy = cache.readLegacy();
    expect(legacy?.completedSteps).toEqual(['/clean-arch']);
    expect(legacy?.quizAttempts).toEqual([]);
    cache.clearLegacy();
    expect(cache.readLegacy()).toBeNull();
  });

  it('ignores corrupted cache payloads', () => {
    storage.set('arch-progress-cache-v2', '{not json');
    expect(new LocalProgressCache(storage).read()).toBeNull();
  });
});

describe('CloudProgressRepository', () => {
  it('pulls the remote document from the owner scoped url', async () => {
    const fetchImpl = vi.fn(async () => ok({ progress: state({ completedSteps: ['/remote'] }) }));
    const cloud = createCloud(fetchImpl);
    const pulled = await cloud.pull();
    expect(pulled?.completedSteps).toEqual(['/remote']);
    const [url, init] = fetchImpl.mock.calls[0] as unknown as [string, RequestInit];
    expect(url).toBe('https://sync.example.com/api/progress/learner-1');
    expect(init.method).toBe('GET');
    expect((init.headers as Record<string, string>).Authorization).toBe('Bearer token');
  });

  it('treats a 404 as an empty remote', async () => {
    const cloud = createCloud(vi.fn(async () => notFound()));
    expect(await cloud.pull()).toBeNull();
  });

  it('pushes the envelope and returns the authoritative copy', async () => {
    const authoritative = state({ completedSteps: ['/remote', '/sandbox'] });
    const fetchImpl = vi.fn(async () => ok({ progress: authoritative }));
    const cloud = createCloud(fetchImpl);
    const pushed = await cloud.push(state({ completedSteps: ['/sandbox'] }));
    expect(pushed.completedSteps).toEqual(['/remote', '/sandbox']);
    const [, init] = fetchImpl.mock.calls[0] as unknown as [string, RequestInit];
    expect(init.method).toBe('PUT');
    expect(JSON.parse(init.body as string).ownerId).toBe('learner-1');
  });

  it('returns the pushed state when the server responds without a body', async () => {
    const fetchImpl = vi.fn(async () => ok(undefined));
    const local = state({ completedSteps: ['/a'] });
    expect(await createCloud(fetchImpl).push(local)).toBe(local);
  });

  it('retries on server errors and then gives up', async () => {
    const fetchImpl = vi.fn(async () => ({ ok: false, status: 500, json: async () => ({}) }) as unknown as Response);
    await expect(createCloud(fetchImpl).pull()).rejects.toThrow(/500/);
    expect(fetchImpl).toHaveBeenCalledTimes(2);
  });
});

describe('SyncingProgressRepository', () => {
  it('reports remote and cache capabilities', () => {
    const repository = new SyncingProgressRepository(new LocalProgressCache(storage), null, 'learner-1');
    expect(repository.remoteEnabled).toBe(false);
    expect(repository.cacheEnabled).toBe(true);
  });

  it('works cache only when there is no cloud', async () => {
    const cache = new LocalProgressCache(storage);
    const repository = new SyncingProgressRepository(cache, null, 'learner-1');
    expect(await repository.load()).toBeNull();
    const saved = await repository.save(state({ completedSteps: ['/sandbox'] }));
    expect(saved.completedSteps).toEqual(['/sandbox']);
    expect((await repository.load())?.completedSteps).toEqual(['/sandbox']);
  });

  it('migrates the legacy key on first load', async () => {
    storage.set('arch_progress', JSON.stringify({ completedSteps: ['/clean-arch'], lastVisited: null }));
    const repository = new SyncingProgressRepository(new LocalProgressCache(storage), null, 'learner-1');
    const loaded = await repository.load();
    expect(loaded?.completedSteps).toEqual(['/clean-arch']);
    expect(storage.get('arch_progress')).toBeNull();
  });

  it('merges the cloud copy with the cached copy on load', async () => {
    new LocalProgressCache(storage).write(state({ completedSteps: ['/local'], updatedAt: '2026-01-01T00:00:00.000Z' }), 'learner-1');
    const cloud = createCloud(vi.fn(async () => ok({ progress: state({ completedSteps: ['/remote'], updatedAt: '2026-01-02T00:00:00.000Z' }) })));
    const repository = new SyncingProgressRepository(new LocalProgressCache(storage), cloud, 'learner-1');
    const loaded = await repository.load();
    expect([...(loaded?.completedSteps ?? [])].sort()).toEqual(['/local', '/remote']);
  });

  it('seeds the cache from the cloud when the cache is empty', async () => {
    const cloud = createCloud(vi.fn(async () => ok({ progress: state({ completedSteps: ['/remote'] }) })));
    const repository = new SyncingProgressRepository(new LocalProgressCache(storage), cloud, 'learner-1');
    expect((await repository.load())?.completedSteps).toEqual(['/remote']);
    expect(new LocalProgressCache(storage).read()?.completedSteps).toEqual(['/remote']);
  });

  it('keeps serving the cache when the cloud pull fails', async () => {
    new LocalProgressCache(storage).write(state({ completedSteps: ['/local'] }), 'learner-1');
    const cloud = createCloud(vi.fn(async () => {
      throw new Error('offline');
    }));
    const repository = new SyncingProgressRepository(new LocalProgressCache(storage), cloud, 'learner-1');
    expect((await repository.load())?.completedSteps).toEqual(['/local']);
  });

  it('writes through the cache before pushing to the cloud', async () => {
    const seen: string[] = [];
    const cloud = createCloud(vi.fn(async () => {
      seen.push(new LocalProgressCache(storage).read()?.completedSteps.join(',') ?? 'none');
      return ok({ progress: state({ completedSteps: ['/sandbox'] }) });
    }));
    const repository = new SyncingProgressRepository(new LocalProgressCache(storage), cloud, 'learner-1');
    const saved = await repository.save(state({ completedSteps: ['/sandbox'] }));
    expect(seen).toEqual(['/sandbox']);
    expect(saved.completedSteps).toEqual(['/sandbox']);
  });
});
