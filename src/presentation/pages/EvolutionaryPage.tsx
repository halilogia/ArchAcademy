import React from 'react';
import { motion } from 'framer-motion';
import { GitBranch, ShieldAlert, RefreshCw, Layers } from 'lucide-react';
import Theory from '../components/Theory';

const EvolutionaryPage: React.FC = () => {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-dark)', color: 'white', paddingTop: '80px' }}>
      
      {/* HERO SECTION */}
      <section style={{ padding: '80px 0', borderBottom: '1px solid var(--glass-border)' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
             <div style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', background: 'rgba(236, 72, 153, 0.1)', padding: '8px 20px', borderRadius: '100px', marginBottom: '1.5rem', border: '1px solid rgba(236, 72, 153, 0.2)', color: '#ec4899' }}>
                <GitBranch size={18} />
                <span style={{ fontWeight: 700, fontSize: '0.9rem' }}>MODERN ARCHITECTURE</span>
             </div>
             <h1 className="gradient-text" style={{ fontSize: '3.5rem', fontWeight: 900, marginBottom: '1.5rem' }}>
               Evolutionary Architecture
             </h1>
             <p style={{ maxWidth: '800px', margin: '0 auto', fontSize: '1.2rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
               "An evolutionary architecture supports guided, incremental change across multiple dimensions." <br/>
               <span style={{ fontSize: '0.9rem', opacity: 0.7 }}>— Neal Ford, Rebecca Parsons, Patrick Kua</span>
             </p>
          </motion.div>
        </div>
      </section>

      {/* CORE CONCEPTS Grid */}
      <section style={{ padding: '80px 0' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem' }}>
             
             {/* Concept 1 */}
             <div className="glass-card" style={{ padding: '2.5rem' }}>
                <div style={{ width: '50px', height: '50px', background: 'rgba(236, 72, 153, 0.1)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
                   <GitBranch size={24} color="#ec4899" />
                </div>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Incremental Change</h3>
                <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                  Sistemi tek seferde mükemmel yapmaya çalışmak yerine, <b>sürekli gelişebilen</b> bir yapı kurmaktır. 
                  Bu, Microservices veya Modular Monolith gibi parçalı yapıları zorunlu kılar.
                </p>
             </div>

             {/* Concept 2 */}
             <div className="glass-card" style={{ padding: '2.5rem' }}>
                <div style={{ width: '50px', height: '50px', background: 'rgba(59, 130, 246, 0.1)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
                   <ShieldAlert size={24} color="#3b82f6" />
                </div>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Fitness Functions</h3>
                <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                  Mimarinin sağlığını "otomatik testlerle" korumaktır. 
                  Örneğin: <i>"Hiçbir API cevabı 500ms'i geçemez"</i> kuralını CI/CD pipeline'ına bir test olarak eklersiniz.
                </p>
             </div>

             {/* Concept 3 */}
             <div className="glass-card" style={{ padding: '2.5rem' }}>
                <div style={{ width: '50px', height: '50px', background: 'rgba(16, 185, 129, 0.1)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
                   <Layers size={24} color="#10b981" />
                </div>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Appropriate Coupling</h3>
                <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                  Her parça bağımsız değişebilmelidir. "Database şemasını değiştirdim, UI patladı" diyorsanız, 
                  sisteminiz evrimleşemez, sadece çürür.
                </p>
             </div>

          </div>
        </div>
      </section>

      {/* DEEP DIVE: FITNESS FUNCTIONS */}
      <section style={{ padding: '80px 0', borderTop: '1px solid var(--glass-border)', borderBottom: '1px solid var(--glass-border)' }}>
        <div className="container">
           <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
              <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem', fontWeight: 800 }}>Fitness Functions: Mimarinin Bekçileri</h2>
              <p style={{ maxWidth: '800px', margin: '0 auto', fontSize: '1.1rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                Fitness Function, sisteminizin belirlediğiniz mimari hedeflere (performans, güvenlik, modülerlik) ne kadar uyduğunu ölçen nesnel bir mekanizmadır. 
                Unit test kodun doğru çalışıp çalışmadığını ölçerken, Fitness Function mimarinin doğru çalışıp çalışmadığını ölçer.
              </p>
           </div>

           <div className="glass-card" style={{ padding: '2rem', textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
             <svg width="100%" height="300" viewBox="0 0 600 300">
                {/* Pipeline */}
                <rect x="50" y="100" width="500" height="100" rx="10" fill="#1e293b" stroke="#334155" strokeWidth="2" />
                <text x="300" y="90" textAnchor="middle" fill="var(--text-secondary)" fontSize="14">CI/CD Pipeline</text>
                
                {/* Steps */}
                <circle cx="100" cy="150" r="30" fill="#0f172a" stroke="#ec4899" strokeWidth="3" />
                <text x="100" y="155" textAnchor="middle" fill="white" fontSize="12">Code</text>
                
                <path d="M130 150 L170 150" stroke="#475569" strokeWidth="2" markerEnd="url(#arrow)" />

                <circle cx="200" cy="150" r="30" fill="#0f172a" stroke="#ec4899" strokeWidth="3" />
                <text x="200" y="155" textAnchor="middle" fill="white" fontSize="12">Unit Test</text>

                <path d="M230 150 L270 150" stroke="#475569" strokeWidth="2" markerEnd="url(#arrow)" />
                
                {/* FITNESS FUNCTION - Highlighted */}
                <rect x="270" y="120" width="160" height="60" rx="8" fill="rgba(236, 72, 153, 0.2)" stroke="#ec4899" strokeWidth="2" strokeDasharray="5,5" />
                <text x="350" y="145" textAnchor="middle" fill="#ec4899" fontWeight="bold" fontSize="14">Fitness Functions</text>
                <text x="350" y="165" textAnchor="middle" fill="#ec4899" fontSize="10">Check Arch. Rules</text>

                <path d="M430 150 L470 150" stroke="#475569" strokeWidth="2" markerEnd="url(#arrow)" />

                <circle cx="500" cy="150" r="30" fill="#0f172a" stroke="#10b981" strokeWidth="3" />
                <text x="500" y="155" textAnchor="middle" fill="white" fontSize="12">Deploy</text>

                {/* Arrow Def */}
                <defs>
                  <marker id="arrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
                    <path d="M0,0 L0,6 L9,3 z" fill="#475569" />
                  </marker>
                </defs>
             </svg>
          </div>
        </div>
      </section>

      {/* REAL WORLD EXAMPLE */}
      <section style={{ padding: '80px 0', background: 'rgba(255,255,255,0.02)' }}>
        <div className="container">
           <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'center' }}>
              <div>
                 <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>Örnek: Netflix Chaos Monkey</h2>
                 <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '1.5rem', fontSize: '1.1rem' }}>
                    Netflix, sisteminin "her zaman erişilebilir" (High Availability) olması gerektiğini mimari bir hedef olarak belirledi.
                    Bunu sadece umut etmek yerine, <b>Chaos Monkey</b> adında bir araç geliştirdiler.
                 </p>
                 <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: '1.1rem' }}>
                    Bu araç, rastgele sunucuları kapatarak sistemi sabote eder. Eğer sistem hala çalışıyorsa, mimari "Fit" (Sağlıklı) demektir. 
                    Bu, Evrimsel Mimari'nin en uç fitness function örneğidir.
                 </p>
              </div>
              <div className="glass-card" style={{ padding: '2rem', textAlign: 'center' }}>
                 <img 
                   src="https://netflixtechblog.com/1-5c8e3ca31333" 
                   alt="Chaos Engineering Visualization" 
                   style={{ width: '100%', borderRadius: '12px', display: 'none' }} // Placeholder if no image tool
                 />
                 <div style={{ fontSize: '5rem', marginBottom: '1rem' }}>🐒💥</div>
                 <div style={{ fontWeight: 700, fontSize: '1.2rem' }}>"What doesn't kill you makes you stronger."</div>
              </div>
           </div>
        </div>
      </section>

    </div>
  );
};

export default EvolutionaryPage;
