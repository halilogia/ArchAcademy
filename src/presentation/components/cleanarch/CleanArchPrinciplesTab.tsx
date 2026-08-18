import React from 'react';
import { motion } from 'framer-motion';
import Theory from '../Theory';
import ArchitecturalTruths from '../ArchitecturalTruths';
import UncleBobStructure from '../UncleBobStructure';
import ArchitectureFlow from '../ArchitectureFlow';
import Practical from '../Practical';

export const CleanArchPrinciplesTab: React.FC = () => {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <Theory />
      <ArchitecturalTruths />
      <UncleBobStructure />
      <ArchitectureFlow />
      <Practical />
    </motion.div>
  );
};

export default CleanArchPrinciplesTab;
