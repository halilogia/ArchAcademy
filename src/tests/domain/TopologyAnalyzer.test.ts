import { describe, expect, it } from 'vitest';
import { SANDBOX_KIND_INDEX, SandboxDesign } from '../../domain/entities/Sandbox';
import { analyzeTopology, inventoryRows, topologyScore } from '../../domain/usecases/TopologyAnalyzer';

const node = (id: string, kind: SandboxDesign['nodes'][number]['kind'], replicas = 2) => ({
  id,
  kind,
  label: id,
  x: 0,
  y: 0,
  replicas,
  technology: ''
});

const edge = (from: string, to: string) => ({ id: `${from}-${to}`, from, to, protocol: 'HTTPS' });

const idsOf = (issues: ReturnType<typeof analyzeTopology>, id: string): string[] =>
  issues.find((issue) => issue.id === id)?.nodeIds ?? [];

describe('analyzeTopology', () => {
  it('guides the learner when the canvas is empty', () => {
    const issues = analyzeTopology({ nodes: [], edges: [] });
    expect(issues).toHaveLength(1);
    expect(issues[0].id).toBe('empty-canvas');
    expect(issues[0].nodeIds).toEqual([]);
  });

  it('flags multiple services without a load balancer', () => {
    const issues = analyzeTopology({
      nodes: [node('c', 'client'), node('a', 'service'), node('b', 'service')],
      edges: [edge('c', 'a'), edge('c', 'b')]
    });
    expect(idsOf(issues, 'missing-load-balancer')).toEqual(['a', 'b']);
  });

  it('stays quiet when a load balancer fronts the services', () => {
    const issues = analyzeTopology({
      nodes: [node('c', 'client'), node('lb', 'loadBalancer'), node('a', 'service'), node('b', 'service')],
      edges: [edge('c', 'lb'), edge('lb', 'a'), edge('lb', 'b')]
    });
    expect(idsOf(issues, 'missing-load-balancer')).toEqual([]);
  });

  it('flags single replica critical components', () => {
    const issues = analyzeTopology({
      nodes: [node('lb', 'loadBalancer'), node('db', 'db', 1)],
      edges: [edge('lb', 'db')]
    });
    expect(idsOf(issues, 'single-replica')).toEqual(['db']);
  });

  it('flags a database reachable straight from a client', () => {
    const issues = analyzeTopology({
      nodes: [node('c', 'client'), node('db', 'db')],
      edges: [edge('c', 'db')]
    });
    expect(issues.find((issue) => issue.id === 'database-exposed')?.severity).toBe('critical');
    expect(idsOf(issues, 'database-exposed')).toEqual(['db']);
  });

  it('flags a queue that nothing consumes', () => {
    const issues = analyzeTopology({
      nodes: [node('q', 'queue')],
      edges: []
    });
    expect(idsOf(issues, 'queue-without-consumer')).toEqual(['q']);
  });

  it('detects request cycles', () => {
    const issues = analyzeTopology({
      nodes: [node('a', 'service'), node('b', 'service'), node('db', 'db')],
      edges: [edge('a', 'b'), edge('b', 'a'), edge('b', 'db')]
    });
    const cycle = issues.find((issue) => issue.id === 'cyclic-dependency');
    expect(cycle?.severity).toBe('critical');
    expect(cycle?.nodeIds.length).toBeGreaterThanOrEqual(2);
  });

  it('flags a design with no persistence', () => {
    const issues = analyzeTopology({
      nodes: [node('c', 'client')],
      edges: []
    });
    expect(issues.some((issue) => issue.id === 'no-persistence')).toBe(true);
  });

  it('suggests a cache when services read from a database', () => {
    const issues = analyzeTopology({
      nodes: [node('lb', 'loadBalancer'), node('a', 'service'), node('db', 'db')],
      edges: [edge('lb', 'a'), edge('a', 'db')]
    });
    expect(idsOf(issues, 'missing-cache')).toEqual(['db']);
  });
});

describe('topologyScore', () => {
  it('returns 100 for a clean design', () => {
    const design: SandboxDesign = {
      id: 'd',
      name: 'Clean',
      updatedAt: '2026-01-01T00:00:00.000Z',
      nodes: [
        node('c', 'client'),
        node('lb', 'loadBalancer'),
        node('a', 'service'),
        node('cache', 'cache'),
        node('db', 'db')
      ],
      edges: [edge('c', 'lb'), edge('lb', 'a'), edge('a', 'cache'), edge('a', 'db')]
    };
    const issues = analyzeTopology(design);
    expect(topologyScore(issues)).toBe(100);
  });

  it('penalizes critical findings harder than warnings', () => {
    expect(topologyScore([])).toBe(100);
    expect(
      topologyScore([
        { id: 'a', severity: 'warning', title: { tr: '', en: '' }, detail: { tr: '', en: '' }, nodeIds: [] },
        { id: 'b', severity: 'warning', title: { tr: '', en: '' }, detail: { tr: '', en: '' }, nodeIds: [] }
      ])
    ).toBe(84);
    expect(
      topologyScore([
        { id: 'a', severity: 'critical', title: { tr: '', en: '' }, detail: { tr: '', en: '' }, nodeIds: [] }
      ])
    ).toBe(80);
  });
});

describe('inventoryRows', () => {
  it('groups components by kind', () => {
    const rows = inventoryRows({ nodes: [node('a', 'db'), node('b', 'db'), node('c', 'cache')] });
    expect(rows).toHaveLength(2);
    expect(rows.find((row) => row.kind === 'db')?.count).toBe(2);
    expect(rows.find((row) => row.kind === 'db')?.label).toBe(SANDBOX_KIND_INDEX.db.name.en);
  });
});
