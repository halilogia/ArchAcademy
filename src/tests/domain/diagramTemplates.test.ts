import { describe, expect, it } from 'vitest';
import type { SceneSpec } from '../../domain/diagrams/sceneSpec';
import { buildFanOutScene } from '../../presentation/components/diagrams/templates/builders/fanOut';
import { buildSequenceScene } from '../../presentation/components/diagrams/templates/builders/sequence';
import { buildLayerStackScene } from '../../presentation/components/diagrams/templates/builders/layerStack';
import { buildPipelineScene } from '../../presentation/components/diagrams/templates/builders/pipeline';
import { buildStateMachineScene } from '../../presentation/components/diagrams/templates/builders/stateMachine';

const assertReferentialIntegrity = (spec: SceneSpec) => {
  const nodeIds = new Set(spec.nodes.map((node) => node.id));
  const edgeIds = new Set(spec.edges.map((edge) => edge.id));

  expect(spec.steps.length).toBeGreaterThan(0);
  expect(spec.canvas.w).toBeGreaterThan(0);
  expect(spec.canvas.h).toBeGreaterThan(0);

  for (const edge of spec.edges) {
    expect(nodeIds.has(edge.from)).toBe(true);
    expect(nodeIds.has(edge.to)).toBe(true);
    expect(edge.from).not.toBe(edge.to);
  }

  for (const step of spec.steps) {
    for (const focus of step.focus ?? []) {
      expect(nodeIds.has(focus) || edgeIds.has(focus)).toBe(true);
    }
    for (const event of step.events) {
      if (event.type === 'packet') expect(edgeIds.has(event.edge)).toBe(true);
      if (event.type === 'nodeStatus' || event.type === 'nodeLoad' || event.type === 'nodeBadge') {
        expect(nodeIds.has(event.node)).toBe(true);
      }
    }
  }

  for (const node of spec.nodes) {
    expect(node.at.x).toBeGreaterThanOrEqual(0);
    expect(node.at.x).toBeLessThanOrEqual(spec.canvas.w);
    expect(node.at.y).toBeGreaterThanOrEqual(0);
    expect(node.at.y).toBeLessThanOrEqual(spec.canvas.h);
  }
};

describe('scene templates', () => {
  it('fan-out generates a coherent generated narrative', () => {
    const spec = buildFanOutScene({
      locale: 'en',
      title: 'Load balancing',
      hub: { label: 'Load Balancer' },
      workers: [{ id: 'a', label: 'Server A' }, { id: 'b', label: 'Server B' }],
      client: { label: 'Clients', count: '200,000 users' },
    });
    assertReferentialIntegrity(spec);
    expect(spec.steps.map((step) => step.id)).toContain('failover');
  });

  it('sequence drops self-messages instead of drawing zero-length arrows', () => {
    const spec = buildSequenceScene({
      locale: 'tr',
      title: 'Akış',
      participants: [{ id: 'a', label: 'A' }, { id: 'b', label: 'B' }],
      messages: [
        { from: 'a', to: 'a', label: 'self call' },
        { from: 'a', to: 'b', label: 'call' },
      ],
    });
    assertReferentialIntegrity(spec);
    expect(spec.edges).toHaveLength(1);
  });

  it('layer stack wires dependency arrows between adjacent layers', () => {
    const spec = buildLayerStackScene({
      locale: 'en',
      title: 'Layers',
      layers: [{ id: 'ui', label: 'UI' }, { id: 'domain', label: 'Domain' }],
      steps: [{ title: 'Domain first', body: '…', activeLayer: 'domain' }],
    });
    assertReferentialIntegrity(spec);
    expect(spec.edges[0]?.from).toBe('ui');
    expect(spec.edges[0]?.to).toBe('domain');
  });

  it('pipeline emits only status deltas and keeps stage references valid', () => {
    const spec = buildPipelineScene({
      locale: 'en',
      title: 'Write path',
      stages: [{ id: 'a', label: 'A' }, { id: 'b', label: 'B' }, { id: 'c', label: 'C' }],
      steps: [
        { title: 'A', body: '…', activeStage: 0 },
        { title: 'B fails', body: '…', activeStage: 1, status: 'down' },
        { title: 'C', body: '…', activeStage: 2 },
      ],
    });
    assertReferentialIntegrity(spec);
    expect(spec.steps[0]?.events.filter((event) => event.type === 'nodeStatus')).toHaveLength(0);
    expect(
      spec.steps[1]?.events.filter((event) => event.type === 'nodeStatus' && event.status === 'down'),
    ).toHaveLength(1);
    expect(
      spec.steps[2]?.events.filter((event) => event.type === 'nodeStatus' && event.status === 'ok'),
    ).toHaveLength(1);
  });

  it('state machine resolves transitions by id', () => {
    const spec = buildStateMachineScene({
      locale: 'tr',
      title: 'Yaşam döngüsü',
      states: [{ id: 'idle', label: 'Idle' }, { id: 'open', label: 'Open' }],
      transitions: [{ from: 'idle', to: 'open', label: 'connect' }],
      steps: [{ title: 'Bağlan', body: '…', activeState: 'idle', nextState: 'open' }],
    });
    assertReferentialIntegrity(spec);
    expect(spec.steps[0]?.events.some((event) => event.type === 'packet')).toBe(true);
  });
});
