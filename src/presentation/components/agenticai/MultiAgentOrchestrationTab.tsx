import React from 'react';
import { motion } from 'framer-motion';
import { Network, Users, ArrowRightLeft, ShieldCheck, Zap } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const MultiAgentOrchestrationTab: React.FC = () => {
  const { i18n } = useTranslation();
  const isEn = (i18n.resolvedLanguage || i18n.language || 'tr').startsWith('en');

  const architectures = [
    { title: '1. Hierarchical Supervisor (Orchestrator-Worker)', desc: isEn ? 'A central supervisor agent creates a DAG task tree and delegates sub-tasks to specialized domain agents (Coder, Tester, Security).' : 'Lider yönetici ajan (Supervisor) görevi analiz eder ve uzman alt ajanlara (Kodlayıcı, Testçi, Güvenlik Uzmanı) paylaştırır.' },
    { title: '2. Swarm Peer Collaboration (Networked Mesh)', desc: isEn ? 'Decentralized peer agents hand off control directly via explicit context handoffs (e.g. OpenAI Swarm / CrewAI).' : 'Merkezi bir lider olmadan ajanların birbirine bağlamı (context) devrederek işbirliği yaptığı dağıtık sürü mimarisi.' },
    { title: '3. Blackboard Architecture', desc: isEn ? 'Multiple heterogeneous agents write knowledge fragments to a shared blackboard memory space until consensus is reached.' : 'Tüm ajanların ortak bir çalışma tahtasına (Blackboard) veri yazıp okuduğu ve kolektif çözüme ulaştığı mimari.' }
  ];

  return (
    <motion.div key="orchestration" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
      <div className="glass-card" style={{ padding: '2.5rem', marginBottom: '2rem' }}>
        <h3 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'white', marginBottom: '1rem' }}>
          {isEn ? "Multi-Agent Swarm Architectures" : "Çoklu Ajan Sürü (Multi-Agent Swarm) Mimarileri"}
        </h3>
        <p style={{ color: '#94a3b8', fontSize: '1.05rem', lineHeight: 1.7, marginBottom: '2rem', maxWidth: '800px' }}>
          {isEn 
            ? "Single-agent architectures struggle with cognitive overload. Multi-agent systems assign specialized system prompts, tools, and roles to distributed agents." 
            : "Tek bir ajana tüm yetenekleri yüklemek bağlam kirliliğine (Context Poisoning) yol açar. Çoklu ajan sistemleri görevleri küçük uzmanlıklara bölerek mükemmel işbirliği sağlar."
          }
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
          {architectures.map((a, i) => (
            <div key={i} style={{ background: '#020617', padding: '1.5rem', borderRadius: '16px', border: '1px solid #1e293b', borderTop: '3px solid #ec4899' }}>
              <h4 style={{ color: '#f472b6', fontWeight: 800, fontSize: '1.1rem', marginBottom: '8px' }}>{a.title}</h4>
              <p style={{ color: '#94a3b8', fontSize: '0.85rem', lineHeight: 1.6, margin: 0 }}>{a.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default MultiAgentOrchestrationTab;
