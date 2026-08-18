import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Sparkles, Code2, Scissors, CheckCircle2, Zap, AlignLeft } from 'lucide-react';
import ArchHero from '../components/ArchHero';
import SEO from '../components/SEO';
import { BoyScoutRuleSection } from '../components/cleancode/BoyScoutRuleSection';
import { NamingConventionsSection } from '../components/cleancode/NamingConventionsSection';
import { CodeSpecComparisonTab } from '../components/cleancode/CodeSpecComparisonTab';
import { FunctionsAndCommentsSection } from '../components/cleancode/FunctionsAndCommentsSection';

const CleanCodePage: React.FC = () => {
  const { i18n } = useTranslation();
  const isEn = (i18n.resolvedLanguage || i18n.language || 'tr').startsWith('en');
  const [activeTab, setActiveTab] = useState<'bad' | 'good'>('bad');

  const heroIllustration = (
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
  );

  return (
    <>
      <SEO
        title={isEn ? "Clean Code Principles & Software Craftsmanship | ArchAcademy" : "Clean Code Prensipleri ve Yazılım Zanaatkarlığı | ArchAcademy"}
        description={isEn 
          ? "Master Uncle Bob's Clean Code principles: Boy Scout rule, meaningful names, function SLAP, and code standards." 
          : "Clean Code prensipleri, İzcilik kuralı (Boy Scout Rule), isimlendirme standartları ve temiz fonksiyon tasarımı rehberi."
        }
        keywords="clean code, uncle bob, robert c martin, boy scout rule, naming conventions, refactoring, code quality"
        canonicalUrl="/clean-code"
      />
      <div style={{ minHeight: '100vh', background: 'var(--bg-dark)', color: 'var(--text-primary)' }}>
        <ArchHero 
          title="Clean Code"
          subtitle={isEn ? "The Art of Software Craftsmanship" : "Zanaatkarlık Sanatı"}
          description={isEn 
            ? "Writing code is easy; writing clean, maintainable code is craftsmanship. If you do not want to look at your code 6 months later and ask 'Who wrote this mess?', clean code is mandatory." 
            : "Yazdığın kodu 6 ay sonra açtığında 'Bunu hangi idiot yazdı?' demek istemiyorsan, Clean Code opsiyonel değil, bir zorunluluktur. Temiz kod, bir varış noktası değil; sürekli bir yolculuktur."
          }
          badge="Software Craftsmanship"
          color="#10b981"
          illustration={heroIllustration}
          features={[
            { 
              icon: <CheckCircle2 />, 
              title: isEn ? "Self-Documenting" : "Kendi Kendini Belgeleyen Kod", 
              desc: isEn ? "Code expressiveness that makes redundant comment lines obsolete." : "Kodun kendini dökümante etmesi." 
            },
            { 
              icon: <Zap />, 
              title: isEn ? "Boy-Scout Rule" : "İzcilik Kuralı (Boy Scout)", 
              desc: isEn ? "Always leave the legacy codebase cleaner than you checked it out." : "Bulduğundan daha temiz bırak." 
            },
            { 
              icon: <AlignLeft />, 
              title: isEn ? "Standardization" : "Stil Standardizasyonu", 
              desc: isEn ? "Uniform naming and structural guidelines shared across team members." : "Takım içi ortak dil ve kurallar." 
            }
          ]}
        />

        {/* --- PRACTICAL MODULAR CONTENT --- */}
        <section style={{ padding: '40px 0 100px' }}>
          <div className="container">
            <BoyScoutRuleSection />
            <NamingConventionsSection />
            <CodeSpecComparisonTab 
              activeTab={activeTab}
              onTabChange={setActiveTab}
            />
            <FunctionsAndCommentsSection />

            {/* CTA SECTION */}
            <div className="glass-card" style={{ padding: '4rem', textAlign: 'center', border: '1px solid var(--primary)', background: 'linear-gradient(180deg, rgba(59, 130, 246, 0.05) 0%, rgba(59, 130, 246, 0) 100%)' }}>
              <h3 style={{ fontSize: '2rem', marginBottom: '1rem', fontWeight: 900 }}>
                {isEn ? "Enough Talk. Let's Operate." : "Yeterince Konuştuk."}
              </h3>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '2.5rem', fontSize: '1.2rem', maxWidth: '700px', marginInline: 'auto' }}>
                {isEn 
                  ? "Theory is great, but code surgery is better. Ready to inspect real legacy anti-patterns converted into clean architecture?" 
                  : "Tüm bu anlattıklarım havada kalmasın. Gerçek hayattan alınmış, iğrenç kod örneklerini nasıl sanat eserine dönüştürdüğümüzü görmek ister misin?"
                }
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
                {isEn ? "Enter the Refactoring Operating Room" : "Ameliyathaneye Gir (Refactoring Surgery)"}
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
                  {isEn ? "The Philosophy" : "Felsefe"}
                </div>
                <p style={{ color: '#94a3b8', marginBottom: '2rem', fontSize: '1.1rem', lineHeight: 1.6 }}>
                  {isEn 
                    ? "Read essays and principles directly from Robert C. Martin (Uncle Bob), author of Clean Code and Clean Architecture." 
                    : "'Clean Code' kavramının yaratıcısı Robert C. Martin (Uncle Bob)'in blogundaki makaleler, bu disiplinin kaynağıdır."
                  }
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
    </>
  );
};

export default CleanCodePage;
