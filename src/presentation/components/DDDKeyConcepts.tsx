import React from 'react';
import { motion } from 'framer-motion';
import { 
  Puzzle, 
  Binary, 
  Box, 
  GitBranch, 
  ShieldCheck, 
  Settings, 
  Layers, 
  Users 
} from 'lucide-react';

const ConceptBlock = ({ number, title, children, icon: Icon, color }: any) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="glass-card"
    style={{
      padding: '2rem',
      height: '100%',
      position: 'relative',
      borderTop: `4px solid ${color}`,
      background: `linear-gradient(180deg, ${color}05 0%, rgba(255,255,255,0.02) 100%)`
    }}
  >
    <div style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', opacity: 0.1, color }}>
      <Icon size={40} />
    </div>
    <div style={{ 
      width: '32px', 
      height: '32px', 
      borderRadius: '50%', 
      background: color, 
      color: 'white', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      fontSize: '0.8rem',
      fontWeight: 900,
      marginBottom: '1rem'
    }}>
      {number}
    </div>
    <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '1.5rem', color: 'white' }}>{title}</h3>
    <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
      {children}
    </div>
  </motion.div>
);

const DDDKeyConcepts = () => {
  return (
    <section style={{ padding: '100px 0', background: 'var(--bg-dark)' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
          <h2 className="gradient-text" style={{ fontSize: '3rem', fontWeight: 900, marginBottom: '1.5rem' }}>
            8 Key Concepts In DDD
          </h2>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto' }}>
            ByteByteGo referansıyla DDD'nin temel yapı taşlarını ve stratejik yaklaşımlarını keşfedin.
          </p>
        </div>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
          gap: '2rem' 
        }}>
          {/* 1. Domain-Driven Design */}
          <ConceptBlock number="1" title="Domain-Driven Design" icon={Puzzle} color="#3b82f6">
            <p style={{ marginBottom: '10px' }}><strong>Problem Space:</strong> İş dünyasındaki zorlukların ve ihtiyaçların analiz edildiği alan (Satış, Ürün, Müşteri).</p>
            <p><strong>Solution Space:</strong> Bu ihtiyaçlara yönelik geliştirilen yazılım servisleri (Order Service, User Service).</p>
          </ConceptBlock>

          {/* 2. Model Thinking */}
          <ConceptBlock number="2" title="Model Thinking & Entities" icon={Binary} color="#a855f7">
            <p>Veriden (Data) Bilgiye (Information), Bilgiden Bilgeliğe (Wisdom) geçiş sürecidir. İş varlıklarını (Product, Order) kodda modellerle temsil ederiz.</p>
          </ConceptBlock>

          {/* 3. Identify Boundaries */}
          <ConceptBlock number="3" title="Identify the Boundaries" icon={Box} color="#10b981">
            <p><strong>Bounded Context:</strong> Her modelin anlam kazandığı sınırları belirleyin. User, Product ve Order bağımsız bağlamlarda (contexts) yaşamalıdır.</p>
          </ConceptBlock>

          {/* 4. Identify the Aggregation */}
          <ConceptBlock number="4" title="Identify the Aggregation" icon={GitBranch} color="#f59e0b">
            <p>İş tutarlılığını sağlamak için nesneleri <strong>Aggregate</strong>'ler altında gruplayın. Order, OrderItem'ların yönetici köküdür (Root).</p>
          </ConceptBlock>

          {/* 5. Entities vs Value Objects */}
          <ConceptBlock number="5" title="Entities vs Value Objects" icon={ShieldCheck} color="#ef4444">
            <p style={{ marginBottom: '10px' }}><strong>Entity:</strong> Kimliği (ID) olan ve değişebilen nesne (Order).</p>
            <p><strong>Value Object:</strong> Kimliği olmayan, sadece değer taşıyan nesne (Address).</p>
          </ConceptBlock>

          {/* 6. Manipulate Models */}
          <ConceptBlock number="6" title="Manipulate Models" icon={Settings} color="#06b6d4">
            <p><strong>Factory:</strong> Nesne üretimi.</p>
            <p><strong>Service:</strong> İş akışının yönetimi.</p>
            <p><strong>Repository:</strong> Verinin kalıcılığı (Persistence).</p>
          </ConceptBlock>

          {/* 7. Layered Architecture */}
          <ConceptBlock number="7" title="Layered Architecture" icon={Layers} color="#6366f1">
            <p>Presentation (Arayüz), Application (Uygulama), Domain (İş Mantığı) ve Infrastructure (Teknik Altyapı) katmanlarının hiyerarşik dizilimidir.</p>
          </ConceptBlock>

          {/* 8. Domain Modeling */}
          <ConceptBlock number="8" title="Domain Modeling" icon={Users} color="#ec4899">
            <p>Aktörlerin kullanım senaryolarını (Use Cases) Event Storming ve nesne modelleme teknikleriyle yaşayan bir domain modeline dönüştürme sürecidir.</p>
          </ConceptBlock>
        </div>
      </div>
    </section>
  );
};

export default DDDKeyConcepts;
