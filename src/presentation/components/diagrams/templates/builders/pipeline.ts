import type {
  SceneIcon,
  SceneMetric,
  SceneSpec,
  SceneStatus,
  SceneStep,
  SceneTone,
} from '../../../../../domain/diagrams/sceneSpec';
import type { SceneLocale } from '../labels';

export interface PipelineStage {
  id: string;
  label: string;
  sublabel?: string;
  icon?: SceneIcon;
  tone?: SceneTone;
}

export interface PipelineStepConfig {
  title: string;
  body: string;
  tag?: string;
  /** Zero-based index of the stage that owns this step. */
  activeStage: number;
  status?: SceneStatus;
  durationMs?: number;
}

export interface PipelineSceneConfig {
  locale: SceneLocale;
  id?: string;
  title: string;
  subtitle?: string;
  stages: PipelineStage[];
  steps: PipelineStepConfig[];
  metrics?: SceneMetric[];
  /** Optional side path, e.g. a dead-letter queue or rollback route. */
  branch?: { from: string; to: string; label: string; tone?: SceneTone };
}

const NODE_W = 152;
const NODE_H = 96;
const GAP = 44;

/** Left-to-right stage flow (CI/CD, event sourcing, ingestion, request path). */
export function buildPipelineScene(config: PipelineSceneConfig): SceneSpec {
  const stages: PipelineStage[] =
    config.stages.length > 0 ? config.stages.slice(0, 6) : [{ id: 'stage-1', label: 'Stage' }];
  const twoRows = stages.length > 4;
  const perRow = twoRows ? Math.ceil(stages.length / 2) : stages.length;
  const width = 960;
  const height = twoRows ? 430 : 340;
  const rowWidth = perRow * NODE_W + (perRow - 1) * GAP;
  const startX = (width - rowWidth) / 2;
  const rowY = twoRows ? [140, 310] : [170];

  const positionOf = (index: number) => {
    if (!twoRows) {
      return { x: startX + NODE_W / 2 + index * (NODE_W + GAP), y: rowY[0] ?? 170 };
    }
    const row = Math.floor(index / perRow);
    const column = index % perRow;
    // Snake layout: the second row runs right-to-left so the flow turns down.
    const visualColumn = row === 0 ? column : perRow - 1 - column;
    return {
      x: startX + NODE_W / 2 + visualColumn * (NODE_W + GAP),
      y: rowY[row] ?? 170,
    };
  };

  const nodes: SceneSpec['nodes'] = stages.map((stage, index) => ({
    id: stage.id,
    label: stage.label,
    sublabel: stage.sublabel,
    kind: 'service',
    icon: stage.icon,
    tone: stage.tone,
    status: 'ok',
    at: positionOf(index),
    size: { w: NODE_W, h: NODE_H },
  }));

  const edges: SceneSpec['edges'] = [
    ...stages.slice(1).map((stage, index) => ({
      id: `pipe-edge-${index + 1}`,
      from: stages[index]?.id ?? stage.id,
      to: stage.id,
      tone: 'slate' as const,
    })),
  ];

  if (config.branch) {
    edges.push({
      id: 'pipe-branch',
      from: config.branch.from,
      to: config.branch.to,
      label: config.branch.label,
      tone: config.branch.tone ?? 'red',
      dashed: true,
      curve: 90,
    });
  }

  const statusByStage: Record<string, SceneStatus> = Object.fromEntries(
    stages.map((stage) => [stage.id, 'ok' as SceneStatus]),
  );
  let badgedStage: string | undefined;

  const steps: SceneStep[] = config.steps.map((step, index) => {
    const active = Math.min(Math.max(0, step.activeStage), Math.max(0, stages.length - 1));
    const events: SceneStep['events'] = [];

    if (badgedStage) {
      events.push({ type: 'nodeBadge', node: badgedStage });
    }
    const activeId = stages[active]?.id ?? '';
    events.push({
      type: 'nodeBadge',
      node: activeId,
      badge:
        step.status === 'down'
          ? config.locale === 'tr'
            ? 'durdu'
            : 'halted'
          : config.locale === 'tr'
            ? 'işleniyor'
            : 'processing',
    });
    badgedStage = activeId;

    stages.forEach((stage, stageIndex) => {
      const desired: SceneStatus = stageIndex === active ? step.status ?? 'ok' : 'ok';
      if (statusByStage[stage.id] !== desired) {
        statusByStage[stage.id] = desired;
        events.push({ type: 'nodeStatus', node: stage.id, status: desired });
      }
    });

    if (active > 0) {
      events.push({ type: 'packet', edge: `pipe-edge-${active}`, tone: stages[active]?.tone });
    }

    return {
      id: `pipe-step-${index + 1}`,
      title: step.title,
      body: step.body,
      tag: step.tag,
      focus: active > 0 ? [stages[active - 1]?.id ?? '', activeId] : [activeId],
      events,
      durationMs: step.durationMs,
    };
  });

  return {
    id: config.id ?? 'pipeline',
    title: config.title,
    subtitle: config.subtitle,
    canvas: { w: width, h: height },
    nodes,
    edges,
    steps,
    metrics: config.metrics,
  };
}
