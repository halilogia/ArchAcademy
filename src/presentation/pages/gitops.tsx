import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { GitBranch, Code2, Server, Cloud, RefreshCw } from 'lucide-react';
import ArchHero from '../components/ArchHero';

const GitOpsPage = () => {
  const [activeTab, setActiveTab] = useState(0);

  const steps = [
    { title: 'Code', icon: <Code2 />, desc: 'Geliştirici kodu yazar ve Git\'e gönderir.' },
    { title: 'Config', icon: <Server />, desc: 'Altyapı (Kubernetes YAML vb.) da kod olarak Git\'te durur.' },
    { title: 'Sync', icon: <RefreshCw />, desc: 'ArgoCD/Flux, Git ile canlı sistemi sürekli senkronize eder.' },
    { title: 'Live', icon: <Cloud />, desc: 'Canlı ortam, Git reposunun birebir yansımasıdır (Mirror).' }
  ];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ background: 'var(--bg-dark)', minHeight: '100vh' }}>
      <ArchHero 
        title="GitOps"
        subtitle="& IaC"
        description="Operasyonel süreçlerin manuel değil, Git üzerinden 'Infrastructure as Code' prensibiyle yönetilmesi. Git tek gerçeklik kaynağıdır (SSOT)."
        badge="Cloud Operation"
        color="#f97316"
        illustration={
          <div style={{ position: 'relative', width: '300px', height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
             <motion.div 
               animate={{ rotate: 360 }}
               transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
               style={{ width: '200px', height: '200px', border: '2px dashed #f97316', borderRadius: '50%', position: 'absolute' }}
             />
             <div style={{ background: '#f97316', color: '#0f172a', padding: '20px', borderRadius: '12px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '10px' }}>
               <GitBranch size={32} />
               GIT
             </div>
             <motion.div
               animate={{ x: [0, 80, 0], y: [0, 80, 0], scale: [1, 0.5, 1] }}
               transition={{ duration: 4, repeat: Infinity }}
               style={{ position: 'absolute', width: '20px', height: '20px', background: 'white', borderRadius: '50%', top: '40px', left: '40px' }}
             />
          </div>
        }
        features={[
          { icon: <GitBranch />, title: 'Version Control', desc: 'Sunucu değişikliklerini de kod gibi versiyonlayın ve geri alın.' },
          { icon: <Code2 />, title: 'Declarative', desc: 'Nasıl yapılacağını değil, ne olması gerektiğini (Desired State) tanımlayın.' },
          { icon: <RefreshCw />, title: 'Auto Healing', desc: 'Canlı ortam bozulursa, sistem Git\'e bakarak kendini otomatik düzeltir.' }
        ]}
      />

      <section style={{ padding: '80px 0' }}>
        <div className="container">
           <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxWidth: '800px', margin: '0 auto' }}>
              {steps.map((step, i) => (
                <div key={i} style={{ textAlign: 'center', position: 'relative' }}>
                   <motion.div 
                     whileHover={{ scale: 1.1, color: '#f97316' }}
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
                   <h3 style={{ fontSize: '1.2rem', color: activeTab === i ? 'white' : '#64748b' }}>{step.title}</h3>
                   {i < steps.length - 1 && (
                     <div style={{ position: 'absolute', top: '40px', left: '100%', width: '120px', height: '2px', background: '#334155', transform: 'translateY(-50%)', zIndex: -1 }} />
                   )}
                </div>
              ))}
           </div>
           
           <div className="glass-card" style={{ maxWidth: '800px', margin: '3rem auto', padding: '3rem', textAlign: 'center' }}>
              <h3 style={{ color: '#f97316', fontSize: '1.5rem', marginBottom: '1rem' }}>{steps[activeTab].title} Aşaması</h3>
              <p style={{ fontSize: '1.2rem', color: '#cbd5e1' }}>{steps[activeTab].desc}</p>
           </div>
        </div>
      </section>

      <section style={{ padding: '4rem 0', background: 'rgba(0,0,0,0.3)', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <div className="container" style={{ textAlign: 'center' }}>
           <div style={{ 
             background: 'linear-gradient(180deg, rgba(15, 23, 42, 0) 0%, rgba(15, 23, 42, 0.5) 100%)', 
             padding: '3rem', 
             borderRadius: '24px', 
             border: '1px solid rgba(255,255,255,0.05)',
             maxWidth: '900px',
             margin: '0 auto'
           }}>
              <div style={{ fontSize: '0.8rem', letterSpacing: '2px', fontWeight: 800, color: 'rgba(255,255,255,0.4)', marginBottom: '1rem', textTransform: 'uppercase' }}>
                CNCF Project
              </div>
              <p style={{ color: '#94a3b8', marginBottom: '2rem', fontSize: '1.1rem', lineHeight: 1.6 }}>
                GitOps prensipleri, Cloud Native Computing Foundation (CNCF) altındaki OpenGitOps çalışma grubu tarafından belirlenen standartlara dayanır.
              </p>
              
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                 <a 
                   href="https://opengitops.dev/" 
                   target="_blank" 
                   rel="noopener noreferrer"
                   style={{ 
                     display: 'flex', alignItems: 'center', gap: '8px', 
                     background: 'rgba(249, 115, 22, 0.15)', color: '#fdba74', 
                     padding: '12px 24px', borderRadius: '12px', textDecoration: 'none', fontWeight: 600,
                     border: '1px solid rgba(249, 115, 22, 0.2)', transition: 'all 0.2s'
                   }}
                 >
                    OpenGitOps.dev <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                 </a>
              </div>
           </div>
        </div>
      </section>
    </motion.div>
  );
};
export default GitOpsPage;
