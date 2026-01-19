import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Share2, Activity, Wind, Target } from 'lucide-react';
import ArchHero from './ArchHero';

const EDAHero = () => {
  const illu = (
    <div style={{ position: 'relative', width: '350px', height: '350px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <motion.div
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
        style={{ width: '80px', height: '80px', background: 'var(--glass)', border: '2px solid #f97316', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10, boxShadow: '0 0 30px rgba(249, 115, 22, 0.3)' }}
      >
        <Zap size={40} color="#f97316" fill="#f9731633" />
      </motion.div>
      
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <motion.div
          key={i}
          animate={{ 
            x: [0, Math.cos(i * Math.PI/3) * 150],
            y: [0, Math.sin(i * Math.PI/3) * 150],
            opacity: [1, 0]
          }}
          transition={{ 
            duration: 2, 
            repeat: Infinity, 
            delay: i * 0.3,
            ease: "easeOut"
          }}
          style={{
            position: 'absolute',
            width: '12px',
            height: '12px',
            background: '#f97316',
            borderRadius: '50%',
            boxShadow: '0 0 10px #f97316'
          }}
        />
      ))}
    </div>
  );

  return (
    <ArchHero 
      title="Event-Driven"
      subtitle="Architecture (EDA)"
      description="Sistemin her bir parçasının olan biteni olaylar (events) üzerinden anlattığı reaktif yapı. Mesajlaşmanın ve asenkron gücün zirvesi."
      badge="Reactive Systems"
      color="#f97316"
      illustration={illu}
      features={[
        { icon: <Wind />, title: 'Pure Agility', desc: 'Yeni tüketiciler eklemek üreticiyi asla etkilemez.' },
        { icon: <Share2 />, title: 'Real-time Flow', desc: 'Verinin oluştuğu anda işlenmesi ve dağıtılması.' },
        { icon: <Target />, title: 'Loose Coupling', desc: 'Servislerin birbirini tanımadığı, sadece olaylara odaklandığı özgürlük.' }
      ]}
    />
  );
};

export default EDAHero;
