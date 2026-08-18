import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { FileText, Layers, FileCode2, BookOpen, Activity } from 'lucide-react';
import ArchHero from '../components/ArchHero';
import SEO from '../components/SEO';
import { ADRArchitectureTab } from '../components/docsannotations/ADRArchitectureTab';
import { C4ModelHierarchyTab } from '../components/docsannotations/C4ModelHierarchyTab';
import { ArchitectureDiagramsTab } from '../components/docsannotations/ArchitectureDiagramsTab';
import { ADRBuilderSimulationTab } from '../components/docsannotations/ADRBuilderSimulationTab';

const DocsAnnotationsPage: React.FC = () => {
  const { i18n } = useTranslation();
  const isEn = (i18n.resolvedLanguage || i18n.language || 'tr').startsWith('en');
  const [activeTab, setActiveTab] = useState<'adr' | 'c4' | 'diagrams' | 'simulation'>('adr');

  return (
    <>
      <SEO
        title={isEn ? "Architecture Documentation & ADR Masterclass | ArchAcademy" : "Mimari Dokümantasyon ve ADR Masterclass | ArchAcademy"}
        description={isEn 
          ? "Master Architecture Decision Records (ADR), Simon Brown C4 Model, and Diagrams as Code (Mermaid/PlantUML)." 
          : "Mimari Karar Kayıtları (ADR), Simon Brown C4 Modeli ve Kod Olarak Diyagramlar (Diagrams as Code) rehberi."
        }
        keywords="adr, architecture decision record, c4 model, simon brown, diagrams as code, mermaid, plantuml, structurizr"
        canonicalUrl="/docs-annotations"
      />
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ background: 'var(--bg-dark)', minHeight: '100vh' }}>
        <ArchHero 
          title="Docs & ADR"
          subtitle={isEn ? "Architecture as Code & ADR" : "Kod Olarak Mimari & Karar Kayıtları"}
          description={isEn 
            ? "Prevent architectural knowledge rot. Document rationale with Architecture Decision Records (ADRs) and visualize with the C4 hierarchical model." 
            : "Mimari kararların unutulmasını ve eskiyip çürümesini önleyin. ADR şablonları, Simon Brown C4 Modeli ve kod olarak diyagramlar (Mermaid/PlantUML) rehberi."
          }
          badge="Architecture Governance"
          color="#10b981"
          illustration={
            <div style={{ position: 'relative', width: '200px', height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
                style={{ width: '160px', height: '160px', borderRadius: '30px', border: '2px dashed rgba(16, 185, 129, 0.4)', position: 'absolute' }}
              />
              <div style={{ width: '90px', height: '90px', background: '#020617', border: '3px solid #10b981', borderRadius: '22px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 30px rgba(16, 185, 129, 0.3)' }}>
                <FileText size={36} color="#10b981" />
                <span style={{ fontSize: '0.65rem', fontWeight: 800, color: 'white', marginTop: '4px' }}>ADR</span>
              </div>
            </div>
          }
          features={[
            { icon: <FileText />, title: isEn ? 'ADR Records' : 'Karar Kayıtları (ADR)', desc: isEn ? 'Immutable markdown records capturing decisions and trade-offs in Git.' : 'Alınan mimari kararları ve tavizleri Git içinde kodla birlikte saklayın.' },
            { icon: <Layers />, title: isEn ? 'C4 Model' : 'C4 Modeli', desc: isEn ? 'Hierarchical abstraction: Context -> Container -> Component -> Code.' : 'Yazılım mimarisini 4 farklı yakınlaşma seviyesinde haritalandırın.' },
            { icon: <FileCode2 />, title: isEn ? 'Diagrams as Code' : 'Kod Olarak Çizim', desc: isEn ? 'Mermaid & PlantUML diagrams that never rot or desync.' : 'PR süreçlerinde kodla birlikte güncellenen metin tabanlı diyagramlar.' }
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
              { id: 'adr', label: isEn ? 'Architecture Decision Records' : 'ADR Standartları', icon: <FileText size={18} /> },
              { id: 'c4', label: isEn ? 'C4 Architecture Model' : 'Simon Brown C4 Modeli', icon: <Layers size={18} /> },
              { id: 'diagrams', label: isEn ? 'Diagrams as Code' : 'Kod Olarak Çizim (DaC)', icon: <FileCode2 size={18} /> },
              { id: 'simulation', label: isEn ? 'ADR Generator Studio' : 'ADR Üretim Stüdyosu', icon: <Activity size={18} /> }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                style={{
                  padding: '10px 24px',
                  borderRadius: '18px',
                  border: 'none',
                  background: activeTab === tab.id ? '#10b981' : 'transparent',
                  color: activeTab === tab.id ? '#020617' : 'rgba(255,255,255,0.5)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontWeight: 700,
                  fontSize: '0.9rem',
                  transition: 'all 0.3s ease',
                  boxShadow: activeTab === tab.id ? '0 4px 12px rgba(16, 185, 129, 0.3)' : 'none'
                }}
              >
                {tab.icon} {tab.label}
              </button>
            ))}
          </div>
        </ArchHero>

        <div className="container" style={{ marginTop: '2rem' }}>
          <AnimatePresence mode="wait">
            {activeTab === 'adr' && <ADRArchitectureTab key="adr" />}
            {activeTab === 'c4' && <C4ModelHierarchyTab key="c4" />}
            {activeTab === 'diagrams' && <ArchitectureDiagramsTab key="diagrams" />}
            {activeTab === 'simulation' && <ADRBuilderSimulationTab key="simulation" />}
          </AnimatePresence>
        </div>

        <section style={{ padding: '4rem 0', background: 'rgba(0,0,0,0.3)', borderTop: '1px solid rgba(255,255,255,0.05)', marginTop: '4rem' }}>
          <div className="container" style={{ textAlign: 'center' }}>
             <div style={{ display: 'inline-flex', alignItems: 'center', gap: '1rem', background: 'rgba(16, 185, 129, 0.1)', padding: '1rem 2rem', borderRadius: '12px', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
                <BookOpen size={24} color="#10b981" />
                <div style={{ textAlign: 'left' }}>
                  <div style={{ fontSize: '0.8rem', color: '#6ee7b7', textTransform: 'uppercase' }}>
                    {isEn ? "Architecture Governance Standard" : "Yazılım Mimari Standartları"}
                  </div>
                  <div style={{ color: 'white', fontWeight: 600 }}>Visualising Software Architecture (Simon Brown) & MADR (Markdown Architectural Decision Records)</div>
                </div>
             </div>
          </div>
        </section>
      </motion.div>
    </>
  );
};

export default DocsAnnotationsPage;
