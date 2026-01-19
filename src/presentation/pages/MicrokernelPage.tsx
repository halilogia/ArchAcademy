import React from 'react';
import { motion } from 'framer-motion';
import { Cpu, Box, Zap, Settings, Shield, PlusCircle } from 'lucide-react';

const MicrokernelPage = () => {
  const plugins = [
    { title: 'Auth Plugin', desc: 'Sistem güvenliğini ve kimlik doğrulamayı sağlar.', icon: <Shield size={20} /> },
    { title: 'Payment Gateway', desc: 'Farklı ödeme yöntemlerini sisteme entegre eder.', icon: <Zap size={20} /> },
    { title: 'Analytics Engine', desc: 'Veri analizi ve raporlama yeteneği katar.', icon: <Cpu size={20} /> },
    { title: 'Custom Themes', desc: 'Görünümü özelleştiren görsel eklenti.', icon: <Settings size={20} /> },
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
              background: 'rgba(59, 130, 246, 0.1)', 
              color: 'var(--primary)', 
              padding: '0.5rem 1.5rem', 
              borderRadius: '100px', 
              fontSize: '0.9rem', 
              fontWeight: 700,
              border: '1px solid rgba(59, 130, 246, 0.2)'
            }}>
              PLUG-IN ARCHITECTURE
            </span>
            <h1 style={{ fontSize: '4rem', margin: '1.5rem 0', fontWeight: 900 }}>
              Microkernel <span className="text-primary">Mimari</span>
            </h1>
            <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', maxWidth: '800px', margin: '0 auto', lineHeight: 1.6 }}>
              Sistemin değişmez ana çekirdeği ile sürekli gelişen eklentilerini birbirinden ayıran, modern yazılımların esneklik sırrı.
            </p>
          </motion.div>
        </section>

        {/* Core vs Plugin Concept */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', marginBottom: '100px', alignItems: 'center' }}>
          <div className="glass-card" style={{ padding: '3rem', border: '2px solid var(--primary)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
              <div style={{ background: 'var(--primary)', padding: '12px', borderRadius: '12px' }}>
                <Box color="white" size={24} />
              </div>
              <h3 style={{ margin: 0 }}>Core System (Çekirdek)</h3>
            </div>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8 }}>
              Sistemin yaşaması için gereken minimum mantık. Veritabanı bağlantıları, temel veri akışları ve eklenti yönetim mekanizması burada bulunur. Çekirdek asla eklentilere bağımlı değildir.
            </p>
            <ul style={{ color: 'var(--text-secondary)', marginTop: '1rem', listStyle: 'none', padding: 0 }}>
              <li style={{ marginBottom: '0.5rem' }}>✅ Minimum Karmaşıklık</li>
              <li style={{ marginBottom: '0.5rem' }}>✅ Yüksek İstikrar</li>
              <li>✅ Merkezi Kontrol</li>
            </ul>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
            {plugins.map((plugin, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -5 }}
                className="glass-card" 
                style={{ padding: '1.5rem', background: 'rgba(255,255,255,0.02)' }}
              >
                <div style={{ color: 'var(--primary)', marginBottom: '1rem' }}>{plugin.icon}</div>
                <h4 style={{ marginBottom: '0.5rem' }}>{plugin.title}</h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: 0 }}>{plugin.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Interactive Example */}
        <section style={{ marginBottom: '100px' }}>
          <div className="glass-card" style={{ padding: '3rem', textAlign: 'center' }}>
            <h2>Nasıl Çalışır?</h2>
            <div style={{ 
              display: 'flex', 
              justifyContent: 'center', 
              alignItems: 'center', 
              gap: '2rem', 
              marginTop: '3rem',
              position: 'relative'
            }}>
              <div style={{ 
                width: '180px', 
                height: '180px', 
                borderRadius: '50%', 
                border: '4px dashed var(--primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'rgba(59, 130, 246, 0.05)',
                zIndex: 2
              }}>
                <span style={{ fontWeight: 800 }}>CORE</span>
              </div>

              {[0, 1, 2, 3].map(i => (
                <motion.div
                  key={i}
                  animate={{ 
                    rotate: 360,
                  }}
                  transition={{ 
                    duration: 20, 
                    repeat: Infinity, 
                    ease: "linear" 
                  }}
                  style={{
                    position: 'absolute',
                    width: '300px',
                    height: '2px',
                    background: 'transparent',
                    transform: `rotate(${i * 90}deg)`
                  }}
                >
                  <div style={{
                    position: 'absolute',
                    right: -20,
                    top: -20,
                    width: '40px',
                    height: '40px',
                    borderRadius: '8px',
                    background: 'var(--glass-bg)',
                    border: '1px solid var(--glass-border)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                    <PlusCircle size={20} color="var(--primary)" />
                  </div>
                </motion.div>
              ))}
            </div>
            <p style={{ marginTop: '4rem', color: 'var(--text-secondary)', maxWidth: '600px', margin: '4rem auto 0' }}>
              Eklentiler çekirdeğe belirli standartlar (interfaces) üzerinden bağlanırlar. Çekirdek koda dokunmadan yetenek ekleyip çıkarmak mümkündür.
            </p>
          </div>
        </section>

        {/* Real World Examples */}
        <section style={{ paddingBottom: '100px' }}>
          <h2 style={{ textAlign: 'center', marginBottom: '3rem' }}>Gerçek Dünya Örnekleri</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem' }}>
            <div className="glass-card" style={{ textAlign: 'center', padding: '2rem' }}>
              <h3 style={{ color: 'var(--primary)' }}>VS Code</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Temel editör özellikleri çekirdektedir. Python, Git veya Temalar eklenti olarak sonradan yüklenir.</p>
            </div>
            <div className="glass-card" style={{ textAlign: 'center', padding: '2rem' }}>
              <h3 style={{ color: 'var(--primary)' }}>Operating Systems</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Linux veya Windows kernel temeli oluşturur. Driver'lar ve uygulama servisleri eklenti mantığıyla çalışır.</p>
            </div>
            <div className="glass-card" style={{ textAlign: 'center', padding: '2rem' }}>
              <h3 style={{ color: 'var(--primary)' }}>Chrome</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Tarayıcı çekirdeği sayfayı işler; uzantılar (extensions) ise yeni özellikler katar.</p>
            </div>
          </div>
        </section>
      </div>
    </motion.div>
  );
};

export default MicrokernelPage;
