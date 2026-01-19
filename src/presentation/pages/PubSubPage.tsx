import React from 'react';
import { motion } from 'framer-motion';
import ArchHero from '../components/ArchHero';
import { Share2, Zap, Radio, Target } from 'lucide-react';

const PubSubPage = () => {
  const illu = (
    <div style={{ position: 'relative', width: '300px', height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <motion.div
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <Radio size={60} color="#f97316" />
      </motion.div>
      
      {[0, 1, 2, 3].map((i) => (
        <motion.div
          key={i}
          animate={{ 
            x: [0, Math.cos(i * Math.PI/2) * 120],
            y: [0, Math.sin(i * Math.PI/2) * 120],
            opacity: [1, 0]
          }}
          transition={{ repeat: Infinity, duration: 2, delay: i * 0.5 }}
          style={{ position: 'absolute', color: '#f97316' }}
        >
          <Zap size={20} />
        </motion.div>
      ))}
    </div>
  );

  return (
    <ArchHero 
      title="Publish / Subscribe"
      subtitle="Messaging Pattern"
      description="Mesaj göndericilerin (Publishers), alıcıları (Subscribers) tanımadan mesaj yayınladığı dağıtık haberleşme modeli. Modern sistemlerin haberleşme omurgası."
      badge="Event Distribution"
      color="#f97316"
      illustration={illu}
      features={[
        { icon: <Radio />, title: 'Broadcasting', desc: 'Tek bir olayı aynı anda binlerce dinleyiciye ulaştırın.' },
        { icon: <Target />, title: 'Topic Isolation', desc: 'Alıcılar sadece ilgilendikleri konu başlıklarına (topics) abone olurlar.' },
        { icon: <Zap />, title: 'Extreme Decoupling', desc: 'Sistemin parçaları birbirinden tamamen habersiz, sadece mesajlarla bağlıdır.' }
      ]}
    />
  );
};

export default PubSubPage;
