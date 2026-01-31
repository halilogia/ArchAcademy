import React from 'react';
import { motion } from 'framer-motion';
import { Grid, Monitor, LayoutDashboard, AppWindow, Share2, Layers, Cpu, ShieldCheck } from 'lucide-react';
import ArchHero from '../components/ArchHero';

const CompositeUIPage = () => {
  const illustration = (
    <div style={{ position: 'relative', width: '400px', height: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {/* Central Shell */}
      <motion.div
        animate={{ scale: [1, 1.02, 1] }}
        transition={{ duration: 4, repeat: Infinity }}
        style={{
          width: '280px',
          height: '220px',
          background: 'rgba(139, 92, 246, 0.05)',
          border: '2px solid rgba(139, 92, 246, 0.4)',
          borderRadius: '20px',
          position: 'relative',
          overflow: 'hidden',
          zIndex: 5,
          backdropFilter: 'blur(5px)'
        }}
      >
        {/* Skeleton Grid Inside Shell */}
        <div style={{ padding: '15px', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', height: '100%' }}>
            <div style={{ gridColumn: 'span 3', height: '30px', background: 'rgba(255,255,255,0.05)', borderRadius: '6px' }} />
            <div style={{ gridColumn: 'span 1', height: '120px', background: 'rgba(255,255,255,0.03)', borderRadius: '6px' }} />
            <div style={{ gridColumn: 'span 2', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ height: '55px', background: 'rgba(255,255,255,0.03)', borderRadius: '6px' }} />
                <div style={{ height: '55px', background: 'rgba(255,255,255,0.03)', borderRadius: '6px' }} />
            </div>
        </div>

        {/* Dynamic Snap Slots Overlay */}
        <div style={{ position: 'absolute', inset: 0, padding: '15px', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
             <div style={{ gridColumn: 'span 3', height: '30px' }} />
             {/* Matching slots for the flying fragments */}
             <div id="slot-1" style={{ position: 'relative' }} />
             <div style={{ gridColumn: 'span 2', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div id="slot-2" style={{ position: 'relative' }} />
                <div id="slot-3" style={{ position: 'relative' }} />
             </div>
        </div>
      </motion.div>

      {/* External Fragments (Sources) Flying In */}
      {[
        { id: 1, color: '#a78bfa', x: -180, y: 50, delay: 0, label: 'Auth Service' },
        { id: 2, color: '#8b5cf6', x: 180, y: -80, delay: 0.8, label: 'Stock App' },
        { id: 3, color: '#c084fc', x: 150, y: 120, delay: 1.6, label: 'Chat UI' }
      ].map((fragment, i) => (
        <React.Fragment key={fragment.id}>
            {/* Trail Line */}
            <motion.div
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: [0, 0.2, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: fragment.delay }}
                style={{
                    position: 'absolute',
                    width: '150px',
                    height: '2px',
                    background: `linear-gradient(to right, ${fragment.color}, transparent)`,
                    left: fragment.x > 0 ? '50%' : 'auto',
                    right: fragment.x < 0 ? '50%' : 'auto',
                    top: '50%',
                    transform: `translate(${fragment.x/2}px, ${fragment.y/2}px) rotate(${fragment.x > 0 ? 0 : 180}deg)`,
                    zIndex: 1
                }}
            />

            {/* The Fragment */}
            <motion.div
                initial={{ x: fragment.x, y: fragment.y, opacity: 0, scale: 0.5 }}
                animate={{ 
                    x: [fragment.x, i === 0 ? -60 : (i === 1 ? 60 : 60)], 
                    y: [fragment.y, i === 0 ? 30 : (i === 1 ? -15 : 50)], 
                    opacity: [0, 1, 1, 0],
                    scale: [0.5, 1, 1, 0.8]
                }}
                transition={{ duration: 3, repeat: Infinity, delay: fragment.delay }}
                style={{
                    position: 'absolute',
                    padding: '8px 12px',
                    background: '#0f172a',
                    border: `2px solid ${fragment.color}`,
                    borderRadius: '8px',
                    color: 'white',
                    fontSize: '0.6rem',
                    fontWeight: 900,
                    zIndex: 10,
                    boxShadow: `0 0 20px ${fragment.color}44`,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '5px'
                }}
            >
                <Cpu size={12} color={fragment.color} />
                {fragment.label}
            </motion.div>
        </React.Fragment>
      ))}

      {/* Floating Description */}
      <motion.div
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 3, repeat: Infinity }}
        style={{
            position: 'absolute', bottom: '40px', left: '50%', transform: 'translateX(-50%)',
            color: 'rgba(255,255,255,0.4)', fontSize: '0.75rem', letterSpacing: '2px', fontWeight: 800
        }}
      >
        RUNTIME COMPOSITION
      </motion.div>
    </div>
  );

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ background: '#020617', minHeight: '100vh', paddingBottom: '100px' }}>
      <ArchHero 
        title="Composite UI"
        subtitle="The Fusion Shell"
        description="Farklı ekipler tarafından geliştirilen ve farklı sunucularda yaşayan arayüz parçalarının (Micro-Frontends), bir ana kabuk (Shell) içinde dikişsiz birleşmesi."
        badge="Enterprise Architecture"
        color="#8b5cf6"
        illustration={illustration}
        features={[
          { icon: <LayoutDashboard />, title: 'Shell Application', desc: 'Uygulamanın ana iskeletidir. Navigation ve Shared State gibi ortak servisleri sağlar.' },
          { icon: <Share2 />, title: 'Fragments', desc: 'Kendi başına çalışan küçük UI adacıklarıdır. Bir dashboard kartı veya tam bir sayfa olabilir.' },
          { icon: <Grid />, title: 'Runtime Integration', desc: 'Bileşenler build-time yerine, uygulama çalışırken (JS/Module Federation) yüklenir.' }
        ]}
      >
        <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
          <div style={{ background: 'rgba(139, 92, 246, 0.1)', padding: '12px 24px', borderRadius: '14px', border: '1px solid rgba(139, 92, 246, 0.2)', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <AppWindow size={18} color="#8b5cf6" />
            <span style={{ fontSize: '0.9rem', fontWeight: 700, color: 'white' }}>Federated Modules Ready</span>
          </div>
        </div>
      </ArchHero>

      <div className="container" style={{ marginTop: '4rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem' }}>
          <div className="glass-card" style={{ borderLeft: '4px solid #8b5cf6' }}>
            <h3 style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1.5rem', color: '#c084fc' }}>
              <Layers /> Micro-Frontends İlişkisi
            </h3>
            <p style={{ color: '#94a3b8', lineHeight: 1.7 }}>
              Composite UI, aslında Micro-Frontends mimarisinin görsel ve yapısal karşılığıdır. Backend'deki mikroservislerin kullanıcı arayüzündeki izdüşümü olarak düşünülebilir. Her ekip kendi parçasından sorumludur.
            </p>
          </div>
          <div className="glass-card" style={{ borderLeft: '4px solid #8b5cf6' }}>
            <h3 style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1.5rem', color: '#c084fc' }}>
              <ShieldCheck /> Sorumluluk Ayrımı
            </h3>
            <p style={{ color: '#94a3b8', lineHeight: 1.7 }}>
              Ana kabuk (Shell) uygulaması, parçaların birbirini bozmasını önler. Güvenlik, Kimlik Doğrulama ve Loglama gibi "Cross-cutting" sorumluluklar Shell'de toplanır.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CompositeUIPage;
