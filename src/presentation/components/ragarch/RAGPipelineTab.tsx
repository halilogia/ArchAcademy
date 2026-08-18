import React from 'react';
import { motion } from 'framer-motion';
import { Database, Search, Cpu, ArrowRight, Layers } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const RAGPipelineTab: React.FC = () => {
  const { i18n } = useTranslation();
  const isEn = (i18n.resolvedLanguage || i18n.language || 'tr').startsWith('en');

  const steps = [
    { title: '1. Chunking & Parsing', desc: isEn ? 'Splitting raw PDF/Docs into semantically cohesive passages (RecursiveCharacter or Semantic Splitting).' : 'Ham dokümanları anlamsal bütünlüğü koruyarak 500-1000 tokenlık parçalara (Chunks) bölme.' },
    { title: '2. Vector Embeddings', desc: isEn ? 'Transforming text into 1536-dimensional dense vector embeddings (e.g. OpenAI text-embedding-3-small).' : 'Metin parçalarını 1536 boyutlu yoğun vektör uzayına (Embedding) dönüştürme.' },
    { title: '3. Approximate Nearest Neighbor (ANN)', desc: isEn ? 'Fast indexing using HNSW (Hierarchical Navigable Small World) or IVF in pgvector/Qdrant/Pinecone.' : 'Vektör veri tabanında (pgvector/Pinecone) HNSW algoritmasıyla milisaniyeler içinde benzerlik araması.' },
    { title: '4. Prompt Augmentation & Generation', desc: isEn ? 'Injecting retrieved top-k context chunks into LLM prompt with strict groundedness instructions.' : 'Bulunan en alakalı 3-5 pasajı LLM promptuna bağlam olarak ekleyip halüsinasyonsuz yanıt üretme.' }
  ];

  return (
    <motion.div key="pipeline" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
      <div className="glass-card" style={{ padding: '2.5rem', marginBottom: '2rem' }}>
        <h3 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'white', marginBottom: '1rem' }}>
          {isEn ? "The End-to-End RAG Engineering Pipeline" : "Uçtan Uca RAG (Retrieval-Augmented Generation) Pipeline Mimarisi"}
        </h3>
        <p style={{ color: '#94a3b8', fontSize: '1.05rem', lineHeight: 1.7, marginBottom: '2rem', maxWidth: '800px' }}>
          {isEn 
            ? "RAG bridges the gap between static LLM knowledge and private, real-time enterprise data. Grounding generative models with semantic vector search eliminates hallucination." 
            : "RAG mimarisi, LLM modellerinin statik bilgisi ile şirketlerin özel güncel verilerini birleştirir. Semantik vektör aramasıyla bağlam enjekte ederek modelin halüsinasyon görmesini engeller."
          }
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem' }}>
          {steps.map((s, i) => (
            <div key={i} style={{ background: '#020617', padding: '1.5rem', borderRadius: '16px', border: '1px solid #1e293b', borderTop: '3px solid #6366f1' }}>
              <h4 style={{ color: '#818cf8', fontWeight: 800, fontSize: '1.1rem', marginBottom: '8px' }}>{s.title}</h4>
              <p style={{ color: '#94a3b8', fontSize: '0.85rem', lineHeight: 1.6, margin: 0 }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default RAGPipelineTab;
