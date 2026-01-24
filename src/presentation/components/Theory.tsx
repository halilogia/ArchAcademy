import React from 'react';
import { motion } from 'framer-motion';

const Theory = () => {
  const layers = [
    { 
      name: 'Domain (Alan Katmanı)', 
      color: 'var(--layer-entities)', 
      desc: 'En iç çekirdek. Entities, Value Objects, Domain Events ve Exceptions burada yer alır. Saf iş mantığını temsil eder.' 
    },
    { 
      name: 'Application (Uygulama Katmanı)', 
      color: 'var(--layer-usecases)', 
      desc: 'İş Kuralları, CQRS (Queries & Commands) ve Infrastructure için tanımlanan Interface’ler burada bulunur. Uygulamanın "ne yapacağını" koordine eder.' 
    },
    { 
      name: 'Infrastructure (Altyapı Katmanı)', 
      color: 'var(--layer-adapters)', 
      desc: 'Teknik detaylar. DB Persistence Implementation, Identity (Auth), File Systems ve dış servis entegrasyonları burada yaşar.' 
    },
    { 
      name: 'Presentation / WebUI', 
      color: 'var(--layer-external)', 
      desc: 'Görsel katman. Controllers, Views ve Program/Startup (Bağımlılık Enjeksiyonu ayarları) bu katmanda yer alır.' 
    }
  ];

  return (
    <section id="theory" style={{ padding: '100px 0' }}>
      <div className="container">
        <h2 className="section-title">Mimari Katmanlar</h2>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '4rem',
          alignItems: 'center'
        }}>
          {/* Visual Representation */}
          <div style={{ position: 'relative', height: '500px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {layers.reverse().map((layer, i) => (
              <motion.div
                key={i}
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ delay: i * 0.1 }}
                style={{
                  position: 'absolute',
                  width: `${(4 - i) * 110}px`,
                  height: `${(4 - i) * 110}px`,
                  border: `2px solid ${layer.color}`,
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'rgba(255, 255, 255, 0.02)',
                  boxShadow: `inset 0 0 20px ${layer.color}20`,
                  textAlign: 'center',
                  padding: '20px'
                }}
              >
                <div style={{
                  position: 'absolute',
                  top: '10px',
                  fontSize: '0.7rem',
                  fontWeight: 700,
                  color: layer.color,
                  textTransform: 'uppercase'
                }}>
                  {layer.name.split(' ')[0]}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Text Content */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {layers.reverse().map((layer, i) => (
              <motion.div
                key={i}
                initial={{ x: 50, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ delay: i * 0.1 }}
                className="glass-card"
                style={{
                  padding: '1.5rem',
                  borderLeft: `4px solid ${layer.color}`
                }}
              >
                <h3 style={{ color: layer.color, marginBottom: '0.5rem' }}>{layer.name}</h3>
                <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)' }}>{layer.desc}</p>
              </motion.div>
            ))}
            <div className="glass-card" style={{ background: 'var(--primary)', color: 'white' }}>
              <h3 style={{ marginBottom: '0.5rem' }}>Bağımlılık Kuralı (The Dependency Rule)</h3>
              <p style={{ fontSize: '0.95rem', opacity: 0.9 }}>
                Bağımlılıklar her zaman sadece içeriye doğru yönelmelidir. İç katmanlar, dış katmanlar hakkında hiçbir bilgiye sahip olamaz.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Theory;
