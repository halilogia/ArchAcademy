import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ArchHero from '../components/ArchHero';
import { 
  Shield, 
  Zap, 
  Settings, 
  Box, 
  Cpu, 
  Puzzle, 
  Download, 
  CheckCircle2, 
  XCircle,
  Play,
  Terminal
} from 'lucide-react';

interface Plugin {
    id: string;
    name: string;
    description: string;
    icon: any;
    status: 'available' | 'installing' | 'installed' | 'running';
    effect: string;
}

const MicrokernelPage = () => {
    const [activeTab, setActiveTab] = useState<'simulation' | 'concept'>('concept');
    const [systemLogs, setSystemLogs] = useState<string[]>(['System initialized...', 'Core system stable.']);
    
    // Core state
    const [coreColor, setCoreColor] = useState('#10b981'); 

    const [plugins, setPlugins] = useState<Plugin[]>([
        { id: 'dark-theme', name: 'Dark Theme', description: 'Changes UI appearance', icon: <Settings size={18} />, status: 'available', effect: 'UI Color changed' },
        { id: 'payment', name: 'Stripe Payment', description: 'Adds payment processing', icon: <Zap size={18} />, status: 'available', effect: 'Payment Gateway Loaded' },
        { id: 'security', name: 'Auth Module', description: 'Advanced security check', icon: <Shield size={18} />, status: 'available', effect: 'Security Level: High' }
    ]);

    const installPlugin = (id: string) => {
        const plugin = plugins.find(p => p.id === id);
        if (!plugin || plugin.status !== 'available') return;

        // Start install
        updatePluginStatus(id, 'installing');
        log(`Installing ${plugin.name}...`);

        setTimeout(() => {
            updatePluginStatus(id, 'installed');
            log(`${plugin.name} installed successfully.`);
            
            // Auto run
            startPlugin(id);
        }, 1500);
    };

    const startPlugin = (id: string) => {
        const plugin = plugins.find(p => p.id === id);
        updatePluginStatus(id, 'running');
        log(`Starting ${plugin.name}...`);
        
        // Visual effect on core
        setCoreColor('#34d399');
        setTimeout(() => setCoreColor('#10b981'), 500);
    };

    const updatePluginStatus = (id: string, status: Plugin['status']) => {
        setPlugins(prev => prev.map(p => p.id === id ? { ...p, status } : p));
    };

    const log = (msg: string) => {
        setSystemLogs(prev => [...prev.slice(-4), `[Core]: ${msg}`]);
    };

    const illu = (
        <div style={{ position: 'relative', width: '350px', height: '350px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {/* The Kernel (Core) */}
            <motion.div
                animate={{ 
                    boxShadow: plugins.some(p => p.status === 'running') 
                        ? ['0 0 20px #10b981', '0 0 60px #10b981', '0 0 20px #10b981'] 
                        : '0 0 20px rgba(16, 185, 129, 0.2)',
                    type: "spring"
                }}
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
                        {/* The wrapper rotates, the item stays upright by counter-rotating if we wanted, but let's keep it simple: */}
                         <div style={{ 
                             transform: `rotate(${angle}deg) translate(0, -140px)`, // Push to orbit radius
                             display: 'flex',
                             flexDirection: 'column',
                             alignItems: 'center'
                        }}>
                             <motion.div 
                                animate={{ rotate: -360 }} // Counter rotate to keep upright
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
                                    boxShadow: isInstalled ? '0 0 20px rgba(16, 185, 129, 0.4)' : 'none'
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
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ paddingBottom: '100px' }}>
      <ArchHero 
        title="Microkernel"
        subtitle="Plug-in Architecture"
        description="VS Code, Eclipse ve Chrome'un kalbi. Sistemin çekirdeği (Kernel) minimum düzeyde tutulur, tüm özellikler sonradan 'tak-çıkar' (Plug-in) mantığıyla eklenir."
        badge="Extensible"
        color="#10b981"
        illustration={illu}
        features={[
          { icon: <Shield />, title: 'Stability', desc: 'Eklentiler çökse bile ana çekirdek (Kernel) çalışmaya devam eder.' },
          { icon: <Puzzle />, title: 'Plug & Play', desc: 'Sistemi yeniden başlatmadan yeni özellikler ekleyin veya çıkarın.' },
          { icon: <Settings />, title: 'Customization', desc: 'Her kullanıcı sistemini kendi ihtiyacına göre özelleştirebilir.' }
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
            { id: 'concept', label: 'Core Concept', icon: <Cpu size={18} /> },
            { id: 'simulation', label: 'Install Plugins', icon: <Download size={18} /> }
          ].map((tab) => (
             <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
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
          <AnimatePresence mode="wait">
            {activeTab === 'concept' && (
                 <motion.div
                    key="concept"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    style={{ padding: '2rem', background: 'rgba(255,255,255,0.02)', borderRadius: '24px', border: '1px solid #1e293b' }}
                >
                    <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#10b981' }}>Minimalist Çekirdek, Sonsuz Yetenek</h3>
                    <p style={{ lineHeight: '1.7', color: '#cbd5e1' }}>
                        Geleneksel monolotik sistemlerde tüm özellikler (Ödeme, Arama, Grafik vb.) tek bir büyük paketin içindedir. Microkernel mimarisinde ise ana uygulama sadece eklentileri yüklemeyi ve çalıştırmayı bilir.
                    </p>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px', marginTop: '2rem' }}>
                        <div className="glass-card">
                            <h4 style={{ color: '#fff' }}>VS Code</h4>
                            <p style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Çekirdek sadece metin düzenler. Python desteği, Renk temaları, Git entegrasyonu hepsi birer 'Plugin'dir.</p>
                        </div>
                        <div className="glass-card">
                            <h4 style={{ color: '#fff' }}>Hava Trafik Kontrolü</h4>
                            <p style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Radar izleme ana çekirdektir. Hava durumu, Uçuş planı gibi veriler eklenti olarak gelir.</p>
                        </div>
                         <div className="glass-card">
                            <h4 style={{ color: '#fff' }}>Bankacılık App</h4>
                            <p style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Para transferi çekirdektir. Kampanyalar ve Sigorta teklifleri dinamik eklentilerdir.</p>
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
                    <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '30px' }}>
                        
                        {/* Plugin Marketplace */}
                        <div>
                             <h3 style={{ marginBottom: '20px', color: '#fff', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                 <Puzzle color="#10b981" /> Plugin Marketplace
                             </h3>
                             <div style={{ display: 'grid', gap: '15px' }}>
                                 {plugins.map(p => (
                                     <div key={p.id} className="glass-card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '15px 20px', borderLeft: p.status === 'running' ? '4px solid #10b981' : '1px solid rgba(255,255,255,0.1)' }}>
                                         <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                                             <div style={{ padding: '10px', background: '#1e293b', borderRadius: '8px' }}>
                                                 {p.icon}
                                             </div>
                                             <div>
                                                 <h4 style={{ margin: 0, color: 'white' }}>{p.name}</h4>
                                                 <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>{p.description}</div>
                                             </div>
                                         </div>
                                         
                                         <button 
                                            onClick={() => installPlugin(p.id)}
                                            disabled={p.status !== 'available'}
                                            style={{ 
                                                padding: '8px 16px', 
                                                borderRadius: '8px', 
                                                border: 'none', 
                                                background: p.status === 'running' ? '#10b981' : (p.status === 'installing' ? '#334155' : '#fff'), 
                                                color: p.status === 'running' ? 'black' : (p.status === 'available' ? 'black' : 'white'),
                                                cursor: p.status === 'available' ? 'pointer' : 'default',
                                                fontWeight: 800,
                                                fontSize: '0.8rem',
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '5px'
                                            }}
                                         >
                                             {p.status === 'available' && 'Install'}
                                             {p.status === 'installing' && 'Installing...'}
                                             {p.status === 'installed' && 'Installed'}
                                             {p.status === 'running' && <><CheckCircle2 size={14}/> Active</>}
                                         </button>
                                     </div>
                                 ))}
                             </div>
                        </div>

                        {/* Kernel Terminal */}
                        <div className="glass-card" style={{ background: '#020617', padding: '0', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                             <div style={{ padding: '10px 15px', background: '#334155', display: 'flex', alignItems: 'center', gap: '10px', borderBottom: '1px solid #475569' }}>
                                 <Terminal size={14} color="#fff" />
                                 <span style={{ fontSize: '0.8rem', color: '#fff', fontWeight: 800 }}>Kernel Logs</span>
                             </div>
                             <div style={{ padding: '15px', fontFamily: 'monospace', fontSize: '0.8rem', color: '#10b981', minHeight: '300px' }}>
                                 {systemLogs.map((log, i) => (
                                     <motion.div 
                                        key={i} 
                                        initial={{ opacity: 0, x: -10 }} 
                                        animate={{ opacity: 1, x: 0 }} 
                                        style={{ marginBottom: '5px', display: 'flex', gap: '10px' }}
                                    >
                                         <span style={{ color: '#475569' }}>{new Date().toLocaleTimeString().split(' ')[0]}</span>
                                         <span>{log}</span>
                                     </motion.div>
                                 ))}
                             </div>
                        </div>

                    </div>
                </motion.div>
            )}
            </AnimatePresence>
      </div>

    </motion.div>
  );
};

export default MicrokernelPage;
