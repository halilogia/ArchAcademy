import React from 'react';
import { motion } from 'framer-motion';
import OnionHero from '../components/OnionHero';
import OnionDiagram from '../components/OnionDiagram';
import OnionPractical from '../components/OnionPractical';
import { theme } from '../themes/theme';

const OnionPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{ background: theme.colors.bgDark }}
    >
      <OnionHero />
      <OnionDiagram />
      <OnionPractical />

      <section style={{ padding: '80px 0', background: 'rgba(2, 6, 23, 0.3)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 className="section-title">Mimari Çekirdek Kuralları</h2>
            <p style={{ color: theme.colors.textSecondary }}>Bağımlılıkların yönü her zaman merkeze doğrudur.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem' }}>
            <div className="glass-card" style={{ borderLeft: `4px solid ${theme.colors.layers.entities}` }}>
              <h3 style={{ marginBottom: '1.5rem', color: theme.colors.layers.entities }}>1. Bağımlılık Yönü (Dependency)</h3>
              <p style={{ color: theme.colors.textSecondary, lineHeight: 1.8 }}>
                Tüm katmanlar sadece kendisinden daha "içte" olan katmana erişebilir.
                Dış katmanlar iç katmanları bilir, ancak iç katmanlar dış dünya hakkında hiçbir fikre sahip değildir.
                <br /><br />
                <span style={{ color: theme.colors.textPrimary, fontWeight: 600 }}>Örn:</span> Domain katmanı veritabanını (Persistence) veya Web API'yi bilmez.
              </p>
            </div>

            <div className="glass-card" style={{ borderLeft: `4px solid ${theme.colors.layers.entities}` }}>
              <h3 style={{ marginBottom: '1.5rem', color: theme.colors.layers.entities }}>2. Soyutlama (Abstraction)</h3>
              <p style={{ color: theme.colors.textSecondary, lineHeight: 1.8 }}>
                İç katmanlar (Domain/Core), dış dünyadaki sistemlerle (DB, API, Mail) haberleşmek için
                <strong>Interface</strong> tanımlar. Bu arayüzlerin gerçek implementasyonları en dış katmanda (Infrastructure) yapılır.
              </p>
            </div>
          </div>

          <div style={{ marginTop: '4rem' }}>
            <h3 style={{ textAlign: 'center', marginBottom: '2rem' }}>Katman Hiyerarşisi</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {[
                { name: 'Infrastructure (Dış)', color: theme.colors.surfaceLight, desc: 'Veritabanı, Web API Framework, Dosya Sistemi.' },
                { name: 'Application Services', color: '#475569', desc: 'UseCase koordinasyonu, Interface implementasyonları.' },
                { name: 'Domain Services', color: theme.colors.surface, desc: "Birden fazla Entity'yi ilgilendiren iş mantığı." },
                { name: 'Domain Model (Merkez)', color: theme.colors.layers.entities, desc: 'Saf iş kuralları, Entityler ve Value Objectler.' },
              ].map((layer, i) => (
                <div key={i} style={{
                  padding: '20px',
                  background: layer.color,
                  borderRadius: '12px',
                  border: '1px solid rgba(255,255,255,0.05)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <strong style={{ color: theme.colors.textPrimary }}>{layer.name}</strong>
                  <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem' }}>{layer.desc}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section style={{ padding: '80px 0', borderTop: '1px solid var(--glass-border)' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <div className="glass-card" style={{
            background: 'linear-gradient(135deg, rgba(244, 63, 94, 0.1) 0%, rgba(251, 113, 133, 0.1) 100%)',
            padding: '4rem'
          }}>
            <h3 style={{ marginBottom: '1.5rem' }}>Özet: Katmanların Gücü</h3>
            <p style={{ maxWidth: '800px', margin: '0 auto', color: 'var(--text-secondary)', lineHeight: 1.8 }}>
              Onion Architecture, yazılımın teknik detaylarını (UI, DATABASE) en dışta bırakarak
              "İş Kurallarını" koruma altına alır. Bu mimaride kodunuz bir soğana benzer;
              dış katmanları soysanız dahi, en içteki değerli çekirdek (Business Logic)
              hiçbir zarar görmeden çalışmaya devam eder.
            </p>
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
              The Origin
            </div>
            <p style={{ color: '#94a3b8', marginBottom: '2rem', fontSize: '1.1rem', lineHeight: 1.6 }}>
              2008 yılında Jeffrey Palermo tarafından ortaya atılan "Onion Architecture", bağımlılıkların yönünü tersine çevirerek modern mimarinin temellerini atmıştır.
            </p>

            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <a
                href="https://jeffreypalermo.com/2008/07/the-onion-architecture-part-1/"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex', alignItems: 'center', gap: '8px',
                  background: 'rgba(244, 63, 94, 0.15)', color: '#fda4af',
                  padding: '12px 24px', borderRadius: '12px', textDecoration: 'none', fontWeight: 600,
                  border: '1px solid rgba(244, 63, 94, 0.2)', transition: 'all 0.2s'
                }}
              >
                The Onion Architecture (Jeffrey Palermo) <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" /></svg>
              </a>
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default OnionPage;
