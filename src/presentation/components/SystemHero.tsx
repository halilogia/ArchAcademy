import React from 'react';
import { motion } from 'framer-motion';
import { Server, Share2, Layers, ArrowRight, ShieldAlert, Cpu, Box, Database } from 'lucide-react';
import ArchHero from './ArchHero';

const SystemHero = () => {
  const illu = (
    <div style={{ position: 'relative', width: '350px', height: '350px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '2rem' }}>
      {/* Monolith */}
      <motion.div
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 3, repeat: Infinity }}
        style={{ width: '100px', height: '140px', background: 'var(--glass)', border: '2px solid #3b82f6', borderRadius: '15px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 30px rgba(59, 130, 246, 0.2)' }}
      >
        <Server size={32} color="#3b82f6" />
        <span style={{ fontSize: '0.6rem', fontWeight: 900, marginTop: '8px' }}>MONOLITH</span>
      </motion.div>

      <div style={{ fontSize: '1.2rem', fontWeight: 950, color: 'var(--text-secondary)' }}>VS</div>

      {/* Microservices */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
        {[1, 2, 3, 4].map((i) => (
          <motion.div
            key={i}
            animate={{ 
              y: [0, -10, 0],
              opacity: [0.7, 1, 0.7]
            }}
            transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
            style={{ width: '60px', height: '60px', background: 'var(--glass)', border: '1px solid #f43f5e', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 20px rgba(244, 63, 94, 0.1)' }}
          >
            <Cpu size={20} color="#f43f5e" />
          </motion.div>
        ))}
      </div>
    </div>
  );

  return (
    <ArchHero 
      title="Monolith vs."
      subtitle="Microservices"
      description="Tek parça devasa bir kale mi, yoksa bağımsız hareket eden uzman bir ordu mu? Sisteminizi ölçeklendirmek için doğru stratejiyi belirleyin."
      badge="System Architecture"
      color="#f43f5e"
      illustration={illu}
      features={[
        { icon: <Box />, title: 'Scalability', desc: 'Sadece trafik alan parçayı ölçeklendirme özgürlüğü.' },
        { icon: <ShieldAlert />, title: 'Fault Isolation', desc: 'Bir parçanın çökmesi tüm sistemi karanlığa gömmez.' },
        { icon: <Share2 />, title: 'Agility', desc: 'Farklı ekiplerin birbirini beklemeden dağıtım (ship) yapabilmesi.' }
      ]}
    />
  );
};

export default SystemHero;
