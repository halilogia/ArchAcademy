import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ArchHero from '../components/ArchHero';
import { 
  Activity, 
  AlertTriangle, 
  RefreshCw, 
  HardDrive, 
  Network, 
  ShieldCheck, 
  Wifi, 
  WifiOff, 
  RotateCcw,
  Server,
  XCircle,
  CheckCircle,
  Timer
} from 'lucide-react';

const RobustnessPage = () => {
    const [activeTab, setActiveTab] = useState<'simulation' | 'concept'>('concept');
    const [circuitState, setCircuitState] = useState<'CLOSED' | 'OPEN' | 'HALF-OPEN'>('CLOSED');
    const [requestStatus, setRequestStatus] = useState<'idle' | 'success' | 'failed' | 'blocked'>('idle');
    const [failCount, setFailCount] = useState(0);
    const [logs, setLogs] = useState<string[]>([]);

    const addLog = (msg: string) => setLogs(prev => [msg, ...prev].slice(0, 5));

    const sendRequest = () => {
        if (circuitState === 'OPEN') {
            setRequestStatus('blocked');
            addLog('BLOCKED: Circuit is OPEN. Fast fail.');
            return;
        }

        // Simulate request
        const isSuccess = Math.random() > 0.6; // 40% success rate to force failures
        addLog('Sending request to Backend...');

        setTimeout(() => {
            if (isSuccess || circuitState === 'HALF-OPEN') {
                // In HALF-OPEN, if we get a success, we close the circuit
                setRequestStatus('success');
                addLog('SUCCESS: Response received.');
                if (circuitState === 'HALF-OPEN') {
                    setCircuitState('CLOSED');
                    addLog('CIRCUIT CLOSED: System recovered.');
                    setFailCount(0);
                }
            } else {
                setRequestStatus('failed');
                addLog('FAILURE: Timeout / 500 Error.');
                const newFail = failCount + 1;
                setFailCount(newFail);

                if (newFail >= 3 && circuitState === 'CLOSED') {
                     setCircuitState('OPEN');
                     addLog('CIRCUIT OPENED! Threshold reached.');
                     
                     // Auto retry to half-open after 3s
                     setTimeout(() => {
                         setCircuitState('HALF-OPEN');
                         addLog('CIRCUIT HALF-OPEN: Testing waters...');
                     }, 3000);
                }
            }
        }, 500);
    };

    const illu = (
        <div style={{ position: 'relative', width: '350px', height: '300px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            {/* The Circuit */}
            <div style={{ position: 'absolute', top: 50, left: 30, right: 30, height: '4px', background: '#334155' }} />
            
            {/* The Breaker Switch */}
            <motion.div 
               animate={{ rotate: circuitState === 'CLOSED' ? 0 : (circuitState === 'OPEN' ? -45 : -20) }}
               style={{ 
                   position: 'absolute', top: 35, left: 150, 
                   width: '60px', height: '30px', 
                   background: circuitState === 'CLOSED' ? '#22c55e' : (circuitState === 'OPEN' ? '#ef4444' : '#eab308'), 
                   borderRadius: '4px', originX: 0 
                }}
            >
               <div style={{ color: 'black', fontSize: '0.6rem', fontWeight: 'bold', padding: '5px' }}>{circuitState}</div>
            </motion.div>

            {/* Client and Server */}
            <div style={{ display: 'flex', justifyContent: 'space-between', width: '90%', marginTop: '60px' }}>
                <div style={{ textAlign: 'center' }}>
                    <div style={{ width: '80px', height: '80px', background: '#0f172a', border: '1px solid #94a3b8', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Activity color="#cbd5e1" />
                    </div>
                    <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Client</span>
                </div>

                <div style={{ textAlign: 'center' }}>
                    <div style={{ width: '80px', height: '80px', background: '#0f172a', border: '1px solid #94a3b8', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Server color={circuitState === 'CLOSED' ? '#22c55e' : '#ef4444'} />
                    </div>
                    <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Service</span>
                </div>
            </div>

            {/* Request Animation */}
            {requestStatus === 'idle' && <motion.div style={{ position: 'absolute', top: 180, fontSize: '0.8rem', color: '#64748b' }}>Ready</motion.div>}
        </div>
    );

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ paddingBottom: '100px' }}>
      <ArchHero 
        title="Robustness"
        subtitle="& Resilience"
        description="Kaos kaçınılmazdır. 'Dayanıklı Mimari', hataları önleyen değil, hatalar olduğunda sistemi çökertmeden yola devam edebilen yapıdır."
        badge="Self Healing"
        color="#f59e0b"
        illustration={illu}
        features={[
          { icon: <RotateCcw />, title: 'Circuit Breaker', desc: 'Sorunlu bir servise giden trafiği keserek, hatanın tüm sisteme yayılmasını önler.' },
          { icon: <Timer />, title: 'Retry Pattern', desc: 'Geçici ağ kesintilerinde, işlemi akıllıca tekrar dener (Exponential Backoff).' },
          { icon: <ShieldCheck />, title: 'Graceful Degradation', desc: 'Bir özellik çalışmıyorsa, kullanıcıya hata göstermek yerine alternatif sunar.' }
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
            { id: 'concept', label: 'Concept', icon: <ShieldCheck size={18} /> },
            { id: 'simulation', label: 'Circuit Breaker', icon: <Activity size={18} /> }
          ].map((tab) => (
             <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              style={{
                padding: '10px 24px',
                borderRadius: '18px',
                border: 'none',
                background: activeTab === tab.id ? '#f59e0b' : 'transparent',
                color: activeTab === tab.id ? 'black' : 'rgba(255,255,255,0.5)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontWeight: 700,
                fontSize: '0.9rem',
                transition: 'all 0.3s ease',
                boxShadow: activeTab === tab.id ? '0 4px 12px rgba(245, 158, 11, 0.3)' : 'none'
              }}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>
      </ArchHero>

      <div className="container" style={{ marginTop: '2rem' }}>
          <AnimatePresence mode="wait">
             {activeTab === 'concept' && (
                 <motion.div key="concept" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 1fr) 1fr', gap: '30px' }}>
                     <div>
                         <h3 style={{ fontSize: '2rem', color: '#f59e0b', marginBottom: '1.5rem'}}>Anti-Fragile Design</h3>
                         <p style={{ lineHeight: 1.6, color: '#c0cbed' }}>
                             Yazılımda en büyük yanılgı "Network her zaman güvenilirdir" varsayımıdır. Robust mimariler, her servisin her an çökebileceği gerçeği üzerine kurulur.
                         </p>
                         <h4 style={{ color: 'white', marginTop: '20px', marginBottom: '10px' }}>Savunma Mekanizmaları</h4>
                         <ul style={{ listStyle: 'none', padding: 0 }}>
                             <li style={{ marginBottom: '15px', display: 'flex', gap: '10px', background: 'rgba(255,255,255,0.05)', padding: '10px', borderRadius: '8px' }}>
                                 <XCircle color="#ef4444" />
                                 <div>
                                     <strong style={{ display: 'block', color: 'white' }}>Fail Fast</strong>
                                     <span style={{ fontSize: '0.85rem', color: '#94a3b8' }}>Bir servis cevap vermiyorsa, kullanıcıyı 30 saniye bekletmek yerine anında hata döndür.</span>
                                 </div>
                             </li>
                             <li style={{ marginBottom: '15px', display: 'flex', gap: '10px', background: 'rgba(255,255,255,0.05)', padding: '10px', borderRadius: '8px' }}>
                                 <RefreshCw color="#eab308" />
                                 <div>
                                     <strong style={{ display: 'block', color: 'white' }}>Retry with Backoff</strong>
                                     <span style={{ fontSize: '0.85rem', color: '#94a3b8' }}>Hata aldın mı? 1sn bekle, tekrar dene. Yine mi hata? 2sn bekle. Sonra 4sn...</span>
                                 </div>
                             </li>
                         </ul>
                     </div>

                     <div className="glass-card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #f59e0b', background: 'rgba(245, 158, 11, 0.05)' }}>
                         <div style={{ textAlign: 'center' }}>
                             <div style={{ fontSize: '4rem', fontWeight: 900, color: '#f59e0b', opacity: 0.2 }}>99.99%</div>
                             <h3 style={{ color: 'white' }}>SLA Target</h3>
                             <p style={{ color: '#cbd5e1', maxWidth: '300px', margin: '10px auto' }}>
                                 Netflix'in "Chaos Monkey"i gibi, sisteminizi bilerek bozun. Ayakta kalıyorsa, gerçek dünyada da dayanıklıdır.
                             </p>
                         </div>
                     </div>
                 </motion.div>
             )}

             {activeTab === 'simulation' && (
                  <motion.div key="simulation" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                      <div className="glass-card" style={{ padding: '2rem' }}>
                          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px', alignItems: 'center' }}>
                              
                              <div>
                                  <h3 style={{ color: '#f59e0b', marginBottom: '10px' }}>Circuit Breaker Simulator</h3>
                                  <p style={{ color: '#94a3b8', marginBottom: '20px' }}>
                                      Sigorta (Breaker) mantığı: <br/>
                                      <strong>CLOSED:</strong> Her şey yolunda, istekler geçiyor.<br/>
                                      <strong>OPEN:</strong> Çok hata oldu! Sigorta attı. İstekler engelleniyor (Fail Fast).<br/>
                                      <strong>HALF-OPEN:</strong> Bir süre sonra bir isteğe izin verip test ediyor.
                                  </p>

                                  <div style={{ display: 'flex', gap: '20px' }}>
                                      <div style={{ flex: 1, padding: '15px', background: '#1e293b', borderRadius: '12px', border: '1px solid #334155' }}>
                                          <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Fail Count (Threshold: 3)</div>
                                          <div style={{ fontSize: '2rem', fontWeight: 'bold', color: failCount >= 3 ? '#ef4444' : 'white' }}>{failCount}</div>
                                      </div>
                                      <div style={{ flex: 1, padding: '15px', background: '#1e293b', borderRadius: '12px', border: '1px solid #334155' }}>
                                          <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Circuit State</div>
                                          <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: circuitState === 'CLOSED' ? '#22c55e' : (circuitState === 'OPEN' ? '#ef4444' : '#eab308') }}>{circuitState}</div>
                                      </div>
                                  </div>
                              </div>

                              <div style={{ textAlign: 'center' }}>
                                  <button 
                                    onClick={sendRequest}
                                    className="btn-bounce"
                                    style={{ 
                                        width: '100%', 
                                        padding: '20px', 
                                        background: circuitState === 'OPEN' ? '#334155' : '#f59e0b', 
                                        color: circuitState === 'OPEN' ? '#94a3b8' : 'black', 
                                        border: 'none', 
                                        borderRadius: '16px', 
                                        fontWeight: 'bold', 
                                        fontSize: '1.2rem',
                                        cursor: 'pointer',
                                        boxShadow: '0 10px 30px rgba(0,0,0,0.3)'
                                    }}
                                  >
                                      {circuitState === 'OPEN' ? 'REQUEST BLOCKED ⛔' : 'SEND REQUEST 🚀'}
                                  </button>
                                  <div style={{ marginTop: '10px', fontSize: '0.8rem', color: '#64748b' }}>(Random %60 Failure Chance)</div>
                              </div>
                              
                          </div>

                          <div style={{ marginTop: '30px', padding: '15px', background: '#020617', borderRadius: '12px', height: '150px', overflowY: 'auto', fontFamily: 'monospace', fontSize: '0.9rem', border: '1px solid #1e293b' }}>
                              {logs.map((l, i) => (
                                  <div key={i} style={{ marginBottom: '5px', color: l.includes('SUCCESS') ? '#22c55e' : (l.includes('BLOCKED') ? '#eab308' : (l.includes('FAILURE') ? '#ef4444' : '#e2e8f0')) }}>
                                      &gt; {l}
                                  </div>
                              ))}
                          </div>
                      </div>
                  </motion.div>
             )}
          </AnimatePresence>
      </div>

    </motion.div>
  );
};

export default RobustnessPage;
