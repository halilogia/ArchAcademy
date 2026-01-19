import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Share2, Shield, Zap, Globe, Cpu, Users, Link as LinkIcon, Lock, Activity } from 'lucide-react';
import ArchHero from '../components/ArchHero';

const P2PPage = () => {
  const [activeNode, setActiveNode] = useState<number | null>(null);
  const nodesCount = 10;
  
  const nodes = Array.from({ length: nodesCount }).map((_, i) => {
    const angle = (i * 360) / nodesCount;
    const x = 50 + 35 * Math.cos((angle * Math.PI) / 180);
    const y = 50 + 35 * Math.sin((angle * Math.PI) / 180);
    return { id: i, x, y };
  });

  const illu = (
    <div style={{ position: 'relative', width: '350px', height: '350px' }}>
      <svg viewBox="0 0 400 400" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
        <defs>
          <filter id="p2p-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Connections */}
        {[...Array(6)].map((_, i) => {
          const angle1 = (i * 60) * (Math.PI / 180);
          const x1 = 200 + 130 * Math.cos(angle1);
          const y1 = 200 + 130 * Math.sin(angle1);
          
          return [...Array(6)].map((__, j) => {
            if (i >= j) return null;
            const angle2 = (j * 60) * (Math.PI / 180);
            const x2 = 200 + 130 * Math.cos(angle2);
            const y2 = 200 + 130 * Math.sin(angle2);
            
            return (
              <g key={`${i}-${j}`}>
                <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#10b981" strokeWidth="0.5" strokeOpacity="0.2" />
                <motion.circle
                  cx={0}
                  cy={0}
                  r={3}
                  fill="#10b981"
                  initial={{ x: x1, y: y1, opacity: 0 }}
                  animate={{ 
                    x: [x1, x2],
                    y: [y1, y2],
                    opacity: [0, 1, 0]
                  }}
                  transition={{ 
                    duration: 3 + Math.random() * 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: Math.random() * 5
                  }}
                />
              </g>
            );
          });
        })}

        {/* Nodes */}
        {[...Array(6)].map((_, i) => {
          const angle = (i * 60) * (Math.PI / 180);
          const x = 200 + 130 * Math.cos(angle);
          const y = 200 + 130 * Math.sin(angle);
          
          return (
            <motion.g 
              key={i}
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 3, repeat: Infinity, delay: i * 0.5 }}
            >
              <circle cx={x} cy={y} r="25" fill="#0f172a" stroke="#10b981" strokeWidth="2" style={{ filter: 'url(#p2p-glow)' }} />
              <motion.circle
                cx={x} cy={y} r="25"
                fill="transparent"
                stroke="#10b981"
                strokeWidth="1"
                animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <foreignObject x={x-12} y={y-12} width="24" height="24">
                <Users size={24} color="#10b981" />
              </foreignObject>
            </motion.g>
          );
        })}

        {/* Center Hub (Optional but looks cool) */}
        <motion.circle
          cx={200} cy={200} r={40}
          fill="rgba(16, 185, 129, 0.05)"
          stroke="#10b981" strokeWidth="1" strokeDasharray="5 5"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: '200px 200px' }}
        />
        <g transform="translate(180, 180)" style={{ opacity: 0.3 }}>
           <Globe size={40} color="#10b981" />
        </g>
      </svg>
    </div>
  );

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ background: 'var(--bg-dark)' }}>
      <ArchHero 
        title="Peer-to-Peer"
        subtitle="Architecture"
        description="Merkezi otoriteye son. Her düğümün hem sunucu hem istemci olduğu, asla çökertilemeyen ve sansürlenemeyen ağların mimari sırrı."
        badge="Decentralized Network"
        color="#10b981"
        illustration={illu}
        features={[
          { icon: <Lock />, title: 'Resilience', desc: 'Veri tek bir yerde değil, tüm ağda parçalanmış halde durur.' },
          { icon: <LinkIcon />, title: 'Self-Healing', desc: 'Ayrılan birinin yerine diğeri geçer, ağ asla kesintiye uğramaz.' },
          { icon: <Zap />, title: 'Zero Ops', desc: 'Sunucu masrafı sıfıra yaklaşırken performans ağla birlikte artar.' }
        ]}
      />

      <div className="container" style={{ padding: '4rem 0' }}>
        <div className="glass-card" style={{ height: '600px', borderRadius: '40px', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <h2 style={{ position: 'absolute', top: '3rem', left: '4rem', margin: 0, fontWeight: 800 }}>Ağ Simülasyonu</h2>
          <div style={{ position: 'relative', width: '500px', height: '500px' }}>
            <svg width="100%" height="100%" style={{ position: 'absolute', overflow: 'visible' }}>
              {nodes.map(node => (
                <React.Fragment key={node.id}>
                  {nodes.filter(n => n.id > node.id).map(target => (
                    <motion.line
                      key={`${node.id}-${target.id}`}
                      x1={`${node.x}%`} y1={`${node.y}%`}
                      x2={`${target.x}%`} y2={`${target.y}%`}
                      stroke="#10b981" strokeWidth="0.5"
                      animate={{ opacity: activeNode === node.id || activeNode === target.id ? 0.8 : 0.1 }}
                    />
                  ))}
                </React.Fragment>
              ))}
            </svg>
            {nodes.map(node => (
              <motion.div key={node.id} onMouseEnter={() => setActiveNode(node.id)} onMouseLeave={() => setActiveNode(null)} style={{ position: 'absolute', left: `${node.x}%`, top: `${node.y}%`, width: '30px', height: '30px', margin: '-15px', borderRadius: '50%', background: activeNode === node.id ? '#10b981' : 'var(--bg-dark)', border: '2px solid #10b981', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10 }}>
                <Users size={12} color={activeNode === node.id ? '#000' : '#10b981'} />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default P2PPage;
