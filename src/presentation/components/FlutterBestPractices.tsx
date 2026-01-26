import React from 'react';
import { motion } from 'framer-motion';
import { 
  FolderTree, 
  Files, 
  Package, 
  Code, 
  Layout, 
  Database, 
  Zap,
  CheckCircle2
} from 'lucide-react';

const FolderNode = ({ name, type, children, color }: any) => (
  <div style={{ marginLeft: '20px', borderLeft: `1px solid ${color}40`, paddingLeft: '15px', marginTop: '8px' }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'white', fontSize: '0.9rem' }}>
      {type === 'folder' ? <FolderTree size={16} color={color} /> : <Files size={16} opacity={0.6} />}
      <span style={{ fontFamily: 'monospace' }}>{name}</span>
    </div>
    {children}
  </div>
);

const FlutterBestPractices = () => {
  return (
    <section style={{ padding: '100px 0', borderTop: '1px solid var(--glass-border)' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
          <h2 className="gradient-text" style={{ fontSize: '2.5rem', fontWeight: 900, marginBottom: '1rem' }}>
            Flutter Best Practices & Structure
          </h2>
          <p style={{ color: 'var(--text-secondary)' }}>
            Google'un önerdiği paket yapısı ve temel reaktif prensipler.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '4rem' }}>
          
          {/* Package Structure */}
          <div className="glass-card">
            <h3 style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Package color="#0284c7" /> Karma Paket Yapısı
            </h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
              Data katmanı (Repositories) "Type" bazlı, UI katmanı (Views) "Feature" bazlı organize edilir.
            </p>
            
            <div style={{ background: 'rgba(0,0,0,0.2)', padding: '1.5rem', borderRadius: '16px' }}>
              <FolderNode name="lib" type="folder" color="#0284c7">
                <FolderNode name="data" type="folder" color="#3b82f6">
                  <FolderNode name="repositories" type="folder" color="#3b82f6">
                    <FolderNode name="user_repository.dart" type="file" />
                  </FolderNode>
                  <FolderNode name="services" type="folder" color="#3b82f6">
                    <FolderNode name="api_service.dart" type="file" />
                  </FolderNode>
                </FolderNode>
                <FolderNode name="ui" type="folder" color="#ec4899">
                  <FolderNode name="auth" type="folder" color="#ec4899">
                    <FolderNode name="login_screen.dart" type="file" />
                    <FolderNode name="login_viewmodel.dart" type="file" />
                  </FolderNode>
                </FolderNode>
                <FolderNode name="domain" type="folder" color="#f59e0b">
                  <FolderNode name="models" type="folder" color="#f59e0b">
                    <FolderNode name="user.dart" type="file" />
                  </FolderNode>
                </FolderNode>
              </FolderNode>
            </div>
          </div>

          {/* Reactive Principles */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div className="glass-card" style={{ borderLeft: '4px solid #10b981' }}>
              <h4 style={{ color: '#10b981', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                 <Zap size={20} /> UI = f(State)
              </h4>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                Modern UI framework'lerinde (Flutter/React) arayüz, o anki durumun (state) bir fonksiyonudur. 
                State değiştiğinde UI kendini tamamen yeniden render eder. Bu, **Imperative** (Nasıl yapılacağı) yerine 
                **Declarative** (Ne olacağı) yaklaşımını getirir.
              </p>
            </div>

            <div className="glass-card" style={{ borderLeft: '4px solid #8b5cf6' }}>
              <h4 style={{ color: '#8b5cf6', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                 <CheckCircle2 size={20} /> Unidirectional Data Flow
              </h4>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                Veri her zaman aşağı (View'a), event'ler ise her zaman yukarı (ViewModel'e) akar. 
                Bu "Tek Yönlü" akış, veri tutarsızlıklarını (race conditions) engeller ve hata ayıklamayı kolaylaştırır.
              </p>
            </div>

            <div className="glass-card" style={{ borderLeft: '4px solid #0ea5e9' }}>
              <h4 style={{ color: '#0ea5e9', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                 <Package size={20} /> Dependency Injection (DI)
              </h4>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                Katmanları birbirine bağlayan "yapıştırıcıdır". Sınıfların bağımlılıklarını kendilerinin yaratması yerine dışarıdan (Provider, GetIt vb.) almasını sağlar. Bu sayede katmanlar birbirine sıkı sıkıya bağlanmaz (Loose Coupling).
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default FlutterBestPractices;
