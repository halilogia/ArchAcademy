import { useTranslation } from 'react-i18next';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Hexagon, Zap, Compass, Sparkles, Layers, Box, Cpu, Network } from 'lucide-react';
import SEO from '../components/SEO';

interface ArchItem {
  name: string;
  path: string;
  color: string;
  desc: { tr: string; en: string };
}

interface ArchCategory {
  id: string;
  name: { tr: string; en: string };
  color: string;
  items: ArchItem[];
}

const CatalogPage: React.FC = () => {
  const { i18n } = useTranslation();
  const isEn = (i18n.resolvedLanguage || i18n.language || 'tr').startsWith('en');
  const navigate = useNavigate();
  const [hoveredItem, setHoveredItem] = useState<ArchItem | null>(null);
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRotation(prev => (prev + 0.02) % 360);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  const categories: ArchCategory[] = [
    {
      id: 'domain-centric',
      name: { tr: 'Domain Odaklı', en: 'Domain-Centric' },
      color: '#a855f7',
      items: [
        { name: 'Clean Architecture', path: '/clean-arch', color: '#a855f7', desc: { tr: "Uncle Bob'un bağımsızlık ve test edilebilirlik katmanları.", en: "Uncle Bob's layers of independence and testability." } },
        { name: 'Onion Architecture', path: '/onion', color: '#c084fc', desc: { tr: 'Bağımlılık yönü daima merkeze doğru olan dairesel mimari.', en: 'Concentric architectural pattern with inward-pointing dependencies.' } },
        { name: 'DDD Architecture', path: '/ddd', color: '#d8b4fe', desc: { tr: 'İş mantığını dile ve Bounded Context sınırlarına odaklayan tasarım.', en: 'Aligning software design strictly with domain logic and bounded contexts.' } },
        { name: 'Hexagonal', path: '/hexagonal', color: '#a855f7', desc: { tr: 'Ports & Adapters soyutlama modeli ile dış dünyadan izolasyon.', en: 'Ports & Adapters pattern isolating core domain logic from external tech.' } }
      ]
    },
    {
      id: 'layered-modern',
      name: { tr: 'Katmanlı & Modern', en: 'Layered & Modern' },
      color: '#3b82f6',
      items: [
        { name: 'Vertical Slice', path: '/vertical', color: '#3b82f6', desc: { tr: 'Startup ve yapay zeka dostu özellik bazlı dikey tasarım.', en: 'Feature-first cohesion optimized for modern agile & AI workflows.' } },
        { name: 'n-Tier (Horizontal)', path: '/horizontal', color: '#60a5fa', desc: { tr: 'Klasik sorumluluk bazlı yatay katmanlandırma.', en: 'Traditional horizontal separation of concerns by technical layers.' } },
        { name: 'FSD (Frontend)', path: '/fsd', color: '#93c5fd', desc: { tr: 'Büyük ölçekli frontend projeleri için Feature-Sliced Design.', en: 'Feature-Sliced Design for scaling complex frontend codebases.' } }
      ]
    },
    {
      id: 'distributed-messaging',
      name: { tr: 'Dağıtık & Mesajlaşma', en: 'Distributed & Messaging' },
      color: '#10b981',
      items: [
        { name: 'Microservices', path: '/microservices', color: '#10b981', desc: { tr: 'Bağımsız, otonom ve dağıtık servis mimarisi.', en: 'Decoupled, independently deployable autonomous microservices.' } },
        { name: 'Event-Driven (EDA)', path: '/eda', color: '#34d399', desc: { tr: 'Olay yayınlama ve asenkron tepki mekanizması.', en: 'Asynchronous event production, detection, and consumption pattern.' } },
        { name: 'Serverless (FaaS)', path: '/serverless', color: '#6ee7b7', desc: { tr: 'Sunucusuz, olay tetiklemeli fonksiyon çalıştırma.', en: 'Serverless compute model executing stateless ephemeral functions.' } },
        { name: 'SOA Arch', path: '/soa', color: '#059669', desc: { tr: 'Kurumsal servis odaklı mimari (ESB tabanlı entegrasyon).', en: 'Enterprise service-oriented integration via Enterprise Service Bus.' } },
        { name: 'Broker Architecture', path: '/broker', color: '#10b981', desc: { tr: 'Merkezi mesaj kuyrukları (RabbitMQ/Kafka) ile haberleşme.', en: 'Decoupled communication orchestrated through central message brokers.' } }
      ]
    },
    {
      id: 'data-reactive',
      name: { tr: 'Veri & Reaktif', en: 'Data & Reactive' },
      color: '#f59e0b',
      items: [
        { name: 'CQRS', path: '/cqrs', color: '#f59e0b', desc: { tr: 'Okuma ve yazma modellerinin birbirinden ayrılması.', en: 'Segregation of Command (write) and Query (read) responsibility.' } },
        { name: 'Event Sourcing', path: '/event-sourcing', color: '#fbbf24', desc: { tr: 'Durumun değişmez olay günlüğü olarak saklanması.', en: 'Persisting application state as an immutable log of state transitions.' } },
        { name: 'Space-Based (SBA)', path: '/space-based', color: '#fde68a', desc: { tr: 'Veritabanı darboğazını aşan dağıtık RAM bellek ızgarası.', en: 'In-memory data grids built to eliminate central database bottlenecks.' } },
        { name: 'Lambda & Kappa', path: '/lambda-kappa', color: '#d97706', desc: { tr: 'Büyük veri stream ve batch işleme boru hatları.', en: 'Hybrid real-time streaming and massive batch processing pipelines.' } }
      ]
    },
    {
      id: 'structural-specialized',
      name: { tr: 'Yapısal & İleri Düzey', en: 'Structural & Specialized' },
      color: '#ec4899',
      items: [
        { name: 'Microkernel (Plugin)', path: '/microkernel', color: '#ec4899', desc: { tr: 'Çekirdek sistem ve tak-çıkar eklenti mimarisi.', en: 'Core system extensible via plug-and-play modular plugins.' } },
        { name: 'Pipe-Filter', path: '/pipe-filter', color: '#f472b6', desc: { tr: 'Sıralı veri dönüşüm ve filtreleme boru hatları.', en: 'Sequential data stream processing across discrete pipeline filters.' } },
        { name: 'Peer-to-Peer (P2P)', path: '/p2p', color: '#fbcfe8', desc: { tr: 'Merkezi olmayan, eşit düğümlü ağ mimarisi.', en: 'Decentralized peer network without centralized authoritative servers.' } },
        { name: 'Interpreter Pattern', path: '/interpreter', color: '#db2777', desc: { tr: 'Özel dilleri veya kuralları yorumlayan yürütücü.', en: 'Grammar evaluator and custom domain-specific language execution engine.' } }
      ]
    },
    {
      id: 'disciplines',
      name: { tr: 'Mimari Disiplinler', en: 'Enterprise Disciplines' },
      color: '#06b6d4',
      items: [
        { name: 'SOLID Principles', path: '/solid', color: '#06b6d4', desc: { tr: 'Değişime açık, esnek kodun 5 temel kuralı.', en: '5 core foundations of maintainable object-oriented software.' } },
        { name: 'Clean Code', path: '/clean-code', color: '#22d3ee', desc: { tr: 'Okunabilir, yalın ve teknik borçsuz kod yazımı.', en: 'Self-documenting, readable code written for human maintainability.' } },
        { name: 'TDD Methodology', path: '/tdd', color: '#67e8f9', desc: { tr: 'Test güdümlü geliştirme disiplini (Red-Green-Refactor).', en: 'Test-Driven Development lifecycle (Red-Green-Refactor cycles).' } },
        { name: 'Design Patterns', path: '/design-patterns', color: '#0891b2', desc: { tr: 'Kanıtlanmış yazılım tasarım şablonları kataloğu.', en: 'Proven Gang of Four structural and behavioral architectural blueprints.' } }
      ]
    },
    {
      id: 'modern-ai',
      name: { tr: 'AI & Modern Ekosistem', en: 'AI & Modern Paradigms' },
      color: '#8b5cf6',
      items: [
        { name: 'RAG Architecture', path: '/rag-arch', color: '#8b5cf6', desc: { tr: 'Vektör arama destekli LLM bilgi alma mimarisi.', en: 'Retrieval-Augmented Generation context injection for LLMs.' } },
        { name: 'Agentic AI', path: '/agentic-ai', color: '#a78bfa', desc: { tr: 'Otonom araç kullanan çok adımlı yapay zeka ajanları.', en: 'Multi-agent autonomous tool-using reasoning loop systems.' } },
        { name: 'Server-Driven UI', path: '/server-driven-ui', color: '#c4b5fd', desc: { tr: 'Sunucu güdümlü dinamik kullanıcı arayüzü çizimi.', en: 'Dynamic component trees rendered purely via backend JSON schemas.' } },
        { name: 'GitOps & IaC', path: '/gitops', color: '#7c3aed', desc: { tr: 'Git tabanlı bildirime dayalı altyapı yönetimi.', en: 'Declarative Git-centric infrastructure deployment and rollback.' } }
      ]
    }
  ];

  return (
    <>
      <SEO
        title={isEn ? "Master Architecture Atlas (32 Patterns) | ArchAcademy" : "Büyük Mimari Atlası (32 Mimari) | ArchAcademy"}
        description={isEn 
          ? "Master 32 software architecture patterns. Explore Clean Architecture, Microservices, Event-Driven, DDD, CQRS, and Agentic AI." 
          : "32 yazılım mimarisi şablonunun interaktif atlası. Clean Architecture'dan Mikroservislere, DDD'den Agentic AI'a tüm desenler."
        }
        keywords="software architecture, architecture catalog, clean architecture, microservices, ddd, cqrs, event driven"
        canonicalUrl="/catalog"
      />
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ background: '#020617', minHeight: '100vh', paddingTop: '100px', overflowX: 'hidden' }}>
        <div className="container" style={{ maxWidth: '1600px' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(59, 130, 246, 0.1)', padding: '0.5rem 1.2rem', borderRadius: '100px', color: 'var(--primary)', fontWeight: 800, fontSize: '0.8rem', marginBottom: '1rem', border: '1px solid rgba(59, 130, 246, 0.3)' }}>
              <Sparkles size={16} /> {isEn ? "MASTER ARCHITECTURE ATLAS" : "BÜYÜK MİMARİ ATLASI"}
            </motion.div>
            <h1 style={{ fontSize: '3.5rem', fontWeight: 950, letterSpacing: '-2px', margin: 0, color: 'white' }}>
              {isEn ? "Architectural Galaxy" : "Mimari"} <span className="gradient-text">{isEn ? "Constellation" : "Galaksi"}</span>
            </h1>
            <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem' }}>
              {isEn ? "Explore 32 core architecture patterns and design disciplines in an interactive universe." : "32 temel mimari desenini ve tasarım disiplinini interaktif evrende keşfedin."}
            </p>
          </div>

          {/* Galaxy View & HUD Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem', paddingBottom: '100px' }}>
            {categories.map((cat) => (
              <div key={cat.id} className="glass-card" style={{ borderTop: `4px solid ${cat.color}`, padding: '2rem' }}>
                <h3 style={{ fontSize: '1.4rem', color: 'white', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: cat.color }}></span>
                  {isEn ? cat.name.en : cat.name.tr}
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {cat.items.map((item) => (
                    <motion.div
                      key={item.path}
                      onClick={() => navigate(item.path)}
                      whileHover={{ x: 6 }}
                      style={{
                        padding: '1rem',
                        background: 'rgba(255, 255, 255, 0.02)',
                        borderRadius: '12px',
                        border: '1px solid rgba(255, 255, 255, 0.05)',
                        cursor: 'pointer',
                        transition: 'border-color 0.2s'
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                        <strong style={{ color: 'white', fontSize: '1rem' }}>{item.name}</strong>
                        <span style={{ fontSize: '0.75rem', color: cat.color, fontWeight: 700 }}>{isEn ? "Explore →" : "İncele →"}</span>
                      </div>
                      <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: 1.5 }}>
                        {isEn ? item.desc.en : item.desc.tr}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>
            ))}
          </div>

        </div>
      </motion.div>
    </>
  );
};

export default CatalogPage;
