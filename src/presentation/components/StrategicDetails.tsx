import React from 'react';
import { motion } from 'framer-motion';
import { Share2, MessageSquare, Compass, Shield } from 'lucide-react';

const StrategicDetails = () => {
  const concepts = [
    {
      icon: <MessageSquare size={32} color="#a78bfa" />,
      title: 'Ubiquitous Language',
      desc: 'Herkesin (yazılımcı, patron, müşteri) aynı terimleri kullanmasıdır. Eğer müşteri "Siparişi Onayla" diyorsa, kodda "updateOrderState(2)" değil, "order.confirm()" yazılmalıdır.'
    },
    {
      icon: <Compass size={32} color="#a78bfa" />,
      title: 'Bounded Context',
      desc: 'Sistemin sınırlarını çizer. Bir Online Alışveriş uygulamasında "Katalog", "Sepet" ve "Kargo" farklı bağlamlardır. Her bağlamın kendi kuralları ve modelleri vardır.'
    },
    {
      icon: <Share2 size={32} color="#a78bfa" />,
      title: 'Context Mapping',
      desc: 'Farklı bağlamların birbiriyle nasıl konuştuğunu belirler (Upstream/Downstream, Customer/Supplier). Verinin bir bağlamdan diğerine nasıl aktığını yönetir.'
    }
  ];

  return (
    <section style={{ padding: '80px 0', borderTop: '1px solid var(--glass-border)' }}>
      <div className="container">
        <h2 className="section-title">Stratejik DDD: Büyük Resmi Görmek</h2>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2.5rem' }}>
          {concepts.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
              className="glass-card"
              style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', position: 'relative' }}
            >
              <div style={{ 
                width: '64px', 
                height: '64px', 
                borderRadius: '16px', 
                background: 'rgba(167, 139, 250, 0.1)', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center' 
              }}>
                {item.icon}
              </div>
              <h3 style={{ fontSize: '1.4rem', color: 'white' }}>{item.title}</h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>{item.desc}</p>
              
              <div style={{ 
                marginTop: 'auto', 
                paddingTop: '1.5rem', 
                borderTop: '1px solid var(--glass-border)',
                fontSize: '0.85rem',
                color: '#a78bfa',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                <Shield size={14} /> Detayları Gör
              </div>
            </motion.div>
          ))}
        </div>

        {/* Visual Metaphor */}
        <div className="glass-card" style={{ 
          marginTop: '5rem', 
          padding: '4rem', 
          textAlign: 'center',
          background: 'radial-gradient(circle at top right, rgba(167, 139, 250, 0.1), transparent)'
        }}>
          <h3 style={{ marginBottom: '2rem' }}>Bounded Context Kavramı</h3>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '3rem', flexWrap: 'wrap' }}>
            <div style={{ width: '200px', height: '200px', borderRadius: '50%', border: '2px dashed #a78bfa', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
              <span style={{ fontWeight: 700 }}>SATIŞ BAĞLAMI</span>
              <span style={{ fontSize: '0.8rem', opacity: 0.6 }}>Ürün = Fiyat + Stok</span>
            </div>
            <motion.div animate={{ x: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 2 }}>
              <Share2 color="var(--primary)" size={32} />
            </motion.div>
            <div style={{ width: '200px', height: '200px', borderRadius: '50%', border: '2px dashed #10b981', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
              <span style={{ fontWeight: 700 }}>KARGO BAĞLAMI</span>
              <span style={{ fontSize: '0.8rem', opacity: 0.6 }}>Ürün = Ağırlık + Boyut</span>
            </div>
          </div>
          <p style={{ marginTop: '3rem', color: 'var(--text-secondary)', maxWidth: '600px', margin: '3rem auto 0' }}>
            DDD der ki: Aynı "Ürün" nesnesini her yerde kullanmaya çalışmayın. Her bağlamın ihtiyacı olan modeli ayrı ayrı oluşturun. 
            Bu sayede modelleriniz şişmez ve tertemiz kalır.
          </p>
        </div>
      </div>
    </section>
  );
};

export default StrategicDetails;
