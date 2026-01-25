import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Hero from '../components/Hero';
import Theory from '../components/Theory';
import UncleBobStructure from '../components/UncleBobStructure';
import ArchitectureFlow from '../components/ArchitectureFlow';
import Practical from '../components/Practical';
import ArchitecturalTruths from '../components/ArchitecturalTruths';
import ScreamingSection from '../components/ScreamingSection';
import { useProgress } from '../../context/ProgressContext';
import { Layers, Volume2 } from 'lucide-react';

const CleanArchPage = () => {
  const { completeStep } = useProgress();
  const [activeTab, setActiveTab] = useState<'clean' | 'scream'>('clean');

  useEffect(() => {
    const timer = setTimeout(() => {
      completeStep('/clean-arch');
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Hero mode={activeTab}>
        <div style={{
          background: 'rgba(15, 23, 42, 0.6)',
          padding: '6px',
          borderRadius: '24px',
          display: 'flex',
          gap: '4px',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          backdropFilter: 'blur(10px)',
          boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
          width: 'fit-content',
          marginTop: '1rem'
        }}>
          <button
            onClick={() => setActiveTab('clean')}
            style={{
              padding: '10px 24px',
              borderRadius: '18px',
              border: 'none',
              background: activeTab === 'clean' ? '#3b82f6' : 'transparent',
              color: activeTab === 'clean' ? 'white' : 'rgba(255,255,255,0.5)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              fontWeight: 700,
              transition: 'all 0.3s ease'
            }}
          >
            <Layers size={18} /> Clean
          </button>
          <button
            onClick={() => setActiveTab('scream')}
            style={{
              padding: '10px 24px',
              borderRadius: '18px',
              border: 'none',
              background: activeTab === 'scream' ? '#3b82f6' : 'transparent',
              color: activeTab === 'scream' ? 'white' : 'rgba(255,255,255,0.5)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              fontWeight: 700,
              transition: 'all 0.3s ease'
            }}
          >
            <Volume2 size={18} /> Scream
          </button>
        </div>
      </Hero>

      <AnimatePresence mode="wait">
        {activeTab === 'clean' ? (
          <motion.div
            key="clean-view"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <Theory />
            <UncleBobStructure />
            <ArchitecturalTruths />
            <Practical />
            <ArchitectureFlow />
          </motion.div>
        ) : (
          <motion.div
            key="scream-view"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <ScreamingSection />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default CleanArchPage;
