import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, Repeat, Code2, ShieldAlert } from 'lucide-react';

const ArchitecturalTruths = () => {
  return (
    <section style={{ padding: '80px 0', background: 'rgba(239, 68, 68, 0.02)' }}>
      <div className="container">
        <h2 className="section-title" style={{ color: '#ef4444' }}>Mimari Yanılgılar & Gerçekler</h2>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', marginTop: '4rem' }}>
          {/* Accidental Duplication Card */}
          <motion.div 
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            className="glass-card" 
            style={{ 
              padding: '3rem', 
              borderLeft: '5px solid #ef4444',
              background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.05) 0%, transparent 100%)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
              <Repeat size={32} color="#ef4444" />
              <h3 style={{ fontSize: '1.8rem', margin: 0 }}>Rastlantısal Tekrar <br/><span style={{ fontSize: '1rem', opacity: 0.6 }}>(Accidental Duplication)</span></h3>
            </div>
            
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, fontSize: '1.1rem' }}>
              Clean Architecture daki en büyük tuzaklardan biridir. İki farklı katmandaki kodun 
              <strong> tamamen aynı görünmesi</strong>, onların "aynı şey" olduğu anlamına gelmez.
            </p>

            <div style={{ 
              marginTop: '2rem', 
              padding: '1.5rem', 
              background: 'rgba(0,0,0,0.2)', 
              borderRadius: '15px', 
              border: '1px dashed rgba(239,68,68,0.3)' 
            }}>
              <h4 style={{ color: '#ef4444', marginBottom: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <ShieldAlert size={18} /> Mimari Kural:
              </h4>
              <p style={{ fontSize: '0.9rem', fontStyle: 'italic', opacity: 0.9 }}>
                "Eğer iki kod yapısı farklı sebeplerle değişiyorsa, onlar aynı değildir. Onları birleştirmek (DRY yapmak) katmanlar arası sıkı bağımlılık (coupling) yaratır."
              </p>
            </div>

            <div style={{ marginTop: '2rem', opacity: 0.7, fontSize: '0.85rem' }}>
              <strong>Örnek:</strong> Database Entity ile Web Response un aynı alanlara sahip olması. Birleşirlerse; DB değiştiğinde UI, UI değiştiğinde DB bozulur.
            </div>
          </motion.div>

          {/* Premature DRY Card */}
          <motion.div 
            initial={{ x: 50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            className="glass-card" 
            style={{ 
              padding: '3rem', 
              borderLeft: '5px solid #3b82f6',
              background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.05) 0%, transparent 100%)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
              <Code2 size={32} color="#3b82f6" />
              <h3 style={{ fontSize: '1.8rem', margin: 0 }}>DRY vs Decoupling</h3>
            </div>
            
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, fontSize: '1.1rem' }}>
              Yeni başlayanlar <strong>DRY</strong> (Don't Repeat Yourself) prensibini kutsal sayar. 
              Ancak kıdemli bir mimar bilir ki:
            </p>

            <div style={{ 
                marginTop: '2rem', 
                fontSize: '1.3rem', 
                fontWeight: 800, 
                textAlign: 'center',
                color: '#3b82f6',
                padding: '2rem',
                border: '1px solid rgba(59, 130, 246, 0.2)',
                borderRadius: '20px'
            }}>
              "Bağımlılıktan kurtulmak, <br/> kod tekrarından kurtulmaktan <br/> daha ucuzdur."
            </div>
            
            <p style={{ marginTop: '2rem', fontSize: '0.9rem', opacity: 0.7 }}>
              Her katmanın kendi modelini (DTO) kullanması, sistemin esnekliğini garanti altına alır.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ArchitecturalTruths;
