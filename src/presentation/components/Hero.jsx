import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Shield, Zap, Box } from 'lucide-react';

const Hero = () => {
  return (
    <section style={{
      padding: '160px 0 100px',
      overflow: 'hidden',
      position: 'relative'
    }}>
      {/* Background Glow */}
      <div style={{
        position: 'absolute',
        top: '10%',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '600px',
        height: '600px',
        background: 'radial-gradient(circle, var(--primary-glow) 0%, transparent 70%)',
        zIndex: -1,
        opacity: 0.3
      }} />

      <div className="container" style={{ 
        display: 'grid', 
        gridTemplateColumns: '1.2fr 0.8fr', 
        gap: '4rem', 
        alignItems: 'center' 
      }}>
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'left' }}
        >
          <span style={{
            background: 'var(--glass)',
            padding: '8px 16px',
            borderRadius: '100px',
            fontSize: '0.85rem',
            fontWeight: 600,
            color: 'var(--primary)',
            border: '1px solid var(--glass-border)',
            marginBottom: '2rem',
            display: 'inline-block'
          }}>
            Yazılım Mimarisinde Ustalık
          </span>
          
          <h1 className="gradient-text" style={{
            fontSize: '4rem',
            lineHeight: 1.1,
            fontWeight: 800,
            marginBottom: '1.5rem',
            letterSpacing: '-2px'
          }}>
            Clean Architecture <br /> Nedir, Nasıl Kullanılır?
          </h1>
          
          <p style={{
            color: 'var(--text-secondary)',
            fontSize: '1.2rem',
            maxWidth: '600px',
            marginBottom: '3rem',
            lineHeight: 1.6
          }}>
            Bağımsız, test edilebilir ve sürdürülebilir yazılımlar inşa etmek için 
            Robert C. Martin'in (Uncle Bob) geliştirdiği katmanlı mimariyi keşfedin.
          </p>

          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <button style={{
              background: 'var(--primary)',
              color: 'white',
              padding: '1rem 2rem',
              borderRadius: '16px',
              fontWeight: 600,
              fontSize: '1.1rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              boxShadow: '0 8px 24px var(--primary-glow)'
            }}>
              Hemen Başla <ArrowRight size={20} />
            </button>
            <button style={{
              background: 'var(--glass)',
              color: 'white',
              padding: '1rem 2rem',
              borderRadius: '16px',
              fontWeight: 600,
              fontSize: '1.1rem',
              border: '1px solid var(--glass-border)'
            }}>
              Örneklere Bak
            </button>
          </div>
        </motion.div>

        {/* Hero Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          style={{ position: 'relative' }}
        >
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '120%',
            height: '120%',
            background: 'radial-gradient(circle, var(--primary-glow) 0%, transparent 70%)',
            zIndex: -1,
            opacity: 0.5
          }} />
          <img 
            src="/hero-bg.png" 
            alt="Clean Architecture Diagram" 
            style={{ 
              width: '100%', 
              borderRadius: '30px',
              boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
              border: '1px solid var(--glass-border)'
            }} 
          />
        </motion.div>
      </div>

      <div className="container">
        {/* Floating Features */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '2rem',
          marginTop: '6rem'
        }}>
          {[
            { icon: <Shield color="var(--primary)" />, title: 'Test Edilebilirlik', desc: 'İş kurallarını UI veya DB olmadan test edin.' },
            { icon: <Zap color="var(--primary)" />, title: 'Bağımsızlık', desc: 'Framework ve kütüphanelere bağımlı kalmayın.' },
            { icon: <Box color="var(--primary)" />, title: 'Sürdürülebilirlik', desc: 'Yıllarca eskimeyen, temiz kod tabanları.' }
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + (i * 0.1), duration: 0.6 }}
              className="glass-card"
              style={{ textAlign: 'left' }}
            >
              <div style={{ marginBottom: '1rem' }}>{item.icon}</div>
              <h3 style={{ marginBottom: '0.5rem', fontSize: '1.2rem' }}>{item.title}</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
