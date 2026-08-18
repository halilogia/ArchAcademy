import { useTranslation } from 'react-i18next';
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
  Scissors, 
  Network,
  Box,
  CheckCircle2,
  Medal,
  ShieldAlert,
  Anchor
} from 'lucide-react';
import SEO from '../components/SEO';

interface DisciplineItem {
  name: string;
  path: string;
  color: string;
  desc: { tr: string; en: string };
  icon: React.ReactNode;
}

interface DisciplineCategory {
  id: string;
  name: { tr: string; en: string };
  color: string;
  items: DisciplineItem[];
}

const DisciplineCatalogPage: React.FC = () => {
  const { i18n } = useTranslation();
  const isEn = (i18n.resolvedLanguage || i18n.language || 'tr').startsWith('en');
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
      id: 'engineering-dna',
      name: { tr: 'Mühendislik DNA', en: 'Engineering DNA' },
      color: '#f43f5e',
      items: [
        { name: isEn ? 'Acronyms Cheat Sheet' : 'Kısaltmalar (Cheat Sheet)', path: '/acronyms', color: '#818cf8', icon: <BookOpen size={24} />, desc: { tr: 'KISS, DRY, WET, AHA, GRASP, SOLID ve temel kodlama kısaltmaları.', en: 'KISS, DRY, WET, AHA, GRASP, SOLID and core software acronyms.' } },
        { name: 'OOP Fundamentals', path: '/oop-fundamentals', color: '#f43f5e', icon: <Box size={24} />, desc: { tr: 'Abstraction, Encapsulation, Inheritance ve Polymorphism.', en: 'Abstraction, Encapsulation, Inheritance, and Polymorphism.' } },
        { name: 'SOLID Principles', path: '/solid', color: '#fb7185', icon: <ShieldCheck size={24} />, desc: { tr: 'Değişime direnç göstermeyen, esnek kodun 5 ana kuralı.', en: '5 golden rules for agile, resilient, and maintainable software.' } },
        { name: 'Separation of Concerns', path: '/abstraction', color: '#fda4af', icon: <Scissors size={24} />, desc: { tr: 'Sorumlulukların mantıksal ve fiziksel olarak ayrıştırılması.', en: 'Decoupling distinct business and architectural responsibilities.' } }
      ]
    },
    {
      id: 'craftsmanship',
      name: { tr: 'Yazılım Ustalığı', en: 'Craftsmanship' },
      color: '#10b981',
      items: [
        { name: 'Clean Code', path: '/clean-code', color: '#10b981', icon: <Code2 size={24} />, desc: { tr: 'Temiz, okunabilir ve sürdürülebilir kod yazma sanatı.', en: 'The art of writing readable, expressive, and maintainable code.' } },
        { name: 'TDD Methodology', path: '/tdd', color: '#059669', icon: <CheckCircle2 size={24} />, desc: { tr: 'Geliştirme sürecini testlerle yönetme disiplini (Red-Green-Refactor).', en: 'Test-Driven Development methodology (Red-Green-Refactor).' } },
        { name: 'Easy to Test', path: '/testing', color: '#047857', icon: <Beaker size={24} />, desc: { tr: 'Mimariyi düşük bağımlılık ve yüksek test edilebilirlik odasına taşıma.', en: 'High-testability design through loose coupling and mockability.' } }
      ]
    },
    {
      id: 'arch-strategy',
      name: { tr: 'Mimari Strateji', en: 'Arch. Strategy' },
      color: '#3b82f6',
      items: [
        { name: 'Design Patterns', path: '/design-patterns', color: '#3b82f6', icon: <Zap size={24} />, desc: { tr: 'Tekrar eden yapısal sorunlara kanıtlanmış çözümler (GOF).', en: 'Battle-tested Gang of Four patterns for recurring structural problems.' } },
        { name: 'Dependency Management', path: '/dependency-management', color: '#60a5fa', icon: <Network size={24} />, desc: { tr: 'Bileşenler arası bağımlılıkların reaktif ve esnek yönetimi.', en: 'Managing component couplings and dependency flow boundaries.' } },
        { name: 'Moderate Abstraction', path: '/moderate-abstraction', color: '#93c5fd', icon: <Layers size={24} />, desc: { tr: 'Ne çok derin ne çok sığ; tam kararında soyutlama dengesi.', en: 'Pragmatic balance between under-engineering and premature abstraction.' } }
      ]
    },
    {
      id: 'governance',
      name: { tr: 'Yönetişim & Kalite', en: 'Governance & Quality' },
      color: '#a855f7',
      items: [
        { name: 'Security Assurance', path: '/security', color: '#a855f7', icon: <Lock size={24} />, desc: { tr: 'Mimari seviyede güvenlik katmanları ve kalkan önlemleri.', en: 'Architectural defense-in-depth and security layer guarantees.' } },
        { name: 'Docs & Annotations', path: '/docs-annotations', color: '#c084fc', icon: <BookOpen size={24} />, desc: { tr: 'Kararların nedenlerini (ADR) dökümante etme kültürü.', en: 'Documenting architectural decision records (ADR) and living notes.' } },
        { name: 'Lean Philosophy', path: '/lean-architecture', color: '#d8b4fe', icon: <Target size={24} />, desc: { tr: 'İsraftan kaçınma ve sürekli değer üretme zihin yapısı.', en: 'Eliminating waste, maximizing flow, and continuous delivery mindset.' } },
        { name: 'Robustness & Reliability', path: '/robustness', color: '#fde047', icon: <Activity size={24} />, desc: { tr: 'Hatalara karşı toleranslı ve sarsılmaz çalışma prensibi.', en: 'Fault tolerance, resilience, and bulletproof uptime principles.' } }
      ]
    },
    {
      id: 'anti-patterns',
      name: { tr: 'Anti-Patterns & Deney', en: 'Anti-Patterns & Synthesis' },
      color: '#475569',
      items: [
        { name: isEn ? 'Hall of Shame' : 'Anti-Patterns Galerisi', path: '/anti-patterns', color: '#475569', icon: <ShieldAlert size={24} />, desc: { tr: 'Kaçınılması gereken tehlikeli mimari tuzaklar ve anti-pattern galerisi.', en: 'Dangerous structural anti-patterns, pitfalls, and architectural traps.' } },
        { name: 'Synthesis Lab', path: '/synthesis-lab', color: '#94a3b8', icon: <Anchor size={24} />, desc: { tr: 'Mimari sentez ve deneysel laboratuvar.', en: 'Architectural synthesis and hybrid pattern experiment lab.' } }
      ]
    }
  ];

  return (
    <>
      <SEO
        title={isEn ? "Architectural Disciplines & Standards Matrix | ArchAcademy" : "Mimari Disiplinler & Standartlar Matrisi | ArchAcademy"}
        description={isEn 
          ? "Master core engineering disciplines: SOLID, Clean Code, TDD, Design Patterns, Security, and Architecture Governance." 
          : "Yazılım mühendisliği disiplinleri: SOLID, Clean Code, TDD, Tasarım Desenleri, Güvenlik ve Mimari Yönetişim."
        }
        keywords="architecture disciplines, solid, clean code, tdd, design patterns, security architecture"
        canonicalUrl="/discipline-catalog"
      />
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ background: '#020617', minHeight: '100vh', paddingTop: '100px', overflowX: 'hidden' }}>
        <div className="container" style={{ maxWidth: '1600px' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(168, 85, 247, 0.1)', padding: '0.5rem 1.2rem', borderRadius: '100px', color: '#a855f7', fontWeight: 800, fontSize: '0.8rem', marginBottom: '1rem', border: '1px solid rgba(168, 85, 247, 0.3)' }}>
              <Sparkles size={16} /> {isEn ? "ARCHITECTURAL DISCIPLINES" : "MİMARİ DİSİPLİNLER"}
            </motion.div>
            <h1 style={{ fontSize: '3.5rem', fontWeight: 950, letterSpacing: '-2px', margin: 0, color: 'white' }}>
              {isEn ? "Architectural" : "Mimari"} <span className="gradient-text">{isEn ? "Disciplines Matrix" : "Disiplinler Matrisi"}</span>
            </h1>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(700px, 1.4fr) 1fr', gap: '2rem', alignItems: 'center' }}>
            {/* Holographic Radial SVG Wheel */}
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
                     <text x={500} y={495} textAnchor="middle" fill="white" fontWeight="900" fontSize="13" style={{ letterSpacing: '2px' }}>{isEn ? "DISCIPLINE" : "DİSİPLİN"}</text>
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
                               {(isEn ? cat.name.en : cat.name.tr).toUpperCase()}
                             </text>
                           );
                        })()}
                      </g>
                    );
                  })}
               </svg>
            </div>

            {/* Right Holographic HUD Details */}
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
                     <p style={{ fontSize: '1.2rem', color: 'rgba(255,255,255,0.85)', lineHeight: 1.7, marginBottom: '3rem' }}>
                       {isEn ? hoveredItem.desc.en : hoveredItem.desc.tr}
                     </p>
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
                        {isEn ? "START DISCIPLINE MODULE" : "EĞİTİME BAŞLA"} <Zap size={22} />
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
                        <h3 style={{ fontSize: '1.8rem', fontWeight: 950, color: 'white', margin: 0, letterSpacing: '-1px' }}>
                          {isEn ? "DISCIPLINE MATRIX" : "DİSİPLİN MATRİSİ"}
                        </h3>
                      </div>
                      <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                        {isEn 
                          ? "Being a master software architect is not just about knowing patterns, but living the unyielding engineering disciplines that keep systems robust."
                          : "Usta bir mimar olmak sadece modelleri bilmek değil, o modelleri ayakta tutan sarsılmaz disiplinleri hayata geçirmektir."
                        }
                      </p>
                      <div style={{ marginTop: '3rem', display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                          {[ 
                            isEn ? '6 Core Discipline Categories' : '6 Ana Disiplin Kategorisi',
                            isEn ? '34+ Architectural Rules & Principles' : '34+ Mimari İlke ve Kural',
                            isEn ? 'Senior-Level Technical Depth' : 'Senior Seviye Teknik Derinlik'
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
    </>
  );
};

export default DisciplineCatalogPage;
