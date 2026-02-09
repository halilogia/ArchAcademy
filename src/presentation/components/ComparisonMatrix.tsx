import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Check, X, Star, Zap, Gauge, Code2, Users, Sparkles, Layers, ChevronUp, ChevronDown, Shield, Microscope, Minimize2 } from 'lucide-react';

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
      learning: 2,
      maint: 5,
      test: 5,
      ai: 3,
      flex: 5,
      simplicity: 2,
      color: 'var(--primary)',
      bestFor: 'Karmaşık Kurumsal Sistemler',
      path: '/clean-arch'
    },
    {
      name: 'Vertical Slice',
      size: 'Küçük/Orta',
      sizeValue: 2,
      speed: 5,
      learning: 4,
      maint: 4,
      test: 4,
      ai: 5,
      flex: 5,
      simplicity: 4,
      color: '#f97316',
      bestFor: 'Hızlı Özellik Geliştirme (Feature-First)',
      path: '/vertical'
    },
    {
      name: 'DDD (Methodology)',
      size: 'Büyük (Large)',
      sizeValue: 3,
      speed: 1,
      learning: 1,
      maint: 5,
      test: 4,
      ai: 4,
      flex: 4,
      simplicity: 1,
      color: '#a78bfa',
      bestFor: 'Karmaşık İş Mantığına Sahip Domainler',
      path: '/ddd'
    },
    {
      name: 'Islands Architecture',
      size: 'Her boyuta uygun',
      sizeValue: 2,
      speed: 5,
      learning: 3,
      maint: 4,
      test: 3,
      ai: 4,
      flex: 5,
      simplicity: 3,
      color: '#f59e0b',
      bestFor: 'Yüksek Performanslı İçerik Odaklı Siteler',
      path: '/glossary?search=Islands'
    },
    {
      name: 'CQRS (Pattern)',
      size: 'Orta/Büyük',
      sizeValue: 2.5,
      speed: 2,
      learning: 2,
      maint: 4,
      test: 5,
      ai: 4,
      flex: 3,
      simplicity: 2,
      color: '#eab308',
      bestFor: 'Yüksek Okuma/Yazma Trafikli Sistemler',
      path: '/cqrs'
    },
    {
      name: 'SOLID Principles',
      size: 'Tüm projeler',
      sizeValue: 1,
      speed: 3,
      learning: 3,
      maint: 5,
      test: 5,
      ai: 5,
      flex: 5,
      simplicity: 3,
      color: '#6366f1',
      bestFor: 'Temel Kod Kalitesi ve Sürdürülebilirlik',
      path: '/solid'
    },
    {
      name: 'Hexagonal',
      size: 'Orta/Büyük',
      sizeValue: 2.5,
      speed: 3,
      learning: 2,
      maint: 5,
      test: 5,
      ai: 4,
      flex: 5,
      simplicity: 2,
      color: '#10b981',
      bestFor: 'Teknoloji Bağımsız Uygulamalar',
      path: '/hexagonal'
    },
    {
      name: 'Onion Architecture',
      size: 'Orta/Büyük',
      sizeValue: 2.5,
      speed: 3,
      learning: 2,
      maint: 5,
      test: 5,
      ai: 4,
      flex: 5,
      simplicity: 2,
      color: '#f43f5e',
      bestFor: 'Domain Odaklı Uygulamalar',
      path: '/onion'
    },
    {
      name: 'FSD (Frontend)',
      size: 'Orta/Büyük',
      sizeValue: 2.5,
      speed: 3,
      learning: 2,
      maint: 4,
      test: 3,
      ai: 4,
      flex: 4,
      simplicity: 2,
      color: '#06b6d4',
      bestFor: 'Karmaşık React/Next.js Projeleri',
      path: '/fsd'
    },
    {
      name: 'Event-Driven (EDA)',
      size: 'Çok Büyük',
      sizeValue: 4,
      speed: 2,
      learning: 1,
      maint: 4,
      test: 3,
      ai: 3,
      flex: 5,
      simplicity: 1,
      color: '#a855f7',
      bestFor: 'Dağıtık Mikroservis Sistemleri',
      path: '/eda'
    },
    {
      name: 'Microkernel',
      size: 'Küçük/Orta',
      sizeValue: 2,
      speed: 4,
      learning: 3,
      maint: 4,
      test: 4,
      ai: 3,
      flex: 5,
      simplicity: 3,
      color: '#3b82f6',
      bestFor: 'Eklenti Tabanlı Uygulamalar (IDE, OS)',
      path: '/microkernel'
    },
    {
      name: 'Serverless (FaaS)',
      size: 'Değişken',
      sizeValue: 2,
      speed: 5,
      learning: 4,
      maint: 3,
      test: 2,
      ai: 4,
      flex: 4,
      simplicity: 4,
      color: '#ec4899',
      bestFor: 'Olay Tetiklemeli İş Mantığı ve Ölçeklenme',
      path: '/serverless'
    },
    {
      name: 'Event Sourcing',
      size: 'Orta/Büyük',
      sizeValue: 2.5,
      speed: 1,
      learning: 1,
      maint: 4,
      test: 5,
      ai: 5,
      flex: 2,
      simplicity: 1,
      color: '#6366f1',
      bestFor: 'Denetim Odaklı Finansal Uygulamalar',
      path: '/event-sourcing'
    },
    {
      name: 'Space-Based',
      size: 'Devasa',
      sizeValue: 4,
      speed: 2,
      learning: 1,
      maint: 3,
      test: 2,
      ai: 2,
      flex: 2,
      simplicity: 1,
      color: '#eab308',
      bestFor: 'Ultra Yüksek Eşzamanlılık Gereken Sitemler',
      path: '/space-based'
    },
    {
      name: 'Peer-to-Peer (P2P)',
      size: 'Değişken',
      sizeValue: 2,
      speed: 3,
      learning: 1,
      maint: 2,
      test: 2,
      ai: 2,
      flex: 3,
      simplicity: 2,
      color: '#10b981',
      bestFor: 'Merkeziyetsiz Ağlar ve Dosya Paylaşımı',
      path: '/p2p'
    },
    {
      name: 'SOA',
      size: 'Büyük (Large)',
      sizeValue: 3,
      speed: 2,
      learning: 2,
      maint: 3,
      test: 3,
      ai: 3,
      flex: 2,
      simplicity: 2,
      color: '#3b82f6',
      bestFor: 'Kurumsal Entegrasyon ve Servis Yönetimi',
      path: '/soa'
    },
    {
      name: 'n-Tier (Horizontal)',
      size: 'Her boyuta uygun',
      sizeValue: 2,
      speed: 4,
      learning: 5,
      maint: 2,
      test: 3,
      ai: 2,
      flex: 3,
      simplicity: 4,
      color: '#3b82f6',
      bestFor: 'Klasik Katmanlı Uygulamalar',
      path: '/horizontal'
    },
    {
      name: 'Broker (Kafka Style)',
      size: 'Devasa',
      sizeValue: 4,
      speed: 2,
      learning: 2,
      maint: 4,
      test: 3,
      ai: 3,
      flex: 4,
      simplicity: 2,
      color: '#fda4af',
      bestFor: 'Servisler Arası Mesajlaşma Hattı',
      path: '/broker'
    },
    {
      name: 'Publish-Subscribe',
      size: 'Orta/Büyük',
      sizeValue: 2.5,
      speed: 4,
      learning: 4,
      maint: 4,
      test: 3,
      ai: 3,
      flex: 4,
      simplicity: 4,
      color: '#fb923c',
      bestFor: 'Gevşek Bağlı Bildirim Sistemleri',
      path: '/pub-sub'
    },
    {
      name: 'Pipe-Filter',
      size: 'Orta',
      sizeValue: 2,
      speed: 3,
      learning: 4,
      maint: 4,
      test: 5,
      ai: 4,
      flex: 5,
      simplicity: 4,
      color: '#8b5cf6',
      bestFor: 'Veri İşleme ve Dönüştürme Hatları',
      path: '/pipe-filter'
    },
    {
      name: 'Micro-frontends',
      size: 'Çok Büyük',
      sizeValue: 4,
      speed: 3,
      learning: 1,
      maint: 3,
      test: 3,
      ai: 2,
      flex: 5,
      simplicity: 1,
      color: '#6366f1',
      bestFor: 'Çoklu Ekip Gerektiren Devasa Frontend Projeleri',
      path: '/glossary?search=Micro'
    },
    {
      name: 'MVC (Classic)',
      size: 'Küçük (Small)',
      sizeValue: 1,
      speed: 5,
      learning: 5,
      maint: 2,
      test: 2,
      ai: 2,
      flex: 3,
      simplicity: 5,
      color: '#ec4899',
      bestFor: 'Basit Web Siteleri ve Prototipler',
      path: '/mvc'
    },
    {
      name: 'MVP (Presenter)',
      size: 'Orta (Medium)',
      sizeValue: 2,
      speed: 3,
      learning: 3,
      maint: 4,
      test: 5,
      ai: 3,
      flex: 4,
      simplicity: 3,
      color: '#db2777',
      bestFor: 'Test Odaklı Legacy Desktop/Android',
      path: '/mvp'
    },
    {
      name: 'MVVM (Reactive)',
      size: 'Orta/Büyük',
      sizeValue: 2.5,
      speed: 4,
      learning: 2,
      maint: 5,
      test: 5,
      ai: 5,
      flex: 5,
      simplicity: 4,
      color: '#be185d',
      bestFor: 'Modern Reaktif UI (React, Flutter)',
      path: '/mvvm'
    },
    {
      name: 'ECS (Game Dev)',
      size: 'Her boyuta uygun',
      sizeValue: 2,
      speed: 1,
      learning: 1,
      maint: 4,
      test: 4,
      ai: 3,
      flex: 4,
      simplicity: 1,
      color: '#10b981',
      bestFor: 'Ekstrem Performans ve Oyun Geliştirme',
      path: '/ecs'
    },
    {
      name: 'Big Data (Lambda)',
      size: 'Devasa',
      sizeValue: 4,
      speed: 1,
      learning: 1,
      maint: 3,
      test: 2,
      ai: 3,
      flex: 2,
      simplicity: 1,
      color: '#06b6d4',
      bestFor: 'Büyük Veri Analitiği ve İşleme',
      path: '/big-data'
    },
    {
      name: 'Choreography',
      size: 'Devasa',
      sizeValue: 4,
      speed: 3,
      learning: 1,
      maint: 4,
      test: 2,
      ai: 2,
      flex: 5,
      simplicity: 1,
      color: '#f472b6',
      bestFor: 'Merkezi Olmayan Servis Koordinasyonu',
      path: '/choreography'
    },
    {
      name: 'Orchestration',
      size: 'Büyük (Large)',
      sizeValue: 3,
      speed: 4,
      learning: 3,
      maint: 3,
      test: 4,
      ai: 3,
      flex: 4,
      simplicity: 2,
      color: '#8b5cf6',
      bestFor: 'Merkezi İş Akışı ve Saga Yönetimi',
      path: '/orchestration'
    },
    {
      name: 'Interpreter',
      size: 'Küçük',
      sizeValue: 1,
      speed: 2,
      learning: 2,
      maint: 5,
      test: 5,
      ai: 5,
      flex: 5,
      simplicity: 2,
      color: '#06b6d4',
      bestFor: 'Dinamik Kural Motorları ve DSL Tasarımı',
      path: '/interpreter'
    },
    {
      name: 'Primary-Secondary',
      size: 'Orta',
      sizeValue: 2,
      speed: 4,
      learning: 4,
      maint: 3,
      test: 4,
      ai: 2,
      flex: 2,
      simplicity: 3,
      color: '#a78bfa',
      bestFor: 'Veritabanı Yüksek Erişilebilirlik Mimarisi',
      path: '/primary-secondary'
    },
    {
      name: 'Monolith',
      size: 'Küçük/Orta',
      sizeValue: 1.5,
      speed: 5,
      learning: 5,
      maint: 3,
      test: 3,
      ai: 5,
      flex: 3,
      simplicity: 5,
      color: '#f43f5e',
      bestFor: 'Tek Kişilik Ekipler ve Hızlı MVP Projeleri',
      path: '/system'
    },
    {
      name: 'VIPER (iOS)',
      size: 'Büyük (Large)',
      sizeValue: 3,
      speed: 1,
      learning: 1,
      maint: 5,
      test: 5,
      ai: 3,
      flex: 3,
      simplicity: 1,
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
      <div style={{ display: 'flex', gap: '2px' }}>
        {[...Array(5)].map((_, i) => (
          <Star 
            key={i} 
            size={12} 
            fill={i < count ? "currentColor" : "transparent"} 
            color={i < count ? "inherit" : "rgba(255,255,255,0.05)"} 
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
    <section style={{ padding: '100px 0' }}>
      <div className="container" style={{ maxWidth: '1600px', width: '95%' }}>
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           style={{ textAlign: 'center', marginBottom: '4rem' }}
        >
          <h2 className="gradient-text" style={{ fontSize: '3.5rem', fontWeight: 800 }}>THE MASTER MATRIX</h2>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '750px', margin: '1.5rem auto', lineHeight: 1.8 }}>
            Mimari stiller, disiplinler ve prensiplerin stratejik kıyaslaması. 
            Sıralamak için başlıkların üzerine tıklayın.
          </p>
        </motion.div>

        <div style={{ width: '100%', overflowX: 'auto', paddingBottom: '1rem' }}>
          <table style={{
            width: '100%',
            borderCollapse: 'separate',
            borderSpacing: '0 8px',
            minWidth: '1350px'
          }}>
            <thead>
              <tr style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                <th 
                  onClick={() => requestSort('name')}
                  style={{ textAlign: 'left', padding: '1rem 2rem', cursor: 'pointer', verticalAlign: 'middle' }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                     Arch / Style / Pattern {getSortIcon('name')}
                  </div>
                </th>
                <th 
                  onClick={() => requestSort('sizeValue')}
                  style={{ textAlign: 'center', padding: '1rem', cursor: 'pointer' }}
                >
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '5px' }}>
                    <Users size={18} /> 
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>Boyut {getSortIcon('sizeValue')}</div>
                  </div>
                </th>
                <th 
                  onClick={() => requestSort('simplicity')}
                  style={{ textAlign: 'center', padding: '1rem', cursor: 'pointer' }}
                >
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '5px' }}>
                    <Minimize2 size={18} /> 
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>Basitlik {getSortIcon('simplicity')}</div>
                  </div>
                </th>
                <th 
                  onClick={() => requestSort('speed')}
                  style={{ textAlign: 'center', padding: '1rem', cursor: 'pointer' }}
                >
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '5px' }}>
                    <Zap size={18} /> 
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>Hız {getSortIcon('speed')}</div>
                  </div>
                </th>
                <th 
                  onClick={() => requestSort('learning')}
                  style={{ textAlign: 'center', padding: '1rem', cursor: 'pointer' }}
                >
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '5px' }}>
                    <Gauge size={18} /> 
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>Öğrenme {getSortIcon('learning')}</div>
                  </div>
                </th>
                <th 
                  onClick={() => requestSort('flex')}
                  style={{ textAlign: 'center', padding: '1rem', cursor: 'pointer' }}
                >
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '5px' }}>
                    <Layers size={18} /> 
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>Esneklik {getSortIcon('flex')}</div>
                  </div>
                </th>
                <th 
                  onClick={() => requestSort('maint')}
                  style={{ textAlign: 'center', padding: '1rem', cursor: 'pointer' }}
                >
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '5px' }}>
                    <Check size={18} /> 
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>Bakım {getSortIcon('maint')}</div>
                  </div>
                </th>
                <th 
                  onClick={() => requestSort('test')}
                  style={{ textAlign: 'center', padding: '1rem', cursor: 'pointer' }}
                >
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '5px' }}>
                    <Code2 size={18} /> 
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>Test {getSortIcon('test')}</div>
                  </div>
                </th>
                <th 
                  onClick={() => requestSort('ai')}
                  style={{ textAlign: 'center', padding: '1rem', cursor: 'pointer' }}
                >
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '5px' }}>
                    <Sparkles size={18} /> 
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>AI Context {getSortIcon('ai')}</div>
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
                    <td style={{ textAlign: 'center', padding: '1.25rem', color: '#84cc16' }}>{renderStars(row.simplicity)}</td>
                    <td style={{ textAlign: 'center', padding: '1.25rem', color: '#f59e0b' }}>{renderStars(row.speed)}</td>
                    <td style={{ textAlign: 'center', padding: '1.25rem', color: '#3b82f6' }}>{renderStars(row.learning)}</td>
                    <td style={{ textAlign: 'center', padding: '1.25rem', color: '#10b981' }}>{renderStars(row.flex)}</td>
                    <td style={{ textAlign: 'center', padding: '1.25rem', color: '#10b981' }}>{renderStars(row.maint)}</td>
                    <td style={{ textAlign: 'center', padding: '1.25rem', color: '#a855f7' }}>{renderStars(row.test)}</td>
                    <td style={{ textAlign: 'center', padding: '1.25rem', borderRadius: '0 16px 16px 0', color: '#6366f1' }}>{renderStars(row.ai)}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        <div style={{ marginTop: '5rem', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem' }}>
          <div className="glass-card" style={{ textAlign: 'center' }}>
            <h4 style={{ marginBottom: '1rem', color: '#f59e0b' }}>Yüksek Hız (Speed)</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Vertical Slice ve Monolith, hızlı MVP çıkarmak için en idealidir.</p>
          </div>
          <div className="glass-card" style={{ textAlign: 'center' }}>
            <h4 style={{ marginBottom: '1rem', color: '#10b981' }}>Yüksek Esneklik (Flexibility)</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Microkernel ve Pipe-Filter, değişken sistem gereksinimleri için en iyisidir.</p>
          </div>
          <div className="glass-card" style={{ textAlign: 'center' }}>
            <h4 style={{ marginBottom: '1rem', color: '#6366f1' }}>AI Destekli Geliştirme</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Yüksek "AI Context" puanlı mimariler, Cursor/ChatGPT gibi araçlarla mükemmel uyum sağlar.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ComparisonMatrix;
