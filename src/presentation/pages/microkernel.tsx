import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Shield, Zap, Settings, Cpu, Puzzle, Download } from 'lucide-react';
import ArchHero from '../components/ArchHero';
import SEO from '../components/SEO';
import { MicrokernelConceptTab } from '../components/microkernel/MicrokernelConceptTab';
import { MicrokernelSimulationTab, Plugin } from '../components/microkernel/MicrokernelSimulationTab';

const MicrokernelPage: React.FC = () => {
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

  const [coreColor, setCoreColor] = useState('#10b981'); 

  const [plugins, setPlugins] = useState<Plugin[]>([
    { id: 'dark-theme', name: 'Dark Theme', description: isEn ? 'Custom UI Theme Extension' : 'Arayüz temasını dinamik değiştirir', icon: <Settings size={18} />, status: 'available', effect: 'UI Color changed' },
    { id: 'payment', name: 'Stripe Payment', description: isEn ? 'Payment gateway connector' : 'Ödeme alma modülü ekler', icon: <Zap size={18} />, status: 'available', effect: 'Payment Gateway Loaded' },
    { id: 'security', name: 'Auth Module', description: isEn ? 'OAuth2 / MFA Security layer' : 'Gelişmiş güvenlik denetimi', icon: <Shield size={18} />, status: 'available', effect: 'Security Level: High' }
  ]);

  const handleCorePing = () => {
    setCoreColor('#34d399');
    setTimeout(() => setCoreColor('#10b981'), 500);
  };

  const heroIllustration = (
    <div style={{ position: 'relative', width: '350px', height: '350px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {/* The Kernel (Core) */}
      <motion.div
        animate={{ 
          boxShadow: plugins.some(p => p.status === 'running') 
            ? ['0 0 20px #10b981', '0 0 60px #10b981', '0 0 20px #10b981'] 
            : '0 0 20px rgba(16, 185, 129, 0.2)',
        }}
        transition={{ type: "spring" }}
        style={{ 
          position: 'relative',
          width: '100px', 
          height: '100px', 
          background: '#020617', 
          border: '4px solid #10b981', 
          borderRadius: '50%', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          zIndex: 20 
        }}
      >
        <div style={{ textAlign: 'center' }}>
          <Cpu size={32} color={coreColor} style={{ transition: 'color 0.5s' }} />
          <div style={{ fontSize: '0.6rem', color: '#10b981', fontWeight: 900, marginTop: '4px' }}>KERNEL</div>
        </div>
      </motion.div>

      {/* Plugin Slots (Orbit) */}
      <div style={{ position: 'absolute', width: '280px', height: '280px', border: '2px dashed #334155', borderRadius: '50%', opacity: 0.5 }} />

      {/* Orbiting Plugins */}
      {plugins.map((p, i) => {
        const angle = (i * 360) / plugins.length;
        const isInstalled = p.status === 'installed' || p.status === 'running';
        
        return (
          <motion.div
            key={p.id}
            initial={{ opacity: 0.5, scale: 0.8 }}
            animate={{ 
              rotate: isInstalled ? 360 : 0,
              scale: isInstalled ? 1 : 0.8,
              opacity: isInstalled ? 1 : 0.4
            }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              display: 'flex',
              justifyContent: 'center',
              zIndex: 10,
              pointerEvents: 'none',
            }}
          >
            <div style={{ 
              transform: `rotate(${angle}deg) translate(0, -140px)`,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}>
              <motion.div 
                animate={{ rotate: -360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                style={{ 
                  width: '40px', 
                  height: '40px', 
                  background: isInstalled ? '#10b981' : '#1e293b', 
                  borderRadius: '12px', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  border: '2px solid',
                  borderColor: isInstalled ? '#10b981' : '#475569',
                  boxShadow: isInstalled ? '0 0 20px rgba(16, 185, 129, 0.4)' : 'none',
                  color: isInstalled ? 'black' : '#94a3b8'
                }}
              >
                {p.icon}
              </motion.div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );

  return (
    <>
      <SEO
        title={isEn ? "Microkernel (Plug-in) Architecture Pattern | ArchAcademy" : "Microkernel (Eklenti) Mimarisi | ArchAcademy"}
        description={isEn 
          ? "Master Microkernel (Plugin) architectures, core systems, extensible dynamic modules, and lifecycle management." 
          : "Microkernel (Eklenti) mimarisi, çekirdek sistem tasarımı, tak-çıkar modül yaşam döngüsü ve VS Code / Eclipse mimari modeli."
        }
        keywords="microkernel architecture, plug in architecture, eclipse, vs code, extensible system, core system"
        canonicalUrl="/microkernel"
      />
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ paddingBottom: '100px' }}>
        <ArchHero 
          title="Microkernel"
          subtitle="Plug-in Architecture"
          description={isEn 
            ? "The heartbeat behind VS Code, Eclipse, and modern operating systems. The core kernel is kept minimal and stable; all functionality attaches dynamically as plug-in extensions." 
            : "VS Code, Eclipse ve Chrome'un kalbi. Sistemin çekirdeği (Kernel) minimum düzeyde tutulur, tüm özellikler sonradan 'tak-çıkar' (Plug-in) mantığıyla eklenir."
          }
          badge="Extensible"
          color="#10b981"
          illustration={heroIllustration}
          features={[
            { 
              icon: <Shield />, 
              title: isEn ? 'Stability' : 'Kararlılık (Stability)', 
              desc: isEn ? 'Even if third-party plug-ins fail or crash, the core host kernel continues unhindered.' : 'Eklentiler çökse bile ana çekirdek (Kernel) çalışmaya devam eder.' 
            },
            { 
              icon: <Puzzle />, 
              title: isEn ? 'Plug & Play' : 'Tak-Çıkar (Plug & Play)', 
              desc: isEn ? 'Mount and unmount features live at runtime without restarting or re-deploying the host.' : 'Sistemi yeniden başlatmadan yeni özellikler ekleyin veya çıkarın.' 
            },
            { 
              icon: <Settings />, 
              title: isEn ? 'Customization' : 'Kişiselleştirme', 
              desc: isEn ? 'Every tenant or client shapes an custom-fit experience matching their precise needs.' : 'Her kullanıcı sistemini kendi ihtiyacına göre özelleştirebilir.' 
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
              { id: 'concept', label: isEn ? 'Core Concept' : 'Çekirdek Konsept', icon: <Cpu size={18} /> },
              { id: 'simulation', label: isEn ? 'Install Plugins' : 'Eklenti Yükleme Simülasyonu', icon: <Download size={18} /> }
            ].map((tab) => (
               <button
                key={tab.id}
                onClick={() => scrollToSection(tab.id as any)}
                style={{
                  padding: '10px 24px',
                  borderRadius: '18px',
                  border: 'none',
                  background: activeTab === tab.id ? '#10b981' : 'transparent',
                  color: activeTab === tab.id ? 'black' : 'rgba(255,255,255,0.5)',
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
          <div id="concept" style={{ scrollMarginTop: "100px" }}>
            <MicrokernelConceptTab />
          </div>
        </div>
        </div>

        {/* Eclipse Reference */}
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
                  {isEn ? "Classic Reference" : "Klasik Mimari Örneği"}
                </div>
                <p style={{ color: '#94a3b8', marginBottom: '2rem', fontSize: '1.1rem', lineHeight: 1.6 }}>
                  {isEn 
                    ? "Explore the OSGi and Eclipse Plug-in architecture that redefined modular software engineering." 
                    : "Microkernel (Plug-in) mimarisinin en ünlü ve başarılı uygulaması Eclipse IDE'dir. Eclipse'in nasıl tasarlandığını inceleyin."
                  }
                </p>
                
                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap',
            position: 'sticky',
            top: '80px',
            zIndex: 30 }}>
                   <a 
                     href="https://www.eclipse.org/articles/Article-Plug-in-architecture/plugin_architecture.html" 
                     target="_blank" 
                     rel="noopener noreferrer"
                     style={{ 
                       display: 'flex', alignItems: 'center', gap: '8px', 
                       background: 'rgba(59, 130, 246, 0.15)', color: '#60a5fa', 
                       padding: '12px 24px', borderRadius: '12px', textDecoration: 'none', fontWeight: 600,
                       border: '1px solid rgba(59, 130, 246, 0.2)', transition: 'all 0.2s'
                     }}
                   >
                      Eclipse Architecture Overview <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                   </a>
                </div>
             </div>
          </div>
        </section>
      </motion.div>
    </>
  );
};

export default MicrokernelPage;
