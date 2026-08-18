import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Database, ShieldCheck, Zap, ArrowRight, Server, RefreshCw } from 'lucide-react';
import ArchHero from '../components/ArchHero';
import SEO from '../components/SEO';
import { PrimarySecondaryComparisonTab } from '../components/primarysecondary/PrimarySecondaryComparisonTab';
import { PrimarySecondarySimulationTab } from '../components/primarysecondary/PrimarySecondarySimulationTab';

const PrimarySecondaryPage: React.FC = () => {
  const { i18n } = useTranslation();
  const isEn = (i18n.resolvedLanguage || i18n.language || 'tr').startsWith('en');
  const [activeTab, setActiveTab] = useState<'simulation' | 'comparison'>('comparison');
  const [replicationStatus, setReplicationStatus] = useState<'IDLE' | 'SYNCING' | 'SYNCED'>('IDLE');
  const [primaryData, setPrimaryData] = useState<string[]>([]);
  const [secondary1Data, setSecondary1Data] = useState<string[]>([]);
  const [secondary2Data, setSecondary2Data] = useState<string[]>([]);

  const writeData = () => {
    const newData = `Block #${primaryData.length + 1}`;
    setPrimaryData(prev => [...prev, newData]);
    setReplicationStatus('SYNCING');

    setTimeout(() => {
      setSecondary1Data(prev => [...prev, newData]);
    }, 1500);

    setTimeout(() => {
      setSecondary2Data(prev => [...prev, newData]);
      setReplicationStatus('SYNCED');
    }, 3000);
  };

  const heroIllustration = (
    <div style={{ position: 'relative', width: '380px', height: '350px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      {/* Primary Node */}
      <motion.div
        animate={{ 
          boxShadow: replicationStatus === 'SYNCING' 
            ? ['0 0 20px #eab308', '0 0 50px #eab308', '0 0 20px #eab308'] 
            : '0 0 20px rgba(234, 179, 8, 0.2)' 
        }}
        transition={{ duration: 1, repeat: replicationStatus === 'SYNCING' ? Infinity : 0 }}
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
        {replicationStatus === 'SYNCING' && (
          <motion.div 
            initial={{ x: 0, y: -20, opacity: 1 }}
            animate={{ x: -70, y: 80, opacity: 0 }}
            transition={{ duration: 1.5, ease: "linear" }}
            style={{ position: 'absolute', width: '12px', height: '12px', background: '#eab308', borderRadius: '50%' }}
          />
        )}
        {/* Packet to S2 */}
        {replicationStatus === 'SYNCING' && (
          <motion.div 
            initial={{ x: 0, y: -20, opacity: 1 }}
            animate={{ x: 70, y: 80, opacity: 0 }}
            transition={{ duration: 3, ease: "linear" }}
            style={{ position: 'absolute', width: '12px', height: '12px', background: '#eab308', borderRadius: '50%' }}
          />
        )}
      </div>

      {/* Secondary Nodes */}
      <div style={{ display: 'flex', gap: '30px', marginTop: '40px' }}>
        {[1, 2].map((i) => (
          <motion.div
            key={i}
            style={{ width: '100px', height: '90px', background: 'var(--glass)', border: '2px solid rgba(234, 179, 8, 0.4)', borderRadius: '15px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', opacity: 0.8 }}
          >
            <div style={{ position: 'relative' }}>
              <Database size={28} color="#fde047" />
              <div style={{ position: 'absolute', bottom: -5, right: -5, background: '#eab308', borderRadius: '50%', padding: '2px' }}>
                <ArrowRight size={10} color="black" />
              </div>
            </div>
            <span style={{ fontSize: '0.65rem', fontWeight: 800, marginTop: '5px' }}>SECONDARY {i}</span>
            <span style={{ fontSize: '0.55rem', opacity: 0.6 }}>Read Only</span>
          </motion.div>
        ))}
      </div>
    </div>
  );

  return (
    <>
      <SEO
        title={isEn ? "Primary-Secondary (Master-Slave) Replication | ArchAcademy" : "Primary-Secondary (Master-Slave) Mimarisi | ArchAcademy"}
        description={isEn 
          ? "Master Primary-Secondary database replication, read scaling, asynchronous binlog replication lag, and automatic failover." 
          : "Primary-Secondary (Master-Slave) veritabanı replikasyonu, okuma ölçeklemesi ve failover stratejileri rehberi."
        }
        keywords="primary secondary replication, master slave database, read replicas, binlog replication, failover, mysql postgresql replication"
        canonicalUrl="/primary-secondary"
      />
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ paddingBottom: '100px' }}>
        <ArchHero 
          title="Primary-Secondary"
          subtitle="Master-Slave Replication"
          description={isEn 
            ? "The most ubiquitous database scale-out architecture. Route all mutating operations to a single authoritative Primary node while distributing reads across horizontally scaled Secondary replicas." 
            : "Veritabanı dünyasının en popüler ölçeklenme stratejisi. Yazmak için tek bir patron (Primary), okumak için ise ordular (Secondary) kullanın."
          }
          badge="Scalability Pattern"
          color="#eab308"
          illustration={heroIllustration}
          features={[
            { 
              icon: <Zap />, 
              title: isEn ? 'Write to Primary' : 'Yazma Sadece Primary\'e', 
              desc: isEn ? 'Strict single-master write path preventing multi-master concurrency conflicts.' : 'Tüm INSERT/UPDATE/DELETE işlemleri sadece Primary düğüme yapılır.' 
            },
            { 
              icon: <Database />, 
              title: isEn ? 'Scale Reads via Secondaries' : 'İkincillerden Oku (Read Scale)', 
              desc: isEn ? 'Distribute massive SELECT queries across dozens of read-only replica instances.' : 'SELECT işlemleri Secondary düğümlere dağıtılarak yük hafifletilir.' 
            },
            { 
              icon: <ShieldCheck />, 
              title: isEn ? 'Automated Failover' : 'Otomatik Yedekleme (Failover)', 
              desc: isEn ? 'Promote a healthy Secondary to become the new Primary upon node outage.' : 'Primary ölürse, Secondary\'lerden biri kral ilan edilir.' 
            }
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
              { id: 'comparison', label: isEn ? 'Single Node vs Replicas' : 'Single vs Replica', icon: <Server size={18} /> },
              { id: 'simulation', label: isEn ? 'Replication Lag Demo' : 'Replication Lag Demo', icon: <RefreshCw size={18} /> }
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
                replicationStatus={replicationStatus}
                primaryData={primaryData}
                secondary1Data={secondary1Data}
                secondary2Data={secondary2Data}
                onWriteData={writeData}
              />
            )}
          </AnimatePresence>
        </div>

        {/* Database Replication Reference */}
        <section style={{ padding: '4rem 0', background: 'rgba(0,0,0,0.3)', borderTop: '1px solid rgba(255,255,255,0.05)', marginTop: '4rem' }}>
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
                  {isEn ? "Database Replication Engineering Standard" : "Veritabanı Replikasyon Standardı"}
                </div>
                <p style={{ color: '#94a3b8', marginBottom: '2rem', fontSize: '1.1rem', lineHeight: 1.6 }}>
                  {isEn 
                    ? "Read-replica clustering and binary log streaming are foundational across MySQL, PostgreSQL, and AWS Aurora engines." 
                    : "Primary-Secondary (Replication) mimarisi, MySQL, PostgreSQL ve MongoDB gibi tüm modern ilişkisel ve NoSQL veritabanlarının temel taşıdır."
                  }
                </p>
                
                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                   <a 
                     href="https://dev.mysql.com/doc/refman/8.0/en/replication.html" 
                     target="_blank" 
                     rel="noopener noreferrer"
                     style={{ 
                       display: 'flex', alignItems: 'center', gap: '8px', 
                       background: 'rgba(234, 179, 8, 0.15)', color: '#fde047', 
                       padding: '12px 24px', borderRadius: '12px', textDecoration: 'none', fontWeight: 600,
                       border: '1px solid rgba(234, 179, 8, 0.2)', transition: 'all 0.2s'
                     }}
                   >
                      MySQL Replication Guide <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                   </a>
                   <a 
                     href="https://www.postgresql.org/docs/current/warm-standby.html" 
                     target="_blank" 
                     rel="noopener noreferrer"
                     style={{ 
                       display: 'flex', alignItems: 'center', gap: '8px', 
                       background: 'rgba(234, 179, 8, 0.15)', color: '#fde047', 
                       padding: '12px 24px', borderRadius: '12px', textDecoration: 'none', fontWeight: 600,
                       border: '1px solid rgba(234, 179, 8, 0.2)', transition: 'all 0.2s'
                     }}
                   >
                      PostgreSQL Streaming Replication <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                   </a>
                </div>
             </div>
          </div>
        </section>
      </motion.div>
    </>
  );
};

export default PrimarySecondaryPage;
