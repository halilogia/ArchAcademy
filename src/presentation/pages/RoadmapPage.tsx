import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Ship, GraduationCap } from 'lucide-react';
import ArchitectRoadmap from '../components/ArchitectRoadmap';
import ProductionFlow from '../components/ProductionFlow';

const RoadmapPage = () => {
  const [activeTab, setActiveTab] = useState<'career' | 'production'>('career');

  const TabSwitcher = () => (
    <div style={{ 
      display: 'inline-flex', 
      background: 'rgba(2, 6, 23, 0.4)', 
      padding: '6px', 
      borderRadius: '20px', 
      border: '1px solid var(--glass-border)',
      marginBottom: '1rem',
      backdropFilter: 'blur(10px)'
    }}>
        <button
          onClick={() => setActiveTab('career')}
          style={{
            padding: '12px 25px',
            borderRadius: '16px',
            background: activeTab === 'career' ? 'var(--primary)' : 'transparent',
            color: activeTab === 'career' ? 'white' : 'var(--text-secondary)',
            border: 'none',
            fontWeight: 700,
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            display: 'flex', alignItems: 'center', gap: '8px',
            fontSize: '0.9rem'
          }}
        >
          <GraduationCap size={18} /> Mimari Müfredat
        </button>
        <button
          onClick={() => setActiveTab('production')}
          style={{
            padding: '12px 25px',
            borderRadius: '16px',
            background: activeTab === 'production' ? '#f43f5e' : 'transparent',
            color: activeTab === 'production' ? 'white' : 'var(--text-secondary)',
            border: 'none',
            fontWeight: 700,
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            display: 'flex', alignItems: 'center', gap: '8px',
            fontSize: '0.9rem'
          }}
        >
          <Ship size={18} /> Yazılım Döngüsü
        </button>
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{ background: 'var(--bg-dark)', minHeight: '100vh', paddingTop: '100px' }}
    >
      <div className="container" style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <AnimatePresence mode="wait">
          {activeTab === 'career' ? (
            <motion.div
              key="career-head"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
            >
              <h1 className="gradient-text" style={{ fontSize: '3.5rem', fontWeight: 900, marginBottom: '1rem' }}>Mimari Müfredat</h1>
              <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', maxWidth: '750px', margin: '0 auto 2.5rem' }}>
                Yazılım mimarisi disiplinlerini en temelden en ileri seviyeye, yapılandırılmış bir müfredat eşliğinde keşfedin. 
                Hangi seviyedesin, seni neler bekliyor?
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="production-head"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
            >
              <h1 className="gradient-text" style={{ fontSize: '3.5rem', fontWeight: 900, marginBottom: '1rem' }}>Path to Production</h1>
              <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', maxWidth: '750px', margin: '0 auto 2.5rem' }}>
                Kodun fikir aşamasından son kullanıcıya kadar uzanan modern yolculuğu.
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        <TabSwitcher />
      </div>

      <AnimatePresence mode="wait">
        {activeTab === 'career' ? (
          <motion.div
            key="career-content"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
          >
            <ArchitectRoadmap hideHeader />
          </motion.div>
        ) : (
          <motion.div
            key="production-content"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
          >
            <ProductionFlow hideHeader />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default RoadmapPage;
