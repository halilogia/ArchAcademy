import { describe, expect, it } from 'vitest';
import { SandboxDesign } from '../../domain/entities/Sandbox';
import { analyzeTopology } from '../../domain/usecases/TopologyAnalyzer';
import { buildAdrMarkdown, buildAutoContext, buildAutoDecision, buildAutoRisks } from '../../domain/usecases/AdrGenerator';
import { lintAdr } from '../../../scripts/lint_adr.mjs';

const design: SandboxDesign = {
  id: 'design-1',
  name: 'Checkout Platform',
  updatedAt: '2026-09-27T00:00:00.000Z',
  nodes: [
    { id: 'c', kind: 'client', label: 'Client App', x: 0, y: 0, replicas: 1, technology: 'React' },
    { id: 'lb', kind: 'loadBalancer', label: 'Edge LB', x: 0, y: 0, replicas: 2, technology: 'ALB' },
    { id: 'svc', kind: 'service', label: 'Order Service', x: 0, y: 0, replicas: 3, technology: 'Node' },
    { id: 'q', kind: 'queue', label: 'Event Broker', x: 0, y: 0, replicas: 3, technology: 'Kafka' },
    { id: 'db', kind: 'db', label: 'PostgreSQL', x: 0, y: 0, replicas: 1, technology: 'RDS' }
  ],
  edges: [
    { id: 'e1', from: 'c', to: 'lb', protocol: 'HTTPS' },
    { id: 'e2', from: 'lb', to: 'svc', protocol: 'gRPC' },
    { id: 'e3', from: 'svc', to: 'q', protocol: 'AMQP' },
    { id: 'e4', from: 'q', to: 'db', protocol: 'SQL' }
  ]
};

const generate = (overrides: Record<string, unknown> = {}) => {
  const issues = analyzeTopology(design);
  return buildAdrMarkdown({
    id: '0007',
    title: 'Adopt the event-driven checkout topology',
    status: 'accepted',
    date: '2026-09-27',
    deciders: 'Platform Guild',
    context: buildAutoContext(design),
    decisionDrivers: ['p99 latency budget', 'no lost writes'],
    decision: buildAutoDecision(design),
    consideredOptions: ['Modular monolith', 'Event-driven microservices'],
    consequencesPositive: ['Independent scaling of the order service'],
    consequencesNegative: buildAutoRisks(issues, true),
    supersededBy: '',
    design,
    issues,
    ...overrides
  });
};

describe('generated decision records satisfy the MADR linter', () => {
  it('produces a document that passes npm run adr:lint', () => {
    const result = lintAdr(generate(), '0007-adopt-the-event-driven-checkout-topology.md');
    expect(result.errors).toEqual([]);
  });

  it('passes for a sparse record where every field is auto-generated', () => {
    const sparse = buildAdrMarkdown({
      id: '12',
      title: '',
      status: 'proposed',
      date: '2026-09-27',
      deciders: '',
      context: '',
      decisionDrivers: [],
      decision: '',
      consideredOptions: [],
      consequencesPositive: [],
      consequencesNegative: [],
      supersededBy: '',
      design: { name: '', nodes: [], edges: [] },
      issues: []
    });
    const result = lintAdr(sparse, '0012-adr.md');
    expect(result.errors).toEqual([]);
    expect(result.number).toBe('0012');
  });

  it('keeps the placeholder text out of the linter warning list', () => {
    const result = lintAdr(generate(), '0007-adopt-the-event-driven-checkout-topology.md');
    expect(result.warnings.some((warning) => warning.includes('TBD/TODO'))).toBe(false);
  });

  it('warns about a superseded record only when it names no successor', () => {
    const withoutSuccessor = lintAdr(generate({ status: 'superseded' }), '0007-decision.md');
    expect(withoutSuccessor.warnings.some((warning) => warning.includes('Superseded'))).toBe(true);

    const withSuccessor = lintAdr(generate({ status: 'superseded', supersededBy: '0003' }), '0007-decision.md');
    expect(withSuccessor.warnings.some((warning) => warning.includes('Superseded'))).toBe(false);
  });

  it('embeds the topology findings as open risks', () => {
    const markdown = generate();
    expect(markdown).toContain('### Component Inventory');
    expect(markdown).toContain('| Component | Kind | Instances |');
    expect(markdown).toContain('### Redundancy Plan');
    expect(markdown).toContain('### Topology');
  });
});
