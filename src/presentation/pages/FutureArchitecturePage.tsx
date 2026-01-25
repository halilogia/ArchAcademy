import React from 'react';
import { motion } from 'framer-motion';
import { Target, Workflow, Sparkles, Brain, ShieldAlert, Layers, Network, Zap, Cpu, Activity } from 'lucide-react';
import ArchHero from '../components/ArchHero';

const IntentArchitecturePage = () => {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ background: '#020617', minHeight: '100vh', color: 'white' }}>
      <ArchHero 
        title="Intent"
        subtitle="Architecture (IOA)"
        description="Kodun değil, niyetin (Intent) merkeze alındığı; hiyerarşilerin yerini teleolojik akışlara bıraktığı post-modern yazılım felsefesi."
        badge="Post-Clean Architecture"
        color="#06b6d4"
        illustration={
          <div style={{ position: 'relative', width: '350px', height: '350px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <motion.div
              animate={{ scale: [1, 1.1, 1], rotate: [0, 90, 0] }}
              transition={{ duration: 10, repeat: Infinity }}
              style={{ position: 'absolute', width: '200px', height: '200px', borderRadius: '40px', border: '2px solid #06b6d4', opacity: 0.3 }}
            />
            <Target size={120} color="#06b6d4" />
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                animate={{ 
                   opacity: [0.2, 0.8, 0.2],
                   scale: [0.8, 1.2, 0.8],
                   x: Math.cos(i * 45 * Math.PI / 180) * 120,
                   y: Math.sin(i * 45 * Math.PI / 180) * 120
                }}
                transition={{ duration: 3, delay: i * 0.2, repeat: Infinity }}
                style={{ position: 'absolute', width: '12px', height: '12px', borderRadius: '50%', background: '#06b6d4' }}
              />
            ))}
            <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(rgba(6, 182, 212, 0.2) 1px, transparent 1px)', backgroundSize: '30px 30px', zIndex: -1 }} />
          </div>
        }
        features={[
          { icon: <Target />, title: 'Goal-First', desc: 'Kod "Nasıl?" (Procedure) değil, "Neye?" (Intent) odaklanır.' },
          { icon: <Workflow />, title: 'Semantic Binding', desc: 'Klasör hiyerarşisi yerine anlamsal niyet eşleşmesi.' },
          { icon: <Sparkles />, title: 'AI Synthesis', desc: 'Mantık parçaları (Atoms) çalışma anında niyetle sentezlenir.' }
        ]}
      />

      <section style={{ padding: '80px 0' }}>
        <div className="container">
          {/* Warning Card */}
          <div className="glass-card" style={{ 
            background: 'rgba(239, 68, 68, 0.05)', 
            border: '1px solid rgba(239, 68, 68, 0.2)', 
            padding: '2.5rem', 
            borderRadius: '24px',
            marginBottom: '5rem',
            display: 'flex',
            gap: '2rem',
            alignItems: 'center'
          }}>
            <ShieldAlert color="#ef4444" size={48} style={{ flexShrink: 0 }} />
            <div>
              <h3 style={{ color: '#ef4444', marginBottom: '0.5rem', fontSize: '1.5rem', fontWeight: 800 }}>Mimarın Notu: Intent Architecture</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: 1.7 }}>
                Bu sayfa, mevcut Clean Architecture disiplinlerinin öteye geçtiği bir geleceği tasvir eder. 
                Statik dosya yollarının ve manuel bağımlılık yönetiminin yerini **Anlamsal Sentez**'e bıraktığı bu yapıda, 
                mühendislik bir "inşaat" değil, "niyet idaresi" (Intent Orchestration) haline gelir.
              </p>
            </div>
          </div>

          {/* Comparison Section */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'stretch' }}>
             <div className="glass-card" style={{ padding: '3rem', display: 'flex', flexDirection: 'column' }}>
                <h3 style={{ color: '#94a3b8', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Layers size={20} /> Legacy (Procedural)
                </h3>
                <div style={{ background: 'rgba(0,0,0,0.3)', padding: '1.5rem', borderRadius: '15px', border: '1px solid rgba(255,255,255,0.05)', flex: 1 }}>
                   <pre style={{ fontSize: '0.85rem', color: '#94a3b8', whiteSpace: 'pre-wrap' }}>
{`// src/features/payment/Refund.ts
import { repo } from '../../infra';
import { Mailer } from '../../services';

export const handleRefund = (id) => {
   // Manuel borular, manuel akış.
   const data = await repo.get(id);
   await Mailer.send(data.userEmail);
}`}
                   </pre>
                </div>
                <p style={{ marginTop: '1.5rem', color: '#64748b', fontSize: '0.9rem' }}>
                   * Odak: "Veriyi şuradan al, şuraya taşı."
                </p>
             </div>

             <div className="glass-card" style={{ padding: '3rem', border: '1px solid #06b6d4', background: 'rgba(6, 182, 212, 0.03)', display: 'flex', flexDirection: 'column' }}>
                <h3 style={{ color: '#06b6d4', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Zap size={20} /> Intent Architecture (IOA)
                </h3>
                <div style={{ background: 'rgba(6, 182, 212, 0.05)', padding: '1.5rem', borderRadius: '15px', border: '1px solid rgba(6, 182, 212, 0.2)', flex: 1 }}>
                   <pre style={{ fontSize: '0.85rem', color: 'white', whiteSpace: 'pre-wrap' }}>
{`@Intent: Payment/Refund
@Constraint: HighPrivacy, FastResponse

// Sistem boru döşemez; 
// Niyete göre uygun ATOM'ları sentezler.
const action = synthesize(INTENT);

// AI-Native execution with proof.
verifyIntentSatisfaction(action);`}
                   </pre>
                </div>
                <p style={{ marginTop: '1.5rem', color: '#06b6d4', fontSize: '0.9rem' }}>
                   * Odak: "Niyet nedir? Bu niyete nasıl ulaşılır?"
                </p>
             </div>
          </div>

          <div style={{ marginTop: '8rem' }}>
             <h2 className="section-title" style={{ textAlign: 'center', marginBottom: '4rem' }}>IOA: Intent-Oriented Architecture</h2>
             <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2.5rem' }}>
                <div className="glass-card" style={{ padding: '3rem', textAlign: 'center' }}>
                  <div style={{ width: '60px', height: '60px', background: 'rgba(6, 182, 212, 0.1)', borderRadius: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', color: '#06b6d4' }}>
                    <Brain size={32} />
                  </div>
                  <h4 style={{ fontSize: '1.4rem', marginBottom: '1rem' }}>Intent Units</h4>
                  <p style={{ fontSize: '0.95rem', color: '#94a3b8', lineHeight: 1.6 }}>Sınıflar veya Fonksiyonlar yerine, sistemdeki her şey bir "Niyet" veya "Yetenek" olarak anlamsal tanımlanır.</p>
                </div>
                <div className="glass-card" style={{ padding: '3rem', textAlign: 'center' }}>
                  <div style={{ width: '60px', height: '60px', background: 'rgba(6, 182, 212, 0.1)', borderRadius: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', color: '#06b6d4' }}>
                    <Network size={32} />
                  </div>
                  <h4 style={{ fontSize: '1.4rem', marginBottom: '1rem' }}>Static-Free Binding</h4>
                  <p style={{ fontSize: '0.95rem', color: '#94a3b8', lineHeight: 1.6 }}>Durağan imports (`../../`) yoktur. Sistem, ihtiyacı olan yeteneği çalışırken anlamsal radar ile bulur.</p>
                </div>
                <div className="glass-card" style={{ padding: '3rem', textAlign: 'center' }}>
                  <div style={{ width: '60px', height: '60px', background: 'rgba(6, 182, 212, 0.1)', borderRadius: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', color: '#06b6d4' }}>
                    <Activity size={32} />
                  </div>
                  <h4 style={{ fontSize: '1.4rem', marginBottom: '1rem' }}>Teleological Flow</h4>
                  <p style={{ fontSize: '0.95rem', color: '#94a3b8', lineHeight: 1.6 }}>Yazılım, bir dizi talimat değil; bir hedefe ulaşmak için sürekli kendini optimize eden bir enerjidir.</p>
                </div>
             </div>
          </div>

          <div className="glass-card" style={{ 
            marginTop: '6rem', 
            padding: '5rem', 
            textAlign: 'center',
            background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.05) 0%, rgba(2, 6, 23, 0.8) 100%)'
          }}>
             <motion.div
               animate={{ scale: [1, 1.1, 1], opacity: [0.5, 1, 0.5] }}
               transition={{ duration: 4, repeat: Infinity }}
               style={{ color: '#06b6d4', marginBottom: '2rem' }}
             >
                <Cpu size={80} style={{ margin: '0 auto' }} />
             </motion.div>
             <h2 style={{ fontSize: '2.5rem', fontWeight: 900, marginBottom: '1.5rem' }}>The Synthesis Paradox</h2>
             <p style={{ maxWidth: '900px', margin: '0 auto', fontSize: '1.2rem', color: 'var(--text-secondary)', lineHeight: 2 }}>
                2050'de bir "Junior Developer" kod yazmayacak, niyetleri (Intents) ve kısıtları (Constraints) tanımlayacak. 
                Sistem, bu niyetleri saniyeler içinde binlerce mikro-atom arasından seçip birleştirerek 
                anlık, tek kullanımlık ve amaca özel (ad-hoc) mimariler sentezleyecek.
                **"Bitmiş bir yazılım projesi"** diye bir şey olmayacak, sadece sürekli yaşayan bir niyet akışı olacak.
             </p>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default IntentArchitecturePage;
