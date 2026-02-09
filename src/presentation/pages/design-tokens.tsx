import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Palette, Box, Type, Move, Zap, Shield, Sparkles } from 'lucide-react';
import ArchHero from '../components/ArchHero';
import { useProgress } from '../context/ProgressContext';

const DesignTokensPage = () => {
  const { completeStep } = useProgress();

  useEffect(() => {
    const timer = setTimeout(() => {
      completeStep('/design-tokens');
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const tokens = {
    colors: [
      { name: 'Primary', value: '#3b82f6', desc: 'Ana aksiyonlar ve marka rengi.' },
      { name: 'Accent', value: '#10b981', desc: 'Başarı ve pozitif durumlar.' },
      { name: 'Background', value: '#020617', desc: 'Karanlık mod zemin rengi.' },
      { name: 'Surface', value: '#0f172a', desc: 'Kart ve bileşen yüzeyleri.' },
      { name: 'Text Primary', value: '#f8fafc', desc: 'Yüksek kontrastlı metin.' },
      { name: 'Text Secondary', value: '#94a3b8', desc: 'Yardımcı metin ve açıklamalar.' }
    ],
    layers: [
      { name: 'Entities', value: '#ef4444', desc: 'İş nesneleri ve çekirdek veriler.' },
      { name: 'Use Cases', value: '#f59e0b', desc: 'Uygulama mantığı ve iş kuralları.' },
      { name: 'Adapters', value: '#3b82f6', desc: 'Dış dünya bağlantıları.' },
      { name: 'External', value: '#8b5cf6', desc: 'UI ve Framework katmanı.' }
    ]
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{ background: 'var(--bg-dark)', minHeight: '100vh' }}
    >
      <ArchHero 
        title="Design"
        subtitle="Tokens"
        description="Mimari seviyede görsel standardizasyon. Renk, tipografi ve boşlukların kodun her yerinde aynı dili konuşmasını sağlayan atomik değişkenler."
        badge="Architectural Branding"
        color="#06b6d4"
        illustration={
          <div style={{ position: 'relative', width: '350px', height: '350px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
             {[0, 1, 2].map(i => (
                <motion.div
                  key={i}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 10 + i * 2, repeat: Infinity, ease: "linear" }}
                  style={{
                    position: 'absolute',
                    width: `${250 - i * 60}px`,
                    height: `${250 - i * 60}px`,
                    border: '1px solid rgba(6, 182, 212, 0.3)',
                    borderRadius: '20%'
                  }}
                />
             ))}
             <Palette size={80} color="#06b6d4" />
          </div>
        }
        features={[
          { icon: <Shield />, title: 'SSOT', desc: 'Tüm stil değerleri tek bir merkezden yönetilir: index.css variables.' },
          { icon: <Zap />, title: 'Consistency', desc: 'Farklı sayfalar arasında görsel tutarlılık garanti altına alınır.' },
          { icon: <Sparkles />, title: 'Maintainability', desc: 'Marka değişikliği veya tema güncellemesi saniyeler içinde yapılır.' }
        ]}
      />

      <section style={{ padding: '80px 0' }}>
        <div className="container">
          <h2 className="section-title">Renk Paleti (Color Tokens)</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            {tokens.colors.map((color, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="glass-card"
                style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', padding: '1.5rem' }}
              >
                <div style={{ width: '60px', height: '60px', borderRadius: '12px', background: color.value, boxShadow: `0 0 20px ${color.value}44` }} />
                <div>
                  <h4 style={{ margin: 0 }}>{color.name}</h4>
                  <code style={{ fontSize: '0.8rem', color: color.value }}>{color.value}</code>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '0.3rem' }}>{color.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: '80px 0', background: 'rgba(255,255,255,0.02)' }}>
        <div className="container">
          <h2 className="section-title">Katman Tokenları (Layer Tokens)</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
            {tokens.layers.map((layer, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                className="glass-card"
                style={{ 
                    textAlign: 'center', 
                    borderTop: `4px solid ${layer.value}`,
                    padding: '2.5rem'
                }}
              >
                <div style={{ 
                    display: 'inline-flex', 
                    padding: '1rem', 
                    borderRadius: '50%', 
                    background: `${layer.value}11`, 
                    color: layer.value,
                    marginBottom: '1.5rem'
                }}>
                  <Box size={32} />
                </div>
                <h3>{layer.name}</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginTop: '1rem' }}>{layer.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: '80px 0 150px' }}>
        <div className="container">
          <div className="glass-card" style={{ 
            background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.1) 0%, transparent 100%)',
            padding: '4rem',
            textAlign: 'center',
            border: '1px solid rgba(6, 182, 212, 0.2)'
          }}>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>Neden Design Tokens?</h2>
            <p style={{ maxWidth: '800px', margin: '0 auto', fontSize: '1.2rem', color: 'var(--text-secondary)', lineHeight: 1.8 }}>
              Yazılım mimarisinde <strong>Domain-Driven Design</strong> veriyi ne kadar koruyorsa, 
              <strong>Design Tokens</strong> da markanın görsel kimliğini ve kullanıcı deneyimini o kadar korur. 
              Geliştiriciler renklerle değil, "semantik" isimlerle konuşur.
            </p>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default DesignTokensPage;
