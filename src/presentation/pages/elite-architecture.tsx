import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Shield, Layout, Activity, Zap } from 'lucide-react';
import Hero from '../components/Hero';
import SEO from '../components/SEO';
import { useProgress } from '../context/ProgressContext';
import { EliteOverviewTab } from '../components/elitearch/EliteOverviewTab';
import { EliteLayersTab } from '../components/elitearch/EliteLayersTab';
import { ElitePatternsTab } from '../components/elitearch/ElitePatternsTab';
import { EliteStandardsTab } from '../components/elitearch/EliteStandardsTab';

const EliteArchitecturePage: React.FC = () => {
  const { i18n } = useTranslation();
  const isEn = (i18n.resolvedLanguage || i18n.language || 'tr').startsWith('en');
  const { completeStep } = useProgress();
  const [activeTab, setActiveTab] = useState<'overview' | 'layers' | 'patterns' | 'elite'>('overview');

  useEffect(() => {
    const timer = setTimeout(() => {
      completeStep('/elite-architecture');
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <SEO
        title={isEn ? "Elite Architecture & MVVM Standards | ArchAcademy" : "Elite Mimari ve MVVM Standartları | ArchAcademy"}
        description={isEn 
          ? "Ultra-fidelity software constitution for React and modern applications inspired by enterprise standards." 
          : "React ve modern ekosistemler için modernize edilmiş ultra-fidelity yazılım anayasası ve MVVM standartları."
        }
        keywords="elite architecture, mvvm standards, result pattern, presentation domain infrastructure, clean frontend"
        canonicalUrl="/elite-architecture"
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        style={{ color: '#e2e8f0', background: '#020617', minHeight: '100vh' }}
      >
        <Hero mode="clean">
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            padding: '2rem 1rem'
          }}>
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              style={{
                background: 'linear-gradient(135deg, #3b82f6 0%, #2dd4bf 100%)',
                padding: '1rem',
                borderRadius: '20px',
                marginBottom: '1.5rem',
                boxShadow: '0 0 40px rgba(59, 130, 246, 0.4)'
              }}
            >
              <Shield size={48} color="white" />
            </motion.div>
            <h1 style={{ fontSize: 'clamp(2.5rem, 8vw, 4rem)', fontWeight: 900, marginBottom: '1rem', background: 'linear-gradient(to right, #fff, #94a3b8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Elite MVVM Standard
            </h1>
            <p style={{ fontSize: '1.25rem', color: '#94a3b8', maxWidth: '700px', margin: '0 auto 2rem' }}>
              {isEn 
                ? "An ultra-fidelity architectural constitution tailored for React and modern web ecosystems." 
                : "React ve modern ekosistemler için modernize edilmiş ultra-fidelity yazılım anayasası."
              }
            </p>

            <div style={{
              background: 'rgba(15, 23, 42, 0.6)',
              padding: '8px',
              borderRadius: '24px',
              display: 'flex',
              gap: '8px',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              backdropFilter: 'blur(10px)',
              boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
              flexWrap: 'wrap',
              justifyContent: 'center'
            }}>
              {[
                { id: 'overview', label: isEn ? 'Overview' : 'Genel Bakış', icon: <Activity size={16} /> },
                { id: 'layers', label: isEn ? 'Layers' : 'Katmanlar', icon: <Layout size={16} /> },
                { id: 'patterns', label: isEn ? 'Patterns' : 'Kalıplar', icon: <Shield size={16} /> },
                { id: 'elite', label: isEn ? 'Elite Standards' : 'Elite Standartlar', icon: <Zap size={16} /> }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  style={{
                    padding: '12px 24px',
                    borderRadius: '18px',
                    border: 'none',
                    background: activeTab === tab.id ? '#3b82f6' : 'transparent',
                    color: activeTab === tab.id ? 'white' : 'rgba(255,255,255,0.5)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontWeight: 700,
                    fontSize: '0.9rem',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                  }}
                >
                  {tab.icon} {tab.label}
                </button>
              ))}
            </div>
          </div>
        </Hero>

        <div className="container" style={{ padding: '4rem 1rem', maxWidth: '1100px', margin: '0 auto' }}>
          <AnimatePresence mode="wait">
            {activeTab === 'overview' && <EliteOverviewTab key="overview" />}
            {activeTab === 'layers' && <EliteLayersTab key="layers" />}
            {activeTab === 'patterns' && <ElitePatternsTab key="patterns" />}
            {activeTab === 'elite' && <EliteStandardsTab key="elite" />}
          </AnimatePresence>
        </div>

        <section style={{ padding: '6rem 0', textAlign: 'center' }}>
          <div className="container">
            <span style={{ fontSize: '0.8rem', letterSpacing: '4px', textTransform: 'uppercase', color: '#3b82f6', fontWeight: 900 }}>
              {isEn ? "Standardized Documentation" : "Standart Dokümantasyon"}
            </span>
            <h2 style={{ fontSize: '2.5rem', fontWeight: 900, marginTop: '1rem', marginBottom: '2rem' }}>
              {isEn ? "Strict Architectural Compliance" : "Anayasaya Bağlı Kalın"}
            </h2>
            <p style={{ maxWidth: '600px', margin: '0 auto', color: '#94a3b8', lineHeight: 1.8 }}>
              {isEn 
                ? "This specification serves as the living standard for the Elite Armor software architecture. Every new module must strictly adhere to these invariants." 
                : "Bu sayfa, kurumsal projeler için geliştirilen 'Elite Armor' yazılım mimarisinin yaşayan referansıdır. Her yeni modül bu prensipleri takip etmelidir."
              }
            </p>
          </div>
        </section>
      </motion.div>
    </>
  );
};

export default EliteArchitecturePage;
