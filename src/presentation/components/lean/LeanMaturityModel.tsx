import React from 'react';
import { Zap, GitMerge, CheckSquare, ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const LeanMaturityModel: React.FC = () => {
  const { i18n } = useTranslation();
  const isEn = (i18n.resolvedLanguage || i18n.language || 'tr').startsWith('en');

  const levels = [
    { 
      level: 'Level 1: MVP / Startup', 
      title: isEn ? 'Aggressive Simplicity' : 'Agresif Yalınlık', 
      icon: <Zap />, 
      p: isEn 
        ? 'Zero folder nesting, single centralized service, maximum turnaround velocity. Eliminate anything not generating immediate validated learning.' 
        : 'Sıfır klasör derinliği, merkezi tek servis, maksimum reaksiyon hızı. Değer üretmeyen her şeyi reddedin.' 
    },
    { 
      level: 'Level 2: Growing App', 
      title: isEn ? 'Vertical Slicing' : 'Dikey Bölümleme', 
      icon: <GitMerge />, 
      p: isEn 
        ? 'Transition to autonomous Vertical Slices. Features remain lean while boundary contracts keep global coupling under control.' 
        : 'Vertical Slice\'lara geçiş. Her feature kendi içinde yalın kalır ama global bağımlılıklar kontrol altına alınır.' 
    },
    { 
      level: 'Level 3: Enterprise', 
      title: isEn ? 'Modular Clean' : 'Modüler Clean', 
      icon: <CheckSquare />, 
      p: isEn 
        ? 'Scale with independent domain packages (Micro-Packages) without abandoning Lean minimalism. Velocity remains priority one.' 
        : 'Lean prensiplerinden vazgeçmeden, bağımsız paketlere (Micro-Packages) bölünme. Hız hala birinci önceliktir.' 
    }
  ];

  const comparisonRows = [
    { 
      k: isEn ? 'Value Per File' : 'Dosya Başına Değer', 
      h: isEn ? 'Low (High boilerplate)' : 'Düşük (Boilerplate çok)', 
      l: isEn ? 'High (Pure business logic)' : 'Yüksek (Sadece Logic)' 
    },
    { 
      k: isEn ? 'Decision Velocity' : 'Karar Alma Hızı', 
      h: isEn ? 'Slow (Premature analysis)' : 'Yavaş (Ön analiz şart)', 
      l: isEn ? 'Fast (Just-in-Time Decisions)' : 'Çok Hızlı (JIT Decisions)' 
    },
    { 
      k: isEn ? 'Learning Curve' : 'Öğrenme Eğrisi', 
      h: isEn ? 'Steep (Dozens of rules)' : 'Dik (Onlarca kural)', 
      l: isEn ? 'Smooth (Intuitive principles)' : 'Hızlı (Mantıklı prensipler)' 
    },
    { 
      k: isEn ? 'Refactoring Friction' : 'Refactoring Zorluğu', 
      h: isEn ? 'High (Cascading changes)' : 'Yüksek (Zincirleme değişim)', 
      l: isEn ? 'Low (Isolated slices)' : 'Düşük (İzole dilimler)' 
    },
    { 
      k: isEn ? 'Maintenance Cost' : 'Maliyet', 
      h: isEn ? 'Increasing maintenance overhead' : 'Sürekli artan maintenance', 
      l: isEn ? 'Optimized maintenance cost' : 'Optimize edilmiş bakım costu' 
    }
  ];

  const bibliography = [
    { 
      title: "Lean Software Development", 
      author: "Mary & Tom Poppendieck", 
      desc: isEn ? "The definitive book introducing Lean engineering into software. The source of the 7 core principles." : "Yazılım dünyasına 'Yalın' felsefesini kazandıran ana eser. 7 temel prensibin kaynağıdır.",
      link: "https://www.informit.com/store/lean-software-development-an-agile-toolkit-9780321150783"
    },
    { 
      title: "The Toyota Way", 
      author: "Jeffrey Liker", 
      desc: isEn ? "Industrial origins of TPS (Toyota Production System) and Muda (waste) elimination." : "Toyota Üretim Sistemi (TPS) ve 'Muda' (israf) kavramlarının endüstriyel kökenleri.",
      link: "https://en.wikipedia.org/wiki/The_Toyota_Way"
    },
    { 
      title: isEn ? "Official Lean Portal" : "Resmi Lean Portalı", 
      author: "Lean Enterprise Institute", 
      desc: isEn ? "Global reference for applying Lean thinking across modern organizations." : "Lean düşünce yapısının her alanda nasıl uygulanacağına dair dünya çapındaki ana referans.",
      link: "https://www.lean.org/"
    }
  ];

  return (
    <>
      {/* Maturity Model Section */}
      <section style={{ padding: '120px 0', background: 'rgba(132, 204, 22, 0.02)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
            <h2 style={{ fontSize: '3.5rem', fontWeight: 900 }}>
              {isEn ? "Lean Architecture " : "Yalın Mimari "}
              <span className="gradient-text">{isEn ? "Maturity Model" : "Olgunluk Modeli"}</span>
            </h2>
            <p style={{ color: 'var(--text-secondary)' }}>
              {isEn ? "How to scale Lean principles as your organization and codebase expand." : "Projenin boyutuna göre Lean prensiplerini nasıl ölçeklendiririz?"}
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            {levels.map((m, i) => (
              <div key={i} className="glass-card" style={{ padding: '3rem', textAlign: 'center' }}>
                <div style={{ width: '60px', height: '60px', background: 'rgba(132, 204, 22, 0.1)', color: '#84cc16', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 2rem' }}>
                  {m.icon}
                </div>
                <div style={{ fontSize: '0.8rem', fontWeight: 900, color: '#84cc16', marginBottom: '0.5rem', textTransform: 'uppercase' }}>{m.level}</div>
                <h3 style={{ fontSize: '1.8rem', marginBottom: '1.5rem', color: 'white' }}>{m.title}</h3>
                <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>{m.p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Recap Table */}
      <section style={{ padding: '120px 0', background: 'rgba(0,0,0,0.3)' }}>
        <div className="container">
          <div className="glass-card" style={{ padding: '4rem', borderRadius: '40px', overflow: 'hidden' }}>
            <h2 style={{ textAlign: 'center', marginBottom: '4rem', fontSize: '2.5rem', fontWeight: 950 }}>
              {isEn ? "Executive Summary: " : "Yönetici Özeti: "}
              <span style={{ color: '#84cc16' }}>Lean</span> vs {isEn ? "Traditional" : "Geleneksel"}
            </h2>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '600px' }}>
                <thead style={{ background: 'rgba(132, 204, 22, 0.1)', borderBottom: '2px solid rgba(132, 204, 22, 0.2)' }}>
                  <tr>
                    <th style={{ padding: '1.5rem', color: 'white', fontWeight: 900 }}>{isEn ? "Criterion" : "Kriter"}</th>
                    <th style={{ padding: '1.5rem', color: '#ef4444', fontWeight: 900 }}>{isEn ? "Traditional (Heavyweight)" : "Geleneksel (Heavyweight)"}</th>
                    <th style={{ padding: '1.5rem', color: '#84cc16', fontWeight: 900 }}>{isEn ? "Lean (High Velocity)" : "Yalın (Lean)"}</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonRows.map((row, i) => (
                    <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                      <td style={{ padding: '1.5rem', color: 'white', fontWeight: 700 }}>{row.k}</td>
                      <td style={{ padding: '1.5rem', color: 'rgba(239, 68, 68, 0.7)' }}>{row.h}</td>
                      <td style={{ padding: '1.5rem', color: 'rgba(132, 204, 22, 0.9)', fontWeight: 600 }}>{row.l}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Lean Bibliography */}
      <section style={{ padding: '100px 0', borderTop: '1px dashed rgba(255,255,255,0.1)', background: 'rgba(0,0,0,0.2)' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <div style={{ color: '#64748b', fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '1.5rem', letterSpacing: '3px' }}>
            {isEn ? "Architecture Bibliography & Literature" : "Mimari Kaynakça & Literatür"}
          </div>
          <h2 style={{ color: 'white', marginBottom: '3rem', fontSize: '2rem', fontWeight: 900 }}>
            {isEn ? "Lean Knowledge Sources" : "Lean Bilgi Kaynakları"}
          </h2>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            {bibliography.map((ref, i) => (
              <a 
                key={i} 
                href={ref.link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="glass-card" 
                style={{ padding: '2rem', textDecoration: 'none', textAlign: 'left', border: '1px solid rgba(255,255,255,0.05)', transition: 'all 0.3s' }}
              >
                <h4 style={{ color: '#84cc16', marginBottom: '0.5rem', fontSize: '1.1rem' }}>{ref.title}</h4>
                <div style={{ color: '#94a3b8', fontSize: '0.8rem', fontWeight: 700, marginBottom: '1rem' }}>{ref.author}</div>
                <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem', lineHeight: 1.5 }}>{ref.desc}</p>
                <div style={{ marginTop: '1.5rem', display: 'flex', alignItems: 'center', gap: '8px', color: '#84cc16', fontSize: '0.8rem', fontWeight: 900 }}>
                  {isEn ? "EXPLORE SOURCE" : "KAYNAĞA GİT"} <ArrowRight size={14} />
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default LeanMaturityModel;
