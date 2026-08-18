import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ArchHero from '../components/ArchHero';
import { useProgress } from '../context/ProgressContext';
import { 
  ShieldAlert, 
  Map, 
  Database, 
  Layout, 
  Share2, 
  Cpu, 
  Route as RouterIcon,
  ShieldCheck,
  Zap,
  Box,
  GitCompare,
  ArrowRight
} from 'lucide-react';

const VIPERPage = () => {
  const { completeStep } = useProgress();
    const [activeTab, setActiveTab] = useState<'anatomy' | 'comparison'>('comparison');

  useEffect(() => {
    const timer = setTimeout(() => {
      completeStep('/viper');
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const illu = (
    <div style={{ position: 'relative', width: '380px', height: '380px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      
      {/* Presenter (Center) */}
      <motion.div
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 3, repeat: Infinity }}
        style={{ width: '100px', height: '100px', background: 'var(--glass)', border: '2px solid #10b981', borderRadius: '50%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', zIndex: 10, boxShadow: '0 0 30px rgba(16, 185, 129, 0.3)' }}
      >
        <Share2 size={32} color="#10b981" />
        <span style={{ fontSize: '0.6rem', fontWeight: 900, marginTop: '4px', color: 'white' }}>PRESENTER</span>
      </motion.div>

      {/* View (Left) */}
       <motion.div style={{ position: 'absolute', left: 0, top: '50%', transform: 'translateY(-50%)', textAlign: 'center' }}>
           <div style={{ width: '80px', height: '80px', background: 'rgba(59, 130, 246, 0.1)', border: '1px solid #3b82f6', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 10px auto' }}>
              <Layout size={24} color="#3b82f6" />
           </div>
           <span style={{ fontSize: '0.7rem', fontWeight: 800, color: '#93c5fd' }}>VIEW</span>
       </motion.div>

       {/* Interactor (Right) */}
       <motion.div style={{ position: 'absolute', right: 0, top: '50%', transform: 'translateY(-50%)', textAlign: 'center' }}>
           <div style={{ width: '80px', height: '80px', background: 'rgba(236, 72, 153, 0.1)', border: '1px solid #ec4899', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 10px auto' }}>
              <Cpu size={24} color="#ec4899" />
           </div>
           <span style={{ fontSize: '0.7rem', fontWeight: 800, color: '#fca5a5' }}>INTERACTOR</span>
       </motion.div>

       {/* Entity (Far Right - connected to Interactor) */}
       {/* Visual simplification: Just showing Entity floating near Interactor */}
       <motion.div animate={{ x: [0, 5, 0] }} transition={{ duration: 2, repeat: Infinity }} style={{ position: 'absolute', right: -20, top: '20%', background: '#0f172a', border: '1px solid #f97316', padding: '6px', borderRadius: '8px', zIndex: 5 }}>
          <Database size={14} color="#f97316" />
       </motion.div>

       {/* Router (Bottom) */}
       <motion.div style={{ position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)', textAlign: 'center' }}>
           <div style={{ width: '80px', height: '80px', background: 'rgba(245, 158, 11, 0.1)', border: '1px solid #f59e0b', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 10px auto' }}>
              <RouterIcon size={24} color="#f59e0b" />
           </div>
           <span style={{ fontSize: '0.7rem', fontWeight: 800, color: '#fcd34d' }}>ROUTER</span>
       </motion.div>

       {/* Connectors */}
       <svg style={{ position: 'absolute', width: '100%', height: '100%', pointerEvents: 'none', zIndex: 1 }}>
          <line x1="90" y1="190" x2="140" y2="190" stroke="#10b981" strokeWidth="2" strokeDasharray="4" opacity="0.5" />
          <line x1="240" y1="190" x2="290" y2="190" stroke="#10b981" strokeWidth="2" strokeDasharray="4" opacity="0.5" />
          <line x1="190" y1="240" x2="190" y2="290" stroke="#10b981" strokeWidth="2" strokeDasharray="4" opacity="0.5" />
       </svg>
    </div>
  );

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ paddingBottom: '100px' }}>
      <ArchHero 
        title="VIPER"
        subtitle="Clean iOS Architecture"
        description="The strictest and most disciplined implementation of Clean Architecture principles in the iOS/Mobile world. Each component has a single responsibility (Single Responsibility)."
        badge="Enterprise Standard"
        color="#10b981"
        illustration={illu}
        features={[
          { icon: <ShieldCheck />, title: "Isolation", desc: "Each letter (V-I-P-E-R) lives in its own file. Dependencies are managed through interfaces." },
          { icon: <Zap />, title: "Testability", desc: "Because business logic is pure inside the Interactor, it is 100% testable without UI." },
          { icon: <Map />, title: "Routing", desc: "Navigation logic (Router/Wireframe) is completely decoupled from the screen." }
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
            { id: 'comparison', label: 'VIPER vs MVVM', icon: <GitCompare size={18} /> },
            { id: 'anatomy', label: 'Anatomy', icon: <Box size={18} /> }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              style={{
                padding: '10px 24px',
                borderRadius: '18px',
                border: 'none',
                background: activeTab === tab.id ? '#10b981' : 'transparent',
                color: activeTab === tab.id ? '#020617' : 'rgba(255,255,255,0.5)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontWeight: 700,
                fontSize: '0.