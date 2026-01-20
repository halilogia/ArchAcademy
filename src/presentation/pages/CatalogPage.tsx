import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Hexagon, Zap, MousePointer2, Compass, Sparkles, Orbit, Shield } from 'lucide-react';

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
      id: 'domain-centric',
      name: 'Domain-Centric',
      color: '#a855f7',
      items: [
        { name: 'Clean Architecture', path: '/clean-arch', color: '#a855f7', desc: 'Uncle Bob\'un bağımsızlık katmanları.' },
        { name: 'Onion Architecture', path: '/onion', color: '#c084fc', desc: 'Bağımlılık yönü merkeze olan yapı.' },
        { name: 'DDD Architecture', path: '/ddd', color: '#d8b4fe', desc: 'İş mantığını dile ve bounded context\'e odaklayan tasarım.' },
        { name: 'Hexagonal', path: '/hexagonal', color: '#a855f7', desc: 'Ports & Adapters soyutlama modeli.' }
      ]
    },
    {
      id: 'layered-modern',
      name: 'Layered & Modern',
      color: '#3b82f6',
      items: [
        { name: 'Vertical Slice', path: '/vertical', color: '#3b82f6', desc: 'Modern startup odaklı özellik bazlı tasarım.' },
        { name: 'n-Tier (Horizontal)', path: '/horizontal', color: '#60a5fa', desc: 'Klasik sorumluluk bazlı katmanlandırma.' },
        { name: 'FSD (Frontend)', path: '/fsd', color: '#93c5fd', desc: 'Büyük ölçekli React/Next projeleri için katmanlı yapı.' }
      ]
    },
    {
      id: 'data-intensive',
      name: 'Data-Intensive',
      color: '#f97316',
      items: [
        { name: 'CQRS', path: '/cqrs', color: '#f97316', desc: 'Komut ve sorgu sorumluluklarının ayrılması.' },
        { name: 'Event Sourcing', path: '/event-sourcing', color: '#fb923c', desc: 'Veriyi olaylar dizisi olarak saklama.' },
        { name: 'Primary-Secondary', path: '/primary-secondary', color: '#fdba74', desc: 'Veri replikasyonu ve yedekleme stratejileri.' }
      ]
    },
    {
      id: 'distributed',
      name: 'Distributed Systems',
      color: '#eab308',
      items: [
        { name: 'Microservices', path: '/system', color: '#eab308', desc: 'Bağımsız servisler ekosistemi.' },
        { name: 'Serverless (FaaS)', path: '/serverless', color: '#facc15', desc: 'Sunucusuz fonksiyon mimarisi.' },
        { name: 'Space-Based', path: '/space-based', color: '#fde047', desc: 'In-memory veri hızı ve ekstrem performans.' },
        { name: 'Peer-to-Peer', path: '/p2p', color: '#eab308', desc: 'Düğümler arası doğrudan iletişim.' }
      ]
    },
    {
      id: 'event-messaging',
      name: 'Event & Messaging',
      color: '#ef4444',
      items: [
        { name: 'Event-Driven (EDA)', path: '/eda', color: '#ef4444', desc: 'Olay yayıncıları ve dinleyicileri.' },
        { name: 'Publish-Subscribe', path: '/pub-sub', color: '#f87171', desc: 'Mesaj abonelik haberleşme deseni.' },
        { name: 'Message Broker', path: '/broker', color: '#fca5a5', desc: 'Aracı tabanlı güvenli mesajlaşma.' }
      ]
    },
    {
      id: 'coordination',
      name: 'Coordination',
      color: '#ec4899',
      items: [
        { name: 'Orchestration', path: '/orchestration', color: '#ec4899', desc: 'Merkezi servis koordinasyonu.' },
        { name: 'Choreography', path: '/choreography', color: '#f472b6', desc: 'Dağıtık olay senkronizasyonu.' },
        { name: 'SOA Architecture', path: '/soa', color: '#fb923c', desc: 'Kurumsal servis haberleşme stratejisi.' }
      ]
    },
    {
      id: 'big-data',
      name: 'Big Data Processing',
      color: '#06b6d4',
      items: [
        { name: 'Big Data Stack', path: '/big-data', color: '#06b6d4', desc: 'Büyük ölçekli veri işleme hattı.' },
        { name: 'Lambda Arch', path: '/lambda', color: '#22d3ee', desc: 'Hibrit (Batch + Speed) veri katmanı.' },
        { name: 'Kappa Arch', path: '/kappa', color: '#67e8f9', desc: 'Tamamen akış (Streaming) odaklı yapı.' }
      ]
    },
    {
      id: 'logic-structural',
      name: 'Logic & Structural',
      color: '#8b5cf6',
      items: [
        { name: 'Microkernel', path: '/microkernel', color: '#8b5cf6', desc: 'Eklenti tabanlı çekirdek sistemi.' },
        { name: 'Plug-in Arch', path: '/plugin', color: '#a78bfa', desc: 'Dinamik modül ekleme mimarisi.' },
        { name: 'Pipe-Filter', path: '/pipe-filter', color: '#c4b5fd', desc: 'Verinin süzgeçlerden akış disiplini.' },
        { name: 'Interpreter', path: '/interpreter', color: '#8b5cf6', desc: 'Komut yorumlama ve kural işleme.' }
      ]
    },
    {
      id: 'component-ui',
      name: 'Component & UI',
      color: '#10b981',
      items: [
        { name: 'MVC', path: '/mvc-mvvm', color: '#10b981', desc: 'Model-View-Controller deseni.' },
        { name: 'MVP', path: '/mvp', color: '#34d399', desc: 'Model-View-Presenter etkileşimi.' },
        { name: 'MVVM', path: '/mvvm', color: '#6ee7b7', desc: 'Model-View-ViewModel reaktif yapı.' },
        { name: 'ECS (Game Dev)', path: '/ecs', color: '#059669', desc: 'Yüksek performanslı veri odaklı tasarım.' }
      ]
    },
    {
      id: 'evolutionary',
      name: 'Evolutionary',
      color: '#6366f1',
      items: [
        { name: 'Evolutionary Arch', path: '/evolution', color: '#6366f1', desc: 'Zamanla evrilebilen esnek yapılar.' },
        { name: 'Object-Oriented', path: '/object-oriented', color: '#818cf8', desc: 'Sınıf tabanlı modüler tasarım.' }
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
                  <circle 
                    cx={550} 
                    cy={550} 
                    r={120} 
                    fill="transparent" 
                    stroke="rgba(255,255,255,0.1)" 
                    strokeWidth={2} 
                    strokeDasharray="10,10" 
                  />
                </motion.g>
                <g style={{ pointerEvents: 'none' }}>
                  <circle cx={550} cy={550} r={90} fill="#0f172a" />
                  <Compass x={520} y={500} size={60} color="rgba(255,255,255,0.2)" />
                  <text x={550} y={570} textAnchor="middle" fill="white" fontWeight="950" fontSize={16} style={{ letterSpacing: '4px' }}>ARCHITECT'S</text>
                  <text x={550} y={595} textAnchor="middle" fill="white" fontWeight="950" fontSize={24} style={{ letterSpacing: '6px' }}>HUB</text>
                </g>

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
                     padding: '4rem 3rem', 
                     borderRadius: '50px',
                     minHeight: '650px',
                     width: '100%',
                     maxWidth: '500px',
                     display: 'flex',
                     flexDirection: 'column',
                     justifyContent: 'center',
                     border: `4px solid ${hoveredItem.color}`,
                     background: `linear-gradient(135deg, ${hoveredItem.color}22 0%, rgba(15, 23, 42, 1) 100%)`,
                     boxShadow: `0 0 80px ${hoveredItem.color}33, 0 40px 120px rgba(0,0,0,0.8)`
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
                       boxShadow: `0 15px 40px ${hoveredItem.color}55`,
                       marginTop: 'auto'
                      }}
                    >
                      EĞİTİME BAŞLA <Zap size={24} />
                    </button>
                 </motion.div>
               ) : (
                  <div className="glass-card" style={{ 
                    padding: '4rem 3rem', 
                    textAlign: 'left', 
                    opacity: 1, 
                    borderRadius: '50px', 
                    minHeight: '650px',
                    width: '100%',
                    maxWidth: '500px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    border: '2px solid rgba(255,255,255,0.05)', 
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.01) 0%, rgba(255,255,255,0.03) 100%)' 
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
                      <div style={{ width: '50px', height: '50px', background: 'var(--primary)', borderRadius: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 20px var(--primary-glow)' }}>
                        <Compass size={28} color="white" />
                      </div>
                      <div>
                        <h3 style={{ fontSize: '1.8rem', fontWeight: 950, color: 'white', margin: 0 }}>MİMARİ MATRİS</h3>
                        <div style={{ fontSize: '0.8rem', color: 'var(--primary)', fontWeight: 800, letterSpacing: '2px' }}>GLOBAL CONTEXT</div>
                      </div>
                    </div>
                    
                    <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '2.5rem' }}>
                      Yazılım mimarisi bir tercih değil, bir denge sanatıdır. Bu matris üzerinde 34'ten fazla modeli ve stratejiyi inceleyebilirsiniz.
                    </p>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                       {[ 
                         { icon: <Orbit size={18} />, text: '34+ Farklı Mimari Model' },
                         { icon: <Shield size={18} />, text: 'Senior Seviye Trade-off Analizi' },
                         { icon: <MousePointer2 size={18} />, text: 'Katalog Üzerinde Gezinin' }
                       ].map((item, i) => (
                         <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: 'rgba(255,255,255,0.8)', fontSize: '0.95rem', fontWeight: 600 }}>
                           <div style={{ color: 'var(--primary)' }}>{item.icon}</div>
                           {item.text}
                         </div>
                       ))}
                    </div>

                    <div style={{ paddingTop: '2.5rem', borderTop: '1px solid rgba(255,255,255,0.05)', marginTop: 'auto' }}>
                       <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'white', opacity: 0.5, fontSize: '0.85rem' }}>
                          <Sparkles size={14} />
                          <span>Detayları görmek için çarktaki bir dilimin üzerine gelin.</span>
                       </div>
                    </div>
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
