import React from 'react';
import { motion } from 'framer-motion';
import ScreamingSection from '../ScreamingSection';

export const CleanArchScreamingTab: React.FC = () => {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <ScreamingSection />
    </motion.div>
  );
};

export default CleanArchScreamingTab;
