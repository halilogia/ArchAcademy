import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Puzzle, Power, Settings, Box, Plug } from 'lucide-react';
import ArchHero from '../components/ArchHero';
import SEO from '../components/SEO';
import { PluginConceptTab } from '../components/plugin/PluginConceptTab';
import { PluginSimulationTab, Extension } from '../components/plugin/PluginSimulationTab';

const PlugInPage: React.FC = () => {
  const { i18n } = useTranslation();
  const isEn = (i18n.resolvedLanguage || i18n.language || 'tr').startsWith('en');
  const [activeTab, setActiveTab] = useState<'simulation' | 'concept'>('concept');
  
  const [extensions, setExtensions] = useState<Extension[]>([
    { id: 'dark-mode', name: isEn ? 'Dark Contrast Theme' : 'Dark Contrast', description: isEn ? 'Injects high-contrast dark styles.' : 'Injects dark CSS styles.', type: 'ui', active: false },
    { id: 'logger', name: isEn ? 'Audit Event Logger' : 'Event Logger', description: isEn ? 'Intercepts and records UI clicks.' : 'Intercepts user clicks.', type: 'logic', active: false },
    { id: 'banner', name: isEn ? 'Promotional Top Banner' : 'Promo Banner', description: isEn ? 'Mounts an announcement header.' : 'Adds a header component.', type: 'ui', active: false }
  ]);

  const [logs, setLogs] = useState<string[]>([]);

  const toggleExtension = (id: string) => {
    setExtensions(prev => prev.map(e => e.id === id ? { ...e, active: !e.active } : e));
  };

  const handleAppClick = (actionName: string) => {
    const loggerActive = extensions.find(e => e.id === 'logger')?.active;
    if (loggerActive) {
      setLogs(prev => [...prev.slice(-3), `[LOG]: User triggered '${actionName}' at ${new Date().toLocaleTimeString()}`]);
    }
  };

  const heroIllustration = (
    <div style={{ position: 'relative', width: '350px', height: '300px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      {/* Main Board */}
      <div style={{ position: 'relative', width: '200px', height: '240px', background: '#1e293b', borderRadius: '12px', border: '2px solid #475569', display: 'flex', flexDirection: 'column', padding: '10px' }}>
        <div style={{ textAlign: 'center', fontSize: '0.8rem', color: '#94a3b8', marginBottom: '10px' }}>CORE SYSTEM</div>
        
        {/* Slots */}
        {[0, 1, 2].map(i => {
          const activeExt = extensions[i];
          return (
            <div key={i} style={{ flex: 1, margin: '5px 0', border: '2px dashed #475569', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
              <AnimatePresence>
                {activeExt.active && (
                  <motion.div
                    initial={{ x: 200, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: 200, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 120 }}
                    style={{ width: '100%', height: '100%', background: '#a78bfa', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'absolute' }}
                  >
                    <Plug size={20} color="white" />
                    <span style={{ marginLeft: '10px', fontWeight: 700, fontSize: '0.8rem', color: 'white' }}>{activeExt.name}</span>
                  </motion.div>
                )}
              </AnimatePresence>
              {!activeExt.active && <span style={{ fontSize: '0.6rem', color: '#475569' }}>EMPTY SOCKET</span>}
            </div>
          );
        })}
      </div>

      {/* Connecting Lines */}
      <svg style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
        {extensions.map((ext, i) => (
          ext.active && (
            <motion.line 
              key={i}
              x1="350" y1={50 + (i * 80)}
              x2="275" y2={50 + (i * 80)}
              stroke="#a78bfa"
              strokeWidth="4"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
            />
          )
        ))}
      </svg>
    </div>
  );

  return (
    <>
      <SEO
        title={isEn ? "Plug-in & Microkernel Architecture Pattern | ArchAcademy" : "Plug-in (Eklenti) Mimarisi | ArchAcademy"}
        description={isEn 
          ? "Master Plug-in and Microkernel architecture, dynamic extension points, runtime loading, and 3rd-party ecosystems." 
          : "Plug-in (Eklenti) mimarisi, extension points, runtime modül yükleme ve Microkernel desenleri rehberi."
        }
        keywords="plugin architecture, microkernel, extension points, hooks, runtime loading, third party ecosystem"
        canonicalUrl="/plugin"
      />
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ paddingBottom: '100px' }}>
        <ArchHero 
          title="Plug-in"
          subtitle="Architecture"
          description={isEn 
            ? "Static monolithic systems decay. Plug-in (Microkernel) architecture leaves extensible socket interfaces allowing third-party developers to contribute capabilities without touching core code." 
            : "Statik sistemler ölüdür. Plug-in mimarisi, tanımadığınız 3. parti geliştiricilerin bile sisteminize yeni özellikler (Extensions) eklemesine izin veren açık bir kapı bırakır."
          }
          badge="Open System"
          color="#a78bfa"
          illustration={heroIllustration}
          features={[
            { 
              icon: <Plug />, 
              title: isEn ? 'Extension Points' : 'Eklenti Noktaları (Extension Points)', 
              desc: isEn ? 'Hook into lifecycle stages to mutate behavior dynamically.' : 'Sistemin belli noktalarına (Hooks) kanca atarak akışı değiştirin.' 
            },
            { 
              icon: <Power />, 
              title: isEn ? 'Runtime Loading' : 'Çalışma Zamanı Yükleme (Runtime)', 
              desc: isEn ? 'Dynamically link and mount external modules without rebuilding the host.' : 'Uygulamayı yeniden derlemeden, çalışma anında modül yükleyin.' 
            },
            { 
              icon: <Puzzle />, 
              title: isEn ? '3rd-Party Ecosystem' : '3. Parti Ekosistem Gücü', 
              desc: isEn ? 'Harness broad developer communities (e.g. Chrome, WordPress, VS Code).' : 'Kendi kodunuzu yazmadan topluluğun gücünü kullanın (örn: Wordpress, Chrome).' 
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
              { id: 'concept', label: isEn ? 'Core Concepts' : 'Kavramlar', icon: <Box size={18} /> },
              { id: 'simulation', label: isEn ? 'Extension Manager' : 'Eklenti Yöneticisi', icon: <Settings size={18} /> }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                style={{
                  padding: '10px 24px',
                  borderRadius: '18px',
                  border: 'none',
                  background: activeTab === tab.id ? '#a78bfa' : 'transparent',
                  color: activeTab === tab.id ? 'black' : 'rgba(255,255,255,0.5)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontWeight: 700,
                  fontSize: '0.9rem',
                  transition: 'all 0.3s ease',
                  boxShadow: activeTab === tab.id ? '0 4px 12px rgba(167, 139, 250, 0.3)' : 'none'
                }}
              >
                {tab.icon} {tab.label}
              </button>
            ))}
          </div>
        </ArchHero>

        <div className="container" style={{ marginTop: '2rem' }}>
          <AnimatePresence mode="wait">
            {activeTab === 'concept' && <PluginConceptTab key="concept" />}
            {activeTab === 'simulation' && (
              <PluginSimulationTab 
                key="simulation"
                extensions={extensions}
                logs={logs}
                onToggleExtension={toggleExtension}
                onAppClick={handleAppClick}
              />
            )}
          </AnimatePresence>
        </div>

        {/* Extensibility Design Reference */}
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
                  {isEn ? "Extensibility Design Standard" : "Genişletilebilirlik Tasarımı"}
                </div>
                <p style={{ color: '#94a3b8', marginBottom: '2rem', fontSize: '1.1rem', lineHeight: 1.6 }}>
                  {isEn 
                    ? "Explore Mark Richards' canonical breakdown of the Microkernel and Plug-in architecture style on O'Reilly." 
                    : "Microkernel (Plug-in) mimari stilinin detayları, uygulama alanları ve Core-Extension ayrımı hakkında temel kaynaklara göz atın."
                  }
                </p>
                
                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                   <a 
                     href="https://www.oreilly.com/library/view/software-architecture-patterns/9781491971437/ch03.html" 
                     target="_blank" 
                     rel="noopener noreferrer"
                     style={{ 
                       display: 'flex', alignItems: 'center', gap: '8px', 
                       background: 'rgba(167, 139, 250, 0.15)', color: '#c4b5fd', 
                       padding: '12px 24px', borderRadius: '12px', textDecoration: 'none', fontWeight: 600,
                       border: '1px solid rgba(167, 139, 250, 0.2)', transition: 'all 0.2s'
                     }}
                   >
                      Microkernel Architecture Style (O'Reilly) <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                   </a>
                </div>
             </div>
          </div>
        </section>
      </motion.div>
    </>
  );
};

export default PlugInPage;
