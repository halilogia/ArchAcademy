import React from 'react';
import { motion } from 'framer-motion';
import ArchHero from '../components/ArchHero';
import { Package, GitBranch, Target, Shield, Zap, BookOpen, Cpu, MessageSquare } from 'lucide-react';

const ObjectOrientedPage = () => {
  const illu = (
    <div style={{ position: 'relative', width: '300px', height: '300px' }}>
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          animate={{ 
            rotate: i * 120 + 360,
            y: [0, -20, 0]
          }}
          transition={{ 
            rotate: { duration: 10, repeat: Infinity, ease: "linear" },
            y: { duration: 3, repeat: Infinity, ease: "easeInOut", delay: i * 0.5 }
          }}
          style={{
            position: 'absolute',
            width: '100px',
            height: '100px',
            background: 'var(--glass)',
            border: '2px solid #059669',
            borderRadius: '24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            top: '50%',
            left: '50%',
            marginTop: '-50px',
            marginLeft: '-50px',
            transformOrigin: '150px 150px',
            boxShadow: '0 0 30px rgba(5, 150, 105, 0.2)'
          }}
        >
          <Package size={40} color="#10b981" />
        </motion.div>
      ))}
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '150px', height: '150px', background: 'radial-gradient(circle, #10b98133 0%, transparent 70%)', zIndex: -1 }} />
    </div>
  );

  const pillars = [
    { title: 'Encapsulation', icon: <Shield />, color: '#10b981', desc: 'Veriyi ve o veriyi işleyen metodları tek bir "kapsül" içine hapsedin. Dış dünya sadece izin verdiğiniz arayüzden (Interface) içeri bakabilsin.' },
    { title: 'Abstraction', icon: <Cpu />, color: '#3b82f6', desc: 'Gereksiz detayları gizleyip sadece objenin "ne yapabildiğine" odaklanın. Motorun içindeki dişlileri değil, kontağın nasıl çalıştığını gösterin.' },
    { title: 'Inheritance', icon: <GitBranch />, color: '#a855f7', desc: 'Mevcut bir objenin özelliklerini miras (Inheritance) alarak yeni yapılar kurun. Kod tekrarını öldürün, hiyerarşiyi canlandırın.' },
    { title: 'Polymorphism', icon: <Target />, color: '#f59e0b', desc: 'Farklı objelerin aynı mesaja (Method Call) kendilerine has cevaplar vermesini sağlayın. Tek bir kumanda ile tüm cihazları yönetin.' }
  ];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ background: '#020617', minHeight: '100vh', color: 'white' }}>
      <ArchHero 
        title="Object-Oriented"
        subtitle="Architecture"
        description="Kaosu nesnelerle evcilleştirin. OOP, sadece kod yazma biçimi değil; karmaşık sistemleri birbiriyle mesajlaşan, bağımsız atomik birimler (Objects) olarak görme felsefesidir."
        badge="Modular Mastery"
        color="#10b981"
        illustration={illu}
        features={[
          { icon: <Package />, title: 'State & Behavior', desc: 'Veri ve mantığı birbirinden asla ayırmayın.' },
          { icon: <MessageSquare />, title: 'Inter-Object Messaging', desc: 'Objeler birbirlerine sadece metodlarla dokunabilir.' },
          { icon: <BookOpen />, title: 'SOLID Standards', desc: 'Sürdürülebilir büyüme için sarsılmaz kurallar.' }
        ]}
      />

      {/* The 4 Pillars Section */}
      <section style={{ padding: '100px 0', borderTop: '1px solid var(--glass-border)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
            <h2 className="gradient-text" style={{ fontSize: '3rem', fontWeight: 900 }}>OOP'nin 4 Temel Direği</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem' }}>Daha sağlam yapılar kurmak için bu temel yasaları takip edin.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '2.5rem' }}>
            {pillars.map((pillar, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="glass-card"
                style={{ padding: '3rem', borderLeft: `4px solid ${pillar.color}` }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '1.5rem' }}>
                  <div style={{ padding: '12px', background: `${pillar.color}22`, borderRadius: '15px', color: pillar.color }}>
                    {pillar.icon}
                  </div>
                  <h3 style={{ fontSize: '1.8rem', fontWeight: 800 }}>{pillar.title}</h3>
                </div>
                <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: 1.8 }}>{pillar.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Code vs Real-World Section */}
      <section style={{ padding: '100px 0', background: 'rgba(255,255,255,0.02)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '4rem', alignItems: 'center' }}>
            <div>
              <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem', fontWeight: 800 }}>Gerçek Dünyayı Kodlamak</h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: 2, marginBottom: '2rem' }}>
                OOP'nin asıl gücü, soyut algoritmalar yerine gerçek dünya problemlerini nesneleştirmektir. 
                Bir "Banka Hesabı" sadece bir sayı değil; limitleri olan, transfer yeteneği bulunan ve güvenliği kendi içinde sağlayan yaşayan bir varlıktır.
              </p>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <div className="glass-card" style={{ padding: '1.5rem', flex: 1 }}>
                   <Zap style={{ color: '#10b981', marginBottom: '0.5rem' }} />
                   <h4>Modularity</h4>
                   <p style={{ fontSize: '0.9rem', opacity: 0.7 }}>Hataları tek bir objeye hapsedin.</p>
                </div>
                <div className="glass-card" style={{ padding: '1.5rem', flex: 1 }}>
                   <GitBranch style={{ color: '#10b981', marginBottom: '0.5rem' }} />
                   <h4>Reusability</h4>
                   <p style={{ fontSize: '0.9rem', opacity: 0.7 }}>Tekerleği her seferinde yeniden icat etmeyin.</p>
                </div>
              </div>
            </div>
            <div className="glass-card" style={{ padding: '2.5rem', position: 'relative', overflow: 'hidden' }}>
               <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '4px', background: 'linear-gradient(to right, #10b981, transparent)' }} />
               <pre style={{ fontSize: '0.9rem', color: '#10b981', lineHeight: 1.6 }}>
{`class PaymentAccount {
  private _balance: number;

  constructor(initial: number) {
    this._balance = initial;
  }

  public withdraw(amount: number) {
    if (this.canWithdraw(amount)) {
      this._balance -= amount;
      this.triggerSecurityAudit();
    }
  }

  private canWithdraw(a: number) {
    return this._balance >= a;
  }
}`}
               </pre>
            </div>
          </div>
        </div>
      </section>

      {/* SOLID Footer */}
      <section style={{ padding: '100px 0', textAlign: 'center' }}>
        <div className="container">
          <div className="glass-card" style={{ padding: '5rem', background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.05) 0%, rgba(5, 150, 105, 0.1) 100%)' }}>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>Ekmek ve Tuz: SOLID Prensipleri</h2>
            <p style={{ maxWidth: '800px', margin: '0 auto 3rem', color: 'var(--text-secondary)', fontSize: '1.2rem', lineHeight: 1.8 }}>
              OOP mimarisinin ayakta kalmasını sağlayan şey sınıflar değil, sınıflar arası disiplindir. 
              SOLID prensipleri, bu disiplinin anayasasıdır.
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
               {['S.R.P', 'O.C.P', 'L.S.P', 'I.S.P', 'D.I.P'].map(p => (
                 <div key={p} style={{ width: '80px', height: '80px', borderRadius: '50%', background: '#10b981', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, boxShadow: '0 10px 20px rgba(16, 185, 129, 0.3)' }}>
                    {p}
                 </div>
               ))}
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default ObjectOrientedPage;
