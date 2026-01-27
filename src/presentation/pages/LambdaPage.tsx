import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ArchHero from '../components/ArchHero';
import { 
  Database, 
  Zap, 
  Layers, 
  Clock, 
  Search, 
  Server, 
  GitBranch, 
  RotateCcw,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

const LambdaPage = () => {
    const [queryStatus, setQueryStatus] = useState<'idle' | 'querying' | 'complete'>('idle');
    const [batchResult, setBatchResult] = useState<any>(null);
    const [speedResult, setSpeedResult] = useState<any>(null);

    const runQuery = () => {
        if (queryStatus === 'querying') return;
        setQueryStatus('querying');
        setBatchResult(null);
        setSpeedResult(null);

        // Simulate Parallel Querying
        
        // Speed Layer (Fast but volatile)
        setTimeout(() => {
            setSpeedResult({ count: 42, time: '12ms', source: 'Real-time View' });
        }, 800);

        // Batch Layer (Slow but comprehensive)
        setTimeout(() => {
            setBatchResult({ count: 18500, time: '1.2s', source: 'Batch View' });
            setQueryStatus('complete');
        }, 2000);
    };

    const illu = (
        <div style={{ position: 'relative', width: '360px', height: '280px' }}>
            {/* Main Data Pipe Split */}
            <svg style={{ position: 'absolute', width: '100%', height: '100%', overflow: 'visible' }}>
                 {/* Input Pipe */}
                 <path d="M 0 140 L 60 140" stroke="#6366f1" strokeWidth="4" />
                 
                 {/* Batch Path (Top) */}
                 <path d="M 60 140 C 120 140, 120 60, 180 60 L 200 60" stroke="#6366f1" strokeWidth="4" fill="none" strokeDasharray="5 5" opacity="0.5" />
                 
                 {/* Speed Path (Bottom) */}
                 <path d="M 60 140 C 120 140, 120 220, 180 220 L 200 220" stroke="#22d3ee" strokeWidth="4" fill="none" strokeDasharray="5 5" opacity="0.8" />
                 
                 {/* Join at Serving Layer? (Visual logic usually separate, but let's imply endpoints) */}
            </svg>

            {/* Ingest Node */}
            <div style={{ position: 'absolute', left: 40, top: 120, width: '40px', height: '40px', background: '#1e293b', borderRadius: '50%', border: '2px solid #6366f1', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10 }}>
                <GitBranch size={20} color="#fff" />
            </div>

            {/* Batch Node */}
            <motion.div 
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                style={{ position: 'absolute', top: 40, right: 40, width: '120px', padding: '10px', background: 'rgba(99, 102, 241, 0.1)', border: '1px solid #6366f1', borderRadius: '12px', zIndex: 20 }}
            >
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <Database size={16} color="#6366f1" />
                    <span style={{ fontSize: '0.7rem', color: '#6366f1', fontWeight: 800 }}>BATCH</span>
                </div>
                <div style={{ fontSize: '0.6rem', color: '#94a3b8', marginTop: '4px' }}>Immutable Master</div>
            </motion.div>

            {/* Speed Node */}
            <motion.div 
                animate={{ y: [0, 5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                style={{ position: 'absolute', bottom: 40, right: 40, width: '120px', padding: '10px', background: 'rgba(34, 211, 238, 0.1)', border: '1px solid #22d3ee', borderRadius: '12px', zIndex: 20 }}
            >
                 <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <Zap size={16} color="#22d3ee" />
                    <span style={{ fontSize: '0.7rem', color: '#22d3ee', fontWeight: 800 }}>SPEED</span>
                </div>
                <div style={{ fontSize: '0.6rem', color: '#94a3b8', marginTop: '4px' }}>Real-time Incr.</div>
            </motion.div>

            {/* Particle Flow */}
            <motion.div
                animate={{ offsetDistance: '100%' }}
                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                style={{
                    position: 'absolute', width: '8px', height: '8px', borderRadius: '50%', background: '#6366f1',
                    offsetPath: 'path("M 60 140 C 120 140, 120 60, 180 60 L 200 60")', zIndex: 15
                }}
            />
             <motion.div
                animate={{ offsetDistance: '100%' }}
                transition={{ duration: 2, repeat: Infinity, ease: 'linear', delay: 1 }}
                style={{
                    position: 'absolute', width: '8px', height: '8px', borderRadius: '50%', background: '#22d3ee',
                    offsetPath: 'path("M 60 140 C 120 140, 120 220, 180 220 L 200 220")', zIndex: 15
                }}
            />

        </div>
    );

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ paddingBottom: '100px' }}>
      <ArchHero 
        title="Lambda"
        subtitle="Architecture"
        description="Veri işlemenin 'Divide and Conquer' (Böl ve Yönet) stratejisi. Bir yandan tarihi veriyi (Batch) kusursuz işlerken, diğer yandan akan veriyi (Speed) anlık yakalar."
        badge="Batch + Speed"
        color="#6366f1"
        illustration={illu}
        features={[
          { icon: <GitBranch />, title: 'Two Paths', desc: 'Gelen her veri kaşık çatallanır: Biri arşive, biri hız hattına.' },
          { icon: <Database />, title: 'Batch Layer', desc: 'Precomputed Views (Önceden hesaplanmış görünümler) oluşturur. Hata düzeltme buradadır.' },
          { icon: <Layers />, title: 'Serving Layer', desc: 'Sorgu geldiğinde Batch View ve Real-time View birleştirilir.' }
        ]}
      >
      </ArchHero>

      <div className="container" style={{ marginTop: '2rem' }}>
          
          <div className="glass-card" style={{ padding: '3rem' }}>
              <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                  <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '1rem', background: 'linear-gradient(to right, #6366f1, #22d3ee)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                      Query Serving Simulation
                  </h2>
                  <p style={{ color: '#94a3b8', maxWidth: '600px', margin: '0 auto' }}>
                      Lambda mimarisinde bir sorgu attığınızda (örneğin: "Toplam tıklanma sayısı"), sistem hem eski güvenilir veriyi hem de henüz pişmemiş yeni veriyi birleştirir.
                  </p>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 120px 1fr', gap: '20px', alignItems: 'center' }}>
                  
                  {/* Batch View Result */}
                  <motion.div 
                    animate={{ opacity: batchResult ? 1 : 0.3, scale: batchResult ? 1 : 0.95 }}
                    className="glass-card" 
                    style={{ background: 'rgba(99, 102, 241, 0.05)', border: '1px solid #6366f1', textAlign: 'center' }}
                  >
                      <div style={{ marginBottom: '10px' }}><Database size={32} color="#6366f1" /></div>
                      <h4 style={{ color: '#6366f1', marginBottom: '5px' }}>Batch View</h4>
                      <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Yesterday's Data</div>
                      {batchResult ? (
                          <div style={{ marginTop: '15px' }}>
                              <div style={{ fontSize: '1.5rem', fontWeight: 800 }}>{batchResult.count.toLocaleString()}</div>
                              <div style={{ fontSize: '0.7rem', color: '#10b981' }}>Ready ({batchResult.time})</div>
                          </div>
                      ) : (
                          <div style={{ marginTop: '15px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                              {queryStatus === 'querying' && <div className="spinner" style={{ borderColor: '#6366f1', width: '20px', height: '20px' }} />}
                          </div>
                      )}
                  </motion.div>

                   {/* Merger */}
                   <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
                       <div style={{ width: '40px', height: '40px', background: '#1e293b', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, color: 'white' }}>+</div>
                       <button 
                         onClick={runQuery}
                         disabled={queryStatus === 'querying'}
                         className="btn-bounce"
                         style={{ 
                             padding: '12px 24px', 
                             background: 'white', 
                             color: 'black', 
                             border: 'none', 
                             borderRadius: '8px', 
                             fontWeight: 800, 
                             cursor: queryStatus === 'querying' ? 'default' : 'pointer',
                             whiteSpace: 'nowrap'
                         }}
                        >
                           {queryStatus === 'querying' ? 'Merging...' : 'Run Query'}
                       </button>
                   </div>

                   {/* Speed View Result */}
                   <motion.div 
                    animate={{ opacity: speedResult ? 1 : 0.3, scale: speedResult ? 1 : 0.95 }}
                    className="glass-card" 
                    style={{ background: 'rgba(34, 211, 238, 0.05)', border: '1px solid #22d3ee', textAlign: 'center' }}
                  >
                      <div style={{ marginBottom: '10px' }}><Zap size={32} color="#22d3ee" /></div>
                      <h4 style={{ color: '#22d3ee', marginBottom: '5px' }}>Real-time View</h4>
                      <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Today's Data</div>
                       {speedResult ? (
                          <div style={{ marginTop: '15px' }}>
                              <div style={{ fontSize: '1.5rem', fontWeight: 800 }}>+{speedResult.count}</div>
                              <div style={{ fontSize: '0.7rem', color: '#10b981' }}>Fast ({speedResult.time})</div>
                          </div>
                      ) : (
                          <div style={{ marginTop: '15px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                               {queryStatus === 'querying' && <div className="spinner" style={{ borderColor: '#22d3ee', width: '20px', height: '20px' }} />}
                          </div>
                      )}
                  </motion.div>

              </div>

              {/* Final Result */}
              <AnimatePresence>
                  {queryStatus === 'complete' && (
                      <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        style={{ marginTop: '3rem', padding: '20px', background: '#020617', borderRadius: '16px', border: '1px solid #334155', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
                      >
                          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                              <CheckCircle2 color="#10b981" />
                              <div>
                                  <h4 style={{ margin: 0 }}>Query Result (Unified)</h4>
                                  <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Serving Layer Output</div>
                              </div>
                          </div>
                          
                          <div style={{ fontSize: '2.5rem', fontWeight: 900, color: 'white' }}>
                              {(18500 + 42).toLocaleString()}
                          </div>
                      </motion.div>
                  )}
              </AnimatePresence>

          </div>

          <div style={{ marginTop: '3rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                <div style={{ padding: '20px', background: 'rgba(255,255,255,0.03)', borderRadius: '16px' }}>
                    <h3 style={{ borderBottom: '1px solid #334155', paddingBottom: '10px', marginBottom: '15px' }}>Neden Lambda?</h3>
                    <ul style={{ paddingLeft: '20px', lineHeight: '1.8', color: '#cbd5e1' }}>
                        <li>Hadoop gibi sistemler veriyi "Immutable" (değişmez) saklar, bu yüzden <strong>insan hatasına karşı dayanıklıdır.</strong></li>
                        <li>Kodu değiştirip tüm veriyi baştan işleyebilirsiniz (Re-processing).</li>
                        <li>Speed layer karmaşıktır ama geçicidir; hata olsa bile Batch layer arkadan gelip düzeltir ("Eventual Consistency").</li>
                    </ul>
                </div>
                 <div style={{ padding: '20px', background: 'rgba(255,255,255,0.03)', borderRadius: '16px' }}>
                    <h3 style={{ borderBottom: '1px solid #334155', paddingBottom: '10px', marginBottom: '15px' }}>Dezavantajları</h3>
                     <ul style={{ paddingLeft: '20px', lineHeight: '1.8', color: '#cbd5e1' }}>
                        <li><strong>İki farklı kod tabanı:</strong> Biri Batch için (MapReduce/Spark), biri Speed için (Storm/Flink). Bakımı zordur.</li>
                        <li>Kod paylaşımı zordur (Gerçi Apache Spark bunu kolaylaştırdı).</li>
                        <li>Bu karmaşıklık yüzünden <strong>Kappa Architecture</strong> doğmuştur.</li>
                    </ul>
                </div>
          </div>

      </div>
    </motion.div>
  );
};

export default LambdaPage;
