import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Layout, UserCheck, Activity, GitCompare, Box } from 'lucide-react';
import ArchHero from '../components/ArchHero';
import SEO from '../components/SEO';
import { MVPComparisonTab } from '../components/mvp/MVPComparisonTab';
import { MVPConceptsTab } from '../components/mvp/MVPConceptsTab';

const MVPPage: React.FC = () => {
  const { i18n } = useTranslation();
  const isEn = (i18n.resolvedLanguage || i18n.language || 'tr').startsWith('en');
  const [activeTab, setActiveTab] = useState<'concepts' | 'comparison'>('comparison');
  const scrollToSection = (id: 'concepts' | 'comparison') => {
    setActiveTab(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };


  const heroIllustration = (
    <div style={{ position: 'relative', width: '350px', height: '350px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between' }}>
      {/* View (Passive) */}
      <motion.div
        animate={{ opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 4, repeat: Infinity }}
        style={{ width: '120px', height: '75px', background: 'var(--glass)', border: '1px solid #34d399', borderRadius: '15px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', opacity: 0.8 }}
      >
        <Layout size={24} color="#34d399" />
        <span style={{ fontSize: '0.65rem', fontWeight: 800, marginTop: '4px', color: 'white' }}>PASSIVE VIEW</span>
      </motion.div>

      {/* Dynamic Connector */}
      <div style={{ height: '40px', width: '2px', background: 'rgba(52, 211, 153, 0.2)', position: 'relative' }}>
        <motion.div 
          animate={{ top: ['0%', '100%'], opacity: [0, 1, 0] }}
          transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
          style={{ position: 'absolute', width: '6px', height: '6px', background: '#34d399', borderRadius: '50%', left: '-2px' }}
        />
        <motion.div 
          animate={{ top: ['100%', '0%'], opacity: [0, 1, 0] }}
          transition={{ duration: 1.2, repeat: Infinity, ease: "linear", delay: 0.6 }}
          style={{ position: 'absolute', width: '6px', height: '6px', background: '#34d399', borderRadius: '50%', left: '-2px' }}
        />
      </div>

      {/* Presenter (Hub) */}
      <motion.div
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 3, repeat: Infinity }}
        style={{ width: '150px', height: '100px', background: 'var(--glass)', border: '3px solid #34d399', borderRadius: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', zIndex: 10, boxShadow: '0 0 40px rgba(52, 211, 153, 0.3)' }}
      >
        <UserCheck size={32} color="#34d399" />
        <span style={{ fontSize: '0.8rem', fontWeight: 950, marginTop: '6px', color: 'white' }}>PRESENTER</span>
      </motion.div>

      {/* Dynamic Connector */}
      <div style={{ height: '40px', width: '2px', background: 'rgba(52, 211, 153, 0.2)', position: 'relative' }}>
        <motion.div 
          animate={{ top: ['0%', '100%'], opacity: [0, 1, 0] }}
          transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
          style={{ position: 'absolute', width: '6px', height: '6px', background: '#34d399', borderRadius: '50%', left: '-2px' }}
        />
        <motion.div 
          animate={{ top: ['100%', '0%'], opacity: [0, 1, 0] }}
          transition={{ duration: 1.2, repeat: Infinity, ease: "linear", delay: 0.6 }}
          style={{ position: 'absolute', width: '6px', height: '6px', background: '#34d399', borderRadius: '50%', left: '-2px' }}
        />
      </div>

      {/* Model */}
      <div style={{ width: '120px', height: '75px', background: 'var(--glass)', border: '1px solid #34d399', borderRadius: '15px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <Activity size={24} color="#34d399" />
        <span style={{ fontSize: '0.65rem', fontWeight: 800, marginTop: '4px', color: 'white' }}>MODEL</span>
      </div>
    </div>
  );

  return (
    <>
      <SEO
        title={isEn ? "Model-View-Presenter (MVP) Pattern | ArchAcademy" : "Model-View-Presenter (MVP) Deseni | ArchAcademy"}
        description={isEn 
          ? "Master the Model-View-Presenter (MVP) architecture pattern, Passive View, Humble Object, and testing advantages." 
          : "Model-View-Presenter (MVP) mimarisi, Pasif Görünüm (Passive View), Presenter yönetimi ve test edilebilirlik rehberi."
        }
        keywords="mvp architecture, model view presenter, passive view, humble object, martin fowler mvp, mvp vs mvvm"
        canonicalUrl="/mvp"
      />
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ paddingBottom: '100px' }}>
        <ArchHero 
          title="MVP"
          subtitle="Strict Separation"
          description={isEn 
            ? "Channels all communication between View and Model strictly through the Presenter, turning UI components into entirely Passive (Humble) Views to maximize unit testability." 
            : "View ve Model arasındaki tüm iletişimi Presenter üzerinden yürüterek arayüzü tamamen pasif (Passive View) hale getiren, test edilebilirliği maksimize eden mimari."
          }
          badge="Interaction Pattern"
          color="#34d399"
          illustration={heroIllustration}
          features={[
            { 
              icon: <UserCheck />, 
              title: 'Presenter', 
              desc: isEn ? 'The module captain. Intercepts view actions, updates Model, and drives Passive View UI.' : 'Arayüzün yöneticisi. Viewdan olayları alır, Modeli günceller, Viewa ne yapacağını söyler.' 
            },
            { 
              icon: <Layout />, 
              title: isEn ? 'Passive View' : 'Pasif Görünüm (Passive View)', 
              desc: isEn ? 'Dumb presentation layer making zero decisions and holding zero autonomous business state.' : 'Kendi başına karar veremeyen mütevazı (humble) arayüz katmanı.' 
            },
            { 
              icon: <Activity />, 
              title: isEn ? 'Testability' : 'Yüksek Test Edilebilirlik', 
              desc: isEn ? 'Presenters can be 100% unit tested in headless test runners without mocking UI windows.' : 'UI framework bağımlılığı olmadan %100 Unit Test imkanı.' 
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
              { id: 'comparison', label: isEn ? 'MVP vs MVVM' : 'MVP vs MVVM', icon: <GitCompare size={18} /> },
              { id: 'concepts', label: isEn ? 'Core Concepts' : 'Temel Kavramlar', icon: <Box size={18} /> }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => scrollToSection(tab.id as any)}
                style={{
                  padding: '10px 24px',
                  borderRadius: '18px',
                  border: 'none',
                  background: activeTab === tab.id ? '#34d399' : 'transparent',
                  color: activeTab === tab.id ? '#020617' : 'rgba(255,255,255,0.5)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontWeight: 700,
                  fontSize: '0.9rem',
                  transition: 'all 0.3s ease',
                  boxShadow: activeTab === tab.id ? '0 4px 12px rgba(52, 211, 153, 0.3)' : 'none'
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
            <MVPComparisonTab />
          </div>
          <div id="concepts" style={{ scrollMarginTop: "100px" }}>
            <MVPConceptsTab />
          </div>
        </div>
        </div>
        
        {/* Pattern Definition Reference */}
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
                  {isEn ? "Pattern Definition" : "Desen Tanımı"}
                </div>
                <p style={{ color: '#94a3b8', marginBottom: '2rem', fontSize: '1.1rem', lineHeight: 1.6 }}>
                  {isEn 
                    ? "MVP (Passive View) completely isolates UI logic from the window to boost testability. Read Martin Fowler's classic paper." 
                    : "MVP (Passive View), test edilebilirliği artırmak için UI mantığını görünümden tamamen ayıran bir desendir. Detayları Martin Fowler'ın makalesinde mevcuttur."
                  }
                </p>
                
                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap',
            position: 'sticky',
            top: '80px',
            zIndex: 30 }}>
                   <a 
                     href="https://martinfowler.com/eaaDev/PassiveScreen.html" 
                     target="_blank" 
                     rel="noopener noreferrer"
                     style={{ 
                       display: 'flex', alignItems: 'center', gap: '8px', 
                       background: 'rgba(52, 211, 153, 0.15)', color: '#6ee7b7', 
                       padding: '12px 24px', borderRadius: '12px', textDecoration: 'none', fontWeight: 600,
                       border: '1px solid rgba(52, 211, 153, 0.2)', transition: 'all 0.2s'
                     }}
                   >
                      Passive View Pattern (Martin Fowler) <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                   </a>
                </div>
             </div>
          </div>
        </section>
      </motion.div>
    </>
  );
};

export default MVPPage;
