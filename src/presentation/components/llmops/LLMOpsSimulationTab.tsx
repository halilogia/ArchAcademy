import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Terminal, Zap, Shield, Database, DollarSign, Activity } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { LLMRequestTrace } from './useLLMOpsSimulation';

export interface LLMOpsSimulationTabProps {
  selectedModel: 'deepseek-v3' | 'gpt-4o' | 'claude-3-5';
  setSelectedModel: (model: 'deepseek-v3' | 'gpt-4o' | 'claude-3-5') => void;
  cacheEnabled: boolean;
  setCacheEnabled: (val: boolean) => void;
  guardrailEnabled: boolean;
  setGuardrailEnabled: (val: boolean) => void;
  isExecuting: boolean;
  traces: LLMRequestTrace[];
  totalCost: number;
  onExecutePrompt: (prompt: string) => void;
}

export const LLMOpsSimulationTab: React.FC<LLMOpsSimulationTabProps> = ({
  selectedModel,
  setSelectedModel,
  cacheEnabled,
  setCacheEnabled,
  guardrailEnabled,
  setGuardrailEnabled,
  isExecuting,
  traces,
  totalCost,
  onExecutePrompt
}) => {
  const { i18n } = useTranslation();
  const isEn = (i18n.resolvedLanguage || i18n.language || 'tr').startsWith('en');
  const [promptInput, setPromptInput] = useState('Analyze Single Responsibility Principle violations in microservices.');

  return (
    <motion.div key="simulation" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
      <div className="glass-card" style={{ padding: '2rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginBottom: '2rem' }}>
          {/* Controls */}
          <div>
            <h4 style={{ color: '#10b981', marginBottom: '1rem', fontWeight: 800 }}>
              {isEn ? "1. Pipeline Configurations" : "1. LLMOps Pipeline Yapılandırması"}
            </h4>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <label style={{ fontSize: '0.85rem', color: '#94a3b8', display: 'block', marginBottom: '6px' }}>
                  {isEn ? "Routing Model Target:" : "Yönlendirilecek Model:"}
                </label>
                <div style={{ display: 'flex', gap: '8px' }}>
                  {(['deepseek-v3', 'gpt-4o', 'claude-3-5'] as const).map(m => (
                    <button
                      key={m}
                      onClick={() => setSelectedModel(m)}
                      style={{
                        flex: 1,
                        padding: '8px',
                        borderRadius: '8px',
                        border: selectedModel === m ? '1px solid #10b981' : '1px solid rgba(255,255,255,0.1)',
                        background: selectedModel === m ? 'rgba(16, 185, 129, 0.2)' : 'transparent',
                        color: selectedModel === m ? '#6ee7b7' : '#94a3b8',
                        fontWeight: 700,
                        fontSize: '0.8rem',
                        cursor: 'pointer'
                      }}
                    >
                      {m}
                    </button>
                  ))}
                </div>
              </div>

              <div style={{ display: 'flex', gap: '15px', marginTop: '10px' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '0.85rem', color: 'white' }}>
                  <input type="checkbox" checked={cacheEnabled} onChange={e => setCacheEnabled(e.target.checked)} />
                  <Database size={16} color="#10b981" /> {isEn ? "Semantic Cache" : "Semantik Önbellek"}
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '0.85rem', color: 'white' }}>
                  <input type="checkbox" checked={guardrailEnabled} onChange={e => setGuardrailEnabled(e.target.checked)} />
                  <Shield size={16} color="#ef4444" /> {isEn ? "Guardrail Check" : "Güvenlik Filtresi"}
                </label>
              </div>

              <div style={{ marginTop: '10px' }}>
                <label style={{ fontSize: '0.85rem', color: '#94a3b8', display: 'block', marginBottom: '6px' }}>
                  {isEn ? "Prompt Payload:" : "İstem (Prompt) İçeriği:"}
                </label>
                <textarea
                  value={promptInput}
                  onChange={e => setPromptInput(e.target.value)}
                  rows={2}
                  style={{ width: '100%', padding: '10px', borderRadius: '8px', background: '#0f172a', color: 'white', border: '1px solid #334155', fontSize: '0.85rem' }}
                />
              </div>

              <button
                onClick={() => onExecutePrompt(promptInput)}
                disabled={isExecuting}
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: '10px',
                  background: '#10b981',
                  color: '#020617',
                  fontWeight: 800,
                  border: 'none',
                  cursor: isExecuting ? 'default' : 'pointer',
                  opacity: isExecuting ? 0.7 : 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px'
                }}
              >
                <Zap size={18} /> {isExecuting ? (isEn ? "Tracing Pipeline..." : "Pipeline İşleniyor...") : (isEn ? "Dispatch LLM Request" : "İsteği Gönder (Trace Et)")}
              </button>
            </div>
          </div>

          {/* Metrics summary */}
          <div style={{ background: '#020617', borderRadius: '16px', padding: '1.5rem', border: '1px solid #1e293b' }}>
            <h4 style={{ color: 'white', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Activity size={18} color="#10b981" /> {isEn ? "Real-Time Observability" : "Canlı Metrik Özeti"}
            </h4>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '1.5rem' }}>
              <div style={{ background: 'rgba(255,255,255,0.03)', padding: '12px', borderRadius: '10px' }}>
                <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>{isEn ? "Total Spend" : "Toplam Maliyet"}</div>
                <div style={{ fontSize: '1.25rem', fontWeight: 900, color: '#10b981' }}>${totalCost.toFixed(5)}</div>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.03)', padding: '12px', borderRadius: '10px' }}>
                <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>{isEn ? "Logged Traces" : "Kaydedilen İstek"}</div>
                <div style={{ fontSize: '1.25rem', fontWeight: 900, color: 'white' }}>{traces.length}</div>
              </div>
            </div>

            <div style={{ fontSize: '0.8rem', color: '#64748b', marginBottom: '8px' }}>
              {isEn ? "// OPEN-TELEMETRY DISTRIBUTED TRACES" : "// CANLI OPEN-TELEMETRY TRACE LOGLARI"}
            </div>
            <div style={{ maxHeight: '180px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '8px', fontFamily: 'monospace', fontSize: '0.8rem' }}>
              {traces.map(t => (
                <div key={t.id} style={{ background: '#0f172a', padding: '8px 12px', borderRadius: '6px', borderLeft: `3px solid ${t.cached ? '#3b82f6' : '#10b981'}` }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: '#94a3b8' }}>
                    <span>[{t.id}] {t.model}</span>
                    <span style={{ color: t.cached ? '#60a5fa' : '#34d399' }}>{t.cached ? '⚡ CACHE HIT' : `${t.latencyMs}ms`}</span>
                  </div>
                  <div style={{ color: '#cbd5e1', marginTop: '4px' }}>Tokens: {t.promptTokens}+{t.completionTokens} | ${t.totalCostUSD}</div>
                </div>
              ))}
              {traces.length === 0 && !isExecuting && (
                <span style={{ color: '#475569' }}>{isEn ? "// No traces yet. Click dispatch above." : "// Henüz istek gönderilmedi."}</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default LLMOpsSimulationTab;
