import React from 'react';
import { motion } from 'framer-motion';
import ArchHero from '../components/ArchHero';
import { Box, PlusCircle, Layout, Shield } from 'lucide-react';

const PlugInPage = () => {
  const illu = (
    <div style={{ position: 'relative', width: '350px', height: '350px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ width: '120px', height: '120px', borderRadius: '24px', background: 'var(--glass)', border: '2px solid #10b981', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10 }}>
        <Box size={40} color="#10b981" />
      </div>
      
      {[0, 1, 2, 3].map(i => (
        <motion.div
          key={i}
          animate={{ 
            x: [0, Math.cos(i * Math.PI/2) * 130, 0],
            y: [0, Math.sin(i * Math.PI/2) * 130, 0],
            opacity: [0, 1, 0]
          }}
          transition={{ duration: 4, repeat: Infinity, delay: i * 1 }}
          style={{ position: 'absolute' }}
        >
          <div style={{ width: '40px', height: '40px', background: 'var(--glass)', border: '1px solid #10b981', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <PlusCircle size={20} color="#10b981" />
          </div>
        </motion.div>
      ))}
    </div>
  );

  return (
    <ArchHero 
      title="Plug-in"
      subtitle="Architecture"
      description="Sisteme yeni özelliklerin ana koda dokunmadan dinamik olarak eklenmesini sağlayan yapı. Modern SaaS ve IDE lerin esneklik temeli."
      badge="Dynamic Extension"
      color="#10b981"
      illustration={illu}
      features={[
        { icon: <PlusCircle />, title: 'Hot Swapping', desc: 'Sistemi kapatmadan yeni modüller ekleyin veya mevcutları güncelleyin.' },
        { icon: <Shield />, title: 'Isolation', desc: 'Eklentilerdeki hatalar ana sisteme (core) zarar vermez.' },
        { icon: <Layout />, title: 'Customization', desc: 'Farklı müşteriler için farklı eklenti setleri ile özel çözümler sunun.' }
      ]}
    />
  );
};

export default PlugInPage;
