import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import Hero from '../components/Hero';
import Theory from '../components/Theory';
import UncleBobStructure from '../components/UncleBobStructure';
import Practical from '../components/Practical';
import ArchitecturalTruths from '../components/ArchitecturalTruths';
import { useProgress } from '../../context/ProgressContext';

const CleanArchPage = () => {
  const { completeStep } = useProgress();

  useEffect(() => {
    const timer = setTimeout(() => {
      completeStep('/clean-arch');
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Hero />
      <Theory />
      <UncleBobStructure />
      <ArchitecturalTruths />
      <Practical />
    </motion.div>
  );
};

export default CleanArchPage;
