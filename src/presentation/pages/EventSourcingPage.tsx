import React from 'react';
import { motion } from 'framer-motion';
import ArchHero from '../components/ArchHero';
import { History, Save, RotateCcw } from 'lucide-react';

const EventSourcingPage = () => {
  const illu = (
    <div style={{ position: 'relative', width: '380px', height: '350px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      {/* Event Stream (The Log) */}
      <div style={{ width: '100%', height: '220px', position: 'relative', overflow: 'hidden', background: 'rgba(99, 102, 241, 0.05)', borderRadius: '20px', border: '1px solid rgba(99, 102, 241, 0.2)', padding: '35px 15px 15px 15px' }}>
        <div style={{ position: 'absolute', top: '12px', left: '15px', fontSize: '0.65rem', fontWeight: 900, color: '#818cf8', opacity: 0.9, letterSpacing: '1px' }}>APPEND-ONLY LOG</div>
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: i * 1, duration: 0.5 }}
            style={{
              width: '85%',
              height: '45px',
              background: 'var(--glass)',
              border: '1.5px solid #6366f1',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              padding: '0 15px',
              marginBottom: '10px',
              boxShadow: '0 5px 15px rgba(99, 102, 241, 0.1)'
            }}
          >
            <History size={18} color="#6366f1" style={{ marginRight: '10px' }} />
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: '0.7rem', fontWeight: 900, color: 'white' }}>EVENT #{1024 + i}</span>
              <span style={{ fontSize: '0.55rem', opacity: 0.6 }}>LOGGED AT {new Date().toLocaleTimeString()}</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Projection Line */}
      <div style={{ height: '40px', width: '2px', background: 'linear-gradient(to bottom, #6366f1, transparent)', position: 'relative' }}>
         <motion.div 
           animate={{ top: ['0%', '100%'], opacity: [0, 1, 0] }}
           transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
           style={{ position: 'absolute', width: '8px', height: '8px', background: '#6366f1', borderRadius: '50%', left: '-3px', boxShadow: '0 0 10px #6366f1' }}
         />
      </div>

      {/* Reconstructed State */}
      <motion.div
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        style={{ width: '180px', height: '80px', background: 'var(--glass)', border: '2px solid #6366f1', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '15px', boxShadow: '0 20px 40px rgba(0,0,0,0.3)', position: 'relative' }}
      >
        <div style={{ position: 'absolute', top: '-25px', fontSize: '0.65rem', fontWeight: 900, color: '#818cf8' }}>PROJECTED STATE</div>
        <Save size={32} color="#6366f1" />
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ height: '8px', width: '60px', background: '#6366f1', borderRadius: '4px', marginBottom: '6px', opacity: 0.8 }} />
          <div style={{ height: '8px', width: '40px', background: '#818cf8', borderRadius: '4px', opacity: 0.5 }} />
        </div>
      </motion.div>
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
