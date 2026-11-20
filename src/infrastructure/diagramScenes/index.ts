import { AI_SCENES } from './aiScenes';
import { BROKER_SCENES } from './brokerScene';
import { CLEAN_ARCH_SCENES } from './cleanArchScene';
import { CONTAINERIZATION_SCENES } from './containerizationScene';
import { CQRS_SCENES } from './cqrsScene';
import { EVENT_SOURCING_SCENES } from './eventSourcingScene';
import { FSD_SCENES } from './fsdScene';
import { GITOPS_SCENES } from './gitOpsScene';
import { HEXAGONAL_SCENES } from './hexagonalScene';
import { LAMBDA_KAPPA_SCENES } from './lambdaKappaScene';
import { MESSAGING_SCENES } from './messagingScenes';
import { MICROSERVICES_SCENES } from './microservicesScene';
import { ONION_SCENES } from './onionScene';
import { OPS_SCENES } from './opsScenes';
import { PLATFORM_SCENES } from './platformScenes';
import { PRINCIPLES_SCENES } from './principlesScenes';
import { PUB_SUB_SCENES } from './pubSubScene';
import { SECURITY_SCENES } from './securityScene';
import { TESTING_SCENES } from './testingScenes';
import { TOPOLOGY_SCENES } from './topologyScenes';
import { UI_PATTERN_SCENES } from './uiPatternScenes';
import { VIPER_SCENES } from './viperScene';

export const ALL_SCENES = [
  ...AI_SCENES,
  ...BROKER_SCENES,
  ...CLEAN_ARCH_SCENES,
  ...CONTAINERIZATION_SCENES,
  ...CQRS_SCENES,
  ...EVENT_SOURCING_SCENES,
  ...FSD_SCENES,
  ...GITOPS_SCENES,
  ...HEXAGONAL_SCENES,
  ...LAMBDA_KAPPA_SCENES,
  ...MESSAGING_SCENES,
  ...MICROSERVICES_SCENES,
  ...ONION_SCENES,
  ...OPS_SCENES,
  ...PLATFORM_SCENES,
  ...PRINCIPLES_SCENES,
  ...PUB_SUB_SCENES,
  ...SECURITY_SCENES,
  ...TESTING_SCENES,
  ...TOPOLOGY_SCENES,
  ...UI_PATTERN_SCENES,
  ...VIPER_SCENES,
];

export default ALL_SCENES;
