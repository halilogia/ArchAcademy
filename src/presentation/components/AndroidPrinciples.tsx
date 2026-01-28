import React from 'react';
import { motion } from 'framer-motion';
import { 
  ShieldCheck, 
  Smartphone, 
  Database, 
  RefreshCw, 
  Layers,
  CheckCircle2,
  ExternalLink
} from 'lucide-react';

const PrincipleCard = ({ icon: Icon, title, desc, color }: any) => (
  <motion.div 
    whileHover={{ y: -5 }}
    className="glass-card"
    style={{ 
      borderLeft: `4px solid ${color}`,
      background: 'rgba(15, 23, 42, 0.3)'
    }}
  >
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
      <div style={{ 
        background: `${color}20`, 
        padding: '10px', 
        borderRadius: '12px',
        color: color 
      }}>
        <Icon size={24} />
      </div>
      <div>
        <h4 style={{ color: 'white', marginBottom: '0.5rem', fontSize: '1.1rem' }}>{title}</h4>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6 }}>{desc}</p>
      </div>
    </div>
  </motion.div>
);

const AndroidPrinciples = () => {
  return (
    <section style={{ padding: '80px 0', background: 'rgba(15, 23, 42, 0.2)' }}>
      <div className="container">
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '12px', 
          marginBottom: '2rem',
          color: '#3ddc84' // Android Green
        }}>
          <Smartphone size={28} />
          <h2 style={{ fontSize: '2rem', fontWeight: 900 }}>Android Mimari İlkeleri</h2>
        </div>
        
        <p style={{ color: 'var(--text-secondary)', marginBottom: '3rem', maxWidth: '800px', fontSize: '1.1rem' }}>
          Google'ın <a href="https://developer.android.com/topic/architecture" target="_blank" rel="noopener noreferrer" style={{ color: '#3ddc84', textDecoration: 'none', fontWeight: 700 }}>Modern App Architecture</a> kılavuzunda MVVM'i desteklemek için vurguladığı 4 temel yapı taşı:
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
          <PrincipleCard 
            icon={Layers}
            color="#3ddc84"
            title="İlgi Alanlarının Ayrılması"
            desc="Kodunuzu Activity/Fragment içine yazmayın. UI bileşenleri sadece ekranı çizer; iş mantığı ve veri yönetimi ayrı katmanlarda (ViewModel/Repository) yaşamalıdır."
          />
          <PrincipleCard 
            icon={Database}
            color="#3ddc84"
            title="Veri Modellerinden UI Besleme"
            desc="UI, doğrudan modelden (mümkünse kalıcı modellerden) beslenmelidir. Bu sayede cihaz döndürme veya bellek kısıtlamalarında verileriniz asla kaybolmaz."
          />
          <PrincipleCard 
            icon={ShieldCheck}
            color="#3ddc84"
            title="Tek ve Doğru Kaynak (SSOT)"
            desc="Her veri tipinin tek bir sahibi olmalıdır. Veri sadece bu kaynak (genelde Repository veya Database) üzerinden değiştirilebilir, bu da tutarlılığı garantiler."
          />
          <PrincipleCard 
            icon={RefreshCw}
            color="#3ddc84"
            title="Tek Yönlü Veri Akışı (UDF)"
            desc="State (Durum) her zaman aşağı, Event (Olaylar) her zaman yukarı akar. Bu döngü, bağımlılıkları netleştirir ve hata ayıklamayı (debugging) kolaylaştırır."
          />
        </div>

        <div style={{ 
          marginTop: '4rem', 
          padding: '2rem', 
          borderRadius: '24px', 
          background: 'linear-gradient(135deg, rgba(61, 220, 132, 0.05) 0%, rgba(15, 23, 42, 0.4) 100%)',
          border: '1px solid rgba(61, 220, 132, 0.1)'
        }}>
          <h3 style={{ color: 'white', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <CheckCircle2 color="#3ddc84" /> Modern Katman Yapısı
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
            <div>
              <strong style={{ color: '#3ddc84' }}>UI Katmanı:</strong>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '0.5rem' }}>UI elementleri ekranı çizer, State Holder (ViewModel) veriyi hazırlar ve UI'ın anlayacağı hale getirir.</p>
            </div>
            <div>
              <strong style={{ color: '#3ddc84' }}>Domain Katmanı (Opsiyonel):</strong>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '0.5rem' }}>Karmaşık iş kurallarını içeren 'Use Case' sınıfları burada yaşar. ViewModels'leri basitleştirir.</p>
            </div>
            <div>
              <strong style={{ color: '#3ddc84' }}>Data Katmanı:</strong>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '0.5rem' }}>Repositories ve Data Sources'dan oluşur. Verinin nasıl saklanacağı ve çekileceğiyle ilgilenir.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AndroidPrinciples;
