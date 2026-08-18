import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Star, Zap, Users, Layers, ChevronUp, ChevronDown, Minimize2, Repeat, ShieldCheck, FolderTree } from 'lucide-react';
import { MATRIX_DATA, MATRIX_SUMMARY_CARDS } from '../../infrastructure/ComparisonMatrixData';

type SortConfig = {
  key: string;
  direction: 'ascending' | 'descending';
};

const ComparisonMatrix: React.FC = () => {
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  const lang = (i18n.language === 'en' ? 'en' : 'tr') as 'tr' | 'en';

  const [sortConfig, setSortConfig] = useState<SortConfig | null>({ key: 'speed', direction: 'descending' });

  const sortedData = useMemo(() => {
    let sortableData = [...MATRIX_DATA];
    if (sortConfig !== null) {
      sortableData.sort((a: any, b: any) => {
        const aValue = a[sortConfig.key];
        const bValue = b[sortConfig.key];
        
        if (aValue < bValue) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableData;
  }, [sortConfig]);

  const requestSort = (key: string) => {
    let direction: 'ascending' | 'descending' = 'descending';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'descending') {
      direction = 'ascending';
    }
    setSortConfig({ key, direction });
  };

  const renderStars = (count: number) => {
    return (
      <div style={{ display: 'flex', gap: '2px', justifyContent: 'center' }}>
        {[...Array(5)].map((_, i) => (
          <Star 
            key={i} 
            size={12} 
            fill={i < count ? "currentColor" : "transparent"} 
            color={i < count ? "inherit" : "rgba(255,255,255,0.08)"} 
          />
        ))}
      </div>
    );
  };

  const getSortIcon = (key: string) => {
    if (sortConfig?.key !== key) return <div style={{ width: 14 }} />;
    return sortConfig.direction === 'ascending' ? <ChevronUp size={14} /> : <ChevronDown size={14} />;
  };

  return (
    <section style={{ padding: '80px 0' }}>
      <div className="container" style={{ maxWidth: '1600px', width: '95%' }}>
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           style={{ textAlign: 'center', marginBottom: '3.5rem' }}
        >
          <h2 className="gradient-text" style={{ fontSize: '3.5rem', fontWeight: 800 }}>THE MASTER MATRIX</h2>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '750px', margin: '1.5rem auto', lineHeight: 1.8 }}>
            {lang === 'en'
              ? 'Strategic comparison of core software architectures across 7 vital engineering dimensions. Click any header to sort.'
              : 'Temel mimari stiller ve disiplinlerin 7 stratejik boyutta kıyaslaması. Sıralamak için sütun başlıklarına tıklayın.'
            }
          </p>
        </motion.div>

        <div style={{ width: '100%', overflowX: 'auto', paddingBottom: '1rem' }}>
          <table style={{
            width: '100%',
            borderCollapse: 'separate',
            borderSpacing: '0 8px',
            minWidth: '1200px'
          }}>
            <thead>
              <tr style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                <th 
                  onClick={() => requestSort('name')}
                  style={{ textAlign: 'left', padding: '1rem 2rem', cursor: 'pointer', verticalAlign: 'middle', width: '28%' }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                     Arch / Style / Pattern {getSortIcon('name')}
                  </div>
                </th>
                <th 
                  onClick={() => requestSort('sizeValue')}
                  style={{ textAlign: 'center', padding: '1rem', cursor: 'pointer', width: '12%' }}
                  title={lang === 'en' ? "Team and Project Scale" : "Ekip ve Proje Ölçeği"}
                >
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '5px' }}>
                    <Users size={18} /> 
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>{lang === 'en' ? 'Scale' : 'Boyut'} {getSortIcon('sizeValue')}</div>
                  </div>
                </th>
                <th 
                  onClick={() => requestSort('speed')}
                  style={{ textAlign: 'center', padding: '1rem', cursor: 'pointer', width: '10%' }}
                  title={lang === 'en' ? "Velocity / Time to Market" : "Velocity / Hızlı Teslimat & Time-to-Market"}
                >
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '5px' }}>
                    <Zap size={18} /> 
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>Velocity {getSortIcon('speed')}</div>
                  </div>
                </th>
                <th 
                  onClick={() => requestSort('kiss')}
                  style={{ textAlign: 'center', padding: '1rem', cursor: 'pointer', width: '10%' }}
                  title="KISS: Keep It Simple, Stupid"
                >
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '5px' }}>
                    <Minimize2 size={18} /> 
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>KISS {getSortIcon('kiss')}</div>
                  </div>
                </th>
                <th 
                  onClick={() => requestSort('dry')}
                  style={{ textAlign: 'center', padding: '1rem', cursor: 'pointer', width: '10%' }}
                  title={lang === 'en' ? "DRY Discipline (5★ = Zero Duplication, 1★ = WET/AHA Autonomy)" : "DRY Disiplini (5★ = Sıfır Kod Tekrarı, 1★ = WET/AHA Bağımsızlık)"}
                >
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '5px' }}>
                    <Repeat size={18} /> 
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>DRY {getSortIcon('dry')}</div>
                  </div>
                </th>
                <th 
                  onClick={() => requestSort('flex')}
                  style={{ textAlign: 'center', padding: '1rem', cursor: 'pointer', width: '10%' }}
                  title={lang === 'en' ? "Flexibility & Modularity" : "Flexibility & Modularity (Değişime ve Eklentilere Açıklık)"}
                >
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '5px' }}>
                    <Layers size={18} /> 
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>Flexibility {getSortIcon('flex')}</div>
                  </div>
                </th>
                <th 
                  onClick={() => requestSort('maintAndTest')}
                  style={{ textAlign: 'center', padding: '1rem', cursor: 'pointer', width: '10%' }}
                  title={lang === 'en' ? "Maintainability & Test Coverage" : "Bakım ve Test Edilebilirlik Gücü"}
                >
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '5px' }}>
                    <ShieldCheck size={18} /> 
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>{lang === 'en' ? 'Maint & Test' : 'Bakım & Test'} {getSortIcon('maintAndTest')}</div>
                  </div>
                </th>
                <th 
                  onClick={() => requestSort('aiLocality')}
                  style={{ textAlign: 'center', padding: '1rem', cursor: 'pointer', width: '10%' }}
                  title={lang === 'en' ? "AI Locality: Minimum folder hopping and high feature cohesion for Vibe Coding" : "AI Locality (Vibe): Minimum klasör atlama ve yüksek özellik bütünlüğü"}
                >
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '5px' }}>
                    <FolderTree size={18} /> 
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>Locality (Vibe) {getSortIcon('aiLocality')}</div>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
                {sortedData.map((row) => (
                  <tr
                    key={row.name}
                    onClick={() => navigate(row.path)}
                    style={{
                      background: 'var(--glass)',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                      cursor: 'pointer',
                      transition: 'background 0.2s, transform 0.2s',
                    }}
                    className="matrix-row"
                  >
                    <td style={{ 
                      padding: '1.25rem 2rem', 
                      borderRadius: '16px 0 0 16px',
                      borderLeft: `4px solid ${row.color}`
                    }}>
                      <div style={{ fontWeight: 700, marginBottom: '4px' }}>{row.name}</div>
                      <div style={{ fontSize: '0.7rem', color: row.color, fontWeight: 600 }}>
                        BEST FOR: {row.bestFor[lang] || row.bestFor.tr}
                      </div>
                    </td>
                    <td style={{ textAlign: 'center', padding: '1.25rem', fontSize: '0.8rem' }}>
                      {row.size[lang] || row.size.tr}
                    </td>
                    <td style={{ textAlign: 'center', padding: '1.25rem', color: '#f59e0b' }}>{renderStars(row.speed)}</td>
                    <td style={{ textAlign: 'center', padding: '1.25rem', color: '#84cc16' }}>{renderStars(row.kiss)}</td>
                    <td style={{ textAlign: 'center', padding: '1.25rem', color: '#6366f1' }}>{renderStars(row.dry)}</td>
                    <td style={{ textAlign: 'center', padding: '1.25rem', color: '#10b981' }}>{renderStars(row.flex)}</td>
                    <td style={{ textAlign: 'center', padding: '1.25rem', color: '#06b6d4' }}>{renderStars(row.maintAndTest)}</td>
                    <td style={{ textAlign: 'center', padding: '1.25rem', borderRadius: '0 16px 16px 0', color: '#f97316' }}>{renderStars(row.aiLocality)}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        {/* Dynamic Summary Cards */}
        <div style={{ marginTop: '4rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem' }}>
          {MATRIX_SUMMARY_CARDS.map(card => (
            <div 
              key={card.id} 
              className="glass-card" 
              style={{ textAlign: 'center', border: `1px solid ${card.borderColor}` }}
            >
              <h4 style={{ marginBottom: '0.75rem', color: card.color }}>
                {card.title[lang] || card.title.tr}
              </h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                {card.desc[lang] || card.desc.tr}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ComparisonMatrix;
