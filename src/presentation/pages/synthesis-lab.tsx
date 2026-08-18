import React from 'react';
import { useTranslation } from 'react-i18next';
import SEO from '../components/SEO';
import { SynthesisSidebar } from '../components/synthesislab/SynthesisSidebar';
import { SynthesisCanvas } from '../components/synthesislab/SynthesisCanvas';
import { SynthesisInspector } from '../components/synthesislab/SynthesisInspector';
import { SynthesisResultModal } from '../components/synthesislab/SynthesisResultModal';
import { useSynthesisLab } from '../components/synthesislab/useSynthesisLab';

const SynthesisLabPage: React.FC = () => {
  const { i18n } = useTranslation();
  const isEn = (i18n.resolvedLanguage || i18n.language || 'tr').startsWith('en');
  
  const lab = useSynthesisLab();

  return (
    <>
      <SEO
        title={isEn ? "Interactive Architecture Synthesis Lab | ArchAcademy" : "İnteraktif Mimari Sentez Laboratuvarı | ArchAcademy"}
        description={isEn 
          ? "Design, connect, and synthesize Clean Architecture layers visually on an interactive canvas." 
          : "Görsel tuval üzerinde Clean Architecture katmanlarını bağlayın, tasarlayın ve kod sentezleyin."
        }
        keywords="architecture synthesis, visual architecture designer, clean architecture canvas, code generator"
        canonicalUrl="/synthesis-lab"
      />
      <div style={{ display: 'flex', height: '100vh', background: '#020617', color: '#e2e8f0', overflow: 'hidden' }}>
        <SynthesisSidebar 
          activeTab={lab.activeTab} 
          setActiveTab={lab.setActiveTab} 
        />

        <SynthesisCanvas
          containerRef={lab.containerRef}
          nodes={lab.nodes}
          setNodes={lab.setNodes}
          connections={lab.connections}
          setConnections={lab.setConnections}
          pendingConnection={lab.pendingConnection}
          setPendingConnection={lab.setPendingConnection}
          mousePos={lab.mousePos}
          onDropFile={lab.onDropFile}
        />

        <SynthesisInspector 
          nodes={lab.nodes} 
          connections={lab.connections} 
          onSynthesize={lab.handleSynthesize} 
          isSynthesizing={lab.isSynthesizing} 
        />

        <SynthesisResultModal
          synthesizedCode={lab.synthesizedCode}
          onClose={() => lab.setSynthesizedCode(null)}
        />
      </div>
    </>
  );
};

export default SynthesisLabPage;
