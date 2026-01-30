import React from 'react';
import { motion } from 'framer-motion';
import { Bot, Network, BrainCircuit, Activity, BookOpen } from 'lucide-react';
import ArchHero from '../components/ArchHero';

const AgenticAIPage = () => {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ background: 'var(--bg-dark)', minHeight: '100vh' }}>
      <ArchHero 
        title="Agentic"
        subtitle="Workflows"
        description="Statik cevaplar veren chatbotlar yerine; düşünen, planlayan, araç kullanan (Tools) ve aksiyon alan otonom ajanlar."
        badge="Autonomy Level 5"
        color="#f43f5e"
        illustration={
          <div style={{ position: 'relative', width: '220px', height: '220px' }}>
            <motion.div 
               animate={{ rotate: 360 }}
               transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
               style={{ width: '100%', height: '100%', border: '2px dashed #f43f5e', borderRadius: '50%', opacity: 0.3 }}
            />
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center' }}>
               <Bot size={60} color="#f43f5e" />
               <motion.div 
                 animate={{ opacity: [0, 1, 0] }}
                 transition={{ duration: 2, repeat: Infinity }}
                 style={{ marginTop: '10px', fontSize: '10px', color: '#f43f5e', fontWeight: 'bold' }}
               >
                 THINKING...
               </motion.div>
            </div>
            <motion.div animate={{ x: 80, y: -40 }} style={{ position: 'absolute', top: '50%', left: '50%' }}><Network size={20} color="white" /></motion.div>
            <motion.div animate={{ x: -80, y: 40 }} style={{ position: 'absolute', top: '50%', left: '50%' }}><BrainCircuit size={20} color="white" /></motion.div>
          </div>
        }
        features={[
          { icon: <Activity />, title: 'ReAct Pattern', desc: 'Reason + Act. Ajan önce düşünür, plan yapar, sonra aksiyona geçer.' },
          { icon: <Network />, title: 'Tool Use', desc: 'Ajanlar internete girebilir, API çağırabilir veya hesaplama yapabilir.' },
          { icon: <Bot />, title: 'Multi-Agent', desc: 'Uzmanlaşmış ajanların (Araştırmacı, Yazar, Editör) ekip çalışması.' }
        ]}
      />

      <section style={{ padding: '4rem 0', background: 'rgba(0,0,0,0.3)', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <div className="container" style={{ textAlign: 'center' }}>
           <div style={{ display: 'inline-flex', alignItems: 'center', gap: '1rem', background: 'rgba(244, 63, 94, 0.1)', padding: '1rem 2rem', borderRadius: '12px', border: '1px solid rgba(244, 63, 94, 0.2)' }}>
              <BookOpen size={24} color="#f43f5e" />
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontSize: '0.8rem', color: '#fda4af', textTransform: 'uppercase' }}>Temel Kaynak</div>
                <div style={{ color: 'white', fontWeight: 600 }}>ReAct: Synergizing Reasoning and Acting in Language Models (Yao et al., 2022)</div>
              </div>
           </div>
        </div>
      </section>
    </motion.div>
  );
};
export default AgenticAIPage;
