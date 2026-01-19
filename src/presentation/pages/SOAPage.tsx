import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Layers, Database, Code, ShieldCheck, Share2, ArrowRightCircle, Box, Repeat, FastForward, Settings } from 'lucide-react';

const SOAPage = () => {
  const [activeFlow, setActiveFlow] = useState<number | null>(null);

  const services = [
    { id: 1, name: 'Sipariş Servisi', color: '#3b82f6', icon: <Box size={20} /> },
    { id: 2, name: 'Ödeme Servisi', color: '#6366f1', icon: <Database size={20} /> },
    { id: 3, name: 'Stok Servisi', color: '#8b5cf6', icon: <Settings size={20} /> },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{ background: 'var(--bg-dark)', minHeight: '100vh', paddingTop: '100px' }}
    >
      <div className="container">
        {/* Premium Hero */}
        <section style={{ textAlign: 'center', marginBottom: '80px', position: 'relative' }}>
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <span style={{ 
              background: 'rgba(59, 130, 246, 0.1)', 
              color: '#3b82f6', 
              padding: '0.6rem 2rem', 
              borderRadius: '100px', 
              fontSize: '0.9rem', 
              fontWeight: 800,
              letterSpacing: '3px',
              border: '1px solid rgba(59, 130, 246, 0.2)'
            }}>
              ENTERPRISE INTEGRATION
            </span>
            <h1 style={{ fontSize: '5rem', margin: '2rem 0', fontWeight: 950, letterSpacing: '-2px' }}>
              SOA <span style={{ color: '#3b82f6' }}>Strategy</span>
            </h1>
            <p style={{ fontSize: '1.4rem', color: 'var(--text-secondary)', maxWidth: '900px', margin: '0 auto', lineHeight: 1.6 }}>
               Kurumsal çeviklik için servislerin gücü. Uygulamaları birbirinden bağımsızlaştıran ve "Enterprise Bus" üzerinden haberleştiren devasa ekosistem.
            </p>
          </motion.div>
        </section>

        {/* The "Mük" ESB Diagram */}
        <section style={{ marginBottom: '120px' }}>
          <div className="glass-card" style={{ 
            padding: '5rem', 
            borderRadius: '40px', 
            background: 'rgba(255,255,255,0.01)',
            border: '1px solid rgba(59, 130, 246, 0.1)',
            textAlign: 'center'
          }}>
            <h2 style={{ marginBottom: '4rem', fontWeight: 800 }}>Enterprise Service Bus (ESB) Haberleşme Akışı</h2>
            
            <div style={{ position: 'relative' }}>
              {/* TOP SERVICES */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '4rem', marginBottom: '6rem' }}>
                {services.map(service => (
                  <motion.div
                    key={service.id}
                    onHoverStart={() => setActiveFlow(service.id)}
                    onHoverEnd={() => setActiveFlow(null)}
                    whileHover={{ scale: 1.05, y: -5 }}
                    style={{
                      padding: '2.5rem',
                      borderRadius: '24px',
                      background: 'var(--glass-bg)',
                      border: activeFlow === service.id ? `2px solid ${service.color}` : '1px solid var(--glass-border)',
                      cursor: 'pointer',
                      zIndex: 10,
                      transition: 'all 0.3s'
                    }}
                  >
                     <div style={{ color: service.color, marginBottom: '1.5rem', display: 'flex', justifyContent: 'center' }}>
                       {service.icon}
                     </div>
                     <h4 style={{ margin: 0, fontWeight: 700 }}>{service.name}</h4>
                  </motion.div>
                ))}
              </div>

              {/* THE BUS (Animated) */}
              <div style={{ position: 'relative', height: '120px', zIndex: 5 }}>
                 <motion.div
                   animate={{ 
                     background: [
                       'linear-gradient(90deg, #1e293b 0%, #3b82f622 50%, #1e293b 100%)',
                       'linear-gradient(90deg, #3b82f622 0%, #1e293b 50%, #3b82f622 100%)'
                     ],
                     borderColor: activeFlow ? '#3b82f6' : 'rgba(59, 130, 246, 0.3)'
                   }}
                   transition={{ duration: 2, repeat: Infinity }}
                   style={{
                     width: '100%',
                     height: '100%',
                     borderRadius: '20px',
                     border: '3px solid',
                     display: 'flex',
                     alignItems: 'center',
                     justifyContent: 'center',
                     gap: '2rem'
                   }}
                 >
                   <Share2 size={32} color="#3b82f6" />
                   <span style={{ fontWeight: 900, color: '#3b82f6', letterSpacing: '8px', fontSize: '1.5rem' }}>ENTERPRISE SERVICE BUS</span>
                   <motion.div animate={{ x: [0, 100, 0] }} transition={{ duration: 3, repeat: Infinity }}>
                      <FastForward size={32} color="#3b82f6" opacity={0.3} />
                   </motion.div>
                 </motion.div>

                 {/* Flow Lines */}
                 <svg width="100%" height="200" style={{ position: 'absolute', top: '-110%', left: 0, zIndex: -1, pointerEvents: 'none' }}>
                    <motion.line x1="16%" y1="0" x2="16%" y2="100%" stroke="#3b82f6" strokeWidth="2" strokeDasharray="5,5" animate={{ opacity: activeFlow === 1 ? 1 : 0.1 }} />
                    <motion.line x1="50%" y1="0" x2="50%" y2="100%" stroke="#3b82f6" strokeWidth="2" strokeDasharray="5,5" animate={{ opacity: activeFlow === 2 ? 1 : 0.1 }} />
                    <motion.line x1="84%" y1="0" x2="84%" y2="100%" stroke="#3b82f6" strokeWidth="2" strokeDasharray="5,5" animate={{ opacity: activeFlow === 3 ? 1 : 0.1 }} />
                 </svg>
              </div>

              {/* BOTTOM: CONSUMERS / LEGACY */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', marginTop: '6rem' }}>
                <div className="glass-card" style={{ padding: '2rem', textAlign: 'left', borderLeft: '4px solid #3b82f6' }}>
                   <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '1rem' }}>
                      <Repeat color="#3b82f6" />
                      <h4 style={{ margin: 0 }}>Message Adapter</h4>
                   </div>
                   <p style={{ fontSize: '0.8rem', opacity: 0.6 }}>Legacy sistemleri BUS a bağlayan tercüman katmanı.</p>
                </div>
                <div className="glass-card" style={{ padding: '2rem', textAlign: 'left', borderLeft: '4px solid #3b82f6' }}>
                   <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '1rem' }}>
                      <ShieldCheck color="#3b82f6" />
                      <h4 style={{ margin: 0 }}>Security Gateway</h4>
                   </div>
                   <p style={{ fontSize: '0.8rem', opacity: 0.6 }}>Tüm servisler için tek noktadan kimlik doğrulama.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Strategic Cards */}
        <section style={{ paddingBottom: '120px' }}>
           <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem' }}>
              {[
                { title: 'Bağımsızlık', desc: 'Her servis kendi teknolojisiyle (Java, .NET, Go) yazılabilir.', icon: <Layers /> },
                { title: 'Çeviklik', desc: 'Mevcut servisleri bozmadan yeni servisler eklenebilir.', icon: <ArrowRightCircle /> },
                { title: 'Merkezi Yönetim', desc: 'Hata takibi ve loglama tek merkezden (ESB) yapılır.', icon: <Code /> },
                { title: 'Yönetişim', desc: 'Kurumsal veri modelleri tüm kurumda standartlaşır.', icon: <Settings /> },
              ].map((card, i) => (
                <motion.div 
                  key={i}
                  whileHover={{ scale: 1.02 }}
                  className="glass-card" 
                  style={{ padding: '2rem' }}
                >
                  <div style={{ color: '#3b82f6', marginBottom: '1rem' }}>{card.icon}</div>
                  <h4 style={{ marginBottom: '1rem' }}>{card.title}</h4>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{card.desc}</p>
                </motion.div>
              ))}
           </div>
        </section>
      </div>
    </motion.div>
  );
};

export default SOAPage;
