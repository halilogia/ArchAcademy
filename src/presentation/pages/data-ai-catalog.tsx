import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Database, 
  Brain, 
  Cpu, 
  Network, 
  ShieldCheck, 
  Activity, 
  Zap,
  Layers,
  Search,
  HardDrive
} from 'lucide-react';

interface ArchItem {
  id: string;
  name: string;
  path: string;
  desc: string;
  icon: React.ReactNode;
  color: string;
  pos: { x: number; y: number };
}

const DataAICatalogPage: React.FC = () => {
  const navigate = useNavigate();
  const [hoveredItem, setHoveredItem] = useState<ArchItem | null>(null);

  // Parallax Logic
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX - window.innerWidth / 2);
      mouseY.set(e.clientY - window.innerHeight / 2);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  const xPos = useSpring(useTransform(mouseX, [-500, 500], [-30, 30]));
  const yPos = useSpring(useTransform(mouseY, [-500, 500], [-30, 30]));

  const items: ArchItem[] = [
    { id: 'rag', name: 'RAG Arch', path: '/rag-arch', color: '#8b5cf6', icon: <Brain />, desc: 'Retrieval Augmented Generation: LLM verimliliği.', pos: { x: 30, y: 35 } },
    { id: 'agents', name: 'Agentic AI', path: '/agentic-ai', color: '#ef4444', icon: <Cpu />, desc: 'Otonom karar veren yapay zeka ajanları.', pos: { x: 25, y: 60 } },
    { id: 'vector', name: 'Vector DBs', path: '#', color: '#3b82f6', icon: <Database />, desc: 'Yüksek boyutlu embedding saklama.', pos: { x: 45, y: 45 } },
    { id: 'cqrs', name: 'CQRS', path: '/cqrs', color: '#ec4899', icon: <Activity />, desc: 'Command ve Query sorumluluk ayrımı.', pos: { x: 65, y: 30 } },
    { id: 'eventsourcing', name: 'Event Sourcing', path: '/event-sourcing', color: '#f59e0b', icon: <Layers />, desc: 'Durumun olay dizisi olarak saklanması.', pos: { x: 70, y: 55 } },
    { id: 'cap', name: 'CAP Theorem', path: '/cap-theorem', color: '#3b82f6', icon: <Search />, desc: 'Consistency, Availability, Partition Tolerance.', pos: { x: 50, y: 70 } },
    { id: 'acid', name: 'ACID', path: '/acid', color: '#10b981', icon: <ShieldCheck />, desc: 'Veritabanı işlem bütünlüğü kuralları.', pos: { x: 40, y: 20 } },
    { id: 'bigdata', name: 'Big Data', path: '/big-data', color: '#06b6d4', icon: <Network />, desc: 'Lambda ve Kappa veri mimarileri.', pos: { x: 80, y: 40 } },
    { id: 'llmops', name: 'LLMOps', path: '/llm-ops', color: '#6366f1', icon: <Zap />, desc: 'AI modellerinin operasyonel süreçleri.', pos: { x: 15, y: 50 } },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      style={{ 
        background: '#020617', 
        minHeight: '100vh', 
        overflow: 'hidden', 
        position: 'relative' 
      }}
    >
      {/* Background Matrix/Grid Effect */}
      <div style={{ position: 'absolute', inset: 0, opacity: 0.15, pointerEvents: 'none' }}>
         <svg width="100%" height="100%">
            <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
               <path d="M 50 0 L 0 0 0 50" fill="none" stroke="white" strokeWidth="0.5" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#grid)" />
         </svg>
      </div>

      <div style={{ position: 'relative', width: '100vw', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
         
         {/* Neural Connections Layer */}
         <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 1 }}>
            {items.map((item, i) => (
                items.slice(i + 1).map((target) => {
                    const dist = Math.hypot(item.pos.x - target.pos.x, item.pos.y - target.pos.y);
                    if (dist > 35) return null;

                    return (
                        <motion.line
                            key={`${item.id}-${target.id}`}
                            x1={`${item.pos.x}%`} y1={`${item.pos.y}%`}
                            x2={`${target.pos.x}%`} y2={`${target.pos.y}%`}
                            stroke={item.color}
                            strokeWidth="1"
                            strokeOpacity="0.1"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 2 }}
                        />
                    );
                })
            ))}
         </svg>

         {/* Floating Nodes */}
         {items.map((item) => (
            <motion.div
               key={item.id}
               style={{
                  position: 'absolute',
                  left: `${item.pos.x}%`,
                  top: `${item.pos.y}%`,
                  x: xPos,
                  y: yPos,
                  zIndex: 10
               }}
            >
               <motion.div
                  onMouseEnter={() => setHoveredItem(item)}
                  onMouseLeave={() => setHoveredItem(null)}
                  onClick={() => item.path !== '#' && navigate(item.path)}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  whileHover={{ scale: 1.25, zIndex: 50 }}
                  transition={{ type: "spring", stiffness: 260, damping: 20 }}
                  style={{
                     transform: 'translate(-50%, -50%)',
                     cursor: item.path !== '#' ? 'pointer' : 'default',
                     position: 'relative'
                  }}
               >
                   {/* Node Glow */}
                   <motion.div 
                     animate={{ opacity: [0.2, 0.5, 0.2], scale: [1, 1.3, 1] }}
                     transition={{ duration: 4, repeat: Infinity }}
                     style={{ position: 'absolute', inset: -25, background: item.color, filter: 'blur(35px)', borderRadius: '50%', zIndex: -1 }} 
                   />

                   {/* Node Body */}
                   <div style={{ 
                      width: '90px', height: '90px', 
                      background: 'rgba(15, 23, 42, 0.9)', 
                      backdropFilter: 'blur(12px)',
                      border: `2px solid ${item.color}66`, 
                      borderRadius: '50%', 
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      boxShadow: `0 0 25px ${item.color}30`
                   }}>
                      <div style={{ color: item.color }}>
                         {React.cloneElement(item.icon as React.ReactElement<any>, { size: 36 })}
                      </div>
                   </div>

                   {/* Subtle Label */}
                   <div style={{ 
                      position: 'absolute', top: '105px', left: '50%', transform: 'translateX(-50%)', 
                      color: 'white', whiteSpace: 'nowrap', fontWeight: 900, fontSize: '0.8rem',
                      background: 'rgba(2, 6, 23, 0.6)', padding: '4px 12px', borderRadius: '100px',
                      border: `1px solid ${item.color}33`, letterSpacing: '1px'
                   }}>
                      {item.name}
                   </div>
               </motion.div>
            </motion.div>
         ))}

         {/* Detailed Info Panel */}
         <AnimatePresence>
            {hoveredItem && (
               <motion.div
                  initial={{ opacity: 0, x: -100, filter: 'blur(10px)' }}
                  animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, x: -100, filter: 'blur(10px)' }}
                  style={{
                     position: 'fixed',
                     bottom: '60px',
                     left: '60px',
                     width: '450px',
                     background: 'rgba(2, 6, 23, 0.95)',
                     border: `1px solid ${hoveredItem.color}44`,
                     borderLeft: `8px solid ${hoveredItem.color}`,
                     padding: '2.5rem',
                     borderRadius: '24px',
                     backdropFilter: 'blur(30px)',
                     boxShadow: `0 30px 100px rgba(0,0,0,0.8)`,
                     zIndex: 1000
                  }}
               >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '1.5rem' }}>
                      <div style={{ color: hoveredItem.color }}>
                         {React.cloneElement(hoveredItem.icon as React.ReactElement<any>, { size: 48 })}
                      </div>
                      <h2 style={{ fontSize: '2.2rem', fontWeight: 900, margin: 0, color: 'white', letterSpacing: '-1px' }}>{hoveredItem.name}</h2>
                  </div>
                  <p style={{ fontSize: '1.2rem', color: '#94a3b8', lineHeight: 1.7, margin: '0 0 2rem' }}>{hoveredItem.desc}</p>
                  
                  <div style={{ display: 'flex', gap: '12px' }}>
                    <div style={{ fontSize: '0.75rem', fontWeight: 800, color: hoveredItem.color, border: `1px solid ${hoveredItem.color}66`, padding: '6px 16px', borderRadius: '100px', background: `${hoveredItem.color}11` }}>
                       NEURAL DATA MAP
                    </div>
                    {hoveredItem.path !== '#' && (
                        <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#10b981', border: '1px solid #10b98166', padding: '6px 16px', borderRadius: '100px', background: '#10b98111' }}>
                           LAB READY
                        </div>
                    )}
                  </div>
               </motion.div>
            )}
         </AnimatePresence>

         <div style={{ position: 'absolute', top: '120px', left: '0', width: '100%', textAlign: 'center', pointerEvents: 'none' }}>
            <h1 style={{ fontSize: '6rem', fontWeight: 950, opacity: 0.03, color: 'white', letterSpacing: '10px' }}>INTELLIGENCE MAP</h1>
         </div>
      </div>
    </motion.div>
  );
};

export default DataAICatalogPage;
