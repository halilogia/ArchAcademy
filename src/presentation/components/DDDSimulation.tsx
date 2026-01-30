import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code, Zap } from 'lucide-react';

const DDDSimulation = () => {
  const modelExamples = {
    entity: {
      title: 'Entity (Varlık)',
      desc: 'Kimliği olan, zamanla özellikleri değişse de aynı kalan nesne. Örn: Sipariş.',
      code: `class Order {
  constructor(id) {
    this.id = id; // Değişmez kimlik
    this.items = [];
    this.status = 'DRAFT';
  }

  addItem(product, quantity) {
    if (this.status !== 'DRAFT') throw new Error('Sadece taslaklara ekleme yapılabilir');
    this.items.push({ product, quantity });
  }
}`
    },
    valueobject: {
      title: 'Value Object (Değer Nesnesi)',
      desc: 'Kimliği yoktur, sadece değerleri ile tanımlanır. Değiştirilemez (Immutable). Örn: Para birimi, Adres.',
      code: `class Money {
  constructor(amount, currency) {
    this.amount = amount;
    this.currency = currency;
    Object.freeze(this); // Değiştirilemez!
  }

  add(other) {
    if (this.currency !== other.currency) throw new Error('Para birimi uyumsuz');
    return new Money(this.amount + other.amount, this.currency);
  }
}`
    },
    aggregate: {
      title: 'Aggregate (Kök Nesne)',
      desc: 'Bir grup nesneyi (Entities + VOs) tek bir birim olarak yönetir. Veri tutarlılığını sağlar.',
      code: `class OrderAggregate {
  constructor(order, customer) {
    this.order = order;
    this.customer = customer;
  }

  // Tüm kurallar buradan geçer
  checkout() {
    if (this.order.items.length === 0) throw new Error('Sepet boş');
    this.order.status = 'PENDING_PAYMENT';
    // Domain Event tetiklenebilir: OrderPlaced
  }
}`
    },
    repository: {
      title: 'Repository (Depo)',
      desc: 'Domain nesnelerini sanki bellekteymiş gibi saklar ve getirir. DB detayını gizler.',
      code: `interface OrderRepository {
  save(orderAggregate);
  findById(id);
}`
    }
  };

  type ModelKey = keyof typeof modelExamples;
  const [activeTab, setActiveTab] = useState<ModelKey>('entity');

  return (
    <section style={{ padding: '100px 0' }}>
      <div className="container">
        <h2 className="section-title">Taktiksel DDD: Model Tasarımı</h2>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(300px, 1fr) 2fr',
          gap: '3rem',
          minHeight: '500px'
        }}>
          {/* Controls */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {(Object.keys(modelExamples) as ModelKey[]).map((key) => {
              const data = modelExamples[key];
              return (
                <button
                  key={key}
                  onClick={() => setActiveTab(key)}
                  className="glass-card"
                  style={{
                    textAlign: 'left',
                    padding: '1.5rem',
                    borderLeft: activeTab === key ? `4px solid #a78bfa` : '4px solid transparent',
                    background: activeTab === key ? 'rgba(167, 139, 250, 0.1)' : 'var(--glass)',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer'
                  }}
                >
                  <h4 style={{ color: activeTab === key ? '#a78bfa' : 'white', marginBottom: '0.5rem' }}>{data.title}</h4>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{data.desc.substring(0, 60)}...</p>
                </button>
              );
            })}

            <div className="glass-card" style={{ marginTop: 'auto', background: 'rgba(245, 158, 11, 0.05)', borderColor: 'rgba(245, 158, 11, 0.2)' }}>
              <h4 style={{ color: '#f59e0b', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem' }}>
                <Zap size={16} /> Önemli Kural
              </h4>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '0.5rem' }}>
                Bussiness Mantığı (İş Kuralları) her zaman Domain katmanındaki nesnelerin içine yazılır. Use Case'ler sadece bu modelleri yönetir.
              </p>
            </div>
          </div>

          {/* Code Area */}
          <div className="glass-card" style={{ 
            padding: 0, 
            display: 'flex', 
            flexDirection: 'column',
            overflow: 'hidden',
            background: '#0a0a0f'
          }}>
            <div style={{ 
              padding: '1rem 1.5rem', 
              borderBottom: '1px solid var(--glass-border)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <Code size={18} color="#a78bfa" />
                <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>{modelExamples[activeTab].title} Örneği</span>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#ff5f56' }} />
                <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#ffbd2e' }} />
                <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#27c93f' }} />
              </div>
            </div>

            <div style={{ padding: '2rem', flex: 1, overflowY: 'auto' }}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                >
                   <p style={{ color: '#a78bfa', marginBottom: '1.5rem', fontSize: '1rem', fontStyle: 'italic' }}>
                    "{modelExamples[activeTab].desc}"
                  </p>
                  <pre style={{ 
                    fontFamily: 'monospace', 
                    fontSize: '1rem', 
                    lineHeight: 1.6,
                    color: '#e2e8f0'
                  }}>
                    <code>{modelExamples[activeTab].code}</code>
                  </pre>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DDDSimulation;
