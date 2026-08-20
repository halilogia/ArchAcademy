import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Map, Share2, Layout, Cpu, Route, GitCompare, Network } from 'lucide-react';
import ArchHero from '../components/ArchHero';
import SEO from '../components/SEO';
import { useProgress } from '../context/ProgressContext';
import { MVVMCComparisonTab } from '../components/mvvmc/MVVMCComparisonTab';
import { MVVMCConceptsTab } from '../components/mvvmc/MVVMCConceptsTab';

const MVVMCPage: React.FC = () => {
  const { i18n } = useTranslation();
  const isEn = (i18n.resolvedLanguage || i18n.language || 'tr').startsWith('en');
  const { completeStep } = useProgress();
  const [activeTab, setActiveTab] = useState<'concepts' | 'comparison'>('comparison');
  const scrollToSection = (id: 'concepts' | 'comparison') => {
    setActiveTab(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };


  useEffect(() => {
    const timer = setTimeout(() => {
      completeStep('/mvvm-c');
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const heroIllustration = (
    <div style={{ position: 'relative', width: '350px', height: '350px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      {/* Coordinator (Top Hub) */}
      <motion.div
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        style={{ width: '160px', height: '80px', background: 'var(--glass)', border: '2px solid #3b82f6', borderRadius: '18px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', zIndex: 10, boxShadow: '0 10px 40px rgba(59, 130, 246, 0.25)', marginBottom: '3rem' }}
      >
        <Map size={32} color="#3b82f6" />
        <span style={{ fontSize: '0.75rem', fontWeight: 900, marginTop: '6px', color: 'white', letterSpacing: '1px' }}>COORDINATOR</span>
      </motion.div>

      {/* Connection Lines */}
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '200px', height: '100px', pointerEvents: 'none' }}>
        <svg width="100%" height="100%" viewBox="0 0 200 100" style={{ overflow: 'visible' }}>
          <path d="M 100 0 L 30 100" stroke="#3b82f6" strokeWidth="2" strokeDasharray="6,4" opacity="0.5" fill="none" />
          <path d="M 100 0 L 170 100" stroke="#3b82f6" strokeWidth="2" strokeDasharray="6,4" opacity="0.5" fill="none" />
        </svg>
      </div>

      <div style={{ display: 'flex', gap: '2rem' }}>
        {/* Module A */}
        <motion.div
          animate={{ scale: [1, 1.02, 1] }}
          transition={{ duration: 4, repeat: Infinity, delay: 0.5 }}
          style={{ width: '110px', height: '110px', background: 'var(--glass)', border: '1px solid #3b82f6', borderRadius: '18px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', opacity: 0.8 }}
        >
          <Layout size={24} color="#60a5fa" style={{ marginBottom: '8px' }} />
          <div style={{ fontSize: '0.7rem', fontWeight: 800, color: '#93c5fd' }}>VIEW</div>
          <div style={{ width: '20px', height: '2px', background: 'rgba(255,255,255,0.2)', margin: '6px 0' }} />
          <Cpu size={20} color="#60a5fa" />
          <div style={{ fontSize: '0.7rem', fontWeight: 800, color: '#93c5fd' }}>VM</div>
        </motion.div>

        {/* Module B */}
        <motion.div
          animate={{ scale: [1, 1.02, 1] }}
          transition={{ duration: 4, repeat: Infinity, delay: 1 }}
          style={{ width: '110px', height: '110px', background: 'var(--glass)', border: '1px solid #3b82f6', borderRadius: '18px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', opacity: 0.8 }}
        >
          <Layout size={24} color="#60a5fa" style={{ marginBottom: '8px' }} />
          <div style={{ fontSize: '0.7rem', fontWeight: 800, color: '#93c5fd' }}>VIEW</div>
          <div style={{ width: '20px', height: '2px', background: 'rgba(255,255,255,0.2)', margin: '6px 0' }} />
          <Cpu size={20} color="#60a5fa" />
          <div style={{ fontSize: '0.7rem', fontWeight: 800, color: '#93c5fd' }}>VM</div>
        </motion.div>
      </div>
    </div>
  );

  return (
    <>
      <SEO
        title={isEn ? "MVVM-C (Model-View-ViewModel-Coordinator) Pattern | ArchAcademy" : "MVVM-C (Coordinator Mimarisi) | ArchAcademy"}
        description={isEn 
          ? "Master the MVVM-C architecture, separating navigation routing from View and ViewModel into dedicated Coordinator classes." 
          : "MVVM-C mimarisi, navigasyon ve ekran akışlarının Coordinator sınıflarına devredilmesi, modüler yeniden kullanılabilirlik."
        }
        keywords="mvvm c, coordinator pattern, soroush khanlou, ios architecture, navigation flow, viewmodel decoupling"
        canonicalUrl="/mvvm-c"
      />
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ paddingBottom: '100px' }}>
        <ArchHero 
          title="MVVM-C"
          subtitle="Coordinator Pattern"
          description={isEn 
            ? "Resolves the greatest flaw in standard MVVM: 'Who owns navigation?'. Screen transitions and routing lifecycles are completely delegated to specialized Coordinator classes." 
            : "Klasik MVVM'in en büyük eksikliği olan 'Navigasyon kimin sorumluluğu?' sorusunu çözen, ekran geçişlerini ve akış mantığını Coordinator adı verilen özel sınıflara devreden mimari."
          }
          badge="Scalable & Navigation"
          color="#3b82f6"
          illustration={heroIllustration}
          features={[
            { 
              icon: <Route />, 
              title: isEn ? 'Coordinator' : 'Coordinator', 
              desc: isEn ? 'All navigation routing (push, pop, modal presentation) lives in dedicated coordinators.' : 'Tüm navigasyon mantığı (push, pop, modal) burada yaşar.' 
            },
            { 
              icon: <Layout />, 
              title: isEn ? 'View Freedom' : 'Özgür View (View Freedom)', 
              desc: isEn ? 'Views do not know destination targets; they simply notify their delegate when user interaction finishes.' : 'View nereye gideceğini bilmez, sadece "bitti" der.' 
            },
            { 
              icon: <Share2 />, 
              title: isEn ? 'Reusable ViewModel' : 'Saf ve Yeniden Kullanılabilir VM', 
              desc: isEn ? 'ViewModels hold zero routing baggage, keeping business logic pure, testable, and reusable anywhere.' : 'ViewModel router bağımlılığı olmadığı için saf logic kalır ve her yerde kullanılabilir.' 
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
              { id: 'comparison', label: isEn ? 'MVVM vs MVVM-C' : 'MVVM vs MVVM-C', icon: <GitCompare size={18} /> },
              { id: 'concepts', label: isEn ? 'Coordinator Logic' : 'Coordinator Mantığı', icon: <Network size={18} /> }
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
          <div id="comparison" style={{ scrollMarginTop: "100px" }}>
            <MVVMCComparisonTab />
          </div>
          <div id="concepts" style={{ scrollMarginTop: "100px" }}>
            <MVVMCConceptsTab />
          </div>
        </div>
        </div>

        {/* Architecture Origin Section */}
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
                  {isEn ? "Architecture Origin" : "Mimarinin Doğuşu"}
                </div>
                <p style={{ color: '#94a3b8', marginBottom: '2rem', fontSize: '1.1rem', lineHeight: 1.6 }}>
                  {isEn 
                    ? "Read the foundational essay that introduced the Coordinator pattern by Soroush Khanlou." 
                    : "Coordinator Pattern'ın yaratıcısı Soroush Khanlou tarafından kaleme alınan temel dökümanlara ve navigasyon mimarisine göz atın."
                  }
                </p>
                
                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap',
            position: 'sticky',
            top: '80px',
            zIndex: 30 }}>
                   <a 
                     href="https://khanlou.com/2015/01/the-coordinator/" 
                     target="_blank" 
                     rel="noopener noreferrer"
                     style={{ 
                       display: 'flex', alignItems: 'center', gap: '8px', 
                       background: 'rgba(59, 130, 246, 0.15)', color: '#93c5fd', 
                       padding: '12px 24px', borderRadius: '12px', textDecoration: 'none', fontWeight: 600,
                       border: '1px solid rgba(59, 130, 246, 0.2)', transition: 'all 0.2s'
                     }}
                   >
                      The Coordinator Pattern (Original) <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                   </a>
                </div>
             </div>
          </div>
        </section>
      </motion.div>
    </>
  );
};

export default MVVMCPage;
