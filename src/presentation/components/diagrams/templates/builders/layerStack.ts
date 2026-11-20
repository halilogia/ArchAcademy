import type {
  SceneIcon,
  SceneMetric,
  SceneSpec,
  SceneStep,
  SceneTone,
} from '../../../../../domain/diagrams/sceneSpec';
import type { SceneLocale } from '../labels';

export interface LayerStackLayer {
  id: string;
  label: string;
  sublabel?: string;
  tone?: SceneTone;
  icon?: SceneIcon;
  badge?: string;
}

export interface LayerStackStep {
  title: string;
  body: string;
  tag?: string;
  focus?: string[];
  /** Layer whose inbound dependency arrow animates. */
  activeLayer?: string;
  durationMs?: number;
}

export interface LayerStackSceneConfig {
  locale: SceneLocale;
  id?: string;
  title: string;
  subtitle?: string;
  layers: LayerStackLayer[];
  steps: LayerStackStep[];
  metrics?: SceneMetric[];
}

const LAYER_W = 540;
const LAYER_H = 74;
const PITCH = 98;
const TOP = 78;

/**
 * Vertical dependency stack (clean architecture, onion, OSI, N-tier).
 * Steps are supplied by the page because the teaching order is content.
 */
export function buildLayerStackScene(config: LayerStackSceneConfig): SceneSpec {
  const width = 960;
  const layers = config.layers.slice(0, 7);
  const height = TOP + Math.max(1, layers.length) * PITCH + 40;

  const nodes: SceneSpec['nodes'] = layers.map((layer, index) => ({
    id: layer.id,
    label: layer.label,
    sublabel: layer.sublabel,
    kind: 'layer',
    icon: layer.icon,
    tone: layer.tone,
    badge: layer.badge,
    at: { x: width / 2, y: TOP + LAYER_H / 2 + index * PITCH },
    size: { w: LAYER_W, h: LAYER_H },
  }));

  const edges: SceneSpec['edges'] = layers.slice(1).map((layer, index) => ({
    id: `layer-edge-${index + 1}`,
    from: layers[index]?.id ?? layer.id,
    to: layer.id,
    dashed: true,
    tone: layer.tone ?? 'slate',
    label: index === 0 ? (config.locale === 'tr' ? 'bağımlı' : 'depends on') : undefined,
  }));

  const steps: SceneStep[] = config.steps.map((step, index) => {
    const activeIndex = step.activeLayer
      ? layers.findIndex((layer) => layer.id === step.activeLayer)
      : -1;
    const clearBadges = layers.map((layer) => ({ type: 'nodeBadge' as const, node: layer.id }));
    const events: SceneStep['events'] = [...clearBadges];

    if (step.activeLayer) {
      events.push({ type: 'nodeBadge', node: step.activeLayer, badge: config.locale === 'tr' ? 'aktif' : 'active' });
    }
    if (activeIndex > 0) {
      events.push({ type: 'packet', edge: `layer-edge-${activeIndex}`, tone: layers[activeIndex]?.tone });
    }

    return {
      id: `layer-step-${index + 1}`,
      title: step.title,
      body: step.body,
      tag: step.tag,
      focus: step.focus ?? (step.activeLayer ? [step.activeLayer] : []),
      events,
      durationMs: step.durationMs,
    };
  });

  return {
    id: config.id ?? 'layer-stack',
    title: config.title,
    subtitle: config.subtitle,
    canvas: { w: width, h: height },
    nodes,
    edges,
    steps,
    metrics: config.metrics,
  };
}
