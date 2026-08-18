import React from 'react';
import { motion } from 'framer-motion';
import { Settings, BarChart, GitBranch, Shield, Zap, Database } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const LLMOpsPillarsTab: React.FC = () => {
  const { i18n } = useTranslation();
  const isEn = (i18n.resolvedLanguage || i18n.language || 'tr').startsWith('en');

  const pillars = [
    {
      icon: <Settings size={28} color="#10b981" />,
      title: isEn ? "Prompt Registry & CI/CD" : "Prompt Registry ve Versiyonlama",
      desc: isEn 
        ? "Treat prompts as immutable source code. Version control prompts in Git with automated regression evaluations." 
        : "Prompt'ları kod gibi versiyonlayın, Git tabanlı Prompt Registry'de saklayın ve otomatik regresyon testlerine tabi tutun."
    },
    {
      icon: <BarChart size={28} color="#3b82f6" />,
      title: isEn ? "Automated Evals (Evaluation)" : "Otomatik Değerlendirme (Evals)",
      desc: isEn 
        ? "Benchmark model output accuracy, hallucination rate, and instruction adherence against golden datasets." 
        : "Model çıktılarının doğruluğunu, halüsinasyon oranını ve kurallara uyumunu altın veri setleriyle otomatik puanlayın."
    },
    {
      icon: <Shield size={28} color="#ef4444" />,
      title: isEn ? "Guardrails & Safety Filters" : "Guardrails ve Güvenlik Filtreleri",
      desc: isEn 
        ? "Prevent prompt injection, PII data leakage, and toxic outputs before requests reach the model or user." 
        : "Prompt injection, kişisel veri sızıntısı (PII) ve zararlı içerikleri model çağrılmadan önce durdurun."
    },
    {
      icon: <Zap size={28} color="#f59e0b" />,
      title: isEn ? "Observability & Tracing" : "Gözlemlenebilirlik ve Tracing",
      desc: isEn 
        ? "Track end-to-end token latency, API costs, cache hits, and multi-step agent tool executions via OpenTelemetry." 
        : "Token başına maliyeti, gecikmeyi (TTFT), önbellek (Cache) oranını ve agent araç çağrılarını anlık izleyin."
    }
  ];

  return (
    <motion.div key="pillars" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
        {pillars.map((p, idx) => (
          <div key={idx} className="glass-card" style={{ padding: '2rem', borderTop: '3px solid #10b981' }}>
            <div style={{ marginBottom: '1.25rem' }}>{p.icon}</div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'white', marginBottom: '0.75rem' }}>{p.title}</h3>
            <p style={{ color: '#94a3b8', lineHeight: 1.6, fontSize: '0.95rem' }}>{p.desc}</p>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default LLMOpsPillarsTab;
