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
    <div style={{ position: 'relative', width: '350px', height: '350px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {Array.from({ length: 6 }).map((_, i) => (
        <motion.div
          key={i}
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 10, 0]
          }}
          transition={{ repeat: Infinity, duration: 4, delay: i * 0.5 }}
          style={{
            position: 'absolute',
            width: '50px',
            height: '50px',
            background: i % 2 === 0 ? '#10b981' : 'var(--glass)',
            borderRadius: '12px',
            border: '1px solid #10b98144',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: i % 2 === 0 ? 'black' : '#10b981',
            transform: `rotate(${i * 60}deg) translateY(-100px) rotate(-${i * 60}deg)`,
            boxShadow: i % 2 === 0 ? '0 0 20px rgba(16, 185, 129, 0.3)' : 'none'
          }}
        >
          <Users size={20} />
        </motion.div>
      ))}
      <motion.div animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }}>
        <Globe size={60} color="#10b981" opacity={0.5} />
      </motion.div>
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
