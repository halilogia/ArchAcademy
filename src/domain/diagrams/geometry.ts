import type { SceneNode, ScenePoint, SceneSize } from './sceneSpec';

const DEFAULT_SIZE: SceneSize = { w: 190, h: 120 };

const KIND_SIZE: Partial<Record<SceneNode['kind'], SceneSize>> = {
  pool: { w: 150, h: 132 },
  layer: { w: 520, h: 74 },
  actor: { w: 150, h: 62 },
  state: { w: 156, h: 62 },
  hub: { w: 200, h: 120 },
};

export const nodeSize = (node: SceneNode): SceneSize => node.size ?? KIND_SIZE[node.kind] ?? DEFAULT_SIZE;

export interface SceneRect {
  left: number;
  top: number;
  right: number;
  bottom: number;
  centre: ScenePoint;
}

export const nodeRect = (node: SceneNode): SceneRect => {
  const size = nodeSize(node);
  return {
    left: node.at.x - size.w / 2,
    top: node.at.y - size.h / 2,
    right: node.at.x + size.w / 2,
    bottom: node.at.y + size.h / 2,
    centre: node.at,
  };
};

const EPSILON = 0.0001;

/** Point where the segment centre -> toward exits the node rectangle. */
export const anchorOnRect = (node: SceneNode, toward: ScenePoint): ScenePoint => {
  const size = nodeSize(node);
  const dx = toward.x - node.at.x;
  const dy = toward.y - node.at.y;
  if (Math.abs(dx) < EPSILON && Math.abs(dy) < EPSILON) {
    return { ...node.at };
  }
  const scaleX = Math.abs(dx) < EPSILON ? Number.POSITIVE_INFINITY : size.w / 2 / Math.abs(dx);
  const scaleY = Math.abs(dy) < EPSILON ? Number.POSITIVE_INFINITY : size.h / 2 / Math.abs(dy);
  const scale = Math.min(scaleX, scaleY);
  return { x: node.at.x + dx * scale, y: node.at.y + dy * scale };
};

export const quadraticControl = (start: ScenePoint, end: ScenePoint, curve = 0): ScenePoint => {
  if (curve === 0) {
    return { x: (start.x + end.x) / 2, y: (start.y + end.y) / 2 };
  }
  const dx = end.x - start.x;
  const dy = end.y - start.y;
  const length = Math.hypot(dx, dy) || 1;
  const normalX = -dy / length;
  const normalY = dx / length;
  return {
    x: (start.x + end.x) / 2 + normalX * curve,
    y: (start.y + end.y) / 2 + normalY * curve,
  };
};

export const quadraticPath = (start: ScenePoint, control: ScenePoint, end: ScenePoint): string =>
  `M ${start.x} ${start.y} Q ${control.x} ${control.y} ${end.x} ${end.y}`;

export const linePath = (start: ScenePoint, end: ScenePoint): string =>
  `M ${start.x} ${start.y} L ${end.x} ${end.y}`;

/** Samples a quadratic bezier so packets can follow the drawn path. */
export const sampleQuadratic = (
  start: ScenePoint,
  control: ScenePoint,
  end: ScenePoint,
  samples = 22,
): ScenePoint[] => {
  const points: ScenePoint[] = [];
  const count = Math.max(2, samples);
  for (let index = 0; index < count; index += 1) {
    const t = index / (count - 1);
    const inverse = 1 - t;
    points.push({
      x: inverse * inverse * start.x + 2 * inverse * t * control.x + t * t * end.x,
      y: inverse * inverse * start.y + 2 * inverse * t * control.y + t * t * end.y,
    });
  }
  return points;
};

export const sampleLine = (start: ScenePoint, end: ScenePoint, samples = 22): ScenePoint[] => {
  const points: ScenePoint[] = [];
  const count = Math.max(2, samples);
  for (let index = 0; index < count; index += 1) {
    const t = index / (count - 1);
    points.push({
      x: start.x + (end.x - start.x) * t,
      y: start.y + (end.y - start.y) * t,
    });
  }
  return points;
};

export const midpointOf = (points: ScenePoint[]): ScenePoint =>
  points[Math.floor(points.length / 2)] ?? { x: 0, y: 0 };

export interface RowLayoutOptions {
  y: number;
  startX: number;
  gap: number;
  width?: number;
}

/** Evenly spaced centres for a horizontal row. */
export const rowPositions = (ids: string[], options: RowLayoutOptions): Record<string, ScenePoint> => {
  const width = options.width ?? 150;
  return Object.fromEntries(
    ids.map((id, index) => [
      id,
      { x: options.startX + index * (width + options.gap) + width / 2, y: options.y },
    ]),
  );
};

/** Evenly spaced centres for a vertical column. */
export const columnPositions = (
  ids: string[],
  options: { x: number; startY: number; gap: number; height?: number },
): Record<string, ScenePoint> => {
  const height = options.height ?? 88;
  return Object.fromEntries(
    ids.map((id, index) => [
      id,
      { x: options.x, y: options.startY + index * (height + options.gap) + height / 2 },
    ]),
  );
};

/** Radial rosette around a hub. Angles in degrees, 0 = right, -90 = up. */
export const radialPositions = (
  ids: string[],
  centre: ScenePoint,
  radius: number,
  startAngle = -90,
): Record<string, ScenePoint> => {
  const total = Math.max(1, ids.length);
  return Object.fromEntries(
    ids.map((id, index) => {
      const angle = ((startAngle + (360 / total) * index) * Math.PI) / 180;
      return [id, { x: centre.x + radius * Math.cos(angle), y: centre.y + radius * Math.sin(angle) }];
    }),
  );
};
