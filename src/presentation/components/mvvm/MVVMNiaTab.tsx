import React from 'react';
import { motion } from 'framer-motion';
import { 
  Smartphone, 
  Share2, 
  CheckCircle2, 
  FolderTree, 
  ExternalLink, 
  ArrowRight 
} from 'lucide-react';

export const MVVMNiaTab: React.FC = () => {
  return (
    <motion.div
      key="nia"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <section style={{ padding: '80px 0', background: 'var(--bg-dark)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.6rem', padding: '0.6rem 1.2rem', marginBottom: '1.5rem',
              borderRadius: '100px', background: 'rgba(52, 168, 83, 0.1)', color: '#34a853', border: '1px solid rgba(52, 168, 83, 0.2)', fontWeight: 700, fontSize: '0.8rem'
            }}>
              <Smartphone size={16} /> GOOGLE OFFICIAL BLUEPRINT
            </div>
            <h2 style={{ fontSize: '3.5rem', fontWeight: 950, marginBottom: '1.5rem', letterSpacing: '-1px' }}>
              Now in <span style={{ color: '#34a853' }}>Android</span>
            </h2>
            <p style={{ color: 'var(--text-secondary)', maxWidth: '800px', margin: '0 auto', fontSize: '1.2rem', lineHeight: 1.8 }}>
              Google'ın resmi "Best Practice" projesi olan <strong>Now in Android</strong>, modern bir uygulamanın nasıl modüler, test edilebilir ve offline-first olması gerektiğini gösteren nihai rehberdir.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '4rem', alignItems: 'center', marginBottom: '8rem' }}>
            <div className="glass-card" style={{ padding: '3rem', borderLeft: '4px solid #34a853' }}>
              <h3 style={{ fontSize: '1.8rem', fontWeight: 900, marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Share2 color="#34a853" /> Multi-Module Architecture
              </h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: '2rem' }}>
                NiA, uygulamayı devasa bir monolit yerine, her biri belli bir sorumluluğu olan onlarca küçük <strong>modüle</strong> böler.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {[
                  { title: "App Module", desc: "Tüm modülleri birleştirir ve uygulamayı ayağa kaldırır." },
                  { title: "Feature Modules", desc: "Özellik bazlı (Bookmarks, Interests). Kendi UI ve ViewModel'ini içerir." },
                  { title: "Core Modules", desc: "Veritabanı, Network ve Design System'in alt katmanı." }
                ].map((m, i) => (
                  <div key={i} style={{ display: 'flex', gap: '1rem' }}>
                    <CheckCircle2 color="#34a853" size={18} />
                    <div><div style={{ fontWeight: 800 }}>{m.title}</div><div style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.6)' }}>{m.desc}</div></div>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', alignItems: 'center' }}>
              <div style={{ width: '180px', padding: '12px', borderRadius: '10px', background: '#34a853', color: 'white', textAlign: 'center', fontWeight: 900, fontSize: '0.8rem' }}>:app</div>
              <ArrowRight style={{ transform: 'rotate(90deg)', opacity: 0.3 }} />
              <div style={{ display: 'flex', gap: '10px' }}>
                <div style={{ width: '110px', padding: '12px', borderRadius: '10px', background: 'rgba(52, 168, 83, 0.1)', border: '1px solid #34a853', textAlign: 'center', fontWeight: 700, fontSize: '0.7rem' }}>:feature:news</div>
                <div style={{ width: '110px', padding: '12px', borderRadius: '10px', background: 'rgba(52, 168, 83, 0.1)', border: '1px solid #34a853', textAlign: 'center', fontWeight: 700, fontSize: '0.7rem' }}>:feature:auth</div>
              </div>
              <ArrowRight style={{ transform: 'rotate(90deg)', opacity: 0.3 }} />
              <div style={{ width: '230px', padding: '12px', borderRadius: '10px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', textAlign: 'center', fontWeight: 700, fontSize: '0.7rem' }}>:core:data / :core:database</div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem' }}>
            <div className="glass-card" style={{ padding: '0', overflow: 'hidden', background: '#0a0f1d' }}>
              <div style={{ padding: '15px 20px', background: 'rgba(255,255,255,0.03)', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <FolderTree size={16} color="#34a853" />
                <span style={{ fontSize: '0.75rem', fontWeight: 800 }}>NI-ANDROID BLUEPRINT</span>
              </div>
              <pre style={{ padding: '1.5rem', fontSize: '0.8rem', color: '#94a3b8', lineHeight: 1.6 }}>{`core/
 ├── data/         # Repositories
 ├── database/     # Local Storage
 ├── network/      # Remote APIs
features/
 ├── foryou/       # Screen & VM
 └── interests/    # Screen & VM
app/              # Orchestration`}</pre>
            </div>
            <div>
              <h3 style={{ fontSize: '1.8rem', fontWeight: 900, marginBottom: '1.5rem' }}>Offline-First <span style={{ color: '#34a853' }}>Data Flow</span></h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div style={{ display: 'flex', gap: '1rem' }}><CheckCircle2 color="#34a853" size={20} /><div><h4 style={{ marginBottom: '4px' }}>Reactive UI</h4><p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>UI, veriyi bir Flow olarak dinler ve değişimde anında güncellenir.</p></div></div>
                <div style={{ display: 'flex', gap: '1rem' }}><CheckCircle2 color="#34a853" size={20} /><div><h4 style={{ marginBottom: '4px' }}>Single Source of Truth</h4><p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Veri her zaman lokal database'den gelir (Offline-first approach).</p></div></div>
                <div style={{ display: 'flex', gap: '1rem' }}><CheckCircle2 color="#34a853" size={20} /><div><h4 style={{ marginBottom: '4px' }}>Background Sync</h4><p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>WorkManager ile veri arka planda ağdan çekilip lokal database güncellenir.</p></div></div>
              </div>
            </div>
          </div>

          <div style={{ marginTop: '5rem', textAlign: 'center' }}>
            <div className="glass-card" style={{ padding: '3rem', border: '1px solid rgba(52, 168, 83, 0.1)', background: 'linear-gradient(135deg, rgba(52, 168, 83, 0.05) 0%, transparent 100%)' }}>
              <h4 style={{ fontSize: '1.5rem', fontWeight: 900, marginBottom: '1rem' }}>Resmi Kaynakları İncele</h4>
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                <a href="https://github.com/android/nowinandroid" target="_blank" rel="noopener noreferrer" style={{ padding: '1rem 2.5rem', borderRadius: '100px', background: '#34a853', color: 'white', textDecoration: 'none', fontWeight: 900, display: 'flex', alignItems: 'center', gap: '10px' }}>GITHUB REPO <ExternalLink size={18} /></a>
                <a href="https://developer.android.com/series/now-in-android?hl=tr" target="_blank" rel="noopener noreferrer" style={{ padding: '1rem 2.5rem', borderRadius: '100px', background: 'rgba(255,255,255,0.05)', color: 'white', textDecoration: 'none', fontWeight: 900, border: '1px solid var(--glass-border)' }}>RESMİ SERİ 📖</a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default MVVMNiaTab;
