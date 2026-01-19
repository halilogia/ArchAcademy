import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Database, Layout, Shield, Cpu } from 'lucide-react';

const ProjectDependency = () => {
  return (
    <section style={{ padding: '100px 0', background: 'rgba(2, 6, 23, 0.3)' }}>
      <div className="container" style={{ textAlign: 'center' }}>
        <h2 className="section-title">Bağımlılık Akışı & Veri Trafiği</h2>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '4rem', maxWidth: '800px', margin: '0 auto 4rem' }}>
          Clean Architecture'da bağımlılıklar her zaman içeriye doğrudur. Presentation katmanı asla veritabanını bilmez; sadece Context üzerinden Domain kurallarını tetikler.
        </p>

        <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3rem' }}>
          
          {/* Presentation Layer */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="glass-card"
            style={{ width: '550px', borderColor: 'var(--primary)', background: 'rgba(59, 130, 246, 0.05)', padding: '2rem' }}
          >
            <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
               <Layout size={40} color="var(--primary)" />
               <div style={{ textAlign: 'left' }}>
                  <h4 style={{ color: 'var(--primary)', fontSize: '1.2rem', marginBottom: '0.3rem' }}>Presentation Layer (UI/UX)</h4>
                  <p style={{ fontSize: '0.85rem', opacity: 0.7, lineHeight: 1.4 }}>React Components, Pages ve Framer Motion. Kullanıcıdan gelen "İletişimi" karşılayan katmandır.</p>
               </div>
            </div>
          </motion.div>

          <ArrowDown size={32} color="var(--primary)" style={{ opacity: 0.3 }} />

          {/* Context Layer */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="glass-card"
            style={{ width: '600px', borderColor: '#f59e0b', background: 'rgba(245, 158, 11, 0.05)', padding: '2rem', borderStyle: 'dashed' }}
          >
            <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
               <Cpu size={40} color="#f59e0b" />
               <div style={{ textAlign: 'left' }}>
                  <h4 style={{ color: '#f59e0b', fontSize: '1.2rem', marginBottom: '0.3rem' }}>Context: Progress Hub (State)</h4>
                  <p style={{ fontSize: '0.85rem', opacity: 0.7, lineHeight: 1.4 }}>Uygulamanın durumu burada saklanır. Presentation katmanının Domain kurallarıyla konuşmasını sağlayan aracı (Proxy) rolündedir.</p>
               </div>
            </div>
          </motion.div>

          <ArrowDown size={32} color="#10b981" style={{ opacity: 0.3 }} />

          {/* Domain Layer */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="glass-card"
            style={{ width: '550px', borderColor: '#10b981', background: 'rgba(16, 185, 129, 0.05)', padding: '2rem' }}
          >
            <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
               <Shield size={40} color="#10b981" />
               <div style={{ textAlign: 'left' }}>
                  <h4 style={{ color: '#10b981', fontSize: '1.2rem', marginBottom: '0.3rem' }}>Domain Layer (The Core)</h4>
                  <p style={{ fontSize: '0.85rem', opacity: 0.7, lineHeight: 1.4 }}>
                    Use Cases ve İş Kuralları. Burası teknoloji bağımsızdır. Bu klasörü alıp bir React Native (Mobil) projesine veya Node.js sunucusuna koysanız bile mantık aynen çalışır.
                  </p>
               </div>
            </div>
          </motion.div>
          
          <ArrowDown size={32} color="#a855f7" style={{ opacity: 0.3 }} />

          {/* Infrastructure Layer (Bottom Foundation) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="glass-card"
            style={{ width: '550px', borderColor: '#a855f7', background: 'rgba(168, 85, 247, 0.05)', padding: '2rem' }}
          >
            <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
               <Database size={40} color="#a855f7" />
               <div style={{ textAlign: 'left' }}>
                  <h4 style={{ color: '#a855f7', fontSize: '1.2rem', marginBottom: '0.3rem' }}>Infrastructure Layer (Data & Tools)</h4>
                  <p style={{ fontSize: '0.85rem', opacity: 0.7, lineHeight: 1.4 }}>
                    Repository implementasyonları ve LocalStorage adaptörleri. Domain katmanındaki 'interface'leri doldurur. 
                    UI buraya doğrudan erişmez, Domain üzerinden veri alır.
                  </p>
               </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default ProjectDependency;
