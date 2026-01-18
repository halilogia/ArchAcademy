import React from 'react';
import { motion } from 'framer-motion';
import ArchitectRoadmap from '../components/ArchitectRoadmap';

const RoadmapPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{ background: 'var(--bg-dark)', minHeight: '100vh', paddingTop: '80px' }}
    >
      <ArchitectRoadmap />
    </motion.div>
  );
};

export default RoadmapPage;
