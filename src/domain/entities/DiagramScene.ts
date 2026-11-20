import type { SceneLocale, SceneSpec } from '../diagrams/sceneSpec';

export type DiagramSceneTemplate =
  | 'sequence'
  | 'fanout'
  | 'layer-stack'
  | 'pipeline'
  | 'state-machine';

/**
 * One lesson scene as published by the CMS.
 *
 * Both locales carry a complete `SceneSpec`: geometry is duplicated on purpose
 * so a translator can move a node without invalidating the other language, and
 * the renderer never has to resolve nested localized strings at paint time.
 */
export interface DiagramSceneRecord {
  id: string;
  template: DiagramSceneTemplate;
  specs: Record<SceneLocale, SceneSpec>;
}
