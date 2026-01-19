import React from 'react';
import { motion } from 'framer-motion';
import ArchHero from '../components/ArchHero';
import { Zap, Share2, Wind } from 'lucide-react';

const ChoreographyPage = () => {
  const illu = (
    <div style={{ position: 'relative', width: '300px', height: '200px' }}>
      {[0, 1, 2, 3].map((i) => (
        <motion.div
          key={i}
          animate={{ 
            x: [i * 70, (i + 1) * 70, i * 70],
            opacity: [0.5, 1, 0.5]
          }}
          transition={{ repeat: Infinity, duration: 3, delay: i * 0.4 }}
          style={{
            position: 'absolute',
            top: '50%',
            left: '20px',
            width: '50px',
            height: '50px',
            background: 'var(--glass)',
            border: '1px solid #ea580c',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: '-25px'
          }}
        >
          <Zap size={24} color="#f97316" />
        </motion.div>
      ))}
      <svg style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
        <motion.path
          d="M 20 100 Q 150 10 280 100"
          fill="none"
          stroke="#ea580c"
          strokeWidth="2"
          strokeDasharray="5 5"
          animate={{ strokeDashoffset: [0, -20] }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
        />
      </svg>
    </div>
  );

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <ArchHero 
        title="Choreography"
        subtitle="Architecture"
        description="Merkezi bir yönetici olmadan, servislerin olayları dinleyerek kendi kendine organize olduğu dağıtık akışlar. Esnekliğin zirve noktası."
        badge="Decentralized Flow"
        color="#ea580c"
        illustration={illu}
        features={[
          { icon: <Wind />, title: 'Agility', desc: 'Sistemi bozmadan yeni servisler eklemek veya çıkarmak çok kolaydır.' },
          { icon: <Share2 />, title: 'Scalability', desc: 'Merkezi bir darboğaz (bottleneck) olmadan sonsuz ölçeklenebilirlik.' },
          { icon: <Zap />, title: 'Event-Driven', desc: 'Her servis sadece ilgilendiği olaylara (events) tepki verir.' }
        ]}
      />
    </motion.div>
  );
};

export default ChoreographyPage;
