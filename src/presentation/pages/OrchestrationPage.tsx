import React from 'react';
import { motion } from 'framer-motion';
import ArchHero from '../components/ArchHero';
import { Target, GitMerge, Cpu, Zap } from 'lucide-react';

const OrchestrationPage = () => {
  const illu = (
    <div style={{ position: 'relative', width: '300px', height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {/* Central Background Pulse */}
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
        <motion.div
          animate={{ scale: [1, 2, 1], opacity: [0.1, 0.3, 0.1] }}
          transition={{ repeat: Infinity, duration: 3 }}
          style={{ width: '120px', height: '120px', background: 'radial-gradient(circle, #fb923c 0%, transparent 70%)', borderRadius: '50%' }}
        />
      </div>

      {/* Orbiting Services */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
        style={{ position: 'relative', width: '220px', height: '220px', border: '1px dashed rgba(251, 146, 60, 0.3)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        {[0, 1, 2, 3].map((i) => (
          <motion.div
            key={i}
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              width: '44px',
              height: '44px',
              marginLeft: '-22px', // half of width
              marginTop: '-22px', // half of height
              background: 'rgba(15, 23, 42, 0.8)',
              border: '1px solid #fb923c',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 15px rgba(251, 146, 60, 0.2)',
              transform: `rotate(${i * 90}deg) translateY(-110px)`
            }}
          >
            {/* Counter-rotate the icon to stay upright */}
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', transform: `rotate(${-i * 90}deg)` }}
            >
              <Cpu size={22} color="#fb923c" />
            </motion.div>
          </motion.div>
        ))}
      </motion.div>

      {/* Center Orchestrator */}
      <div style={{ position: 'absolute', zIndex: 10 }}>
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="glass-card"
          style={{ 
            width: '80px', 
            height: '80px', 
            borderRadius: '24px', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            background: 'linear-gradient(135deg, #f97316 0%, #fb923c 100%)',
            boxShadow: '0 0 30px rgba(249, 115, 22, 0.4)',
            border: 'none'
          }}
        >
          <Target size={40} color="white" />
        </motion.div>
      </div>
    </div>
  );

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <ArchHero 
        title="Orchestration"
        subtitle="Architecture"
        description="Merkezi bir yönetici (orchestrator) tarafından kontrol edilen servis akışları. Süreçlerin tam denetim ve görünürlük altında olduğu, karmaşık iş akışlarını yönetmek için geliştirilmiş yapılar."
        badge="Central Control"
        color="#f97316"
        illustration={illu}
        features={[
          { icon: <Target />, title: 'Visibility', desc: 'İş akışının hangi aşamada olduğunu merkezi olarak görün.' },
          { icon: <GitMerge />, title: 'Error Handling', desc: 'Hataları merkezi bir noktadan yönetin ve telafi edin.' },
          { icon: <Cpu />, title: 'Stateful', desc: 'Sürecin tüm durumunu merkezi olarak saklayın ve izleyin.' },
          { icon: <Zap />, title: 'Predictability', desc: 'Akışın sonucunu ve yolunu önceden kestirmek daha kolaydır.' }
        ]}
      />

      {/* Detailed Deep Dive */}
      <section style={{ padding: '100px 0', borderTop: '1px solid var(--glass-border)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5rem', alignItems: 'start' }}>
            
            {/* Column 1: Core Logic */}
            <div>
              <h2 style={{ fontSize: '2.5rem', marginBottom: '2rem', fontWeight: 900 }}>Merkezi Yönetim Gücü</h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', lineHeight: 1.8, marginBottom: '2rem' }}>
                Orkestrasyon mimarisinde, tüm servislerin ne zaman ve nasıl çalışacağını bilen bir "Beyin" (Orchestrator) vardır. 
                Servisler birbirini tanımaz; sadece yöneticiye "Ben hazırım" veya "İşi bitirdim" derler.
              </p>
              
              <div style={{ background: 'rgba(249, 115, 22, 0.05)', padding: '2rem', borderRadius: '24px', border: '1px solid rgba(249, 115, 22, 0.1)' }}>
                <h4 style={{ color: '#f97316', marginBottom: '1rem', fontWeight: 800 }}>Saga Pattern ile Telafi</h4>
                <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)' }}>
                  Eğer bir serviste hata oluşursa, orkestratör önceki başarılı adımları geri almak için "Compensating Transactions" (Telafi Edici İşlemler) başlatır. 
                  Bu, dağıtık sistemlerde veri tutarlılığını sağlamanın en güvenilir yoludur.
                </p>
              </div>
            </div>

            {/* Column 2: Trade-offs Table */}
            <div className="glass-card" style={{ padding: '3rem' }}>
              <h3 style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <Target color="#f97316" size={24} /> Trade-off Analizi
              </h3>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div>
                  <div style={{ color: '#10b981', fontWeight: 800, fontSize: '0.8rem', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Avantajlar</div>
                  <ul style={{ color: 'var(--text-secondary)', paddingLeft: '1.2rem', fontSize: '0.95rem' }}>
                    <li>Akışın takibi ve dökümantasyonu kolaydır.</li>
                    <li>Noktadan noktaya bağımlılıkları (Spaghetti) önler.</li>
                    <li>Süreç yönetimi tek bir yerde izole edilmiştir (Separation of Concerns).</li>
                  </ul>
                </div>

                <div style={{ height: '1px', background: 'var(--glass-border)' }} />

                <div>
                  <div style={{ color: '#ef4444', fontWeight: 800, fontSize: '0.8rem', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Dezavantajlar</div>
                  <ul style={{ color: 'var(--text-secondary)', paddingLeft: '1.2rem', fontSize: '0.95rem' }}>
                    <li>Yönetici servis "Single Point of Failure" (Tekil Hata Noktası) olabilir.</li>
                    <li>Merkezi mantık zamanla aşırı karmaşıklaşabilir (Fat Orchestrator).</li>
                    <li>Ağ trafiği merkezi servis üzerinde yoğunlaşır.</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Real World Example Section */}
      <section style={{ padding: '80px 0', background: 'rgba(255,255,255,0.01)' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 style={{ fontSize: '2rem', marginBottom: '3rem' }}>Gerçek Dünya Örneği: <span style={{ color: '#f97316' }}>E-Ticaret Checkout</span></h2>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', flexWrap: 'wrap' }}>
            {[
              { step: '1', title: 'Stok Ayır', desc: 'Inventory Service' },
              { step: '2', title: 'Ödeme Al', desc: 'Payment Service' },
              { step: '3', title: 'Kargo Oluştur', desc: 'Shipping Service' },
              { step: '4', title: 'Bildirim Gönder', desc: 'Email Service' }
            ].map((s, i) => (
              <div key={i} style={{ width: '200px', padding: '1.5rem', background: 'var(--glass)', borderRadius: '20px', border: '1px solid var(--glass-border)' }}>
                <div style={{ fontSize: '1.5rem', fontWeight: 900, color: '#f97316', marginBottom: '0.5rem' }}>{s.step}</div>
                <div style={{ fontWeight: 700, marginBottom: '0.25rem' }}>{s.title}</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{s.desc}</div>
              </div>
            ))}
          </div>
          <p style={{ marginTop: '3rem', maxWidth: '700px', margin: '3rem auto 0', color: 'var(--text-secondary)', fontStyle: 'italic' }}>
            "Orkestrator, önce stoku ayırtır, başarılıysa ödemeye geçer. Ödeme başarısız olursa stoku geri bırakması talimatını iletir. Tüm bu orkestra şefliği merkezi bir beyin tarafından yönetilir."
          </p>
        </div>
      </section>
    </motion.div>
  );
};

export default OrchestrationPage;
