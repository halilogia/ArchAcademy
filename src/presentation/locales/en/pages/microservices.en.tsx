import React from 'react';
import { motion } from 'framer-motion';
import SystemHero from '../../../components/SystemHero';
import SystemComparison from '../../../components/SystemComparison';
import SystemChoice from '../../../components/SystemChoice';

const MicroservicesPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{ background: 'var(--bg-dark)' }}
    >
      <SystemHero />
      <SystemComparison />
      <SystemChoice />
      
      <section style={{ padding: '80px 0', background: 'rgba(2, 6, 23, 0.4)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 className="section-title">Core Principles of