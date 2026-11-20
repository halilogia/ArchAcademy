import React from 'react';
import type { SceneSpec } from '../../../domain/diagrams/sceneSpec';
import type { SceneState } from '../../../domain/diagrams/sceneState';
import { DIAGRAM, TONE_COLOR, TONE_SOFT, toneOf } from './diagramTheme';

export interface SceneMetricsProps {
  spec: SceneSpec;
  state: SceneState;
}

export const SceneMetrics: React.FC<SceneMetricsProps> = ({ spec, state }) => {
  if (!spec.metrics || spec.metrics.length === 0) return null;

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${Math.min(spec.metrics.length, 5)}, minmax(0, 1fr))`,
        gap: 8,
        width: '100%',
        maxWidth: Math.min(spec.metrics.length, 5) * 224,
      }}
      className="diagram-metrics"
    >
      {spec.metrics.map((metric) => {
        const tone = toneOf(metric.tone);
        return (
          <div
            key={metric.id}
            style={{
              borderRadius: 10,
              border: `1px solid ${DIAGRAM.nodeBorder}`,
              background: TONE_SOFT[tone],
              padding: '8px 10px',
              minWidth: 0,
            }}
          >
            <div
              style={{
                fontFamily: DIAGRAM.mono,
                fontSize: 9,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: DIAGRAM.muted,
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {metric.label}
            </div>
            <div
              style={{
                fontSize: 15,
                fontWeight: 800,
                color: tone === 'slate' ? DIAGRAM.text : TONE_COLOR[tone],
                fontVariantNumeric: 'tabular-nums',
                marginTop: 2,
              }}
            >
              {state.metrics[metric.id] ?? metric.value}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SceneMetrics;
