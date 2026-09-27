import React, { useCallback, useRef, useState } from 'react';
import { Trash2, Link2 } from 'lucide-react';
import { SANDBOX_KIND_INDEX, SandboxNode, isSandboxNodeKind } from '../../../domain/entities/Sandbox';
import {
  NODE_HEIGHT,
  NODE_WIDTH,
  SANDBOX_DRAG_TYPE,
  useSandboxStore
} from '../../../infrastructure/stores/sandboxStore';

interface DragState {
  id: string;
  offsetX: number;
  offsetY: number;
  moved: boolean;
}

export interface SandboxCanvasProps {
  isEn: boolean;
}

export const SandboxCanvas: React.FC<SandboxCanvasProps> = ({ isEn }) => {
  const nodes = useSandboxStore((state) => state.nodes);
  const edges = useSandboxStore((state) => state.edges);
  const selectedNodeId = useSandboxStore((state) => state.selectedNodeId);
  const linkingFromId = useSandboxStore((state) => state.linkingFromId);
  const canvas = useSandboxStore((state) => state.canvas);
  const addNode = useSandboxStore((state) => state.addNode);
  const moveNode = useSandboxStore((state) => state.moveNode);
  const removeNode = useSandboxStore((state) => state.removeNode);
  const select = useSandboxStore((state) => state.select);
  const startLinking = useSandboxStore((state) => state.startLinking);
  const finishLinking = useSandboxStore((state) => state.finishLinking);
  const cancelLinking = useSandboxStore((state) => state.cancelLinking);
  const removeEdge = useSandboxStore((state) => state.removeEdge);

  const surfaceRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<DragState | null>(null);
  const [isOver, setIsOver] = useState(false);

  const toCanvasPoint = useCallback(
    (clientX: number, clientY: number) => {
      const rect = surfaceRef.current?.getBoundingClientRect();
      if (!rect) return { x: 0, y: 0 };
      return { x: clientX - rect.left, y: clientY - rect.top };
    },
    []
  );

  const handlePointerMove = (event: React.PointerEvent) => {
    const drag = dragRef.current;
    if (!drag) return;
    const point = toCanvasPoint(event.clientX, event.clientY);
    drag.moved = true;
    moveNode(drag.id, point.x - drag.offsetX, point.y - drag.offsetY);
  };

  const handlePointerUp = () => {
    dragRef.current = null;
  };

  const beginDrag = (event: React.PointerEvent, node: SandboxNode) => {
    if (event.button !== 0) return;
    if (linkingFromId) {
      finishLinking(node.id);
      return;
    }
    const point = toCanvasPoint(event.clientX, event.clientY);
    dragRef.current = {
      id: node.id,
      offsetX: point.x - node.x,
      offsetY: point.y - node.y,
      moved: false
    };
    select(node.id);
    (event.target as HTMLElement).setPointerCapture?.(event.pointerId);
  };

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    setIsOver(false);
    const kind = event.dataTransfer.getData(SANDBOX_DRAG_TYPE);
    if (!isSandboxNodeKind(kind)) return;
    const point = toCanvasPoint(event.clientX, event.clientY);
    addNode(kind, point.x - NODE_WIDTH / 2, point.y - NODE_HEIGHT / 2);
  };

  const centerOf = (node: SandboxNode) => ({
    x: node.x + NODE_WIDTH / 2,
    y: node.y + NODE_HEIGHT / 2
  });

  const nodeById = (id: string): SandboxNode | undefined => nodes.find((node) => node.id === id);

  return (
    <div
      ref={surfaceRef}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
      onDragOver={(event) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'copy';
        setIsOver(true);
      }}
      onDragLeave={() => setIsOver(false)}
      onDrop={handleDrop}
      onClick={() => {
        select(null);
        cancelLinking();
      }}
      style={{
        position: 'relative',
        width: '100%',
        height: canvas.height,
        borderRadius: '20px',
        border: `1px solid ${isOver ? 'rgba(59,130,246,0.6)' : 'var(--glass-border)'}`,
        background: isOver
          ? 'radial-gradient(circle at 50% 40%, rgba(59,130,246,0.14), rgba(2,6,23,0.85))'
          : 'radial-gradient(circle at 50% 40%, rgba(30,41,59,0.55), rgba(2,6,23,0.9))',
        overflow: 'hidden',
        transition: 'border-color 0.2s ease, background 0.2s ease',
        touchAction: 'none'
      }}
      data-testid="sandbox-canvas"
      aria-label={isEn ? 'System design canvas' : 'Sistem tasarım tuvali'}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          opacity: 0.25,
          backgroundImage:
            'linear-gradient(rgba(148,163,184,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.12) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
          pointerEvents: 'none'
        }}
      />

      <svg
        width={canvas.width}
        height={canvas.height}
        style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
        aria-hidden="true"
      >
        <defs>
          <marker id="sandbox-arrow" markerWidth="9" markerHeight="9" refX="8" refY="4.5" orient="auto">
            <path d="M0,0 L9,4.5 L0,9 z" fill="rgba(148,163,184,0.75)" />
          </marker>
        </defs>
        {edges.map((edge) => {
          const from = nodeById(edge.from);
          const to = nodeById(edge.to);
          if (!from || !to) return null;
          const a = centerOf(from);
          const b = centerOf(to);
          return (
            <line
              key={edge.id}
              x1={a.x}
              y1={a.y}
              x2={b.x}
              y2={b.y}
              stroke="rgba(148,163,184,0.75)"
              strokeWidth={1.6}
              markerEnd="url(#sandbox-arrow)"
            />
          );
        })}
      </svg>

      {edges.map((edge) => {
        const from = nodeById(edge.from);
        const to = nodeById(edge.to);
        if (!from || !to) return null;
        const a = centerOf(from);
        const b = centerOf(to);
        return (
          <button
            key={`edge-${edge.id}`}
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              removeEdge(edge.id);
            }}
            title={isEn ? `Remove connection (${edge.protocol})` : `Bağlantıyı kaldır (${edge.protocol})`}
            aria-label={isEn ? `Remove connection ${edge.protocol}` : 'Bağlantıyı kaldır'}
            style={{
              position: 'absolute',
              left: (a.x + b.x) / 2 - 22,
              top: (a.y + b.y) / 2 - 9,
              height: 18,
              padding: '0 6px',
              borderRadius: '9px',
              border: '1px solid rgba(148,163,184,0.35)',
              background: 'rgba(15,23,42,0.95)',
              color: '#94a3b8',
              fontSize: '0.58rem',
              fontFamily: 'monospace',
              fontWeight: 700,
              cursor: 'pointer',
              zIndex: 5
            }}
          >
            {edge.protocol}
          </button>
        );
      })}

      {nodes.map((node) => {
        const entry = SANDBOX_KIND_INDEX[node.kind];
        const color = entry?.color ?? '#64748b';
        const isSelected = node.id === selectedNodeId;
        const isLinkSource = node.id === linkingFromId;
        const isLinkTarget = Boolean(linkingFromId) && node.id !== linkingFromId;

        return (
          <div
            key={node.id}
            onPointerDown={(event) => {
              event.stopPropagation();
              beginDrag(event, node);
            }}
            onDoubleClick={(event) => {
              event.stopPropagation();
              startLinking(node.id);
            }}
            role="button"
            tabIndex={0}
            aria-label={node.label}
            style={{
              position: 'absolute',
              left: node.x,
              top: node.y,
              width: NODE_WIDTH,
              height: NODE_HEIGHT,
              borderRadius: '14px',
              background: `linear-gradient(140deg, ${color}26, rgba(2,6,23,0.94))`,
              border: `1px solid ${isSelected || isLinkSource ? color : `${color}55`}`,
              boxShadow: isSelected || isLinkSource ? `0 0 0 2px ${color}55, 0 12px 30px -12px ${color}` : '0 10px 24px -18px #000',
              padding: '8px 10px',
              cursor: isLinkTarget ? 'crosshair' : 'grab',
              userSelect: 'none',
              zIndex: 10,
              transition: 'box-shadow 0.15s ease, border-color 0.15s ease'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ width: 7, height: 7, borderRadius: '50%', background: color, flexShrink: 0 }} />
              <span style={{ color: '#f8fafc', fontSize: '0.75rem', fontWeight: 700, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {node.label}
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '5px' }}>
              <span style={{ fontSize: '0.6rem', color: 'rgba(203,213,225,0.7)', fontFamily: 'monospace' }}>{node.kind}</span>
              <span style={{ fontSize: '0.6rem', color, fontWeight: 800 }}>x{node.replicas}</span>
            </div>

            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                removeNode(node.id);
              }}
              aria-label={isEn ? `Remove ${node.label}` : `${node.label} sil`}
              style={{
                position: 'absolute',
                top: -8,
                right: -8,
                width: 20,
                height: 20,
                borderRadius: '50%',
                background: 'rgba(15,23,42,0.96)',
                border: '1px solid rgba(239,68,68,0.5)',
                color: '#f87171',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
              }}
            >
              <Trash2 size={10} />
            </button>

            {isLinkSource && (
              <span
                style={{
                  position: 'absolute',
                  bottom: -11,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  fontSize: '0.55rem',
                  color,
                  fontWeight: 800,
                  whiteSpace: 'nowrap'
                }}
              >
                {isEn ? 'pick target' : 'hedef seç'}
              </span>
            )}
          </div>
        );
      })}

      {nodes.length === 0 && (
        <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '0.6rem', color: 'var(--text-secondary)', pointerEvents: 'none' }}>
          <Link2 size={34} style={{ opacity: 0.35 }} />
          <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>
            {isEn ? 'Drag a component here to start modeling' : 'Modellemeye başlamak için bir bileşen sürükleyin'}
          </span>
          <span style={{ fontSize: '0.75rem', opacity: 0.6 }}>
            {isEn ? 'Double-click a node to start a connection' : 'Bağlantı kurmak için bir bileşene çift tıklayın'}
          </span>
        </div>
      )}
    </div>
  );
};
