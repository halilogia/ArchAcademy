import { describe, expect, it } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { CmsEnvelope, CmsCollectionName } from '../../domain/entities/CmsEntry';

const cmsDir = path.resolve(process.cwd(), 'public', 'cms');

const COLLECTIONS: CmsCollectionName[] = [
  'acronyms',
  'acronym-categories',
  'glossary',
  'comparison-matrix',
  'comparison-matrix-cards',
  'architecture-questions',
  'architectures'
];

const read = (name: CmsCollectionName): CmsEnvelope<unknown> => {
  const file = path.join(cmsDir, `${name}.json`);
  return JSON.parse(fs.readFileSync(file, 'utf8')) as CmsEnvelope<unknown>;
};

describe('exported CMS collections', () => {
  it.each(COLLECTIONS)('%s.json exists and is a valid envelope', (name) => {
    const envelope = read(name);
    expect(envelope.collection).toBe(name);
    expect(typeof envelope.version).toBe('string');
    expect(Array.isArray(envelope.items)).toBe(true);
    expect(envelope.items.length).toBeGreaterThan(0);
  });

  it('ships the full glossary', () => {
    expect(read('glossary').items.length).toBeGreaterThanOrEqual(500);
  });

  it('ships every acronym category referenced by the acronym items', () => {
    const categories = read('acronym-categories').items as { id: string }[];
    const ids = new Set(categories.map((category) => category.id));
    const items = read('acronyms').items as { category: string }[];
    items.forEach((item) => {
      expect(ids.has(item.category)).toBe(true);
    });
  });

  it('exposes each architecture profile under its own key', () => {
    const profiles = read('architectures').items as { key: string; title: string; pros: string[] }[];
    expect(profiles.length).toBeGreaterThan(0);
    profiles.forEach((profile) => {
      expect(typeof profile.key).toBe('string');
      expect(typeof profile.title).toBe('string');
      expect(Array.isArray(profile.pros)).toBe(true);
    });
  });

  it('keeps architecture question ids unique', () => {
    const questions = read('architecture-questions').items as { id: string }[];
    const ids = questions.map((question) => question.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('matches the data modules (run "npm run cms:export" after editing them)', () => {
    expect(() => {
      execFileSync(process.execPath, ['scripts/export_cms_collections.mjs', 'check'], {
        cwd: process.cwd(),
        stdio: 'pipe'
      });
    }).not.toThrow();
  });
});
