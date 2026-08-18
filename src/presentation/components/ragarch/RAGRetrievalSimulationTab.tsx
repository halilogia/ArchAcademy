import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Database, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const RAGRetrievalSimulationTab: React.FC = () => {
  const { i18n } = useTranslation();
  const isEn = (i18n.resolvedLanguage || i18n.language || 'tr').startsWith('en');

  const [query, setQuery] = useState('How does JWT authentication work?');
  const [rerankEnabled, setRerankEnabled] = useState(false);

  const mockDocuments = [
    { id: 1, title: 'Auth Architecture Doc', text: 'JWT (JSON Web Token) is signed with HMAC or RSA and contains claims.', baseScore: 0.88, rerankScore: 0.98 },
    { id: 2, title: 'Security Best Practices', text: 'Store tokens in httpOnly cookies to prevent XSS credential theft.', baseScore: 0.84, rerankScore: 0.92 },
    { id: 3, title: 'CSS Styling Guide', text: 'Use rem units for responsive typography and spacing across pages.', baseScore: 0.42, rerankScore: 0.11 }
  ];

  return (
    <motion.div key="simulation" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
      <div className="glass-card" style={{ padding: '2.5rem' }}>
        <h3 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'white', marginBottom: '1rem' }}>
          {isEn ? "Interactive Vector Search & Reranking Simulator" : "İnteraktif Vektör Benzerlik Arama & Reranker Simülasyonu"}
        </h3>
        <p style={{ color: '#94a3b8', fontSize: '1rem', lineHeight: 1.7, marginBottom: '2rem' }}>
          {isEn 
            ? "Test cosine similarity retrieval and see how enabling Cross-Encoder Reranking boosts confidence and filters noise." 
            : "Kosinüs benzerlik puanlarını inceleyin ve Cross-Encoder Reranker açıldığında alaka düzeyinin nasıl yükseldiğini test edin."
          }
        </p>

        {/* Input & Toggle */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '1rem', marginBottom: '2rem' }}>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={{ padding: '12px 16px', borderRadius: '12px', background: '#020617', border: '1px solid #1e293b', color: 'white', fontWeight: 600, fontSize: '0.95rem' }}
          />
          <button
            onClick={() => setRerankEnabled(!rerankEnabled)}
            style={{
              padding: '12px 24px',
              borderRadius: '12px',
              border: rerankEnabled ? '2px solid #10b981' : '1px solid #1e293b',
              background: rerankEnabled ? 'rgba(16, 185, 129, 0.2)' : '#020617',
              color: rerankEnabled ? '#34d399' : '#94a3b8',
              fontWeight: 800,
              cursor: 'pointer'
            }}
          >
            {rerankEnabled ? '✅ Cross-Encoder Reranking: ON' : '⚡ Enable Reranker'}
          </button>
        </div>

        {/* Retrieved Chunks */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {mockDocuments.map((doc) => {
            const score = rerankEnabled ? doc.rerankScore : doc.baseScore;
            const isRelevant = score > 0.7;

            return (
              <div key={doc.id} style={{ background: '#020617', padding: '1.25rem', borderRadius: '12px', border: `1px solid ${isRelevant ? '#10b98144' : '#1e293b'}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontWeight: 800, color: 'white', marginBottom: '4px' }}>{doc.title}</div>
                  <div style={{ color: '#94a3b8', fontSize: '0.85rem' }}>{doc.text}</div>
                </div>
                <div style={{ textAlign: 'right', minWidth: '120px' }}>
                  <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Cosine Similarity</div>
                  <div style={{ fontSize: '1.2rem', fontWeight: 900, color: isRelevant ? '#34d399' : '#f87171' }}>
                    {(score * 100).toFixed(1)}%
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};

export default RAGRetrievalSimulationTab;
