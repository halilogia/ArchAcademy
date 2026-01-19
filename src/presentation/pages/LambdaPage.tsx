import React from 'react';
import { motion } from 'framer-motion';
import ArchHero from '../components/ArchHero';
import { Layers, Database, Zap, Activity } from 'lucide-react';

const LambdaPage = () => {
  const illu = (
    <div style={{ position: 'relative', width: '350px', height: '300px', display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'center' }}>
      {/* Batch Layer */}
      <motion.div animate={{ x: [-10, 10, -10] }} transition={{ duration: 4, repeat: Infinity }} style={{ width: '250px', height: '60px', background: 'var(--glass)', border: '2px solid #6366f1', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
        <Database size={18} color="#6366f1" />
        <span style={{ fontSize: '0.7rem', fontWeight: 900 }}>BATCH LAYER (Historical)</span>
      </motion.div>
      
      <div style={{ color: 'var(--text-secondary)' }}>+</div>

      {/* Speed Layer */}
      <motion.div animate={{ scale: [1, 1.05, 1] }} transition={{ duration: 2, repeat: Infinity }} style={{ width: '250px', height: '60px', background: 'var(--glass)', border: '2px solid #818cf8', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
        <Zap size={18} color="#818cf8" />
        <span style={{ fontSize: '0.7rem', fontWeight: 900 }}>SPEED LAYER (Real-time)</span>
      </motion.div>

      <div style={{ position: 'absolute', right: '0', top: '50%', transform: 'translateY(-50%)', width: '60px', height: '150px', border: '2px dashed #6366f1', borderRadius: '30px', borderLeft: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Activity size={24} color="#6366f1" />
      </div>
    </div>
  );

  return (
    <ArchHero 
      title="Lambda"
      subtitle="Architecture"
      description="Büyük veriyi işlemek için hem ölçeklenebilir batch katmanını hem de düşük gecikmeli speed katmanını birleştiren hibrit model."
      badge="Big Data Hybrid"
      color="#6366f1"
      illustration={illu}
      features={[
        { icon: <Database />, title: 'Batch Layer', desc: 'Tüm tarihsel verinin değişmez (immutable) şekilde saklanması ve işlenmesi.' },
        { icon: <Zap />, title: 'Speed Layer', desc: 'Sadece yeni gelen verilerin anlık olarak işlenip sonuçlara yansıtılması.' },
        { icon: <Layers />, title: 'Serving Layer', desc: 'Her iki katmandan gelen sonuçların birleştirilip sorgulanabilir hale getirilmesi.' }
      ]}
    />
  );
};

export default LambdaPage;
