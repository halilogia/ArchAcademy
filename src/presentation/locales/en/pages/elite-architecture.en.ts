import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Hero from '../components/Hero';
import { useProgress } from '../context/ProgressContext';
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
                        Ultra-fidelity software constitution inspired by the Flutter architecture guide, modernized for React and Gaming ecosystems.
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
                            { id: 'overview', label: 'Overview', icon: <Activity size={16} /> },
                            { id: 'layers', label: 'Layers', icon: <Layout size={16} /> },
                            { id: 'patterns', label: 'Patterns', icon: <Shield size={16} /> },
                            { id: 'elite', label: 'Elite Standards', icon: <Zap size={16} /> }
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
                                    <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '1.5rem', color: '#3b82f6' }}>Philosophy</h3>
                                    <p style={{ lineHeight: 1.8, color: '#94a3b8' }}>
                                        This architecture ensures the application remains sustainable, testable, and most importantly "scalable" throughout its lifecycle.
                                        Dependencies always point inward: UI knows about Model, but Model is completely independent of UI.
                                    </p>
                                </div>
                                <div style={{ background: 'rgba(30, 41, 59, 0.5)', padding: '2.5rem', borderRadius: '32px', border: '1px solid rgba(255,255,255,0.05)' }}>
                                    <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '1.5rem', color: '#2dd4bf' }}>Scope</h3>
                                    <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '1rem', color: '#94a3b8' }}>
                                        <li style={{ display: 'flex', alignItems: 'center', gap: '12px' }}><Zap size={18} color="#2dd4bf" /> React / React Native Integration</li>
                                        <li style={{ display: 'flex', alignItems: 'center', gap: '12px' }}><Zap size={18} color="#2dd4bf" /> Zustand Global State Management</li>
                                        <li style={{ display: 'flex', alignItems: 'center', gap: '12px' }}><Zap size={18} color="#2dd4bf" /> Atomic Design UI Hierarchy</li>
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
                                        label: 'PRESENTATION LAYER',
                                        desc: 'Combination of View (Pure JSX) and ViewModel (UI Logic). Built with Atomic Design principles.',
                                        color: '#3b82f6',
                                        icon: <Layout />
                                    },
                                    {
                                        label: 'BUSINESS LOGIC LAYER (Domain)',
                                        desc: 'UseCases, Pure Logic functions, and Entities. What the application "does" is defined here. Dependency-free.',
                                        color: '#8b5cf6',
                                        icon: <Shield />
                                    },
                                    {
                                        label: 'INFRASTRUCTURE LAYER (Data/Infrastructure)',
                                        desc: 'Zustand Store, API services, and Mappers. External data tamed here and converted into Domain model.',
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
