import { useMemo } from 'react';
import type { SceneSpec, SceneLocale } from '../../domain/diagrams/sceneSpec';
import type { DiagramSceneRecord } from '../../domain/entities/DiagramScene';
import { useCmsCollection, type CmsStatus } from './useCmsCollection';
import type { CmsSource } from '../../domain/repositories/ContentRepository';

export interface DiagramSceneState {
  spec: SceneSpec | null;
  status: CmsStatus;
  source: CmsSource;
  error: string | null;
  refresh: () => Promise<void>;
}

/**
 * Resolves a published scene from the `diagram-scenes` collection. The CMS
 * adapter already falls back to the bundled seed, so this hook works offline.
 */
export const useDiagramScene = (sceneId: string, locale: SceneLocale): DiagramSceneState => {
  const collection = useCmsCollection<DiagramSceneRecord>('diagram-scenes');

  const spec = useMemo<SceneSpec | null>(() => {
    const record = collection.data.find((item) => item.id === sceneId);
    return record?.specs[locale] ?? null;
  }, [collection.data, sceneId, locale]);

  return {
    spec,
    status: collection.status,
    source: collection.source,
    error: collection.error,
    refresh: collection.refresh,
  };
};
