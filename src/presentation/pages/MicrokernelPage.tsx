import React from 'react';
import { motion } from 'framer-motion';
import { Cpu, Box, Zap, Settings, Shield, PlusCircle, Hexagon } from 'lucide-react';
import ArchHero from '../components/ArchHero';

const MicrokernelPage = () => {
  const illu = (
    <div style={{ position: 'relative', width: '350px', height: '350px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <motion.div
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 3, repeat: Infinity }}
        style={{ width: '120px', height: '120px', background: 'var(--glass)', border: '3px solid #10b981', borderRadius: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10, boxShadow: '0 0 40px rgba(16, 185, 129, 0.2)' }}
      >
        <Box size={40} color="#10b981" />
      </motion.div>
      
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <motion.div
          key={i}
          animate={{ 
            rotate: 360,
          }}
          transition={{ 
            duration: 15, 
            repeat: Infinity, 
            ease: "linear",
            delay: i * 0.5
          }}
          style={{
            position: 'absolute',
            width: '240px',
            height: '2px',
            background: 'transparent',
            transform: `rotate(${i * 60}deg)`
          }}
        >
          <motion.div
            animate={{ 
              x: [0, 20, 0],
              opacity: [0.5, 1, 0.5]
            }}
            transition={{ repeat: Infinity, duration: 2 }}
            style={{
              position: 'absolute',
              right: -15,
              top: -15,
              width: '30px',
              height: '30px',
              borderRadius: '8px',
              background: 'var(--glass)',
              border: '1px solid #10b98166',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <PlusCircle size={16} color="#10b981" />
          </motion.div>
        </motion.div>
      ))}
    </div>
  );

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ background: 'var(--bg-dark)' }}>
      <ArchHero 
        title="Microkernel"
        subtitle="Architecture"
        description="Sistemin değişmez ana çekirdeği ile sürekli gelişen eklentilerini birbirinden ayıran, modern yazılımların esneklik sırrı. VS Code ve Linux'un kalbi."
        badge="Plug-in Architecture"
        color="#10b981"
        illustration={illu}
        features={[
          { icon: <Shield />, title: 'High Stability', desc: 'Çekirdek minimum düzeyde tutulduğu için sistem hataya daha dayanıklıdır.' },
          { icon: <Zap />, title: 'Extensibility', desc: 'Ana koda dokunmadan dilediğiniz kadar yeni yetenek ekleyin.' },
          { icon: <Settings />, title: 'Agility', desc: 'Sürekli değişen müşteri taleplerini özel eklentilerle hızlıca karşılayın.' }
        ]}
      />
      
      <div className="container" style={{ padding: '4rem 0' }}>
         {/* More content can go here if needed, but the Hero is now premium */}
      </div>
    </motion.div>
  );
};

export default MicrokernelPage;
