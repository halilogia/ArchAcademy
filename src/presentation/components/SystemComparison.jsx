import React from 'react';
import { motion } from 'framer-motion';
import { Check, X, Shield, Zap, Box, Share2, Activity, HardDrive } from 'lucide-react';

const SystemComparison = () => {
  const comparison = [
    {
      feature: 'Dağıtım (Deployment)',
      monolith: 'Tek parça (Single Unit). Tüm uygulama tek seferde canlıya alınır.',
      micro: 'Bağımsız (Independent). Her servis kendi başına deploy edilebilir.',
      icon: <HardDrive size={18} />
    },
    {
      feature: 'Ölçeklenebilirlik (Scaling)',
      monolith: 'Dikey (Vertical). Tüm uygulamayı kopyalayarak ölçeklenir (Yavaş).',
      micro: 'Yatay (Horizontal). Sadece darboğaz yapan servis ölçeklenir (Verimli).',
      icon: <Zap size={18} />
    },
    {
      feature: 'Hata İzolasyonu (Fault Tolerance)',
      monolith: 'Zayıf. Bir hata tüm sistemi çökertebilir.',
      micro: 'Güçlü. Bir servis çöksede diğerleri çalışmaya devam eder.',
      icon: <Shield size={18} />
    },
    {
      feature: 'Teknoloji Yığını (Tech Stack)',
      monolith: 'Homojen. Genellikle tek dil ve tek framework mecburidir.',
      micro: 'Heterojen (Polyglot). Her servis ihtiyaca göre farklı dille yazılabilir.',
      icon: <Activity size={18} />
    },
    {
      feature: 'Karmaşıklık (Complexity)',
      monolith: 'Düşük. Başlangıçta kodu yönetmek ve debug etmek çok kolaydır.',
      micro: 'Yüksek. Ağ gecikmeleri, veri tutarlılığı ve monitoring zorlaşır.',
      icon: <Share2 size={18} />
    }
  ];

  return (
    <section style={{ padding: '100px 0', background: 'rgba(2, 6, 23, 0.5)' }}>
      <div className="container">
        <h2 className="section-title">Derinlemesine Karşılaştırma</h2>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(200px, 1fr) 2fr 2fr', gap: '1.5rem', marginBottom: '4rem' }}>
          {/* Header */}
          <div />
          <div className="glass-card" style={{ textAlign: 'center', background: 'rgba(59, 130, 246, 0.1)', borderColor: 'var(--primary)' }}>
             <h3 style={{ color: 'var(--primary)' }}>MONOLITH</h3>
          </div>
          <div className="glass-card" style={{ textAlign: 'center', background: 'rgba(244, 63, 94, 0.1)', borderColor: '#f43f5e' }}>
             <h3 style={{ color: '#f43f5e' }}>MICROSERVICES</h3>
          </div>

          {/* Rows */}
          {comparison.map((item, i) => (
            <React.Fragment key={i}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontWeight: 700, fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                {item.icon} {item.feature}
              </div>
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="glass-card"
                style={{ fontSize: '0.9rem', lineHeight: 1.6 }}
              >
                {item.monolith}
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 10 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="glass-card"
                style={{ fontSize: '0.9rem', lineHeight: 1.6 }}
              >
                {item.micro}
              </motion.div>
            </React.Fragment>
          ))}
        </div>

        {/* The Tradeoff Message */}
        <div style={{ 
          background: 'rgba(255, 255, 255, 0.02)', 
          padding: '3rem', 
          borderRadius: '32px', 
          textAlign: 'center',
          border: '1px solid var(--glass-border)'
        }}>
           <h4 style={{ marginBottom: '1rem', fontSize: '1.5rem' }}>Önemli Not: "Microservices bir bedeldir."</h4>
           <p style={{ maxWidth: '800px', margin: '0 auto', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
             Birçok geliştirici Microservices'i bir "iyileştirme" olarak görür, ancak o bir "takas"tır (trade-off). 
             Yazılım geliştirme hızından ve operasyonel basitlikten feragat ederek, karşılığında ölçeklenebilirlik 
             ve organizasyonel esneklik satın alırsınız. Küçük ekipler için her zaman Monolith daha mantıklıdır.
           </p>
        </div>
      </div>
    </section>
  );
};

export default SystemComparison;
