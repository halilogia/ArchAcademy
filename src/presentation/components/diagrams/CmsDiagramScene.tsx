import React from 'react';
import type { SceneLocale } from '../../../domain/diagrams/sceneSpec';
import { useDiagramScene } from '../../hooks/useDiagramScene';
import { DiagramScene } from './DiagramScene';
import { DIAGRAM } from './diagramTheme';
import { sceneLabels } from './templates/labels';

export interface CmsDiagramSceneProps {
  sceneId: string;
  locale: SceneLocale;
}

/**
 * Renders a scene published through the CMS (`diagram-scenes`). Geometry and
 * copy live in the payload, so editing a lesson no longer needs a deploy.
 */
export const CmsDiagramScene: React.FC<CmsDiagramSceneProps> = ({ sceneId, locale }) => {
  const { spec, status } = useDiagramScene(sceneId, locale);

  if (spec) {
    return <DiagramScene spec={spec} labels={sceneLabels(locale)} />;
  }

  const message =
    status === 'error'
      ? locale === 'tr'
        ? 'Sahne şu anda yüklenemedi.'
        : 'The scene could not be loaded.'
      : locale === 'tr'
        ? 'Sahne yükleniyor…'
        : 'Loading scene…';

  return (
    <div
      role="status"
      aria-live="polite"
      style={{
        minHeight: 320,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: DIAGRAM.radius.panel,
        border: `1px solid ${DIAGRAM.nodeBorder}`,
        background: 'rgba(15, 23, 42, 0.55)',
        color: DIAGRAM.muted,
        fontSize: 13,
        fontFamily: DIAGRAM.mono,
      }}
    >
      {message}
    </div>
  );
};

export default CmsDiagramScene;
