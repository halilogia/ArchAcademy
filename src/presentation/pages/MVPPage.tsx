import React from 'react';
import { motion } from 'framer-motion';
import ArchHero from '../components/ArchHero';
import { Layout, UserCheck, Activity } from 'lucide-react';

const MVPPage = () => {
  const illu = (
    <div style={{ position: 'relative', width: '350px', height: '350px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between' }}>
      {/* View (Pasif) */}
      <motion.div
        animate={{ opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 4, repeat: Infinity }}
        style={{ width: '120px', height: '75px', background: 'var(--glass)', border: '1px solid #ec4899', borderRadius: '15px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', opacity: 0.8 }}
      >
        <Layout size={24} color="#ec4899" />
        <span style={{ fontSize: '0.65rem', fontWeight: 800, marginTop: '4px', color: 'white' }}>PASSIVE VIEW</span>
      </motion.div>

      {/* Dynamic Connector */}
      <div style={{ height: '40px', width: '2px', background: 'rgba(236, 72, 153, 0.2)', position: 'relative' }}>
        <motion.div 
          animate={{ top: ['0%', '100%'], opacity: [0, 1, 0] }}
          transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
          style={{ position: 'absolute', width: '6px', height: '6px', background: '#ec4899', borderRadius: '50%', left: '-2px' }}
        />
        <motion.div 
          animate={{ top: ['100%', '0%'], opacity: [0, 1, 0] }}
          transition={{ duration: 1.2, repeat: Infinity, ease: "linear", delay: 0.6 }}
          style={{ position: 'absolute', width: '6px', height: '6px', background: '#ec4899', borderRadius: '50%', left: '-2px' }}
        />
      </div>

      {/* Presenter (Hub) */}
      <motion.div
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 3, repeat: Infinity }}
        style={{ width: '150px', height: '100px', background: 'var(--glass)', border: '3px solid #ec4899', borderRadius: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', zIndex: 10, boxShadow: '0 0 40px rgba(236, 72, 153, 0.3)' }}
      >
        <UserCheck size={32} color="#ec4899" />
        <span style={{ fontSize: '0.8rem', fontWeight: 950, marginTop: '6px', color: 'white' }}>PRESENTER</span>
      </motion.div>

      {/* Dynamic Connector */}
      <div style={{ height: '40px', width: '2px', background: 'rgba(236, 72, 153, 0.2)', position: 'relative' }}>
        <motion.div 
          animate={{ top: ['0%', '100%'], opacity: [0, 1, 0] }}
          transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
          style={{ position: 'absolute', width: '6px', height: '6px', background: '#ec4899', borderRadius: '50%', left: '-2px' }}
        />
        <motion.div 
          animate={{ top: ['100%', '0%'], opacity: [0, 1, 0] }}
          transition={{ duration: 1.2, repeat: Infinity, ease: "linear", delay: 0.6 }}
          style={{ position: 'absolute', width: '6px', height: '6px', background: '#ec4899', borderRadius: '50%', left: '-2px' }}
        />
      </div>

      {/* Model */}
      <div style={{ width: '120px', height: '75px', background: 'var(--glass)', border: '1px solid #ec4899', borderRadius: '15px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <Activity size={24} color="#ec4899" />
        <span style={{ fontSize: '0.65rem', fontWeight: 800, marginTop: '4px', color: 'white' }}>MODEL</span>
      </div>
    </div>
  );

  return (
    <ArchHero 
      title="MVP"
      subtitle="Architecture"
      description="Model-View-Presenter. View ve Model arasındaki tüm iletişimi Presenter üzerinden yürüterek arayüzü tamamen pasif (Passive View) hale getiren mimari."
      badge="Interaction Pattern"
      color="#ec4899"
      illustration={illu}
      features={[
        { icon: <UserCheck />, title: 'Total Separation', desc: 'View ve Model birbirini asla tanımaz, tüm trafik Presenter dan geçer.' },
        { icon: <Layout />, title: 'Passive View', desc: 'View sadece veriyi gösterir, mantık (logic) barındırmaz.' },
        { icon: <Activity />, title: 'Easy Testing', desc: 'Arayüz mantığını presenter seviyesinde kolayca test edin.' }
      ]}
    />
  );
};

export default MVPPage;
