import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Database, Search, FileText, Cpu, BookOpen } from 'lucide-react';
import ArchHero from '../components/ArchHero';
import { theme } from '../themes/theme';

const RAGPage = () => {
  const [activeStep] = useState(0);

  const steps = [
    { title: 'User Query', desc: 'Kullanıcı bir soru sorar: "Şirketin geçen yılki tatil politikası neydi?"' },
    { title: 'Vector Search', desc: 'Soru, vektör veritabanında (Pinecone/Milvus) gömülü (embedding) dokümanlarla eşleştirilir.' },
    { title: 'Context Retrieval', desc: 'Soruya en alakalı doküman parçaları (Chunks) bulunur ve çekilir.' },
    { title: 'Augmented Prompt', desc: 'Bulunan bilgi, istemin başına eklenir: "Şu bilgilere dayanarak cevap ver..."' },
    { title: 'LLM Generation', desc: 'AI, sadece verdiğiniz bağlamı kullanarak doğru ve halüsinasyonsuz bir cevap üretir.' }
  ];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ background: theme.colors.bgDark, minHeight: '100vh' }}>
      <ArchHero
        title="RAG"
        subtitle="Architecture"
        description="Retrieval-Augmented Generation. LLM'lerin hafızasını, kendi özel verilerinizle (Vector DB) dinamik olarak genişletin. Halüsinasyonu önlemenin altın standardı."
        badge="AI Systems"
        color="#8b5cf6"
        illustration={
          <div style={{ position: 'relative', width: '250px', height: '250px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <motion.div style={{ position: 'absolute', top: 0 }} animate={{ y: [0, 10, 0] }} transition={{ duration: 2, repeat: Infinity }}>
              <Database size={60} color="#8b5cf6" />
            </motion.div>
            <motion.div style={{ position: 'absolute', bottom: 0 }} animate={{ y: [0, -10, 0] }} transition={{ duration: 2, repeat: Infinity, delay: 1 }}>
              <Cpu size={60} color="#a78bfa" />
            </motion.div>
            <motion.div
              animate={{ opacity: [0, 1, 0], y: [-20, 20] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              style={{ position: 'absolute', width: '2px', height: '40px', background: 'white' }}
            />
          </div>
        }
        features={[
          { icon: <Database />, title: 'External Knowledge', desc: 'Modele yeniden eğitim (training) yapmadan yeni bilgi öğretin.' },
          { icon: <Search />, title: 'Semantic Search', desc: 'Kelime eşleşmesi değil, anlam eşleşmesi ile doğru veriyi bulun.' },
          { icon: <FileText />, title: 'Truth Grounding', desc: 'Cevapların kaynağını göstererek güvenilirliği artırın.' }
        ]}
      />

      <section style={{ padding: '80px 0' }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <h2 className="section-title text-center" style={{ marginBottom: '3rem' }}>RAG Akışı</h2>
          <div style={{ position: 'relative', borderLeft: '2px solid rgba(139, 92, 246, 0.3)', paddingLeft: '2rem' }}>
            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.2 }}
                style={{ marginBottom: '3rem', position: 'relative' }}
              >
                <div style={{
                  position: 'absolute', left: '-2.6rem', top: 0,
                  width: '20px', height: '20px', borderRadius: '50%',
                  background: '#8b5cf6', boxShadow: '0 0 10px #8b5cf6'
                }} />
                <h3 style={{ color: '#a78bfa', fontSize: '1.4rem', marginBottom: '0.5rem' }}>{step.title}</h3>
                <p style={{ color: theme.colors.textSecondary, fontSize: '1.1rem' }}>{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: '4rem 0', background: 'rgba(0,0,0,0.3)', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <a
            href="https://arxiv.org/abs/2005.11401"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '1rem',
              background: 'rgba(139, 92, 246, 0.1)', padding: '1rem 2rem',
              borderRadius: '12px', border: '1px solid rgba(139, 92, 246, 0.2)',
              textDecoration: 'none', transition: 'all 0.2s', color: 'inherit'
            }}
          >
            <BookOpen size={24} color="#8b5cf6" />
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontSize: '0.8rem', color: '#a78bfa', textTransform: 'uppercase' }}>Orijinal Bildiri</div>
              <div style={{ color: 'white', fontWeight: 600 }}>Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks (Facebook AI)</div>
            </div>
          </a>
        </div>
      </section>
    </motion.div>
  );
};
export default RAGPage;
