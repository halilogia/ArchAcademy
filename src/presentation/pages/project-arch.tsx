import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Layers, Brain, Palette } from 'lucide-react';
import SEO from '../components/SEO';
import { ProjectArchitectureTab } from '../components/projectarch/ProjectArchitectureTab';
import { ProjectBrainTab } from '../components/projectarch/ProjectBrainTab';
import { ProjectDesignTab } from '../components/projectarch/ProjectDesignTab';

const ProjectPage: React.FC = () => {
  const { i18n } = useTranslation();
  const isEn = (i18n.resolvedLanguage || i18n.language || 'tr').startsWith('en');
  const location = useLocation();

  const [activeTab, setActiveTab] = useState<'architecture' | 'brain' | 'design'>(() => {
    const params = new URLSearchParams(location.search);
    const tab = params.get('tab');
    if (tab === 'design') return 'design';
    if (tab === 'brain') return 'brain';
    return 'architecture';
  });

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tab = params.get('tab');
    if (tab === 'design') setActiveTab('design');
    else if (tab === 'brain') setActiveTab('brain');
    else setActiveTab('architecture');
  }, [location.search]);

  const TabSwitcher = () => (
    <div style={{ display: 'inline-flex', background: 'rgba(255,255,255,0.05)', padding: '6px', borderRadius: '16px', border: '1px solid var(--glass-border)', marginBottom: '2rem', gap: '8px', flexWrap: 'wrap' }}>
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
        <Layers size={18} /> {isEn ? "Project Architecture" : "Proje Mimarisi"}
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
        <Brain size={18} /> {isEn ? "Neural Map" : "Sinir Ağı"}
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
        <Palette size={18} /> {isEn ? "Design System" : "Tasarım Sistemi"}
      </button>
    </div>
  );

  return (
    <>
      <SEO
        title={isEn ? "Project Architecture & Living Blueprint | ArchAcademy" : "Proje Mimarisi ve Yaşayan Mimari Çizim | ArchAcademy"}
        description={isEn 
          ? "Deep dive into ArchAcademy's internal architecture: Lean Clean Architecture (LCA), ArchBrain 3D Neural Map, ADRs, and Design System." 
          : "ArchAcademy projesinin iç mimarisi, Lean Clean Architecture (LCA), ArchBrain 3D bağımlılık haritası ve tasarım sistemi."
        }
        keywords="project architecture, lean clean architecture, archbrain neural map, adr architecture decision records, design system"
        canonicalUrl="/project-arch"
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        style={{ background: 'var(--bg-dark)', minHeight: '100vh' }}
      >
        <div style={{ minHeight: '800px' }}>
          <AnimatePresence mode="wait">
            {activeTab === 'architecture' && (
              <ProjectArchitectureTab key="arch" tabSwitcher={<TabSwitcher />} />
            )}
            {activeTab === 'brain' && (
              <ProjectBrainTab key="brain" tabSwitcher={<TabSwitcher />} />
            )}
            {activeTab === 'design' && (
              <ProjectDesignTab key="design" tabSwitcher={<TabSwitcher />} />
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </>
  );
};

export default ProjectPage;
