import { motion } from 'framer-motion';

export interface ContentLoadingProps {
  rows?: number;
  isEn: boolean;
  label?: string;
}

export const ContentLoading: React.FC<ContentLoadingProps> = ({ rows = 6, isEn, label }) => (
  <div
    data-testid="cms-content-loading"
    role="status"
    aria-busy="true"
    aria-label={label ?? (isEn ? 'Loading content' : 'İçerik yükleniyor')}
    style={{ display: 'flex', flexDirection: 'column', gap: '1rem', padding: '3rem 0' }}
  >
    {Array.from({ length: rows }, (_, index) => (
      <motion.div
        key={index}
        initial={{ opacity: 0.25 }}
        animate={{ opacity: [0.25, 0.6, 0.25] }}
        transition={{ duration: 1.6, repeat: Infinity, delay: index * 0.12 }}
        style={{
          height: 76,
          borderRadius: '16px',
          background: 'rgba(255,255,255,0.04)',
          border: '1px solid var(--glass-border)'
        }}
      />
    ))}
    <span style={{ position: 'absolute', width: 1, height: 1, overflow: 'hidden', clip: 'rect(0 0 0 0)' }}>
      {label ?? (isEn ? 'Loading content' : 'İçerik yükleniyor')}
    </span>
  </div>
);

export interface ContentErrorProps {
  message: string;
  isEn: boolean;
  onRetry?: () => void;
}

export const ContentError: React.FC<ContentErrorProps> = ({ message, isEn, onRetry }) => (
  <div
    data-testid="cms-content-error"
    role="alert"
    style={{
      padding: '2.5rem',
      textAlign: 'center',
      color: '#f87171',
      background: 'rgba(239,68,68,0.06)',
      border: '1px solid rgba(239,68,68,0.25)',
      borderRadius: '16px'
    }}
  >
    <p style={{ margin: 0, fontSize: '0.9rem', fontWeight: 600 }}>
      {isEn ? 'This content could not be loaded.' : 'Bu içerik yüklenemedi.'}
    </p>
    <p style={{ margin: '0.4rem 0 0', fontSize: '0.75rem', opacity: 0.7 }}>{message}</p>
    {onRetry && (
      <button
        type="button"
        onClick={onRetry}
        style={{
          marginTop: '1rem',
          padding: '8px 18px',
          borderRadius: '10px',
          border: '1px solid rgba(239,68,68,0.4)',
          background: 'transparent',
          color: '#f87171',
          fontWeight: 700,
          fontSize: '0.78rem',
          cursor: 'pointer'
        }}
      >
        {isEn ? 'Retry' : 'Tekrar dene'}
      </button>
    )}
  </div>
);
