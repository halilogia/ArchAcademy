import React, { useCallback, useMemo } from 'react';
import type { SceneSpec } from '../../../domain/diagrams/sceneSpec';
import { describeStepChanges, resolveSceneState } from '../../../domain/diagrams/sceneState';
import { useScenePlayback } from '../../hooks/useScenePlayback';
import { DIAGRAM, TONE_COLOR } from './diagramTheme';
import { DiagramStage } from './DiagramStage';
import { SceneMetrics } from './SceneMetrics';
import { SceneNarration } from './SceneNarration';
import { ScenePlayerBar } from './ScenePlayerBar';
import { SceneStepper } from './SceneStepper';

export interface DiagramSceneLabels {
  play?: string;
  pause?: string;
  replay?: string;
  previous?: string;
  next?: string;
  step?: string;
  whatChanged?: string;
}

export interface DiagramSceneProps {
  spec: SceneSpec;
  labels?: DiagramSceneLabels;
  /** Extra content rendered under the stepper (links, notes). */
  footer?: React.ReactNode;
}

export const DiagramScene: React.FC<DiagramSceneProps> = ({ spec, labels, footer }) => {
  const playback = useScenePlayback(spec.steps);
  const state = useMemo(() => resolveSceneState(spec, playback.index), [spec, playback.index]);
  const step = spec.steps[playback.index];
  const changes = useMemo(() => describeStepChanges(spec, step), [spec, step]);

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (event.key === 'ArrowRight') {
        event.preventDefault();
        playback.next();
      } else if (event.key === 'ArrowLeft') {
        event.preventDefault();
        playback.prev();
      } else if (event.key === ' ') {
        event.preventDefault();
        playback.toggle();
      }
    },
    [playback],
  );

  return (
    <div
      tabIndex={0}
      role="group"
      aria-label={spec.title ?? 'Animated diagram'}
      onKeyDown={handleKeyDown}
      style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        gap: 14,
        padding: 18,
        borderRadius: DIAGRAM.radius.panel,
        border: `1px solid ${DIAGRAM.nodeBorder}`,
        background: 'rgba(15, 23, 42, 0.55)',
        backdropFilter: 'blur(10px)',
        outline: 'none',
      }}
    >
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 12 }}>
        <div style={{ minWidth: 0, flex: 1 }}>
          {spec.title && (
            <h3 style={{ margin: 0, fontSize: 18, fontWeight: 850, color: DIAGRAM.text, letterSpacing: '-0.015em' }}>
              {spec.title}
            </h3>
          )}
          {spec.subtitle && (
            <p style={{ margin: '3px 0 0', fontSize: 12, color: DIAGRAM.muted }}>{spec.subtitle}</p>
          )}
        </div>
        <ScenePlayerBar
          index={playback.index}
          total={spec.steps.length}
          playing={playback.playing}
          onPrev={playback.prev}
          onNext={playback.next}
          onToggle={playback.toggle}
          onReplay={playback.replay}
          labels={labels}
        />
      </div>

      <div style={{ height: 3, borderRadius: 999, background: 'rgba(148, 163, 184, 0.14)', overflow: 'hidden' }}>
        <div
          style={{
            width: `${playback.progress * 100}%`,
            height: '100%',
            background: `linear-gradient(90deg, ${TONE_COLOR.blue}, ${TONE_COLOR.green})`,
            transition: 'width 260ms ease',
          }}
        />
      </div>

      <SceneMetrics spec={spec} state={state} />

      <div className="diagram-scene-grid">
        <DiagramStage spec={spec} state={state} />
        <SceneNarration
          step={step}
          index={playback.index}
          total={spec.steps.length}
          changes={changes}
          onPrev={playback.prev}
          onNext={playback.next}
          labels={labels}
        />
      </div>

      {spec.legend && spec.legend.length > 0 && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
          {spec.legend.map((item) => (
            <span
              key={item.label}
              style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 10, color: DIAGRAM.muted }}
            >
              <span
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: 999,
                  background: TONE_COLOR[item.tone],
                  display: 'inline-block',
                }}
              />
              {item.label}
            </span>
          ))}
        </div>
      )}

      <SceneStepper steps={spec.steps} index={playback.index} onSelect={playback.goTo} />

      {footer}
    </div>
  );
};

export default DiagramScene;
