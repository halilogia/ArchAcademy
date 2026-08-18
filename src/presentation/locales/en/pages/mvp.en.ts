import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ArchHero from '../components/ArchHero';
import { 
  Layout, 
  UserCheck, 
  Activity, 
  ArrowRightLeft, 
  CheckCircle2, 
  XCircle, 
  GitCompare, 
  Box, 
  Database,
  Monitor,
  Mic2,
  Settings,
  Zap,
  RefreshCw,
} from 'lucide-react';

const MVPPage = () => {
    const [activeTab, setActiveTab] = useState<'concepts' | 'comparison'>('comparison');

  const illu = (
    <div style={{ position: 'relative', width: '350px', height: '350px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between' }}>
      {/* View (Passive) */}
      <motion.div
        animate={{ opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 4, repeat: Infinity }}
        style={{ width: '120px', height: '75px', background: 'var(--glass)', border: '1px solid #34d399', borderRadius: '15px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', opacity: 0.8 }}
      >
        <Layout size={24} color="#34d399" />
        <span style={{ fontSize: '0.65rem', fontWeight: 800, marginTop: '4px', color: 'white' }}>PASSIVE VIEW</span>
      </motion.div>

      {/* Dynamic Connector */}
      <div style={{ height: '40px', width: '2px', background: 'rgba(52, 211, 153, 0.2)', position: 'relative' }}>
        <motion.div 
          animate={{ top: ['0%', '100%'], opacity: [0, 1, 0] }}
          transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
          style={{ position: 'absolute', width: '6px', height: '6px', background: '#34d399', borderRadius: '50%', left: '-2px' }}
        />
        <motion.div 
          animate={{ top: ['100%', '0%'], opacity: [0, 1, 0] }}
          transition={{ duration: 1.2, repeat: Infinity, ease: "linear", delay: 0.6 }}
          style={{ position: 'absolute', width: '6px', height: '6px', background: '#34d399', borderRadius: '50%', left: '-2px' }}
        />
      </div>

      {/* Presenter (Hub) */}
      <motion.div
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 3, repeat: Infinity }}
        style={{ width: '150px', height: '100px', background: 'var(--glass)', border: '3px solid #34d399', borderRadius: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', zIndex: 10, boxShadow: '0 0 40px rgba(52, 211, 153, 0.3)' }}
      >
        <UserCheck size={32} color="#34d399" />
        <span style={{ fontSize: '0.8rem', fontWeight: 950, marginTop: '6px', color: 'white' }}>PRESENTER</span>
      </motion.div>

      {/* Dynamic Connector */}
      <div style={{ height: '40px', width: '2px', background: 'rgba(52, 211, 153, 0.2)', position: 'relative' }}>
        <motion.div 
          animate={{ top: ['0%', '100%'], opacity: [0, 1, 0] }}
          transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
          style={{ position: 'absolute', width: '6px', height: '6px', background: '#34d399', borderRadius: '50%', left: '-2px' }}
        />
        <motion.div 
          animate={{ top: ['100%', '0%'], opacity: [0, 1, 0] }}
          transition={{ duration: 1.2, repeat: Infinity, ease: "linear", delay: 0.6 }}
          style={{ position: 'absolute', width: '6px', height: '6px', background: '#34d399', borderRadius: '50%', left: '-2px' }}
        />
      </div>

      {/* Model */}
      <div style={{ width: '120px', height: '75px', background: 'var(--glass)', border: '1px solid #34d399', borderRadius: '15px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <Activity size={24} color="#34d399" />
        <span style={{ fontSize: '0.65rem', fontWeight: 800, marginTop: '4px', color: 'white' }}>MODEL</span>
      </div>
    </div>
  );

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ paddingBottom: '100px' }}>
      <ArchHero 
      title="MVP"
      subtitle="Strict Separation"
      description="Architecture that routes all View-Model communication through Presenter, making interface fully passive (Passive View) and maximizing testability."
      badge="Interaction Pattern"
      color="#34d399"
      illustration={illu}
      features={[
        { icon: <UserCheck />, title: 'Presenter', desc: 'Interface manager. Receives events from View, updates Model, tells View what to do.' },
        { icon: <Layout />, title: 'Passive View', desc: 'Dumb interface layer that cannot make decisions on its own.' },
        { icon: <Activity />, title: 'Testability', desc: '100% unit testing without UI framework dependency.' }
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
            { id: 'comparison', label: 'MVP vs MVVM', icon: <GitCompare size={18} /> },
            { id: 'concepts', label: 'Core Concepts', icon: <Box size={18} /> }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              style={{
                padding: '10px 24px',
                borderRadius: '18px',
                border: 'none',
                background: activeTab === tab.id ? '#34d399' : 'transparent',
                color: activeTab === tab.id ? '#020617' : 'rgba(255,255,255,0.5)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontWeight: 700,
                fontSize: '0.9rem',
                transition: 'all 0.3s ease',
                boxShadow: activeTab === tab.id ? '0 4px 12px rgba(52, 211, 153, 0.3)' : 'none'
              }}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>
      </ArchHero>

      <div className="container" style={{ marginTop: '2rem' }}>
        <AnimatePresence mode="wait">
          {activeTab === 'comparison' && (
            <motion.div
              key="comparison"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <h2 className="section-title text-center" style={{ marginBottom: '3rem' }}>
                Sibling Rivalry: <span className="gradient-text" style={{ backgroundImage: 'linear-gradient(to right, #34d399, #10b981)' }}>MVP vs MVVM</span>
              </h2>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: '2rem', alignItems: 'st