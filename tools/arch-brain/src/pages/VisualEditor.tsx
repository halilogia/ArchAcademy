import React from 'react';
import { motion } from 'framer-motion';
import { Network, Plus, Settings } from 'lucide-react';

const VisualEditor = () => {
    return (
        <div style={{ 
            width: '100vw', 
            height: '100vh', 
            background: '#0f172a', 
            backgroundImage: 'radial-gradient(#1e293b 1px, transparent 1px)',
            backgroundSize: '40px 40px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            position: 'relative'
        }}>
            <div style={{ 
                position: 'absolute', 
                top: 20, 
                left: '50%', 
                transform: 'translateX(-50%)', 
                background: 'rgba(15, 23, 42, 0.8)',
                backdropFilter: 'blur(10px)',
                padding: '10px 20px',
                borderRadius: '12px',
                border: '1px solid #334155',
                display: 'flex',
                gap: '20px'
            }}>
                <span style={{ fontWeight: 'bold', color: '#38bdf8' }}>ArchBrain Designer</span>
                <span style={{ color: '#94a3b8' }}>|</span>
                <span style={{ color: '#94a3b8' }}>v0.1 Alpha</span>
            </div>

            <motion.div 
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                style={{ textAlign: 'center' }}
            >
                <div style={{ 
                    width: '80px', 
                    height: '80px', 
                    background: '#0ea5e9', 
                    borderRadius: '20px', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    margin: '0 auto 20px',
                    boxShadow: '0 0 40px rgba(14, 165, 233, 0.4)'
                }}>
                    <Network size={40} color="white" />
                </div>
                <h1 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '10px' }}>Design Your Architecture</h1>
                <p style={{ color: '#94a3b8', maxWidth: '500px', lineHeight: 1.6 }}>
                    The future "Forward Engineering" canvas. Drag & Drop services, entities, and let ArchBrain generate the code.
                </p>

                <div style={{ marginTop: '40px', display: 'flex', gap: '15px', justifyContent: 'center' }}>
                    <button style={{ 
                        padding: '12px 24px', 
                        background: '#38bdf8', 
                        color: '#0f172a', 
                        border: 'none', 
                        borderRadius: '8px', 
                        fontWeight: 'bold',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px'
                    }}>
                        <Plus size={18} /> New Service
                    </button>
                    <button style={{ 
                        padding: '12px 24px', 
                        background: 'rgba(255,255,255,0.05)', 
                        color: 'white', 
                        border: '1px solid #334155', 
                        borderRadius: '8px', 
                        fontWeight: 'bold',
                        cursor: 'pointer'
                    }}>
                        Load Template
                    </button>
                </div>
            </motion.div>
        </div>
    );
};

export default VisualEditor;
