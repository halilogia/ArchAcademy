import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Triangle, Activity, CheckCircle2, Search, Server, WifiOff } from 'lucide-react';
import ArchHero from '../components/ArchHero';
import SEO from '../components/SEO';
import { useProgress } from '../context/ProgressContext';
import { CAPConceptTab } from '../components/cap/CAPConceptTab';
import { CAPSimulationTab } from '../components/cap/CAPSimulationTab';

const CAPTheoremPage: React.FC = () => {
  const { i18n } = useTranslation();
  const isEn = (i18n.resolvedLanguage || i18n.language || 'tr').startsWith('en');
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
    
    setTimeout(() => {
      setNodeAData(newNodeData);
      
      if (!isPartitioned) {
        setWriteStatus('syncing');
        setTimeout(() => {
          setNodeBData(newNodeData);
          setWriteStatus('success');
        }, 1000);
      } else {
        if (activeMode === 'CP') {
          setWriteStatus('failed');
          setNodeAData(100); // Revert A
        } else {
          setWriteStatus('success');
        }
      }
    }, 800);
  };

  const heroIllustration = (
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
    <>
      <SEO
        title={isEn ? "CAP Theorem (Brewer's Theorem) | ArchAcademy" : "CAP Teoremi (Brewer Teoremi) | ArchAcademy"}
        description={isEn 
          ? "Master the CAP Theorem in distributed databases: Consistency vs Availability vs Partition Tolerance trade-offs." 
          : "Dağıtık sistemlerde CAP Teoremi, CP ve AP mimarileri ve ağ bölünmesi senaryoları rehberi."
        }
        keywords="cap theorem, brewrs theorem, consistency, availability, partition tolerance, cp vs ap, eventual consistency"
        canonicalUrl="/cap-theorem"
      />
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ paddingBottom: '100px' }}>
        <ArchHero 
          title="CAP"
          subtitle="Theorem"
          description={isEn 
            ? "In distributed databases, you can only guarantee 2 out of 3 properties: Consistency, Availability, and Partition Tolerance. Real-world networks mandate picking CP or AP." 
            : "Dağıtık bir sistemde 3 özellikten sadece 2'sini seçebilirsiniz: Consistency (Tutarlılık), Availability (Erişilebilirlik) ve Partition Tolerance (Bölünme Toleransı). Hepsine aynı anda sahip olamazsınız."
          }
          badge="Brewer's Theorem"
          color="#3b82f6"
          illustration={heroIllustration}
          features={[
            { 
              icon: <CheckCircle2 />, 
              title: "Consistency", 
              desc: isEn ? "All nodes see identical, up-to-date data simultaneously." : "Tüm node'lar aynı anda aynı veriyi görür." 
            },
            { 
              icon: <Activity />, 
              title: "Availability", 
              desc: isEn ? "Every non-failing request receives a non-error response." : "Her istek, hata almadan mutlaka bir yanıt alır." 
            },
            { 
              icon: <WifiOff />, 
              title: "Partition Tolerance", 
              desc: isEn ? "System continues operating despite arbitrary network dropped messages." : "Ağ kopsa bile sistem çalışmaya devam eder." 
            }
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
              { id: 'concept', label: isEn ? 'Theory & Concepts' : 'Teori', icon: <Triangle size={18} /> },
              { id: 'simulation', label: isEn ? 'Network Partition Sim' : 'Ağ Simülasyonu', icon: <Server size={18} /> }
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
            {activeTab === 'concept' && <CAPConceptTab key="concept" />}
            {activeTab === 'simulation' && (
              <CAPSimulationTab 
                key="simulation"
                activeMode={activeMode}
                isPartitioned={isPartitioned}
                nodeAData={nodeAData}
                nodeBData={nodeBData}
                writeStatus={writeStatus}
                onSetMode={setActiveMode}
                onTogglePartition={() => setIsPartitioned(!isPartitioned)}
                onWrite={handleWrite}
              />
            )}
          </AnimatePresence>
        </div>

        {/* Brewer's Retrospective Reference */}
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
                  {isEn ? "Brewer's Retrospective Paper" : "Brewer'ın Retrospektifi"}
                </div>
                <p style={{ color: '#94a3b8', marginBottom: '2rem', fontSize: '1.1rem', lineHeight: 1.6 }}>
                  {isEn 
                    ? "12 years after authoring the theorem, Eric Brewer published 'CAP: Twelve Years Later' detailing how modern partitions and 2-of-3 trade-offs are reconciled in the cloud." 
                    : "Eric Brewer, teoremi ortaya attıktan 12 yıl sonra 'Kurallar Nasıl Değişti' başlıklı makalesiyle modern dağıtık sistemlerde CAP'in nasıl yorumlanması gerektiğini anlattı."
                  }
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
    </>
  );
};

export default CAPTheoremPage;
