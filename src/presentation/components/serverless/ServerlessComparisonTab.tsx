import React from 'react';
import { motion } from 'framer-motion';
import { Server, Zap } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const ServerlessComparisonTab: React.FC = () => {
  const { i18n } = useTranslation();
  const isEn = (i18n.resolvedLanguage || i18n.language || 'tr').startsWith('en');

  return (
    <motion.div
      key="comparison"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem' }}>
        <div className="glass-card">
          <h3 style={{ fontSize: '1.4rem', color: '#94a3b8', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Server /> {isEn ? "Traditional Infrastructure (EC2 / VM / VPS)" : "Traditional (EC2/VPS)"}
          </h3>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
            {isEn 
              ? "You rent 24/7 static compute instances. Even at 0% CPU utilization, you pay the full monthly hardware rent." 
              : "7/24 çalışan bir sunucu kiralarsınız. Kullanmasanız da kirasını ödersiniz."
            }
          </p>
          <ul style={{ paddingLeft: '1.5rem', color: '#94a3b8', lineHeight: 1.8 }}>
            <li>💸 <strong>{isEn ? "Idle Waste:" : "Boşa Harcama:"}</strong> {isEn ? "Paying full price at 3 AM when zero users visit." : "Gece 3'te kimse girmese de sunucu parası ödersiniz."}</li>
            <li>🔧 <strong>{isEn ? "Ops Burden:" : "Bakım Yükü:"}</strong> {isEn ? "You manage OS patching, security hardening, and disk rotation." : "OS güncellemeleri, güvenlik yamaları size aittir."}</li>
            <li>🐌 <strong>{isEn ? "Slow Scaling:" : "Yavaş Ölçeklenme:"}</strong> {isEn ? "Spinning up new VM instances takes minutes during unexpected surges." : "Trafik artınca yeni sunucu açmak dakikalar sürer."}</li>
          </ul>
        </div>
        
        <div className="glass-card" style={{ borderTop: '4px solid #a855f7' }}>
          <h3 style={{ fontSize: '1.4rem', color: '#a855f7', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Zap /> {isEn ? "Serverless Compute (FaaS / Lambda)" : "Serverless (Lambda)"}
          </h3>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
            {isEn 
              ? "No server provisioning. Ephemeral container runtimes spin up on trigger, execute payload, and terminate." 
              : "Sunucu yoktur. Sadece fonksiyonlar vardır. İstek gelince uyanır, işini yapar ve ölür."
            }
          </p>
          <ul style={{ paddingLeft: '1.5rem', color: 'var(--text-secondary)', lineHeight: 1.8 }}>
            <li style={{ color: '#10b981' }}>✅ <strong>{isEn ? "Zero Cost at Zero Load:" : "Tasarruf:"}</strong> {isEn ? "If traffic drops to zero, billing is strictly $0.00." : "Kimse girmezse fatura $0."}</li>
            <li style={{ color: '#10b981' }}>✅ <strong>{isEn ? "Zero Server Maintenance:" : "Sıfır Bakım:"}</strong> {isEn ? "Underlying hypervisors, security patches handled by the cloud vendor." : "Altyapı yönetimi tamamen AWS/Google'dadır."}</li>
            <li style={{ color: '#f59e0b' }}>⚠️ <strong>{isEn ? "Cold Start Latency:" : "Cold Start:"}</strong> {isEn ? "Booting cold function containers on first request can introduce a 1-2s latency penalty." : "Fonksiyon uzun süre çalışmazsa, ilk istekte uyanması 1-2 saniye sürebilir."}</li>
          </ul>
        </div>
      </div>
    </motion.div>
  );
};

export default ServerlessComparisonTab;
