import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code, Share2, Database, Zap } from 'lucide-react';

const CQRSSection = () => {
  const concepts = {
    command: {
      title: 'Commands (Yazma)',
      icon: <Zap size={24} color="#f59e0b" />,
      desc: 'Sistemin durumunu değiştiren işlemlerdir. Cevap dönmezler (başarı/hata dışında). İş mantığı burada çalışır.',
      code: `// Sipariş Oluştur (Command)
class CreateOrderCommand {
  constructor(userId, items) {
    this.userId = userId;
    this.items = items;
  }
}

// Handler - Veriyi doğrular ve DB'ye yazar
async function handle(command) {
  const order = new Order(command.userId, command.items);
  await repository.save(order);
}`
    },
    query: {
      title: 'Queries (Okuma)',
      icon: <Share2 size={24} color="#3b82f6" />,
      desc: 'Sistemin durumunu sorgulayan işlemlerdir. Yan etki oluşturmazlar. Sadece veri dönerler.',
      code: `// Siparişleri Getir (Query)
class GetUserOrdersQuery {
  constructor(userId) {
    this.userId = userId;
  }
}

// Handler - Okuma için optimize edilmiş SQL
async function handle(query) {
  return await db.query(
    "SELECT id, total FROM orders WHERE user_id = ?", 
    [query.userId]
  );
}`
    }
  };

  type ConceptKey = keyof typeof concepts;
  const [activeTab, setActiveTab] = useState<ConceptKey>('command');

  return (
    <section id="cqrs" style={{ padding: '100px 0' }}>
      <div className="container">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           style={{ textAlign: 'center', marginBottom: '4rem' }}
        >
          <span style={{
            background: 'rgba(234, 179, 8, 0.1)',
            padding: '8px 16px',
            borderRadius: '100px',
            fontSize: '0.85rem',
            fontWeight: 600,
            color: '#eab308',
            border: '1px solid rgba(234, 179, 8, 0.2)',
            marginBottom: '1.5rem',
            display: 'inline-block'
          }}>
            Okuma ve Yazma Sorumluluklarının Ayrımı
          </span>
          <h2 className="gradient-text" style={{ fontSize: '3.5rem', fontWeight: 800 }}>CQRS Disiplini</h2>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '700px', margin: '1.5rem auto' }}>
            Command Query Responsibility Segregation. Uygulamanın veriyi değiştirme mantığı ile 
            veriyi sunma mantığını birbirinden tamamen ayıran disiplin.
          </p>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '3rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {(Object.keys(concepts) as ConceptKey[]).map((key) => {
              const item = concepts[key];
              return (
                <div
                  key={key}
                  onClick={() => setActiveTab(key)}
                  className="glass-card"
                  style={{
                    cursor: 'pointer',
                    borderLeft: activeTab === key ? `4px solid ${key === 'command' ? '#f59e0b' : '#3b82f6'}` : '4px solid transparent',
                    background: activeTab === key ? 'rgba(255,255,255,0.05)' : 'var(--glass)',
                    transition: 'all 0.3s ease'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.75rem' }}>
                    {item.icon}
                    <h3 style={{ fontSize: '1.25rem' }}>{item.title}</h3>
                  </div>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>{item.desc}</p>
                </div>
              );
            })}

            <div className="glass-card" style={{ marginTop: 'auto', background: 'rgba(59, 130, 246, 0.05)' }}>
              <h4 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', fontSize: '1rem' }}>
                <Database size={18} color="#3b82f6" /> Neden CQRS?
              </h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                Okuma ve yazma modelleri farklı hızlarda büyür. CQRS ile okuma tarafını (Read Model) 
                ayrıca ölçeklendirebilir, veritabanı görünümleri (Views) veya NoSQL kullanarak 
                gösterim hızını binlerce kat artırabilirsiniz.
              </p>
            </div>
          </div>

          <div className="glass-card" style={{ padding: 0, overflow: 'hidden', background: '#0a0a0f' }}>
            <div style={{ padding: '1.25rem', borderBottom: '1px solid var(--glass-border)', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <Code size={18} color={activeTab === 'command' ? '#f59e0b' : '#3b82f6'} />
              <span style={{ fontSize: '0.85rem' }}>{concepts[activeTab].title} Örneği</span>
            </div>
            <div style={{ padding: '2rem' }}>
              <AnimatePresence mode="wait">
                <motion.pre
                  key={activeTab}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  style={{ color: '#e2e8f0', fontSize: '0.95rem', lineHeight: 1.6 }}
                >
                  <code>{concepts[activeTab].code}</code>
                </motion.pre>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CQRSSection;
