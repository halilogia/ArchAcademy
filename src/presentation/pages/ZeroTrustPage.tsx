import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Lock, EyeOff, UserCheck, Key, Fingerprint } from 'lucide-react';
import ArchHero from '../components/ArchHero';

const ZeroTrustPage = () => {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ background: 'var(--bg-dark)', minHeight: '100vh' }}>
      <ArchHero 
        title="Zero Trust"
        subtitle="Security"
        description="'Asla Güvenme, Her Zaman Doğrula'. Ağın içindeki cihazlar bile varsayılan olarak güvenilmez kabul edilir."
        badge="Modern Security"
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
          { icon: <UserCheck />, title: 'Identity First', desc: 'IP adresine değil, kimliğe (Identity) güvenin.' },
          { icon: <EyeOff />, title: 'Least Privilege', desc: 'Sadece işini yapması için gereken minimum yetkiyi verin.' },
          { icon: <Fingerprint />, title: 'Micro-Segmentation', desc: 'Bir sunucu hacklense bile saldırgan yan sunucuya geçemez.' }
        ]}
      />
      
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
                Industry Standard
              </div>
              <p style={{ color: '#94a3b8', marginBottom: '2rem', fontSize: '1.1rem', lineHeight: 1.6 }}>
                Zero Trust mimarisi, ABD Ulusal Standartlar ve Teknoloji Enstitüsü (NIST) tarafından "SP 800-207" yayınında standartlaştırılmıştır.
              </p>
              
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                 <a 
                   href="https://csrc.nist.gov/publications/detail/sp/800-207/final" 
                   target="_blank" 
                   rel="noopener noreferrer"
                   style={{ 
                     display: 'flex', alignItems: 'center', gap: '8px', 
                     background: 'rgba(239, 68, 68, 0.15)', color: '#fca5a5', 
                     padding: '12px 24px', borderRadius: '12px', textDecoration: 'none', fontWeight: 600,
                     border: '1px solid rgba(239, 68, 68, 0.2)', transition: 'all 0.2s'
                   }}
                 >
                    NIST SP 800-207 (Official PDF) <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                 </a>
              </div>
           </div>
        </div>
      </section>
    </motion.div>
  );
};
export default ZeroTrustPage;
