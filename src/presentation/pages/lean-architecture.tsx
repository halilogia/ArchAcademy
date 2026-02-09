import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Target, Zap, Scissors, ShieldCheck, Layers, Sparkles, Trash2, 
  Clock, GitMerge, Users, Minimize2, CheckSquare, 
  ArrowRight, Activity, Flame, GraduationCap, 
  Rocket, Code2, Scale, Microscope, ShieldAlert, Brain 
} from 'lucide-react';
import ArchHero from '../components/ArchHero';
import ArchReferences from '../components/ArchReferences';

const LeanArchitecturePage = () => {
  const [activeTab, setActiveTab] = useState(0);

  const principles = [
    {
      id: 'eliminate-waste',
      title: '1. Eliminate Waste',
      icon: Trash2,
      color: '#ef4444',
      desc: 'Yazılımda "değer üretmeyen" her şey israftır. Müşterinin kullanmayacağı ekstra özellikler (Gold Plating), tamamlanmamış işler, gereksiz evrak işleri ve beklemeler hemen elenmelidir.'
    },
    {
      id: 'amplify-learning',
      title: '2. Create Knowledge',
      icon: Sparkles,
      color: '#f59e0b',
      desc: 'Yazılım geliştirme bir üretim süreci değil, bir öğrenme sürecidir. En iyi mimari, kodu yazanların domaini en iyi öğrendiği anda ortaya çıkar. Dokümantasyon değil, çalışan kod ve testler bilgiyi taşır.'
    },
    {
      id: 'decide-late',
      title: '3. Defer Commitment',
      icon: Clock,
      color: '#3b82f6',
      desc: 'Mimari kararları (örn: NoSQL vs SQL) mümkün olan "son sorumlu ana" kadar erteleyin. Erken verilen kararlar varsayımlara dayanır; geç verilen kararlar ise gerçeklere.'
    },
    {
      id: 'deliver-fast',
      title: '4. Deliver Fast',
      icon: Zap,
      color: '#eab308',
      desc: 'Hız, belirsizliği yok eder. Müşteriye ne kadar hızlı çıktı verirseniz, o kadar hızlı geri bildirim alırsınız. Büyük "Big Bang" sürümler yerine küçük ve sık sürümler esastır.'
    },
    {
      id: 'empower-team',
      title: '5. Respect People',
      icon: Users,
      color: '#a855f7',
      desc: 'Kararları yukarıdaki mimarlar değil, işi yapan uzmanlar vermelidir. Takıma güvenin ve onlara inisiyatif verin. Motivasyonu yüksek bir ekip, en iyi süreçten daha değerlidir.'
    },
    {
      id: 'build-integrity',
      title: '6. Build Integrity In',
      icon: CheckSquare,
      color: '#10b981',
      desc: 'Kalite sonradan test edilerek eklenemez; en baştan koda inşa edilmelidir. TDD, Refactoring ve Continuous Integration, sistemin bütünlüğünü (integrity) sağlayan temel araçlardır.'
    },
    {
      id: 'whole-view',
      title: '7. Optimize the Whole',
      icon: Minimize2,
      color: '#ec4899',
      desc: 'Sadece veritabanını hızlandırmak yetmez; tüm isteğin (request) yaşam döngüsüne bakın. Parçaları optimize etmek (sub-optimization) genellikle bütünün performansını düşürür.'
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{ background: 'var(--bg-dark)', minHeight: '100vh', overflowX: 'hidden' }}
    >
      <ArchHero 
        title="Lean"
        subtitle="Architecture"
        description="Toyota Üretim Sistemi'nden (TPS) yazılıma uyarlanan bu felsefe, 'İsrafı Yok Etme' (Waste Elimination) üzerine kuruludur. Az kod, çok değer."
        badge="Mary & Tom Poppendieck"
        color="#84cc16"
        illustration={
          <div style={{ position: 'relative', width: '350px', height: '350px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {/* Spinning Rings representing Iterative Cycles */}
            {[1, 2, 3].map((i) => (
              <motion.div
                key={i}
                animate={{ rotate: i % 2 === 0 ? 360 : -360 }}
                transition={{ duration: 15 + i * 5, repeat: Infinity, ease: 'linear' }}
                style={{ 
                  position: 'absolute', 
                  width: `${100 + i * 60}px`, 
                  height: `${100 + i * 60}px`, 
                  border: '1px dashed rgba(132, 204, 22, 0.3)', 
                  borderRadius: '50%',
                  borderTopColor: '#84cc16'
                }}
              />
            ))}
            
            {/* Central Core */}
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              style={{ 
                width: '80px', height: '80px', 
                background: '#84cc16', 
                borderRadius: '50%', 
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 0 50px rgba(132, 204, 22, 0.4)'
              }}
            >
              <Target size={40} color="#0f172a" strokeWidth={3} />
            </motion.div>

            {/* Flying Particles (Waste being removed) */}
            {[1, 2, 3, 4].map(i => (
               <motion.div
                 key={`p-${i}`}
                 animate={{ 
                    x: [0, (Math.random() - 0.5) * 400], 
                    y: [0, (Math.random() - 0.5) * 400], 
                    opacity: [1, 0],
                    scale: [1, 0]
                 }}
                 transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }}
                 style={{ position: 'absolute', width: '8px', height: '8px', background: '#ef4444', borderRadius: '2px' }}
               />
            ))}
          </div>
        }
        features={[
          { icon: <Trash2 />, title: 'Muda (Waste)', desc: 'Ekstra özellik, bekleyen kod, hatalar ve gereksiz işlemler (motion) birer israftır.' },
          { icon: <Scissors />, title: 'Tailoring', desc: 'Süreci projeye uydurun. Her proje için devasa mimariler kurmak zorunda değilsiniz.' },
          { icon: <GitMerge />, title: 'Just-in-Time', desc: 'Kararları ihtiyacınız olduğu anda verin; aylar öncesinden değil.' }
        ]}
      />

      {/* --- LEAN CLEAN HYBRID DEEP DIVE --- */}
      <section style={{ padding: '120px 0', borderTop: '1px solid var(--glass-border)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6rem', alignItems: 'center' }}>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(132, 204, 22, 0.1)', color: '#84cc16', padding: '6px 12px', borderRadius: '100px', fontSize: '0.7rem', fontWeight: 900, marginBottom: '1.5rem', border: '1px solid rgba(132, 204, 22, 0.2)' }}>
                <Flame size={14} /> THE NEW GOLD STANDARD
              </div>
              <h2 style={{ fontSize: '3.5rem', fontWeight: 950, color: 'white', marginBottom: '2rem', lineHeight: 1, letterSpacing: '-2px' }}>
                Lean <span className="gradient-text">Clean Architecture</span>
              </h2>
              <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: '2.5rem' }}>
                Geleneksel Clean Architecture harika bir disiplindir ancak Lean felsefesiyle birleştiğinde **"Saf Geliştirme Hızı"** (Pure Velocity) doğar. 
                Her klasörün, her interface'in ve her satır kodun bir "kira" bedeli vardır (Maintenance Cost). Sadece ihtiyacınız olanın kirasını ödeyin.
              </p>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div style={{ display: 'flex', gap: '1.5rem' }}>
                  <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(59, 130, 246, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#3b82f6', flexShrink: 0 }}>
                    <Layers size={24} />
                  </div>
                  <div>
                    <h4 style={{ color: 'white', marginBottom: '0.5rem' }}>Vertical Slice Over Layered Bloat</h4>
                    <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Özellikleri yatay katmanlara boğmak yerine, dikey dilimler (Vertical Slices) halinde organize edin. Bağımsızlık hızı getirir.</p>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '1.5rem' }}>
                  <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(16, 185, 129, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#10b981', flexShrink: 0 }}>
                    <Code2 size={24} />
                  </div>
                  <div>
                    <h4 style={{ color: 'white', marginBottom: '0.5rem' }}>Functional Use Cases</h4>
                    <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>UseCase'leri sınıflar yerine saf fonksiyonlar olarak yazın. Dependency Injection karmaşasını %80 azaltın.</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="glass-card" 
              style={{ padding: '3rem', position: 'relative' }}
            >
              <h3 style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Scale size={20} color="#84cc16" /> Pragmatizm Ölçeği
              </h3>
              <div style={{ height: '300px', display: 'flex', alignItems: 'flex-end', gap: '2rem', padding: '1rem 0', borderBottom: '1px solid var(--glass-border)' }}>
                 {[
                   { label: 'Efor', val: 30, color: '#f59e0b' },
                   { label: 'Hız', val: 95, color: '#84cc16' },
                   { label: 'Kalite', val: 90, color: '#3b82f6' },
                   { label: 'Boilerplate', val: 10, color: '#ef4444' }
                 ].map((s, i) => (
                   <div key={i} style={{ flex: 1, height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end', gap: '1rem' }}>
                      <motion.div 
                        initial={{ height: 0 }}
                        whileInView={{ height: `${s.val}%` }}
                        viewport={{ once: true }}
                        style={{ width: '100%', borderRadius: '8px 8px 0 0', background: `linear-gradient(to top, ${s.color}20, ${s.color}EE)` }} 
                      />
                      <span style={{ fontSize: '0.7rem', fontWeight: 800, color: 'var(--text-secondary)', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>{s.label}</span>
                   </div>
                 ))}
              </div>
              <p style={{ marginTop: '2rem', fontSize: '0.85rem', color: 'var(--text-secondary)', textAlign: 'center', fontStyle: 'italic' }}>
                "Lean Architecture, kurumsal standartlardan ödün vermeden 'Angarya Kod'u (Waste) yok eden bir denge sanatıdır."
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 7 Principles Interactive Section */}
      <section style={{ padding: '120px 0', background: 'rgba(0,0,0,0.2)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
            <h2 className="gradient-text" style={{ fontSize: '3.5rem', fontWeight: 950, letterSpacing: '-2px' }}>7 Yalın Mimari Prensibi</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem' }}>Başarılı modern sistemlerin genetik kodu ve israfsız üretim stratejisi.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(350px, 1fr) 2fr', gap: '4rem', minHeight: '600px' }}>
            {/* Menu */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {principles.map((p, idx) => (
                <motion.div
                  key={p.id}
                  onClick={() => setActiveTab(idx)}
                  whileHover={{ x: 10, background: 'rgba(255,255,255,0.05)' }}
                  style={{ 
                    padding: '1.5rem', 
                    background: activeTab === idx ? 'rgba(132, 204, 22, 0.1)' : 'rgba(255,255,255,0.02)', 
                    borderLeft: `4px solid ${activeTab === idx ? p.color : 'transparent'}`,
                    borderRadius: '0 20px 20px 0',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1.2rem',
                    transition: 'all 0.4s'
                  }}
                >
                  <div style={{ 
                    width: '40px', height: '40px', 
                    borderRadius: '12px', 
                    background: activeTab === idx ? p.color : 'rgba(255,255,255,0.05)', 
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: activeTab === idx ? '#0f172a' : 'rgba(255,255,255,0.4)',
                    transition: 'all 0.3s'
                  }}>
                    {React.createElement(p.icon, { size: 20 })}
                  </div>
                  <span style={{ 
                    fontWeight: activeTab === idx ? 800 : 500, 
                    fontSize: '1.1rem',
                    color: activeTab === idx ? 'white' : 'rgba(255,255,255,0.5)' 
                  }}>
                    {p.title}
                  </span>
                </motion.div>
              ))}
            </div>

            {/* Content Display */}
            <div style={{ position: 'relative' }}>
              <AnimatePresence mode="wait">
                 <motion.div
                   key={activeTab}
                   initial={{ opacity: 0, scale: 0.95 }}
                   animate={{ opacity: 1, scale: 1 }}
                   exit={{ opacity: 0, scale: 0.95 }}
                   className="glass-card"
                   style={{ 
                     height: '100%', 
                     padding: '5rem', 
                     borderTop: `8px solid ${principles[activeTab].color}`,
                     display: 'flex',
                     flexDirection: 'column',
                     justifyContent: 'center',
                     background: `linear-gradient(135deg, rgba(255,255,255,0.02) 0%, ${principles[activeTab].color}08 100%)`
                   }}
                 >
                    <div style={{ 
                      width: '100px', height: '100px', 
                      background: `${principles[activeTab].color}15`, 
                      borderRadius: '30px', 
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: principles[activeTab].color,
                      marginBottom: '3rem',
                      boxShadow: `0 20px 40px ${principles[activeTab].color}10`
                    }}>
                      {React.createElement(principles[activeTab].icon, { size: 48 })}
                    </div>
                    
                    <h2 style={{ fontSize: '3rem', fontWeight: 950, marginBottom: '2rem', color: 'white', letterSpacing: '-1.5px' }}>{principles[activeTab].title}</h2>
                    <p style={{ fontSize: '1.4rem', lineHeight: 1.7, color: '#cbd5e1', marginBottom: '4rem' }}>
                      {principles[activeTab].desc}
                    </p>

                    <div style={{ padding: '2rem', background: 'rgba(0,0,0,0.4)', borderRadius: '24px', borderLeft: `5px solid ${principles[activeTab].color}`, position: 'relative', overflow: 'hidden' }}>
                       <div style={{ position: 'absolute', top: '-20px', right: '-20px', opacity: 0.05 }}>
                          {React.createElement(principles[activeTab].icon, { size: 150 })}
                       </div>
                       <h4 style={{ color: principles[activeTab].color, marginBottom: '1rem', fontSize: '1rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '2px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                         <Brain size={20} /> GEMINI AI ÖNERİSİ
                       </h4>
                       <p style={{ color: 'white', fontSize: '1.1rem', lineHeight: 1.6, fontStyle: 'italic', opacity: 0.9 }}>
                         "{principles[activeTab].id === 'eliminate-waste' ? 'Yazdığınız kodun %20\'si işin %80\'ini yapar. Geri kalan %80 "olsa iyi olur" kısmıdır. O kısmı acımadan silin.' : 
                           principles[activeTab].id === 'decide-late' ? 'Veritabanı şemasını projenin başında değil, use-case\'lerinizi tam anladığınızda tasarlayın. Erken kararlar zincirdir.' :
                           'Bu prensibi uyguladığınızda kod satır sayınız azalacak ama sistemin "Değer Yoğunluğu" (Value Density) katlanacaktır.'}"
                       </p>
                    </div>
                 </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* --- LEAN VS WASTE CODE COMPARISON --- */}
      <section style={{ padding: '120px 0' }}>
         <div className="container">
            <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
              <h2 style={{ fontSize: '3.5rem', fontWeight: 950, color: 'white' }}>İsraf <span style={{ color: '#ef4444' }}>vs</span> Değer</h2>
              <p style={{ color: 'var(--text-secondary)' }}>Teknik borç yaratan karmaşa ile yalın kodun savaşı.</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem' }}>
               <div className="glass-card" style={{ padding: '2rem', borderTop: '4px solid #ef4444' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.5rem', color: '#ef4444' }}>
                    <ShieldAlert size={24} />
                    <h3 style={{ margin: 0, fontWeight: 900 }}>Geleneksel "Overkill"</h3>
                  </div>
                  <pre style={{ background: '#0a0f1d', padding: '1.5rem', borderRadius: '12px', fontSize: '0.85rem', color: '#94a3b8', border: '1px solid rgba(255,255,255,0.05)', lineHeight: 1.6 }}>{`// 1. Interface Tanımı
interface IGetUserService {
  execute(id: string): Promise<User>;
}

// 2. Sınıf Implementasyonu
class GetUserService implements IGetUserService {
  constructor(private repo: IUserRepository) {}
  async execute(id: string) { ... }
}

// 3. DI Konfigürasyonu (Başka bir dosyada)
container.bind<IGetUserService>(T.U).to(GUS);

// SONUÇ: Tek bir işlem için 3 dosya ve 
// 20 satır boilerplate.`}</pre>
               </div>

               <div className="glass-card" style={{ padding: '2rem', borderTop: '4px solid #84cc16' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.5rem', color: '#84cc16' }}>
                    <Rocket size={24} />
                    <h3 style={{ margin: 0, fontWeight: 900 }}>Lean "Functional"</h3>
                  </div>
                  <pre style={{ background: '#0a0f1d', padding: '1.5rem', borderRadius: '12px', fontSize: '0.85rem', color: '#e2e8f0', border: '1px solid rgba(132, 204, 22, 0.2)', lineHeight: 1.6 }}>{`// Sadece Saf Fonksiyon (Pure Function)
export const getUserUseCase = (repo: UserRepo) => 
  (id: string) => repo.findById(id);

// Kullanım:
const user = await getUserUseCase(repo)("123");

// SONUÇ: Sıfır Interface karmaşası, 
// sıfır DI boilerpate. Maksimum test 
// edilebilirlik ve hız. 
// Gerçek yalınlık budur.`}</pre>
               </div>
            </div>
         </div>
      </section>

      {/* --- LEAN MATURITY MODEL --- */}
      <section style={{ padding: '120px 0', background: 'rgba(132, 204, 22, 0.02)' }}>
        <div className="container">
           <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
              <h2 style={{ fontSize: '3.5rem', fontWeight: 900 }}>Yalın Mimari <span className="gradient-text">Olgunluk Modeli</span></h2>
              <p style={{ color: 'var(--text-secondary)' }}>Projenin boyutuna göre Lean prensiplerini nasıl ölçeklendiririz?</p>
           </div>

           <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem' }}>
              {[
                { 
                  level: 'Level 1: MVP / Startup', 
                  title: 'Agresif Yalınlık', 
                  icon: <Zap />, 
                  p: 'Sıfır klasör derinliği, merkezi tek servis, maksimum reaksiyon hızı. Değer üretmeyen her şeyi reddedin.' 
                },
                { 
                  level: 'Level 2: Growing App', 
                  title: 'Dikey Bölümleme', 
                  icon: <GitMerge />, 
                  p: 'Vertical Slice\'lara geçiş. Her feature kendi içinde yalın kalır ama global bağımlılıklar kontrol altına alınır.' 
                },
                { 
                  level: 'Level 3: Enterprise', 
                  title: 'Modüler Clean', 
                  icon: <CheckSquare />, 
                  p: 'Lean prensiplerinden vazgeçmeden, bağımsız paketlere (Micro-Packages) bölünme. Hız hala birinci önceliktir.' 
                }
              ].map((m, i) => (
                <div key={i} className="glass-card" style={{ padding: '3rem', textAlign: 'center' }}>
                   <div style={{ width: '60px', height: '60px', background: 'rgba(132, 204, 22, 0.1)', color: '#84cc16', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 2rem' }}>
                      {m.icon}
                   </div>
                   <div style={{ fontSize: '0.8rem', fontWeight: 900, color: '#84cc16', marginBottom: '0.5rem', textTransform: 'uppercase' }}>{m.level}</div>
                   <h3 style={{ fontSize: '1.8rem', marginBottom: '1.5rem', color: 'white' }}>{m.title}</h3>
                   <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>{m.p}</p>
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* Comparison Recap Table */}
      <section style={{ padding: '120px 0', background: 'rgba(0,0,0,0.3)' }}>
        <div className="container">
          <div className="glass-card" style={{ padding: '4rem', borderRadius: '40px', overflow: 'hidden' }}>
             <h2 style={{ textAlign: 'center', marginBottom: '4rem', fontSize: '2.5rem', fontWeight: 950 }}>Yönetici Özeti: <span style={{ color: '#84cc16' }}>Lean</span> vs Geleneksel</h2>
             <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead style={{ background: 'rgba(132, 204, 22, 0.1)', borderBottom: '2px solid rgba(132, 204, 22, 0.2)' }}>
                   <tr>
                      <th style={{ padding: '1.5rem', color: 'white', fontWeight: 900 }}>Kriter</th>
                      <th style={{ padding: '1.5rem', color: '#ef4444', fontWeight: 900 }}>Geleneksel (Heavyweight)</th>
                      <th style={{ padding: '1.5rem', color: '#84cc16', fontWeight: 900 }}>Yalın (Lean)</th>
                   </tr>
                </thead>
                <tbody>
                   {[
                     { k: 'Dosya Başına Değer', h: 'Düşük (Boilerplate çok)', l: 'Yüksek (Sadece Logic)' },
                     { k: 'Karar Alma Hızı', h: 'Yavaş (Ön analiz şart)', l: 'Çok Hızlı (JIT Decisions)' },
                     { k: 'Öğrenme Eğrisi', h: 'Dik (Onlarca kural)', l: 'Hızlı (Mantıklı prensipler)' },
                     { k: 'Refactoring Zorluğu', h: 'Yüksek (Zincirleme değişim)', l: 'Düşük (İzole dilimler)' },
                     { k: 'Maliyet', h: 'Sürekli artan maintenance', l: 'Optimize edilmiş bakım costu' }
                   ].map((row, i) => (
                     <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                        <td style={{ padding: '1.5rem', color: 'white', fontWeight: 700 }}>{row.k}</td>
                        <td style={{ padding: '1.5rem', color: 'rgba(239, 68, 68, 0.7)' }}>{row.h}</td>
                        <td style={{ padding: '1.5rem', color: 'rgba(132, 204, 22, 0.9)', fontWeight: 600 }}>{row.l}</td>
                     </tr>
                   ))}
                </tbody>
             </table>
          </div>
        </div>
      </section>

      {/* --- LEAN BIBLIOGRAPHY --- */}
      <section style={{ padding: '100px 0', borderTop: '1px dashed rgba(255,255,255,0.1)', background: 'rgba(0,0,0,0.2)' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <div style={{ color: '#64748b', fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '1.5rem', letterSpacing: '3px' }}>
            Mimari Kaynakça & Literatür
          </div>
          <h2 style={{ color: 'white', marginBottom: '3rem', fontSize: '2rem', fontWeight: 900 }}>Lean Bilgi Kaynakları</h2>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            {[
              { 
                title: "Lean Software Development", 
                author: "Mary & Tom Poppendieck", 
                desc: "Yazılım dünyasına 'Yalın' felsefesini kazandıran ana eser. 7 temel prensibin kaynağıdır.",
                link: "https://www.informit.com/store/lean-software-development-an-agile-toolkit-9780321150783"
              },
              { 
                title: "The Toyota Way", 
                author: "Jeffrey Liker", 
                desc: "Toyota Üretim Sistemi (TPS) ve 'Muda' (israf) kavramlarının endüstriyel kökenleri.",
                link: "https://en.wikipedia.org/wiki/The_Toyota_Way"
              },
              { 
                title: "Resmi Lean Portalı", 
                author: "Lean Enterprise Institute", 
                desc: "Lean düşünce yapısının her alanda nasıl uygulanacağına dair dünya çapındaki ana referans.",
                link: "https://www.lean.org/"
              }
            ].map((ref, i) => (
              <a 
                key={i} 
                href={ref.link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="glass-card" 
                style={{ padding: '2rem', textDecoration: 'none', textAlign: 'left', border: '1px solid rgba(255,255,255,0.05)', transition: 'all 0.3s' }}
              >
                <h4 style={{ color: '#84cc16', marginBottom: '0.5rem', fontSize: '1.1rem' }}>{ref.title}</h4>
                <div style={{ color: '#94a3b8', fontSize: '0.8rem', fontWeight: 700, marginBottom: '1rem' }}>{ref.author}</div>
                <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem', lineHeight: 1.5 }}>{ref.desc}</p>
                <div style={{ marginTop: '1.5rem', display: 'flex', alignItems: 'center', gap: '8px', color: '#84cc16', fontSize: '0.8rem', fontWeight: 900 }}>
                  KAYNAĞA GİT <ArrowRight size={14} />
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default LeanArchitecturePage;
