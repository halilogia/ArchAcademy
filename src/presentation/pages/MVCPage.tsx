import React from 'react';
import { motion } from 'framer-motion';
import ArchHero from '../components/ArchHero';
import { Layout, Database, Settings } from 'lucide-react';

const MVCPage = () => {
  const illu = (
    <div style={{ position: 'relative', width: '300px', height: '300px' }}>
      {/* View */}
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 3, repeat: Infinity }}
        style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: '120px', height: '80px', background: 'var(--glass)', border: '2px solid #ec4899', borderRadius: '15px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}
      >
        <Layout size={24} color="#ec4899" />
        <span style={{ fontSize: '0.7rem', fontWeight: 800, marginTop: '5px' }}>VIEW</span>
      </motion.div>

      {/* Controller */}
      <motion.div
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
        style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '120px', height: '80px', background: 'var(--glass)', border: '2px solid #ec4899', borderRadius: '15px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', zIndex: 2 }}
      >
        <Settings size={24} color="#ec4899" />
        <span style={{ fontSize: '0.7rem', fontWeight: 800, marginTop: '5px' }}>CONTROLLER</span>
      </motion.div>

      {/* Model */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 3, repeat: Infinity }}
        style={{ position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)', width: '120px', height: '80px', background: 'var(--glass)', border: '2px solid #ec4899', borderRadius: '15px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}
      >
        <Database size={24} color="#ec4899" />
        <span style={{ fontSize: '0.7rem', fontWeight: 800, marginTop: '5px' }}>MODEL</span>
      </motion.div>

      {/* Connectors */}
      <svg style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1 }}>
        <line x1="150" y1="80" x2="150" y2="110" stroke="#ec4899" strokeWidth="2" strokeDasharray="4" />
        <line x1="150" y1="190" x2="150" y2="220" stroke="#ec4899" strokeWidth="2" strokeDasharray="4" />
      </svg>
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
