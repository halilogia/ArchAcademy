import React from 'react';
import { motion } from 'framer-motion';
import { Settings, BarChart, GitBranch, Terminal, BookOpen } from 'lucide-react';
import ArchHero from '../components/ArchHero';

const LLMOpsPage = () => {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ background: 'var(--bg-dark)', minHeight: '100vh' }}>
      <ArchHero 
        title="LLMOps"
        subtitle="Platform"
        description="Büyük Dil Modellerini (LLM) prodüksiyon ortamında yönetme, izleme ve sürekli iyileştirme disiplini. MLOps'un yeni evrimi."
        badge="AI Engineering"
        color="#10b981"
        illustration={
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
             {[1, 2, 3].map(i => (
               <motion.div 
                 key={i}
                 initial={{ width: 50 }}
                 animate={{ width: 200 }}
                 transition={{ duration: 2, repeat: Infinity, repeatType: 'reverse', delay: i * 0.3 }}
                 style={{ height: '10px', background: '#10b981', borderRadius: '10px', opacity: 0.5 + (i * 0.2) }}
               />
             ))}
             <Terminal size={50} color="#10b981" style={{ marginTop: '20px', alignSelf: 'center' }} />
          </div>
        }
        features={[
          { icon: <Settings />, title: 'Prompt Management', desc: 'İstemlerin (prompts) versiyonlanması ve A/B testi.' },
          { icon: <GitBranch />, title: 'Fine-Tuning', desc: 'Genel modellerin (Llama, Mistral) özel verilerle eğitilmesi.' },
          { icon: <BarChart />, title: 'Evaluation (Evals)', desc: 'Modelin çıktılarının doğruluk ve güvenlik açısından puanlanması.' }
        ]}
      />

      <section style={{ padding: '4rem 0', background: 'rgba(0,0,0,0.3)', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <div className="container" style={{ textAlign: 'center' }}>
           <div style={{ display: 'inline-flex', alignItems: 'center', gap: '1rem', background: 'rgba(16, 185, 129, 0.1)', padding: '1rem 2rem', borderRadius: '12px', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
              <BookOpen size={24} color="#10b981" />
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontSize: '0.8rem', color: '#6ee7b7', textTransform: 'uppercase' }}>Temel Kaynak</div>
                <div style={{ color: 'white', fontWeight: 600 }}>Building LLM Applications for Production (Chip Huyen)</div>
              </div>
           </div>
        </div>
      </section>
    </motion.div>
  );
};
export default LLMOpsPage;
