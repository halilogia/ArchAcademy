import React from 'react';
import { motion } from 'framer-motion';

const FSDDiagram = () => {
  const layers = [
    { name: 'app', desc: 'Uygulama kurulumu, providerlar ve global stiller.', color: 'rgba(6, 182, 212, 0.4)' },
    { name: 'pages', desc: 'Full-page bileşenleri. Rotalar burada tanımlanır.', color: 'rgba(6, 182, 212, 0.35)' },
    { name: 'widgets', desc: 'Pages içinde kullanılan büyük bloklar (örn: Navbar, Footer).', color: 'rgba(6, 182, 212, 0.3)' },
    { name: 'features', desc: 'Kullanıcı etkileşimleri ve iş değeri taşıyan parçalar (örn: AddToCart).', color: 'rgba(6, 182, 212, 0.25)' },
    { name: 'entities', desc: 'İş nesneleri ve onlarla ilgili mantık (örn: User, Product).', color: 'rgba(6, 182, 212, 0.2)' },
    { name: 'shared', desc: 'Tüm projede kullanılan ortak araçlar (örn: UI Kit, API helpterlar).', color: 'rgba(6, 182, 212, 0.15)' },
  ];

  return (
    <section style={{ padding: '100px 0', background: 'rgba(2, 6, 23, 0.5)' }}>
      <div className="container" style={{ textAlign: 'center' }}>
        <h2 className="section-title">FSD Katman Hiyerarşisi</h2>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '4rem', maxWidth: '600px', margin: '0 auto 4rem' }}>
          FSD'de temel kural: Bir katman sadece kendisinden <strong>daha aşağıda</strong> yer alan katmanları kullanabilir.
        </p>
        
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
          {layers.map((layer, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="glass-card"
              style={{
                width: `${700 - (i * 40)}px`,
                padding: '1.25rem 2rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderLeft: `4px solid #06b6d4`,
                background: layer.color
              }}
            >
              <span style={{ fontWeight: 800, fontSize: '1.2rem', color: 'white' }}>{layer.name}</span>
              <span style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.8)', textAlign: 'right', maxWidth: '400px' }}>
                {layer.desc}
              </span>
            </motion.div>
          ))}
          
          <div style={{ marginTop: '2rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#06b6d4' }}>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              <div style={{ width: '2px', height: '60px', background: '#06b6d4' }} />
            </motion.div>
            <span style={{ fontSize: '0.8rem', fontWeight: 700 }}>BAĞIMLILIK YÖNÜ (AŞAĞIYA DOĞRU)</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FSDDiagram;
