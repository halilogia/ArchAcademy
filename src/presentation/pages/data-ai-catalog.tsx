import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { 
  Database, 
  Brain, 
  Cpu, 
  Network, 
  ShieldCheck, 
  Activity, 
  Zap, 
  Layers, 
  Search 
} from 'lucide-react';
import SEO from '../components/SEO';

interface ArchItem {
  id: string;
  name: string;
  path: string;
  desc: { tr: string; en: string };
  icon: React.ReactNode;
  color: string;
  pos: { x: number; y: number };
}

const DataAICatalogPage: React.FC = () => {
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  const isEn = (i18n.resolvedLanguage || i18n.language || 'tr').startsWith('en');

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
    { 
      id: 'rag', 
      name: 'RAG Arch', 
      path: '/rag-arch', 
      color: '#8b5cf6', 
      icon: <Brain />, 
      desc: { 
        tr: 'Retrieval Augmented Generation: LLM verimliliği ve halüsinasyon engelleme.', 
        en: 'Retrieval-Augmented Generation: External knowledge retrieval and hallucination mitigation.' 
      }, 
      pos: { x: 30, y: 35 } 
    },
    { 
      id: 'agents', 
      name: 'Agentic AI', 
      path: '/agentic-ai', 
      color: '#ef4444', 
      icon: <Cpu />, 
      desc: { 
        tr: 'Otonom karar veren yapay zeka ajanları ve araç kullanımı.', 
        en: 'Autonomous decision-making AI agents with multi-step tool invocation.' 
      }, 
      pos: { x: 25, y: 60 } 
    },
    { 
      id: 'vector', 
      name: 'Vector DBs', 
      path: '/vector-dbs', 
      color: '#3b82f6', 
      icon: <Database />, 
      desc: { 
        tr: 'Yüksek boyutlu verileri (Embeddings) verimli saklama ve semantik arama.', 
        en: 'Storing high-dimensional embeddings and high-performance semantic vector search.' 
      }, 
      pos: { x: 45, y: 45 } 
    },
    { 
      id: 'cqrs', 
      name: 'CQRS', 
      path: '/cqrs', 
      color: '#ec4899', 
      icon: <Activity />, 
      desc: { 
        tr: 'Command (Yazma) ve Query (Okuma) sorumluluklarının ayrımı.', 
        en: 'Strict segregation of Command (Write) and Query (Read) data models.' 
      }, 
      pos: { x: 65, y: 30 } 
    },
    { 
      id: 'eventsourcing', 
      name: 'Event Sourcing', 
      path: '/event-sourcing', 
      color: '#f59e0b', 
      icon: <Layers />, 
      desc: { 
        tr: 'Durumun salt-okunur olay dizisi (Event Stream) olarak saklanması.', 
        en: 'Persisting application state as an append-only sequence of immutable events.' 
      }, 
      pos: { x: 70, y: 55 } 
    },
    { 
      id: 'cap', 
      name: 'CAP Theorem', 
      path: '/cap-theorem', 
      color: '#3b82f6', 
      icon: <Search />, 
      desc: { 
        tr: 'Tutarlılık, Erişilebilirlik ve Bölünme Toleransı dengeleri.', 
        en: 'Consistency, Availability, and Partition Tolerance trade-offs in distributed systems.' 
      }, 
      pos: { x: 50, y: 70 } 
    },
    { 
      id: 'acid', 
      name: 'ACID', 
      path: '/acid', 
      color: '#10b981', 
      icon: <ShieldCheck />, 
      desc: { 
        tr: 'İlişkisel veritabanı işlem bütünlüğü ve izolasyon kuralları.', 
        en: 'Relational database transaction guarantees: Atomicity, Consistency, Isolation, Durability.' 
      }, 
      pos: { x: 40, y: 20 } 
    },
    { 
      id: 'lambda-kappa', 
      name: 'Lambda & Kappa', 
      path: '/lambda-kappa', 
      color: '#06b6d4', 
      icon: <Network />, 
      desc: { 
        tr: 'Büyük veri işleme (Stream vs Batch) hibrit mimarileri.', 
        en: 'Big data processing paradigms: Real-time stream processing vs batch pipelines.' 
      }, 
      pos: { x: 80, y: 40 } 
    },
    { 
      id: 'llmops', 
      name: 'LLMOps', 
      path: '/llm-ops', 
      color: '#6366f1', 
      icon: <Zap />, 
      desc: { 
        tr: 'Yapay zeka modellerinin yaşam döngüsü ve üretim ortamı operasyonları.', 
        en: 'Operational pipelines, prompt versioning, observability, and lifecycle of LLMs.' 
      }, 
      pos: { x: 15, y: 50 } 
    },
  ];

  return (
    <>
      <SEO 
        title={isEn ? "Data & AI Architecture Neural Map | ArchAcademy" : "Veri & Yapay Zeka Mimarileri Haritası | ArchAcademy"}
        description={isEn 
          ? "Interactive neural network of Data & AI architectures: RAG, Agentic AI, Vector DBs, ACID, CQRS, and CAP Theorem." 
          : "Veri ve Yapay Zeka mimarileri interaktif sinir ağı haritası: RAG, Agentic AI, Vektör Veritabanları, ACID ve CQRS."
        }
        keywords="data architecture, ai architecture, rag, agentic ai, vector database, acid, cqrs, event sourcing"
        canonicalUrl="/data-ai-catalog"
      />
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

           {/* Floating Nodes Container with Parallax */}
           <motion.div 
              style={{ 
                 position: 'absolute', 
                 inset: 0, 
                 x: xPos, 
                 y: yPos,
                 zIndex: 2
              }}
           >
              {items.map((item) => {
                 const isHovered = hoveredItem?.id === item.id;
                 return (
                    <motion.div
                       key={item.id}
                       onClick={() => navigate(item.path)}
                       onMouseEnter={() => setHoveredItem(item)}
                       onMouseLeave={() => setHoveredItem(null)}
                       style={{
                          position: 'absolute',
                          left: `${item.pos.x}%`,
                          top: `${item.pos.y}%`,
                          transform: 'translate(-50%, -50%)',
                          cursor: 'pointer',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          gap: '8px'
                       }}
                       whileHover={{ scale: 1.25 }}
                       transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    >
                       <div 
                          style={{
                             width: isHovered ? '70px' : '55px',
                             height: isHovered ? '70px' : '55px',
                             borderRadius: '50%',
                             background: isHovered ? `${item.color}` : `rgba(15, 23, 42, 0.8)`,
                             border: `2px solid ${item.color}`,
                             display: 'flex',
                             alignItems: 'center',
                             justifyContent: 'center',
                             color: isHovered ? '#fff' : item.color,
                             boxShadow: isHovered ? `0 0 40px ${item.color}` : `0 0 15px ${item.color}33`,
                             backdropFilter: 'blur(10px)',
                             transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
                          }}
                       >
                          {item.icon}
                       </div>
                       <span style={{ 
                          color: isHovered ? '#fff' : 'rgba(255,255,255,0.7)', 
                          fontSize: '0.85rem', 
                          fontWeight: 700,
                          letterSpacing: '0.5px',
                          textShadow: isHovered ? `0 0 10px ${item.color}` : 'none',
                          background: 'rgba(2, 6, 23, 0.7)',
                          padding: '2px 8px',
                          borderRadius: '10px',
                          border: '1px solid rgba(255,255,255,0.05)'
                       }}>
                          {item.name}
                       </span>
                    </motion.div>
                 );
              })}
           </motion.div>

           {/* Holographic Detail HUD (On Hover) */}
           <AnimatePresence>
              {hoveredItem && (
                 <motion.div
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 20, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="glass-card"
                    style={{
                       position: 'absolute',
                       bottom: '40px',
                       left: '40px',
                       maxWidth: '400px',
                       borderLeft: `4px solid ${hoveredItem.color}`,
                       background: 'rgba(15, 23, 42, 0.85)',
                       backdropFilter: 'blur(16px)',
                       padding: '2rem',
                       zIndex: 10
                    }}
                 >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1rem' }}>
                       <div style={{ color: hoveredItem.color }}>{hoveredItem.icon}</div>
                       <h3 style={{ margin: 0, fontSize: '1.5rem', color: '#fff', fontWeight: 800 }}>{hoveredItem.name}</h3>
                    </div>
                    <p style={{ color: '#94a3b8', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                       {isEn ? hoveredItem.desc.en : hoveredItem.desc.tr}
                    </p>
                    <div style={{ display: 'flex', gap: '8px' }}>
                       <span style={{ fontSize: '0.75rem', fontWeight: 800, padding: '4px 10px', borderRadius: '100px', background: `${hoveredItem.color}20`, color: hoveredItem.color }}>
                          {isEn ? "NEURAL DATA MAP" : "SİNİR VERİ HARİTASI"}
                       </span>
                       <span style={{ fontSize: '0.75rem', fontWeight: 800, padding: '4px 10px', borderRadius: '100px', background: 'rgba(255,255,255,0.05)', color: '#64748b' }}>
                          {isEn ? "LAB READY" : "LABORATUVAR HAZIR"}
                       </span>
                    </div>
                 </motion.div>
              )}
           </AnimatePresence>

           {/* Ambient Backdrop Title */}
           <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', pointerEvents: 'none', textAlign: 'center', zIndex: 0, opacity: 0.05 }}>
              <h1 style={{ fontSize: '8vw', fontWeight: 900, letterSpacing: '10px', color: '#fff', margin: 0 }}>
                 INTELLIGENCE MAP
              </h1>
           </div>

        </div>
      </motion.div>
    </>
  );
};

export default DataAICatalogPage;
