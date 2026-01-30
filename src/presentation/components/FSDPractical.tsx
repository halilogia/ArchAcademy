import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Folder, Code, Terminal } from 'lucide-react';

const FSDPractical = () => {
  const structure = {
    features: {
      title: 'src/features/auth-by-email',
      desc: 'Belirli bir iş kabiliyeti. Auth süreci bir feature\'dır.',
      code: `// src/features/auth-by-email/ui/LoginForm.tsx
import { UserEntity } from "entities/user";
import { Button } from "shared/ui";

export const LoginForm = () => {
  // Shared ve Entities kullanılabilir, Widgets kullanılamaz!
  return <form>...</form>
}`
    },
    entities: {
      title: 'src/entities/product',
      desc: 'İş nesnesi tanımları, state yönetimi ve temel arayüzler.',
      code: `// src/entities/product/model/types.ts
export interface Product {
  id: string;
  price: number;
  title: string;
}`
    },
    shared: {
      title: 'src/shared/ui/button',
      desc: 'Projenin atomik parçaları. İş mantığından tamamen arındırılmıştır.',
      code: `// src/shared/ui/button/Button.tsx
export const Button = ({ children, onClick }) => {
  return <button className="custom-btn" onClick={onClick}>{children}</button>
}`
    }
  };

  type StructureKey = keyof typeof structure;
  const [activeFolder, setActiveFolder] = useState<StructureKey>('features');

  return (
    <section style={{ padding: '100px 0' }}>
      <div className="container">
        <h2 className="section-title">Klasör Yapısı ve Public API</h2>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '3rem' }}>
          <div>
            <div className="glass-card" style={{ marginBottom: '2rem' }}>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Terminal size={18} /> Metodoloji Prensipleri
              </h3>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: '1rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                <li style={{ background: 'rgba(255,255,255,0.03)', padding: '1rem', borderRadius: '12px' }}>
                  <strong>Public API (index.ts):</strong> Her dilim sadece <code>index.ts</code> üzerinden dışarıya ne açacağını belirler. İç detaylar gizli kalır.
                </li>
                <li style={{ background: 'rgba(255,255,255,0.03)', padding: '1rem', borderRadius: '12px' }}>
                  <strong>Low Coupling:</strong> Parçalar birbirinden bağımsız olmalıdır. Bir feature başka bir feature'a bağımlı olmamalıdır.
                </li>
              </ul>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {(Object.keys(structure) as StructureKey[]).map((key) => (
                <button
                  key={key}
                  onClick={() => setActiveFolder(key)}
                  className="glass-card"
                  style={{
                    textAlign: 'left',
                    padding: '1.25rem',
                    borderLeft: activeFolder === key ? '4px solid #06b6d4' : '4px solid transparent',
                    background: activeFolder === key ? 'rgba(6, 182, 212, 0.1)' : 'var(--glass)',
                    cursor: 'pointer',
                    width: '100%'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <Folder size={18} color="#06b6d4" />
                    <span style={{ fontWeight: 600, color: 'white' }}>{key.toUpperCase()}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="glass-card" style={{ padding: 0, overflow: 'hidden', background: '#0a0a0f' }}>
            <div style={{ padding: '1.25rem', borderBottom: '1px solid var(--glass-border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Code size={18} color="#06b6d4" />
                <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{structure[activeFolder].title}</span>
              </div>
            </div>
            <div style={{ padding: '2rem' }}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeFolder}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  <p style={{ color: '#06b6d4', marginBottom: '1.5rem', fontSize: '0.9rem' }}>{structure[activeFolder].desc}</p>
                  <pre style={{ color: '#e2e8f0', fontSize: '0.95rem', lineHeight: 1.6 }}><code>{structure[activeFolder].code}</code></pre>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FSDPractical;
