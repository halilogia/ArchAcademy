export type SandboxNodeKind =
  | 'client'
  | 'cdn'
  | 'loadBalancer'
  | 'gateway'
  | 'service'
  | 'container'
  | 'function'
  | 'queue'
  | 'worker'
  | 'db'
  | 'cache'
  | 'objectStore'
  | 'search';

export type SandboxNodeLayer = 'edge' | 'application' | 'integration' | 'data';

export interface SandboxNode {
  id: string;
  kind: SandboxNodeKind;
  label: string;
  x: number;
  y: number;
  replicas: number;
  technology: string;
}

export interface SandboxEdge {
  id: string;
  from: string;
  to: string;
  protocol: string;
}

export interface SandboxDesign {
  id: string;
  name: string;
  nodes: SandboxNode[];
  edges: SandboxEdge[];
  updatedAt: string;
}

export interface SandboxCatalogEntry {
  kind: SandboxNodeKind;
  layer: SandboxNodeLayer;
  color: string;
  name: { tr: string; en: string };
  role: { tr: string; en: string };
  defaultLabel: string;
  defaultReplicas: number;
  stateless: boolean;
}

export const SANDBOX_CATALOG: SandboxCatalogEntry[] = [
  {
    kind: 'client',
    layer: 'edge',
    color: '#38bdf8',
    name: { tr: 'İstemci', en: 'Client' },
    role: { tr: 'Web, mobil veya masaüstü arayüzü.', en: 'Web, mobile or desktop front end.' },
    defaultLabel: 'Client App',
    defaultReplicas: 1,
    stateless: true
  },
  {
    kind: 'cdn',
    layer: 'edge',
    color: '#22d3ee',
    name: { tr: 'CDN', en: 'CDN' },
    role: { tr: 'Statik varlıkları ve TLS sonlandırmasını dağıtır.', en: 'Distributes static assets and terminates TLS.' },
    defaultLabel: 'CDN Edge',
    defaultReplicas: 1,
    stateless: true
  },
  {
    kind: 'loadBalancer',
    layer: 'edge',
    color: '#6366f1',
    name: { tr: 'Yük Dengeleyici', en: 'Load Balancer' },
    role: { tr: 'Trafiği örnekler arasında dağıtır (tek hata noktası adayı).', en: 'Spreads traffic across instances (single point of failure candidate).' },
    defaultLabel: 'Load Balancer',
    defaultReplicas: 2,
    stateless: true
  },
  {
    kind: 'gateway',
    layer: 'edge',
    color: '#818cf8',
    name: { tr: 'API Gateway', en: 'API Gateway' },
    role: { tr: 'Kimlik doğrulama, kotalama ve yönlendirme katmanı.', en: 'Authentication, throttling and routing layer.' },
    defaultLabel: 'API Gateway',
    defaultReplicas: 2,
    stateless: true
  },
  {
    kind: 'service',
    layer: 'application',
    color: '#3b82f6',
    name: { tr: 'Mikroservis', en: 'Microservice' },
    role: { tr: 'Bounded context içinde iş mantığı.', en: 'Business logic inside a bounded context.' },
    defaultLabel: 'Core Service',
    defaultReplicas: 2,
    stateless: true
  },
  {
    kind: 'container',
    layer: 'application',
    color: '#2563eb',
    name: { tr: 'Container / Pod', en: 'Container / Pod' },
    role: { tr: 'Kubernetes üzerinde paketlenmiş çalışma birimi.', en: 'Packaged workload running on Kubernetes.' },
    defaultLabel: 'K8s Workload',
    defaultReplicas: 3,
    stateless: true
  },
  {
    kind: 'function',
    layer: 'application',
    color: '#0ea5e9',
    name: { tr: 'Serverless Fonksiyon', en: 'Serverless Function' },
    role: { tr: 'Olay tetikli, ölçeklenen FaaS işleyicisi.', en: 'Event triggered, auto-scaling FaaS handler.' },
    defaultLabel: 'FaaS Handler',
    defaultReplicas: 2,
    stateless: true
  },
  {
    kind: 'queue',
    layer: 'integration',
    color: '#f59e0b',
    name: { tr: 'Mesaj Kuyruğu', en: 'Message Queue' },
    role: { tr: 'Kafka/RabbitMQ gibi tampon ve olay ayrıştırıcı.', en: 'Kafka/RabbitMQ style buffer and event decoupler.' },
    defaultLabel: 'Event Broker',
    defaultReplicas: 3,
    stateless: false
  },
  {
    kind: 'worker',
    layer: 'integration',
    color: '#fb923c',
    name: { tr: 'Tüketici / Worker', en: 'Consumer / Worker' },
    role: { tr: 'Kuyruktan olay çekip işleyen servis.', en: 'Consumes and processes events from the queue.' },
    defaultLabel: 'Event Worker',
    defaultReplicas: 2,
    stateless: true
  },
  {
    kind: 'db',
    layer: 'data',
    color: '#10b981',
    name: { tr: 'İlişkisel Veritabanı', en: 'Relational Database' },
    role: { tr: 'ACID kaynak of truth; genelde birincil-ikincil ile çoğaltılır.', en: 'ACID source of truth; usually replicated primary-secondary.' },
    defaultLabel: 'PostgreSQL',
    defaultReplicas: 2,
    stateless: false
  },
  {
    kind: 'cache',
    layer: 'data',
    color: '#84cc16',
    name: { tr: 'Önbellek', en: 'Cache' },
    role: { tr: 'Redis/Memcached ile okuma yükünü düşürür.', en: 'Redis/Memcached to offload read traffic.' },
    defaultLabel: 'Redis Cache',
    defaultReplicas: 2,
    stateless: false
  },
  {
    kind: 'objectStore',
    layer: 'data',
    color: '#a855f7',
    name: { tr: 'Nesne Deposu', en: 'Object Store' },
    role: { tr: 'S3/GCS üzerinde genişletilebilir dosya deposu.', en: 'S3/GCS backed, horizontally scalable blob storage.' },
    defaultLabel: 'Object Storage',
    defaultReplicas: 1,
    stateless: true
  },
  {
    kind: 'search',
    layer: 'data',
    color: '#e879f9',
    name: { tr: 'Arama Motoru', en: 'Search Engine' },
    role: { tr: 'Ters indeks ve ileri hızlı arama sorguları.', en: 'Inverted index and forward fast queries.' },
    defaultLabel: 'Search Cluster',
    defaultReplicas: 3,
    stateless: false
  }
];

export const SANDBOX_KIND_INDEX: Record<SandboxNodeKind, SandboxCatalogEntry> =
  SANDBOX_CATALOG.reduce((accumulator, entry) => {
    accumulator[entry.kind] = entry;
    return accumulator;
  }, {} as Record<SandboxNodeKind, SandboxCatalogEntry>);

export const isSandboxNodeKind = (value: string): value is SandboxNodeKind =>
  Object.prototype.hasOwnProperty.call(SANDBOX_KIND_INDEX, value);

export const emptyDesign = (id: string, name: string, at: string): SandboxDesign => ({
  id,
  name,
  nodes: [],
  edges: [],
  updatedAt: at
});
