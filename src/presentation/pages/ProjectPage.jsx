import React from 'react';
import { motion } from 'framer-motion';
import ProjectHero from '../components/ProjectHero';
import ProjectStructure from '../components/ProjectStructure';
import ProjectDependency from '../components/ProjectDependency';
import ProjectTechStack from '../components/ProjectTechStack';
import ProjectDecisionRecords from '../components/ProjectDecisionRecords';

const ProjectPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{ background: 'var(--bg-dark)' }}
    >
      <ProjectHero />
      
      {/* The Why behind the What */}
      <ProjectDecisionRecords />
      
      {/* Visualizing the logical flow */}
      <ProjectDependency />
      
      {/* Deep dive into folders and code */}
      <ProjectStructure />
      
      {/* Detailed Manifesto / Q&A Section */}
      <section style={{ padding: '100px 0', borderTop: '1px solid var(--glass-border)', background: 'rgba(0,0,0,0.2)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
             <h2 className="gradient-text" style={{ fontSize: '3rem', fontWeight: 800 }}>Architect's Manifesto</h2>
             <p style={{ color: 'var(--text-secondary)' }}>Bu projenin arkasındaki stratejik kararlar ve tasarım felsefesi.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '3rem' }}>
             <div className="glass-card" style={{ padding: '3rem' }}>
                <h3 style={{ color: 'var(--primary)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                   <div style={{ padding: '8px', background: 'rgba(59, 130, 246, 0.1)', borderRadius: '10px' }}>01</div>
                   Presentation Dominance
                </h3>
                <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8 }}>
                   Normal bir kurumsal projede iş mantığı (Domain) çok yer kaplar. Ancak bu proje bir <strong>Eğitim Portalı</strong> olduğu için "Öğretme" eyleminin kendisi bir UI sorumluluğudur. 
                   Architecture Wizard ve Code Surgery gibi interaktif araçlar, kompleks birer <strong>Visual Use Case</strong> örneğidir. 
                   Presentation katmanının büyük olması, projenin görsel ve eğitici gücünü temsil eder.
                </p>
             </div>

             <div className="glass-card" style={{ padding: '3rem' }}>
                <h3 style={{ color: '#f59e0b', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                   <div style={{ padding: '8px', background: 'rgba(245, 158, 11, 0.1)', borderRadius: '10px' }}>02</div>
                   The Context Hub
                </h3>
                <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8 }}>
                   <code>context</code> klasörünün kök dizinde bağımsız olması tesadüf değildir. İlerleme durumu (Progress), 
                   uygulamanın tüm katmanlarını enine kesen bir <strong>Global State</strong>'tir. 
                   Onu Presentation içine hapsetmek, veri akışını kısıtlamak olurdu. 
                   Bu yapı sayesinde, yarın bir mobil app (Infrastructure) eklediğimizde bile ProgressContext merkezi bir noktada kalmaya devam eder.
                </p>
             </div>

             <div className="glass-card" style={{ padding: '3rem' }}>
                <h3 style={{ color: '#10b981', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                   <div style={{ padding: '8px', background: 'rgba(16, 185, 129, 0.1)', borderRadius: '10px' }}>03</div>
                   Persistent Memory
                </h3>
                <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8 }}>
                   Kullanıcı deneyimi (UX), süreklilik gerektirir. <code>localStorage</code> entegrasyonu, Infrastructure katmanında yaşayan bir detaydır. 
                   ProgressContext bu detayı kullanarak, Domain kurallarına (x dersi bitti mi?) cevap verir. 
                   Böylece kullanıcı sayfayı yenilese de, başarısı "ölümsüz" kalır.
                </p>
             </div>

             <div className="glass-card" style={{ padding: '3rem' }}>
                <h3 style={{ color: '#a855f7', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                   <div style={{ padding: '8px', background: 'rgba(168, 85, 247, 0.1)', borderRadius: '10px' }}>04</div>
                   Scalability Vision
                </h3>
                <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8 }}>
                   Şu an static verilerle çalışıyoruz. Ancak projemiz yarın binlerce kullanıcıya hizmet veren bir 
                   <strong>SaaS</strong> ürününe dönüştüğünde, sadece Infrastructure katmanındaki Repository'leri 
                   API çağrılarıyla değiştirerek tüm sistemi saniyeler içinde upgrade edebiliriz. 
                   İşte Clean Architecture'ın gerçek gücü budur.
                </p>
             </div>
          </div>
        </div>
      </section>

      <ProjectTechStack />

      <section style={{ padding: '100px 0', textAlign: 'center' }}>
        <div className="container">
          <div className="glass-card" style={{ 
            background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.05) 0%, rgba(37, 99, 235, 0.1) 100%)',
            padding: '5rem'
          }}>
            <h2 style={{ marginBottom: '1.5rem', fontSize: '2.5rem' }}>Architect's Conclusion</h2>
            <p style={{ maxWidth: '850px', margin: '0 auto', color: 'var(--text-secondary)', lineHeight: 2, fontSize: '1.1rem' }}>
              Bu portal, yazılım mimarisinin sadece bir "teori" değil, yaşayan, nefes alan ve her satırında 
              disiplin barındıran bir "sanat" olduğunun kanıtıdır. 
              <strong>ArchAcademy</strong>, kendi mimari kurallarını bizzat kendi bünyesinde uygulayarak 
              sektöre örnek bir referans teşkil etmek üzere tasarlanmıştır.
            </p>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default ProjectPage;
