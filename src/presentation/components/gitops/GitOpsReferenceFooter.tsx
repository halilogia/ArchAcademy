import React from 'react';
import { useTranslation } from 'react-i18next';

export const GitOpsReferenceFooter: React.FC = () => {
  const { i18n } = useTranslation();
  const isEn = (i18n.resolvedLanguage || i18n.language || 'tr').startsWith('en');

  return (
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
              {isEn ? "CNCF Working Group" : "CNCF Project"}
            </div>
            <p style={{ color: '#94a3b8', marginBottom: '2rem', fontSize: '1.1rem', lineHeight: 1.6 }}>
              {isEn 
                ? "GitOps principles are standardized and maintained by the OpenGitOps working group under the Cloud Native Computing Foundation (CNCF)." 
                : "GitOps prensipleri, Cloud Native Computing Foundation (CNCF) altındaki OpenGitOps çalışma grubu tarafından belirlenen standartlara dayanır."
              }
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
  );
};

export default GitOpsReferenceFooter;
