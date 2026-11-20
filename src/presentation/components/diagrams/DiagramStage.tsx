import React, { useEffect, useRef, useState } from 'react';
import type { SceneSpec } from '../../../domain/diagrams/sceneSpec';
import type { SceneState } from '../../../domain/diagrams/sceneState';
import { nodeDimmed } from '../../../domain/diagrams/sceneState';
import { DIAGRAM } from './diagramTheme';
import { DiagramEdges } from './DiagramEdges';
import { DiagramNodeView } from './DiagramNodeView';

export interface DiagramStageProps {
  spec: SceneSpec;
  state: SceneState;
}

/** Narrow screens scroll the stage instead of shrinking labels into dust. */
const MIN_STAGE_WIDTH = 720;

/**
 * Fixed logical canvas (spec.canvas) scaled to the container width. Everything
 * inside is laid out in canvas units, so diagrams never reflow when the
 * viewport changes — they scale as one piece.
 */
export const DiagramStage: React.FC<DiagramStageProps> = ({ spec, state }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [available, setAvailable] = useState(0);
  const { w: width, h: height } = spec.canvas;

  useEffect(() => {
    const element = containerRef.current;
    if (!element) return undefined;

    const update = () => setAvailable(element.clientWidth);

    update();
    if (typeof ResizeObserver === 'undefined') {
      window.addEventListener('resize', update);
      return () => window.removeEventListener('resize', update);
    }
    const observer = new ResizeObserver(update);
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const stageWidth = Math.max(available || MIN_STAGE_WIDTH, MIN_STAGE_WIDTH);
  const scale = stageWidth / width;

  return (
    <div
      ref={containerRef}
      style={{
        position: 'relative',
        width: '100%',
        overflowX: 'auto',
        overflowY: 'hidden',
        borderRadius: 20,
        border: `1px solid ${DIAGRAM.nodeBorder}`,
        background: DIAGRAM.canvasBg,
        scrollbarWidth: 'thin',
      }}
    >
      <div
        style={{
          position: 'relative',
          width: stageWidth,
          aspectRatio: `${width} / ${height}`,
          backgroundImage: `radial-gradient(circle at 30% 18%, rgba(59, 130, 246, 0.16), transparent 55%),
            linear-gradient(${DIAGRAM.grid} 1px, transparent 1px),
            linear-gradient(90deg, ${DIAGRAM.grid} 1px, transparent 1px)`,
          backgroundSize: 'auto, 32px 32px, 32px 32px',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width,
            height,
            transform: `scale(${scale})`,
            transformOrigin: 'top left',
          }}
        >
          <DiagramEdges spec={spec} state={state} />
          {spec.nodes.map((node) => (
            <DiagramNodeView
              key={node.id}
              node={node}
              load={state.loads[node.id]}
              status={state.statuses[node.id]}
              badge={state.badges[node.id]}
              dimmed={nodeDimmed(state, node.id)}
              focused={state.focus.has(node.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DiagramStage;
