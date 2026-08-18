import { useTranslation } from 'react-i18next';
import React from 'react';
import { motion } from 'framer-motion';
import AssessmentQuiz from '../components/AssessmentQuiz';
import { BrainCircuit } from 'lucide-react';
import SEO from '../components/SEO';

const AssessmentPage: React.FC = () => {
  const { i18n } = useTranslation();
  const isEn = (i18n.resolvedLanguage || i18n.language || 'tr').startsWith('en');

  return (
    <>
      <SEO
        title={isEn ? "Architect Assessment & Interview Simulator | ArchAcademy" : "Mimar Değerlendirme & Mülakat Simülasyonu | ArchAcademy"}
        description={isEn 
          ? "FAANG-level software architecture interview simulation and skill assessment. Get instant Guru feedback." 
          : "FAANG seviyesinde yazılım mimarisi mülakat simülasyonu ve yetenek değerlendirmesi. Anında Guru geri bildirimi alın."
        }
        keywords="architecture interview, system design quiz, software architect assessment, faang interview"
        canonicalUrl="/assessment"
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        style={{ background: 'var(--bg-dark)', minHeight: '100vh' }}
      >
        {/* Hero Section for Interview Simulator */}
        <section style={{ 
          padding: '120px 0 60px', 
          textAlign: 'center',
          background: 'radial-gradient(circle at top, rgba(99, 102, 241, 0.1) 0%, transparent 80%)'
        }}>
          <div className="container">
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
            >
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.6rem',
                background: 'rgba(99, 102, 241, 0.1)',
                padding: '10px 20px',
                borderRadius: '100px',
                color: 'var(--primary)',
                fontSize: '0.9rem',
                fontWeight: 700,
                marginBottom: '1.5rem',
                border: '1px solid rgba(99, 102, 241, 0.2)'
              }}>
                <BrainCircuit size={18} /> {isEn ? "Interview Simulator" : "Mülakat Simülasyonu"}
              </div>
              <h1 className="gradient-text" style={{ fontSize: '4.5rem', fontWeight: 950, marginBottom: '1.5rem', letterSpacing: '-2px' }}>
                Architect Interview <br /> <span style={{ opacity: 0.8 }}>Simulator</span>
              </h1>
              <p style={{ color: 'var(--text-secondary)', maxWidth: '800px', margin: '0 auto', fontSize: '1.3rem', lineHeight: 1.8 }}>
                {isEn 
                  ? "Ready for the next step in your career? Experience FAANG-level Architecture Interview scenarios and master system design with 'Guru' feedback."
                  : "Kariyerindeki bir sonraki adımı atmaya hazır mısın? Dev teknoloji şirketleri (FAANG) seviyesindeki Mimari Mülakat sorularını deneyimle ve 'Guru' geri bildirimleriyle ustalaş."
                }
              </p>
            </motion.div>
          </div>
        </section>

        <AssessmentQuiz />

        <section style={{ padding: '80px 0', borderTop: '1px solid var(--glass-border)' }}>
          <div className="container">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '3rem' }}>
              <div style={{ textAlign: 'center' }}>
                <h3 style={{ fontSize: '2.5rem', fontWeight: 900, color: 'var(--primary)', marginBottom: '0.5rem' }}>100%</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '1rem' }}>
                  {isEn ? "Real-world production trade-offs and scenarios" : "Gerçek üretim ortamı senaryoları ve trade-off'lar"}
                </p>
              </div>
              <div style={{ textAlign: 'center' }}>
                <h3 style={{ fontSize: '2.5rem', fontWeight: 900, color: '#10b981', marginBottom: '0.5rem' }}>4 Profiles</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '1rem' }}>
                  {isEn ? "Detailed persona: Junior, Overkiller, Specialist, Architect" : "Detaylı persona: Junior, Overkiller, Specialist, Architect"}
                </p>
              </div>
              <div style={{ textAlign: 'center' }}>
                <h3 style={{ fontSize: '2.5rem', fontWeight: 900, color: '#ec4899', marginBottom: '0.5rem' }}>Instant</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '1rem' }}>
                  {isEn ? "Immediate Senior Architect Guru tips and advice" : "Anında Kıdemli Mimar Guru tavsiyeleri ve geri bildirim"}
                </p>
              </div>
            </div>
          </div>
        </section>
      </motion.div>
    </>
  );
};

export default AssessmentPage;
