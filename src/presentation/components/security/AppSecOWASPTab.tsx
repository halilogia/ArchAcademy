import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Lock, AlertTriangle, Key, Terminal, FileCode } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const AppSecOWASPTab: React.FC = () => {
  const { i18n } = useTranslation();
  const isEn = (i18n.resolvedLanguage || i18n.language || 'tr').startsWith('en');

  const owaspItems = [
    {
      code: 'A01:2021',
      name: isEn ? 'Broken Access Control' : 'Bozuk Erişim Kontrolü',
      desc: isEn 
        ? 'Enforce least privilege, RBAC/ABAC at domain layer, and never trust client-side role assertions.' 
        : 'Rol tabanlı erişim kontrolünü (RBAC) frontend değil doğrudan Domain katmanında zorunlu kılın.'
    },
    {
      code: 'A02:2021',
      name: isEn ? 'Cryptographic Failures' : 'Kriptografik Hatalar & Veri Sızıntısı',
      desc: isEn 
        ? 'Encrypt sensitive data in transit (TLS 1.3) and at rest (AES-256). Salt and hash passwords using Argon2/Bcrypt.' 
        : 'Hassas verileri aktarımda (TLS 1.3) ve diskte (AES-256) şifreleyin. Şifreleri Argon2 veya Bcrypt ile hashleyin.'
    },
    {
      code: 'A03:2021',
      name: isEn ? 'Injection (SQL, NoSQL, OS)' : 'Enjeksiyon Saldırıları (SQLi / OS)',
      desc: isEn 
        ? 'Never concatenate user input directly into queries. Strictly utilize parameterized queries and ORMs.' 
        : 'Kullanıcı girdisini doğrudan SQL sorgularına birleştirmeyin; daima parametreli sorgular ve ORM kullanın.'
    },
    {
      code: 'A04:2021',
      name: isEn ? 'Insecure Design & Threat Modeling' : 'Güvensiz Tasarım ve Tehdit Modellemesi',
      desc: isEn 
        ? 'Shift-left security. Embed threat modeling (STRIDE) into the initial architectural blueprint.' 
        : 'Güvenliği en baştan mimariye entegre edin (Shift-Left). STRIDE tehdit modellemesi uygulayın.'
    }
  ];

  return (
    <motion.div key="appsec" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
        {owaspItems.map((item, idx) => (
          <div key={idx} className="glass-card" style={{ padding: '2rem', borderTop: '3px solid #ef4444' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 900, background: 'rgba(239, 68, 68, 0.15)', color: '#f87171', padding: '3px 8px', borderRadius: '6px' }}>
              {item.code}
            </span>
            <h4 style={{ color: 'white', fontWeight: 800, fontSize: '1.15rem', marginTop: '1rem', marginBottom: '0.75rem' }}>
              {item.name}
            </h4>
            <p style={{ color: '#94a3b8', fontSize: '0.9rem', lineHeight: 1.6 }}>{item.desc}</p>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default AppSecOWASPTab;
