/**
 * Declarative diagram scene contract.
 *
 * Framework-free by design: no React, no DOM, no i18n. A scene is data, the
 * presentation layer renders it. Templates (fan-out, sequence, layer stack,
 * pipeline, state machine) only produce `SceneSpec` objects.
 */

export type SceneTone = 'blue' | 'green' | 'amber' | 'violet' | 'red' | 'slate';

/** Content locale for scene copy. Authoring stays in Turkish + English. */
export type SceneLocale = 'en' | 'tr';

export type SceneStatus = 'ok' | 'warn' | 'down';

export type SceneIcon =
  | 'server'
  | 'database'
  | 'queue'
  | 'globe'
  | 'shield'
  | 'user'
  | 'cpu'
  | 'network'
  | 'lock'
  | 'layers'
  | 'box'
  | 'zap'
  | 'file'
  | 'cloud'
  | 'router'
  | 'refresh';

export type SceneNodeKind =
  | 'service'
  | 'hub'
  | 'store'
  | 'queue'
  | 'client'
  | 'pool'
  | 'gateway'
  | 'layer'
  | 'actor'
  | 'state';

export interface ScenePoint {
  x: number;
  y: number;
}

export interface SceneSize {
  w: number;
  h: number;
}

export interface SceneNode {
  id: string;
  label: string;
  kind: SceneNodeKind;
  /** Centre point in canvas units. */
  at: ScenePoint;
  sublabel?: string;
  icon?: SceneIcon;
  tone?: SceneTone;
  size?: SceneSize;
  /** 0-100, rendered as a load bar. */
  load?: number;
  badge?: string;
  status?: SceneStatus;
  /** Pool nodes render `count` as the aggregate label. */
  count?: string;
  /** Sequence diagrams draw a dashed lifeline from the node downwards. */
  lifeline?: boolean;
}

export type SceneEdgeRoute = 'auto' | 'sequence';

export interface SceneEdge {
  id: string;
  from: string;
  to: string;
  label?: string;
  tone?: SceneTone;
  dashed?: boolean;
  /** Arrow heads on both ends. */
  bidirectional?: boolean;
  /** Perpendicular offset of the control point, in canvas units. */
  curve?: number;
  route?: SceneEdgeRoute;
  /** Absolute canvas Y for `route: 'sequence'`. */
  lane?: number;
}

export type SceneEvent =
  | { type: 'packet'; edge: string; tone?: SceneTone; label?: string }
  | { type: 'nodeStatus'; node: string; status: SceneStatus }
  | { type: 'nodeLoad'; node: string; load: number }
  | { type: 'nodeBadge'; node: string; badge?: string }
  | { type: 'metric'; id: string; value: string | number }
  | { type: 'caption'; text: string };

export interface SceneStep {
  id: string;
  title: string;
  body: string;
  /** Small uppercase label such as "TECHNIQUE" or "FAILURE". */
  tag?: string;
  /** Node/edge ids that stay lit; everything else dims. Empty = no dimming. */
  focus?: string[];
  events: SceneEvent[];
  /** Autoplay dwell time for this step. Defaults to 2600ms. */
  durationMs?: number;
}

export interface SceneMetric {
  id: string;
  label: string;
  value: string | number;
  tone?: SceneTone;
}

export interface SceneLegendItem {
  label: string;
  tone: SceneTone;
}

export interface SceneSpec {
  id: string;
  title?: string;
  subtitle?: string;
  canvas: SceneSize;
  nodes: SceneNode[];
  edges: SceneEdge[];
  steps: SceneStep[];
  metrics?: SceneMetric[];
  legend?: SceneLegendItem[];
  initial?: {
    statuses?: Record<string, SceneStatus>;
    loads?: Record<string, number>;
    badges?: Record<string, string>;
    metrics?: Record<string, string | number>;
  };
}
