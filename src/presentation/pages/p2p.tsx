import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Users, Lock, Link as LinkIcon, Zap, Server, Network } from 'lucide-react';
import ArchHero from '../components/ArchHero';
import SEO from '../components/SEO';
import { P2PComparisonTab } from '../components/p2p/P2PComparisonTab';
import { P2PSimulationTab } from '../components/p2p/P2PSimulationTab';

const P2PPage: React.FC = () => {
  const { i18n } = useTranslation();
  const isEn = (i18n.resolvedLanguage || i18n.language || 'tr').startsWith('en');
  const [activeTab, setActiveTab] = useState<'comparison' | 'simulation'>('comparison');
  const scrollToSection = (id: 'comparison' | 'simulation') => {
    setActiveTab(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };


  const heroIllustration = (
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
    <>
      <SEO
        title={isEn ? "Peer-to-Peer (P2P) Networks & Mesh Architecture | ArchAcademy" : "Peer-to-Peer (P2P) Ağ Mimarisi ve Torrent | ArchAcademy"}
        description={isEn 
          ? "Learn Peer-to-Peer distributed networks, BitTorrent swarming, seeder-leecher protocols, and decentralized fault tolerance." 
          : "Merkeziyetsiz P2P ağ mimarisi, BitTorrent protokolü, seeder-leecher veri akışı ve kesintisiz dağıtık sistemler."
        }
        keywords="p2p, peer to peer, bittorrent, decentralized networks, mesh architecture, distributed hash table"
        canonicalUrl="/p2p"
      />
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ paddingBottom: '100px' }}>
        <ArchHero 
          title="Peer-to-Peer"
          subtitle="Network Architecture"
          description={isEn 
            ? "No central master. Every node operates simultaneously as both client and server. If individual peers crash, the network self-heals and data flows uninterrupted." 
            : "Merkezi otorite yok. Her düğüm hem sunucu hem de istemcidir. Bir düğüm çökse bile ağ hayatta kalır ve veri akışı devam eder."
          }
          badge="Decentralized"
          color="#10b981"
          illustration={heroIllustration}
          features={[
            { 
              icon: <Lock />, 
              title: isEn ? 'Resilience' : 'Direnç (Resilience)', 
              desc: isEn ? 'Data is chunked and redundantly distributed across the entire peer swarm.' : 'Veri tek bir yerde değil, tüm ağda parçalanmış ve yedeklenmiş halde durur.' 
            },
            { 
              icon: <LinkIcon />, 
              title: isEn ? 'Self-Healing' : 'Kendini Onarma (Self-Healing)', 
              desc: isEn ? 'Peers continuously replace disconnected nodes with zero downtime.' : 'Ayrılan birinin yerine diğeri geçer, ağ asla kesintiye uğramaz.' 
            },
            { 
              icon: <Zap />, 
              title: isEn ? 'Scalability' : 'Ölçeklenebilirlik (Scalability)', 
              desc: isEn ? 'Every new peer adds upload bandwidth and compute to the system.' : 'Ağa katılan her yeni kullanıcı, sisteme yük değil güç katar.' 
            }
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
              { id: 'comparison', label: isEn ? 'Client-Server vs P2P' : 'Client-Server vs P2P', icon: <Server size={18} /> },
              { id: 'simulation', label: isEn ? 'Torrent Simulation' : 'Torrent Simülasyonu', icon: <Network size={18} /> }
            ].map((tab) => (
               <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as 'comparison' | 'simulation')}
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
          <div style={{ display: "flex", flexDirection: "column", gap: "4rem" }}>
          <div id="comparison" style={{ scrollMarginTop: "100px" }}>
            <P2PComparisonTab />
          </div>
          <div id="simulation" style={{ scrollMarginTop: "100px" }}>
            <P2PSimulationTab />
          </div>
        </div>
        </div>

        {/* The Genesis Section */}
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
                  {isEn ? "The Genesis" : "Tarihsel Köken"}
                </div>
                <p style={{ color: '#94a3b8', marginBottom: '2rem', fontSize: '1.1rem', lineHeight: 1.6 }}>
                  {isEn 
                    ? "The most successful real-world deployment of P2P swarming is the BitTorrent protocol, engineered by Bram Cohen. Explore the seminal paper." 
                    : "Peer-to-Peer devriminin en başarılı uygulaması olan BitTorrent protokolü, Bram Cohen tarafından tasarlanmıştır. Orijinal makaleyi inceleyin."
                  }
                </p>
                
                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap',
            position: 'sticky',
            top: '80px',
            zIndex: 30 }}>
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
    </>
  );
};

export default P2PPage;
