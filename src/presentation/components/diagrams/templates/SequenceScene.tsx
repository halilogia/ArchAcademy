import React from 'react';
import type { SequenceSceneConfig } from './builders/sequence';
import { buildSequenceScene } from './builders/sequence';
import { DiagramScene } from '../DiagramScene';
import { sceneLabels } from './labels';

export type SequenceSceneProps = SequenceSceneConfig;

/**
 * Template 2 — actor lifelines with ordered messages. Best for request
 * lifecycles, transactions, OAuth, sagas and protocol handshakes.
 */
export const SequenceScene: React.FC<SequenceSceneProps> = (props) => (
  <DiagramScene spec={buildSequenceScene(props)} labels={sceneLabels(props.locale)} />
);

export default SequenceScene;
