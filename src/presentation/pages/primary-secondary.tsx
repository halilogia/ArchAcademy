import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ArchHero from '../components/ArchHero';
import { 
  Database, 
  GitMerge, 
  ShieldCheck, 
  Zap, 
  ArrowRight,
  Server,
  RefreshCw,
  AlertTriangle,
  HardDrive
} from 'lucide-react';

const PrimarySecondaryPage = () => {
    const [activeTab, setActiveTab] = useState<'simulation' | 'comparison'>('comparison');
    const [replicationStatus, setReplicationStatus] = useState<'IDLE' | 'SYNCING' | 'SYNCED'>('IDLE');
    const [primaryData, setPrimaryData] = useState<string[]>([]);
    const [secondary1Data, setSecondary1Data] = useState<string[]>([]);
    const [secondary2Data, setSecondary2Data] = useState<string[]>([]);

    const writeData = () => {
        const newData = `Block #${primaryData.length + 1}`;
        setPrimaryData(prev => [...prev, newData]);
        setReplicationStatus('SYNCING');

        // Simulate Replication Lag
        setTimeout(() => {
            setSecondary1Data(prev => [...prev, newData]);
        }, 1500); // 1.5s lag for Secondary 1

        setTimeout(() => {
            setSecondary2Data(prev => [...prev, newData]);
            setReplicationStatus('SYNCED');
        }, 3000); // 3s lag for Secondary 2
    };

  const illu = (
    <div style={{ position: 'relative', width: '380px', height: '350px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      
      {/* Primary Node */}
      <motion.div
        animate={{ 
            boxShadow: replicationStatus === 'SYNCING' 
                ? ['0 0 20px #eab308', '0 0 50px #eab308', '0 0 20px #eab308'] 
                : '0 0 20px rgba(234, 179, 8, 0.2)' 
        }}
        transition={{ duration: 1, repeat: replicationStatus === 'SYNCING' ? Infinity : 0 }}
        style={{ width: '120px', height: '100px', background: 'var(--glass)', border: '3px solid #eab308', borderRadius: '15px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', zIndex: 10, marginBottom: '40px' }}
      >
        <Database size={40} color="#eab308" />
        <span style={{ fontSize: '0.8rem', fontWeight: 900, marginTop: '5px' }}>PRIMARY</span>
        <span style={{ fontSize: '0.6rem', color: '#eab308', opacity: 0.8 }}>Read / Write</span>
      </motion.div>

      {/* Connection Lines with Data Packets */}
      <div style={{ position: 'relative', width: '300px', height: '40px', display: 'flex', justifyContent: 'center' }}>
         <svg style={{ position: 'absolute', top: -20, width: '100%', height: '100px', overflow: 'visible' }}>
             {/* Line to Secondary 1 */}
             <path d="M 150 0 L 80 100" stroke="#eab308" strokeWidth="2" strokeDasharray="5,5" opacity="0.5" fill="none" />
             {/* Line to Secondary 2 */}
             <path d="M 150 0 L 220 100" stroke="#eab308" strokeWidth="2" strokeDasharray="5,5" opacity="0.5" fill="none" />
         </svg>
         
         {/* Packet to S1 */}
         {replicationStatus === 'SYNCING' && (
             <motion.div 
                initial={{ x: 0, y: -20, opacity: 1 }}
                animate={{ x: -70, y: 80, opacity: 0 }}
                transition={{ duration: 1.5, ease: "linear" }}
                style={{ position: 'absolute', width: '12px', height: '12px', background: '#eab308', borderRadius: '50%' }}
             />
         )}
         {/* Packet to S2 */}
          {replicationStatus === 'SYNCING' && (
             <motion.div 
                initial={{ x: 0, y: -20, opacity: 1 }}
                animate={{ x: 70, y: 80, opacity: 0 }}
                transition={{ duration: 3, ease: "linear" }}
                style={{ position: 'absolute', width: '12px', height: '12px', background: '#eab308', borderRadius: '50%' }}
             />
         )}
      </div>

      {/* Secondary Nodes */}
      <div style={{ display: 'flex', gap: '30px', marginTop: '40px' }}>
          {[1, 2].map((i) => (
            <motion.div
                key={i}
                style={{ width: '100px', height: '90px', background: 'var(--glass)', border: '2px solid rgba(234, 179, 8, 0.4)', borderRadius: '15px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', opacity: 0.8 }}
            >
                <div style={{ position: 'relative' }}>
                    <Database size={28} color="#fde047" />
                    <div style={{ position: 'absolute', bottom: -5, right: -5, background: '#eab308', borderRadius: '50%', padding: '2px' }}>
                        <ArrowRight size={10} color="black" />
                    </div>
                </div>
                <span style={{ fontSize: '0.65rem', fontWeight: 800, marginTop: '5px' }}>SECONDARY {i}</span>
                <span style={{ fontSize: '0.55rem', opacity: 0.6 }}>Read Only</span>
            </motion.div>
          ))}
      </div>
    </div>
  );

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ paddingBottom: '100px' }}>
      <ArchHero 
        title="Primary-Secondary"
        subtitle="Master-Slave Replication"
        description="Veritabanı dünyasının en popüler ölçeklenme stratejisi. Yazmak için tek bir patron (Primary), okumak için ise ordular (Secondary) kullanın."
        badge="Scalability Pattern"
        color="#eab308"
        illustration={illu}
        features={[
          { icon: <Zap />, title: 'Write to Primary', desc: 'Tüm INSERT/UPDATE/DELETE işlemleri sadece Primary düğüme yapılır.' },
          { icon: <Database />, title: 'Read from Secondaries', desc: 'SELECT işlemleri Secondary düğümlere dağıtılarak yük hafifletilir.' },
          { icon: <ShieldCheck />, title: 'Failover', desc: 'Primary ölürse, Secondary\'lerden biri kral ilan edilir.' }
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
            { id: 'comparison', label: 'Single vs Replica', icon: <Server size={18} /> },
            { id: 'simulation', label: 'Replication Lag Demo', icon: <RefreshCw size={18} /> }
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
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem' }}>
                        <div className="glass-card">
                             <h3 style={{ fontSize: '1.4rem', color: '#94a3b8', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                 <HardDrive /> Single Node
                             </h3>
                             <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
                                Tek bir veritabanı sunucusu. Hem okuma hem yazma işlemlerini o yapar.
                             </p>
                             <ul style={{ paddingLeft: '1.5rem', color: '#94a3b8' }}>
                                <li style={{ marginBottom: '10px' }}>❌ Trafik artarsa sunucu kilitlenir.</li>
                                <li style={{ marginBottom: '10px' }}>❌ Sunucu çökerse site kapanır (SPOF).</li>
                                <li>✅ Yönetimi çok basittir, veri her zaman tutarlıdır.</li>
                             </ul>
                        </div>
                        
                        <div className="glass-card" style={{ borderTop: '4px solid #eab308' }}>
                             <h3 style={{ fontSize: '1.4rem', color: '#eab308', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                 <GitMerge /> Primary-Secondary
                             </h3>
                             <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
                                Yazmalar bir yere, okumalar birçok yere. Youtube, Twitter gibi okuma ağırlıklı sistemler için idealdir.
                             </p>
                             <ul style={{ paddingLeft: '1.5rem', color: 'var(--text-secondary)' }}>
                                <li style={{ marginBottom: '10px', color: '#10b981' }}>✅ Sınırsız okuma ölçeklemesi (Read Scaling).</li>
                                <li style={{ marginBottom: '10px', color: '#10b981' }}>✅ Primary çökerse, Secondary devralır (High Availability).</li>
                                <li style={{ color: '#f59e0b' }}>⚠️ Kopyalama (Replication) gecikmesi yaşanabilir (Lag).</li>
                             </ul>
                        </div>
                    </div>

                    <div style={{ marginTop: '3rem', background: 'rgba(234, 179, 8, 0.05)', padding: '2rem', borderRadius: '24px', border: '1px solid rgba(234, 179, 8, 0.2)' }}>
                        <h4 style={{ color: '#eab308', fontWeight: 800, marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                             <AlertTriangle size={20} /> Eventual Consistency Nedir?
                        </h4>
                        <p style={{ fontSize: '0.95rem', color: 'rgba(255,255,255,0.8)', lineHeight: 1.6 }}>
                            Primary'ye bir veri yazdığınızda, bu verinin Secondary'lere ulaşması milisaniyeler (veya ağ kötüyse saniyeler) sürer. 
                            Bu süre zarfında bir kullanıcı Secondary'den okuma yaparsa <strong style={{color:'white'}}>eski veriyi</strong> görebilir. 
                            Buna "Tutarlılık Gecikmesi" denir. Sistem "eninde sonunda" (eventually) tutarlı olacaktır.
                        </p>
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
                            onClick={writeData} 
                            disabled={replicationStatus === 'SYNCING'}
                            style={{ 
                                padding: '15px 40px', 
                                fontSize: '1.2rem', 
                                fontWeight: 800, 
                                borderRadius: '12px', 
                                border: 'none', 
                                background: replicationStatus === 'SYNCING' ? '#555' : '#eab308', 
                                color: replicationStatus === 'SYNCING' ? '#888' : 'black',
                                cursor: replicationStatus === 'SYNCING' ? 'not-allowed' : 'pointer',
                                boxShadow: replicationStatus === 'SYNCING' ? 'none' : '0 10px 30px rgba(234, 179, 8, 0.3)',
                                transition: 'all 0.2s'
                            }}
                        >
                            {replicationStatus === 'SYNCING' ? 'Kopyalanıyor...' : 'Primary\'e Veri Yaz (Write)'}
                        </button>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', alignItems: 'start' }}>
                        
                        {/* Primary Log */}
                        <div className="glass-card" style={{ border: '2px solid #eab308' }}>
                            <h4 style={{ textAlign: 'center', color: '#eab308', marginBottom: '1rem' }}>PRIMARY DB</h4>
                            <div style={{ minHeight: '200px', display: 'flex', flexDirection: 'column', gap: '5px' }}>
                                {primaryData.map((d, i) => (
                                    <motion.div key={i} initial={{opacity:0, x:-20}} animate={{opacity:1, x:0}} style={{ background: 'rgba(234, 179, 8, 0.2)', padding: '8px', borderRadius: '4px', fontSize: '0.8rem', color: '#fef08a' }}>
                                        {d}
                                    </motion.div>
                                ))}
                                {primaryData.length === 0 && <span style={{ opacity: 0.3, textAlign: 'center' }}>No Data</span>}
                            </div>
                        </div>

                         {/* Secondary 1 Log */}
                         <div className="glass-card" style={{ border: '1px solid rgba(255,255,255,0.1)' }}>
                            <h4 style={{ textAlign: 'center', color: '#94a3b8', marginBottom: '1rem' }}>SECONDARY 1 (Fast)</h4>
                            <div style={{ minHeight: '200px', display: 'flex', flexDirection: 'column', gap: '5px' }}>
                                 {secondary1Data.map((d, i) => (
                                    <motion.div key={i} initial={{opacity:0}} animate={{opacity:1}} style={{ background: 'rgba(255, 255, 255, 0.1)', padding: '8px', borderRadius: '4px', fontSize: '0.8rem', color: '#e2e8f0' }}>
                                        {d}
                                    </motion.div>
                                ))}
                                {secondary1Data.length < primaryData.length && <div style={{ color: '#eab308', fontSize: '0.7rem', textAlign: 'center', fontStyle: 'italic' }}>Syncing...</div>}
                            </div>
                        </div>

                        {/* Secondary 2 Log */}
                        <div className="glass-card" style={{ border: '1px solid rgba(255,255,255,0.1)' }}>
                            <h4 style={{ textAlign: 'center', color: '#94a3b8', marginBottom: '1rem' }}>SECONDARY 2 (Slow)</h4>
                            <div style={{ minHeight: '200px', display: 'flex', flexDirection: 'column', gap: '5px' }}>
                                 {secondary2Data.map((d, i) => (
                                    <motion.div key={i} initial={{opacity:0}} animate={{opacity:1}} style={{ background: 'rgba(255, 255, 255, 0.1)', padding: '8px', borderRadius: '4px', fontSize: '0.8rem', color: '#e2e8f0' }}>
                                        {d}
                                    </motion.div>
                                ))}
                                {secondary2Data.length < primaryData.length && <div style={{ color: '#eab308', fontSize: '0.7rem', textAlign: 'center', fontStyle: 'italic' }}>Syncing (Lag)...</div>}
                            </div>
                        </div>

                    </div>
                 </motion.div>
             )}
        </AnimatePresence>
      </div>
      <section style={{ padding: '4rem 0', background: 'rgba(0,0,0,0.3)', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
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
                Distributed Data
              </div>
              <p style={{ color: '#94a3b8', marginBottom: '2rem', fontSize: '1.1rem', lineHeight: 1.6 }}>
                Primary-Secondary (Master-Slave) replikasyon modelleri ve veri tutarlılığı (consistency) stratejileri hakkında teknik dökümantasyonu inceleyin.
              </p>
              
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                 <a 
                   href="https://learn.microsoft.com/en-us/azure/architecture/patterns/index-table" 
                   target="_blank" 
                   rel="noopener noreferrer"
                   style={{ 
                     display: 'flex', alignItems: 'center', gap: '8px', 
                     background: 'rgba(234, 179, 8, 0.15)', color: '#fef08a', 
                     padding: '12px 24px', borderRadius: '12px', textDecoration: 'none', fontWeight: 600,
                     border: '1px solid rgba(234, 179, 8, 0.2)', transition: 'all 0.2s'
                   }}
                 >
                    Data Replication Patterns (Microsoft) <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                 </a>
              </div>
           </div>
        </div>
      </section>
    </motion.div>
  );
};

export default PrimarySecondaryPage;
