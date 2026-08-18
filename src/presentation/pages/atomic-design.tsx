import { useTranslation } from 'react-i18next';
import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Layers, Box, Layout, FileText, ChevronRight } from 'lucide-react';
import ArchHero from '../components/ArchHero';


const AtomicDesignPage = () => {
  const { i18n } = useTranslation();
  const isEn = (i18n.resolvedLanguage || i18n.language || 'tr').startsWith('en');
  const levels = [
    { 
      title: 'Atoms', 
      icon: <Sparkles size={40} />, 
      color: '#f97316', 
      desc: 'En küçük yapı taşları: Butonlar, inputlar, renk paleti ve tipografi. Tek başlarına bir işlevleri yoktur.' 
    },
    { 
      title: 'Molecules', 
      icon: <Box size={40} />, 
      color: '#fb923c', 
      desc: 'Atomların birleşimi: Bir label, bir input ve bir butonun birleşerek oluşturduğu "Arama Çubuğu".' 
    },
    { 
      title: 'Organisms', 
      icon: <Layers size={40} />, 
      color: '#fdba74', 
      desc: 'Moleküllerin birleşimi: Header, Footer veya bir Product Card gibi kompleks ve bağımsız yapılar.' 
    },
    { 
      title: 'Templates', 
      icon: <Layout size={40} />, 
      color: '#fed7aa', 
      desc: 'Sayfa iskeletleri: İçeriğin henüz olmadığı, sadece yerleşimin (layout) belirlendiği yapılar.' 
    },
    { 
      title: 'Pages', 
      icon: <FileText size={40} />, 
      color: '#ffedd5', 
      desc: 'Son ürün: Gerçek verilerin template içine giydirildiği, kullanıcının gördüğü final arayüz.' 
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
        title="Atomic"
        subtitle="Design"
        description="Arayüz dünyasının periyodik cetveli. Karmaşık UI yapılarını hiyerarşik ve yönetilebilir küçük parçalara bölme sanatı."
        badge="Frontend Architecture"
        color="#f97316"
        illustration={
          <div style={{ position: 'relative', width: '300px', height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <motion.div
              animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 4, repeat: Infinity }}
              style={{ position: 'absolute', width: '100%', height: '100%', borderRadius: '50%', background: 'radial-gradient(circle, #f9731633 0%, transparent 70%)' }}
            />
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
              {[1, 2, 3, 4].map(i => (
                <motion.div 
                  key={i}
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 2, delay: i * 0.2, repeat: Infinity }}
                  style={{ width: '40px', height: '40px', background: '#f97316', borderRadius: '8px', boxShadow: '0 0 20px #f9731666' }} 
                />
              ))}
            </div>
          </div>
        }
        features={[
          { icon: <Sparkles />, title: 'Scalability', desc: 'Büyüyen projelerde bileşen karmaşasını önler ve düzeni korur.' },
          { icon: <Layers />, title: 'Reusability', desc: 'Bir kez yazılan atomlar tüm projede tutarlı bir şekilde kullanılır.' },
          { icon: <Layout />, title: 'Design System', desc: 'Tasarımcı ve yazılımcı arasında ortak bir dil oluşturur.' }
        ]}
      />

      <section style={{ padding: '100px 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
            <h2 className="gradient-text" style={{ fontSize: '3rem', fontWeight: 800 }}>Hiyerarşik Akış</h2>
            <p style={{ color: 'var(--text-secondary)' }}>Küçük parçalardan devasa sistemlere giden yolculuk.</p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {levels.map((level, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="glass-card"
                style={{ 
                  display: 'grid', 
                  gridTemplateColumns: '120px 1fr auto', 
                  alignItems: 'center', 
                  gap: '2rem',
                  padding: '2.5rem',
                  borderLeft: `6px solid ${level.color}`
                }}
              >
                <div style={{ color: level.color }}>{level.icon}</div>
                <div>
                  <h3 style={{ fontSize: '1.8rem', marginBottom: '0.5rem', color: 'white' }}>{level.title}</h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: 1.6 }}>{level.desc}</p>
                </div>
                {i < levels.length - 1 && <ChevronRight size={32} color="var(--text-secondary)" style={{ opacity: 0.3 }} />}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: '100px 0', background: 'rgba(249, 115, 22, 0.05)' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <div className="glass-card" style={{ maxWidth: '900px', margin: '0 auto', padding: '4rem' }}>
            <h3 style={{ fontSize: '2.2rem', marginBottom: '1.5rem' }}>Neden Atomic Design?</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: 1.8 }}>
              Clean Architecture'da veriyi ve mantığı nasıl izole ediyorsak, Atomic Design'da da arayüzü öyle izole ediyoruz. 
              Bir **Atom** asla bir **Organizma**'nın nasıl görüneceğini bilmez. Bu sayede bir butonu değiştirdiğinizde tüm projeniz tıkır tıkır, 
              hiçbir şey bozulmadan güncellenir. Bu, Frontend dünyasının sarsılmaz disiplinidir. 🏗️✨
            </p>
          </div>
        </div>
      </section>

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
                Full Book (Open Source)
              </div>
              <p style={{ color: '#94a3b8', marginBottom: '2rem', fontSize: '1.1rem', lineHeight: 1.6 }}>
                Atomic Design metodolojisi, Brad Frost tarafından geliştirilmiş ve tüm dünyaya ücretsiz bir e-kitap olarak sunulmuştur.
              </p>
              
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                 <a 
                   href="https://atomicdesign.bradfrost.com/table-of-contents/" 
                   target="_blank" 
                   rel="noopener noreferrer"
                   style={{ 
                     display: 'flex', alignItems: 'center', gap: '8px', 
                     background: 'rgba(249, 115, 22, 0.15)', color: '#fb923c', 
                     padding: '12px 24px', borderRadius: '12px', textDecoration: 'none', fontWeight: 600,
                     border: '1px solid rgba(249, 115, 22, 0.2)', transition: 'all 0.2s'
                   }}
                 >
                    Read the Book <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                 </a>
              </div>
           </div>
        </div>
      </section>
    </motion.div>
  );
};

export default AtomicDesignPage;
