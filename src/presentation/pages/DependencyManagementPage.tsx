import React from 'react';
import { motion } from 'framer-motion';
import ArchHero from '../components/ArchHero';
import { 
  Network, 
  ArrowDownUp, 
  Boxes, 
  Share2, 
  Unplug 
} from 'lucide-react';

const DependencyManagementPage = () => {
    const illu = (
        <div style={{ position: 'relative', width: '300px', height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {/* Central Node */}
            <motion.div 
               animate={{ scale: [1, 1.1, 1] }}
               transition={{ duration: 3, repeat: Infinity }}
               style={{ width: '80px', height: '80px', borderRadius: '50%', background: '#60a5fa', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10, boxShadow: '0 0 30px rgba(96, 165, 250, 0.4)' }}
            >
                <Boxes size={40} color="white" />
            </motion.div>

            {/* Orbiting Dependencies */}
            {[0, 1, 2, 3].map((i) => (
                <motion.div
                    key={i}
                    animate={{ rotate: 360 }}
                    transition={{ duration: 10 + i * 2, repeat: Infinity, ease: "linear" }}
                    style={{ position: 'absolute', width: '100%', height: '100%' }}
                >
                    <div style={{ 
                        position: 'absolute', 
                        top: '50%', 
                        left: `${80 + i * 30}px`, 
                        width: '40px', height: '40px', 
                        background: 'rgba(255,255,255,0.1)', 
                        borderRadius: '50%',
                        border: '1px solid rgba(96, 165, 250, 0.3)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center'
                    }}>
                        <Unplug size={16} color="#93c5fd" />
                    </div>
                </motion.div>
            ))}
        </div>
    );

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <ArchHero 
        title="Dependency Management"
        subtitle="Architectural Strategy"
        description="Yazılımda neyin neye bağlı olduğunu kontrol edemezseniz, sisteminiz bir spagettiye dönüşür. Bağımlılıkları yönetmek, mimarinin anahtarıdır."
        badge="Coupling Control"
        color="#60a5fa"
        illustration={illu}
        features={[
          { icon: <ArrowDownUp />, title: 'Inversion of Control', desc: 'Bağımlılıkları somut sınıflara değil, soyutlamalara (interface) yapın.' },
          { icon: <Network />, title: 'Acyclic Dependencies', desc: 'Döngüsel bağımlılıklar (A -> B -> A) sistemin kanseridir.' },
          { icon: <Share2 />, title: 'Stable Dependencies', desc: 'Değişken modüller, kararlı modüllere bağımlı olmalıdır (SDP).' }
        ]}
      />

      {/* Content */}
      <section className="section-padding">
        <div className="container">
           <div className="glass-card" style={{ padding: '3rem' }}>
              <h2 className="gradient-text" style={{ fontSize: '2rem', marginBottom: '2rem' }}>Neden Önemli?</h2>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                 <div>
                    <h3 style={{ color: '#fff', marginBottom: '1rem' }}>Sıkı Bağlılık (Tight Coupling)</h3>
                    <p style={{ color: '#94a3b8', lineHeight: 1.6 }}>
                       Bir sınıfta yaptığınız değişiklik, zincirleme olarak 10 farklı sınıfı bozuyorsa, bağımlılıklarınız yönetilmiyordur.
                       Bu durum "Shotgun Surgery" anti-pattern'ine yol açar.
                    </p>
                 </div>
                 <div>
                    <h3 style={{ color: '#fff', marginBottom: '1rem' }}>Çözüm: Dependency Injection</h3>
                    <p style={{ color: '#94a3b8', lineHeight: 1.6 }}>
                       Nesnelerin ihtiyaçlarını (dependencies) içeride `new` ile oluşturmak yerine, dışarıdan (constructor) almasını sağlayın.
                       Bu, kodu test edilebilir ve esnek kılar.
                    </p>
                 </div>
              </div>
           </div>
        </div>
      </section>

       {/* Reference Section */}
      <section style={{ padding: '4rem 0', background: 'rgba(0,0,0,0.3)', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <div className="container" style={{ textAlign: 'center' }}>
           <div style={{ 
             background: 'linear-gradient(180deg, rgba(15, 23, 42, 0) 0%, rgba(15, 23, 42, 0.5) 100%)', 
             padding: '3rem', 
             borderRadius: '24px', 
             border: '1px solid rgba(255,255,255,0.05)',
             maxWidth: '900px',
             margin: '0 auto'
           }}>
              <div style={{ fontSize: '0.8rem', letterSpacing: '2px', fontWeight: 800, color: 'rgba(255,255,255,0.4)', marginBottom: '1rem', textTransform: 'uppercase' }}>
                Definitive Guide
              </div>
              <p style={{ color: '#94a3b8', marginBottom: '2rem', fontSize: '1.1rem', lineHeight: 1.6 }}>
                Uncle Bob'un "Stable Dependencies Principle" (SDP) ve paket yönetimi konusundaki makaleleri bu konunun temelidir.
              </p>
              
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                 <a 
                   href="http://butunclebob.com/ArticleS.UncleBob.PrinciplesOfOod" 
                   target="_blank" 
                   rel="noopener noreferrer"
                   style={{ 
                     display: 'flex', alignItems: 'center', gap: '8px', 
                     background: 'rgba(96, 165, 250, 0.15)', color: '#93c5fd', 
                     padding: '12px 24px', borderRadius: '12px', textDecoration: 'none', fontWeight: 600,
                     border: '1px solid rgba(96, 165, 250, 0.2)', transition: 'all 0.2s'
                   }}
                 >
                    Package Principles (Uncle Bob) <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                 </a>
              </div>
           </div>
        </div>
      </section>

    </motion.div>
  );
};

export default DependencyManagementPage;
