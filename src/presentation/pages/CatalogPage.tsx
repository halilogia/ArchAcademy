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
        { name: 'Microservices', path: '/microservices', color: '#eab308', desc: 'Bağımsız servisler ekosistemi.' },
        { name: 'Client-Server', path: '/client-server', color: '#ca8a04', desc: 'İstemci ve sunucu ayrımı.' },
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
        { name: 'SOA Architecture', path: '/soa', color: '#fbcfe8', desc: 'Kurumsal servis haberleşme strateji.' }
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
        { name: 'ECS (Game Dev)', path: '/ecs', color: '#8b5cf6', desc: 'Yüksek performanslı veri odaklı tasarım.' },
        { name: 'Interpreter', path: '/interpreter', color: '#a78bfa', desc: 'Komut yorumlama ve kural işleme.' }
      ]
    },
    {
      id: 'component-ui',
      name: 'Component & UI',
      color: '#10b981',
      items: [
        { name: 'MVC', path: '/mvc', color: '#10b981', desc: 'Model-View-Controller deseni.' },
        { name: 'MVP', path: '/mvp', color: '#34d399', desc: 'Model-View-Presenter etkileşimi.' },
        { name: 'MVVM', path: '/mvvm', color: '#6ee7b7', desc: 'Model-View-ViewModel reaktif yapı.' },
        { name: 'MVVM-C', path: '/mvvm-c', color: '#10b981', desc: 'Navigasyon odaklı Coordinator deseni.' },
        { name: 'VIPER', path: '/viper', color: '#059669', desc: 'Router ve Interactor tabanlı yüksek izolasyon.' }
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
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ background: '#020617', minHeight: '100vh', paddingTop: '100px', overflowX: 'hidden' }}>
      <div className="container" style={{ maxWidth: '1600px' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(59, 130, 246, 0.1)', padding: '0.5rem 1.2rem', borderRadius: '100px', color: '#3b82f6', fontWeight: 800, fontSize: '0.8rem', marginBottom: '1rem', border: '1px solid rgba(59, 130, 246, 0.3)' }}>
            <Sparkles size={16} /> VIBRANT ARCHITECTURE MATRIX
          </motion.div>
          <h1 style={{ fontSize: '3.5rem', fontWeight: 950, letterSpacing: '-2px', margin: 0, color: 'white' }}>
            Mimari <span className="gradient-text">Stil</span> Kataloğu
          </h1>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(700px, 1.4fr) 1fr', gap: '2rem', alignItems: 'center' }}>
          <div style={{ position: 'relative', height: '900px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
             <svg viewBox="0 0 1000 1000" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
                <defs>
                   <filter id="color-glow-ultra" x="-100%" y="-100%" width="300%" height="300%">
                    <feGaussianBlur stdDeviation="25" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>
                </defs>

                <motion.g animate={{ rotate: rotation }} style={{ transformOrigin: '500px 500px' }}>
                  <circle cx={500} cy={500} r={120} fill="transparent" stroke="rgba(255,255,255,0.05)" strokeWidth={1} strokeDasharray="5,5" />
                </motion.g>

                <g>
                   <motion.circle 
                    cx={500} cy={500} r={90} 
                    fill="#0f172a" 
                    stroke="#3b82f6" 
                    strokeWidth={2} 
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 4, repeat: Infinity }}
                    style={{ filter: 'drop-shadow(0 0 25px rgba(59, 130, 246, 0.4))' }} 
                   />
                   <text x={500} y={495} textAnchor="middle" fill="white" fontWeight="900" fontSize="13" style={{ letterSpacing: '2px' }}>MİMARİ</text>
                   <text x={500} y={520} textAnchor="middle" fill="#3b82f6" fontWeight="950" fontSize="18" style={{ letterSpacing: '3px' }}>HUB</text>
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
                        
                        const innerR = 125;
                        const outerR = 460;
                        
                        const isHovered = hoveredItem?.name === item.name;

                        const x1_i = 500 + innerR * Math.cos(radStart);
                        const y1_i = 500 + innerR * Math.sin(radStart);
                        const x2_i = 500 + innerR * Math.cos(radEnd);
                        const y2_i = 500 + innerR * Math.sin(radEnd);
                        const x1_o = 500 + outerR * Math.cos(radStart);
                        const y1_o = 500 + outerR * Math.sin(radStart);
                        const x2_o = 500 + outerR * Math.cos(radEnd);
                        const y2_o = 500 + outerR * Math.sin(radEnd);

                        return (
                          <motion.path
                            key={item.name}
                            d={`M ${x1_i} ${y1_i} L ${x1_o} ${y1_o} A ${outerR} ${outerR} 0 0 1 ${x2_o} ${y2_o} L ${x2_i} ${y2_i} A ${innerR} ${innerR} 0 0 0 ${x1_i} ${y1_i}`}
                            fill={cat.color}
                            fillOpacity={isHovered ? 0.95 : 0.8}
                            stroke={isHovered ? "white" : "rgba(2, 6, 23, 0.4)"}
                            strokeWidth={isHovered ? 4 : 1}
                            animate={{ 
                                scale: isHovered ? 1.05 : 1, 
                                filter: isHovered ? 'url(#color-glow-ultra)' : 'none',
                                zIndex: isHovered ? 20 : 1
                            }}
                            onMouseEnter={() => setHoveredItem(item)}
                            onMouseLeave={() => setHoveredItem(null)}
                            onClick={() => navigate(item.path)}
                            style={{ cursor: 'pointer', transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)' }}
                          />
                        );
                      })}

                      {(() => {
                         const midAngle = startAngle + (sliceAngle / 2);
                         const radMid = (midAngle - 90) * (Math.PI / 180);
                         const textR = 310;
                         const x = 500 + textR * Math.cos(radMid);
                         const y = 500 + textR * Math.sin(radMid);
                         return (
                           <text 
                             x={x} y={y} 
                             fill="white" 
                             fontSize="10" 
                             fontWeight="950" 
                             textAnchor="middle" 
                             style={{ 
                               pointerEvents: 'none', 
                               letterSpacing: '1px',
                               textShadow: '0 2px 8px rgba(0,0,0,0.9)',
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

          <div style={{ paddingRight: '2rem' }}>
             <AnimatePresence mode="wait">
               {hoveredItem ? (
                 <motion.div 
                   key={hoveredItem.name} 
                   initial={{ opacity: 0, x: 30 }} 
                   animate={{ opacity: 1, x: 0 }} 
                   exit={{ opacity: 0, x: -30 }} 
                   className="glass-card" 
                   style={{ 
                     padding: '3rem', 
                     borderRadius: '40px',
                     minHeight: '550px',
                     display: 'flex',
                     flexDirection: 'column',
                     justifyContent: 'center',
                     border: `2px solid ${hoveredItem.color}`,
                     background: `linear-gradient(135deg, ${hoveredItem.color}20 0%, rgba(10,15,30,0.98) 100%)`,
                     boxShadow: `0 30px 60px rgba(0,0,0,0.6), 0 0 50px ${hoveredItem.color}15`
                   }}
                 >
                   <motion.div 
                    initial={{ scale: 0.5 }}
                    animate={{ scale: 1 }}
                    style={{ color: hoveredItem.color, marginBottom: '2rem' }}
                   >
                     <Compass size={60} className="glow-anim" />
                   </motion.div>
                   <h2 style={{ fontSize: '2.8rem', fontWeight: 950, marginBottom: '1.2rem', color: 'white', letterSpacing: '-1.5px', lineHeight: 1 }}>
                     {hoveredItem.name}
                   </h2>
                   <p style={{ fontSize: '1.2rem', color: 'rgba(255,255,255,0.85)', lineHeight: 1.7, marginBottom: '3rem' }}>{hoveredItem.desc}</p>
                   <button 
                     onClick={() => navigate(hoveredItem.path)} 
                     style={{ 
                       background: hoveredItem.color, 
                       color: 'white', 
                       padding: '1.2rem', 
                       borderRadius: '16px', 
                       fontWeight: 900, 
                       border: 'none', 
                       cursor: 'pointer',
                       fontSize: '1.1rem',
                       display: 'flex',
                       alignItems: 'center',
                       justifyContent: 'center',
                       gap: '1rem',
                       boxShadow: `0 15px 35px ${hoveredItem.color}33`,
                       textTransform: 'uppercase',
                       marginTop: 'auto'
                      }}
                    >
                      EĞİTİME BAŞLA <Zap size={22} />
                    </button>
                 </motion.div>
               ) : (
                  <div className="glass-card" style={{ 
                    padding: '3rem', 
                    borderRadius: '40px', 
                    minHeight: '550px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    border: '1px solid rgba(255,255,255,0.05)',
                    background: 'rgba(255,255,255,0.01)'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '2.2rem' }}>
                      <div style={{ padding: '12px', background: 'rgba(59, 130, 246, 0.1)', borderRadius: '15px', color: '#3b82f6' }}>
                        <Compass size={28} />
                      </div>
                      <h3 style={{ fontSize: '1.8rem', fontWeight: 950, color: 'white', margin: 0, letterSpacing: '-1px' }}>MİMARİ MATRİS</h3>
                    </div>
                    <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                      Yazılım mimarisi bir tercih değil, bir denge sanatıdır. Bu matris üzerinde 34'ten fazla modeli ve stratejiyi inceleyebilirsiniz.
                    </p>
                    <div style={{ marginTop: '3rem', display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                        {[ 
                          '34+ Farklı Mimari Model',
                          'Senior Seviye Trade-off Analizi',
                          'İnteraktif Katalog Deneyimi'
                        ].map((t, i) => (
                          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '1rem', color: 'rgba(255,255,255,0.7)', fontWeight: 600 }}>
                            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#3b82f6', boxShadow: '0 0 12px #3b82f6' }} />
                            {t}
                          </div>
                        ))}
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
