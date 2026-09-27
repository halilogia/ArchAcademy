import { describe, expect, it } from 'vitest';
import { SandboxDesign } from '../../domain/entities/Sandbox';
import { buildAdrMarkdown, buildAutoDecision, buildMermaidFlowchart } from '../../domain/usecases/AdrGenerator';
import { TopologyIssue } from '../../domain/usecases/TopologyAnalyzer';

const design: SandboxDesign = {
  id: 'design-1',
  name: 'Checkout Platform',
  updatedAt: '2026-09-27T00:00:00.000Z',
  nodes: [
    { id: 'c', kind: 'client', label: 'Client App', x: 0, y: 0, replicas: 1, technology: 'React' },
    { id: 'lb', kind: 'loadBalancer', label: 'Edge LB', x: 0, y: 0, replicas: 2, technology: 'ALB' },
    { id: 'svc', kind: 'service', label: 'Order Service', x: 0, y: 0, replicas: 3, technology: 'Node' },
    { id: 'db', kind: 'db', label: 'PostgreSQL', x: 0, y: 0, replicas: 2, technology: 'RDS' }
  ],
  edges: [
    { id: 'e1', from: 'c', to: 'lb', protocol: 'HTTPS' },
    { id: 'e2', from: 'lb', to: 'svc', protocol: 'gRPC' },
    { id: 'e3', from: 'svc', to: 'db', protocol: 'SQL' }
  ]
};

const issue: TopologyIssue = {
  id: 'single-replica',
  severity: 'critical',
  title: { tr: 'Tek kopya', en: 'Single replica' },
  detail: { tr: 'Tek kopya çalışıyor.', en: 'Running a single replica.' },
  nodeIds: ['db']
};

const input = {
  id: '0007',
  title: 'Adopt an event-driven checkout topology',
  status: 'accepted' as const,
  date: '2026-09-27',
  deciders: 'Platform Guild',
  context: 'Checkout traffic spikes 10x on Black Friday.',
  decisionDrivers: ['p99 latency budget', 'no lost writes'],
  decision: 'Run the order service behind an edge load balancer with a replicated PostgreSQL primary-secondary pair.',
  consideredOptions: ['Modular monolith', 'Event-driven microservices'],
  consequencesPositive: ['Independent scaling of the order service'],
  consequencesNegative: ['Running a single replica.'],
  supersededBy: '0003',
  design,
  issues: [issue]
};

describe('buildMermaidFlowchart', () => {
  it('declares one node per component and one link per edge', () => {
    const chart = buildMermaidFlowchart(design);
    expect(chart.startsWith('flowchart LR')).toBe(true);
    expect(chart).toContain('-->|HTTPS|');
    expect(chart).toContain('-->|gRPC|');
    expect(chart).toContain('classDef service');
    expect(chart.match(/=>/g) ?? []).toHaveLength(0);
  });

  it('renders the database with a cylinder shape and replica suffix', () => {
    const chart = buildMermaidFlowchart(design);
    expect(chart).toContain('("PostgreSQL x2")');
  });

  it('handles an empty design without throwing', () => {
    expect(buildMermaidFlowchart({ nodes: [], edges: [] })).toContain('No components placed yet');
  });
});

describe('buildAdrMarkdown', () => {
  const document = buildAdrMarkdown(input);

  it('emits a zero padded numbered title', () => {
    expect(document.startsWith('# 0007. Adopt an event-driven checkout topology')).toBe(true);
  });

  it('includes the MADR header metadata', () => {
    expect(document).toContain('- **Status:** Accepted');
    expect(document).toContain('- **Date:** 2026-09-27');
    expect(document).toContain('- **Deciders:** Platform Guild');
  });

  it('renders every MADR section in order', () => {
    const order = [
      '\n## Context\n',
      '\n## Decision Drivers\n',
      '\n## Considered Options\n',
      '\n## Decision\n',
      '\n### Component Inventory\n',
      '\n### Redundancy Plan\n',
      '\n### Topology\n',
      '\n## Consequences\n',
      '\n## Review Triggers\n'
    ];
    const positions = order.map((heading) => document.indexOf(heading));
    expect(positions.every((position) => position >= 0)).toBe(true);
    expect([...positions].sort((a, b) => a - b)).toEqual(positions);
  });

  it('supersedes the referenced record', () => {
    expect(document).toContain('## Supersedes\n\n0003');
  });

  it('lists the component inventory with instance counts', () => {
    expect(document).toContain('| Microservice | service | 1 |');
    expect(document).toContain('| Relational Database | db | 1 |');
  });

  it('embeds the topology as a mermaid code block', () => {
    expect(document).toContain('```mermaid\nflowchart LR');
  });

  it('embeds open architectural risks with severity', () => {
    expect(document).toContain('| critical | Single replica | Running a single replica. |');
  });

  it('falls back to placeholders when optional sections are empty', () => {
    const sparse = buildAdrMarkdown({
      ...input,
      id: '12',
      title: '',
      context: '',
      decision: '',
      decisionDrivers: [],
      consideredOptions: [],
      consequencesPositive: [],
      consequencesNegative: [],
      deciders: '',
      supersededBy: '',
      issues: []
    });
    expect(sparse.startsWith('# 0012. Untitled Decision')).toBe(true);
    expect(sparse).toContain('_Describe the forces at play._');
    expect(sparse).toContain('_Add at least one driver._');
    expect(sparse).toContain('- _None recorded._');
    expect(sparse).not.toContain('## Supersedes');
    expect(sparse).not.toContain('Open Architectural Risks');
  });
});

describe('buildAutoDecision', () => {
  it('describes the layers and the interaction model', () => {
    const decision = buildAutoDecision(design);
    expect(decision).toContain('Checkout Platform');
    expect(decision).toContain('edge, application, data');
    expect(decision).toContain('- Edge LB → Order Service (gRPC)');
  });

  it('degrades gracefully for an empty design', () => {
    expect(buildAutoDecision({ name: 'Empty', nodes: [], edges: [] })).toContain('System Design Sandbox');
  });
});
