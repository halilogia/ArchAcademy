import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Share2, Plus, Code2, Database, Zap, Sparkles, Trash2, ArrowRight, Save, Link as LinkIcon } from 'lucide-react';

interface Node {
  id: string;
  type: 'Entity' | 'Repository' | 'Service';
  name: string;
  code: string;
  x: number;
  y: number;
}

interface Connection {
  id: string;
  fromId: string;
  toId: string;
}

const SynthesisLabPage = () => {
  const [nodes, setNodes] = useState<Node[]>([
    { id: '1', type: 'Entity', name: 'User', code: 'export class User {\n  id: string;\n  email: string;\n}', x: 100, y: 200 },
    { id: '2', type: 'Repository', name: 'UserRepository', code: 'interface IUserRepository {\n  save(user: User): void;\n}', x: 500, y: 200 }
  ]);
  const [connections, setConnections] = useState<Connection[]>([
    { id: 'c1', fromId: '1', toId: '2' }
  ]);
  
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [isSynthesizing, setIsSynthesizing] = useState(false);
  const [synthesizedCode, setSynthesizedCode] = useState<string | null>(null);
  const [pendingConnection, setPendingConnection] = useState<string | null>(null); // fromNodeId
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const containerRef = useRef<HTMLDivElement>(null);

  // Track mouse for pending connection line
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

  const addNode = (type: Node['type']) => {
    const newNode: Node = {
      id: Math.random().toString(36).substr(2, 9),
      type,
      name: `New${type}`,
      code: `// ${type} Logic Definition`,
      x: 100 + Math.random() * 200,
      y: 100 + Math.random() * 200
    };
    setNodes([...nodes, newNode]);
  };

  const updateNodePosition = (id: string, x: number, y: number) => {
    setNodes(prev => prev.map(n => n.id === id ? { ...n, x, y } : n));
  };

  const deleteNode = (id: string) => {
    setNodes(nodes.filter(n => n.id !== id));
    setConnections(connections.filter(c => c.fromId !== id && c.toId !== id));
    if (selectedNodeId === id) setSelectedNodeId(null);
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
      const draft = `
// [AI-ORGANIZER SYNTHETIC BLUEPRINT]
// Context: ${nodes.length} Artifacts, ${connections.length} Neural Links

${nodes.map(n => `/** @Artifact ${n.name} */\n${n.code}`).join('\n\n')}

// Synthesis Status: COMPLETED
// Memory Mappings: Verified
      `.trim();
      setSynthesizedCode(draft);
      setIsSynthesizing(false);
    }, 1500);
  };

  return (
    <div style={{ background: '#020617', height: '100vh', width: '100vw', display: 'flex', overflow: 'hidden', position: 'fixed', top: 0, left: 0, zIndex: 1000 }}>
      {/* Sidebar: Synthesis Controls */}
      <div style={{ width: '300px', background: 'rgba(15, 23, 42, 0.95)', backdropFilter: 'blur(40px)', borderRight: '1px solid rgba(255,255,255,0.1)', padding: '2rem', display: 'flex', flexDirection: 'column', gap: '2rem', zIndex: 1000 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ padding: '0.8rem', background: '#3b82f6', borderRadius: '15px', color: 'white' }}>
            <Zap size={24} />
          </div>
          <h1 style={{ fontSize: '1.4rem', fontWeight: 950, color: 'white', letterSpacing: '-1px' }}>Synthesis Lab</h1>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
           <button onClick={() => addNode('Entity')} style={{ width: '100%', padding: '1rem', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.2)', color: '#ef4444', borderRadius: '14px', fontWeight: 900, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px' }}>
             <Database size={18} /> Entity Node
           </button>
           <button onClick={() => addNode('Repository')} style={{ width: '100%', padding: '1rem', background: 'rgba(59, 130, 246, 0.1)', border: '1px solid rgba(59, 130, 246, 0.2)', color: '#3b82f6', borderRadius: '14px', fontWeight: 900, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px' }}>
             <Share2 size={18} /> Repository Node
           </button>
        </div>

        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
          <button 
            onClick={handleSynthesize}
            disabled={isSynthesizing}
            style={{ width: '100%', padding: '1.2rem', background: 'linear-gradient(135deg, #3b82f6, #06b6d4)', border: 'none', color: 'white', borderRadius: '18px', fontWeight: 950, fontSize: '1rem', boxShadow: '0 15px 30px rgba(59, 130, 246, 0.3)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}
          >
            {isSynthesizing ? <Sparkles className="animate-spin" /> : <Zap size={20} />}
            SYNTHESIZE
          </button>
          <button onClick={() => window.location.href='/workshop'} style={{ marginTop: '1.5rem', background: 'transparent', color: 'rgba(255,255,255,0.3)', border: 'none', cursor: 'pointer', fontWeight: 700, fontSize: '0.85rem' }}>EXIT EXPERIMENT</button>
        </div>
      </div>

      {/* Main Canvas Area */}
      <div 
        ref={containerRef} 
        onMouseDown={() => { if(!pendingConnection) setSelectedNodeId(null); }}
        style={{ flex: 1, position: 'relative', overflow: 'hidden', background: '#020617' }}
      >
        {/* Grid Dots */}
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(rgba(255,255,255,0.05) 1px, transparent 0)', backgroundSize: '40px 40px' }} />

        {/* Connection SVG Layer */}
        <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 10 }}>
           <defs>
              <linearGradient id="link-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#ef4444" />
                <stop offset="100%" stopColor="#3b82f6" />
              </linearGradient>
           </defs>

           {/* Established Connections */}
           {connections.map(conn => {
             const from = nodes.find(n => n.id === conn.fromId);
             const to = nodes.find(n => n.id === conn.toId);
             if (!from || !to) return null;
             
             const x1 = from.x + 220; 
             const y1 = from.y + 60;  
             const x2 = to.x;
             const y2 = to.y + 60;
             
             const dist = Math.abs(x2 - x1);
             return (
               <path 
                 key={conn.id}
                 d={`M ${x1} ${y1} C ${x1 + dist/2} ${y1}, ${x2 - dist/2} ${y2}, ${x2} ${y2}`}
                 stroke="url(#link-grad)"
                 strokeWidth="3"
                 fill="none"
                 opacity="0.8"
               />
             );
           })}

           {/* Pending Connection Line (Follows Mouse) */}
           {pendingConnection && (
             (() => {
                const fromNode = nodes.find(n => n.id === pendingConnection);
                if (!fromNode) return null;
                const x1 = fromNode.x + 220;
                const y1 = fromNode.y + 60;
                const dist = Math.abs(mousePos.x - x1);
                return (
                  <path 
                    d={`M ${x1} ${y1} C ${x1 + dist/2} ${y1}, ${mousePos.x - dist/2} ${mousePos.y}, ${mousePos.x} ${mousePos.y}`}
                    stroke="rgba(255,255,255,0.3)"
                    strokeWidth="2"
                    strokeDasharray="5,5"
                    fill="none"
                  />
                );
             })()
           )}
        </svg>

        {/* Node Layer */}
        {nodes.map(node => (
          <motion.div
            key={node.id}
            drag
            dragMomentum={false}
            onDrag={(e, info) => updateNodePosition(node.id, node.x + info.delta.x, node.y + info.delta.y)}
            onClick={(e) => { e.stopPropagation(); setSelectedNodeId(node.id); }}
            style={{ 
              position: 'absolute', left: node.x, top: node.y,
              width: '220px', minHeight: '120px', padding: '1.2rem',
              background: 'rgba(30, 41, 59, 0.85)', backdropFilter: 'blur(20px)',
              borderRadius: '24px', border: `2px solid ${selectedNodeId === node.id ? '#3b82f6' : 'rgba(255,255,255,0.05)'}`,
              boxShadow: selectedNodeId === node.id ? '0 0 40px rgba(59, 130, 246, 0.3)' : '0 10px 30px rgba(0,0,0,0.5)',
              cursor: 'grab', zIndex: 100
            }}
          >
            {/* Input Port (Blue) */}
            <button 
              onClick={(e) => { e.stopPropagation(); handleConnect(node.id, 'target'); }}
              style={{ position: 'absolute', left: '-12px', top: '60px', width: '24px', height: '24px', transform: 'translateY(-50%)', background: '#3b82f6', border: '4px solid #0f172a', borderRadius: '50%', cursor: 'pointer', zIndex: 110, outline: 'none', boxShadow: '0 0 10px #3b82f6' }} 
            />
            
            {/* Output Port (Red) */}
            <button 
              onClick={(e) => { e.stopPropagation(); handleConnect(node.id, 'source'); }}
              style={{ position: 'absolute', right: '-12px', top: '60px', width: '24px', height: '24px', transform: 'translateY(-50%)', background: pendingConnection === node.id ? 'white' : '#ef4444', border: '4px solid #0f172a', borderRadius: '50%', cursor: 'pointer', zIndex: 110, outline: 'none', boxShadow: pendingConnection === node.id ? '0 0 20px white' : '0 0 10px #ef4444' }} 
            />

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.8rem', opacity: 0.6 }}>
               {node.type === 'Entity' && <Database size={14} color="#ef4444" />}
               {node.type === 'Repository' && <Share2 size={14} color="#3b82f6" />}
               <span style={{ fontSize: '0.6rem', fontWeight: 900, textTransform: 'uppercase' }}>{node.type}</span>
               <button onClick={(e) => { e.stopPropagation(); deleteNode(node.id); }} style={{ marginLeft: 'auto', background: 'transparent', color: '#ef4444', border: 'none', cursor: 'pointer' }}><Trash2 size={14} /></button>
            </div>
            <div style={{ fontWeight: 950, fontSize: '1.2rem', color: 'white' }}>{node.name}</div>
          </motion.div>
        ))}

        {/* Global Editor Context */}
        <AnimatePresence>
          {selectedNodeId && (
            <motion.div
              initial={{ x: 350, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: 350, opacity: 0 }}
              style={{ position: 'absolute', right: '2rem', top: '2rem', bottom: '2rem', width: '380px', background: 'rgba(15, 23, 42, 0.98)', backdropFilter: 'blur(50px)', borderRadius: '32px', border: '1px solid rgba(255,255,255,0.1)', padding: '2.5rem', boxShadow: '-20px 0 60px rgba(0,0,0,0.6)', display: 'flex', flexDirection: 'column', zIndex: 1000 }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
                 <div>
                   <h2 style={{ fontSize: '1.5rem', fontWeight: 950 }}>Node Context</h2>
                   <div style={{ fontSize: '0.7rem', color: '#3b82f6', fontWeight: 900 }}>METADATA EDITOR</div>
                 </div>
                 <button onClick={() => setSelectedNodeId(null)} style={{ color: 'white', opacity: 0.3, background: 'none', border: 'none', fontSize: '1.2rem', cursor: 'pointer' }}>✕</button>
              </div>
              
              <div style={{ marginBottom: '1.5rem' }}>
                 <label style={{ display: 'block', fontSize: '0.65rem', fontWeight: 900, opacity: 0.5, marginBottom: '0.5rem' }}>IDENTIFIER</label>
                 <input 
                   value={nodes.find(n => n.id === selectedNodeId)?.name}
                   onChange={(e) => setNodes(nodes.map(n => n.id === selectedNodeId ? { ...n, name: e.target.value } : n))}
                   style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', padding: '1.2rem', borderRadius: '14px', color: 'white', fontWeight: 800, fontSize: '1.1rem' }} 
                 />
              </div>

              <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                 <label style={{ display: 'block', fontSize: '0.65rem', fontWeight: 900, opacity: 0.5, marginBottom: '0.5rem' }}>RAW ARTIFACT SOURCE</label>
                 <textarea 
                   value={nodes.find(n => n.id === selectedNodeId)?.code}
                   onChange={(e) => setNodes(nodes.map(n => n.id === selectedNodeId ? { ...n, code: e.target.value } : n))}
                   style={{ flex: 1, width: '100%', background: '#020617', border: '1px solid rgba(255,255,255,0.1)', padding: '1.5rem', borderRadius: '18px', color: '#06b6d4', fontFamily: 'monospace', fontSize: '0.9rem', resize: 'none' }}
                 />
              </div>
              <button style={{ marginTop: '1.5rem', width: '100%', padding: '1.2rem', background: 'rgba(59, 130, 246, 0.1)', borderRadius: '15px', border: '1px solid rgba(59, 130, 246, 0.2)', color: '#3b82f6', fontWeight: 900 }}>SAVE METADATA</button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Synthesis Overlay */}
        <AnimatePresence>
          {synthesizedCode && (
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              style={{ position: 'fixed', inset: 0, zIndex: 10000, background: 'rgba(0,0,0,0.9)', backdropFilter: 'blur(30px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '3rem' }}
            >
               <div style={{ width: '850px', background: '#0f172a', borderRadius: '48px', border: '1px solid rgba(255,255,255,0.1)', padding: '4rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem', marginBottom: '2.5rem' }}>
                    <div style={{ width: '60px', height: '60px', background: '#3b82f6', borderRadius: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Zap color="white" size={30} /></div>
                    <h2 style={{ fontSize: '2.5rem', fontWeight: 950, letterSpacing: '-1.5px' }}>Blueprint Sentezlendi</h2>
                  </div>
                  <div style={{ background: '#020617', padding: '2.5rem', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.05)', maxHeight: '400px', overflow: 'auto' }}>
                    <pre style={{ color: '#06b6d4', fontSize: '1rem', lineHeight: 1.6 }}>{synthesizedCode}</pre>
                  </div>
                  <div style={{ marginTop: '2.5rem', display: 'flex', gap: '1rem' }}>
                    <button onClick={() => setSynthesizedCode(null)} style={{ flex: 1, padding: '1.5rem', background: 'rgba(255,255,255,0.05)', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.1)', color: 'white', fontWeight: 800 }}>Vazgeç</button>
                    <button style={{ flex: 2, padding: '1.5rem', background: '#3b82f6', borderRadius: '20px', border: 'none', color: 'white', fontWeight: 950, fontSize: '1.1rem' }}>Sentezi İndir (.zip)</button>
                  </div>
               </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Connection Tooltip */}
        <AnimatePresence>
          {pendingConnection && (
            <motion.div initial={{ y: 50 }} animate={{ y: 0 }} style={{ position: 'fixed', bottom: '2rem', left: '50%', x: '-50%', padding: '1rem 2rem', background: '#3b82f6', color: 'white', borderRadius: '100px', fontWeight: 900, fontSize: '0.9rem', boxShadow: '0 10px 40px rgba(59, 130, 246, 0.4)', zIndex: 1000, display: 'flex', alignItems: 'center', gap: '10px' }}>
              <LinkIcon size={18} /> Bağlantı modundasınız: Diğer düğümün mavi portuna dokunun
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default SynthesisLabPage;
