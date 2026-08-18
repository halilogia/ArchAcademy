import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Database, ShieldCheck, Zap, Lock, HardDrive, RefreshCcw, CheckCircle } from 'lucide-react';
import ArchHero from '../components/ArchHero';
import SEO from '../components/SEO';
import { useProgress } from '../context/ProgressContext';
import { ACIDConceptTab } from '../components/acid/ACIDConceptTab';
import { ACIDSimulationTab } from '../components/acid/ACIDSimulationTab';

const ACIDPage: React.FC = () => {
  const { i18n } = useTranslation();
  const isEn = (i18n.resolvedLanguage || i18n.language || 'tr').startsWith('en');
  const { completeStep } = useProgress();
  const [activeTab, setActiveTab] = useState<'simulation' | 'concept'>('concept');
  
  // Simulation State: Bank Transfer
  const [accountA, setAccountA] = useState(1000);
  const [accountB, setAccountB] = useState(1000);
  const [step, setStep] = useState(0);
  const [errorMode, setErrorMode] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      completeStep('/acid');
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const addLog = (msg: string) => setLogs(prev => [...prev, msg]);

  const runTransaction = () => {
    if (step !== 0) return;
    setLogs([]);
    addLog("BEGIN TRANSACTION");
    
    // Step 1: Debit A
    setStep(1);
    setTimeout(() => {
      setAccountA(prev => prev - 100);
      addLog("UPDATE Accounts SET balance -= 100 WHERE id='A'");
      
      // Step 2: Simulate Failure Point
      setTimeout(() => {
        if (errorMode) {
          addLog("ERROR: Power Cut / Constraint Violation! (Simulated)");
          addLog("ROLLBACK initiated...");
          setTimeout(() => {
            setAccountA(prev => prev + 100); // Rollback
            addLog("Changes reverted. Account A restored.");
            setStep(0);
          }, 1500);
        } else {
          setStep(3);
          setTimeout(() => {
            setAccountB(prev => prev + 100);
            addLog("UPDATE Accounts SET balance += 100 WHERE id='B'");
            
            setStep(4);
            setTimeout(() => {
              addLog("COMMIT (Data safely flushed to disk WAL)");
              setStep(0);
            }, 1000);
          }, 1000);
        }
      }, 1000);
    }, 1000);
  };

  const heroIllustration = (
    <div style={{ position: 'relative', width: '350px', height: '350px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {/* Safe Box Metaphor */}
      <motion.div 
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 4, repeat: Infinity }}
        style={{ width: '220px', height: '260px', borderRadius: '30px', background: '#020617', border: '4px solid #facc15', position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 50px rgba(250, 204, 21, 0.2)' }}
      >
        <div style={{ width: '180px', height: '140px', border: '1px solid rgba(250, 204, 21, 0.3)', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px', overflow: 'hidden' }}>
          <motion.div
            key={step}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ textAlign: 'center' }}
          >
            {step === 0 && <span style={{fontSize: '3rem', fontWeight: 900, color: 'white'}}>SAFE</span>}
            {step === 1 && <span style={{fontSize: '1.5rem', fontWeight: 900, color: '#f87171'}}>- $100</span>}
            {step === 3 && <span style={{fontSize: '1.5rem', fontWeight: 900, color: '#4ade80'}}>+ $100</span>}
            {step === 4 && <CheckCircle size={50} color="#facc15" />}
          </motion.div>
        </div>
        
        <div style={{ display: 'flex', gap: '15px' }}>
          <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: '#facc15', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Database size={20} color="black" />
          </div>
          <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Lock size={20} color="white" />
          </div>
        </div>
      </motion.div>
      
      {/* Floating Badges */}
      <motion.div animate={{ rotate: -15, y: [0, -10, 0] }} transition={{ duration: 3, repeat: Infinity }} style={{ position: 'absolute', top: 20, right: 0, background: '#facc15', padding: '5px 15px', borderRadius: '20px', color: 'black', fontWeight: 'bold', fontSize: '0.8rem' }}>Atomic</motion.div>
      <motion.div animate={{ rotate: 15, y: [0, 10, 0] }} transition={{ duration: 3, repeat: Infinity, delay: 1 }} style={{ position: 'absolute', bottom: 40, left: 10, background: '#facc15', padding: '5px 15px', borderRadius: '20px', color: 'black', fontWeight: 'bold', fontSize: '0.8rem' }}>Durable</motion.div>
    </div>
  );

  return (
    <>
      <SEO
        title={isEn ? "ACID Database Transaction Principles | ArchAcademy" : "ACID Veritabanı İşlem Prensipleri | ArchAcademy"}
        description={isEn 
          ? "Master ACID transaction guarantees: Atomicity, Consistency, Isolation, and Durability in relational databases." 
          : "İlişkisel veritabanlarında ACID işlem garantileri, Atomicity, Tutarlılık, İzolasyon ve Kalıcılık rehberi."
        }
        keywords="acid principles, database transactions, atomicity, consistency, isolation, durability, rollback commit"
        canonicalUrl="/acid"
      />
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ paddingBottom: '100px' }}>
        <ArchHero 
          title="ACID"
          subtitle="Principles"
          description={isEn 
            ? "Database reliability cannot be left to chance. The four foundational transaction guarantees ensuring data integrity and preventing phantom loss even across hardware failures." 
            : "Veritabanında her şeyin yolunda gitmesi şansa bırakılamaz. Para transferi yaparken elektrik kesilse bile paranızın buharlaşmamasını sağlayan kurallar bütünü."
          }
          badge="Data Safety"
          color="#facc15"
          illustration={heroIllustration}
          features={[
            { 
              icon: <Zap />, 
              title: "Atomicity", 
              desc: isEn ? "All or nothing. If any nested step fails, the entire transaction is reverted." : "Ya hep ya hiç. İşlemin yarısı yapılıp yarısı kalmaz." 
            },
            { 
              icon: <ShieldCheck />, 
              title: "Consistency", 
              desc: isEn ? "Database rules, foreign keys, and integrity constraints remain preserved." : "Veri her zaman veritabanı kurallarına (constraint) uyumlu kalır." 
            },
            { 
              icon: <Lock />, 
              title: "Isolation", 
              desc: isEn ? "Concurrent transactions cannot cross-contaminate or read uncommitted dirty data." : "Siz işlem yaparken başkası o veriyi göremez/bozamaz." 
            },
            { 
              icon: <HardDrive />, 
              title: "Durability", 
              desc: isEn ? "Committed writes survive unexpected power cuts or disk crashes." : "Commit edildiyse, fiş çekilse bile o veri oradadır." 
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
              { id: 'concept', label: isEn ? 'Definitions & Rules' : 'Tanımlar', icon: <Database size={18} /> },
              { id: 'simulation', label: isEn ? 'Live Bank Transfer Sim' : 'Banka Transfer Simülasyonu', icon: <RefreshCcw size={18} /> }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                style={{
                  padding: '10px 24px',
                  borderRadius: '18px',
                  border: 'none',
                  background: activeTab === tab.id ? '#facc15' : 'transparent',
                  color: activeTab === tab.id ? 'black' : 'rgba(255,255,255,0.5)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontWeight: 700,
                  fontSize: '0.9rem',
                  transition: 'all 0.3s ease',
                  boxShadow: activeTab === tab.id ? '0 4px 12px rgba(250, 204, 21, 0.3)' : 'none'
                }}
              >
                {tab.icon} {tab.label}
              </button>
            ))}
          </div>
        </ArchHero>

        <div className="container" style={{ marginTop: '2rem' }}>
          <AnimatePresence mode="wait">
            {activeTab === 'concept' && <ACIDConceptTab key="concept" />}
            {activeTab === 'simulation' && (
              <ACIDSimulationTab 
                key="simulation"
                accountA={accountA}
                accountB={accountB}
                step={step}
                errorMode={errorMode}
                logs={logs}
                onErrorModeChange={setErrorMode}
                onRunTransaction={runTransaction}
              />
            )}
          </AnimatePresence>
        </div>

        {/* Theory of Reliability Reference */}
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
                  {isEn ? "Theory of Database Reliability" : "Güvenilirlik Teorisi"}
                </div>
                <p style={{ color: '#94a3b8', marginBottom: '2rem', fontSize: '1.1rem', lineHeight: 1.6 }}>
                  {isEn 
                    ? "ACID principles were pioneered in Jim Gray's landmark 1970s transaction research and formalized by Andreas Reuter in 1983." 
                    : "ACID prensipleri, modern veritabanı sistemlerinin temel taşıdır. Jim Gray'in 1970'lerdeki öncü çalışmaları ve daha sonra Andreas Reuter tarafından popülerleştirilen bu kavramlar hakkında daha fazla bilgi edinin."
                  }
                </p>
                
                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                   <a 
                     href="https://en.wikipedia.org/wiki/ACID" 
                     target="_blank" 
                     rel="noopener noreferrer"
                     style={{ 
                       display: 'flex', alignItems: 'center', gap: '8px', 
                       background: 'rgba(250, 204, 21, 0.15)', color: '#facc15', 
                       padding: '12px 24px', borderRadius: '12px', textDecoration: 'none', fontWeight: 600,
                       border: '1px solid rgba(250, 204, 21, 0.2)', transition: 'all 0.2s'
                     }}
                   >
                      ACID Principles Overview <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                   </a>
                </div>
             </div>
          </div>
        </section>
      </motion.div>
    </>
  );
};

export default ACIDPage;
