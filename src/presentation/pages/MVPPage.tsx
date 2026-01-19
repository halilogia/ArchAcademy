import React from 'react';
import { motion } from 'framer-motion';
import ArchHero from '../components/ArchHero';
import { Layout, UserCheck, Activity } from 'lucide-react';

const MVPPage = () => {
  const illu = (
    <div style={{ position: 'relative', width: '300px', height: '300px' }}>
      {/* Presenter in middle */}
      <motion.div
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
        style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '100px', height: '100px', background: 'var(--glass)', border: '2px solid #ec4899', borderRadius: '15px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', zIndex: 10 }}
      >
        <UserCheck size={32} color="#ec4899" />
        <span style={{ fontSize: '0.6rem', fontWeight: 900, marginTop: '5px' }}>PRESENTER</span>
      </motion.div>

      {/* Model & View links */}
      <div style={{ position: 'absolute', top: '20px', left: '50%', transform: 'translateX(-50%)', width: '80px', height: '60px', background: 'var(--glass)', border: '1px solid #ec489988', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Layout size={20} color="#ec4899" />
      </div>
      <div style={{ position: 'absolute', bottom: '20px', left: '50%', transform: 'translateX(-50%)', width: '80px', height: '60px', background: 'var(--glass)', border: '1px solid #ec489988', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Activity size={20} color="#ec4899" />
      </div>

      <svg style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1 }}>
        <motion.line x1="150" y1="80" x2="150" y2="150" stroke="#ec4899" strokeWidth="2" strokeDasharray="5 5" animate={{ strokeDashoffset: [0, -20] }} transition={{ repeat: Infinity, ease: "linear", duration: 1 }} />
        <motion.line x1="150" y1="220" x2="150" y2="280" stroke="#ec4899" strokeWidth="2" strokeDasharray="5 5" animate={{ strokeDashoffset: [0, 20] }} transition={{ repeat: Infinity, ease: "linear", duration: 1 }} />
      </svg>
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
