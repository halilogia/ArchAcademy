import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Shield, Lock, ShieldCheck, EyeOff, BookOpen, Terminal } from 'lucide-react';
import ArchHero from '../components/ArchHero';
import SEO from '../components/SEO';
import { AppSecOWASPTab } from '../components/security/AppSecOWASPTab';
import { ZeroTrustNISTTab } from '../components/security/ZeroTrustNISTTab';
import { SecurityDefenseSimulationTab } from '../components/security/SecurityDefenseSimulationTab';
import { useSecuritySimulation } from '../components/security/useSecuritySimulation';

const SecurityPage: React.FC = () => {
  const { i18n } = useTranslation();
  const isEn = (i18n.resolvedLanguage || i18n.language || 'tr').startsWith('en');
  const [activeTab, setActiveTab] = useState<'appsec' | 'zerotrust' | 'defense'>('appsec');

  const security = useSecuritySimulation();

  return (
    <>
      <SEO
        title={isEn ? "Application Security & Zero Trust Architecture | ArchAcademy" : "Uygulama Güvenliği ve Zero Trust Mimarisi | ArchAcademy"}
        description={isEn 
          ? "Master OWASP Top 10 security defenses, Zero Trust NIST SP 800-207 standards, mTLS, and real-time threat mitigation." 
          : "OWASP Top 10 savunma kalkanı, Zero Trust (Sıfır Güven) NIST standartları, mTLS ve canlı tehdit engelleme rehberi."
        }
        keywords="security architecture, zero trust, nist sp 800-207, owasp top 10, mtls, micro segmentation, appsec"
        canonicalUrl="/security"
      />
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ background: 'var(--bg-dark)', minHeight: '100vh' }}>
        <ArchHero 
          title="Security"
          subtitle={isEn ? "AppSec & Zero Trust" : "Uygulama & Zero Trust"}
          description={isEn 
            ? "Architecting impenetrable software. OWASP defensive controls and NIST Zero Trust 'Never Trust, Always Verify' principles." 
            : "Yazılım mimarisinin savunma kalkanı. OWASP Top 10 zafiyet önleme stratejileri ve NIST Zero Trust 'Asla Güvenme, Daima Doğrula' mimarisi."
          }
          badge="Security Engineering"
          color="#ef4444"
          illustration={
            <div style={{ position: 'relative', width: '200px', height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <motion.div 
                 animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.2, 0.5] }}
                 transition={{ duration: 2, repeat: Infinity }}
                 style={{ position: 'absolute', width: '100%', height: '100%', borderRadius: '50%', background: '#ef4444' }}
              />
              <Shield size={100} color="white" />
              <motion.div 
                 animate={{ rotate: 360 }}
                 transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                 style={{ position: 'absolute', top: -10, right: -10 }}
              >
                 <Lock size={40} color="#fca5a5" />
              </motion.div>
            </div>
          }
          features={[
            { icon: <ShieldCheck />, title: isEn ? 'OWASP Top 10' : 'OWASP Savunması', desc: isEn ? 'Immunity against injection, broken access, and crypto bugs.' : 'Enjeksiyon, bozuk yetkilendirme ve veri sızıntılarına karşı tam koruma.' },
            { icon: <EyeOff />, title: isEn ? 'Zero Trust (NIST)' : 'Sıfır Güven (ZTA)', desc: isEn ? 'Never trust internal network. Strict mutual verification.' : 'İç ağa bile güvenilmez. mTLS ve mikro-segmentasyon uygulanır.' },
            { icon: <Lock />, title: isEn ? 'Least Privilege' : 'En Az Yetki', desc: isEn ? 'Granular RBAC/ABAC enforced at the domain aggregate level.' : 'Servislere sadece o anki işi için gereken minimum izin (PoLP) verilir.' }
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
              { id: 'appsec', label: isEn ? 'AppSec & OWASP' : 'OWASP Top 10 Savunması', icon: <ShieldCheck size={18} /> },
              { id: 'zerotrust', label: isEn ? 'Zero Trust Architecture' : 'Zero Trust (NIST)', icon: <Lock size={18} /> },
              { id: 'defense', label: isEn ? 'Live Threat Sandbox' : 'Tehdit Savunma Simülatörü', icon: <Terminal size={18} /> }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                style={{
                  padding: '10px 24px',
                  borderRadius: '18px',
                  border: 'none',
                  background: activeTab === tab.id ? '#ef4444' : 'transparent',
                  color: activeTab === tab.id ? 'white' : 'rgba(255,255,255,0.5)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontWeight: 700,
                  fontSize: '0.9rem',
                  transition: 'all 0.3s ease',
                  boxShadow: activeTab === tab.id ? '0 4px 12px rgba(239, 68, 68, 0.3)' : 'none'
                }}
              >
                {tab.icon} {tab.label}
              </button>
            ))}
          </div>
        </ArchHero>

        <div className="container" style={{ marginTop: '2rem' }}>
          <AnimatePresence mode="wait">
            {activeTab === 'appsec' && <AppSecOWASPTab key="appsec" />}
            {activeTab === 'zerotrust' && <ZeroTrustNISTTab key="zerotrust" />}
            {activeTab === 'defense' && (
              <SecurityDefenseSimulationTab 
                key="defense"
                zeroTrustActive={security.zeroTrustActive}
                setZeroTrustActive={security.setZeroTrustActive}
                mTLSActive={security.mTLSActive}
                setMTLSActive={security.setMTLSActive}
                wafActive={security.wafActive}
                setWafActive={security.setWafActive}
                isSimulating={security.isSimulating}
                logs={security.logs}
                onLaunchAttack={security.launchAttack}
              />
            )}
          </AnimatePresence>
        </div>

        <section style={{ padding: '4rem 0', background: 'rgba(0,0,0,0.3)', borderTop: '1px solid rgba(255,255,255,0.05)', marginTop: '4rem' }}>
          <div className="container" style={{ textAlign: 'center' }}>
             <div style={{ display: 'inline-flex', alignItems: 'center', gap: '1rem', background: 'rgba(239, 68, 68, 0.1)', padding: '1rem 2rem', borderRadius: '12px', border: '1px solid rgba(239, 68, 68, 0.2)' }}>
                <BookOpen size={24} color="#ef4444" />
                <div style={{ textAlign: 'left' }}>
                  <div style={{ fontSize: '0.8rem', color: '#fca5a5', textTransform: 'uppercase' }}>
                    {isEn ? "Industry Standard Specifications" : "Temel Standartlar"}
                  </div>
                  <div style={{ color: 'white', fontWeight: 600 }}>NIST Special Publication 800-207 (Zero Trust Architecture) & OWASP Top 10</div>
                </div>
             </div>
          </div>
        </section>
      </motion.div>
    </>
  );
};

export default SecurityPage;
