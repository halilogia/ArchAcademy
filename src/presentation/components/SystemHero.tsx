import React from 'react';
import { motion } from 'framer-motion';
import { Server, Share2, Layers, ArrowRight, ShieldAlert } from 'lucide-react';

const SystemHero = () => {
  return (
    <section style={{
      padding: '120px 0 60px',
      position: 'relative',
      overflow: 'hidden',
      background: 'radial-gradient(circle at top right, rgba(244, 63, 94, 0.1), transparent)'
    }}>
      <div className="container" style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '4rem', alignItems: 'center' }}>
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            background: 'rgba(244, 63, 94, 0.1)',
            padding: '8px 16px',
            borderRadius: '100px',
            color: '#f43f5e',
            fontSize: '0.85rem',
            fontWeight: 600,
            marginBottom: '2rem',
            border: '1px solid rgba(244, 63, 94, 0.2)'
          }}>
            <Server size={14} /> Sistemler Arası Mimari
          </div>

          <h1 className="gradient-text" style={{
            fontSize: '4.5rem',
            fontWeight: 800,
            lineHeight: 1.1,
            marginBottom: '1.5rem',
            letterSpacing: '-2px'
          }}>
            Monolith vs. <br /> Microservices
          </h1>
          
          <p style={{
            color: 'var(--text-secondary)',
            fontSize: '1.25rem',
            maxWidth: '600px',
            marginBottom: '3rem',
            lineHeight: 1.7
          }}>
            Tek parça miğfer mi, yoksa atomik parçalardan oluşan bir ordu mu? 
            Modern yazılım dünyasının en büyük "Sistem Tasarımı" kararını tüm 
            boyutlarıyla masaya yatırıyoruz.
          </p>

          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <button style={{
              background: '#f43f5e',
              color: 'white',
              padding: '1rem 2rem',
              borderRadius: '16px',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              boxShadow: '0 8px 24px rgba(244, 63, 94, 0.3)'
            }}>
              Savaş Alanını İncele <ArrowRight size={20} />
            </button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}
        >
          <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
            {/* Monolith Visual */}
            <div className="glass-card" style={{ padding: '2rem', textAlign: 'center', position: 'relative' }}>
              <div style={{ width: '80px', height: '120px', background: 'var(--primary)', borderRadius: '12px', margin: '0 auto 1rem', opacity: 0.8 }} />
              <span style={{ fontSize: '0.7rem', fontWeight: 800 }}>MONOLITH</span>
            </div>
            
            <span style={{ fontWeight: 800, color: 'var(--text-secondary)' }}>VS</span>

            {/* Microservices Visual */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.5rem' }}>
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="glass-card" style={{ padding: '1rem', textAlign: 'center' }}>
                  <div style={{ width: '30px', height: '30px', background: '#f43f5e', borderRadius: '6px', margin: '0 auto 0.5rem', opacity: 0.8 }} />
                  <span style={{ fontSize: '0.5rem', fontWeight: 800 }}>SRV {i}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SystemHero;
