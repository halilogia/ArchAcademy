import React from 'react';
import { motion } from 'framer-motion';

const OnionDiagram = () => {
  const circles = [
    { name: 'Infrastructure & UI', size: 550, color: 'rgba(244, 63, 94, 0.1)', border: 'rgba(244, 63, 94, 0.2)' },
    { name: 'Tests / Adapters', size: 440, color: 'rgba(244, 63, 94, 0.15)', border: 'rgba(244, 63, 94, 0.4)' },
    { name: 'Application Services', size: 330, color: 'rgba(244, 63, 94, 0.2)', border: 'rgba(244, 63, 94, 0.6)' },
    { name: 'Domain Services', size: 220, color: 'rgba(244, 63, 94, 0.3)', border: 'rgba(244, 63, 94, 0.8)' },
    { name: 'Domain Model', size: 110, color: '#f43f5e', border: '#f43f5e' },
  ];

  return (
    <section style={{ padding: '100px 0' }}>
      <div className="container" style={{ textAlign: 'center' }}>
        <h2 className="section-title">Katmanlı Çekirdek Yapısı</h2>
        
        <div style={{
          position: 'relative',
          height: '600px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: '3rem'
        }}>
          {circles.map((circle, i) => (
            <motion.div
              key={i}
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              style={{
                position: 'absolute',
                width: `${circle.size}px`,
                height: `${circle.size}px`,
                borderRadius: '50%',
                backgroundColor: circle.color,
                border: `2px solid ${circle.border}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: i === 4 ? '0 0 30px rgba(244, 63, 94, 0.4)' : 'none'
              }}
            >
              <span style={{
                position: 'absolute',
                top: i === 4 ? '50%' : '15px',
                transform: i === 4 ? 'translateY(-50%)' : 'none',
                fontSize: i === 4 ? '0.7rem' : '0.8rem',
                fontWeight: 700,
                color: i === 4 ? 'white' : circle.border,
                textTransform: 'uppercase',
                maxWidth: '80px'
              }}>
                {circle.name}
              </span>
            </motion.div>
          ))}
          
          {/* Dependency Arrows */}
          <div style={{ position: 'absolute', left: '10%', top: '50%', transform: 'translateY(-50%)' }}>
            <motion.div
              animate={{ x: [0, 20, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}
            >
              <div style={{ width: '2px', height: '150px', background: 'linear-gradient(to bottom, #f43f5e, transparent)' }} />
              <span style={{ fontSize: '0.7rem', color: '#f43f5e', fontWeight: 800, transform: 'rotate(-90deg)', whiteSpace: 'nowrap' }}>
                BAĞIMLILIK YÖNÜ
              </span>
            </motion.div>
          </div>
        </div>
        
        <p style={{ marginTop: '4rem', maxWidth: '700px', margin: '4rem auto 0', color: 'var(--text-secondary)' }}>
          Onion Architecture'da tüm bağımlılıklar <strong>merkeze doğrudur</strong>. 
          Çekirdek katmanlar (Domain) dış katmanlar (UI, DB) hakkında hiçbir şey bilmez.
        </p>
      </div>
    </section>
  );
};

export default OnionDiagram;
