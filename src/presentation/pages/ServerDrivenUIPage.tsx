import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Server, Smartphone, CloudLightning, ArrowRight, Layers, FileJson, LayoutTemplate } from 'lucide-react';
import ArchHero from '../components/ArchHero';

const ServerDrivenUIPage = () => {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      title: 'Server Response',
      icon: <Server size={32} />,
      desc: 'Backend, ekranın nasıl görüneceğine dair bir JSON şeması üretir.',
      code: `{
  "type": "vertical-stack",
  "children": [
    { "type": "banner", "image": "sale.jpg" },
    { "type": "carousel", "items": [...] }
  ]
}`
    },
    {
      title: 'Parser Engine',
      icon: <CloudLightning size={32} />,
      desc: 'Frontend (Mobil/Web), gelen JSON\'ı okur ve bileşenleri eşleştirir.',
      code: `// Frontend Map
const componentMap = {
  'vertical-stack': Stack,
  'banner': HeroBanner,
  'carousel': Slider
};`
    },
    {
      title: 'Dynamic Rendering',
      icon: <Smartphone size={32} />,
      desc: 'Ekran, uygulama güncellemesine gerek kalmadan anlık olarak çizilir.',
      view: (
        <div style={{ background: '#fff', borderRadius: '12px', padding: '10px', height: '100%', color: 'black' }}>
          <div style={{ height: '60px', background: '#f97316', borderRadius: '8px', marginBottom: '10px' }} />
          <div style={{ display: 'flex', gap: '5px' }}>
            {[1,2,3].map(i => <div key={i} style={{ width: '40px', height: '40px', background: '#eee', borderRadius: '4px' }} />)}
          </div>
        </div>
      )
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{ background: 'var(--bg-dark)', minHeight: '100vh' }}
    >
      <ArchHero 
        title="Server-Driven"
        subtitle="UI"
        description="Ekran tasarımının kontrolünü sunucuya vermek. Uygulama marketi güncellemesini beklemeden arayüzü uzaktan değiştirme sanatı."
        badge="Frontend Governance"
        color="#818cf8"
        illustration={
          <div style={{ position: 'relative', width: '300px', height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              style={{ position: 'absolute', width: '100%', height: '100%', borderRadius: '50%', border: '1px dashed rgba(129, 140, 248, 0.3)' }}
            />
            <motion.div
              animate={{ 
                y: [0, -20, 0],
                boxShadow: ['0 0 20px #818cf855', '0 0 50px #818cf8aa', '0 0 20px #818cf855']
               }}
              transition={{ duration: 3, repeat: Infinity }}
              style={{ width: '120px', height: '180px', background: '#1e1b4b', border: '2px solid #818cf8', borderRadius: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '10px', gap: '10px' }}
            >
               <div style={{ width: '40px', height: '4px', background: '#818cf8', borderRadius: '2px' }} />
               <motion.div 
                 animate={{ height: ['40px', '80px', '40px'], background: ['#4f46e5', '#a855f7', '#4f46e5'] }}
                 transition={{ duration: 5, repeat: Infinity }}
                 style={{ width: '100%', borderRadius: '8px' }} 
               />
               <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5px', width: '100%' }}>
                  <div style={{ height: '40px', background: 'rgba(255,255,255,0.1)', borderRadius: '6px' }} />
                  <div style={{ height: '40px', background: 'rgba(255,255,255,0.1)', borderRadius: '6px' }} />
               </div>
            </motion.div>
          </div>
        }
        features={[
          { icon: <CloudLightning />, title: 'Instant Updates', desc: 'App Store onayını beklemeden kampanya ekranını değiştirin.' },
          { icon: <LayoutTemplate />, title: 'JSON Driven', desc: 'Arayüz hiyerarşisi backend tarafından bir JSON ağacı olarak gönderilir.' },
          { icon: <Smartphone />, title: 'Native Performance', desc: 'WebView değil, gerçek native bileşenler render edilir.' }
        ]}
      />

      <section style={{ padding: '80px 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
            <h2 className="gradient-text" style={{ fontSize: '3rem', fontWeight: 800 }}>SDUI Döngüsü</h2>
            <p style={{ color: 'var(--text-secondary)' }}>Veriden görsele yolculuk.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem' }}>
             {steps.map((step, idx) => (
               <motion.div 
                 key={idx}
                 className="glass-card"
                 whileHover={{ y: -10 }}
                 style={{ padding: '2rem', borderTop: `4px solid ${activeStep === idx ? '#818cf8' : 'transparent'}`, opacity: activeStep === idx ? 1 : 0.5, cursor: 'pointer' }}
                 onClick={() => setActiveStep(idx)}
               >
                 <div style={{ background: 'rgba(129, 140, 248, 0.1)', width: 'fit-content', padding: '1rem', borderRadius: '12px', color: '#818cf8', marginBottom: '1.5rem' }}>
                   {step.icon}
                 </div>
                 <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'white' }}>{step.title}</h3>
                 <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', minHeight: '60px' }}>{step.desc}</p>
                 {step.code && (
                   <pre style={{ background: '#0f172a', padding: '1rem', borderRadius: '8px', fontSize: '0.8rem', color: '#94a3b8', overflowX: 'auto' }}>
                     {step.code}
                   </pre>
                 )}
                 {step.view && step.view}
               </motion.div>
             ))}
          </div>

          <div style={{ marginTop: '5rem', padding: '3rem', background: 'linear-gradient(90deg, #1e1b4b 0%, #0f172a 100%)', borderRadius: '24px', border: '1px solid #312e81' }}>
             <h3 style={{ fontSize: '2rem', color: 'white', display: 'flex', alignItems: 'center', gap: '1rem' }}>
               <Server color="#818cf8" />
               Frontend Sadece Bir "Ressam"
             </h3>
             <p style={{ fontSize: '1.1rem', color: '#cbd5e1', lineHeight: 1.8, marginTop: '1.5rem', maxWidth: '800px' }}>
               SDUI yaklaşımında Frontend uygulaması artık "ne çizeceğine" karar veren bir mimar değil, kendisine söyleneni çizen yetenekli bir ressamdır. 
               Mimar (karar verici) Backend olur. Bu, business logic'in client tarafında dağılmasını engeller ve tüm kontrolü merkeze çeker.
               Özellikle <strong>A/B Testleri</strong>, <strong>Dynamic Layouts</strong> ve <strong>Kişiselleştirilmiş Arayüzler</strong> için endüstri standardıdır.
             </p>
          </div>

        </div>
      </section>
    </motion.div>
  );
};

export default ServerDrivenUIPage;
