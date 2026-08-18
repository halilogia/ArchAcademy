import React from 'react';
import { motion } from 'framer-motion';
import { Box, Server, Cpu, ShieldCheck, Zap } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const ContainerFundamentalsTab: React.FC = () => {
  const { i18n } = useTranslation();
  const isEn = (i18n.resolvedLanguage || i18n.language || 'tr').startsWith('en');

  const comparison = [
    {
      prop: isEn ? "Virtualization Level" : "Sanallaştırma Seviyesi",
      vm: isEn ? "Hardware-level (Guest OS + Hypervisor)" : "Donanım Seviyesi (Ayrı Konuk İşletim Sistemi + Hypervisor)",
      container: isEn ? "OS-level (Shared Host Kernel via Namespaces & cgroups)" : "İşletim Sistemi Seviyesi (Paylaşılan Host Kernel + Namespaces/cgroups)"
    },
    {
      prop: isEn ? "Startup Time" : "Başlatma Süresi",
      vm: isEn ? "Minutes (Full OS boot sequence)" : "Dakikalar (Tüm OS önyükleme süreci)",
      container: isEn ? "Milliseconds (Instant process spawning)" : "Milisaniyeler (Anında process başlatma)"
    },
    {
      prop: isEn ? "Resource Footprint" : "Kaynak Tüketimi (RAM/Disk)",
      vm: isEn ? "Gigabytes (Heavy disk image & reserved RAM)" : "Gigabaytlarca disk ve sabit ayrılmış RAM",
      container: isEn ? "Megabytes (Lightweight layers, shared memory)" : "Megabaytlarca hafif katmanlar, dinamik bellek"
    },
    {
      prop: isEn ? "Isolation & Security" : "İzolasyon ve Güvenlik",
      vm: isEn ? "Strong hardware boundary (Independent Kernel)" : "Tam donanımsal izolasyon (Ayrı Kernel)",
      container: isEn ? "Process-level isolation (Secured via Seccomp/AppArmor)" : "Process seviyesinde izolasyon (Seccomp, cgroups, Capabilities)"
    }
  ];

  return (
    <motion.div key="fundamentals" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
      <div className="glass-card" style={{ padding: '2.5rem', marginBottom: '2rem' }}>
        <h3 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'white', marginBottom: '1rem' }}>
          {isEn ? "Virtual Machines (VM) vs Linux Containers" : "Sanal Makineler (VM) vs Linux Kapsayıcıları (Containers)"}
        </h3>
        <p style={{ color: '#94a3b8', fontSize: '1.05rem', lineHeight: 1.7, marginBottom: '2rem', maxWidth: '800px' }}>
          {isEn 
            ? "Containers do not virtualize hardware. They are isolated Linux processes running directly on the host kernel using cgroups (resource limits) and Namespaces (process, network, mount isolation)." 
            : "Kapsayıcılar sanal donanım taklit etmez; Linux çekirdeğinin (Kernel) cgroups (kaynak sınırları) ve Namespaces (PID, Network, Mount izolasyonu) özelliklerini kullanarak izole process'ler çalıştırır."
          }
        </p>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #334155' }}>
                <th style={{ padding: '12px 16px', color: '#94a3b8', fontSize: '0.85rem', textTransform: 'uppercase' }}>Kriter</th>
                <th style={{ padding: '12px 16px', color: '#38bdf8', fontSize: '0.85rem', textTransform: 'uppercase' }}>🐳 Linux Container (Docker)</th>
                <th style={{ padding: '12px 16px', color: '#a855f7', fontSize: '0.85rem', textTransform: 'uppercase' }}>🖥️ Virtual Machine (VMware/KVM)</th>
              </tr>
            </thead>
            <tbody>
              {comparison.map((c, i) => (
                <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', background: i % 2 === 0 ? 'rgba(255,255,255,0.02)' : 'transparent' }}>
                  <td style={{ padding: '14px 16px', fontWeight: 700, color: 'white', fontSize: '0.9rem' }}>{c.prop}</td>
                  <td style={{ padding: '14px 16px', color: '#bae6fd', fontSize: '0.85rem' }}>{c.container}</td>
                  <td style={{ padding: '14px 16px', color: '#e9d5ff', fontSize: '0.85rem' }}>{c.vm}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
};

export default ContainerFundamentalsTab;
