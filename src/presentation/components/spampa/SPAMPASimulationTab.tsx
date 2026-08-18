import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RefreshCw, Globe } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const SPAMPASimulationTab: React.FC = () => {
  const { i18n } = useTranslation();
  const isEn = (i18n.resolvedLanguage || i18n.language || 'tr').startsWith('en');

  const [currentUrl, setCurrentUrl] = useState('/home');
  const [isLoading, setIsLoading] = useState(false);
  const [simMode, setSimMode] = useState<'SPA' | 'MPA'>('SPA');

  const navigateSim = (path: string) => {
    if (currentUrl === path) return;
    
    if (simMode === 'MPA') {
      setIsLoading(true);
      setTimeout(() => {
        setCurrentUrl(path);
        setIsLoading(false);
      }, 800);
    } else {
      setCurrentUrl(path); 
    }
  };

  return (
    <motion.div
      key="simulation"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <div style={{ background: 'rgba(255,255,255,0.05)', display: 'inline-flex', padding: '5px', borderRadius: '12px', marginBottom: '2rem' }}>
          <button 
            onClick={() => setSimMode('SPA')} 
            style={{ 
              padding: '10px 30px', 
              borderRadius: '8px', 
              border: 'none', 
              background: simMode === 'SPA' ? '#3b82f6' : 'transparent', 
              color: 'white', 
              cursor: 'pointer', 
              fontWeight: 700 
            }}
          >
            SPA Mode
          </button>
          <button 
            onClick={() => setSimMode('MPA')} 
            style={{ 
              padding: '10px 30px', 
              borderRadius: '8px', 
              border: 'none', 
              background: simMode === 'MPA' ? '#10b981' : 'transparent', 
              color: 'white', 
              cursor: 'pointer', 
              fontWeight: 700 
            }}
          >
            MPA Mode
          </button>
        </div>

        <div style={{ 
          width: '100%', maxWidth: '700px', height: '400px', margin: '0 auto', 
          background: '#fff', borderRadius: '12px', overflow: 'hidden', 
          display: 'flex', flexDirection: 'column', position: 'relative',
          boxShadow: '0 20px 50px rgba(0,0,0,0.5)'
        }}>
          {/* Browser Window Header */}
          <div style={{ background: '#e2e8f0', padding: '10px', display: 'flex', gap: '10px', alignItems: 'center' }}>
            <div style={{ display: 'flex', gap: '5px' }}>
              <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ef4444' }}></div>
              <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#f59e0b' }}></div>
              <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#10b981' }}></div>
            </div>
            <div style={{ flex: 1, background: 'white', borderRadius: '4px', padding: '5px 10px', fontSize: '0.8rem', color: '#64748b', display: 'flex', alignItems: 'center' }}>
              {isLoading ? <RefreshCw size={12} className="spin" style={{ marginRight: '5px' }} /> : <Globe size={12} style={{ marginRight: '5px' }} />}
              example.com{currentUrl}
            </div>
          </div>

          {/* Viewport Content */}
          <div style={{ flex: 1, background: '#f1f5f9', position: 'relative', overflow: 'hidden' }}>
            <AnimatePresence mode="popLayout">
              {!isLoading ? (
                <motion.div 
                  key={currentUrl}
                  initial={simMode === 'SPA' ? { x: 50, opacity: 0 } : { opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={simMode === 'SPA' ? { x: -50, opacity: 0 } : { opacity: 1 }}
                  transition={{ duration: simMode === 'SPA' ? 0.3 : 0 }}
                  style={{ height: '100%', padding: '2rem', display: 'flex', flexDirection: 'column', gap: '20px' }}
                >
                  <h1 style={{ color: '#1e293b', fontSize: '2rem', margin: 0 }}>
                    {currentUrl === '/home' ? (isEn ? 'Home Page' : 'Ana Sayfa') : 
                     currentUrl === '/about' ? (isEn ? 'About Us' : 'Hakkımızda') : 
                     (isEn ? 'Contact Page' : 'İletişim')}
                  </h1>
                  <div style={{ width: '100%', height: '150px', background: currentUrl === '/home' ? '#3b82f6' : currentUrl === '/about' ? '#ec4899' : '#8b5cf6', borderRadius: '12px', opacity: 0.2 }}></div>
                  <p style={{ color: '#64748b' }}>
                    {currentUrl === '/home' ? (isEn ? 'Welcome to our blazing fast application.' : 'Hızlı ve modern web uygulamamıza hoş geldiniz.') : 
                     currentUrl === '/about' ? (isEn ? 'We are a team of passionate software architects.' : 'Yazılım mimarisine tutkulu bir ekibiz.') : 
                     (isEn ? 'Get in touch with us anytime for enterprise consulting!' : 'Bizimle dilediğiniz zaman iletişime geçin!')}
                  </p>
                </motion.div>
              ) : (
                /* White Flash simulation for MPA */
                <div style={{ width: '100%', height: '100%', background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <div style={{ color: '#94a3b8', fontWeight: 600 }}>{isEn ? "Requesting HTML from Server..." : "Sunucudan HTML bekleniyor..."}</div>
                </div>
              )}
            </AnimatePresence>
          </div>

          {/* Navigation Links */}
          <div style={{ padding: '15px', background: 'white', borderTop: '1px solid #e2e8f0', display: 'flex', justifyContent: 'center', gap: '20px' }}>
            {['/home', '/about', '/contact'].map(path => (
              <button 
                key={path}
                onClick={() => navigateSim(path)}
                style={{ 
                  border: 'none', background: 'transparent', 
                  color: currentUrl === path ? '#3b82f6' : '#64748b', 
                  fontWeight: 700, cursor: 'pointer',
                  borderBottom: currentUrl === path ? '2px solid #3b82f6' : 'none'
                }}
              >
                {path.replace('/', '').toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default SPAMPASimulationTab;
