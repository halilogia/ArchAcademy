import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Share2, Plus, Code2, Database, Zap, Sparkles, Trash2, ArrowRight, Save } from 'lucide-react';

interface Node {
  id: string;
  type: 'Entity' | 'Repository' | 'Service';
  name: string;
  code: string;
  x: number;
  y: number;
}

interface Connection {
  fromId: string;
  toId: string;
}

const SynthesisLabPage = () => {
  const [nodes, setNodes] = useState<Node[]>([
    { id: '1', type: 'Entity', name: 'User', code: 'export class User {\n  id: string;\n  email: string;\n}', x: 100, y: 200 },
    { id: '2', type: 'Repository', name: 'UserRepository', code: 'interface IUserRepository {\n  save(user: User): void;\n}', x: 500, y: 200 }
  ]);
  const [connections, setConnections] = useState<Connection[]>([
    { fromId: '1', toId: '2' }
  ]);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [isSynthesizing, setIsSynthesizing] = useState(false);
  const [synthesizedCode, setSynthesizedCode] = useState<string | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);

  const addNode = (type: Node['type']) => {
    const newNode: Node = {
      id: Math.random().toString(36).substr(2, 9),
      type,
      name: `New${type}`,
      code: `// ${type} Logic Here`,
      x: 100 + Math.random() * 100,
      y: 100 + Math.random() * 100
    };
    setNodes([...nodes, newNode]);
  };

  const updateNodePosition = (id: string, x: number, y: number) => {
    setNodes(nodes.map(n => n.id === id ? { ...n, x, y } : n));
  };

  const updateNodeCode = (id: string, code: string) => {
    setNodes(nodes.map(n => n.id === id ? { ...n, code } : n));
  };

  const deleteNode = (id: string) => {
    setNodes(nodes.filter(n => n.id !== id));
    setConnections(connections.filter(c => c.fromId !== id && c.toId !== id));
    if (selectedNodeId === id) setSelectedNodeId(null);
  };

  const handleSynthesize = () => {
    setIsSynthesizing(true);
    setTimeout(() => {
      // Mock synthesis logic
      const entity = nodes.find(n => n.type === 'Entity')?.name || 'Entity';
      const repo = nodes.find(n => n.type === 'Repository')?.name || 'Repository';
      
      const draft = `
// [AI-ORGANIZER SYNTHESIS RESULT]
// Architecture: Clean Architecture (2050 Intent-Driven)

// Domain Layer
export class ${entity} {
  constructor(public id: string, public name: string) {}
}

// Application Layer (Interface)
export interface I${repo} {
  persist(data: ${entity}): Promise<void>;
  retrieve(id: string): Promise<${entity}>;
}

// Infrastructure Layer (AI Generated Adapter)
export class SQL${repo} implements I${repo} {
  async persist(data: ${entity}) { /* Auto-generated SQL Logic */ }
  async retrieve(id: string) { /* Auto-generated SQL Logic */ }
}
      `.trim();
      
      setSynthesizedCode(draft);
      setIsSynthesizing(false);
    }, 2000);
  };

  const selectedNode = nodes.find(n => n.id === selectedNodeId);

  return (
    <div style={{ background: '#020617', height: '100vh', width: '100vw', display: 'flex', overflow: 'hidden', position: 'fixed', top: 0, left: 0, zIndex: 1000 }}>
      {/* Sidebar: Synthesis Controls */}
      <div style={{ width: '350px', background: 'rgba(15, 23, 42, 0.8)', backdropFilter: 'blur(20px)', borderRight: '1px solid rgba(255,255,255,0.1)', padding: '2rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
          <div style={{ padding: '0.8rem', background: 'var(--primary)', borderRadius: '12px' }}>
            <Zap size={24} color="white" />
          </div>
          <h1 style={{ fontSize: '1.4rem', fontWeight: 900, color: 'white' }}>Synthesis Lab</h1>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
           <button onClick={() => addNode('Entity')} style={{ width: '100%', padding: '1rem', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.2)', color: '#ef4444', borderRadius: '12px', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '10px' }}>
             <Plus size={18} /> Add Entity
           </button>
           <button onClick={() => addNode('Repository')} style={{ width: '100%', padding: '1rem', background: 'rgba(59, 130, 246, 0.1)', border: '1px solid rgba(59, 130, 246, 0.2)', color: '#3b82f6', borderRadius: '12px', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '10px' }}>
             <Plus size={18} /> Add Repository
           </button>
           <button onClick={() => addNode('Service')} style={{ width: '100%', padding: '1rem', background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.2)', color: '#10b981', borderRadius: '12px', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '10px' }}>
             <Plus size={18} /> Add Service
           </button>
        </div>

        <div style={{ flex: 1 }}>
          <h3 style={{ fontSize: '0.8rem', opacity: 0.5, textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '1.5rem' }}>Synthesis Engine</h3>
          <button 
            onClick={handleSynthesize}
            disabled={isSynthesizing}
            style={{ width: '100%', padding: '1.5rem', background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)', border: 'none', color: 'white', borderRadius: '15px', fontWeight: 900, fontSize: '1rem', boxShadow: '0 10px 30px rgba(59, 130, 246, 0.3)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px' }}
          >
            {isSynthesizing ? <Sparkles className="animate-spin" /> : <Zap size={20} />}
            SYNTHESIZE MAPPINGS
          </button>
        </div>

        <button onClick={() => window.history.back()} style={{ background: 'transparent', color: 'rgba(255,255,255,0.4)', border: 'none', textAlign: 'left', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <ArrowRight size={16} /> Exit Experiment
        </button>
      </div>

      {/* Main Canvas */}
      <div ref={containerRef} style={{ flex: 1, position: 'relative', overflow: 'hidden', background: 'radial-gradient(circle at center, #0f172a 0%, #020617 100%)' }}>
        {/* Grid Background */}
        <div style={{ position: 'absolute', inset: 0, opacity: 0.05, backgroundImage: 'radial-gradient(white 1px, transparent 0)', backgroundSize: '40px 40px' }} />

        {/* SVG Connections */}
        <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
           {connections.map((conn, idx) => {
             const fromNode = nodes.find(n => n.id === conn.fromId);
             const toNode = nodes.find(n => n.id === conn.toId);
             if (!fromNode || !toNode) return null;
             return (
               <line 
                 key={idx}
                 x1={fromNode.x + 100} y1={fromNode.y + 40}
                 x2={toNode.x} y2={toNode.y + 40}
                 stroke="url(#grad)" strokeWidth="2" strokeDasharray="5,5"
               />
             );
           })}
           <defs>
             <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#ef4444" />
                <stop offset="100%" stopColor="#3b82f6" />
             </linearGradient>
           </defs>
        </svg>

        {/* Nodes */}
        {nodes.map(node => (
          <motion.div
            key={node.id}
            drag
            dragMomentum={false}
            onDrag={(e, info) => updateNodePosition(node.id, node.x + info.delta.x, node.y + info.delta.y)}
            onClick={(e) => { e.stopPropagation(); setSelectedNodeId(node.id); }}
            style={{ 
              position: 'absolute', left: node.x, top: node.y,
              width: '200px', padding: '1rem', background: 'rgba(30, 41, 59, 0.8)',
              borderRadius: '16px', border: `2px solid ${selectedNodeId === node.id ? 'var(--primary)' : 'rgba(255,255,255,0.1)'}`,
              boxShadow: selectedNodeId === node.id ? '0 0 30px rgba(59, 130, 246, 0.4)' : '0 10px 20px rgba(0,0,0,0.3)',
              cursor: 'grab'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.8rem', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '0.5rem' }}>
               {node.type === 'Entity' && <Database size={16} color="#ef4444" />}
               {node.type === 'Repository' && <Share2 size={16} color="#3b82f6" />}
               {node.type === 'Service' && <Code2 size={16} color="#10b981" />}
               <span style={{ fontSize: '0.7rem', fontWeight: 900, textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)' }}>{node.type}</span>
               <button onClick={(e) => { e.stopPropagation(); deleteNode(node.id); }} style={{ marginLeft: 'auto', background: 'transparent', color: '#ef4444', border: 'none', padding: '4px' }}><Trash2 size={14} /></button>
            </div>
            <div style={{ fontWeight: 800, fontSize: '1rem' }}>{node.name}</div>
          </motion.div>
        ))}

        {/* Floating Code Editor Overlay */}
        <AnimatePresence>
          {selectedNode && (
            <motion.div
              initial={{ x: 300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 300, opacity: 0 }}
              style={{ position: 'absolute', right: '2rem', top: '2rem', bottom: '2rem', width: '450px', background: 'rgba(15, 23, 42, 0.95)', backdropFilter: 'blur(30px)', borderRadius: '30px', border: '1px solid rgba(255,255,255,0.1)', padding: '2rem', boxShadow: '-20px 0 50px rgba(0,0,0,0.5)', display: 'flex', flexDirection: 'column' }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                 <div>
                   <h2 style={{ fontSize: '1.5rem', fontWeight: 900 }}>Node Editor</h2>
                   <span style={{ fontSize: '0.8rem', color: 'var(--primary)', fontWeight: 800 }}>{selectedNode.type} Artifact</span>
                 </div>
                 <button onClick={() => setSelectedNodeId(null)} style={{ color: 'white', opacity: 0.5 }}>✕</button>
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', fontSize: '0.7rem', fontWeight: 900, opacity: 0.5, marginBottom: '0.5rem' }}>IDENTIFIER</label>
                <input 
                  value={selectedNode.name}
                  onChange={(e) => setNodes(nodes.map(n => n.id === selectedNode.id ? { ...n, name: e.target.value } : n))}
                  style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', padding: '1rem', borderRadius: '12px', color: 'white', fontWeight: 800 }}
                />
              </div>

              <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                <label style={{ display: 'block', fontSize: '0.7rem', fontWeight: 900, opacity: 0.5, marginBottom: '0.5rem' }}>LOGIC DEFINITION</label>
                <textarea 
                  value={selectedNode.code}
                  onChange={(e) => updateNodeCode(selectedNode.id, e.target.value)}
                  style={{ flex: 1, width: '100%', background: '#020617', border: '1px solid rgba(255,255,255,0.1)', padding: '1.5rem', borderRadius: '15px', color: '#10b981', fontFamily: 'monospace', fontSize: '0.9rem', resize: 'none' }}
                />
              </div>

              <button style={{ marginTop: '1.5rem', width: '100%', padding: '1rem', background: 'rgba(59, 130, 246, 0.1)', border: '1px solid rgba(59, 130, 246, 0.2)', color: '#3b82f6', borderRadius: '12px', fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                <Save size={18} /> Update Logic
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Synthesis Result Modal */}
        <AnimatePresence>
          {synthesizedCode && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              style={{ position: 'fixed', inset: 0, zIndex: 2000, background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(10px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '4rem' }}
            >
              <div style={{ width: '800px', background: '#0f172a', borderRadius: '40px', border: '1px solid var(--glass-border)', padding: '3rem', position: 'relative' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
                   <Sparkles color="#3b82f6" size={32} />
                   <h2 style={{ fontSize: '2rem', fontWeight: 950 }}>Synthesis Results</h2>
                </div>
                <div style={{ background: '#020617', padding: '2rem', borderRadius: '20px', overflow: 'auto', maxHeight: '500px', border: '1px solid rgba(255,255,255,0.05)' }}>
                   <pre style={{ color: '#10b981', fontSize: '1rem', lineHeight: 1.6 }}>{synthesizedCode}</pre>
                </div>
                <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem' }}>
                   <button onClick={() => setSynthesizedCode(null)} style={{ flex: 1, padding: '1.5rem', background: 'rgba(255,255,255,0.05)', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.1)', fontWeight: 800, color: 'white' }}>Dismiss</button>
                   <button style={{ flex: 2, padding: '1.5rem', background: 'var(--primary)', borderRadius: '20px', border: 'none', fontWeight: 900, color: 'white' }}>Download as .ZIP (Genesis Ready)</button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default SynthesisLabPage;
