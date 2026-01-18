import React from 'react';
import { motion } from 'framer-motion';
import { Smartphone, Laptop, Settings, Database, ArrowDown } from 'lucide-react';

const HorizontalDiagram = () => {
  const tiers = [
    { name: 'Presentation Tier', desc: 'Web UI, Mobile App, Desktop. Kullanıcı ile etkileşim katmanı.', icon: <Laptop size={24} /> },
    { name: 'Business Logic Tier', desc: 'İş kuralları, validasyonlar ve hesaplamalar.', icon: <Settings size={24} /> },
    { name: 'Data Access Tier', desc: 'Veritabanı CRUD işlemleri ve Repositoryler.', icon: <Database size={24} /> },
  ];

  return (
    <section style={{ padding: '100px 0', background: 'rgba(2, 6, 23, 0.5)' }}>
      <div className="container" style={{ textAlign: 'center' }}>
        <h2 className="section-title">N-Tier (Çok Katmanlı) Yapı</h2>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '4rem', maxWidth: '700px', margin: '0 auto 4rem' }}>
          Bağımlılıklar her zaman bir alt katmana doğrudur. Bu sayede bir katmanda yapılan değişiklik (örn: veritabanı değişimi) 
          diğer katmanları minimum düzeyde etkiler.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem' }}>
          {tiers.map((tier, i) => (
            <React.Fragment key={i}>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="glass-card"
                style={{
                  width: '600px',
                  padding: '2rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '2rem',
                  borderTop: i === 1 ? '4px solid #3b82f6' : '1px solid var(--glass-border)',
                  background: 'rgba(59, 130, 246, 0.05)'
                }}
              >
                <div style={{
                  background: 'rgba(59, 130, 246, 0.1)',
                  padding: '1rem',
                  borderRadius: '16px',
                  color: '#3b82f6'
                }}>
                  {tier.icon}
                </div>
                <div style={{ textAlign: 'left' }}>
                  <h4 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>{tier.name}</h4>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>{tier.desc}</p>
                </div>
              </motion.div>
              {i < tiers.length - 1 && (
                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                >
                  <ArrowDown size={32} color="#3b82f6" style={{ opacity: 0.5 }} />
                </motion.div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HorizontalDiagram;
