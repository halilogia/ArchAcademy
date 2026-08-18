import React from 'react';
import { motion } from 'framer-motion';
import { FileCode2, GitBranch, RefreshCw, Layers } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const ArchitectureDiagramsTab: React.FC = () => {
  const { i18n } = useTranslation();
  const isEn = (i18n.resolvedLanguage || i18n.language || 'tr').startsWith('en');

  const tools = [
    { name: 'Mermaid.js', type: 'Markdown Native', desc: isEn ? 'Renders directly inside GitHub/GitLab markdown with zero external rendering pipelines.' : 'GitHub ve GitLab içinde doğrudan render edilen metin tabanlı diyagram standardı.' },
    { name: 'PlantUML', type: 'Enterprise Standard', desc: isEn ? 'Comprehensive UML support, sequence diagrams, component views, and serverless architectures.' : 'Kapsamlı UML, ardışıl düzen (sequence) ve bileşen diyagramları için endüstri standardı.' },
    { name: 'Structurizr DSL', type: 'C4 as Code', desc: isEn ? 'Define the model once in DSL, render multiple perspectives and exports automatically.' : 'C4 modelini tek bir DSL ile tanımlayıp tüm seviye diyagramlarını otomatik üreten araç.' }
  ];

  return (
    <motion.div key="diagrams" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
      <div className="glass-card" style={{ padding: '2.5rem', marginBottom: '2rem' }}>
        <h3 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'white', marginBottom: '1rem' }}>
          {isEn ? "Diagrams as Code (DaC)" : "Kod Olarak Diyagramlar (Diagrams as Code - DaC)"}
        </h3>
        <p style={{ color: '#94a3b8', fontSize: '1.05rem', lineHeight: 1.7, marginBottom: '2rem', maxWidth: '800px' }}>
          {isEn 
            ? "Static PNG/Visio diagrams decay and rot within weeks. Diagrams as Code stores diagrams as text in Git, enabling code reviews, diff tracking, and auto-generation." 
            : "Statik Visio veya PNG çizimleri birkaç haftada eskir ve koddan kopar. 'Kod Olarak Diyagram' yaklaşımıyla diyagramlar metin olarak Git'te saklanır ve PR süreçlerinde kodla birlikte güncellenir."
          }
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
          {tools.map((t, i) => (
            <div key={i} style={{ background: '#020617', padding: '1.5rem', borderRadius: '16px', border: '1px solid #1e293b', borderTop: '3px solid #38bdf8' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <h4 style={{ color: 'white', fontWeight: 800, fontSize: '1.1rem', margin: 0 }}>{t.name}</h4>
                <span style={{ fontSize: '0.75rem', color: '#38bdf8', background: 'rgba(56, 189, 248, 0.15)', padding: '2px 8px', borderRadius: '6px', fontWeight: 700 }}>
                  {t.type}
                </span>
              </div>
              <p style={{ color: '#94a3b8', fontSize: '0.85rem', lineHeight: 1.6, margin: 0 }}>{t.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default ArchitectureDiagramsTab;
