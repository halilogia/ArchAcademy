import { describe, expect, it, vi } from 'vitest';
import { CmsEnvelope, CmsCollectionName, SearchEntry } from '../../domain/entities/CmsEntry';
import { CmsContentRepository } from '../../infrastructure/cms/CmsContentRepository';
import { HttpContentClient, createHttpContentClient } from '../../infrastructure/cms/HttpContentClient';

const entry = (id: string): SearchEntry => ({
  id,
  title: id,
  description: '',
  path: `/${id}`,
  category: 'Workshop',
  keywords: [],
  content: ''
});

const ok = (body: unknown) =>
  ({
    ok: true,
    status: 200,
    json: async () => body
  }) as unknown as Response;

const staticJson = (name: CmsCollectionName, items: unknown[], version = 'static') =>
  vi.fn(async (url: string) => {
    if (!url.endsWith(`/${name}.json`)) return { ok: false, status: 404, json: async () => ({}) } as unknown as Response;
    return ok({ collection: name, version, updatedAt: '2026-09-27T00:00:00.000Z', items });
  });

const remoteClient = (handler: (name: CmsCollectionName) => Promise<CmsEnvelope<SearchEntry>>) => {
  const spy = vi.fn((name: CmsCollectionName) => handler(name));
  return {
    client: { fetchCollection: spy as unknown as HttpContentClient['fetchCollection'] },
    spy
  };
};

describe('CmsContentRepository', () => {
  it('resolves a collection from the static JSON seed when no remote CMS is configured', async () => {
    const repository = new CmsContentRepository({
      remote: null,
      staticBaseUrl: '/cms',
      fetchImpl: staticJson('search-index', [entry('one'), entry('two')]) as unknown as typeof fetch
    });

    expect(repository.remoteEnabled).toBe(false);
    const envelope = await repository.getCollection<SearchEntry>('search-index');
    expect(envelope.version).toBe('static');
    expect(envelope.items).toHaveLength(2);
    expect(repository.source).toBe('seed');
  });

  it('caches the collection after the first read', async () => {
    const fetchImpl = staticJson('search-index', [entry('one')]);
    const repository = new CmsContentRepository({
      remote: null,
      staticBaseUrl: '/cms',
      fetchImpl: fetchImpl as unknown as typeof fetch
    });

    expect(repository.peekCollection('search-index')).toBeNull();
    await repository.getCollection('search-index');
    expect(repository.peekCollection('search-index')).not.toBeNull();
    await repository.getCollection('search-index');
    expect(fetchImpl).toHaveBeenCalledTimes(1);
  });

  it('prefers the remote CMS payload and reports the remote source', async () => {
    const { client, spy } = remoteClient(async () => ({
      collection: 'search-index',
      version: '9.9.9',
      updatedAt: '2026-09-27T00:00:00.000Z',
      items: [entry('from-cms')]
    }));

    const repository = new CmsContentRepository({ remote: client });
    const envelope = await repository.getCollection<SearchEntry>('search-index');
    expect(envelope.version).toBe('9.9.9');
    expect(envelope.items).toHaveLength(1);
    expect(repository.source).toBe('remote');
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('falls back to the static seed when the remote CMS fails', async () => {
    const onError = vi.fn();
    const { client } = remoteClient(async () => {
      throw new Error('network down');
    });

    const repository = new CmsContentRepository({
      remote: client,
      staticBaseUrl: '/cms',
      fetchImpl: staticJson('search-index', [entry('fallback'), entry('second')]) as unknown as typeof fetch,
      onError
    });

    const envelope = await repository.getCollection<SearchEntry>('search-index');
    expect(envelope.items).toHaveLength(2);
    expect(repository.source).toBe('seed');
    expect(onError).toHaveBeenCalledWith('search-index', expect.any(Error));
  });

  it('dedupes concurrent reads of the same collection', async () => {
    const { client, spy } = remoteClient(async () => ({
      collection: 'search-index',
      version: '1',
      updatedAt: '',
      items: []
    }));
    const repository = new CmsContentRepository({ remote: client });

    await Promise.all([
      repository.getCollection('search-index'),
      repository.getCollection('search-index'),
      repository.getCollection('search-index')
    ]);
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('rejects a collection neither the remote CMS nor the static seed can serve', async () => {
    const repository = new CmsContentRepository({
      remote: null,
      staticBaseUrl: '/cms',
      fetchImpl: staticJson('search-index', []) as unknown as typeof fetch
    });
    await expect(repository.getCollection('glossary')).rejects.toThrow(/glossary/);
  });

  it('reports a malformed static payload instead of returning it', async () => {
    const onError = vi.fn();
    const fetchImpl = vi.fn(async () => ok({ nonsense: true }));
    const repository = new CmsContentRepository({
      remote: null,
      staticBaseUrl: '/cms',
      fetchImpl: fetchImpl as unknown as typeof fetch,
      onError
    });

    await expect(repository.getCollection('search-index')).rejects.toThrow(/No CMS source/);
    expect(onError).toHaveBeenCalledWith('search-index', expect.any(Error));
  });

  it('re-reads a collection on refresh', async () => {
    const fetchImpl = staticJson('search-index', [entry('first')]);
    const repository = new CmsContentRepository({
      remote: null,
      staticBaseUrl: '/cms',
      fetchImpl: fetchImpl as unknown as typeof fetch
    });

    await repository.getCollection('search-index');
    await repository.refresh('search-index');
    expect(fetchImpl).toHaveBeenCalledTimes(2);
  });
});

describe('createHttpContentClient', () => {
  it('requests the collection endpoint with a bearer token', async () => {
    const fetchImpl = vi.fn(async () => ok({ version: '2', items: [] }));
    const client = createHttpContentClient({
      endpoint: 'https://cms.example.com/api/',
      token: 'secret',
      timeoutMs: 1000,
      fetchImpl: fetchImpl as unknown as typeof fetch
    });
    const envelope = await client.fetchCollection('search-index');
    expect(envelope.collection).toBe('search-index');
    expect(envelope.items).toEqual([]);
    const [url, init] = fetchImpl.mock.calls[0] as unknown as [string, RequestInit];
    expect(url).toBe('https://cms.example.com/api/collections/search-index');
    expect((init.headers as Record<string, string>).Authorization).toBe('Bearer secret');
  });

  it('wraps a bare array payload into an envelope', async () => {
    const fetchImpl = vi.fn(async () => ok([entry('a'), entry('b')]));
    const client = createHttpContentClient({
      endpoint: 'https://cms.example.com',
      token: '',
      timeoutMs: 1000,
      fetchImpl: fetchImpl as unknown as typeof fetch
    });
    const envelope = await client.fetchCollection<SearchEntry>('search-index');
    expect(envelope.items).toHaveLength(2);
    expect(envelope.collection).toBe('search-index');
  });

  it('rejects a malformed payload', async () => {
    const fetchImpl = vi.fn(async () => ok({ nope: true }));
    const client = createHttpContentClient({
      endpoint: 'https://cms.example.com',
      token: '',
      timeoutMs: 1000,
      fetchImpl: fetchImpl as unknown as typeof fetch
    });
    await expect(client.fetchCollection('search-index')).rejects.toThrow(/Malformed CMS payload/);
  });

  it('surfaces a non-ok response', async () => {
    const fetchImpl = vi.fn(
      async () => ({ ok: false, status: 503, json: async () => ({}) }) as unknown as Response
    );
    const client = createHttpContentClient({
      endpoint: 'https://cms.example.com',
      token: '',
      timeoutMs: 1000,
      fetchImpl: fetchImpl as unknown as typeof fetch
    });
    await expect(client.fetchCollection('search-index')).rejects.toThrow(/503/);
  });
});
