import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Box, Server, ShieldCheck, Zap, Layers, Network, Activity, BookOpen } from 'lucide-react';
import ArchHero from '../components/ArchHero';
import SEO from '../components/SEO';
import { ContainerFundamentalsTab } from '../components/containerization/ContainerFundamentalsTab';
import { DockerfileOptimizationTab } from '../components/containerization/DockerfileOptimizationTab';
import { KubernetesOrchestrationTab } from '../components/containerization/KubernetesOrchestrationTab';
import { ContainerLifecycleSimulationTab } from '../components/containerization/ContainerLifecycleSimulationTab';

const ContainerizationPage: React.FC = () => {
  const { i18n } = useTranslation();
  const isEn = (i18n.resolvedLanguage || i18n.language || 'tr').startsWith('en');
  const [activeTab, setActiveTab] = useState<'fundamentals' | 'dockerfile' | 'k8s' | 'simulation'>('fundamentals');

  return (
    <>
      <SEO
        title={isEn ? "Containerization & Kubernetes Architecture Masterclass | ArchAcademy" : "Kapsayıcı ve Kubernetes Mimarisi Masterclass | ArchAcademy"}
        description={isEn 
          ? "Master Docker containerization, multi-stage builds, Linux cgroups/namespaces, and Kubernetes cluster orchestration." 
          : "Docker kapsayıcı mimarisi, multi-stage Dockerfile optimizasyonu, Linux Namespaces/cgroups ve Kubernetes orkestrasyonu rehberi."
        }
        keywords="containerization, docker, kubernetes, k8s, multi stage build, distroless, cgroups, linux namespaces"
        canonicalUrl="/containerization"
      />
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ background: 'var(--bg-dark)', minHeight: '100vh' }}>
        <ArchHero 
          title="Containers"
          subtitle={isEn ? "Containerization & K8s Architecture" : "Kapsayıcı & Kubernetes Mimarisi"}
          description={isEn 
            ? "Package applications with their runtime dependencies. Isolate environments using Linux namespaces, cgroups, and orchestrate with Kubernetes." 
            : "Uygulamaları tüm bağımlılıklarıyla paketleyin. Linux çekirdeği (Namespaces/cgroups) ile izole edin ve Kubernetes ile küme ölçeğinde yönetin."
          }
          badge="Infrastructure & Cloud"
          color="#38bdf8"
          illustration={
            <div style={{ position: 'relative', width: '200px', height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
                style={{ width: '160px', height: '160px', borderRadius: '30px', border: '2px dashed rgba(56, 189, 248, 0.4)', position: 'absolute' }}
              />
              <div style={{ width: '90px', height: '90px', background: '#020617', border: '3px solid #38bdf8', borderRadius: '22px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 30px rgba(56, 189, 248, 0.3)' }}>
                <Box size={36} color="#38bdf8" />
                <span style={{ fontSize: '0.65rem', fontWeight: 800, color: 'white', marginTop: '4px' }}>DOCKER</span>
              </div>
            </div>
          }
          features={[
            { icon: <Box />, title: isEn ? 'OS-Level Isolation' : 'Kernel İzolasyonu', desc: isEn ? 'Share the host kernel via Linux Namespaces and cgroups.' : 'Linux Namespaces ve cgroups ile hafif ve güvenli process izolasyonu.' },
            { icon: <Layers />, title: isEn ? 'Multi-Stage Builds' : 'Multi-Stage Build', desc: isEn ? 'Cut image sizes by 95% using Distroless/Alpine runtimes.' : 'Derleme ortamını runtime\'dan ayırarak imaj boyutlarını %95 küçültün.' },
            { icon: <Network />, title: isEn ? 'K8s Orchestration' : 'Kubernetes Gücü', desc: isEn ? 'Automated self-healing, horizontal scaling, and rolling rollouts.' : 'Otomatik hata kurtarma, dinamik ölçekleme ve sıfır kesintili dağıtım.' }
          ]}
        >
          <div style={{ 
            marginTop: '2rem',
            padding: '6px', 
            background: 'rgba(15, 23, 42, 0.4)', 
            borderRadius: '24px', 
            border: '1px solid rgba(255,255,255,0.05)',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '4px',
            backdropFilter: 'blur(10px)',
            flexWrap: 'wrap'
          }}>
            {[
              { id: 'fundamentals', label: isEn ? 'VM vs Containers' : 'VM vs Kapsayıcılar', icon: <Server size={18} /> },
              { id: 'dockerfile', label: isEn ? 'Dockerfile Best Practices' : 'Dockerfile Optimizasyonu', icon: <Layers size={18} /> },
              { id: 'k8s', label: isEn ? 'Kubernetes Architecture' : 'Kubernetes Kümesi', icon: <Network size={18} /> },
              { id: 'simulation', label: isEn ? 'Build Optimizer Lab' : 'İmaj Boyut Laboratuvarı', icon: <Activity size={18} /> }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                style={{
                  padding: '10px 24px',
                  borderRadius: '18px',
                  border: 'none',
                  background: activeTab === tab.id ? '#38bdf8' : 'transparent',
                  color: activeTab === tab.id ? '#020617' : 'rgba(255,255,255,0.5)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontWeight: 700,
                  fontSize: '0.9rem',
                  transition: 'all 0.3s ease',
                  boxShadow: activeTab === tab.id ? '0 4px 12px rgba(56, 189, 248, 0.3)' : 'none'
                }}
              >
                {tab.icon} {tab.label}
              </button>
            ))}
          </div>
        </ArchHero>

        <div className="container" style={{ marginTop: '2rem' }}>
          <AnimatePresence mode="wait">
            {activeTab === 'fundamentals' && <ContainerFundamentalsTab key="fundamentals" />}
            {activeTab === 'dockerfile' && <DockerfileOptimizationTab key="dockerfile" />}
            {activeTab === 'k8s' && <KubernetesOrchestrationTab key="k8s" />}
            {activeTab === 'simulation' && <ContainerLifecycleSimulationTab key="simulation" />}
          </AnimatePresence>
        </div>

        <section style={{ padding: '4rem 0', background: 'rgba(0,0,0,0.3)', borderTop: '1px solid rgba(255,255,255,0.05)', marginTop: '4rem' }}>
          <div className="container" style={{ textAlign: 'center' }}>
             <div style={{ display: 'inline-flex', alignItems: 'center', gap: '1rem', background: 'rgba(56, 189, 248, 0.1)', padding: '1rem 2rem', borderRadius: '12px', border: '1px solid rgba(56, 189, 248, 0.2)' }}>
                <BookOpen size={24} color="#38bdf8" />
                <div style={{ textAlign: 'left' }}>
                  <div style={{ fontSize: '0.8rem', color: '#7dd3fc', textTransform: 'uppercase' }}>
                    {isEn ? "Core Cloud-Native Standards" : "Cloud-Native Standartları"}
                  </div>
                  <div style={{ color: 'white', fontWeight: 600 }}>OCI (Open Container Initiative) & Kubernetes Production Best Practices</div>
                </div>
             </div>
          </div>
        </section>
      </motion.div>
    </>
  );
};

export default ContainerizationPage;
