import React from 'react';
import { motion } from 'framer-motion';
import AssessmentQuiz from '../components/AssessmentQuiz';
import { BrainCircuit } from 'lucide-react';

const AssessmentPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{ background: 'var(--bg-dark)', minHeight: '100vh' }}
    >
      {/* Hero Section for Assessment */}
      <section style={{ 
        padding: '120px 0 60px', 
        textAlign: 'center',
        background: 'linear-gradient(to bottom, rgba(59, 130, 246, 0.05) 0%, transparent 100%)'
      }}>
        <div className="container">
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
          >
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              background: 'rgba(59, 130, 246, 0.1)',
              padding: '8px 16px',
              borderRadius: '100px',
              color: 'var(--primary)',
              fontSize: '0.85rem',
              fontWeight: 600,
              marginBottom: '1.5rem'
            }}>
              <BrainCircuit size={16} /> Mezar Mezuniyet Sınavı
            </div>
            <h1 className="gradient-text" style={{ fontSize: '4rem', fontWeight: 800, marginBottom: '1.5rem' }}>
              Architectural Assessment
            </h1>
            <p style={{ color: 'var(--text-secondary)', maxWidth: '700px', margin: '0 auto', fontSize: '1.2rem', lineHeight: 1.7 }}>
              Gerçek dünya senaryolarıyla mimari zekânızı test edin. 
              Bakalım siz bir <strong>Bricklayer</strong> mısınız yoksa gerçek bir <strong>System Wizard</strong> mı?
            </p>
          </motion.div>
        </div>
      </section>

      <AssessmentQuiz />

      <section style={{ padding: '80px 0', borderTop: '1px solid var(--glass-border)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '3rem' }}>
            <div style={{ textAlign: 'center' }}>
               <h4 style={{ marginBottom: '1rem' }}>Mülakatlara Hazırlanın</h4>
               <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Bu senaryolar, büyük teknoloji şirketlerinin mülakat süreçlerinden ilham alınarak hazırlanmıştır.</p>
            </div>
            <div style={{ textAlign: 'center' }}>
               <h4 style={{ marginBottom: '1rem' }}>Stratejik Karar Verme</h4>
               <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Mimarlık sadece kod değil, 'doğru takası' (trade-off) yapma sanatıdır.</p>
            </div>
            <div style={{ textAlign: 'center' }}>
               <h4 style={{ marginBottom: '1rem' }}>Sertifika Kazanın</h4>
               <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Testi başarıyla tamamlayın ve Academy topluluğunda rütbenizi yükseltin.</p>
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default AssessmentPage;
