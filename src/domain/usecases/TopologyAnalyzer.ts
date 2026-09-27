import { SANDBOX_KIND_INDEX, SandboxDesign, SandboxEdge, SandboxNode } from '../entities/Sandbox';

export type IssueSeverity = 'critical' | 'warning' | 'info';

export interface TopologyIssue {
  id: string;
  severity: IssueSeverity;
  title: { tr: string; en: string };
  detail: { tr: string; en: string };
  nodeIds: string[];
}

const inbound = (edges: SandboxEdge[], nodeId: string): SandboxEdge[] =>
  edges.filter((edge) => edge.to === nodeId);

const outbound = (edges: SandboxEdge[], nodeId: string): SandboxEdge[] =>
  edges.filter((edge) => edge.from === nodeId);

const detectCycles = (nodes: SandboxNode[], edges: SandboxEdge[]): string[][] => {
  const adjacency = new Map<string, string[]>();
  nodes.forEach((node) => adjacency.set(node.id, []));
  edges.forEach((edge) => adjacency.get(edge.from)?.push(edge.to));

  const state = new Map<string, 0 | 1 | 2>();
  const stack: string[] = [];
  const cycles: string[][] = [];

  const visit = (id: string) => {
    state.set(id, 1);
    stack.push(id);
    const next = adjacency.get(id) ?? [];
    for (const target of next) {
      const current = state.get(target) ?? 0;
      if (current === 0) {
        visit(target);
      } else if (current === 1) {
        const start = stack.indexOf(target);
        if (start >= 0) cycles.push([...stack.slice(start), target]);
      }
    }
    stack.pop();
    state.set(id, 2);
  };

  nodes.forEach((node) => {
    if ((state.get(node.id) ?? 0) === 0) visit(node.id);
  });

  return cycles;
};

export const analyzeTopology = (design: Pick<SandboxDesign, 'nodes' | 'edges'>): TopologyIssue[] => {
  const { nodes, edges } = design;
  const issues: TopologyIssue[] = [];

  if (nodes.length === 0) {
    return [
      {
        id: 'empty-canvas',
        severity: 'info',
        title: { tr: 'Tuval boş', en: 'Empty canvas' },
        detail: {
          tr: 'Soldaki paletten bileşen sürükleyerek sisteminizi modellemeye başlayın.',
          en: 'Drag a component from the left palette to start modeling your system.'
        },
        nodeIds: []
      }
    ];
  }

  const byKind = (kind: string) => nodes.filter((node) => node.kind === kind);
  const clients = byKind('client');
  const loadBalancers = [...byKind('loadBalancer'), ...byKind('gateway')];
  const apis = [...byKind('service'), ...byKind('container'), ...byKind('function')];
  const databases = [...byKind('db'), ...byKind('objectStore'), ...byKind('search')];
  const queues = byKind('queue');
  const caches = byKind('cache');

  if (apis.length >= 2 && loadBalancers.length === 0) {
    issues.push({
      id: 'missing-load-balancer',
      severity: 'warning',
      title: { tr: 'Yük dengeleyici yok', en: 'No load balancer' },
      detail: {
        tr: `${apis.length} servis doğrudan internet'e açık. Tek bir hata noktası ve yatay ölçekleme darboğazı oluşur.`,
        en: `${apis.length} services are exposed directly. That creates a single point of failure and blocks horizontal scaling.`
      },
      nodeIds: apis.map((node) => node.id)
    });
  }

  const singletonCritical = nodes.filter(
    (node) => ['service', 'container', 'db', 'queue', 'loadBalancer', 'gateway'].includes(node.kind) && node.replicas < 2
  );
  if (singletonCritical.length > 0) {
    issues.push({
      id: 'single-replica',
      severity: 'critical',
      title: { tr: 'Tek kopyalı kritik bileşen', en: 'Single-replica critical component' },
      detail: {
        tr: `${singletonCritical.map((node) => node.label).join(', ')} yalnızca 1 kopya ile çalışıyor. En az 2 kopya ve çapraz bölge dağılımı hedefleyin.`,
        en: `${singletonCritical.map((node) => node.label).join(', ')} run with a single replica. Target at least 2 replicas across zones.`
      },
      nodeIds: singletonCritical.map((node) => node.id)
    });
  }

  const exposedDatabases = databases.filter((node) =>
    inbound(edges, node.id).some((edge) => {
      const source = nodes.find((candidate) => candidate.id === edge.from);
      return source?.kind === 'client';
    })
  );
  if (exposedDatabases.length > 0) {
    issues.push({
      id: 'database-exposed',
      severity: 'critical',
      title: { tr: 'Veritabanı istemciye açık', en: 'Database reachable from the client' },
      detail: {
        tr: `${exposedDatabases.map((node) => node.label).join(', ')} doğrudan istemciden bağalıyor. Kimlik doğrulama, ağ izolasyonu ve API katmanı zorunludur.`,
        en: `${exposedDatabases.map((node) => node.label).join(', ')} accept direct client traffic. Authentication, network isolation and an API tier are mandatory.`
      },
      nodeIds: exposedDatabases.map((node) => node.id)
    });
  }

  if (apis.length >= 1 && caches.length === 0 && databases.length > 0) {
    issues.push({
      id: 'missing-cache',
      severity: 'info',
      title: { tr: 'Önbellek katmanı yok', en: 'No cache layer' },
      detail: {
        tr: 'Tüm okuma trafiği doğrudan veritabanına gidiyor. Okuma yükünü düşürmek için bir cache ekleyin.',
        en: 'All read traffic hits the database directly. Add a cache layer to offload read pressure.'
      },
      nodeIds: databases.map((node) => node.id)
    });
  }

  const orphanedQueues = queues.filter(
    (queue) => outbound(edges, queue.id).length === 0 || inbound(edges, queue.id).length === 0
  );
  if (orphanedQueues.length > 0) {
    issues.push({
      id: 'queue-without-consumer',
      severity: 'warning',
      title: { tr: 'Tüketici olmayan kuyruk', en: 'Queue without a consumer' },
      detail: {
        tr: `${orphanedQueues.map((node) => node.label).join(', ')} üreten ya da tüketen bir bileşen yok. Olaylar birikir ve sistem yavaşlar.`,
        en: `${orphanedQueues.map((node) => node.label).join(', ')} has no producer or no consumer. Events pile up and the system degrades.`
      },
      nodeIds: orphanedQueues.map((node) => node.id)
    });
  }

  const cycles = detectCycles(nodes, edges);
  if (cycles.length > 0) {
    issues.push({
      id: 'cyclic-dependency',
      severity: 'critical',
      title: { tr: 'Döngüsel bağımlılık', en: 'Cyclic dependency' },
      detail: {
        tr: `İstek akışı kendi üzerine dönüyor: ${cycles[0].join(' → ')}. Sonsuz döngü ve deadlock riski.`,
        en: `The request flow loops back into itself: ${cycles[0].join(' → ')}. Risk of infinite loops and deadlocks.`
      },
      nodeIds: [...new Set(cycles[0])]
    });
  }

  if (databases.length === 0) {
    issues.push({
      id: 'no-persistence',
      severity: 'warning',
      title: { tr: 'Kalıcı veri katmanı yok', en: 'No persistence layer' },
      detail: {
        tr: 'Tasarımda bir veritabanı, nesne deposu veya arama motoru bulunmuyor. Durum nerede saklanıyor?',
        en: 'The design has no database, object store or search engine. Where does state live?'
      },
      nodeIds: []
    });
  }

  const unusedApis = apis.filter(
    (api) => inbound(edges, api.id).length === 0 && clients.length > 0
  );
  if (unusedApis.length > 0) {
    issues.push({
      id: 'unreachable-service',
      severity: 'info',
      title: { tr: 'Erişilemeyen servis', en: 'Unreachable service' },
      detail: {
        tr: `${unusedApis.map((node) => node.label).join(', ')} için hiçbir gelen bağlantı yok. Topoloji tamamlanmamış olabilir.`,
        en: `${unusedApis.map((node) => node.label).join(', ')} have no inbound connection. The topology is likely incomplete.`
      },
      nodeIds: unusedApis.map((node) => node.id)
    });
  }

  const weight = { critical: 0, warning: 0, info: 0 } as Record<IssueSeverity, number>;
  issues.forEach((issue) => {
    weight[issue.severity] += 1;
  });

  return issues;
};

export const topologyScore = (issues: TopologyIssue[]): number => {
  const penalty =
    issues.filter((issue) => issue.severity === 'critical').length * 20 +
    issues.filter((issue) => issue.severity === 'warning').length * 8 +
    issues.filter((issue) => issue.severity === 'info').length * 3;
  return Math.max(0, 100 - penalty);
};

export const inventoryRows = (design: Pick<SandboxDesign, 'nodes'>): { kind: string; label: string; count: number }[] => {
  const grouped = new Map<string, { kind: string; label: string; count: number }>();
  design.nodes.forEach((node) => {
    const entry = SANDBOX_KIND_INDEX[node.kind];
    const label = entry ? (entry.name.en) : node.kind;
    const current = grouped.get(node.kind);
    if (current) {
      current.count += 1;
      return;
    }
    grouped.set(node.kind, { kind: node.kind, label, count: 1 });
  });
  return [...grouped.values()];
};
