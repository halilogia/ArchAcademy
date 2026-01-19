import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Cloud, CloudRain, Wind, MousePointer2, Clock, DollarSign, Activity } from 'lucide-react';
import ArchHero from '../components/ArchHero';

const ServerlessPage = () => {
  const illu = (
    <div style={{ position: 'relative', width: '300px', height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <motion.div
        animate={{ 
          y: [0, -20, 0],
          opacity: [0.7, 1, 0.7]
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <Cloud size={120} color="#a855f7" />
      </motion.div>
      
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          initial={{ y: 0, opacity: 0 }}
          animate={{ 
            y: [0, 60],
            opacity: [0, 1, 0]
          }}
          transition={{ 
            duration: 1.5, 
            repeat: Infinity, 
            delay: i * 0.5,
            ease: "linear"
          }}
          style={{ position: 'absolute', top: '50%', left: `${30 + i * 30}%` }}
        >
          <Zap size={24} color="#a855f7" />
        </motion.div>
      ))}
    </div>
  );

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ background: 'var(--bg-dark)' }}>
      <ArchHero 
        title="Serverless"
        subtitle="Architecture"
        description="Sunucu yönetimini bulut sağlayıcısına bırakın. Kodunuz sadece bir olay tetiklendiğinde uyansın, işini yapsın ve tekrar uyusun."
        badge="FaaS / BaaS"
        color="#a855f7"
        illustration={illu}
        features={[
          { icon: <DollarSign />, title: 'Pay-per-use', desc: 'Sadece kodunuz çalıştığı milisaniyeler için ödeme yapın.' },
          { icon: <Activity />, title: 'Auto Scaling', desc: 'İstek sayısı sıfırdan milyonlara çıksa da bulut bunu yönetir.' },
          { icon: <Clock />, title: 'Zero Ops', desc: 'İşletim sistemi, güvenlik yamaları veya sunucu bakımıyla uğraşmayın.' }
        ]}
      />
      
      <div className="container" style={{ padding: '4rem 0' }}>
        {/* Karşılaştırma */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem' }}>
          <div>
            <h3>Klasik Sunucu (EC2 / VPS)</h3>
            <div className="glass-card" style={{ padding: '2rem', borderLeft: '4px solid #ef4444', marginTop: '1.5rem' }}>
              <ul style={{ color: 'var(--text-secondary)', lineHeight: 2, paddingLeft: '1.2rem' }}>
                <li>Sunucu sürekli açıktır (7/24 fatura).</li>
                <li>Yük artınca manuel ölçekleme gerekir.</li>
                <li>İşletim sistemi güncellemeleri size aittir.</li>
                <li>Kapasite boş kalsa da para ödersiniz.</li>
              </ul>
            </div>
          </div>
          <div>
            <h3>Serverless (Lambda / FaaS)</h3>
            <div className="glass-card" style={{ padding: '2rem', borderLeft: '4px solid #10b981', marginTop: '1.5rem' }}>
              <ul style={{ color: 'var(--text-secondary)', lineHeight: 2, paddingLeft: '1.2rem' }}>
                <li>Sadece kod çalıştığında ödeme yapılır.</li>
                <li>Hızlı devreye alma (Deployment) imkanı sağlar.</li>
                <li>Altyapı tamamen bulut sağlayıcıdadır.</li>
                <li>Sıfır bakım maliyeti ve sonsuz esneklik.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ServerlessPage;
