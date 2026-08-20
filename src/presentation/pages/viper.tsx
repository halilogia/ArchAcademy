import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { ShieldCheck, Zap, Map, Share2, Layout, Cpu, Database, Route as RouterIcon, GitCompare, Box } from 'lucide-react';
import ArchHero from '../components/ArchHero';
import SEO from '../components/SEO';
import { useProgress } from '../context/ProgressContext';
import { VIPERComparisonTab } from '../components/viper/VIPERComparisonTab';
import { VIPERAnatomyTab } from '../components/viper/VIPERAnatomyTab';

const VIPERPage: React.FC = () => {
  const { i18n } = useTranslation();
  const isEn = (i18n.resolvedLanguage || i18n.language || 'tr').startsWith('en');
  const { completeStep } = useProgress();
  const [activeTab, setActiveTab] = useState<'anatomy' | 'comparison'>('comparison');
  const scrollToSection = (id: 'anatomy' | 'comparison') => {
    setActiveTab(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };


  useEffect(() => {
    const timer = setTimeout(() => {
      completeStep('/viper');
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const heroIllustration = (
    <div style={{ position: 'relative', width: '380px', height: '380px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {/* Presenter (Center) */}
      <motion.div
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 3, repeat: Infinity }}
        style={{ width: '100px', height: '100px', background: 'var(--glass)', border: '2px solid #10b981', borderRadius: '50%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', zIndex: 10, boxShadow: '0 0 30px rgba(16, 185, 129, 0.3)' }}
      >
        <Share2 size={32} color="#10b981" />
        <span style={{ fontSize: '0.6rem', fontWeight: 900, marginTop: '4px', color: 'white' }}>PRESENTER</span>
      </motion.div>

      {/* View (Left) */}
      <motion.div style={{ position: 'absolute', left: 0, top: '50%', transform: 'translateY(-50%)', textAlign: 'center' }}>
        <div style={{ width: '80px', height: '80px', background: 'rgba(59, 130, 246, 0.1)', border: '1px solid #3b82f6', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 10px auto' }}>
          <Layout size={24} color="#3b82f6" />
        </div>
        <span style={{ fontSize: '0.7rem', fontWeight: 800, color: '#93c5fd' }}>VIEW</span>
      </motion.div>

      {/* Interactor (Right) */}
      <motion.div style={{ position: 'absolute', right: 0, top: '50%', transform: 'translateY(-50%)', textAlign: 'center' }}>
        <div style={{ width: '80px', height: '80px', background: 'rgba(236, 72, 153, 0.1)', border: '1px solid #ec4899', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 10px auto' }}>
          <Cpu size={24} color="#ec4899" />
        </div>
        <span style={{ fontSize: '0.7rem', fontWeight: 800, color: '#fca5a5' }}>INTERACTOR</span>
      </motion.div>

      {/* Entity (Far Right floating) */}
      <motion.div animate={{ x: [0, 5, 0] }} transition={{ duration: 2, repeat: Infinity }} style={{ position: 'absolute', right: -20, top: '20%', background: '#0f172a', border: '1px solid #f97316', padding: '6px', borderRadius: '8px', zIndex: 5 }}>
        <Database size={14} color="#f97316" />
      </motion.div>

      {/* Router (Bottom) */}
      <motion.div style={{ position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)', textAlign: 'center' }}>
        <div style={{ width: '80px', height: '80px', background: 'rgba(245, 158, 11, 0.1)', border: '1px solid #f59e0b', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 10px auto' }}>
          <RouterIcon size={24} color="#f59e0b" />
        </div>
        <span style={{ fontSize: '0.7rem', fontWeight: 800, color: '#fcd34d' }}>ROUTER</span>
      </motion.div>

      {/* Connectors */}
      <svg style={{ position: 'absolute', width: '100%', height: '100%', pointerEvents: 'none', zIndex: 1 }}>
        <line x1="90" y1="190" x2="140" y2="190" stroke="#10b981" strokeWidth="2" strokeDasharray="4" opacity="0.5" />
        <line x1="240" y1="190" x2="290" y2="190" stroke="#10b981" strokeWidth="2" strokeDasharray="4" opacity="0.5" />
        <line x1="190" y1="240" x2="190" y2="290" stroke="#10b981" strokeWidth="2" strokeDasharray="4" opacity="0.5" />
      </svg>
    </div>
  );

  return (
    <>
      <SEO
        title={isEn ? "VIPER Clean Mobile Architecture Pattern | ArchAcademy" : "VIPER Temiz Mobil Mimari Deseni | ArchAcademy"}
        description={isEn 
          ? "Master the VIPER mobile architecture: View, Interactor, Presenter, Entity, Router layers, protocol decoupling, and testing." 
          : "VIPER mobil mimarisi: View, Interactor, Presenter, Entity, Router katmanları, protokol bağımlılıkları ve test edilebilirlik."
        }
        keywords="viper architecture, ios clean architecture, interactor presenter, wireframe router, mobile design patterns"
        canonicalUrl="/viper"
      />
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ paddingBottom: '100px' }}>
        <ArchHero 
          title="VIPER"
          subtitle="Clean iOS Architecture"
          description={isEn 
            ? "The most rigorous application of Clean Architecture principles in native mobile engineering. Every component possesses a single, uncompromised responsibility." 
            : "Clean Architecture prensiplerinin iOS/Mobile dünyasındaki en katı ve disiplinli uygulaması. Her bileşenin tek bir sorumluluğu vardır (Single Responsibility)."
          }
          badge="Enterprise Standard"
          color="#10b981"
          illustration={heroIllustration}
          features={[
            { 
              icon: <ShieldCheck />, 
              title: isEn ? 'Isolation' : 'İzolasyon (Isolation)', 
              desc: isEn ? 'Every letter (V-I-P-E-R) represents an isolated protocol contract.' : 'Her harf (V-I-P-E-R) ayrı bir dosyadır. Bağımlılıklar interface ile yönetilir.' 
            },
            { 
              icon: <Zap />, 
              title: isEn ? 'Testability' : 'Yüksek Test Edilebilirlik', 
              desc: isEn ? 'Interactors isolate business logic from UI, enabling 100% pure unit test coverage.' : 'Interactor içinde saf iş mantığı olduğu için UI olmadan %100 test edilebilir.' 
            },
            { 
              icon: <Map />, 
              title: isEn ? 'Routing' : 'Yönlendirme (Routing)', 
              desc: isEn ? 'Navigation transitions are decoupled into dedicated Wireframe/Router modules.' : 'Navigasyon mantığı (Router/Wireframe) ekrandan tamamen koparılmıştır.' 
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
              { id: 'comparison', label: isEn ? 'VIPER vs MVVM' : 'VIPER vs MVVM', icon: <GitCompare size={18} /> },
              { id: 'anatomy', label: isEn ? 'Anatomy & Layers' : '5 Katmanın Anatomisi', icon: <Box size={18} /> }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => scrollToSection(tab.id as any)}
                style={{
                  padding: '10px 24px',
                  borderRadius: '18px',
                  border: 'none',
                  background: activeTab === tab.id ? '#10b981' : 'transparent',
                  color: activeTab === tab.id ? '#020617' : 'rgba(255,255,255,0.5)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontWeight: 700,
                  fontSize: '0.9rem',
                  transition: 'all 0.3s ease',
                  boxShadow: activeTab === tab.id ? '0 4px 12px rgba(16, 185, 129, 0.3)' : 'none'
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
            <VIPERComparisonTab />
          </div>
          <div id="anatomy" style={{ scrollMarginTop: "100px" }}>
            <VIPERAnatomyTab />
          </div>
        </div>
        </div>

        {/* Clean Mobile Architecture Reference */}
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
                  {isEn ? "Clean Mobile Architecture" : "Temiz Mobil Mimari"}
                </div>
                <p style={{ color: '#94a3b8', marginBottom: '2rem', fontSize: '1.1rem', lineHeight: 1.6 }}>
                  {isEn 
                    ? "Explore the original objc.io publication detailing VIPER for enterprise iOS applications." 
                    : "VIPER deseninin kökenleri, Interactor-Presenter etkileşimi ve modüler mobil uygulama geliştirme pratikleri hakkında detaylı bilgi edinin."
                  }
                </p>
                
                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap',
            position: 'sticky',
            top: '80px',
            zIndex: 30 }}>
                   <a 
                     href="https://www.objc.io/issues/13-architecture/viper/" 
                     target="_blank" 
                     rel="noopener noreferrer"
                     style={{ 
                       display: 'flex', alignItems: 'center', gap: '8px', 
                       background: 'rgba(16, 185, 129, 0.15)', color: '#6ee7b7', 
                       padding: '12px 24px', borderRadius: '12px', textDecoration: 'none', fontWeight: 600,
                       border: '1px solid rgba(16, 185, 129, 0.2)', transition: 'all 0.2s'
                     }}
                   >
                      Architecting iOS Apps with VIPER (objc.io) <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                   </a>
                </div>
             </div>
          </div>
        </section>
      </motion.div>
    </>
  );
};

export default VIPERPage;
