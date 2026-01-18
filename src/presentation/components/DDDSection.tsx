import React from 'react';
import { motion } from 'framer-motion';
import { Network, Users, BookOpen, GitBranch, Box, ShieldCheck } from 'lucide-react';

const DDDSection = () => {
  const tacticalPatterns = [
    { icon: <Box color="#f59e0b" />, title: 'Entities', desc: 'Kimliği (ID) olan nesneler. Zamanla değişebilirler (örn: Müşteri).' },
    { icon: <ShieldCheck color="#10b981" />, title: 'Value Objects', desc: 'Kimliği olmayan, sadece değerleri ile tanımlanan nesneler (örn: Adres, Para).' },
    { icon: <GitBranch color="#8b5cf6" />, title: 'Aggregates', desc: 'Birlikte değişmesi gereken nesneler grubu. Tutarlılık merkezidir.' },
  ];

  return (
    <section id="ddd" style={{ padding: '100px 0', background: 'linear-gradient(180deg, var(--bg-dark) 0%, #1e1b4b 100%)' }}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: '5rem' }}
        >
          <span style={{
            background: 'rgba(139, 92, 246, 0.1)',
            padding: '8px 16px',
            borderRadius: '100px',
            fontSize: '0.85rem',
            fontWeight: 600,
            color: '#a78bfa',
            border: '1px solid rgba(139, 92, 246, 0.2)',
            marginBottom: '2rem',
            display: 'inline-block'
          }}>
            Karmaşık Sistemleri Yönetmek
          </span>
          <h2 className="gradient-text" style={{ fontSize: '3.5rem', fontWeight: 800, marginBottom: '1.5rem' }}>
            Domain-Driven Design (DDD)
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', maxWidth: '800px', margin: '0 auto' }}>
            Yazılımın kalbine, yani "Domain"e odaklanın. DDD, karmaşık iş süreçlerini 
            kodla değil, iş dünyasının diliyle modelleme sanatıdır.
          </p>
        </motion.div>

        {/* Strategic Patterns */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '4rem', marginBottom: '8rem', alignItems: 'center' }}>
          <div className="glass-card" style={{ padding: '3rem', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: '-10%', right: '-10%', opacity: 0.1 }}>
              <Network size={300} color="#8b5cf6" />
            </div>
            <h3 style={{ fontSize: '2rem', marginBottom: '2rem', color: '#a78bfa' }}>Stratejik Tasarım</h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              <div style={{ display: 'flex', gap: '1.5rem' }}>
                <Users size={40} color="#a78bfa" />
                <div>
                  <h4 style={{ marginBottom: '0.5rem' }}>Ubiquitous Language (Ortak Dil)</h4>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
                    Yazılımcılar ve iş birimi aynı dili konuşmalı. Kodda kullanılan isimler (User, Order, Account), 
                    gerçek hayattaki iş terimleriyle birebir aynı olmalıdır.
                  </p>
                </div>
              </div>
              
              <div style={{ display: 'flex', gap: '1.5rem' }}>
                <BookOpen size={40} color="#a78bfa" />
                <div>
                  <h4 style={{ marginBottom: '0.5rem' }}>Bounded Context (Sınırlı Bağlam)</h4>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
                    Aynı kelime farklı yerlerde farklı anlamlara gelebilir. "Ürün" kelimesi Satış bağlamında 
                    fiyatı ifade ederken, Kargo bağlamında ağırlığı ifade eder. Modelleri ayırın!
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div className="glass-card" style={{ borderLeft: '4px solid #a78bfa' }}>
              <h4 style={{ color: '#a78bfa', marginBottom: '0.5rem' }}>Neden DDD?</h4>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                Büyük projelerde kodun spagettiye dönüşmesini engeller. Yazılımın teknik detaydan ziyade 
                gerçek iş değerine odaklanmasını sağlar.
              </p>
            </div>
            <div className="glass-card" style={{ borderLeft: '4px solid #f59e0b' }}>
              <h4 style={{ color: '#f59e0b', marginBottom: '0.5rem' }}>Problem Çözümü</h4>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                Kod, iş kurallarının (Business Rules) bir yansıması haline gelir. Bakım kolaylaşır.
              </p>
            </div>
          </div>
        </div>

        {/* Tactical Patterns */}
        <h3 style={{ textAlign: 'center', marginBottom: '3rem', fontSize: '2rem' }}>Taktiksel Desenler</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem' }}>
          {tacticalPatterns.map((pattern, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -10 }}
              className="glass-card"
              style={{ textAlign: 'center' }}
            >
              <div style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'center' }}>
                {pattern.icon}
              </div>
              <h4 style={{ marginBottom: '1rem', fontSize: '1.2rem' }}>{pattern.title}</h4>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>{pattern.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* DDD with Clean Architecture */}
        <div className="glass-card" style={{ 
          marginTop: '6rem', 
          background: 'linear-gradient(90deg, rgba(59, 130, 246, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%)',
          textAlign: 'center',
          padding: '4rem'
        }}>
          <h3 style={{ marginBottom: '1.5rem' }}>DDD + Clean Architecture: Mükemmel İkili</h3>
          <p style={{ maxWidth: '700px', margin: '0 auto', color: 'var(--text-secondary)' }}>
            DDD sistemi <strong>Dikey (Bağlamlara göre)</strong> bölerken, Clean Architecture <strong>Yatay (Katmanlara göre)</strong> böler. 
            Bu iki yaklaşımı birlikte kullanmak, dünyanın en sağlam yazılım mimarisini oluşturur.
          </p>
        </div>
      </div>
    </section>
  );
};

export default DDDSection;
