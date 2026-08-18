We need answer user. Need translate Turkish software architecture component content into English. But user provided entire TSX file with Turkish texts in UI strings, comments. Need preserve code, syntax, technical terms. Output only clean valid TSX no markdown backtick wrapping unless requested? User asks translate content. Need output likely full file translated. Need follow caveman style? The system has strict technical rules and also caveman style instructions? Need parse. User message: "Translate following software architecture component content into English: FILE: orchestration.tsx CONTENT: ..." Need produce translated file. System says "Respond like terse caveman. All technical substance stay exact, only fluff die..." That style for responses, but here need entire file translation. Conflict? Need maintain terse? Probably not narrate. Need output translated code only, no markdown? The instructions: "OUTPUT FORMAT: Output ONLY clean, valid TypeScript / code as requested, with NO markdown backtick wrapping unless specifically requested." So we should output file content without backticks. Need translate Turkish UI strings and comments to American English. Preserve all code, JSX, imports, components, motion, style, classNames, URLs. Need translate Turkish sentences:
- ArchHero description: "Merkezi bir yönetici (orchestrator) tarafından kontrol edilen servis akışları. Süreçlerin tam denetim ve görünürlük altında olduğu, karmaşık iş akışlarını yönetmek için geliştirilmiş yapılar." -> English.
- features: Visibility: "İş akışının hangi aşamada olduğunu merkezi olarak görün." Error handling: "Hataları merkezi bir noktadan yönetin ve telafi edin." Stateful: "Sürecin tüm durumunu merkezi olarak saklayın ve izleyin." Predictability: "Akışın sonucunu ve yolunu önceden kestirmek daha kolaydır."
- Deep dive heading: "Merkezi Yönetim Gücü" -> "Centralized Control Power" maybe "The Power of Centralized Management"
- Paragraph: "Orkestrasyon mimarisinde, tüm servislerin ne zaman ve nasıl çalışacağını bilen bir "Beyin" (Orchestrator) vardır. Servisler birbirini tanımaz; sadece yöneticiye "Ben hazırım" veya "İşi bitirdim" derler." Translate.
- Side card: "Saga Pattern ile Telafi" -> "Compensation with Saga Pattern" maybe "Saga Pattern Compensation"; paragraph: "Eğer bir serviste hata oluşursa, orkestratör önceki başarılı adımları geri almak için "Compensating Transactions" (Telafi Edici İşlemler) başlatır. Bu, dağıtık sistemlerde veri tutarlılığını sağlamanın en güvenilir yoludur."
- Trade-off heading: "Trade-off Analizi" -> "Trade-off Analysis"; "Avantajlar" -> Advantages; "Dezavantajlar" -> Disadvantages; list items Turkish.
- Real world heading: "Gerçek Dünya Örneği: E-Ticaret Checkout" -> "Real-World Example: E-Commerce Checkout" maybe keep "Real World Example". Steps titles Turkish: "Stok Ayır", "Ödeme Al", "Kargo Oluştur", "Bildirim Gönder" -> translate. desc English service names remain: Inventory Service, Payment Service, Shipping Service, Email Service.
- Quote Turkish -> translate.
- Bottom industrial standard: heading "Industrial Standard" already English; text Turkish "Orkestrasyonun endüstriyel standardı BPMN (Business Process Model and Notation) spesifikasyonudur." -> "The industrial standard for orchestration is the BPMN (Business Process Model and Notation) specification." Keep link.
- Comments in code: "Central Background Pulse", "Orbiting Services", "Counter-rotate the icon to stay upright", "Center Orchestrator", "Detailed Deep Dive", "Column 1: Core Logic", "Column 2: Trade-offs Table", "Real World Example Section". These already English except maybe none. Could translate comments already English no need. Keep exact.
Need maybe preserve Turkish terms? No.

Need produce entire file with translated strings. Ensure code valid. No markdown backticks. Need maybe not modify style. Need ensure apostrophes escaped inside JSX string? Use curly quotes maybe okay but need valid. For "Ben hazırım" etc use quotes. Could use English with double quotes? Inside JSX text no issue. Need avoid invalid `"` within text? In JSX text, double quotes are fine. But inside attribute strings no. Text content can include quotes. Need not break. We can use typographic? Use `"` character? Better use HTML entity? In JSX text, literal `"` okay. But if in `<p>` text with `"` it's okay. But we can use `{' "Ben hazırım" '}`? Simpler use `"Ben hazırım"` as text; JSX parser accepts quotes inside text? Yes text includes quotes. Should be fine. Need check.

Need output.

But also system says terse caveman style? It may conflict with translation. "Respond like terse caveman. All technical substance stay exact, only fluff die." For this user they want translation, not conversation. We should just output translated file, no extra words. That aligns. Need not add explanation. Output file content only.

Need ensure translations idiomatic American English, senior software architecture tone.

Let's translate carefully.

Original file:

```
import React from 'react';
import { motion } from 'framer-motion';
import ArchHero from '../components/ArchHero';
import { Target, GitMerge, Cpu, Zap } from 'lucide-react';

const OrchestrationPage = () => {
  const illu = (
    <div style={{ position: 'relative', width: '300px', height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {/* Central Background Pulse */}
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
        <motion.div
          animate={{ scale: [1, 2, 1], opacity: [0.1, 0.3, 0.1] }}
          transition={{ repeat: Infinity, duration: 3 }}
          style={{ width: '120px', height: '120px', background: 'radial-gradient(circle, #fb923c 0%, transparent 70%)', borderRadius: '50%' }}
        />
      </div>

      {/* Orbiting Services */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
        style={{ position: 'relative', width: '220px', height: '220px', border: '1px dashed rgba(251, 146, 60, 0.3)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        {[0, 1, 2, 3].map((i) => (
          <motion.div
            key={i}
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              width: '44px',
              height: '44px',
              marginLeft: '-22px', // half of width
              marginTop: '-22px', // half of height
              background: 'rgba(15, 23, 42, 0.8)',
              border: '1px solid #fb923c',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 15px rgba(251, 146, 60, 0.2)',
              transform: `rotate(${i * 90}deg) translateY(-110px)`
            }}
          >
            {/* Counter-rotate the icon to stay upright */}
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', transform: `rotate(${-i * 90}deg)` }}
            >
              <Cpu size={22} color="#fb923c" />
            </motion.div>
          </motion.div>
        ))}
      </motion.div>

      {/* Center Orchestrator */}
      <div style={{ position: 'absolute', zIndex: 10 }}>
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="glass-card"
          style={{ 
            width: '80px', 
            height: '80px', 
            borderRadius: '24px', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            background: 'linear-gradient(135deg, #f97316 0%, #fb923c 100%)',
            boxShadow: '0 0 30px rgba(249, 115, 22, 0.4)',
            border: 'none'
          }}
        >
          <Target size={40} color="white" />
        </motion.div>
      </div>
    </div>
  );

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <ArchHero 
        title="Orchestration"
        subtitle="Architecture"
        description="Merkezi bir yönetici (orchestrator) tarafından kontrol edilen servis akışları. Süreçlerin tam denetim ve görünürlük altında olduğu, karmaşık iş akışlarını yönetmek için geliştirilmiş yapılar."
        badge="Central Control"
        color="#f97316"
        illustration={illu}
        features={[
          { icon: <Target />, title: 'Visibility', desc: 'İş akışının hangi aşamada olduğunu merkezi olarak görün.' },
          { icon: <GitMerge />, title: 'Error Handling', desc: 'Hataları merkezi bir noktadan yönetin ve telafi edin.' },
          { icon: <Cpu />, title: 'Stateful', desc: 'Sürecin tüm durumunu merkezi olarak saklayın ve izleyin.' },
          { icon: <Zap />, title: 'Predictability', desc: 'Akışın sonucunu ve yolunu önceden kestirmek daha kolaydır.' }
        ]}
      />

      {/* Detailed Deep Dive */}
      <section style={{ padding: '100px 0', borderTop: '1px solid var(--glass-border)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5rem', alignItems: 'start' }}>
            
            {/* Column 1: Core Logic */}
            <div>
              <h2 style={{ fontSize: '2.5rem', marginBottom: '2rem', fontWeight: 900 }}>Merkezi Yönetim Gücü</h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', lineHeight: 1.8, marginBottom: '2rem' }}>
                Orkestrasyon mimarisinde, tüm servislerin ne zaman ve nasıl çalışacağını bilen bir "Beyin" (Orchestrator) vardır. 
                Servisler birbirini tanımaz; sadece yöneticiye "Ben hazırım" veya "İşi bitirdim" derler.
              </p>
              
              <div style={{ background: 'rgba(249, 115, 22, 0.05)', padding: '2rem', borderRadius: '24px', border: '1px solid rgba(249, 115, 22, 0.1)' }}>
                <h4 style={{ color: '#f97316', marginBottom: '1rem', fontWeight: 800 }}>Saga Pattern ile Telafi</h4>
                <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)' }}>
                  Eğer bir serviste hata oluşursa, orkestratör önceki başarılı adımları geri almak için "Compensating Transactions" (Telafi Edici İşlemler) başlatır. 
                  Bu, dağıtık sistemlerde veri tutarlılığını sağlamanın en güvenilir yoludur.
                </p>
              </div>
            </div>

            {/* Column 2: Trade-offs Table */}
            <div className="glass-card" style={{ padding: '3rem' }}>
              <h3 style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <Target color="#f97316" size={24} /> Trade-off Analizi
              </h3>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div>
                  <div style={{ color: '#10b981', fontWeight: 800, fontSize: '0.8rem', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Avantajlar</div>
                  <ul style={{ color: 'var(--text-secondary)', paddingLeft: '1.2rem', fontSize: '0.95rem' }}>
                    <li>Akışın takibi ve dökümantasyonu kolaydır.</li>
                    <li>Noktadan noktaya bağımlılıkları (Spaghetti) önler.</li>
                    <li>Süreç yönetimi tek bir yerde izole edilmiştir (Separation of Concerns).</li>
                  </ul>
                </div>

                <div style={{ height: '1px', background: 'var(--glass-border)' }} />

                <div>
                  <div style={{ color: '#ef4444', fontWeight: 800, fontSize: '0.8rem', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Dezavantajlar</div>
                  <ul style={{ color: 'var(--text-secondary)', paddingLeft: '1.2rem', fontSize: '0.95rem' }}>
                    <li>Yönetici servis "Single Point of Failure" (Tekil Hata Noktası) olabilir.</li>
                    <li>Merkezi mantık zamanla aşırı karmaşıklaşabilir (Fat Orchestrator).</li>
                    <li>Ağ trafiği merkezi servis üzerinde yoğunlaşır.</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Real World Example Section */}
      <section style={{ padding: '80px 0', background: 'rgba(255,255,255,0.01)' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 style={{ fontSize: '2rem', marginBottom: '3rem' }}>Gerçek Dünya Örneği: <span style={{ color: '#f97316' }}>E-Ticaret Checkout</span></h2>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', flexWrap: 'wrap' }}>
            {[
              { step: '1', title: 'Stok Ayır', desc: 'Inventory Service' },
              { step: '2', title: 'Ödeme Al', desc: 'Payment Service' },
              { step: '3', title: 'Kargo Oluştur', desc: 'Shipping Service' },
              { step: '4', title: 'Bildirim Gönder', desc: 'Email Service' }
            ].map((s, i) => (
              <div key={i} style={{ width: '200px', padding: '1.5rem', background: 'var(--glass)', borderRadius: '20px', border: '1px solid var(--glass-border)' }}>
                <div style={{ fontSize: '1.5rem', fontWeight: 900, color: '#f97316', marginBottom: '0.5rem' }}>{s.step}</div>
                <div style={{ fontWeight: 700, marginBottom: '0.25rem' }}>{s.title}</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{s.desc}</div>
              </div>
            ))}
          </div>
          <p style={{ marginTop: '3rem', maxWidth: '700px', margin: '3rem auto 0', color: 'var(--text-secondary)', fontStyle: 'italic' }}>
            "Orkestrator, önce stoku ayırtır, başarılıysa ödemeye geçer. Ödeme başarısız olursa stoku geri bırakması talimatını iletir. Tüm bu orkestra şefliği merkezi bir beyin tarafından yönetilir."
          </p>
        </div>
      </section>


      <section style={{ padding: '4rem 0', background: 'rgba(0,0,0,0.3)', borderTop: '1px solid rgba(255,255,255,0.05)', marginTop: '4rem' }}>
        <div className="container" style={{ textAlign: 'center' }}>
           <div style={{ 
             background: 'linear-gradient(180deg, rgba(15, 23, 42, 0) 0%, rgba(15, 23, 42, 0.5) 100%)', 
             padding: '3rem', 
             borderRadius: '24px',