import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Zap, Share2, Wind, Activity, GitMerge } from 'lucide-react';
import ArchHero from '../components/ArchHero';
import SEO from '../components/SEO';
import { ChoreographyComparisonTab } from '../components/choreography/ChoreographyComparisonTab';
import { ChoreographySimulationTab } from '../components/choreography/ChoreographySimulationTab';

const ChoreographyPage: React.FC = () => {
  const { i18n } = useTranslation();
  const isEn = (i18n.resolvedLanguage || i18n.language || 'tr').startsWith('en');
  const [activeTab, setActiveTab] = useState<'comparison' | 'simulation'>('comparison');

  const heroIllustration = (
    <div style={{ position: 'relative', width: '400px', height: '300px' }}>
      {/* Background Flow Path */}
      <svg style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', overflow: 'visible' }}>
        <defs>
          <linearGradient id="choreogradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ec4899" stopOpacity="0.2" />
            <stop offset="50%" stopColor="#f472b6" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#ec4899" stopOpacity="0.2" />
          </linearGradient>
        </defs>
        <motion.path 
          d="M 50 150 C 100 50, 200 250, 350 150"
          stroke="url(#choreogradient)"
          strokeWidth="4"
          fill="none"
          strokeDasharray="10 10"
          animate={{ strokeDashoffset: [0, -20] }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
      </svg>

      {/* Floating Nodes */}
      {[0, 1, 2, 3].map((i) => {
        const positions = [
          { x: 50, y: 150 },
          { x: 125, y: 100 },
          { x: 225, y: 200 },
          { x: 350, y: 150 }
        ];
        const pos = positions[i];
        
        return (
          <motion.div
            key={i}
            animate={{ 
              y: [pos.y, pos.y - 10, pos.y],
              scale: [1, 1.1, 1],
              boxShadow: ['0 0 0px #ec4899', '0 0 20px #ec4899', '0 0 0px #ec4899']
            }}
            transition={{ duration: 3, delay: i * 0.5, repeat: Infinity }}
            style={{
              position: 'absolute',
              left: pos.x,
              top: 0, 
              marginTop: -25,
              marginLeft: -25,
              width: '50px',
              height: '50px',
              background: 'rgba(236, 72, 153, 0.1)',
              border: '1px solid #ec4899',
              overflow: 'hidden',
              backdropFilter: 'blur(5px)',
              borderRadius: '16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 10
            }}
          >
            <Zap size={20} color="#ec4899" />
          </motion.div>
        );
      })}

      {/* Event Particles */}
      <motion.div
        style={{ 
          width: '10px', 
          height: '10px', 
          background: '#ffe4e6', 
          borderRadius: '50%', 
          position: 'absolute', 
          zIndex: 11, 
          boxShadow: '0 0 10px white',
          offsetPath: 'path("M 50 150 C 100 50, 200 250, 350 150")' 
        }}
        animate={{
          offsetDistance: ['0%', '100%'],
          opacity: [0, 1, 1, 0]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </div>
  );

  return (
    <>
      <SEO
        title={isEn ? "Choreography vs Orchestration & Event Sagas | ArchAcademy" : "Koreografi ve Dağıtık Event Saga Mimarisi | ArchAcademy"}
        description={isEn 
          ? "Master event-driven Choreography architecture, Saga patterns, decentralized workflows, and compare with central Orchestration." 
          : "Olay güdümlü Koreografi mimarisi, Dağıtık Saga desenleri, otonom servis akışları ve Orkestrasyon karşılaştırması."
        }
        keywords="choreography, orchestration, saga pattern, event driven architecture, microservices, decentralized workflow"
        canonicalUrl="/choreography"
      />
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ paddingBottom: '100px' }}>
        <ArchHero 
          title="Choreography"
          subtitle="Decentralized Flow"
          description={isEn 
            ? "No conductor commands the dancers on stage; they react to each other's moves. Each service listens for domain events, executes its slice of business logic, and emits the next event." 
            : "Sahnede bir şef (orkestra) yoktur, dansçılar birbirini izler. Her servis bir olayı duyar, kendi şovunu yapar ve bir sonraki olayı tetikler."
          }
          badge="Autonomous"
          color="#ec4899"
          illustration={heroIllustration}
          features={[
            { 
              icon: <Wind />, 
              title: isEn ? 'High Agility' : 'Yüksek Çeviklik (High Agility)', 
              desc: isEn ? 'Services are decoupled; new steps integrate without mutating a central coordinator.' : 'Servisler bağımsızdır, sisteme yeni adımlar eklemek için merkezi bir yeri değiştirmek gerekmez.' 
            },
            { 
              icon: <Share2 />, 
              title: isEn ? 'No SPOF' : 'Tek Hata Noktası Yok (No SPOF)', 
              desc: isEn ? 'There is no central coordinator to crash. Event workflow execution is fully distributed.' : 'Merkezi yönetici çökemez çünkü yönetici yoktur. Akış dağıtıktır.' 
            },
            { 
              icon: <Zap />, 
              title: isEn ? 'Reactive' : 'Reaktif (Reactive)', 
              desc: isEn ? 'Systems operate on event streams rather than rigid synchronous top-down commands.' : 'Sistem emirlerle değil, olaylarla (Event-Driven) işler. Veri akışkandır.' 
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
              { id: 'comparison', label: isEn ? 'vs Orchestration' : 'vs Orchestration', icon: <GitMerge size={18} /> },
              { id: 'simulation', label: isEn ? 'Event Chain Simulation' : 'Olay Zinciri Simülasyonu', icon: <Activity size={18} /> }
            ].map((tab) => (
               <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as 'comparison' | 'simulation')}
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
          <AnimatePresence mode="wait">
            {activeTab === 'comparison' && <ChoreographyComparisonTab key="comparison" />}
            {activeTab === 'simulation' && <ChoreographySimulationTab key="simulation" />}
          </AnimatePresence>
        </div>

        {/* Expert Talk Section */}
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
                  {isEn ? "Expert Reference" : "Uzman Referansı"}
                </div>
                <p style={{ color: '#94a3b8', marginBottom: '2rem', fontSize: '1.1rem', lineHeight: 1.6 }}>
                  {isEn 
                    ? "One of the most profound talks on distributed Choreography and Saga compensation patterns is delivered by Caitie McCaffrey. Watch the masterclass." 
                    : "Dağıtık sistemlerde Choreography ve Saga Pattern konusundaki en iyi anlatımlardan biri Caitie McCaffrey'e aittir."
                  }
                </p>
                
                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                   <a 
                     href="https://www.youtube.com/watch?v=xDuwrtwYHu8" 
                     target="_blank" 
                     rel="noopener noreferrer"
                     style={{ 
                       display: 'flex', alignItems: 'center', gap: '8px', 
                       background: 'rgba(236, 72, 153, 0.15)', color: '#fbcfe8', 
                       padding: '12px 24px', borderRadius: '12px', textDecoration: 'none', fontWeight: 600,
                       border: '1px solid rgba(236, 72, 153, 0.2)', transition: 'all 0.2s'
                     }}
                   >
                      Distributed Sagas (Caitie McCaffrey) <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                   </a>
                </div>
             </div>
          </div>
        </section>
      </motion.div>
    </>
  );
};

export default ChoreographyPage;
