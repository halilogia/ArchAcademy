import { SANDBOX_KIND_INDEX, SandboxDesign } from '../entities/Sandbox';
import { TopologyIssue, inventoryRows, topologyScore } from './TopologyAnalyzer';

export type AdrStatus = 'proposed' | 'accepted' | 'deprecated' | 'superseded';

export interface AdrInput {
  id: string;
  title: string;
  status: AdrStatus;
  date: string;
  deciders: string;
  context: string;
  decisionDrivers: string[];
  decision: string;
  consideredOptions: string[];
  consequencesPositive: string[];
  consequencesNegative: string[];
  supersededBy: string;
  design: Pick<SandboxDesign, 'name' | 'nodes' | 'edges'>;
  issues: TopologyIssue[];
}

export const ADR_STATUS_LABELS: Record<AdrStatus, string> = {
  proposed: 'Proposed',
  accepted: 'Accepted',
  deprecated: 'Deprecated',
  superseded: 'Superseded by'
};

const sanitizeId = (value: string): string => {
  const digits = value.match(/\d+/g);
  if (digits && digits.length > 0) return digits[digits.length - 1].padStart(4, '0');
  return '0001';
};

const bulletList = (items: string[]): string =>
  items.filter((item) => item.trim().length > 0).map((item) => `- ${item.trim()}`).join('\n');

const mermaidShape = (kind: string): string => {
  switch (kind) {
    case 'client':
      return '[/"label"/]';
    case 'db':
    case 'objectStore':
    case 'search':
    case 'cache':
      return '[("label")]';
    case 'queue':
      return '>"label"]';
    default:
      return '["label"]';
  }
};

export const buildMermaidFlowchart = (design: Pick<SandboxDesign, 'nodes' | 'edges'>): string => {
  if (design.nodes.length === 0) return 'flowchart LR\n  empty["No components placed yet"]';

  const aliases = new Map<string, string>();
  design.nodes.forEach((node, index) => aliases.set(node.id, `n${index}`));

  const declarations = design.nodes.map((node) => {
    const alias = aliases.get(node.id) as string;
    const replicas = node.replicas > 1 ? ` x${node.replicas}` : '';
    const shape = mermaidShape(node.kind).replace('label', `${node.label}${replicas}`);
    return `  ${alias}${shape}`;
  });

  const links = design.edges
    .map((edge) => {
      const from = aliases.get(edge.from);
      const to = aliases.get(edge.to);
      if (!from || !to) return null;
      return `  ${from} -->|${edge.protocol || 'sync'}| ${to}`;
    })
    .filter((line): line is string => line !== null);

  const kinds = [...new Set(design.nodes.map((node) => node.kind))];
  const classDefs = kinds.map((kind) => {
    const color = SANDBOX_KIND_INDEX[kind]?.color ?? '#64748b';
    return `  classDef ${kind} fill:${color}22,stroke:${color},color:#e2e8f0;`;
  });
  const classAssignments = kinds.map((kind) => {
    const members = design.nodes
      .filter((node) => node.kind === kind)
      .map((node) => aliases.get(node.id))
      .filter((alias): alias is string => alias !== undefined);
    return `  class ${members.join(',')} ${kind};`;
  });

  return ['flowchart LR', ...declarations, ...links, ...classDefs, ...classAssignments].join('\n');
};

export const buildAdrMarkdown = (input: AdrInput): string => {
  const sections: string[] = [];
  const number = sanitizeId(input.id);

  sections.push(`# ${number}. ${input.title.trim() || 'Untitled Decision'}`);
  sections.push(
    [
      `- **Status:** ${ADR_STATUS_LABELS[input.status]}`,
      `- **Date:** ${input.date}`,
      `- **Deciders:** ${input.deciders.trim() || 'Architecture Team'}`
    ].join('\n')
  );

  if (input.supersededBy.trim()) {
    sections.push(`## Supersedes\n\n${input.supersededBy.trim()}`);
  }

  sections.push(`## Context\n\n${input.context.trim() || '_Describe the forces at play._'}`);

  sections.push(`## Decision Drivers\n\n${bulletList(input.decisionDrivers) || '- _Add at least one driver._'}`);

  sections.push(`## Considered Options\n\n${bulletList(input.consideredOptions) || '- _No alternatives recorded._'}`);

  sections.push(`## Decision\n\n${input.decision.trim() || '_Describe the chosen option._'}`);

  const inventory = inventoryRows(input.design);
  if (inventory.length > 0) {
    const rows = inventory
      .map((row) => `| ${row.label} | ${row.kind} | ${row.count} |`)
      .join('\n');
    sections.push(
      `### Component Inventory\n\n| Component | Kind | Instances |\n| --- | --- | --- |\n${rows}`
    );
  }

  const replicas = input.design.nodes.filter((node) => node.replicas > 1);
  if (replicas.length > 0) {
    const rows = replicas
      .map((node) => `- **${node.label}:** ${node.replicas} replicas${node.technology ? ` (${node.technology})` : ''}`)
      .join('\n');
    sections.push(`### Redundancy Plan\n\n${rows}`);
  }

  sections.push(
    `### Topology\n\n\`\`\`mermaid\n${buildMermaidFlowchart(input.design)}\n\`\`\``
  );

  sections.push(
    `## Consequences\n\n### Positive\n\n${bulletList(input.consequencesPositive) || '- _None recorded._'}\n\n### Negative\n\n${bulletList(input.consequencesNegative) || '- _None recorded._'}`
  );

  if (input.issues.length > 0) {
    const rows = input.issues
      .map((issue) => `| ${issue.severity} | ${issue.title.en} | ${issue.detail.en} |`)
      .join('\n');
    sections.push(
      `### Open Architectural Risks (topology review: ${topologyScore(input.issues)}/100)\n\n| Severity | Finding | Detail |\n| --- | --- | --- |\n${rows}`
    );
  }

  sections.push(
    '## Review Triggers\n\n- Production latency or error budget breach\n- A driver listed above changes or is removed\n- A topology finding above stays unresolved after two sprints'
  );

  return `${sections.join('\n\n')}\n`;
};

export const buildAutoContext = (design: Pick<SandboxDesign, 'name' | 'nodes' | 'edges'>): string =>
  `The team needs a documented topology for "${design.name || 'Untitled System'}". ` +
  `The current canvas models ${design.nodes.length} component(s) connected by ${design.edges.length} interaction(s). ` +
  'This record captures the decision, the drivers behind it and the consequences the team accepts.';

export const buildAutoDecision = (design: Pick<SandboxDesign, 'name' | 'nodes' | 'edges'>): string => {
  if (design.nodes.length === 0) {
    return 'We will adopt the topology modeled on the System Design Sandbox canvas.';
  }
  const layers = [...new Set(design.nodes.map((node) => SANDBOX_KIND_INDEX[node.kind]?.layer).filter(Boolean))];
  const flow = design.edges
    .map((edge) => {
      const from = design.nodes.find((node) => node.id === edge.from);
      const to = design.nodes.find((node) => node.id === edge.to);
      return from && to ? `${from.label} → ${to.label} (${edge.protocol || 'sync'})` : null;
    })
    .filter((entry): entry is string => entry !== null);

  return [
    `We will run "${design.name || 'Untitled System'}" across the following layers: ${layers.join(', ')}.`,
    '',
    'Interaction model:',
    ...flow.map((entry) => `- ${entry}`)
  ].join('\n');
};

export const buildAutoRisks = (issues: TopologyIssue[], isEn: boolean): string[] =>
  issues
    .filter((issue) => issue.severity !== 'info')
    .map((issue) => (isEn ? issue.detail.en : issue.detail.tr));
