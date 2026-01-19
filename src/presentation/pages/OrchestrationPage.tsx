import React from 'react';
import { motion } from 'framer-motion';
import ArchHero from '../components/ArchHero';
import { Target, GitMerge, Cpu } from 'lucide-react';

const OrchestrationPage = () => {
  const illu = (
    <div style={{ position: 'relative', width: '300px', height: '300px' }}>
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
        style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
      >
        <div style={{ position: 'relative', width: '200px', height: '200px', border: '2px dashed #fb923c', borderRadius: '50%' }}>
          {[0, 1, 2, 3].map((i) => (
            <motion.div
              key={i}
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                width: '40px',
                height: '40px',
                background: 'var(--glass)',
                border: '1px solid #fb923c',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transform: `rotate(${i * 90}deg) translateY(-100px)`
              }}
            >
              <Cpu size={20} color="#fb923c" />
            </motion.div>
          ))}
        </div>
      </motion.div>
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ repeat: Infinity, duration: 2 }}
          style={{ width: '80px', height: '800px', background: 'radial-gradient(circle, #fb923c44 0%, transparent 70%)', zIndex: -1 }}
        />
        <Target size={60} color="#f97316" />
      </div>
    </div>
  );

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <ArchHero 
        title="Orchestration"
        subtitle="Architecture"
        description="Merkezi bir yönetici (orchestrator) tarafından kontrol edilen servis akışları. Süreçlerin tam denetim ve görünürlük altında olduğu yapılar."
        badge="Central Control"
        color="#f97316"
        illustration={illu}
        features={[
          { icon: <Target />, title: 'Visibility', desc: 'İş akışının hangi aşamada olduğunu merkezi olarak görün.' },
          { icon: <GitMerge />, title: 'Error Handling', desc: 'Hataları merkezi bir noktadan yönetin ve telafi edin.' },
          { icon: <Cpu />, title: 'Stateful', desc: 'Sürecin tüm durumunu merkezi olarak saklayın ve izleyin.' }
        ]}
      />
    </motion.div>
  );
};

export default OrchestrationPage;
