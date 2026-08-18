import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Compass, Home, Search, ArrowLeft } from 'lucide-react';

const NotFoundPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        minHeight: '85vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
        background: 'radial-gradient(circle at center, rgba(59, 130, 246, 0.05) 0%, transparent 70%)'
      }}
    >
      <div className="container" style={{ textAlign: 'center', maxWidth: '800px' }}>
        <motion.div
          initial={{ scale: 0.8, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="glass-card"
          style={{
            padding: '5rem 3rem',
            border: '2px solid rgba(255, 255, 255, 0.05)',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          {/* Background Decorative Element */}
          <div style={{
            position: 'absolute',
            top: '-50px',
            right: '-50px',
            width: '200px',
            height: '200px',
            background: 'var(--primary)',
            filter: 'blur(100px)',
            opacity: 0.1,
            zIndex: -1
          }} />

          {/* Icon and Title */}
          <div style={{ 
            width: '100px', 
            height: '100px', 
            background: 'rgba(59, 130, 246, 0.1)', 
            borderRadius: '30px', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            color: 'var(--primary)',
            margin: '0 auto 2.5rem',
            boxShadow: '0 0 40px rgba(59, 130, 246, 0.2)'
          }}>
            <Compass size={50} className="glow-anim" />
          </div>

          <h1 className="gradient-text" style={{ 
            fontSize: '6rem', 
            fontWeight: 950, 
            lineHeight: 1, 
            marginBottom: '1.5rem',
            letterSpacing: '-4px'
          }}>
            404
          </h1>
          
          <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '1.5rem', color: 'white' }}>
            You've Lost Your Architectural Path.
          </h2>
          
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', lineHeight: 1.8, marginBottom: '3.5rem' }}>
            The layer or component you were looking for was not found in our system.
            Perhaps you're searching for a "Future Architecture" we haven't built yet?
          </p>

          <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center' }}>
            <Link to="/" style={{ textDecoration: 'none' }}>
              <button style={{
                background: 'var(--primary)',
                color: 'white',
                padding: '1.25rem 2.5rem',
                borderRadius: '18px',
                fontWeight: 800,
                fontSize: '1rem',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                transition: 'all 0.3s'
              }}>
                <Home size={18} /> BACK TO HOME
              </button>
            </Link>
            
            <button 
              onClick={() => window.history.back()}
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                color: 'white',
                padding: '1.25rem 2.5rem',
                borderRadius: '18px',
                fontWeight: 800,
                fontSize: '1rem',
                border: '1px solid var(--glass-border)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                transition: 'all 0.3s'
              }}
            >
              <ArrowLeft size={18} /> GO BACK
            </button>
          </div>
          
          <div style={{ marginTop: '3rem', paddingTop: '2rem', borderTop: '1px solid rgba(255, 255, 255, 0.05)' }}>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
              <Search size={14} /> Tip: Use the <strong>Ctrl+K</strong> shortcut to quickly navigate between architecture pages.
            </p>
          </div>
        </motion.div>
      </div>

      <style>{`
        .glow-anim {
          animation: compass-spin 8s linear infinite;
        }
        @keyframes compass-spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </motion.div>
  );
};

export default NotFoundPage;