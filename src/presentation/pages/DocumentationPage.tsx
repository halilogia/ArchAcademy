import React from 'react';
import { motion } from 'framer-motion';
import { FileText, MessageSquare, History, ListCheck, BookOpen, Quote } from 'lucide-react';
import ArchHero from '../components/ArchHero';

const DocumentationPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{ background: 'var(--bg-dark)', minHeight: '100vh' }}
    >
      <ArchHero 
        title="Architecture"
        subtitle="Documentation"
        description="Kodun sadece 'ne' yaptığını değil, neden (Why) bu şekilde yapıldığını belgeleyin. Kararlarınızı ölümsüzleştirin."
        badge="Living Documentation"
        color="#3b82f6"
        illustration={
          <div style={{ position: 'relative', width: '300px', height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1 }}
              style={{ background: 'rgba(59, 130, 246, 0.1)', padding: '2.5rem', borderRadius: '20px', border: '2px solid #3b82f6' }}
            >
              <FileText size={100} color="#3b82f6" />
            </motion.div>
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              style={{ position: 'absolute', top: 20, right: 20, color: '#f59e0b' }}
            >
              <Quote size={40} />
            </motion.div>
          </div>
        }
        features={[
          { icon: <History />, title: 'ADR (Decision Records)', desc: 'Neden bu mimariyi seçtik? Karar anındaki şartları ve sonuçları belgeleyin.' },
          { icon: <MessageSquare />, title: 'Intentional Comments', desc: 'Kodun mantığını değil, niyetini ve karmaşık kararları açıklayın.' },
          { icon: <ListCheck />, title: 'Living Specs', desc: 'Kodla birlikte yaşayan, her zaman güncel kalan dokümantasyon disiplini.' }
        ]}
      />

      <section style={{ padding: '100px 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
            <h2 className="gradient-text" style={{ fontSize: '3rem', fontWeight: 800 }}>Belgelemek Sorumluluktur</h2>
            <p style={{ color: 'var(--text-secondary)' }}>Mimariyi anlaşılır kılan 3 ana döküman türü.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem' }}>
            <div className="glass-card" style={{ padding: '3rem' }}>
              <div style={{ color: '#3b82f6', marginBottom: '1.5rem' }}><BookOpen size={40} /></div>
              <h3 style={{ marginBottom: '1rem' }}>ADR Record</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.8 }}>
                Architecture Decision Records. Bir kararı aldığınız bağlamı, alternatifleri ve neden 'X' yolunu seçtiğinizi anlatır.
              </p>
            </div>

            <div className="glass-card" style={{ padding: '3rem' }}>
              <div style={{ color: '#3b82f6', marginBottom: '1.5rem' }}><FileText size={40} /></div>
              <h3 style={{ marginBottom: '1rem' }}>C4 Model Diagrams</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.8 }}>
                Sistemi farklı derinlik seviyelerinde (Context, Container, Component, Code) görselleştiren standart bir çizim disiplini.
              </p>
            </div>

            <div className="glass-card" style={{ padding: '3rem' }}>
              <div style={{ color: '#3b82f6', marginBottom: '1.5rem' }}><Quote size={40} /></div>
              <h3 style={{ marginBottom: '1rem' }}>Readme.md Hero</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.8 }}>
                Projenin giriş kapısı. Mimarinin kuş bakışı görünümü ve yeni bir geliştiricinin bilmesi gereken her şey burada olmalı.
              </p>
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default DocumentationPage;
