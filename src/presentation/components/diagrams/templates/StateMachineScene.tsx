import React from 'react';
import type { StateMachineSceneConfig } from './builders/stateMachine';
import { buildStateMachineScene } from './builders/stateMachine';
import { DiagramScene } from '../DiagramScene';
import { sceneLabels } from './labels';

export type StateMachineSceneProps = StateMachineSceneConfig;

/**
 * Template 5 — states on an ellipse with animated transitions. Best for
 * connection lifecycles, saga compensation, retries and protocol states.
 */
export const StateMachineScene: React.FC<StateMachineSceneProps> = (props) => (
  <DiagramScene spec={buildStateMachineScene(props)} labels={sceneLabels(props.locale)} />
);

export default StateMachineScene;
