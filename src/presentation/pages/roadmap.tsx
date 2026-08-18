import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Ship, GraduationCap, ArrowRight, Sparkles, Trophy, Users, BookOpen } from 'lucide-react';
import ArchitectRoadmap from '../components/ArchitectRoadmap';
import ProductionFlow from '../components/ProductionFlow';
import { useTranslation } from 'react-i18next';
import SEO from '../components/SEO';

const RoadmapPage = () => {
  const { i18n } = useTranslation();
  const isEn = (i18n.resolvedLanguage || i18n.language || 'tr').startsWith('en');
  const [activeTab, setActiveTab] = useState<'career' | 'production'>('career');

  const TabSwitcher = () => (
    <div style={{ 
      display: 'inline-flex', 
      background: 'rgba(15, 23, 42, 0.6)', 
      padding: '8px', 
      borderRadius: '24px', 
      border: '1px solid rgba(255,255,255,0.05)',
      marginBottom: '1rem',
      backdropFilter: 'blur(12px)',
      boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
      position: 'relative',
      zIndex: 10
    }}>
        <button
          onClick={() => setActiveTab('career')}
          style={{
            padding: '14px 28px',
            borderRadius: '18px',
            background: activeTab === 'career' ? 'var(--primary)' : 'transparent',
            color: activeTab === 'career' ? 'white' : 'var(--text-secondary)',
            border: 'none',
            fontWeight: 800,
            cursor: 'pointer',
            transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
            display: 'flex', alignItems: 'center', gap: '10px',
            fontSize: '0.95rem',
            boxShadow: activeTab === 'career' ? '0 10px 20px rgba(59, 130, 246, 0.3)' : 'none'
          }}
        >
          <GraduationCap size={20} /> {isEn ? "Architect Curriculum" : "Mimari Müfredat"}
        </button>
        <button
          onClick={() => setActiveTab('production')}
          style={{
            padding: '14px 28px',
            borderRadius: '18px',
            background: activeTab === 'production' ? '#f43f5e' : 'transparent',
            color: activeTab === 'production' ? 'white' : 'var(--text-secondary)',
            border: 'none',
            fontWeight: 800,
            cursor: 'pointer',
            transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
            display: 'flex', alignItems: 'center', gap: '10px',
            fontSize: '0.95rem',
            boxShadow: activeTab === 'production' ? '0 10px 20px rgba(244, 63, 94, 0.3)' : 'none'
          }}
        >
          <Ship size={20} /> {isEn ? "Production Flow" : "Üretim Hattı (Production)"}
        </button>
    </div>
  );

  return (
    <>
      <SEO
        title={isEn ? "Software Architect Career Roadmap | ArchAcademy" : "Yazılım Mimarı Kariyer Yol Haritası | ArchAcademy"}
        description={isEn 
          ? "Step-by-step career path from Software Craftsman to Principal System Architect." 
          : "Yazılım Ustasından Kıdemli Sistem Mimarına adım adım kariyer yol haritası."
        }
        keywords="architect roadmap, software architecture career, system design learning path"
        canonicalUrl="/roadmap"
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        style={{ background: 'var(--bg-dark)', minHeight: '100vh' }}
      >
        {/* Modern Interactive Hero */}
        <section style={{ 
          padding: '140px 0 60px', 
          position: 'relative', 
          overflow: 'hidden',
          background: 'radial-gradient(circle at 50% 0%, rgba(99, 102, 241, 0.15) 0%, transparent 70%)'
        }}>
          <div className="container" style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              <span style={{ 
                display: 'inline-flex', 
                alignItems: 'center', 
                gap: '8px', 
                padding: '8px 20px', 
                borderRadius: '100px', 
                background: 'rgba(99, 102, 241, 0.1)', 
                color: 'var(--primary)', 
                fontSize: '0.85rem', 
                fontWeight: 800, 
                border: '1px solid rgba(99, 102, 241, 0.2)',
                marginBottom: '1.5rem',
                textTransform: 'uppercase',
                letterSpacing: '1px'
              }}>
                <Sparkles size={16} /> {isEn ? "BATTLE-TESTED CAREER COMPASS" : "DENEYİMLENMİŞ KARİYER PUSULASI"}
              </span>
              
              <h1 className="gradient-text" style={{ fontSize: '4.5rem', fontWeight: 950, marginBottom: '1.5rem', letterSpacing: '-2px' }}>
                Architect's <br />
                <span style={{ opacity: 0.85 }}>Odyssey</span>
              </h1>
              
              <p style={{ color: 'var(--text-secondary)', maxWidth: '750px', margin: '0 auto 2.5rem', fontSize: '1.25rem', lineHeight: 1.8 }}>
                {isEn 
                  ? "A living architectural blueprint guiding you from writing maintainable code to orchestrating mission-critical enterprise systems."
                  : "Kod yazmaktan sistem kurmaya, mimari kararları savunmaktan kurumsal ölçeğe uzanan yaşayan mühendislik yol haritası."
                }
              </p>

              <TabSwitcher />
            </motion.div>
          </div>
        </section>

        {/* Content Container */}
        <div style={{ paddingBottom: '120px' }}>
          <AnimatePresence mode="wait">
            {activeTab === 'career' ? (
              <motion.div
                key="career"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
              >
                <ArchitectRoadmap />
              </motion.div>
            ) : (
              <motion.div
                key="production"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
              >
                <ProductionFlow />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Global Impact Footer */}
        <section style={{ 
          padding: '80px 0', 
          background: 'rgba(15, 23, 42, 0.4)', 
          borderTop: '1px solid rgba(255,255,255,0.05)',
          position: 'relative'
        }}>
          <div className="container">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '3rem', textAlign: 'center' }}>
              <div>
                <div style={{ color: 'var(--primary)', marginBottom: '1rem', display: 'flex', justifyContent: 'center' }}>
                  <Trophy size={32} />
                </div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '0.5rem' }}>
                  {isEn ? "Principal Standard" : "Principal Seviyesi"}
                </h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6 }}>
                  {isEn 
                    ? "Directly mapped to Staff and Principal engineer expectations at global tier-1 tech firms." 
                    : "Global teknoloji devlerinin Staff ve Principal seviyesindeki mimar beklentileriyle birebir uyumlu."
                  }
                </p>
              </div>

              <div>
                <div style={{ color: '#10b981', marginBottom: '1rem', display: 'flex', justifyContent: 'center' }}>
                  <Users size={32} />
                </div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '0.5rem' }}>
                  {isEn ? "Community Driven" : "Topluluk ve Mentorluk"}
                </h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6 }}>
                  {isEn 
                    ? "Continuous real-world peer discussions, trade-off reviews, and case study updates." 
                    : "Sürekli güncellenen pratikler, trade-off tartışmaları ve vaka analizleriyle zenginleştirilmiş içerik."
                  }
                </p>
              </div>

              <div>
                <div style={{ color: '#ec4899', marginBottom: '1rem', display: 'flex', justifyContent: 'center' }}>
                  <BookOpen size={32} />
                </div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '0.5rem' }}>
                  {isEn ? "Hands-On Dissection" : "Uygulamalı Teori"}
                </h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6 }}>
                  {isEn 
                    ? "Every pattern is paired with an interactive sandbox, clean surgery breakdown, and live diagram." 
                    : "Sadece teorik anlatım değil; canlı simülasyonlar, kod ameliyatları ve interaktif şemalar."
                  }
                </p>
              </div>
            </div>
          </div>
        </section>
      </motion.div>
    </>
  );
};

export default RoadmapPage;
