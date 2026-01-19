import React from 'react';
import { motion } from 'framer-motion';
import ArchHero from '../components/ArchHero';
import { Zap, Activity, Waves, Clock } from 'lucide-react';

const KappaPage = () => {
  const illu = (
    <div style={{ position: 'relative', width: '300px', height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <motion.div
        animate={{ 
          strokeDashoffset: [0, -40],
        }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        style={{ width: '100%', height: '80px', border: '3px solid #6366f1', borderRadius: '40px', background: 'rgba(99, 102, 241, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'space-around', padding: '0 20px' }}
      >
        {[0, 1, 2, 3, 4].map(i => (
          <motion.div
            key={i}
            animate={{ x: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 0.5, delay: i * 0.1 }}
          >
            <Zap size={16} color="#818cf8" />
          </motion.div>
        ))}
      </motion.div>
      <div style={{ position: 'absolute', top: '-40px', fontWeight: 900, color: '#6366f1', fontSize: '0.7rem' }}>SINGLE REAL-TIME STREAM</div>
    </div>
  );

  return (
    <ArchHero 
      title="Kappa"
      subtitle="Architecture"
      description="Lambda nın karmaşıklığını reddeden, hem geçmişi hem bugünü tek bir 'Stream Processing' hattı üzerinden işleyen yalın veri mimarisi."
      badge="Stream Processing"
      color="#6366f1"
      illustration={illu}
      features={[
        { icon: <Zap />, title: 'Real-time Only', desc: 'Batch katmanına gerek kalmadan her şeyi anlık akış olarak işleyin.' },
        { icon: <Waves />, title: 'Simplicity', desc: 'Tek bir kod tabanı ve tek bir teknoloji yığını ile daha az hata.' },
        { icon: <Clock />, title: 'Unified Storage', desc: 'Tüm veri tarihsel bir akış (immutable log) olarak saklanır.' }
      ]}
    />
  );
};

export default KappaPage;
