import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

export const RobustnessCircuitBreakerSimulationTab: React.FC = () => {
  const { i18n } = useTranslation();
  const isEn = (i18n.resolvedLanguage || i18n.language || 'tr').startsWith('en');

  const [circuitState, setCircuitState] = useState<'CLOSED' | 'OPEN' | 'HALF-OPEN'>('CLOSED');
  const [failCount, setFailCount] = useState(0);
  const [logs, setLogs] = useState<string[]>([]);

  const addLog = (msg: string) => setLogs(prev => [msg, ...prev].slice(0, 6));

  const sendRequest = () => {
    if (circuitState === 'OPEN') {
      addLog('BLOCKED: Circuit is OPEN. Fast fail executed.');
      return;
    }

    const isSuccess = Math.random() > 0.6;
    addLog('Sending request to Backend Cluster...');

    setTimeout(() => {
      if (isSuccess || circuitState === 'HALF-OPEN') {
        addLog('SUCCESS: 200 OK Response received.');
        if (circuitState === 'HALF-OPEN') {
          setCircuitState('CLOSED');
          addLog('CIRCUIT CLOSED: Backend healthy again.');
          setFailCount(0);
        }
      } else {
        addLog('FAILURE: HTTP 504 Gateway Timeout.');
        const newFail = failCount + 1;
        setFailCount(newFail);

        if (newFail >= 3 && circuitState === 'CLOSED') {
          setCircuitState('OPEN');
          addLog('CIRCUIT TRIPPED (OPEN)! Threshold (3) reached.');
          
          setTimeout(() => {
            setCircuitState('HALF-OPEN');
            addLog('CIRCUIT HALF-OPEN: Sending canary test probe...');
          }, 3000);
        }
      }
    }, 500);
  };

  return (
    <motion.div key="simulation" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
      <div className="glass-card" style={{ padding: '2rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '30px', alignItems: 'center' }}>
          <div>
            <h3 style={{ color: '#f59e0b', marginBottom: '10px', fontWeight: 800 }}>
              {isEn ? "Circuit Breaker Interactive Simulator" : "Sigorta (Circuit Breaker) Simülatörü"}
            </h3>
            <p style={{ color: '#94a3b8', marginBottom: '20px', lineHeight: 1.6 }}>
              {isEn ? "State Machine Invariants:" : "Durum Makinesi Kuralları:"} <br/>
              <strong>CLOSED:</strong> {isEn ? "All green. Traffic flows freely." : "Her şey yolunda, istekler geçiyor."}<br/>
              <strong>OPEN:</strong> {isEn ? "Failure threshold exceeded! Trips circuit. Fast-fail rejects requests." : "Çok hata oldu! Sigorta attı. İstekler anında engelleniyor (Fail Fast)."}<br/>
              <strong>HALF-OPEN:</strong> {isEn ? "Cooldown timer expired. Probing cluster health." : "Bekleme süresi bitti. Tek bir deneme isteğiyle sağlık kontrolü yapılıyor."}
            </p>

            <div style={{ display: 'flex', gap: '20px' }}>
              <div style={{ flex: 1, padding: '15px', background: '#1e293b', borderRadius: '12px', border: '1px solid #334155' }}>
                <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
                  {isEn ? "Fail Count (Threshold: 3)" : "Hata Sayacı (Eşik: 3)"}
                </div>
                <div style={{ fontSize: '2rem', fontWeight: 'bold', color: failCount >= 3 ? '#ef4444' : 'white' }}>{failCount}</div>
              </div>
              <div style={{ flex: 1, padding: '15px', background: '#1e293b', borderRadius: '12px', border: '1px solid #334155' }}>
                <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
                  {isEn ? "Circuit State" : "Sigorta Durumu"}
                </div>
                <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: circuitState === 'CLOSED' ? '#22c55e' : (circuitState === 'OPEN' ? '#ef4444' : '#eab308') }}>
                  {circuitState}
                </div>
              </div>
            </div>
          </div>

          <div style={{ textAlign: 'center' }}>
            <button 
              onClick={sendRequest}
              style={{ 
                width: '100%', 
                padding: '20px', 
                background: circuitState === 'OPEN' ? '#334155' : '#f59e0b', 
                color: circuitState === 'OPEN' ? '#94a3b8' : 'black', 
                border: 'none', 
                borderRadius: '16px', 
                fontWeight: 800, 
                fontSize: '1.2rem',
                cursor: 'pointer',
                boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
                transition: 'all 0.2s'
              }}
            >
              {circuitState === 'OPEN' 
                ? (isEn ? 'REQUEST BLOCKED ⛔ (Fast Fail)' : 'İSTEK ENGELLENDİ ⛔ (Sigorta Açık)') 
                : (isEn ? 'DISPATCH REQUEST 🚀' : 'İSTEK GÖNDER 🚀')
              }
            </button>
            <div style={{ marginTop: '10px', fontSize: '0.8rem', color: '#64748b' }}>
              {isEn ? "(Simulated 60% failure rate on downstream service)" : "(Simüle edilmiş %60 hata oranı)"}
            </div>
          </div>
        </div>

        <div style={{ marginTop: '30px', padding: '15px', background: '#020617', borderRadius: '12px', height: '160px', overflowY: 'auto', fontFamily: 'monospace', fontSize: '0.9rem', border: '1px solid #1e293b' }}>
          <div style={{ fontSize: '0.75rem', color: '#64748b', marginBottom: '8px' }}>
            {isEn ? "// LIVE CIRCUIT BREAKER RUNTIME LOGS" : "// CANLI CIRCUIT BREAKER SİSTEM LOGLARI"}
          </div>
          {logs.map((l, i) => (
            <div key={i} style={{ marginBottom: '5px', color: l.includes('SUCCESS') ? '#22c55e' : (l.includes('BLOCKED') ? '#eab308' : (l.includes('FAILURE') || l.includes('TRIPPED') ? '#ef4444' : '#e2e8f0')) }}>
              &gt; {l}
            </div>
          ))}
          {logs.length === 0 && (
            <span style={{ color: '#475569' }}>
              {isEn ? "// Ready. Click button to dispatch requests..." : "// Hazır. İstek göndermek için butona tıklayın..."}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default RobustnessCircuitBreakerSimulationTab;
