import React from 'react';
import { motion } from 'framer-motion';
import { Bot, Cpu, GitBranch, RefreshCw, Layers, ShieldCheck } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const AgenticCorePatternsTab: React.FC = () => {
  const { i18n } = useTranslation();
  const isEn = (i18n.resolvedLanguage || i18n.language || 'tr').startsWith('en');

  const patterns = [
    { title: '1. ReAct (Reasoning + Acting)', color: '#38bdf8', desc: isEn ? 'Interleaves step-by-step thinking (Thought) with external tool calls (Action) and feedback (Observation).' : 'Düşünme (Thought), Dış Araç Çağrısı (Action) ve Çıktı İnceleme (Observation) döngüsüyle hareket eder.' },
    { title: '2. Plan-and-Solve', color: '#10b981', desc: isEn ? 'First generates a comprehensive multi-step decomposition plan, then executes steps with sub-agents.' : 'Önce tüm karmaşık görevi alt adımlara bölen bir plan hazırlar, ardından sırayla icra eder.' },
    { title: '3. Reflection & Self-Correction', color: '#f59e0b', desc: isEn ? 'An evaluator persona criticizes generated code or actions, triggering automated refinement loops.' : 'Üretilen kod veya çıktıyı eleştirmen (Critic) bir ajan denetler ve hataları düzeltene kadar döngüyü işletir.' },
    { title: '4. Tool Use & Sandbox Execution', color: '#a855f7', desc: isEn ? 'Agents execute shell commands, run SQL queries, and inspect files in isolated sandboxes.' : 'Ajanlar güvenli sandbox ortamlarında terminal komutları, SQL sorguları ve dosya okuma işlemleri yapar.' }
  ];

  return (
    <motion.div key="patterns" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
      <div className="glass-card" style={{ padding: '2.5rem', marginBottom: '2rem' }}>
        <h3 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'white', marginBottom: '1rem' }}>
          {isEn ? "Core Autonomous Agentic Patterns" : "Temel Otonom Ajan Mimarisi ve Tasarım Kalıpları"}
        </h3>
        <p style={{ color: '#94a3b8', fontSize: '1.05rem', lineHeight: 1.7, marginBottom: '2rem', maxWidth: '800px' }}>
          {isEn 
            ? "Unlike standard conversational LLMs, agentic systems possess autonomy, memory, reasoning loops, and external tool-calling capabilities to achieve complex software goals." 
            : "Tek seferlik yanıt veren standart modellerin aksine otonom ajanlar; hafıza, araç kullanma (Tool Calling), planlama ve geri bildirim döngüleriyle karmaşık görevleri uçtan uca çözer."
          }
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem' }}>
          {patterns.map((p, i) => (
            <div key={i} style={{ background: '#020617', padding: '1.5rem', borderRadius: '16px', border: '1px solid #1e293b', borderTop: `4px solid ${p.color}` }}>
              <h4 style={{ color: 'white', fontWeight: 800, fontSize: '1.1rem', marginBottom: '8px' }}>{p.title}</h4>
              <p style={{ color: '#94a3b8', fontSize: '0.85rem', lineHeight: 1.6, margin: 0 }}>{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default AgenticCorePatternsTab;
