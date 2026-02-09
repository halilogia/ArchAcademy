import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Hero from '../components/Hero';
import { useProgress } from '../../context/ProgressContext';
import { Shield, Zap, Layout, Database, Activity, Volume2 } from 'lucide-react';

const EliteArchitecturePage = () => {
    const { completeStep } = useProgress();
    const [activeTab, setActiveTab] = useState<'overview' | 'layers' | 'patterns' | 'elite'>('overview');

    useEffect(() => {
        const timer = setTimeout(() => {
            completeStep('/elite-architecture');
        }, 2000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ color: '#e2e8f0', background: '#020617', minHeight: '100vh' }}
        >
            {/* #region HERO SECTION */}
            <Hero mode="clean">
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                    padding: '2rem 1rem'
                }}>
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        style={{
                            background: 'linear-gradient(135deg, #3b82f6 0%, #2dd4bf 100%)',
                            padding: '1rem',
                            borderRadius: '20px',
                            marginBottom: '1.5rem',
                            boxShadow: '0 0 40px rgba(59, 130, 246, 0.4)'
                        }}
                    >
                        <Shield size={48} color="white" />
                    </motion.div>
                    <h1 style={{ fontSize: 'clamp(2.5rem, 8vw, 4rem)', fontWeight: 900, marginBottom: '1rem', background: 'linear-gradient(to right, #fff, #94a3b8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                        Elite MVVM Standard
                    </h1>
                    <p style={{ fontSize: '1.25rem', color: '#94a3b8', maxWidth: '700px', margin: '0 auto 2rem' }}>
                        Flutter mimari rehberinden ilham alan, React ve Oyun ekosistemleri için modernize edilmiş ultra-fidelity yazılım anayasası.
                    </p>

                    <div style={{
                        background: 'rgba(15, 23, 42, 0.6)',
                        padding: '8px',
                        borderRadius: '24px',
                        display: 'flex',
                        gap: '8px',
                        border: '1px solid rgba(255, 255, 255, 0.08)',
                        backdropFilter: 'blur(10px)',
                        boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
                        flexWrap: 'wrap',
                        justifyContent: 'center'
                    }}>
                        {[
                            { id: 'overview', label: 'Genel Bakış', icon: <Activity size={16} /> },
                            { id: 'layers', label: 'Katmanlar', icon: <Layout size={16} /> },
                            { id: 'patterns', label: 'Kalıplar', icon: <Shield size={16} /> },
                            { id: 'elite', label: 'Elite Standartlar', icon: <Zap size={16} /> }
                        ].map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id as any)}
                                style={{
                                    padding: '12px 24px',
                                    borderRadius: '18px',
                                    border: 'none',
                                    background: activeTab === tab.id ? '#3b82f6' : 'transparent',
                                    color: activeTab === tab.id ? 'white' : 'rgba(255,255,255,0.5)',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px',
                                    fontWeight: 700,
                                    fontSize: '0.9rem',
                                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                                }}
                            >
                                {tab.icon} {tab.label}
                            </button>
                        ))}
                    </div>
                </div>
            </Hero>
            {/* #endregion */}

            <AnimatePresence mode="wait">
                <div className="container" style={{ padding: '4rem 1rem', maxWidth: '1100px', margin: '0 auto' }}>

                    {/* #region OVERVIEW TAB */}
                    {activeTab === 'overview' && (
                        <motion.div key="overview" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                                <div style={{ background: 'rgba(30, 41, 59, 0.5)', padding: '2.5rem', borderRadius: '32px', border: '1px solid rgba(255,255,255,0.05)' }}>
                                    <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '1.5rem', color: '#3b82f6' }}>Felsefe</h3>
                                    <p style={{ lineHeight: 1.8, color: '#94a3b8' }}>
                                        Bu mimari, uygulamanın yaşam döngüsü boyunca sürdürülebilir, test edilebilir ve her şeyden önemlisi "ölçeklenebilir" kalmasını sağlar.
                                        Bağımlılıklar her zaman içe doğrudur: UI, Model'den haberdardır ancak Model, UI'dan tamamen bağımsızdır.
                                    </p>
                                </div>
                                <div style={{ background: 'rgba(30, 41, 59, 0.5)', padding: '2.5rem', borderRadius: '32px', border: '1px solid rgba(255,255,255,0.05)' }}>
                                    <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '1.5rem', color: '#2dd4bf' }}>Kapsam</h3>
                                    <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '1rem', color: '#94a3b8' }}>
                                        <li style={{ display: 'flex', alignItems: 'center', gap: '12px' }}><Zap size={18} color="#2dd4bf" /> React / React Native Entegrasyonu</li>
                                        <li style={{ display: 'flex', alignItems: 'center', gap: '12px' }}><Zap size={18} color="#2dd4bf" /> Zustand Global State Yönetimi</li>
                                        <li style={{ display: 'flex', alignItems: 'center', gap: '12px' }}><Zap size={18} color="#2dd4bf" /> Atomic Design UI Hiyerarşisi</li>
                                    </ul>
                                </div>
                            </div>
                        </motion.div>
                    )}
                    {/* #endregion */}

                    {/* #region LAYERS TAB */}
                    {activeTab === 'layers' && (
                        <motion.div key="layers" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                {[
                                    {
                                        label: 'SUNUM KATMANI (Presentation)',
                                        desc: 'View (Saf JSX) ve ViewModel (UI Logic) birleşimidir. Atomic Design prensipleriyle inşa edilir.',
                                        color: '#3b82f6',
                                        icon: <Layout />
                                    },
                                    {
                                        label: 'İŞ MANTIĞI KATMANI (Domain)',
                                        desc: 'UseCase\'ler, Saf Logic fonksiyonları ve Entity\'ler. Uygulamanın "ne yaptığı" burada tanımlanır. Bağımlılıksızdır.',
                                        color: '#8b5cf6',
                                        icon: <Shield />
                                    },
                                    {
                                        label: 'ALTYAPI KATMANI (Data/Infrastructure)',
                                        desc: 'Zustand Store, API Servisleri ve Mapper\'lar. Dış veri burada ehilleştirilir ve Domain modeline dönüştürülür.',
                                        color: '#ec4899',
                                        icon: <Database />
                                    }
                                ].map((layer, i) => (
                                    <div key={i} style={{
                                        display: 'flex',
                                        gap: '2rem',
                                        alignItems: 'center',
                                        background: 'rgba(30, 41, 59, 0.3)',
                                        padding: '2rem',
                                        borderRadius: '24px',
                                        border: `1px solid ${layer.color}22`,
                                        position: 'relative',
                                        overflow: 'hidden'
                                    }}>
                                        <div style={{ padding: '1.5rem', borderRadius: '16px', background: `${layer.color}11`, color: layer.color }}>
                                            {layer.icon}
                                        </div>
                                        <div>
                                            <h4 style={{ fontSize: '1.25rem', fontWeight: 800, color: layer.color, marginBottom: '0.5rem' }}>{layer.label}</h4>
                                            <p style={{ color: '#94a3b8', lineHeight: 1.6 }}>{layer.desc}</p>
                                        </div>
                                        <div style={{ position: 'absolute', right: -20, top: -20, fontSize: '8rem', fontWeight: 900, opacity: 0.03, pointerEvents: 'none' }}>
                                            {i + 1}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    )}
                    {/* #endregion */}

                    {/* #region PATTERNS TAB */}
                    {activeTab === 'patterns' && (
                        <motion.div key="patterns" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                            <div style={{ background: 'rgba(30, 41, 59, 0.5)', padding: '3rem', borderRadius: '32px', border: '1px solid rgba(255,255,255,0.05)' }}>
                                <h3 style={{ fontSize: '2rem', fontWeight: 900, marginBottom: '2rem', textAlign: 'center' }}>Result Pattern</h3>
                                <div style={{ background: '#0f172a', padding: '1.5rem', borderRadius: '16px', fontFamily: 'monospace', color: '#10b981', border: '1px solid rgba(16, 185, 129, 0.2)', marginBottom: '2rem' }}>
                                    <div style={{ color: '#64748b', marginBottom: '0.5rem' }}>// DO NOT: throw new Error()</div>
                                    <div>{"type Result<T> = { success: true; data: T } | { success: false; error: string };"}</div>
                                </div>
                                <p style={{ color: '#94a3b8', lineHeight: 1.8, textAlign: 'center' }}>
                                    Error handling'i opsiyonel değil, zorunlu hale getirir. UI her zaman başarısızlık senaryosuna hazırlıklıdır.
                                </p>
                            </div>
                        </motion.div>
                    )}
                    {/* #endregion */}

                    {/* #region ELITE TAB */}
                    {activeTab === 'elite' && (
                        <motion.div key="elite" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                                <div style={{ background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(30, 41, 59, 0) 100%)', padding: '2rem', borderRadius: '24px', border: '1px solid rgba(59, 130, 246, 0.2)' }}>
                                    <div style={{ color: '#3b82f6', marginBottom: '1rem' }}><Database size={32} /></div>
                                    <h4 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '0.5rem' }}>Data/Action Separation</h4>
                                    <p style={{ fontSize: '0.9rem', color: '#94a3b8' }}>Store state'i ve fonksiyonları ayrıştırılarak selector performansı %300 artırılır.</p>
                                </div>
                                <div style={{ background: 'linear-gradient(135deg, rgba(236, 72, 153, 0.1) 0%, rgba(30, 41, 59, 0) 100%)', padding: '2rem', borderRadius: '24px', border: '1px solid rgba(236, 72, 153, 0.2)' }}>
                                    <div style={{ color: '#ec4899', marginBottom: '1rem' }}><Volume2 size={32} /></div>
                                    <h4 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '0.5rem' }}>Multisensory Feedback</h4>
                                    <p style={{ fontSize: '0.9rem', color: '#94a3b8' }}>UI her dokunuşta ses ve haptik ile geri bildirim verir. "Living UI" felsefesi.</p>
                                </div>
                                <div style={{ background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(30, 41, 59, 0) 100%)', padding: '2rem', borderRadius: '24px', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
                                    <div style={{ color: '#10b981', marginBottom: '1rem' }}><Shield size={32} /></div>
                                    <h4 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '0.5rem' }}>Path Alias Enforcement</h4>
                                    <p style={{ fontSize: '0.9rem', color: '#94a3b8' }}>Relatif importlar yasaktır. Katmanlar arası sınır aliaslar ile korunur.</p>
                                </div>
                            </div>
                        </motion.div>
                    )}
                    {/* #endregion */}

                </div>
            </AnimatePresence>

            <section style={{ padding: '6rem 0', textAlign: 'center' }}>
                <div className="container">
                    <span style={{ fontSize: '0.8rem', letterSpacing: '4px', textTransform: 'uppercase', color: '#3b82f6', fontWeight: 900 }}>Standardized Documentation</span>
                    <h2 style={{ fontSize: '2.5rem', fontWeight: 900, marginTop: '1rem', marginBottom: '2rem' }}>Anayasaya Bağlı Kalın</h2>
                    <p style={{ maxWidth: '600px', margin: '0 auto', color: '#94a3b8', lineHeight: 1.8 }}>
                        Bu sayfa, LinguaLearn ve Etheria projelerinde kullanılan "Elite Armor" yazılım mimarisinin yaşayan referansıdır.
                        Her yeni modül bu prensipleri takip etmelidir.
                    </p>
                </div>
            </section>
        </motion.div>
    );
};

export default EliteArchitecturePage;
