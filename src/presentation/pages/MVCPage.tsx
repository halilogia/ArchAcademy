import React from 'react';
import { motion } from 'framer-motion';
import ArchHero from '../components/ArchHero';
import { Layout, Database, Settings } from 'lucide-react';

const MVCPage = () => {
  const illu = (
    <div style={{ position: 'relative', width: '350px', height: '350px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between' }}>
      {/* View */}
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        style={{ width: '130px', height: '85px', background: 'var(--glass)', border: '2px solid #ec4899', borderRadius: '18px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', zIndex: 3, boxShadow: '0 10px 30px rgba(236, 72, 153, 0.2)' }}
      >
        <Layout size={28} color="#ec4899" />
        <span style={{ fontSize: '0.75rem', fontWeight: 900, marginTop: '6px', color: 'white' }}>VIEW</span>
      </motion.div>

      {/* Dynamic Connector Down */}
      <div style={{ height: '40px', width: '2px', background: 'rgba(236, 72, 153, 0.2)', position: 'relative' }}>
        <motion.div 
          animate={{ top: ['0%', '100%'], opacity: [0, 1, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          style={{ position: 'absolute', width: '6px', height: '6px', background: '#ec4899', borderRadius: '50%', left: '-2px', filter: 'blur(1px)' }}
        />
      </div>

      {/* Controller / ViewModel */}
      <motion.div
        animate={{ scale: [1, 1.03, 1] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        style={{ width: '140px', height: '90px', background: 'var(--glass)', border: '2px solid #ec4899', borderRadius: '18px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', zIndex: 3, boxShadow: '0 0 40px rgba(236, 72, 153, 0.15)' }}
      >
        <Settings size={28} color="#ec4899" className="rotate-slow" />
        <span style={{ fontSize: '0.75rem', fontWeight: 900, marginTop: '6px', color: 'white' }}>CONTROLLER</span>
      </motion.div>

      {/* Dynamic Connector Up & Down */}
      <div style={{ height: '40px', width: '2px', background: 'rgba(236, 72, 153, 0.2)', position: 'relative' }}>
        <motion.div 
          animate={{ bottom: ['0%', '100%'], opacity: [0, 1, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear", delay: 0.75 }}
          style={{ position: 'absolute', width: '6px', height: '6px', background: '#ec4899', borderRadius: '50%', left: '-2px', filter: 'blur(1px)' }}
        />
      </div>

      {/* Model */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        style={{ width: '130px', height: '85px', background: 'var(--glass)', border: '2px solid #ec4899', borderRadius: '18px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', zIndex: 3, boxShadow: '0 -10px 30px rgba(236, 72, 153, 0.2)' }}
      >
        <Database size={28} color="#ec4899" />
        <span style={{ fontSize: '0.75rem', fontWeight: 900, marginTop: '6px', color: 'white' }}>MODEL</span>
      </motion.div>

      <style>{`
        .rotate-slow { animation: spin 8s linear infinite; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <ArchHero 
        title="MVC / MVVM"
        subtitle="Interaction Patterns"
        description="Kullanıcı arayüzü, veri ve mantığı birbirinden kesin çizgilerle ayıran klasik etkileşim modelleri. Modern web ve mobil uygulamaların temel iskeleti."
        badge="UI Architecture"
        color="#ec4899"
        illustration={illu}
        features={[
          { icon: <Layout />, title: 'SoC', desc: 'Sorumlulukların ayrılması (Separation of Concerns) prensibiyle temiz kod.' },
          { icon: <Database />, title: 'Data Binding', desc: 'Veri ve arayüz arasındaki otomatik senkronizasyon (MVVM).' },
          { icon: <Settings />, title: 'Testability', desc: 'Arayüzden bağımsız olarak iş mantığını test edebilme yeteneği.' }
        ]}
      />
    </motion.div>
  );
};

export default MVCPage;
