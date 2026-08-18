import React from 'react';
import { motion } from 'framer-motion';
import EDAHero from '../../../components/EDAHero';
import EDADiagram from '../../../components/EDADiagram';
import EDAPractical from '../../../components/EDAPractical';

const EDAPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{ background: 'var(--bg-dark)' }}
    >
      <EDAHero />
      <EDADiagram />
      <EDAPractical />
      
      <section style={{ padding: '80px 0', background: 'rgba(2, 6, 23, 0.4)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 className="section-title">Event-Driven Pattern Types</h2>
            <p style={{ color: 'var(--text-secondary)' }}>Different event strategies for different purposes.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            <div className="glass-card" style={{ borderTop: '4px solid #a855f7' }}>
              <h4 style={{ color: 'white', marginBottom: '1rem' }}>1. Event Notification</h4>
              <p style={{ color: '#94a3b8', fontSize: '0.9rem', lineHeight: 1.6 }}>
                The simplest form. A system says "Something happened" but does not provide details. The receiver calls the system back to ask for details if necessary.
              </p>
            </div>
            <div className="glass-card" style={{ borderTop: '4px solid #a855f7' }}>
              <h4 style={{ color: 'white', marginBottom: '1rem' }}>2. Event-Carried State Transfer</h4>
              <h4 style={{