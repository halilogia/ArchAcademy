import React from 'react';
import { motion } from 'framer-motion';
import { Activity, AlertTriangle, RefreshCw, HardDrive, Network, ShieldCheck } from 'lucide-react';
import ArchHero from '../components/ArchHero';

const RobustnessPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{ background: 'var(--bg-dark)', minHeight: '100vh' }}
    >
      <ArchHero 
        title="Robustness"
        subtitle="& Resilience"
        description="Sistemleriniz hatalarla karşılaştığında çökmek yerine zarifçe (Gracefully) tepki versin. Hata payını mimari bir güç haline getirin."
        badge="Fault Tolerant Systems"
        color="#f59e0b"
        illustration={
          <div style={{ position: 'relative', width: '300px', height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <motion.div
               animate={{ rotate: [0, -10, 10, 0] }}
               transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 3 }}
               style={{ color: '#f59e0b' }}
            >
               <Activity size={120} strokeWidth={1} />
            </motion.div>
            <motion.div
              animate={{ opacity: [0, 1, 0], scale: [0.8, 1.2, 0.8] }}
              transition={{ duration: 2, repeat: Infinity }}
              style={{ position: 'absolute', top: 40, right: 40, color: '#ef4444' }}
            >
              <AlertTriangle size={32} />
            </motion.div>
          </div>
        }
        features={[
          { icon: <HardDrive />, title: 'Disk/IO Failure Safety', desc: 'Veri kaybını önleyen asenkron ve yedekli yazma stratejileri.' },
          { icon: <Network />, title: 'Network Resilience', desc: 'Ağ kopmalarına karşı Circuit Breaker ve Retry mekanizmaları.' },
          { icon: <RefreshCw />, title: 'Graceful Degradation', desc: 'Kısmi hatalarda uygulamanın ana özelliklerini ayakta tutma.' }
        ]}
      />

      <section style={{ padding: '100px 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
            <h2 className="gradient-text" style={{ fontSize: '3rem', fontWeight: 800 }}>Mimaride Dayanıklılık Teknikleri</h2>
            <p style={{ color: 'var(--text-secondary)' }}>Sistemi sarsılmaz kılan 3 savunma hattı.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem' }}>
            <div className="glass-card" style={{ padding: '3rem' }}>
              <div style={{ color: '#f59e0b', marginBottom: '1.5rem' }}><RefreshCw size={40} /></div>
              <h3 style={{ marginBottom: '1rem' }}>Circuit Breaker</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.8 }}>
                Hatalı bir servise sürekli istek atmak yerine, hattı "atmak" ve sisteme nefes alacak zaman tanımak.
              </p>
            </div>

            <div className="glass-card" style={{ padding: '3rem' }}>
              <div style={{ color: '#f59e0b', marginBottom: '1.5rem' }}><ShieldCheck size={40} /></div>
              <h3 style={{ marginBottom: '1rem' }}>Fail-Fast Design</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.8 }}>
                Hataları mümkün olan en erken aşamada (Validation, Health Check) tespit edip sistemi belirsizlikten kurtarmak.
              </p>
            </div>

            <div className="glass-card" style={{ padding: '3rem' }}>
              <div style={{ color: '#f59e0b', marginBottom: '1.5rem' }}><HardDrive size={40} /></div>
              <h3 style={{ marginBottom: '1rem' }}>Self-Healing</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.8 }}>
                Çöken servislerin otomatik yeniden başlatılması ve veritabanı bağlantılarının sessizce onarılması yeteneği.
              </p>
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default RobustnessPage;
