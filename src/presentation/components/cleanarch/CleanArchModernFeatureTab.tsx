import React from 'react';
import { motion } from 'framer-motion';
import FeatureVsLayerDetail from '../FeatureVsLayerDetail';

export const CleanArchModernFeatureTab: React.FC = () => {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <FeatureVsLayerDetail forcedMode="feature" />
    </motion.div>
  );
};

export default CleanArchModernFeatureTab;
