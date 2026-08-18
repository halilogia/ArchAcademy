import React from 'react';
import { motion } from 'framer-motion';
import { Globe, Split } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const BFFComparisonTab: React.FC = () => {
  const { i18n } = useTranslation();
  const isEn = (i18n.resolvedLanguage || i18n.language || 'tr').startsWith('en');

  return (
    <motion.div
      key="comparison"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 1fr) 1.5fr', gap: '3rem', alignItems: 'center' }}>
        <div className="glass-card" style={{ borderLeft: '4px solid #ef4444' }}>
          <h3 style={{ fontSize: '1.4rem', color: '#ef4444', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Globe /> {isEn ? "General Purpose Monolithic API" : "General Purpose API"}
          </h3>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
            {isEn 
              ? "All distinct clients (Mobile, Web, Smartwatch, IoT) query the exact same generic API endpoint." 
              : "Tüm clientlar (Mobil, Web, Saat) aynı devasa API'yi kullanır."
            }
          </p>
          <ul style={{ paddingLeft: '1.5rem', color: '#94a3b8', lineHeight: 2 }}>
            <li>❌ <strong>Over-fetching:</strong> {isEn ? "Mobile only needs username, but receives 50KB of nested order history." : "Mobil uygulama sadece 'Ad' bilgisini ister ama API tüm kullanıcı geçmişini (50KB) döner."}</li>
            <li>❌ <strong>Chatty Network:</strong> {isEn ? "Rendering a single view requires 6 round-trips over cellular networks." : "Bir ekranı çizmek için Client 5 farklı servise istek atmak zorunda kalır."}</li>
            <li>❌ <strong>Tight Coupling:</strong> {isEn ? "Changing a backend contract risks breaking legacy mobile app releases." : "API değişirse tüm clientlar patlar."}</li>
          </ul>
        </div>

        <div className="glass-card" style={{ borderLeft: '4px solid #3b82f6' }}>
          <h3 style={{ fontSize: '1.4rem', color: '#3b82f6', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Split /> {isEn ? "Backend For Frontend (BFF)" : "Backend For Frontend"}
          </h3>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
            {isEn 
              ? "Each user experience owns a dedicated backend service tailored specifically to its platform constraints and form factor." 
              : "Her arayüzün kendine ait, özel bir API katmanı vardır."
            }
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div style={{ background: 'rgba(59, 130, 246, 0.1)', padding: '1rem', borderRadius: '12px' }}>
              <h4 style={{ color: '#3b82f6', fontSize: '1rem', marginBottom: '5px' }}>Mobile BFF</h4>
              <p style={{ fontSize: '0.8rem', opacity: 0.8 }}>
                {isEn ? "Ultra-compact JSON, aggressive aggregation, instant render." : "Az veri, tek request, hızlı açılış."}
              </p>
            </div>
            <div style={{ background: 'rgba(234, 179, 8, 0.1)', padding: '1rem', borderRadius: '12px' }}>
              <h4 style={{ color: '#eab308', fontSize: '1rem', marginBottom: '5px' }}>Web BFF</h4>
              <p style={{ fontSize: '0.8rem', opacity: 0.8 }}>
                {isEn ? "Rich analytical datasets, desktop dashboards, admin permissions." : "Detaylı veri, zengin içerik, admin yetkileri."}
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default BFFComparisonTab;
