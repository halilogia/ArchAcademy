import React from 'react';
import { motion } from 'framer-motion';
import ArchHero from '../components/ArchHero';
import { Share2, MessageSquare, Zap } from 'lucide-react';

const BrokerPage = () => {
  const illu = (
    <div style={{ position: 'relative', width: '300px', height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <motion.div
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ repeat: Infinity, duration: 2 }}
        style={{ width: '100px', height: '100px', background: 'var(--glass)', border: '2px solid #ca8a04', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2, boxShadow: '0 0 40px rgba(202, 138, 4, 0.3)' }}
      >
        <Share2 size={40} color="#eab308" />
      </motion.div>
      {[0, 1, 2, 3].map((i) => (
        <motion.div
          key={i}
          animate={{ 
            x: [Math.cos(i * Math.PI/2) * 50, Math.cos(i * Math.PI/2) * 120, Math.cos(i * Math.PI/2) * 50],
            y: [Math.sin(i * Math.PI/2) * 50, Math.sin(i * Math.PI/2) * 120, Math.sin(i * Math.PI/2) * 50],
            opacity: [0, 1, 0]
          }}
          transition={{ repeat: Infinity, duration: 2, delay: i * 0.5 }}
          style={{ position: 'absolute', width: '20px', height: '20px', background: '#eab308', borderRadius: '50%' }}
        />
      ))}
    </div>
  );

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <ArchHero 
        title="Broker Styles"
        subtitle="Architecture"
        description="Mesajların merkezi bir aracı (broker) üzerinden yönlendirildiği dağıtık sistemler. Kafka ve RabbitMQ gibi modern veri hatlarının kalbi."
        badge="Messaging Hub"
        color="#eab308"
        illustration={illu}
        features={[
          { icon: <MessageSquare />, title: 'Decoupling', desc: 'Gönderici ve alıcı birbirini tanımaz, sadece aracıya güvenir.' },
          { icon: <Share2 />, title: 'Scalability', desc: 'Yeni tüketiciler eklemek sistemin geri kalanını etkilemez.' },
          { icon: <Zap />, title: 'Asynchronous', desc: 'İşlemler birbirini beklemeden, olay bazlı akar.' }
        ]}
      />
    </motion.div>
  );
};

export default BrokerPage;
