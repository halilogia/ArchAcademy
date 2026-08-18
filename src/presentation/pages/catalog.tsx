import { useTranslation } from 'react-i18next';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Hexagon, Zap, Compass, Sparkles } from 'lucide-react';
import SEO from '../components/SEO';

interface ArchItem {
  name: string;
  path: string;
  color: string;
  desc: { tr: string; en: string };
}

interface ArchCategory {
  id: string;
  name: { tr: string; en: string };
  color: string;
  items: ArchItem[];
}

const CatalogPage: React.FC = () => {
  const { i18n } = useTranslation();
  const isEn = (i18n.resolvedLanguage || i18n.language || 'tr').startsWith('en');
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
      name: { tr: 'Domain-Centric', en: 'Domain-Centric' },
      color: '#a855f7',
      items: [
        { name: 'Clean Architecture', path: '/clean-arch', color: '#a855f7', desc: { tr: "Uncle Bob'un bağımsızlık katmanları.", en: "Uncle Bob's layers of independence and testability." } },
        { name: 'Onion Architecture', path: '/onion', color: '#c084fc', desc: { tr: 'Bağımlılık yönü merkeze olan yapı.', en: 'Concentric architectural pattern with inward-pointing dependencies.' } },
        { name: 'DDD Architecture', path: '/ddd', color: '#d8b4fe', desc: { tr: 'İş mantığını dile ve bounded context\'e odaklayan tasarım.', en: 'Aligning design strictly with domain logic and bounded contexts.' } },
        { name: 'Hexagonal', path: '/hexagonal', color: '#a855f7', desc: { tr: 'Ports & Adapters soyutlama modeli.', en: 'Ports & Adapters pattern isolating core domain from external tech.' } }
      ]
    },
    {
      id: 'layered-modern',
      name: { tr: 'Layered & Modern', en: 'Layered & Modern' },
      color: '#3b82f6',
      items: [
        { name: 'Vertical Slice', path: '/vertical', color: '#3b82f6', desc: { tr: 'Modern startup odaklı özellik bazlı tasarım.', en: 'Feature-first cohesion optimized for modern agile & AI workflows.' } },
        { name: 'n-Tier (Horizontal)', path: '/horizontal', color: '#60a5fa', desc: { tr: 'Klasik sorumluluk bazlı katmanlandırma.', en: 'Traditional horizontal separation of concerns by technical layers.' } },
        { name: 'FSD (Frontend)', path: '/fsd', color: '#93c5fd', desc: { tr: 'Büyük ölçekli React/Next projeleri için katmanlı yapı.', en: 'Feature-Sliced Design for scaling complex frontend codebases.' } }
      ]
    },
    {
      id: 'distributed-messaging',
      name: { tr: 'Distributed & Messaging', en: 'Distributed & Messaging' },
      color: '#10b981',
      items: [
        { name: 'Microservices', path: '/microservices', color: '#10b981', desc: { tr: 'Bağımsız dağıtık servisler mimarisi.', en: 'Decoupled, independently deployable autonomous microservices.' } },
        { name: 'Event-Driven (EDA)', path: '/eda', color: '#34d399', desc: { tr: 'Olay bazlı asenkron haberleşme modeli.', en: 'Asynchronous event production, detection, and consumption pattern.' } },
        { name: 'Serverless (FaaS)', path: '/serverless', color: '#6ee7b7', desc: { tr: 'Sunucusuz, olay tetiklemeli fonksiyonlar.', en: 'Serverless compute model executing stateless ephemeral functions.' } },
        { name: 'SOA Arch', path: '/soa', color: '#059669', desc: { tr: 'Kurumsal servis odaklı mimari (ESB).', en: 'Enterprise service-oriented integration via Enterprise Service Bus.' } },
        { name: 'Broker Architecture', path: '/broker', color: '#10b981', desc: { tr: 'Merkezi mesaj kuyrukları (RabbitMQ/Kafka) ile dağıtım.', en: 'Decoupled communication orchestrated through central message brokers.' } }
      ]
    },
    {
      id: 'data-reactive',
      name: { tr: 'Data & Reactive', en: 'Data & Reactive' },
      color: '#f59e0b',
      items: [
        { name: 'CQRS', path: '/cqrs', color: '#f59e0b', desc: { tr: 'Okuma ve yazma modellerinin ayrılması.', en: 'Segregation of Command (write) and Query (read) responsibility.' } },
        { name: 'Event Sourcing', path: '/event-sourcing', color: '#fbbf24', desc: { tr: 'Durumun değişmez olaylar dizisi olarak saklanması.', en: 'Persisting application state as an immutable log of state transitions.' } },
        { name: 'Space-Based (SBA)', path: '/space-based', color: '#fde68a', desc: { tr: 'Veritabanı darboğazını aşan RAM tabanlı küme.', en: 'In-memory data grids built to eliminate central database bottlenecks.' } },
        { name: 'Lambda & Kappa', path: '/lambda-kappa', color: '#d97706', desc: { tr: 'Büyük veri stream ve batch işleme mimarileri.', en: 'Hybrid real-time streaming and massive batch processing pipelines.' } }
      ]
    },
    {
      id: 'structural-specialized',
      name: { tr: 'Structural & Specialized', en: 'Structural & Specialized' },
      color: '#ec4899',
      items: [
        { name: 'Microkernel (Plugin)', path: '/microkernel', color: '#ec4899', desc: { tr: 'Çekirdek sistem ve tak-çıkar eklenti yapısı.', en: 'Core system extensible via plug-and-play modular plugins.' } },
        { name: 'Pipe-Filter', path: '/pipe-filter', color: '#f472b6', desc: { tr: 'Sıralı veri dönüşüm ve işleme boru hatları.', en: 'Sequential data stream processing across discrete pipeline filters.' } },
        { name: 'Peer-to-Peer (P2P)', path: '/p2p', color: '#fbcfe8', desc: { tr: 'Merkezi olmayan, eşit düğümlü ağ mimarisi.', en: 'Decentralized peer network without centralized authoritative servers.' } },
        { name: 'Interpreter Pattern', path: '/interpreter', color: '#db2777', desc: { tr: 'Özel dilleri veya kuralları yorumlayan motor.', en: 'Grammar evaluator and custom domain-specific language execution engine.' } }
      ]
    }
  ];

  return (
    <>
      <SEO
        title={isEn ? "Master Architecture Galaxy (32 Patterns) | ArchAcademy" : "Büyük Mimari Atlası (32 Mimari) | ArchAcademy"}
        description={isEn 
          ? "Master 32 software architecture patterns in an interactive galaxy view." 
          : "32 yazılım mimarisi şablonunun interaktif holografik atlası."
        }
        keywords="software architecture, clean architecture, microservices, ddd, cqrs, event driven"
        canonicalUrl="/catalog"
      />
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ background: '#020617', minHeight: '100vh', paddingTop: '100px', overflowX: 'hidden' }}>
        <div className="container" style={{ maxWidth: '1600px' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(59, 130, 246, 0.1)', padding: '0.5rem 1.2rem', borderRadius: '100px', color: 'var(--primary)', fontWeight: 800, fontSize: '0.8rem', marginBottom: '1rem', border: '1px solid rgba(59, 130, 246, 0.3)' }}>
              <Sparkles size={16} /> {isEn ? "MASTER ARCHITECTURE GALAXY" : "BÜYÜK MİMARİ ATLASI"}
            </motion.div>
            <h1 style={{ fontSize: '3.5rem', fontWeight: 950, letterSpacing: '-2px', margin: 0, color: 'white' }}>
              {isEn ? "Architectural" : "Mimari"} <span className="gradient-text">{isEn ? "Galaxy Atlas" : "Galaksi"}</span>
            </h1>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(700px, 1.4fr) 1fr', gap: '2rem', alignItems: 'center' }}>
            {/* Holographic Radial SVG Galaxy */}
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
                  <text x={500} y={495} textAnchor="middle" fill="white" fontWeight="900" fontSize="13" style={{ letterSpacing: '2px' }}>{isEn ? "SYSTEM" : "SİSTEM"}</text>
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
                            {(isEn ? cat.name.en : cat.name.tr).toUpperCase()}
                          </text>
                        );
                      })()}
                    </g>
                  );
                })}
              </svg>
            </div>

            {/* Right Hologram HUD Details */}
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
                      {isEn ? "START ARCHITECTURE MODULE" : "EĞİTİME BAŞLA"} <Zap size={22} />
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
                      <h3 style={{ fontSize: '1.8rem', fontWeight: 950, color: 'white', margin: 0, letterSpacing: '-1px' }}>
                        {isEn ? "SYSTEM MATRIX" : "SİSTEM MATRİSİ"}
                      </h3>
                    </div>
                    <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                      {isEn 
                        ? "From Clean Architecture to Hexagonal, explore the core pillars of foundational system design."
                        : "Clean Architecture'dan Hexagonal'a, Core sistem tasarımının temel taşları burada."
                      }
                    </p>
                    <div style={{ marginTop: '3rem', display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                      {[
                        isEn ? 'Domain-Centric Architectures' : 'Domain Odaklı Tasarımlar',
                        isEn ? 'Independent Layered Models' : 'Bağımsız Katmanlı Yapılar',
                        isEn ? 'High-Performance Code Organization' : 'Yüksek Kaliteli Kod Organizasyonu'
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
    </>
  );
};

export default CatalogPage;
