import React from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';
import { motion } from 'framer-motion';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Uncaught error:", error, errorInfo);
    this.setState({ error, errorInfo });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ 
          minHeight: '70vh', 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          justifyContent: 'center',
          textAlign: 'center',
          padding: '2rem'
        }}>
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="glass-card"
            style={{ 
              maxWidth: '600px', 
              padding: '3rem', 
              border: '1px solid rgba(239, 68, 68, 0.3)',
              background: 'rgba(239, 68, 68, 0.05)'
            }}
          >
            <div style={{ 
              background: 'rgba(239, 68, 68, 0.1)', 
              padding: '20px', 
              borderRadius: '50%', 
              display: 'inline-flex',
              marginBottom: '2rem'
            }}>
              <AlertTriangle size={48} color="#ef4444" />
            </div>
            
            <h2 style={{ fontSize: '2rem', marginBottom: '1rem', color: '#ef4444' }}>
              Oops! Something went wrong.
            </h2>
            
            <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', lineHeight: 1.6 }}>
              Merak etme, bu bir <strong>Isolated Failure</strong> (İzole Hata). 
              Clean Architecture prensipleri sayesinde bu hata uygulamanın geri kalanını etkilemedi.
              Sadece bu modül geçici olarak devre dışı kaldı.
            </p>

            <div style={{ 
              background: '#0f172a', 
              padding: '1rem', 
              borderRadius: '8px', 
              marginBottom: '2rem',
              textAlign: 'left',
              fontSize: '0.85rem',
              fontFamily: 'monospace',
              color: '#ef4444',
              overflow: 'hidden',
              textOverflow: 'ellipsis'
            }}>
              {this.state.error && this.state.error.toString()}
            </div>

            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                <button 
                  onClick={() => window.location.reload()}
                  style={{
                    background: '#ef4444',
                    color: 'white',
                    padding: '12px 24px',
                    borderRadius: '12px',
                    border: 'none',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex', alignItems: 'center', gap: '8px'
                  }}
                >
                  <RefreshCw size={18} /> Sayfayı Yenile
                </button>
                
                <button 
                  onClick={() => window.location.href = '/'}
                  style={{
                    background: 'rgba(255,255,255,0.1)',
                    color: 'white',
                    padding: '12px 24px',
                    borderRadius: '12px',
                    border: '1px solid var(--glass-border)',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex', alignItems: 'center', gap: '8px'
                  }}
                >
                  <Home size={18} /> Ana Sayfaya Dön
                </button>
            </div>
          </motion.div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
