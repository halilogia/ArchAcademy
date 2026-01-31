import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ArchHero from '../components/ArchHero';
import { 
  Puzzle, 
  Power, 
  Settings, 
  Box, 
  CheckCircle2, 
  Code,
  Plug,
  Zap,
  LayoutTemplate
} from 'lucide-react';

interface Extension {
    id: string;
    name: string;
    description: string;
    type: 'ui' | 'logic';
    active: boolean;
}

const PlugInPage = () => {
    const [activeTab, setActiveTab] = useState<'simulation' | 'concept'>('concept');
    const [extensions, setExtensions] = useState<Extension[]>([
        { id: 'dark-mode', name: 'Dark Contrast', description: 'Injects dark CSS styles.', type: 'ui', active: false },
        { id: 'logger', name: 'Event Logger', description: 'Intercepts user clicks.', type: 'logic', active: false },
        { id: 'banner', name: 'Promo Banner', description: 'Adds a header component.', type: 'ui', active: false }
    ]);

    const [logs, setLogs] = useState<string[]>([]);

    const toggleExtension = (id: string) => {
        setExtensions(prev => prev.map(e => e.id === id ? { ...e, active: !e.active } : e));
    };

    const handleAppClick = (actionName: string) => {
        const loggerActive = extensions.find(e => e.id === 'logger')?.active;
        if (loggerActive) {
            setLogs(prev => [...prev.slice(-3), `[LOG]: User triggered '${actionName}'`]);
        }
    };

    const illu = (
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
                            x1="350" y1={50 + (i * 80)} // Imaginary source
                            x2="275" y2={50 + (i * 80)} // Enters the board
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
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ paddingBottom: '100px' }}>
            <ArchHero 
                title="Plug-in"
                subtitle="Architecture"
                description="Statik sistemler ölüdür. Plug-in mimarisi, tanımadığınız 3. parti geliştiricilerin bile sisteminize yeni özellikler (Extensions) eklemesine izin veren açık bir kapı bırakır."
                badge="Open System"
                color="#a78bfa"
                illustration={illu}
                features={[
                    { icon: <Plug />, title: 'Extension Points', desc: 'Sistemin belli noktalarına (Hooks) kanca atarak akışı değiştirin.' },
                    { icon: <Power />, title: 'Runtime Loading', desc: 'Uygulamayı yeniden derlemeden, çalışma anında modül yükleyin (Dynamic DLL/Jar).' },
                    { icon: <Puzzle />, title: '3rd Party Ecosystem', desc: 'Kendi kodunuzu yazmadan topluluğun gücünü kullanın (örn: Wordpress, Chrome).' }
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
                        { id: 'concept', label: 'Concept', icon: <Box size={18} /> },
                        { id: 'simulation', label: 'Extension Manager', icon: <Settings size={18} /> }
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
                    {activeTab === 'concept' && (
                        <motion.div
                            key="concept"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                        >
                             <div className="glass-card" style={{ borderLeft: '4px solid #a78bfa', marginBottom: '2rem' }}>
                                 <h3 style={{ color: '#a78bfa', marginBottom: '10px' }}>Extension Points & Hooks</h3>
                                 <p style={{ color: '#cbd5e1' }}>
                                     Sisteminizi tasarlarken, gelecekteki geliştiricilerin müdahale edebileceği "boşluklar" bırakırsınız. Örneğin: 
                                     <code style={{ background: 'rgba(255,255,255,0.1)', padding: '2px 5px', borderRadius: '4px', margin: '0 5px' }}>onBeforeSave</code> 
                                     veya 
                                     <code style={{ background: 'rgba(255,255,255,0.1)', padding: '2px 5px', borderRadius: '4px', margin: '0 5px' }}>renderSidebarItem</code>.
                                     Eklentiler bu noktalara kod enjekte eder.
                                 </p>
                             </div>

                             <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
                                 <div className="glass-card">
                                     <h4 style={{ color: 'white' }}>Browser Extensions</h4>
                                     <p style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Chrome eklentileri (AdBlock), sayfa yüklendiğinde DOM'a müdahale eder. Core sistem (Chrome) aynı kalır.</p>
                                 </div>
                                 <div className="glass-card">
                                     <h4 style={{ color: 'white' }}>Wordpress Plugins</h4>
                                     <p style={{ fontSize: '0.8rem', color: '#94a3b8' }}>PHP Hooks kullanarak sitenin her yerini (admin paneli, post içeriği) değiştirirler.</p>
                                 </div>
                                 <div className="glass-card">
                                     <h4 style={{ color: 'white' }}>Game Mods</h4>
                                     <p style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Minecraft/Skyrim modları, oyun motorunun (Core) sunduğu API'leri kullanarak yeni eşyalar ekler.</p>
                                 </div>
                             </div>
                        </motion.div>
                    )}

                    {activeTab === 'simulation' && (
                        <motion.div
                            key="simulation"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                        >
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '30px', alignItems: 'start' }}>
                                
                                {/* Sidebar: Extension Manager */}
                                <div className="glass-card" style={{ padding: '0' }}>
                                    <div style={{ padding: '15px', borderBottom: '1px solid rgba(255,255,255,0.1)', background: 'rgba(167, 139, 250, 0.1)' }}>
                                        <h4 style={{ margin: 0, color: '#a78bfa', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                            <Puzzle size={18} /> Installed Extensions
                                        </h4>
                                    </div>
                                    <div style={{ padding: '10px' }}>
                                        {extensions.map(ext => (
                                            <div key={ext.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px', marginBottom: '5px', borderRadius: '8px', background: ext.active ? 'rgba(167, 139, 250, 0.2)' : 'transparent', border: ext.active ? '1px solid #a78bfa' : '1px solid transparent' }}>
                                                <div>
                                                    <div style={{ fontWeight: 700, color: 'white', fontSize: '0.9rem' }}>{ext.name}</div>
                                                    <div style={{ fontSize: '0.7rem', color: '#94a3b8' }}>{ext.description}</div>
                                                </div>
                                                <div 
                                                    onClick={() => toggleExtension(ext.id)}
                                                    style={{ 
                                                        width: '40px', height: '22px', 
                                                        background: ext.active ? '#a78bfa' : '#334155', 
                                                        borderRadius: '11px', 
                                                        position: 'relative', 
                                                        cursor: 'pointer',
                                                        transition: 'background 0.3s'
                                                    }}
                                                >
                                                    <div style={{ 
                                                        width: '18px', height: '18px', 
                                                        background: 'white', 
                                                        borderRadius: '50%', 
                                                        position: 'absolute', 
                                                        top: '2px', 
                                                        left: ext.active ? '20px' : '2px', 
                                                        transition: 'left 0.3s' 
                                                    }} />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Main App Area */}
                                <div className="glass-card" style={{ 
                                    minHeight: '400px', 
                                    background: extensions.find(e => e.id === 'dark-mode')?.active ? '#000' : '#fff',
                                    color: extensions.find(e => e.id === 'dark-mode')?.active ? '#fff' : '#000',
                                    transition: 'background 0.5s, color 0.5s',
                                    position: 'relative',
                                    overflow: 'hidden'
                                }}>
                                    {/* Hook Injection: Banner */}
                                    <AnimatePresence>
                                        {extensions.find(e => e.id === 'banner')?.active && (
                                            <motion.div 
                                                initial={{ height: 0 }} 
                                                animate={{ height: 'auto' }} 
                                                exit={{ height: 0 }} 
                                                style={{ background: '#a78bfa', padding: '10px', textAlign: 'center', fontWeight: 'bold', color: 'white', overflow: 'hidden' }}
                                            >
                                                🎉 HOLIDAY SALE! (Injected by Promo Plugin)
                                            </motion.div>
                                        )}
                                    </AnimatePresence>

                                    <div style={{ padding: '2rem' }}>
                                        <h2 style={{ marginBottom: '1rem' }}>My Application</h2>
                                        <p style={{ lineHeight: '1.6', opacity: 0.8 }}>
                                            Burası ana uygulamanın içeriği. Eklentiler (Plugins) buradaki görünümü ve davranışları değiştirebilir.
                                        </p>

                                        <div style={{ marginTop: '2rem', display: 'flex', gap: '10px' }}>
                                            <button 
                                                onClick={() => handleAppClick('primary-action')}
                                                className="btn-bounce"
                                                style={{ 
                                                    padding: '10px 20px', 
                                                    background: extensions.find(e => e.id === 'dark-mode')?.active ? '#333' : '#e2e8f0', 
                                                    color: 'inherit',
                                                    border: 'none', 
                                                    borderRadius: '8px', 
                                                    fontWeight: 'bold',
                                                    cursor: 'pointer' 
                                                }}
                                            >
                                                Click Me
                                            </button>
                                        </div>

                                        {/* Log Output */}
                                        {extensions.find(e => e.id === 'logger')?.active && (
                                            <div style={{ marginTop: '20px', padding: '10px', background: 'rgba(0,0,0,0.8)', color: '#10b981', fontFamily: 'monospace', fontSize: '0.8rem', borderRadius: '8px' }}>
                                                <div>--- Event Logger Plugin Output ---</div>
                                                {logs.map((L, i) => <div key={i}>{L}</div>)}
                                            </div>
                                        )}
                                    </div>

                                </div>

                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
          <section style={{ padding: '4rem 0', background: 'rgba(0,0,0,0.3)', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
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
                Extensibility Design
              </div>
              <p style={{ color: '#94a3b8', marginBottom: '2rem', fontSize: '1.1rem', lineHeight: 1.6 }}>
                Microkernel (Plug-in) mimari stilinin detayları, uygulama alanları ve Core-Extension ayrımı hakkında temel kaynaklara göz atın.
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
    );
};

export default PlugInPage;
