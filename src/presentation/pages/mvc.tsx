import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Layout, Database, Settings, GitCompare, Box, Brain } from 'lucide-react';
import ArchHero from '../components/ArchHero';
import SEO from '../components/SEO';
import { MVCComparisonTab } from '../components/mvc/MVCComparisonTab';
import { MVCConceptsTab } from '../components/mvc/MVCConceptsTab';

const MVCPage: React.FC = () => {
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
      {/* View */}
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        style={{ width: '130px', height: '85px', background: 'var(--glass)', border: '2px solid #ec4899', borderRadius: '18px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', zIndex: 3, boxShadow: '0 10px 30px rgba(236, 72, 153, 0.2)' }}
      >
        <Layout size={28} color="#ec4899" />
        <span style={{ fontSize: '0.75rem', fontWeight: 900, marginTop: '6px', color: 'white' }}>VIEW</span>
      </motion.div>

      {/* Dynamic Connector Down */}
      <div style={{ height: '40px', width: '2px', background: 'rgba(236, 72, 153, 0.2)', position: 'relative' }}>
        <motion.div 
          animate={{ top: ['0%', '100%'], opacity: [0, 1, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          style={{ position: 'absolute', width: '6px', height: '6px', background: '#ec4899', borderRadius: '50%', left: '-2px', filter: 'blur(1px)' }}
        />
      </div>

      {/* Controller */}
      <motion.div
        animate={{ scale: [1, 1.03, 1] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        style={{ width: '140px', height: '90px', background: 'var(--glass)', border: '2px solid #ec4899', borderRadius: '18px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', zIndex: 3, boxShadow: '0 0 40px rgba(236, 72, 153, 0.15)' }}
      >
        <Settings size={28} color="#ec4899" className="rotate-slow" />
        <span style={{ fontSize: '0.75rem', fontWeight: 900, marginTop: '6px', color: 'white' }}>CONTROLLER</span>
      </motion.div>

      {/* Dynamic Connector Up & Down */}
      <div style={{ height: '40px', width: '2px', background: 'rgba(236, 72, 153, 0.2)', position: 'relative' }}>
        <motion.div 
          animate={{ bottom: ['0%', '100%'], opacity: [0, 1, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear", delay: 0.75 }}
          style={{ position: 'absolute', width: '6px', height: '6px', background: '#ec4899', borderRadius: '50%', left: '-2px', filter: 'blur(1px)' }}
        />
      </div>

      {/* Model */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        style={{ width: '130px', height: '85px', background: 'var(--glass)', border: '2px solid #ec4899', borderRadius: '18px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', zIndex: 3, boxShadow: '0 -10px 30px rgba(236, 72, 153, 0.2)' }}
      >
        <Database size={28} color="#ec4899" />
        <span style={{ fontSize: '0.75rem', fontWeight: 900, marginTop: '6px', color: 'white' }}>MODEL</span>
      </motion.div>
      <style>{`
        .rotate-slow { animation: spin 8s linear infinite; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );

  return (
    <>
      <SEO
        title={isEn ? "Model-View-Controller (MVC) Architecture Pattern | ArchAcademy" : "Model-View-Controller (MVC) Mimari Deseni | ArchAcademy"}
        description={isEn 
          ? "Master the foundational MVC architecture pattern, Model-View-Controller decoupling, and its evolution to MVP and MVVM." 
          : "MVC (Model-View-Controller) mimarisi, sorumlulukların ayrılması, MVP ve MVVM desenlerine evrimi ve modern web'deki yeri."
        }
        keywords="mvc pattern, model view controller, martin fowler gui archs, trygve reenskaug, ruby on rails, django"
        canonicalUrl="/mvc"
      />
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ paddingBottom: '100px' }}>
        <ArchHero 
          title="MVC"
          subtitle="Classic Pattern"
          description={isEn 
            ? "The foundational patriarch of modern software architecture. Decouples systems into Model, View, and Controller, serving as the ancestor of MVVM, MVP, and modern UI engineering." 
            : "Software dünyasının en köklü mimari deseni. Model, View ve Controller üçlüsüyle sorumlulukları ayıran, MVVM ve diğer modern UI desenlerinin atası."
          }
          badge="Architectural Pattern"
          color="#ec4899"
          illustration={heroIllustration}
          features={[
            { 
              icon: <Layout />, 
              title: 'View', 
              desc: isEn ? 'The user interface rendering and presentation layer.' : 'Kullanıcının gördüğü arayüz katmanı.' 
            },
            { 
              icon: <Brain />, 
              title: 'Controller', 
              desc: isEn ? 'The orchestrator routing workflow events and mediating between Model and View.' : 'İş akışını yöneten, Model ve View arasındaki trafiği düzenleyen beyin.' 
            },
            { 
              icon: <Database />, 
              title: 'Model', 
              desc: isEn ? 'The pure sanctuary of domain data and fundamental business validation rules.' : 'Veri ve iş kurallarının (Business Logic) yaşadığı en saf katman.' 
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
              { id: 'comparison', label: isEn ? 'MVC vs MVVM' : 'MVC vs MVVM', icon: <GitCompare size={18} /> },
              { id: 'concepts', label: isEn ? 'Core Concepts' : 'Temel Kavramlar', icon: <Box size={18} /> }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => scrollToSection(tab.id as any)}
                style={{
                  padding: '10px 24px',
                  borderRadius: '18px',
                  border: 'none',
                  background: activeTab === tab.id ? '#ec4899' : 'transparent',
                  color: activeTab === tab.id ? 'white' : 'rgba(255,255,255,0.5)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontWeight: 700,
                  fontSize: '0.9rem',
                  transition: 'all 0.3s ease',
                  boxShadow: activeTab === tab.id ? '0 4px 12px rgba(236, 72, 153, 0.3)' : 'none'
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
            <MVCComparisonTab />
          </div>
          <div id="concepts" style={{ scrollMarginTop: "100px" }}>
            <MVCConceptsTab />
          </div>
        </div>
        </div>

        {/* Historical Context Reference */}
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
                  {isEn ? "Historical Context" : "Tarihsel Bağlam"}
                </div>
                <p style={{ color: '#94a3b8', marginBottom: '2rem', fontSize: '1.1rem', lineHeight: 1.6 }}>
                  {isEn 
                    ? "Read Martin Fowler's classic architectural paper detailing the lineage and subtle differences of GUI architectures." 
                    : "MVC, MVP ve MVVM'in tarihsel gelişimini ve aralarındaki ince farkları Martin Fowler'ın 'GUI Architectures' makalesinden okuyabilirsiniz."
                  }
                </p>
                
                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap',
            position: 'sticky',
            top: '80px',
            zIndex: 30 }}>
                   <a 
                     href="https://martinfowler.com/eaaDev/uiArchs.html" 
                     target="_blank" 
                     rel="noopener noreferrer"
                     style={{ 
                       display: 'flex', alignItems: 'center', gap: '8px', 
                       background: 'rgba(236, 72, 153, 0.15)', color: '#fbcfe8', 
                       padding: '12px 24px', borderRadius: '12px', textDecoration: 'none', fontWeight: 600,
                       border: '1px solid rgba(236, 72, 153, 0.2)', transition: 'all 0.2s'
                     }}
                   >
                      GUI Architectures (Martin Fowler) <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                   </a>
                </div>
             </div>
          </div>
        </section>
      </motion.div>
    </>
  );
};

export default MVCPage;
