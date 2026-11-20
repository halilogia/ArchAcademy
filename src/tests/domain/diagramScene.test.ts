import { describe, expect, it } from 'vitest';
import { describeStepChanges, resolveSceneState } from '../../domain/diagrams/sceneState';
import type { SceneSpec } from '../../domain/diagrams/sceneSpec';

const spec: SceneSpec = {
  id: 'test',
  canvas: { w: 960, h: 540 },
  nodes: [
    { id: 'hub', label: 'Load Balancer', kind: 'hub', at: { x: 300, y: 300 } },
    { id: 'a', label: 'Server A', kind: 'service', at: { x: 600, y: 180 } },
    { id: 'b', label: 'Server B', kind: 'service', at: { x: 600, y: 400 } },
  ],
  edges: [
    { id: 'hub-a', from: 'hub', to: 'a' },
    { id: 'hub-b', from: 'hub', to: 'b' },
  ],
  steps: [
    {
      id: 'hot-spot',
      title: 'Hot spot',
      body: 'All traffic lands on one server.',
      focus: ['hub', 'a'],
      events: [
        { type: 'packet', edge: 'hub-a' },
        { type: 'nodeLoad', node: 'a', load: 120 },
        { type: 'nodeStatus', node: 'a', status: 'warn' },
      ],
    },
    {
      id: 'failover',
      title: 'Failover',
      body: 'Server A dies and traffic moves to B.',
      focus: ['hub', 'b'],
      events: [
        { type: 'nodeStatus', node: 'a', status: 'down' },
        { type: 'nodeLoad', node: 'b', load: 62 },
        { type: 'packet', edge: 'hub-b', label: 'retry' },
        { type: 'metric', id: 'servers', value: '2 / 3' },
      ],
    },
  ],
  metrics: [{ id: 'servers', label: 'Healthy servers', value: '3 / 3' }],
};

describe('resolveSceneState', () => {
  it('folds cumulative node state and clamps load into 0..100', () => {
    const state = resolveSceneState(spec, 0);
    expect(state.loads.a).toBe(100);
    expect(state.statuses.a).toBe('warn');
    expect(state.metrics.servers).toBe('3 / 3');
  });

  it('carries earlier node state into later steps', () => {
    const state = resolveSceneState(spec, 1);
    expect(state.statuses.a).toBe('down');
    expect(state.loads.b).toBe(62);
    expect(state.metrics.servers).toBe('2 / 3');
  });

  it('keeps focus and packets scoped to the current step', () => {
    const state = resolveSceneState(spec, 1);
    expect([...state.focus].sort()).toEqual(['b', 'hub']);
    expect(state.packets).toHaveLength(1);
    expect(state.packets[0]?.edge).toBe('hub-b');
  });

  it('clamps out-of-range indexes', () => {
    expect(resolveSceneState(spec, -5).stepIndex).toBe(0);
    expect(resolveSceneState(spec, 99).stepIndex).toBe(1);
    expect(resolveSceneState(spec, Number.NaN).stepIndex).toBe(0);
  });
});

describe('describeStepChanges', () => {
  it('resolves node labels for badges and statuses', () => {
    const lines = describeStepChanges(spec, spec.steps[1]);
    expect(lines).toContain('Server A: down');
    expect(lines).toContain('Load Balancer → Server B: retry');
    expect(lines).toContain('servers: 2 / 3');
  });

  it('returns an empty list for a missing step', () => {
    expect(describeStepChanges(spec, undefined)).toEqual([]);
  });
});
