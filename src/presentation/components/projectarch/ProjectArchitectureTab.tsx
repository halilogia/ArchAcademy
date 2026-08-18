import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import ProjectHero from '../ProjectHero';
import ProjectDecisionRecords from '../ProjectDecisionRecords';
import ProjectDependency from '../ProjectDependency';
import ProjectStructure from '../ProjectStructure';
import ProjectTechStack from '../ProjectTechStack';

export interface ProjectArchitectureTabProps {
  tabSwitcher: React.ReactNode;
}

export const ProjectArchitectureTab: React.FC<ProjectArchitectureTabProps> = ({ tabSwitcher }) => {
  const { i18n } = useTranslation();
  const isEn = (i18n.resolvedLanguage || i18n.language || 'tr').startsWith('en');

  return (
    <motion.div 
      key="arch" 
      initial={{ opacity: 0, x: -20 }} 
      animate={{ opacity: 1, x: 0 }} 
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.3 }}
    >
      <ProjectHero>
        {tabSwitcher}
      </ProjectHero>
      
      <ProjectDecisionRecords />
      <ProjectDependency />
      <ProjectStructure />
      
      {/* Architect's Harmony Section */}
      <section style={{ padding: '100px 0', borderTop: '1px solid var(--glass-border)', background: 'rgba(0,0,0,0.2)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
            <h2 className="gradient-text" style={{ fontSize: '3rem', fontWeight: 800 }}>LCA Harmony</h2>
            <p style={{ color: 'var(--text-secondary)' }}>
              {isEn 
                ? "One unified architecture, unwavering engineering discipline: Eliminate Waste, Build Quality." 
                : "Tek bir mimari, sarsılmaz bir disiplin: Eliminate Waste, Build Quality."
              }
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem' }}>
            <div className="glass-card" style={{ padding: '3rem', borderTop: '4px solid var(--primary)' }}>
              <h3 style={{ color: 'var(--primary)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{ padding: '8px', background: 'rgba(59, 130, 246, 0.1)', borderRadius: '10px' }}>01</div>
                Lean Clean Architecture (LCA)
              </h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8 }}>
                {isEn 
                  ? "The heart of our system. Blends Clean Architecture layering with Lean waste elimination. Pure domain use cases without unnecessary boilerplate." 
                  : "Mimarimizin kalbidir. Clean Architecture'ın katman disiplinini, Lean prensiplerinin 'israfı yok et' kuralıyla birleştirir. Sadece gereken UseCase'ler, en saf haliyle tutulur."
                }
              </p>
            </div>

            <div className="glass-card" style={{ padding: '3rem' }}>
              <h3 style={{ color: '#f59e0b', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{ padding: '8px', background: 'rgba(245, 158, 11, 0.1)', borderRadius: '10px' }}>02</div>
                SOLID / SRP {isEn ? "(Tactics)" : "(Taktik)"}
              </h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8 }}>
                {isEn 
                  ? "Cellular-level modular discipline. Every file is strictly responsible for one job, preventing cascading regression domino effects." 
                  : "Kodun hücre seviyesindeki disiplinidir. Her dosya (Bileşen) sadece tek bir işten sorumludur. Bu sayede bir özelliği değiştirdiğimizde diğerleri domino taşı gibi devrilmez."
                }
              </p>
            </div>

            <div className="glass-card" style={{ padding: '3rem' }}>
              <h3 style={{ color: '#10b981', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{ padding: '8px', background: 'rgba(16, 185, 129, 0.1)', borderRadius: '10px' }}>03</div>
                Component-Based {isEn ? "(Implementation)" : "(Uygulama)"}
              </h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8 }}>
                {isEn 
                  ? "Translates Clean Architecture rules into atomic, reusable, and composable UI blocks with zero leakage." 
                  : "React dünyasının sunduğu muazzam bir güçtür. Clean Architecture'ın o katı kurallarını, esnek Lego parçalarına (Components) dönüştürerek ekrana yansıtmamızı sağlar."
                }
              </p>
            </div>

            <div className="glass-card" style={{ padding: '3rem' }}>
              <h3 style={{ color: '#a855f7', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{ padding: '8px', background: 'rgba(168, 85, 247, 0.1)', borderRadius: '10px' }}>04</div>
                The Master Synergy
              </h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8 }}>
                {isEn 
                  ? "Clean is the roadmap, SOLID is the law, and Component-driven UI is the tangible reality." 
                  : "Sonuç olarak; bu projede bu üçü arasında bir hiyerarşi vardır. Mimari (Clean) yol haritasıdır, Disiplin (SOLID) kurallar dizisidir, Tasarım (Component) ise bu kuralların görsel halidir."
                }
              </p>
            </div>
          </div>
        </div>
      </section>

      <ProjectTechStack />

      {/* Architect's Conclusion Section */}
      <section style={{ padding: '100px 0', textAlign: 'center' }}>
        <div className="container">
          <div className="glass-card" style={{ 
            background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.05) 0%, rgba(37, 99, 235, 0.1) 100%)',
            padding: '5rem'
          }}>
            <h2 style={{ marginBottom: '1.5rem', fontSize: '2.5rem' }}>
              {isEn ? "Architect's Conclusion" : "Mimarın Son Sözü"}
            </h2>
            <p style={{ maxWidth: '850px', margin: '0 auto', color: 'var(--text-secondary)', lineHeight: 2, fontSize: '1.1rem' }}>
              {isEn 
                ? "This portal is living proof that software architecture is not just abstract theory, but a breathing craft executed with uncompromising discipline across every line." 
                : "Bu portal, yazılım mimarisinin sadece bir 'teori' değil, yaşayan, nefes alan ve her satırında disiplin barındıran bir 'sanat' olduğunun kanıtıdır. ArchAcademy, kendi mimari kurallarını bizzat kendi bünyesinde uygulayarak sektöre örnek bir referans teşkil etmek üzere tasarlanmıştır."
              }
            </p>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default ProjectArchitectureTab;
