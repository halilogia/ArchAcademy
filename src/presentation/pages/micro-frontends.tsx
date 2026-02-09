import React from 'react';
import { motion } from 'framer-motion';
import { Puzzle, BringToFront, Split } from 'lucide-react';
import ArchHero from '../components/ArchHero';
import { theme } from '../themes/theme';

const MicroFrontendsPage = () => {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ background: theme.colors.bgDark, minHeight: '100vh' }}>
      <ArchHero
        title="Micro"
        subtitle="Frontends"
        description="Monolitik frontend uygulamalarını, bağımsız takımların geliştirebileceği küçük ve özerk parçalara bölme stratejisi."
        badge="Scalability Strategy"
        color="#ec4899"
        illustration={
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', width: '200px' }}>
            {['#ec4899', '#8b5cf6', '#3b82f6', '#10b981'].map((c, i) => (
              <motion.div
                key={i}
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, delay: i * 0.2, repeat: Infinity }}
                style={{ height: '80px', background: c, borderRadius: '12px', opacity: 0.8 }}
              />
            ))}
          </div>
        }
        features={[
          { icon: <Split />, title: 'Team Autonomy', desc: 'Her takım kendi teknolojisini (React, Vue) seçebilir.' },
          { icon: <Puzzle />, title: 'Independent Deploy', desc: 'Sepet takımı, Arama takımını beklemeden canlıya çıkabilir.' },
          { icon: <BringToFront />, title: 'Incremental Upgrade', desc: 'Uygulamayı parça parça modernize edebilirsiniz.' }
        ]}
      />

      <section style={{ padding: '80px 0', background: 'rgba(2, 6, 23, 0.4)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 className="section-title">Entegrasyon Stratejileri</h2>
            <p style={{ color: theme.colors.textSecondary }}>Parçaları nasıl birleştirmeli?</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            <div className="glass-card" style={{ borderTop: '4px solid #ec4899' }}>
              <h4 style={{ color: 'white', marginBottom: '1rem' }}>Server-Side Composition</h4>
              <p style={{ color: theme.colors.textSecondary, fontSize: '0.9rem', lineHeight: 1.6 }}>
                Sunucu tarafında (SSR) farklı servislerden gelen HTML parçaları birleştirilir. En hızlı "First Contentful Paint" sonucunu verir.
              </p>
            </div>
            <div className="glass-card" style={{ borderTop: '4px solid #8b5cf6' }}>
              <h4 style={{ color: 'white', marginBottom: '1rem' }}>Build-Time Integration</h4>
              <p style={{ color: theme.colors.textSecondary, fontSize: '0.9rem', lineHeight: 1.6 }}>
                Mikro frontendler NPM paketleri olarak yayınlanır ve ana uygulamada "compile-time" sırasında birleştirilir.
                Güvenlidir ama bağımsız dağıtım (deployment) zorlaşır.
              </p>
            </div>
            <div className="glass-card" style={{ borderTop: '4px solid #3b82f6' }}>
              <h4 style={{ color: 'white', marginBottom: '1rem' }}>Run-Time Integration</h4>
              <p style={{ color: theme.colors.textSecondary, fontSize: '0.9rem', lineHeight: 1.6 }}>
                En popüler yöntemdir (Module Federation). Parçalar tarayıcıda çalışma anında yüklenir. Tam bağımsızlık sağlar.
              </p>
            </div>
          </div>

          <div style={{ marginTop: '4rem', padding: '3rem', background: theme.colors.surface, borderRadius: '24px', border: `1px solid ${theme.effects.glassBorder}` }}>
            <h3 style={{ marginBottom: '1.5rem', textAlign: 'center' }}>Zorluklar ve Dikkat Edilmesi Gerekenler</h3>
            <ul style={{ color: theme.colors.textSecondary, listStyle: 'none', padding: 0, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <li style={{ background: 'rgba(255,255,255,0.02)', padding: '15px', borderRadius: '12px' }}>
                <strong>Payload Size:</strong> Her mikro uygulamanın kendi React kütüphanesini indirmesi performansı bozabilir.
              </li>
              <li style={{ background: 'rgba(255,255,255,0.02)', padding: '15px', borderRadius: '12px' }}>
                <strong>Style Isolation:</strong> CSS çakışmalarını önlemek için Shadow DOM veya CSS-in-JS kullanılmalıdır.
              </li>
              <li style={{ background: 'rgba(255,255,255,0.02)', padding: '15px', borderRadius: '12px' }}>
                <strong>Communication:</strong> Uygulamalar arası veri paylaşımı "Custom Events" üzerinden yapılmalıdır.
              </li>
              <li style={{ background: 'rgba(255,255,255,0.02)', padding: '15px', borderRadius: '12px' }}>
                <strong>Consistency:</strong> Kullanıcı deneyiminin (UI/UX) tüm parçalarda aynı kalması için bir Design System şarttır.
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section style={{ padding: '4rem 0' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <div style={{
            background: 'linear-gradient(180deg, rgba(15, 23, 42, 0) 0%, rgba(15, 23, 42, 0.5) 100%)',
            padding: '3rem',
            borderRadius: '24px',
            border: `1px solid ${theme.effects.glassBorder}`,
            maxWidth: '900px',
            margin: '0 auto'
          }}>
            <div style={{ fontSize: '0.8rem', letterSpacing: '2px', fontWeight: 800, color: 'rgba(255,255,255,0.4)', marginBottom: '1rem', textTransform: 'uppercase' }}>
              Deep Dive Article
            </div>
            <p style={{ color: theme.colors.textSecondary, marginBottom: '2rem', fontSize: '1.1rem', lineHeight: 1.6 }}>
              Micro Frontends kavramının tanımı, avantajları ve uygulama yöntemleri Martin Fowler'ın sitesinde detaylıca anlatılmıştır.
            </p>

            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <a
                href="https://martinfowler.com/articles/micro-frontends.html"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '8px',
                  background: 'rgba(236, 72, 153, 0.15)', color: '#fbcfe8',
                  padding: '12px 24px', borderRadius: '12px', textDecoration: 'none', fontWeight: 600,
                  border: '1px solid rgba(236, 72, 153, 0.2)', transition: 'all 0.2s'
                }}
              >
                Micro Frontends Guide <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" /></svg>
              </a>
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
};
export default MicroFrontendsPage;
