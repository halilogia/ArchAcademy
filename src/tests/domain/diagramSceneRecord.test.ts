import { describe, expect, it } from 'vitest';
import type { DiagramSceneRecord } from '../../domain/entities/DiagramScene';
import { validateDiagramSceneRecord } from '../../domain/usecases/DiagramSceneValidator';
import { DIAGRAM_SCENES } from '../../infrastructure/DiagramScenesData';

const clone = (record: DiagramSceneRecord): DiagramSceneRecord =>
  JSON.parse(JSON.stringify(record)) as DiagramSceneRecord;

describe('diagram scene CMS records', () => {
  it('ships every migrated lesson scene', () => {
    expect(DIAGRAM_SCENES.length).toBeGreaterThanOrEqual(35);
  });

  it('keeps every published record referentially valid in both locales', () => {
    for (const record of DIAGRAM_SCENES) {
      expect(validateDiagramSceneRecord(record)).toEqual([]);
    }
  });

  it('publishes identical graph ids for tr and en', () => {
    for (const record of DIAGRAM_SCENES) {
      const tr = record.specs.tr;
      const en = record.specs.en;
      expect(tr.steps.map((step) => step.id)).toEqual(en.steps.map((step) => step.id));
      expect(tr.nodes.map((node) => node.id)).toEqual(en.nodes.map((node) => node.id));
      expect(tr.steps.length).toBeGreaterThanOrEqual(4);
    }
  });

  it('rejects an edge that points at a missing node', () => {
    const broken = clone(DIAGRAM_SCENES[0] as DiagramSceneRecord);
    const edge = broken.specs.tr.edges[0];
    if (!edge) throw new Error('expected at least one edge in the pilot scene');
    edge.to = 'does-not-exist';
    const issues = validateDiagramSceneRecord(broken);
    expect(issues.some((issue) => issue.message.includes('unknown to node'))).toBe(true);
  });

  it('rejects locale drift for step ids', () => {
    const broken = clone(DIAGRAM_SCENES[0] as DiagramSceneRecord);
    broken.specs.en.steps = broken.specs.en.steps.slice(1);
    const issues = validateDiagramSceneRecord(broken);
    expect(issues.some((issue) => issue.message.includes('steps differ'))).toBe(true);
  });
});
