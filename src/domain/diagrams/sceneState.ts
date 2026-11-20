import type {
  SceneEdge,
  SceneNode,
  SceneSpec,
  SceneStatus,
  SceneStep,
  SceneTone,
} from './sceneSpec';

export interface ScenePacket {
  edge: string;
  tone?: SceneTone;
  label?: string;
}

export interface SceneState {
  stepIndex: number;
  statuses: Record<string, SceneStatus>;
  loads: Record<string, number>;
  badges: Record<string, string>;
  metrics: Record<string, string | number>;
  /** Per-step captions. Cleared on every new step. */
  captions: string[];
  /** Node and edge ids that stay lit. Empty = nothing dims. */
  focus: Set<string>;
  /** Packets travelling during the current step only. */
  packets: ScenePacket[];
}

export const clampStepIndex = (spec: SceneSpec, index: number): number => {
  const last = spec.steps.length - 1;
  if (last < 0) return 0;
  if (!Number.isFinite(index)) return 0;
  return Math.min(last, Math.max(0, Math.trunc(index)));
};

/**
 * Folds every event from step 0 up to `stepIndex`.
 *
 * Node status, load and badge are cumulative (a failure stays failed until a
 * later step repairs it), while focus and packets belong to the current step
 * only. This mirrors how a narrated scene reads: state accumulates, attention
 * does not.
 */
export const resolveSceneState = (spec: SceneSpec, rawIndex: number): SceneState => {
  const stepIndex = clampStepIndex(spec, rawIndex);
  const statuses: Record<string, SceneStatus> = { ...(spec.initial?.statuses ?? {}) };
  const loads: Record<string, number> = { ...(spec.initial?.loads ?? {}) };
  const badges: Record<string, string> = { ...(spec.initial?.badges ?? {}) };
  const metrics: Record<string, string | number> = {
    ...Object.fromEntries((spec.metrics ?? []).map((metric) => [metric.id, metric.value])),
    ...(spec.initial?.metrics ?? {}),
  };
  const packets: ScenePacket[] = [];
  const captions: string[] = [];

  for (let index = 0; index <= stepIndex; index += 1) {
    const step = spec.steps[index];
    if (!step) continue;
    for (const event of step.events) {
      switch (event.type) {
        case 'nodeStatus':
          statuses[event.node] = event.status;
          break;
        case 'nodeLoad':
          loads[event.node] = Math.min(100, Math.max(0, event.load));
          break;
        case 'nodeBadge':
          if (event.badge === undefined) {
            delete badges[event.node];
          } else {
            badges[event.node] = event.badge;
          }
          break;
        case 'metric':
          metrics[event.id] = event.value;
          break;
        case 'caption':
          captions.push(event.text);
          break;
        case 'packet':
          // packets are transient: keep only the current step's traffic
          break;
        default:
          break;
      }
    }
  }

  const current = spec.steps[stepIndex];
  if (current) {
    for (const event of current.events) {
      if (event.type === 'packet') {
        packets.push({ edge: event.edge, tone: event.tone, label: event.label });
      }
    }
  }

  return {
    stepIndex,
    statuses,
    loads,
    badges,
    metrics,
    captions,
    focus: new Set(current?.focus ?? []),
    packets,
  };
};

export const stepDuration = (step: SceneStep | undefined): number => step?.durationMs ?? 2600;

export const nodeDimmed = (state: SceneState, nodeId: string): boolean =>
  state.focus.size > 0 && !state.focus.has(nodeId);

export const edgeDimmed = (state: SceneState, edge: SceneEdge): boolean => {
  if (state.focus.size === 0) return false;
  return !(
    state.focus.has(edge.id) ||
    state.focus.has(edge.from) ||
    state.focus.has(edge.to)
  );
};

const STATUS_LABEL: Record<SceneStatus, string> = {
  ok: 'ok',
  warn: 'degraded',
  down: 'down',
};

/** Human-readable "what changed" lines for the narration panel. */
export const describeStepChanges = (spec: SceneSpec, step: SceneStep | undefined): string[] => {
  if (!step) return [];
  const nodeById = new Map<string, SceneNode>(spec.nodes.map((node) => [node.id, node]));
  const edgeById = new Map<string, SceneEdge>(spec.edges.map((edge) => [edge.id, edge]));
  const lines: string[] = [];

  for (const event of step.events) {
    switch (event.type) {
      case 'packet': {
        const edge = edgeById.get(event.edge);
        if (!edge) break;
        const from = nodeById.get(edge.from)?.label ?? edge.from;
        const to = nodeById.get(edge.to)?.label ?? edge.to;
        lines.push(`${from} → ${to}${event.label ? `: ${event.label}` : ''}`);
        break;
      }
      case 'nodeStatus': {
        const label = nodeById.get(event.node)?.label ?? event.node;
        lines.push(`${label}: ${STATUS_LABEL[event.status]}`);
        break;
      }
      case 'nodeLoad': {
        const label = nodeById.get(event.node)?.label ?? event.node;
        lines.push(`${label} load ${Math.round(event.load)}%`);
        break;
      }
      case 'nodeBadge': {
        const label = nodeById.get(event.node)?.label ?? event.node;
        if (event.badge) lines.push(`${label}: ${event.badge}`);
        break;
      }
      case 'metric':
        lines.push(`${event.id}: ${event.value}`);
        break;
      case 'caption':
        lines.push(event.text);
        break;
      default:
        break;
    }
  }

  return lines;
};
