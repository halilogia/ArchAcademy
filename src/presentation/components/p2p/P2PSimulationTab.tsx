import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileDown, FileUp, XCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const P2PSimulationTab: React.FC = () => {
  const { i18n } = useTranslation();
  const isEn = (i18n.resolvedLanguage || i18n.language || 'tr').startsWith('en');

  const [nodes, setNodes] = useState(
    Array.from({ length: 6 }).map((_, i) => ({
      id: i,
      x: 50 + 35 * Math.cos((i * 60 * Math.PI) / 180),
      y: 50 + 35 * Math.sin((i * 60 * Math.PI) / 180),
      hasFile: i === 0, // Initial seeder
      isOnline: true
    }))
  );
  const [packets, setPackets] = useState<{ from: number; to: number; id: number }[]>([]);

  const toggleNode = (id: number) => {
    setNodes(prev => prev.map(n => n.id === id ? { ...n, isOnline: !n.isOnline } : n));
  };

  const broadcastFile = () => {
    const seeders = nodes.filter(n => n.hasFile && n.isOnline);
    const leechers = nodes.filter(n => !n.hasFile && n.isOnline);

    if (seeders.length === 0 || leechers.length === 0) return;

    const newPackets: { from: number; to: number; id: number }[] = [];
    leechers.forEach(leecher => {
      const randomSeeder = seeders[Math.floor(Math.random() * seeders.length)];
      if (randomSeeder) {
        newPackets.push({ from: randomSeeder.id, to: leecher.id, id: Date.now() + Math.random() });
      }
    });

    setPackets(prev => [...prev, ...newPackets]);

    setTimeout(() => {
      setNodes(prev => prev.map(n => 
        leechers.find(l => l.id === n.id) ? { ...n, hasFile: true } : n
      ));
      setPackets([]);
    }, 1500);
  };

  const resetSimulation = () => {
    setNodes(prev => prev.map((n, i) => ({ ...n, hasFile: i === 0, isOnline: true })));
    setPackets([]);
  };

  const isAllSeededOrOffline = nodes.every(n => n.hasFile || !n.isOnline);

  return (
    <motion.div
      key="simulation"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
          <button 
            onClick={broadcastFile}
            disabled={isAllSeededOrOffline}
            className="btn-bounce"
            style={{ 
              padding: '12px 30px', 
              fontSize: '1rem', 
              fontWeight: 800, 
              borderRadius: '12px', 
              border: 'none', 
              background: '#10b981', 
              color: 'black',
              cursor: isAllSeededOrOffline ? 'not-allowed' : 'pointer',
              boxShadow: '0 10px 30px rgba(16, 185, 129, 0.3)',
              display: 'inline-flex', 
              alignItems: 'center',
              gap: '8px',
              opacity: isAllSeededOrOffline ? 0.5 : 1
            }}
          >
            <FileUp size={18} /> {isEn ? "Broadcast File (Seed)" : "Dosyayı Yay (Seed)"}
          </button>
          <button 
            onClick={resetSimulation}
            style={{ 
              padding: '12px 20px', 
              fontSize: '1rem', 
              fontWeight: 700, 
              borderRadius: '12px', 
              border: '1px solid rgba(255,255,255,0.1)', 
              background: 'rgba(255,255,255,0.05)', 
              color: 'white',
              cursor: 'pointer'
            }}
          >
            {isEn ? "Reset" : "Sıfırla"}
          </button>
        </div>
        <p style={{ marginTop: '1rem', color: 'var(--text-secondary)' }}>
          {isEn 
            ? "Click any node to toggle its Online/Offline status. Offline peers cannot transmit or receive packets." 
            : "Düğümlere tıklayarak onları Online/Offline yapabilirsiniz. Offline düğümler veri alamaz."
          }
        </p>
      </div>

      <div style={{ position: 'relative', width: '100%', height: '500px', background: 'rgba(0,0,0,0.2)', borderRadius: '30px', overflow: 'hidden' }}>
        {/* Simulation Stats */}
        <div style={{ position: 'absolute', top: 20, left: 20, padding: '15px', background: 'rgba(0,0,0,0.5)', borderRadius: '12px', backdropFilter: 'blur(5px)', zIndex: 20 }}>
          <div style={{ display: 'flex', gap: '15px', fontSize: '0.9rem' }}>
            <div style={{ color: '#10b981', fontWeight: 700 }}>Seeders: {nodes.filter(n => n.hasFile && n.isOnline).length}</div>
            <div style={{ color: '#3b82f6', fontWeight: 700 }}>Leechers: {nodes.filter(n => !n.hasFile && n.isOnline).length}</div>
            <div style={{ color: '#ef4444', fontWeight: 700 }}>Offline: {nodes.filter(n => !n.isOnline).length}</div>
          </div>
        </div>

        <svg width="100%" height="100%" style={{ position: 'absolute', top: 0, left: 0, overflow: 'visible' }}>
          {/* Connections */}
          {nodes.map((node, i) => 
            nodes.slice(i + 1).map(target => (
              <line 
                key={`link-${node.id}-${target.id}`}
                x1={`${node.x}%`} y1={`${node.y}%`}
                x2={`${target.x}%`} y2={`${target.y}%`}
                stroke={node.hasFile && target.hasFile ? "#10b981" : "#334155"}
                strokeWidth={node.hasFile && target.hasFile ? 2 : 1}
                strokeOpacity={0.3}
              />
            ))
          )}

          {/* Packets */}
          <AnimatePresence>
            {packets.map(p => {
              const source = nodes.find(n => n.id === p.from);
              const target = nodes.find(n => n.id === p.to);
              if (!source || !target) return null;

              return (
                <motion.circle
                  key={p.id}
                  r={6}
                  fill="#10b981"
                  initial={{ cx: `${source.x}%`, cy: `${source.y}%` }}
                  animate={{ cx: `${target.x}%`, cy: `${target.y}%` }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1.5, ease: "linear" }}
                />
              );
            })}
          </AnimatePresence>
        </svg>

        {/* Network Nodes */}
        {nodes.map(node => (
          <motion.div
            key={node.id}
            onClick={() => toggleNode(node.id)}
            animate={{ 
              scale: node.isOnline ? 1 : 0.8,
              opacity: node.isOnline ? 1 : 0.5
            }}
            style={{
              position: 'absolute',
              left: `${node.x}%`,
              top: `${node.y}%`,
              width: '50px',
              height: '50px',
              marginLeft: '-25px',
              marginTop: '-25px',
              borderRadius: '50%',
              background: node.hasFile ? 'rgba(16, 185, 129, 0.2)' : 'rgba(59, 130, 246, 0.1)',
              border: `2px solid ${!node.isOnline ? '#ef4444' : node.hasFile ? '#10b981' : '#3b82f6'}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              zIndex: 10,
              boxShadow: node.hasFile && node.isOnline ? '0 0 20px rgba(16, 185, 129, 0.4)' : 'none'
            }}
          >
            {node.isOnline ? (
              node.hasFile ? <FileDown size={20} color="#10b981" /> : <FileUp size={20} color="#3b82f6" />
            ) : (
              <XCircle size={20} color="#ef4444" />
            )}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default P2PSimulationTab;
