import React from 'react';
import { motion } from 'framer-motion';
import { Database, History, RotateCcw, GitCommitHorizontal } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const EventSourcingComparisonTab: React.FC = () => {
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
        {/* Traditional CRUD */}
        <div className="glass-card" style={{ borderTop: '4px solid #64748b' }}>
          <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '1.5rem', color: '#64748b', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Database size={24} /> {isEn ? "Traditional (CRUD State Mutation)" : "Geleneksel (CRUD)"}
          </h3>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
            {isEn 
              ? "Databases store only the latest snapshot state. When a record updates, previous history is destructively overwritten and lost." 
              : "Veritabanında tek bir satır vardır. Güncelleme yapıldığında eski veri silinir, üzerine yenisi yazılır."
            }
          </p>
          
          <div style={{ background: '#0f172a', padding: '1.5rem', borderRadius: '12px', fontFamily: 'monospace', border: '1px solid #334155' }}>
            <div style={{ color: '#94a3b8', marginBottom: '10px' }}>// UPDATE users SET balance = 100 WHERE id = 1</div>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #334155', paddingBottom: '5px', marginBottom: '5px' }}>
              <span>ID</span> <span>NAME</span> <span>BALANCE</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#10b981' }}>
              <span>1</span> <span>Ali</span> <span>$100</span>
            </div>
          </div>
          <div style={{ marginTop: '1rem', fontSize: '0.85rem', color: '#ef4444', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <RotateCcw size={14} /> {isEn ? "Previous balance ($50) is lost forever without an audit trail." : "Eski bakiye ($50) sonsuza dek kayboldu."}
          </div>
        </div>

        {/* Event Sourcing */}
        <div className="glass-card" style={{ borderTop: '4px solid #6366f1' }}>
          <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '1.5rem', color: '#6366f1', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <History size={24} /> Event Sourcing
          </h3>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
            {isEn 
              ? "State is never mutated in-place. Changes are recorded as an immutable append-only sequence of domain events. Current state is a projected fold." 
              : "Veritabanında satır güncellenmez. Sadece yeni 'olay' eklenir. Mevcut durum, olayların toplamıdır."
            }
          </p>

          <div style={{ background: '#0f172a', padding: '1.5rem', borderRadius: '12px', fontFamily: 'monospace', border: '1px solid #334155' }}>
            <div style={{ color: '#94a3b8', marginBottom: '10px' }}>// INSERT INTO events (type, amount) ...</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#94a3b8' }}>
                <GitCommitHorizontal size={14} /> UserCreated (Balance: 0)
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#10b981' }}>
                <GitCommitHorizontal size={14} /> MoneyDeposited (+$50)
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#10b981' }}>
                <GitCommitHorizontal size={14} /> MoneyDeposited (+$50)
              </div>
            </div>
          </div>
          <div style={{ marginTop: '1rem', fontSize: '0.85rem', color: '#6366f1', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <RotateCcw size={14} /> {isEn ? "Time-travel to any moment in history to prove exactly why the balance reached $100." : "İstediğimiz an geçmişe dönüp bakiyenin neden $100 olduğunu ispatlayabiliriz."}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default EventSourcingComparisonTab;
