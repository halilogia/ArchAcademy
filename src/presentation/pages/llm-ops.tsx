import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Settings, Activity, BookOpen, Layers } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import ArchHero from '../components/ArchHero';
import SEO from '../components/SEO';
import { LLMOpsPillarsTab } from '../components/llmops/LLMOpsPillarsTab';
import { LLMOpsSimulationTab } from '../components/llmops/LLMOpsSimulationTab';
import { useLLMOpsSimulation } from '../components/llmops/useLLMOpsSimulation';

const LLMOpsPage: React.FC = () => {
  const { i18n } = useTranslation();
  const isEn = (i18n.resolvedLanguage || i18n.language || 'tr').startsWith('en');
  const [activeTab, setActiveTab] = useState<'pillars' | 'simulation'>('pillars');

  const simulation = useLLMOpsSimulation();

  return (
    <>
      <SEO
        title={isEn ? "LLMOps - AI Engineering & Lifecycle Management | ArchAcademy" : "LLMOps - Yapay Zeka Mühendisliği ve Yaşam Döngüsü | ArchAcademy"}
        description={isEn 
          ? "Master LLMOps architecture: Prompt Registry, automated evaluations (Evals), guardrails, and real-time observability." 
          : "Büyük Dil Modellerini (LLM) prodüksiyon ortamında yönetme, izleme ve sürekli iyileştirme disiplini rehberi."
        }
        keywords="llmops, ai engineering, prompt registry, model evals, guardrails, opentelemetry tracing"
        canonicalUrl="/llm-ops"
      />
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ background: 'var(--bg-dark)', minHeight: '100vh' }}>
        <ArchHero 
          title="LLMOps"
          subtitle={isEn ? "Engineering Platform" : "Üretim Mimarisi"}
          description={isEn 
            ? "Discipline of operationalizing Large Language Models in production. Prompt versioning, Evals, cost controls, and latency tracing." 
            : "Büyük Dil Modellerini (LLM) prodüksiyon ortamında yönetme, izleme ve sürekli iyileştirme disiplini. MLOps'un yeni evrimi."
          }
          badge="AI Engineering"
          color="#10b981"
          illustration={
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
               {[1, 2, 3].map(i => (
                 <motion.div 
                   key={i}
                   initial={{ width: 50 }}
                   animate={{ width: 200 }}
                   transition={{ duration: 2, repeat: Infinity, repeatType: 'reverse', delay: i * 0.3 }}
                   style={{ height: '10px', background: '#10b981', borderRadius: '10px', opacity: 0.5 + (i * 0.2) }}
                 />
               ))}
               <Terminal size={50} color="#10b981" style={{ marginTop: '20px', alignSelf: 'center' }} />
            </div>
          }
          features={[
            { icon: <Settings />, title: isEn ? 'Prompt Registry' : 'Prompt Yönetimi', desc: isEn ? 'Immutable prompt versioning and automated regression testing.' : 'İstemlerin (prompts) versiyonlanması ve A/B testi.' },
            { icon: <Activity />, title: isEn ? 'Automated Evals' : 'Model Değerlendirme', desc: isEn ? 'Continuous benchmarking of hallucination and accuracy.' : 'Model çıktılarının doğruluk ve güvenlik açısından puanlanması.' },
            { icon: <Layers />, title: isEn ? 'Cost & Tracing' : 'Gözlemlenebilirlik', desc: isEn ? 'Granular token-level tracking and semantic caching.' : 'Token maliyetleri, gecikme ve semantik önbellek takibi.' }
          ]}
        >
          <div style={{ 
            marginTop: '2rem',
            padding: '6px', 
            background: 'rgba(15, 23, 42, 0.4)', 
            borderRadius: '24px', 
            border: '1px solid rgba(255,255,255,0.05)',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '4px',
            backdropFilter: 'blur(10px)',
            flexWrap: 'wrap'
          }}>
            {[
              { id: 'pillars', label: isEn ? 'Core Pillars' : 'LLMOps Sütunları', icon: <Settings size={18} /> },
              { id: 'simulation', label: isEn ? 'Live Tracing Lab' : 'Canlı Tracing Simülasyonu', icon: <Activity size={18} /> }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                style={{
                  padding: '10px 24px',
                  borderRadius: '18px',
                  border: 'none',
                  background: activeTab === tab.id ? '#10b981' : 'transparent',
                  color: activeTab === tab.id ? '#020617' : 'rgba(255,255,255,0.5)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontWeight: 700,
                  fontSize: '0.9rem',
                  transition: 'all 0.3s ease',
                  boxShadow: activeTab === tab.id ? '0 4px 12px rgba(16, 185, 129, 0.3)' : 'none'
                }}
              >
                {tab.icon} {tab.label}
              </button>
            ))}
          </div>
        </ArchHero>

        <div className="container" style={{ marginTop: '2rem' }}>
          <AnimatePresence mode="wait">
            {activeTab === 'pillars' && <LLMOpsPillarsTab key="pillars" />}
            {activeTab === 'simulation' && (
              <LLMOpsSimulationTab 
                key="simulation"
                selectedModel={simulation.selectedModel}
                setSelectedModel={simulation.setSelectedModel}
                cacheEnabled={simulation.cacheEnabled}
                setCacheEnabled={simulation.setCacheEnabled}
                guardrailEnabled={simulation.guardrailEnabled}
                setGuardrailEnabled={simulation.setGuardrailEnabled}
                isExecuting={simulation.isExecuting}
                traces={simulation.traces}
                totalCost={simulation.totalCost}
                onExecutePrompt={simulation.executePrompt}
              />
            )}
          </AnimatePresence>
        </div>

        <section style={{ padding: '4rem 0', background: 'rgba(0,0,0,0.3)', borderTop: '1px solid rgba(255,255,255,0.05)', marginTop: '4rem' }}>
          <div className="container" style={{ textAlign: 'center' }}>
             <div style={{ display: 'inline-flex', alignItems: 'center', gap: '1rem', background: 'rgba(16, 185, 129, 0.1)', padding: '1rem 2rem', borderRadius: '12px', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
                <BookOpen size={24} color="#10b981" />
                <div style={{ textAlign: 'left' }}>
                  <div style={{ fontSize: '0.8rem', color: '#6ee7b7', textTransform: 'uppercase' }}>
                    {isEn ? "Core Reference Literature" : "Temel Kaynak"}
                  </div>
                  <div style={{ color: 'white', fontWeight: 600 }}>Building LLM Applications for Production (Chip Huyen)</div>
                </div>
             </div>
          </div>
        </section>
      </motion.div>
    </>
  );
};

export default LLMOpsPage;
