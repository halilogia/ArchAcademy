import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import SEO from '../components/SEO';
import { RoadmapHero } from '../components/roadmap/RoadmapHero';
import { RoadmapCurriculumTab } from '../components/roadmap/RoadmapCurriculumTab';
import { RoadmapProductionTab } from '../components/roadmap/RoadmapProductionTab';
import { RoadmapImpactFooter } from '../components/roadmap/RoadmapImpactFooter';

const RoadmapPage: React.FC = () => {
  const { i18n } = useTranslation();
  const isEn = (i18n.resolvedLanguage || i18n.language || 'tr').startsWith('en');
  const [activeTab, setActiveTab] = useState<'career' | 'production'>('career');

  return (
    <>
      <SEO
        title={isEn ? "Software Architect Career Roadmap | ArchAcademy" : "Yazılım Mimarı Kariyer Yol Haritası | ArchAcademy"}
        description={isEn 
          ? "Step-by-step career path from Software Craftsman to Principal System Architect." 
          : "Yazılım Ustasından Kıdemli Sistem Mimarına adım adım kariyer yol haritası."
        }
        keywords="architect roadmap, software architecture career, system design learning path"
        canonicalUrl="/roadmap"
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        style={{ background: 'var(--bg-dark)', minHeight: '100vh' }}
      >
        <RoadmapHero
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />

        <div style={{ paddingBottom: '120px' }}>
          <AnimatePresence mode="wait">
            {activeTab === 'career' && <RoadmapCurriculumTab key="career" />}
            {activeTab === 'production' && <RoadmapProductionTab key="production" />}
          </AnimatePresence>
        </div>

        <RoadmapImpactFooter />
      </motion.div>
    </>
  );
};

export default RoadmapPage;
