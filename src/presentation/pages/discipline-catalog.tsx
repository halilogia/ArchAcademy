import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Award, Flame, Link2, Sparkles, BookOpen } from 'lucide-react';
import SEO from '../components/SEO';
import { useDisciplineStreak } from '../components/disciplinechain/useDisciplineStreak';
import { DisciplineChainHeader } from '../components/disciplinechain/DisciplineChainHeader';
import { DisciplineChainColumn } from '../components/disciplinechain/DisciplineChainColumn';

const DisciplineCatalogPage: React.FC = () => {
  const { i18n } = useTranslation();
  const isEn = (i18n.resolvedLanguage || i18n.language || 'tr').startsWith('en');
  const streak = useDisciplineStreak();

  return (
    <>
      <SEO
        title={isEn ? "Engineering Discipline Chain & Habits Matrix | ArchAcademy" : "Mühendislik Disiplinleri & Zinciri Kırma Matrisi | ArchAcademy"}
        description={isEn 
          ? "Unbroken daily engineering disciplines: SOLID, Clean Code, TDD, ADR documentation, and Security Architecture." 
          : "Yazılım mühendisliği disiplinleri ve 'Zinciri Kırma' alışkanlık protokolü: SOLID, Clean Code, TDD, ADR ve Mimari Güvenlik."
        }
        keywords="engineering disciplines, dont break the chain, solid principles, clean code, tdd, adr, security architecture"
        canonicalUrl="/discipline-catalog"
      />
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        style={{ 
          background: 'radial-gradient(ellipse at top, #090d16 0%, #020617 100%)', 
          minHeight: '100vh', 
          paddingTop: '110px', 
          paddingBottom: '80px',
          overflowX: 'hidden' 
        }}
      >
        <div className="container">
          {/* Streak Header */}
          <DisciplineChainHeader
            completedCount={streak.completedCount}
            totalLinks={streak.totalLinks}
            streakPercent={streak.streakPercent}
            isChainMaster={streak.isChainMaster}
          />

          {/* 4 Connected Chain Columns */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '2rem',
            marginBottom: '4rem'
          }}>
            {streak.categories.map((category, index) => (
              <DisciplineChainColumn
                key={category.id}
                category={category}
                isCompleted={streak.isCompleted}
                columnIndex={index}
              />
            ))}
          </div>

          {/* Footer Philosophy Note */}
          <section style={{ textAlign: 'center', marginTop: '2rem' }}>
            <div style={{ 
              display: 'inline-flex', 
              alignItems: 'center', 
              gap: '1rem', 
              background: 'rgba(255, 255, 255, 0.03)', 
              padding: '1.25rem 2.5rem', 
              borderRadius: '16px', 
              border: '1px solid #1e293b' 
            }}>
              <Flame size={24} color="#f97316" />
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontSize: '0.8rem', color: '#fb923c', textTransform: 'uppercase', fontWeight: 800 }}>
                  {isEn ? "The Law of Unbroken Habits" : "Sarsılmaz Disiplin Yasası"}
                </div>
                <div style={{ color: 'white', fontWeight: 600, fontSize: '0.95rem' }}>
                  {isEn 
                    ? '"Quality is not an act, it is a habit." — Aristotle (Applied to Clean Software Architecture)' 
                    : '"Mükemmellik bir eylem değil, bir alışkanlıktır." — Aristoteles (Yazılım Mimarisine Uyarlaması)'
                  }
                </div>
              </div>
            </div>
          </section>
        </div>
      </motion.div>
    </>
  );
};

export default DisciplineCatalogPage;
