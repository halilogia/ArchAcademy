import React from 'react';
import { motion } from 'framer-motion';
import { Layers, ShieldCheck, Zap, AlertTriangle, FileCode } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const DockerfileOptimizationTab: React.FC = () => {
  const { i18n } = useTranslation();
  const isEn = (i18n.resolvedLanguage || i18n.language || 'tr').startsWith('en');

  const practices = [
    {
      title: isEn ? "1. Multi-Stage Builds (1.2GB ➔ 45MB)" : "1. Çok Aşamalı Derleme (Multi-Stage Build)",
      desc: isEn ? "Separate the heavy build SDK from the lightweight runtime. Build in Node/Golang, copy only artifacts to Alpine/Distroless." : "Ağır derleme araçlarını (SDK, Node, Maven) son imajdan ayırın. Sadece derlenen binary dosyayı hafif bir runtime imajına kopyalayın."
    },
    {
      title: isEn ? "2. Non-Root User Execution" : "2. Non-Root Güvenlik Standardı",
      desc: isEn ? "Never run as root (UID 0). Create a dedicated non-privileged user to block container escape exploits." : "Kapsayıcıyı asla root (UID 0) ile çalıştırmayın. Özel bir non-root kullanıcı oluşturup `USER appuser` ile yetkileri kısıtlayın."
    },
    {
      title: isEn ? "3. Layer Caching Order" : "3. Akıllı Katman Önbellekleme (Layer Caching)",
      desc: isEn ? "Copy `package.json` / dependency manifests first, run install, then copy source code to maximize Docker cache hits." : "Önce `package.json` kopyalayıp bağımlılıkları yükleyin, kaynak kodları en son ekleyin. Kod her değiştiğinde bağımlılıklar tekrar indirilmez."
    },
    {
      title: isEn ? "4. Distroless & Minimal Base Images" : "4. Distroless ve Alpine Taban İmajlar",
      desc: isEn ? "Eliminate shells, package managers, and unnecessary binaries (curl, bash) to reduce CVE attack surface to near zero." : "Bash, curl veya paket yöneticisi barındırmayan Distroless imajlar kullanarak saldırı yüzeyini ve CVE açıklarını sıfırlayın."
    }
  ];

  return (
    <motion.div key="dockerfile" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
      <div className="glass-card" style={{ padding: '2.5rem', marginBottom: '2rem' }}>
        <h3 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'white', marginBottom: '1rem' }}>
          {isEn ? "Production Dockerfile Optimization & Security" : "Üretim Seviyesi Dockerfile Optimizasyonu & Güvenlik"}
        </h3>
        <p style={{ color: '#94a3b8', fontSize: '1.05rem', lineHeight: 1.7, marginBottom: '2rem', maxWidth: '800px' }}>
          {isEn 
            ? "A poorly written Dockerfile produces bloated, slow, and security-vulnerable images. Applying multi-stage builds and layer caching creates enterprise-grade artifacts." 
            : "Kötü yazılmış bir Dockerfile yüzlerce megabaytlık gereksiz araç ve güvenlik açığı barındırır. Multi-stage build ile hem imaj boyutunu %95 küçültebilir hem de güvenliği zirveye çıkarabilirsiniz."
          }
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
          {practices.map((p, i) => (
            <div key={i} style={{ background: '#020617', padding: '1.5rem', borderRadius: '16px', border: '1px solid #1e293b', borderTop: '3px solid #38bdf8' }}>
              <h4 style={{ color: 'white', fontWeight: 800, fontSize: '1.1rem', marginBottom: '8px' }}>{p.title}</h4>
              <p style={{ color: '#94a3b8', fontSize: '0.85rem', lineHeight: 1.6, margin: 0 }}>{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default DockerfileOptimizationTab;
