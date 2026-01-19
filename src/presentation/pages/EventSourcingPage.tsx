import React from 'react';
import { motion } from 'framer-motion';
import ArchHero from '../components/ArchHero';
import { History, Save, RotateCcw } from 'lucide-react';

const EventSourcingPage = () => {
  const illu = (
    <div style={{ position: 'relative', width: '300px', height: '300px' }}>
      {[0, 1, 2, 3].map((i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.8, repeat: Infinity, repeatDelay: 1 }}
          style={{
            width: '180px',
            height: '50px',
            background: 'var(--glass)',
            border: '1px solid #6366f1',
            borderRadius: '10px',
            display: 'flex',
            alignItems: 'center',
            padding: '0 15px',
            marginBottom: '10px',
            position: 'absolute',
            top: i * 60,
            left: i * 20,
            boxShadow: '0 10px 20px rgba(99, 102, 241, 0.1)'
          }}
        >
          <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity }} style={{ marginRight: '10px' }}>
            <RotateCcw size={16} color="#818cf8" />
          </motion.div>
          <span style={{ fontSize: '0.75rem', fontWeight: 700 }}>EVENT #{100 + i} LOGGED</span>
        </motion.div>
      ))}
      <div style={{ position: 'absolute', right: 0, bottom: 0, padding: '20px', background: '#6366f122', borderRadius: '20px', border: '1px dashed #6366f1' }}>
        <Save size={30} color="#6366f1" />
        <div style={{ fontSize: '0.6rem', marginTop: '5px' }}>STATE STORE</div>
      </div>
    </div>
  );

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <ArchHero 
        title="Event Sourcing"
        subtitle="Architecture"
        description="Sistemin mevcut durumunu değil, o duruma nasıl gelindiğini (olayları) saklayan devrimci veri modeli. Geri sarılabilir ve denetlenebilir sistemler."
        badge="Audit & Replay"
        color="#6366f1"
        illustration={illu}
        features={[
          { icon: <History />, title: 'Time Travel', desc: 'Sistemi geçmişteki herhangi bir ana geri sarın ve yeniden çalıştırın.' },
          { icon: <Save />, title: 'Single Source of Truth', desc: 'Durum (state) geçicidir, olaylar (events) kalıcı ve asıl gerçektir.' },
          { icon: <RotateCcw />, title: 'Audit Log', desc: 'Sistemde olan her şeyin kim tarafından ve ne zaman yapıldığını doğal olarak bilin.' }
        ]}
      />
    </motion.div>
  );
};

export default EventSourcingPage;
