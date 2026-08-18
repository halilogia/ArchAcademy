import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ArchHero from '../components/ArchHero';
import { useProgress } from '../context/ProgressContext';
import { 
  Map, 
  Share2, 
  Box, 
  Layout, 
  ArrowRightLeft, 
  GitCompare, 
  Cpu,
  Route,
  Navigation,
  Milestone,
  Network
} from 'lucide-react';

const MVVMCPage = () => {
    const { completeStep } = useProgress();
    const [activeTab, setActiveTab] = useState<'concepts' | 'comparison'>('comparison');

  useEffect(() => {
    const timer = setTimeout(() => {
      completeStep('/mvvm-c');
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const illu = (
    <div style={{ position: 'relative', width: '350px', height: '350px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      
      {/* Coordinator (Top Hub) */}
      <motion.div
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        style={{ width: '160px', height: '80px', background: 'var(--glass)', border: '2px solid #3b82f6', borderRadius: '18px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', zIndex: 10, boxShadow: '0 10px 40px rgba(59, 130, 246, 0.25)', marginBottom: '3rem' }}
      >
        <Map size={32} color="#3b82f6" />
        <span style={{ fontSize: '0.75rem', fontWeight: 900, marginTop: '6px', color: 'white', letterSpacing: '1px' }}>COORDINATOR</span>
      </motion.div>

      {/* Connection Lines */}
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '200px', height: '100px', pointerEvents: 'none' }}>
         <svg width="100%" height="100%" viewBox="0 0 200 100" style={{ overflow: 'visible' }}>
             <path d="M 100 0 L 30 100" stroke="#3b82f6" strokeWidth="2" strokeDasharray="6,4" opacity="0.5" fill="none" />
             <path d="M 100 0 L 170 100" stroke="#3b82f6" strokeWidth="2" strokeDasharray="6,4" opacity="0.5" fill="none" />
         </svg>
      </div>

       <div style={{ display: 'flex', gap: '2rem' }}>
          {/* Module A */}
          <motion.div
            animate={{ scale: [1, 1.02, 1] }}
            transition={{ duration: 4, repeat: Infinity, delay: 0.5 }}
            style={{ width: '110px', height: '110px', background: 'var(--glass)', border: '1px solid #3b82f6', borderRadius: '18px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', opacity: 0.8 }}
          >
             <Layout size={24} color="#60a5fa" style={{ marginBottom: '8px' }} />
             <div style={{ fontSize: '0.7rem', fontWeight: 800, color: '#93c5fd' }}>VIEW</div>
             <div style={{ width: '20px', height: '2px', background: 'rgba(255,255,255,0.2)', margin: '6px 0' }} />
             <Cpu size={20} color="#60a5fa" />
             <div style={{ fontSize: '0.7rem', fontWeight: 800, color: '#93c5fd' }}>VM</div>
          </motion.div>

           {/* Module B */}
           <motion.div
            animate={{ scale: [1, 1.02, 1] }}
            transition={{ duration: 4, repeat: Infinity, delay: 1 }}
            style={{ width: '110px', height: '110px', background: 'var(--glass)', border: '1px solid #3b82f6', borderRadius: '18px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', opacity: 0.8 }}
          >
             <Layout size={24} color="#60a5fa" style={{ marginBottom: '8px' }} />
             <div style={{ fontSize: '0.7rem', fontWeight: 800, color: '#93c5fd' }}>VIEW</div>
             <div style={{ width: '20px', height: '2px', background: 'rgba(255,255,255,0.2)', margin: '6px 0' }} />
             <Cpu size={20} color="#60a5fa" />
             <div style={{ fontSize: '0.7rem', fontWeight: 800, color: '#93c5fd' }}>VM</div>
          </motion.div>
       </div>
    </div>
  );

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ paddingBottom: '100px' }}>
      <ArchHero 
        title="MVVM-C"
        subtitle="Coordinator Pattern"
        description="Architecture that solves the biggest shortcoming of classic MVVM—'Who is responsible for navigation?'—by delegating screen transitions and flow logic to dedicated classes called Coordinators."
        badge="Scalable & Navigation"
        color="#3b82f6"
        illustration={illu}
        features={[
            { icon: <Route />, title: "Coordinator", desc: "All navigation logic (push, pop, modal) lives here." },
            { icon: <Layout />, title: "View Freedom", desc: "View