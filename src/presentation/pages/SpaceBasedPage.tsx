import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Database, Zap, Cpu, Server, Layers, ArrowDownUp, RefreshCcw, Box, HardDrive, Activity } from 'lucide-react';
import ArchHero from '../components/ArchHero';

const SpaceBasedPage = () => {
    const [activeTab, setActiveTab] = useState<'simulation' | 'comparison'>('comparison');
    const [requests, setRequests] = useState<number>(0);
    const [partitions, setPartitions] = useState([
        { id: 1, load: 0, range: 'A-M', color: '#eab308' },
        { id: 2, load: 0, range: 'N-Z', color: '#f59e0b' }
    ]);
    const [dbLoad, setDbLoad] = useState(0);

    const handleLoad = () => {
        setRequests(prev => prev + 10);
        
        // Load balancing via partitioning
        // Space Based Architecture handles load in RAM (Processing Units), hardly touching DB asynchronously
        setPartitions(prev => prev.map(p => ({
            ...p,
            load: Math.min(100, p.load + Math.floor(Math.random() * 20))
        })));

        // DB Load stays low because sync is async/write-behind
        setDbLoad(prev => Math.min(100, prev + 5)); 
    };

    // Auto-decrease load to simulate processing
    useEffect(() => {
        const interval = setInterval(() => {
            setPartitions(prev => prev.map(p => ({ ...p, load: Math.max(0, p.load - 10) })));
            setDbLoad(prev => Math.max(0, prev - 5));
        }, 1000);
        return () => clearInterval(interval);
    }, []);

  const illu = (
    <div style={{ position: 'relative', width: '350px', height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      
      {/* Background Grid */}
      <div style={{ position: 'absolute', width: '100%', height: '100%', opacity: 0.1, backgroundImage: 'linear-gradient(#eab308 1px, transparent 1px), linear-gradient(90deg, #eab308 1px, transparent 1px)', backgroundSize: '20px 20px' }} />

      {/* Processing Units (Nodes) */}
      {[0, 1].map((i) => (
        <motion.div
           key={i}
           animate={{ y: [0, -10, 0] }}
           transition={{ duration: 3, repeat: Infinity, delay: i * 1.5, ease: "easeInOut" }}
           style={{
               position: 'absolute',
               left: i === 0 ? '40px' : 'auto',
               right: i === 1 ? '40px' : 'auto',
               width: '100px',
               height: '120px',
               background: 'var(--glass)',
               border: '2px solid #eab308',
               borderRadius: '16px',
               display: 'flex',
               flexDirection: 'column',
               alignItems: 'center',
               padding: '10px',
               boxShadow: '0 10px 40px rgba(234, 179, 8, 0.2)'
           }}
        >
            <div style={{ fontSize: '0.6rem', color: '#eab308', marginBottom: '5px', fontWeight: 800 }}>PU - {i+1}</div>
            
            {/* Logic Layer */}
            <div style={{ width: '80%', height: '30px', background: 'rgba(234, 179, 8, 0.2)', borderRadius: '6px', marginBottom: '5px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Cpu size={14} color="#fde047" />
            </div>
            
            {/* RAM Grid */}
            <div style={{ width: '80%', height: '50px', border: '1px dashed #eab308', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                 <Database size={20} color="#eab308" />
            </div>
        </motion.div>
      ))}

      {/* Async DB Sync Line */}
      <div style={{ position: 'absolute', bottom: '20px', width: '200px', height: '2px', background: 'linear-gradient(90deg, transparent, #eab308, transparent)', opacity: 0.5 }} />
      <div style={{ position: 'absolute', bottom: '-20px', fontSize: '0.7rem', color: '#71717a' }}>Async Persistency</div>

    </div>
  );

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ paddingBottom: '100px' }}>
      <ArchHero 
        title="Space-Based"
        subtitle="Architecture"
        description="Veritabanı darboğazını yok etmek için tasarlanmıştır. Uygulama ve Veri aynı yerde (RAM) yaşar. 'Tuple Space' mantığıyla yüz binlerce işlemi milisaniyeler içinde işler."
        badge="High Performance Profile"
        color="#eab308"
        illustration={illu}
        features={[
          { icon: <Cpu />, title: 'Processing Unit (PU)', desc: 'İş mantığı (Logic) ve Veri (Data), tek bir birim olarak beraber ölçeklenir.' },
          { icon: <Database />, title: 'In-Memory Grid', desc: 'Veriler diskte değil, yüzlerce sunucunun RAM\'inde tutulur.' },
          { icon: <RefreshCcw />, title: 'Write-Behind', desc: 'Veritabanına yazma işlemi asenkron yapılır, kullanıcıyı bekletmez.' }
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
            { id: 'comparison', label: 'DB Centric vs Space', icon: <Layers size={18} /> },
            { id: 'simulation', label: 'Load Grid Demo', icon: <Activity size={18} /> }
          ].map((tab) => (
             <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              style={{
                padding: '10px 24px',
                borderRadius: '18px',
                border: 'none',
                background: activeTab === tab.id ? '#eab308' : 'transparent',
                color: activeTab === tab.id ? 'black' : 'rgba(255,255,255,0.5)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontWeight: 700,
                fontSize: '0.9rem',
                transition: 'all 0.3s ease',
                boxShadow: activeTab === tab.id ? '0 4px 12px rgba(234, 179, 8, 0.3)' : 'none'
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
                     <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem' }}>
                        <div className="glass-card">
                             <h3 style={{ fontSize: '1.4rem', color: '#94a3b8', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                 <Database size={24} /> Database Centric (Klasik)
                             </h3>
                             <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
                                Her şeyin merkezinde dev bir veritabanı vardır. Web sunucuları buraya bağımlıdır.
                             </p>
                             <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
                                 <div style={{ display: 'flex', gap: '5px' }}>
                                     <div style={{ width: '40px', height: '30px', background: '#334155', borderRadius: '4px' }}></div>
                                     <div style={{ width: '40px', height: '30px', background: '#334155', borderRadius: '4px' }}></div>
                                     <div style={{ width: '40px', height: '30px', background: '#334155', borderRadius: '4px' }}></div>
                                 </div>
                                 <ArrowDownUp size={20} color="#94a3b8" />
                                 <div style={{ width: '80px', height: '60px', background: '#eab308', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'black', fontWeight: 900, boxShadow: '0 0 20px rgba(234, 179, 8, 0.5)' }}>
                                     DB
                                 </div>
                                 <span style={{ color: '#ef4444', fontSize: '0.8rem', fontWeight: 700 }}>⚠️ DARBOĞAZ (Bottleneck)</span>
                             </div>
                        </div>

                        <div className="glass-card" style={{ borderTop: '4px solid #eab308' }}>
                             <h3 style={{ fontSize: '1.4rem', color: '#eab308', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                 <Box size={24} /> Space-Based (Grid)
                             </h3>
                             <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
                                Veritabanı sadece "arşiv" gibidir. Asıl iş RAM'de dağıtık olarak yapılır.
                             </p>
                             <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
                                 <div style={{ width: '80px', height: '100px', background: 'rgba(234, 179, 8, 0.2)', border: '1px solid #eab308', borderRadius: '8px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '5px' }}>
                                    <Cpu size={16} color="#fde047" />
                                    <Database size={16} color="#fde047" />
                                 </div>
                                 <div style={{ width: '80px', height: '100px', background: 'rgba(234, 179, 8, 0.2)', border: '1px solid #eab308', borderRadius: '8px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '5px' }}>
                                    <Cpu size={16} color="#fde047" />
                                    <Database size={16} color="#fde047" />
                                 </div>
                                 <div style={{ width: '80px', height: '100px', background: 'rgba(234, 179, 8, 0.2)', border: '1px solid #eab308', borderRadius: '8px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '5px' }}>
                                    <Cpu size={16} color="#fde047" />
                                    <Database size={16} color="#fde047" />
                                 </div>
                             </div>
                             <div style={{ textAlign: 'center', marginTop: '10px', color: '#10b981', fontSize: '0.8rem', fontWeight: 700 }}>
                                 ✅ SINIRSIZ ÖLÇEKLENME
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
                    <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                        <button 
                            onClick={handleLoad}
                            className="btn-bounce"
                            style={{ 
                                padding: '15px 40px', 
                                fontSize: '1.2rem', 
                                fontWeight: 800, 
                                borderRadius: '12px', 
                                border: 'none', 
                                background: '#eab308', 
                                color: 'black',
                                cursor: 'pointer',
                                boxShadow: '0 10px 30px rgba(234, 179, 8, 0.4)',
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '10px'
                            }}
                        >
                            <Zap size={24} /> Yük Bindir (Traffic Generators)
                        </button>
                        <p style={{ marginTop: '1rem', color: 'var(--text-secondary)' }}>
                            Space-Based mimarisi, gelen yükü bölümlere (partition) ayırarak RAM üzerinde karşılar.
                        </p>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem', alignItems: 'center' }}>
                        
                        {/* The Processing Grid */}
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                            {partitions.map((p) => (
                                <div key={p.id} className="glass-card" style={{ borderColor: p.load > 80 ? '#ef4444' : p.color }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                                        <h4 style={{ color: p.color }}>Node-{p.id} ({p.range})</h4>
                                        <Cpu size={20} color={p.color} />
                                    </div>
                                    
                                    <div style={{ marginBottom: '5px', display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', opacity: 0.8 }}>
                                        <span>CPU / RAM Usage</span>
                                        <span>{p.load}%</span>
                                    </div>
                                    <div style={{ width: '100%', height: '10px', background: 'rgba(255,255,255,0.1)', borderRadius: '5px', overflow: 'hidden' }}>
                                        <motion.div 
                                            animate={{ width: `${p.load}%` }}
                                            style={{ height: '100%', background: p.load > 80 ? '#ef4444' : p.color }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* The Bottleneck (DB) */}
                        <div className="glass-card" style={{ textAlign: 'center', opacity: 0.6 }}>
                            <HardDrive size={40} color="#94a3b8" style={{ margin: '0 auto 10px auto' }} />
                            <h4>Disk Database</h4>
                            <p style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Async Write-Behind</p>
                            
                            <div style={{ marginTop: '1rem', padding: '10px', background: 'rgba(0,0,0,0.3)', borderRadius: '8px' }}>
                                <div style={{ fontSize: '0.8rem', marginBottom: '5px' }}>DB Load</div>
                                <div style={{ width: '100%', height: '6px', background: '#334155', borderRadius: '3px' }}>
                                     <motion.div 
                                        animate={{ width: `${dbLoad}%` }}
                                        style={{ height: '100%', background: '#94a3b8' }}
                                    />
                                </div>
                                <div style={{ fontSize: '0.7rem', marginTop: '5px', color: '#10b981' }}>
                                    {dbLoad < 30 ? 'Stabil & Düşük' : 'Yükseliyor'}
                                </div>
                            </div>
                        </div>

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
                Technical Foundation
              </div>
              <p style={{ color: '#94a3b8', marginBottom: '2rem', fontSize: '1.1rem', lineHeight: 1.6 }}>
                Space-Based Architecture kavramı, özellikle GigaSpaces ve "Tuple Space" teorisi üzerine kuruludur. Detaylı teknik döküman için inceleyin.
              </p>
              
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                 <a 
                   href="https://www.gigaspaces.com/" 
                   target="_blank" 
                   rel="noopener noreferrer"
                   style={{ 
                     display: 'flex', alignItems: 'center', gap: '8px', 
                     background: 'rgba(234, 179, 8, 0.15)', color: '#fde047', 
                     padding: '12px 24px', borderRadius: '12px', textDecoration: 'none', fontWeight: 600,
                     border: '1px solid rgba(234, 179, 8, 0.2)', transition: 'all 0.2s'
                   }}
                 >
                    GigaSpaces Technology <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                 </a>
              </div>
           </div>
        </div>
      </section>
    </motion.div>
  );
};

export default SpaceBasedPage;
