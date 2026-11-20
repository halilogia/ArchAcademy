import type {
  SceneIcon,
  SceneMetric,
  SceneSpec,
  SceneStep,
  SceneTone,
} from '../../../../../domain/diagrams/sceneSpec';
import type { SceneLocale } from '../labels';

export interface FanOutWorker {
  id: string;
  label: string;
  sublabel?: string;
  icon?: SceneIcon;
  tone?: SceneTone;
}

export interface FanOutSceneConfig {
  locale: SceneLocale;
  id?: string;
  title: string;
  subtitle?: string;
  hub: { label: string; sublabel?: string; icon?: SceneIcon; tone?: SceneTone };
  workers: FanOutWorker[];
  client: { label: string; count: string; sublabel?: string };
  strategyLabel?: string;
  metrics?: SceneMetric[];
  /** Replaces the generated teaching narrative. */
  steps?: SceneStep[];
}

const copy = (locale: SceneLocale) =>
  locale === 'tr'
    ? {
        topology: 'Topoloji',
        routing: 'Yönlendirme',
        failure: 'Arıza',
        failover: 'Devralma',
        hotTitle: 'Tek giriş kapısı',
        hotBody: (hub: string) =>
          `Her istek önce ${hub} üzerinden geçer. Bu katman olmadan istemcilerin tüm sunucuları tek tek tanıması gerekirdi.`,
        spreadTitle: 'Yükü dağıt',
        spreadBody: (strategy: string) =>
          `Dengeleyici ${strategy} kuralını uygular. Sağlıklı her düğüm payını alır; tek bir kuyruk sınırsız büyümez.`,
        failTitle: 'Bir düğüm düşüyor',
        failBody: (worker: string) =>
          `${worker} sağlık kontrolüne yanıt vermiyor. Dengeleyici yeni trafik göndermeden önce bunu fark etmeli.`,
        recoverTitle: 'Etrafından dolaş',
        recoverBody: 'Trafik kalan sağlıklı düğümlere yeniden dağıtılır. Kapasite düşer, ürün ayakta kalır.',
        recovered: 'devralındı',
        hot: 'sıcak',
        down: 'düşük',
      }
    : {
        topology: 'Topology',
        routing: 'Routing',
        failure: 'Failure',
        failover: 'Failover',
        hotTitle: 'One front door',
        hotBody: (hub: string) =>
          `Every request enters through ${hub} first. Without it, each client would need to know every server and failures would be invisible.`,
        spreadTitle: 'Spread the load',
        spreadBody: (strategy: string) =>
          `The balancer walks its list using ${strategy}. Every healthy node gets a turn, so no single queue grows without bound.`,
        failTitle: 'One node goes dark',
        failBody: (worker: string) =>
          `${worker} stops answering health checks. The balancer has to notice before it sends more traffic there.`,
        recoverTitle: 'Route around it',
        recoverBody: 'Traffic is re-sent to the remaining healthy nodes. Capacity drops, but the product stays up.',
        recovered: 'recovered',
        hot: 'hot',
        down: 'down',
      };

export function buildFanOutScene(config: FanOutSceneConfig): SceneSpec {
  const text = copy(config.locale);
  const width = 960;
  const height = 520;
  const workers = config.workers.slice(0, 4);
  const safeWorkers: FanOutWorker[] =
    workers.length > 0 ? workers : [{ id: 'worker-1', label: 'Node 1' }];

  const hubAt = { x: 390, y: height / 2 };
  const verticalGap = safeWorkers.length > 1 ? Math.min(140, 380 / (safeWorkers.length - 1)) : 0;
  const startY = height / 2 - ((safeWorkers.length - 1) * verticalGap) / 2;

  const nodes: SceneSpec['nodes'] = [
    {
      id: 'client-pool',
      label: config.client.label,
      sublabel: config.client.sublabel,
      count: config.client.count,
      kind: 'pool',
      icon: 'user',
      tone: 'green',
      at: { x: 165, y: 420 },
    },
    {
      id: 'hub',
      label: config.hub.label,
      sublabel: config.hub.sublabel,
      kind: 'hub',
      icon: config.hub.icon ?? 'network',
      tone: config.hub.tone ?? 'blue',
      at: hubAt,
    },
    ...safeWorkers.map((worker, index) => ({
      id: worker.id,
      label: worker.label,
      sublabel: worker.sublabel,
      kind: 'service' as const,
      icon: worker.icon ?? ('server' as const),
      tone: worker.tone,
      at: { x: 700, y: startY + index * verticalGap },
      load: 0,
      status: 'ok' as const,
    })),
  ];

  const edges: SceneSpec['edges'] = [
    { id: 'edge-client-hub', from: 'client-pool', to: 'hub', label: config.strategyLabel, tone: 'green' },
    ...safeWorkers.map((worker, index) => ({
      id: `edge-hub-${worker.id}`,
      from: 'hub',
      to: worker.id,
      curve: 0,
      label: index === 0 ? config.strategyLabel : undefined,
      tone: 'blue' as const,
    })),
  ];

  const metrics: SceneMetric[] = config.metrics ?? [
    { id: 'healthy', label: config.locale === 'tr' ? 'Sağlıklı düğüm' : 'Healthy nodes', value: `${safeWorkers.length} / ${safeWorkers.length}`, tone: 'green' },
    { id: 'p95', label: 'P95 latency', value: '42 ms', tone: 'blue' },
    { id: 'errors', label: config.locale === 'tr' ? 'Hata' : 'Errors', value: '0%', tone: 'slate' },
  ];

  const firstWorker = safeWorkers[0];
  const failingWorker = safeWorkers[1] ?? safeWorkers[0];
  const healthyAfter = safeWorkers.filter((worker) => worker.id !== failingWorker.id);
  const strategy = config.strategyLabel ?? (config.locale === 'tr' ? 'sıralı dağıtım' : 'round robin');

  const generated: SceneStep[] = [
    {
      id: 'front-door',
      title: text.hotTitle,
      body: text.hotBody(config.hub.label),
      tag: text.topology,
      focus: ['client-pool', 'hub', firstWorker.id, 'edge-client-hub', `edge-hub-${firstWorker.id}`],
      events: [
        { type: 'packet', edge: 'edge-client-hub' },
        { type: 'packet', edge: `edge-hub-${firstWorker.id}` },
        { type: 'nodeLoad', node: firstWorker.id, load: 94 },
        { type: 'nodeBadge', node: firstWorker.id, badge: text.hot },
        { type: 'metric', id: 'p95', value: '310 ms' },
      ],
    },
    {
      id: 'spread',
      title: text.spreadTitle,
      body: text.spreadBody(strategy),
      tag: text.routing,
      focus: ['hub', ...safeWorkers.map((worker) => worker.id)],
      events: [
        ...safeWorkers.map((worker) => ({ type: 'packet' as const, edge: `edge-hub-${worker.id}` })),
        ...safeWorkers.map((worker, index) => ({
          type: 'nodeLoad' as const,
          node: worker.id,
          load: [38, 34, 30, 28][index] ?? 30,
        })),
        ...safeWorkers.map((worker) => ({ type: 'nodeBadge' as const, node: worker.id })),
        { type: 'metric', id: 'p95', value: '90 ms' },
      ],
    },
    {
      id: 'health-fail',
      title: text.failTitle,
      body: text.failBody(failingWorker.label),
      tag: text.failure,
      focus: ['hub', failingWorker.id],
      events: [
        { type: 'nodeStatus', node: failingWorker.id, status: 'down' },
        { type: 'nodeLoad', node: failingWorker.id, load: 0 },
        { type: 'nodeBadge', node: failingWorker.id, badge: text.down },
        { type: 'metric', id: 'healthy', value: `${healthyAfter.length} / ${safeWorkers.length}` },
        { type: 'metric', id: 'errors', value: '4%' },
      ],
    },
    {
      id: 'failover',
      title: text.recoverTitle,
      body: text.recoverBody,
      tag: text.failover,
      focus: ['hub', ...healthyAfter.map((worker) => worker.id)],
      events: [
        ...healthyAfter.map((worker) => ({ type: 'packet' as const, edge: `edge-hub-${worker.id}` })),
        ...healthyAfter.map((worker, index) => ({
          type: 'nodeLoad' as const,
          node: worker.id,
          load: healthyAfter.length === 1 ? 72 : 52 - index * 6,
        })),
        ...healthyAfter.map((worker) => ({ type: 'nodeBadge' as const, node: worker.id, badge: text.recovered })),
        { type: 'metric', id: 'errors', value: '0%' },
        { type: 'metric', id: 'p95', value: '140 ms' },
      ],
    },
  ];

  return {
    id: config.id ?? 'fan-out',
    title: config.title,
    subtitle: config.subtitle,
    canvas: { w: width, h: height },
    nodes,
    edges,
    steps: config.steps ?? generated,
    metrics,
    legend: [
      { label: config.locale === 'tr' ? 'istek' : 'request', tone: 'green' },
      { label: config.strategyLabel ?? (config.locale === 'tr' ? 'yönlendirme' : 'routing'), tone: 'blue' },
      { label: config.locale === 'tr' ? 'arıza' : 'failure', tone: 'red' },
    ],
  };
}
