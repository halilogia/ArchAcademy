import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, Zap, Settings, Puzzle, CheckCircle2, Terminal } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export interface Plugin {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  status: 'available' | 'installing' | 'installed' | 'running';
  effect: string;
}

interface MicrokernelSimulationTabProps {
  plugins: Plugin[];
  setPlugins: React.Dispatch<React.SetStateAction<Plugin[]>>;
  onCorePing?: () => void;
}

export const MicrokernelSimulationTab: React.FC<MicrokernelSimulationTabProps> = ({
  plugins,
  setPlugins,
  onCorePing
}) => {
  const { i18n } = useTranslation();
  const isEn = (i18n.resolvedLanguage || i18n.language || 'tr').startsWith('en');

  const [systemLogs, setSystemLogs] = useState<string[]>([
    isEn ? 'System initialized...' : 'Sistem başlatıldı...',
    isEn ? 'Core kernel stable.' : 'Çekirdek sistem kararlı.'
  ]);

  const log = (msg: string) => {
    setSystemLogs(prev => [...prev.slice(-4), `[Core]: ${msg}`]);
  };

  const updatePluginStatus = (id: string, status: Plugin['status']) => {
    setPlugins(prev => prev.map(p => p.id === id ? { ...p, status } : p));
  };

  const startPlugin = (id: string) => {
    const plugin = plugins.find(p => p.id === id);
    if (!plugin) return;

    updatePluginStatus(id, 'running');
    log(isEn ? `Starting ${plugin.name}...` : `${plugin.name} başlatılıyor...`);
    if (onCorePing) onCorePing();
  };

  const installPlugin = (id: string) => {
    const plugin = plugins.find(p => p.id === id);
    if (!plugin || plugin.status !== 'available') return;

    updatePluginStatus(id, 'installing');
    log(isEn ? `Installing ${plugin.name}...` : `${plugin.name} yükleniyor...`);

    setTimeout(() => {
      updatePluginStatus(id, 'installed');
      log(isEn ? `${plugin.name} installed successfully.` : `${plugin.name} başarıyla yüklendi.`);
      startPlugin(id);
    }, 1500);
  };

  return (
    <motion.div
      key="simulation"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '30px' }}>
        {/* Plugin Marketplace */}
        <div>
          <h3 style={{ marginBottom: '20px', color: '#fff', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Puzzle color="#10b981" /> {isEn ? "Plugin Marketplace" : "Eklenti Pazaryeri"}
          </h3>
          <div style={{ display: 'grid', gap: '15px' }}>
            {plugins.map(p => (
              <div 
                key={p.id} 
                className="glass-card" 
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'space-between', 
                  padding: '15px 20px', 
                  borderLeft: p.status === 'running' ? '4px solid #10b981' : '1px solid rgba(255,255,255,0.1)' 
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                  <div style={{ padding: '10px', background: '#1e293b', borderRadius: '8px', color: '#10b981' }}>
                    {p.icon}
                  </div>
                  <div>
                    <h4 style={{ margin: 0, color: 'white' }}>{p.name}</h4>
                    <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>{p.description}</div>
                  </div>
                </div>
                
                <button 
                  onClick={() => installPlugin(p.id)}
                  disabled={p.status !== 'available'}
                  style={{ 
                    padding: '8px 16px', 
                    borderRadius: '8px', 
                    border: 'none', 
                    background: p.status === 'running' ? '#10b981' : (p.status === 'installing' ? '#334155' : '#fff'), 
                    color: p.status === 'running' ? 'black' : (p.status === 'available' ? 'black' : 'white'),
                    cursor: p.status === 'available' ? 'pointer' : 'default',
                    fontWeight: 800,
                    fontSize: '0.8rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '5px'
                  }}
                >
                  {p.status === 'available' && (isEn ? 'Install' : 'Yükle')}
                  {p.status === 'installing' && (isEn ? 'Installing...' : 'Yükleniyor...')}
                  {p.status === 'installed' && (isEn ? 'Installed' : 'Yüklendi')}
                  {p.status === 'running' && <><CheckCircle2 size={14}/> {isEn ? 'Active' : 'Aktif'}</>}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Kernel Terminal */}
        <div className="glass-card" style={{ background: '#020617', padding: '0', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
          <div style={{ padding: '10px 15px', background: '#334155', display: 'flex', alignItems: 'center', gap: '10px', borderBottom: '1px solid #475569' }}>
            <Terminal size={14} color="#fff" />
            <span style={{ fontSize: '0.8rem', color: '#fff', fontWeight: 800 }}>Kernel Logs</span>
          </div>
          <div style={{ padding: '15px', fontFamily: 'monospace', fontSize: '0.8rem', color: '#10b981', minHeight: '300px' }}>
            {systemLogs.map((item, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, x: -10 }} 
                animate={{ opacity: 1, x: 0 }} 
                style={{ marginBottom: '5px', display: 'flex', gap: '10px' }}
              >
                <span style={{ color: '#475569' }}>{new Date().toLocaleTimeString().split(' ')[0]}</span>
                <span>{item}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default MicrokernelSimulationTab;
