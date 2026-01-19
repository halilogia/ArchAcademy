import React from 'react';
import { motion } from 'framer-motion';
import ArchHero from '../components/ArchHero';
import { Zap, Activity, Database, Cpu } from 'lucide-react';

const SpaceBasedPage = () => {
  const illu = (
    <div style={{ position: 'relative', width: '350px', height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <motion.div
        animate={{ 
          scale: [1, 1.05, 1],
          opacity: [0.3, 0.6, 0.3]
        }}
        transition={{ duration: 4, repeat: Infinity }}
        style={{ position: 'absolute', width: '300px', height: '200px', background: 'radial-gradient(ellipse, #eab30822 0%, transparent 70%)', borderRadius: '50%' }}
      />
      
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          animate={{ 
            y: [0, -15, 0],
            x: i === 0 ? [-10, 10, -10] : (i === 1 ? [10, -10, 10] : 0)
          }}
          transition={{ duration: 3, repeat: Infinity, delay: i * 0.5 }}
          style={{
            width: '80px',
            height: '80px',
            background: 'var(--glass)',
            border: '2px solid #eab308',
            borderRadius: '16px',
            margin: '0 10px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 10px 30px rgba(234, 179, 8, 0.15)'
          }}
        >
          <Database size={24} color="#eab308" />
          <span style={{ fontSize: '0.6rem', fontWeight: 900, marginTop: '5px' }}>TUPLE</span>
        </motion.div>
      ))}
      
      <div style={{ position: 'absolute', bottom: '20px', color: '#eab308', opacity: 0.5 }}>
        <Activity size={40} />
      </div>
    </div>
  );

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <ArchHero 
        title="Space-Based"
        subtitle="Architecture"
        description="Veritabanı darboğazını ortadan kaldıran, veriyi bellek içinde (in-memory) dağıtık bir 'boşluk' (space) içinde tutan yüksek performans mimarisi."
        badge="In-Memory Speed"
        color="#eab308"
        illustration={illu}
        features={[
          { icon: <Zap />, title: 'Extreme Scalability', desc: 'Veritabanı yükünü minimize ederek milyonlarca anlık işlemi yönetin.' },
          { icon: <Database />, title: 'Shared Nothing', desc: 'Düğümler arası bağımlılığı sıfırlayan tamamen bağımsız veri birimleri.' },
          { icon: <Cpu />, title: 'Cloud Native', desc: 'Elastic altyapılarda dinamik olarak genişleyen işlem kapasitesi.' }
        ]}
      />
    </motion.div>
  );
};

export default SpaceBasedPage;
