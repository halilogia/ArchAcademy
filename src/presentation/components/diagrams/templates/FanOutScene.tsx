import React from 'react';
import type { FanOutSceneConfig } from './builders/fanOut';
import { buildFanOutScene } from './builders/fanOut';
import { DiagramScene } from '../DiagramScene';
import { sceneLabels } from './labels';

export type FanOutSceneProps = FanOutSceneConfig;

/**
 * Template 1 — one hub, many nodes, a client pool. Best for load balancing,
 * brokers, gateways, replication fan-out and any "one front door" lesson.
 */
export const FanOutScene: React.FC<FanOutSceneProps> = (props) => (
  <DiagramScene spec={buildFanOutScene(props)} labels={sceneLabels(props.locale)} />
);

export default FanOutScene;
