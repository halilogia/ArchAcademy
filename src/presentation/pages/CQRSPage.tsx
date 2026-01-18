import React from 'react';
import { motion } from 'framer-motion';
import CQRSHero from '../components/CQRSHero';
import CQRSDiagram from '../components/CQRSDiagram';
import CQRSPractical from '../components/CQRSPractical';
import CQRSSection from '../components/CQRSSection';

const CQRSPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{ background: 'var(--bg-dark)' }}
    >
      <CQRSHero />
      <CQRSDiagram />
      <CQRSPractical />
      
      {/* Keeping the foundational overview at the bottom */}
      <div style={{ paddingBottom: '100px' }}>
        <CQRSSection />
      </div>
    </motion.div>
  );
};

export default CQRSPage;
