import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ArchHero from '../components/ArchHero';
import MVVMFlow from '../components/MVVMFlow';
import WhyLayered from '../components/WhyLayered';
import FlutterBestPractices from '../components/FlutterBestPractices';
import AndroidPrinciples from '../components/AndroidPrinciples';
import ArchReferences from '../components/ArchReferences';
import RefactoringGuide from '../components/RefactoringGuide';
import {
  Layout,
  Share2,
  Database,
  Zap,
  ShieldCheck,
  Box,
  Server,
  Terminal,
  Code2,
  CheckCircle2,
  XCircle,
  ArrowLeftRight,
  Cpu,
  Layers,
  Brain,
  Palette,
  ExternalLink,
  Compass,
  ArrowRight,
  Activity,
  FolderTree,
  Settings,
  Sparkles,
  Smartphone
} from 'lucide-react';
import { useProgress } from '../../context/ProgressContext';

const MVVMPage = () => {
  const { completeStep } = useProgress();
  const [activeTab, setActiveTab] = useState<'principles' | 'hybrid' | 'nia'>('principles');

  useEffect(() => {
    const timer = setTimeout(() => {
      completeStep('/mvvm');
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const illu = (
    <div style={{ position: 'relative', width: '350px', height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
        style={{
          position: 'absolute',
          width: '280px',
          height: '280px',
          border: '2px dashed rgba(236, 72, 153, 0.2)',
          borderRadius: '50%'
        }}
      />
      <div style={{ position: 'relative', display: 'flex', gap: '20px', alignItems: 'center' }}>
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="glass-card"
          style={{ padding: '1.5rem', textAlign: 'center', borderTop: '4px solid #ec4899' }}
        >
          <Layout size={32} color="#ec4899" />
          <div style={{ fontSize: '0.7rem', fontWeight: 900, marginTop: '8px', color: '#ec4899' }}>VIEW</div>
        </motion.div>
        <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ repeat: Infinity, duration: 2 }} style={{ color: '#ec4899' }}>
          <ArrowLeftRight size={24} />
        </motion.div>
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="glass-card"
          style={{ padding: '1.5rem', textAlign: 'center', background: 'linear-gradient(135deg, #ec4899 0%, #be185d 100%)', border: 'none' }}
        >
          <Cpu size={32} color="white" />
          <div style={{ fontSize: '0.7rem', fontWeight: 900, marginTop: '8px', color: 'white' }}>VIEW-MODEL</div>
        </motion.div>
        <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ repeat: Infinity, duration: 2, delay: 0.5 }} style={{ color: '#ec4899' }}>
          <ArrowLeftRight size={24} />
        </motion.div>
        <motion.div
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="glass-card"
          style={{ padding: '1.5rem', textAlign: 'center', borderTop: '4px solid #3b82f6' }}
        >
          <Database size={32} color="#3b82f6" />
          <div style={{ fontSize: '0.7rem', fontWeight: 900, marginTop: '8px', color: '#3b82f6' }}>MODEL</div>
        </motion.div>
      </div>
    </div>
  );

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <ArchHero
        title="MVVM"
        subtitle="Architecture"
        description="Model-View-ViewModel. UI mantığını iş mantığından tamamen koparan, veri bağlama (Data Binding) ve reaktif programlama odaklı modern bir mimari desen."
        badge="Reactive & Decoupled"
        color="#ec4899"
        illustration={illu}
        features={activeTab === 'principles' ? [
          { icon: <Zap />, title: "Data Binding", desc: "ViewModel'deki state değiştiğinde View (UI) anında ve otomatik olarak güncellenir." },
          { icon: <CheckCircle2 />, title: "Testability", desc: "ViewModel, UI framework'ünden bağımsız olduğu için saf logic testleri kolaylaşır." },
          { icon: <Share2 />, title: "Decoupling", desc: "View ve Model birbirini asla tanımaz; aradaki köprü ViewModel'dir." }
        ] : []}
      >
        <div style={{
          marginTop: '2rem',
          padding: '6px',
          background: 'rgba(15, 23, 42, 0.4)',
          borderRadius: '24px',
          border: '1px solid rgba(255,255,255,0.05)',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '4px',
          backdropFilter: 'blur(10px)'
        }}>
          {[
            { id: 'principles', label: 'Principles', icon: <Layers size={18} /> },
            { id: 'hybrid', label: 'Hybrid Approach', icon: <Compass size={18} /> },
            { id: 'nia', label: 'Now in Android', icon: <Smartphone size={18} /> }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              style={{
                padding: '10px 24px',
                borderRadius: '18px',
                border: 'none',
                background: activeTab === tab.id ? '#ec4899' : 'transparent',
                color: activeTab === tab.id ? 'white' : 'rgba(255,255,255,0.5)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontWeight: 700,
                fontSize: '0.9rem',
                transition: 'all 0.3s ease',
                boxShadow: activeTab === tab.id ? '0 4px 12px rgba(236, 72, 153, 0.3)' : 'none'
              }}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>
      </ArchHero>

      <AnimatePresence mode="wait">
        {activeTab === 'principles' && (
          <motion.div
            key="principles"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <MVVMFlow />
            <FlutterBestPractices />

            {/* --- MVVM VS CLEAN ARCHITECTURE SECTION --- */}
            <section style={{ padding: '80px 0', borderTop: '1px solid var(--glass-border)', background: 'rgba(255,255,255,0.02)' }}>
              <div className="container">
                <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                  <h2 style={{ fontSize: '2.5rem', fontWeight: 900, marginBottom: '1rem' }}>
                    MVVM vs. <span className="gradient-text">Clean Architecture</span>
                  </h2>
                  <p style={{ color: 'var(--text-secondary)', maxWidth: '700px', margin: '0 auto' }}>
                    Karıştırılan en büyük nokta: MVVM bir "Sunum Deseni" (Presentation Pattern) iken, Clean Architecture bir "Sistem Mimarisi"dir (System Architecture).
                  </p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem' }}>
                  <div className="glass-card" style={{ borderTop: '4px solid #ec4899' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.5rem' }}>
                      <Layout color="#ec4899" size={24} />
                      <h3 style={{ margin: 0 }}>MVVM (Pattern)</h3>
                    </div>
                    <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                      UI katmanının iç işleyişine odaklanır. Görünüm (View) ile Veri (Model) arasındaki bağı koparmak için "ViewModel" köprüsünü kullanır.
                      <strong> "Bu butona basınca ekranda ne değişecek?" </strong> sorusuna yanıt verir.
                    </p>
                    <div style={{ background: 'rgba(236, 72, 153, 0.1)', padding: '1rem', borderRadius: '12px', fontSize: '0.85rem' }}>
                      📍 <strong>Kapsam:</strong> Sadece Sunum Katmanı (Presentation Layer).
                    </div>
                  </div>

                  <div className="glass-card" style={{ borderTop: '4px solid #10b981' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.5rem' }}>
                      <ShieldCheck color="#10b981" size={24} />
                      <h3 style={{ margin: 0 }}>Clean Arch (Philosophy)</h3>
                    </div>
                    <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                      Tüm uygulamanın (DB, API, Business Logic, UI) nasıl organize edileceğini anlatır. Katmanlar arası bağımlılık kuralına odaklanır.
                      <strong> "İş mantığı (Business Logic) dış dünyadan nasıl korunur?" </strong> sorusuna yanıt verir.
                    </p>
                    <div style={{ background: 'rgba(16, 185, 129, 0.1)', padding: '1rem', borderRadius: '12px', fontSize: '0.85rem' }}>
                      📍 <strong>Kapsam:</strong> Tüm Proje ve Katmanlar.
                    </div>
                  </div>
                </div>

                {/* ViewModel Counterpart in Clean Arch */}
                <div className="glass-card" style={{ marginTop: '3rem', background: 'linear-gradient(135deg, rgba(255,255,255,0.03) 0%, transparent 100%)' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: 'minmax(250px, 1fr) 2fr', gap: '3rem', alignItems: 'center' }}>
                    <div style={{ textAlign: 'center', padding: '2rem', borderRight: '1px solid var(--glass-border)' }}>
                      <div style={{ width: '80px', height: '80px', background: '#ec4899', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
                        <Brain color="white" size={40} />
                      </div>
                      <h4 style={{ marginBottom: '0.5rem' }}>ViewModel</h4>
                      <div style={{ fontSize: '0.8rem', color: '#ec4899', fontWeight: 800 }}>MVVM'deki İsmi</div>
                    </div>
                    <div>
                      <h3 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <ArrowLeftRight size={20} color="#3b82f6" />
                        Clean Arch'ta Karşılığı: <span style={{ color: '#3b82f6' }}>Presenter</span>
                      </h3>
                      <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                        Clean Architecture'ın <strong>Interface Adapters</strong> (Yeşil halka) katmanında bulunan <strong>Presenter</strong>, tam olarak ViewModel'in görevini yapar:
                      </p>
                      <ul style={{ listStyle: 'none', padding: 0, marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                        <li style={{ display: 'flex', gap: '10px', fontSize: '0.9rem' }}>
                          <CheckCircle2 size={16} color="#3b82f6" />
                          <span><strong>UseCase Çıktısını Hazırlar:</strong> Domain katmanından gelen ham entity verisini UI'ın anlayacağı "Display Model"e dönüştürür.</span>
                        </li>
                        <li style={{ display: 'flex', gap: '10px', fontSize: '0.9rem' }}>
                          <CheckCircle2 size={16} color="#3b82f6" />
                          <span><strong>Durum Yönetimi:</strong> Uygulamanın anlık görsel durumunu (loading, error, list) tutar.</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section style={{ padding: '80px 0', background: 'var(--bg-dark)' }}>
              <div className="container">
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '3rem' }}>
                  <div className="glass-card">
                    <h3 style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.5rem', color: '#ec4899' }}>
                      <Layout size={24} /> UI Katmanı
                    </h3>
                    <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                      <li style={{ display: 'flex', gap: '10px' }}>
                        <Code2 size={18} color="#ec4899" style={{ flexShrink: 0 }} />
                        <div><strong>View (Widgets):</strong> Sadece görseli tanımlar. İş mantığı barındırmaz. Flutter'da bunlar Stateless veya Stateful widget'lardır.</div>
                      </li>
                      <li style={{ display: 'flex', gap: '10px' }}>
                        <Terminal size={18} color="#ec4899" style={{ flexShrink: 0 }} />
                        <div><strong>ViewModel:</strong> Veriyi UI State'e dönüştürür. Repositories'den gelen veriyi View'un anlayacağı formata sokar.</div>
                      </li>
                    </ul>
                  </div>
                  <div className="glass-card">
                    <h3 style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.5rem', color: '#3b82f6' }}>
                      <Database size={24} /> Veri Katmanı
                    </h3>
                    <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                      <li style={{ display: 'flex', gap: '10px' }}>
                        <Box size={18} color="#3b82f6" style={{ flexShrink: 0 }} />
                        <div><strong>Repositories:</strong> Tekil gerçeklik kaynağıdır (Single Source of Truth). Caching, error handling ve retry mantığı burada yaşar.</div>
                      </li>
                      <li style={{ display: 'flex', gap: '10px' }}>
                        <Server size={18} color="#3b82f6" style={{ flexShrink: 0 }} />
                        <div><strong>Services:</strong> En alt katmandır. API endpoint'lerini veya yerel dosyaları wrap eder. Hiçbir state tutmazlar.</div>
                      </li>
                    </ul>
                  </div>
                </div>

                <div style={{ marginTop: '6rem' }}>
                  <h2 className="section-title" style={{ textAlign: 'center', marginBottom: '3rem' }}>Trade-off Analizi</h2>
                  <div className="glass-card" style={{ padding: 0, overflow: 'hidden' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                      <thead style={{ background: 'rgba(236, 72, 153, 0.1)' }}>
                        <tr>
                          <th style={{ padding: '1.5rem', color: '#ec4899', fontSize: '1.1rem' }}>Avantajlar (Pros)</th>
                          <th style={{ padding: '1.5rem', color: '#f59e0b', fontSize: '1.1rem' }}>Dezavantajlar (Cons)</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td style={{ padding: '1.5rem', borderRight: '1px solid var(--glass-border)', verticalAlign: 'top' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                              <div style={{ display: 'flex', gap: '10px' }}><CheckCircle2 size={18} color="#10b981" /> Bağımsız Test Edilebilirlik</div>
                              <div style={{ display: 'flex', gap: '10px' }}><CheckCircle2 size={18} color="#10b981" /> UI ve İş Mantığı Ayrımı</div>
                              <div style={{ display: 'flex', gap: '10px' }}><CheckCircle2 size={18} color="#10b981" /> Reaktif ve Dinamik UI Yapısı</div>
                            </div>
                          </td>
                          <td style={{ padding: '1.5rem', verticalAlign: 'top' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                              <div style={{ display: 'flex', gap: '10px' }}><XCircle size={18} color="#ef4444" /> Küçük Projeler İçin Overkill</div>
                              <div style={{ display: 'flex', gap: '10px' }}><XCircle size={18} color="#ef4444" /> Boilerplate (Fazla Dosya) Sayısı</div>
                              <div style={{ display: 'flex', gap: '10px' }}><XCircle size={18} color="#ef4444" /> Öğrenme Eğrisi (Reactive Paradigm)</div>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </section>

            <AndroidPrinciples />
            <RefactoringGuide />
            <ArchReferences />
          </motion.div>
        )
        }

        {
          activeTab === 'hybrid' && (
            <motion.div
              key="hybrid"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              {/* Customized for Hybrid Approach */}
              <WhyLayered
                badge="NEDEN HYBRID-FIRST?"
                title={<>Google Neden Hibrit <br /><span className="gradient-text">Yapıyı Öneriyor?</span></>}
                description="Google'ın resmi mimari vaka çalışmaları, MVVM'in esnekliği ile katmanlı yapının disiplinini birleştiren Hibrit modeli savunur. Bu sayede hem hız hem de ölçeklenebilirlik korunur."
              />

              <section style={{ padding: '100px 0', background: 'rgba(59, 130, 246, 0.03)', borderTop: '1px solid var(--glass-border)' }}>
                <div className="container">
                  <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                    <div style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      padding: '0.5rem 1rem',
                      marginBottom: '1.5rem',
                      borderRadius: '100px',
                      background: 'rgba(59, 130, 246, 0.1)',
                      color: '#3b82f6',
                      border: '1px solid rgba(59, 130, 246, 0.2)'
                    }}>
                      <Compass size={16} />
                      <span style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase' }}>Google Engineering Standard</span>
                    </div>
                    <h2 style={{ fontSize: '2.5rem', fontWeight: 900, marginBottom: '1rem' }}>Hibrit MVVM Yaklaşımı</h2>
                    <p style={{ color: 'var(--text-secondary)', maxWidth: '700px', margin: '0 auto' }}>
                      Büyük ölçekli projelerde bağımlılıkları yönetmenin en asil yolu: Veriyi merkezi, arayüzü özellik bazlı kurgulamaktır.
                    </p>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>
                    <div>
                      <h3 style={{ fontSize: '1.8rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <Layers color="#3b82f6" /> Merkezi Mantık vs. Özellik Bazlı UI
                      </h3>
                      <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: '2rem' }}>
                        Google'ın önerdiği bu hibrit yapı, uygulamanın farklı katmanlarını "değişim sıklığına" göre gruplar.
                        Data ve Domain katmanları bir kütüphane gibi <strong>merkezi (Type-based)</strong> dururken, UI katmanı tamamen bağımsız <strong>özelliklere (Feature-based)</strong> bölünür.
                      </p>

                      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <div className="glass-card" style={{ padding: '1.5rem', borderLeft: '4px solid #3b82f6' }}>
                          <div style={{ fontWeight: 800, marginBottom: '0.5rem' }}>lib/data & lib/domain (Horizontal)</div>
                          <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Repositories ve Modeller merkezi kalır. Her feature bunlara erişebilir.</div>
                        </div>
                        <div className="glass-card" style={{ padding: '1.5rem', borderLeft: '4px solid #10b981' }}>
                          <div style={{ fontWeight: 800, marginBottom: '0.5rem' }}>lib/ui/features (Vertical)</div>
                          <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Her sayfa (Auth, Home vb.) kendi ViewModel ve Widget'larını içinde saklar.</div>
                        </div>
                      </div>
                    </div>

                    <div style={{ background: 'rgba(0,0,0,0.3)', padding: '2rem', borderRadius: '32px', border: '1px solid var(--glass-border)' }}>
                      <h4 style={{ marginBottom: '1.5rem', color: '#3b82f6', fontSize: '1.1rem' }}>Mimarinin Faydaları:</h4>
                      {[
                        "Farklı ekipler aynı data katmanını kullanıp farklı featurelar geliştirebilir.",
                        "Bir feature silindiğinde diğerlerini asla etkilemez.",
                        "Unit testler domain katmanında, Widget testler feature katmanında izole edilir.",
                        "Uygulama büyüdükçe lib klasörü bir çöplüğe dönüşmez."
                      ].map((text, i) => (
                        <div key={i} style={{ display: 'flex', gap: '1rem', marginBottom: '1rem', alignItems: 'flex-start' }}>
                          <CheckCircle2 size={18} color="#3b82f6" style={{ flexShrink: 0, marginTop: '2px' }} />
                          <span style={{ fontSize: '0.95rem', color: 'rgba(255,255,255,0.8)' }}>{text}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </section>

              {/* --- ARCHITECTURE BLUEPRINT (FOLDER STRUCTURE & EXAMPLE) --- */}
              <section style={{ padding: '80px 0', background: 'rgba(15, 23, 42, 0.4)' }}>
                <div className="container">
                  <div style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 400px) 1fr', gap: '4rem', alignItems: 'start' }}>
                    {/* VS Code Inspired Folder Structure */}
                    <div className="glass-card" style={{ padding: '2rem', border: '1px solid rgba(255,255,255,0.05)', background: '#0f172a' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '2rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '1rem' }}>
                        <FolderTree size={18} color="#3b82f6" />
                        <span style={{ fontWeight: 800, fontSize: '0.9rem', color: 'white', textTransform: 'uppercase', letterSpacing: '1px' }}>Project Blueprint</span>
                      </div>

                      <div style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.8)', fontFamily: 'monospace' }}>
                        <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}><FolderTree size={16} color="#f59e0b" /> <strong>lib/</strong> <span style={{ color: '#64748b' }}></span></div>
                        <div style={{ paddingLeft: '20px' }}>

                          {/* UI LAYER */}
                          <div style={{ display: 'flex', gap: '8px', marginBottom: '8px', color: '#10b981' }}><FolderTree size={16} /> <strong>ui/</strong> <span style={{ color: '#64748b' }}>(Kullanıcı Arayüzü)</span></div>
                          <div style={{ paddingLeft: '20px', borderLeft: '1px dashed rgba(255,255,255,0.1)', marginLeft: '8px' }}>
                            <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}><FolderTree size={16} color="#64748b" /> <strong>core/</strong> <span style={{ color: '#64748b' }}>(Ortak Bileşenler & Temalar)</span></div>

                            <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}><FolderTree size={16} color="#f59e0b" /> <strong>vocabulary/</strong> <span style={{ color: '#64748b' }}>(Kelime Öğrenme Modülü)</span></div>
                            <div style={{ paddingLeft: '20px' }}>
                              <div style={{ display: 'flex', gap: '8px', marginBottom: '4px' }}><Settings size={16} color="#ec4899" /> vocabulary_view_model.dart</div>
                              <div style={{ display: 'flex', gap: '8px', marginBottom: '4px' }}><Code2 size={16} color="#ec4899" /> flashcard_screen.dart</div>
                            </div>

                            <div style={{ display: 'flex', gap: '8px', marginTop: '8px', marginBottom: '8px' }}><FolderTree size={16} color="#f59e0b" /> <strong>lessons/</strong> <span style={{ color: '#64748b' }}>(Gramatik & Alıştırmalar)</span></div>
                            <div style={{ paddingLeft: '20px' }}>
                              <div style={{ display: 'flex', gap: '8px', marginBottom: '4px' }}><Settings size={16} color="#ec4899" /> lesson_view_model.dart</div>
                              <div style={{ display: 'flex', gap: '8px', marginBottom: '4px' }}><Code2 size={16} color="#ec4899" /> quiz_screen.dart</div>
                            </div>
                          </div>

                          {/* DOMAIN LAYER */}
                          <div style={{ display: 'flex', gap: '8px', marginTop: '16px', marginBottom: '8px', color: '#3b82f6' }}><FolderTree size={16} /> <strong>domain/</strong> <span style={{ color: '#64748b' }}>(Sadece Tipler & İş Mantığı)</span></div>
                          <div style={{ paddingLeft: '20px' }}>
                            <div style={{ display: 'flex', gap: '8px', marginBottom: '4px' }}><Code2 size={16} /> word_model.dart <span style={{ color: '#64748b' }}>(Kelime Tipi / Interface)</span></div>
                            <div style={{ display: 'flex', gap: '8px', marginBottom: '4px' }}><Code2 size={16} /> lesson_entity.dart <span style={{ color: '#64748b' }}>(Ders Yapısı / Types)</span></div>
                          </div>

                          {/* DATA LAYER */}
                          <div style={{ display: 'flex', gap: '8px', marginTop: '16px', marginBottom: '8px', color: '#3b82f6' }}><FolderTree size={16} /> <strong>data/</strong> <span style={{ color: '#64748b' }}>(Veri Kaynakları & Repos)</span></div>
                          <div style={{ paddingLeft: '20px' }}>
                            <div style={{ display: 'flex', gap: '8px', marginBottom: '4px' }}><Settings size={16} /> vocabulary_repository.dart</div>
                            <div style={{ display: 'flex', gap: '8px', marginBottom: '4px' }}><Zap size={16} /> local_storage_service.dart</div>
                          </div>

                          {/* APP INFRASTRUCTURE (Cross-Cutting Concerns) */}
                          <div style={{ marginTop: '20px', paddingTop: '10px', borderTop: '1px dashed rgba(255,255,255,0.1)' }}>
                            <div style={{ display: 'flex', gap: '8px', marginBottom: '8px', color: '#94a3b8' }}><FolderTree size={16} /> <strong>config/</strong> <span style={{ color: '#64748b' }}>(Env, Theme, Constants)</span></div>
                            <div style={{ display: 'flex', gap: '8px', marginBottom: '8px', color: '#94a3b8' }}><FolderTree size={16} /> <strong>routing/</strong> <span style={{ color: '#64748b' }}>(GoRouter, Navigasyon)</span></div>
                            <div style={{ display: 'flex', gap: '8px', marginBottom: '8px', color: '#94a3b8' }}><FolderTree size={16} /> <strong>utils/</strong> <span style={{ color: '#64748b' }}>(Helpers, Extensions)</span></div>
                            <div style={{ display: 'flex', gap: '8px', marginTop: '12px', color: '#f8fafc' }}><Code2 size={16} /> main_development.dart</div>
                            <div style={{ display: 'flex', gap: '8px', color: '#f8fafc' }}><Code2 size={16} /> main_production.dart</div>
                          </div>
                        </div>
                      </div>

                      {/* Architect's Perspective Note */}
                      <div style={{ marginTop: '2rem', padding: '1.5rem', borderRadius: '16px', background: 'rgba(245, 158, 11, 0.05)', border: '1px solid rgba(245, 158, 11, 0.2)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#f59e0b', marginBottom: '0.8rem' }}>
                          <Sparkles size={18} />
                          <span style={{ fontWeight: 800, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Mimarın Notu: Esneklik</span>
                        </div>
                        <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.7)', lineHeight: 1.6 }}>
                          Bu klasörleme yapısı, Google'ın <strong>The Compass</strong> vaka çalışması için sunduğu kurumsal bir referanstır.
                          Mimari bir varış noktası değil, bir yolculuktur. Projeniz küçükse bu yapı "overkill" olabilir; çok devasa ise katmanları
                          ayrı paketlere (Internal Packages) bölmek daha doğru bir adım olabilir. <strong>Önemli olan klasör ismi değil, bağımlılıkların yönüdür.</strong>
                        </p>
                      </div>
                    </div>

                    {/* Flow Explanation */}
                    <div>
                      <h3 style={{ fontSize: '2rem', fontWeight: 900, marginBottom: '1.5rem' }}>Dil Öğrenme Uygulaması: Akış Örneği</h3>
                      <p style={{ color: 'var(--text-secondary)', marginBottom: '2.5rem', fontSize: '1.1rem', lineHeight: 1.6 }}>
                        Bir kelimeyi havuzdan alıp ekranda göstermeye kadar süren o kusursuz yolculuk:
                      </p>

                      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        <div className="glass-card" style={{ display: 'flex', gap: '20px', alignItems: 'center', background: 'rgba(59, 130, 246, 0.05)' }}>
                          <div style={{ background: '#3b82f6', width: '40px', height: '40px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                            <Database color="white" size={20} />
                          </div>
                          <div>
                            <h4 style={{ marginBottom: '4px' }}>1. Kelime Havuzu (Data)</h4>
                            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}><code>VocabularyRepository</code> local veritabanından kelimeleri çeker.</p>
                          </div>
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'center', color: '#64748b' }}>
                          <ArrowRight style={{ transform: 'rotate(90deg)' }} />
                        </div>

                        <div className="glass-card" style={{ display: 'flex', gap: '20px', alignItems: 'center', background: 'rgba(236, 72, 153, 0.05)' }}>
                          <div style={{ background: '#ec4899', width: '40px', height: '40px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                            <Settings color="white" size={20} />
                          </div>
                          <div>
                            <h4 style={{ marginBottom: '4px' }}>2. Öğrenme Mantığı (Logic)</h4>
                            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}><code>VocabularyViewModel</code> kelimeleri karıştırır ve "Öğrenildi" bilgisini işler.</p>
                          </div>
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'center', color: '#64748b' }}>
                          <ArrowRight style={{ transform: 'rotate(90deg)' }} />
                        </div>

                        <div className="glass-card" style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                          <div style={{ background: '#10b981', width: '40px', height: '40px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                            <Layout color="white" size={20} />
                          </div>
                          <div>
                            <h4 style={{ marginBottom: '4px' }}>3. Flashcard Arayüzü (View)</h4>
                            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}><code>FlashcardScreen</code> sadece ViewModel'den gelen kelimeyi ekranda parlatır.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              <RefactoringGuide />
              <ArchReferences />
            </motion.div>
          )
        }
        {
          activeTab === 'nia' && (
            <motion.div
              key="nia"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <section style={{ padding: '80px 0', background: 'var(--bg-dark)' }}>
                <div className="container">
                  <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
                    <div style={{
                      display: 'inline-flex', alignItems: 'center', gap: '0.6rem', padding: '0.6rem 1.2rem', marginBottom: '1.5rem',
                      borderRadius: '100px', background: 'rgba(52, 168, 83, 0.1)', color: '#34a853', border: '1px solid rgba(52, 168, 83, 0.2)', fontWeight: 700, fontSize: '0.8rem'
                    }}>
                      <Smartphone size={16} /> GOOGLE OFFICIAL BLUEPRINT
                    </div>
                    <h2 style={{ fontSize: '3.5rem', fontWeight: 950, marginBottom: '1.5rem', letterSpacing: '-1px' }}>
                      Now in <span style={{ color: '#34a853' }}>Android</span>
                    </h2>
                    <p style={{ color: 'var(--text-secondary)', maxWidth: '800px', margin: '0 auto', fontSize: '1.2rem', lineHeight: 1.8 }}>
                      Google'ın resmi "Best Practice" projesi olan <strong>Now in Android</strong>, modern bir uygulamanın nasıl modüler, test edilebilir ve offline-first olması gerektiğini gösteren nihai rehberdir.
                    </p>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '4rem', alignItems: 'center', marginBottom: '8rem' }}>
                    <div className="glass-card" style={{ padding: '3rem', borderLeft: '4px solid #34a853' }}>
                      <h3 style={{ fontSize: '1.8rem', fontWeight: 900, marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <Share2 color="#34a853" /> Multi-Module Architecture
                      </h3>
                      <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: '2rem' }}>
                        NiA, uygulamayı devasa bir monolit yerine, her biri belli bir sorumluluğu olan onlarca küçük <strong>modüle</strong> böler.
                      </p>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {[
                          { title: "App Module", desc: "Tüm modülleri birleştirir ve uygulamayı ayağa kaldırır." },
                          { title: "Feature Modules", desc: "Özellik bazlı (Bookmarks, Interests). Kendi UI ve ViewModel'ini içerir." },
                          { title: "Core Modules", desc: "Veritabanı, Network ve Design System'in alt katmanı." }
                        ].map((m, i) => (
                          <div key={i} style={{ display: 'flex', gap: '1rem' }}>
                            <CheckCircle2 color="#34a853" size={18} />
                            <div><div style={{ fontWeight: 800 }}>{m.title}</div><div style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.6)' }}>{m.desc}</div></div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', alignItems: 'center' }}>
                      <div style={{ width: '180px', padding: '12px', borderRadius: '10px', background: '#34a853', color: 'white', textAlign: 'center', fontWeight: 900, fontSize: '0.8rem' }}>:app</div>
                      <ArrowRight style={{ transform: 'rotate(90deg)', opacity: 0.3 }} />
                      <div style={{ display: 'flex', gap: '10px' }}>
                        <div style={{ width: '110px', padding: '12px', borderRadius: '10px', background: 'rgba(52, 168, 83, 0.1)', border: '1px solid #34a853', textAlign: 'center', fontWeight: 700, fontSize: '0.7rem' }}>:feature:news</div>
                        <div style={{ width: '110px', padding: '12px', borderRadius: '10px', background: 'rgba(52, 168, 83, 0.1)', border: '1px solid #34a853', textAlign: 'center', fontWeight: 700, fontSize: '0.7rem' }}>:feature:auth</div>
                      </div>
                      <ArrowRight style={{ transform: 'rotate(90deg)', opacity: 0.3 }} />
                      <div style={{ width: '230px', padding: '12px', borderRadius: '10px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', textAlign: 'center', fontWeight: 700, fontSize: '0.7rem' }}>:core:data / :core:database</div>
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem' }}>
                    <div className="glass-card" style={{ padding: '0', overflow: 'hidden', background: '#0a0f1d' }}>
                      <div style={{ padding: '15px 20px', background: 'rgba(255,255,255,0.03)', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <FolderTree size={16} color="#34a853" />
                        <span style={{ fontSize: '0.75rem', fontWeight: 800 }}>NI-ANDROID BLUEPRINT</span>
                      </div>
                      <pre style={{ padding: '1.5rem', fontSize: '0.8rem', color: '#94a3b8', lineHeight: 1.6 }}>{`core/
 ├── data/         # Repositories
 ├── database/     # Local Storage
 ├── network/      # Remote APIs
features/
 ├── foryou/       # Screen & VM
 └── interests/    # Screen & VM
app/              # Orchestration`}</pre>
                    </div>
                    <div>
                      <h3 style={{ fontSize: '1.8rem', fontWeight: 900, marginBottom: '1.5rem' }}>Offline-First <span style={{ color: '#34a853' }}>Data Flow</span></h3>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        <div style={{ display: 'flex', gap: '1rem' }}><CheckCircle2 color="#34a853" size={20} /><div><h4 style={{ marginBottom: '4px' }}>Reactive UI</h4><p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>UI, veriyi bir Flow olarak dinler ve değişimde anında güncellenir.</p></div></div>
                        <div style={{ display: 'flex', gap: '1rem' }}><CheckCircle2 color="#34a853" size={20} /><div><h4 style={{ marginBottom: '4px' }}>Single Source of Truth</h4><p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Veri her zaman lokal database'den gelir (Offline-first approach).</p></div></div>
                        <div style={{ display: 'flex', gap: '1rem' }}><CheckCircle2 color="#34a853" size={20} /><div><h4 style={{ marginBottom: '4px' }}>Background Sync</h4><p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>WorkManager ile veri arka planda ağdan çekilip lokal database güncellenir.</p></div></div>
                      </div>
                    </div>
                  </div>

                  <div style={{ marginTop: '5rem', textAlign: 'center' }}>
                    <div className="glass-card" style={{ padding: '3rem', border: '1px solid rgba(52, 168, 83, 0.1)', background: 'linear-gradient(135deg, rgba(52, 168, 83, 0.05) 0%, transparent 100%)' }}>
                      <h4 style={{ fontSize: '1.5rem', fontWeight: 900, marginBottom: '1rem' }}>Resmi Kaynakları İncele</h4>
                      <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                        <a href="https://github.com/android/nowinandroid" target="_blank" rel="noopener noreferrer" style={{ padding: '1rem 2.5rem', borderRadius: '100px', background: '#34a853', color: 'white', textDecoration: 'none', fontWeight: 900, display: 'flex', alignItems: 'center', gap: '10px' }}>GITHUB REPO <ExternalLink size={18} /></a>
                        <a href="https://developer.android.com/series/now-in-android?hl=tr" target="_blank" rel="noopener noreferrer" style={{ padding: '1rem 2.5rem', borderRadius: '100px', background: 'rgba(255,255,255,0.05)', color: 'white', textDecoration: 'none', fontWeight: 900, border: '1px solid var(--glass-border)' }}>RESMİ SERİ 📖</a>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </motion.div>
          )
        }
      </AnimatePresence >

    </motion.div >
  );
};

export default MVVMPage;
