import React from 'react';
import { motion } from 'framer-motion';
import { Target, Workflow, Sparkles, Brain, ShieldAlert, Layers } from 'lucide-react';
import ArchHero from '../components/ArchHero';

const FutureArchitecturePage = () => {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ background: '#020617', minHeight: '100vh', color: 'white' }}>
      <ArchHero 
        title="Future"
        subtitle="Architecture 2050"
        description="Kodun değil, niyetin (Intent) merkeze alındığı; 2050 yılında yazılımın nasıl bir 'canlı organizmaya' dönüşeceğini keşfeden vizyoner bir çalışma."
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
              <h3 style={{ color: '#ef4444', marginBottom: '0.5rem' }}>2050 Tahmini: Risk ve Vizyon</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.6 }}>
                2050 yılında yazılım mimarisi bir "inşaat" olmaktan çıkıp bir "niyet" haline gelebilir. 
                Bu paradigma shifti; determinist test süreçlerinin yerini "AI İspatlarına" bırakmasını gerektirir. 
                Bakımı imkansız gibi görünen bu yapılar, %99.999 AI doğruluğu ile mümkün olacaktır.
              </p>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>
             <div className="glass-card" style={{ padding: '3rem' }}>
                <h3 style={{ color: '#94a3b8', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Layers size={20} /> Klasik Katmanlı (Legacy)
                </h3>
                <pre style={{ background: 'rgba(0,0,0,0.3)', padding: '1.5rem', borderRadius: '15px', fontSize: '0.85rem', color: '#94a3b8' }}>
{`@Intent: Payment/Refund/CustomerRequest
// Borular (Imports) manuel bağlanır.
const order = await OrderRepo.get(id);
// ...prosedürel mantık akışı`}
                </pre>
             </div>

             <div className="glass-card" style={{ padding: '3rem', border: '1px solid #06b6d4', background: 'rgba(6, 182, 212, 0.02)' }}>
                <h3 style={{ color: '#06b6d4', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Target size={20} /> Future Architecture (2050)
                </h3>
                <pre style={{ background: 'rgba(6, 182, 212, 0.05)', padding: '1.5rem', borderRadius: '15px', fontSize: '0.85rem', color: 'white' }}>
{`@Intent: Payment/Refund
@Constraint: Security/High

// AI-Native Synthesis
function handleRefund(orderId) {
   // Sistem boru döşemez; 
   // En uygun atomları sentezler.
}`}
                </pre>
             </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default FutureArchitecturePage;
