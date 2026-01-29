import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ArchHero from '../components/ArchHero';
import { 
  Users, 
  Share2, 
  Shield, 
  Zap, 
  Link as LinkIcon, 
  Lock, 
  Server, 
  Network,
  FileDown,
  FileUp,
  XCircle,
  Activity
} from 'lucide-react';

const P2PPage = () => {
    const [activeTab, setActiveTab] = useState<'simulation' | 'comparison'>('comparison');
    const [nodes, setNodes] = useState(
        Array.from({ length: 6 }).map((_, i) => ({
            id: i,
            x: 50 + 35 * Math.cos((i * 60 * Math.PI) / 180),
            y: 50 + 35 * Math.sin((i * 60 * Math.PI) / 180),
            hasFile: i === 0, // Initial seeder
            isOnline: true
        }))
    );
    const [packets, setPackets] = useState<{from: number, to: number, id: number}[]>([]);

    const toggleNode = (id: number) => {
        setNodes(prev => prev.map(n => n.id === id ? { ...n, isOnline: !n.isOnline } : n));
    };

    const broadcastFile = () => {
        // Find nodes with file (Seeders)
        const seeders = nodes.filter(n => n.hasFile && n.isOnline);
        const leechers = nodes.filter(n => !n.hasFile && n.isOnline);

        if (seeders.length === 0 || leechers.length === 0) return;

        // Create packets from random seeders to random leechers
        const newPackets: any[] = [];
        leechers.forEach(leecher => {
            const randomSeeder = seeders[Math.floor(Math.random() * seeders.length)];
            if (randomSeeder) {
                newPackets.push({ from: randomSeeder.id, to: leecher.id, id: Date.now() + Math.random() });
            }
        });

        setPackets(prev => [...prev, ...newPackets]);

        // After delay, leechers become seeders
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

  const illu = (
    <div style={{ position: 'relative', width: '350px', height: '350px' }}>
      <svg viewBox="0 0 400 400" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
        <defs>
          <filter id="p2p-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Connections (Mesh) */}
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
              <line 
                key={`${i}-${j}`} 
                x1={x1} y1={y1} x2={x2} y2={y2} 
                stroke="#10b981" 
                strokeWidth="1" 
                strokeOpacity="0.15" 
              />
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
              
              {/* Data Packet Animation */}
              {i === 0 && (
                  <motion.circle 
                    cx={x} cy={y} r="4" fill="#fff"
                    animate={{ opacity: [1, 0], scale: [1, 3] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
              )}

              <foreignObject x={x-12} y={y-12} width="24" height="24">
                <Users size={24} color={i === 0 ? "#fff" : "#10b981"} />
              </foreignObject>
            </motion.g>
          );
        })}
      </svg>
    </div>
  );

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ paddingBottom: '100px' }}>
      <ArchHero 
        title="Peer-to-Peer"
        subtitle="Network Architecture"
        description="Merkezi otorite yok. Her düğüm hem sunucu hem de istemcidir. Bir düğüm çökse bile ağ hayatta kalır ve veri akışı devam eder."
        badge="Decentralized"
        color="#10b981"
        illustration={illu}
        features={[
          { icon: <Lock />, title: 'Resilience', desc: 'Veri tek bir yerde değil, tüm ağda parçalanmış ve yedeklenmiş halde durur.' },
          { icon: <LinkIcon />, title: 'Self-Healing', desc: 'Ayrılan birinin yerine diğeri geçer, ağ asla kesintiye uğramaz.' },
          { icon: <Zap />, title: 'Scalability', desc: 'Ağa katılan her yeni kullanıcı, sisteme yük değil güç katar.' }
        ]}
      >
        <div style={{ 
          marginTop: '2rem',
          padding: '6px', 
          background: 'rgba(15, 23, 42, 0.4)', 
          borderRadius: '24px', 
          border: '1px solid rgba(255,255,255,0.05)',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '4px',
          backdropFilter: 'blur(10px)'
        }}>
          {[
            { id: 'comparison', label: 'Client-Server vs P2P', icon: <Server size={18} /> },
            { id: 'simulation', label: 'Torrent Simulation', icon: <Network size={18} /> }
          ].map((tab) => (
             <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              style={{
                padding: '10px 24px',
                borderRadius: '18px',
                border: 'none',
                background: activeTab === tab.id ? '#10b981' : 'transparent',
                color: activeTab === tab.id ? 'black' : 'rgba(255,255,255,0.5)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontWeight: 700,
                fontSize: '0.9rem',
                transition: 'all 0.3s ease',
                boxShadow: activeTab === tab.id ? '0 4px 12px rgba(16, 185, 129, 0.3)' : 'none'
              }}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>
      </ArchHero>

      <div className="container" style={{ marginTop: '2rem' }}>
        <AnimatePresence mode="wait">
             {activeTab === 'comparison' && (
                <motion.div
                    key="comparison"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                >
                     <div style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 400px) 1fr', gap: '3rem', alignItems: 'center' }}>
                        
                        <div className="glass-card" style={{ padding: 0, overflow: 'hidden' }}>
                           <div style={{ padding: '1.5rem', background: 'rgba(239, 68, 68, 0.1)', borderBottom: '1px solid rgba(239, 68, 68, 0.2)' }}>
                               <h3 style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#ef4444' }}>
                                   <Server /> Client-Server (Merkezi)
                               </h3>
                           </div>
                           <div style={{ padding: '1.5rem' }}>
                               <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                                   Tüm kullanıcılar tek bir merkezi sunucuya bağlanır. Dosya veya veri bu merkezden dağıtılır.
                               </p>
                               <ul style={{ paddingLeft: '1.5rem', color: '#94a3b8', lineHeight: 2 }}>
                                   <li>❌ <strong>Single Point of Failure:</strong> Sunucu çökerse herkes kesilir.</li>
                                   <li>❌ <strong>Bandwidth Cost:</strong> Tüm trafik sunucudan çıkar, maliyetlidir.</li>
                                   <li>❌ <strong>Censorship:</strong> Merkezi kapatmak sistemi durdurur.</li>
                               </ul>
                           </div>
                        </div>

                        <div className="glass-card" style={{ padding: 0, overflow: 'hidden', border: '2px solid rgba(16, 185, 129, 0.3)' }}>
                           <div style={{ padding: '1.5rem', background: 'rgba(16, 185, 129, 0.1)', borderBottom: '1px solid rgba(16, 185, 129, 0.2)' }}>
                               <h3 style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#10b981' }}>
                                   <Share2 /> P2P Network (Dağıtık)
                               </h3>
                           </div>
                           <div style={{ padding: '1.5rem' }}>
                               <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                                   Her kullanıcı (Peer) birbirine bağlıdır. Dosyayı indiren kişi, aynı zamanda diğerlerine gönderir (Seeding).
                               </p>
                               <ul style={{ paddingLeft: '1.5rem', color: '#94a3b8', lineHeight: 2 }}>
                                   <li style={{ color: '#ec4899' }}>✅ <strong>Robustness:</strong> 10 düğüm çökse bile sistem kalanlarla devam eder.</li>
                                   <li style={{ color: '#eab308' }}>✅ <strong>Viral Scalability:</strong> Kullanıcı arttıkça sistem yavaşlamaz, hızlanır.</li>
                                   <li style={{ color: '#3b82f6' }}>✅ <strong>Unstoppable:</strong> Ağı kapatacak tek bir şalter yoktur.</li>
                               </ul>
                           </div>
                        </div>

                     </div>
                </motion.div>
             )}

             {activeTab === 'simulation' && (
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
                                disabled={nodes.every(n => n.hasFile || !n.isOnline)}
                                className="btn-bounce"
                                style={{ 
                                    padding: '12px 30px', 
                                    fontSize: '1rem', 
                                    fontWeight: 800, 
                                    borderRadius: '12px', 
                                    border: 'none', 
                                    background: '#10b981', 
                                    color: 'black',
                                    cursor: 'pointer',
                                    boxShadow: '0 10px 30px rgba(16, 185, 129, 0.3)',
                                    display: 'inline-flex', 
                                    alignItems: 'center',
                                    gap: '8px',
                                    opacity: nodes.every(n => n.hasFile || !n.isOnline) ? 0.5 : 1
                                }}
                            >
                                <FileUp size={18} /> Dosyayı Yay (Seed)
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
                                Sıfırla
                            </button>
                        </div>
                        <p style={{ marginTop: '1rem', color: 'var(--text-secondary)' }}>
                           Düğümlere tıklayarak onları <strong>Online/Offline</strong> yapabilirsiniz. Offline düğümler veri alamaz.
                        </p>
                    </div>

                    <div style={{ position: 'relative', width: '100%', height: '500px', background: 'rgba(0,0,0,0.2)', borderRadius: '30px', overflow: 'hidden' }}>
                        
                        {/* Simulation Stats */}
                        <div style={{ position: 'absolute', top: 20, left: 20, padding: '15px', background: 'rgba(0,0,0,0.5)', borderRadius: '12px', backdropFilter: 'blur(5px)', zIndex: 20 }}>
                            <div style={{ display: 'flex', gap: '15px', fontSize: '0.9rem' }}>
                                <div style={{ color: '#10b981' }}>Seeders: {nodes.filter(n => n.hasFile && n.isOnline).length}</div>
                                <div style={{ color: '#3b82f6' }}>Leechers: {nodes.filter(n => !n.hasFile && n.isOnline).length}</div>
                                <div style={{ color: '#ef4444' }}>Offline: {nodes.filter(n => !n.isOnline).length}</div>
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
                                    if(!source || !target) return null;

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
             )}
        </AnimatePresence>
      </div>

      
      <section style={{ padding: '4rem 0', background: 'rgba(0,0,0,0.3)', borderTop: '1px solid rgba(255,255,255,0.05)', marginTop: '4rem' }}>
        <div className="container" style={{ textAlign: 'center' }}>
           <div style={{ 
             background: 'linear-gradient(180deg, rgba(15, 23, 42, 0) 0%, rgba(15, 23, 42, 0.5) 100%)', 
             padding: '3rem', 
             borderRadius: '24px', 
             border: '1px solid rgba(255,255,255,0.05)',
             maxWidth: '900px',
             margin: '0 auto'
           }}>
              <div style={{ fontSize: '0.8rem', letterSpacing: '2px', fontWeight: 800, color: 'rgba(255,255,255,0.4)', marginBottom: '1rem', textTransform: 'uppercase' }}>
                The Genesis
              </div>
              <p style={{ color: '#94a3b8', marginBottom: '2rem', fontSize: '1.1rem', lineHeight: 1.6 }}>
                Peer-to-Peer devriminin en başarılı uygulaması olan BitTorrent protokolü, Bram Cohen tarafından tasarlanmıştır. Orijinal makaleyi inceleyin.
              </p>
              
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                 <a 
                   href="https://www.bittorrent.org/bittorrentecon.pdf" 
                   target="_blank" 
                   rel="noopener noreferrer"
                   style={{ 
                     display: 'flex', alignItems: 'center', gap: '8px', 
                     background: 'rgba(16, 185, 129, 0.15)', color: '#6ee7b7', 
                     padding: '12px 24px', borderRadius: '12px', textDecoration: 'none', fontWeight: 600,
                     border: '1px solid rgba(16, 185, 129, 0.2)', transition: 'all 0.2s'
                   }}
                 >
                    BitTorrent Economics Paper <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                 </a>
              </div>
           </div>
        </div>
      </section>
    </motion.div>
  );
};

export default P2PPage;
