import React from 'react';
import type { PipelineSceneConfig } from './builders/pipeline';
import { buildPipelineScene } from './builders/pipeline';
import { DiagramScene } from '../DiagramScene';
import { sceneLabels } from './labels';

export type PipelineSceneProps = PipelineSceneConfig;

/**
 * Template 4 — left-to-right stages with one active step at a time. Best for
 * CI/CD, event sourcing, ingestion, build pipelines and request paths.
 */
export const PipelineScene: React.FC<PipelineSceneProps> = (props) => (
  <DiagramScene spec={buildPipelineScene(props)} labels={sceneLabels(props.locale)} />
);

export default PipelineScene;
