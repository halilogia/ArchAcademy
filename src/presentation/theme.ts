import React from 'react';

/**
 * ArchAcademy Design System Tokens
 * Strictly follows the technical constitution: Type-Safe & Zero-Runtime oriented.
 */
export const theme = {
    colors: {
        primary: '#3b82f6',
        primaryGlow: 'rgba(59, 130, 246, 0.5)',
        bgDark: '#020617',
        surface: '#0f172a',
        surfaceLight: '#1e293b',
        textPrimary: '#f8fafc',
        textSecondary: '#94a3b8',
        accent: '#10b981',
        layers: {
            entities: '#ef4444',
            usecases: '#f59e0b',
            adapters: '#3b82f6',
            infrastructure: '#8b5cf6',
        }
    },
    effects: {
        glass: 'rgba(255, 255, 255, 0.03)',
        glassBorder: 'rgba(255, 255, 255, 0.1)',
        glassBlur: 'blur(12px)',
        noiseOpacity: 0.02,
    },
    transitions: {
        standard: 'all 0.3s ease',
        slow: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
    },
    typography: {
        main: "'Outfit', sans-serif",
    }
} as const;

/**
 * Type-safe CSS Bridge
 * Usage: style={themeStyles.glassCard}
 */
export const themeStyles = {
    glassCard: {
        background: theme.effects.glass,
        backdropFilter: theme.effects.glassBlur,
        WebkitBackdropFilter: theme.effects.glassBlur,
        border: `1px solid ${theme.effects.glassBorder}`,
        borderRadius: '24px',
        padding: '2rem',
        transition: theme.transitions.standard,
    } as React.CSSProperties,

    gradientText: {
        background: 'linear-gradient(135deg, #fff 0%, #94a3b8 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
    } as React.CSSProperties,
} as const;
