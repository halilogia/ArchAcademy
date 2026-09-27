import { create } from 'zustand';
import {
  SANDBOX_CATALOG,
  SANDBOX_KIND_INDEX,
  SandboxDesign,
  SandboxEdge,
  SandboxNode,
  SandboxNodeKind,
  isSandboxNodeKind
} from '../../domain/entities/Sandbox';

const CANVAS_WIDTH = 1180;
const CANVAS_HEIGHT = 620;
const HISTORY_LIMIT = 40;
const DEFAULT_PROTOCOL = 'HTTPS';

export const NODE_WIDTH = 148;
export const NODE_HEIGHT = 64;
export const SANDBOX_DRAG_TYPE = 'application/x-archacademy-sandbox-node';

let idCounter = 0;
const nextId = (prefix: string): string => {
  idCounter += 1;
  return `${prefix}-${idCounter.toString(36)}-${Math.floor(performance.now() % 100000).toString(36)}`;
};

const clamp = (value: number, min: number, max: number): number => Math.min(Math.max(value, min), max);

const createNode = (kind: SandboxNodeKind, x: number, y: number, index: number): SandboxNode => {
  const entry = SANDBOX_KIND_INDEX[kind];
  return {
    id: nextId('node'),
    kind,
    label: index === 0 ? entry.defaultLabel : `${entry.defaultLabel} ${index}`,
    x: clamp(x, 0, CANVAS_WIDTH - NODE_WIDTH),
    y: clamp(y, 0, CANVAS_HEIGHT - NODE_HEIGHT),
    replicas: entry.defaultReplicas,
    technology: entry.defaultLabel
  };
};

interface Snapshot {
  nodes: SandboxNode[];
  edges: SandboxEdge[];
}

export interface SandboxStore {
  designId: string;
  name: string;
  nodes: SandboxNode[];
  edges: SandboxEdge[];
  selectedNodeId: string | null;
  linkingFromId: string | null;
  past: Snapshot[];
  future: Snapshot[];
  setName: (name: string) => void;
  addNode: (kind: SandboxNodeKind, x: number, y: number) => void;
  addNodeAtCenter: (kind: SandboxNodeKind) => void;
  moveNode: (id: string, x: number, y: number) => void;
  updateNode: (id: string, patch: Partial<Omit<SandboxNode, 'id' | 'kind'>>) => void;
  removeNode: (id: string) => void;
  select: (id: string | null) => void;
  startLinking: (id: string) => void;
  finishLinking: (toId: string) => void;
  cancelLinking: () => void;
  updateEdge: (id: string, patch: Partial<Omit<SandboxEdge, 'id' | 'from' | 'to'>>) => void;
  removeEdge: (id: string) => void;
  clear: () => void;
  load: (design: SandboxDesign) => void;
  snapshot: () => SandboxDesign;
  undo: () => void;
  redo: () => void;
  canUndo: () => boolean;
  canRedo: () => boolean;
  canvas: { width: number; height: number };
}

const pushHistory = (past: Snapshot[], nodes: SandboxNode[], edges: SandboxEdge[]): Snapshot[] =>
  [...past, { nodes, edges }].slice(-HISTORY_LIMIT);

const seedNodes = (): SandboxNode[] => [
  createNode('client', 60, 240, 0),
  createNode('loadBalancer', 300, 240, 0),
  createNode('service', 560, 150, 0),
  createNode('cache', 560, 360, 0),
  createNode('queue', 820, 240, 0),
  createNode('db', 1030, 150, 0)
];

const seedEdges = (nodes: SandboxNode[]): SandboxEdge[] => {
  const [client, balancer, service, cache, queue, db] = nodes;
  if (!client || !balancer || !service || !cache || !queue || !db) return [];
  const link = (from: string, to: string, protocol = DEFAULT_PROTOCOL): SandboxEdge => ({
    id: nextId('edge'),
    from,
    to,
    protocol
  });
  return [
    link(client.id, balancer.id),
    link(balancer.id, service.id),
    link(service.id, cache.id, 'RESP'),
    link(service.id, queue.id, 'AMQP'),
    link(queue.id, db.id, 'JDBC')
  ];
};

const initialNodes = seedNodes();

export const useSandboxStore = create<SandboxStore>((set, get) => ({
  designId: nextId('design'),
  name: 'Checkout Platform',
  nodes: initialNodes,
  edges: seedEdges(initialNodes),
  selectedNodeId: null,
  linkingFromId: null,
  past: [],
  future: [],
  canvas: { width: CANVAS_WIDTH, height: CANVAS_HEIGHT },

  setName: (name) => set({ name }),

  addNode: (kind, x, y) => {
    if (!isSandboxNodeKind(kind)) return;
    const { nodes, edges, past } = get();
    const sameKind = nodes.filter((node) => node.kind === kind).length;
    const node = createNode(kind, x, y, sameKind);
    set({
      nodes: [...nodes, node],
      past: pushHistory(past, nodes, edges),
      future: [],
      selectedNodeId: node.id
    });
  },

  addNodeAtCenter: (kind) => {
    const { canvas } = get();
    get().addNode(kind, canvas.width / 2 - NODE_WIDTH / 2, canvas.height / 2 - NODE_HEIGHT / 2);
  },

  moveNode: (id, x, y) =>
    set((state) => ({
      nodes: state.nodes.map((node) =>
        node.id === id
          ? {
              ...node,
              x: clamp(x, 0, CANVAS_WIDTH - NODE_WIDTH),
              y: clamp(y, 0, CANVAS_HEIGHT - NODE_HEIGHT)
            }
          : node
      )
    })),

  updateNode: (id, patch) => {
    const { nodes, edges, past } = get();
    set({
      nodes: nodes.map((node) => (node.id === id ? { ...node, ...patch } : node)),
      past: pushHistory(past, nodes, edges),
      future: []
    });
  },

  removeNode: (id) => {
    const { nodes, edges, past, selectedNodeId, linkingFromId } = get();
    set({
      nodes: nodes.filter((node) => node.id !== id),
      edges: edges.filter((edge) => edge.from !== id && edge.to !== id),
      past: pushHistory(past, nodes, edges),
      future: [],
      selectedNodeId: selectedNodeId === id ? null : selectedNodeId,
      linkingFromId: linkingFromId === id ? null : linkingFromId
    });
  },

  select: (id) => set({ selectedNodeId: id }),

  startLinking: (id) => set({ linkingFromId: id, selectedNodeId: id }),

  cancelLinking: () => set({ linkingFromId: null }),

  finishLinking: (toId) => {
    const { linkingFromId, nodes, edges, past } = get();
    if (!linkingFromId || linkingFromId === toId) {
      set({ linkingFromId: null });
      return;
    }
    const exists = edges.some((edge) => edge.from === linkingFromId && edge.to === toId);
    if (exists) {
      set({ linkingFromId: null });
      return;
    }
    const source = nodes.find((node) => node.id === linkingFromId);
    const target = nodes.find((node) => node.id === toId);
    const edge: SandboxEdge = {
      id: nextId('edge'),
      from: linkingFromId,
      to: toId,
      protocol:
        source && target && ['db', 'cache', 'objectStore', 'search'].includes(target.kind)
          ? target.kind === 'cache'
            ? 'RESP'
            : 'SQL'
          : source?.kind === 'queue'
            ? 'AMQP'
            : DEFAULT_PROTOCOL
    };
    set({
      edges: [...edges, edge],
      past: pushHistory(past, nodes, edges),
      future: [],
      linkingFromId: null
    });
  },

  updateEdge: (id, patch) => {
    const { nodes, edges, past } = get();
    set({
      edges: edges.map((edge) => (edge.id === id ? { ...edge, ...patch } : edge)),
      past: pushHistory(past, nodes, edges),
      future: []
    });
  },

  removeEdge: (id) => {
    const { nodes, edges, past } = get();
    set({
      edges: edges.filter((edge) => edge.id !== id),
      past: pushHistory(past, nodes, edges),
      future: []
    });
  },

  clear: () => {
    const { nodes, edges, past } = get();
    set({
      nodes: [],
      edges: [],
      past: pushHistory(past, nodes, edges),
      future: [],
      selectedNodeId: null,
      linkingFromId: null
    });
  },

  load: (design) =>
    set({
      designId: design.id,
      name: design.name,
      nodes: design.nodes,
      edges: design.edges,
      selectedNodeId: null,
      linkingFromId: null,
      past: [],
      future: []
    }),

  snapshot: () => ({
    id: get().designId,
    name: get().name,
    nodes: get().nodes,
    edges: get().edges,
    updatedAt: new Date().toISOString()
  }),

  undo: () => {
    const { past, nodes, edges, future } = get();
    const previous = past[past.length - 1];
    if (!previous) return;
    set({
      nodes: previous.nodes,
      edges: previous.edges,
      past: past.slice(0, -1),
      future: [{ nodes, edges }, ...future].slice(0, HISTORY_LIMIT),
      selectedNodeId: null,
      linkingFromId: null
    });
  },

  redo: () => {
    const { past, nodes, edges, future } = get();
    const next = future[0];
    if (!next) return;
    set({
      nodes: next.nodes,
      edges: next.edges,
      past: pushHistory(past, nodes, edges),
      future: future.slice(1),
      selectedNodeId: null,
      linkingFromId: null
    });
  },

  canUndo: () => get().past.length > 0,
  canRedo: () => get().future.length > 0
}));

export const sandboxCatalog = SANDBOX_CATALOG;
