import React from 'react';
import type { SceneStep } from '../../../domain/diagrams/sceneSpec';
import { DIAGRAM, TONE_COLOR } from './diagramTheme';

export interface SceneStepperProps {
  steps: SceneStep[];
  index: number;
  onSelect: (index: number) => void;
}

export const SceneStepper: React.FC<SceneStepperProps> = ({ steps, index, onSelect }) => {
  if (steps.length < 2) return null;

  return (
    <div
      style={{
        display: 'flex',
        gap: 6,
        overflowX: 'auto',
        paddingTop: 4,
        paddingBottom: 2,
        scrollbarWidth: 'thin',
      }}
    >
      {steps.map((step, stepIndex) => {
        const active = stepIndex === index;
        const done = stepIndex < index;
        return (
          <button
            key={step.id}
            type="button"
            onClick={() => onSelect(stepIndex)}
            aria-current={active ? 'step' : undefined}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 4,
              minWidth: 62,
              maxWidth: 82,
              padding: 0,
              border: 'none',
              background: 'none',
              cursor: 'pointer',
              opacity: active ? 1 : 0.55,
            }}
          >
            <span
              style={{
                width: 24,
                height: 24,
                borderRadius: 999,
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: DIAGRAM.mono,
                fontSize: 10,
                fontWeight: 700,
                color: active ? DIAGRAM.canvasBg : DIAGRAM.text,
                background: active
                  ? TONE_COLOR.green
                  : done
                    ? 'rgba(16, 185, 129, 0.22)'
                    : 'rgba(148, 163, 184, 0.12)',
                border: `1px solid ${active ? TONE_COLOR.green : DIAGRAM.nodeBorder}`,
              }}
            >
              {stepIndex + 1}
            </span>
            <span
              style={{
                fontSize: 9,
                lineHeight: 1.2,
                textAlign: 'center',
                color: active ? DIAGRAM.text : DIAGRAM.muted,
                overflow: 'hidden',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
              }}
            >
              {step.title}
            </span>
          </button>
        );
      })}
    </div>
  );
};

export default SceneStepper;
