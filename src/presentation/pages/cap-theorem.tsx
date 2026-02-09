import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ArchHero from '../components/ArchHero';
import { useProgress } from '../context/ProgressContext';
import { 
  Triangle, 
  Activity, 
  CheckCircle2, 
  Search, 
  Server, 
  Scissors, 
  Wifi, 
  WifiOff,
  Database,
  Ban,
  AlertTriangle
} from 'lucide-react';

const CAPTheoremPage = () => {
  const { completeStep } = useProgress();
  const [activeTab, setActiveTab] = useState<'simulation' | 'concept'>('concept');
  const [activeMode, setActiveMode] = useState<'CP' | 'AP'>('CP');
  const [isPartitioned, setIsPartitioned] = useState(false);
  
  // Data State
  const [nodeAData, setNodeAData] = useState(100);
  const [nodeBData, setNodeBData] = useState(100);
  const [writeStatus, setWriteStatus] = useState<'idle' | 'writing' | 'syncing' | 'failed' | 'success'>('idle');

  useEffect(() => {
    const timer = setTimeout(() => {
      completeStep('/cap-theorem');
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleWrite = (newNodeData: number) => {
      setWriteStatus('writing');
      
      // Always write to A (Master/Primary in this simplified view)
      setTimeout(() => {
          setNodeAData(newNodeData);
          
          if (!isPartitioned) {
              setWriteStatus('syncing');
              setTimeout(() => {
                  setNodeBData(newNodeData);
                  setWriteStatus('success');
              }, 1000);
          } else {
              // PARTITIONED SCENARIO
              if (activeMode === 'CP') {
                  // CP: If we can't sync, we might fail the whole write OR fail the read on B.
                  // For this demo: We'll say Node B goes DOWN/ReadOnly to preserve consistency.
                  // Or we fail the write if it requires quorum.
                  // Let's implement Quorum write failure for CP.
                  setWriteStatus('failed'); // We assume we need ack from B
                  setNodeAData(100); // Revert A
              } else {
                  // AP: Write succeeds on A, but B is stale.
                  setWriteStatus('success');
              }
          }
      }, 800);
  };

  const illu = (
    <div style={{ position: 'relative', width: '350px', height: '350px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
       {/* Triangle Path */}
       <svg width="300" height="300" viewBox="0 0 300 300" style={{ position: 'absolute', top: 0, left: 25 }}>
           <motion.path 
             d="M150 50 L250 220 L50 220 Z" 
             fill="none" 
             stroke="#3b82f6" 
             strokeWidth="2"
             strokeDasharray="10 10"
             animate={{ strokeDashoffset: [0, 100] }}
             transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
           />
       </svg>

       {/* Vertices */}
       <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 2, repeat: Infinity }} style={{ position: 'absolute', top: 20, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
           <div style={{ width: '60px', height: '60px', background: '#020617', border: '2px solid #3b82f6', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 20px rgba(59, 130, 246, 0.4)' }}>
               <CheckCircle2 color="#3b82f6" />
           </div>
           <span style={{ marginTop: '5px', fontSize: '0.8rem', fontWeight: 'bold', color: '#fff' }}>Consistency</span>
       </motion.div>

       <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 2, repeat: Infinity, delay: 0.6 }} style={{ position: 'absolute', bottom: 40, right: 0, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
           <div style={{ width: '60px', height: '60px', background: '#020617', border: '2px solid #3b82f6', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 20px rgba(59, 130, 246, 0.4)' }}>
               <Activity color="#3b82f6" />
           </div>
           <span style={{ marginTop: '5px', fontSize: '0.8rem', fontWeight: 'bold', color: '#fff' }}>Availability</span>
       </motion.div>

       <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 2, repeat: Infinity, delay: 1.2 }} style={{ position: 'absolute', bottom: 40, left: 0, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
           <div style={{ width: '60px', height: '60px', background: '#020617', border: '2px solid #3b82f6', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 20px rgba(59, 130, 246, 0.4)' }}>
               <Search color="#3b82f6" />
           </div>
           <span style={{ marginTop: '5px', fontSize: '0.8rem', fontWeight: 'bold', color: '#fff' }}>Partition Tol.</span>
       </motion.div>

        {/* Selected Mode Indicator */}
        <div style={{ position: 'absolute', top: '55%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center' }}>
            <div style={{ fontSize: '3rem', fontWeight: 900, color: 'rgba(255,255,255,0.1)' }}>CAP</div>
        </div>

    </div>
  );

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ paddingBottom: '100px' }}>
      <ArchHero 
        title="CAP"
        subtitle="Theorem"
        description="Dağıtık bir sistemde 3 özellikten sadece 2'sini seçebilirsiniz: Consistency (Tutarlılık), Availability (Erişilebilirlik) ve Partition Tolerance (Bölünme Toleransı). Hepsine aynı anda sahip olamazsınız."
        badge="Brewer's Theorem"
        color="#3b82f6"
        illustration={illu}
        features={[
          { icon: <CheckCircle2 />, title: "Consistency", desc: "Tüm node'lar aynı anda aynı veriyi görür." },
          { icon: <Activity />, title: "Availability", desc: "Her istek, hata almadan mutlaka bir yanıt alır." },
          { icon: <WifiOff />, title: "Partition Tolerance", desc: "Ağ kopsa bile sistem çalışmaya devam eder." }
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
            { id: 'concept', label: 'Theory', icon: <Triangle size={18} /> },
            { id: 'simulation', label: 'Network Sim', icon: <Server size={18} /> }
          ].map((tab) => (
             <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              style={{
                padding: '10px 24px',
                borderRadius: '18px',
                border: 'none',
                background: activeTab === tab.id ? '#3b82f6' : 'transparent',
                color: activeTab === tab.id ? 'white' : 'rgba(255,255,255,0.5)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontWeight: 700,
                fontSize: '0.9rem',
                transition: 'all 0.3s ease',
                boxShadow: activeTab === tab.id ? '0 4px 12px rgba(59, 130, 246, 0.3)' : 'none'
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
                 <motion.div key="concept" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
                     <div>
                         <h3 style={{ fontSize: '2rem', color: '#3b82f6', marginBottom: '1.5rem'}}>3'ünden 2'si Kuralı</h3>
                         <p style={{ lineHeight: 1.6, color: '#c0cbed'}}>
                             Modern dağıtık sistemlerde "Partition Tolerance" (Ağ kopması durumu) kaçınılmazdır. Kablolar kopar, router'lar bozulur. Bu yüzden seçim aslında <strong>CP</strong> ve <strong>AP</strong> arasındadır.
                         </p>
                         <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
                             <div className="glass-card" style={{ borderLeft: '4px solid #3b82f6', padding: '15px' }}>
                                 <strong style={{ color: '#fff', fontSize: '1.1rem' }}>CP (Consistency + Partition Tolerance)</strong>
                                 <p style={{ fontSize: '0.9rem', color: '#94a3b8', margin: '5px 0' }}>
                                     Ağ koparsa, tutarsız veri vermemek için <strong>hizmet vermeyi durdurur</strong> veya hatayı kabul eder. <br/>
                                     <em style={{color: '#60a5fa'}}>Örn: Bankacılık işlemleri (Bakiye tutarsız olamaz).</em>
                                 </p>
                             </div>
                             <div className="glass-card" style={{ borderLeft: '4px solid #eab308', padding: '15px' }}>
                                 <strong style={{ color: '#fff', fontSize: '1.1rem' }}>AP (Availability + Partition Tolerance)</strong>
                                 <p style={{ fontSize: '0.9rem', color: '#94a3b8', margin: '5px 0' }}>
                                     Ağ koparsa, veri eski (stale) olsa bile <strong>cevap vermeye devam eder</strong>. Düzeldikten sonra eşitlenir (Eventual Consistency). <br/>
                                     <em style={{color: '#facc15'}}>Örn: Sosyal Medya (Bir beğeni 5sn geç gelse de olur).</em>
                                 </p>
                             </div>
                         </div>
                     </div>
                     <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                         <div style={{ width: '100%', padding: '30px', background: 'rgba(59, 130, 246, 0.1)', borderRadius: '24px', border: '1px solid #3b82f6', position: 'relative' }}>
                             <div style={{ textAlign: 'center', marginBottom: '20px', color: '#fff', fontWeight: 'bold' }}>Gerçek Dünya Senaryosu</div>
                             <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', color: '#cbd5e1' }}>
                                 <span>ATM A (İstanbul)</span>
                                 <span>ATM B (Ankara)</span>
                             </div>
                             <div style={{ margin: '15px 0', height: '4px', background: '#334155', borderRadius: '2px', position: 'relative' }}>
                                 <div style={{ position: 'absolute', top: '-10px', left: '50%', transform: 'translateX(-50%)', background: '#020617', padding: '0 10px', color: '#eab308', fontSize: '0.8rem' }}>Network Link</div>
                             </div>
                             <div style={{ fontSize: '0.9rem', color: '#94a3b8', textAlign: 'center', fontStyle: 'italic' }}>
                                 "Eğer link koparsa, İstanbul'daki ATM para çekmeye izin verecek mi? (Ankara'daki bakiyeyi bilmiyor)"
                             </div>
                         </div>
                     </div>
                 </motion.div>
             )}

             {activeTab === 'simulation' && (
                 <motion.div key="simulation" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                     <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'center', gap: '20px' }}>
                         <button 
                            onClick={() => setActiveMode('CP')}
                            style={{ padding: '10px 20px', borderRadius: '12px', border: `2px solid ${activeMode === 'CP' ? '#3b82f6' : '#334155'}`, background: activeMode === 'CP' ? 'rgba(59, 130, 246, 0.2)' : 'transparent', color: 'white', cursor: 'pointer', fontWeight: 'bold' }}
                        >
                             Mode: CP (Consistency First)
                         </button>
                         <button 
                            onClick={() => setActiveMode('AP')}
                            style={{ padding: '10px 20px', borderRadius: '12px', border: `2px solid ${activeMode === 'AP' ? '#eab308' : '#334155'}`, background: activeMode === 'AP' ? 'rgba(234, 179, 8, 0.2)' : 'transparent', color: 'white', cursor: 'pointer', fontWeight: 'bold' }}
                        >
                             Mode: AP (Availability First)
                         </button>
                     </div>

                     <div className="glass-card" style={{ padding: '3rem', position: 'relative' }}>
                         {/* Network Link */}
                         <div style={{ position: 'absolute', top: '50%', left: '20%', right: '20%', height: '4px', background: isPartitioned ? '#ef4444' : '#10b981', transform: 'translateY(-50%)', transition: 'background 0.3s' }} />
                         
                         {/* Cut Button */}
                         <div 
                            onClick={() => setIsPartitioned(!isPartitioned)}
                            style={{ 
                                position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', 
                                width: '50px', height: '50px', borderRadius: '50%', background: '#0f172a', border: `2px solid ${isPartitioned ? '#ef4444' : '#10b981'}`,
                                display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', zIndex: 10
                            }}
                         >
                             {isPartitioned ? <Scissors color="#ef4444" /> : <Wifi color="#10b981" />}
                         </div>

                         <div style={{ display: 'flex', justifyContent: 'space-between', position: 'relative', zIndex: 1 }}>
                             {/* Node A */}
                             <div style={{ width: '180px', padding: '20px', background: '#1e293b', borderRadius: '16px', border: '2px solid #3b82f6', textAlign: 'center' }}>
                                 <Server size={32} color="#3b82f6" style={{ marginBottom: '10px' }} />
                                 <h4 style={{ color: 'white' }}>Node A</h4>
                                 <div style={{ fontSize: '2rem', fontWeight: 900, color: 'white', margin: '10px 0' }}>{nodeAData}</div>
                                 <button 
                                    onClick={() => handleWrite(nodeAData + 1)}
                                    disabled={writeStatus === 'writing' || writeStatus === 'syncing'}
                                    className="btn-bounce"
                                    style={{ width: '100%', padding: '8px', background: '#3b82f6', border: 'none', borderRadius: '8px', color: 'white', fontWeight: 'bold', cursor: 'pointer' }}
                                 >
                                     Write (+1)
                                 </button>
                                 {writeStatus === 'failed' && <div style={{ color: '#ef4444', fontSize: '0.8rem', marginTop: '5px', fontWeight: 'bold' }}>WRITE FAILED!</div>}
                             </div>

                             {/* Node B */}
                             <div style={{ width: '180px', padding: '20px', background: '#1e293b', borderRadius: '16px', border: `2px solid ${isPartitioned && activeMode === 'CP' ? '#ef4444' : '#3b82f6'}`, textAlign: 'center', opacity: isPartitioned && activeMode === 'CP' ? 0.6 : 1 }}>
                                 <div style={{ position: 'relative', display: 'inline-block' }}>
                                     <Server size={32} color={isPartitioned && activeMode === 'CP' ? '#ef4444' : "#3b82f6"} style={{ marginBottom: '10px' }} />
                                     {isPartitioned && activeMode === 'CP' && <Ban size={20} color="#ef4444" style={{ position: 'absolute', bottom: -5, right: -5 }} />}
                                 </div>
                                 <h4 style={{ color: 'white' }}>Node B</h4>
                                 <div style={{ fontSize: '2rem', fontWeight: 900, color: isPartitioned && nodeAData !== nodeBData ? '#eab308' : 'white', margin: '10px 0' }}>{nodeBData}</div>
                                 <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
                                     {isPartitioned && activeMode === 'CP' ? 'Unavailable (CP)' : (nodeAData !== nodeBData ? 'Stale Data (AP)' : 'Synced')}
                                 </div>
                             </div>
                         </div>
                     </div>

                     <div style={{ marginTop: '20px', textAlign: 'center', color: '#cbd5e1', fontStyle: 'italic' }}>
                         {isPartitioned 
                            ? (activeMode === 'CP' 
                                ? "NETWORK PARTITION! CP Mode seçili. Node A, Node B'den onay alamadığı için yazma işlemini REDDEDİYOR. (Consistency > Availability)" 
                                : "NETWORK PARTITION! AP Mode seçili. Node A yazmayı kabul etti. Node B eski veride (Stale) kaldı ama sistem ayakta. (Availability > Consistency)")
                            : "Ağ sağlıklı. Node A ve Node B senkronize çalışıyor."}
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
                Brewer's Retrospective
              </div>
              <p style={{ color: '#94a3b8', marginBottom: '2rem', fontSize: '1.1rem', lineHeight: 1.6 }}>
                Eric Brewer, teoremi ortaya attıktan 12 yıl sonra "Kurallar Nasıl Değişti" başlıklı makalesiyle modern dağıtık sistemlerde CAP'in nasıl yorumlanması gerektiğini anlattı.
              </p>
              
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                 <a 
                   href="https://www.infoq.com/articles/cap-twelve-years-later-how-the-rules-have-changed/" 
                   target="_blank" 
                   rel="noopener noreferrer"
                   style={{ 
                     display: 'flex', alignItems: 'center', gap: '8px', 
                     background: 'rgba(59, 130, 246, 0.15)', color: '#60a5fa', 
                     padding: '12px 24px', borderRadius: '12px', textDecoration: 'none', fontWeight: 600,
                     border: '1px solid rgba(59, 130, 246, 0.2)', transition: 'all 0.2s'
                   }}
                 >
                    CAP: Twelve Years Later (Eric Brewer) <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                 </a>
              </div>
           </div>
        </div>
      </section>
    </motion.div>
  );
};

export default CAPTheoremPage;
