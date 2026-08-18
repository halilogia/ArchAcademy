import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ArchHero from '../../../components/ArchHero';
import { 
  AppWindow, 
  Files, 
  RefreshCw, 
  Zap, 
  Search,
  Globe,
  WifiOff,
  MousePointer2
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SPAvsMPAPage = () => {
    const [activeTab, setActiveTab] = useState<'simulation' | 'comparison'>('comparison');
    
    // Simulation State
    const [currentUrl, setCurrentUrl] = useState('/home');
    const [isLoading, setIsLoading] = useState(false);
    const [simMode, setSimMode] = useState<'SPA' | 'MPA'>('SPA');
    
    const navigateSim = (path: string) => {
        if (currentUrl === path) return;
        
        if (simMode === 'MPA') {
            // Hard Reload Simulation
            setIsLoading(true);
            setTimeout(() => {
                setCurrentUrl(path);
                setIsLoading(false);
            }, 800); // 800ms white screen
        } else {
            // Soft Navigation
            setCurrentUrl(path); 
        }
    };

    const illu = (
        <div style={{ position: 'relative', width: '400px', height: '300px', display: 'flex', gap: '20px', alignItems: 'center', justifyContent: 'center' }}>
            
            {/* SPA Representation (Infinite Canvas) */}
            <motion.div 
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 4, repeat: Infinity }}
                style={{ width: '140px', height: '180px', background: '#3b82f6', borderRadius: '16px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative', boxShadow: '0 10px 30px rgba(59, 130, 246, 0.3)' }}
            >
                <AppWindow color="white" size={40} />
                <div style={{ color: 'white', fontWeight: 800, marginTop: '10px' }}>SPA</div>
                <div style={{ fontSize: '0.6rem', color: '#bfdbfe', marginTop: '5px' }}>Fluid Experience</div>
                
                {/* Floating Content changing instantly */}
                <motion.div 
                    animate={{ opacity: [0, 1, 0], y: [10, 0, -10] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    style={{ position: 'absolute', bottom: -20, background: '#60a5fa', padding: '5px 10px', borderRadius: '10px', fontSize: '0.6rem', color: 'white' }}
                >
                    JSON Data
                </motion.div>
            </motion.div>

            {/* VS Badge */}
            <div style={{ fontWeight: 900, fontSize: '1.2rem', color: '#64748b' }}>VS</div>

            {/* MPA Representation (Multiple Files) */}
            <div style={{ position: 'relative', width: '140px', height: '180px' }}>
                {[0, 1, 2].map((i) => (
                    <motion.div
                        key={i}
                        animate={{ 
                            y: i === 0 ? [0, -10, 0] : i * 5,
                            x: i * 5,
                            zIndex: 3 - i
                        }}
                        transition={{ duration: 3, delay: i * 0.2, repeat: Infinity }}
                        style={{ 
                            position: 'absolute', top: 0, left: 0,
                            width: '100%', height: '100%', 
                            background: i === 0 ? '#10b981' : '#064e3b', 
                            borderRadius: '16px', 
                            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                            border: '1px solid rgba(255,255,255,0.1)',
                            boxShadow: '0 10px 30px rgba(16, 185, 129, 0.2)'
                        }}
                    >
                        {i === 0 && (
                            <>
                                <Files color="white" size={40} />
                                <div style={{ color: 'white', fontWeight: 800, marginTop: '10px' }}>MPA</div>
                                <div style={{ fontSize: '0.6rem', color: '#a7f3d0', marginTop: '5px' }}>Fresh Request</div>
                            </>
                        )}
                    </motion.div>
                ))}
            </div>

        </div>
    );

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ paddingBottom: '100px' }}>
      <ArchHero 
        title="SPA vs MPA"
        subtitle="Web Architecture"
        description="The two faces of the web. Single Page Applications (SPA) give a native desktop feel; Multi Page Applications (MPA) offer the classic, SEO-friendly, simple structure."
        badge="Render Strategy"
        color="#3b82f6"
        illustration={illu}
        features={[
          { icon: <Zap />, title: 'Performance', desc: 'SPA loads only changed data. MPA downloads all HTML/CSS/JS each time.' },
          { icon: <Search />, title: 'SEO', desc: 'MPA is SEO-friendly by nature. SPA requires extra setup (SSR/Prerender).' },
          { icon: <WifiOff />, title: 'Offline', desc: 'SPA can work offline via Service Worker (PWA).' }
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
            { id: 'comparison', label: 'Trade-off Battle', icon: <Files size={18} /> },
            { id: 'simulation', label: 'Refresh Simulator', icon: <RefreshCw size={18} /> }
          ].map((tab) => (
             <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
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
        <AnimatePresence mode="wait">
            
            {/* COMPARISON TAB */}
            {activeTab === 'comparison' && (
                 <motion.div
                    key="comparison"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                >
                    <div style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 1fr) minmax(300px, 1fr)', gap: '3rem' }}>
                         
                         {/* SPA */}
                         <div className="glass-card" style={{ borderTop: '4px solid #3b82f6' }}>
                             <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                                 <h3 style={{ fontSize: '1.4rem', color: '#3b82f6', display: 'flex', alignItems: 'center', gap: '10px', margin: 0 }}>
                                     <AppWindow /> Single Page App
                                 </h3>
                                 <span style={{ fontSize: '0.7rem', background: 'rgba(59, 130, 246, 0.2)', color: '#93c5fd', padding: '4px 8px', borderRadius: '6px' }}>React, Vue, Angular</span>
                             </div>
                             
                             <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', lineHeight: 1.6 }}>
                                 A single HTML file reaches the browser. All subsequent transitions happen by updating the DOM with JavaScript.
                             </p>

                             <div style={{ background: '#020617', padding: '15px', borderRadius: '12px', fontSize: '0.8rem', color: '#94a3b8', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                 <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                     <span>Initial Load:</span>
                                     <span style={{ color: '#ef4444' }}>Slow (Big Bundle)</span>
                                 </div>
                                 <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                     <span>Navigation:</span>
                                     <span style={{ color: '#10b981' }}>Instant</span>
                                 </div>
                                 <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                     <span>UX:</span>
                                     <span style={{ color: '#10b981' }}>App-like</span>
                                 </div>
                             </div>
                         </div>

                         {/* MPA */}
                         <div className="glass-card"