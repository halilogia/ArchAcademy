import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Code, Activity, Server } from 'lucide-react';

const CQRSPractical = () => {
  const [activeTab, setActiveTab] = useState('handler');

  const content = {
    handler: {
      title: 'Command Handler',
      desc: 'İş mantığının işlendiği ve sistem durumunun güncellendiği yer.',
      code: `// src/application/orders/commands/CreateOrderHandler.js
export class CreateOrderHandler {
  constructor(orderRepo, eventBus) {
    this.orderRepo = orderRepo;
    this.eventBus = eventBus;
  }

  async handle(command) {
    const order = new Order(command.data);
    await this.orderRepo.save(order);
    
    // Okuma modelini güncellemek için olay yayınla
    await this.eventBus.publish(new OrderCreatedEvent(order.id));
    
    return order.id;
  }
}`
    },
    projection: {
      title: 'Read Projection',
      desc: 'Yazma modelindeki değişiklikleri okuma modeline (Read Model) yansıtan parça.',
      code: `// src/application/orders/queries/OrderProjection.js
export class OrderProjection {
  constructor(readDb) {
    this.readDb = readDb;
  }

  // OrderCreatedEvent geldiğinde çalışır
  async onOrderCreated(event) {
    const orderData = await sourceDb.get(event.id);
    // Okuma için optimize edilmiş (Join'siz) tabloya kaydet
    await this.readDb.ordersFlat.insert({
       id: orderData.id,
       customerName: orderData.customer.name,
       totalAmount: orderData.total
    });
  }
}`
    },
    mediator: {
      title: 'Mediator Pattern',
      desc: 'İstekleri (Command/Query) ilgili Handlerlara yönlendiren merkezi yapı.',
      code: `// src/presentation/controllers/OrderController.js
export class OrderController {
  constructor(mediator) {
    this.mediator = mediator;
  }

  async create(req, res) {
    const command = new CreateOrderCommand(req.body);
    // Controller Handler'ı bilmez, sadece Mediator'a verir
    const result = await this.mediator.send(command);
    res.status(201).json({ id: result });
  }
}`
    }
  };

  return (
    <section style={{ padding: '100px 0' }}>
      <div className="container">
        <h2 className="section-title">CQRS Uygulama Mimarisi</h2>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '3rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {Object.entries(content).map(([key, item]) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className="glass-card"
                style={{
                  textAlign: 'left',
                  borderLeft: activeTab === key ? '4px solid #eab308' : '4px solid transparent',
                  background: activeTab === key ? 'rgba(234, 179, 8, 0.1)' : 'var(--glass)',
                  padding: '1.5rem'
                }}
              >
                <h4 style={{ color: activeTab === key ? '#eab308' : 'white', marginBottom: '0.5rem' }}>{item.title}</h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{item.desc}</p>
              </button>
            ))}

            <div className="glass-card" style={{ marginTop: '2rem', background: 'rgba(59, 130, 246, 0.05)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                <Activity size={18} color="#3b82f6" />
                <h4 style={{ fontSize: '0.9rem' }}>Önemli Avantaj</h4>
              </div>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                Yazma ve Okuma işlemleri farklı veritabanlarında (örn: SQL ve Redis) tutulabilir. 
                Bu sayede raporlama gibi ağır sorgular, ana sistemi yavaşlatmaz.
              </p>
            </div>
          </div>

          <div className="glass-card" style={{ padding: 0, overflow: 'hidden', background: '#0a0a0f' }}>
            <div style={{ padding: '1.25rem', borderBottom: '1px solid var(--glass-border)', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <Server size={18} color="#eab308" />
              <span style={{ fontSize: '0.85rem' }}>Uygulama Katmanı</span>
            </div>
            <div style={{ padding: '2rem' }}>
              <AnimatePresence mode="wait">
                <motion.pre
                  key={activeTab}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  style={{ color: '#e2e8f0', fontSize: '0.95rem', lineHeight: 1.6 }}
                >
                  <code>{content[activeTab].code}</code>
                </motion.pre>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CQRSPractical;
