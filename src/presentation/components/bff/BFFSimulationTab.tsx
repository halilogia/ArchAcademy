import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Smartphone, Monitor, Shuffle } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const BFFSimulationTab: React.FC = () => {
  const { i18n } = useTranslation();
  const isEn = (i18n.resolvedLanguage || i18n.language || 'tr').startsWith('en');

  const [requestType, setRequestType] = useState<'mobile' | 'web' | null>(null);
  const [response, setResponse] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const fetchData = (type: 'mobile' | 'web') => {
    if (loading) return;
    setRequestType(type);
    setLoading(true);
    setResponse(null);

    setTimeout(() => {
      if (type === 'mobile') {
        setResponse({
          screen: "Home",
          data: { title: "Welcome", unread: 5 },
          size: "2KB"
        });
      } else {
        setResponse({
          page: "Dashboard",
          user: { name: "John Doe", role: "Admin", lastLogin: "Today" },
          analytics: { visits: 1200, bounce: "20%" },
          news: ["Update 1", "Update 2"],
          size: "45KB"
        });
      }
      setLoading(false);
    }, 1500);
  };

  return (
    <motion.div
      key="simulation"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
          {isEn 
            ? "Send a request from either client platform and watch how the BFF shapes the downstream JSON payload specifically for that viewport." 
            : "Aşağıdaki clientlardan birinden istek gönderin ve BFF'in yanıtı nasıl şekillendirdiğini (Response Shaping) görün."
          }
        </p>
        <div style={{ display: 'flex', gap: '30px', justifyContent: 'center' }}>
          {/* Mobile Client Button */}
          <button 
            onClick={() => fetchData('mobile')}
            disabled={loading}
            className="btn-bounce"
            style={{ 
              background: requestType === 'mobile' ? '#3b82f6' : 'rgba(59, 130, 246, 0.1)', 
              border: '2px solid #3b82f6',
              borderRadius: '20px',
              padding: '20px',
              cursor: 'pointer',
              color: requestType === 'mobile' ? 'white' : '#3b82f6',
              width: '150px',
              opacity: loading && requestType !== 'mobile' ? 0.3 : 1
            }}
          >
            <Smartphone size={40} style={{ marginBottom: '10px' }} />
            <div style={{ fontWeight: 800 }}>MOBILE APP</div>
          </button>

          {/* Web Client Button */}
          <button 
            onClick={() => fetchData('web')}
            disabled={loading}
            className="btn-bounce"
            style={{ 
              background: requestType === 'web' ? '#eab308' : 'rgba(234, 179, 8, 0.1)', 
              border: '2px solid #eab308',
              borderRadius: '20px',
              padding: '20px',
              cursor: 'pointer',
              color: requestType === 'web' ? 'black' : '#eab308',
              width: '150px',
              opacity: loading && requestType !== 'web' ? 0.3 : 1
            }}
          >
            <Monitor size={40} style={{ marginBottom: '10px' }} />
            <div style={{ fontWeight: 800 }}>WEB DASHBOARD</div>
          </button>
        </div>
      </div>

      {/* The Result Container */}
      <AnimatePresence mode="wait">
        {loading && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            style={{ textAlign: 'center', margin: '3rem 0', color: '#94a3b8' }}
          >
            <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1 }} style={{ display: 'inline-block' }}>
              <Shuffle size={30} />
            </motion.div>
            <div style={{ marginTop: '10px' }}>
              {requestType === 'mobile' 
                ? (isEn ? 'Mobile BFF aggregating & trimming downstream services...' : 'Mobile BFF verileri birleştirip optimize ediyor...') 
                : (isEn ? 'Web BFF querying full enterprise schemas...' : 'Web BFF yetkileri ve analitik verilerini derliyor...')
              }
            </div>
          </motion.div>
        )}

        {response && !loading && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-card"
            style={{ 
              maxWidth: '600px', 
              margin: '0 auto', 
              borderTop: `4px solid ${requestType === 'mobile' ? '#3b82f6' : '#eab308'}`,
              background: '#020617'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '1rem' }}>
              <div style={{ fontWeight: 800, color: 'white' }}>JSON Response Payload</div>
              <div style={{ 
                background: requestType === 'mobile' ? '#10b981' : '#f43f5e', 
                color: 'white', padding: '2px 8px', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 800 
              }}>
                SIZE: {response.size}
              </div>
            </div>
            <pre style={{ color: '#cbd5e1', fontFamily: 'monospace', fontSize: '0.9rem', lineHeight: 1.5 }}>
              {JSON.stringify(response, null, 2)}
            </pre>
            <div style={{ marginTop: '1rem', fontSize: '0.8rem', color: '#64748b', fontStyle: 'italic', textAlign: 'center' }}>
              {requestType === 'mobile' 
                ? (isEn ? "Mobile BFF returned a razor-sharp 2KB payload with zero superfluous fields." : "Mobile BFF sadece tek bir basit obje döndü. Resim yok, gereksiz detay yok.")
                : (isEn ? "Web BFF aggregated 45KB containing analytics, permission matrix, and full table views." : "Web BFF, admin paneli için tüm detayları ve analitik verilerini döndü.")
              }
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default BFFSimulationTab;
