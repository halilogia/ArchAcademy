import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

export const ACIDConceptTab: React.FC = () => {
  const { i18n } = useTranslation();
  const isEn = (i18n.resolvedLanguage || i18n.language || 'tr').startsWith('en');

  const items = [
    { 
      l: 'A', 
      t: isEn ? 'Atomicity' : 'Atomicity (Bütünlük)', 
      d: isEn 
        ? 'A transaction is an indivisible unit of work. If 9 out of 10 steps succeed but the 10th fails, all preceding 9 operations are rolled back completely (All or Nothing).' 
        : "Transaction tek bir birimdir. İçindeki 10 adımdan 9'u başarılı, 1'i başarısızsa; 9 adım da geri alınır (Rollback)." 
    },
    { 
      l: 'C', 
      t: isEn ? 'Consistency' : 'Consistency (Tutarlılık)', 
      d: isEn 
        ? 'The database moves exclusively from one valid state to another. Schema invariants, foreign keys, and triggers (e.g. balance >= 0) cannot be violated.' 
        : 'Veritabanı bir geçerli durumdan diğerine geçer. "Bakiye eksiye düşemez" kuralı varsa, işlem bunu bozamaz.' 
    },
    { 
      l: 'I', 
      t: isEn ? 'Isolation' : 'Isolation (Yalıtım)', 
      d: isEn 
        ? 'Even under thousands of concurrent transactions, each operation executes as if it were the sole transaction running on the database.' 
        : 'Aynı anda binlerce işlem olsa bile, her işlem sanki tek başına çalışıyormuş gibi izole edilir.' 
    },
    { 
      l: 'D', 
      t: isEn ? 'Durability' : 'Durability (Kalıcılık)', 
      d: isEn 
        ? 'Once a transaction commits, its effects persist permanently in non-volatile storage (WAL/disk) even across catastrophic system crashes or power cuts.' 
        : 'İşlem tamamlandı (Commit) onayı verildiyse, deprem olsa bile o veri kaybolmaz (Diske yazılmıştır).' 
    }
  ];

  return (
    <motion.div 
      key="concept" 
      initial={{ opacity: 0, y: 10 }} 
      animate={{ opacity: 1, y: 0 }} 
      exit={{ opacity: 0, y: -10 }} 
      style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}
    >
      {items.map((item) => (
        <div key={item.l} className="glass-card" style={{ borderTop: '4px solid #facc15' }}>
          <div style={{ fontSize: '3rem', fontWeight: 900, color: '#facc15', opacity: 0.2, lineHeight: 0.8 }}>{item.l}</div>
          <h3 style={{ fontSize: '1.5rem', color: 'white', marginBottom: '10px' }}>{item.t}</h3>
          <p style={{ color: '#cbd5e1', fontSize: '0.9rem' }}>{item.d}</p>
        </div>
      ))}
    </motion.div>
  );
};

export default ACIDConceptTab;
