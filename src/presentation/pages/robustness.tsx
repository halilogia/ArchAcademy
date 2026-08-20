import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RotateCcw, Timer, ShieldCheck, Activity } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import ArchHero from '../components/ArchHero';
import SEO from '../components/SEO';
import { RobustnessConceptTab } from '../components/robustness/RobustnessConceptTab';
import { RobustnessCircuitBreakerSimulationTab } from '../components/robustness/RobustnessCircuitBreakerSimulationTab';

const RobustnessPage: React.FC = () => {
  const { i18n } = useTranslation();
  const isEn = (i18n.resolvedLanguage || i18n.language || 'tr').startsWith('en');
  const [activeTab, setActiveTab] = useState<'concept' | 'simulation'>('concept');
  const scrollToSection = (id: 'concept' | 'simulation') => {
    setActiveTab(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };


  const illu = (
    <div style={{ position: 'relative', width: '350px', height: '300px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ position: 'absolute', top: 50, left: 30, right: 30, height: '4px', background: '#334155' }} />
      
      {/* Breaker Switch */}
      <motion.div 
         animate={{ rotate: activeTab === 'simulation' ? -20 : 0 }}
         style={{ 
             position: 'absolute', top: 35, left: 150, 
             width: '60px', height: '30px', 
             background: activeTab === 'simulation' ? '#f59e0b' : '#22c55e', 
             borderRadius: '4px', originX: 0 
          }}
      >
         <div style={{ color: 'black', fontSize: '0.6rem', fontWeight: 'bold', padding: '5px' }}>
           {activeTab === 'simulation' ? 'SIM' : 'AUTO'}
         </div>
      </motion.div>

      {/* Client and Service nodes */}
      <div style={{ display: 'flex', justifyContent: 'space-between', width: '90%', marginTop: '60px' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ width: '80px', height: '80px', background: '#0f172a', border: '1px solid #94a3b8', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Activity color="#cbd5e1" />
          </div>
          <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Client</span>
        </div>

        <div style={{ textAlign: 'center' }}>
          <div style={{ width: '80px', height: '80px', background: '#0f172a', border: '1px solid #94a3b8', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <RotateCcw color="#22c55e" />
          </div>
          <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Cluster</span>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <SEO
        title={isEn ? "System Robustness & Circuit Breaker | ArchAcademy" : "Dayanıklı Mimari ve Circuit Breaker | ArchAcademy"}
        description={isEn 
          ? "Master distributed system resilience, Circuit Breaker patterns, Exponential Backoff retries, and Anti-Fragile design." 
          : "Dağıtık sistem dayanıklılığı, Circuit Breaker sigorta kalıbı, Retry ve Anti-Fragile mimari rehberi."
        }
        keywords="robustness, circuit breaker, resilience, retry backoff, chaos monkey, fault tolerance"
        canonicalUrl="/robustness"
      />
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ paddingBottom: '100px', background: 'var(--bg-dark)', minHeight: '100vh' }}>
        <ArchHero 
          title={isEn ? "Robustness" : "Dayanıklılık"}
          subtitle={isEn ? "& Resilience" : "ve Hata Toleransı"}
          description={isEn 
            ? "Chaos is inevitable. Resilient architecture does not merely attempt to prevent errors, but ensures continuous uninterrupted operation even under cascading downstream failures." 
            : "Kaos kaçınılmazdır. 'Dayanıklı Mimari', hataları önleyen değil, hatalar olduğunda sistemi çökertmeden yola devam edebilen yapıdır."
          }
          badge="Self Healing"
          color="#f59e0b"
          illustration={illu}
          features={[
            { icon: <RotateCcw />, title: 'Circuit Breaker', desc: isEn ? 'Trips traffic to unhealthy downstreams, halting cascading failures.' : 'Sorunlu bir servise giden trafiği keserek, hatanın tüm sisteme yayılmasını önler.' },
            { icon: <Timer />, title: 'Retry Pattern', desc: isEn ? 'Smart retry with Exponential Backoff for transient network errors.' : 'Geçici ağ kesintilerinde, işlemi akıllıca tekrar dener (Exponential Backoff).' },
            { icon: <ShieldCheck />, title: 'Graceful Degradation', desc: isEn ? 'Serves fallback cache instead of rendering broken UI pages.' : 'Bir özellik çalışmıyorsa, kullanıcıya hata göstermek yerine alternatif sunar.' }
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
            backdropFilter: 'blur(10px)',
            flexWrap: 'wrap',
            position: 'sticky',
            top: '80px',
            zIndex: 30
          }}>
            {[
              { id: 'concept', label: isEn ? 'Concept' : 'Mimari Teori', icon: <ShieldCheck size={18} /> },
              { id: 'simulation', label: isEn ? 'Circuit Breaker' : 'Sigorta Simülasyonu', icon: <Activity size={18} /> }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => scrollToSection(tab.id as any)}
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
          <div style={{ display: "flex", flexDirection: "column", gap: "4rem" }}>
          <div id="concept" style={{ scrollMarginTop: "100px" }}>
            <RobustnessConceptTab />
          </div>
          <div id="simulation" style={{ scrollMarginTop: "100px" }}>
            <RobustnessCircuitBreakerSimulationTab />
          </div>
        </div>
        </div>
      </motion.div>
    </>
  );
};

export default RobustnessPage;
