import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { CheckCircle2, Shield, Zap, Layers, RotateCcw, BookOpen, FileCheck } from 'lucide-react';
import ArchHero from '../components/ArchHero';
import SEO from '../components/SEO';
import { TestPyramidTab } from '../components/testing/TestPyramidTab';
import { TDDLifecycleTab } from '../components/testing/TDDLifecycleTab';
import { TestingStrategiesTab } from '../components/testing/TestingStrategiesTab';
import { useTDDSimulation } from '../components/testing/useTDDSimulation';

const TestingPage: React.FC = () => {
  const { i18n } = useTranslation();
  const isEn = (i18n.resolvedLanguage || i18n.language || 'tr').startsWith('en');
  const [activeTab, setActiveTab] = useState<'pyramid' | 'tdd' | 'strategies'>('pyramid');

  const tdd = useTDDSimulation();

  return (
    <>
      <SEO
        title={isEn ? "Software Testing Architecture & TDD Masterclass | ArchAcademy" : "Yazılım Test Mimarisi ve TDD Masterclass | ArchAcademy"}
        description={isEn 
          ? "Master the Test Pyramid (Unit, Integration, E2E), TDD Red-Green-Refactor cycle, AAA pattern, and Mocking strategies." 
          : "Yazılım Test Piramidi (Unit, Entegrasyon, E2E), TDD Red-Green-Refactor döngüsü ve modern test mühendisliği rehberi."
        }
        keywords="software testing, test pyramid, tdd, test driven development, unit tests, integration tests, e2e, aaa pattern, mocking"
        canonicalUrl="/testing"
      />
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ background: 'var(--bg-dark)', minHeight: '100vh' }}>
        <ArchHero 
          title="Testing"
          subtitle={isEn ? "Architecture & TDD" : "Mühendisliği & TDD"}
          description={isEn 
            ? "Engineering resilient systems through automated testing. Test Pyramid volume optimization and Test-Driven Development lifecycle." 
            : "Kodunuzun canlıya çıkmadan önce bozulmasını engelleyen güvenlik ağı. Test Piramidi, TDD döngüsü ve profesyonel test mimarisi."
          }
          badge="Quality Engineering"
          color="#22c55e"
          illustration={
            <div style={{ position: 'relative', width: '220px', height: '200px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ width: '60px', height: '35px', background: '#ef4444', borderRadius: '8px', marginBottom: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 900, fontSize: '0.75rem' }}>E2E</div>
              <div style={{ width: '120px', height: '40px', background: '#f59e0b', borderRadius: '8px', marginBottom: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'black', fontWeight: 900, fontSize: '0.8rem' }}>Integration</div>
              <div style={{ width: '190px', height: '50px', background: '#22c55e', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'black', fontWeight: 900, fontSize: '0.9rem' }}>Unit Tests (70%)</div>
            </div>
          }
          features={[
            { icon: <Layers />, title: isEn ? 'Test Pyramid' : 'Test Piramidi', desc: isEn ? '70% Unit, 20% Integration, 10% E2E distribution.' : '%70 Birim, %20 Entegrasyon, %10 E2E ideal hacmi.' },
            { icon: <RotateCcw />, title: isEn ? 'TDD Workflow' : 'TDD Döngüsü', desc: isEn ? 'Red (Fail) -> Green (Pass) -> Refactor (Clean).' : 'Kırmızı (Hata) -> Yeşil (Geçir) -> Refactor (Temizle).' },
            { icon: <FileCheck />, title: isEn ? 'AAA & FIRST' : 'Evrensel Kurallar', desc: isEn ? 'Arrange-Act-Assert structure and FIRST speed standards.' : 'Arrange-Act-Assert yapısı ve FIRST hız prensipleri.' }
          ]}
        >
          <div style={{ 
            marginTop: '2rem',
            padding: '6px', 
            background: 'rgba(15, 23, 42, 0.4)', 
            borderRadius: '24px', 
            border: '1px solid rgba(255,255,255,0.05)',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '4px',
            backdropFilter: 'blur(10px)',
            flexWrap: 'wrap'
          }}>
            {[
              { id: 'pyramid', label: isEn ? 'Test Pyramid' : 'Test Piramidi', icon: <Layers size={18} /> },
              { id: 'tdd', label: isEn ? 'TDD Interactive Lab' : 'TDD Simülatörü', icon: <RotateCcw size={18} /> },
              { id: 'strategies', label: isEn ? 'Standards & Mocking' : 'Standartlar (AAA/FIRST)', icon: <FileCheck size={18} /> }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                style={{
                  padding: '10px 24px',
                  borderRadius: '18px',
                  border: 'none',
                  background: activeTab === tab.id ? '#22c55e' : 'transparent',
                  color: activeTab === tab.id ? '#020617' : 'rgba(255,255,255,0.5)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontWeight: 700,
                  fontSize: '0.9rem',
                  transition: 'all 0.3s ease',
                  boxShadow: activeTab === tab.id ? '0 4px 12px rgba(34, 197, 94, 0.3)' : 'none'
                }}
              >
                {tab.icon} {tab.label}
              </button>
            ))}
          </div>
        </ArchHero>

        <div className="container" style={{ marginTop: '2rem' }}>
          <AnimatePresence mode="wait">
            {activeTab === 'pyramid' && <TestPyramidTab key="pyramid" />}
            {activeTab === 'tdd' && (
              <TDDLifecycleTab 
                key="tdd"
                currentPhase={tdd.currentPhase}
                setCurrentPhase={tdd.setCurrentPhase}
                testCount={tdd.testCount}
                isRunning={tdd.isRunning}
                onAdvance={tdd.advancePhase}
                activeInfo={tdd.activeInfo}
              />
            )}
            {activeTab === 'strategies' && <TestingStrategiesTab key="strategies" />}
          </AnimatePresence>
        </div>

        <section style={{ padding: '4rem 0', background: 'rgba(0,0,0,0.3)', borderTop: '1px solid rgba(255,255,255,0.05)', marginTop: '4rem' }}>
          <div className="container" style={{ textAlign: 'center' }}>
             <div style={{ display: 'inline-flex', alignItems: 'center', gap: '1rem', background: 'rgba(34, 197, 94, 0.1)', padding: '1rem 2rem', borderRadius: '12px', border: '1px solid rgba(34, 197, 94, 0.2)' }}>
                <BookOpen size={24} color="#22c55e" />
                <div style={{ textAlign: 'left' }}>
                  <div style={{ fontSize: '0.8rem', color: '#86efac', textTransform: 'uppercase' }}>
                    {isEn ? "Core Reference Literature" : "Temel Kaynak"}
                  </div>
                  <div style={{ color: 'white', fontWeight: 600 }}>Test Driven Development: By Example (Kent Beck) & Succeeding with Agile (Mike Cohn)</div>
                </div>
             </div>
          </div>
        </section>
      </motion.div>
    </>
  );
};

export default TestingPage;
