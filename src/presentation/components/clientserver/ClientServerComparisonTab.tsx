import React from 'react';
import { motion } from 'framer-motion';
import { Monitor, Smartphone } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const ClientServerComparisonTab: React.FC = () => {
  const { i18n } = useTranslation();
  const isEn = (i18n.resolvedLanguage || i18n.language || 'tr').startsWith('en');

  return (
    <motion.div
      key="comparison"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem' }}>
        <div className="glass-card">
          <h3 style={{ fontSize: '1.4rem', color: '#3b82f6', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Monitor /> {isEn ? "Thin Client Architecture" : "Thin Client (İnce İstemci)"}
          </h3>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
            {isEn 
              ? "The client device serves strictly as a dumb display terminal. All business rules and data manipulation occur on central servers." 
              : "İstemci (Browser/App) sadece arayüzü gösterir. Tüm hesaplamalar sunucuda yapılır."
            }
          </p>
          <ul style={{ paddingLeft: '1.5rem', color: '#94a3b8', lineHeight: 2 }}>
            <li>✅ <strong>{isEn ? "Security:" : "Güvenlik:"}</strong> {isEn ? "Proprietary code and secrets remain safely locked in backend containers." : "Kod sunucuda gizlidir."}</li>
            <li>✅ <strong>{isEn ? "Maintenance:" : "Yönetim:"}</strong> {isEn ? "Zero client-side update delays; patches deploy instantly on servers." : "Güncelleme sadece sunucuya yapılır."}</li>
            <li>❌ <strong>{isEn ? "Latency:" : "Gecikme:"}</strong> {isEn ? "Every minor interaction requires a round-trip network hop." : "Her işlem için ağa gidip gelmek gerekir."}</li>
          </ul>
        </div>

        <div className="glass-card">
          <h3 style={{ fontSize: '1.4rem', color: '#10b981', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Smartphone /> {isEn ? "Thick / Rich Client (SPA)" : "Thick Client (Kalın İstemci)"}
          </h3>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
            {isEn 
              ? "Significant logic runs locally on device memory (React/Flutter/Wasm). Backend acts primarily as an authoritative JSON store." 
              : "Hesaplamaların çoğu istemcide (React/Mobile App) yapılır. Sunucu sadece veri (JSON) sağlar."
            }
          </p>
          <ul style={{ paddingLeft: '1.5rem', color: '#94a3b8', lineHeight: 2 }}>
            <li>✅ <strong>{isEn ? "Speed:" : "Hız:"}</strong> {isEn ? "Instantaneous UI reactivity and fluid 60 FPS transitions." : "Arayüz tepkileri anlıktır (SPA)."}</li>
            <li>✅ <strong>{isEn ? "Offline:" : "Offline:"}</strong> {isEn ? "Can operate locally and sync when connectivity returns." : "İnternet olmadan da kısmen çalışabilir."}</li>
            <li>❌ <strong>{isEn ? "Attack Surface:" : "Güvenlik Riski:"}</strong> {isEn ? "Client-side code can be decompiled; secrets must never be exposed." : "Hassas logic istemcide olmamalıdır."}</li>
          </ul>
        </div>
      </div>
    </motion.div>
  );
};

export default ClientServerComparisonTab;
