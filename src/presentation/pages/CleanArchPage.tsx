import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Hero from '../components/Hero';
import Theory from '../components/Theory';
import UncleBobStructure from '../components/UncleBobStructure';
import ArchitectureFlow from '../components/ArchitectureFlow';
import Practical from '../components/Practical';
import ArchitecturalTruths from '../components/ArchitecturalTruths';
import ScreamingSection from '../components/ScreamingSection';
import FeatureVsLayerDetail from '../components/FeatureVsLayerDetail';
import { useProgress } from '../../context/ProgressContext';
import { Layers, Volume2, FolderTree, Zap } from 'lucide-react';

const CleanArchPage = () => {
  const { completeStep } = useProgress();
  const [activeTab, setActiveTab] = useState<'clean' | 'scream' | 'layer' | 'feature'>('clean');

  useEffect(() => {
    const timer = setTimeout(() => {
      completeStep('/clean-arch');
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  // Map 4 tabs directly to 4 Hero modes
  const heroMode = activeTab === 'layer' ? 'classic' : activeTab === 'feature' ? 'modern' : activeTab;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Hero mode={heroMode}>
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
          marginTop: '1rem',
          flexWrap: 'wrap'
        }}>
          {[
            { id: 'clean', label: 'Principles', icon: <Layers size={16} /> },
            { id: 'scream', label: 'Intent', icon: <Volume2 size={16} /> },
            { id: 'layer', label: 'Classic', icon: <FolderTree size={16} /> },
            { id: 'feature', label: 'Modern', icon: <Zap size={16} /> }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              style={{
                padding: '10px 20px',
                borderRadius: '18px',
                border: 'none',
                background: activeTab === tab.id ? '#3b82f6' : 'transparent',
                color: activeTab === tab.id ? 'white' : 'rgba(255,255,255,0.5)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontWeight: 700,
                fontSize: '0.85rem',
                transition: 'all 0.3s ease'
              }}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>
      </Hero>

      <AnimatePresence mode="wait">
        {activeTab === 'clean' && (
          <motion.div key="clean" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
            <Theory />
            <UncleBobStructure />
            <ArchitecturalTruths />
            <Practical />
            <ArchitectureFlow />
          </motion.div>
        )}
        {activeTab === 'scream' && (
          <motion.div key="scream" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
            <ScreamingSection />
          </motion.div>
        )}
        {(activeTab === 'layer' || activeTab === 'feature') && (
          <motion.div key="strategy" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
            <FeatureVsLayerDetail forcedMode={activeTab === 'layer' ? 'layer' : 'feature'} />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default CleanArchPage;
