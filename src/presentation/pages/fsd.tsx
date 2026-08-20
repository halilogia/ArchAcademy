import { useTranslation } from 'react-i18next';
import React from 'react';
import { motion } from 'framer-motion';
import FSDHero from '../components/FSDHero';
import FSDDiagram from '../components/FSDDiagram';
import FSDPractical from '../components/FSDPractical';


const FSDPage = () => {
  const { i18n } = useTranslation();
  const isEn = (i18n.resolvedLanguage || i18n.language || 'tr').startsWith('en');
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{ background: 'var(--bg-dark)' }}
    >
      <FSDHero />
      <FSDDiagram />
      <FSDPractical />
      
      <section style={{ padding: '80px 0', background: 'rgba(2, 6, 23, 0.4)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 className="section-title">Katman Hiyerarşisi</h2>
            <p style={{ color: 'var(--text-secondary)' }}>Yukarıdan aşağıya doğru sarsılmaz bir düzen.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 400px) 1fr', gap: '3rem' }}>
            {/* Visual Layers */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {[
                { n: '1. App', c: '#0891b2', d: 'Setup, providers, styles.' },
                { n: '2. Pages', c: '#0e7490', d: 'Full-length routes.' },
                { n: '3. Widgets', c: '#155e75', d: 'Large self-contained UI blocks.' },
                { n: '4. Features', c: '#164e63', d: 'User interactions & scenarios.' },
                { n: '5. Entities', c: '#0f172a', d: 'Business entities (User, Post).' },
                { n: '6. Shared', c: '#1e293b', d: 'Reusable UI, Utils, Libs.' },
              ].map((layer, i) => (
                <div key={i} style={{ 
                  padding: '15px 20px', background: layer.c, borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)',
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center'
                }}>
                  <strong style={{ color: 'white', fontSize: '0.9rem' }}>{layer.n}</strong>
                  <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.75rem' }}>{layer.d}</span>
                </div>
              ))}
            </div>

            {/* Rules Text */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', justifyContent: 'center' }}>
               <div className="glass-card" style={{ borderLeft: '4px solid #06b6d4' }}>
                  <h4 style={{ color: 'white', marginBottom: '10px' }}>Bağımlılık Kuralı</h4>
                  <p style={{ color: '#94a3b8', fontSize: '0.95rem' }}>
                    Bir katman sadece altındaki katmanlardan bir şeyler import edebilir. Asla yanındaki veya üstündeki katmana erişemez.
                  </p>
               </div>
               <div className="glass-card" style={{ borderLeft: '4px solid #06b6d4' }}>
                  <h4 style={{ color: 'white', marginBottom: '10px' }}>Public API (index.ts)</h4>
                  <p style={{ color: '#94a3b8', fontSize: '0.95rem' }}>
                    Her dilim (slice) dışarıya sadece ihtiyacı olanı verir. Internal dosyalar asla dışarıdan import edilmemelidir.
                  </p>
               </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* FSD 3.0 / AI-Native Lean Modernization Section */}
      <section style={{ padding: '80px 0', borderTop: '1px solid var(--glass-border)' }}>
        <div className="container">
          <div className="glass-card" style={{ padding: '3.5rem', borderTop: '4px solid #06b6d4' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(6, 182, 212, 0.15)', color: '#06b6d4', padding: '6px 16px', borderRadius: '100px', fontSize: '0.8rem', fontWeight: 900, marginBottom: '1.5rem' }}>
              🚀 YENİ NESİL: FSD 3.0 & AI-NATIVE LEAN FRONTEND
            </div>
            
            <h2 style={{ fontSize: '2.5rem', fontWeight: 900, color: 'white', marginBottom: '1rem', letterSpacing: '-1px' }}>
              {isEn ? "FSD 3.0: Modernizing for AI Locality & High Velocity" : "FSD 3.0: Klasik FSD'yi AI-Native ve Yalın Hale Getirmek"}
            </h2>
            
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: 1.8, marginBottom: '3rem', maxWidth: '900px' }}>
              {isEn 
                ? "Traditional FSD mandates strict sub-segmenting (api, model, ui, lib) inside every slice, which hurts AI LLM locality (2/5). FSD 3.0 merges Vertical Slice's flat cohesion with FSD's boundary rules, elevating AI Locality to 4.5/5 ⭐." 
                : "Klasik FSD her dilimin altına zorla 4 alt klasör (api, model, ui, lib) açtığı için yapay zeka (LLM) bağlamını parçalar (2/5). FSD 3.0 (Lean FSD), Vertical Slice'ın tek dosyada bitirme hızını FSD'nin bağımlılık kurallarıyla birleştirerek AI Locality puanını zirveye (4.5/5 ⭐) taşır."
              }
            </p>

            {/* Visual Side-by-Side Comparison */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem', marginBottom: '3rem' }}>
              {/* Classic FSD */}
              <div style={{ background: '#020617', padding: '2rem', borderRadius: '16px', border: '1px solid rgba(239, 68, 68, 0.3)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <h4 style={{ color: '#ef4444', fontWeight: 800, margin: 0 }}>❌ Geleneksel Aşırı Parçalı FSD (2/5 ⭐)</h4>
                  <span style={{ fontSize: '0.75rem', background: 'rgba(239, 68, 68, 0.2)', color: '#ef4444', padding: '2px 8px', borderRadius: '6px' }}>Hantal</span>
                </div>
                <pre style={{ fontSize: '0.8rem', color: '#94a3b8', fontFamily: 'monospace', lineHeight: 1.6, background: 'rgba(0,0,0,0.4)', padding: '1rem', borderRadius: '10px' }}>
{`📁 features/user-profile/
  📁 api/
    📄 getUser.ts
  📁 ui/
    📄 ProfileAvatar.tsx
    📄 ProfileCard.tsx
  📁 model/
    📄 profileTypes.ts
  📁 lib/
    📄 formatBio.ts
  📄 index.ts (2 satırlık export)`}
                </pre>
                <p style={{ marginTop: '1rem', fontSize: '0.85rem', color: '#f87171', lineHeight: 1.5, margin: 0 }}>
                  ⚠️ <strong>Sorun:</strong> Basit bir profil kartı için AI 5 dosya ve 4 klasör gezer. Token israfı ve bağlam kopukluğu yaşanır.
                </p>
              </div>

              {/* Modern Lean FSD */}
              <div style={{ background: '#020617', padding: '2rem', borderRadius: '16px', border: '1px solid rgba(6, 182, 212, 0.3)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <h4 style={{ color: '#06b6d4', fontWeight: 800, margin: 0 }}>✅ FSD 3.0 / AI-Native Lean (4.5/5 ⭐)</h4>
                  <span style={{ fontSize: '0.75rem', background: 'rgba(6, 182, 212, 0.2)', color: '#06b6d4', padding: '2px 8px', borderRadius: '6px' }}>Yalın & Hızlı</span>
                </div>
                <pre style={{ fontSize: '0.8rem', color: '#38bdf8', fontFamily: 'monospace', lineHeight: 1.6, background: 'rgba(0,0,0,0.4)', padding: '1rem', borderRadius: '10px' }}>
{`📁 features/user-profile/
  📄 ProfileCard.tsx  (UI + Fetcher + Types aynı dosyada)
  📄 index.ts         (Public API export)

// ⚡ 6 Katman yerine 4 Katman:
📁 app/
📁 pages/
📁 features/ (Vertical Flat Slices)
📁 shared/   (UI Kit & Utils)`}
                </pre>
                <p style={{ marginTop: '1rem', fontSize: '0.85rem', color: '#67e8f9', lineHeight: 1.5, margin: 0 }}>
                  🚀 <strong>Kazanım:</strong> AI tek bir dosyada tüm özelliği yazar. Dışa aktarma yine `index.ts` ile korunur.
                </p>
              </div>
            </div>

            {/* 4 Modernization Golden Rules */}
            <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'white', marginBottom: '1.5rem' }}>
              {isEn ? "4 Rules to Modernize Your FSD Architecture" : "FSD'yi Modernleştiren 4 Altın Kural"}
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem' }}>
              <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', padding: '1.5rem', borderRadius: '14px' }}>
                <div style={{ color: '#06b6d4', fontWeight: 800, marginBottom: '0.5rem' }}>1. Segment Çökertme (Flat Slice)</div>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: 1.6, margin: 0 }}>
                  Gereksiz `api/`, `model/`, `ui/` alt klasörlerini açmayın. İhtiyaç büyüyene kadar dosya sayısını 1-2'de tutun (AHA / KISS).
                </p>
              </div>

              <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', padding: '1.5rem', borderRadius: '14px' }}>
                <div style={{ color: '#06b6d4', fontWeight: 800, marginBottom: '0.5rem' }}>2. Widgets Katmanını İsteğe Bağlı Yapın</div>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: 1.6, margin: 0 }}>
                  Her projede `widgets/` açmak katman hiyerarşisini şişirir. Birleştirici büyük bloklar yoksa doğrudan `pages/` içinde çözün.
                </p>
              </div>

              <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', padding: '1.5rem', borderRadius: '14px' }}>
                <div style={{ color: '#06b6d4', fontWeight: 800, marginBottom: '0.5rem' }}>3. Entities Katmanını Sadeleştirin</div>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: 1.6, margin: 0 }}>
                  Sunucu durumlarını (TanStack Query / RTK Query) doğrudan API ile bağlayın; içi boş sahte `entities/` klasörleri üretmeyin.
                </p>
              </div>

              <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', padding: '1.5rem', borderRadius: '14px' }}>
                <div style={{ color: '#06b6d4', fontWeight: 800, marginBottom: '0.5rem' }}>4. AI-Context Dostu Public API</div>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: 1.6, margin: 0 }}>
                  `index.ts` dosyalarını temiz tutun ve JSDoc ile dilimin ne iş yaptığını AI modellerine tek bakışta anlatın.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Summary Section */}
      <section style={{ padding: '80px 0', borderTop: '1px solid var(--glass-border)' }}>
        <div className="container">
          <div className="glass-card" style={{ 
            background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.1) 0%, rgba(59, 130, 246, 0.1) 100%)',
            textAlign: 'center',
            padding: '4rem'
          }}>
            <h2 style={{ marginBottom: '1.5rem' }}>FSD Neden Tercih Edilmeli?</h2>
            <p style={{ maxWidth: '800px', margin: '0 auto', color: 'var(--text-secondary)', lineHeight: 1.8 }}>
              Büyük frontend projelerinde en büyük sorun, bileşenlerin birbirine sıkı sıkıya bağlı (tightly coupled) olmasıdır. 
              Feature-Sliced Design, bu bağımlılıkları kontrol altına alarak, bir projeyi yıllar boyu sürdürülebilir kılar. 
              Eğer projeniz büyüyorsa ve klasör yapınız spagettiye dönmeye başladıysa, FSD sizin için en doğru çözümdür.
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
                Official Specification
              </div>
              <p style={{ color: '#94a3b8', marginBottom: '2rem', fontSize: '1.1rem', lineHeight: 1.6 }}>
                Frontend mimarileri arasında hızla yükselen bir standart olan Feature-Sliced Design'ın resmi dokümantasyonu, metodolojiyi tüm detaylarıyla açıklar.
              </p>
              
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                 <a 
                   href="https://feature-sliced.design/" 
                   target="_blank" 
                   rel="noopener noreferrer"
                   style={{ 
                     display: 'flex', alignItems: 'center', gap: '8px', 
                     background: 'rgba(6, 182, 212, 0.15)', color: '#67e8f9', 
                     padding: '12px 24px', borderRadius: '12px', textDecoration: 'none', fontWeight: 600,
                     border: '1px solid rgba(6, 182, 212, 0.2)', transition: 'all 0.2s'
                   }}
                 >
                    feature-sliced.design (Official) <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                 </a>
              </div>
           </div>
        </div>
      </section>
    </motion.div>
  );
};

export default FSDPage;
