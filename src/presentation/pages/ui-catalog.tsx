import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
    CreditCard,
    Server,
    Layout,
    Palette,
    Puzzle,
    Layers,
    RefreshCcw,
    Globe,
    Monitor,
    Database
} from 'lucide-react';
import { theme } from '../theme';

interface UIArchItem {
    id: string;
    name: string;
    path: string;
    color: string;
    icon: React.ReactNode;
    desc: string;
}

const UIArchitectureCatalogPage = () => {
    const navigate = useNavigate();
    const [hoveredItem, setHoveredItem] = useState<UIArchItem | null>(null);
    const [rotation, setRotation] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setRotation(prev => (prev + 0.2) % 360);
        }, 50);
        return () => clearInterval(interval);
    }, []);

    const items: UIArchItem[] = [
        { id: 'atomic', name: 'Atomic Design', path: '/atomic-design', color: '#3b82f6', icon: <Palette size={24} />, desc: 'Atom -> Molekül -> Organizma. UI bileşen hiyerarşisi.' },
        { id: 'sdui', name: 'Server-Driven UI', path: '/server-driven-ui', color: '#8b5cf6', icon: <Server size={24} />, desc: 'Backend ne derse onu çiz. Dinamik UI yönetimi.' },
        { id: 'islands', name: 'Islands Arch', path: '/islands-arch', color: '#f59e0b', icon: <Layout size={24} />, desc: 'Sadece interaktif adaları hydrate et (Astro).' },
        { id: 'tokens', name: 'Design Tokens', path: '/design-tokens', color: '#ec4899', icon: <CreditCard size={24} />, desc: 'Renk, font, spacing... Tasarımın atomik sabitleri.' },
        { id: 'microfe', name: 'Micro-Frontends', path: '/micro-frontends', color: '#06b6d4', icon: <Puzzle size={24} />, desc: 'Monolitik frontendi parçala ve yönet.' },
        { id: 'state', name: 'State-Driven UI', path: '/state-driven', color: '#22c55e', icon: <RefreshCcw size={24} />, desc: 'UI = f(State). Reaktif arayüz paradigması.' },
        { id: 'cdd', name: 'Component-Driven', path: '/component-driven', color: '#f43f5e', icon: <Puzzle size={24} />, desc: 'Sayfalardan değil, bileşenlerden başlama (CDD).' },
        { id: 'composite', name: 'Composite UI', path: '/composite-ui', color: '#8b5cf6', icon: <Layers size={24} />, desc: 'Farklı modüllerin runtime anında birleşmesi.' },
        { id: 'spa-mpa', name: 'SPA vs MPA', path: '/spa-vs-mpa', color: '#10b981', icon: <Globe size={24} />, desc: 'Tek Sayfa (SPA) ile Çok Sayfa (MPA) render stratejileri.' },
        { id: 'comp-state', name: 'Component State', path: '/component-state', color: '#6366f1', icon: <Database size={24} />, desc: 'Bileşen tabanlı durum yönetimi ve veri akışı.' }
    ];

    return (
        <div style={{ minHeight: '100vh', padding: '0', background: theme.colors.bgDark, overflow: 'hidden', position: 'relative' }}>

            {/* Background Ambience */}
            <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 0 }}>
                <div style={{ position: 'absolute', top: '20%', left: '10%', width: '400px', height: '400px', background: `radial-gradient(circle, ${theme.colors.primary}1a 0%, transparent 70%)`, filter: 'blur(40px)' }} />
                <div style={{ position: 'absolute', bottom: '10%', right: '10%', width: '300px', height: '300px', background: `radial-gradient(circle, ${theme.colors.layers.infrastructure}1a 0%, transparent 70%)`, filter: 'blur(40px)' }} />
            </div>

            {/* Title */}
            <div style={{ position: 'relative', zIndex: 10, textAlign: 'center', paddingTop: '4rem', marginBottom: '1rem' }}>
                <h1 style={{
                    fontSize: '3.5rem',
                    fontWeight: 800,
                    background: 'linear-gradient(to right, #60a5fa, #c084fc)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    marginBottom: '1rem',
                    letterSpacing: '-1px'
                }}>
                    Visual Architecture
                </h1>
                <p style={{ fontSize: '1.2rem', color: theme.colors.textSecondary, maxWidth: '600px', margin: '0 auto' }}>
                    Pixel-perfect rendering, Design Systems ve görsel tutarlılık disiplinleri.
                </p>
            </div>

            {/* Orbit Visualization */}
            <div style={{ position: 'relative', height: '600px', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10 }}>

                {/* Center Core */}
                <div style={{ position: 'absolute', zIndex: 20 }}>
                    <motion.div
                        animate={{ boxShadow: ['0 0 20px rgba(99, 102, 241, 0.4)', '0 0 50px rgba(99, 102, 241, 0.6)', '0 0 20px rgba(99, 102, 241, 0.4)'] }}
                        transition={{ duration: 3, repeat: Infinity }}
                        style={{
                            width: '140px', height: '140px',
                            borderRadius: '50%',
                            background: '#1e1b4b',
                            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                            border: '4px solid #6366f1',
                            cursor: 'default'
                        }}
                    >
                        <Monitor size={40} color="#818cf8" />
                        <div style={{ color: 'white', fontWeight: 900, fontSize: '1rem', marginTop: '8px' }}>DESIGN</div>
                        <div style={{ color: '#818cf8', fontSize: '0.7rem' }}>SYSTEMS</div>
                    </motion.div>
                </div>

                {/* Orbital Ring */}
                <motion.div
                    animate={{ rotate: rotation }}
                    style={{
                        width: '500px', height: '500px',
                        position: 'absolute',
                        borderRadius: '50%',
                        border: '1px dashed rgba(255,255,255,0.1)'
                    }}
                >
                    {items.map((item, index) => {
                        const angle = (360 / items.length) * index;
                        const rad = angle * (Math.PI / 180);
                        const radius = 250;
                        const x = radius * Math.cos(rad) + 250 - 35;
                        const y = radius * Math.sin(rad) + 250 - 35;

                        return (
                            <motion.div
                                key={item.id}
                                style={{
                                    position: 'absolute',
                                    left: x, top: y,
                                    width: '70px', height: '70px',
                                    borderRadius: '50%',
                                    background: theme.colors.surface,
                                    border: `2px solid ${item.color}`,
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    cursor: 'pointer',
                                    boxShadow: hoveredItem?.id === item.id ? `0 0 30px ${item.color}` : 'none'
                                }}
                                whileHover={{ scale: 1.2, zIndex: 100 }}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    navigate(item.path);
                                }}
                                onMouseEnter={() => setHoveredItem(item)}
                                onMouseLeave={() => setHoveredItem(null)}
                            >
                                {/* Counter-rotate icon so it stays upright */}
                                <motion.div style={{ color: item.color }} animate={{ rotate: -rotation }}>
                                    {item.icon}
                                </motion.div>
                            </motion.div>
                        );
                    })}
                </motion.div>

                {/* Info Card (Dynamic) */}
                <AnimatePresence>
                    {hoveredItem && (
                        <motion.div
                            initial={{ opacity: 0, y: 20, scale: 0.9 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            style={{
                                position: 'absolute',
                                bottom: '20px',
                                background: 'rgba(30, 41, 59, 0.9)',
                                backdropFilter: 'blur(10px)',
                                padding: '1.5rem',
                                borderRadius: '16px',
                                border: `1px solid ${hoveredItem.color}`,
                                textAlign: 'center',
                                maxWidth: '400px',
                                zIndex: 50,
                                boxShadow: '0 20px 50px rgba(0,0,0,0.5)'
                            }}
                        >
                            <h3 style={{ color: hoveredItem.color, marginBottom: '0.5rem', fontSize: '1.5rem' }}>{hoveredItem.name}</h3>
                            <p style={{ color: theme.colors.textSecondary, lineHeight: 1.5 }}>{hoveredItem.desc}</p>
                            <div style={{ marginTop: '10px', fontSize: '0.8rem', color: theme.colors.textSecondary, opacity: 0.6 }}>Click to explore pattern</div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default UIArchitectureCatalogPage;
