import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code, Box, Cpu, HardDrive } from 'lucide-react';

const OnionPractical = () => {
  const content = {
    domain: {
      title: 'Domain Model (Çekirdek)',
      desc: 'Uygulamanın kalbi. Entitiler ve Value Objectler burada bulunur.',
      code: `// En iç katman
export class Product {
  constructor(id, price) {
    this.id = id;
    this.price = price; // Money Value Object olabilir
  }
}`,
      icon: <Box color="#f43f5e" />
    },
    services: {
      title: 'Domain Services',
      desc: 'Birden fazla entitiyi ilgilendiren iş mantığı.',
      code: `export class PricingService {
  calculateDiscount(product, user) {
    if (user.isPremium) return product.price * 0.8;
    return product.price;
  }
}`,
      icon: <Cpu color="#fb7185" />
    },
    app: {
      title: 'Application Services',
      desc: 'Orkestrasyon katmanı. Dış dünyadan gelen istekleri Domain katmanına iletir.',
      code: `export class OrderAppService {
  constructor(productRepo, pricingService) {
    this.productRepo = productRepo;
    this.pricingService = pricingService;
  }

  async createOrder(productId, userId) {
    const product = await this.productRepo.getById(productId);
    // ... iş akışı
  }
}`,
      icon: <HardDrive color="#fda4af" />
    }
  };

  type LayerKey = keyof typeof content;
  const [activeLayer, setActiveLayer] = useState<LayerKey>('domain');

  return (
    <section style={{ padding: '100px 0', background: 'rgba(2, 6, 23, 0.3)' }}>
      <div className="container">
        <h2 className="section-title">Neden Onion Architecture?</h2>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '3rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {(Object.keys(content) as LayerKey[]).map((key) => {
              const item = content[key];
              return (
                <div
                  key={key}
                  onClick={() => setActiveLayer(key)}
                  className="glass-card"
                  style={{
                    cursor: 'pointer',
                    borderLeft: activeLayer === key ? '4px solid #f43f5e' : '4px solid transparent',
                    background: activeLayer === key ? 'rgba(244, 63, 94, 0.1)' : 'var(--glass)',
                    transition: 'all 0.3s ease'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
                    {item.icon}
                    <h4 style={{ color: activeLayer === key ? '#f43f5e' : 'white' }}>{item.title}</h4>
                  </div>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{item.desc}</p>
                </div>
              );
            })}
          </div>

          <div className="glass-card" style={{ padding: 0, overflow: 'hidden', background: '#0a0a0f' }}>
            <div style={{ padding: '1rem 1.5rem', borderBottom: '1px solid var(--glass-border)', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <Code size={18} color="#f43f5e" />
              <span style={{ fontSize: '0.85rem' }}>Kod Örneği</span>
            </div>
            <div style={{ padding: '2rem' }}>
              <AnimatePresence mode="wait">
                <motion.pre
                  key={activeLayer}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  style={{ color: '#e2e8f0', fontSize: '1rem', lineHeight: 1.6 }}
                >
                  <code>{content[activeLayer].code}</code>
                </motion.pre>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OnionPractical;
