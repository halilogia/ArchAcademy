import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ArchHero from '../components/ArchHero';
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
        description="Web'in iki yüzü. Tek Sayfa Uygulamaları (SPA), masaüstü uygulama hissi verirken; Çok Sayfalı Uygulamalar (MPA) klasik, SEO dostu ve basit yapı sunar."
        badge="Render Strategy"
        color="#3b82f6"
        illustration={illu}
        features={[
          { icon: <Zap />, title: 'Performance', desc: 'SPA sadece değişen veriyi yükler. MPA her seferinde tüm HTML/CSS/JS\'i indirir.' },
          { icon: <Search />, title: 'SEO', desc: 'MPA doğuştan SEO dostudur. SPA için ekstra ayar (SSR/Prerender) gerekir.' },
          { icon: <WifiOff />, title: 'Offline', desc: 'SPA, Service Worker ile internet yokken bile çalışabilir (PWA).' }
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
                                 Tarayıcıya tek bir HTML iner. Sonraki tüm geçişler JavaScript ile DOM'u güncelleyerek yapılır.
                             </p>

                             <div style={{ background: '#020617', padding: '15px', borderRadius: '12px', fontSize: '0.8rem', color: '#94a3b8', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                 <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                     <span>Initial Load:</span>
                                     <span style={{ color: '#ef4444' }}>Yavaş (Big Bundle)</span>
                                 </div>
                                 <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                     <span>Navigation:</span>
                                     <span style={{ color: '#10b981' }}>Anlık (Instant)</span>
                                 </div>
                                 <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                     <span>UX:</span>
                                     <span style={{ color: '#10b981' }}>App-like</span>
                                 </div>
                             </div>
                         </div>

                         {/* MPA */}
                         <div className="glass-card" style={{ borderTop: '4px solid #10b981' }}>
                             <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                                 <h3 style={{ fontSize: '1.4rem', color: '#10b981', display: 'flex', alignItems: 'center', gap: '10px', margin: 0 }}>
                                     <Files /> Multi Page App
                                 </h3>
                                 <span style={{ fontSize: '0.7rem', background: 'rgba(16, 185, 129, 0.2)', color: '#d1fae5', padding: '4px 8px', borderRadius: '6px' }}>PHP, Rails, ASP.NET</span>
                             </div>
                             
                             <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', lineHeight: 1.6 }}>
                                 Her tıklamada sunucuya gidilir, yeni bir HTML sayfası indirilir ve tarayıcı tamamen yenilenir.
                             </p>

                             <div style={{ background: '#020617', padding: '15px', borderRadius: '12px', fontSize: '0.8rem', color: '#94a3b8', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                 <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                     <span>Initial Load:</span>
                                     <span style={{ color: '#10b981' }}>Hızlı (Sadece HTML)</span>
                                 </div>
                                 <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                     <span>Navigation:</span>
                                     <span style={{ color: '#f59e0b' }}>Yavaş (Full Reload)</span>
                                 </div>
                                 <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                     <span>SEO:</span>
                                     <span style={{ color: '#10b981' }}>Mükemmel</span>
                                 </div>
                             </div>
                         </div>

                    </div>
                </motion.div>
            )}

            {/* SIMULATION TAB */}
            {activeTab === 'simulation' && (
                <motion.div
                   key="simulation"
                   initial={{ opacity: 0, y: 20 }}
                   animate={{ opacity: 1, y: 0 }}
                   exit={{ opacity: 0, y: -20 }}
               >
                   <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                       <div style={{ background: 'rgba(255,255,255,0.05)', display: 'inline-flex', padding: '5px', borderRadius: '12px', marginBottom: '2rem' }}>
                           <button onClick={() => setSimMode('SPA')} style={{ padding: '10px 30px', borderRadius: '8px', border: 'none', background: simMode === 'SPA' ? '#3b82f6' : 'transparent', color: 'white', cursor: 'pointer', fontWeight: 700 }}>SPA Mode</button>
                           <button onClick={() => setSimMode('MPA')} style={{ padding: '10px 30px', borderRadius: '8px', border: 'none', background: simMode === 'MPA' ? '#10b981' : 'transparent', color: 'white', cursor: 'pointer', fontWeight: 700 }}>MPA Mode</button>
                       </div>

                       <div style={{ 
                           width: '100%', maxWidth: '700px', height: '400px', margin: '0 auto', 
                           background: '#fff', borderRadius: '12px', overflow: 'hidden', 
                           display: 'flex', flexDirection: 'column', position: 'relative' 
                        }}>
                           
                           {/* Browser Bar */}
                           <div style={{ background: '#e2e8f0', padding: '10px', display: 'flex', gap: '10px', alignItems: 'center' }}>
                               <div style={{ display: 'flex', gap: '5px' }}>
                                   <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ef4444' }}></div>
                                   <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#f59e0b' }}></div>
                                   <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#10b981' }}></div>
                               </div>
                               <div style={{ flex: 1, background: 'white', borderRadius: '4px', padding: '5px 10px', fontSize: '0.8rem', color: '#64748b', display: 'flex', alignItems: 'center' }}>
                                   {isLoading ? <RefreshCw size={12} className="spin" style={{marginRight: '5px'}}/> : <Globe size={12} style={{marginRight: '5px'}} />}
                                   example.com{currentUrl}
                               </div>
                           </div>

                           {/* Viewport content */}
                           <div style={{ flex: 1, background: '#f1f5f9', position: 'relative', overflow: 'hidden' }}>
                               
                               <AnimatePresence mode="popLayout">
                                   {!isLoading ? (
                                       <motion.div 
                                          key={currentUrl}
                                          initial={simMode === 'SPA' ? { x: 50, opacity: 0 } : { opacity: 0 }}
                                          animate={{ x: 0, opacity: 1 }}
                                          exit={simMode === 'SPA' ? { x: -50, opacity: 0 } : { opacity: 1 }} // MPA doesn't animate exit, just cuts
                                          transition={{ duration: simMode === 'SPA' ? 0.3 : 0 }}
                                          style={{ height: '100%', padding: '2rem', display: 'flex', flexDirection: 'column', gap: '20px' }}
                                       >
                                           <h1 style={{ color: '#1e293b', fontSize: '2rem', margin: 0 }}>
                                               {currentUrl === '/home' ? 'Home Page' : 
                                                currentUrl === '/about' ? 'About Us' : 
                                                currentUrl === '/contact' ? 'Contact' : 'Page'}
                                           </h1>
                                           <div style={{ width: '100%', height: '150px', background: currentUrl === '/home' ? '#3b82f6' : currentUrl === '/about' ? '#ec4899' : '#8b5cf6', borderRadius: '12px', opacity: 0.2 }}></div>
                                           <p style={{ color: '#64748b' }}>
                                               {currentUrl === '/home' ? 'Welcome to our blazing fast application.' : 
                                                currentUrl === '/about' ? 'We are a team of passionate developers.' : 
                                                'Get in touch with us anytime!'}
                                           </p>
                                       </motion.div>
                                   ) : (
                                       /* White Flash simulation for MPA */
                                       <div style={{ width: '100%', height: '100%', background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                           <div style={{ color: '#94a3b8' }}>Loading...</div>
                                       </div>
                                   )}
                               </AnimatePresence>

                           </div>

                           {/* Navigation Links */}
                           <div style={{ padding: '15px', background: 'white', borderTop: '1px solid #e2e8f0', display: 'flex', justifyContent: 'center', gap: '20px' }}>
                               {['/home', '/about', '/contact'].map(path => (
                                   <button 
                                     key={path}
                                     onClick={() => navigateSim(path)}
                                     style={{ 
                                         border: 'none', background: 'transparent', 
                                         color: currentUrl === path ? '#3b82f6' : '#64748b', 
                                         fontWeight: 700, cursor: 'pointer',
                                         borderBottom: currentUrl === path ? '2px solid #3b82f6' : 'none'
                                     }}
                                   >
                                       {path.replace('/', '').toUpperCase()}
                                   </button>
                               ))}
                           </div>

                       </div>
                   </div>
               </motion.div>
            )}
        </AnimatePresence>
      </div>

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
                Deep Dive
              </div>
              <p style={{ color: '#94a3b8', marginBottom: '2rem', fontSize: '1.1rem', lineHeight: 1.6 }}>
                Google Chrome Developers ekibinin "Multi-page Apps vs Single-page Apps" makalesi bu konudaki en net rehberdir.
              </p>
              
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                 <a 
                   href="https://web.dev/articles/rendering-on-the-web" 
                   target="_blank" 
                   rel="noopener noreferrer"
                   style={{ 
                     display: 'flex', alignItems: 'center', gap: '8px', 
                     background: 'rgba(59, 130, 246, 0.15)', color: '#93c5fd', 
                     padding: '12px 24px', borderRadius: '12px', textDecoration: 'none', fontWeight: 600,
                     border: '1px solid rgba(59, 130, 246, 0.2)', transition: 'all 0.2s'
                   }}
                 >
                    Rendering Architecture (web.dev) <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                 </a>
              </div>
           </div>
        </div>
      </section>

    </motion.div>
  );
};

export default SPAvsMPAPage;
