import type { CmsEnvelope } from '../domain/entities/CmsEntry';
import type { DiagramSceneRecord, DiagramSceneTemplate } from '../domain/entities/DiagramScene';
import { ALL_SCENES } from './diagramScenes';
import type {
  SceneEdge,
  SceneLocale,
  SceneMetric,
  SceneNode,
  SceneSize,
  SceneSpec,
  SceneStep,
  SceneTone,
} from '../domain/diagrams/sceneSpec';

interface LocalizedText {
  tr: string;
  en: string;
}

type LocalizedNode = Omit<SceneNode, 'label' | 'sublabel'> & {
  label: LocalizedText;
  sublabel?: LocalizedText;
};

type LocalizedEdge = Omit<SceneEdge, 'label'> & { label?: LocalizedText };

type LocalizedStep = Omit<SceneStep, 'title' | 'body' | 'tag'> & {
  title: LocalizedText;
  body: LocalizedText;
  tag?: LocalizedText;
};

type LocalizedMetric = Omit<SceneMetric, 'label' | 'value'> & {
  label: LocalizedText;
  value: string | number | LocalizedText;
};

interface LocalizedLegendItem {
  label: LocalizedText;
  tone: SceneTone;
}

interface LocalizedScene {
  id: string;
  title: LocalizedText;
  subtitle?: LocalizedText;
  canvas: SceneSize;
  nodes: LocalizedNode[];
  edges: LocalizedEdge[];
  steps: LocalizedStep[];
  metrics?: LocalizedMetric[];
  legend?: LocalizedLegendItem[];
}

const localize = <T extends string | number>(
  input: T | LocalizedText,
  locale: SceneLocale,
): T => (typeof input === 'object' ? (input[locale] as T) : input);

const localizeScene = (scene: LocalizedScene, locale: SceneLocale): SceneSpec => ({
  id: scene.id,
  title: scene.title[locale],
  subtitle: scene.subtitle?.[locale],
  canvas: scene.canvas,
  nodes: scene.nodes.map((node) => ({
    ...node,
    label: node.label[locale],
    sublabel: node.sublabel?.[locale],
  })),
  edges: scene.edges.map((edge) => ({
    ...edge,
    label: edge.label?.[locale],
  })),
  steps: scene.steps.map((step) => ({
    ...step,
    title: step.title[locale],
    body: step.body[locale],
    tag: step.tag?.[locale],
  })),
  metrics: scene.metrics?.map((metric) => ({
    ...metric,
    label: metric.label[locale],
    value: localize(metric.value, locale),
  })),
  legend: scene.legend?.map((item) => ({ label: item.label[locale], tone: item.tone })),
});

/* ------------------------------------------------------------------ */
/* cap-theorem: a partition forces a choice between CP and AP          */
/* ------------------------------------------------------------------ */

const CAP_NODES: LocalizedNode[] = [
  {
    id: 'eu',
    label: { tr: 'İstemci EU', en: 'Client EU' },
    kind: 'actor',
    icon: 'globe',
    tone: 'green',
    at: { x: 140, y: 86 },
    size: { w: 190, h: 62 },
    lifeline: true,
  },
  {
    id: 'us',
    label: { tr: 'İstemci US', en: 'Client US' },
    kind: 'actor',
    icon: 'globe',
    tone: 'green',
    at: { x: 366.7, y: 86 },
    size: { w: 190, h: 62 },
    lifeline: true,
  },
  {
    id: 'a',
    label: { tr: 'Düğüm A', en: 'Node A' },
    kind: 'actor',
    icon: 'server',
    tone: 'blue',
    at: { x: 593.3, y: 86 },
    size: { w: 190, h: 62 },
    lifeline: true,
  },
  {
    id: 'b',
    label: { tr: 'Düğüm B', en: 'Node B' },
    kind: 'actor',
    icon: 'server',
    tone: 'violet',
    at: { x: 820, y: 86 },
    size: { w: 190, h: 62 },
    lifeline: true,
  },
];

const CAP_EDGES: LocalizedEdge[] = [
  { id: 'seq-1', from: 'eu', to: 'a', label: { tr: 'write x = 1', en: 'write x = 1' }, route: 'sequence', lane: 186 },
  { id: 'seq-2', from: 'a', to: 'b', label: { tr: 'replicate x = 1', en: 'replicate x = 1' }, tone: 'violet', route: 'sequence', lane: 242 },
  { id: 'seq-3', from: 'a', to: 'b', label: { tr: 'link down', en: 'link down' }, tone: 'red', dashed: true, route: 'sequence', lane: 298 },
  { id: 'seq-4', from: 'us', to: 'b', label: { tr: 'read x', en: 'read x' }, tone: 'amber', route: 'sequence', lane: 354 },
  { id: 'seq-5', from: 'b', to: 'us', label: { tr: '503 unavailable', en: '503 unavailable' }, tone: 'red', dashed: true, route: 'sequence', lane: 410 },
  { id: 'seq-6', from: 'us', to: 'b', label: { tr: 'read x (AP)', en: 'read x (AP)' }, tone: 'amber', route: 'sequence', lane: 466 },
  { id: 'seq-7', from: 'b', to: 'us', label: { tr: 'x = 0 · stale', en: 'x = 0 · stale' }, tone: 'amber', dashed: true, route: 'sequence', lane: 522 },
];

const CAP_STEPS: LocalizedStep[] = [
  {
    id: 'intro',
    title: { tr: 'Önce sağlıklı hâl', en: 'Healthy first' },
    body: {
      tr: 'İki düğüm aynı veriyi görür, iki istemci de yanıt alır. CAP yalnızca ağ koptuğunda ilginçleşir.',
      en: 'Both nodes agree, both clients are served. CAP is only interesting when the network breaks.',
    },
    tag: { tr: 'Başlangıç', en: 'Baseline' },
    focus: ['eu', 'us', 'a', 'b'],
    events: [],
  },
  {
    id: 'step-1',
    title: { tr: 'write x = 1', en: 'write x = 1' },
    body: {
      tr: 'Yazma, istemciye en yakın düğüme gider.',
      en: 'The write lands on the node closest to the client.',
    },
    focus: ['eu', 'a', 'seq-1'],
    events: [{ type: 'packet', edge: 'seq-1' }],
  },
  {
    id: 'step-2',
    title: { tr: 'replicate x = 1', en: 'replicate x = 1' },
    body: {
      tr: 'İkinci kopyayı okunabilir yapan şey replikasyondur.',
      en: 'Replication is what makes the second copy readable.',
    },
    focus: ['a', 'b', 'seq-2'],
    events: [{ type: 'packet', edge: 'seq-2', tone: 'violet' }],
  },
  {
    id: 'step-3',
    title: { tr: 'link down', en: 'link down' },
    body: {
      tr: 'Ağ bölünmesi gerçektir: paketler gecikmez, düşer.',
      en: 'The network partition is real: packets are dropped, not delayed.',
    },
    tag: { tr: 'Arıza', en: 'Failure' },
    focus: ['a', 'b', 'seq-3'],
    events: [{ type: 'packet', edge: 'seq-3', tone: 'red' }],
  },
  {
    id: 'step-4',
    title: { tr: 'read x', en: 'read x' },
    body: {
      tr: 'CP: 503 dön. Düğüm eski değeri sunmak yerine reddeder.',
      en: 'CP: answer 503. The node refuses rather than serving a stale value.',
    },
    focus: ['us', 'b', 'seq-4'],
    events: [{ type: 'packet', edge: 'seq-4', tone: 'amber' }],
  },
  {
    id: 'step-5',
    title: { tr: '503 unavailable', en: '503 unavailable' },
    body: {
      tr: 'Erişilebilirlik feda edilir. İstemci yanıtın eksik olduğunu bilir, yanlış olduğunu değil.',
      en: 'Availability is sacrificed. The client knows the answer is missing, not wrong.',
    },
    focus: ['us', 'b', 'seq-5'],
    events: [{ type: 'packet', edge: 'seq-5', tone: 'red' }],
  },
  {
    id: 'step-6',
    title: { tr: 'read x (AP)', en: 'read x (AP)' },
    body: {
      tr: 'AP: aynı okuma artık B’nin bildiği son değeri döner.',
      en: 'AP: the same read now returns the last value B knows about.',
    },
    focus: ['us', 'b', 'seq-6'],
    events: [{ type: 'packet', edge: 'seq-6', tone: 'amber' }],
  },
  {
    id: 'step-7',
    title: { tr: 'x = 0 · stale', en: 'x = 0 · stale' },
    body: {
      tr: 'Erişilebilirlik kazanır, tutarlılık eventual olur. İstemci eski veriye tolerans göstermelidir.',
      en: 'Availability wins, consistency is eventual. The client must tolerate stale data.',
    },
    focus: ['us', 'b', 'seq-7'],
    events: [{ type: 'packet', edge: 'seq-7', tone: 'amber' }],
  },
];

const CAP_SCENE: LocalizedScene = {
  id: 'cap-theorem',
  title: { tr: 'Ağ kopması bir seçim zorunlu kılar', en: 'A partition forces a choice' },
  subtitle: {
    tr: 'İki istemci, iki düğüm, aralarında kopmuş tek bir bağ.',
    en: 'Two clients, two nodes, one broken link between them.',
  },
  canvas: { w: 960, h: 624 },
  nodes: CAP_NODES,
  edges: CAP_EDGES,
  steps: CAP_STEPS,
  metrics: [
    { id: 'mode', label: { tr: 'Seçim', en: 'Choice' }, value: 'CP / AP', tone: 'amber' },
    { id: 'loss', label: { tr: 'Mesaj kaybı', en: 'Message loss' }, value: { tr: 'yok', en: 'none' }, tone: 'green' },
  ],
  legend: [
    { label: { tr: 'istek', en: 'request' }, tone: 'blue' },
    { label: { tr: 'yanıt', en: 'response' }, tone: 'green' },
  ],
};

/* ------------------------------------------------------------------ */
/* robustness: circuit breaker state machine                          */
/* ------------------------------------------------------------------ */

const ROBUSTNESS_NODES: LocalizedNode[] = [
  {
    id: 'closed',
    label: { tr: 'Kapalı', en: 'Closed' },
    sublabel: { tr: 'trafik akar', en: 'traffic flows' },
    kind: 'state',
    icon: 'zap',
    tone: 'green',
    at: { x: 480, y: 100 },
  },
  {
    id: 'open',
    label: { tr: 'Açık', en: 'Open' },
    sublabel: { tr: 'hızlı düş', en: 'fail fast' },
    kind: 'state',
    icon: 'lock',
    tone: 'red',
    at: { x: 766, y: 385 },
  },
  {
    id: 'half',
    label: { tr: 'Yarı açık', en: 'Half-open' },
    sublabel: { tr: 'yoklama', en: 'probe' },
    kind: 'state',
    icon: 'shield',
    tone: 'amber',
    at: { x: 194, y: 385 },
  },
];

const ROBUSTNESS_EDGES: LocalizedEdge[] = [
  { id: 'transition-1', from: 'closed', to: 'open', label: { tr: 'hata eşiği', en: 'failure threshold' }, tone: 'red', curve: 40 },
  { id: 'transition-2', from: 'open', to: 'half', label: { tr: 'soğuma', en: 'cooldown' }, tone: 'amber', curve: 40 },
  { id: 'transition-3', from: 'half', to: 'closed', label: { tr: 'yoklama başarılı', en: 'probe ok' }, tone: 'green', curve: 40 },
  { id: 'transition-4', from: 'half', to: 'open', label: { tr: 'yoklama başarısız', en: 'probe fails' }, tone: 'red', dashed: true, curve: 40 },
];

const ROBUSTNESS_STEPS: LocalizedStep[] = [
  {
    id: 'state-step-1',
    title: { tr: 'Kapalı: normal trafik', en: 'Closed: normal traffic' },
    body: {
      tr: 'Her çağrı bağımlılığa gider. Hatalar kayan pencerede sayılır.',
      en: 'Every call goes to the dependency. Failures are counted in a rolling window.',
    },
    tag: { tr: 'Sağlıklı', en: 'Healthy' },
    focus: ['closed'],
    events: [
      { type: 'nodeBadge', node: 'closed', badge: 'aktif' },
      { type: 'nodeBadge', node: 'open' },
      { type: 'nodeBadge', node: 'half' },
    ],
  },
  {
    id: 'state-step-2',
    title: { tr: 'Sigortayı attır', en: 'Trip the breaker' },
    body: {
      tr: 'Eşik aşılınca devre açılır. Çağrılar ölü serviste kuyruğa girmek yerine anında düşer.',
      en: 'Above the threshold, the breaker opens. Calls fail immediately instead of queueing for a dead service.',
    },
    tag: { tr: 'Arıza', en: 'Failure' },
    focus: ['closed', 'open'],
    events: [{ type: 'packet', edge: 'transition-1', tone: 'red' }],
  },
  {
    id: 'state-step-3',
    title: { tr: 'Soğumaya bırak', en: 'Cool down' },
    body: {
      tr: 'Soğuma sonunda tek bir yoklama geçer. Sel değil, bir tane.',
      en: 'After the cooldown, one probe is allowed through. Not a flood — one.',
    },
    focus: ['open', 'half'],
    events: [{ type: 'packet', edge: 'transition-2', tone: 'amber' }],
  },
  {
    id: 'state-step-4',
    title: { tr: 'Yoklama karar verir', en: 'Probe decides' },
    body: {
      tr: 'Başarı devreyi kapatır. Hata, yeni bir soğuma için tekrar açar.',
      en: 'Success closes the circuit. Failure reopens it for another cooldown.',
    },
    tag: { tr: 'Kurtarma', en: 'Recovery' },
    focus: ['half', 'closed'],
    events: [{ type: 'packet', edge: 'transition-3', tone: 'green' }],
  },
];

const ROBUSTNESS_SCENE: LocalizedScene = {
  id: 'robustness',
  title: { tr: 'Devre kesici durumları', en: 'Circuit breaker states' },
  subtitle: {
    tr: 'Hızlı düş, soğu, bir kez yokla. Bozuk bağımlılık çağıranı da götürmemeli.',
    en: 'Fail fast, cool down, probe once. A broken dependency must not take the caller with it.',
  },
  canvas: { w: 960, h: 560 },
  nodes: ROBUSTNESS_NODES,
  edges: ROBUSTNESS_EDGES,
  steps: ROBUSTNESS_STEPS,
  metrics: [
    { id: 'threshold', label: { tr: 'Hata eşiği', en: 'Failure threshold' }, value: '5 / 10 s', tone: 'amber' },
    { id: 'cooldown', label: { tr: 'Soğuma', en: 'Cooldown' }, value: '30 s', tone: 'blue' },
  ],
  legend: [
    { label: { tr: 'durum', en: 'state' }, tone: 'blue' },
    { label: { tr: 'geçiş', en: 'transition' }, tone: 'green' },
  ],
};

/* ------------------------------------------------------------------ */

const SOURCES: { template: DiagramSceneTemplate; scene: LocalizedScene }[] = [
  { template: 'sequence', scene: CAP_SCENE },
  { template: 'state-machine', scene: ROBUSTNESS_SCENE },
];

const PILOT_SCENES: DiagramSceneRecord[] = SOURCES.map(({ template, scene }) => ({
  id: scene.id,
  template,
  specs: {
    tr: localizeScene(scene, 'tr'),
    en: localizeScene(scene, 'en'),
  },
}));

export const DIAGRAM_SCENES: DiagramSceneRecord[] = [...PILOT_SCENES, ...ALL_SCENES];

export const DIAGRAM_SCENES_ENVELOPE: CmsEnvelope<DiagramSceneRecord> = {
  collection: 'diagram-scenes',
  version: '1.0.0',
  updatedAt: '2026-11-17T00:00:00.000Z',
  items: DIAGRAM_SCENES,
};

export default DIAGRAM_SCENES_ENVELOPE;
