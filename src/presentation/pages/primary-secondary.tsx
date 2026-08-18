import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Database, ShieldCheck, Zap, ArrowRight, Server, RefreshCw } from 'lucide-react';
import ArchHero from '../components/ArchHero';
import SEO from '../components/SEO';
import { PrimarySecondaryComparisonTab } from '../components/primarysecondary/PrimarySecondaryComparisonTab';
import { PrimarySecondarySimulationTab } from '../components/primarysecondary/PrimarySecondarySimulationTab';
import { useReplicationSimulation } from '../components/primarysecondary/useReplicationSimulation';

const PrimarySecondaryPage: React.FC = () => {
  const { i18n } = useTranslation();
  const isEn = (i18n.resolvedLanguage || i18n.language || 'tr').startsWith('en');
  const [activeTab, setActiveTab] = useState<'simulation' | 'comparison'>('comparison');
  
  const simulation = useReplicationSimulation();

  const heroIllustration = (
    <div style={{ position: 'relative', width: '380px', height: '350px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      {/* Primary Node */}
      <motion.div
        animate={{ 
          boxShadow: simulation.replicationStatus === 'SYNCING' 
            ? ['0 0 20px #eab308', '0 0 50px #eab308', '0 0 20px #eab308'] 
            : '0 0 20px rgba(234, 179, 8, 0.2)' 
        }}
        transition={{ duration: 1, repeat: simulation.replicationStatus === 'SYNCING' ? Infinity : 0 }}
        style={{ width: '120px', height: '100px', background: 'var(--glass)', border: '3px solid #eab308', borderRadius: '15px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', zIndex: 10, marginBottom: '40px' }}
      >
        <Database size={40} color="#eab308" />
        <span style={{ fontSize: '0.8rem', fontWeight: 900, marginTop: '5px' }}>PRIMARY</span>
        <span style={{ fontSize: '0.6rem', color: '#eab308', opacity: 0.8 }}>Read / Write</span>
      </motion.div>

      {/* Connection Lines with Data Packets */}
      <div style={{ position: 'relative', width: '300px', height: '40px', display: 'flex', justifyContent: 'center' }}>
        <svg style={{ position: 'absolute', top: -20, width: '100%', height: '100px', overflow: 'visible' }}>
          <path d="M 150 0 L 80 100" stroke="#eab308" strokeWidth="2" strokeDasharray="5,5" opacity="0.5" fill="none" />
          <path d="M 150 0 L 220 100" stroke="#eab308" strokeWidth="2" strokeDasharray="5,5" opacity="0.5" fill="none" />
        </svg>
        
        {/* Packet to S1 */}
        {simulation.replicationStatus === 'SYNCING' && (
          <motion.div 
            animate={{ x: [-20, -70], y: [0, 80], scale: [1, 0.8] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            style={{ position: 'absolute', width: '10px', height: '10px', background: '#eab308', borderRadius: '50%', boxShadow: '0 0 10px #eab308' }}
          />
        )}

        {/* Packet to S2 */}
        {simulation.replicationStatus === 'SYNCING' && (
          <motion.div 
            animate={{ x: [20, 70], y: [0, 80], scale: [1, 0.8] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
            style={{ position: 'absolute', width: '10px', height: '10px', background: '#eab308', borderRadius: '50%', boxShadow: '0 0 10px #eab308' }}
          />
        )}
      </div>

      {/* Secondary Nodes */}
      <div style={{ display: 'flex', gap: '80px', marginTop: '20px', zIndex: 10 }}>
        <div style={{ width: '100px', height: '90px', background: 'var(--glass)', border: '2px solid rgba(255,255,255,0.1)', borderRadius: '12px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <Database size={30} color="#94a3b8" />
          <span style={{ fontSize: '0.75rem', fontWeight: 'bold', marginTop: '4px' }}>Secondary 1</span>
          <span style={{ fontSize: '0.6rem', color: '#10b981' }}>Read-Only</span>
        </div>

        <div style={{ width: '100px', height: '90px', background: 'var(--glass)', border: '2px solid rgba(255,255,255,0.1)', borderRadius: '12px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <Database size={30} color="#94a3b8" />
          <span style={{ fontSize: '0.75rem', fontWeight: 'bold', marginTop: '4px' }}>Secondary 2</span>
          <span style={{ fontSize: '0.6rem', color: '#10b981' }}>Read-Only</span>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <SEO
        title={isEn ? "Primary-Secondary Replication Pattern | ArchAcademy" : "Primary-Secondary Replikasyon Mimarisi | ArchAcademy"}
        description={isEn 
          ? "Deep dive into Primary-Secondary replication, Read-Write splitting, read replicas, and failover mechanics." 
          : "Primary-Secondary veritabanı replikasyonu, Okuma-Yazma ayrıştırması ve yük dağıtımı mimarisi rehberi."
        }
        keywords="primary-secondary, database replication, master slave, read replicas, write master, failover"
        canonicalUrl="/primary-secondary"
      />
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ background: 'var(--bg-dark)', minHeight: '100vh' }}>
        <ArchHero 
          title="Primary-Secondary"
          subtitle={isEn ? "Replication Engine" : "Replikasyon Mimarisi"}
          description={isEn 
            ? "Enterprise data distribution pattern where single Primary node handles mutations (Writes) and replicates data asynchronously to Secondary nodes (Reads)." 
            : "Veritabanı dünyasının en popüler ölçeklenme deseni. Tek bir ana sunucu (Primary) tüm yazma işlemlerini karşılar ve veriyi ikincil sunuculara (Secondary) kopyalar."
          }
          badge="Database Scaling"
          color="#eab308"
          illustration={heroIllustration}
          features={[
            { icon: <Database />, title: 'Write Master', desc: isEn ? 'Sole authority for data modifications ensuring consistency.' : 'Tüm INSERT/UPDATE/DELETE işlemleri sadece tek bir sunucuya gider.' },
            { icon: <Zap />, title: 'Read Scaling', desc: isEn ? 'Read-only queries distributed across multiple secondary replicas.' : 'SELECT sorguları onlarca ikincil sunucuya dağıtılarak ana sunucu rahatlatılır.' },
            { icon: <ShieldCheck />, title: 'Failover', desc: isEn ? 'If Primary fails, a Secondary is instantly elected as the new Master.' : 'Primary sunucu çökerse, Secondary sunuculardan biri anında yeni Primary seçilir.' }
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
            backdropFilter: 'blur(10px)'
          }}>
            {[
              { id: 'comparison', label: isEn ? 'Architecture Blueprint' : 'Mimari Analiz', icon: <Server size={18} /> },
              { id: 'simulation', label: isEn ? 'Replication Lab' : 'Replikasyon Simülasyonu', icon: <RefreshCw size={18} /> }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                style={{
                  padding: '10px 24px',
                  borderRadius: '18px',
                  border: 'none',
                  background: activeTab === tab.id ? '#eab308' : 'transparent',
                  color: activeTab === tab.id ? 'black' : 'rgba(255,255,255,0.5)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontWeight: 700,
                  fontSize: '0.9rem',
                  transition: 'all 0.3s ease',
                  boxShadow: activeTab === tab.id ? '0 4px 12px rgba(234, 179, 8, 0.3)' : 'none'
                }}
              >
                {tab.icon} {tab.label}
              </button>
            ))}
          </div>
        </ArchHero>

        <div className="container" style={{ marginTop: '2rem' }}>
          <AnimatePresence mode="wait">
            {activeTab === 'comparison' && <PrimarySecondaryComparisonTab key="comparison" />}
            {activeTab === 'simulation' && (
              <PrimarySecondarySimulationTab 
                key="simulation"
                replicationStatus={simulation.replicationStatus}
                primaryData={simulation.primaryData}
                secondary1Data={simulation.secondary1Data}
                secondary2Data={simulation.secondary2Data}
                onWriteData={simulation.writeData}
              />
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </>
  );
};

export default PrimarySecondaryPage;
