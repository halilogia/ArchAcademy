import React from 'react';
import { motion } from 'framer-motion';
import { Network, Server, RotateCcw, Shield, Cpu, Activity } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const KubernetesOrchestrationTab: React.FC = () => {
  const { i18n } = useTranslation();
  const isEn = (i18n.resolvedLanguage || i18n.language || 'tr').startsWith('en');

  const k8sComponents = [
    { name: 'Pod', type: 'Smallest Unit', color: '#38bdf8', desc: isEn ? 'One or more tightly coupled containers sharing network & storage namespaces.' : 'Aynı network ve depolamayı paylaşan en küçük dağıtılabilir kapsayıcı grubu.' },
    { name: 'Deployment', type: 'Workload Controller', color: '#10b981', desc: isEn ? 'Declarative rolling updates, auto-healing, self-recovery, and pod replicas.' : 'Sıfır kesintili güncelleme (rolling update) ve pod kopyalarını yöneten ana denetleyici.' },
    { name: 'Service & Ingress', type: 'Networking', color: '#f59e0b', desc: isEn ? 'Stable virtual IP, round-robin load balancing, and TLS termination.' : 'Pod\'lar arası yük dengeleme ve dış dünyadan gelen trafiği yönlendiren ağ katmanı.' },
    { name: 'HPA', type: 'Autoscaling', color: '#a855f7', desc: isEn ? 'Horizontal Pod Autoscaler dynamically scales pods based on CPU/RAM metrics.' : 'CPU/RAM kullanımına göre pod sayısını otomatik olarak artıran veya azaltan ölçekleyici.' }
  ];

  return (
    <motion.div key="k8s" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
      <div className="glass-card" style={{ padding: '2.5rem', marginBottom: '2rem' }}>
        <h3 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'white', marginBottom: '1rem' }}>
          {isEn ? "Kubernetes (K8s) Cluster Architecture" : "Kubernetes (K8s) Küme ve Orkestrasyon Mimarisi"}
        </h3>
        <p style={{ color: '#94a3b8', fontSize: '1.05rem', lineHeight: 1.7, marginBottom: '2rem', maxWidth: '800px' }}>
          {isEn 
            ? "When managing hundreds of containers across multiple servers, Kubernetes automates scheduling, health checks, self-healing, service discovery, and rolling deployments." 
            : "Yüzlerce kapsayıcıyı farklı sunucularda yönetirken Kubernetes; otomatik hata kurtarma (Self-Healing), yük dengeleme, sıfır kesintili dağıtım ve otomatik ölçekleme sağlar."
          }
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem' }}>
          {k8sComponents.map((k, i) => (
            <div key={i} style={{ background: '#020617', padding: '1.5rem', borderRadius: '16px', border: '1px solid #1e293b', borderTop: `4px solid ${k.color}` }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <h4 style={{ color: 'white', fontWeight: 800, fontSize: '1.2rem', margin: 0 }}>{k.name}</h4>
                <span style={{ fontSize: '0.7rem', color: k.color, background: `${k.color}22`, padding: '2px 8px', borderRadius: '6px', fontWeight: 700 }}>
                  {k.type}
                </span>
              </div>
              <p style={{ color: '#94a3b8', fontSize: '0.85rem', lineHeight: 1.6, margin: 0 }}>{k.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default KubernetesOrchestrationTab;
