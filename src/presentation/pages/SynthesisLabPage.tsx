import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Share2, Plus, Code2, Database, Zap, Sparkles, Trash2, 
  ArrowRight, Save, Link as LinkIcon, FolderTree, FileCode, 
  Settings, Activity, Eye, Layers, Brain
} from 'lucide-react';

interface VisualNode {
  id: string;
  type: 'Entity' | 'Repository' | 'Service' | 'Controller';
  name: string;
  code: string;
  x: number;
  y: number;
  health: number;
}

interface Connection {
  id: string;
  fromId: string;
  toId: string;
}

const MOCK_FILES = [
  { name: 'User.cs', type: 'Entity', content: 'public class User { public int Id { get; set; } }' },
  { name: 'Product.cs', type: 'Entity', content: 'public class Product { public string SKU { get; set; } }' },
  { name: 'UserRepository.cs', type: 'Repository', content: 'public interface IUserRepository { ... }' },
  { name: 'OrderService.cs', type: 'Service', content: 'public class OrderService { ... }' },
  { name: 'AuthController.cs', type: 'Controller', content: 'public class AuthController : ControllerBase { ... }' },
];

const SynthesisLabPage = () => {
  const [nodes, setNodes] = useState<VisualNode[]>([
    { id: '1', type: 'Entity', name: 'User', code: 'export class User {\n  id: string;\n  email: string;\n}', x: 450, y: 200, health: 98 },
    { id: '2', type: 'Repository', name: 'UserRepository', code: 'interface IUserRepository {\n  save(user: User): void;\n}', x: 750, y: 350, health: 100 }
  ]);
  const [connections, setConnections] = useState<Connection[]>([
    { id: 'c1', fromId: '1', toId: '2' }
  ]);
  
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [isSynthesizing, setIsSynthesizing] = useState(false);
  const [synthesizedCode, setSynthesizedCode] = useState<string | null>(null);
  const [pendingConnection, setPendingConnection] = useState<string | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [activeTab, setActiveTab] = useState<'explorer' | 'search' | 'git'>('explorer');

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (pendingConnection && containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setMousePos({ 
          x: e.clientX - rect.left, 
          y: e.clientY - rect.top 
        });
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [pendingConnection]);

  const onDropFile = useCallback((e: React.DragEvent, type: VisualNode['type'], name: string, code: string) => {
    e.preventDefault();
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - 110;
    const y = e.clientY - rect.top - 60;

    const newNode: VisualNode = {
      id: Math.random().toString(36).substr(2, 9),
      type,
      name,
      code,
      x,
      y,
      health: 100
    };
    setNodes(prev => [...prev, newNode]);
  }, []);

  const updateNodePosition = (id: string, x: number, y: number) => {
    setNodes(prev => prev.map(n => n.id === id ? { ...n, x, y } : n));
  };

  const handleConnect = (nodeId: string, portType: 'source' | 'target') => {
    if (portType === 'source') {
      setPendingConnection(nodeId);
    } else if (portType === 'target' && pendingConnection && pendingConnection !== nodeId) {
      const newConn: Connection = {
        id: `c-${Math.random()}`,
        fromId: pendingConnection,
        toId: nodeId
      };
      setConnections([...connections, newConn]);
      setPendingConnection(null);
    }
  };

  const handleSynthesize = () => {
    setIsSynthesizing(true);
    setTimeout(() => {
      setSynthesizedCode(`// [NEURAL ARCHITECTURE MAP SYNTHESIZED]\n// Total Nodes: ${nodes.length}\n// Active Synapses: ${connections.length}\n\n${nodes.map(n => `// Node: ${n.name} (${n.type})\n// Connection Logic Generated...`).join('\n')}`);
      setIsSynthesizing(false);
    }, 1500);
  };

  return (
    <div style={{ background: '#0a0a0f', height: '100vh', width: '100vw', display: 'flex', overflow: 'hidden', position: 'fixed', inset: 0, zIndex: 1000, fontFamily: '"Outfit", sans-serif', boxSizing: 'border-box' }}>
      
      {/* VS Code Activity Bar (Far Left) */}
      <div style={{ width: '60px', background: '#050507', display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: '1.5rem', paddingBottom: '1.5rem', gap: '1.5rem', borderRight: '1px solid rgba(255,255,255,0.05)', boxSizing: 'border-box' }}>
        <div style={{ color: activeTab === 'explorer' ? '#3b82f6' : 'rgba(255,255,255,0.3)', cursor: 'pointer' }} onClick={() => setActiveTab('explorer')}><FolderTree size={28} /></div>
        <div style={{ color: activeTab === 'search' ? '#3b82f6' : 'rgba(255,255,255,0.3)', cursor: 'pointer' }} onClick={() => setActiveTab('search')}><Settings size={28} /></div>
        <div style={{ color: 'rgba(255,255,255,0.1)', cursor: 'not-allowed' }}><Activity size={28} /></div>
        <div style={{ marginTop: 'auto', marginBottom: '1.5rem', color: 'rgba(255,255,255,0.3)' }}><Brain size={28} /></div>
      </div>

      {/* VS Code Sidebar (File Explorer) */}
      <div style={{ width: '260px', background: '#0a0a0f', borderRight: '1px solid rgba(255,255,255,0.05)', display: 'flex', flexDirection: 'column', boxSizing: 'border-box' }}>
        <div style={{ padding: '1rem', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: '0.75rem', fontWeight: 900, color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '1px' }}>Explorer</span>
          <Plus size={16} />
        </div>
        <div style={{ flex: 1, padding: '1rem', overflowY: 'auto' }}>
          <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.7rem', fontWeight: 900, marginBottom: '1rem' }}>SOURCE FILES</div>
          {MOCK_FILES.map(file => (
            <div 
              key={file.name}
              draggable
              onDragStart={(e) => {
                e.dataTransfer.setData('type', file.type);
                e.dataTransfer.setData('name', file.name);
                e.dataTransfer.setData('code', file.content);
              }}
              style={{ padding: '0.7rem', borderRadius: '8px', cursor: 'grab', display: 'flex', alignItems: 'center', gap: '10px', transition: 'all 0.2s', color: 'rgba(255,255,255,0.7)', fontSize: '0.85rem' }}
            >
              <FileCode size={16} color={file.type === 'Entity' ? '#ef4444' : '#3b82f6'} />
              {file.name}
            </div>
          ))}
        </div>
      </div>

      {/* Main Extension Viewport */}
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
              onDrag={(e, info) => updateNodePosition(node.id, node.x + info.delta.x, node.y + info.delta.y)}
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
                <Trash2 size={14} style={{ marginLeft: 'auto', opacity: 0.3, cursor: 'pointer' }} onClick={() => setNodes(nodes.filter(n => n.id !== node.id))} />
              </div>
              <div style={{ padding: '1.2rem' }}>
                <div style={{ fontWeight: 950, fontSize: '1.1rem', color: 'white', marginBottom: '4px' }}>{node.name}</div>
                <div style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.4)' }}>Architecture Health: {node.health}%</div>
              </div>
              
              {/* Connection Ports */}
              <button 
                onClick={(e) => { e.stopPropagation(); handleConnect(node.id, 'target'); }}
                style={{ position: 'absolute', left: '-12px', top: '50%', transform: 'translateY(-50%)', width: '24px', height: '24px', background: '#050507', border: '2px solid #3b82f6', borderRadius: '50%', cursor: 'pointer' }} 
              />
              <button 
                onClick={(e) => { e.stopPropagation(); handleConnect(node.id, 'source'); }}
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
              onClick={handleSynthesize}
              style={{ background: 'linear-gradient(135deg, #3b82f6, #06b6d4)', border: 'none', color: 'white', padding: '0.6rem 2rem', borderRadius: '100px', fontWeight: 950, fontSize: '0.85rem', cursor: 'pointer', boxShadow: '0 4px 15px rgba(59, 130, 246, 0.4)' }}
            >
              RUN ARCHITECT SYNTH
            </button>
        </div>
      </div>

      {/* Right Intelligence Panel */}
      <div style={{ width: '320px', background: '#050507', borderLeft: '1px solid rgba(255,255,255,0.05)', padding: '2rem', display: 'flex', flexDirection: 'column', gap: '2rem', boxSizing: 'border-box' }}>
        <div>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 950, marginBottom: '0.5rem' }}>Architecture Monitor</h3>
          <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)' }}>Real-time dependency analysis</p>
        </div>

        <div style={{ flex: 1, overflow: 'auto' }}>
          <div style={{ background: 'rgba(255,255,255,0.02)', borderRadius: '20px', padding: '1.5rem', border: '1px solid rgba(255,255,255,0.05)' }}>
            <div style={{ fontSize: '0.7rem', fontWeight: 900, marginBottom: '1rem', color: '#3b82f6' }}>NEURAL LOGS</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
               {connections.map(c => {
                 const from = nodes.find(n => n.id === c.fromId);
                 const to = nodes.find(n => n.id === c.toId);
                 return (
                   <div key={c.id} style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.7)', borderLeft: '2px solid #3b82f6', paddingLeft: '10px' }}>
                     <b>{from?.name}</b> is feeding into <b>{to?.name}</b>
                   </div>
                 );
               })}
               {connections.length === 0 && <div style={{ fontSize: '0.8rem', opacity: 0.3 }}>No neural links detected...</div>}
            </div>
          </div>
        </div>

        <button 
          onClick={() => window.location.href='/workshop'}
          style={{ padding: '1rem', background: 'transparent', border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.5)', borderRadius: '14px', cursor: 'pointer', fontWeight: 800 }}
        >
          DESELECT EXTENSION
        </button>
      </div>

      {/* Synthesis Result Modal */}
      <AnimatePresence>
        {synthesizedCode && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ position: 'fixed', inset: 0, zIndex: 2000, background: 'rgba(0,0,0,0.95)', backdropFilter: 'blur(30px)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <div style={{ width: '800px', background: '#0a0a0f', borderRadius: '40px', border: '1px solid rgba(255,255,255,0.1)', padding: '3rem' }}>
              <div style={{ display: 'flex', gap: '20px', marginBottom: '2rem' }}>
                 <div style={{ background: '#3b82f6', padding: '1rem', borderRadius: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '50px', height: '50px' }}><Zap color="white" /></div>
                 <div>
                   <h2 style={{ fontSize: '2rem', fontWeight: 950 }}>Synthesis Complete</h2>
                   <p style={{ opacity: 0.4 }}>Architecture artifacts mapped to file system</p>
                 </div>
              </div>
              <pre style={{ background: '#050507', padding: '2rem', borderRadius: '20px', color: '#06b6d4', maxHeight: '400px', overflow: 'auto', border: '1px solid rgba(255,255,255,0.05)' }}>
                {synthesizedCode}
              </pre>
              <div style={{ marginTop: '2rem', display: 'flex', gap: '15px' }}>
                <button onClick={() => setSynthesizedCode(null)} style={{ flex: 1, padding: '1.2rem', background: 'rgba(255,255,255,0.05)', borderRadius: '18px', border: 'none', color: 'white', fontWeight: 900 }}>Dismiss</button>
                <button style={{ flex: 2, padding: '1.2rem', background: '#3b82f6', borderRadius: '18px', border: 'none', color: 'white', fontWeight: 950 }}>Deploy Synthetic Blueprint</button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SynthesisLabPage;

