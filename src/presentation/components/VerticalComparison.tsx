import React from 'react';
import { motion } from 'framer-motion';
import { Layers, Combine, ArrowRight } from 'lucide-react';

const VerticalComparison = () => {
  return (
    <section style={{ padding: '100px 0', background: 'rgba(2, 6, 23, 0.5)' }}>
      <div className="container">
        <h2 className="section-title">Yatay mi, Dikey mi?</h2>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem' }}>
          {/* Horizontal Layers */}
          <div className="glass-card" style={{ borderTop: '4px solid #3b82f6' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
              <Layers color="#3b82f6" size={32} />
              <h3 style={{ fontSize: '1.5rem' }}>Katmanlı Mimari (Şablon)</h3>
            </div>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
              Katı bir şablon sunar: Bir özellik eklemek için Persistence, Domain ve Application katmanlarının tamamını 
              değiştirmek zorundasınızdır.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {['Infrastructure', 'Persistence', 'Domain', 'Application'].map((layer, i) => (
                <div key={i} style={{ 
                  padding: '10px', 
                  background: 'rgba(59, 130, 246, 0.1)', 
                  borderRadius: '8px',
                  textAlign: 'center',
                  fontSize: '0.8rem',
                  border: '1px solid rgba(59, 130, 246, 0.2)'
                }}>{layer}</div>
              ))}
            </div>
          </div>

          {/* Vertical Slices */}
          <div className="glass-card" style={{ borderTop: '4px solid #f97316' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
              <Combine color="#f97316" size={32} />
              <h3 style={{ fontSize: '1.5rem' }}>Vertical Slice (Dikey)</h3>
            </div>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
              Kodu özelliklere (Features) göre böler. Her dilim kendi Controller, Logic ve Repository kodunu içinde barındırır.
            </p>
            <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
              {['Giriş Yap', 'Sipariş Ver', 'Ürün Ara'].map((slice, i) => (
                <div key={i} style={{ 
                  padding: '40px 10px', 
                  background: 'rgba(249, 115, 22, 0.1)', 
                  borderRadius: '8px',
                  textAlign: 'center',
                  fontSize: '0.8rem',
                  border: '1px solid rgba(249, 115, 22, 0.2)',
                  writingMode: 'vertical-rl',
                  textOrientation: 'mixed'
                }}>{slice}</div>
              ))}
            </div>
          </div>
        </div>

        <div className="glass-card" style={{ marginTop: '4rem', textAlign: 'center', background: 'rgba(255,255,255,0.02)' }}>
          <p style={{ fontSize: '1.1rem', fontStyle: 'italic', color: 'var(--text-secondary)' }}>
            "Mimarinin amacı kararları ertelemektir. Vertical Slice ile her dilim için farklı bir mimari 
            karar (Basit bir CRUD veya karmaşık bir Domain model) verebilirsiniz."
          </p>
        </div>
      </div>
    </section>
  );
};

export default VerticalComparison;
