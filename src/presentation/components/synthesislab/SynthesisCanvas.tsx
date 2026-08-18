import React, { RefObject } from 'react';
import { motion } from 'framer-motion';
import { Brain, Trash2 } from 'lucide-react';

export interface VisualNode {
  id: string;
  type: 'Entity' | 'Repository' | 'Service' | 'Controller';
  name: string;
  code: string;
  x: number;
  y: number;
  health: number;
}

export interface Connection {
  id: string;
  fromId: string;
  toId: string;
}

export interface SynthesisCanvasProps {
  containerRef: RefObject<HTMLDivElement>;
  nodes: VisualNode[];
  connections: Connection[];
  pendingConnection: string | null;
  mousePos: { x: number; y: number };
  onDropFile: (e: React.DragEvent, type: VisualNode['type'], name: string, code: string) => void;
  onUpdateNodePosition: (id: string, x: number, y: number) => void;
  onDeleteNode: (id: string) => void;
  onConnect: (nodeId: string, portType: 'source' | 'target') => void;
  onSynthesize: () => void;
}

export const SynthesisCanvas: React.FC<SynthesisCanvasProps> = ({
  containerRef,
  nodes,
  connections,
  pendingConnection,
  mousePos,
  onDropFile,
  onUpdateNodePosition,
  onDeleteNode,
  onConnect,
  onSynthesize
}) => {
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', position: 'relative', minWidth: 0 }}>
      {/* Editor Tabs Simulation */}
      <div style={{ height: '40px', background: '#050507', display: 'flex', alignItems: 'center', paddingLeft: '1rem', flexShrink: 0 }}>
        <div style={{ background: '#0a0a0f', height: '100%', padding: '0 1.5rem', display: 'flex', alignItems: 'center', gap: '10px', borderTop: '2px solid #3b82f6', color: 'white', fontSize: '0.8rem' }}>
          <Brain size={14} color="#3b82f6" />
          Architect Synth Lab
        </div>
      </div>

      {/* The Map Canvas */}
      <div 
        ref={containerRef}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          const type = e.dataTransfer.getData('type') as VisualNode['type'];
          const name = e.dataTransfer.getData('name');
          const code = e.dataTransfer.getData('code');
          onDropFile(e, type, name, code);
        }}
        style={{ flex: 1, position: 'relative', overflow: 'hidden', background: 'radial-gradient(circle at 50% 50%, #11111a 0%, #050507 100%)', minHeight: 0 }}
      >
        {/* Animated Matrix Grid */}
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(59, 130, 246, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(59, 130, 246, 0.03) 1px, transparent 1px)', backgroundSize: '50px 50px' }} />
        
        <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 10 }}>
          <defs>
            <linearGradient id="neural-link" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(59, 130, 246, 0.8)" />
              <stop offset="100%" stopColor="rgba(6, 182, 212, 0.2)" />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>

          {connections.map(conn => {
            const from = nodes.find(n => n.id === conn.fromId);
            const to = nodes.find(n => n.id === conn.toId);
            if (!from || !to) return null;
            
            const x1 = from.x + 220; const y1 = from.y + 60;
            const x2 = to.x; const y2 = to.y + 60;
            const dist = Math.abs(x2 - x1);
            
            return (
              <g key={conn.id}>
                <path 
                  d={`M ${x1} ${y1} C ${x1 + dist/2} ${y1}, ${x2 - dist/2} ${y2}, ${x2} ${y2}`}
                  stroke="url(#neural-link)" strokeWidth="3" fill="none" opacity="1" filter="url(#glow)"
                />
                <motion.circle r="3" fill="white">
                  <animateMotion dur="2s" repeatCount="indefinite" path={`M ${x1} ${y1} C ${x1 + dist/2} ${y1}, ${x2 - dist/2} ${y2}, ${x2} ${y2}`} />
                </motion.circle>
              </g>
            );
          })}

          {pendingConnection && (() => {
            const n = nodes.find(node => node.id === pendingConnection);
            if (!n) return null;
            const x1 = n.x + 220; const y1 = n.y + 60;
            const dist = Math.abs(mousePos.x - x1);
            return (
              <path d={`M ${x1} ${y1} C ${x1 + dist/2} ${y1}, ${mousePos.x - dist/2} ${mousePos.y}, ${mousePos.x} ${mousePos.y}`} stroke="rgba(255,255,255,0.2)" strokeWidth="2" strokeDasharray="10,10" fill="none" />
            );
          })()}
        </svg>

        {nodes.map(node => (
          <motion.div
            key={node.id}
            drag
            dragMomentum={false}
            onDrag={(e, info) => onUpdateNodePosition(node.id, node.x + info.delta.x, node.y + info.delta.y)}
            style={{ 
              position: 'absolute', left: node.x, top: node.y,
              width: '240px', background: 'rgba(20, 20, 30, 0.9)', backdropFilter: 'blur(30px)',
              borderRadius: '20px', border: '1px solid rgba(255,255,255,0.1)', overflow: 'hidden',
              zIndex: 100, boxShadow: '0 20px 50px rgba(0,0,0,0.5)', cursor: 'grab'
            }}
          >
            <div style={{ background: 'rgba(255,255,255,0.03)', padding: '0.8rem', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: node.type === 'Entity' ? '#ef4444' : '#3b82f6' }} />
              <span style={{ fontSize: '0.65rem', fontWeight: 900, color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase' }}>{node.type}</span>
              <Trash2 size={14} style={{ marginLeft: 'auto', opacity: 0.3, cursor: 'pointer' }} onClick={() => onDeleteNode(node.id)} />
            </div>
            <div style={{ padding: '1.2rem' }}>
              <div style={{ fontWeight: 950, fontSize: '1.1rem', color: 'white', marginBottom: '4px' }}>{node.name}</div>
              <div style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.4)' }}>Architecture Health: {node.health}%</div>
            </div>
            
            {/* Connection Ports */}
            <button 
              onClick={(e) => { e.stopPropagation(); onConnect(node.id, 'target'); }}
              style={{ position: 'absolute', left: '-12px', top: '50%', transform: 'translateY(-50%)', width: '24px', height: '24px', background: '#050507', border: '2px solid #3b82f6', borderRadius: '50%', cursor: 'pointer' }} 
            />
            <button 
              onClick={(e) => { e.stopPropagation(); onConnect(node.id, 'source'); }}
              style={{ position: 'absolute', right: '-12px', top: '50%', transform: 'translateY(-50%)', width: '24px', height: '24px', background: '#3b82f6', border: '4px solid #050507', borderRadius: '50%', cursor: 'pointer', boxShadow: '0 0 15px #3b82f6' }} 
            />
          </motion.div>
        ))}
      </div>

      {/* Toolbar Footer */}
      <div style={{ height: '60px', background: '#050507', borderTop: '1px solid rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', paddingLeft: '2rem', paddingRight: '2rem', justifyContent: 'space-between', flexShrink: 0, boxSizing: 'border-box' }}>
        <div style={{ display: 'flex', gap: '20px', color: 'rgba(255,255,255,0.4)', fontSize: '0.75rem', fontWeight: 700 }}>
          <span style={{ color: '#3b82f6' }}>● NEURAL ENGINE ACTIVE</span>
          <span style={{ opacity: 0.6 }}>SYNAPSES: {connections.length}</span>
        </div>
        <button 
          onClick={onSynthesize}
          style={{ background: 'linear-gradient(135deg, #3b82f6, #06b6d4)', border: 'none', color: 'white', padding: '0.6rem 2rem', borderRadius: '100px', fontWeight: 950, fontSize: '0.85rem', cursor: 'pointer', boxShadow: '0 4px 15px rgba(59, 130, 246, 0.4)' }}
        >
          RUN ARCHITECT SYNTH
        </button>
      </div>
    </div>
  );
};

export default SynthesisCanvas;
