import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Database, Search, Sparkles, BookOpen, Layers, Activity } from 'lucide-react';
import ArchHero from '../components/ArchHero';
import SEO from '../components/SEO';
import { RAGPipelineTab } from '../components/ragarch/RAGPipelineTab';
import { AdvancedRAGTab } from '../components/ragarch/AdvancedRAGTab';
import { RAGRetrievalSimulationTab } from '../components/ragarch/RAGRetrievalSimulationTab';

const RAGArchPage: React.FC = () => {
  const { i18n } = useTranslation();
  const isEn = (i18n.resolvedLanguage || i18n.language || 'tr').startsWith('en');
  const [activeTab, setActiveTab] = useState<'pipeline' | 'advanced' | 'simulation'>('pipeline');

  return (
    <>
      <SEO
        title={isEn ? "RAG Architecture & Vector Search Masterclass | ArchAcademy" : "RAG Mimarisi ve Vektör Arama Masterclass | ArchAcademy"}
        description={isEn 
          ? "Master Retrieval-Augmented Generation (RAG), vector embeddings, HNSW semantic indexing, Cross-Encoder rerankers, and GraphRAG." 
          : "Retrieval-Augmented Generation (RAG) mimarisi, vektör embedding modelleri, HNSW indeksleme, Cross-Encoder reranking ve GraphRAG rehberi."
        }
        keywords="rag, retrieval augmented generation, vector search, pgvector, pinecone, qdrant, hnsw, reranking, hyde, graphrag"
        canonicalUrl="/rag-arch"
      />
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ background: 'var(--bg-dark)', minHeight: '100vh' }}>
        <ArchHero 
          title="RAG Architecture"
          subtitle={isEn ? "Retrieval-Augmented Generation" : "Geri Getirimle Güçlendirilmiş Üretim"}
          description={isEn 
            ? "Connect LLMs to private enterprise data. Semantic vector embeddings, HNSW approximate nearest neighbor search, and cross-encoder reranking." 
            : "Büyük dil modellerini kurum verilerine bağlayın. Semantik vektör embedding'leri, HNSW yakın komşuluk araması ve Cross-Encoder reranking mimarisi."
          }
          badge="Generative AI Systems"
          color="#6366f1"
          illustration={
            <div style={{ position: 'relative', width: '200px', height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
                style={{ width: '160px', height: '160px', borderRadius: '30px', border: '2px dashed rgba(99, 102, 241, 0.4)', position: 'absolute' }}
              />
              <div style={{ width: '90px', height: '90px', background: '#020617', border: '3px solid #6366f1', borderRadius: '22px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 30px rgba(99, 102, 241, 0.3)' }}>
                <Database size={36} color="#6366f1" />
                <span style={{ fontSize: '0.65rem', fontWeight: 800, color: 'white', marginTop: '4px' }}>VECTOR</span>
              </div>
            </div>
          }
          features={[
            { icon: <Search />, title: isEn ? 'Semantic Search' : 'Semantik Arama', desc: isEn ? 'Dense vector embeddings capturing meaning beyond exact keywords.' : 'Kelime eşleşmesinin ötesinde anlam ve kavram benzerliği yakalama.' },
            { icon: <Sparkles />, title: isEn ? 'Zero Hallucination' : 'Sıfır Halüsinasyon', desc: isEn ? 'Strict groundedness prompting backed by verified context chunks.' : 'Kanıtlanmış veri parçalarıyla LLM yanıtını gerçeğe bağlama.' },
            { icon: <Layers />, title: isEn ? 'Advanced GraphRAG' : 'İleri GraphRAG', desc: isEn ? 'Knowledge graphs and rerankers for complex multi-hop reasoning.' : 'Knowledge Graph ve Reranker ile karmaşık çapraz sorguları çözme.' }
          ]}
        >
          <div style={{ 
            marginTop: '2rem',
            padding: '6px', 
            background: 'rgba(15, 23, 42, 0.4)', 
            borderRadius: '24px', 
            border: '1px solid rgba(255,255,255,0.05)',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '4px',
            backdropFilter: 'blur(10px)',
            flexWrap: 'wrap'
          }}>
            {[
              { id: 'pipeline', label: isEn ? 'RAG Pipeline Architecture' : 'Uçtan Uca RAG Pipeline', icon: <Layers size={18} /> },
              { id: 'advanced', label: isEn ? 'Advanced RAG & Rerankers' : 'İleri RAG & Reranker', icon: <Sparkles size={18} /> },
              { id: 'simulation', label: isEn ? 'Vector Search Lab' : 'Vektör Arama Laboratuvarı', icon: <Activity size={18} /> }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                style={{
                  padding: '10px 24px',
                  borderRadius: '18px',
                  border: 'none',
                  background: activeTab === tab.id ? '#6366f1' : 'transparent',
                  color: activeTab === tab.id ? 'white' : 'rgba(255,255,255,0.5)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontWeight: 700,
                  fontSize: '0.9rem',
                  transition: 'all 0.3s ease',
                  boxShadow: activeTab === tab.id ? '0 4px 12px rgba(99, 102, 241, 0.3)' : 'none'
                }}
              >
                {tab.icon} {tab.label}
              </button>
            ))}
          </div>
        </ArchHero>

        <div className="container" style={{ marginTop: '2rem' }}>
          <AnimatePresence mode="wait">
            {activeTab === 'pipeline' && <RAGPipelineTab key="pipeline" />}
            {activeTab === 'advanced' && <AdvancedRAGTab key="advanced" />}
            {activeTab === 'simulation' && <RAGRetrievalSimulationTab key="simulation" />}
          </AnimatePresence>
        </div>

        <section style={{ padding: '4rem 0', background: 'rgba(0,0,0,0.3)', borderTop: '1px solid rgba(255,255,255,0.05)', marginTop: '4rem' }}>
          <div className="container" style={{ textAlign: 'center' }}>
             <div style={{ display: 'inline-flex', alignItems: 'center', gap: '1rem', background: 'rgba(99, 102, 241, 0.1)', padding: '1rem 2rem', borderRadius: '12px', border: '1px solid rgba(99, 102, 241, 0.2)' }}>
                <BookOpen size={24} color="#6366f1" />
                <div style={{ textAlign: 'left' }}>
                  <div style={{ fontSize: '0.8rem', color: '#a5b4fc', textTransform: 'uppercase' }}>
                    {isEn ? "Core RAG Reference" : "Temel RAG Kaynağı"}
                  </div>
                  <div style={{ color: 'white', fontWeight: 600 }}>Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks (Lewis et al.)</div>
                </div>
             </div>
          </div>
        </section>
      </motion.div>
    </>
  );
};

export default RAGArchPage;
