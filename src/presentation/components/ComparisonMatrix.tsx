import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Star, Zap, Users, Layers, ChevronUp, ChevronDown, Minimize2, Repeat, ShieldCheck, FolderTree } from 'lucide-react';

type SortConfig = {
  key: string;
  direction: 'ascending' | 'descending';
};

const ComparisonMatrix = () => {
  const navigate = useNavigate();
  const [sortConfig, setSortConfig] = useState<SortConfig | null>({ key: 'speed', direction: 'descending' });

  const initialData = [
    {
      name: 'Clean Architecture',
      size: 'Büyük (Large)',
      sizeValue: 3,
      speed: 2,
      kiss: 2,
      dry: 5,
      maintAndTest: 5,
      flex: 5,
      aiLocality: 2,
      color: 'var(--primary)',
      bestFor: 'Karmaşık Kurumsal Sistemler',
      path: '/clean-arch'
    },
    {
      name: 'Vertical Slice',
      size: 'Küçük/Orta',
      sizeValue: 2,
      speed: 5,
      kiss: 4,
      dry: 2,
      maintAndTest: 4,
      flex: 5,
      aiLocality: 5,
      color: '#f97316',
      bestFor: 'Hızlı Özellik Geliştirme (Feature-First & AI)',
      path: '/vertical'
    },
    {
      name: 'DDD (Methodology)',
      size: 'Büyük (Large)',
      sizeValue: 3,
      speed: 1,
      kiss: 1,
      dry: 5,
      maintAndTest: 5,
      flex: 4,
      aiLocality: 1,
      color: '#a78bfa',
      bestFor: 'Karmaşık İş Mantığına Sahip Domainler',
      path: '/ddd'
    },
    {
      name: 'Islands Architecture',
      size: 'Her boyuta uygun',
      sizeValue: 2,
      speed: 5,
      kiss: 3,
      dry: 3,
      maintAndTest: 4,
      flex: 5,
      aiLocality: 4,
      color: '#f59e0b',
      bestFor: 'Yüksek Performanslı İçerik Odaklı Siteler',
      path: '/glossary?search=Islands'
    },
    {
      name: 'CQRS (Pattern)',
      size: 'Orta/Büyük',
      sizeValue: 2.5,
      speed: 2,
      kiss: 2,
      dry: 4,
      maintAndTest: 5,
      flex: 3,
      aiLocality: 1,
      color: '#eab308',
      bestFor: 'Yüksek Okuma/Yazma Trafikli Sistemler',
      path: '/cqrs'
    },
    {
      name: 'SOLID Principles',
      size: 'Tüm projeler',
      sizeValue: 1,
      speed: 3,
      kiss: 3,
      dry: 5,
      maintAndTest: 5,
      flex: 5,
      aiLocality: 4,
      color: '#6366f1',
      bestFor: 'Temel Kod Kalitesi ve Sürdürülebilirlik',
      path: '/solid'
    },
    {
      name: 'Hexagonal',
      size: 'Orta/Büyük',
      sizeValue: 2.5,
      speed: 3,
      kiss: 2,
      dry: 5,
      maintAndTest: 5,
      flex: 5,
      aiLocality: 2,
      color: '#10b981',
      bestFor: 'Teknoloji Bağımsız Uygulamalar',
      path: '/hexagonal'
    },
    {
      name: 'Onion Architecture',
      size: 'Orta/Büyük',
      sizeValue: 2.5,
      speed: 3,
      kiss: 2,
      dry: 5,
      maintAndTest: 5,
      flex: 5,
      aiLocality: 2,
      color: '#f43f5e',
      bestFor: 'Domain Odaklı Uygulamalar',
      path: '/onion'
    },
    {
      name: 'FSD (Frontend)',
      size: 'Orta/Büyük',
      sizeValue: 2.5,
      speed: 3,
      kiss: 2,
      dry: 4,
      maintAndTest: 4,
      flex: 4,
      aiLocality: 4,
      color: '#06b6d4',
      bestFor: 'Karmaşık React/Next.js Projeleri',
      path: '/fsd'
    },
    {
      name: 'Event-Driven (EDA)',
      size: 'Çok Büyük',
      sizeValue: 4,
      speed: 2,
      kiss: 1,
      dry: 3,
      maintAndTest: 4,
      flex: 5,
      aiLocality: 2,
      color: '#a855f7',
      bestFor: 'Dağıtık Mikroservis Sistemleri',
      path: '/eda'
    },
    {
      name: 'Microkernel',
      size: 'Küçük/Orta',
      sizeValue: 2,
      speed: 4,
      kiss: 3,
      dry: 4,
      maintAndTest: 4,
      flex: 5,
      aiLocality: 4,
      color: '#3b82f6',
      bestFor: 'Eklenti Tabanlı Uygulamalar (IDE, OS)',
      path: '/microkernel'
    },
    {
      name: 'Serverless (FaaS)',
      size: 'Değişken',
      sizeValue: 2,
      speed: 5,
      kiss: 4,
      dry: 2,
      maintAndTest: 3,
      flex: 4,
      aiLocality: 4,
      color: '#ec4899',
      bestFor: 'Olay Tetiklemeli İş Mantığı ve Ölçeklenme',
      path: '/serverless'
    },
    {
      name: 'Event Sourcing',
      size: 'Orta/Büyük',
      sizeValue: 2.5,
      speed: 1,
      kiss: 1,
      dry: 4,
      maintAndTest: 5,
      flex: 2,
      aiLocality: 1,
      color: '#6366f1',
      bestFor: 'Denetim Odaklı Finansal Uygulamalar',
      path: '/event-sourcing'
    },
    {
      name: 'Space-Based',
      size: 'Devasa',
      sizeValue: 4,
      speed: 2,
      kiss: 1,
      dry: 3,
      maintAndTest: 3,
      flex: 2,
      aiLocality: 1,
      color: '#eab308',
      bestFor: 'Ultra Yüksek Eşzamanlılık Gereken Sistemler',
      path: '/space-based'
    },
    {
      name: 'Peer-to-Peer (P2P)',
      size: 'Değişken',
      sizeValue: 2,
      speed: 3,
      kiss: 2,
      dry: 3,
      maintAndTest: 2,
      flex: 3,
      aiLocality: 2,
      color: '#10b981',
      bestFor: 'Merkeziyetsiz Ağlar ve Dosya Paylaşımı',
      path: '/p2p'
    },
    {
      name: 'SOA',
      size: 'Büyük (Large)',
      sizeValue: 3,
      speed: 2,
      kiss: 2,
      dry: 4,
      maintAndTest: 3,
      flex: 2,
      aiLocality: 2,
      color: '#3b82f6',
      bestFor: 'Kurumsal Entegrasyon ve Servis Yönetimi',
      path: '/soa'
    },
    {
      name: 'n-Tier (Horizontal)',
      size: 'Her boyuta uygun',
      sizeValue: 2,
      speed: 4,
      kiss: 4,
      dry: 4,
      maintAndTest: 3,
      flex: 3,
      aiLocality: 2,
      color: '#3b82f6',
      bestFor: 'Klasik Katmanlı Uygulamalar',
      path: '/horizontal'
    },
    {
      name: 'Broker (Kafka Style)',
      size: 'Devasa',
      sizeValue: 4,
      speed: 2,
      kiss: 2,
      dry: 4,
      maintAndTest: 4,
      flex: 4,
      aiLocality: 2,
      color: '#fda4af',
      bestFor: 'Servisler Arası Mesajlaşma Hattı',
      path: '/broker'
    },
    {
      name: 'Publish-Subscribe',
      size: 'Orta/Büyük',
      sizeValue: 2.5,
      speed: 4,
      kiss: 4,
      dry: 4,
      maintAndTest: 4,
      flex: 4,
      aiLocality: 3,
      color: '#fb923c',
      bestFor: 'Gevşek Bağlı Bildirim Sistemleri',
      path: '/pub-sub'
    },
    {
      name: 'Pipe-Filter',
      size: 'Orta',
      sizeValue: 2,
      speed: 3,
      kiss: 4,
      dry: 4,
      maintAndTest: 5,
      flex: 5,
      aiLocality: 4,
      color: '#8b5cf6',
      bestFor: 'Veri İşleme ve Dönüştürme Hatları',
      path: '/pipe-filter'
    },
    {
      name: 'Micro-frontends',
      size: 'Çok Büyük',
      sizeValue: 4,
      speed: 3,
      kiss: 1,
      dry: 2,
      maintAndTest: 3,
      flex: 5,
      aiLocality: 2,
      color: '#6366f1',
      bestFor: 'Çoklu Ekip Gerektiren Devasa Frontend Projeleri',
      path: '/glossary?search=Micro'
    },
    {
      name: 'MVC (Classic)',
      size: 'Küçük (Small)',
      sizeValue: 1,
      speed: 5,
      kiss: 5,
      dry: 4,
      maintAndTest: 3,
      flex: 3,
      aiLocality: 3,
      color: '#ec4899',
      bestFor: 'Basit Web Siteleri ve Prototipler',
      path: '/mvc'
    },
    {
      name: 'MVP (Presenter)',
      size: 'Orta (Medium)',
      sizeValue: 2,
      speed: 3,
      kiss: 3,
      dry: 4,
      maintAndTest: 5,
      flex: 4,
      aiLocality: 2,
      color: '#db2777',
      bestFor: 'Test Odaklı Legacy Desktop/Android',
      path: '/mvp'
    },
    {
      name: 'MVVM (Reactive)',
      size: 'Orta/Büyük',
      sizeValue: 2.5,
      speed: 4,
      kiss: 3,
      dry: 4,
      maintAndTest: 5,
      flex: 5,
      aiLocality: 4,
      color: '#be185d',
      bestFor: 'Modern Reaktif UI (React, Flutter)',
      path: '/mvvm'
    },
    {
      name: 'ECS (Game Dev)',
      size: 'Her boyuta uygun',
      sizeValue: 2,
      speed: 1,
      kiss: 1,
      dry: 3,
      maintAndTest: 4,
      flex: 4,
      aiLocality: 2,
      color: '#10b981',
      bestFor: 'Ekstrem Performans ve Oyun Geliştirme',
      path: '/ecs'
    },
    {
      name: 'Big Data (Lambda)',
      size: 'Devasa',
      sizeValue: 4,
      speed: 1,
      kiss: 1,
      dry: 3,
      maintAndTest: 3,
      flex: 2,
      aiLocality: 2,
      color: '#06b6d4',
      bestFor: 'Büyük Veri Analitiği ve İşleme',
      path: '/big-data'
    },
    {
      name: 'Choreography',
      size: 'Devasa',
      sizeValue: 4,
      speed: 3,
      kiss: 1,
      dry: 2,
      maintAndTest: 3,
      flex: 5,
      aiLocality: 2,
      color: '#f472b6',
      bestFor: 'Merkezi Olmayan Servis Koordinasyonu',
      path: '/choreography'
    },
    {
      name: 'Orchestration',
      size: 'Büyük (Large)',
      sizeValue: 3,
      speed: 4,
      kiss: 2,
      dry: 4,
      maintAndTest: 4,
      flex: 4,
      aiLocality: 3,
      color: '#8b5cf6',
      bestFor: 'Merkezi İş Akışı ve Saga Yönetimi',
      path: '/orchestration'
    },
    {
      name: 'Interpreter',
      size: 'Küçük',
      sizeValue: 1,
      speed: 2,
      kiss: 2,
      dry: 5,
      maintAndTest: 5,
      flex: 5,
      aiLocality: 3,
      color: '#06b6d4',
      bestFor: 'Dinamik Kural Motorları ve DSL Tasarımı',
      path: '/interpreter'
    },
    {
      name: 'Primary-Secondary',
      size: 'Orta',
      sizeValue: 2,
      speed: 4,
      kiss: 3,
      dry: 4,
      maintAndTest: 4,
      flex: 2,
      aiLocality: 3,
      color: '#a78bfa',
      bestFor: 'Veritabanı Yüksek Erişilebilirlik Mimarisi',
      path: '/primary-secondary'
    },
    {
      name: 'Monolith',
      size: 'Küçük/Orta',
      sizeValue: 1.5,
      speed: 5,
      kiss: 5,
      dry: 3,
      maintAndTest: 3,
      flex: 3,
      aiLocality: 4,
      color: '#f43f5e',
      bestFor: 'Tek Kişilik Ekipler ve Hızlı MVP Projeleri',
      path: '/system'
    },
    {
      name: 'VIPER (iOS)',
      size: 'Büyük (Large)',
      sizeValue: 3,
      speed: 1,
      kiss: 1,
      dry: 5,
      maintAndTest: 5,
      flex: 3,
      aiLocality: 1,
      color: '#ef4444',
      bestFor: 'Büyük Ölçekli iOS Uygulamaları',
      path: '/viper'
    }
  ];

  const sortedData = useMemo(() => {
    let sortableData = [...initialData];
    if (sortConfig !== null) {
      sortableData.sort((a: any, b: any) => {
        const aValue = a[sortConfig.key];
        const bValue = b[sortConfig.key];
        
        if (aValue < bValue) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableData;
  }, [initialData, sortConfig]);

  const requestSort = (key: string) => {
    let direction: 'ascending' | 'descending' = 'descending';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'descending') {
      direction = 'ascending';
    }
    setSortConfig({ key, direction });
  };

  const renderStars = (count: number) => {
    return (
      <div style={{ display: 'flex', gap: '2px', justifyContent: 'center' }}>
        {[...Array(5)].map((_, i) => (
          <Star 
            key={i} 
            size={12} 
            fill={i < count ? "currentColor" : "transparent"} 
            color={i < count ? "inherit" : "rgba(255,255,255,0.08)"} 
          />
        ))}
      </div>
    );
  };

  const getSortIcon = (key: string) => {
    if (sortConfig?.key !== key) return <div style={{ width: 14 }} />;
    return sortConfig.direction === 'ascending' ? <ChevronUp size={14} /> : <ChevronDown size={14} />;
  };

  return (
    <section style={{ padding: '80px 0' }}>
      <div className="container" style={{ maxWidth: '1600px', width: '95%' }}>
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           style={{ textAlign: 'center', marginBottom: '3.5rem' }}
        >
          <h2 className="gradient-text" style={{ fontSize: '3.5rem', fontWeight: 800 }}>THE MASTER MATRIX</h2>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '750px', margin: '1.5rem auto', lineHeight: 1.8 }}>
            Temel mimari stiller ve disiplinlerin 7 stratejik boyutta kıyaslaması. 
            Sıralamak için sütun başlıklarına tıklayın.
          </p>
        </motion.div>

        <div style={{ width: '100%', overflowX: 'auto', paddingBottom: '1rem' }}>
          <table style={{
            width: '100%',
            borderCollapse: 'separate',
            borderSpacing: '0 8px',
            minWidth: '1200px'
          }}>
            <thead>
              <tr style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                <th 
                  onClick={() => requestSort('name')}
                  style={{ textAlign: 'left', padding: '1rem 2rem', cursor: 'pointer', verticalAlign: 'middle', width: '28%' }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                     Arch / Style / Pattern {getSortIcon('name')}
                  </div>
                </th>
                <th 
                  onClick={() => requestSort('sizeValue')}
                  style={{ textAlign: 'center', padding: '1rem', cursor: 'pointer', width: '12%' }}
                  title="Ekip ve Proje Ölçeği"
                >
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '5px' }}>
                    <Users size={18} /> 
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>Boyut {getSortIcon('sizeValue')}</div>
                  </div>
                </th>
                <th 
                  onClick={() => requestSort('speed')}
                  style={{ textAlign: 'center', padding: '1rem', cursor: 'pointer', width: '10%' }}
                  title="Velocity / Hızlı Teslimat & Time-to-Market"
                >
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '5px' }}>
                    <Zap size={18} /> 
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>Velocity {getSortIcon('speed')}</div>
                  </div>
                </th>
                <th 
                  onClick={() => requestSort('kiss')}
                  style={{ textAlign: 'center', padding: '1rem', cursor: 'pointer', width: '10%' }}
                  title="KISS: Keep It Simple, Stupid (Sadelik & Düşük Öğrenme Eğrisi)"
                >
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '5px' }}>
                    <Minimize2 size={18} /> 
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>KISS {getSortIcon('kiss')}</div>
                  </div>
                </th>
                <th 
                  onClick={() => requestSort('dry')}
                  style={{ textAlign: 'center', padding: '1rem', cursor: 'pointer', width: '10%' }}
                  title="DRY Disiplini (5★ = Sıfır Kod Tekrarı, 1★ = WET/AHA Bağımsızlık)"
                >
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '5px' }}>
                    <Repeat size={18} /> 
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>DRY {getSortIcon('dry')}</div>
                  </div>
                </th>
                <th 
                  onClick={() => requestSort('flex')}
                  style={{ textAlign: 'center', padding: '1rem', cursor: 'pointer', width: '10%' }}
                  title="Flexibility & Modularity (Değişime ve Eklentilere Açıklık)"
                >
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '5px' }}>
                    <Layers size={18} /> 
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>Flexibility {getSortIcon('flex')}</div>
                  </div>
                </th>
                <th 
                  onClick={() => requestSort('maintAndTest')}
                  style={{ textAlign: 'center', padding: '1rem', cursor: 'pointer', width: '10%' }}
                  title="Bakım ve Test Edilebilirlik Gücü"
                >
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '5px' }}>
                    <ShieldCheck size={18} /> 
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>Bakım & Test {getSortIcon('maintAndTest')}</div>
                  </div>
                </th>
                <th 
                  onClick={() => requestSort('aiLocality')}
                  style={{ textAlign: 'center', padding: '1rem', cursor: 'pointer', width: '10%' }}
                  title="AI Locality (Vibe): Minimum klasör atlama ve yüksek özellik bütünlüğü"
                >
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '5px' }}>
                    <FolderTree size={18} /> 
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>Locality (Vibe) {getSortIcon('aiLocality')}</div>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
                {sortedData.map((row) => (
                  <tr
                    key={row.name}
                    onClick={() => navigate(row.path)}
                    style={{
                      background: 'var(--glass)',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                      cursor: 'pointer',
                      transition: 'background 0.2s, transform 0.2s',
                    }}
                    className="matrix-row"
                  >
                    <td style={{ 
                      padding: '1.25rem 2rem', 
                      borderRadius: '16px 0 0 16px',
                      borderLeft: `4px solid ${row.color}`
                    }}>
                      <div style={{ fontWeight: 700, marginBottom: '4px' }}>{row.name}</div>
                      <div style={{ fontSize: '0.7rem', color: row.color, fontWeight: 600 }}>BEST FOR: {row.bestFor}</div>
                    </td>
                    <td style={{ textAlign: 'center', padding: '1.25rem', fontSize: '0.8rem' }}>{row.size}</td>
                    <td style={{ textAlign: 'center', padding: '1.25rem', color: '#f59e0b' }}>{renderStars(row.speed)}</td>
                    <td style={{ textAlign: 'center', padding: '1.25rem', color: '#84cc16' }}>{renderStars(row.kiss)}</td>
                    <td style={{ textAlign: 'center', padding: '1.25rem', color: '#6366f1' }}>{renderStars(row.dry)}</td>
                    <td style={{ textAlign: 'center', padding: '1.25rem', color: '#10b981' }}>{renderStars(row.flex)}</td>
                    <td style={{ textAlign: 'center', padding: '1.25rem', color: '#06b6d4' }}>{renderStars(row.maintAndTest)}</td>
                    <td style={{ textAlign: 'center', padding: '1.25rem', borderRadius: '0 16px 16px 0', color: '#f97316' }}>{renderStars(row.aiLocality)}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        <div style={{ marginTop: '4rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem' }}>
          <div className="glass-card" style={{ textAlign: 'center', border: '1px solid rgba(249, 115, 22, 0.3)' }}>
            <h4 style={{ marginBottom: '0.75rem', color: '#f97316' }}>📁 Locality (Vibe Coding)</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>AI'ın tek klasörde çalışabilme yeteneği. Vertical Slice ve Monolith, prompt context'ini bölmeden maksimum verim sunar.</p>
          </div>
          <div className="glass-card" style={{ textAlign: 'center', border: '1px solid rgba(99, 102, 241, 0.3)' }}>
            <h4 style={{ marginBottom: '0.75rem', color: '#6366f1' }}>🔄 DRY vs WET / AHA</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Katı DRY mimarileri (Clean/DDD) sıfır kod tekrarı isterken, VSA gibi yapılar bağımsızlık için kontrollü tekrarı (WET/AHA) savunur.</p>
          </div>
          <div className="glass-card" style={{ textAlign: 'center', border: '1px solid rgba(132, 204, 22, 0.3)' }}>
            <h4 style={{ marginBottom: '0.75rem', color: '#84cc16' }}>🧘 KISS (Keep It Simple, Stupid)</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Gereksiz katman ve soyutlamadan kaçınma. Basit tasarlanan mimariler en az bilişsel yük (cognitive load) üretir.</p>
          </div>
          <div className="glass-card" style={{ textAlign: 'center', border: '1px solid rgba(6, 182, 212, 0.3)' }}>
            <h4 style={{ marginBottom: '0.75rem', color: '#06b6d4' }}>🛡️ Bakım & Test Güvencesi</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Hexagonal, Clean ve Onion mimarileri bağımlılık izolasyonu ile maksimum test kapsamı ve uzun ömür sağlar.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ComparisonMatrix;
