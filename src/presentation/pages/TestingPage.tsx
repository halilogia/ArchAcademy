import React from 'react';
import { motion } from 'framer-motion';
import { Beaker, FlaskConical, CheckCircle2, Zap, Microscope, ClipboardCheck } from 'lucide-react';
import ArchHero from '../components/ArchHero';

const TestingPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{ background: 'var(--bg-dark)', minHeight: '100vh' }}
    >
      <ArchHero 
        title="Testing"
        subtitle="Architecture"
        description="Test edilebilir kod, en iyi koddur. Mimarinin ana odak noktası, hata yapmayı zorlaştırmak ve doğrulamayı kolaylaştırmaktır."
        badge="Quality by Design"
        color="#10b981"
        illustration={
          <div style={{ position: 'relative', width: '300px', height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              style={{ background: 'rgba(16, 185, 129, 0.1)', padding: '2rem', borderRadius: '50%', border: '2px solid #10b981' }}
            >
              <Beaker size={80} color="#10b981" />
            </motion.div>
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                transition={{ duration: 2, delay: i * 0.6, repeat: Infinity }}
                style={{ position: 'absolute', width: '100px', height: '100px', border: '1px solid #10b981', borderRadius: '50%' }}
              />
            ))}
          </div>
        }
        features={[
          { icon: <CheckCircle2 />, title: 'Automated Confidence', desc: 'Her commit sonrası çalışan testlerle mimarinin bozulmadığından emin olun.' },
          { icon: <Microscope />, title: 'High Coverage Design', desc: 'Mock ve Stub kullanımını kolaylaştıran bağımsız katmanlar tasarlayın.' },
          { icon: <Zap />, title: 'Fast Feedback Loop', desc: 'Saniyeler içinde sonuç veren Unit testler ile geliştirme hızınızı artırın.' }
        ]}
      />

      <section style={{ padding: '100px 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
            <h2 className="gradient-text" style={{ fontSize: '3rem', fontWeight: 800 }}>Test Stratejisi Piramidi</h2>
            <p style={{ color: 'var(--text-secondary)' }}>Mimariyi koruyan 3 temel test seviyesi.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem' }}>
            <div className="glass-card" style={{ padding: '3rem' }}>
              <div style={{ color: '#10b981', marginBottom: '1.5rem' }}><FlaskConical size={40} /></div>
              <h3 style={{ marginBottom: '1rem' }}>Unit Testing</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.8 }}>
                En temel taşlar. Tek bir fonksiyonun veya sınıfın iş mantığını diğer her şeyden izole şekilde doğrular. Çok hızlıdır.
              </p>
            </div>

            <div className="glass-card" style={{ padding: '3rem' }}>
              <div style={{ color: '#10b981', marginBottom: '1.5rem' }}><ClipboardCheck size={40} /></div>
              <h3 style={{ marginBottom: '1rem' }}>Integration Testing</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.8 }}>
                Bileşenlerin birbiriyle uyumu. Veritabanı, API veya servislerin birlikte doğru çalıştığını kontrol eder.
              </p>
            </div>

            <div className="glass-card" style={{ padding: '3rem' }}>
              <div style={{ color: '#10b981', marginBottom: '1.5rem' }}><Microscope size={40} /></div>
              <h3 style={{ marginBottom: '1rem' }}>E2E (Scenario)</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.8 }}>
                Kullanıcı gözünden tam akış. Sistemin baştan sona (End-to-End) tüm parçalarıyla doğru cevap verdiğinden emin olur.
              </p>
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default TestingPage;
