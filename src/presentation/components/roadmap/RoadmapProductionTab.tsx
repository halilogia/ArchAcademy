import React from 'react';
import { motion } from 'framer-motion';
import ProductionFlow from '../ProductionFlow';

export const RoadmapProductionTab: React.FC = () => {
  return (
    <motion.div
      key="production"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <ProductionFlow />
    </motion.div>
  );
};

export default RoadmapProductionTab;
