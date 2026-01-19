import React from 'react';
import { motion } from 'framer-motion';
import ArchHero from '../components/ArchHero';
import { Layout, Share2, Database, Zap } from 'lucide-react';

const MVVMPage = () => {
  const illu = (
    <div style={{ position: 'relative', width: '350px', height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '20px' }}>
      <div className="glass-card" style={{ padding: '1rem', textAlign: 'center' }}>
        <Layout size={24} color="#ec4899" />
        <div style={{ fontSize: '0.6rem', marginTop: '5px' }}>VIEW</div>
      </div>
      
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        style={{ width: '80px', height: '80px', border: '2px dashed #ec4899', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <Zap size={24} color="#ec4899" />
      </motion.div>

      <div className="glass-card" style={{ padding: '1rem', textAlign: 'center', border: '2px solid #ec4899' }}>
        <Share2 size={24} color="#ec4899" />
        <div style={{ fontSize: '0.6rem', marginTop: '5px' }}>VIEW-MODEL</div>
      </div>

      <div className="glass-card" style={{ padding: '1rem', textAlign: 'center' }}>
        <Database size={24} color="#ec4899" />
        <div style={{ fontSize: '0.6rem', marginTop: '5px' }}>MODEL</div>
      </div>
    </div>
  );

  return (
    <ArchHero 
      title="MVVM"
      subtitle="Architecture"
      description="Model-View-ViewModel. Veri bağlama (Data Binding) odaklı, View ve Model i tamamen birbirinden koparan modern uygulama mimarisi."
      badge="Reactive UI"
      color="#ec4899"
      illustration={illu}
      features={[
        { icon: <Zap />, title: 'Data Binding', desc: 'ViewModel deki veri değiştiğinde View otomatik olarak güncellenir.' },
        { icon: <Share2 />, title: 'Observable State', desc: 'View'ün durumunu tamamen reaktif bir akış üzerinden yönetin.' },
        { icon: <Layout />, title: 'Framework Ready', desc: 'React, Vue ve Angular gibi modern kütüphanelerin temel çalışma prensibi.' }
      ]}
    />
  );
};

export default MVVMPage;
