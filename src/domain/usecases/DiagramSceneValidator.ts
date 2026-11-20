import type { DiagramSceneRecord } from '../entities/DiagramScene';
import type { SceneSpec } from '../diagrams/sceneSpec';

export interface DiagramSceneIssue {
  path: string;
  message: string;
}

const ids = <T extends { id: string }>(items: T[]): string[] => items.map((item) => item.id);

const duplicates = (values: string[]): string[] => {
  const seen = new Set<string>();
  const repeated = new Set<string>();
  for (const value of values) {
    if (seen.has(value)) repeated.add(value);
    seen.add(value);
  }
  return [...repeated];
};

const sameSet = (left: string[], right: string[]): boolean => {
  if (left.length !== right.length) return false;
  const sortedLeft = [...left].sort();
  const sortedRight = [...right].sort();
  return sortedLeft.every((value, index) => value === sortedRight[index]);
};

/** Referential and locale-parity checks for one published scene. */
export const validateDiagramSceneSpec = (spec: SceneSpec, locale: string): DiagramSceneIssue[] => {
  const issues: DiagramSceneIssue[] = [];
  const path = (suffix: string) => `${locale}.${suffix}`;

  if (spec.canvas.w <= 0 || spec.canvas.h <= 0) {
    issues.push({ path: path('canvas'), message: 'canvas must have positive width and height' });
  }
  if (spec.nodes.length === 0) {
    issues.push({ path: path('nodes'), message: 'scene needs at least one node' });
  }
  if (spec.steps.length === 0) {
    issues.push({ path: path('steps'), message: 'scene needs at least one step' });
  }

  const nodeIds = ids(spec.nodes);
  const edgeIds = ids(spec.edges);
  const stepIds = ids(spec.steps);

  duplicates(nodeIds).forEach((id) =>
    issues.push({ path: path('nodes'), message: `duplicate node id "${id}"` }),
  );
  duplicates(edgeIds).forEach((id) =>
    issues.push({ path: path('edges'), message: `duplicate edge id "${id}"` }),
  );
  duplicates(stepIds).forEach((id) =>
    issues.push({ path: path('steps'), message: `duplicate step id "${id}"` }),
  );

  const nodeSet = new Set(nodeIds);
  const edgeSet = new Set(edgeIds);

  spec.edges.forEach((edge) => {
    if (!nodeSet.has(edge.from)) {
      issues.push({ path: path(`edges.${edge.id}`), message: `unknown from node "${edge.from}"` });
    }
    if (!nodeSet.has(edge.to)) {
      issues.push({ path: path(`edges.${edge.id}`), message: `unknown to node "${edge.to}"` });
    }
  });

  spec.steps.forEach((step) => {
    for (const focus of step.focus ?? []) {
      if (!nodeSet.has(focus) && !edgeSet.has(focus)) {
        issues.push({ path: path(`steps.${step.id}.focus`), message: `unknown focus id "${focus}"` });
      }
    }
    for (const event of step.events) {
      if (event.type === 'packet' && !edgeSet.has(event.edge)) {
        issues.push({ path: path(`steps.${step.id}.events`), message: `unknown edge "${event.edge}"` });
      }
      if (
        (event.type === 'nodeStatus' || event.type === 'nodeLoad' || event.type === 'nodeBadge') &&
        !nodeSet.has(event.node)
      ) {
        issues.push({ path: path(`steps.${step.id}.events`), message: `unknown node "${event.node}"` });
      }
    }
  });

  (spec.metrics ?? []).forEach((metric) => {
    if (!metric.id) issues.push({ path: path('metrics'), message: 'metric id must not be empty' });
  });

  return issues;
};

/** A record is publishable only when both locales resolve the same graph. */
export const validateDiagramSceneRecord = (record: DiagramSceneRecord): DiagramSceneIssue[] => {
  const issues: DiagramSceneIssue[] = [];

  if (!record.id) issues.push({ path: 'id', message: 'id must not be empty' });
  if (!record.template) issues.push({ path: 'template', message: 'template must not be empty' });

  const tr = record.specs?.tr;
  const en = record.specs?.en;

  if (!tr) issues.push({ path: 'specs.tr', message: 'missing Turkish spec' });
  if (!en) issues.push({ path: 'specs.en', message: 'missing English spec' });
  if (!tr || !en) return issues;

  issues.push(...validateDiagramSceneSpec(tr, 'tr'), ...validateDiagramSceneSpec(en, 'en'));

  const pairs: [string, string[], string[]][] = [
    ['nodes', ids(tr.nodes), ids(en.nodes)],
    ['edges', ids(tr.edges), ids(en.edges)],
    ['steps', ids(tr.steps), ids(en.steps)],
    ['metrics', ids(tr.metrics ?? []), ids(en.metrics ?? [])],
  ];

  for (const [name, left, right] of pairs) {
    if (!sameSet(left, right)) {
      issues.push({ path: 'locales', message: `${name} differ between tr and en` });
    }
  }

  return issues;
};
