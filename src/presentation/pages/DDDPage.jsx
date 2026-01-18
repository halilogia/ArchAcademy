import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import DDDHero from '../components/DDDHero';
import StrategicDetails from '../components/StrategicDetails';
import DDDSimulation from '../components/DDDSimulation';
import DDDSection from '../components/DDDSection';
import { useProgress } from '../../context/ProgressContext';

const DDDPage = () => {
  const { completeStep } = useProgress();

  useEffect(() => {
    const timer = setTimeout(() => {
      completeStep('/ddd');
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{ background: 'var(--bg-dark)' }}
    >
      <DDDHero />
      <StrategicDetails />
      <DDDSimulation />
      
      {/* Keeping the summary section but styled as a footer detail */}
      <div style={{ paddingBottom: '100px' }}>
        <DDDSection />
      </div>
    </motion.div>
  );
};

export default DDDPage;
