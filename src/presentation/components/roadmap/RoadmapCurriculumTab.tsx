import React from 'react';
import { motion } from 'framer-motion';
import ArchitectRoadmap from '../ArchitectRoadmap';

export const RoadmapCurriculumTab: React.FC = () => {
  return (
    <motion.div
      key="career"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <ArchitectRoadmap />
    </motion.div>
  );
};

export default RoadmapCurriculumTab;
