import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ArchHero from '../components/ArchHero';
import { 
  RefreshCcw, 
  MousePointerClick, 
  Layers, 
  Database, 
  ArrowRight, 
  Play,
  CircleDot
} from 'lucide-react';

const MVIPage = () => {
    const [activeTab, setActiveTab] = useState<'simulation' | 'flow'>('flow');
    
    // MVI State Simulation
    // 1. Model (Immutable State)
    interface UiState {
        count: number;
        loading: boolean;
        message: string;
    }
    const [currentState, setCurrentState] = useState<UiState>({ count: 0, loading: false, message: 'Idle' });
    
    // 2. Intent (User Actions)
    const dispatchIntent = (intent: 'INCREMENT' | 'DECREMENT' | 'RESET') => {
        // Only Intent can trigger a change cycle
        processIntent(intent);
    };

    // 3. Update (Reducer / Logic)
    const processIntent = (intent: string) => {
        let newState = { ...currentState, loading: true, message: `Processing ${intent}...` };
        setCurrentState(newState); // Intermediate State (Loading)

        setTimeout(() => {
            if (intent === 'INCREMENT') {
                newState = { count: currentState.count + 1, loading: false, message: 'Incremented' };
            } else if (intent === 'DECREMENT') {
                newState = { count: currentState.count - 1, loading: false, message: 'Decremented' };
            } else {
                newState = { count: 0, loading: false, message: 'Reset' };
            }
            setCurrentState(newState); // Final State
        }, 1000);
    };

    const illu = (
        <div style={{ position: 'relative', width: '400px', height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            
            {/* The Cycle Circle */}
            <svg style={{ position: 'absolute', width: '300px', height: '300px', transform: 'rotate(-90deg)' }}>
                <circle cx="150" cy="150" r="120" stroke="rgba(255,255,255,0.1)" strokeWidth="2" fill="none" />
                <motion.circle 
                    cx="150" cy="150" r="120" 
                    stroke="#10b981" 
                    strokeWidth="4" 
                    fill="none" 
                    strokeDasharray="750" 
                    strokeDashoffset="750"
                    animate={{ strokeDashoffset: 0 }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                />
            </svg>

            {/* Nodes */}
            {/* 1. Model (Top) */}
            <div style={{ position: 'absolute', top: 10, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{ padding: '10px', background: '#10b981', borderRadius: '12px', boxShadow: '0 0 20px rgba(16, 185, 129, 0.4)' }}>
                    <Database color="white" size={24} />
                </div>
                <div style={{ color: '#10b981', fontWeight: 800, marginTop: '5px' }}>MODEL</div>
            </div>

            {/* 2. View (Right) */}
            <div style={{ position: 'absolute', right: 20, top: '40%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{ padding: '10px', background: '#3b82f6', borderRadius: '12px', boxShadow: '0 0 20px rgba(59, 130, 246, 0.4)' }}>
                    <Layers color="white" size={24} />
                </div>
                <div style={{ color: '#3b82f6', fontWeight: 800, marginTop: '5px' }}>VIEW</div>
            </div>

            {/* 3. Intent (Left) */}
            <div style={{ position: 'absolute', left: 20, top: '40%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{ padding: '10px', background: '#f43f5e', borderRadius: '12px', boxShadow: '0 0 20px rgba(244, 63, 94, 0.4)' }}>
                    <MousePointerClick color="white" size={24} />
                </div>
                <div style={{ color: '#f43f5e', fontWeight: 800, marginTop: '5px' }}>INTENT</div>
            </div>

            {/* Flow Arrows */}
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 4, repeat: Infinity, ease: 'linear' }} style={{ position: 'absolute', width: '100%', height: '100%' }}>
                 <div style={{ position: 'absolute', top: '50px', right: '80px', transform: 'rotate(45deg)' }}>
                     <ArrowRight color="white" size={20} />
                 </div>
            </motion.div>

        </div>
    );

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ paddingBottom: '100px' }}>
      <ArchHero 
        title="Model-View-Intent"
        subtitle="Unidirectional UI"
        description="Kaotik state yönetimini unutun. MVI, veri akışını tek bir yöne (Cycle) zorlar. Kullanıcı 'Niyet' eder (Intent), Model güncellenir, View yeniden çizilir. Asla geri dönmez."
        badge="Reactive Pattern"
        color="#10b981"
        illustration={illu}
        features={[
          { icon: <CircleDot />, title: 'Single Source of Truth', desc: 'Model (State), uygulamanın o anki durumunun tek ve değişmez gerçeğidir.' },
          { icon: <RefreshCcw />, title: 'Unidirectional', desc: 'Veri akışı asla tersine dönmez. Döngüseldir: Intent -> Model -> View -> Intent.' },
          { icon: <Layers />, title: 'Immutable', desc: 'State asla direk değiştirilmez, her seferinde yeni bir state kopyası oluşturulur.' }
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
            { id: 'flow', label: 'The Cycle', icon: <RefreshCcw size={18} /> },
            { id: 'simulation', label: 'Live State Machine', icon: <Play size={18} /> }
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
            
            {/* COMPARISON FLOW TAB */}
            {activeTab === 'flow' && (
                 <motion.div
                    key="flow"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                >
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: '2rem', alignItems: 'center' }}>
                         
                         {/* MVVM (Classic) */}
                         <div className="glass-card" style={{ opacity: 0.6 }}>
                             <h3 style={{ fontSize: '1.4rem', color: '#94a3b8', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                 MVVM (Traditional)
                             </h3>
                             <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem', fontSize: '0.9rem' }}>
                                 View ve ViewModel arasında çift yönlü (Two-way) veya karmaşık bindingler olabilir.
                             </p>
                             <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '20px' }}>
                                 <div style={{ padding: '10px', background: 'rgba(255,255,255,0.1)', borderRadius: '8px' }}>VIEW</div>
                                 <RefreshCcw size={20} />
                                 <div style={{ padding: '10px', background: 'rgba(255,255,255,0.1)', borderRadius: '8px' }}>VM</div>
                             </div>
                             <div style={{ marginTop: '1rem', color: '#ef4444', fontSize: '0.8rem' }}>⚠️ State inconsistency riski</div>
                         </div>

                         <div style={{ fontWeight: 800, color: '#64748b' }}>VS</div>

                         {/* MVI (Modern) */}
                         <div className="glass-card" style={{ borderLeft: '4px solid #10b981', background: 'linear-gradient(135deg, rgba(16,185,129,0.1) 0%, rgba(2,6,23,0) 100%)' }}>
                             <h3 style={{ fontSize: '1.4rem', color: '#10b981', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                 MVI (Reactive)
                             </h3>
                             <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem', fontSize: '0.9rem' }}>
                                 Tamamen döngüsel. State tek bir yerden akar. Yan etkiler (Side Effects) izole edilmiştir.
                             </p>
                             <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'center' }}>
                                 <div style={{ width: '100%', height: '4px', background: 'linear-gradient(90deg, #f43f5e, #10b981, #3b82f6)', borderRadius: '2px' }}></div>
                                 <div style={{ fontSize: '0.8rem', color: '#10b981' }}>Intent → Model → View</div>
                             </div>
                             <div style={{ marginTop: '1rem', color: '#10b981', fontSize: '0.8rem' }}>✅ Predictable State</div>
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
                   <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem' }}>
                       
                       {/* The User Controls (Intent Trigger) */}
                       <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                            <h3 style={{ marginBottom: '1.5rem', color: '#f43f5e' }}>1. User Intents</h3>
                            <p style={{ color: '#94a3b8', marginBottom: '2rem' }}>
                                Kullanıcı sadece niyetini belirtir. State'i doğrudan değiştiremez.
                            </p>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px' }}>
                                <button onClick={() => dispatchIntent('INCREMENT')} disabled={currentState.loading} className="btn-bounce" style={{ padding: '15px 25px', borderRadius: '12px', border: 'none', background: '#334155', color: 'white', cursor: 'pointer', flex: 1 }}>
                                    + Increment Intent
                                </button>
                                <button onClick={() => dispatchIntent('DECREMENT')} disabled={currentState.loading} className="btn-bounce" style={{ padding: '15px 25px', borderRadius: '12px', border: 'none', background: '#334155', color: 'white', cursor: 'pointer', flex: 1 }}>
                                    - Decrement Intent
                                </button>
                                <button onClick={() => dispatchIntent('RESET')} disabled={currentState.loading} className="btn-bounce" style={{ padding: '15px 25px', borderRadius: '12px', border: 'none', background: '#ef4444', color: 'white', cursor: 'pointer', flex: 1 }}>
                                    Reset Intent
                                </button>
                            </div>
                       </div>

                       {/* The Machine (Model & View) */}
                       <div className="glass-card" style={{ background: '#020617', border: '1px solid #1e293b' }}>
                           
                           {/* State Monitor */}
                           <div style={{ marginBottom: '2rem', padding: '15px', background: 'rgba(16, 185, 129, 0.1)', borderRadius: '12px', border: '1px solid #10b981' }}>
                               <div style={{ fontSize: '0.8rem', color: '#10b981', fontWeight: 800, marginBottom: '10px' }}>2. MODEL (IMMUTABLE STATE)</div>
                               <pre style={{ margin: 0, fontFamily: 'monospace', color: '#d1fae5', fontSize: '0.9rem' }}>
                                   {JSON.stringify(currentState, null, 2)}
                               </pre>
                           </div>

                           {/* Rendered View */}
                           <div style={{ textAlign: 'center' }}>
                               <div style={{ fontSize: '0.8rem', color: '#3b82f6', fontWeight: 800, marginBottom: '10px' }}>3. VIEW (RENDER)</div>
                               <div style={{ fontSize: '4rem', fontWeight: 900, color: 'white' }}>
                                   {currentState.count}
                               </div>
                               <div style={{ 
                                   display: 'inline-block', 
                                   marginTop: '10px', 
                                   padding: '4px 12px', 
                                   borderRadius: '20px', 
                                   background: currentState.loading ? '#eab308' : '#334155', 
                                   color: currentState.loading ? 'black' : 'white',
                                   fontSize: '0.8rem',
                                   fontWeight: 700
                                }}>
                                   Status: {currentState.message}
                               </div>
                           </div>

                       </div>

                   </div>
               </motion.div>
            )}
        </AnimatePresence>
      </div>

       {/* Reference Section */}
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
                Origin & Theory
              </div>
              <p style={{ color: '#94a3b8', marginBottom: '2rem', fontSize: '1.1rem', lineHeight: 1.6 }}>
                MVI (Model-View-Intent), André Staltz tarafından 2015 yılında "Cycle.js" ile popülerize edilen, tamamen reaktif bir UI mimarisidir.
              </p>
              
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                 <a 
                   href="https://staltz.com/unidirectional-user-interface-architectures.html" 
                   target="_blank" 
                   rel="noopener noreferrer"
                   style={{ 
                     display: 'flex', alignItems: 'center', gap: '8px', 
                     background: 'rgba(16, 185, 129, 0.15)', color: '#6ee7b7', 
                     padding: '12px 24px', borderRadius: '12px', textDecoration: 'none', fontWeight: 600,
                     border: '1px solid rgba(16, 185, 129, 0.2)', transition: 'all 0.2s'
                   }}
                 >
                    Read André Staltz's Post <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                 </a>
              </div>
           </div>
        </div>
      </section>

    </motion.div>
  );
};

export default MVIPage;
