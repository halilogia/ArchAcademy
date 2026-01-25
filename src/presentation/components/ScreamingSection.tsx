import React from 'react';
import { motion } from 'framer-motion';
import { Volume2, FolderTree, ArrowRight, Eye } from 'lucide-react';

const ScreamingSection = () => {
  return (
    <section style={{ padding: '100px 0', background: 'var(--bg-darker)', position: 'relative', overflow: 'hidden' }}>
      {/* Decorative background element */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        width: '600px',
        height: '600px',
        background: 'radial-gradient(circle, rgba(59, 130, 246, 0.05) 0%, transparent 70%)',
        transform: 'translate(-50%, -50%)',
        zIndex: 0
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>
          {/* Comparison Side */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              className="glass-card"
              style={{ padding: '2rem', borderLeft: '4px solid #94a3b8', opacity: 0.6 }}
            >
              <h4 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <FolderTree size={20} /> Sessiz Mimari (Silent)
              </h4>
              <pre style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', background: 'rgba(0,0,0,0.3)', padding: '1.5rem', borderRadius: '10px' }}>
{`/src
  /controllers
  /models
  /views
  /services`}
              </pre>
              <p style={{ marginTop: '1rem', fontSize: '0.85rem' }}>
                "Bu proje ne yapıyor?" → "Bilmiyorum, ama galiba Express kullanıyor."
              </p>
            </motion.div>

            <motion.div
              initial={{ x: -30, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              style={{ display: 'flex', justifyContent: 'center' }}
            >
              <ArrowRight size={40} color="var(--primary)" />
            </motion.div>

            <motion.div
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="glass-card"
              style={{ 
                padding: '2rem', 
                borderLeft: '4px solid var(--primary)',
                background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, transparent 100%)'
              }}
            >
              <h4 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--primary)' }}>
                <Volume2 size={20} /> Çığlık Atan Mimari (Screaming)
              </h4>
              <pre style={{ fontSize: '0.9rem', color: 'white', background: 'rgba(0,0,0,0.3)', padding: '1.5rem', borderRadius: '10px' }}>
{`/src
  /orders
  /shipping
  /catalog
  /billing`}
              </pre>
              <p style={{ marginTop: '1rem', fontSize: '0.85rem' }}>
                "Bu proje ne yapıyor?" → "BU BİR SİPARİŞ SİSTEMİ!"
              </p>
            </motion.div>
          </div>

          {/* Explanation Side */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              style={{ display: 'flex', gap: '1.5rem' }}
            >
              <div style={{ 
                flexShrink: 0, 
                width: '60px', 
                height: '60px', 
                borderRadius: '15px', 
                background: 'rgba(59, 130, 246, 0.1)', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                color: 'var(--primary)'
              }}>
                <Eye size={30} />
              </div>
              <div>
                <h3 style={{ marginBottom: '0.5rem', fontSize: '1.4rem' }}>Görsel Okunabilirlik</h3>
                <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                  Koda ilk kez bakan bir geliştirici, teknik altyapı yerine iş kurallarının hiyerarşisini görür. Bu, bilişsel yükü (cognitive load) azaltır.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              style={{ display: 'flex', gap: '1.5rem' }}
            >
              <div style={{ 
                flexShrink: 0, 
                width: '60px', 
                height: '60px', 
                borderRadius: '15px', 
                background: 'rgba(16, 185, 129, 0.1)', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                color: '#10b981'
              }}>
                <Volume2 size={30} />
              </div>
              <div>
                <h3 style={{ marginBottom: '0.5rem', fontSize: '1.4rem' }}>Framework Ertelenmesi</h3>
                <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                  Hangi veritabanı veya web kütüphanesini kullanacağınız mimarinin en son kararı olmalıdır. Mimari, bu detayların "dışında" durur.
                </p>
              </div>
            </motion.div>

            <div style={{ 
              marginTop: '1rem', 
              padding: '2rem', 
              background: 'rgba(59, 130, 246, 0.05)', 
              borderRadius: '20px', 
              border: '1px solid rgba(59, 130, 246, 0.1)' 
            }}>
              <p style={{ fontSize: '1.1rem', fontStyle: 'italic', fontWeight: 500 }}>
                "Blueprint lere baktığınızda kütüphane mi kilise mi olduğunu anlarsınız. Kodunuza baktığınızda da ne olduğunu anlamalısınız." 
                <br/>— Robert C. Martin
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ScreamingSection;
