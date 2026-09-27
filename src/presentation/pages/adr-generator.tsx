import React, { useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { FileText, Layers, GitBranch } from 'lucide-react';
import SEO from '../components/SEO';
import ArchHero from '../components/ArchHero';
import { AdrGeneratorPanel } from '../components/adr/AdrGeneratorPanel';
import { TopologyIssueList } from '../components/sandbox/TopologyIssueList';
import { useProgress } from '../context/ProgressContext';
import { useSandboxStore } from '../../infrastructure/stores/sandboxStore';
import { analyzeTopology } from '../../domain/usecases/TopologyAnalyzer';
import { SandboxDesign } from '../../domain/entities/Sandbox';

const AdrGeneratorPage: React.FC = () => {
  const { i18n } = useTranslation();
  const isEn = (i18n.resolvedLanguage || i18n.language || 'tr').startsWith('en');
  const { completeStep, saveDesign } = useProgress();

  const nodes = useSandboxStore((state) => state.nodes);
  const edges = useSandboxStore((state) => state.edges);
  const name = useSandboxStore((state) => state.name);
  const snapshot = useSandboxStore((state) => state.snapshot);

  const design = useMemo<SandboxDesign>(() => ({ id: '', name, nodes, edges, updatedAt: '' }), [edges, name, nodes]);
  const issues = useMemo(() => analyzeTopology({ nodes, edges }), [edges, nodes]);

  useEffect(() => {
    const timer = setTimeout(() => completeStep('/adr-generator'), 2000);
    return () => clearTimeout(timer);
  }, [completeStep]);

  return (
    <>
      <SEO
        title={isEn ? 'Architecture Decision Record Generator | ArchAcademy' : 'Mimari Karar Kaydı (ADR) Üreticisi | ArchAcademy'}
        description={isEn
          ? 'Generate MADR 3.0 architecture decision records from your system design sandbox topology, complete with Mermaid diagram, component inventory and open risks.'
          : 'Sistem tasarım sandbox topolojinizden Mermaid diyagramı, bileşen envanteri ve açık risklerle MADR 3.0 mimari karar kaydı üretin.'}
        keywords="adr generator, madr, architecture decision record, mermaid, decision log, system design"
        canonicalUrl="/adr-generator"
      />

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ background: 'var(--bg-dark)', minHeight: '100vh' }}>
        <ArchHero
          title="Decision"
          subtitle={isEn ? 'Records' : 'Kayıtları'}
          description={isEn
            ? 'Architecture knowledge rots when decisions live only in chat threads. This generator produces a MADR 3.0 record from the topology you modeled: context, drivers, the decision itself, the component inventory, a Mermaid diagram and the risks your design still carries.'
            : 'Kararlar yalnızca sohbet mesajlarında yaşadığında mimari bilgi çürür. Bu üretici, modellediğiniz topolojiden MADR 3.0 kaydı üretir: bağlam, etkenler, kararın kendisi, bileşen envanteri, Mermaid diyagramı ve tasarımın taşıdığı riskler.'}
          badge={isEn ? 'Phase 2 · Governance' : 'Faz 2 · Yönetişim'}
          color="#a855f7"
          illustration={
            <div style={{ position: 'relative', width: '200px', height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
                style={{ position: 'absolute', width: '160px', height: '160px', borderRadius: '30px', border: '2px dashed rgba(168,85,247,0.4)' }}
              />
              <div style={{ width: '90px', height: '90px', background: '#020617', border: '3px solid #a855f7', borderRadius: '22px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 30px rgba(168,85,247,0.3)' }}>
                <FileText size={36} color="#a855f7" />
                <span style={{ fontSize: '0.65rem', fontWeight: 800, color: 'white', marginTop: '4px' }}>ADR</span>
              </div>
            </div>
          }
          features={[
            {
              icon: <Layers size={20} />,
              title: 'MADR 3.0.0',
              desc: isEn
                ? 'Context, Decision Drivers, Considered Options, Decision, Consequences and Review Triggers sections.'
                : 'Bağlam, Karar Etkenleri, Değerlendirilen Seçenekler, Karar, Sonuçlar ve Gözden Geçirme Tetikleyicileri.'
            },
            {
              icon: <GitBranch size={20} />,
              title: isEn ? 'Topology Aware' : 'Topoloji Farkında',
              desc: isEn
                ? 'The component inventory, redundancy plan and Mermaid flowchart are derived from your live sandbox canvas.'
                : 'Bileşen envanteri, fazlalık planı ve Mermaid akış şeması canlı sandbox tuvalinizden türetilir.'
            },
            {
              icon: <FileText size={20} />,
              title: isEn ? 'Review Triggers' : 'Gözden Geçirme Tetikleyicileri',
              desc: isEn
                ? 'Unresolved topology findings are embedded as open architectural risks with severity levels.'
                : 'Çözülmemiş topoloji bulguları, seviyeleriyle birlikte açık mimari risk olarak belgeye gömülür.'
            }
          ]}
        />

        <div className="container" style={{ marginTop: '2rem', paddingBottom: '6rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <AdrGeneratorPanel
            design={design}
            issues={issues}
            isEn={isEn}
            onSave={() => {
              saveDesign(snapshot());
              completeStep('/adr-generator');
            }}
          />
          <TopologyIssueList issues={issues} isEn={isEn} />
        </div>
      </motion.div>
    </>
  );
};

export default AdrGeneratorPage;
