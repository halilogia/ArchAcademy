import { useTranslation } from 'react-i18next';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Ship, GraduationCap, ArrowRight, Sparkles, Trophy, Users, BookOpen } from 'lucide-react';
import ArchitectRoadmap from '../components/ArchitectRoadmap';
import ProductionFlow from '../components/ProductionFlow';
import SEO from '../components/SEO';

const RoadmapPage: React.FC = () => {
  const { i18n } = useTranslation();
  const isEn = (i18n.resolvedLanguage || i18n.language || 'tr').startsWith('en');
  const [activeTab, setActiveTab] = useState<'career' | 'production'>('career');

  return (
    <>
      <SEO
        title={isEn ? "Software Architect Career Roadmap | ArchAcademy" : "Yazılım Mimarı Kariyer Yol Haritası | ArchAcademy"}
        description={isEn 
          ? "Step-by-step career path from Software Craftsman to Principal System Architect. Master essential milestones." 
          : "Yazılım Ustasından Kıdemli Sistem Mimarına adım adım kariyer yol haritası. Temel kilometre taşlarında ustalaşın."
        }
        keywords="architect roadmap, software architecture career, principal engineer roadmap, system design learning path"
        canonicalUrl="/roadmap"
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        style={{ background: 'var(--bg-dark)', minHeight: '100vh', paddingTop: '120px', paddingBottom: '100px' }}
      >
        <div className="container">
          
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.6rem',
                background: 'rgba(59, 130, 246, 0.1)',
                padding: '10px 20px',
                borderRadius: '100px',
                color: 'var(--primary)',
                fontSize: '0.85rem',
                fontWeight: 700,
                marginBottom: '1.5rem',
                border: '1px solid rgba(59, 130, 246, 0.2)'
              }}
            >
              <Sparkles size={16} /> {isEn ? "CAREER & PRODUCTION ROADMAP" : "KARİYER & ÜRETİM YOL HARİTASI"}
            </motion.div>

            <h1 className="gradient-text" style={{ fontSize: '4rem', fontWeight: 950, letterSpacing: '-2px', marginBottom: '1rem' }}>
              {isEn ? "The Architect's" : "Kıdemli Mimar"} <br />
              <span style={{ color: 'white' }}>{isEn ? "Career Journey" : "Kariyer Yolculuğu"}</span>
            </h1>

            <p style={{ color: 'var(--text-secondary)', maxWidth: '700px', margin: '0 auto 2.5rem', fontSize: '1.2rem', lineHeight: 1.7 }}>
              {isEn 
                ? "A structured, battle-tested learning path designed to elevate you from Junior Engineer to Principal Software Architect."
                : "Kod yazmaktan sistem tasarlamaya, mimari kararları savunmaktan kurumsal ölçeğe uzanan kıdemli mimar gelişim haritası."
              }
            </p>

            {/* Tab Switcher */}
            <div style={{
              display: 'inline-flex',
              background: 'rgba(15, 23, 42, 0.6)',
              padding: '6px',
              borderRadius: '20px',
              border: '1px solid rgba(255,255,255,0.08)',
              backdropFilter: 'blur(10px)'
            }}>
              <button
                onClick={() => setActiveTab('career')}
                style={{
                  padding: '12px 24px',
                  borderRadius: '16px',
                  background: activeTab === 'career' ? 'var(--primary)' : 'transparent',
                  color: activeTab === 'career' ? 'white' : 'var(--text-secondary)',
                  border: 'none',
                  fontWeight: 800,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontSize: '0.9rem',
                  transition: 'all 0.3s'
                }}
              >
                <GraduationCap size={18} /> {isEn ? "Architect Curriculum" : "Mimari Müfredat"}
              </button>
              <button
                onClick={() => setActiveTab('production')}
                style={{
                  padding: '12px 24px',
                  borderRadius: '16px',
                  background: activeTab === 'production' ? '#f43f5e' : 'transparent',
                  color: activeTab === 'production' ? 'white' : 'var(--text-secondary)',
                  border: 'none',
                  fontWeight: 800,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontSize: '0.9rem',
                  transition: 'all 0.3s'
                }}
              >
                <Ship size={18} /> {isEn ? "Production Lifecycle" : "Üretim Yaşam Döngüsü"}
              </button>
            </div>
          </div>

          {/* Active View */}
          <AnimatePresence mode="wait">
            {activeTab === 'career' ? (
              <motion.div
                key="career"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <ArchitectRoadmap />
              </motion.div>
            ) : (
              <motion.div
                key="production"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <ProductionFlow />
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </motion.div>
    </>
  );
};

export default RoadmapPage;
