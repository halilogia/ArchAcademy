import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Sparkles, Volume2, Shield, Zap } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface ShapePolymorph {
  type: 'Circle' | 'Square' | 'Triangle';
  color: string;
  drawCode: string;
  calcArea: string;
}

export const OOPPolymorphismSimulationTab: React.FC = () => {
  const { i18n } = useTranslation();
  const isEn = (i18n.resolvedLanguage || i18n.language || 'tr').startsWith('en');
  const [activeShape, setActiveShape] = useState<ShapePolymorph['type']>('Circle');

  const shapes: Record<ShapePolymorph['type'], ShapePolymorph> = {
    Circle: {
      type: 'Circle',
      color: '#38bdf8',
      drawCode: `class Circle implements IShape {\n  constructor(private radius: number) {}\n  draw() { return "Drawing 🔵 Circle (r=5)"; }\n  getArea() { return Math.PI * this.radius ** 2; }\n}`,
      calcArea: 'Area = π × r² ≈ 78.54'
    },
    Square: {
      type: 'Square',
      color: '#f59e0b',
      drawCode: `class Square implements IShape {\n  constructor(private side: number) {}\n  draw() { return "Drawing 🟧 Square (side=5)"; }\n  getArea() { return this.side * this.side; }\n}`,
      calcArea: 'Area = a² = 25.00'
    },
    Triangle: {
      type: 'Triangle',
      color: '#22c55e',
      drawCode: `class Triangle implements IShape {\n  constructor(private base: number, private h: number) {}\n  draw() { return "Drawing 🔺 Triangle (b=5, h=4)"; }\n  getArea() { return (this.base * this.h) / 2; }\n}`,
      calcArea: 'Area = (b × h) / 2 = 10.00'
    }
  };

  const current = shapes[activeShape];

  return (
    <motion.div key="simulation" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
      <div className="glass-card" style={{ padding: '2.5rem' }}>
        <h3 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'white', marginBottom: '1rem' }}>
          {isEn ? "Interactive Polymorphism Simulation" : "İnteraktif Polimorfizm & Dinamik Bağlama Simülasyonu"}
        </h3>
        <p style={{ color: '#94a3b8', fontSize: '1rem', lineHeight: 1.7, marginBottom: '2rem' }}>
          {isEn 
            ? "Notice how the caller invokes `shape.draw()` without knowing or caring about the concrete shape class. Zero if/else branching!" 
            : "İstemci kod sadece `shape.draw()` ve `shape.getArea()` çağırır; arka planda hangi somut sınıfın çalıştığını bilmesine gerek yoktur. Sıfır if/else!"
          }
        </p>

        {/* Shape Switcher */}
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
          {(['Circle', 'Square', 'Triangle'] as const).map(s => (
            <button
              key={s}
              onClick={() => setActiveShape(s)}
              style={{
                padding: '12px 24px',
                borderRadius: '12px',
                border: activeShape === s ? `2px solid ${shapes[s].color}` : '1px solid #1e293b',
                background: activeShape === s ? 'rgba(255,255,255,0.06)' : '#020617',
                color: activeShape === s ? shapes[s].color : '#94a3b8',
                fontWeight: 800,
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              {s === 'Circle' && '🔵 Daire (Circle)'}
              {s === 'Square' && '🟧 Kare (Square)'}
              {s === 'Triangle' && '🔺 Üçgen (Triangle)'}
            </button>
          ))}
        </div>

        {/* Code and Result Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
          <div>
            <div style={{ fontSize: '0.85rem', color: '#94a3b8', marginBottom: '8px', fontWeight: 600 }}>
              Polymorphic Class Definition (TypeScript)
            </div>
            <pre style={{ background: '#020617', padding: '1.25rem', borderRadius: '12px', border: '1px solid #1e293b', color: current.color, fontFamily: 'monospace', fontSize: '0.85rem', minHeight: '140px' }}>
              {current.drawCode}
            </pre>
          </div>

          <div style={{ background: '#020617', padding: '1.5rem', borderRadius: '16px', border: `1px solid ${current.color}44`, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div style={{ fontSize: '0.8rem', color: '#64748b', textTransform: 'uppercase', marginBottom: '6px' }}>
              Dynamic Dispatch Execution Output
            </div>
            <div style={{ fontSize: '1.4rem', fontWeight: 900, color: 'white', marginBottom: '8px' }}>
              {activeShape === 'Circle' && '🔵 Daire Çizildi & Alan Hesaplandı'}
              {activeShape === 'Square' && '🟧 Kare Çizildi & Alan Hesaplandı'}
              {activeShape === 'Triangle' && '🔺 Üçgen Çizildi & Alan Hesaplandı'}
            </div>
            <div style={{ fontSize: '1rem', color: current.color, fontWeight: 700 }}>
              {current.calcArea}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default OOPPolymorphismSimulationTab;
