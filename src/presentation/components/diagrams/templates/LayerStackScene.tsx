import React from 'react';
import type { LayerStackSceneConfig } from './builders/layerStack';
import { buildLayerStackScene } from './builders/layerStack';
import { DiagramScene } from '../DiagramScene';
import { sceneLabels } from './labels';

export type LayerStackSceneProps = LayerStackSceneConfig;

/**
 * Template 3 — vertically stacked layers with dependency arrows. Best for
 * clean architecture, onion, hexagonal, OSI and N-tier explanations.
 */
export const LayerStackScene: React.FC<LayerStackSceneProps> = (props) => (
  <DiagramScene spec={buildLayerStackScene(props)} labels={sceneLabels(props.locale)} />
);

export default LayerStackScene;
