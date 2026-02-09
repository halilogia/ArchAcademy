import { typography } from './typography';

/**
 * ArchAcademy Design System Tokens
 * Strictly follows the technical constitution: Type-Safe & Zero-Runtime oriented.
 */
export const theme = {
    colors: {
        primary: '#3B82F6',
        primaryGlow: 'rgba(59, 130, 246, 0.5)',
        bgDark: '#020617',
        surface: '#0f172a',
        surfaceLight: '#1e293B',
        textPrimary: '#F8FAFC',
        textSecondary: '#94A3B8',
        accent: '#10B981',
        layers: {
            entities: '#EF4444',
            usecases: '#F59E0B',
            adapters: '#3B82F6',
            infrastructure: '#8B5CF6',
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
    typography: typography
} as const;


