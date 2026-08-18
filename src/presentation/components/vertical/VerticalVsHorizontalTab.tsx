import React from 'react';
import { motion } from 'framer-motion';
import { Layers, ArrowRightLeft, CheckCircle2, XCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const VerticalVsHorizontalTab: React.FC = () => {
  const { i18n } = useTranslation();
  const isEn = (i18n.resolvedLanguage || i18n.language || 'tr').startsWith('en');

  const comparisons = [
    {
      metric: isEn ? "Folder Organization" : "Klasör Organizasyonu",
      vertical: isEn ? "Grouped by Feature (Features/Checkout)" : "İşlev/Özellik Odaklı (Features/Sepetim)",
      horizontal: isEn ? "Grouped by Technical Layer (Controllers, Services, Repos)" : "Teknik Katman Odaklı (Controllers, Services, Repos)",
      winner: 'vertical'
    },
    {
      metric: isEn ? "Feature Change Blast Radius" : "Yeni Özellik Ekleme Maliyeti",
      vertical: isEn ? "Touches only 1 feature directory (Zero cross-impact)" : "Yalnızca 1 klasör değişir (Yan etki sıfır)",
      horizontal: isEn ? "Must edit 4-5 layers simultaneously" : "Aynı anda 4-5 farklı katman dosyası düzenlenir",
      winner: 'vertical'
    },
    {
      metric: isEn ? "AI Context & Token Efficiency" : "AI ve Vibe Coding Uyumu",
      vertical: isEn ? "5/5 ⭐ (AI sees all relevant logic in one folder)" : "5/5 ⭐ (AI tüm kodu tek klasörde görür)",
      horizontal: isEn ? "2/5 ⭐ (AI jumps between 5 layers, high token waste)" : "2/5 ⭐ (AI 5 katman arasında zıplar, token israfı)",
      winner: 'vertical'
    },
    {
      metric: isEn ? "Shared Cross-Cutting Logic" : "Çapraz Katman Kuralları",
      vertical: isEn ? "Handled via MediatR / Pipeline behaviors" : "Pipeline / Middleware ile çözülür",
      horizontal: isEn ? "Native in shared core layer" : "Ortak katmanda doğrudan bulunur",
      winner: 'horizontal'
    }
  ];

  return (
    <motion.div key="compare" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
      <div className="glass-card" style={{ padding: '2.5rem', marginBottom: '2rem' }}>
        <h3 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'white', marginBottom: '1rem' }}>
          {isEn ? "Vertical Slice vs Horizontal Layering" : "Dikey Dilim (Vertical) vs Yatay Katmanlı (Horizontal) Mimari"}
        </h3>
        <p style={{ color: '#94a3b8', fontSize: '1.05rem', lineHeight: 1.7, marginBottom: '2rem', maxWidth: '800px' }}>
          {isEn 
            ? "Traditional N-Tier architectures slice systems horizontally by technical concern. Vertical Slice architectures slice vertically by business capability." 
            : "Geleneksel mimariler sistemi teknik rollerine göre yatay böler (Controller/Service/Repo). Dikey Dilim mimarisi ise sistemi iş özelliklerine göre dikine dilimler."
          }
        </p>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #334155' }}>
                <th style={{ padding: '12px 16px', color: '#94a3b8', fontSize: '0.85rem', textTransform: 'uppercase' }}>Kriter</th>
                <th style={{ padding: '12px 16px', color: '#f97316', fontSize: '0.85rem', textTransform: 'uppercase' }}>🍕 Vertical Slice</th>
                <th style={{ padding: '12px 16px', color: '#38bdf8', fontSize: '0.85rem', textTransform: 'uppercase' }}>🏢 Horizontal 3-Tier</th>
              </tr>
            </thead>
            <tbody>
              {comparisons.map((c, i) => (
                <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', background: i % 2 === 0 ? 'rgba(255,255,255,0.02)' : 'transparent' }}>
                  <td style={{ padding: '14px 16px', fontWeight: 700, color: 'white', fontSize: '0.9rem' }}>{c.metric}</td>
                  <td style={{ padding: '14px 16px', color: '#fed7aa', fontSize: '0.85rem' }}>{c.vertical}</td>
                  <td style={{ padding: '14px 16px', color: '#bae6fd', fontSize: '0.85rem' }}>{c.horizontal}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
};

export default VerticalVsHorizontalTab;
