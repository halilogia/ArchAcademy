import React from 'react';
import { motion } from 'framer-motion';
import { Bot, Network, BrainCircuit, Activity, BookOpen } from 'lucide-react';
import ArchHero from '../../../components/ArchHero';
import { theme } from '../../../themes/theme';

const AgenticAIPage = () => {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ background: theme.colors.bgDark, minHeight: '100vh' }}>
      <ArchHero
        title="Agentic"
        subtitle="Workflows"
        description="Autonomous agents that think, plan, use Tools, and take action — instead of chatbots that return static answers."
        badge="Autonomy Level 5"
        color="#f43f5e"
        illustration={
          <div style={{ position: 'relative', width: '220px', height: '220px' }}>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
              style={{ width: '100%', height: '100%', border: '2px dashed #f43f5e', borderRadius: '50%', opacity: 0.3 }}
            />
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center' }}>
              <Bot size={60} color="#f43f5e" />
              <motion.div
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                style={{ marginTop: '10px', fontSize: '10px', color: '#f43f5e', fontWeight: 'bold' }}
              >
                THINKING...
              </motion.div>
            </div>
            <motion.div animate={{ x: 80, y: -40 }} style={{ position: 'absolute', top: '50%', left: '50%' }}><Network size={20} color="white" /></motion.div>
            <motion.div animate={{ x: -80, y: 40 }} style={{ position: 'absolute', top: '50%', left: '50%' }}><BrainCircuit size={20} color="white" /></motion.div>
          </div>
        }
        features={[
          { icon: <Activity />, title: 'ReAct Pattern', desc: 'Reason + Act. Agent thinks first, plans, then takes action.' },
          { icon: <Network />, title: 'Tool Use', desc: 'Agents browse the web, call APIs, or perform computation.' },
          { icon: <Bot />, title: 'Multi-Agent', desc: 'Specialized agents (Researcher, Writer, Editor) collaborate as a team.' }
        ]}
      />

      <section style={{ padding: '80px 0', background: 'rgba(2, 6, 23, 0.4)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 className="section-title">Agent Loop (Thinking Loop)</h2>
            <p style={{ color: theme.colors.textSecondary }}>Agents operate autonomously in a loop — not from a single prompt.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {[
                { t: '1. Planning', d: 'Defines steps to reach the goal.' },
                { t: '2. Tool Selection', d: 'Uses Google Search, SQL, or Python interpreter.' },
                { t: '3. Execution', d: 'Collects data using the chosen tool.' },
                { t: '4. Observation', d: 'Analyzes output and updates the plan.' }
              ].map((step, i) => (
                <div key={i} className="glass-card" style={{ display: 'flex', gap: '15px', alignItems: 'center', padding: '1.5rem' }}>
                  <div style={{ width: '30px', height: '30px', background: '#f43f5e', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>{i + 1}</div>
                  <div>
                    <h4 style={{ color: 'white' }}>{step.t}</h4>
                    <p style={{ color: theme.colors.textSecondary, fontSize: '0.85rem' }}>{step.d}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="glass-card" style={{ border: '2px solid rgba(244, 63, 94, 0.3)', padding: '3rem', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: -20, right: -20, opacity: 0.1 }}>
                <BrainCircuit size={150} color="#f43f5e" />
              </div>
              <h3 style={{ color: 'white', marginBottom: '1.5rem' }}>Reflection and Self-Correction</h3>
              <p style={{ color: theme.colors.textSecondary, lineHeight: 1.8, fontSize: '1.1rem' }}>
                Modern agents don't just act — they critique their own responses.
                With the <strong>"Reflection"</strong> pattern, the agent inspects its generated answer through a "critic" lens,
                detects errors, and continues the loop until reaching an optimal outcome.
                <br /><br />
                This can cut hallucination rates by up to 80%.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section style={{ padding: '4rem 0' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '1rem', background: 'rgba(244, 63, 94, 0.1)', padding: '1rem 2rem', borderRadius: '12px', border: '1px solid rgba(244, 63, 94, 0.2)' }}>
            <BookOpen size={24} color="#f43f5e" />
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontSize: '0.8rem', color: '#fda4af', textTransform: 'uppercase' }}>Core Reference</div>
              <div style={{ color: 'white', fontWeight: 600 }}>ReAct: Synergizing Reasoning and Acting in Language Models (Yao et al., 2022)</div>
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
};
export default AgenticAIPage;