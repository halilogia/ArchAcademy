import { useTranslation } from 'react-i18next';
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Scissors, Microscope, Zap, BookOpen } from 'lucide-react';
import RefactoringSurgery from '../components/RefactoringSurgery';
import FolderSurgery from '../components/FolderSurgery';
import { useProgress } from '../context/ProgressContext';
import SEO from '../components/SEO';

const RefactoringPage: React.FC = () => {
  const { i18n } = useTranslation();
  const isEn = (i18n.resolvedLanguage || i18n.language || 'tr').startsWith('en');
  const { completeStep } = useProgress();
  const [activeTab, setActiveTab] = useState<'code' | 'folder'>('code');

  useEffect(() => {
    const timer = setTimeout(() => {
      completeStep('/refactoring');
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const stats = [
    { icon: <Microscope size={20} />, label: isEn ? "Deep Inspection" : "Detaylı Analiz", value: isEn ? "Anti-Pattern Detection" : "Anti-Pattern Tespiti" },
    { icon: <Zap size={20} />, label: isEn ? "Instant Refactoring" : "Anında Dönüşüm", value: isEn ? "Clean Code Surgery" : "Clean Code Refactor" },
    { icon: <BookOpen size={20} />, label: isEn ? "Architectural Why" : "Eğitici Gerekçe", value: isEn ? "SOLID & Design Rules" : "Mimari Prensipler" }
  ];

  return (
    <>
      <SEO
        title={isEn ? "Code & Architecture Surgery Lab | ArchAcademy" : "Kod & Mimari Ameliyathanesi | ArchAcademy"}
        description={isEn 
          ? "Interactive refactoring operating theater. Transform smelly legacy code into pristine Clean Architecture patterns." 
          : "İnteraktif kod ameliyathanesi. Spagetti ve kötü kokan eski kodları temiz Clean Architecture kalıplarına dönüştürün."
        }
        keywords="refactoring playground, code surgery, clean code refactoring, legacy modernizer"
        canonicalUrl="/refactoring"
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        style={{ paddingTop: '120px', paddingBottom: '100px', minHeight: '100vh', background: 'var(--bg-dark)' }}
      >
        <div className="container">
          {/* Hero Section */}
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              style={{ 
                display: 'inline-flex', 
                alignItems: 'center', 
                gap: '0.75rem', 
                background: 'rgba(239, 68, 68, 0.1)', 
                padding: '10px 20px', 
                borderRadius: '100px', 
                color: '#ef4444', 
                fontWeight: 700, 
                fontSize: '0.9rem', 
                marginBottom: '1.5rem', 
                border: '1px solid rgba(239, 68, 68, 0.2)' 
              }}
            >
              <Scissors size={16} /> {isEn ? "CODE & ARCHITECTURE SURGERY" : "KOD & MİMARİ AMELİYATHANESİ"}
            </motion.div>

            <h1 className="gradient-text" style={{ fontSize: '4rem', fontWeight: 950, letterSpacing: '-2px', marginBottom: '1rem' }}>
              Refactoring <br />
              <span style={{ color: 'white' }}>{isEn ? "Operating Theater" : "Ameliyathanesi"}</span>
            </h1>

            <p style={{ color: 'var(--text-secondary)', maxWidth: '700px', margin: '0 auto 2.5rem', fontSize: '1.2rem', lineHeight: 1.7 }}>
              {isEn 
                ? "Experience live before-and-after surgeries on smelly legacy codebases. Master refactoring techniques that eliminate technical debt."
                : "Kötü kokan (code smell) ve teknik borç biriktiren kodları canlı olarak ameliyat edin. Temiz mimarinin gücünü bizzat deneyimleyin."
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
                onClick={() => setActiveTab('code')}
                style={{
                  padding: '12px 24px',
                  borderRadius: '16px',
                  background: activeTab === 'code' ? '#ef4444' : 'transparent',
                  color: activeTab === 'code' ? 'white' : 'var(--text-secondary)',
                  border: 'none',
                  fontWeight: 800,
                  cursor: 'pointer',
                  fontSize: '0.9rem',
                  transition: 'all 0.3s'
                }}
              >
                {isEn ? "Code-Level Surgery" : "Kod Seviyesi Ameliyat"}
              </button>
              <button
                onClick={() => setActiveTab('folder')}
                style={{
                  padding: '12px 24px',
                  borderRadius: '16px',
                  background: activeTab === 'folder' ? 'var(--primary)' : 'transparent',
                  color: activeTab === 'folder' ? 'white' : 'var(--text-secondary)',
                  border: 'none',
                  fontWeight: 800,
                  cursor: 'pointer',
                  fontSize: '0.9rem',
                  transition: 'all 0.3s'
                }}
              >
                {isEn ? "Folder & Module Surgery" : "Klasör & Modül Ameliyatı"}
              </button>
            </div>
          </div>

          {/* Active Operating View */}
          {activeTab === 'code' ? <RefactoringSurgery /> : <FolderSurgery />}

          {/* Highlights Row */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem', marginTop: '5rem' }}>
            {stats.map((s, idx) => (
              <div key={idx} className="glass-card" style={{ padding: '2rem', textAlign: 'center' }}>
                <div style={{ color: 'var(--primary)', marginBottom: '0.5rem', display: 'flex', justifyContent: 'center' }}>
                  {s.icon}
                </div>
                <div style={{ fontWeight: 800, color: 'white', fontSize: '1.1rem', marginBottom: '4px' }}>{s.value}</div>
                <div style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>{s.label}</div>
              </div>
            ))}
          </div>

        </div>
      </motion.div>
    </>
  );
};

export default RefactoringPage;
