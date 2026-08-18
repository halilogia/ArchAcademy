import React from 'react';
import { motion } from 'framer-motion';
import { FileText, CheckCircle2, AlertCircle, History } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const ADRArchitectureTab: React.FC = () => {
  const { i18n } = useTranslation();
  const isEn = (i18n.resolvedLanguage || i18n.language || 'tr').startsWith('en');

  const adrSections = [
    { title: '1. Title & Status', desc: isEn ? 'Short numbered name (e.g. ADR-004: Use PostgreSQL for Event Store) and Status (Proposed / Accepted / Superseded).' : 'Numaralandırılmış kısa başlık (ADR-004: Event Store için PostgreSQL Seçimi) ve Durum (Önerildi / Kabul Edildi / Geçersiz Kılındı).' },
    { title: '2. Context & Problem', desc: isEn ? 'The technological, business, and operational forces compelling this architecture decision.' : 'Bu mimari kararı almayı zorunlu kılan iş gereksinimleri, teknik sınırlar ve problemler.' },
    { title: '3. Decision', desc: isEn ? 'The exact architectural choice made, written in active voice with clear justification.' : 'Alınan kesin mimari karar, gerekçesi ve uygulanma stratejisi.' },
    { title: '4. Consequences (Trade-offs)', desc: isEn ? 'Both positive benefits gained and negative trade-offs/technical debt accepted.' : 'Kararın getirdiği olumlu kazanımlar ve bilinçli olarak kabul edilen tavizler (trade-offs).' }
  ];

  return (
    <motion.div key="adr" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
      <div className="glass-card" style={{ padding: '2.5rem', marginBottom: '2rem' }}>
        <h3 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'white', marginBottom: '1rem' }}>
          {isEn ? "Architecture Decision Records (ADR)" : "Mimari Karar Kayıtları (Architecture Decision Records - ADR)"}
        </h3>
        <p style={{ color: '#94a3b8', fontSize: '1.05rem', lineHeight: 1.7, marginBottom: '2rem', maxWidth: '800px' }}>
          {isEn 
            ? "An ADR is a short markdown document capturing a significant architectural decision along with its context and consequences. Stored in Git alongside code." 
            : "ADR, alınan kritik bir mimari kararın 'neden' alındığını, alternatifleri ve kabul edilen tavizleri belgeleyen kısa bir Markdown dokümanıdır. Git reposunda kodla birlikte yaşar."
          }
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem' }}>
          {adrSections.map((s, i) => (
            <div key={i} style={{ background: '#020617', padding: '1.5rem', borderRadius: '16px', border: '1px solid #1e293b', borderTop: '3px solid #10b981' }}>
              <h4 style={{ color: '#10b981', fontWeight: 800, fontSize: '1.1rem', marginBottom: '8px' }}>{s.title}</h4>
              <p style={{ color: '#94a3b8', fontSize: '0.85rem', lineHeight: 1.6, margin: 0 }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default ADRArchitectureTab;
