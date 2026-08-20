import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Box, Layers, Database, Activity, LayoutGrid, BookOpen } from 'lucide-react';
import ArchHero from '../components/ArchHero';
import SEO from '../components/SEO';
import { ComponentAtomicDesignTab } from '../components/componentdriven/ComponentAtomicDesignTab';
import { ComponentStateManagementTab } from '../components/componentdriven/ComponentStateManagementTab';
import { StateDrivenArchitectureTab } from '../components/componentdriven/StateDrivenArchitectureTab';
import { ComponentLifecycleSimulationTab } from '../components/componentdriven/ComponentLifecycleSimulationTab';

const ComponentDrivenPage: React.FC = () => {
  const { i18n } = useTranslation();
  const isEn = (i18n.resolvedLanguage || i18n.language || 'tr').startsWith('en');
  const [activeTab, setActiveTab] = useState<'atomic' | 'statemachine' | 'reactive' | 'simulation'>('atomic');
  const scrollToSection = (id: 'atomic' | 'statemachine' | 'reactive' | 'simulation') => {
    setActiveTab(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };


  return (
    <>
      <SEO
        title={isEn ? "Component-Driven Development & UI State Architecture | ArchAcademy" : "Bileşen Odaklı Geliştirme ve UI Durum Mimarisi | ArchAcademy"}
        description={isEn 
          ? "Master Atomic Design, Component-Driven Development (CDD), UI state categorization (Zustand/TanStack), and Finite State Machines." 
          : "Atomic Design (Atomlar, Moleküller), Bileşen Odaklı Geliştirme (CDD), modern arayüz durum yönetimi ve Sonlu Durum Makineleri (FSM) rehberi."
        }
        keywords="component driven development, atomic design, ui state management, finite state machines, fsm, zustand, react query"
        canonicalUrl="/component-driven"
      />
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ background: 'var(--bg-dark)', minHeight: '100vh' }}>
        <ArchHero 
          title="Component"
          subtitle={isEn ? "UI & State Architecture" : "Bileşen & Durum Mimarisi"}
          description={isEn 
            ? "Constructing scalable, resilient user interfaces from modular blocks. Atomic Design hierarchy, unidirectional data flow, and FSM state modeling." 
            : "Modern arayüzlerin Lego blokları. Atomic Design hiyerarşisi, yerel/global/sunucu durum ayrıştırması ve UI = f(State) prensibi."
          }
          badge="Frontend Architecture"
          color="#38bdf8"
          illustration={
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px', width: '200px' }}>
              {['#38bdf8', '#10b981', '#f59e0b', '#a855f7'].map((c, i) => (
                <motion.div
                  key={i}
                  animate={{ scale: [1, 1.08, 1] }}
                  transition={{ duration: 2, delay: i * 0.3, repeat: Infinity }}
                  style={{ height: '70px', background: 'rgba(255,255,255,0.03)', border: `2px solid ${c}`, borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                  <Box size={24} color={c} />
                </motion.div>
              ))}
            </div>
          }
          features={[
            { icon: <LayoutGrid />, title: isEn ? 'Atomic Design' : 'Atomic Design', desc: isEn ? 'Atoms -> Molecules -> Organisms -> Templates -> Pages.' : 'Atomlardan sayfalara katmanlı ve yeniden kullanılabilir bileşenler.' },
            { icon: <Database />, title: isEn ? 'State Categorization' : 'Durum Ayrıştırması', desc: isEn ? 'Local, Shared Client, Server Cache, and URL state boundaries.' : 'Local, Global, Server ve URL durumlarının doğru izole edilmesi.' },
            { icon: <Activity />, title: isEn ? 'FSM Modeling' : 'FSM Durum Makineleri', desc: isEn ? 'UI = f(State) modeling eliminating impossible error states.' : 'İmkansız durum bug\'larını engelleyen deterministik render döngüsü.' }
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
            backdropFilter: 'blur(10px)',
            flexWrap: 'wrap',
            position: 'sticky',
            top: '80px',
            zIndex: 30
          }}>
            {[
              { id: 'atomic', label: isEn ? 'Atomic Design (CDD)' : 'Atomic Design (CDD)', icon: <LayoutGrid size={18} /> },
              { id: 'statemachine', label: isEn ? 'State Categorization' : 'Durum Kategorizasyonu', icon: <Database size={18} /> },
              { id: 'reactive', label: isEn ? 'State-Driven & FSM' : 'Durum Odaklı UI (FSM)', icon: <Activity size={18} /> },
              { id: 'simulation', label: isEn ? 'Live Lifecycle Lab' : 'Render & State Simülatörü', icon: <Box size={18} /> }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => scrollToSection(tab.id as any)}
                style={{
                  padding: '10px 24px',
                  borderRadius: '18px',
                  border: 'none',
                  background: activeTab === tab.id ? '#38bdf8' : 'transparent',
                  color: activeTab === tab.id ? '#020617' : 'rgba(255,255,255,0.5)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontWeight: 700,
                  fontSize: '0.9rem',
                  transition: 'all 0.3s ease',
                  boxShadow: activeTab === tab.id ? '0 4px 12px rgba(56, 189, 248, 0.3)' : 'none'
                }}
              >
                {tab.icon} {tab.label}
              </button>
            ))}
          </div>
        </ArchHero>

        <div className="container" style={{ marginTop: '2rem' }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "4rem" }}>
          <div id="atomic" style={{ scrollMarginTop: "100px" }}>
            <ComponentAtomicDesignTab />
          </div>
          <div id="statemachine" style={{ scrollMarginTop: "100px" }}>
            <ComponentStateManagementTab />
          </div>
          <div id="reactive" style={{ scrollMarginTop: "100px" }}>
            <StateDrivenArchitectureTab />
          </div>
          <div id="simulation" style={{ scrollMarginTop: "100px" }}>
            <ComponentLifecycleSimulationTab />
          </div>
        </div>
        </div>

        <section style={{ padding: '4rem 0', background: 'rgba(0,0,0,0.3)', borderTop: '1px solid rgba(255,255,255,0.05)', marginTop: '4rem' }}>
          <div className="container" style={{ textAlign: 'center' }}>
             <div style={{ display: 'inline-flex', alignItems: 'center', gap: '1rem', background: 'rgba(56, 189, 248, 0.1)', padding: '1rem 2rem', borderRadius: '12px', border: '1px solid rgba(56, 189, 248, 0.2)' }}>
                <BookOpen size={24} color="#38bdf8" />
                <div style={{ textAlign: 'left' }}>
                  <div style={{ fontSize: '0.8rem', color: '#7dd3fc', textTransform: 'uppercase' }}>
                    {isEn ? "Core Reference Literature" : "Temel Kaynak"}
                  </div>
                  <div style={{ color: 'white', fontWeight: 600 }}>Atomic Design (Brad Frost) & Component-Driven UI Development</div>
                </div>
             </div>
          </div>
        </section>
      </motion.div>
    </>
  );
};

export default ComponentDrivenPage;
