import React from 'react';
import { motion } from 'framer-motion';
import { XCircle, RefreshCw } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const RobustnessConceptTab: React.FC = () => {
  const { i18n } = useTranslation();
  const isEn = (i18n.resolvedLanguage || i18n.language || 'tr').startsWith('en');

  return (
    <motion.div key="concept" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
      <div>
        <h3 style={{ fontSize: '2rem', color: '#f59e0b', marginBottom: '1.5rem', fontWeight: 800 }}>
          {isEn ? "Anti-Fragile Architecture" : "Anti-Fragile Tasarım Felsefesi"}
        </h3>
        <p style={{ lineHeight: 1.6, color: '#c0cbed' }}>
          {isEn 
            ? "The biggest fallacy in distributed software engineering is assuming 'the network is always reliable'. Robust systems are explicitly engineered assuming every single dependency can and will fail." 
            : "Yazılımda en büyük yanılgı 'Network her zaman güvenilirdir' varsayımıdır. Robust mimariler, her servisin her an çökebileceği gerçeği üzerine kurulur."
          }
        </p>
        <h4 style={{ color: 'white', marginTop: '20px', marginBottom: '10px', fontWeight: 700 }}>
          {isEn ? "Core Defense Mechanisms" : "Savunma Mekanizmaları"}
        </h4>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          <li style={{ marginBottom: '15px', display: 'flex', gap: '10px', background: 'rgba(255,255,255,0.05)', padding: '10px', borderRadius: '8px' }}>
            <XCircle color="#ef4444" />
            <div>
              <strong style={{ display: 'block', color: 'white' }}>{isEn ? "Fail Fast" : "Hızlı Hata Dönme (Fail Fast)"}</strong>
              <span style={{ fontSize: '0.85rem', color: '#94a3b8' }}>
                {isEn 
                  ? "If a downstream service is dead, return an immediate fallback error instead of locking user threads for 30 seconds." 
                  : "Bir servis cevap vermiyorsa, kullanıcıyı 30 saniye bekletmek yerine anında hata döndür."
                }
              </span>
            </div>
          </li>
          <li style={{ marginBottom: '15px', display: 'flex', gap: '10px', background: 'rgba(255,255,255,0.05)', padding: '10px', borderRadius: '8px' }}>
            <RefreshCw color="#eab308" />
            <div>
              <strong style={{ display: 'block', color: 'white' }}>{isEn ? "Retry with Exponential Backoff" : "Gecikmeli Tekrar (Retry Backoff)"}</strong>
              <span style={{ fontSize: '0.85rem', color: '#94a3b8' }}>
                {isEn 
                  ? "Encountered a network hiccup? Wait 1s and retry. Still failing? Wait 2s, then 4s with randomized jitter." 
                  : "Hata aldın mı? 1sn bekle, tekrar dene. Yine mi hata? 2sn bekle. Sonra 4sn..."
                }
              </span>
            </div>
          </li>
        </ul>
      </div>

      <div className="glass-card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #f59e0b', background: 'rgba(245, 158, 11, 0.05)', padding: '2rem' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '4rem', fontWeight: 900, color: '#f59e0b', opacity: 0.2 }}>99.99%</div>
          <h3 style={{ color: 'white', fontWeight: 800 }}>{isEn ? "Resilience SLA Target" : "SLA ve Dayanıklılık"}</h3>
          <p style={{ color: '#cbd5e1', maxWidth: '300px', margin: '10px auto', lineHeight: 1.6 }}>
            {isEn 
              ? "Like Netflix's Chaos Monkey, intentionally inject faults into your cluster. If the system survives, it is production-ready." 
              : "Netflix'in 'Chaos Monkey'i gibi, sisteminizi bilerek bozun. Ayakta kalıyorsa, gerçek dünyada da dayanıklıdır."
            }
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default RobustnessConceptTab;
