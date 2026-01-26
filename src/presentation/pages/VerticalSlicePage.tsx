import React from 'react';
import { motion } from 'framer-motion';
// import ArchHero from '../components/ArchHero'; // Replaced by VerticalHero
import VerticalHero from '../components/VerticalHero';
import VerticalComparison from '../components/VerticalComparison';
import VerticalPractical from '../components/VerticalPractical';

const VerticalSlicePage = () => {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <VerticalHero />
      <VerticalComparison />
      <VerticalPractical />
    </motion.div>
  );
};

export default VerticalSlicePage;
