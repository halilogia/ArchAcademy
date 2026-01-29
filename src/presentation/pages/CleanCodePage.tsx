import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import ArchHero from '../components/ArchHero';
import { 
  Sparkles, 
  Code2, 
  Scissors, 
  CheckCircle2, 
  XCircle, 
  Divide, 
  Search, 
  Zap,
  AlignLeft,
  Type,
  AlertTriangle
} from 'lucide-react';

const CleanCodePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'bad' | 'good'>('bad');

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-dark)', color: 'var(--text-primary)' }}>
      
      <ArchHero 
        title="Clean Code"
        subtitle="Zanaatkarlık Sanatı"
        description="Yazdığın kodu 6 ay sonra açtığında 'Bunu hangi idiot yazdı?' demek istemiyorsan, Clean Code opsiyonel değil, bir zorunluluktur. Temiz kod, bir varış noktası değil; sürekli bir yolculuktur."
        badge="Software Craftsmanship"
        color="#10b981"
        illustration={
          <div style={{ position: 'relative', width: '300px', height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
              style={{ position: 'absolute', width: '280px', height: '280px', border: '2px dashed #10b98122', borderRadius: '50%' }}
            />
             <motion.div
              animate={{ scale: [1, 1.1, 1], rotate: -360 }}
              transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
              style={{ position: 'absolute', width: '200px', height: '200px', border: '1px solid #10b98144', borderRadius: '30%' }}
            />
            <div className="glass-card" style={{ padding: '2.5rem', borderRadius: '32px', background: 'rgba(16, 185, 129, 0.1)', position: 'relative', zIndex: 2 }}>
               <motion.div
                 animate={{ y: [0, -10, 0] }}
                 transition={{ repeat: Infinity, duration: 3 }}
               >
                 <Code2 size={80} color="#10b981" />
               </motion.div>
               <motion.div
                 animate={{ scale: [0, 1.2, 0], opacity: [0, 1, 0] }}
                 transition={{ repeat: Infinity, duration: 2, delay: 0.5 }}
                 style={{ position: 'absolute', top: '10px', right: '10px' }}
               >
                 <Sparkles size={24} color="#10b981" />
               </motion.div>
            </div>
          </div>
        }
        features={[
          { icon: <CheckCircle2 />, title: "Self-Documenting", desc: "Kodun kendini dökümante etmesi." },
          { icon: <Zap />, title: "Boy-Scout Rule", desc: "Bulduğundan daha temiz bırak." },
          { icon: <AlignLeft />, title: "Standardization", desc: "Takım içi ortak dil ve kurallar." }
        ]}
      />

      {/* --- PRACTICAL BLOG CONTENT --- */}
      <section style={{ padding: '40px 0 100px' }}>
        <div className="container">
          
          {/* 1. THE BOY SCOUT RULE */}
          <div style={{ marginBottom: '6rem' }}>
             <h2 style={{ fontSize: '2rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <CheckCircle2 color="#10b981" /> İzcilik Kuralı (Boy Scout Rule)
             </h2>
             <div className="glass-card" style={{ padding: '2.5rem', background: 'rgba(16, 185, 129, 0.05)', border: '1px solid rgba(16, 185, 129, 0.1)' }}>
                <p style={{ fontSize: '1.1rem', lineHeight: 1.7, color: '#e2e8f0', marginBottom: '1.5rem' }}>
                   Robert C. Martin'in en sevdiğim kuralı basittir: <b>"Kamp alanını bulduğundan daha temiz bırak."</b>
                </p>
                <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                   Bir dosyayı açtın ve sadece bir <code>bug</code> düzelteceksin. Gözüne kötü isimlendirilmiş bir değişken takıldı.
                   "Aman şimdi kim uğraşacak, testler patlar" deme. Düzelt. O an düzelt. Eğer her yazılımcı girdiği dosyayı birazcık temizleseydi,
                   teknik borç (technical debt) diye bir kavram olmazdı. Büyük refactoring haftaları düzenlemeye gerek kalmazdı.
                   Ufak dokunuşlar, büyük kaosları önler.
                </p>
             </div>
          </div>

          {/* 2. NAMING CONVENTIONS */}
          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '4rem', marginBottom: '6rem', alignItems: 'center' }}>
            <div>
              <h2 style={{ fontSize: '2rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <Divide color="#3b82f6" /> İsimlendirme: En Zor Sanat
              </h2>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: '1.5rem', fontSize: '1.05rem' }}>
                Yazılımda en zor iki şey vardır: 1. Cache Invalidation, 2. Şeylere isim vermek.
                Değişken ismin, o değişkenin ne işe yaradığını, neden var olduğunu ve nasıl kullanıldığını anlatmalı.
                Yorum satırına ihtiyaç duyuyorsan, isimlendirmen kötüdür.
              </p>
              
              <div style={{ background: 'rgba(0,0,0,0.3)', padding: '1.5rem', borderRadius: '12px' }}>
                 <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px', color: '#f87171' }}>
                    <XCircle size={18} /> 
                    <code style={{ fontSize: '0.9rem' }}>const d; // elapsed time in days</code>
                    <span style={{ fontSize: '0.8rem', opacity: 0.6 }}>(Bunu yorumla açıklamak zorundaysan kaybettin)</span>
                 </div>
                 <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#4ade80' }}>
                    <CheckCircle2 size={18} /> 
                    <code style={{ fontSize: '0.9rem' }}>const daysSinceModification;</code>
                    <span style={{ fontSize: '0.8rem', opacity: 0.6 }}>(İsim her şeyi anlatıyor)</span>
                 </div>
              </div>
            </div>
            <div className="glass-card" style={{ padding: '2rem' }}>
               <h4 style={{ color: 'var(--primary)', marginBottom: '1rem' }}>Yasaklı Kelimeler Listesi 🚫</h4>
               <ul style={{ listStyle: 'none', padding: 0, color: 'var(--text-secondary)', lineHeight: 2 }}>
                  <li>❌ <b>data, info, item:</b> Çok genel. Hangi data? Kullanıcı mı, Ürün mü?</li>
                  <li>❌ <b>Manager, Processor:</b> Tanrı sınıfı (God Class) kokusu alıyorum.</li>
                  <li>❌ <b>flag:</b> Boolean ama neyi kontrol ediyor? <code>isVisible</code> de.</li>
                  <li>❌ <b>utils, helpers:</b> Kodun çöplüğü. Oraya atılan bir daha bulunmaz.</li>
               </ul>
            </div>
          </div>

          {/* 3. CODE SPECIFICATION & STANDARDS (MERGED FROM CodeSpecPage) */}
          <div style={{ marginBottom: '6rem' }}>
             <h2 style={{ fontSize: '2rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                 <AlignLeft color="#facc15" /> Code Specification
             </h2>
             <div className="glass-card" style={{ padding: '2rem' }}>
                  <p style={{ color: '#cbd5e1', marginBottom: '1.5rem', lineHeight: 1.7 }}>
                      Clean Code sadece güzel isimler vermek değildir; aynı zamanda tutarlı olmaktır. 
                      Ekip içinde (veya kendi projelerinizde) bir stil rehberi (Style Guide) belirleyin ve ona uyun.
                      Tab vs Space tartışmasını bırakın, Linter'a ne diyorsanız onu yapın.
                  </p>

                  <div style={{ display: 'flex', gap: '20px', marginBottom: '20px', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '20px' }}>
                      <button 
                        onClick={() => setActiveTab('bad')}
                        style={{ 
                            background: activeTab === 'bad' ? 'rgba(239, 68, 68, 0.2)' : 'transparent', 
                            color: activeTab === 'bad' ? '#fca5a5' : '#94a3b8',
                            border: 'none', padding: '10px 20px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold'
                        }}
                      >
                          <AlertTriangle size={16} style={{ marginRight: '5px', verticalAlign: 'text-bottom' }} />
                          Spaghetti Code (No Spec)
                      </button>
                      <button 
                        onClick={() => setActiveTab('good')}
                        style={{ 
                            background: activeTab === 'good' ? 'rgba(16, 185, 129, 0.2)' : 'transparent', 
                            color: activeTab === 'good' ? '#6ee7b7' : '#94a3b8',
                            border: 'none', padding: '10px 20px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold'
                        }}
                      >
                          <CheckCircle2 size={16} style={{ marginRight: '5px', verticalAlign: 'text-bottom' }} />
                          Clean Code (Standardized)
                      </button>
                  </div>

                  <div style={{ fontFamily: 'monospace', fontSize: '0.9rem', background: '#020617', padding: '20px', borderRadius: '12px', minHeight: '300px', overflowX: 'auto' }}>
                      {activeTab === 'bad' ? (
                          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                              <div style={{ color: '#94a3b8' }}>// ❌ Karışık syntax, tutarsız isimlendirme</div>
                              <br/>
                              <div style={{ color: '#fca5a5' }}>var</div> u = <span style={{ color: '#eab308' }}>"John"</span>; <span style={{ color: '#64748b' }}>// Çok kısa değişken</span>
                              <br/>
                              <div style={{ color: '#fca5a5' }}>function</div> <span style={{ color: '#60a5fa' }}>GT_USR_DT</span>(id) {'{'} <span style={{ color: '#64748b' }}>// Anlaşılmaz fonksiyon ismi</span>
                              <br/>
                                &nbsp;&nbsp;<div style={{ color: '#fca5a5' }}>if</div>(id==0) <div style={{ color: '#fca5a5' }}>return</div> <span style={{ color: '#fca5a5' }}>null</span>  <span style={{ color: '#64748b' }}>// Süslü parantez yok</span>
                              <br/>
                                &nbsp;&nbsp;&nbsp;&nbsp;let  x=   db.fetch(id) <span style={{ color: '#64748b' }}>// Gereksiz boşluklar, noktalı virgül eksik</span>
                              <br/>
                              &nbsp;&nbsp;<div style={{ color: '#fca5a5' }}>return</div> x;
                              <br/>
                              {'}'}
                          </motion.div>
                      ) : (
                         <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                              <div style={{ color: '#94a3b8' }}>// ✅ Airbnb Style Guide uyumlu</div>
                              <br/>
                              <div style={{ color: '#c084fc' }}>const</div> <span style={{ color: '#facc15' }}>DEFAULT_USER_NAME</span> = <span style={{ color: '#eab308' }}>'John'</span>;
                              <br/>
                              <br/>
                              <div style={{ color: '#64748b' }}>/**</div>
                              <br/>
                              <div style={{ color: '#64748b' }}> * Retrieves user data by unique ID.</div>
                              <br/>
                              <div style={{ color: '#64748b' }}> */</div>
                              <br/>
                              <div style={{ color: '#c084fc' }}>async function</div> <span style={{ color: '#60a5fa' }}>getUserData</span>(<span style={{ color: '#f87171' }}>userId</span>: <span style={{ color: '#c084fc' }}>string</span>): <span style={{ color: '#c084fc' }}>Promise</span>&lt;User | null&gt; {'{'}
                              <br/>
                                &nbsp;&nbsp;<div style={{ color: '#c084fc' }}>if</div> (!userId) {'{'}
                              <br/>
                                &nbsp;&nbsp;&nbsp;&nbsp;<div style={{ color: '#c084fc' }}>return</div> <span style={{ color: '#c084fc' }}>null</span>;
                              <br/>
                                &nbsp;&nbsp;{'}'}
                              <br/>
                              <br/>
                                &nbsp;&nbsp;<div style={{ color: '#c084fc' }}>const</div> user = <div style={{ color: '#c084fc' }}>await</div> db.fetch(userId);
                              <br/>
                                &nbsp;&nbsp;<div style={{ color: '#c084fc' }}>return</div> user;
                              <br/>
                              {'}'}
                         </motion.div>
                      )}
                  </div>
             </div>
          </div>

          {/* 4. FUNCTIONS & COMMENTS */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '6rem' }}>
             <PrincipleCard 
               title="Fonksiyonlar: Tek Bir Görev" 
               desc="Bir fonksiyonun ilk kuralı: KÜÇÜK olmalı. İkinci kuralı: DAHA DA KÜÇÜK olmalı. Bir fonksiyon sadece bir iş yapmalı. Eğer fonksiyonun adı 'getUserAndSaveToDbAndSendEmail' gibi oluyorsa, o fonksiyonu parçala. 've' bağlacı senin düşmanındır."
               icon={<Divide color="#f59e0b" />} 
             />
             <PrincipleCard 
               title="Yorumlar: Başarısızlığın İtirafı" 
               desc="Mükemmel kodun yoruma ihtiyacı yoktur. Yorum satırı yazıyorsan, aslında şunu diyorsun: 'Kodum o kadar karmaşık ki, ne yaptığımı Türkçe/İngilizce anlatmak zorundayım.' Kodu düzelt, yorumu sil. Yorumlar yalan söyler (güncellenmez), kod asla yalan söylemez."
               icon={<Sparkles color="#a855f7" />} 
             />
          </div>

          {/* CTA SECTION */}
          <div className="glass-card" style={{ padding: '4rem', textAlign: 'center', border: '1px solid var(--primary)', background: 'linear-gradient(180deg, rgba(59, 130, 246, 0.05) 0%, rgba(59, 130, 246, 0) 100%)' }}>
               <h3 style={{ fontSize: '2rem', marginBottom: '1rem', fontWeight: 900 }}>Yeterince Konuştuk.</h3>
               <p style={{ color: 'var(--text-secondary)', marginBottom: '2.5rem', fontSize: '1.2rem', maxWidth: '700px', marginInline: 'auto' }}>
                 Tüm bu anlattıklarım havada kalmasın. Gerçek hayattan alınmış, iğrenç kod örneklerini 
                 nasıl sanat eserine dönüştürdüğümüzü görmek ister misin?
               </p>
               <Link to="/refactoring" style={{ 
                 display: 'inline-flex', 
                 alignItems: 'center', 
                 gap: '1rem', 
                 background: 'var(--primary)', 
                 color: 'white', 
                 padding: '1.2rem 3rem', 
                 borderRadius: '16px', 
                 fontWeight: 800,
                 fontSize: '1.1rem',
                 textDecoration: 'none',
                 boxShadow: '0 20px 40px var(--primary-glow)',
                 transition: 'transform 0.2s'
               }}>
                 <Scissors size={24} />
                 Ameliyathaneye Gir (Refactoring Surgery)
               </Link>
            </div>

        </div>
      </section>

      {/* --- QUOTE SECTION --- */}
      <section style={{ padding: '4rem 0', background: 'rgba(0,0,0,0.3)', borderTop: '1px solid rgba(255,255,255,0.05)', marginTop: '4rem' }}>
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
                The Philosophy
              </div>
              <p style={{ color: '#94a3b8', marginBottom: '2rem', fontSize: '1.1rem', lineHeight: 1.6 }}>
                "Clean Code" kavramının yaratıcısı Robert C. Martin (Uncle Bob)'in blogundaki makaleler, bu disiplinin kaynağıdır.
              </p>
              
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                 <a 
                   href="https://blog.cleancoder.com/" 
                   target="_blank" 
                   rel="noopener noreferrer"
                   style={{ 
                     display: 'flex', alignItems: 'center', gap: '8px', 
                     background: 'rgba(16, 185, 129, 0.15)', color: '#6ee7b7', 
                     padding: '12px 24px', borderRadius: '12px', textDecoration: 'none', fontWeight: 600,
                     border: '1px solid rgba(16, 185, 129, 0.2)', transition: 'all 0.2s'
                   }}
                 >
                    Uncle Bob's Blog (Clean Coder) <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                 </a>
              </div>
           </div>
        </div>
      </section>

    </div>
  );
};

// --- HELPER COMPONENT: PRINCIPLE CARD ---
const PrincipleCard = ({ title, desc, icon }: { title: string, desc: string, icon: React.ReactNode }) => (
  <motion.div 
    whileHover={{ y: -5 }}
    className="glass-card" 
    style={{ padding: '2rem', height: '100%' }}
  >
     <div style={{ 
       background: 'rgba(255,255,255,0.05)', 
       width: '50px', 
       height: '50px', 
       borderRadius: '12px', 
       display: 'flex', 
       alignItems: 'center', 
       justifyContent: 'center',
       marginBottom: '1.5rem'
     }}>
        {icon}
     </div>
     <h3 style={{ fontSize: '1.4rem', marginBottom: '1rem' }}>{title}</h3>
     <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>{desc}</p>
  </motion.div>
);

export default CleanCodePage;
