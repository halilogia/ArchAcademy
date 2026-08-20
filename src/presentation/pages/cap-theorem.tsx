import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Triangle, Activity, CheckCircle2, Search, Server, WifiOff } from 'lucide-react';
import ArchHero from '../components/ArchHero';
import SEO from '../components/SEO';
import { useProgress } from '../context/ProgressContext';
import { CAPConceptTab } from '../components/cap/CAPConceptTab';
import { CAPSimulationTab } from '../components/cap/CAPSimulationTab';
import { useCapSimulation } from '../components/cap/useCapSimulation';

const CAPTheoremPage: React.FC = () => {
  const { i18n } = useTranslation();
  const isEn = (i18n.resolvedLanguage || i18n.language || 'tr').startsWith('en');
  const { completeStep } = useProgress();
  const [activeTab, setActiveTab] = useState<'simulation' | 'concept'>('concept');
  const scrollToSection = (id: 'simulation' | 'concept') => {
    setActiveTab(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  
  const simulation = useCapSimulation();

  useEffect(() => {
    const timer = setTimeout(() => {
      completeStep('/cap-theorem');
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

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
        title={isEn ? "CAP Theorem in Distributed Systems | ArchAcademy" : "Dağıtık Sistemlerde CAP Teoremi | ArchAcademy"}
        description={isEn 
          ? "Deep dive into the CAP Theorem: Consistency, Availability, Partition Tolerance trade-offs." 
          : "Dağıtık sistemlerin temel kanunu CAP Teoremi: Tutarlılık, Erişilebilirlik ve Bölünme Toleransı dengesi."
        }
        keywords="cap theorem, distributed systems, consistency, availability, partition tolerance, cp vs ap"
        canonicalUrl="/cap-theorem"
      />
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ background: 'var(--bg-dark)', minHeight: '100vh' }}>
        <ArchHero 
          title="CAP Theorem"
          subtitle={isEn ? "Trade-off Engine" : "Dağıtık Sistem Dengesi"}
          description={isEn 
            ? "The fundamental theorem of distributed data: In the presence of a network partition, you must choose either Consistency or Availability." 
            : "Dağıtık mimarilerin en temel kuralı: Bir ağ kopması (Network Partition) anında ya Tutarlılığı (CP) ya da Erişilebilirliği (AP) seçmek zorundasınız. Üçü aynı anda imkansızdır."
          }
          badge="Distributed Systems"
          color="#3b82f6"
          illustration={heroIllustration}
          features={[
            { icon: <CheckCircle2 />, title: 'Consistency', desc: isEn ? 'Every node serves identical, latest data simultaneously.' : 'Tüm düğümler aynı anda en güncel veriyi görür. Veri asla sapmaz.' },
            { icon: <Activity />, title: 'Availability', desc: isEn ? 'Every client request receives a non-error response without guarantee of latest data.' : 'Sistem her zaman yanıt verir. Bazı düğümler eski veri dönse bile yanıt kesilmez.' },
            { icon: <Server />, title: 'Partition Tolerance', desc: isEn ? 'System continues functioning despite arbitrary physical network packet drops.' : 'Ağ kopsa bile sistem çalışmaya devam eder (Dağıtık sistemlerin zorunlu gerçeği).' }
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
              { id: 'concept', label: isEn ? 'Matrix & Real-world' : 'Kavram & Matris', icon: <Triangle size={18} /> },
              { id: 'simulation', label: isEn ? 'Partition Simulator' : 'Ağ Kopması Simülasyonu', icon: <Activity size={18} /> }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => scrollToSection(tab.id as any)}
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
          <div style={{ display: "flex", flexDirection: "column", gap: "4rem" }}>
          <div id="concept" style={{ scrollMarginTop: "100px" }}>
            <CAPConceptTab />
          </div>
        </div>
        </div>
      </motion.div>
    </>
  );
};

export default CAPTheoremPage;
