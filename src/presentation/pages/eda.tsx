import React from 'react';
import { motion } from 'framer-motion';
import EDAHero from '../components/EDAHero';
import EDADiagram from '../components/EDADiagram';
import EDAPractical from '../components/EDAPractical';

const EDAPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{ background: 'var(--bg-dark)' }}
    >
      <EDAHero />
      <EDADiagram />
      <EDAPractical />
      
      <section style={{ padding: '80px 0', background: 'rgba(2, 6, 23, 0.4)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 className="section-title">Event-Driven Pattern Çeşitleri</h2>
            <p style={{ color: 'var(--text-secondary)' }}>Farklı amaçlar için farklı event stratejileri.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            <div className="glass-card" style={{ borderTop: '4px solid #a855f7' }}>
              <h4 style={{ color: 'white', marginBottom: '1rem' }}>1. Event Notification</h4>
              <p style={{ color: '#94a3b8', fontSize: '0.9rem', lineHeight: 1.6 }}>
                En basit formdur. Bir sistem "Bir şey oldu" der, detay vermez. Alıcı gerekirse detayları sormak için sistemi geri arar.
              </p>
            </div>
            <div className="glass-card" style={{ borderTop: '4px solid #a855f7' }}>
              <h4 style={{ color: 'white', marginBottom: '1rem' }}>2. Event-Carried State Transfer</h4>
              <h4 style={{ color: 'white', marginBottom: '1rem' }}>2. Event-Carried State Transfer</h4>
              <p style={{ color: '#94a3b8', fontSize: '0.9rem', lineHeight: 1.6 }}>
                Event, alıcının işini yapması için gereken tüm veriyi taşır. Alıcının gönderen sisteme geri dönmesine gerek kalmaz.
              </p>
            </div>
            <div className="glass-card" style={{ borderTop: '4px solid #a855f7' }}>
              <h4 style={{ color: 'white', marginBottom: '1rem' }}>3. Event Sourcing</h4>
              <p style={{ color: '#94a3b8', fontSize: '0.9rem', lineHeight: 1.6 }}>
                Sistemin durumu (State), geçmişteki tüm event'lerin birikimidir. Veritabanında son durum değil, event log tutulur.
              </p>
            </div>
          </div>

          <div style={{ marginTop: '4rem', padding: '3rem', background: '#0f172a', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.05)' }}>
             <h3 style={{ marginBottom: '2rem', textAlign: 'center' }}>Neden EDA?</h3>
             <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem' }}>
                <div>
                  <h4 style={{ color: '#10b981', marginBottom: '1rem' }}>✅ Avantajlar</h4>
                  <ul style={{ color: '#94a3b8', paddingLeft: '20px', lineHeight: 2 }}>
                    <li>Yüksek Gevşek Bağlılık (Loose Coupling)</li>
                    <li>Sistemler Arası Ölçeklenebilirlik</li>
                    <li>Gerçek Zamanlı Tepki Kabiliyeti</li>
                    <li>Hata Toleransı ve Yeniden İşleme</li>
                  </ul>
                </div>
                <div>
                  <h4 style={{ color: '#f43f5e', marginBottom: '1rem' }}>❌ Dezavantajlar</h4>
                  <ul style={{ color: '#94a3b8', paddingLeft: '20px', lineHeight: 2 }}>
                    <li>Takip Edilebilirlik (Traceability) Zorluğu</li>
                    <li>Consistency Yönetimi (Eventual Consistency)</li>
                    <li>Altyapı Karmaşıklığı (Broker Yönetimi)</li>
                  </ul>
                </div>
             </div>
          </div>
        </div>
      </section>
      
      <section style={{ padding: '4rem 0', background: 'rgba(0,0,0,0.3)', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <div className="container" style={{ textAlign: 'center' }}>
           <div style={{ 
             background: 'linear-gradient(180deg, rgba(15, 23, 42, 0) 0%, rgba(15, 23, 42, 0.5) 100%)', 
             padding: '3rem', 
             borderRadius: '24px', 
             border: '1px solid rgba(255,255,255,0.05)',
             maxWidth: '900px',
             margin: '0 auto'
           }}>
              <div style={{ fontSize: '0.8rem', letterSpacing: '2px', fontWeight: 800, color: 'rgba(255,255,255,0.4)', marginBottom: '1rem', textTransform: 'uppercase' }}>
                Deep Dive Article
              </div>
              <p style={{ color: '#94a3b8', marginBottom: '2rem', fontSize: '1.1rem', lineHeight: 1.6 }}>
                "Event-Driven" teriminin tam olarak ne anlama geldiğini ve farklı kullanım şekillerini (Notification, State Transfer, Sourcing) Martin Fowler'ın makalesinden öğrenebilirsiniz.
              </p>
              
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                 <a 
                   href="https://martinfowler.com/articles/201701-event-driven.html" 
                   target="_blank" 
                   rel="noopener noreferrer"
                   style={{ 
                     display: 'flex', alignItems: 'center', gap: '8px', 
                     background: 'rgba(168, 85, 247, 0.15)', color: '#d8b4fe', 
                     padding: '12px 24px', borderRadius: '12px', textDecoration: 'none', fontWeight: 600,
                     border: '1px solid rgba(168, 85, 247, 0.2)', transition: 'all 0.2s'
                   }}
                 >
                    What do you mean by "Event-Driven"? <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                 </a>
              </div>
           </div>
        </div>
      </section>
    </motion.div>
  );
};

export default EDAPage;
