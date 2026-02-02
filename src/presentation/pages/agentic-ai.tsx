import React from 'react';
import { motion } from 'framer-motion';
import { Bot, Network, BrainCircuit, Activity, BookOpen } from 'lucide-react';
import ArchHero from '../components/ArchHero';
import { theme } from '../theme';

const AgenticAIPage = () => {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ background: theme.colors.bgDark, minHeight: '100vh' }}>
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

      <section style={{ padding: '80px 0', background: 'rgba(2, 6, 23, 0.4)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 className="section-title">Ajan Döngüsü (Thinking Loop)</h2>
            <p style={{ color: theme.colors.textSecondary }}>Ajanlar tek bir prompt ile değil, bir döngü içinde otonom çalışır.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {[
                { t: '1. Planlama', d: 'Hedefe ulaşmak için adımları belirler.' },
                { t: '2. Araç Seçimi', d: 'Google Search, SQL veya Python interpreter kullanır.' },
                { t: '3. Uygulama', d: 'Belirlenen aracı kullanarak veri toplar.' },
                { t: '4. Gözlem', d: 'Çıktıyı analiz eder ve planını günceller.' }
              ].map((step, i) => (
                <div key={i} className="glass-card" style={{ display: 'flex', gap: '15px', alignItems: 'center', padding: '1.5rem' }}>
                  <div style={{ width: '30px', height: '30px', background: '#f43f5e', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>{i + 1}</div>
                  <div>
                    <h4 style={{ color: 'white' }}>{step.t}</h4>
                    <p style={{ color: theme.colors.textSecondary, fontSize: '0.85rem' }}>{step.d}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="glass-card" style={{ border: '2px solid rgba(244, 63, 94, 0.3)', padding: '3rem', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: -20, right: -20, opacity: 0.1 }}>
                <BrainCircuit size={150} color="#f43f5e" />
              </div>
              <h3 style={{ color: 'white', marginBottom: '1.5rem' }}>Reflection ve Self-Correction</h3>
              <p style={{ color: theme.colors.textSecondary, lineHeight: 1.8, fontSize: '1.1rem' }}>
                Modern ajanlar sadece aksiyon almaz, kendi cevaplarını da eleştirirler.
                <strong>"Reflection"</strong> patterni ile ajan, ürettiği cevabı bir "kontrolör" gözüyle inceler,
                hataları tespit eder ve mükemmel sonuca ulaşana kadar döngüye devam eder.
                <br /><br />
                Bu sayede halüsinasyon oranı %80'e kadar azaltılabilir.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section style={{ padding: '4rem 0' }}>
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
