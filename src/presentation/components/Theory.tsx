import React from 'react';
import { motion } from 'framer-motion';

const Theory = () => {
  const layers = [
    { 
      name: 'Entities (Kurumsal İş Kuralları)', 
      color: 'var(--layer-entities)', 
      desc: 'En iç katman. Uygulamanın en temel iş nesnelerini ve mantığını içerir. Hiçbir şeye bağımlı değildir.' 
    },
    { 
      name: 'Use Cases (Uygulama İş Kuralları)', 
      color: 'var(--layer-usecases)', 
      desc: 'Sistemin spesifik iş akışlarını tanımlar. Entitileri kullanarak verinin nasıl akacağını yönetir.' 
    },
    { 
      name: 'Interface Adapters', 
      color: 'var(--layer-adapters)', 
      desc: 'Veriyi Use Case formatından DB veya Web formatına dönüştüren katman (Controllers, Presenters).' 
    },
    { 
      name: 'Frameworks & Drivers', 
      color: 'var(--layer-external)', 
      desc: 'En dış katman. DB, UI, Web Framework gibi araçların bulunduğu yerdir. Her an değişebilir.' 
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
            <div style={{
              zIndex: 10,
              textAlign: 'center',
              fontWeight: 800,
              color: 'var(--layer-entities)',
              fontSize: '1.2rem'
            }}>
              ENTITIES
            </div>
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
