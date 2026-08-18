import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Folder, FileJson, Code, Info, Terminal, Layout, Shield, Cpu, Globe, Database, Layers } from 'lucide-react';

interface StructureItem {
  title: string;
  desc: string;
  qna?: string;
  files: { path: string; role: string; }[];
  codeSnippet: string;
  hint: string;
}

const ProjectStructure = () => {
  const structure: Record<string, StructureItem> = {
    presentation: {
      title: 'Presentation Layer (Sunum & UI)',
      desc: 'Kullanıcının gördüğü ve etkileşime girdiği tüm UI bileşenlerini, 88 mimari sayfasını, interaktif atölyeleri ve animasyonları barındırır.',
      qna: 'Neden bu kadar modüler? Çünkü ArchAcademy bir "Mimari Bilgi Üssü". 88 sayfalık mimari katalog, Comparison Matrix, Acronyms Guide, Surgery ve Roadmap bileşenleri burada yaşar. Sayfalar iş mantığından arındırılmış, saf sunum odaklıdır.',
      files: [
        { path: 'pages/home.tsx', role: 'Dinamik i18n dil desteği ve Core Philosophy manifestosu.' },
        { path: 'pages/acronyms.tsx', role: 'Separation of Concerns ile ayrıştırılmış teknik kısaltmalar kılavuzu.' },
        { path: 'components/ComparisonMatrix.tsx', role: '32 mimariyi kriterlerine göre puanlayan dinamik tablo.' }
      ],
      codeSnippet: `// Dynamic Bilingual Presentation Component
const ArchitectureView: React.FC = () => {
  const { i18n } = useTranslation();
  const isEn = (i18n.resolvedLanguage || 'tr').startsWith('en');

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <h1>{isEn ? enContent.title : trContent.title}</h1>
    </motion.div>
  );
};`,
      hint: 'Bu katman projenin "Yüzü"dür. İş mantığından gelen veriyi, kullanıcıya en etkileyici şekilde sunmaktan sorumludur.'
    },
    infrastructure: {
      title: 'Infrastructure & Locales (Veri & Dil Katmanı)',
      desc: 'Tüm mimarilerin çift dilli (TR/EN) veri setlerini, 88 sayfanın yerelleştirilmiş içeriklerini ve 460+ sözlük terimini barındırır.',
      qna: 'Neden UI bileşenlerinden ayrıştırıldı? Separation of Concerns (SoC) kuralı gereği. Veriyi bileşenlerin içine gömmek bileşenleri yüzlerce satır şişiriyordu. Veri infrastructure/locales katmanına çekilerek bileşenler %75 hafifletildi.',
      files: [
        { path: 'locales/en/pages/*.en.ts', role: 'Swarm Engine ile üretilen 88 mimari sayfasının İngilizce içerikleri.' },
        { path: 'infrastructure/ComparisonMatrixData.ts', role: '32 mimarinin çift dilli karşılaştırma matrisi.' },
        { path: 'infrastructure/GlossaryData.ts', role: '460+ mimari teriminin çift dilli sözlük veri tabanı.' }
      ],
      codeSnippet: `// Decoupled Multi-Language Infrastructure
export const ACRONYMS_DATA: AcronymCategory[] = [
  {
    id: 'core-coding',
    title: { tr: 'Temel Kodlama', en: 'Core Coding' },
    items: [
      { acronym: 'KISS', name: { tr: 'Basit Tut', en: 'Keep It Simple' } }
    ]
  }
];`,
      hint: 'Tüm içerik, UI şablonlarından bağımsız bir veri havuzu olarak yaşar. Yarın mobil uygulamaya geçsek bile aynı veri kullanılır.'
    },
    context: {
      title: 'Context / State Layer (Merkezi Sinir Sistemi)',
      desc: 'Uygulamanın hafızasını ve katmanlar arası veri akışını yöneten, tüm bileşenleri sarmalayan yapıdır.',
      qna: 'Neden dışarıda? Context, sadece Presentation katmanına ait değildir. Uygulamanın en tepesinde (App.tsx) durur ve tüm katmanlara veri sağlar.',
      files: [
        { path: 'context/ProgressContext.tsx', role: 'Kullanıcının ilerlemesini (Quiz skorları, tamamlanan modüller) senkronize eder.' },
        { path: 'i18n/index.ts', role: 'i18next browser detector ve reaktif dil geçiş motoru.' }
      ],
      codeSnippet: `// Global State & Progress Tracker
export const ProgressProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [progress, setProgress] = useState(
    JSON.parse(localStorage.getItem('user_progress') || '{}')
  );
  return <Context.Provider value={{ progress, setProgress }}>{children}</Context.Provider>;
};`,
      hint: 'Context, uygulamanın "belleği"dir. Sayfa yenilense bile verilerin kaybolmamasını sağlar.'
    },
    domain: {
      title: 'Domain Layer (Kalp & Beyin)',
      desc: 'Mimarilerin en saf halini, temel kurallarını ve değişmez yasalarını barındırır. Hiçbir kütüphaneye veya framework\'e bağımlı değildir.',
      qna: 'Burada neler var? Mimari kıyaslama kriterleri, puanlama algoritmaları ve kavramsal modeller burada saf TypeScript olarak yazılır.',
      files: [
        { path: 'domain/entities/Architecture.ts', role: 'Bir mimarinin sahip olması gereken temel özellikleri (pros, cons, tags) tanımlar.' },
        { path: 'domain/usecases/CalculateWinner.ts', role: 'Anketteki ağırlıklara göre en uygun mimariyi belirleyen saf matematiksel mantık.' }
      ],
      codeSnippet: `// Pure Domain Logic (Agnostic TypeScript)
export const calculateConfidence = (scores: Record<string, number>): number => {
  const max = Math.max(...Object.values(scores));
  const total = Object.values(scores).reduce((a, b) => a + b, 0);
  return total === 0 ? 0 : Math.round((max / total) * 100);
};`,
      hint: 'Yarın React\'i bırakıp bir Mobil Uygulamaya geçsek bile bu klasörü kopyalayıp aynen kullanabiliriz.'
    }
  };

  const [activeTab, setActiveTab] = useState<string>('presentation');

  return (
    <section style={{ padding: '80px 0', borderTop: '1px solid var(--glass-border)' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h2 className="section-title">Klasör Mimarisi & Katmanlar</h2>
          <p style={{ color: 'var(--text-secondary)' }}>Clean Architecture prensipleriyle inşa edilmiş 4 ana katman.</p>
        </div>

        {/* Tab Buttons */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '3rem', flexWrap: 'wrap' }}>
          {Object.keys(structure).map((key) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              style={{
                padding: '0.8rem 1.8rem',
                borderRadius: '12px',
                background: activeTab === key ? 'var(--primary)' : 'rgba(255,255,255,0.03)',
                color: activeTab === key ? 'white' : 'var(--text-secondary)',
                border: '1px solid var(--glass-border)',
                fontWeight: 700,
                fontSize: '0.9rem',
                cursor: 'pointer',
                transition: 'all 0.2s',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              {key === 'presentation' && <Layout size={16} />}
              {key === 'infrastructure' && <Database size={16} />}
              {key === 'context' && <Cpu size={16} />}
              {key === 'domain' && <Shield size={16} />}
              {key.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Active Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="glass-card"
            style={{ padding: '3.5rem', borderRadius: '30px' }}
          >
            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '3rem', alignItems: 'start' }}>
              <div>
                <h3 style={{ fontSize: '2rem', marginBottom: '1rem', color: 'white' }}>
                  {structure[activeTab].title}
                </h3>
                <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: '2rem', fontSize: '1.05rem' }}>
                  {structure[activeTab].desc}
                </p>

                {structure[activeTab].qna && (
                  <div style={{
                    background: 'rgba(59, 130, 246, 0.05)',
                    borderLeft: '4px solid var(--primary)',
                    padding: '1.5rem',
                    borderRadius: '0 16px 16px 0',
                    marginBottom: '2rem'
                  }}>
                    <div style={{ fontWeight: 800, color: 'var(--primary)', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
                      MİMARİ GEREKÇE (RATIONALE):
                    </div>
                    <div style={{ color: '#cbd5e1', fontSize: '0.95rem', lineHeight: 1.6 }}>
                      {structure[activeTab].qna}
                    </div>
                  </div>
                )}

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div style={{ fontWeight: 800, fontSize: '0.85rem', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '1px' }}>
                    Kritik Dosyalar
                  </div>
                  {structure[activeTab].files.map((file, idx) => (
                    <div key={idx} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                      <Code size={16} color="var(--primary)" style={{ marginTop: '3px', flexShrink: 0 }} />
                      <div>
                        <strong style={{ color: 'white', fontSize: '0.95rem' }}>{file.path}</strong>
                        <div style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>{file.role}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div style={{ background: '#0a0f1d', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)', overflow: 'hidden' }}>
                  <div style={{ padding: '10px 16px', background: 'rgba(255,255,255,0.03)', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ef4444' }}></div>
                    <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#f59e0b' }}></div>
                    <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#10b981' }}></div>
                    <span style={{ fontSize: '0.75rem', color: '#64748b', marginLeft: '10px', fontFamily: 'monospace' }}>Code Example</span>
                  </div>
                  <pre style={{ padding: '1.5rem', margin: 0, color: '#e2e8f0', fontSize: '0.85rem', lineHeight: 1.6, overflowX: 'auto', fontFamily: 'monospace' }}>
                    {structure[activeTab].codeSnippet}
                  </pre>
                </div>
                <div style={{ marginTop: '1.5rem', display: 'flex', gap: '10px', alignItems: 'center', background: 'rgba(255,255,255,0.02)', padding: '1rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
                  <Info size={18} color="var(--primary)" style={{ flexShrink: 0 }} />
                  <span style={{ fontSize: '0.85rem', color: '#94a3b8', fontStyle: 'italic' }}>{structure[activeTab].hint}</span>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default ProjectStructure;
