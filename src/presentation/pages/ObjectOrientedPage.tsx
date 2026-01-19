import React from 'react';
import { motion } from 'framer-motion';
import ArchHero from '../components/ArchHero';
import { Package, GitBranch, Target } from 'lucide-react';

const ObjectOrientedPage = () => {
  const illu = (
    <div style={{ position: 'relative', width: '300px', height: '300px' }}>
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          animate={{ 
            rotate: i * 120 + 360,
            y: [0, -20, 0]
          }}
          transition={{ 
            rotate: { duration: 10, repeat: Infinity, ease: "linear" },
            y: { duration: 3, repeat: Infinity, ease: "easeInOut", delay: i * 0.5 }
          }}
          style={{
            position: 'absolute',
            width: '100px',
            height: '100px',
            background: 'var(--glass)',
            border: '2px solid #059669',
            borderRadius: '24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            top: '50%',
            left: '50%',
            marginTop: '-50px',
            marginLeft: '-50px',
            transformOrigin: '150px 150px',
            boxShadow: '0 0 30px rgba(5, 150, 105, 0.2)'
          }}
        >
          <Package size={40} color="#10b981" />
        </motion.div>
      ))}
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '80px', height: '800px', background: 'radial-gradient(circle, #10b98122 0%, transparent 70%)', zIndex: -1 }} />
    </div>
  );

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <ArchHero 
        title="Object-Oriented"
        subtitle="Architecture"
        description="Sistemleri birbirleriyle mesajlaşan, bağımsız ve sorumlu nesneler kümesi olarak tasarlayın. Modülerliğin ve yeniden kullanılabilirliğin temeli."
        badge="Modular Design"
        color="#10b981"
        illustration={illu}
        features={[
          { icon: <Package />, title: 'Encapsulation', desc: 'Veri ve davranışı bir arada tutarak karmaşıklığı gizleyin.' },
          { icon: <GitBranch />, title: 'Inheritance', desc: 'Hiyerarşik yapılarla kod tekrarını minimize edin.' },
          { icon: <Target />, title: 'Polymorphism', desc: 'Aynı arayüzle farklı davranışları ustalıkla yönetin.' }
        ]}
      />
    </motion.div>
  );
};

export default ObjectOrientedPage;
