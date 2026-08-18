import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Layers, Palette, Sparkles, Wind, Brain, Activity, Layout, Shield, Cpu, Share2, Network, Database } from 'lucide-react';
import ProjectHero from '../../../components/ProjectHero';
import ProjectStructure from '../../../components/ProjectStructure';
import ProjectDependency from '../../../components/ProjectDependency';
import ProjectTechStack from '../../../components/ProjectTechStack';
import ProjectDecisionRecords from '../../../components/ProjectDecisionRecords';
import ProjectDesignSystem from '../../../components/ProjectDesignSystem';
import ArchHero from '../../../components/ArchHero';
import { useLocation } from 'react-router-dom';

const ArchBrainContent = ({ TabSwitcher }: { TabSwitcher: React.FC }) => {
  const nodes = [
    { id: 'Domain', type: 'core', root: true, icon: <Shield size={20} />, color: '#ef4444', desc: 'Business rules and entities' },
    { id: 'UseCases', type: 'core', parent: 'Domain', icon: <Activity size={20} />, color: '#f59e0b', desc: 'Application logic and scenarios' },
    { id: 'Presentation', type: 'adapter', icon: <Layout size={20} />, color: '#3b82f6', desc: 'UI components and pages' },
    { id: 'Infrastructure', type: 'adapter', icon: <Database size={20} />, color: '#10b981', desc: 'External services, API and Database' },
    { id: 'Components', type: 'sub', parent: 'Presentation', icon: <Cpu size={16} />, color: '#60a5fa', desc: 'Reusable atomic pieces' },
    { id: 'Data', type: 'sub', parent: 'Infrastructure', icon: <Network size={16} />, color: '#34d399', desc: 'Raw data and models' }
  ];

  return (
    <>
      <ArchHero 
        title="ArchBrain" 
        subtitle="Neural Map"
        description="Explore all project dependencies and neural networks in 3D space. Monitor the heart of the architecture in real time."
        badge="Autonomous Visualization"
        color="#06b6d4"
        illustration={
           <div style={{ position: 'relative', width: '350px', height: '350px', perspective: '1000px' }}>
              <motion.div
                animate={{ rotateY: 360 }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                style={{ width: '100%', height: '100%', position: 'relative', transformStyle: 'preserve-3d' }}
              >
                 {nodes.map((node, i) => (
                   <motion.div
                    key={node.id}
                    whileHover={{ scale: 1.2, z: 50 }}
                    style={{
                      position: 'absolute',
                      left: '50%',
                      top: '50%',
                      transform: `translate(-50%, -50%) rotateY(${i * 60}deg) translateZ(150px)`,
                      width: '60px',
                      height: '60px',
                      borderRadius: '15px',
                      background: 'rgba(15, 23, 42, 0.8)',
                      border: `2px solid ${node.color}`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: node.color,
                      boxShadow: `0 0 20px ${node.color}33`,
                      backdropFilter: 'blur(10px)',
                      zIndex: 10
                    }}
                   >
                      {node.icon}
                   </motion.div>
                 ))}
                 <div style={{ position: 'absolute', inset: 0, opacity: 0.2 }}>
                    <svg width="100%" height="100%" viewBox="0 0 350 350">
                       <circle cx="175" cy="175" r="150" fill="none" stroke="rgba(6, 182, 212, 0.3)" strokeWidth="1" strokeDasharray="5,5" />
                    </svg>
                 </div>
              </motion.div>
           </div>
        }
        features={[
          { icon: <Brain />, title: 'Real-time Scanner', desc: 'Scans entire file system and generates real-time dependency graph.' },
          { icon: <Share2 />, title: 'Dependency Tracer', desc: 'When a file is selected, colors all vessels connected to it.' },
          { icon: <Activity />, title: 'Health Score', desc: 'Analyzes potential risks and complexity in architecture.' }
        ]}
      >
        <TabSwitcher />
      </ArchHero>

      <section style={{ padding: '80px 0', borderTop: '1px solid var(--glass-border)', background: 'rgba(0,0,0,0.2)' }}>
        <div className="container">
           <div className="glass-card" style={{ height: '700px', background: '#000', borderRadius: '30px', position: 'relative', overflow: 'hidden' }}>
              <iframe 
                src="/arch-brain-report.html" 
                style={{ width: '100%', height: '100%', border: 'none', background: '#020617' }} 
                title="ArchBrain neural report"
              />
           </div>
        </div>
      </section>
    </>
  );
};

const ProjectPage = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(() => {
    const params = new URLSearchParams(location.search);
    const tab = params.get('tab');
    if (tab === 'design') return 'design';
    if (tab === 'brain') return 'brain';
    return 'architecture';
  });

  React.useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tab = params.get('tab');
    if (tab === 'design') setActiveTab('design');
    else if (tab === 'brain') setActiveTab('brain');
    else setActiveTab('architecture');
  }, [location.search]);

  const TabSwitcher = () => (
    <div style={{ display: 'inline-flex', background: 'rgba(255,255,255,0.05)', padding: '6px', borderRadius: '16px', border: '1px solid var(--glass-border)', marginBottom: '2rem', gap: '8px' }}>
        <button
          onClick={() => setActiveTab('architecture')}
          style={{
            padding: '12px 30px',
            borderRadius: '12px',
            background: activeTab === 'architecture' ? 'var(--primary)' : 'transparent',
            color: activeTab === 'architecture' ? 'white' : 'var(--text-secondary)',
            border: 'none',
            fontWeight: 700,
            cursor: 'pointer',
            transition: 'all 0.3s',
            display: 'flex', alignItems: 'center', gap: '8px'
          }}
        >
          <Layers size={18} /> Project Architecture
        </button>
        <button
          onClick={() => setActiveTab('brain')}
          style={{
            padding: '12px 30px',
            borderRadius: '12px',
            background: activeTab === 'brain' ? '#06b6d4' : 'transparent',
            color: activeTab === 'brain' ? 'white' : 'var(--text-secondary)',
            border: 'none',
            fontWeight: 700,
            cursor: 'pointer',
            transition: 'all 0.3s',
            display: 'flex', alignItems: 'center', gap: '8px'
          }}
        >
          <Brain size={18} /> Neural Map
        </button>
        <button
          onClick={() => setActiveTab('design')}
          style={{
            padding: '12px 30px',
            borderRadius: '12px',
            background: activeTab === 'design' ? '#a855f7' : 'transparent',
            color: activeTab === 'design' ? 'white' : 'var(--text-secondary)',
            border: 'none',
            fontWeight: 700,
            cursor: 'pointer',
            transition: 'all 0.3s',
            display: 'flex', alignItems: 'center', gap: '8px'
          }}
        >
          <Palette size={18} /> Design System
        </button>
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{ background: 'var(--bg-dark)', minHeight: '100vh' }}
    >
      <div style={{ minHeight: '800px' }}>
        <AnimatePresence mode="wait">
          {activeTab === 'architecture' ? (
            <motion.div 
              key="arch" 
              initial={{ opacity: 0, x: -20 }} 
              animate={{ opacity: 1, x: 0 }} 
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
            >
              <ProjectHero>
                <TabSwitcher />
              </ProjectHero>
              
              <ProjectDecisionRecords />
              <ProjectDependency />
              <ProjectStructure />
              
              {/* Architect's Harmony Section */}
              <section style={{ padding: '100px 0', borderTop: '1px solid var(--glass-border)', background: 'rgba(0,0,0,0.2)' }}>
                <div className="container">
                  <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
                    <h2 className="gradient-text" style={{ fontSize: '3rem', fontWeight: 800 }}>LCA Harmony</h2>
                    <p style={{ color: 'var(--text-secondary)' }}>One architecture, unshakeable discipline: <strong>Eliminate Waste, Build Quality.</strong></p>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '3rem' }}>
                    <div className="glass-card" style={{ padding: '3rem', borderTop: '4px solid var(--primary)' }}>
                        <h3 style={{ color: 'var(--primary)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                          <div style={{ padding: '8px', background: 'rgba(59, 130, 246, 0.1)', borderRadius: '10px' }}>01</div>
                          Lean Clean Architecture (LCA)
                        </h3>
                        <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8 }}>
                          It is the heart of our architecture. It combines the layer discipline of Clean Architecture with the Lean principle of 'eliminate waste'. Only required UseCases are kept in their pure