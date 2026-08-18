import React from 'react';
import { motion } from 'framer-motion';
import { 
  Layout, 
  ShieldCheck, 
  Brain, 
  ArrowLeftRight, 
  CheckCircle2, 
  Code2, 
  Terminal, 
  Database, 
  Box, 
  Server, 
  XCircle 
} from 'lucide-react';
import MVVMFlow from '../MVVMFlow';
import FlutterBestPractices from '../FlutterBestPractices';
import AndroidPrinciples from '../AndroidPrinciples';
import RefactoringGuide from '../RefactoringGuide';
import ArchReferences from '../ArchReferences';

export const MVVMPrinciplesTab: React.FC = () => {
  return (
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
  );
};

export default MVVMPrinciplesTab;
