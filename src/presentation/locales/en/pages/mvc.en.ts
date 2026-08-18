import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ArchHero from '../components/ArchHero';
import { 
  Layout, 
  Database, 
  Settings, 
  ArrowRightLeft, 
  CheckCircle2, 
  XCircle, 
  GitCompare,
  Monitor,
  Code2,
  RefreshCw,
  Zap,
  Box,
  Brain
} from 'lucide-react';

const MVCPage = () => {
  const [activeTab, setActiveTab] = useState<'concepts' | 'comparison'>('comparison');

  const illu = (
    <div style={{ position: 'relative', width: '350px', height: '350px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between' }}>
      {/* View */}
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        style={{ width: '130px', height: '85px', background: 'var(--glass)', border: '2px solid #ec4899', borderRadius: '18px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', zIndex: 3, boxShadow: '0 10px 30px rgba(236, 72, 153, 0.2)' }}
      >
        <Layout size={28} color="#ec4899" />
        <span style={{ fontSize: '0.75rem', fontWeight: 900, marginTop: '6px', color: 'white' }}>VIEW</span>
      </motion.div>

      {/* Dynamic Connector Down */}
      <div style={{ height: '40px', width: '2px', background: 'rgba(236, 72, 153, 0.2)', position: 'relative' }}>
        <motion.div 
          animate={{ top: ['0%', '100%'], opacity: [0, 1, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          style={{ position: 'absolute', width: '6px', height: '6px', background: '#ec4899', borderRadius: '50%', left: '-2px', filter: 'blur(1px)' }}
        />
      </div>

      {/* Controller / ViewModel */}
      <motion.div
        animate={{ scale: [1, 1.03, 1] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        style={{ width: '140px', height: '90px', background: 'var(--glass)', border: '2px solid #ec4899', borderRadius: '18px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', zIndex: 3, boxShadow: '0 0 40px rgba(236, 72, 153, 0.15)' }}
      >
        <Settings size={28} color="#ec4899" className="rotate-slow" />
        <span style={{ fontSize: '0.75rem', fontWeight: 900, marginTop: '6px', color: 'white' }}>CONTROLLER</span>
      </motion.div>

      {/* Dynamic Connector Up & Down */}
      <div style={{ height: '40px', width: '2px', background: 'rgba(236, 72, 153, 0.2)', position: 'relative' }}>
        <motion.div 
          animate={{ bottom: ['0%', '100%'], opacity: [0, 1, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear", delay: 0.75 }}
          style={{ position: 'absolute', width: '6px', height: '6px', background: '#ec4899', borderRadius: '50%', left: '-2px', filter: 'blur(1px)' }}
        />
      </div>

      {/* Model */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        style={{ width: '130px', height: '85px', background: 'var(--glass)', border: '2px solid #ec4899', borderRadius: '18px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', zIndex: 3, boxShadow: '0 -10px 30px rgba(236, 72, 153, 0.2)' }}
      >
        <Database size={28} color="#ec4899" />
        <span style={{ fontSize: '0.75rem', fontWeight: 900, marginTop: '6px', color: 'white' }}>MODEL</span>
      </motion.div>
      <style>{`
        .rotate-slow { animation: spin 8s linear infinite; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ paddingBottom: '100px' }}>
      <ArchHero 
        title="MVC"
        subtitle="Classic Pattern"
        description="Most rooted architectural pattern in software world. Separates responsibilities with Model, View, Controller trio. Ancestor of MVVM and other modern UI patterns."
        badge="Architectural Pattern"
        color="#ec4899"
        illustration={illu}
        features={[
            { icon: <Layout />, title: 'View', desc: 'UI layer user sees.' },
            { icon: <Brain />, title: 'Controller', desc: 'Brain managing workflow, directing traffic between Model and View.' },
            { icon: <Database />, title: 'Model', desc: 'Purest layer where data and business logic live.' }
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
            { id: 'comparison', label: 'MVC vs MVVM', icon: <GitCompare size={18} /> },
            { id: 'concepts', label: 'Core Concepts', icon: <Box size={18} /> }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
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
              {tab.icon}