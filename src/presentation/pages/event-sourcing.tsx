import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { History, Save, RotateCcw, Database, FileClock, GitCommitHorizontal, Play } from 'lucide-react';
import ArchHero from '../components/ArchHero';
import SEO from '../components/SEO';
import { EventSourcingComparisonTab } from '../components/eventsourcing/EventSourcingComparisonTab';
import { EventSourcingSimulationTab } from '../components/eventsourcing/EventSourcingSimulationTab';

const EventSourcingPage: React.FC = () => {
  const { i18n } = useTranslation();
  const isEn = (i18n.resolvedLanguage || i18n.language || 'tr').startsWith('en');
  const [activeTab, setActiveTab] = useState<'simulation' | 'comparison'>('comparison');

  const heroIllustration = (
    <div style={{ position: 'relative', width: '380px', height: '350px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      {/* Event Stream (The Log) */}
      <div style={{ width: '100%', height: '220px', position: 'relative', overflow: 'hidden', background: 'rgba(99, 102, 241, 0.05)', borderRadius: '20px', border: '1px solid rgba(99, 102, 241, 0.2)', padding: '35px 15px 15px 15px' }}>
        <div style={{ position: 'absolute', top: '12px', left: '15px', fontSize: '0.65rem', fontWeight: 900, color: '#818cf8', opacity: 0.9, letterSpacing: '1px' }}>APPEND-ONLY LOG</div>
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: i * 1, duration: 0.5 }}
            style={{
              width: '90%',
              height: '45px',
              background: 'var(--glass)',
              border: '1.5px solid #6366f1',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              padding: '0 15px',
              marginBottom: '10px',
              boxShadow: '0 5px 15px rgba(99, 102, 241, 0.1)'
            }}
          >
            <GitCommitHorizontal size={18} color="#6366f1" style={{ marginRight: '10px' }} />
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: '0.7rem', fontWeight: 900, color: 'white' }}>EVENT #{1024 + i}</span>
              <span style={{ fontSize: '0.55rem', opacity: 0.6 }}>LOGGED AT {new Date().toLocaleTimeString()}</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Projection Line */}
      <div style={{ height: '40px', width: '2px', background: 'linear-gradient(to bottom, #6366f1, transparent)', position: 'relative' }}>
         <motion.div 
           animate={{ top: ['0%', '100%'], opacity: [0, 1, 0] }}
           transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
           style={{ position: 'absolute', width: '8px', height: '8px', background: '#6366f1', borderRadius: '50%', left: '-3px', boxShadow: '0 0 10px #6366f1' }}
         />
      </div>

      {/* Reconstructed State */}
      <motion.div
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        style={{ width: '180px', height: '80px', background: 'var(--glass)', border: '2px solid #6366f1', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '15px', boxShadow: '0 20px 40px rgba(0,0,0,0.3)', position: 'relative' }}
      >
        <div style={{ position: 'absolute', top: '-25px', fontSize: '0.65rem', fontWeight: 900, color: '#818cf8' }}>PROJECTED STATE</div>
        <Save size={32} color="#6366f1" />
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ height: '8px', width: '60px', background: '#6366f1', borderRadius: '4px', marginBottom: '6px', opacity: 0.8 }} />
          <div style={{ height: '8px', width: '40px', background: '#818cf8', borderRadius: '4px', opacity: 0.5 }} />
        </div>
      </motion.div>
    </div>
  );

  return (
    <>
      <SEO
        title={isEn ? "Event Sourcing Architecture Pattern | ArchAcademy" : "Event Sourcing Mimari Deseni | ArchAcademy"}
        description={isEn 
          ? "Master Event Sourcing, append-only event stores, state projection, time-travel debugging, and CQRS integration." 
          : "Event Sourcing mimarisi, değişmez olay kütüğü, durum projeksiyonu, zaman yolculuğu hata ayıklaması ve denetim izleri."
        }
        keywords="event sourcing, event store, append only log, martin fowler, cqrs, projection, time travel debugging"
        canonicalUrl="/event-sourcing"
      />
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ paddingBottom: '100px' }}>
        <ArchHero 
          title="Event Sourcing"
          subtitle="The Source of Truth"
          description={isEn 
            ? "Never store just the current state snapshot; record the full immutable history of every domain event that led to it. Operates on ledger principles." 
            : "Veritabanında verinin son halini değil, o hale gelmesini sağlayan tüm olayların (Events) tarihçesini saklama sanatıdır. Muhasebe defteri mantığıyla çalışır."
          }
          badge="Audit & Replay"
          color="#6366f1"
          illustration={heroIllustration}
          features={[
            { 
              icon: <History />, 
              title: isEn ? 'Time Travel' : 'Zaman Yolculuğu (Time Travel)', 
              desc: isEn ? 'Reconstruct exact system state at any arbitrary historical timestamp.' : 'Sisteme "Geçen Salı saat 14:00\'te durum neydi?" diye sorabilirsiniz.' 
            },
            { 
              icon: <FileClock />, 
              title: isEn ? 'Audit Log' : 'Eksiksiz Denetim İzi (Audit)', 
              desc: isEn ? 'Domain events are immutable and append-only; state changes are never deleted.' : 'Kayıtlar asla silinmez veya güncellenmez (Immutable), sadece eklenir.' 
            },
            { 
              icon: <RotateCcw />, 
              title: isEn ? 'State Replay' : 'Yeniden Oynatma (Replay)', 
              desc: isEn ? 'Reproject bugged projections by replaying recorded event streams with updated logic.' : 'Bir hata olduğunda tüm olayları yeniden oynatarak hatayı analiz edebilirsiniz.' 
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
              { id: 'comparison', label: isEn ? 'CRUD vs Event Sourcing' : 'CRUD vs Event Sourcing', icon: <Database size={18} /> },
              { id: 'simulation', label: isEn ? 'Live Simulation' : 'Canlı Sepet Simülasyonu', icon: <Play size={18} /> }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                style={{
                  padding: '10px 24px',
                  borderRadius: '18px',
                  border: 'none',
                  background: activeTab === tab.id ? '#6366f1' : 'transparent',
                  color: activeTab === tab.id ? 'white' : 'rgba(255,255,255,0.5)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontWeight: 700,
                  fontSize: '0.9rem',
                  transition: 'all 0.3s ease',
                  boxShadow: activeTab === tab.id ? '0 4px 12px rgba(99, 102, 241, 0.3)' : 'none'
                }}
              >
                {tab.icon} {tab.label}
              </button>
            ))}
          </div>
        </ArchHero>

        <div className="container" style={{ marginTop: '2rem' }}>
          <AnimatePresence mode="wait">
            {activeTab === 'comparison' && <EventSourcingComparisonTab key="comparison" />}
            {activeTab === 'simulation' && <EventSourcingSimulationTab key="simulation" />}
          </AnimatePresence>
        </div>
        
        {/* Core Concept Reference Section */}
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
                  {isEn ? "Core Architecture Concept" : "Temel Mimari Konsept"}
                </div>
                <p style={{ color: '#94a3b8', marginBottom: '2rem', fontSize: '1.1rem', lineHeight: 1.6 }}>
                  {isEn 
                    ? "Martin Fowler's foundational essay on Event Sourcing remains the industry-standard benchmark." 
                    : "Uygulama durumunun (State) olaylar dizisi olarak saklanması konseptini derinlemesine anlamak için en güvenilir kaynak Martin Fowler'dır."
                  }
                </p>
                
                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                   <a 
                     href="https://martinfowler.com/eaaDev/EventSourcing.html" 
                     target="_blank" 
                     rel="noopener noreferrer"
                     style={{ 
                       display: 'flex', alignItems: 'center', gap: '8px', 
                       background: 'rgba(99, 102, 241, 0.15)', color: '#a5b4fc', 
                       padding: '12px 24px', borderRadius: '12px', textDecoration: 'none', fontWeight: 600,
                       border: '1px solid rgba(99, 102, 241, 0.2)', transition: 'all 0.2s'
                     }}
                   >
                      Event Sourcing Pattern (Martin Fowler) <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                   </a>
                </div>
             </div>
          </div>
        </section>
      </motion.div>
    </>
  );
};

export default EventSourcingPage;
