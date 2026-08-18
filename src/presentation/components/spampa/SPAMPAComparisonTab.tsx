import React from 'react';
import { motion } from 'framer-motion';
import { AppWindow, Files } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const SPAMPAComparisonTab: React.FC = () => {
  const { i18n } = useTranslation();
  const isEn = (i18n.resolvedLanguage || i18n.language || 'tr').startsWith('en');

  return (
    <motion.div
      key="comparison"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 1fr) minmax(300px, 1fr)', gap: '3rem' }}>
        {/* SPA */}
        <div className="glass-card" style={{ borderTop: '4px solid #3b82f6' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h3 style={{ fontSize: '1.4rem', color: '#3b82f6', display: 'flex', alignItems: 'center', gap: '10px', margin: 0 }}>
              <AppWindow /> {isEn ? "Single Page Application (SPA)" : "Single Page App"}
            </h3>
            <span style={{ fontSize: '0.7rem', background: 'rgba(59, 130, 246, 0.2)', color: '#93c5fd', padding: '4px 8px', borderRadius: '6px' }}>React, Vue, Angular</span>
          </div>
          
          <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', lineHeight: 1.6 }}>
            {isEn 
              ? "The browser downloads a single HTML shell and large JS bundle upfront. Subsequent route changes mutate the Virtual DOM client-side without full-page reloads." 
              : "Tarayıcıya tek bir HTML iner. Sonraki tüm geçişler JavaScript ile DOM'u güncelleyerek yapılır."
            }
          </p>

          <div style={{ background: '#020617', padding: '15px', borderRadius: '12px', fontSize: '0.8rem', color: '#94a3b8', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>{isEn ? "Initial Load:" : "İlk Yükleme:"}</span>
              <span style={{ color: '#ef4444' }}>{isEn ? "Slower (Large JS Bundle)" : "Yavaş (Big Bundle)"}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>{isEn ? "Subsequent Navigation:" : "Sonraki Sayfa Geçişi:"}</span>
              <span style={{ color: '#10b981' }}>{isEn ? "Instant (Client-Side Routing)" : "Anlık (Instant)"}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>{isEn ? "User Experience:" : "Kullanıcı Deneyimi:"}</span>
              <span style={{ color: '#10b981' }}>{isEn ? "Silky Fluid / App-like" : "App-like (Akıcı)"}</span>
            </div>
          </div>
        </div>

        {/* MPA */}
        <div className="glass-card" style={{ borderTop: '4px solid #10b981' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h3 style={{ fontSize: '1.4rem', color: '#10b981', display: 'flex', alignItems: 'center', gap: '10px', margin: 0 }}>
              <Files /> {isEn ? "Multi Page Application (MPA)" : "Multi Page App"}
            </h3>
            <span style={{ fontSize: '0.7rem', background: 'rgba(16, 185, 129, 0.2)', color: '#d1fae5', padding: '4px 8px', borderRadius: '6px' }}>PHP, Rails, ASP.NET, Django</span>
          </div>
          
          <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', lineHeight: 1.6 }}>
            {isEn 
              ? "Every link click triggers a round-trip to the server, which renders and streams a brand-new complete HTML document, resetting the browser window." 
              : "Her tıklamada sunucuya gidilir, yeni bir HTML sayfası indirilir ve tarayıcı tamamen yenilenir."
            }
          </p>

          <div style={{ background: '#020617', padding: '15px', borderRadius: '12px', fontSize: '0.8rem', color: '#94a3b8', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>{isEn ? "Initial Load:" : "İlk Yükleme:"}</span>
              <span style={{ color: '#10b981' }}>{isEn ? "Blazing Fast (Raw HTML)" : "Hızlı (Sadece HTML)"}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>{isEn ? "Subsequent Navigation:" : "Sonraki Sayfa Geçişi:"}</span>
              <span style={{ color: '#f59e0b' }}>{isEn ? "White Flash / Full Reload" : "Yavaş (Full Reload)"}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>{isEn ? "Search Engine Indexing (SEO):" : "SEO İndeksleme:"}</span>
              <span style={{ color: '#10b981' }}>{isEn ? "Effortless & Native" : "Mükemmel (Doğuştan)"}</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default SPAMPAComparisonTab;
