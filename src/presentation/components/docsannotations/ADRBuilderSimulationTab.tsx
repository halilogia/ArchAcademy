import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Copy, Check, Sparkles } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const ADRBuilderSimulationTab: React.FC = () => {
  const { i18n } = useTranslation();
  const isEn = (i18n.resolvedLanguage || i18n.language || 'tr').startsWith('en');

  const [title, setTitle] = useState('Use PostgreSQL as Event Store');
  const [status, setStatus] = useState('ACCEPTED');
  const [copied, setCopied] = useState(false);

  const adrMarkdown = `# ADR-001: ${title}

## Status
${status} (2026-08-18)

## Context
Our core checkout bounded context requires an immutable append-only event stream to audit and replay financial state transitions.

## Decision
We will use PostgreSQL with a dedicated JSONB append-only table and advisory locks instead of introducing a dedicated Kafka/EventStoreDB cluster initially.

## Consequences
- **Positive:** Leverages existing database backups, transactions (ACID), zero operational overhead.
- **Negative:** Limited horizontal scale (>50k ops/sec will require partitioning or migration).`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(adrMarkdown);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div key="simulation" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
      <div className="glass-card" style={{ padding: '2.5rem' }}>
        <h3 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'white', marginBottom: '1rem' }}>
          {isEn ? "Interactive ADR Generator Studio" : "İnteraktif ADR (Architecture Decision Record) Üretim Stüdyosu"}
        </h3>
        <p style={{ color: '#94a3b8', fontSize: '1rem', lineHeight: 1.7, marginBottom: '2rem' }}>
          {isEn 
            ? "Generate production-ready Architecture Decision Records in markdown format for your Git repository." 
            : "Projenizin Git reposunda saklayabileceğiniz standart Markdown formatında ADR dokümanı oluşturun."
          }
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
          {/* Controls */}
          <div>
            <div style={{ marginBottom: '1.25rem' }}>
              <label style={{ display: 'block', color: '#94a3b8', fontSize: '0.85rem', marginBottom: '6px', fontWeight: 700 }}>
                {isEn ? "Decision Title:" : "Karar Başlığı:"}
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', background: '#020617', border: '1px solid #1e293b', color: 'white', fontWeight: 600 }}
              />
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', color: '#94a3b8', fontSize: '0.85rem', marginBottom: '6px', fontWeight: 700 }}>
                {isEn ? "Status:" : "Durum:"}
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', background: '#020617', border: '1px solid #1e293b', color: 'white', fontWeight: 600 }}
              >
                <option value="PROPOSED">PROPOSED (Önerildi)</option>
                <option value="ACCEPTED">ACCEPTED (Kabul Edildi)</option>
                <option value="DEPRECATED">DEPRECATED (Kullanımdan Kaldırıldı)</option>
                <option value="SUPERSEDED">SUPERSEDED (Yerine Başkası Geçti)</option>
              </select>
            </div>

            <button
              onClick={copyToClipboard}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 20px',
                borderRadius: '10px',
                background: copied ? '#10b981' : '#38bdf8',
                color: '#020617',
                border: 'none',
                fontWeight: 800,
                cursor: 'pointer'
              }}
            >
              {copied ? <Check size={18} /> : <Copy size={18} />}
              {copied ? (isEn ? 'Copied to Clipboard!' : 'Panoya Kopyalandı!') : (isEn ? 'Copy ADR Markdown' : 'ADR Markdown Kopyala')}
            </button>
          </div>

          {/* Preview */}
          <div style={{ background: '#020617', padding: '1.25rem', borderRadius: '12px', border: '1px solid #1e293b' }}>
            <div style={{ fontSize: '0.8rem', color: '#64748b', marginBottom: '6px', textTransform: 'uppercase' }}>Markdown Artifact Preview</div>
            <pre style={{ color: '#38bdf8', fontFamily: 'monospace', fontSize: '0.8rem', whiteSpace: 'pre-wrap', lineHeight: 1.5, margin: 0 }}>
              {adrMarkdown}
            </pre>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ADRBuilderSimulationTab;
