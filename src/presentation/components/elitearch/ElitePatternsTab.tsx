import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

export const ElitePatternsTab: React.FC = () => {
  const { i18n } = useTranslation();
  const isEn = (i18n.resolvedLanguage || i18n.language || 'tr').startsWith('en');

  return (
    <motion.div key="patterns" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
      <div style={{ background: 'rgba(30, 41, 59, 0.5)', padding: '3rem', borderRadius: '32px', border: '1px solid rgba(255,255,255,0.05)' }}>
        <h3 style={{ fontSize: '2rem', fontWeight: 900, marginBottom: '2rem', textAlign: 'center' }}>Result Pattern</h3>
        <div style={{ background: '#0f172a', padding: '1.5rem', borderRadius: '16px', fontFamily: 'monospace', color: '#10b981', border: '1px solid rgba(16, 185, 129, 0.2)', marginBottom: '2rem' }}>
          <div style={{ color: '#64748b', marginBottom: '0.5rem' }}>// DO NOT: throw new Error()</div>
          <div>{"type Result<T> = { success: true; data: T } | { success: false; error: string };"}</div>
        </div>
        <p style={{ color: '#94a3b8', lineHeight: 1.8, textAlign: 'center' }}>
          {isEn 
            ? "Enforces type-safe error handling rather than unhandled exception leaks. UI components are always explicitly equipped for failure states."
            : "Error handling'i opsiyonel değil, zorunlu hale getirir. UI her zaman başarısızlık senaryosuna hazırlıklıdır."
          }
        </p>
      </div>
    </motion.div>
  );
};

export default ElitePatternsTab;
