import React from 'react';
import { motion } from 'framer-motion';
import { GitBranch, Code2, RefreshCw } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import ArchHero from '../components/ArchHero';
import SEO from '../components/SEO';
import { GitOpsPipelineStepper } from '../components/gitops/GitOpsPipelineStepper';
import { GitOpsReferenceFooter } from '../components/gitops/GitOpsReferenceFooter';

const GitOpsPage: React.FC = () => {
  const { i18n } = useTranslation();
  const isEn = (i18n.resolvedLanguage || i18n.language || 'tr').startsWith('en');

  return (
    <>
      <SEO
        title={isEn ? "GitOps & Infrastructure as Code (IaC) | ArchAcademy" : "GitOps ve Infrastructure as Code (IaC) | ArchAcademy"}
        description={isEn 
          ? "Master GitOps principles, declarative cloud infrastructure, automated reconciliation with ArgoCD/Flux, and Git Single Source of Truth." 
          : "Operasyonel süreçlerin Git üzerinden 'Infrastructure as Code' prensibiyle yönetilmesi ve GitOps standartları rehberi."
        }
        keywords="gitops, iac, infrastructure as code, argocd, fluxcd, opengitops, kubernetes"
        canonicalUrl="/gitops"
      />
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ background: 'var(--bg-dark)', minHeight: '100vh' }}>
        <ArchHero 
          title="GitOps"
          subtitle={isEn ? "& IaC Core" : "& IaC"}
          description={isEn 
            ? "Managing operational infrastructure declaratively using Git as the Single Source of Truth (SSOT) with continuous automated reconciliation." 
            : "Operasyonel süreçlerin manuel değil, Git üzerinden 'Infrastructure as Code' prensibiyle yönetilmesi. Git tek gerçeklik kaynağıdır (SSOT)."
          }
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
            { icon: <GitBranch />, title: isEn ? 'Version Control' : 'Versiyon Kontrolü', desc: isEn ? 'Track, review, and rollback infrastructure changes identically to source code.' : 'Sunucu değişikliklerini de kod gibi versiyonlayın ve geri alın.' },
            { icon: <Code2 />, title: isEn ? 'Declarative State' : 'Deklaratif Tanım', desc: isEn ? 'Define what the system should look like (Desired State) rather than manual scripts.' : 'Nasıl yapılacağını değil, ne olması gerektiğini (Desired State) tanımlayın.' },
            { icon: <RefreshCw />, title: isEn ? 'Self-Healing' : 'Otomatik İyileştirme', desc: isEn ? 'If live drift occurs, reconcilers auto-correct the environment to match Git.' : 'Canlı ortam bozulursa, sistem Git\'e bakarak kendini otomatik düzeltir.' }
          ]}
        />

        <GitOpsPipelineStepper />
        <GitOpsReferenceFooter />
      </motion.div>
    </>
  );
};

export default GitOpsPage;
