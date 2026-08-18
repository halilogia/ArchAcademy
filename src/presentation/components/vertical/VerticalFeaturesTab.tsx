import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Folder, Box, ShieldCheck, Zap } from 'lucide-react';

export const VerticalFeaturesTab: React.FC = () => {
  const { i18n } = useTranslation();
  const isEn = (i18n.resolvedLanguage || i18n.language || 'tr').startsWith('en');

  const rules = [
    { 
      t: isEn ? 'Feature-Based Grouping' : 'Özellik Bazlı Gruplama', 
      d: isEn ? 'Group code by business capability (Features), not by technical layers (Controllers/Services).' : 'Kodu teknik katmanlara (Controller/Service) göre değil, iş özelliklerine göre gruplayın.' 
    },
    { 
      t: isEn ? 'Minimal Sharing' : 'Minimum Paylaşım', 
      d: isEn ? 'Avoid sharing code between slices. Duplication is far cheaper than the wrong tight coupling.' : 'Dilimler arasında kod paylaşımından kaçının. Kod tekrarı, sıkı bağımlılıktan (Coupling) daha iyidir.' 
    },
    { 
      t: isEn ? 'Flexible Internal Design' : 'Esnek İç Yapı', 
      d: isEn ? 'One slice can execute raw SQL while another complex slice applies rich DDD aggregates.' : 'Bir dilim basit bir SQL sorgusu kullanırken, diğeri karmaşık bir DDD Aggregate kullanabilir.' 
    }
  ];

  return (
    <motion.div key="features" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 450px) 1fr', gap: '2.5rem', alignItems: 'start' }}>
        {/* Folder Structure Visualization */}
        <div className="glass-card" style={{ background: '#020617', padding: '2rem', border: '1px solid #1e293b' }}>
          <h4 style={{ marginBottom: '1.5rem', color: '#f97316', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 800 }}>
            📂 {isEn ? "Feature Slice Project Layout" : "Proje Klasör Yapısı"}
          </h4>
          <div style={{ fontFamily: 'monospace', fontSize: '0.9rem', color: '#94a3b8', lineHeight: 1.8 }}>
            <div>src/</div>
            <div style={{ paddingLeft: '20px' }}>Features/</div>
            <div style={{ paddingLeft: '40px', color: '#f97316', fontWeight: 'bold' }}>Siparişler/ (Orders)</div>
            <div style={{ paddingLeft: '60px' }}>📦 SiparişVer.cs (Command)</div>
            <div style={{ paddingLeft: '60px' }}>📦 SiparişDetay.cs (Query)</div>
            <div style={{ paddingLeft: '60px' }}>📦 SiparişRepository.cs</div>
            <div style={{ paddingLeft: '40px', color: '#10b981', fontWeight: 'bold' }}>Ürünler/ (Catalog)</div>
            <div style={{ paddingLeft: '60px' }}>📦 ÜrünListele.cs</div>
            <div style={{ paddingLeft: '60px' }}>📦 ÜrünAra.cs</div>
            <div style={{ paddingLeft: '20px' }}>Infrastructure/</div>
            <div style={{ paddingLeft: '40px' }}>DatabaseContext.cs</div>
          </div>
          <p style={{ marginTop: '1.5rem', fontSize: '0.8rem', fontStyle: 'italic', color: '#64748b', margin: 0 }}>
            {isEn ? "* Each folder is a self-contained autonomous micro-architecture." : "* Her klasör kendi içinde tamamen bağımsız bir minyatür mimaridir."}
          </p>
        </div>

        {/* Core Rules */}
        <div className="glass-card" style={{ padding: '2rem' }}>
          <h3 style={{ fontSize: '1.6rem', fontWeight: 800, marginBottom: '1.5rem', color: 'white' }}>
            {isEn ? "Vertical Slice Guiding Principles" : "Dikey Dilim Kuralları"}
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {rules.map((rule, i) => (
              <div key={i} style={{ display: 'flex', gap: '1rem', background: '#020617', padding: '1.25rem', borderRadius: '12px', border: '1px solid #1e293b' }}>
                <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'rgba(249, 115, 22, 0.2)', color: '#f97316', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontWeight: 800, fontSize: '0.85rem' }}>
                  {i+1}
                </div>
                <div>
                  <h4 style={{ color: 'white', marginBottom: '4px', fontWeight: 800, fontSize: '1rem' }}>{rule.t}</h4>
                  <p style={{ color: '#94a3b8', fontSize: '0.9rem', margin: 0, lineHeight: 1.5 }}>{rule.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default VerticalFeaturesTab;
