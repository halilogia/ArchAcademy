import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Network, RefreshCw, FileSearch, Layers } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const AdvancedRAGTab: React.FC = () => {
  const { i18n } = useTranslation();
  const isEn = (i18n.resolvedLanguage || i18n.language || 'tr').startsWith('en');

  const advancedMethods = [
    { title: 'Cross-Encoder Reranking', badge: 'High Precision', color: '#10b981', desc: isEn ? 'Retrieve 25 initial candidates with Bi-Encoder ANN, then re-rank with Cohere/BGE Cross-Encoder for 3x precision.' : 'İlk aşamada 25 aday çeker, ardından Cross-Encoder (Cohere/BGE) ile yeniden sıralayarak en yüksek alaka düzeyini yakalar.' },
    { title: 'HyDE (Hypothetical Embeddings)', badge: 'Query Expansion', color: '#38bdf8', desc: isEn ? 'LLM generates a hypothetical answer first; embedding that hypothetical answer retrieves dramatically better context.' : 'LLM önce varsayımsal bir yanıt üretir; bu yanıtın vektörü aranarak kullanıcının eksik soruları mükemmel bağlamla eşleştirilir.' },
    { title: 'GraphRAG (Knowledge Graphs)', badge: 'Global Synthesis', color: '#f59e0b', desc: isEn ? 'Combines vector search with Neo4j entity knowledge graphs to answer complex holistic questions (e.g. summarize theme across 100 books).' : 'Vektör aramasını Knowledge Graph (Bilgi Çizgesi) ile birleştirerek varlıklar arası karmaşık ilişkileri ve genel özetleri çözer.' }
  ];

  return (
    <motion.div key="advanced" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
      <div className="glass-card" style={{ padding: '2.5rem', marginBottom: '2rem' }}>
        <h3 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'white', marginBottom: '1rem' }}>
          {isEn ? "Advanced RAG Techniques (Beyond Naive RAG)" : "İleri Seviye RAG Teknikleri (Naive RAG'in Ötesi)"}
        </h3>
        <p style={{ color: '#94a3b8', fontSize: '1.05rem', lineHeight: 1.7, marginBottom: '2rem', maxWidth: '800px' }}>
          {isEn 
            ? "Naive RAG fails with noisy embeddings and context stuffing. Enterprise production systems use Reranking, HyDE, and GraphRAG to achieve 98%+ precision." 
            : "Basit (Naive) RAG sistemleri gürültülü bağlam ve zayıf eşleşmeler yüzünden prodüksiyonda başarısız olur. Modern sistemler Reranker, HyDE ve GraphRAG kullanır."
          }
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
          {advancedMethods.map((m, i) => (
            <div key={i} style={{ background: '#020617', padding: '1.5rem', borderRadius: '16px', border: '1px solid #1e293b', borderTop: `4px solid ${m.color}` }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <h4 style={{ color: 'white', fontWeight: 800, fontSize: '1.1rem', margin: 0 }}>{m.title}</h4>
                <span style={{ fontSize: '0.7rem', color: m.color, background: `${m.color}22`, padding: '2px 8px', borderRadius: '6px', fontWeight: 700 }}>
                  {m.badge}
                </span>
              </div>
              <p style={{ color: '#94a3b8', fontSize: '0.85rem', lineHeight: 1.6, margin: 0 }}>{m.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default AdvancedRAGTab;
