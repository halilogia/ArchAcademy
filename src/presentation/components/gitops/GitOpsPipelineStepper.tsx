import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Code2, Server, RefreshCw, Cloud } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const GitOpsPipelineStepper: React.FC = () => {
  const { i18n } = useTranslation();
  const isEn = (i18n.resolvedLanguage || i18n.language || 'tr').startsWith('en');
  const [activeTab, setActiveTab] = useState(0);

  const steps = [
    { 
      title: isEn ? 'Code' : 'Kod', 
      icon: <Code2 />, 
      desc: isEn ? 'Developer writes application code and commits declarative manifests to Git.' : 'Geliştirici kodu yazar ve Git\'e gönderir.' 
    },
    { 
      title: isEn ? 'Config' : 'Yapılandırma', 
      icon: <Server />, 
      desc: isEn ? 'Target infrastructure (Kubernetes YAML, Terraform) is stored declaratively as code in Git.' : 'Altyapı (Kubernetes YAML vb.) da kod olarak Git\'te durur.' 
    },
    { 
      title: isEn ? 'Sync' : 'Senkronizasyon', 
      icon: <RefreshCw />, 
      desc: isEn ? 'Reconciliation agents (ArgoCD / Flux) continuously compare and synchronize Git state with cluster.' : 'ArgoCD/Flux, Git ile canlı sistemi sürekli senkronize eder.' 
    },
    { 
      title: isEn ? 'Live' : 'Canlı Sistem', 
      icon: <Cloud />, 
      desc: isEn ? 'Live production environment is an immutable mirror of the Git source repository.' : 'Canlı ortam, Git reposunun birebir yansımasıdır (Mirror).' 
    }
  ];

  return (
    <section style={{ padding: '80px 0' }}>
      <div className="container">
         <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxWidth: '800px', margin: '0 auto', flexWrap: 'wrap', gap: '1.5rem' }}>
            {steps.map((step, i) => (
              <div key={i} style={{ textAlign: 'center', position: 'relative', flex: 1 }}>
                 <motion.div 
                   whileHover={{ scale: 1.1, color: '#f97316' }}
                   onClick={() => setActiveTab(i)}
                   onHoverStart={() => setActiveTab(i)}
                   style={{ 
                     width: '80px', height: '80px', 
                     borderRadius: '50%', 
                     background: activeTab === i ? 'rgba(249, 115, 22, 0.2)' : 'rgba(255,255,255,0.05)',
                     border: `2px solid ${activeTab === i ? '#f97316' : '#334155'}`,
                     display: 'flex', alignItems: 'center', justifyContent: 'center',
                     margin: '0 auto 1rem',
                     cursor: 'pointer',
                     color: activeTab === i ? '#f97316' : '#94a3b8',
                     transition: 'all 0.3s'
                   }}
                 >
                   {step.icon}
                 </motion.div>
                 <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: activeTab === i ? 'white' : '#64748b' }}>{step.title}</h3>
                 {i < steps.length - 1 && (
                   <div style={{ position: 'absolute', top: '40px', left: '100%', width: '100%', height: '2px', background: '#334155', transform: 'translateY(-50%)', zIndex: -1 }} />
                 )}
              </div>
            ))}
         </div>
         
         <div className="glass-card" style={{ maxWidth: '800px', margin: '3rem auto 0', padding: '3rem', textAlign: 'center' }}>
            <h3 style={{ color: '#f97316', fontSize: '1.5rem', marginBottom: '1rem', fontWeight: 800 }}>
              {steps[activeTab].title} {isEn ? "Phase" : "Aşaması"}
            </h3>
            <p style={{ fontSize: '1.2rem', color: '#cbd5e1', lineHeight: 1.8 }}>{steps[activeTab].desc}</p>
         </div>
      </div>
    </section>
  );
};

export default GitOpsPipelineStepper;
