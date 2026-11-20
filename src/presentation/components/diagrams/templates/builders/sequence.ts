import type {
  SceneIcon,
  SceneMetric,
  SceneSpec,
  SceneStep,
  SceneTone,
} from '../../../../../domain/diagrams/sceneSpec';
import type { SceneLocale } from '../labels';

export interface SequenceParticipant {
  id: string;
  label: string;
  sublabel?: string;
  icon?: SceneIcon;
  tone?: SceneTone;
}

export interface SequenceMessage {
  id?: string;
  from: string;
  to: string;
  label: string;
  tone?: SceneTone;
  dashed?: boolean;
  /** Narration body for this message. Falls back to "A → B: label". */
  note?: string;
  tag?: string;
}

export interface SequenceSceneConfig {
  locale: SceneLocale;
  id?: string;
  title: string;
  subtitle?: string;
  participants: SequenceParticipant[];
  messages: SequenceMessage[];
  intro?: { title: string; body: string; tag?: string };
  metrics?: SceneMetric[];
}

const LANE_START = 186;
const LANE_GAP = 56;
const PARTICIPANT_Y = 86;

/**
 * Sequence / message-flow template. Messages must connect two different
 * participants; time flows downwards, one lane per message.
 */
export function buildSequenceScene(config: SequenceSceneConfig): SceneSpec {
  const width = 960;
  const messages = config.messages.filter((message) => message.from !== message.to).slice(0, 10);
  const height = LANE_START + Math.max(1, messages.length) * LANE_GAP + 46;
  const count = config.participants.length;
  const usable = width - 280;
  const step = count > 1 ? usable / (count - 1) : 0;
  const actorWidth = count > 1 ? Math.min(190, Math.max(112, step - 12)) : 190;

  const participants = config.participants.map((participant, index) => ({
    id: participant.id,
    label: participant.label,
    sublabel: participant.sublabel,
    kind: 'actor' as const,
    icon: participant.icon ?? ('user' as const),
    tone: participant.tone,
    at: { x: count > 1 ? 140 + index * step : width / 2, y: PARTICIPANT_Y },
    size: { w: actorWidth, h: 62 },
    lifeline: true,
  }));

  const edges: SceneSpec['edges'] = messages.map((message, index) => ({
    id: message.id ?? `seq-${index + 1}`,
    from: message.from,
    to: message.to,
    label: message.label,
    tone: message.tone,
    dashed: message.dashed,
    route: 'sequence',
    lane: LANE_START + index * LANE_GAP,
  }));

  const labelOf = (id: string) =>
    config.participants.find((participant) => participant.id === id)?.label ?? id;

  const steps: SceneStep[] = [];

  if (config.intro) {
    steps.push({
      id: 'intro',
      title: config.intro.title,
      body: config.intro.body,
      tag: config.intro.tag,
      focus: config.participants.map((participant) => participant.id),
      events: [],
    });
  }

  messages.forEach((message, index) => {
    const edgeId = message.id ?? `seq-${index + 1}`;
    steps.push({
      id: `step-${index + 1}`,
      title: message.label,
      body:
        message.note ??
        `${labelOf(message.from)} → ${labelOf(message.to)}: ${message.label}`,
      tag: message.tag,
      focus: [message.from, message.to, edgeId],
      events: [{ type: 'packet', edge: edgeId, tone: message.tone }],
    });
  });

  return {
    id: config.id ?? 'sequence',
    title: config.title,
    subtitle: config.subtitle,
    canvas: { w: width, h: height },
    nodes: participants,
    edges,
    steps,
    metrics: config.metrics,
    legend: [
      { label: config.locale === 'tr' ? 'istek' : 'request', tone: 'blue' },
      { label: config.locale === 'tr' ? 'yanıt' : 'response', tone: 'green' },
    ],
  };
}
