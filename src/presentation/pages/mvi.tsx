import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { RefreshCcw, MousePointerClick, Layers, Database, ArrowRight, Play, CircleDot } from 'lucide-react';
import ArchHero from '../components/ArchHero';
import SEO from '../components/SEO';
import { MVIFlowTab } from '../components/mvi/MVIFlowTab';
import { MVISimulationTab, UiState } from '../components/mvi/MVISimulationTab';

const MVIPage: React.FC = () => {
  const { i18n } = useTranslation();
  const isEn = (i18n.resolvedLanguage || i18n.language || 'tr').startsWith('en');
  const [activeTab, setActiveTab] = useState<'simulation' | 'flow'>('flow');
  const scrollToSection = (id: 'simulation' | 'flow') => {
    setActiveTab(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const [currentState, setCurrentState] = useState<UiState>({ count: 0, loading: false, message: 'Idle' });

  const dispatchIntent = (intent: 'INCREMENT' | 'DECREMENT' | 'RESET') => {
    processIntent(intent);
  };

  const processIntent = (intent: string) => {
    const intermediateState: UiState = { ...currentState, loading: true, message: `Processing ${intent}...` };
    setCurrentState(intermediateState);

    setTimeout(() => {
      let finalState: UiState;
      if (intent === 'INCREMENT') {
        finalState = { count: currentState.count + 1, loading: false, message: 'Incremented' };
      } else if (intent === 'DECREMENT') {
        finalState = { count: currentState.count - 1, loading: false, message: 'Decremented' };
      } else {
        finalState = { count: 0, loading: false, message: 'Reset' };
      }
      setCurrentState(finalState);
    }, 1000);
  };

  const heroIllustration = (
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
    <>
      <SEO
        title={isEn ? "Model-View-Intent (MVI) Architecture | ArchAcademy" : "Model-View-Intent (MVI) Mimarisi | ArchAcademy"}
        description={isEn 
          ? "Master Model-View-Intent (MVI) reactive architecture, unidirectional data flow, cycle streams, and immutable state management." 
          : "Model-View-Intent (MVI) mimarisi, tek yönlü veri akışı (Unidirectional Data Flow) ve reaktif durum yönetimi rehberi."
        }
        keywords="mvi architecture, model view intent, unidirectional data flow, cycle js, reactive state, redux flux mvi"
        canonicalUrl="/mvi"
      />
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ paddingBottom: '100px' }}>
        <ArchHero 
          title="Model-View-Intent"
          subtitle="Unidirectional UI"
          description={isEn 
            ? "Eliminate unpredictable mutations. MVI enforces a strict unidirectional reactive cycle: Intent → Model (Immutable State) → View → Intent. State flows in one direction and never backtracks." 
            : "Kaotik state yönetimini unutun. MVI, veri akışını tek bir yöne (Cycle) zorlar. Kullanıcı 'Niyet' eder (Intent), Model güncellenir, View yeniden çizilir. Asla geri dönmez."
          }
          badge="Reactive Pattern"
          color="#10b981"
          illustration={heroIllustration}
          features={[
            { 
              icon: <CircleDot />, 
              title: isEn ? 'Single Source of Truth' : 'Tek Doğruluk Kaynağı (State)', 
              desc: isEn ? 'The Model state immutably represents the entire current UI snapshot.' : 'Model (State), uygulamanın o anki durumunun tek ve değişmez gerçeğidir.' 
            },
            { 
              icon: <RefreshCcw />, 
              title: isEn ? 'Unidirectional Cycle' : 'Tek Yönlü Akış (Unidirectional)', 
              desc: isEn ? 'Data strictly rotates: Intent triggers Model, Model renders View, View emits Intent.' : 'Veri akışı asla tersine dönmez. Döngüseldir: Intent -> Model -> View -> Intent.' 
            },
            { 
              icon: <Layers />, 
              title: isEn ? 'Immutability Guaranteed' : 'Değişmezlik (Immutable)', 
              desc: isEn ? 'State is never mutated in-place; fresh state trees are emitted atomically.' : 'State asla direk değiştirilmez, her seferinde yeni bir state kopyası oluşturulur.' 
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
              { id: 'flow', label: isEn ? 'The Reactive Cycle' : 'Döngü Analizi', icon: <RefreshCcw size={18} /> },
              { id: 'simulation', label: isEn ? 'Live State Machine' : 'Durum Makinesi Simülatörü', icon: <Play size={18} /> }
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
          <div id="flow" style={{ scrollMarginTop: "100px" }}>
            <MVIFlowTab />
          </div>
        </div>
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
                  {isEn ? "Origin & Theoretical Foundation" : "Köken & Teori"}
                </div>
                <p style={{ color: '#94a3b8', marginBottom: '2rem', fontSize: '1.1rem', lineHeight: 1.6 }}>
                  {isEn 
                    ? "Model-View-Intent (MVI) was formalized by André Staltz in 2015 via Cycle.js as a mathematical reactive UI pattern." 
                    : "MVI (Model-View-Intent), André Staltz tarafından 2015 yılında 'Cycle.js' ile popülerize edilen, tamamen reaktif bir UI mimarisidir."
                  }
                </p>
                
                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap',
            position: 'sticky',
            top: '80px',
            zIndex: 30 }}>
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
                      Unidirectional Architectures (André Staltz) <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                   </a>
                </div>
             </div>
          </div>
        </section>
      </motion.div>
    </>
  );
};

export default MVIPage;
