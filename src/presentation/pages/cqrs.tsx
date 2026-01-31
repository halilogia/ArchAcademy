import React from 'react';
import { motion } from 'framer-motion';
import CQRSHero from '../components/CQRSHero';
import CQRSDiagram from '../components/CQRSDiagram';
import CQRSPractical from '../components/CQRSPractical';
import CQRSSection from '../components/CQRSSection';

const CQRSPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{ background: 'var(--bg-dark)' }}
    >
      <CQRSHero />
      <CQRSDiagram />
      <CQRSPractical />
      
      <section style={{ padding: '80px 0', background: 'rgba(2, 6, 23, 0.4)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 className="section-title">Komut ve Sorgu Ayrımı</h2>
            <p style={{ color: 'var(--text-secondary)' }}>Okuma ve yazma işlemlerini farklı modellerle yönetme sanatı.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem' }}>
            {/* Commands */}
            <div className="glass-card" style={{ borderTop: '4px solid #ef4444' }}>
               <h3 style={{ marginBottom: '1.5rem', color: '#f87171' }}>Commands (Yazma)</h3>
               <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8 }}>
                 Sistemin durumunu değiştiren işlemlerdir. Cevap olarak sadece işlemin başarılı olup olmadığını veya bir hata dönerler.
                 <br/><br/>
                 <strong>Örnek:</strong> SiparişVer, ŞifreDeğiştir, KullanıcıEkle.
               </p>
            </div>

            {/* Queries */}
            <div className="glass-card" style={{ borderTop: '4px solid #3b82f6' }}>
               <h3 style={{ marginBottom: '1.5rem', color: '#60a5fa' }}>Queries (Okuma)</h3>
               <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8 }}>
                 Sistemin durumunu asla değiştirmezler. Sadece veri dönerler (DTO). Genellikle performans için optimize edilmiş görünümler (Views) kullanırlar.
                 <br/><br/>
                 <strong>Örnek:</strong> SiparişDetaylarınıGetir, EnÇokSatanÜrünleriListele.
               </p>
            </div>
          </div>

          <div style={{ marginTop: '4rem', padding: '3rem', background: '#0f172a', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.05)' }}>
             <h3 style={{ marginBottom: '1.5rem' }}>Neden CQRS Kullanmalıyız?</h3>
             <p style={{ color: '#94a3b8', lineHeight: 1.8 }}>
                Çoğu uygulamada okuma işlemleri, yazma işlemlerine göre 100 kat daha fazladır. 
                CQRS ile okuma tarafını (Query) tamamen farklı bir veritabanına (Elasticsearch, Redis) taşıyabilir 
                ve yazma tarafını (Command) karmaşık iş kuralları için saklayabilirsiniz. 
                Bu sayede her iki tarafı da birbirinden bağımsız olarak ölçeklendirebilirsiniz.
             </p>
          </div>
        </div>
      </section>
      
      {/* Keeping the foundational overview at the bottom */}
      <div style={{ paddingBottom: '100px' }}>
        <CQRSSection />

        <section style={{ padding: '4rem 0', background: 'rgba(0,0,0,0.3)', borderTop: '1px solid rgba(255,255,255,0.05)', marginTop: '4rem' }}>
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
                  Standard Definition
                </div>
                <p style={{ color: '#94a3b8', marginBottom: '2rem', fontSize: '1.1rem', lineHeight: 1.6 }}>
                  CQRS (Command Query Responsibility Segregation) deseninin orijinal tanımı ve hangi durumlarda kullaılması gerektiği (veya gerekmediği) Martin Fowler tarafından detaylandırılmıştır.
                </p>
                
                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                   <a 
                     href="https://martinfowler.com/bliki/CQRS.html" 
                     target="_blank" 
                     rel="noopener noreferrer"
                     style={{ 
                       display: 'flex', alignItems: 'center', gap: '8px', 
                       background: 'rgba(124, 58, 237, 0.15)', color: '#d8b4fe', 
                       padding: '12px 24px', borderRadius: '12px', textDecoration: 'none', fontWeight: 600,
                       border: '1px solid rgba(124, 58, 237, 0.2)', transition: 'all 0.2s'
                     }}
                   >
                      CQRS Guide (Martin Fowler) <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                   </a>
                </div>
             </div>
          </div>
        </section>
      </div>
    </motion.div>
  );
};

export default CQRSPage;
