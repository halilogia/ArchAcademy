import React from 'react';
import { motion } from 'framer-motion';
import { Database, Send, Search, RefreshCw, Layers } from 'lucide-react';

const CQRSDiagram = () => {
  return (
    <section style={{ padding: '100px 0', background: 'rgba(2, 6, 23, 0.5)' }}>
      <div className="container">
        <h2 className="section-title">CQRS Akış Diyagramı</h2>
        
        <div style={{
          position: 'relative',
          height: '600px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '4rem'
        }}>
          {/* Top Layer: Client */}
          <div className="glass-card" style={{ padding: '1rem 3rem', zIndex: 10 }}>
            <h4 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Layers size={18} /> Presentation Layer (UI)
            </h4>
          </div>

          <div style={{ display: 'flex', gap: '10rem', alignItems: 'flex-start', position: 'relative' }}>
            {/* Command Side */}
            <motion.div
              initial={{ x: -100, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem' }}
            >
              <div className="glass-card" style={{ padding: '1.5rem', borderColor: '#f59e0b', width: '200px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', color: '#f59e0b' }}>
                  <Send size={18} /> <strong>Command Bus</strong>
                </div>
                <p style={{ fontSize: '0.75rem', opacity: 0.7 }}>State değiştirir (Create, Update, Delete)</p>
              </div>
              <div style={{ width: '2px', height: '40px', background: '#f59e0b' }} />
              <div className="glass-card" style={{ padding: '1rem', background: 'rgba(245, 158, 11, 0.1)', width: '150px' }}>
                <Database size={32} color="#f59e0b" style={{ marginBottom: '1rem' }} />
                <h5 style={{ fontSize: '0.8rem' }}>Write Database</h5>
                <span style={{ fontSize: '0.6rem', opacity: 0.6 }}>(Relational/Event Store)</span>
              </div>
            </motion.div>

            {/* Sync Logic */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
               <motion.div 
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 10, ease: 'linear' }}
                style={{ color: 'var(--text-secondary)', opacity: 0.3 }}
               >
                 <RefreshCw size={48} />
               </motion.div>
               <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', marginTop: '1rem' }}>Data Sync / Projections</span>
            </div>

            {/* Query Side */}
            <motion.div
              initial={{ x: 100, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem' }}
            >
              <div className="glass-card" style={{ padding: '1.5rem', borderColor: '#3b82f6', width: '200px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', color: '#3b82f6' }}>
                  <Search size={18} /> <strong>Query Bus</strong>
                </div>
                <p style={{ fontSize: '0.75rem', opacity: 0.7 }}>Sadece veri okur (GET)</p>
              </div>
              <div style={{ width: '2px', height: '40px', background: '#3b82f6' }} />
              <div className="glass-card" style={{ padding: '1rem', background: 'rgba(59, 130, 246, 0.1)', width: '150px' }}>
                <Database size={32} color="#3b82f6" style={{ marginBottom: '1rem' }} />
                <h5 style={{ fontSize: '0.8rem' }}>Read Database</h5>
                <span style={{ fontSize: '0.6rem', opacity: 0.6 }}>(Flat files/Cache/NoSQL)</span>
              </div>
            </motion.div>
          </div>

          {/* Connectors to UI */}
          <svg style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0 }}>
             <path d="M 50% 200 L 35% 260" stroke="#f59e0b" strokeWidth="2" fill="none" strokeDasharray="5,5" />
             <path d="M 50% 200 L 65% 260" stroke="#3b82f6" strokeWidth="2" fill="none" strokeDasharray="5,5" />
          </svg>
        </div>

        <div className="glass-card" style={{ marginTop: '4rem', background: 'rgba(234, 179, 8, 0.05)' }}>
           <h4 style={{ marginBottom: '1rem', color: '#eab308' }}>Asenkron vs Senkron Veri Güncelleme</h4>
           <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', maxWidth: '800px', margin: '0 auto' }}>
             Yazma veritabanına gelen her değişiklikten sonra, okuma veritabanı (Read Model) güncellenir. 
             Bu işlem anlık (Senkron) olabileceği gibi, yüksek trafikli sistemlerde <strong>Eventual Consistency</strong> (Nihai Tutarlılık) 
             prensibiyle asenkron olarak da yapılabilir.
           </p>
        </div>
      </div>
    </section>
  );
};

export default CQRSDiagram;
