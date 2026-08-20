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
  const scrollToSection = (id: 'career' | 'production') => {
    setActiveTab(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };


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
          <div style={{ display: "flex", flexDirection: "column", gap: "4rem" }}>
          <div id="career" style={{ scrollMarginTop: "100px" }}>
            <RoadmapCurriculumTab />
          </div>
          <div id="production" style={{ scrollMarginTop: "100px" }}>
            <RoadmapProductionTab />
          </div>
        </div>
        </div>

        <RoadmapImpactFooter />
      </motion.div>
    </>
  );
};

export default RoadmapPage;
