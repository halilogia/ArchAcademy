import React from 'react';
import { motion } from 'framer-motion';
import { Share2, Zap, Brain, Code2, Layers, Cpu, Database, Network, Target, Workflow, ShieldAlert, Sparkles } from 'lucide-react';
import ArchHero from '../components/ArchHero';

const FNAConceptPage = () => {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ background: '#020617', minHeight: '100vh', color: 'white' }}>
      <ArchHero 
        title="Intent-Oriented"
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
          <div className="glass-card" style={{ 
            background: 'rgba(239, 68, 68, 0.05)', 
            border: '1px solid rgba(239, 68, 68, 0.2)', 
            padding: '2rem', 
            borderRadius: '20px',
            marginBottom: '4rem',
            display: 'flex',
            gap: '1.5rem',
            alignItems: 'start'
          }}>
            <ShieldAlert color="#ef4444" size={40} style={{ flexShrink: 0 }} />
            <div>
              <h3 style={{ color: '#ef4444', marginBottom: '0.5rem' }}>Erişilebilirlik ve Risk Bildirimi</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.6 }}>
                Intent-Oriented Architecture (IOA), şu an için akademik bir vizyon ve <strong>"Hayal Projesi"</strong>dir. 
                Sektör standartı olan Clean Architecture'ın aksine; hata ayıklama zorluğu, determinizm kaybı ve yüksek 
                bilişsel yük gibi ciddi operasyonel riskler barındırır. Bu sayfa, geleceğin olası bir paradigmasını keşfetmek içindir.
              </p>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>
             <div className="glass-card" style={{ padding: '3rem' }}>
                <h3 style={{ color: '#94a3b8', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Layers size={20} /> Klasik Katmanlı (Legacy)
                </h3>
                <pre style={{ background: 'rgba(0,0,0,0.3)', padding: '1.5rem', borderRadius: '15px', fontSize: '0.85rem', color: '#94a3b8' }}>
{`// src/features/payment/ProcessRefund.ts
import { PaymentGateway } from '../../infra/gateways';
import { OrderRepo } from '../../infra/db';
import { User } from '../../domain/entities';

export const processRefund = async (orderId) => {
   // Borular (Imports) manuel bağlanır.
   const order = await OrderRepo.get(orderId);
   // ...prosedürel mantık akışı
}`}
                </pre>
                <p style={{ marginTop: '1rem', fontSize: '0.85rem', color: '#64748b' }}>
                  * Odak: "Veriyi şuradan al, şuraya taşı."
                </p>
             </div>

             <div className="glass-card" style={{ padding: '3rem', border: '1px solid #06b6d4', background: 'rgba(6, 182, 212, 0.02)' }}>
                <h3 style={{ color: '#06b6d4', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Target size={20} /> Intent-Oriented (Future)
                </h3>
                <pre style={{ background: 'rgba(6, 182, 212, 0.05)', padding: '1.5rem', borderRadius: '15px', fontSize: '0.85rem', color: 'white' }}>
{`@Intent: Payment/Refund/CustomerRequest
@Constraint: Security/High, Compliance/GDPR

// AI-Native Synthesis
function handleRefund(orderId) {
   context.verify(INTENT_SATISFACTION);
   
   // Sistem boru döşemez; 
   // "Geri ödeme niyetini" gerçekleştirmek
   // için en uygun atomları sentezler.
}`}
                </pre>
                <p style={{ marginTop: '1rem', fontSize: '0.85rem', color: '#06b6d4' }}>
                  * Odak: "Niyet nedir? Bu niyete nasıl ulaşılır?"
                </p>
             </div>
          </div>

          <div style={{ marginTop: '6rem' }}>
             <h2 className="section-title" style={{ textAlign: 'center', marginBottom: '3rem' }}>IOA'nın Üç Sütunu</h2>
             <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem' }}>
                <div className="glass-card">
                  <Brain style={{ color: '#06b6d4', marginBottom: '1rem' }} size={32} />
                  <h4>Niyet Birimi (Intent Units)</h4>
                  <p style={{ fontSize: '0.9rem', color: '#94a3b8' }}>Sınıflar veya Fonksiyonlar yerine, sistemdeki her şey bir "Niyet" veya "Yetenek" olarak tanımlanır.</p>
                </div>
                <div className="glass-card">
                   <Network style={{ color: '#06b6d4', marginBottom: '1rem' }} size={32} />
                  <h4>Boruların Ölümü (Static-Free)</h4>
                  <p style={{ fontSize: '0.9rem', color: '#94a3b8' }}>Durağan dosya yolları (`../../`) yoktur. Sistem, ihtiyacı olan yeteneği "anlamsal radar" ile bulur.</p>
                </div>
                <div className="glass-card">
                  <Target style={{ color: '#06b6d4', marginBottom: '1rem' }} size={32} />
                  <h4>Teleolojik Akış</h4>
                  <p style={{ fontSize: '0.9rem', color: '#94a3b8' }}>Yazılım, bir dizi talimat değil; bir hedefe ulaşmak için sürekli kendini optimize eden bir enerjidir.</p>
                </div>
             </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default FNAConceptPage;
