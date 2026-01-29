import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useSpring } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Database, 
  BrainCircuit, 
  Share2, 
  Cpu, 
  Server, 
  Activity, 
  Zap, 
  HardDrive,
  Network
} from 'lucide-react';

interface ArchItem {
  id: string;
  name: string;
  path: string;
  color: string;
  icon: React.ReactNode;
  desc: string;
  pos: { x: number, y: number }; // Relative position percentage
}

const DataAICatalogPage = () => {
  const navigate = useNavigate();
  const [hoveredItem, setHoveredItem] = useState<ArchItem | null>(null);
  
  // Custom cursor position for parallax
  const x = useSpring(0, { damping: 30, stiffness: 200 });
  const y = useSpring(0, { damping: 30, stiffness: 200 });

  useEffect(() => {
     const handleMouseMove = (e: MouseEvent) => {
        const cx = window.innerWidth / 2;
        const cy = window.innerHeight / 2;
        x.set((e.clientX - cx) / 30);
        y.set((e.clientY - cy) / 30);
     };
     window.addEventListener('mousemove', handleMouseMove);
     return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [x, y]);

  const items: ArchItem[] = [
    { id: 'rag', name: 'RAG Architecture', path: '/rag-arch', color: '#8b5cf6', icon: <Database size={24} />, desc: 'LLM\'leri vektör veritabanı ile besleyerek doğru bilgi üretme.', pos: { x: 50, y: 50 } }, // CENTER
    { id: 'agents', name: 'Agentic Workflows', path: '/agentic-ai', color: '#ec4899', icon: <BrainCircuit size={24} />, desc: 'Otonom düşünen ve araç kullanan yapay zeka ajanları.', pos: { x: 30, y: 35 } },
    { id: 'bigdata', name: 'Big Data & Lambda', path: '/big-data', color: '#3b82f6', icon: <Server size={24} />, desc: 'Batch ve Stream veriyi aynı anda işleyen hibrit yapılar.', pos: { x: 70, y: 35 } },
    { id: 'eventsourcing', name: 'Event Sourcing', path: '/event-sourcing', color: '#f59e0b', icon: <Activity size={24} />, desc: 'Verinin son hali değil, tüm değişim tarihçesini saklama.', pos: { x: 20, y: 55 } },
    { id: 'cqrs', name: 'CQRS', path: '/cqrs', color: '#10b981', icon: <Share2 size={24} />, desc: 'Okuma (Query) ve Yazma (Command) modellerini ayırma.', pos: { x: 80, y: 55 } },
    { id: 'llmops', name: 'LLMOps', path: '/llm-ops', color: '#6366f1', icon: <Cpu size={24} />, desc: 'Yapay zeka modellerinin prodüksiyon operasyonları.', pos: { x: 38, y: 72 } },
    { id: 'cap', name: 'CAP Theorem', path: '/cap-theorem', color: '#eab308', icon: <Zap size={24} />, desc: 'Distributed data: Consistency, Availability, Partitioning.', pos: { x: 62, y: 72 } },
    { id: 'acid', name: 'ACID Principles', path: '/acid', color: '#f43f5e', icon: <HardDrive size={24} />, desc: 'Transaction güvenliği ve veri bütünlüğü kuralları.', pos: { x: 50, y: 28 } },
    { id: 'kappa', name: 'Kappa Arch', path: '/kappa', color: '#06b6d4', icon: <Network size={24} />, desc: 'Sadece stream (akış) verisi ile basitleştirilmiş veri mimarisi.', pos: { x: 50, y: 82 } }
  ];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ background: '#09090b', minHeight: '100vh', overflow: 'hidden', position: 'relative' }}>
      
      {/* Dynamic Background */}
      <div style={{ position: 'absolute', inset: 0, opacity: 0.1 }}>
         <svg width="100%" height="100%">
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
               <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#grid)" />
         </svg>
      </div>

      {/* Main Container */}
      <div style={{ position: 'relative', width: '100vw', height: '100vh' }}>
         
         {/* Connecting Lines (Neural Network Effect) */}
         <svg style={{ position: 'absolute', width: '100%', height: '100%', pointerEvents: 'none', zIndex: 1 }}>
            {items.map((item, i) => (
                items.slice(i + 1).map((target, j) => {
                    // Draw lines only between somewhat close nodes to create a mesh, not a mess
                    const dist = Math.hypot(item.pos.x - target.pos.x, item.pos.y - target.pos.y);
                    if (dist > 40) return null; // Skip far connections

                    return (
                        <motion.line
                            key={`${item.id}-${target.id}`}
                            x1={`${item.pos.x}%`} y1={`${item.pos.y}%`}
                            x2={`${target.pos.x}%`} y2={`${target.pos.y}%`}
                            stroke="rgba(255,255,255,0.05)"
                            strokeWidth="1"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 2, delay: 0.5 }}
                        />
                    )
                })
            ))}
         </svg>

         {/* Nodes */}
         {items.map((item) => (
            <motion.div
               key={item.id}
               style={{
                  position: 'absolute',
                  left: `${item.pos.x}%`,
                  top: `${item.pos.y}%`,
                  x, // Parallax X
                  y, // Parallax Y
                  zIndex: 10
               }}
            >
               <motion.div
                  onMouseEnter={() => setHoveredItem(item)}
                  onMouseLeave={() => setHoveredItem(null)}
                  onClick={() => navigate(item.path)}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  whileHover={{ scale: 1.3, zIndex: 20 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  style={{
                     transform: 'translate(-50%, -50%)', // Center the div on coordinates
                     cursor: 'pointer',
                     position: 'relative'
                  }}
               >
                   {/* Glow Effect Behind */}
                   <motion.div 
                     animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.2, 1] }}
                     transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                     style={{ position: 'absolute', inset: -20, background: item.color, filter: 'blur(30px)', borderRadius: '50%', zIndex: -1 }} 
                   />

                   {/* The Node Itself */}
                   <div style={{ 
                      width: '80px', height: '80px', 
                      background: 'rgba(15, 23, 42, 0.8)', 
                      backdropFilter: 'blur(10px)',
                      border: `2px solid ${item.color}`, 
                      borderRadius: '50%', 
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      boxShadow: `0 0 15px ${item.color}40`
                   }}>
                      <div style={{ color: item.color }}>
                         {React.cloneElement(item.icon as React.ReactElement, { size: 32 })}
                      </div>
                   </div>

                   {/* Title Label (Always visible or on hover? Let's make it always visible but subtle) */}
                   <motion.div 
                      style={{ 
                          position: 'absolute', top: '90px', left: '50%', transform: 'translateX(-50%)', 
                          color: item.color, whiteSpace: 'nowrap', fontWeight: 'bold', textShadow: '0 2px 4px rgba(0,0,0,0.8)',
                          background: 'rgba(0,0,0,0.5)', padding: '4px 8px', borderRadius: '6px'
                      }}
                   >
                      {item.name}
                   </motion.div>
               </motion.div>
            </motion.div>
         ))}

         {/* Info Panel (Bottom Left Fixed) */}
         <AnimatePresence>
            {hoveredItem && (
               <motion.div
                  initial={{ opacity: 0, x: -50, filter: 'blur(10px)' }}
                  animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, x: -50, filter: 'blur(10px)' }}
                  style={{
                     position: 'fixed',
                     bottom: '50px',
                     left: '50px',
                     maxWidth: '400px',
                     background: 'rgba(2, 6, 23, 0.9)',
                     border: `1px solid ${hoveredItem.color}`,
                     borderLeft: `6px solid ${hoveredItem.color}`,
                     padding: '2rem',
                     borderRadius: '16px',
                     backdropFilter: 'blur(20px)',
                     boxShadow: `0 20px 50px rgba(0,0,0,0.5)`,
                     zIndex: 100
                  }}
               >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                      <div style={{ p: 2, color: hoveredItem.color }}>
                         {React.cloneElement(hoveredItem.icon as React.ReactElement, { size: 40 })}
                      </div>
                      <h2 style={{ fontSize: '2rem', fontWeight: 800, margin: 0, color: 'white', lineHeight: 1 }}>{hoveredItem.name}</h2>
                  </div>
                  <p style={{ fontSize: '1.1rem', color: '#cbd5e1', lineHeight: 1.6 }}>{hoveredItem.desc}</p>
                  
                  <div style={{ marginTop: '1.5rem', display: 'flex', gap: '10px' }}>
                    <div style={{ fontSize: '0.8rem', color: hoveredItem.color, border: `1px solid ${hoveredItem.color}`, padding: '4px 12px', borderRadius: '100px' }}>
                       AI & DATA
                    </div>
                    <div style={{ fontSize: '0.8rem', color: '#64748b', border: '1px solid #334155', padding: '4px 12px', borderRadius: '100px' }}>
                       PRO LEVEL
                    </div>
                  </div>
               </motion.div>
            )}
         </AnimatePresence>
      </div>

      <div style={{ position: 'absolute', top: '100px', left: '0', width: '100%', textAlign: 'center', pointerEvents: 'none' }}>
         <h1 className="gradient-text" style={{ fontSize: '4rem', fontWeight: 900, opacity: 0.1 }}>NEURAL DATA MAP</h1>
      </div>

    </motion.div>
  );
};

export default DataAICatalogPage;
