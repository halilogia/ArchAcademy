import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Folder, FileJson, Code, Info, Terminal, Layout, Shield, Cpu } from 'lucide-react';

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
      title: 'Presentation Layer (Vücudumuz)',
      desc: 'Kullanıcının gördüğü ve etkileşime girdiği tüm UI bileşenlerini, sayfa şablonlarını ve animasyon mantığını barındırır. React dünyasında en büyük klasör burasıdır.',
      qna: 'Neden en büyük? Çünkü projemiz bir "Eğitim Portalı". İnteraktif Wizard, Surgery Modülü ve Roadmap gibi karmaşık görsel yapılar burada yaşar. İş mantığı (Domain) saf kalırken, onun görsel temsili burada detaylanır.',
      files: [
        { path: 'pages/ArchitectureWizard.jsx', role: 'Kullanıcının kararlarına göre puanlama yapan dinamik anket.' },
        { path: 'components/RefactoringSurgery.jsx', role: 'Düşük kaliteli kodu temiz koda dönüştüren interaktif playground.' },
        { path: 'pages/SOLIDPage.jsx', role: 'Ders içeriklerini ve ilerleme takibi tetikleyicilerini yöneten sayfa.' }
      ],
      codeSnippet: `// Interaktif UI Bileşeni (React + Framer Motion)
const Surgery = () => {
  const [done, setDone] = useState(false);
  return (
    <motion.div>
      {/* Görsel mantık burada (Visual Logic) */}
      <button onClick={() => setDone(true)}>Ameliyat Et</button>
    </motion.div>
  );
}`,
      hint: 'Bu katman projenin "Yüzü"dür. İş mantığından gelen veriyi, kullanıcıya en etkileyici şekilde sunmaktan sorumludur.'
    },
    context: {
      title: 'Context / State Layer (Merkezi Sinir Sistemi)',
      desc: 'Uygulamanın hafızasını ve katmanlar arası veri akışını yöneten, tüm bileşenleri sarmalayan yapıdır.',
      qna: 'Neden dışarıda? Context, sadece Presentation katmanına ait değildir. Uygulamanın en tepesinde (App.jsx) durur ve tüm katmanlara veri sızdırabilir. Mimari olarak "Cross-Cutting Concern" olduğu için katmanlardan bağımsız, merkezi bir konumdadır.',
      files: [
        { path: 'context/ProgressContext.jsx', role: 'Kullanıcının ilerlemesini (Quiz skorları, tamamlanan dersler) LocalStorage ile senkronize eder.' }
      ],
      codeSnippet: `// Global Progress Tracker
export const ProgressProvider = ({ children }) => {
  const [progress, setProgress] = useState(
    JSON.parse(localStorage.getItem('user_progress')) || {}
  );
  // Merkezi veri yönetim mantığı
  return <Context.Provider value={progress}>{children}</Context.Provider>;
}`,
      hint: 'Context, uygulamanın "belleği"dir. Sayfa yenilense bile verilerin kaybolmamasını sağlar.'
    },
    domain: {
      title: 'Domain Layer (Kalp & Beyin)',
      desc: 'Mimarilerin en saf halini, temel kurallarını ve değişmez yasalarını barındırır. Hiçbir kütüphaneye veya framework\'e bağımlı değildir.',
      qna: 'Burada neler var? Mimari kıyaslama kriterleri, puanlama algoritmaları ve kavramsal modeller burada saf JavaScript/TypeScript olarak yazılır.',
      files: [
        { path: 'entities/Architecture.js', role: 'Bir mimarinin sahip olması gereken temel özellikleri (pros, cons, tags) tanımlar.' },
        { path: 'usecases/CalculateWinner.js', role: 'Anketteki ağırlıklara göre en uygun mimariyi belirleyen saf matematiksel mantık.' }
      ],
      codeSnippet: `// Pure Domain Logic (No UI)
export const getConfidence = (scores) => {
  const max = Math.max(...Object.values(scores));
  const total = Object.values(scores).reduce((a, b) => a + b, 0);
  return Math.round((max / total) * 100);
};`,
      hint: 'Yarın React\'i bırakıp bir Mobil Uygulamaya geçsek bile bu klasörü kopyalayıp aynen kullanabiliriz.'
    },
    infrastructure: {
      title: 'Infrastructure Layer (Veri & Dış Dünya)',
      desc: 'Uygulamanın veriye nasıl ulaştığını gizleyen katmandır. Veritabanları, API\'ler veya LocalStorage entegrasyonları burada yönetilir.',
      files: [
        { path: 'data/GlossaryData.js', role: 'Sözlük ve eğitim içeriklerinin bulunduğu ham veri deposu.' },
        { path: 'data/ComparisonMatrix.js', role: 'Mimariler arası kıyaslama tablosunun teknik verileri.' }
      ],
      codeSnippet: `// Data Access Implementation
export const ArchitectureData = {
  clean: {
    id: 'clean',
    title: 'Clean Architecture',
    // ... teknik detaylar
  }
};`,
      hint: 'Eğer verileri bir sunucudan çekmek (Fetch) isterseniz, sadece bu katmana yeni bir servis eklemeniz yeterlidir.'
    }
  };

  type FolderKey = keyof typeof structure;
  const [activeFolder, setActiveFolder] = useState<FolderKey>('presentation');

  return (
    <section style={{ padding: '100px 0', background: 'rgba(2, 6, 23, 0.5)' }}>
      <div className="container">
        <h2 className="section-title">Derinlemesine Katman Analizi</h2>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '3rem' }}>
          {/* Explorer Side */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {(Object.keys(structure) as FolderKey[]).map((key) => (
              <div
                key={key}
                onClick={() => setActiveFolder(key)}
                className="glass-card"
                style={{
                  cursor: 'pointer',
                  borderLeft: activeFolder === key ? '4px solid var(--primary)' : '4px solid transparent',
                  background: activeFolder === key ? 'rgba(59, 130, 246, 0.1)' : 'var(--glass)',
                  padding: '1.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  transition: 'all 0.3s ease'
                }}
              >
                 <div style={{ 
                   background: activeFolder === key ? 'var(--primary)' : 'rgba(255,255,255,0.05)', 
                   padding: '10px', 
                   borderRadius: '12px',
                   color: activeFolder === key ? 'white' : 'var(--primary)'
                 }}>
                   {key === 'domain' && <Shield size={20} />}
                   {key === 'infrastructure' && <FileJson size={20} />}
                   {key === 'presentation' && <Layout size={20} />}
                   {key === 'context' && <Cpu size={20} />}
                 </div>
                 <div>
                    <h4 style={{ textTransform: 'capitalize', color: activeFolder === key ? 'var(--primary)' : 'white' }}>{key}</h4>
                    <span style={{ fontSize: '0.7rem', opacity: 0.5 }}>/src/{key}</span>
                 </div>
              </div>
            ))}

            <div className="glass-card" style={{ marginTop: '2rem', borderColor: 'rgba(59, 130, 246, 0.3)' }}>
               <h4 style={{ fontSize: '0.9rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                 <Terminal size={16} color="var(--primary)" /> "The Architecture Blueprint"
               </h4>
               <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                 Bu yapı, projenin büyümesiyle kodun "çorbaya" dönmesini engeller. Her yeni özellik, 
                 ilgili katmanına cerrahi bir hassasiyetle yerleştirilir. 
                 Mimarimiz sadece kod düzeni değil, bir <strong>Disiplin</strong>'dir.
               </p>
            </div>
          </div>

          {/* Code & Summary Side */}
          <div className="glass-card" style={{ padding: 0, overflow: 'hidden' }}>
            <div style={{ padding: '2rem 3rem', borderBottom: '1px solid var(--glass-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(0,0,0,0.2)' }}>
               <h3 style={{ color: 'var(--primary)', marginBottom: 0 }}>{structure[activeFolder].title}</h3>
               <div style={{ fontSize: '0.8rem', opacity: 0.5, fontFamily: 'monospace' }}>src/{activeFolder}/*</div>
            </div>
            
            <div style={{ padding: '3rem' }}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeFolder}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', marginBottom: '1.5rem', lineHeight: 1.7 }}>
                    {structure[activeFolder].desc}
                  </p>

                  {structure[activeFolder].qna && (
                    <div style={{ background: 'rgba(59, 130, 246, 0.05)', borderLeft: '3px solid var(--primary)', padding: '1.5rem', marginBottom: '2.5rem' }}>
                       <h5 style={{ fontSize: '0.8rem', color: 'var(--primary)', textTransform: 'uppercase', marginBottom: '0.5rem', fontWeight: 800 }}>Mimarın Notu</h5>
                       <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', fontStyle: 'italic', margin: 0 }}>{structure[activeFolder].qna}</p>
                    </div>
                  )}

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '2rem' }}>
                    <div>
                       <h5 style={{ fontSize: '0.8rem', opacity: 0.4, textTransform: 'uppercase', marginBottom: '1.5rem' }}>Önemli Dosyalar</h5>
                       <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                          {structure[activeFolder].files.map(file => (
                            <div key={file.path}>
                               <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontFamily: 'monospace', fontSize: '0.9rem', color: 'var(--primary)', marginBottom: '4px' }}>
                                 <Code size={14} /> {file.path}
                               </div>
                               <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginLeft: '1.4rem', lineHeight: 1.4 }}>{file.role}</div>
                            </div>
                          ))}
                       </div>
                    </div>
                    <div style={{ 
                      background: '#0a0a0f', 
                      borderRadius: '16px', 
                      padding: '1.5rem', 
                      overflowX: 'auto', 
                      border: '1px solid rgba(255,255,255,0.05)',
                      maxHeight: '350px'
                    }}>
                       <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                         <h5 style={{ fontSize: '0.7rem', opacity: 0.4, textTransform: 'uppercase' }}>Teknik Uygulama</h5>
                         <span style={{ fontSize: '0.6rem', color: 'var(--primary)', fontWeight: 800 }}>JSC / REACT</span>
                       </div>
                       <pre style={{ 
                         fontSize: '0.85rem', 
                         color: '#e2e8f0', 
                         lineHeight: 1.5, 
                         fontFamily: 'monospace',
                         margin: 0,
                         whiteSpace: 'pre'
                       }}>
                         <code>{structure[activeFolder].codeSnippet}</code>
                       </pre>
                    </div>
                  </div>

                  <div style={{ background: 'rgba(59, 130, 246, 0.05)', padding: '1.5rem', borderRadius: '16px', border: '1px solid rgba(59, 130, 246, 0.1)' }}>
                     <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                        <Info size={24} color="var(--primary)" />
                        <p style={{ fontSize: '0.9rem', color: 'white', fontWeight: 500, margin: 0 }}>{structure[activeFolder].hint}</p>
                     </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectStructure;
