import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Layers, Database, Code, ShieldCheck, Share2, ArrowRightCircle, Box, Repeat, FastForward, Settings, Zap, Cpu } from 'lucide-react';
import ArchHero from '../components/ArchHero';

const SOAPage = () => {
  const [activeFlow, setActiveFlow] = useState<number | null>(null);

  const services = [
    { id: 1, name: 'Sipariş Servisi', color: '#3b82f6', icon: <Box size={20} /> },
    { id: 2, name: 'Ödeme Servisi', color: '#6366f1', icon: <Database size={20} /> },
    { id: 3, name: 'Stok Servisi', color: '#8b5cf6', icon: <Settings size={20} /> },
  ];

  const illu = (
    <div style={{ position: 'relative', width: '350px', height: '300px', display: 'flex', flexDirection: 'column', gap: '15px', alignItems: 'center' }}>
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          animate={{ 
            x: i % 2 === 0 ? [-20, 20, -20] : [20, -20, 20],
            boxShadow: i === 1 
              ? ['0 0 20px rgba(59,130,246,0.2)', '0 0 50px rgba(59,130,246,0.5)', '0 0 20px rgba(59,130,246,0.2)']
              : 'none'
          }}
          transition={{ repeat: Infinity, duration: 4, delay: i * 0.5 }}
          style={{
            width: '240px',
            height: '60px',
            background: i === 1 ? '#3b82f6' : 'var(--glass)',
            borderRadius: '16px',
            border: '1px solid #3b82f644',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '1rem',
            color: i === 1 ? 'white' : '#3b82f6'
          }}
        >
          <Cpu size={20} />
          <span style={{ fontWeight: 800, fontSize: '0.8rem' }}>SERVICE LAYER {i + 1}</span>
        </motion.div>
      ))}
      <div style={{ position: 'absolute', width: '2px', height: '100%', background: 'linear-gradient(to bottom, transparent, #3b82f6, transparent)', opacity: 0.3, zIndex: -1 }} />
    </div>
  );

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ background: 'var(--bg-dark)' }}>
      <ArchHero 
        title="SOA"
        subtitle="Architecture"
        description="Karmaşık kurumsal sistemlerin esnek servis topluluklarına dönüştüğü stratejik yapı. Servisleri birbirinden bağımsızlaştırın ve 'Enterprise Bus' üzerinden haberleştirin."
        badge="Service Oriented"
        color="#3b82f6"
        illustration={illu}
        features={[
          { icon: <Layers />, title: 'Independence', desc: 'Her servis kendi teknolojisiyle (Java, .NET, Go) yazılabilir.' },
          { icon: <Share2 />, title: 'Bus Integration', desc: 'Enterprise Service Bus (ESB) ile merkezi haberleşme yönetimi.' },
          { icon: <Settings />, title: 'Governance', desc: 'Kurumsal veri modelleri tüm kurumda standartlaşır.' }
        ]}
      />

      <div className="container" style={{ padding: '4rem 0' }}>
        {/* The ESB Diagram Component */}
        <div className="glass-card" style={{ padding: '5rem', borderRadius: '40px', textAlign: 'center' }}>
          <h2 style={{ marginBottom: '4rem', fontWeight: 800 }}>Enterprise Service Bus (ESB) Akışı</h2>
          <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: '3rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '4rem' }}>
              {services.map(service => (
                <motion.div key={service.id} whileHover={{ scale: 1.05 }} style={{ padding: '2.5rem', borderRadius: '24px', background: 'var(--glass)', border: `1px solid ${service.color}33`, cursor: 'pointer' }}>
                   <div style={{ color: service.color, marginBottom: '1.5rem', display: 'flex', justifyContent: 'center' }}>{service.icon}</div>
                   <h4 style={{ margin: 0 }}>{service.name}</h4>
                </motion.div>
              ))}
            </div>
            <motion.div animate={{ background: ['rgba(59, 130, 246, 0.05)', 'rgba(59, 130, 246, 0.15)', 'rgba(59, 130, 246, 0.05)'] }} transition={{ duration: 2, repeat: Infinity }} style={{ width: '100%', padding: '1.5rem', borderRadius: '20px', border: '3px solid #3b82f633', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '2rem', fontWeight: 900, color: '#3b82f6', letterSpacing: '8px' }}>
              <Share2 size={32} /> ENTERPRISE BUS
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default SOAPage;
