import React from 'react';
import { motion } from 'framer-motion';
import ArchHero from '../components/ArchHero';
import { Layers, Scissors, Target, Zap } from 'lucide-react';

const VerticalSlicePage = () => {
  const illu = (
    <div style={{ position: 'relative', width: '300px', height: '350px', display: 'flex', gap: '15px' }}>
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          initial={{ height: 0 }}
          animate={{ height: '300px' }}
          transition={{ delay: i * 0.3, duration: 1 }}
          style={{
            flex: 1,
            background: i === 1 ? '#a78bfa' : 'var(--glass)',
            border: `2px solid ${i === 1 ? '#8b5cf6' : '#8b5cf633'}`,
            borderRadius: '15px',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            boxShadow: i === 1 ? '0 0 40px rgba(139, 92, 246, 0.2)' : 'none'
          }}
        >
          {[0, 1, 2, 3].map(j => (
            <div key={j} style={{ flex: 1, borderBottom: '1px solid #8b5cf622', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
               {j === 0 && <span style={{ fontSize: '0.5rem', fontWeight: 900 }}>API</span>}
               {j === 1 && <span style={{ fontSize: '0.5rem', fontWeight: 900 }}>LOGIC</span>}
               {j === 2 && <span style={{ fontSize: '0.5rem', fontWeight: 900 }}>DATA</span>}
               {j === 3 && <Target size={12} color={i === 1 ? 'white' : '#8b5cf6'} />}
            </div>
          ))}
        </motion.div>
      ))}
      <motion.div
        animate={{ y: [0, 300, 0] }}
        transition={{ duration: 4, repeat: Infinity }}
        style={{ position: 'absolute', left: '-20px', top: 0, width: '140%', height: '2px', background: '#8b5cf6', boxShadow: '0 0 15px #8b5cf6' }}
      />
    </div>
  );

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <ArchHero 
        title="Vertical Slice"
        subtitle="Architecture"
        description="Teknik katmanlar (Layered) yerine iş özelliklerine (Features) göre dikey dilimleme yapın. Her dilim kendi API, mantık ve veri erişimine sahip tam bir pakettir."
        badge="Feature Driven"
        color="#8b5cf6"
        illustration={illu}
        features={[
          { icon: <Scissors />, title: 'Reduced Coupling', desc: 'Bir özelliği değiştirmek diğer özellikleri asla bozmaz.' },
          { icon: <Target />, title: 'High Cohesion', desc: 'Bir isteği işlemek için gereken her şey tek bir dilimin içindedir.' },
          { icon: <Zap />, title: 'Fast Delivery', desc: 'Yeni özellikleri tüm katmanları gezmeden tek bir noktada geliştirip yayınlayın.' }
        ]}
      />
    </motion.div>
  );
};

export default VerticalSlicePage;
