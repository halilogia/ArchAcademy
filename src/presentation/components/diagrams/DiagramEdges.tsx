import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import type { SceneEdge, SceneSpec, SceneTone } from '../../../domain/diagrams/sceneSpec';
import type { SceneState } from '../../../domain/diagrams/sceneState';
import { edgeDimmed } from '../../../domain/diagrams/sceneState';
import {
  anchorOnRect,
  linePath,
  midpointOf,
  nodeSize,
  quadraticControl,
  quadraticPath,
  sampleLine,
  sampleQuadratic,
} from '../../../domain/diagrams/geometry';
import type { ScenePoint } from '../../../domain/diagrams/sceneSpec';
import { DIAGRAM, TONE_COLOR, toneOf } from './diagramTheme';

interface EdgeGeometry {
  d: string;
  points: ScenePoint[];
}

const geometryFor = (nodes: Map<string, SceneSpec['nodes'][number]>, edge: SceneEdge): EdgeGeometry | null => {
  const from = nodes.get(edge.from);
  const to = nodes.get(edge.to);
  if (!from || !to) return null;

  if (edge.route === 'sequence') {
    const lane = edge.lane ?? (from.at.y + to.at.y) / 2;
    const start = { x: from.at.x, y: lane };
    const end = { x: to.at.x, y: lane };
    return { d: linePath(start, end), points: sampleLine(start, end) };
  }

  const start = anchorOnRect(from, to.at);
  const end = anchorOnRect(to, from.at);
  const control = quadraticControl(start, end, edge.curve ?? 0);
  return { d: quadraticPath(start, control, end), points: sampleQuadratic(start, control, end) };
};

interface PacketDotProps {
  points: ScenePoint[];
  tone: SceneTone;
  delay: number;
  reduced: boolean;
}

const PacketDot: React.FC<PacketDotProps> = ({ points, tone, delay, reduced }) => {
  const color = TONE_COLOR[tone];
  if (points.length === 0) return null;
  const first = points[0];
  if (!first) return null;

  if (reduced) {
    const midpoint = midpointOf(points);
    return <circle cx={midpoint.x} cy={midpoint.y} r={4} fill={color} opacity={0.9} />;
  }

  const xs = points.map((point) => point.x);
  const ys = points.map((point) => point.y);
  const opacities = points.map((_, index) => (index === 0 || index === points.length - 1 ? 0 : 1));

  return (
    <motion.circle
      r={4.5}
      fill={color}
      initial={{ x: first.x, y: first.y, opacity: 0 }}
      animate={{ x: xs, y: ys, opacity: opacities }}
      transition={{
        duration: 1.7,
        delay,
        ease: 'linear',
        repeat: Infinity,
        repeatDelay: 0.7,
      }}
      style={{ filter: `drop-shadow(0 0 6px ${color})` }}
    />
  );
};

interface EdgeLabelProps {
  at: ScenePoint;
  label: string;
  tone: SceneTone;
}

const EdgeLabel: React.FC<EdgeLabelProps> = ({ at, label, tone }) => {
  const width = Math.max(38, label.length * 5.9 + 14);
  return (
    <g transform={`translate(${at.x} ${at.y - 13})`}>
      <rect
        x={-width / 2}
        y={-10}
        width={width}
        height={20}
        rx={7}
        fill={DIAGRAM.surface}
        stroke={TONE_COLOR[tone]}
        strokeOpacity={0.35}
      />
      <text
        textAnchor="middle"
        dominantBaseline="middle"
        fontSize={10}
        fontFamily={DIAGRAM.mono}
        fill={DIAGRAM.text}
      >
        {label}
      </text>
    </g>
  );
};

export interface DiagramEdgesProps {
  spec: SceneSpec;
  state: SceneState;
}

export const DiagramEdges: React.FC<DiagramEdgesProps> = ({ spec, state }) => {
  const reduced = Boolean(useReducedMotion());
  const nodes = new Map(spec.nodes.map((node) => [node.id, node]));
  const tones = Object.keys(TONE_COLOR) as SceneTone[];

  return (
    <svg
      width={spec.canvas.w}
      height={spec.canvas.h}
      viewBox={`0 0 ${spec.canvas.w} ${spec.canvas.h}`}
      style={{ position: 'absolute', inset: 0, overflow: 'visible', pointerEvents: 'none' }}
      aria-hidden="true"
    >
      <defs>
        {tones.map((tone) => (
          <marker
            key={tone}
            id={`diagram-arrow-${tone}`}
            viewBox="0 0 10 10"
            refX={8}
            refY={5}
            markerWidth={7}
            markerHeight={7}
            orient="auto-start-reverse"
          >
            <path d="M 0 0 L 10 5 L 0 10 z" fill={TONE_COLOR[tone]} />
          </marker>
        ))}
      </defs>

      {spec.nodes
        .filter((node) => node.lifeline)
        .map((node) => {
          const size = nodeSize(node);
          return (
            <line
              key={`lifeline-${node.id}`}
              x1={node.at.x}
              y1={node.at.y + size.h / 2}
              x2={node.at.x}
              y2={spec.canvas.h - 26}
              stroke="rgba(148, 163, 184, 0.36)"
              strokeWidth={1}
              strokeDasharray="3 7"
            />
          );
        })}

      {spec.edges.map((edge) => {
        const geometry = geometryFor(nodes, edge);
        if (!geometry) return null;

        const tone = toneOf(edge.tone);
        const dimmed = edgeDimmed(state, edge);
        const packets = state.packets.filter((packet) => packet.edge === edge.id);
        const labelPoint = midpointOf(geometry.points);

        return (
          <g key={edge.id} opacity={dimmed ? 0.2 : 1} style={{ transition: 'opacity 220ms ease' }}>
            <path
              d={geometry.d}
              fill="none"
              stroke={TONE_COLOR[tone]}
              strokeOpacity={packets.length > 0 ? 0.85 : 0.42}
              strokeWidth={packets.length > 0 ? 2.2 : 1.5}
              strokeDasharray={edge.dashed ? '6 6' : undefined}
              markerEnd={`url(#diagram-arrow-${tone})`}
              markerStart={edge.bidirectional ? `url(#diagram-arrow-${tone})` : undefined}
            />
            {packets.length > 0 &&
              packets.map((packet, index) => (
                <PacketDot
                  key={`${edge.id}-packet-${index}`}
                  points={geometry.points}
                  tone={toneOf(packet.tone ?? edge.tone)}
                  delay={index * 0.22}
                  reduced={reduced}
                />
              ))}
            {edge.label && <EdgeLabel at={labelPoint} label={edge.label} tone={tone} />}
          </g>
        );
      })}
    </svg>
  );
};

export default DiagramEdges;
