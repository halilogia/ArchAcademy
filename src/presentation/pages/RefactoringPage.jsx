import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Scissors, Microscope, Zap, BookOpen } from 'lucide-react';
import RefactoringSurgery from '../components/RefactoringSurgery';
import FolderSurgery from '../components/FolderSurgery';
import { useProgress } from '../../context/ProgressContext';
import { useState } from 'react';

const RefactoringPage = () => {
  const { completeStep } = useProgress();
  const [activeTab, setActiveTab] = useState('code');

  useEffect(() => {
    const timer = setTimeout(() => {
      completeStep('/refactoring');
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const stats = [
    { icon: <Microscope size={20} />, label: "Detaylı Analiz", value: "Anti-Pattern Tespiti" },
    { icon: <Zap size={20} />, label: "Anında Dönüşüm", value: "Clean Code Refactor" },
    { icon: <BookOpen size={20} />, label: "Eğitici Gerekçe", value: "Mimari Prensipler" }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{ paddingTop: '100px', minHeight: '100vh', background: 'var(--bg-dark)' }}
    >
      <div className="container">
        {/* Hero Section */}
        <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
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
              marginBottom: '2rem',
              border: '1px solid rgba(239, 68, 68, 0.2)'
            }}
          >
            <Scissors size={16} /> Code Surgery Open
          </motion.div>
          <h1 className="gradient-text" style={{ fontSize: '4rem', fontWeight: 800, marginBottom: '1.5rem', letterSpacing: '-2px' }}>
            Refactoring Playground
          </h1>
          <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', maxWidth: '800px', margin: '0 auto', lineHeight: 1.8 }}>
            Korkunç görünen spagetti kodları ve karmaşık dosya yapılarını, mimari cerrahi teknikleriyle tertemiz yapılara dönüştürüyoruz. 
            Patolojiyi gör, ameliyatı başlat ve kodun nasıl nefes aldığını izle.
          </p>

          {/* Tab Switcher */}
          <div style={{ display: 'inline-flex', background: 'rgba(255,255,255,0.05)', padding: '6px', borderRadius: '16px', marginTop: '3rem', border: '1px solid var(--glass-border)' }}>
             <button 
               onClick={() => setActiveTab('code')}
               style={{ 
                 padding: '12px 30px', 
                 borderRadius: '12px', 
                 background: activeTab === 'code' ? 'var(--primary)' : 'transparent',
                 color: activeTab === 'code' ? 'white' : 'var(--text-secondary)',
                 border: 'none',
                 fontWeight: 700,
                 cursor: 'pointer',
                 transition: 'all 0.3s'
               }}
             >
               Code Refactoring
             </button>
             <button 
               onClick={() => setActiveTab('structure')}
               style={{ 
                 padding: '12px 30px', 
                 borderRadius: '12px', 
                 background: activeTab === 'structure' ? '#ec4899' : 'transparent',
                 color: activeTab === 'structure' ? 'white' : 'var(--text-secondary)',
                 border: 'none',
                 fontWeight: 700,
                 cursor: 'pointer',
                 transition: 'all 0.3s'
               }}
             >
               Architectural Surgery
             </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem', marginBottom: '4rem' }}>
          {stats.map((stat, i) => (
            <div key={i} className="glass-card" style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', padding: '1.5rem 2rem' }}>
              <div style={{ color: 'var(--primary)', background: 'rgba(59, 130, 246, 0.1)', padding: '10px', borderRadius: '12px' }}>
                {stat.icon}
              </div>
              <div>
                <div style={{ fontSize: '0.8rem', opacity: 0.5, fontWeight: 700, textTransform: 'uppercase' }}>{stat.label}</div>
                <div style={{ fontSize: '1.1rem', fontWeight: 700 }}>{stat.value}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Main Surgery Component */}
        <AnimatePresence mode="wait">
          {activeTab === 'code' ? (
             <motion.div key="code" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}>
               <RefactoringSurgery />
             </motion.div>
          ) : (
             <motion.div key="structure" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
               <FolderSurgery />
             </motion.div>
          )}
        </AnimatePresence>

        {/* Footer Guidance */}
        <div style={{ padding: '80px 0 120px', textAlign: 'center' }}>
           <div className="glass-card" style={{ maxWidth: '800px', margin: '0 auto', padding: '3rem' }}>
              <h3 style={{ marginBottom: '1.5rem' }}>Neden Refactoring?</h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: '2rem' }}>
                 "Çalışan kodu elleme" anlayışı, teknik borcun (Technical Debt) en büyük kaynağıdır. 
                 Cerrahi bir hassasiyetle yapılan refactoring, sadece kodun görünüşünü değil, 
                 gelecekteki değişimlere karşı direncini de güçlendirir.
              </p>
           </div>
        </div>
      </div>
    </motion.div>
  );
};

export default RefactoringPage;
