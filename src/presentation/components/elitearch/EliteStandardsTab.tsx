import React from 'react';
import { motion } from 'framer-motion';
import { Database, Volume2, Shield } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const EliteStandardsTab: React.FC = () => {
  const { i18n } = useTranslation();
  const isEn = (i18n.resolvedLanguage || i18n.language || 'tr').startsWith('en');

  return (
    <motion.div key="elite" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
        <div style={{ background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(30, 41, 59, 0) 100%)', padding: '2rem', borderRadius: '24px', border: '1px solid rgba(59, 130, 246, 0.2)' }}>
          <div style={{ color: '#3b82f6', marginBottom: '1rem' }}><Database size={32} /></div>
          <h4 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '0.5rem' }}>
            {isEn ? "Data/Action Separation" : "Veri / Eylem Ayrımı"}
          </h4>
          <p style={{ fontSize: '0.9rem', color: '#94a3b8', lineHeight: 1.6 }}>
            {isEn 
              ? "State values and mutation actions are separated in store selectors, boosting re-render performance by 300%."
              : "Store state'i ve fonksiyonları ayrıştırılarak selector performansı %300 artırılır."
            }
          </p>
        </div>

        <div style={{ background: 'linear-gradient(135deg, rgba(236, 72, 153, 0.1) 0%, rgba(30, 41, 59, 0) 100%)', padding: '2rem', borderRadius: '24px', border: '1px solid rgba(236, 72, 153, 0.2)' }}>
          <div style={{ color: '#ec4899', marginBottom: '1rem' }}><Volume2 size={32} /></div>
          <h4 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '0.5rem' }}>
            {isEn ? "Multisensory Feedback" : "Çok Duyulu Geri Bildirim"}
          </h4>
          <p style={{ fontSize: '0.9rem', color: '#94a3b8', lineHeight: 1.6 }}>
            {isEn 
              ? "Every UI touch is rewarded with acoustic feedback and haptics. The core philosophy of Living UI."
              : "UI her dokunuşta ses ve haptik ile geri bildirim verir. 'Living UI' felsefesi."
            }
          </p>
        </div>

        <div style={{ background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(30, 41, 59, 0) 100%)', padding: '2rem', borderRadius: '24px', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
          <div style={{ color: '#10b981', marginBottom: '1rem' }}><Shield size={32} /></div>
          <h4 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '0.5rem' }}>
            {isEn ? "Path Alias Enforcement" : "Dizin Alias Zorunluluğu"}
          </h4>
          <p style={{ fontSize: '0.9rem', color: '#94a3b8', lineHeight: 1.6 }}>
            {isEn 
              ? "Relative messy imports are forbidden. Cross-layer boundaries are strictly protected by TypeScript aliases."
              : "Relatif importlar yasaktır. Katmanlar arası sınır aliaslar ile korunur."
            }
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default EliteStandardsTab;
