import React from 'react';
import { motion } from 'framer-motion';
import { Settings, ArrowRightLeft, Monitor, Code2, RefreshCw, Zap, CheckCircle2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const MVCComparisonTab: React.FC = () => {
  const { i18n } = useTranslation();
  const isEn = (i18n.resolvedLanguage || i18n.language || 'tr').startsWith('en');

  return (
    <motion.div
      key="comparison"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <h2 className="section-title text-center" style={{ marginBottom: '3rem' }}>
        {isEn ? "The Big Comparison: " : "Büyük Karşılaştırma: "}
        <span className="gradient-text">MVC vs MVVM</span>
      </h2>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: '2rem', alignItems: 'stretch' }}>
        {/* MVC CARD */}
        <div className="glass-card" style={{ borderTop: '4px solid #f43f5e', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: -10, right: -10, opacity: 0.1 }}>
            <Settings size={150} color="#f43f5e" />
          </div>
          <h3 style={{ fontSize: '1.8rem', fontWeight: 900, marginBottom: '0.5rem', color: '#f43f5e' }}>MVC</h3>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>Model - View - Controller</p>
          
          <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
            <li style={{ display: 'flex', gap: '12px' }}>
              <ArrowRightLeft size={20} color="#f43f5e" />
              <div>
                <strong style={{ color: 'white' }}>{isEn ? "Communication:" : "İletişim:"}</strong> {isEn ? "Controller mutates Model and selects View. Usually tightly paired in a 1-to-1 relationship." : "Controller, View'u günceller. View, Controller'ı tetikler. Genelde 'One-to-One' ilişki vardır."}
              </div>
            </li>
            <li style={{ display: 'flex', gap: '12px' }}>
              <Monitor size={20} color="#f43f5e" />
              <div>
                <strong style={{ color: 'white' }}>{isEn ? "View Coupling:" : "View Bağımlılığı:"}</strong> {isEn ? "Controller frequently retains direct references to UI widget hierarchies (tight coupling)." : "Controller genellikle View'dan haberdardır veya doğrudan referans tutar (Strict Coupling)."}
              </div>
            </li>
            <li style={{ display: 'flex', gap: '12px' }}>
              <Code2 size={20} color="#f43f5e" />
              <div>
                <strong style={{ color: 'white' }}>{isEn ? "Sweet Spot:" : "Kullanım Alanı:"}</strong> {isEn ? "Server-side frameworks (Spring MVC, Django, Ruby on Rails) and classic desktop software." : "Server-side frameworks (Spring MVC, Django), basit masaüstü uygulamaları."}
              </div>
            </li>
          </ul>
        </div>

        {/* VS Badge */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ background: '#0f172a', border: '1px solid var(--glass-border)', borderRadius: '50%', width: '60px', height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: '1.2rem', color: 'white', zIndex: 10 }}>VS</div>
        </div>

        {/* MVVM CARD */}
        <div className="glass-card" style={{ borderTop: '4px solid #10b981', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: -10, right: -10, opacity: 0.1 }}>
            <RefreshCw size={150} color="#10b981" />
          </div>
          <h3 style={{ fontSize: '1.8rem', fontWeight: 900, marginBottom: '0.5rem', color: '#10b981' }}>MVVM</h3>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>Model - View - ViewModel</p>
          
          <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
            <li style={{ display: 'flex', gap: '12px' }}>
              <Zap size={20} color="#10b981" />
              <div>
                <strong style={{ color: 'white' }}>{isEn ? "Data Binding:" : "Binding (Bağlama):"}</strong> {isEn ? "ViewModel observable state changes automatically re-render the view tree via reactive binding." : "ViewModel değişir, View otomatik güncellenir (Data Binding)."}
              </div>
            </li>
            <li style={{ display: 'flex', gap: '12px' }}>
              <CheckCircle2 size={20} color="#10b981" />
              <div>
                <strong style={{ color: 'white' }}>{isEn ? "Testability:" : "Test Edilebilirlik:"}</strong> {isEn ? "ViewModel holds zero references to View UI components, allowing effortless 100% headless testing." : "ViewModel, View'u bilmez! Bu yüzden UI olmadan tamamen test edilebilir (Loose Coupling)."}
              </div>
            </li>
            <li style={{ display: 'flex', gap: '12px' }}>
              <Code2 size={20} color="#10b981" />
              <div>
                <strong style={{ color: 'white' }}>{isEn ? "Sweet Spot:" : "Kullanım Alanı:"}</strong> {isEn ? "Modern dynamic client-side apps (React, Vue, Flutter, SwiftUI, Jetpack Compose)." : "Modern Frontend (React, Vue, Flutter), WPF, Xamarin gibi zengin arayüzler."}
              </div>
            </li>
          </ul>
        </div>
      </div>
      
      {/* Historical Evolution Timeline */}
      <div style={{ marginTop: '4rem', background: 'rgba(0,0,0,0.2)', padding: '2rem', borderRadius: '24px', border: '1px solid var(--glass-border)' }}>
        <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '1.5rem', textAlign: 'center' }}>
          {isEn ? "Historical Evolution Timeline" : "Tarihsel Gelişim Özeti"}
        </h3>
        <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', flexWrap: 'wrap', gap: '2rem' }}>
          <div style={{ textAlign: 'center', maxWidth: '300px' }}>
            <div style={{ fontSize: '3rem', fontWeight: 900, color: '#64748b', marginBottom: '0.5rem' }}>1979</div>
            <div style={{ fontSize: '1.2rem', fontWeight: 700, color: 'white' }}>{isEn ? "Birth of MVC" : "MVC Doğdu"}</div>
            <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>{isEn ? "Invented by Trygve Reenskaug for Smalltalk-76 at Xerox PARC." : "Trygve Reenskaug tarafından Smalltalk için geliştirildi."}</div>
          </div>
          <ArrowRightLeft size={32} color="#64748b" />
          <div style={{ textAlign: 'center', maxWidth: '300px' }}>
            <div style={{ fontSize: '3rem', fontWeight: 900, color: '#f59e0b', marginBottom: '0.5rem' }}>1996</div>
            <div style={{ fontSize: '1.2rem', fontWeight: 700, color: 'white' }}>{isEn ? "MVP Evolution" : "MVP Evrimi"}</div>
            <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>{isEn ? "Adapted by Taligent for C++ and Java windowing systems." : "Taligent tarafından C++ ve Java dünyasına pencereli sistemler için uyarlandı."}</div>
          </div>
          <ArrowRightLeft size={32} color="#64748b" />
          <div style={{ textAlign: 'center', maxWidth: '300px' }}>
            <div style={{ fontSize: '3rem', fontWeight: 900, color: '#10b981', marginBottom: '0.5rem' }}>2005</div>
            <div style={{ fontSize: '1.2rem', fontWeight: 700, color: 'white' }}>{isEn ? "MVVM Revolution" : "MVVM Devrimi"}</div>
            <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>{isEn ? "Introduced by John Gossman at Microsoft with WPF declarative binding." : "Microsoft (John Gossman) tarafından WPF ve 'Binding' teknolojisiyle duyuruldu."}</div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default MVCComparisonTab;
