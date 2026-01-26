import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  ShieldCheck, 
  Zap, 
  Sparkles, 
  Target, 
  BookOpen, 
  Lock, 
  Activity, 
  Beaker, 
  Layers, 
  Code2, 
  Network,
  Palette,
  Triangle,
  Database,
  Box,
  CheckCircle2,
  Medal,
  Brain
} from 'lucide-react';

interface DisciplineItem {
  name: string;
  path: string;
  color: string;
  desc: string;
  icon: React.ReactNode;
}

interface DisciplineCategory {
  id: string;
  name: string;
  color: string;
  items: DisciplineItem[];
}

const DisciplineCatalogPage = () => {
  const navigate = useNavigate();
  const [hoveredItem, setHoveredItem] = useState<DisciplineItem | null>(null);
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRotation(prev => (prev + 0.03) % 360);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  const categories: DisciplineCategory[] = [
    {
      id: 'code-craftsmanship',
      name: 'Code Craftsmanship',
      color: '#f43f5e',
      items: [
        { name: 'Clean Code', path: '/clean-code', color: '#f43f5e', icon: <Code2 size={24} />, desc: 'Standardizasyon ve ekip içi ortak dil (Styling Guides).' },
        { name: 'SOLID Principles', path: '/solid', color: '#fb7185', icon: <ShieldCheck size={24} />, desc: 'Esneklik ve sürdürülebilirliğin 5 dev kuralı.' },
        { name: 'OOP Fundamentals', path: '/oop-fundamentals', color: '#fda4af', icon: <Box size={24} />, desc: 'Soyutlama, Kapsülleme, Miras ve Çok Biçimlilik.' }
      ]
    },
    {
      id: 'quality-assurance',
      name: 'Quality & Speed',
      color: '#10b981',
      items: [
        { name: 'TDD Metodolojisi', path: '/tdd', color: '#10b981', icon: <CheckCircle2 size={24} />, desc: 'Red-Green-Refactor döngüsüyle önce test, sonra kod.' },
        { name: 'Easy to Test', path: '/testing', color: '#34d399', icon: <Beaker size={24} />, desc: 'Düşük karmaşıklık odaklı test edilebilir mimari.' },
        { name: 'Lean Philosophy', path: '/lean-architecture', color: '#6ee7b7', icon: <Target size={24} />, desc: 'Yalın, hızlı ve sadece değer üreten israfsız zihin.' }
      ]
    },
    {
      id: 'system-wisdom',
      name: 'System Wisdom',
      color: '#3b82f6',
      items: [
        { name: 'CAP Theorem', path: '/cap-theorem', color: '#3b82f6', icon: <Triangle size={24} />, desc: 'Dağıtık sistemlerde Tutarlılık ve Erişilebilirlik dengesi.' },
        { name: 'ACID Principles', path: '/acid', color: '#60a5fa', icon: <Database size={24} />, desc: 'Atomiklik, Tutarlılık, İzolasyon ve Dayanıklılık.' },
        { name: 'Design Patterns', path: '/design-patterns', color: '#93c5fd', icon: <Zap size={24} />, desc: 'Tekrar eden sorunlara kanıtlanmış yapısal çözümler (GOF).' }
      ]
    },
    {
      id: 'resilience-safety',
      name: 'Resilience & Safety',
      color: '#ef4444',
      items: [
        { name: 'Security Assurance', path: '/security', color: '#ef4444', icon: <Lock size={24} />, desc: 'SQL Injection, XSS ve Veri Sızıntısına karşı kalkan.' },
        { name: 'Robustness & Reliability', path: '/robustness', color: '#f87171', icon: <Activity size={24} />, desc: 'Network ve IO hatalarına karşı sarsılmaz tasarım.' },
        { name: 'Docs & Annotations', path: '/docs-annotations', color: '#fca5a5', icon: <BookOpen size={24} />, desc: 'Neden (Why) sorusuna cevap veren mimari ADR kültürü.' }
      ]
    },
    {
      id: 'component-systems',
      name: 'Component Systems',
      color: '#f97316',
      items: [
        { name: 'MVC Pattern', path: '/mvc-mvvm', color: '#f97316', icon: <Layers size={24} />, desc: 'Veri, arayüz ve kontrol mantığının disiplinli ayrışması.' },
        { name: 'Atomic Design', path: '/atomic-design', color: '#fb923c', icon: <Sparkles size={24} />, desc: 'Bileşenleri hiyerarşik bir sistemle inşa etme sanatı.' },
        { name: 'Design Tokens', path: '/design-tokens', color: '#fdba74', icon: <Palette size={24} />, desc: 'Görsel atomların mimari seviyede tek kaynaktan yönetimi.' }
      ]
    },
    {
      id: 'architectural-balance',
      name: 'Arch. Balance',
      color: '#a855f7',
      items: [
        { name: 'Domain-Driven Design', path: '/ddd', color: '#a855f7', icon: <Brain size={24} />, desc: 'İş mantığını dil ve bağlam (context) odağında tasarlama.' },
        { name: 'Moderate Abstraction', path: '/abstraction', color: '#c084fc', icon: <Layers size={24} />, desc: 'Tam kararında soyutlama ve mantıksal ayrışma.' },
        { name: 'Dependency Management', path: '/abstraction', color: '#d8b4fe', icon: <Network size={24} />, desc: 'Global bağımlılıkları azaltın, bileşenleri bağımsızlaştırın.' }
      ]
    }
  ];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ background: '#020617', minHeight: '100vh', paddingTop: '100px', overflowX: 'hidden' }}>
      <div className="container" style={{ maxWidth: '1600px' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(168, 85, 247, 0.1)', padding: '0.5rem 1.2rem', borderRadius: '100px', color: '#a855f7', fontWeight: 800, fontSize: '0.8rem', marginBottom: '1rem', border: '1px solid rgba(168, 85, 247, 0.3)' }}>
            <Sparkles size={16} /> ARCHITECTURAL DISCIPLINES
          </motion.div>
          <h1 style={{ fontSize: '3.5rem', fontWeight: 950, letterSpacing: '-2px', margin: 0, color: 'white' }}>
            Mimari <span className="gradient-text">Disiplinler</span> Matrisi
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
                    stroke="#a855f7" 
                    strokeWidth={2} 
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 4, repeat: Infinity }}
                    style={{ filter: 'drop-shadow(0 0 25px rgba(168, 85, 247, 0.4))' }} 
                   />
                   <text x={500} y={495} textAnchor="middle" fill="white" fontWeight="900" fontSize="13" style={{ letterSpacing: '2px' }}>DİSİPLİN</text>
                   <text x={500} y={520} textAnchor="middle" fill="#a855f7" fontWeight="950" fontSize="18" style={{ letterSpacing: '3px' }}>HUB</text>
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
                     {hoveredItem.icon}
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
                      <div style={{ padding: '12px', background: 'rgba(168, 85, 247, 0.1)', borderRadius: '15px', color: '#a855f7' }}>
                        <Medal size={28} />
                      </div>
                      <h3 style={{ fontSize: '1.8rem', fontWeight: 950, color: 'white', margin: 0, letterSpacing: '-1px' }}>DİSİPLİN MATRİSİ</h3>
                    </div>
                    <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                      Usta bir mimar olmak sadece modelleri bilmek değil, o modelleri ayakta tutan sarsılmaz disiplinleri hayata geçirmektir.
                    </p>
                    <div style={{ marginTop: '3rem', display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                        {[ 
                          '6 Ana Disiplin Kategorisi',
                          '34+ Mimari İlke ve Kural',
                          'Senior Seviye Teknik Derinlik'
                        ].map((t, i) => (
                          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '1rem', color: 'rgba(255,255,255,0.7)', fontWeight: 600 }}>
                            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#a855f7', boxShadow: '0 0 12px #a855f7' }} />
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
    </motion.div>
  );
};

export default DisciplineCatalogPage;
