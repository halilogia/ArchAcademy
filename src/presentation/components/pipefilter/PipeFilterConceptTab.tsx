import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

export const PipeFilterConceptTab: React.FC = () => {
  const { i18n } = useTranslation();
  const isEn = (i18n.resolvedLanguage || i18n.language || 'tr').startsWith('en');

  return (
    <motion.div
      key="concept"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
        <div className="glass-card" style={{ borderTop: '4px solid #ec4899' }}>
          <h3 style={{ color: '#ec4899', marginBottom: '1rem' }}>
            {isEn ? "The Food Processor Analogy" : "Mutfak Robotu Analojisi"}
          </h3>
          <p style={{ color: '#cbd5e1', lineHeight: '1.6' }}>
            {isEn 
              ? "Imagine a canning factory turning raw tomatoes into ketchup through discrete processing stations:" 
              : "Bir fabrikada domatesin ketçaba dönüşmesini düşünün:"
            }
          </p>
          <ul style={{ listStyle: 'none', padding: 0, marginTop: '1rem' }}>
            <li style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '10px' }}>
              <div style={{ width: '20px', height: '20px', background: '#334155', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem' }}>1</div>
              <span>{isEn ? "Washing & Cleaning (Filter A)" : "Yıkama (Filter A)"}</span>
            </li>
            <li style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '10px' }}>
              <div style={{ width: '20px', height: '20px', background: '#334155', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem' }}>2</div>
              <span>{isEn ? "Peeling Skin (Filter B)" : "Soyma (Filter B)"}</span>
            </li>
            <li style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '10px' }}>
              <div style={{ width: '20px', height: '20px', background: '#334155', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem' }}>3</div>
              <span>{isEn ? "Pureeing & Mashing (Filter C)" : "Ezme (Filter C)"}</span>
            </li>
          </ul>
          <p style={{ fontSize: '0.9rem', color: '#94a3b8', marginTop: '10px' }}>
            {isEn 
              ? "The 'Washing' stage has zero awareness of how 'Mashing' operates. It only passes clean tomatoes into the conveyor pipe." 
              : "'Yıkama' makinesi, 'Ezme' makinesinin nasıl çalıştığını bilmez. Sadece temiz domates verir. Aradaki bant ise 'Pipe'tır."
            }
          </p>
        </div>

        <div className="glass-card">
          <h4 style={{ marginBottom: '1rem', color: '#fff' }}>
            {isEn ? "Unix Command Line Architecture" : "Unix Command Line"}
          </h4>
          <div style={{ fontFamily: 'monospace', background: '#020617', padding: '15px', borderRadius: '8px', color: '#10b981' }}>
            <span style={{ color: '#ec4899' }}>cat</span> users.txt | <span style={{ color: '#d946ef' }}>grep</span> "admin" | <span style={{ color: '#a855f7' }}>sort</span> | <span style={{ color: '#3b82f6' }}>uniq</span>
          </div>
          <p style={{ marginTop: '15px', fontSize: '0.9rem', color: '#cbd5e1' }}>
            {isEn 
              ? "The most famous real-world incarnation of this pattern is the Unix terminal pipeline. Every command is an isolated filter, and the '|' pipe channels raw byte streams between them." 
              : "Bu mimarinin en ünlü örneği Unix/Linux terminalidir. Her komut bir filtredir ve '|' işareti bir borudur (Pipe)."
            }
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default PipeFilterConceptTab;
