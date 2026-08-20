import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Bot, Network, Sparkles, BookOpen, Activity, Cpu } from 'lucide-react';
import ArchHero from '../components/ArchHero';
import SEO from '../components/SEO';
import { AgenticCorePatternsTab } from '../components/agenticai/AgenticCorePatternsTab';
import { MultiAgentOrchestrationTab } from '../components/agenticai/MultiAgentOrchestrationTab';
import { AgentSwarmSimulationTab } from '../components/agenticai/AgentSwarmSimulationTab';

const AgenticAIPage: React.FC = () => {
  const { i18n } = useTranslation();
  const isEn = (i18n.resolvedLanguage || i18n.language || 'tr').startsWith('en');
  const [activeTab, setActiveTab] = useState<'patterns' | 'orchestration' | 'simulation'>('patterns');

  const scrollToSection = (id: 'patterns' | 'orchestration' | 'simulation') => {
    setActiveTab(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <>
      <SEO
        title={isEn ? "Agentic AI & Multi-Agent Swarms Masterclass | ArchAcademy" : "Ajanik Yapay Zeka ve Çoklu Ajan Sürü Mimarisi | ArchAcademy"}
        description={isEn 
          ? "Master autonomous AI agents: ReAct reasoning, Tool Calling, Planning, Multi-Agent Swarms, and Blackboard architectures." 
          : "Otonom yapay zeka ajanları (Agentic AI), ReAct döngüsü, Araç Çağrısı (Tool Calling), Çoklu Ajan Sürüleri ve Supervisor mimarileri rehberi."
        }
        keywords="agentic ai, autonomous agents, multi agent swarms, react pattern, tool calling, langgraph, autogen, crewai"
        canonicalUrl="/agentic-ai"
      />
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ background: 'var(--bg-dark)', minHeight: '100vh' }}>
        <ArchHero 
          title="Agentic AI"
          subtitle={isEn ? "Autonomous Multi-Agent Architecture" : "Otonom Çoklu Ajan Mimarisi"}
          description={isEn 
            ? "From passive chatbots to autonomous goal-driven systems. ReAct reasoning loops, dynamic tool calling, memory management, and multi-agent swarm orchestration." 
            : "Pasif sohbet botlarından otonom görev icra sistemlerine geçiş. ReAct akıl yürütme döngüleri, dinamik araç çağırma (Tool Calling) ve çoklu ajan sürü mimarileri."
          }
          badge="Next-Gen Architecture"
          color="#ec4899"
          illustration={
            <div style={{ position: 'relative', width: '200px', height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
                style={{ width: '160px', height: '160px', borderRadius: '30px', border: '2px dashed rgba(236, 72, 153, 0.4)', position: 'absolute' }}
              />
              <div style={{ width: '90px', height: '90px', background: '#020617', border: '3px solid #ec4899', borderRadius: '22px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 30px rgba(236, 72, 153, 0.3)' }}>
                <Bot size={36} color="#ec4899" />
                <span style={{ fontSize: '0.65rem', fontWeight: 800, color: 'white', marginTop: '4px' }}>SWARM</span>
              </div>
            </div>
          }
          features={[
            { icon: <Cpu />, title: isEn ? 'ReAct Reasoning' : 'ReAct Akıl Yürütme', desc: isEn ? 'Interleaving reasoning, acting via tools, and observing feedback.' : 'Düşünme, eyleme geçme ve geri bildirim gözlemleme döngüsü.' },
            { icon: <Network />, title: isEn ? 'Multi-Agent Swarm' : 'Çoklu Ajan Sürüsü', desc: isEn ? 'Supervisor-Worker and decentralized peer handoff models.' : 'Uzmanlaşmış alt ajanlar arası otomatik görev paylaştırma ve bağlam devri.' },
            { icon: <Sparkles />, title: isEn ? 'Self-Correction' : 'Otomatik Düzeltme', desc: isEn ? 'Critic and evaluator loops verifying code quality and security.' : 'Kodu test eden ve hataları kendi kendine düzelten geri bildirim kalkanı.' }
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
            flexWrap: 'wrap',
            position: 'sticky',
            top: '80px',
            zIndex: 30
          }}>
            {[
              { id: 'patterns', label: isEn ? 'Core Agentic Patterns' : 'Temel Ajan Kalıpları', icon: <Bot size={18} /> },
              { id: 'orchestration', label: isEn ? 'Multi-Agent Orchestration' : 'Çoklu Ajan Mimarileri', icon: <Network size={18} /> },
              { id: 'simulation', label: isEn ? 'Swarm Execution Lab' : 'Sürü Dağıtım Simülasyonu', icon: <Activity size={18} /> }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => scrollToSection(tab.id as any)}
                style={{
                  padding: '10px 24px',
                  borderRadius: '18px',
                  border: 'none',
                  background: activeTab === tab.id ? '#ec4899' : 'transparent',
                  color: 'white',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontWeight: 700,
                  fontSize: '0.9rem',
                  transition: 'all 0.3s ease',
                  boxShadow: activeTab === tab.id ? '0 4px 12px rgba(236, 72, 153, 0.3)' : 'none'
                }}
              >
                {tab.icon} {tab.label}
              </button>
            ))}
          </div>
        </ArchHero>

        <div className="container" style={{ marginTop: '2rem', display: 'flex', flexDirection: 'column', gap: '4rem' }}>
          <div id="patterns" style={{ scrollMarginTop: '100px' }}>
            <AgenticCorePatternsTab />
          </div>
          <div id="orchestration" style={{ scrollMarginTop: '100px' }}>
            <MultiAgentOrchestrationTab />
          </div>
          <div id="simulation" style={{ scrollMarginTop: '100px' }}>
            <AgentSwarmSimulationTab />
          </div>
        </div>

        <section style={{ padding: '4rem 0', background: 'rgba(0,0,0,0.3)', borderTop: '1px solid rgba(255,255,255,0.05)', marginTop: '4rem' }}>
          <div className="container" style={{ textAlign: 'center' }}>
             <div style={{ display: 'inline-flex', alignItems: 'center', gap: '1rem', background: 'rgba(236, 72, 153, 0.1)', padding: '1rem 2rem', borderRadius: '12px', border: '1px solid rgba(236, 72, 153, 0.2)' }}>
                <BookOpen size={24} color="#ec4899" />
                <div style={{ textAlign: 'left' }}>
                  <div style={{ fontSize: '0.8rem', color: '#f472b6', textTransform: 'uppercase' }}>
                    {isEn ? "Foundational Agentic Literature" : "Temel Ajanik Kaynak"}
                  </div>
                  <div style={{ color: 'white', fontWeight: 600 }}>ReAct: Synergizing Reasoning and Acting in Language Models (Yao et al.)</div>
                </div>
             </div>
          </div>
        </section>
      </motion.div>
    </>
  );
};

export default AgenticAIPage;
