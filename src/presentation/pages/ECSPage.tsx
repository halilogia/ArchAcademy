import React from 'react';
import { motion } from 'framer-motion';
import ArchHero from '../components/ArchHero';
import { Cpu, Box, Zap, Layers } from 'lucide-react';

const ECSPage = () => {
  const illu = (
    <div style={{ position: 'relative', width: '350px', height: '350px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {/* Entities */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '15px' }}>
        {[...Array(9)].map((_, i) => (
          <motion.div
            key={i}
            animate={{ 
              scale: [1, 1.1, 1],
              opacity: [0.5, 1, 0.5]
            }}
            transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
            style={{ width: '40px', height: '40px', background: 'var(--glass)', border: '1px solid #10b981', borderRadius: '8px', position: 'relative' }}
          >
            {/* Component bits inside entity */}
            <div style={{ position: 'absolute', top: '5px', left: '5px', width: '10px', height: '10px', background: '#3b82f6', borderRadius: '2px' }} />
            <div style={{ position: 'absolute', bottom: '5px', right: '5px', width: '10px', height: '10px', background: '#f43f5e', borderRadius: '2px' }} />
          </motion.div>
        ))}
      </div>
      
      {/* System "Sweep" Effect */}
      <motion.div
        animate={{ x: [-200, 200] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
        style={{ position: 'absolute', top: 0, bottom: 0, width: '4px', background: 'linear-gradient(to bottom, transparent, #10b981, transparent)', filter: 'drop-shadow(0 0 10px #10b981)' }}
      />
      
      <div style={{ position: 'absolute', bottom: '-40px', color: '#10b981', fontWeight: 900, fontSize: '0.7rem', display: 'flex', gap: '20px' }}>
        <span style={{ color: '#3b82f6' }}>■ DATA</span>
        <span style={{ color: '#f43f5e' }}>■ LOGIC</span>
        <span style={{ color: '#10b981' }}>■ SYSTEM</span>
      </div>
    </div>
  );

  return (
    <ArchHero 
      title="ECS"
      subtitle="Architecture"
      description="Entity Component System. Veriyi ve mantığı tamamen ayrıştırarak CPU Cache verimliliğini maksimize eden, binlerce nesneyi aynı anda işleyebilen yüksek performans mimarisi."
      badge="Data-Oriented"
      color="#10b981"
      illustration={illu}
      features={[
        { icon: <Cpu />, title: 'Memory Locality', desc: 'Veriyi bellekte ardışık saklayarak CPU Cache hit oranını %100 e yaklaştırın.' },
        { icon: <Zap />, title: 'High Performance', desc: 'Oyunlarda on binlerce mermi ve düşmanı aynı anda CPU gecikmesi olmadan yönetin.' },
        { icon: <Layers />, title: 'Separation', desc: 'Veri (Components) ve Mantık (Systems) birbirinden tamamen bağımsızdır.' }
      ]}
    />
  );
};

export default ECSPage;
