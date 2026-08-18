import React from 'react';
import { motion } from 'framer-motion';
import { Mic2, ArrowRightLeft, Monitor, Box, RefreshCw, Zap, CheckCircle2, Settings } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const MVPComparisonTab: React.FC = () => {
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
        {isEn ? "Sibling Architecture Showdown: " : "Kardeşlerin Savaşı: "}
        <span className="gradient-text" style={{ backgroundImage: 'linear-gradient(to right, #34d399, #10b981)' }}>
          MVP vs MVVM
        </span>
      </h2>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: '2rem', alignItems: 'stretch' }}>
        {/* MVP CARD */}
        <div className="glass-card" style={{ borderTop: '4px solid #34d399', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: -10, right: -10, opacity: 0.1 }}>
            <Mic2 size={150} color="#34d399" />
          </div>
          <h3 style={{ fontSize: '1.8rem', fontWeight: 900, marginBottom: '0.5rem', color: '#34d399' }}>MVP</h3>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>Model - View - Presenter</p>
          
          <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
            <li style={{ display: 'flex', gap: '12px' }}>
              <ArrowRightLeft size={20} color="#34d399" />
              <div>
                <strong style={{ color: 'white' }}>{isEn ? "Explicit Interface Calls:" : "İletişim:"}</strong> {isEn ? "Presenter directly commands View methods via strongly-typed protocol interfaces:" : "Presenter, View'un metotlarını (Interface) doğrudan çağırır:"} <br/><span style={{fontSize: '0.85rem', opacity: 0.7}}><code>view.showLoading()</code></span>
              </div>
            </li>
            <li style={{ display: 'flex', gap: '12px' }}>
              <Monitor size={20} color="#34d399" />
              <div>
                <strong style={{ color: 'white' }}>{isEn ? "One-to-One Coupling:" : "One-to-One:"}</strong> {isEn ? "Typically every View screen has exactly one dedicated Presenter instance." : "Genelde her View için (Activity/Fragment) bir Presenter vardır. Sıkı bir bağdır."}
              </div>
            </li>
            <li style={{ display: 'flex', gap: '12px' }}>
              <Box size={20} color="#34d399" />
              <div>
                <strong style={{ color: 'white' }}>{isEn ? "Passive State:" : "State:"}</strong> {isEn ? "View holds zero autonomous state; it simply reflects what Presenter dictates." : "View kendi state'ini tutmaz, Presenter ne derse o olur."}
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
                <strong style={{ color: 'white' }}>{isEn ? "Reactive Binding:" : "Binding:"}</strong> {isEn ? "ViewModel publishes State. Views subscribe and re-render without imperative commands." : "ViewModel, View'a emir vermez. State yayınlar (Publish). View bu state'i dinler (Subscribe)."}
              </div>
            </li>
            <li style={{ display: 'flex', gap: '12px' }}>
              <CheckCircle2 size={20} color="#10b981" />
              <div>
                <strong style={{ color: 'white' }}>{isEn ? "One-to-Many Decoupling:" : "One-to-Many:"}</strong> {isEn ? "A single ViewModel can be observed concurrently by multiple different View widgets." : "Bir ViewModel birden fazla View tarafından dinlenebilir."}
              </div>
            </li>
            <li style={{ display: 'flex', gap: '12px' }}>
              <Settings size={20} color="#10b981" />
              <div>
                <strong style={{ color: 'white' }}>{isEn ? "Less Interface Boilerplate:" : "Boilerplate:"}</strong> {isEn ? "Eliminates huge lists of view interface methods in exchange for observable state streams." : "MVP'ye göre Interface (Sözleşme) yazma yükü daha azdır ama Binding setup'ı gerekebilir."}
              </div>
            </li>
          </ul>
        </div>
      </div>
      
      {/* Decision Matrix */}
      <div style={{ marginTop: '4rem', background: 'rgba(0,0,0,0.2)', padding: '2rem', borderRadius: '24px', border: '1px solid var(--glass-border)' }}>
        <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '1.5rem', textAlign: 'center' }}>
          {isEn ? "Summary: Which One to Choose?" : "Özet: Hangisini Seçmeli?"}
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <div style={{ background: 'rgba(52, 211, 153, 0.1)', padding: '10px', borderRadius: '8px', height: 'fit-content' }}>
              <Mic2 color="#34d399" />
            </div>
            <div>
              <h4 style={{ color: 'white', marginBottom: '0.5rem' }}>{isEn ? "Choose MVP if..." : "MVP Seç eğer..."}</h4>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                {isEn 
                  ? "Target platform lacks reactive data binding (e.g. legacy Android View/WinForms) or when absolute, explicit manual control over execution flow is required." 
                  : "Framework 'Data Binding' desteklemiyorsa (eski Android, WinForms) veya çok net, manuel kontrol istiyorsan. 'Sihir' (Magic Code) sevmiyorsan."
                }
              </p>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <div style={{ background: 'rgba(16, 185, 129, 0.1)', padding: '10px', borderRadius: '8px', height: 'fit-content' }}>
              <RefreshCw color="#10b981" />
            </div>
            <div>
              <h4 style={{ color: 'white', marginBottom: '0.5rem' }}>{isEn ? "Choose MVVM if..." : "MVVM Seç eğer..."}</h4>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                {isEn 
                  ? "Building modern applications with declarative UI engines (React, Vue, Flutter, Jetpack Compose, SwiftUI, SolidJS) that thrive on observable state." 
                  : "React, Vue, Flutter, Compose, SwiftUI gibi 'Declarative' veya 'Binding' destekli modern platformlarda geliştirme yapıyorsan."
                }
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default MVPComparisonTab;
