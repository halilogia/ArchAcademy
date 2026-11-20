import type {
  SceneIcon,
  SceneMetric,
  SceneSpec,
  SceneStep,
  SceneTone,
} from '../../../../../domain/diagrams/sceneSpec';
import type { SceneLocale } from '../labels';

export interface StateMachineState {
  id: string;
  label: string;
  sublabel?: string;
  tone?: SceneTone;
  icon?: SceneIcon;
}

export interface StateMachineTransition {
  from: string;
  to: string;
  label?: string;
  tone?: SceneTone;
  dashed?: boolean;
}

export interface StateMachineStep {
  title: string;
  body: string;
  tag?: string;
  activeState: string;
  /** Animates the transition from `activeState` to this state. */
  nextState?: string;
  durationMs?: number;
}

export interface StateMachineSceneConfig {
  locale: SceneLocale;
  id?: string;
  title: string;
  subtitle?: string;
  states: StateMachineState[];
  transitions: StateMachineTransition[];
  steps: StateMachineStep[];
  metrics?: SceneMetric[];
}

/**
 * Cyclic state space (connection lifecycle, protocol states, saga states).
 * States are laid out on an ellipse; transitions curve so parallel edges stay
 * readable.
 */
export function buildStateMachineScene(config: StateMachineSceneConfig): SceneSpec {
  const states: StateMachineState[] =
    config.states.length > 0 ? config.states.slice(0, 6) : [{ id: 'state-1', label: 'State' }];
  const width = 960;
  const height = 560;
  const centre = { x: width / 2, y: height / 2 + 10 };
  const radiusX = 330;
  const radiusY = 190;

  const nodes: SceneSpec['nodes'] = states.map((state, index) => {
    const angle = (-90 + (360 / Math.max(1, states.length)) * index) * (Math.PI / 180);
    return {
      id: state.id,
      label: state.label,
      sublabel: state.sublabel,
      kind: 'state',
      icon: state.icon ?? 'zap',
      tone: state.tone,
      at: { x: centre.x + radiusX * Math.cos(angle), y: centre.y + radiusY * Math.sin(angle) },
    };
  });

  const edges: SceneSpec['edges'] = config.transitions.map((transition, index) => ({
    id: `transition-${index + 1}`,
    from: transition.from,
    to: transition.to,
    label: transition.label,
    tone: transition.tone,
    dashed: transition.dashed,
    curve: 40,
  }));

  const steps: SceneStep[] = config.steps.map((step, index) => {
    const events: SceneStep['events'] = states.map((state) => ({ type: 'nodeBadge' as const, node: state.id }));
    events.push({
      type: 'nodeBadge',
      node: step.activeState,
      badge: config.locale === 'tr' ? 'aktif' : 'active',
    });

    if (step.nextState) {
      const transitionIndex = config.transitions.findIndex(
        (transition) => transition.from === step.activeState && transition.to === step.nextState,
      );
      if (transitionIndex >= 0) {
        events.push({ type: 'packet', edge: `transition-${transitionIndex + 1}`, tone: 'green' });
      }
    }

    return {
      id: `state-step-${index + 1}`,
      title: step.title,
      body: step.body,
      tag: step.tag,
      focus: step.nextState ? [step.activeState, step.nextState] : [step.activeState],
      events,
      durationMs: step.durationMs,
    };
  });

  return {
    id: config.id ?? 'state-machine',
    title: config.title,
    subtitle: config.subtitle,
    canvas: { w: width, h: height },
    nodes,
    edges,
    steps,
    metrics: config.metrics,
    legend: [
      { label: config.locale === 'tr' ? 'durum' : 'state', tone: 'blue' },
      { label: config.locale === 'tr' ? 'geçiş' : 'transition', tone: 'green' },
    ],
  };
}
