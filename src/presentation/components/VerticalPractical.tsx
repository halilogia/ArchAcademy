import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Folder, Code, Terminal, FileText } from 'lucide-react';

const VerticalPractical = () => {
  const [activeSlice, setActiveSlice] = useState('create');

  const slices = {
    create: {
      title: 'src/features/create-order/',
      desc: 'Sipariş oluşturma dilimi. Tüm kod tek bir klasörde.',
      code: `// src/features/create-order/handler.js

export const handle = async (request) => {
  // 1. Validation
  if (!request.items) throw new Error("Empty order");

  // 2. Business Logic
  const order = { id: Date.now(), ...request };

  // 3. Persistence (Doğrudan DB erişimi)
  await db.orders.add(order);

  return order;
}`
    },
    list: {
      title: 'src/features/get-order-list/',
      desc: 'Sipariş listeleme dilimi. Sadece bu işe odaklıdır.',
      code: `// src/features/get-order-list/handler.js

export const handle = async (userId) => {
  // Sadece okuma işlemi olduğu için çok basit!
  // Soyutlamalara boğulmadan direkt SQL yazılabilir.
  return await db.orders.query("SELECT * FROM orders WHERE userId = ?", [userId]);
}`
    }
  };

  return (
    <section style={{ padding: '100px 0' }}>
      <div className="container">
        <h2 className="section-title">Klasör Yapısı: Dilimlere Göre Düzen</h2>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '3rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {Object.entries(slices).map(([key, value]) => (
              <button
                key={key}
                onClick={() => setActiveSlice(key)}
                className="glass-card"
                style={{
                  textAlign: 'left',
                  borderLeft: activeSlice === key ? '4px solid #f97316' : '4px solid transparent',
                  background: activeSlice === key ? 'rgba(249, 115, 22, 0.1)' : 'var(--glass)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <Folder color="#f97316" size={20} />
                  <span style={{ fontWeight: 600, color: '#e2e8f0' }}>{value.title}</span>
                </div>
              </button>
            ))}

            <div className="glass-card" style={{ marginTop: '2rem', borderColor: 'rgba(59, 130, 246, 0.2)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                <Terminal size={18} color="#3b82f6" />
                <h4 style={{ fontSize: '0.9rem' }}>Soyutlama Vergisi</h4>
              </div>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                Clean Architecture'da 3-4 katman geçmek bazen vakit kaybıdır. Vertical Slice'da sadece ihtiyacınız kadar soyutlama yaparsınız (KISS prensibi).
              </p>
            </div>
          </div>

          <div className="glass-card" style={{ padding: 0, overflow: 'hidden', background: '#0a0a0f' }}>
            <div style={{ padding: '1.25rem', borderBottom: '1px solid var(--glass-border)', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <Code size={18} color="#f97316" />
              <span style={{ fontSize: '0.85rem' }}>Sorumluluk Alanı</span>
            </div>
            <div style={{ padding: '2rem' }}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeSlice}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  <p style={{ color: '#f97316', marginBottom: '1.5rem', fontSize: '0.9rem' }}>{slices[activeSlice].desc}</p>
                  <pre style={{ color: '#e2e8f0', fontSize: '0.95rem', lineHeight: 1.6 }}><code>{slices[activeSlice].code}</code></pre>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VerticalPractical;
