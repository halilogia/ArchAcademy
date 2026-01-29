import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ArchHero from '../components/ArchHero';
import { 
  Database, 
  Zap, 
  Activity, 
  Server, 
  Layers, 
  GitMerge, 
  Clock, 
  RotateCw,
  Filter,
  ArrowRight
} from 'lucide-react';

interface DataParticle {
    id: number;
    type: 'hot' | 'cold'; 
    x: number;
    y: number;
}

const BigDataPage = () => {
    const [activeTab, setActiveTab] = useState<'simulation' | 'comparison'>('comparison');
    const [archMode, setArchMode] = useState<'lambda' | 'kappa'>('lambda');
    
    // Simulation State
    const [particles, setParticles] = useState<DataParticle[]>([]);
    const [processedCount, setProcessedCount] = useState(0);

    const ingestData = () => {
        const id = Date.now();
        // Start position
        const newParticle: DataParticle = { id, type: 'hot', x: 0, y: 50 }; 
        setParticles(prev => [...prev, newParticle]);

        // Animation logic would typically be handled by framer-motion variants, 
        // but for complex pathing we might use state updates or predefined paths.
        // Simplified: use CSS/Framer animation on the particle component itself based on Arch Mode.
        setTimeout(() => setProcessedCount(c => c + 1), 2000);
        setTimeout(() => setParticles(prev => prev.filter(p => p.id !== id)), 2500);
    };

    // Auto ingest for effect
    useEffect(() => {
        if (activeTab === 'simulation') {
            const interval = setInterval(() => {
                if (Math.random() > 0.7) ingestData();
            }, 800);
            return () => clearInterval(interval);
        }
    }, [activeTab]);

    const illu = (
        <div style={{ position: 'relative', width: '350px', height: '300px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            {/* Source */}
            <div style={{ position: 'absolute', left: 0, top: '45%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Server color="#06b6d4" size={24} />
                <span style={{ fontSize: '0.7rem', color: '#06b6d4', fontWeight: 800 }}>SOURCE</span>
            </div>

            {/* Architecture Visual */}
            <svg style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
                <defs>
                    <linearGradient id="gradientFlow" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#06b6d4" stopOpacity="1" />
                        <stop offset="100%" stopColor="#8b5cf6" stopOpacity="1" />
                    </linearGradient>
                </defs>
                
                {/* Batch Layer Path (Lambda Only) */}
                <motion.path 
                    d="M 40 150 C 100 150, 100 50, 200 50 L 300 120"
                    fill="none"
                    stroke="#06b6d4"
                    strokeWidth="2"
                    strokeDasharray="5 5"
                    opacity="0.5"
                />

                 {/* Speed/Stream Layer Path */}
                 <motion.path 
                    d="M 40 150 C 100 150, 100 250, 200 250 L 300 180"
                    fill="none"
                    stroke="#ec4899"
                    strokeWidth="2"
                    strokeDasharray="5 5"
                    opacity="0.5"
                />
            </svg>

            {/* Moving Particles */}
            {particles.map(p => (
                <motion.div
                    key={p.id}
                    initial={{ offsetDistance: '0%' }}
                    animate={{ offsetDistance: '100%' }}
                    transition={{ duration: 2, ease: 'linear' }}
                    style={{
                        position: 'absolute',
                        width: '10px',
                        height: '10px',
                        borderRadius: '50%',
                        background: 'white',
                        boxShadow: '0 0 10px white',
                        zIndex: 10,
                        offsetPath: Math.random() > 0.5 
                            ? 'path("M 40 150 C 100 150, 100 250, 200 250 L 300 180")' 
                            : 'path("M 40 150 C 100 150, 100 50, 200 50 L 300 120")'
                    }}
                />
            ))}

            {/* Layers */}
            <motion.div 
                animate={{ scale: [1, 1.05, 1] }} 
                transition={{ duration: 3, repeat: Infinity }}
                style={{ position: 'absolute', top: 30, right: 60, padding: '10px', background: 'rgba(6, 182, 212, 0.1)', border: '1px solid #06b6d4', borderRadius: '12px' }}
            >
                <div style={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
                    <Database size={16} color="#06b6d4" />
                    <span style={{ fontSize: '0.7rem', color: '#06b6d4' }}>BATCH</span>
                </div>
            </motion.div>

            <motion.div 
                 animate={{ scale: [1, 1.05, 1] }} 
                 transition={{ duration: 0.5, repeat: Infinity }}
                 style={{ position: 'absolute', bottom: 30, right: 60, padding: '10px', background: 'rgba(236, 72, 153, 0.1)', border: '1px solid #ec4899', borderRadius: '12px' }}
            >
                <div style={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
                    <Zap size={16} color="#ec4899" />
                    <span style={{ fontSize: '0.7rem', color: '#ec4899' }}>SPEED</span>
                </div>
            </motion.div>

        </div>
    );

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ paddingBottom: '100px' }}>
      <ArchHero 
        title="Big Data"
        subtitle="Lambda vs Kappa"
        description="Veri okyanuslarını yönetme sanatı. Lambda mimarisi hem kusursuz arşiv (Batch) hem de anlık hız (Speed) sağlarken, Kappa her şeyi akış (Stream) olarak görür."
        badge="Data Engineering"
        color="#06b6d4"
        illustration={illu}
        features={[
          { icon: <Database />, title: 'Batch Layer', desc: 'Tüm verinin güvenilir, değiştirilemez ana kopyası (Master Dataset). Yavaş ama kesindir.' },
          { icon: <Zap />, title: 'Speed Layer', desc: 'Son verileri anlık işler. Biraz hata payı olabilir ama çok hızlıdır.' },
          { icon: <Filter />, title: 'Serving Layer', desc: 'Hem batch hem speed katmanından gelen veriyi birleştirip kullanıcıya sunar.' }
        ]}
      >
         <div style={{ 
          marginTop: '2rem',
          padding: '6px', 
          background: 'rgba(15, 23, 42, 0.4)', 
          borderRadius: '24px', 
          border: '1px solid rgba(255,255,255,0.05)',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '4px',
          backdropFilter: 'blur(10px)'
        }}>
          {[
            { id: 'comparison', label: 'Architecture Comparison', icon: <Layers size={18} /> },
            { id: 'simulation', label: 'Pipeline Simulation', icon: <Activity size={18} /> }
          ].map((tab) => (
             <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              style={{
                padding: '10px 24px',
                borderRadius: '18px',
                border: 'none',
                background: activeTab === tab.id ? '#06b6d4' : 'transparent',
                color: activeTab === tab.id ? 'black' : 'rgba(255,255,255,0.5)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontWeight: 700,
                fontSize: '0.9rem',
                transition: 'all 0.3s ease',
                boxShadow: activeTab === tab.id ? '0 4px 12px rgba(6, 182, 212, 0.3)' : 'none'
              }}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>
      </ArchHero>

      <div className="container" style={{ marginTop: '2rem' }}>
        <AnimatePresence mode="wait">
            {activeTab === 'comparison' && (
                 <motion.div
                    key="comparison"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                >
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                        
                        {/* Lambda Card */}
                        <div className="glass-card" style={{ borderTop: '4px solid #06b6d4' }}>
                            <h3 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '10px', color: '#06b6d4' }}>
                                <GitMerge /> Lambda Architecture
                            </h3>
                            <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', minHeight: '60px' }}>
                                Hibrit yaklaşım. Veri iki yola ayrılır: Biri soğuk depoya (Batch View), biri hızlı işlemeye (Real-time View).
                            </p>
                            
                            <div style={{ background: 'rgba(6, 182, 212, 0.05)', padding: '15px', borderRadius: '12px', marginBottom: '10px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                                    <strong style={{ color: '#06b6d4' }}>Batch Layer</strong>
                                    <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Hadoop / S3</span>
                                </div>
                                <div style={{ width: '100%', height: '6px', background: '#334155', borderRadius: '3px' }}>
                                    <div style={{ width: '100%', height: '100%', background: '#06b6d4', borderRadius: '3px', opacity: 0.5 }}></div>
                                </div>
                                <div style={{ fontSize: '0.7rem', marginTop: '5px', color: '#94a3b8' }}>Yüksek Doğruluk, Yüksek Gecikme</div>
                            </div>

                             <div style={{ background: 'rgba(236, 72, 153, 0.05)', padding: '15px', borderRadius: '12px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                                    <strong style={{ color: '#ec4899' }}>Speed Layer</strong>
                                    <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Storm / Spark</span>
                                </div>
                                <div style={{ width: '100%', height: '6px', background: '#334155', borderRadius: '3px' }}>
                                    <div style={{ width: '100%', height: '100%', background: '#ec4899', borderRadius: '3px',  }}></div>
                                </div>
                                <div style={{ fontSize: '0.7rem', marginTop: '5px', color: '#94a3b8' }}>Düşük Gecikme, Yaklaşık Sonuç</div>
                            </div>
                        </div>

                        {/* Kappa Card */}
                        <div className="glass-card" style={{ borderTop: '4px solid #8b5cf6' }}>
                            <h3 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '10px', color: '#8b5cf6' }}>
                                <RotateCw /> Kappa Architecture
                            </h3>
                             <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', minHeight: '60px' }}>
                                Basitleştirilmiş yaklaşım. "Her şey bir akıştır." Batch katmanı yoktur, geçmiş veri de stream gibi tekrar oynatılır.
                            </p>

                             <div style={{ background: 'rgba(139, 92, 246, 0.05)', padding: '15px', borderRadius: '12px', height: '180px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                                    <strong style={{ color: '#8b5cf6' }}>Stream Only</strong>
                                    <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Kafka / Flink</span>
                                </div>
                                <div style={{ width: '100%', height: '12px', background: '#334155', borderRadius: '6px', display: 'flex', overflow: 'hidden' }}>
                                    <motion.div 
                                        animate={{ x: [-100, 300] }} 
                                        transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                                        style={{ width: '50px', height: '100%', background: 'linear-gradient(90deg, transparent, #8b5cf6, transparent)' }} 
                                    />
                                </div>
                                <div style={{ fontSize: '0.7rem', marginTop: '15px', color: '#94a3b8' }}>
                                    Tek kod tabanı ile hem geçmiş hem anlık veri işlenir. Karmaşıklık daha azdır.
                                </div>
                            </div>
                        </div>

                    </div>
                </motion.div>
            )}

            {activeTab === 'simulation' && (
                <motion.div
                    key="simulation"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                >
                     <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginBottom: '2rem' }}>
                         <button 
                            onClick={() => setArchMode('lambda')}
                            style={{ 
                                padding: '10px 30px', 
                                background: archMode === 'lambda' ? '#06b6d4' : '#1e293b', 
                                borderRadius: '10px', 
                                border: 'none',
                                color: 'white',
                                fontWeight: 700,
                                cursor: 'pointer'
                            }}
                        >
                            Lambda Mode
                        </button>
                         <button 
                            onClick={() => setArchMode('kappa')}
                            style={{ 
                                padding: '10px 30px', 
                                background: archMode === 'kappa' ? '#8b5cf6' : '#1e293b', 
                                borderRadius: '10px', 
                                border: 'none',
                                color: 'white',
                                fontWeight: 700,
                                cursor: 'pointer'
                            }}
                        >
                            Kappa Mode
                        </button>
                    </div>

                    <div style={{ position: 'relative', height: '400px', background: '#020617', borderRadius: '24px', overflow: 'hidden', border: '1px solid #1e293b' }}>
                        {/* Visual Pipeline */}
                         <div style={{ position: 'absolute', top: '50%', left: '50px', transform: 'translateY(-50%)', zIndex: 20 }}>
                            <button onClick={ingestData} className="btn-bounce" style={{ width: '60px', height: '60px', borderRadius: '50%', background: '#fff', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 20px rgba(255,255,255,0.2)' }}>
                                <Database color="#020617" />
                            </button>
                            <div style={{ textAlign: 'center', marginTop: '10px', fontSize: '0.8rem', fontWeight: 800 }}>INGEST</div>
                         </div>

                        {/* Pipes */}
                        <svg style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }} viewBox="0 0 1000 400" preserveAspectRatio="none">
                            {/* Lambda: Split pipes */}
                            {archMode === 'lambda' && (
                                <>
                                    <path d="M 100 200 C 300 200, 300 50, 500 50 C 700 50, 700 200, 900 200" stroke="#06b6d4" strokeWidth="4" fill="none" strokeDasharray="10 5" />
                                    <path d="M 100 200 C 300 200, 300 350, 500 350 C 700 350, 700 200, 900 200" stroke="#ec4899" strokeWidth="4" fill="none" strokeDasharray="10 5" />
                                    <text x="500" y="40" fill="#06b6d4" fontSize="14" fontWeight="bold" textAnchor="middle">BATCH LAYER</text>
                                    <text x="500" y="375" fill="#ec4899" fontSize="14" fontWeight="bold" textAnchor="middle">SPEED LAYER</text>
                                </>
                            )}

                             {/* Kappa: Single fat pipe */}
                             {archMode === 'kappa' && (
                                <>
                                    <path d="M 100 200 L 900 200" stroke="#8b5cf6" strokeWidth="12" fill="none" />
                                    <text x="500" y="180" fill="#8b5cf6" fontSize="14" fontWeight="bold" textAnchor="middle">STREAM LAYER (LOG)</text>
                                </>
                            )}

                            {/* Particles inside SVG */}
                            <AnimatePresence>
                                {particles.map(p => {
                                    const isSpeed = Math.random() > 0.5;
                                    
                                    if (archMode === 'lambda') {
                                        return (
                                            <motion.circle
                                                key={p.id}
                                                r="6"
                                                fill={isSpeed ? '#ec4899' : '#06b6d4'}
                                                initial={{ offsetDistance: '0%' }}
                                                animate={{ offsetDistance: '100%' }}
                                                exit={{ opacity: 0 }}
                                                transition={{ duration: 2, ease: 'linear' }}
                                                style={{
                                                    offsetPath: isSpeed 
                                                        ? 'path("M 100 200 C 300 200, 300 350, 500 350 C 700 350, 700 200, 900 200")' 
                                                        : 'path("M 100 200 C 300 200, 300 50, 500 50 C 700 50, 700 200, 900 200")'
                                                }}
                                            />
                                        );
                                    } else {
                                        return (
                                            <motion.circle
                                                key={p.id}
                                                r="6"
                                                fill="#fff"
                                                initial={{ offsetDistance: '0%' }}
                                                animate={{ offsetDistance: '100%' }}
                                                exit={{ opacity: 0 }}
                                                transition={{ duration: 1.5, ease: 'linear' }}
                                                style={{
                                                    offsetPath: 'path("M 100 200 L 900 200")'
                                                }}
                                            />
                                        );
                                    }
                                })}
                            </AnimatePresence>
                        </svg>
                        
                         {/* Serving Layer (End) */}
                         <div style={{ position: 'absolute', right: '50px', top: '50%', transform: 'translateY(-50%)', textAlign: 'center' }}>
                             <div className="glass-card" style={{ padding: '20px' }}>
                                 <h4 style={{ margin: 0 }}>Serving Layer</h4>
                                 <div style={{ fontSize: '2rem', fontWeight: 900, color: '#fff' }}>{processedCount}</div>
                                 <div style={{ fontSize: '0.7rem', color: '#94a3b8' }}>EVENTS PROCESSED</div>
                             </div>
                         </div>

                    </div>
                    <div style={{ textAlign: 'center', marginTop: '10px', color: '#64748b', fontSize: '0.8rem' }}>
                        *Simülasyonda veriler soldan girer, mimariye göre işlenir ve Serving Layer'da birleşir.
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
      </div>
      
      <section style={{ padding: '4rem 0', background: 'rgba(0,0,0,0.3)', borderTop: '1px solid rgba(255,255,255,0.05)', marginTop: '4rem' }}>
        <div className="container" style={{ textAlign: 'center' }}>
           <div style={{ 
             background: 'linear-gradient(180deg, rgba(15, 23, 42, 0) 0%, rgba(15, 23, 42, 0.5) 100%)', 
             padding: '3rem', 
             borderRadius: '24px', 
             border: '1px solid rgba(255,255,255,0.05)',
             maxWidth: '900px',
             margin: '0 auto'
           }}>
              <div style={{ fontSize: '0.8rem', letterSpacing: '2px', fontWeight: 800, color: 'rgba(255,255,255,0.4)', marginBottom: '1rem', textTransform: 'uppercase' }}>
                Original Concept
              </div>
              <p style={{ color: '#94a3b8', marginBottom: '2rem', fontSize: '1.1rem', lineHeight: 1.6 }}>
                Nathan Marz tarafından ortaya atılan Lambda Mimarisi'nin prensipleri ve Kappa Mimarisi ile karşılaştırmaları için orijinal kaynağı inceleyebilirsiniz.
              </p>
              
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                 <a 
                   href="http://lambda-architecture.net/" 
                   target="_blank" 
                   rel="noopener noreferrer"
                   style={{ 
                     display: 'flex', alignItems: 'center', gap: '8px', 
                     background: 'rgba(6, 182, 212, 0.15)', color: '#67e8f9', 
                     padding: '12px 24px', borderRadius: '12px', textDecoration: 'none', fontWeight: 600,
                     border: '1px solid rgba(6, 182, 212, 0.2)', transition: 'all 0.2s'
                   }}
                 >
                    Lambda Architecture <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                 </a>
              </div>
           </div>
        </div>
      </section>
    </motion.div>
  );
};

export default BigDataPage;
