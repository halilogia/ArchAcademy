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
        description="No central authority. Every node both server and client. Single node crash, network survives, data flow continues."
        badge="Decentralized"
        color="#10b981"
        illustration={illu}
        features={[
          { icon: <Lock />, title: 'Resilience', desc: 'Data not in one place. Fragmented and replicated across entire network.' },
          { icon: <LinkIcon />, title: 'Self-Healing', desc: 'One leaves, another replaces. Network never interrupted.' },
          { icon: <Zap />, title: 'Scalability', desc: 'Each new user joining network adds power, not load.' }
        ]}
      >
        <div style={{ 
          marginTop: '2rem',
          padding: '6px', 
          background: 'rgba(15, 23, 42, 0.4)', 
          borderRadius: '24px', 
          border