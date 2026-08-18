import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Puzzle } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export interface Extension {
  id: string;
  name: string;
  description: string;
  type: 'ui' | 'logic';
  active: boolean;
}

export interface PluginSimulationTabProps {
  extensions: Extension[];
  logs: string[];
  onToggleExtension: (id: string) => void;
  onAppClick: (actionName: string) => void;
}

export const PluginSimulationTab: React.FC<PluginSimulationTabProps> = ({
  extensions,
  logs,
  onToggleExtension,
  onAppClick
}) => {
  const { i18n } = useTranslation();
  const isEn = (i18n.resolvedLanguage || i18n.language || 'tr').startsWith('en');

  const isDarkModeActive = extensions.find(e => e.id === 'dark-mode')?.active;
  const isBannerActive = extensions.find(e => e.id === 'banner')?.active;
  const isLoggerActive = extensions.find(e => e.id === 'logger')?.active;

  return (
    <motion.div
      key="simulation"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '30px', alignItems: 'start' }}>
        {/* Sidebar: Extension Manager */}
        <div className="glass-card" style={{ padding: '0' }}>
          <div style={{ padding: '15px', borderBottom: '1px solid rgba(255,255,255,0.1)', background: 'rgba(167, 139, 250, 0.1)' }}>
            <h4 style={{ margin: 0, color: '#a78bfa', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Puzzle size={18} /> {isEn ? "Installed Extensions" : "Installed Extensions"}
            </h4>
          </div>
          <div style={{ padding: '10px' }}>
            {extensions.map(ext => (
              <div 
                key={ext.id} 
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'space-between', 
                  padding: '10px', 
                  marginBottom: '5px', 
                  borderRadius: '8px', 
                  background: ext.active ? 'rgba(167, 139, 250, 0.2)' : 'transparent', 
                  border: ext.active ? '1px solid #a78bfa' : '1px solid transparent' 
                }}
              >
                <div>
                  <div style={{ fontWeight: 700, color: 'white', fontSize: '0.9rem' }}>{ext.name}</div>
                  <div style={{ fontSize: '0.7rem', color: '#94a3b8' }}>{ext.description}</div>
                </div>
                <div 
                  onClick={() => onToggleExtension(ext.id)}
                  style={{ 
                    width: '40px', height: '22px', 
                    background: ext.active ? '#a78bfa' : '#334155', 
                    borderRadius: '11px', 
                    position: 'relative', 
                    cursor: 'pointer',
                    transition: 'background 0.3s'
                  }}
                >
                  <div style={{ 
                    width: '18px', height: '18px', 
                    background: 'white', 
                    borderRadius: '50%', 
                    position: 'absolute', 
                    top: '2px', 
                    left: ext.active ? '20px' : '2px', 
                    transition: 'left 0.3s' 
                  }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Main App Host Area */}
        <div className="glass-card" style={{ 
          minHeight: '400px', 
          background: isDarkModeActive ? '#000' : '#fff',
          color: isDarkModeActive ? '#fff' : '#000',
          transition: 'background 0.5s, color 0.5s',
          position: 'relative',
          overflow: 'hidden'
        }}>
          {/* Hook Injection: Banner */}
          <AnimatePresence>
            {isBannerActive && (
              <motion.div 
                initial={{ height: 0 }} 
                animate={{ height: 'auto' }} 
                exit={{ height: 0 }} 
                style={{ background: '#a78bfa', padding: '10px', textAlign: 'center', fontWeight: 'bold', color: 'white', overflow: 'hidden' }}
              >
                🎉 {isEn ? "HOLIDAY PROMO SALE! (Injected by Banner Plugin)" : "HOLIDAY SALE! (Injected by Promo Plugin)"}
              </motion.div>
            )}
          </AnimatePresence>

          <div style={{ padding: '2rem' }}>
            <h2 style={{ marginBottom: '1rem' }}>{isEn ? "Host Core Application" : "My Application"}</h2>
            <p style={{ lineHeight: '1.6', opacity: 0.8 }}>
              {isEn 
                ? "This is the immutable host application canvas. Active plugins intercept lifecycle hooks to re-skin the UI and observe user events." 
                : "Burası ana uygulamanın içeriği. Eklentiler (Plugins) buradaki görünümü ve davranışları değiştirebilir."
              }
            </p>

            <div style={{ marginTop: '2rem', display: 'flex', gap: '10px' }}>
              <button 
                onClick={() => onAppClick('primary-action')}
                className="btn-bounce"
                style={{ 
                  padding: '10px 20px', 
                  background: isDarkModeActive ? '#333' : '#e2e8f0', 
                  color: 'inherit',
                  border: 'none', 
                  borderRadius: '8px', 
                  fontWeight: 'bold',
                  cursor: 'pointer' 
                }}
              >
                {isEn ? "Trigger Core Action" : "Click Me"}
              </button>
            </div>

            {/* Log Output Hook: Logger */}
            {isLoggerActive && (
              <div style={{ marginTop: '20px', padding: '10px', background: 'rgba(0,0,0,0.8)', color: '#10b981', fontFamily: 'monospace', fontSize: '0.8rem', borderRadius: '8px' }}>
                <div>--- {isEn ? "Event Logger Plugin Intercept Stream" : "Event Logger Plugin Output"} ---</div>
                {logs.map((L, i) => <div key={i}>{L}</div>)}
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default PluginSimulationTab;
