import { afterAll, beforeAll, beforeEach, describe, expect, it } from 'vitest';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { startCmsServer } from '../../../server/cmsServer.mjs';
import { createHttpContentClient } from '../../infrastructure/cms/HttpContentClient';

let server: Awaited<ReturnType<typeof startCmsServer>>;
let dataDir: string;
let origin: string;

const seedDir = path.resolve(process.cwd(), 'public', 'cms');

const put = async (name: string, body: unknown, token = '') =>
  fetch(`${origin}/collections/${name}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {})
    },
    body: JSON.stringify(body)
  });

beforeAll(async () => {
  dataDir = fs.mkdtempSync(path.join(os.tmpdir(), 'arch-cms-'));
  server = await startCmsServer({ port: 0, dataDir, seedDir });
  origin = server.origin;
});

afterAll(async () => {
  await server.close();
  fs.rmSync(dataDir, { recursive: true, force: true });
});

beforeEach(async () => {
  for (const name of ['acronym-categories', 'glossary']) {
    await fetch(`${origin}/collections/${name}/reset`, { method: 'POST' });
  }
});

describe('reference CMS read path', () => {
  it('reports health and writability', async () => {
    const response = await fetch(`${origin}/health`);
    const body = await response.json();
    expect(body.status).toBe('ok');
    expect(body.writable).toBe(true);
  });

  it('lists every registered collection', async () => {
    const body = await (await fetch(`${origin}/collections`)).json();
    const names = body.collections.map((entry: { collection: string }) => entry.collection);
    expect(names).toContain('glossary');
    expect(names).toContain('search-index');
  });

  it('serves the exported seed when there is no override', async () => {
    const body = await (await fetch(`${origin}/collections/glossary`)).json();
    expect(body.items.length).toBeGreaterThanOrEqual(500);
  });

  it('rejects an unknown collection and names the valid ones', async () => {
    const response = await fetch(`${origin}/collections/nope`);
    expect(response.status).toBe(404);
    const body = await response.json();
    expect(body.collections).toContain('glossary');
  });

  it('is consumable by the app HttpContentClient as-is', async () => {
    const client = createHttpContentClient({ endpoint: origin, token: '', timeoutMs: 2000 });
    const envelope = await client.fetchCollection('acronym-categories');
    expect(envelope.collection).toBe('acronym-categories');
    expect(envelope.items.length).toBeGreaterThan(0);
  });
});

describe('reference CMS write path', () => {
  const envelopeFor = (items: unknown[]) => ({
    collection: 'acronym-categories',
    version: '1.0.0',
    updatedAt: '2026-01-01T00:00:00.000Z',
    items
  });

  it('accepts a valid collection and serves the override', async () => {
    const items = [{ id: 'qa', title: { tr: 'Kalite', en: 'Quality' }, icon: 'X', color: '#fff', desc: { tr: 'd', en: 'd' } }];
    const response = await put('acronym-categories', envelopeFor(items));
    expect(response.status).toBe(200);

    const stored = await (await fetch(`${origin}/collections/acronym-categories`)).json();
    expect(stored.items).toHaveLength(1);
    expect(stored.items[0].id).toBe('qa');
  });

  it('rejects a missing required key with the offending path', async () => {
    const response = await put('acronym-categories', envelopeFor([{ id: 'qa' }]));
    expect(response.status).toBe(422);
    const body = await response.json();
    expect(body.error).toBe('validation_failed');
    expect(body.errors.some((issue: { path: string }) => issue.path === 'items[0].title')).toBe(true);
  });

  it('rejects duplicate unique identifiers', async () => {
    const item = { id: 'dup', title: { tr: 'a', en: 'a' }, icon: 'X', color: '#fff', desc: { tr: 'a', en: 'a' } };
    const response = await put('acronym-categories', envelopeFor([item, item]));
    expect(response.status).toBe(422);
    expect((await response.json()).errors.some((issue: { message: string }) => issue.message.includes('duplicate'))).toBe(true);
  });

  it('rejects an envelope that declares a different collection', async () => {
    const response = await put('acronym-categories', { ...envelopeFor([]), collection: 'glossary' });
    expect(response.status).toBe(422);
  });

  it('rejects malformed json', async () => {
    const response = await fetch(`${origin}/collections/acronym-categories`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: '{not json'
    });
    expect(response.status).toBe(400);
  });

  it('reports warnings without blocking the write', async () => {
    const items = [{ id: 'qa', title: 'not localized', icon: 'X', color: '#fff', desc: { tr: 'a', en: 'a' } }];
    const response = await put('acronym-categories', envelopeFor(items));
    expect(response.status).toBe(200);
    const body = await response.json();
    expect(body.warnings.some((issue: { path: string }) => issue.path === 'items[0].title')).toBe(true);
  });

  it('resets a collection back to the seed', async () => {
    await put('acronym-categories', envelopeFor([{ id: 'qa', title: { tr: 'a', en: 'a' }, icon: 'X', color: '#fff', desc: { tr: 'a', en: 'a' } }]));
    const reset = await fetch(`${origin}/collections/acronym-categories/reset`, { method: 'POST' });
    expect(reset.status).toBe(200);

    const restored = await (await fetch(`${origin}/collections/acronym-categories`)).json();
    expect(restored.items.length).toBeGreaterThan(1);
  });

  it('survives a restart with the override in place', async () => {
    await put('glossary', {
      collection: 'glossary',
      version: '1.0.0',
      updatedAt: '2026-01-01T00:00:00.000Z',
      items: [{ id: 1, term: 'Durable', definition: 'Persisted across restarts', category: 'Ops', guruTip: 'Write it down' }]
    });

    const restarted = await startCmsServer({ port: 0, dataDir, seedDir });
    try {
      const body = await (await fetch(`${restarted.origin}/collections/glossary`)).json();
      expect(body.items).toHaveLength(1);
      expect(body.items[0].term).toBe('Durable');
    } finally {
      await restarted.close();
    }
  });
});

describe('reference CMS authentication', () => {
  it('rejects unauthenticated writes when a token is configured', async () => {
    const secured = await startCmsServer({ port: 0, token: 'cms-secret', dataDir, seedDir });
    try {
      const unauthorized = await fetch(`${secured.origin}/collections/acronym-categories`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ collection: 'acronym-categories', version: '1', updatedAt: '', items: [] })
      });
      expect(unauthorized.status).toBe(401);
    } finally {
      await secured.close();
    }
  });
});
