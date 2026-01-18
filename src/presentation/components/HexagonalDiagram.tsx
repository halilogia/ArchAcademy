import React from 'react';
import { motion } from 'framer-motion';
import { LogIn, LogOut, Cpu, Database, Globe, Smartphone } from 'lucide-react';

const HexagonalDiagram = () => {
  return (
    <section style={{ padding: '100px 0', background: 'rgba(2, 6, 23, 0.5)' }}>
      <div className="container" style={{ textAlign: 'center' }}>
        <h2 className="section-title">Ports & Adapters Mantığı</h2>
        
        <div style={{ 
          position: 'relative', 
          height: '600px', 
          marginTop: '4rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          {/* Core App */}
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            style={{
              width: '300px',
              height: '300px',
              background: 'rgba(16, 185, 129, 0.15)',
              border: '3px solid #10b981',
              clipPath: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 10,
              boxShadow: '0 0 50px rgba(16, 185, 129, 0.2)'
            }}
          >
            <Cpu size={48} color="#10b981" />
            <span style={{ fontWeight: 800, marginTop: '1rem', color: 'white' }}>DOMAIN / APP</span>
            <span style={{ fontSize: '0.7rem', opacity: 0.7 }}>Business Logic</span>
          </motion.div>

          {/* Lines and Connections */}
          <svg style={{ position: 'absolute', width: '100%', height: '100%', pointerEvents: 'none' }}>
            <line x1="50%" y1="50%" x2="20%" y2="20%" stroke="#10b981" strokeWidth="2" strokeDasharray="5,5" />
            <line x1="50%" y1="50%" x2="80%" y2="20%" stroke="#10b981" strokeWidth="2" strokeDasharray="5,5" />
            <line x1="50%" y1="50%" x2="20%" y2="80%" stroke="#10b981" strokeWidth="2" strokeDasharray="5,5" />
            <line x1="50%" y1="50%" x2="80%" y2="80%" stroke="#10b981" strokeWidth="2" strokeDasharray="5,5" />
          </svg>

          {/* Inbound Adapters (Drivers) */}
          <div style={{ position: 'absolute', top: '10%', left: '10%', textAlign: 'center' }}>
            <div className="glass-card" style={{ padding: '1.5rem', borderColor: '#3b82f6' }}>
              <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', marginBottom: '1rem' }}>
                <Globe size={24} color="#3b82f6" />
                <Smartphone size={24} color="#3b82f6" />
              </div>
              <h4 style={{ color: '#3b82f6' }}>Inbound Adapters</h4>
              <p style={{ fontSize: '0.8rem', opacity: 0.7 }}>REST API, CLI, UI</p>
              <div style={{ marginTop: '1rem', color: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.3rem' }}>
                <LogIn size={14} /> Inbound Port
              </div>
            </div>
          </div>

          {/* Outbound Adapters (Driven) */}
          <div style={{ position: 'absolute', bottom: '10%', right: '10%', textAlign: 'center' }}>
             <div className="glass-card" style={{ padding: '1.5rem', borderColor: '#f59e0b' }}>
              <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', marginBottom: '1rem' }}>
                <Database size={24} color="#f59e0b" />
              </div>
              <h4 style={{ color: '#f59e0b' }}>Outbound Adapters</h4>
              <p style={{ fontSize: '0.8rem', opacity: 0.7 }}>MySQL, MongoDB, Email Service</p>
              <div style={{ marginTop: '1rem', color: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.3rem' }}>
                <LogOut size={14} /> Outbound Port
              </div>
            </div>
          </div>

          <div style={{ position: 'absolute', bottom: '20%', left: '30%', maxWidth: '250px' }}>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', background: 'rgba(0,0,0,0.5)', padding: '1rem', borderRadius: '12px' }}>
              <strong>Port:</strong> Bir arayüz (Interface). Uygulamanın ne beklediğini söyler. <br />
              <strong>Adapter:</strong> Gerçek araç. Portun istediği işi somut olarak yapar.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HexagonalDiagram;
