import React from 'react';
import { motion } from 'framer-motion';
import { ShieldAlert, Lock, EyeOff, ShieldCheck, Database, Zap } from 'lucide-react';
import ArchHero from '../components/ArchHero';

const SecurityPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{ background: 'var(--bg-dark)', minHeight: '100vh' }}
    >
      <ArchHero 
        title="Security"
        subtitle="Assurance"
        description="Yazılım mimarinizi daha ilk satırdan itibaren 'Güvenli' (Secure by Design) olarak inşa edin. Siber tehditlere karşı mimari bir kalkan oluşturun."
        badge="Zero Trust Architecture"
        color="#ef4444"
        illustration={
          <div style={{ position: 'relative', width: '300px', height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              style={{ position: 'absolute', width: '100%', height: '100%', border: '2px dashed rgba(239, 68, 68, 0.2)', borderRadius: '50%' }}
            />
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 4, repeat: Infinity }}
              style={{ background: 'rgba(239, 68, 68, 0.1)', padding: '2rem', borderRadius: '50%', border: '2px solid #ef4444' }}
            >
              <Lock size={80} color="#ef4444" />
            </motion.div>
            <motion.div
               animate={{ y: [0, -20, 0] }}
               transition={{ duration: 3, repeat: Infinity }}
               style={{ position: 'absolute', top: 0, right: 20, color: '#ef4444' }}
            >
               <ShieldAlert size={32} />
            </motion.div>
          </div>
        }
        features={[
          { icon: <ShieldCheck />, title: 'SQL Injection Guard', desc: 'Veri erişim katmanında tam koruma ve sanitize süreçleri.' },
          { icon: <EyeOff />, title: 'Anti-XSS Defense', desc: 'Presentation katmanında güvenli render ve input kontrolü.' },
          { icon: <Database />, title: 'Data Encryption', desc: 'Verinin hem saklanırken hem taşınırken (At-Rest & Transit) korunması.' }
        ]}
      />

      <section style={{ padding: '100px 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
            <h2 className="gradient-text" style={{ fontSize: '3rem', fontWeight: 800 }}>Kritik Güvenlik Katmanları</h2>
            <p style={{ color: 'var(--text-secondary)' }}>Mimari düzeyde alınması gereken en önemli 3 önlem.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem' }}>
            <div className="glass-card" style={{ padding: '3rem' }}>
              <div style={{ color: '#ef4444', marginBottom: '1.5rem' }}><Lock size={40} /></div>
              <h3 style={{ marginBottom: '1rem' }}>Least Privilege</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.8 }}>
                Her bileşen ve servis, sadece görevi için gereken minimum yetkiye sahip olmalıdır. Veritabanı kullanıcınız asla 'admin' olmamalıdır.
              </p>
            </div>

            <div className="glass-card" style={{ padding: '3rem' }}>
              <div style={{ color: '#ef4444', marginBottom: '1.5rem' }}><Zap size={40} /></div>
              <h3 style={{ marginBottom: '1rem' }}>Input Sanitization</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.8 }}>
                Dış dünyadan gelen her veri "kirli" kabul edilmelidir. Mimari, bu verileri içeri almadan önce merkezi bir validasyon süzgecinden geçirmelidir.
              </p>
            </div>

            <div className="glass-card" style={{ padding: '3rem' }}>
              <div style={{ color: '#ef4444', marginBottom: '1.5rem' }}><ShieldCheck size={40} /></div>
              <h3 style={{ marginBottom: '1rem' }}>Audit Logging</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.8 }}>
                Kim, ne zaman, hangi veriye erişti? Güvenlik mimarisi, izinsiz denemeleri ve kritik işlemleri geriye dönük izlenebilir (Traceable) kılmalıdır.
              </p>
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default SecurityPage;
