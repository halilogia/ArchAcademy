import React from 'react';
import { ChevronLeft, ChevronRight, Pause, Play, RotateCcw } from 'lucide-react';
import { DIAGRAM } from './diagramTheme';

export interface ScenePlayerBarProps {
  index: number;
  total: number;
  playing: boolean;
  onPrev: () => void;
  onNext: () => void;
  onToggle: () => void;
  onReplay: () => void;
  labels?: {
    previous?: string;
    next?: string;
    play?: string;
    pause?: string;
    replay?: string;
  };
}

const controlStyle: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 6,
  height: 34,
  minWidth: 34,
  padding: '0 10px',
  borderRadius: 8,
  border: `1px solid ${DIAGRAM.nodeBorder}`,
  background: 'rgba(15, 23, 42, 0.8)',
  color: DIAGRAM.text,
  cursor: 'pointer',
  fontSize: 12,
  fontWeight: 700,
};

export const ScenePlayerBar: React.FC<ScenePlayerBarProps> = ({
  index,
  total,
  playing,
  onPrev,
  onNext,
  onToggle,
  onReplay,
  labels,
}) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
    <button
      type="button"
      onClick={onReplay}
      style={controlStyle}
      aria-label={labels?.replay ?? 'Replay'}
      title={labels?.replay ?? 'Replay'}
    >
      <RotateCcw size={15} />
    </button>
    <button
      type="button"
      onClick={onPrev}
      style={{ ...controlStyle, opacity: index === 0 ? 0.45 : 1 }}
      disabled={index === 0}
      aria-label={labels?.previous ?? 'Previous step'}
      title={labels?.previous ?? 'Previous step'}
    >
      <ChevronLeft size={16} />
    </button>
    <button
      type="button"
      onClick={onToggle}
      style={{
        ...controlStyle,
        minWidth: 92,
        background: playing ? 'rgba(239, 68, 68, 0.14)' : 'rgba(59, 130, 246, 0.18)',
        borderColor: playing ? 'rgba(239, 68, 68, 0.4)' : 'rgba(59, 130, 246, 0.45)',
      }}
      aria-label={playing ? labels?.pause ?? 'Pause' : labels?.play ?? 'Play'}
    >
      {playing ? <Pause size={14} /> : <Play size={14} />}
      {playing ? labels?.pause ?? 'Pause' : labels?.play ?? 'Play'}
    </button>
    <button
      type="button"
      onClick={onNext}
      style={{ ...controlStyle, opacity: index >= total - 1 ? 0.45 : 1 }}
      disabled={index >= total - 1}
      aria-label={labels?.next ?? 'Next step'}
      title={labels?.next ?? 'Next step'}
    >
      <ChevronRight size={16} />
    </button>
  </div>
);

export default ScenePlayerBar;
