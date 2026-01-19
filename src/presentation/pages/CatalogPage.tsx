import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Hexagon, Zap, MousePointer2, Compass, Sparkles, Orbit } from 'lucide-react';

interface ArchItem {
  name: string;
  path: string;
  color: string;
  desc: string;
}

interface ArchCategory {
  id: string;
  name: string;
  color: string;
  items: ArchItem[];
}

const CatalogPage = () => {
  const navigate = useNavigate();
  const [hoveredItem, setHoveredItem] = useState<ArchItem | null>(null);
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRotation(prev => (prev + 0.02) % 360);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  const categories: ArchCategory[] = [
    {
      id: 'data-centric',
      name: 'Data-Centric',
      color: '#3b82f6',
      items: [
        { name: 'CQRS', path: '/cqrs', color: '#3b82f6', desc: 'Komut ve sorgu sorumluluklarının ayrılması.' },
        { name: 'Event Sourcing', path: '/event-sourcing', color: '#60a5fa', desc: 'Veriyi olaylar dizisi olarak saklama.' }
      ]
    },
    {
      id: 'layered',
      name: 'Layered',
      color: '#2563eb',
      items: [
        { name: 'Clean / Onion', path: '/clean-arch', color: '#2563eb', desc: 'Domain merkezli katmanlı yapılar.' },
        { name: 'n-Tier Architecture', path: '/horizontal', color: '#3b82f6', desc: 'Klasik sorumluluk bazlı katmanlandırma.' }
      ]
    },
    {
      id: 'component',
      name: 'Component-Based',
      color: '#10b981',
      items: [
        { name: 'Object-Oriented', path: '/object-oriented', color: '#10b981', desc: 'Nesne tabanlı modüler tasarım.' },
        { name: 'Microkernel', path: '/microkernel', color: '#059669', desc: 'Eklenti tabanlı çekirdek sistemi.' },
        { name: 'Evolutionary', path: '/evolution', color: '#34d399', desc: 'Zamanla evrilebilen esnek yapılar.' },
        { name: 'ECS Architecture', path: '/ecs', color: '#10b981', desc: 'Yüksek performanslı veri odaklı tasarım.' }
      ]
    },
    {
      id: 'service',
      name: 'Service-Oriented',
      color: '#f43f5e',
      items: [
        { name: 'Plug-in', path: '/plugin', color: '#f43f5e', desc: 'Dinamik modül ekleme mimarisi.' },
        { name: 'SOA Arch', path: '/soa', color: '#fb7185', desc: 'Kurumsal servis haberleşme stratejisi.' },
        { name: 'Broker Styles', path: '/broker', color: '#fda4af', desc: 'Mesaj tabanlı aracı sistemler.' },
        { name: 'Microservices', path: '/system', color: '#f43f5e', desc: 'Bağımsız servisler ekosistemi.' },
        { name: 'Serverless (FaaS)', path: '/serverless', color: '#e11d48', desc: 'Sunucusuz fonksiyon mimarisi.' }
      ]
    },
    {
      id: 'distributed',
      name: 'Distributed System',
      color: '#eab308',
      items: [
        { name: 'Space-Based', path: '/space-based', color: '#eab308', desc: 'In-memory veri hızı ve performans.' },
        { name: 'Peer-to-Peer', path: '/p2p', color: '#facc15', desc: 'Düğümler arası doğrudan iletişim.' }
      ]
    },
    {
      id: 'domain',
      name: 'Domain-Driven',
      color: '#a855f7',
      items: [
        { name: 'Hexagonal', path: '/hexagonal', color: '#a855f7', desc: 'Ports & Adapters soyutlama modeli.' },
        { name: 'DDD Architecture', path: '/ddd', color: '#c084fc', desc: 'Domain odaklı mimari tasarım.' }
      ]
    },
    {
      id: 'event',
      name: 'Event-Driven',
      color: '#f97316',
      items: [
        { name: 'Event-Driven', path: '/eda', color: '#f97316', desc: 'Olay yayıncıları ve dinleyicileri.' },
        { name: 'Publish-Subscribe', path: '/pub-sub', color: '#fb923c', desc: 'Mesaj abonelik haberleşme deseni.' }
      ]
    },
    {
      id: 'concern',
      name: 'Separation of Concern',
      color: '#ec4899',
      items: [
        { name: 'MVC', path: '/mvc-mvvm', color: '#ec4899', desc: 'Model-View-Controller deseni.' },
        { name: 'MVVM', path: '/mvvm', color: '#f472b6', desc: 'Model-View-ViewModel reaktif yapı.' },
        { name: 'MVP', path: '/mvp', color: '#db2777', desc: 'Model-View-Presenter etkileşimi.' }
      ]
    },
    {
      id: 'interpreter',
      name: 'Interpreter',
      color: '#06b6d4',
      items: [
        { name: 'Interpreter Logic', path: '/interpreter', color: '#06b6d4', desc: 'Komut yorumlama mimarisi.' }
      ]
    },
    {
      id: 'concurrency',
      name: 'Concurrency',
      color: '#8b5cf6',
      items: [
        { name: 'Pipe-Filter', path: '/pipe-filter', color: '#8b5cf6', desc: 'Verinin süzgeçlerden akışı.' },
        { name: 'Primary-Secondary', path: '/primary-secondary', color: '#a78bfa', desc: 'Veri replikasyonu ve yedekleme.' },
        { name: 'Choreography', path: '/choreography', color: '#7c3aed', desc: 'Dağıtık olay senkronizasyonu.' },
        { name: 'Orchestration', path: '/orchestration', color: '#8b5cf6', desc: 'Merkezi servis koordinasyonu.' },
        { name: 'Lambda', path: '/lambda', color: '#6366f1', desc: 'Hibrit büyük veri işleme.' },
        { name: 'Kappa', path: '/kappa', color: '#4f46e5', desc: 'Anlık akış odaklı veri işleme.' }
      ]
    }
  ];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ background: '#020617', minHeight: '100vh', paddingTop: '80px', overflowX: 'hidden' }}>
      <div className="container" style={{ position: 'relative' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(59, 130, 246, 0.1)', padding: '0.5rem 1.2rem', borderRadius: '100px', color: '#3b82f6', fontWeight: 800, fontSize: '0.9rem', marginBottom: '1rem', border: '1px solid rgba(59, 130, 246, 0.3)' }}>
            <Sparkles size={16} /> VIBRANT ARCHITECTURE MATRIX
          </motion.div>
          <h1 style={{ fontSize: '4.5rem', fontWeight: 950, letterSpacing: '-3px', margin: 0, color: 'white' }}>
            Software <span className="gradient-text">Architecture</span>
          </h1>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(800px, 1.6fr) 1fr', gap: '2rem', alignItems: 'center' }}>
          <div style={{ position: 'relative', height: '1000px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg viewBox="0 0 1100 1100" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
               <defs>
                 <filter id="color-glow-ultra" x="-100%" y="-100%" width="300%" height="300%">
                   <feGaussianBlur stdDeviation="25" result="blur" />
                   <feComposite in="SourceGraphic" in2="blur" operator="over" />
                 </filter>
                 <linearGradient id="center-glow-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#3b82f6" />
                    <stop offset="100%" stopColor="#8b5cf6" />
                 </linearGradient>
               </defs>

               <motion.g animate={{ rotate: rotation }} style={{ transformOrigin: '550px 550px' }}>
                 <circle cx={550} cy={550} r={115} fill="#0f172a" stroke="url(#center-glow-grad)" strokeWidth={3} />
                 <text x={550} y={558} textAnchor="middle" fill="white" fontWeight="950" fontSize={22} style={{ letterSpacing: '8px', textShadow: '0 0 20px #3b82f6' }}>MATRIX</text>
               </motion.g>

               {categories.map((cat, catIdx) => {
                 const sliceAngle = 360 / categories.length;
                 const startAngle = catIdx * sliceAngle;
                 
                 return (
                   <g key={cat.id}>
                     {cat.items.map((item, itemIdx) => {
                       const itemSliceAngle = sliceAngle / cat.items.length;
                       const itemStartAngle = startAngle + (itemIdx * itemSliceAngle);
                       const itemEndAngle = itemStartAngle + itemSliceAngle;
                       
                       const radStart = (itemStartAngle - 90) * (Math.PI / 180);
                       const radEnd = (itemEndAngle - 90) * (Math.PI / 180);
                       
                       const innerR = 135;
                       const outerR = 510; // ÇARK BÜYÜTÜLDÜ (Eski: 380)
                       
                       const isHovered = hoveredItem?.name === item.name;

                       const x1_i = 550 + innerR * Math.cos(radStart);
                       const y1_i = 550 + innerR * Math.sin(radStart);
                       const x2_i = 550 + innerR * Math.cos(radEnd);
                       const y2_i = 550 + innerR * Math.sin(radEnd);
                       const x1_o = 550 + outerR * Math.cos(radStart);
                       const y1_o = 550 + outerR * Math.sin(radStart);
                       const x2_o = 550 + outerR * Math.cos(radEnd);
                       const y2_o = 550 + outerR * Math.sin(radEnd);

                       return (
                         <motion.path
                           key={item.name}
                           d={`M ${x1_i} ${y1_i} L ${x1_o} ${y1_o} A ${outerR} ${outerR} 0 0 1 ${x2_o} ${y2_o} L ${x2_i} ${y2_i} A ${innerR} ${innerR} 0 0 0 ${x1_i} ${y1_i}`}
                           fill={cat.color}
                           fillOpacity={isHovered ? 1 : 0.85}
                           stroke={isHovered ? "white" : "rgba(255,255,255,0.15)"}
                           strokeWidth={isHovered ? "5" : "1"}
                           initial={false}
                           animate={{ 
                             scale: isHovered ? 1.04 : 1,
                             filter: isHovered ? 'url(#color-glow-ultra)' : 'none',
                           }}
                           onMouseEnter={() => setHoveredItem(item)}
                           onMouseLeave={() => setHoveredItem(null)}
                           onClick={() => navigate(item.path)}
                           style={{ cursor: 'pointer', transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)' }}
                         />
                       );
                     })}

                     {/* Yazılar çarkın içinde ama merkeze uzak (Radius: 360) */}
                     {(() => {
                        const midAngle = startAngle + (sliceAngle / 2);
                        const radMid = (midAngle - 90) * (Math.PI / 180);
                        const x = 550 + 320 * Math.cos(radMid); // Merkeze çok bitişik değil, çarkın içinde dengeli konum
                        const y = 550 + 320 * Math.sin(radMid);
                        return (
                          <text 
                            x={x} y={y} 
                            fill="white" 
                            fontSize="12" 
                            fontWeight="950" 
                            textAnchor="middle" 
                            style={{ 
                              pointerEvents: 'none', 
                              letterSpacing: '1.5px',
                              textShadow: '0 2px 10px rgba(0,0,0,0.9), 0 0 20px rgba(0,0,0,0.5)',
                              transform: `rotate(${midAngle > 90 && midAngle < 270 ? midAngle + 180 : midAngle}deg)`, 
                              transformOrigin: `${x}px ${y}px`,
                              opacity: 0.95
                            }}
                          >
                            {cat.name.toUpperCase()}
                          </text>
                        );
                     })()}
                   </g>
                 );
               })}
            </svg>
          </div>

          <div style={{ position: 'sticky', top: '150px' }}>
             <AnimatePresence mode="wait">
               {hoveredItem ? (
                 <motion.div 
                   key={hoveredItem.name} 
                   initial={{ opacity: 0, scale: 0.9 }} 
                   animate={{ opacity: 1, scale: 1 }} 
                   exit={{ opacity: 0, scale: 0.9 }} 
                   className="glass-card" 
                   style={{ 
                     padding: '3.5rem', 
                     borderRadius: '60px',
                     border: `6px solid ${hoveredItem.color}`,
                     background: `linear-gradient(135deg, ${hoveredItem.color}44 0%, rgba(15, 23, 42, 1) 100%)`,
                     boxShadow: `0 0 100px ${hoveredItem.color}44, 0 40px 150px rgba(0,0,0,0.9)`
                   }}
                 >
                   <div style={{ color: hoveredItem.color, marginBottom: '2rem' }}>
                     <Compass size={60} className="glow-anim" />
                   </div>
                   <h2 style={{ fontSize: '3.2rem', fontWeight: 950, marginBottom: '1.2rem', color: 'white', letterSpacing: '-2px', lineHeight: 1 }}>
                     {hoveredItem.name}
                   </h2>
                   <p style={{ fontSize: '1.3rem', color: 'rgba(255,255,255,0.9)', lineHeight: 1.6, marginBottom: '2.5rem' }}>{hoveredItem.desc}</p>
                   <button 
                     onClick={() => navigate(hoveredItem.path)} 
                     style={{ 
                       background: hoveredItem.color, 
                       color: 'white', 
                       width: '100%', 
                       padding: '1.5rem', 
                       borderRadius: '25px', 
                       fontWeight: 950, 
                       border: 'none', 
                       cursor: 'pointer',
                       fontSize: '1.2rem',
                       display: 'flex',
                       alignItems: 'center',
                       justifyContent: 'center',
                       gap: '1rem',
                       textTransform: 'uppercase',
                       boxShadow: `0 15px 40px ${hoveredItem.color}55`
                      }}
                    >
                      EĞİTİME BAŞLA <Zap size={24} />
                    </button>
                 </motion.div>
               ) : (
                 <div className="glass-card" style={{ padding: '6rem', textAlign: 'center', opacity: 1, borderRadius: '60px', border: '3px dashed rgba(255,255,255,0.1)' }}>
                    <Compass size={80} color="rgba(255,255,255,0.2)" style={{ margin: '0 auto 2rem' }} />
                    <h3 style={{ fontSize: '2rem', fontWeight: 900, marginBottom: '1rem', color: 'white' }}>ARCHITECT'S HUB</h3>
                    <p style={{ fontSize: '1.1rem', color: 'rgba(255,255,255,0.4)' }}>Daha büyük, daha canlı ve daha okunaklı.</p>
                 </div>
               )}
             </AnimatePresence>
          </div>
        </div>
      </div>
      <style>{`
        .glow-anim { animation: glow-pulse-heavy 2s infinite; }
        @keyframes glow-pulse-heavy { 0% { filter: drop-shadow(0 0 5px currentColor); } 50% { filter: drop-shadow(0 0 30px currentColor); } 100% { filter: drop-shadow(0 0 5px currentColor); } }
      `}</style>
    </motion.div>
  );
};

export default CatalogPage;
