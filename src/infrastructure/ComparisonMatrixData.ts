export interface LocalizedText {
  tr: string;
  en: string;
}

export interface MatrixRowItem {
  name: string;
  size: LocalizedText;
  sizeValue: number;
  speed: number;
  kiss: number;
  dry: number;
  maintAndTest: number;
  flex: number;
  aiLocality: number;
  color: string;
  bestFor: LocalizedText;
  path: string;
}

export interface SummaryCardItem {
  id: string;
  title: LocalizedText;
  desc: LocalizedText;
  color: string;
  borderColor: string;
}

export const MATRIX_SUMMARY_CARDS: SummaryCardItem[] = [
  {
    id: 'vibe',
    title: { tr: '📁 Locality (Vibe Coding)', en: '📁 Locality (Vibe Coding)' },
    desc: {
      tr: "AI'ın tek klasörde çalışabilme yeteneği. Vertical Slice ve Monolith, prompt context'ini bölmeden maksimum verim sunar.",
      en: "AI's ability to operate within a single folder/slice. Vertical Slice and Monolith maximize prompt context efficiency without fragmented layers."
    },
    color: '#f97316',
    borderColor: 'rgba(249, 115, 22, 0.3)'
  },
  {
    id: 'dry',
    title: { tr: '🔄 DRY vs WET / AHA', en: '🔄 DRY vs WET / AHA' },
    desc: {
      tr: "Katı DRY mimarileri (Clean/DDD) sıfır kod tekrarı isterken, VSA gibi yapılar bağımsızlık için kontrollü tekrarı (WET/AHA) savunur.",
      en: "Strict DRY architectures (Clean/DDD) forbid code duplication, while VSA champions controlled repetition (WET/AHA) to preserve autonomous slice boundaries."
    },
    color: '#6366f1',
    borderColor: 'rgba(99, 102, 241, 0.3)'
  },
  {
    id: 'kiss',
    title: { tr: '🧘 KISS (Keep It Simple, Stupid)', en: '🧘 KISS (Keep It Simple, Stupid)' },
    desc: {
      tr: "Gereksiz katman ve soyutlamadan kaçınma. Basit tasarlanan mimariler en az bilişsel yük (cognitive load) üretir.",
      en: "Avoiding unnecessary abstraction overhead. Clean, simply-designed architectures produce the lowest cognitive load for onboarding developers."
    },
    color: '#84cc16',
    borderColor: 'rgba(132, 204, 22, 0.3)'
  },
  {
    id: 'maint',
    title: { tr: '🛡️ Bakım & Test Güvencesi', en: '🛡️ Maintainability & Testing' },
    desc: {
      tr: "Hexagonal, Clean ve Onion mimarileri bağımlılık izolasyonu ile maksimum test kapsamı ve uzun ömür sağlar.",
      en: "Hexagonal, Clean, and Onion architectures provide maximum isolation and testability guarantees for mission-critical enterprise longevity."
    },
    color: '#06b6d4',
    borderColor: 'rgba(6, 182, 212, 0.3)'
  }
];

export const MATRIX_DATA: MatrixRowItem[] = [
  {
    name: 'Modular Monolith (PMA)',
    size: { tr: 'Her boyuta uygun', en: 'All Scales' },
    sizeValue: 2.5,
    speed: 5,
    kiss: 4,
    dry: 4,
    maintAndTest: 5,
    flex: 5,
    aiLocality: 5,
    color: '#38bdf8',
    bestFor: { tr: 'Hızlı & Güvenli Kurumsal Ürünler (Hybrid VSA/FSD)', en: 'High Velocity Enterprise Products (Hybrid VSA/FSD)' },
    path: '/modular-monolith'
  },
  {
    name: 'Use-Case Driven (BCE)',
    size: { tr: 'Orta/Büyük', en: 'Medium/Large' },
    sizeValue: 3,
    speed: 3,
    kiss: 3,
    dry: 4,
    maintAndTest: 5,
    flex: 4,
    aiLocality: 4,
    color: '#f59e0b',
    bestFor: { tr: 'İş Akışı ve Senaryo Yoğun Sistemler (BCE Modeli)', en: 'Workflow & Scenario-Dense Systems (BCE Model)' },
    path: '/use-case-driven'
  },
  {
    name: 'Clean Architecture',
    size: { tr: 'Büyük (Large)', en: 'Large Enterprise' },
    sizeValue: 3,
    speed: 2,
    kiss: 2,
    dry: 5,
    maintAndTest: 5,
    flex: 5,
    aiLocality: 2,
    color: 'var(--primary)',
    bestFor: { tr: 'Karmaşık Kurumsal Sistemler', en: 'Complex Enterprise Systems' },
    path: '/clean-arch'
  },
  {
    name: 'Vertical Slice',
    size: { tr: 'Küçük/Orta', en: 'Small/Medium' },
    sizeValue: 2,
    speed: 5,
    kiss: 4,
    dry: 2,
    maintAndTest: 4,
    flex: 5,
    aiLocality: 5,
    color: '#f97316',
    bestFor: { tr: 'Hızlı Özellik Geliştirme (Feature-First & AI)', en: 'Rapid Feature Velocity (Feature-First & AI)' },
    path: '/vertical'
  },
  {
    name: 'Microservices',
    size: { tr: 'Çok Büyük', en: 'Enterprise Distributed' },
    sizeValue: 4,
    speed: 3,
    kiss: 1,
    dry: 3,
    maintAndTest: 4,
    flex: 5,
    aiLocality: 3,
    color: '#38bdf8',
    bestFor: { tr: 'Bağımsız Ekipler ve Çoklu Dağıtık Servisler', en: 'Independent Multi-Team Distributed Systems' },
    path: '/microservices'
  },
  {
    name: 'Agentic AI Architecture',
    size: { tr: 'Orta/Büyük', en: 'AI Autonomous' },
    sizeValue: 2.5,
    speed: 4,
    kiss: 2,
    dry: 3,
    maintAndTest: 4,
    flex: 5,
    aiLocality: 5,
    color: '#10b981',
    bestFor: { tr: 'Otonom AI Ajanları & Multi-Agent İş Akışları', en: 'Autonomous AI Agents & Multi-Agent Workflows' },
    path: '/agentic-ai'
  },
  {
    name: 'RAG Architecture',
    size: { tr: 'Orta/Büyük', en: 'LLM Systems' },
    sizeValue: 2.5,
    speed: 4,
    kiss: 3,
    dry: 4,
    maintAndTest: 4,
    flex: 4,
    aiLocality: 4,
    color: '#a855f7',
    bestFor: { tr: 'Vektör Arama & Kurumsal Bilgi Tabanlı LLM', en: 'Vector Search & Knowledge Retrieval LLM' },
    path: '/rag-arch'
  },
  {
    name: 'DDD (Methodology)',
    size: { tr: 'Büyük (Large)', en: 'Large Complex' },
    sizeValue: 3,
    speed: 1,
    kiss: 1,
    dry: 5,
    maintAndTest: 5,
    flex: 4,
    aiLocality: 1,
    color: '#a78bfa',
    bestFor: { tr: 'Karmaşık İş Mantığına Sahip Domainler', en: 'Complex Business Logic & Rich Domains' },
    path: '/ddd'
  },
  {
    name: 'Islands Architecture',
    size: { tr: 'Her boyuta uygun', en: 'Any Scale' },
    sizeValue: 2,
    speed: 5,
    kiss: 3,
    dry: 3,
    maintAndTest: 4,
    flex: 5,
    aiLocality: 4,
    color: '#f59e0b',
    bestFor: { tr: 'Yüksek Performanslı İçerik Odaklı Siteler (Astro/Fresh)', en: 'High-Performance Content Sites (Astro/Fresh)' },
    path: '/islands-arch'
  },
  {
    name: 'CQRS (Pattern)',
    size: { tr: 'Orta/Büyük', en: 'Medium/Large' },
    sizeValue: 2.5,
    speed: 2,
    kiss: 2,
    dry: 4,
    maintAndTest: 5,
    flex: 3,
    aiLocality: 1,
    color: '#eab308',
    bestFor: { tr: 'Yüksek Okuma/Yazma Trafikli Sistemler', en: 'Asymmetric High Read/Write Traffic' },
    path: '/cqrs'
  },
  {
    name: 'Hexagonal',
    size: { tr: 'Orta/Büyük', en: 'Medium/Large' },
    sizeValue: 2.5,
    speed: 3,
    kiss: 2,
    dry: 5,
    maintAndTest: 5,
    flex: 5,
    aiLocality: 2,
    color: '#10b981',
    bestFor: { tr: 'Teknoloji Bağımsız Uygulamalar', en: 'Framework-Independent Core Business' },
    path: '/hexagonal'
  },
  {
    name: 'Onion Architecture',
    size: { tr: 'Orta/Büyük', en: 'Medium/Large' },
    sizeValue: 2.5,
    speed: 3,
    kiss: 2,
    dry: 5,
    maintAndTest: 5,
    flex: 5,
    aiLocality: 2,
    color: '#f43f5e',
    bestFor: { tr: 'Domain Odaklı Uygulamalar', en: 'Domain-Centric Layered Applications' },
    path: '/onion'
  },
  {
    name: 'FSD (Frontend)',
    size: { tr: 'Orta/Büyük', en: 'Medium/Large' },
    sizeValue: 2.5,
    speed: 3,
    kiss: 2,
    dry: 4,
    maintAndTest: 4,
    flex: 4,
    aiLocality: 2,
    color: '#06b6d4',
    bestFor: { tr: 'Karmaşık React/Next.js Projeleri', en: 'Scalable React & Next.js Frontends' },
    path: '/fsd'
  },
  {
    name: 'Event-Driven (EDA)',
    size: { tr: 'Çok Büyük', en: 'Enterprise Distributed' },
    sizeValue: 4,
    speed: 2,
    kiss: 1,
    dry: 3,
    maintAndTest: 4,
    flex: 5,
    aiLocality: 2,
    color: '#a855f7',
    bestFor: { tr: 'Dağıtık Mikroservis Sistemleri', en: 'Decoupled Asynchronous Microservices' },
    path: '/eda'
  },
  {
    name: 'Microkernel',
    size: { tr: 'Küçük/Orta', en: 'Small/Medium' },
    sizeValue: 2,
    speed: 4,
    kiss: 3,
    dry: 4,
    maintAndTest: 4,
    flex: 5,
    aiLocality: 4,
    color: '#3b82f6',
    bestFor: { tr: 'Eklenti Tabanlı Uygulamalar (IDE, OS)', en: 'Extensible Plugin-Based Apps (IDE, CLI)' },
    path: '/microkernel'
  },
  {
    name: 'Serverless (FaaS)',
    size: { tr: 'Değişken', en: 'Auto-Scaling' },
    sizeValue: 2,
    speed: 5,
    kiss: 4,
    dry: 2,
    maintAndTest: 3,
    flex: 4,
    aiLocality: 4,
    color: '#ec4899',
    bestFor: { tr: 'Olay Tetiklemeli İş Mantığı ve Ölçeklenme', en: 'Event-Triggered Micro-Workflows' },
    path: '/serverless'
  },
  {
    name: 'Event Sourcing',
    size: { tr: 'Orta/Büyük', en: 'Medium/Large' },
    sizeValue: 2.5,
    speed: 1,
    kiss: 1,
    dry: 4,
    maintAndTest: 5,
    flex: 2,
    aiLocality: 1,
    color: '#6366f1',
    bestFor: { tr: 'Denetim Odaklı Finansal Uygulamalar', en: 'Audit-Heavy Financial & Ledger Apps' },
    path: '/event-sourcing'
  },
  {
    name: 'Space-Based',
    size: { tr: 'Devasa', en: 'Massive Traffic' },
    sizeValue: 4,
    speed: 2,
    kiss: 1,
    dry: 3,
    maintAndTest: 3,
    flex: 2,
    aiLocality: 1,
    color: '#eab308',
    bestFor: { tr: 'Ultra Yüksek Eşzamanlılık Gereken Sistemler', en: 'Ultra-High Concurrency & In-Memory Grids' },
    path: '/space-based'
  },
  {
    name: 'Peer-to-Peer (P2P)',
    size: { tr: 'Değişken', en: 'Decentralized' },
    sizeValue: 2,
    speed: 3,
    kiss: 2,
    dry: 3,
    maintAndTest: 2,
    flex: 3,
    aiLocality: 2,
    color: '#10b981',
    bestFor: { tr: 'Merkeziyetsiz Ağlar ve Dosya Paylaşımı', en: 'Decentralized Networks & Mesh Comms' },
    path: '/p2p'
  },
  {
    name: 'SOA',
    size: { tr: 'Büyük (Large)', en: 'Legacy Enterprise' },
    sizeValue: 3,
    speed: 2,
    kiss: 2,
    dry: 4,
    maintAndTest: 3,
    flex: 2,
    aiLocality: 2,
    color: '#3b82f6',
    bestFor: { tr: 'Kurumsal Entegrasyon ve Servis Yönetimi', en: 'Enterprise Service Bus & Integrations' },
    path: '/soa'
  },
  {
    name: 'n-Tier (Horizontal)',
    size: { tr: 'Her boyuta uygun', en: 'Standard' },
    sizeValue: 2,
    speed: 4,
    kiss: 4,
    dry: 4,
    maintAndTest: 3,
    flex: 3,
    aiLocality: 2,
    color: '#3b82f6',
    bestFor: { tr: 'Klasik Katmanlı Uygulamalar', en: 'Traditional Layered Applications' },
    path: '/horizontal'
  },
  {
    name: 'Broker (Kafka Style)',
    size: { tr: 'Devasa', en: 'High-Throughput' },
    sizeValue: 4,
    speed: 2,
    kiss: 2,
    dry: 4,
    maintAndTest: 4,
    flex: 4,
    aiLocality: 2,
    color: '#fda4af',
    bestFor: { tr: 'Servisler Arası Mesajlaşma Hattı', en: 'High-Throughput Streaming Backbone' },
    path: '/broker'
  },
  {
    name: 'Publish-Subscribe',
    size: { tr: 'Orta/Büyük', en: 'Medium/Large' },
    sizeValue: 2.5,
    speed: 4,
    kiss: 4,
    dry: 4,
    maintAndTest: 4,
    flex: 4,
    aiLocality: 3,
    color: '#fb923c',
    bestFor: { tr: 'Gevşek Bağlı Bildirim Sistemleri', en: 'Decoupled Notification Pipelines' },
    path: '/pub-sub'
  },
  {
    name: 'Pipe-Filter',
    size: { tr: 'Orta', en: 'Medium' },
    sizeValue: 2,
    speed: 3,
    kiss: 4,
    dry: 4,
    maintAndTest: 5,
    flex: 5,
    aiLocality: 4,
    color: '#8b5cf6',
    bestFor: { tr: 'Veri İşleme ve Dönüştürme Hatları', en: 'ETL, Compilers & Stream Processing' },
    path: '/pipe-filter'
  },
  {
    name: 'Micro-frontends',
    size: { tr: 'Çok Büyük', en: 'Multi-Team Enterprise' },
    sizeValue: 4,
    speed: 3,
    kiss: 1,
    dry: 2,
    maintAndTest: 3,
    flex: 5,
    aiLocality: 2,
    color: '#6366f1',
    bestFor: { tr: 'Çoklu Ekip Gerektiren Devasa Frontend Projeleri', en: 'Autonomous Multi-Team Frontend Apps' },
    path: '/glossary?search=Micro'
  },
  {
    name: 'MVC (Classic)',
    size: { tr: 'Küçük (Small)', en: 'Small' },
    sizeValue: 1,
    speed: 5,
    kiss: 5,
    dry: 4,
    maintAndTest: 3,
    flex: 3,
    aiLocality: 3,
    color: '#ec4899',
    bestFor: { tr: 'Basit Web Siteleri ve Prototipler', en: 'Rapid Prototypes & Monolithic Web' },
    path: '/mvc'
  },
  {
    name: 'MVP (Presenter)',
    size: { tr: 'Orta (Medium)', en: 'Medium' },
    sizeValue: 2,
    speed: 3,
    kiss: 3,
    dry: 4,
    maintAndTest: 5,
    flex: 4,
    aiLocality: 2,
    color: '#db2777',
    bestFor: { tr: 'Test Odaklı Legacy Desktop/Android', en: 'Test-Driven Legacy Android/Desktop' },
    path: '/mvp'
  },
  {
    name: 'MVVM (Reactive)',
    size: { tr: 'Orta/Büyük', en: 'Medium/Large' },
    sizeValue: 2.5,
    speed: 4,
    kiss: 3,
    dry: 4,
    maintAndTest: 5,
    flex: 5,
    aiLocality: 4,
    color: '#be185d',
    bestFor: { tr: 'Modern Reaktif UI (React, Flutter)', en: 'Modern Two-Way & Reactive UI (Flutter, React)' },
    path: '/mvvm'
  },
  {
    name: 'ECS (Game Dev)',
    size: { tr: 'Her boyuta uygun', en: 'Game/Simulations' },
    sizeValue: 2,
    speed: 1,
    kiss: 1,
    dry: 3,
    maintAndTest: 4,
    flex: 4,
    aiLocality: 2,
    color: '#10b981',
    bestFor: { tr: 'Ekstrem Performans ve Oyun Geliştirme', en: 'High-Performance Gaming & Simulations' },
    path: '/ecs'
  },
  {
    name: 'Big Data (Lambda)',
    size: { tr: 'Devasa', en: 'Petabyte Scale' },
    sizeValue: 4,
    speed: 1,
    kiss: 1,
    dry: 3,
    maintAndTest: 3,
    flex: 2,
    aiLocality: 2,
    color: '#06b6d4',
    bestFor: { tr: 'Büyük Veri Analitiği ve İşleme', en: 'Batch + Real-Time Stream Analytics' },
    path: '/big-data'
  },
  {
    name: 'Choreography',
    size: { tr: 'Devasa', en: 'Decentralized Microservices' },
    sizeValue: 4,
    speed: 3,
    kiss: 1,
    dry: 2,
    maintAndTest: 3,
    flex: 5,
    aiLocality: 2,
    color: '#f472b6',
    bestFor: { tr: 'Merkezi Olmayan Servis Koordinasyonu', en: 'Decentralized Saga & Event Driven' },
    path: '/choreography'
  },
  {
    name: 'Orchestration',
    size: { tr: 'Büyük (Large)', en: 'Centralized Workflows' },
    sizeValue: 3,
    speed: 4,
    kiss: 2,
    dry: 4,
    maintAndTest: 4,
    flex: 4,
    aiLocality: 3,
    color: '#8b5cf6',
    bestFor: { tr: 'Merkezi İş Akışı ve Saga Yönetimi', en: 'Centralized Workflow & State Machine Sagas' },
    path: '/orchestration'
  },
  {
    name: 'Interpreter',
    size: { tr: 'Küçük', en: 'DSL / Rules' },
    sizeValue: 1,
    speed: 2,
    kiss: 2,
    dry: 5,
    maintAndTest: 5,
    flex: 5,
    aiLocality: 3,
    color: '#06b6d4',
    bestFor: { tr: 'Dinamik Kural Motorları ve DSL Tasarımı', en: 'Rule Engines, Compilers & DSL Parsing' },
    path: '/interpreter'
  },
  {
    name: 'Primary-Secondary',
    size: { tr: 'Orta', en: 'HA Databases' },
    sizeValue: 2,
    speed: 4,
    kiss: 3,
    dry: 4,
    maintAndTest: 4,
    flex: 2,
    aiLocality: 3,
    color: '#a78bfa',
    bestFor: { tr: 'Veritabanı Yüksek Erişilebilirlik Mimarisi', en: 'Read-Replica DB High Availability' },
    path: '/primary-secondary'
  },
  {
    name: 'Monolith',
    size: { tr: 'Küçük/Orta', en: 'Small/Medium' },
    sizeValue: 1.5,
    speed: 5,
    kiss: 5,
    dry: 3,
    maintAndTest: 3,
    flex: 3,
    aiLocality: 4,
    color: '#f43f5e',
    bestFor: { tr: 'Tek Kişilik Ekipler ve Hızlı MVP Projeleri', en: 'Solo Devs, Startups & Rapid MVPs' },
    path: '/system'
  },
  {
    name: 'VIPER (iOS)',
    size: { tr: 'Büyük (Large)', en: 'Strict iOS' },
    sizeValue: 3,
    speed: 1,
    kiss: 1,
    dry: 5,
    maintAndTest: 5,
    flex: 3,
    aiLocality: 1,
    color: '#ef4444',
    bestFor: { tr: 'Büyük Ölçekli iOS Uygulamaları', en: 'Strict Enterprise iOS Architecture' },
    path: '/viper'
  }
];
