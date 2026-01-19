import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Database, Cpu, Share2, Zap, Server, BarChart3, Activity, Layers, ArrowRightLeft } from 'lucide-react';

const SpaceBasedPage = () => {
  const [activeUnit, setActiveUnit] = useState<number | null>(null);
  const [dataPackets, setDataPackets] = useState<{ id: number, x: number, y: number }[]>([]);

  // Simulation for data flowing in the space
  useEffect(() => {
    const interval = setInterval(() => {
      setDataPackets(prev => {
        const newPacket = { id: Date.now(), x: Math.random() * 80 + 10, y: Math.random() * 40 + 30 };
        return [...prev.slice(-15), newPacket];
      });
    }, 800);
    return () => clearInterval(interval);
  }, []);

  const processingUnits = [
    { id: 1, name: 'Processing Unit A', status: 'Active', color: '#eab308' },
    { id: 2, name: 'Processing Unit B', status: 'Active', color: '#f59e0b' },
    { id: 3, name: 'Processing Unit C', status: 'Active', color: '#d97706' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{ background: 'var(--bg-dark)', minHeight: '100vh', paddingTop: '100px' }}
    >
      <div className="container">
        {/* Hero Section with Premium Feel */}
        <section style={{ textAlign: 'center', marginBottom: '80px', position: 'relative' }}>
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8 }}
            style={{ 
              position: 'absolute', 
              top: '-50px', 
              left: '50%', 
              transform: 'translateX(-50%)', 
              zIndex: -1,
              width: '400px',
              height: '400px',
              background: 'radial-gradient(circle, rgba(234, 179, 8, 0.1) 0%, transparent 70%)'
            }}
          />
          <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
            <span style={{ 
              background: 'rgba(234, 179, 8, 0.1)', 
              color: '#eab308', 
              padding: '0.6rem 2rem', 
              borderRadius: '100px', 
              fontSize: '0.9rem', 
              fontWeight: 800,
              letterSpacing: '2px',
              border: '1px solid rgba(234, 179, 8, 0.2)'
            }}>
              LINEAR SCALABILITY
            </span>
            <h1 style={{ fontSize: '5rem', margin: '2rem 0', fontWeight: 950, letterSpacing: '-2px', lineHeight: 1 }}>
              Space-Based <br />
              <span style={{ 
                background: 'linear-gradient(to right, #eab308, #f59e0b)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                Architecture
              </span>
            </h1>
            <p style={{ fontSize: '1.4rem', color: 'var(--text-secondary)', maxWidth: '900px', margin: '0 auto', lineHeight: 1.6, fontWeight: 400 }}>
              Merkezi olmayan, bellek tabanlı işlemleme gücü. Milyonlarca isteği tek bir veritabanı darboğazına sokmadan, "Shared Space" üzerinde dağıtın.
            </p>
          </motion.div>
        </section>

        {/* The "Mük" Interaktif Diyagram */}
        <section style={{ marginBottom: '120px' }}>
          <div className="glass-card" style={{ 
            padding: '4rem', 
            background: 'rgba(255,255,255,0.01)', 
            border: '1px solid rgba(234, 179, 8, 0.1)',
            borderRadius: '40px',
            position: 'relative'
          }}>
            <h2 style={{ marginBottom: '1rem', fontWeight: 800 }}>Virtualized Space Simulation</h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '4rem' }}>Üniteler arası veri akışını ve orta katmanın (Middleware) veriyi nasıl dağıttığını izleyin.</p>
            
            <div style={{ position: 'relative', height: '600px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              
              {/* TOP: Units */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '4rem', zIndex: 10 }}>
                {processingUnits.map((unit) => (
                  <motion.div
                    key={unit.id}
                    onHoverStart={() => setActiveUnit(unit.id)}
                    onHoverEnd={() => setActiveUnit(null)}
                    whileHover={{ y: -10 }}
                    style={{ 
                      padding: '2.5rem', 
                      borderRadius: '24px',
                      background: activeUnit === unit.id ? 'rgba(234, 179, 8, 0.1)' : 'rgba(255,255,255,0.03)',
                      border: activeUnit === unit.id ? `2px solid ${unit.color}` : '1px solid var(--glass-border)',
                      cursor: 'pointer',
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                    }}
                  >
                    <div style={{ 
                      width: '60px', 
                      height: '60px', 
                      borderRadius: '16px', 
                      background: unit.color, 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      margin: '0 auto 1.5rem',
                      boxShadow: `0 10px 20px ${unit.color}33`
                    }}>
                      <Cpu size={30} color="#000" />
                    </div>
                    <h3 style={{ fontSize: '1.2rem', color: 'white' }}>{unit.name}</h3>
                    <div style={{ marginTop: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', color: unit.color }}>
                      <Activity size={14} className="pulse" />
                      <span style={{ fontSize: '0.75rem', fontWeight: 700 }}>SYNCING</span>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* MIDDLE: THE SPACE (SVG CONNECTIONS) */}
              <div style={{ flex: 1, position: 'relative', margin: '2rem 10%' }}>
                <svg width="100%" height="100%" style={{ position: 'absolute', top: 0, left: 0, overflow: 'visible' }}>
                  <defs>
                    <linearGradient id="gradSpace" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="transparent" />
                      <stop offset="50%" stopColor="#eab308" stopOpacity="0.3" />
                      <stop offset="100%" stopColor="transparent" />
                    </linearGradient>
                  </defs>
                  
                  {/* Connection Lines to Middleware */}
                  <line x1="16.6%" y1="-10%" x2="50%" y2="40%" stroke="#eab308" strokeOpacity="0.2" strokeWidth="2" strokeDasharray="5,5" />
                  <line x1="50%" y1="-10%" x2="50%" y2="40%" stroke="#eab308" strokeOpacity="0.2" strokeWidth="2" strokeDasharray="5,5" />
                  <line x1="83.3%" y1="-10%" x2="50%" y2="40%" stroke="#eab308" strokeOpacity="0.2" strokeWidth="2" strokeDasharray="5,5" />
                  
                  {/* Data Packets Animation */}
                  <AnimatePresence>
                    {dataPackets.map(p => (
                      <motion.circle
                        key={p.id}
                        initial={{ r: 0, opacity: 0 }}
                        animate={{ r: 3, opacity: 0.6 }}
                        exit={{ r: 0, opacity: 0 }}
                        cx={`${p.x}%`}
                        cy={`${p.y}%`}
                        fill="#eab308"
                      />
                    ))}
                  </AnimatePresence>
                </svg>

                <motion.div
                  animate={{ 
                    scale: [1, 1.02, 1],
                    borderColor: ['rgba(234, 179, 8, 0.3)', 'rgba(234, 179, 8, 0.8)', 'rgba(234, 179, 8, 0.3)']
                  }}
                  transition={{ duration: 4, repeat: Infinity }}
                  style={{
                    position: 'absolute',
                    top: '40%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '100%',
                    height: '140px',
                    borderRadius: '30px',
                    border: '3px solid',
                    background: 'rgba(234, 179, 8, 0.05)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                    zIndex: 5
                  }}
                >
                  <motion.div animate={{ rotate: 360 }} transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}>
                    <Share2 size={32} color="#eab308" />
                  </motion.div>
                  <span style={{ fontWeight: 900, color: '#eab308', letterSpacing: '4px', fontSize: '1.2rem' }}>SPACE MIDDLEWARE</span>
                  <span style={{ fontSize: '0.7rem', opacity: 0.5, color: '#eab308' }}>SYNCING IN-MEMORY DATA GRID (IMDG)</span>
                </motion.div>
              </div>

              {/* BOTTOM: DATA STORE */}
              <div style={{ textAlign: 'center' }}>
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  style={{ 
                    display: 'inline-flex', 
                    padding: '1.5rem 3rem', 
                    background: 'rgba(59, 130, 246, 0.05)', 
                    border: '2px solid rgba(59, 130, 246, 0.3)', 
                    borderRadius: '20px',
                    alignItems: 'center',
                    gap: '1rem'
                  }}
                >
                  <Database size={24} color="#3b82f6" />
                  <div style={{ textAlign: 'left' }}>
                    <h4 style={{ color: 'white', margin: 0 }}>Persistent Store</h4>
                    <span style={{ fontSize: '0.7rem', color: '#3b82f6', fontWeight: 700 }}>ASYNC REPLICATION ONLY</span>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Detailed Explanation Section */}
        <section style={{ paddingBottom: '120px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>
            <motion.div initial={{ x: -30, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }}>
              <h2 style={{ fontSize: '2.5rem', marginBottom: '2rem', fontWeight: 850 }}>Neden Bu Mimari?</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                <div style={{ display: 'flex', gap: '1.5rem' }}>
                  <div style={{ minWidth: '50px', height: '50px', background: 'rgba(234,179,8,0.1)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#eab308' }}>
                    <Zap size={24} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>Düşük Gecikme (Latency)</h4>
                    <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>Geleneksel veritabanı okumaları disk maliyeti yaratır. Space-Based mimaride veri tamamen RAM üzerindedir.</p>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '1.5rem' }}>
                  <div style={{ minWidth: '50px', height: '50px', background: 'rgba(234,179,8,0.1)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#eab308' }}>
                    <Layers size={24} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>Yatayda Sınırsız Büyüme</h4>
                    <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>Yeni bir Processing Unit eklemek, sistemin işlem kapasitesini doğrusal olarak artırır.</p>
                  </div>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ x: 30, opacity: 0 }} 
              whileInView={{ x: 0, opacity: 1 }}
              className="glass-card" 
              style={{ padding: '3rem', borderLeft: '4px solid #eab308' }}
            >
              <h4 style={{ color: '#eab308', marginBottom: '1rem' }}>Sistemdeki Teknoloji: IMDG</h4>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8 }}>
                In-Memory Data Grid (IMDG) teknolojisi, Hazelcast, Redis veya Oracle Coherence gibi araçlarla bu mimariyi hayata geçirir. 
                Buradaki sihir, "Application Logic" ile "Data Grid"in aynı yerde yaşamasıdır. Veri sizin yanınıza gelir, siz veriye değil.
              </p>
              <div style={{ marginTop: '2rem', padding: '1rem', background: 'rgba(0,0,0,0.2)', borderRadius: '12px', fontSize: '0.85rem' }}>
                <code style={{ color: '#eab308' }}>// Guru Tip:</code> <span style={{ opacity: 0.8 }}>E-ticaret sistemlerinin "Checkout" veya "Black Friday" anlarında Space-Based mimari kurtarıcıdır.</span>
              </div>
            </motion.div>
          </div>
        </section>
      </div>

      <style>{`
        .pulse {
          animation: pulse-animation 2s infinite;
        }
        @keyframes pulse-animation {
          0% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(1.2); }
          100% { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </motion.div>
  );
};

export default SpaceBasedPage;
