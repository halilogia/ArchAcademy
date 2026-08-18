import React from 'react';
import { motion } from 'framer-motion';
import { RefreshCcw } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const MVIFlowTab: React.FC = () => {
  const { i18n } = useTranslation();
  const isEn = (i18n.resolvedLanguage || i18n.language || 'tr').startsWith('en');

  return (
    <motion.div
      key="flow"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: '2rem', alignItems: 'center' }}>
        {/* MVVM (Classic) */}
        <div className="glass-card" style={{ opacity: 0.6 }}>
          <h3 style={{ fontSize: '1.4rem', color: '#94a3b8', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
            {isEn ? "MVVM (Traditional Dual-way Binding)" : "MVVM (Traditional)"}
          </h3>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem', fontSize: '0.9rem' }}>
            {isEn 
              ? "Views mutate ViewModels, and ViewModels push updates back into Views. Two-way data streams can breed unexpected cascading state loops." 
              : "View ve ViewModel arasında çift yönlü (Two-way) veya karmaşık bindingler olabilir."
            }
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '20px' }}>
            <div style={{ padding: '10px', background: 'rgba(255,255,255,0.1)', borderRadius: '8px' }}>VIEW</div>
            <RefreshCcw size={20} />
            <div style={{ padding: '10px', background: 'rgba(255,255,255,0.1)', borderRadius: '8px' }}>VM</div>
          </div>
          <div style={{ marginTop: '1rem', color: '#ef4444', fontSize: '0.8rem' }}>
            ⚠️ {isEn ? "High risk of state divergence & race conditions" : "State inconsistency riski"}
          </div>
        </div>

        <div style={{ fontWeight: 800, color: '#64748b' }}>VS</div>

        {/* MVI (Modern) */}
        <div className="glass-card" style={{ borderLeft: '4px solid #10b981', background: 'linear-gradient(135deg, rgba(16,185,129,0.1) 0%, rgba(2,6,23,0) 100%)' }}>
          <h3 style={{ fontSize: '1.4rem', color: '#10b981', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
            {isEn ? "MVI (Strict Unidirectional Reactive Cycle)" : "MVI (Reactive)"}
          </h3>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem', fontSize: '0.9rem' }}>
            {isEn 
              ? "Pure unidirectional mathematical loop. State is immutable. Side-effects and user intents are completely isolated." 
              : "Tamamen döngüsel. State tek bir yerden akar. Yan etkiler (Side Effects) izole edilmiştir."
            }
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'center' }}>
            <div style={{ width: '100%', height: '4px', background: 'linear-gradient(90deg, #f43f5e, #10b981, #3b82f6)', borderRadius: '2px' }}></div>
            <div style={{ fontSize: '0.8rem', color: '#10b981' }}>Intent → Model → View</div>
          </div>
          <div style={{ marginTop: '1rem', color: '#10b981', fontSize: '0.8rem' }}>
            ✅ {isEn ? "100% Predictable & Deterministic State" : "Predictable State"}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default MVIFlowTab;
