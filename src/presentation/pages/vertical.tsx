import React from 'react';
import { motion } from 'framer-motion';
// import ArchHero from '../components/ArchHero'; // Replaced by VerticalHero
import VerticalHero from '../components/VerticalHero';
import VerticalComparison from '../components/VerticalComparison';
import VerticalPractical from '../components/VerticalPractical';

const VerticalSlicePage = () => {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <VerticalHero />
      <VerticalComparison />
      <VerticalPractical />
      
      <section style={{ padding: '80px 0', background: 'var(--bg-dark)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 450px) 1fr', gap: '4rem', alignItems: 'start' }}>
            {/* Folder Structure Visualization */}
            <div className="glass-card" style={{ background: '#0f172a', padding: '2rem' }}>
              <h4 style={{ marginBottom: '1.5rem', color: '#f97316', display: 'flex', alignItems: 'center', gap: '8px' }}>
                📂 Proje Klasör Yapısı
              </h4>
              <div style={{ fontFamily: 'monospace', fontSize: '0.9rem', color: '#94a3b8' }}>
                <div>src/</div>
                <div style={{ paddingLeft: '20px' }}>Features/</div>
                <div style={{ paddingLeft: '40px', color: '#f97316' }}>Siparişler/</div>
                <div style={{ paddingLeft: '60px' }}>📦 SiparişVer.cs</div>
                <div style={{ paddingLeft: '60px' }}>📦 SiparişDetay.cs</div>
                <div style={{ paddingLeft: '60px' }}>📦 SiparişRepository.cs</div>
                <div style={{ paddingLeft: '40px', color: '#10b981' }}>Ürünler/</div>
                <div style={{ paddingLeft: '60px' }}>📦 ÜrünListele.cs</div>
                <div style={{ paddingLeft: '60px' }}>📦 ÜrünAra.cs</div>
                <div style={{ paddingLeft: '20px' }}>Infrastructure/</div>
                <div style={{ paddingLeft: '40px' }}>DatabaseContext.cs</div>
              </div>
              <p style={{ marginTop: '1.5rem', fontSize: '0.8rem', fontStyle: 'italic' }}>
                * Her klasör kendi içinde tamamen bağımsız bir minyatür mimaridir.
              </p>
            </div>

            {/* Core Rules */}
            <div>
              <h3 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '2rem' }}>Dikey Dilim Kuralları</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {[
                  { t: 'Özellik Bazlı Gruplama', d: 'Kodu teknik katmanlara (Controller/Service) göre değil, iş özelliklerine göre gruplayın.' },
                  { t: 'Minimum Paylaşım', d: 'Dilimler arasında kod paylaşımından kaçının. Kod tekrarı, sıkı bağımlılıktan (Coupling) daha iyidir.' },
                  { t: 'Esnek İç Yapı', d: 'Bir dilim basit bir SQL sorgusu kullanırken, diğeri karmaşık bir DDD Aggregate kullanabilir.' }
                ].map((rule, i) => (
                  <div key={i} style={{ display: 'flex', gap: '1rem' }}>
                    <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: 'rgba(249, 115, 22, 0.2)', color: '#f97316', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontWeight: 800, fontSize: '0.8rem' }}>{i+1}</div>
                    <div>
                      <h4 style={{ color: 'white', marginBottom: '4px' }}>{rule.t}</h4>
                      <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>{rule.d}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      
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
                Architecture Origin
              </div>
              <p style={{ color: '#94a3b8', marginBottom: '2rem', fontSize: '1.1rem', lineHeight: 1.6 }}>
                Minimalist CQRS ve Vertical Slice mimarisinin öncüsü Jimmy Bogard'ın (MediatR yaratıcısı) makalesini okuyun.
              </p>
              
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                 <a 
                   href="https://jimmybogard.com/vertical-slice-architecture/" 
                   target="_blank" 
                   rel="noopener noreferrer"
                   style={{ 
                     display: 'flex', alignItems: 'center', gap: '8px', 
                     background: 'rgba(16, 185, 129, 0.15)', color: '#6ee7b7', 
                     padding: '12px 24px', borderRadius: '12px', textDecoration: 'none', fontWeight: 600,
                     border: '1px solid rgba(16, 185, 129, 0.2)', transition: 'all 0.2s'
                   }}
                 >
                    Read Jimmy Bogard's Article <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                 </a>
              </div>
           </div>
        </div>
      </section>
    </motion.div>
  );
};

export default VerticalSlicePage;
