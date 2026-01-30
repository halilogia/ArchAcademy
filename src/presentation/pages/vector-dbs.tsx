import React from 'react';
import { motion } from 'framer-motion';
import { Database, Search, Cpu, Zap, Share2, Box, Layers, MousePointer2, GitMerge } from 'lucide-react';
import ArchHero from '../components/ArchHero';

const VectorDBPage: React.FC = () => {
  return (
    <div style={{ minHeight: '100vh', background: '#020617', color: 'white' }}>
      <ArchHero 
        title="Vector" 
        subtitle="Databases" 
        description="Yapay zekanın uzun süreli belleği. Verileri koordinat sisteminde saklayarak anlamsal benzerlik üzerinden milisaniyeler içinde arama yapabilen modern veri motorları."
        badge="AI Memory Layer"
        color="#3b82f6"
        illustration={
          <div style={{ position: 'relative', width: '300px', height: '300px' }}>
            {/* 3D Vector Space Simulation */}
            <motion.div 
              animate={{ rotateY: 360 }}
              transition={{ repeat: Infinity, duration: 20, ease: 'linear' }}
              style={{ position: 'absolute', inset: 0, border: '1px solid #3b82f633', borderRadius: '50%', transformStyle: 'preserve-3d' }}
            >
              {[...Array(15)].map((_, i) => (
                <motion.div
                  key={i}
                  style={{
                    position: 'absolute',
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                    width: '6px',
                    height: '6px',
                    background: '#3b82f6',
                    borderRadius: '50%',
                    boxShadow: '0 0 10px #3b82f6'
                  }}
                  animate={{ opacity: [0.2, 1, 0.2] }}
                  transition={{ duration: 2, delay: i * 0.1, repeat: Infinity }}
                />
              ))}
            </motion.div>
            <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
               <Database size={80} color="#3b82f6" />
            </div>
          </div>
        }
        features={[
          { icon: <Search />, title: 'Semantic Search', desc: 'Anahtar kelime değil, anlam üzerinden arama.' },
          { icon: <Cpu />, title: 'Embedding Support', desc: 'Metin, ses ve görüntüyü vektörlere dönüştürme.' },
          { icon: <Zap />, title: 'High Performance', desc: 'Milyarlarca kayıt arasında milisaniyelik gecikme.' }
        ]}
      />

      <section style={{ padding: '100px 0' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }}>
              <h2 style={{ fontSize: '2.5rem', fontWeight: 900, marginBottom: '2rem' }}>Neden Vector DB?</h2>
              <p style={{ color: '#94a3b8', fontSize: '1.1rem', lineHeight: 1.8, marginBottom: '2rem' }}>
                Geleneksel veritabanları (SQL/NoSQL) "Eşit mi?" veya "İçinde geçiyor mu?" sorusuna yanıt verirken, Vector DB'ler 
                <strong> "Ne kadar benziyor?"</strong> sorusuna yanıt verir.
              </p>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {[
                  { title: 'Anlamsal Yakınlık', desc: 'Kedi ve köpek kelimelerinin vektör uzayında birbirine yakın olduğunu bilir.' },
                  { title: 'Çok Modlu Veri', desc: 'Resimleri ve metinleri aynı koordinat sisteminde karşılaştırabilir.' },
                  { title: 'LLM Belleği', desc: 'RAG (Retrieval-Augmented Generation) için olmazsa olmaz temel taşı.' }
                ].map((item, i) => (
                  <div key={i} className="glass-card" style={{ padding: '1.5rem', display: 'flex', gap: '1.2rem' }}>
                    <div style={{ color: '#3b82f6' }}><Share2 size={24} /></div>
                    <div>
                      <h4 style={{ marginBottom: '0.4rem' }}>{item.title}</h4>
                      <p style={{ fontSize: '0.9rem', color: '#64748b' }}>{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} className="glass-card" style={{ padding: '3rem', background: '#0f172a' }}>
              <h3 style={{ marginBottom: '2rem', textAlign: 'center' }}>Vektörleme Süreci (Embedding)</h3>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem' }}>
                <div style={{ padding: '1rem 2rem', background: '#1e293b', borderRadius: '12px', border: '1px solid #3b82f633' }}>
                  Ham Veri (Metin, Görsel)
                </div>
                <motion.div animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 2 }}>
                  <Zap color="#3b82f6" />
                </motion.div>
                <div style={{ padding: '1rem 2rem', background: '#3b82f622', borderRadius: '12px', border: '2px solid #3b82f6' }}>
                  Embedding Model (BERT, OpenAI V3)
                </div>
                <motion.div animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 2, delay: 0.5 }}>
                  <Zap color="#3b82f6" />
                </motion.div>
                <div style={{ padding: '1.5rem', background: '#1e293b', borderRadius: '12px', border: '1px solid #3b82f633' }}>
                  [0.12, -0.45, 0.98, ..., 0.22]
                  <div style={{ fontSize: '0.7rem', color: '#3b82f6', marginTop: '5px' }}>1536 Boyutlu Vektör</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section style={{ padding: '100px 0', background: 'rgba(59, 130, 246, 0.02)' }}>
        <div className="container">
          <h2 style={{ textAlign: 'center', marginBottom: '4rem', fontWeight: 900 }}>Temel İndeksleme Teknikleri</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem' }}>
            <div className="glass-card" style={{ padding: '2rem' }}>
              <div style={{ color: '#3b82f6', marginBottom: '1rem' }}><GitMerge size={32} /></div>
              <h3 style={{ marginBottom: '1rem' }}>HNSW</h3>
              <p style={{ color: '#64748b', fontSize: '0.9rem' }}>Hierarchical Navigable Small World. En popüler grafik tabanlı arama algoritması. Hız ve doğruluk dengesi mükemmeldir.</p>
            </div>
            <div className="glass-card" style={{ padding: '2rem' }}>
              <div style={{ color: '#3b82f6', marginBottom: '1rem' }}><Layers size={32} /></div>
              <h3 style={{ marginBottom: '1rem' }}>IVF</h3>
              <p style={{ color: '#64748b', fontSize: '0.9rem' }}>Inverted File Index. Vektör uzayını kümelere ayırarak sadece ilgili bölgelerin taranmasını sağlar. Bellek dostudur.</p>
            </div>
            <div className="glass-card" style={{ padding: '2rem' }}>
              <div style={{ color: '#3b82f6', marginBottom: '1rem' }}><MousePointer2 size={32} /></div>
              <h3 style={{ marginBottom: '1rem' }}>Cosine Similarity</h3>
              <p style={{ color: '#64748b', fontSize: '0.9rem' }}>İki vektör arasındaki açının kosinüsünü hesaplayarak benzerliği ölçer. Büyüklükten ziyade yöne odaklanır.</p>
            </div>
          </div>
        </div>
      </section>

      <section style={{ padding: '100px 0' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 style={{ marginBottom: '2rem' }}>Popüler Vector DB Araçları</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '2rem' }}>
            {['Pinecone', 'Milvus', 'Weaviate', 'Chroma', 'Qdrant', 'pgvector'].map(tool => (
              <div key={tool} style={{ padding: '1rem 2.5rem', background: 'rgba(255,255,255,0.05)', borderRadius: '100px', border: '1px solid var(--glass-border)', fontWeight: 700 }}>
                {tool}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default VectorDBPage;
