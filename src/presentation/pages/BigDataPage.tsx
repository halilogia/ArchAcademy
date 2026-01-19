import React from 'react';
import { motion } from 'framer-motion';
import ArchHero from '../components/ArchHero';
import { Database, Zap, Activity } from 'lucide-react';

const BigDataPage = () => {
  const illu = (
    <div style={{ position: 'relative', width: '300px', height: '250px' }}>
      {/* Batch Layer */}
      <motion.div
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 4, repeat: Infinity }}
        style={{ width: '250px', height: '80px', background: 'var(--glass)', border: '1px solid #4f46e5', borderRadius: '15px', padding: '15px', marginBottom: '20px' }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Database size={20} color="#6366f1" />
          <span style={{ fontSize: '0.8rem', fontWeight: 800 }}>BATCH LAYER (Master Dataset)</span>
        </div>
      </motion.div>
      
      {/* Speed Layer */}
      <motion.div
        animate={{ x: [0, 10, 0] }}
        transition={{ duration: 0.5, repeat: Infinity }}
        style={{ width: '250px', height: '80px', background: 'var(--glass)', border: '1px solid #818cf8', borderRadius: '15px', padding: '15px', marginLeft: '30px' }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Zap size={20} color="#818cf8" />
          <span style={{ fontSize: '0.8rem', fontWeight: 800 }}>SPEED LAYER (Real-time Stream)</span>
        </div>
      </motion.div>

      {/* Serving Layer Integration */}
      <div style={{ position: 'absolute', right: '-20px', top: '50%', transform: 'translateY(-50%)' }}>
        <Activity size={40} color="#4f46e5" opacity={0.3} />
      </div>
    </div>
  );

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <ArchHero 
        title="Big Data"
        subtitle="Stacks (Lambda/Kappa)"
        description="Büyük ölçekli verileri hem geçmişe dönük (batch) hem de anlık (speed) olarak işleyen hibrit mimari yapılar. Veri ambarlarının beyin sistemi."
        badge="Data Engineering"
        color="#4f46e5"
        illustration={illu}
        features={[
          { icon: <Database />, title: 'Immutability', desc: 'Ham veriyi asla silmeyin (Master Dataset), sadece üstüne ekleyin.' },
          { icon: <Zap />, title: 'Real-time', desc: 'Verinin oluştuğu anda işlenerek milisaniyeler içinde sonuç üretilmesi.' },
          { icon: <Activity />, title: 'Query Support', desc: 'Hem anlık hem de geçmişe dönük verilere tek bir noktadan sorgu atın.' }
        ]}
      />
    </motion.div>
  );
};

export default BigDataPage;
