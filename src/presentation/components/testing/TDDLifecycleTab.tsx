import React from 'react';
import { motion } from 'framer-motion';
import { RotateCcw, ArrowRight, Play, CheckCircle, Terminal } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { TDDPhase, TDDStepInfo } from './useTDDSimulation';

export interface TDDLifecycleTabProps {
  currentPhase: TDDPhase;
  setCurrentPhase: (phase: TDDPhase) => void;
  testCount: number;
  isRunning: boolean;
  onAdvance: () => void;
  activeInfo: TDDStepInfo;
}

export const TDDLifecycleTab: React.FC<TDDLifecycleTabProps> = ({
  currentPhase,
  setCurrentPhase,
  testCount,
  isRunning,
  onAdvance,
  activeInfo
}) => {
  const { i18n } = useTranslation();
  const isEn = (i18n.resolvedLanguage || i18n.language || 'tr').startsWith('en');

  const phases: { id: TDDPhase; name: string; color: string; desc: string }[] = [
    { id: 'RED', name: isEn ? '1. RED (Fail)' : '1. KIRMIZI (Hata)', color: '#ef4444', desc: isEn ? 'Write failing test first' : 'Önce başarısız test yazılır' },
    { id: 'GREEN', name: isEn ? '2. GREEN (Pass)' : '2. YEŞİL (Geçir)', color: '#22c55e', desc: isEn ? 'Write minimal working code' : 'Testi geçiren minimal kod yazılır' },
    { id: 'REFACTOR', name: isEn ? '3. REFACTOR (Clean)' : '3. REFACTOR (Temizle)', color: '#3b82f6', desc: isEn ? 'Eliminate duplication & optimize' : 'Tasarım ve kod temizlenir' }
  ];

  return (
    <motion.div key="tdd" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
      <div className="glass-card" style={{ padding: '2.5rem' }}>
        {/* Phase Stepper */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem', marginBottom: '2.5rem' }}>
          {phases.map((p) => {
            const isActive = currentPhase === p.id;
            return (
              <div
                key={p.id}
                onClick={() => setCurrentPhase(p.id)}
                style={{
                  background: isActive ? 'rgba(255,255,255,0.06)' : '#020617',
                  border: isActive ? `2px solid ${p.color}` : '1px solid #1e293b',
                  borderRadius: '16px',
                  padding: '1.25rem',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  boxShadow: isActive ? `0 0 20px ${p.color}33` : 'none'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <span style={{ fontWeight: 800, color: p.color, fontSize: '0.95rem' }}>{p.name}</span>
                  {isActive && <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: p.color }} />}
                </div>
                <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>{p.desc}</div>
              </div>
            );
          })}
        </div>

        {/* Live Playground */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '2rem' }}>
          {/* Code Viewer */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <span style={{ fontSize: '0.85rem', color: '#94a3b8', fontWeight: 600 }}>📝 {activeInfo.title}</span>
              <span style={{ fontSize: '0.75rem', padding: '2px 8px', borderRadius: '6px', background: `${activeInfo.color}22`, color: activeInfo.color, fontWeight: 800 }}>
                {activeInfo.badge}
              </span>
            </div>
            <pre style={{ background: '#020617', padding: '1.25rem', borderRadius: '12px', border: '1px solid #1e293b', color: '#f8fafc', fontFamily: 'monospace', fontSize: '0.85rem', minHeight: '170px', overflowX: 'auto' }}>
              {activeInfo.codeSnippet}
            </pre>
          </div>

          {/* Test Runner Terminal */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <span style={{ fontSize: '0.85rem', color: '#94a3b8', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Terminal size={14} color="#10b981" /> Vitest Runner Output
              </span>
              <span style={{ fontSize: '0.75rem', color: '#64748b' }}>Cycle #{testCount}</span>
            </div>
            <pre style={{ background: '#090d16', padding: '1.25rem', borderRadius: '12px', border: `1px solid ${activeInfo.color}44`, color: activeInfo.color, fontFamily: 'monospace', fontSize: '0.85rem', minHeight: '170px' }}>
              {activeInfo.testOutput}
            </pre>
          </div>
        </div>

        {/* Action Button */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#020617', padding: '1.25rem 2rem', borderRadius: '16px', border: '1px solid #1e293b' }}>
          <div>
            <div style={{ fontWeight: 700, color: 'white', fontSize: '0.95rem' }}>{activeInfo.description}</div>
            <div style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '2px' }}>
              {isEn ? "Click to simulate test lifecycle progression." : "TDD döngüsünü bir sonraki adıma ilerletmek için tıklayın."}
            </div>
          </div>
          <button
            onClick={onAdvance}
            disabled={isRunning}
            style={{
              padding: '12px 24px',
              borderRadius: '12px',
              border: 'none',
              background: activeInfo.color,
              color: currentPhase === 'GREEN' ? '#020617' : 'white',
              fontWeight: 800,
              fontSize: '0.9rem',
              cursor: isRunning ? 'default' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              opacity: isRunning ? 0.7 : 1,
              transition: 'all 0.2s ease'
            }}
          >
            <RotateCcw size={16} /> {isEn ? "Advance TDD Cycle" : "Sonraki Adıma Geç"}
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default TDDLifecycleTab;
