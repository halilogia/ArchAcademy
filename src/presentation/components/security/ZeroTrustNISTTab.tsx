import React from 'react';
import { motion } from 'framer-motion';
import { Shield, EyeOff, UserCheck, Fingerprint, Layers, CheckCircle2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const ZeroTrustNISTTab: React.FC = () => {
  const { i18n } = useTranslation();
  const isEn = (i18n.resolvedLanguage || i18n.language || 'tr').startsWith('en');

  const principles = [
    {
      title: isEn ? "1. Never Trust, Always Verify" : "1. Asla Güvenme, Daima Doğrula",
      desc: isEn 
        ? "Explicitly authenticate and authorize every access request based on all available data points (Identity, location, device health, service workload)." 
        : "Kurumsal ağın içinde olsa dahi hiçbir cihaza veya servise varsayılan olarak güvenilmez. Her istek kriptografik olarak doğrulanır."
    },
    {
      title: isEn ? "2. Least Privilege Access" : "2. En Az Yetki İlkesi (PoLP)",
      desc: isEn 
        ? "Limit user and service access with Just-In-Time (JIT) and Just-Enough-Access (JEA), risk-based adaptive policies, and data protection." 
        : "Servislere sadece o anki işini yapmasına yetecek minimum erişim izni (JIT / JEA) verilir."
    },
    {
      title: isEn ? "3. Assume Breach & Micro-Segmentation" : "3. İhlali Varsay ve Mikro-Segmentasyon",
      desc: isEn 
        ? "Minimize blast radius by segmenting networks, encrypting all end-to-end sessions (mTLS), and employing real-time behavioral threat detection." 
        : "Bir sunucu ele geçirilse bile saldırganın diğer sunuculara sıçramasını (Lateral Movement) engelleyen mikro-ağ duvarları."
    }
  ];

  return (
    <motion.div key="zerotrust" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
      <div className="glass-card" style={{ padding: '2.5rem', marginBottom: '2rem' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(239, 68, 68, 0.15)', color: '#f87171', padding: '6px 14px', borderRadius: '100px', fontSize: '0.8rem', fontWeight: 800, marginBottom: '1.25rem' }}>
          🛡️ NIST SP 800-207 STANDARDI
        </div>
        <h3 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'white', marginBottom: '1rem' }}>
          {isEn ? "Zero Trust Architecture (ZTA)" : "Sıfır Güven (Zero Trust) Mimarisi"}
        </h3>
        <p style={{ color: '#94a3b8', fontSize: '1.05rem', lineHeight: 1.7, marginBottom: '2rem', maxWidth: '800px' }}>
          {isEn 
            ? "Zero Trust eliminates traditional perimeter-based security ('Castle-and-Moat'). Every transaction inside or outside the firewall is treated as untrusted." 
            : "Eski 'Kale ve Hendek' (çevre güvenliği) modelini yıkar. Ağ duvarının içi veya dışı fark etmeksizin her mikroservis birbirini doğrulamak zorundadır."
          }
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
          {principles.map((p, i) => (
            <div key={i} style={{ background: '#020617', padding: '1.5rem', borderRadius: '14px', border: '1px solid #1e293b' }}>
              <h4 style={{ color: '#f87171', fontWeight: 800, marginBottom: '0.5rem', fontSize: '1.05rem' }}>{p.title}</h4>
              <p style={{ color: '#94a3b8', fontSize: '0.9rem', lineHeight: 1.6 }}>{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default ZeroTrustNISTTab;
