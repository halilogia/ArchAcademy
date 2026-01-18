import React from 'react';
import { motion } from 'framer-motion';
import { Lightbulb, Users, BarChart, Clock } from 'lucide-react';

const SystemChoice = () => {
  const cases = [
    {
      title: 'Ne Zaman Monolith?',
      items: [
        'Ekipleriniz küçükse (1-15 kişi).',
        'Uygulamanın karmaşıklığı düşükse.',
        'Hızlı prototipleme (MVP) gerekiyorsa.',
        'Veri tutarlılığı (Strong Consistency) kritikse.'
      ],
      color: 'var(--primary)',
      icon: <Clock size={32} />
    },
    {
      title: 'Ne Zaman Microservices?',
      items: [
        'Onlarca bağımsız ekip (Scale) varsa.',
        'Farklı modüllerin farklı teknolojiye ihtiyacı varsa.',
        'Sistem devasa yükler altında kalıyorsa.',
        'Sürekli ve bağımsız deployment gerekiyorsa.'
      ],
      color: '#f43f5e',
      icon: <Users size={32} />
    }
  ];

  return (
    <section style={{ padding: '100px 0' }}>
      <div className="container">
        <h2 className="section-title">Karar Verme Rehberi</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem' }}>
          {cases.map((c, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.02 }}
              className="glass-card"
              style={{ padding: '3rem', borderTop: `6px solid ${c.color}` }}
            >
              <div style={{ color: c.color, marginBottom: '2rem' }}>{c.icon}</div>
              <h3 style={{ marginBottom: '2rem', fontSize: '1.75rem' }}>{c.title}</h3>
              <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                {c.items.map((item, idx) => (
                  <li key={idx} style={{ display: 'flex', gap: '1rem', alignItems: 'center', color: 'var(--text-secondary)' }}>
                    <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: c.color }} />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* The Famous Quote */}
        <div style={{ marginTop: '5rem', textAlign: 'center', fontStyle: 'italic', color: 'var(--text-secondary)' }}>
           <p style={{ fontSize: '1.5rem', fontWeight: 300, marginBottom: '1rem' }}>
             "Don't even consider microservices unless you have a system that's too big to build as a monolith."
           </p>
           <span style={{ fontWeight: 700, color: 'var(--primary)' }}>— Martin Fowler</span>
        </div>
      </div>
    </section>
  );
};

export default SystemChoice;
