import React from 'react';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import type { SceneStep } from '../../../domain/diagrams/sceneSpec';
import { DIAGRAM, TONE_COLOR } from './diagramTheme';

export interface SceneNarrationProps {
  step: SceneStep | undefined;
  index: number;
  total: number;
  changes: string[];
  onPrev: () => void;
  onNext: () => void;
  labels?: {
    step?: string;
    whatChanged?: string;
    previous?: string;
    next?: string;
  };
}

export const SceneNarration: React.FC<SceneNarrationProps> = ({
  step,
  index,
  total,
  changes,
  onPrev,
  onNext,
  labels,
}) => {
  if (!step) return null;

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        minWidth: 0,
        borderRadius: DIAGRAM.radius.panel,
        border: `1px solid ${DIAGRAM.nodeBorder}`,
        background: 'rgba(15, 23, 42, 0.72)',
        padding: 18,
        gap: 14,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
        <span
          style={{
            fontFamily: DIAGRAM.mono,
            fontSize: 10,
            letterSpacing: '0.12em',
            fontWeight: 700,
            color: DIAGRAM.muted,
            textTransform: 'uppercase',
          }}
        >
          {labels?.step ?? 'Step'} {index + 1} / {total}
        </span>
        {step.tag && (
          <span
            style={{
              fontFamily: DIAGRAM.mono,
              fontSize: 9,
              letterSpacing: '0.1em',
              fontWeight: 800,
              textTransform: 'uppercase',
              color: TONE_COLOR.blue,
              border: '1px solid rgba(59, 130, 246, 0.35)',
              background: 'rgba(59, 130, 246, 0.12)',
              borderRadius: 6,
              padding: '3px 7px',
            }}
          >
            {step.tag}
          </span>
        )}
      </div>

      <div>
        <h4 style={{ margin: 0, fontSize: 17, fontWeight: 800, color: DIAGRAM.text, lineHeight: 1.25 }}>
          {step.title}
        </h4>
        <p style={{ margin: '8px 0 0', fontSize: 13, lineHeight: 1.55, color: DIAGRAM.muted }}>
          {step.body}
        </p>
      </div>

      {changes.length > 0 && (
        <div>
          <div
            style={{
              fontFamily: DIAGRAM.mono,
              fontSize: 9.5,
              letterSpacing: '0.12em',
              fontWeight: 700,
              color: 'rgba(148, 163, 184, 0.72)',
              textTransform: 'uppercase',
              marginBottom: 7,
            }}
          >
            {labels?.whatChanged ?? 'What changed'}
          </div>
          <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'grid', gap: 5 }}>
            {changes.slice(0, 8).map((change, changeIndex) => (
              <li
                key={`${change}-${changeIndex}`}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 7,
                  fontSize: 12,
                  lineHeight: 1.45,
                  color: DIAGRAM.text,
                }}
              >
                <ArrowRight size={12} style={{ marginTop: 3, flexShrink: 0, color: TONE_COLOR.green }} />
                <span>{change}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div style={{ display: 'flex', gap: 8, marginTop: 'auto' }}>
        <button
          type="button"
          onClick={onPrev}
          disabled={index === 0}
          style={{
            flex: 1,
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 6,
            height: 34,
            borderRadius: 8,
            border: `1px solid ${DIAGRAM.nodeBorder}`,
            background: 'transparent',
            color: DIAGRAM.text,
            cursor: index === 0 ? 'default' : 'pointer',
            opacity: index === 0 ? 0.4 : 1,
            fontSize: 12,
            fontWeight: 700,
          }}
        >
          <ChevronLeft size={14} />
          {labels?.previous ?? 'Back'}
        </button>
        <button
          type="button"
          onClick={onNext}
          disabled={index >= total - 1}
          style={{
            flex: 1.4,
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 6,
            height: 34,
            borderRadius: 8,
            border: '1px solid rgba(16, 185, 129, 0.45)',
            background: 'rgba(16, 185, 129, 0.16)',
            color: DIAGRAM.text,
            cursor: index >= total - 1 ? 'default' : 'pointer',
            opacity: index >= total - 1 ? 0.5 : 1,
            fontSize: 12,
            fontWeight: 800,
          }}
        >
          {labels?.next ?? 'Next'}
          <ChevronRight size={14} />
        </button>
      </div>
    </div>
  );
};

export default SceneNarration;
