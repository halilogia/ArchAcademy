import React from 'react';
import { afterEach, describe, expect, it } from 'vitest';
import { fireEvent, render, screen, cleanup } from '@testing-library/react';
import { SandboxCanvas } from '../../presentation/components/sandbox/SandboxCanvas';
import { SandboxPalette } from '../../presentation/components/sandbox/SandboxPalette';
import { SandboxInspector } from '../../presentation/components/sandbox/SandboxInspector';
import { TopologyIssueList } from '../../presentation/components/sandbox/TopologyIssueList';
import { AdrGeneratorPanel } from '../../presentation/components/adr/AdrGeneratorPanel';
import { SANDBOX_CATALOG, SandboxDesign } from '../../domain/entities/Sandbox';
import { analyzeTopology } from '../../domain/usecases/TopologyAnalyzer';
import { useSandboxStore } from '../../infrastructure/stores/sandboxStore';

const initial = useSandboxStore.getState();

afterEach(() => {
  cleanup();
  useSandboxStore.setState({
    designId: initial.designId,
    name: initial.name,
    nodes: initial.nodes,
    edges: initial.edges,
    selectedNodeId: null,
    linkingFromId: null,
    past: [],
    future: []
  });
});

const emptyDesign: SandboxDesign = { id: 'd', name: 'Empty', nodes: [], edges: [], updatedAt: '' };

describe('SandboxCanvas', () => {
  it('renders the seeded topology', () => {
    render(<SandboxCanvas isEn />);
    const { nodes } = useSandboxStore.getState();
    expect(nodes.length).toBeGreaterThan(0);
    nodes.forEach((node) => {
      expect(screen.getByLabelText(node.label)).toBeInTheDocument();
    });
  });

  it('renders one removable connection control per edge', () => {
    render(<SandboxCanvas isEn />);
    const { edges } = useSandboxStore.getState();
    expect(screen.getAllByLabelText(/^Remove connection/)).toHaveLength(edges.length);
  });

  it('deletes a connection when its protocol label is clicked', () => {
    render(<SandboxCanvas isEn />);
    const before = useSandboxStore.getState().edges.length;
    fireEvent.click(screen.getAllByLabelText(/^Remove connection/)[0]);
    expect(useSandboxStore.getState().edges).toHaveLength(before - 1);
  });

  it('connects two nodes on double click then click', () => {
    render(<SandboxCanvas isEn />);
    const { nodes, edges } = useSandboxStore.getState();
    const first = nodes[0];
    const second = nodes[4];
    const alreadyConnected = edges.some((edge) => edge.from === first.id && edge.to === second.id);
    expect(alreadyConnected).toBe(false);

    fireEvent.doubleClick(screen.getByLabelText(first.label));
    expect(useSandboxStore.getState().linkingFromId).toBe(first.id);

    fireEvent.pointerDown(screen.getByLabelText(second.label), { button: 0 });
    expect(useSandboxStore.getState().edges).toHaveLength(edges.length + 1);
  });

  it('does not duplicate an existing connection', () => {
    render(<SandboxCanvas isEn />);
    const { nodes, edges } = useSandboxStore.getState();
    const [first, second] = nodes;

    fireEvent.doubleClick(screen.getByLabelText(first.label));
    fireEvent.pointerDown(screen.getByLabelText(second.label), { button: 0 });

    expect(useSandboxStore.getState().edges).toHaveLength(edges.length);
  });

  it('prompts the learner when the canvas is empty', () => {
    useSandboxStore.getState().clear();
    render(<SandboxCanvas isEn />);
    expect(screen.getByText(/Drag a component here to start modeling/)).toBeInTheDocument();
  });
});

describe('SandboxPalette', () => {
  it('adds a component to the canvas when a card is clicked', () => {
    render(<SandboxPalette catalog={SANDBOX_CATALOG} isEn />);
    const before = useSandboxStore.getState().nodes.length;
    fireEvent.click(screen.getByText('Load Balancer'));
    expect(useSandboxStore.getState().nodes).toHaveLength(before + 1);
  });

  it('lists every catalog component', () => {
    render(<SandboxPalette catalog={SANDBOX_CATALOG} isEn />);
    SANDBOX_CATALOG.forEach((entry) => {
      expect(screen.getByTitle(entry.role.en)).toBeInTheDocument();
    });
  });
});

describe('SandboxInspector', () => {
  it('edits the selected component', () => {
    render(<SandboxInspector isEn />);
    useSandboxStore.getState().select(useSandboxStore.getState().nodes[0].id);
    render(<SandboxInspector isEn />);

    const input = screen.getByLabelText('Name') as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'Edge Gateway' } });
    expect(useSandboxStore.getState().nodes[0].label).toBe('Edge Gateway');
  });

  it('lists the current connections', () => {
    render(<SandboxInspector isEn />);
    expect(screen.getByText(/^Connections \(\d+\)$/)).toBeInTheDocument();
  });
});

describe('TopologyIssueList', () => {
  it('reports a clean design', () => {
    const design: SandboxDesign = {
      id: 'd',
      name: 'Clean',
      updatedAt: '',
      nodes: [
        { id: 'c', kind: 'client', label: 'Client', x: 0, y: 0, replicas: 1, technology: '' },
        { id: 'lb', kind: 'loadBalancer', label: 'LB', x: 0, y: 0, replicas: 2, technology: '' },
        { id: 'a', kind: 'service', label: 'API', x: 0, y: 0, replicas: 3, technology: '' },
        { id: 'cache', kind: 'cache', label: 'Redis', x: 0, y: 0, replicas: 2, technology: '' },
        { id: 'db', kind: 'db', label: 'PG', x: 0, y: 0, replicas: 2, technology: '' }
      ],
      edges: [
        { id: '1', from: 'c', to: 'lb', protocol: 'HTTPS' },
        { id: '2', from: 'lb', to: 'a', protocol: 'HTTPS' },
        { id: '3', from: 'a', to: 'cache', protocol: 'RESP' },
        { id: '4', from: 'a', to: 'db', protocol: 'SQL' }
      ]
    };
    render(<TopologyIssueList issues={analyzeTopology(design)} isEn />);
    expect(screen.getByText('No architectural findings. The topology is clean.')).toBeInTheDocument();
    expect(screen.getByText('100')).toBeInTheDocument();
  });

  it('surfaces findings with localized copy', () => {
    render(<TopologyIssueList issues={analyzeTopology({ nodes: [], edges: [] })} isEn={false} />);
    expect(screen.getByText('Tuval boş')).toBeInTheDocument();
    expect(screen.getByText('Bilgi')).toBeInTheDocument();
  });
});

describe('AdrGeneratorPanel', () => {
  it('generates a MADR document pre-filled from the topology', () => {
    render(<AdrGeneratorPanel design={emptyDesign} issues={[]} isEn />);
    const preview = screen.getByTestId('adr-markdown-preview');
    expect(preview.textContent).toContain('## Context');
    expect(preview.textContent).toContain('## Decision Drivers');
    expect(preview.textContent).toContain('## Considered Options');
    expect(preview.textContent).toContain('## Decision');
    expect(preview.textContent).toContain('## Consequences');
    expect(preview.textContent).toContain('## Review Triggers');
  });

  it('reflects the design in the generated document', () => {
    const design: SandboxDesign = {
      id: 'd',
      name: 'Orders',
      updatedAt: '',
      nodes: [
        { id: 'c', kind: 'client', label: 'Web', x: 0, y: 0, replicas: 1, technology: '' },
        { id: 'db', kind: 'db', label: 'Postgres', x: 0, y: 0, replicas: 2, technology: 'RDS' }
      ],
      edges: [{ id: '1', from: 'c', to: 'db', protocol: 'HTTPS' }]
    };
    render(<AdrGeneratorPanel design={design} issues={analyzeTopology(design)} isEn />);
    const preview = screen.getByTestId('adr-markdown-preview');
    expect(preview.textContent).toContain('# 0001. Orders Architecture');
    expect(preview.textContent).toContain('| Relational Database | db | 1 |');
    expect(preview.textContent).toContain('```mermaid');
    expect(preview.textContent).toContain('Open Architectural Risks');
  });

  it('accepts manual edits to the decision drivers', () => {
    render(<AdrGeneratorPanel design={emptyDesign} issues={[]} isEn />);
    fireEvent.change(screen.getByLabelText('Decision Drivers (one per line)'), {
      target: { value: 'p99 under 200ms' }
    });
    expect(screen.getByTestId('adr-markdown-preview').textContent).toContain('- p99 under 200ms');
  });
});
