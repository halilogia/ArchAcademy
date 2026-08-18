import React from 'react';
import { motion } from 'framer-motion';
import { Construction, Sparkles, ArrowLeft, Clock, Hammer } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

interface WorkInProgressViewProps {
  title: { tr: string; en: string };
  subtitle: { tr: string; en: string };
  estimatedRelease?: string;
  badge?: string;
  color?: string;
}

export const WorkInProgressView: React.FC<WorkInProgressViewProps> = ({
  title,
  subtitle,
  estimatedRelease = "v2.5 Next Release",
  badge = "WORK IN PROGRESS",
  color = "#f59e0b"
}) => {
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  const isEn = (i18n.resolvedLanguage || i18n.language || 'tr').startsWith('en');

  return (
    <div style={{
      minHeight: '100vh',
      background: 'radial-gradient(ellipse at center, #090d16 0%, #020617 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Background Decorative Glow */}
      <div style={{
        position: 'absolute',
        width: '400px',
        height: '400px',
        background: `radial-gradient(circle, ${color}22 0%, transparent 70%)`,
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        pointerEvents: 'none'
      }} />

      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        style={{
          maxWidth: '680px',
          width: '100%',
          background: '#090d16',
          borderRadius: '28px',
          padding: '3.5rem 2.5rem',
          border: '1px solid #1e293b',
          borderTop: `4px solid ${color}`,
          textAlign: 'center',
          boxShadow: '0 20px 50px rgba(0,0,0,0.6)',
          position: 'relative',
          zIndex: 1
        }}
      >
        {/* Animated Construction Icon */}
        <motion.div
          animate={{ rotate: [0, -10, 10, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            width: '90px',
            height: '90px',
            borderRadius: '24px',
            background: `${color}15`,
            border: `2px solid ${color}44`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1.75rem',
            boxShadow: `0 0 30px ${color}22`
          }}
        >
          <Construction size={44} color={color} />
        </motion.div>

        {/* Badge */}
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          background: `${color}15`,
          color: color,
          padding: '6px 16px',
          borderRadius: '100px',
          fontSize: '0.8rem',
          fontWeight: 800,
          letterSpacing: '1px',
          marginBottom: '1.25rem',
          border: `1px solid ${color}33`
        }}>
          <Clock size={14} />
          {badge}
        </div>

        {/* Title */}
        <h1 style={{
          fontSize: 'clamp(2rem, 4vw, 2.6rem)',
          fontWeight: 900,
          color: 'white',
          letterSpacing: '-0.5px',
          marginBottom: '1rem'
        }}>
          {isEn ? title.en : title.tr}
        </h1>

        {/* Subtitle / Description */}
        <p style={{
          color: '#94a3b8',
          fontSize: '1.1rem',
          lineHeight: 1.7,
          marginBottom: '2.5rem',
          maxWidth: '540px',
          margin: '0 auto 2.5rem'
        }}>
          {isEn ? subtitle.en : subtitle.tr}
        </p>

        {/* Status Box */}
        <div style={{
          background: '#020617',
          padding: '1rem 1.5rem',
          borderRadius: '16px',
          border: '1px solid #1e293b',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '12px',
          marginBottom: '2.5rem'
        }}>
          <Sparkles size={18} color={color} />
          <span style={{ color: '#cbd5e1', fontSize: '0.9rem', fontWeight: 600 }}>
            {isEn ? "Target Release:" : "Planlanan Sürüm:"} <strong style={{ color: 'white' }}>{estimatedRelease}</strong>
          </span>
        </div>

        {/* Actions */}
        <div>
          <button
            onClick={() => navigate(-1)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '12px 28px',
              borderRadius: '14px',
              background: '#1e293b',
              color: 'white',
              border: '1px solid rgba(255,255,255,0.1)',
              fontWeight: 800,
              fontSize: '0.95rem',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            <ArrowLeft size={18} />
            {isEn ? "Go Back" : "Geri Dön"}
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default WorkInProgressView;
