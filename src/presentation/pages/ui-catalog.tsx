import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
    CreditCard,
    Server,
    Layout,
    Palette,
    Puzzle,
    Layers,
    RefreshCcw,
    Globe,
    Database
} from 'lucide-react';
import { theme } from '../themes/theme';
import SEO from '../components/SEO';

interface UIArchItem {
    id: string;
    name: string;
    path: string;
    color: string;
    icon: React.ReactNode;
    desc: { tr: string; en: string };
}

const UIArchitectureCatalogPage: React.FC = () => {
    const navigate = useNavigate();
    const { i18n } = useTranslation();
    const isEn = (i18n.resolvedLanguage || i18n.language || 'tr').startsWith('en');

    const [hoveredItem, setHoveredItem] = useState<UIArchItem | null>(null);
    const [rotation, setRotation] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setRotation(prev => (prev + 0.2) % 360);
        }, 50);
        return () => clearInterval(interval);
    }, []);

    const items: UIArchItem[] = [
        { 
          id: 'atomic', 
          name: 'Atomic Design', 
          path: '/atomic-design', 
          color: '#3b82f6', 
          icon: <Palette size={24} />, 
          desc: {
            tr: 'Atom -> Molekül -> Organizma. UI bileşen hiyerarşisi ve modüler tasarım.',
            en: 'Atoms -> Molecules -> Organisms: Methodological hierarchy for scalable component systems.'
          }
        },
        { 
          id: 'sdui', 
          name: 'Server-Driven UI', 
          path: '/server-driven-ui', 
          color: '#8b5cf6', 
          icon: <Server size={24} />, 
          desc: {
            tr: 'Backend ne derse onu çiz. App Store beklemeden dinamik ekran yönetimi.',
            en: 'Server-driven layout rendering: Deploying dynamic UI experiments without client app store releases.'
          }
        },
        { 
          id: 'islands', 
          name: 'Islands Arch', 
          path: '/islands-arch', 
          color: '#f59e0b', 
          icon: <Layout size={24} />, 
          desc: {
            tr: 'Sadece interaktif adaları hydrate et (Astro). Sıfır gereksiz JavaScript.',
            en: 'Partial hydration: Rendering static HTML by default and only hydrating dynamic interactive islands.'
          }
        },
        { 
          id: 'tokens', 
          name: 'Design Tokens', 
          path: '/design-tokens', 
          color: '#ec4899', 
          icon: <CreditCard size={24} />, 
          desc: {
            tr: 'Renk, font, spacing... Tasarım sisteminin platformdan bağımsız atomik sabitleri.',
            en: 'Agnostic atomic design variables (colors, typography, spacing) across multi-platform apps.'
          }
        },
        { 
          id: 'microfe', 
          name: 'Micro-Frontends', 
          path: '/micro-frontends', 
          color: '#06b6d4', 
          icon: <Puzzle size={24} />, 
          desc: {
            tr: 'Monolitik frontend kod tabanını otonom mikro uygulamalara bölme.',
            en: 'Decomposing complex frontend monoliths into independently deployed micro-applications.'
          }
        },
        { 
          id: 'state', 
          name: 'State-Driven UI', 
          path: '/state-driven', 
          color: '#22c55e', 
          icon: <RefreshCcw size={24} />, 
          desc: {
            tr: 'UI = f(State). Reaktif ve deterministik arayüz yönetim paradigması.',
            en: 'UI = f(State): Deterministic reactive rendering driven by predictable state transitions.'
          }
        },
        { 
          id: 'cdd', 
          name: 'Component-Driven', 
          path: '/component-driven', 
          color: '#f43f5e', 
          icon: <Puzzle size={24} />, 
          desc: {
            tr: 'Sayfalardan değil, izole bileşenlerden başlama yaklaşımı (Storybook).',
            en: 'Bottom-up UI development building from isolated components up to complete pages.'
          }
        },
        { 
          id: 'composite', 
          name: 'Composite UI', 
          path: '/composite-ui', 
          color: '#8b5cf6', 
          icon: <Layers size={24} />, 
          desc: {
            tr: 'Farklı ekiplerin widget parçalarının runtime anında tek ekranda birleşmesi.',
            en: 'Runtime composition of decoupled UI widgets developed by independent domain teams.'
          }
        },
        { 
          id: 'spa-mpa', 
          name: 'SPA vs MPA', 
          path: '/spa-vs-mpa', 
          color: '#10b981', 
          icon: <Globe size={24} />, 
          desc: {
            tr: 'Tek Sayfa (SPA) ile Çok Sayfa (MPA) mimarilerinin render ve performans kıyası.',
            en: 'Architectural trade-off analysis between Single-Page (SPA) and Multi-Page (MPA) applications.'
          }
        },
        { 
          id: 'comp-state', 
          name: 'Component State', 
          path: '/component-state', 
          color: '#6366f1', 
          icon: <Database size={24} />, 
          desc: {
            tr: 'Bileşen tabanlı durum yönetimi, prop drilling önleme ve veri akışı.',
            en: 'Component-level state lifecycle, avoiding prop drilling, and unidirectional data flow.'
          }
        }
    ];

    return (
        <>
            <SEO 
                title={isEn ? "UI & Frontend Architectures Catalog | ArchAcademy" : "Kullanıcı Arayüzü & Frontend Mimarileri | ArchAcademy"}
                description={isEn 
                  ? "Explore modern UI architectures: Atomic Design, Server-Driven UI, Islands Architecture, Micro-Frontends, and Design Tokens." 
                  : "Modern arayüz mimarileri: Atomic Design, Server-Driven UI, Islands Mimarisi, Mikro-Frontendler ve Tasarım Belirteçleri."
                }
                keywords="ui architecture, frontend architecture, atomic design, server driven ui, islands architecture, micro frontends"
                canonicalUrl="/ui-catalog"
            />
            <div style={{ minHeight: '100vh', padding: '0', background: theme.colors.bgDark, overflow: 'hidden', position: 'relative' }}>

                {/* Background Ambience */}
                <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 0 }}>
                    <div style={{ position: 'absolute', top: '20%', left: '10%', width: '400px', height: '400px', background: `radial-gradient(circle, ${theme.colors.primary}1a 0%, transparent 70%)`, filter: 'blur(40px)' }} />
                    <div style={{ position: 'absolute', bottom: '10%', right: '10%', width: '300px', height: '300px', background: `radial-gradient(circle, ${theme.colors.layers.infrastructure}1a 0%, transparent 70%)`, filter: 'blur(40px)' }} />
                </div>

                {/* Header */}
                <div style={{ position: 'relative', zIndex: 10, textAlign: 'center', paddingTop: '120px', paddingBottom: '40px' }}>
                    <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.8 }}>
                        <span style={{ fontSize: '0.8rem', fontWeight: 800, color: theme.colors.primary, letterSpacing: '4px', textTransform: 'uppercase' }}>
                            {isEn ? "FRONTEND & UI ECOSYSTEM" : "FRONTEND & UI EKOSİSTEMİ"}
                        </span>
                        <h1 className="gradient-text" style={{ fontSize: '3.5rem', fontWeight: 900, marginTop: '10px' }}>
                            {isEn ? "UI Architecture Constellation" : "Arayüz Mimarileri Takımyıldızı"}
                        </h1>
                        <p style={{ color: theme.colors.textSecondary, maxWidth: '600px', margin: '15px auto 0', fontSize: '1.1rem' }}>
                            {isEn 
                              ? "Modern component architectures, rendering paradigms, and state flow models."
                              : "Modern bileşen mimarileri, render stratejileri ve durum akış modelleri."
                            }
                        </p>
                    </motion.div>
                </div>

                {/* Main Grid List */}
                <div className="container" style={{ position: 'relative', zIndex: 10, paddingBottom: '100px' }}>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                        gap: '2rem'
                    }}>
                        {items.map((item, index) => (
                            <motion.div
                                key={item.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                                onClick={() => navigate(item.path)}
                                whileHover={{ scale: 1.03 }}
                                className="glass-card"
                                style={{
                                    cursor: 'pointer',
                                    borderTop: `4px solid ${item.color}`,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '1.2rem',
                                    padding: '2rem'
                                }}
                            >
                                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                    <div style={{
                                        width: '48px',
                                        height: '48px',
                                        borderRadius: '14px',
                                        background: `${item.color}20`,
                                        color: item.color,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}>
                                        {item.icon}
                                    </div>
                                    <h3 style={{ margin: 0, color: 'white', fontSize: '1.25rem' }}>{item.name}</h3>
                                </div>

                                <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6 }}>
                                    {isEn ? item.desc.en : item.desc.tr}
                                </p>

                                <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', gap: '8px', color: item.color, fontSize: '0.85rem', fontWeight: 700 }}>
                                    {isEn ? "Explore Architecture →" : "Detayları Keşfet →"}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

            </div>
        </>
    );
};

export default UIArchitectureCatalogPage;
