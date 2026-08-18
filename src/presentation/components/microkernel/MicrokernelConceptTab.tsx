import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

export const MicrokernelConceptTab: React.FC = () => {
  const { i18n } = useTranslation();
  const isEn = (i18n.resolvedLanguage || i18n.language || 'tr').startsWith('en');

  return (
    <motion.div
      key="concept"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      style={{ padding: '2rem', background: 'rgba(255,255,255,0.02)', borderRadius: '24px', border: '1px solid #1e293b' }}
    >
      <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#10b981' }}>
        {isEn ? "Minimalist Core, Boundless Extensibility" : "Minimalist Çekirdek, Sonsuz Yetenek"}
      </h3>
      <p style={{ lineHeight: '1.7', color: '#cbd5e1' }}>
        {isEn 
          ? "In monolithic applications, every business feature (Payment, Search, Export, Themes) is bundled into a single rigid deployment package. In Microkernel architectures, the core host application only knows how to register, isolate, and execute dynamic plug-ins." 
          : "Geleneksel monolotik sistemlerde tüm özellikler (Ödeme, Arama, Grafik vb.) tek bir büyük paketin içindedir. Microkernel mimarisinde ise ana uygulama sadece eklentileri yüklemeyi ve çalıştırmayı bilir."
        }
      </p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px', marginTop: '2rem' }}>
        <div className="glass-card">
          <h4 style={{ color: '#fff' }}>VS Code</h4>
          <p style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
            {isEn 
              ? "The core engine is essentially an electron text editor with an LSP bridge. Python, themes, Git, and copilot integrations are all isolated extensions." 
              : "Çekirdek sadece metin düzenler. Python desteği, Renk temaları, Git entegrasyonu hepsi birer 'Plugin'dir."
            }
          </p>
        </div>
        <div className="glass-card">
          <h4 style={{ color: '#fff' }}>{isEn ? "Air Traffic Control" : "Hava Trafik Kontrolü"}</h4>
          <p style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
            {isEn 
              ? "Radar beacon tracking is the immutable mission-critical kernel. Weather feeds and flight plan integrations hook in as dynamic plugins." 
              : "Radar izleme ana çekirdektir. Hava durumu, Uçuş planı gibi veriler eklenti olarak gelir."
            }
          </p>
        </div>
        <div className="glass-card">
          <h4 style={{ color: '#fff' }}>{isEn ? "Enterprise Banking" : "Bankacılık App"}</h4>
          <p style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
            {isEn 
              ? "Ledger settlement and wire transfers form the core. Loyalty rewards, loan calculators, and insurance offers load dynamically as plugins." 
              : "Para transferi çekirdektir. Kampanyalar ve Sigorta teklifleri dinamik eklentilerdir."
            }
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default MicrokernelConceptTab;
