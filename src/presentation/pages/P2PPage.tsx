import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Share2, Shield, Zap, Globe, Cpu, Users, Link as LinkIcon, Lock, Activity } from 'lucide-react';

const P2PPage = () => {
  const [activeNode, setActiveNode] = useState<number | null>(null);
  const nodesCount = 10;
  
  // Generating positions for nodes in a circle
  const nodes = Array.from({ length: nodesCount }).map((_, i) => {
    const angle = (i * 360) / nodesCount;
    const x = 50 + 35 * Math.cos((angle * Math.PI) / 180);
    const y = 50 + 35 * Math.sin((angle * Math.PI) / 180);
    return { id: i, x, y };
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{ background: 'var(--bg-dark)', minHeight: '100vh', paddingTop: '100px', overflow: 'hidden' }}
    >
      <div className="container">
        {/* Floating Background Particles */}
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0 }}>
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={i}
              animate={{ 
                y: [0, -1000],
                opacity: [0, 0.4, 0],
                x: Math.random() * 100 - 50
              }}
              transition={{ 
                duration: 10 + Math.random() * 20, 
                repeat: Infinity, 
                ease: 'linear',
                delay: Math.random() * 20
              }}
              style={{
                position: 'absolute',
                left: `${Math.random() * 100}%`,
                bottom: '-50px',
                width: '1px',
                height: '40px',
                background: 'linear-gradient(to top, #10b981, transparent)'
              }}
            />
          ))}
        </div>

        {/* Hero Section */}
        <section style={{ textAlign: 'center', marginBottom: '80px', position: 'relative', zIndex: 1 }}>
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <span style={{ 
              background: 'rgba(16, 185, 129, 0.1)', 
              color: '#10b981', 
              padding: '0.6rem 2rem', 
              borderRadius: '100px', 
              fontSize: '0.9rem', 
              fontWeight: 800,
              letterSpacing: '3px',
              border: '1px solid rgba(16, 185, 129, 0.2)'
            }}>
              ZERO TRUST NETWORKS
            </span>
            <h1 style={{ fontSize: '5rem', margin: '2rem 0', fontWeight: 950, letterSpacing: '-2px' }}>
              Peer-to-Peer <br />
              <span style={{ color: '#10b981' }}>Ecosystem</span>
            </h1>
            <p style={{ fontSize: '1.3rem', color: 'var(--text-secondary)', maxWidth: '800px', margin: '0 auto', lineHeight: 1.6 }}>
               Merkezi sunucuları devre dışı bırakın. Her katılımcının hem kaynak sağlayıcı hem de tüketici olduğu, kırılmaz dağıtık ağ teknolojisi.
            </p>
          </motion.div>
        </section>

        {/* The "Mük" Network Diagram */}
        <section style={{ marginBottom: '120px', position: 'relative', zIndex: 1 }}>
          <div className="glass-card" style={{ 
            height: '700px', 
            borderRadius: '40px', 
            background: 'rgba(255,255,255,0.01)',
            border: '1px solid rgba(16, 185, 129, 0.1)',
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            
            <div style={{ position: 'relative', width: '600px', height: '600px' }}>
              <svg width="100%" height="100%" style={{ position: 'absolute', overflow: 'visible' }}>
                {/* Dynamic Connection Lines */}
                {nodes.map(node => (
                  <React.Fragment key={node.id}>
                    {nodes.filter(n => n.id > node.id).map(target => (
                      <motion.line
                        key={`${node.id}-${target.id}`}
                        x1={`${node.x}%`}
                        y1={`${node.y}%`}
                        x2={`${target.x}%`}
                        y2={`${target.y}%`}
                        stroke="#10b981"
                        strokeWidth="0.5"
                        animate={{ 
                          opacity: activeNode === node.id || activeNode === target.id ? 0.8 : 0.1,
                          strokeDasharray: activeNode === node.id || activeNode === target.id ? '5,0' : '5,5'
                        }}
                      />
                    ))}
                  </React.Fragment>
                ))}
              </svg>

              {/* Interaction Nodes */}
              {nodes.map(node => (
                <motion.div
                  key={node.id}
                  onHoverStart={() => setActiveNode(node.id)}
                  onHoverEnd={() => setActiveNode(null)}
                  whileHover={{ scale: 1.3 }}
                  style={{
                    position: 'absolute',
                    left: `${node.x}%`,
                    top: `${node.y}%`,
                    width: '40px',
                    height: '40px',
                    margin: '-20px',
                    borderRadius: '50%',
                    background: activeNode === node.id ? '#10b981' : 'var(--bg-dark)',
                    border: '2px solid #10b981',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 10,
                    cursor: 'pointer',
                    boxShadow: activeNode === node.id ? '0 0 20px #10b981' : 'none',
                    transition: 'background 0.3s'
                  }}
                >
                  <Users size={16} color={activeNode === node.id ? '#000' : '#10b981'} />
                  
                  {/* Status Ring */}
                  <AnimatePresence>
                    {activeNode === node.id && (
                      <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 2, opacity: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1, repeat: Infinity }}
                        style={{
                          position: 'absolute',
                          width: '100%',
                          height: '100%',
                          border: '2px solid #10b981',
                          borderRadius: '50%'
                        }}
                      />
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}

              {/* Central Information */}
              <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                textAlign: 'center',
                pointerEvents: 'none'
              }}>
                <motion.div 
                   animate={{ 
                     rotateY: 360,
                     scale: [1, 1.1, 1]
                   }} 
                   transition={{ 
                     rotateY: { duration: 10, repeat: Infinity, ease: 'linear' },
                     scale: { duration: 4, repeat: Infinity }
                   }}
                >
                   <Globe size={100} color="#10b981" style={{ opacity: 0.3 }} />
                </motion.div>
              </div>
            </div>

            {/* Info Cards Overlay */}
            <div style={{ position: 'absolute', right: '4rem', top: '4rem', width: '250px' }}>
              <AnimatePresence mode="wait">
                {activeNode !== null ? (
                  <motion.div
                    key="active"
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -20, opacity: 0 }}
                    className="glass-card"
                    style={{ padding: '1.5rem', borderLeft: '4px solid #10b981' }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                      <Activity size={20} color="#10b981" />
                      <h4 style={{ margin: 0 }}>Düğüm Aktif</h4>
                    </div>
                    <p style={{ fontSize: '0.8rem', opacity: 0.7 }}>Veri şu an doğrudan bu düğüm üzerinden anonim olarak taşınıyor.</p>
                  </motion.div>
                ) : (
                  <motion.div
                    key="idle"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="glass-card"
                    style={{ padding: '1.5rem', opacity: 0.6 }}
                  >
                     <p style={{ fontSize: '0.8rem', margin: 0 }}>Ağdaki bir düğüm üzerine gelerek detayları görün.</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </section>

        {/* Feature Grid */}
        <section style={{ paddingBottom: '120px', position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2.5rem' }}>
            <motion.div whileHover={{ y: -10 }} className="glass-card" style={{ padding: '3rem' }}>
               <Lock color="#10b981" size={32} style={{ marginBottom: '1.5rem' }} />
               <h3 style={{ marginBottom: '1rem' }}>Sarsılmaz Güvenlik</h3>
               <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                 Veri tek bir yerde değil, tüm ağda parçalanmış ve şifrelenmiş halde durur. Birini ele geçirmek sistemi çökertmez.
               </p>
            </motion.div>
            <motion.div whileHover={{ y: -10 }} className="glass-card" style={{ padding: '3rem' }}>
               <LinkIcon color="#10b981" size={32} style={{ marginBottom: '1.5rem' }} />
               <h3 style={{ marginBottom: '1rem' }}>Kendi Kendini Onarma</h3>
               <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                 Düğümler sürekli birbirini kontrol eder. Ayrılan birinin yerine diğeri anında geçer, ağ asla kesintiye uğramaz.
               </p>
            </motion.div>
            <motion.div whileHover={{ y: -10 }} className="glass-card" style={{ padding: '3rem' }}>
               <Zap color="#10b981" size={32} style={{ marginBottom: '1.5rem' }} />
               <h3 style={{ marginBottom: '1rem' }}>Adil Kaynak Dağıtımı</h3>
               <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                 Sistem yükü tüm katılımcılar arasında (CPU/RAM/Disk) paylaştırılır. Sunucu masrafı sıfıra yaklaşır.
               </p>
            </motion.div>
          </div>

          <div className="glass-card" style={{ marginTop: '4rem', padding: '3rem', textAlign: 'center', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
            <h4 style={{ color: '#10b981', marginBottom: '1.5rem' }}>Efsane Uygulamalar: BitTorrent & Blockchain</h4>
            <p style={{ maxWidth: '900px', margin: '0 auto', opacity: 0.8, lineHeight: 1.8 }}>
               P2P mimarisi, internetin en özgürleştirici gücüdür. Bugün Web3 denilen kavramın kalbinde bu "Peer" (Eşler) arası güven ilişkisi yatar. 
               Kullanılan protokoller (Gossip Protocol vb.) sayesinde milyonlarca cihaz saniyeler içinde senkronize olabilir.
            </p>
          </div>
        </section>
      </div>
    </motion.div>
  );
};

export default P2PPage;
