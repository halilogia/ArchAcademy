import React from 'react';
import { motion } from 'framer-motion';
import {
  Box,
  Cloud,
  Cpu,
  Database,
  FileText,
  Globe,
  Layers,
  Lock,
  Network,
  RefreshCw,
  Router,
  Server,
  Shield,
  User,
  Zap,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import type { SceneIcon, SceneNode, SceneStatus } from '../../../domain/diagrams/sceneSpec';
import { nodeSize } from '../../../domain/diagrams/geometry';
import { DIAGRAM, STATUS_COLOR, TONE_COLOR, TONE_SOFT, toneOf } from './diagramTheme';

const ICONS: Record<SceneIcon, LucideIcon> = {
  server: Server,
  database: Database,
  queue: Layers,
  globe: Globe,
  shield: Shield,
  user: User,
  cpu: Cpu,
  network: Network,
  lock: Lock,
  layers: Layers,
  box: Box,
  zap: Zap,
  file: FileText,
  cloud: Cloud,
  router: Router,
  refresh: RefreshCw,
};

const ICON_BY_KIND: Partial<Record<SceneNode['kind'], LucideIcon>> = {
  service: Server,
  hub: Network,
  store: Database,
  queue: Layers,
  client: Globe,
  pool: User,
  gateway: Router,
  layer: Layers,
  actor: User,
  state: Zap,
};

const statusLabel: Record<SceneStatus, string> = {
  ok: 'OK',
  warn: 'WARN',
  down: 'DOWN',
};

export interface DiagramNodeViewProps {
  node: SceneNode;
  load?: number;
  status?: SceneStatus;
  badge?: string;
  dimmed: boolean;
  focused: boolean;
}

export const DiagramNodeView: React.FC<DiagramNodeViewProps> = ({
  node,
  load,
  status,
  badge,
  dimmed,
  focused,
}) => {
  const size = nodeSize(node);
  const tone = toneOf(node.tone);
  const color = TONE_COLOR[tone];
  const soft = TONE_SOFT[tone];
  const Icon = node.icon ? ICONS[node.icon] : ICON_BY_KIND[node.kind] ?? Server;
  const compact = size.h < 80;
  const showIcon = !(node.kind === 'actor' && size.w < 150);
  const showSublabel = Boolean(node.sublabel) && node.kind !== 'pool' && (!compact || node.kind === 'state' || node.kind === 'layer');
  const showLoad = typeof load === 'number' && !compact;
  const resolvedStatus = status ?? node.status;

  return (
    <motion.div
      initial={false}
      animate={{ opacity: dimmed ? 0.42 : 1, scale: focused ? 1.035 : 1 }}
      transition={{ type: 'spring', stiffness: 220, damping: 26 }}
      style={{
        position: 'absolute',
        left: node.at.x - size.w / 2,
        top: node.at.y - size.h / 2,
        width: size.w,
        height: size.h,
        borderRadius: node.kind === 'pool' ? 18 : DIAGRAM.radius.node,
        border: `1px solid ${focused ? color : DIAGRAM.nodeBorder}`,
        background: DIAGRAM.nodeBg,
        boxShadow: focused
          ? `0 0 0 1px ${color}55, 0 22px 44px -22px ${color}`
          : '0 14px 30px -22px rgba(0, 0, 0, 0.9)',
        overflow: 'hidden',
        display: 'flex',
        alignItems: compact ? 'center' : 'flex-start',
        flexDirection: compact ? 'row' : 'column',
        gap: compact ? 10 : 8,
        padding: compact ? '0 14px' : '12px 14px 18px',
        boxSizing: 'border-box',
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `linear-gradient(180deg, ${soft}, transparent 65%)`,
          pointerEvents: 'none',
        }}
      />

      <div
        style={{
          width: compact ? 34 : 38,
          height: compact ? 34 : 38,
          borderRadius: 10,
          background: soft,
          border: `1px solid ${color}55`,
          display: showIcon ? 'flex' : 'none',
          alignItems: 'center',
          justifyContent: 'center',
          color,
          flexShrink: 0,
          position: 'relative',
        }}
      >
        <Icon size={compact ? 17 : 19} strokeWidth={2.2} />
      </div>

      <div style={{ position: 'relative', minWidth: 0, flex: 1 }}>
        <div
          style={{
            fontSize: compact ? 13 : 14,
            fontWeight: 800,
            color: DIAGRAM.text,
            letterSpacing: '-0.01em',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {node.label}
        </div>
        {showSublabel && (
          <div
            style={{
              fontSize: compact ? 9.5 : 10.5,
              color: DIAGRAM.muted,
              marginTop: compact ? 1 : 2,
              fontFamily: DIAGRAM.mono,
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {node.sublabel}
          </div>
        )}
        {node.count && node.kind !== 'pool' && (
          <div style={{ fontSize: 11, color, fontWeight: 700, marginTop: 4, fontFamily: DIAGRAM.mono }}>
            {node.count}
          </div>
        )}
      </div>

      {node.kind === 'pool' && (
        <div
          style={{
            position: 'absolute',
            left: 14,
            right: 14,
            bottom: 10,
            display: 'flex',
            flexDirection: 'column',
            gap: 6,
          }}
        >
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 3, opacity: 0.8 }}>
            {Array.from({ length: 10 }).map((_, index) => (
              <User key={index} size={11} color={color} strokeWidth={2.4} />
            ))}
          </div>
          <div style={{ fontSize: 11, fontWeight: 700, color, fontFamily: DIAGRAM.mono, lineHeight: 1 }}>
            {node.count}
          </div>
        </div>
      )}

      {showLoad && (
        <div
          style={{
            position: 'absolute',
            left: 14,
            right: 14,
            bottom: 8,
            height: 4,
            borderRadius: 999,
            background: 'rgba(148, 163, 184, 0.18)',
            overflow: 'hidden',
          }}
        >
          <motion.div
            initial={false}
            animate={{ scaleX: Math.min(1, Math.max(0, (load ?? 0) / 100)) }}
            transition={{ type: 'spring', stiffness: 140, damping: 22 }}
            style={{
              height: '100%',
              background: color,
              transformOrigin: 'left center',
              borderRadius: 999,
            }}
          />
        </div>
      )}

      {compact && typeof load === 'number' && (
        <div
          style={{
            position: 'absolute',
            left: 0,
            bottom: 0,
            height: 3,
            width: `${Math.min(100, Math.max(0, load))}%`,
            background: color,
          }}
        />
      )}

      <div
        style={{
          position: 'absolute',
          top: 8,
          right: 8,
          display: 'flex',
          alignItems: 'center',
          gap: 5,
        }}
      >
        {resolvedStatus && (
          <span
            title={statusLabel[resolvedStatus]}
            style={{
              width: 8,
              height: 8,
              borderRadius: 999,
              background: STATUS_COLOR[resolvedStatus],
              boxShadow: `0 0 8px ${STATUS_COLOR[resolvedStatus]}`,
              display: 'inline-block',
            }}
          />
        )}
        {badge && (
          <span
            style={{
              fontSize: 9,
              fontWeight: 800,
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              color,
              background: soft,
              border: `1px solid ${color}44`,
              padding: '2px 6px',
              borderRadius: 6,
              fontFamily: DIAGRAM.mono,
            }}
          >
            {badge}
          </span>
        )}
      </div>
    </motion.div>
  );
};

export default DiagramNodeView;
