import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Cloud, CloudRain, Wind, MousePointer2, Clock, DollarSign, Activity } from 'lucide-react';

const ServerlessPage = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [invocations, setInvocations] = useState(0);

  const stats = [
    { label: 'Yönetim', value: 'Sıfır Sunucu', icon: <Cloud size={20} /> },
    { label: 'Ölçeklenme', value: 'Sınırsız / Otomatik', icon: <Activity size={20} /> },
    { label: 'Maliyet', value: 'Sadece Çalışınca', icon: <DollarSign size={20} /> },
    { label: 'Hız', value: 'Milisaniyeler', icon: <Clock size={20} /> },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{ background: 'var(--bg-dark)', minHeight: '100vh', paddingTop: '100px' }}
    >
      <div className="container">
        {/* Hero Section */}
        <section style={{ textAlign: 'center', marginBottom: '80px' }}>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <span style={{ 
              background: 'rgba(168, 85, 247, 0.1)', 
              color: '#a855f7', 
              padding: '0.5rem 1.5rem', 
              borderRadius: '100px', 
              fontSize: '0.9rem', 
              fontWeight: 700,
              border: '1px solid rgba(168, 85, 247, 0.2)'
            }}>
              FUNCTION AS A SERVICE
            </span>
            <h1 style={{ fontSize: '4rem', margin: '1.5rem 0', fontWeight: 900 }}>
              Serverless <span style={{ color: '#a855f7' }}>Mimarisi</span>
            </h1>
            <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', maxWidth: '800px', margin: '0 auto', lineHeight: 1.6 }}>
              Sunucu yönetimini bulut sağlayıcısına bırakın. Kodunuz sadece bir "olay" tetiklendiğinde uyansın, işini yapsın ve tekrar uyusun.
            </p>
          </motion.div>
        </section>

        {/* Value Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem', marginBottom: '100px' }}>
          {stats.map((stat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 + 0.5 }}
              className="glass-card" 
              style={{ padding: '2rem', textAlign: 'center' }}
            >
              <div style={{ color: '#a855f7', marginBottom: '1rem', display: 'flex', justifyContent: 'center' }}>{stat.icon}</div>
              <div style={{ fontSize: '0.8rem', opacity: 0.5, textTransform: 'uppercase', marginBottom: '0.5rem' }}>{stat.label}</div>
              <div style={{ fontWeight: 800, fontSize: '1.1rem' }}>{stat.value}</div>
            </motion.div>
          ))}
        </div>

        {/* Simülasyon Alanı */}
        <section style={{ marginBottom: '100px' }}>
          <div className="glass-card" style={{ padding: '3rem', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'relative', zIndex: 2 }}>
              <h2 style={{ marginBottom: '1rem' }}>Sanal Sunucu Simülasyonu</h2>
              <p style={{ color: 'var(--text-secondary)' }}>Aşağıdaki butona basarak bir "Event" tetikleyin. Fonksiyonun nasıl ayağa kalktığını izleyin.</p>
              
              <div style={{ display: 'flex', justifyContent: 'center', gap: '4rem', marginTop: '4rem', alignItems: 'center' }}>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setInvocations(p => p + 1)}
                  style={{
                    background: '#a855f7',
                    border: 'none',
                    padding: '1.5rem 3rem',
                    borderRadius: '15px',
                    color: 'white',
                    fontWeight: 800,
                    cursor: 'pointer',
                    fontSize: '1.2rem',
                    boxShadow: '0 10px 30px rgba(168, 85, 247, 0.4)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem'
                  }}
                >
                  <Zap size={24} /> EVENT TETİKLE
                </motion.button>

                <div style={{ textAlign: 'left', minWidth: '200px' }}>
                  <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Status:</div>
                  <div style={{ fontSize: '1.5rem', fontWeight: 800, color: invocations > 0 ? '#10b981' : 'var(--text-secondary)' }}>
                    {invocations > 0 ? 'RUNNING / BILLING' : 'IDLE / $0'}
                  </div>
                  <div style={{ fontSize: '0.8rem', opacity: 0.5, marginTop: '0.5rem' }}>
                    Toplam Çağrı: {invocations}
                  </div>
                </div>
              </div>
            </div>

            {/* Arka Plan Dekorasyon */}
            <div style={{ position: 'absolute', top: '10%', right: '5%', opacity: 0.05 }}>
              <Cloud size={200} />
            </div>
          </div>
        </section>

        {/* Karşılaştırma */}
        <section style={{ paddingBottom: '100px' }}>
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
              <h3>Serverless (Lambda / Cloud Functions)</h3>
              <div className="glass-card" style={{ padding: '2rem', borderLeft: '4px solid #10b981', marginTop: '1.5rem' }}>
                <ul style={{ color: 'var(--text-secondary)', lineHeight: 2, paddingLeft: '1.2rem' }}>
                  <li>Sadece kod çalıştığında ödeme yapılır.</li>
                  <li>Aynı anda 1000 istek gelirse 1000 fonksiyon açılır.</li>
                  <li>Altyapı tamamen bulut sağlayıcıdadır.</li>
                  <li>Hızlı devreye alma (Deployment) imkanı sağlar.</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </div>
    </motion.div>
  );
};

export default ServerlessPage;
