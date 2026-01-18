import React from 'react';
import { motion } from 'framer-motion';
import { Radio, Share2, MessageSquare, Zap, Globe } from 'lucide-react';

const EDADiagram = () => {
  return (
    <section style={{ padding: '100px 0', background: 'rgba(2, 6, 23, 0.5)' }}>
      <div className="container">
        <h2 className="section-title">Olay Akış Mimarisi</h2>
        
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          position: 'relative',
          padding: '4rem 0'
        }}>
          {/* Publisher */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="glass-card"
            style={{ width: '220px', textAlign: 'center', borderColor: '#a855f7' }}
          >
            <Radio size={40} color="#a855f7" style={{ margin: '0 auto 1.5rem' }} />
            <h4 style={{ marginBottom: '0.5rem' }}>Publisher</h4>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Olayı yayınlayan servis. Kimin dinlediğini bilmez.</p>
          </motion.div>

          {/* Connection Line */}
          <div style={{ flex: 1, height: '2px', background: 'linear-gradient(to right, #a855f7, transparent)', margin: '0 2rem' }} />

          {/* Event Broker */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="glass-card"
            style={{ 
              width: '280px', 
              textAlign: 'center', 
              background: 'rgba(168, 85, 247, 0.1)',
              boxShadow: '0 0 30px rgba(168, 85, 247, 0.2)'
            }}
          >
            <Globe size={48} color="#a855f7" style={{ margin: '0 auto 1.5rem' }} />
            <h4 style={{ marginBottom: '0.5rem' }}>Event Broker</h4>
            <span style={{ fontSize: '0.7rem', color: '#a855f7', fontWeight: 700 }}>Kafka / RabbitMQ / Redis</span>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.5rem' }}>Olayları alır, saklar ve dağıtır.</p>
          </motion.div>

          {/* Connection Line */}
          <div style={{ flex: 1, height: '2px', background: 'linear-gradient(to left, #a855f7, transparent)', margin: '0 2rem' }} />

          {/* Consumers */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {[1, 2].map((i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="glass-card"
                style={{ width: '220px', textAlign: 'center' }}
              >
                <Share2 size={32} color={i === 1 ? '#a855f7' : '#c084fc'} style={{ margin: '0 auto 1rem' }} />
                <h4 style={{ fontSize: '1rem' }}>Consumer {i}</h4>
                <p style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>İlgilendiği olayı dinler ve aksiyon alır.</p>
              </motion.div>
            ))}
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginTop: '4rem' }}>
          <div className="glass-card">
            <h4 style={{ color: '#a855f7', marginBottom: '1rem' }}>Asenkron İletişim</h4>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
              Publisher,Consumer'ın cevabını beklemez. Bu da sistemin aşırı yüklenmesini önler ve hızı artırır.
            </p>
          </div>
          <div className="glass-card">
            <h4 style={{ color: '#a855f7', marginBottom: '1rem' }}>Gevşek Bağlılık (Loose Coupling)</h4>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
              Servisler birbirinden habersizdir. Bir servis çöksede diğeri olay yayınlamaya devam edebilir.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EDADiagram;
