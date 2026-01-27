  import React from 'react';
import { motion } from 'framer-motion';
import { 
  Layers, 
  ShieldCheck, 
  Unlink, 
  GitMerge, 
  FastForward,
  Info,
  ChevronRight
} from 'lucide-react';

interface WhyLayeredProps {
  title?: React.ReactNode;
  description?: string;
  badge?: string;
}

const WhyLayered: React.FC<WhyLayeredProps> = ({ 
  title = <>Google Neden Katmanlı <br/><span className="gradient-text">Yapıyı Öneriyor?</span></>,
  description = "Google'ın Flutter rehberi, karma (hybrid) bir yapıyı savunur ama temelde Katmanlı (Layered) disiplini merkeze alır. Bu, uygulamanın 'birbirine çarpan özellikler' yığını olmasını engeller.",
  badge = "NEDEN LAYERED-FIRST?"
}) => {
  const reasons = [
    {
      title: "Bilişsel Yükü Azaltır (Cognitive Load)",
      desc: "Her katmanın sorumluluğu bellidir. Bir hata çıktığında nereye bakacağınızı bilirsiniz: UI hatasıysa View/ViewModel, veri hatasıysa Repository.",
      icon: <Layers color="#10b981" />
    },
    {
      title: "Global Paylaşım (Shared State)",
      desc: "Örneğin 'Kullanıcı Verisi' (UserRepository) 10 farklı feature tarafından kullanılır. Eğer feature-based içinde boğulursa, her yerden her yere import çekilir. Layered yapı buna bir 'düzen' getirir.",
      icon: <GitMerge color="#3b82f6" />
    },
    {
      title: "Bağımsız Test Edilebilirlik",
      desc: "ViewModel'i test ederken gerçek bir veritabanına ihtiyacınız olmaz. Sadece alt katmanı (Repository) 'mock'larsınız. Bu hız ve güvenlik sağlar.",
      icon: <ShieldCheck color="#ec4899" />
    }
  ];

  return (
    <section style={{ padding: '80px 0', background: 'rgba(255,255,255,0.01)' }}>
      <div className="container">
        <div style={{ display: 'flex', gap: '4rem', alignItems: 'center', flexWrap: 'wrap' }}>
          
          <div style={{ flex: '1', minWidth: '300px' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '8px 16px', background: 'rgba(16, 185, 129, 0.1)', borderRadius: '100px', color: '#10b981', fontSize: '0.8rem', fontWeight: 700, marginBottom: '1.5rem' }}>
               <Info size={16} /> {badge}
            </div>
            <h2 style={{ fontSize: '2.2rem', fontWeight: 900, marginBottom: '1.5rem', lineHeight: 1.2 }}>
               {title}
            </h2>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '2rem' }}>
              {description}
            </p>
            
            <div className="glass-card" style={{ background: 'rgba(236, 72, 153, 0.05)', border: '1px solid rgba(236, 72, 153, 0.1)' }}>
               <div style={{ display: 'flex', gap: '15px' }}>
                  <div style={{ background: '#ec4899', width: '40px', height: '40px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                     <Unlink color="white" size={20} />
                  </div>
                  <div>
                     <h4 style={{ marginBottom: '5px' }}>De-coupling (Bağlantısızlık)</h4>
                     <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                        Üst katman (UI), alt katmanın (Data) nasıl çalıştığını bilmez. Sadece arayüzü (Interface) kullanır. Bu sayede veritabanı değişse bile UI bozulmaz.
                     </p>
                  </div>
               </div>
            </div>
          </div>

          <div style={{ flex: '1', minWidth: '300px', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {reasons.map((r, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="glass-card" 
                style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}
              >
                <div style={{ background: 'rgba(255,255,255,0.05)', padding: '12px', borderRadius: '12px' }}>
                   {r.icon}
                </div>
                <div>
                   <h4 style={{ fontWeight: 800, marginBottom: '8px' }}>{r.title}</h4>
                   <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>{r.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default WhyLayered;
