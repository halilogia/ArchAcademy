import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowRight, BookOpen, Code2, Lightbulb, Scale, CheckCircle2, XCircle, Sparkles } from 'lucide-react';
import SEO from './SEO';

interface PageTemplateProps {
  // SEO
  seoTitle: string;
  seoDescription: string;
  seoKeywords: string;
  canonicalUrl: string;

  // Hero Section
  heroTitle: string;
  heroSubtitle: string;
  heroIcon?: React.ReactNode;
  heroColor?: string;

  // Overview Section
  overviewTitle?: string;
  overviewDescription: string;
  overviewWhenToUse?: string;

  // Core Concepts
  coreConceptsTitle?: string;
  coreConcepts: {
    title: string;
    description: string;
    icon?: React.ReactNode;
  }[];

  // Architecture Structure
  architectureTitle?: string;
  architectureDescription?: string;
  architectureLayers: {
    name: string;
    description: string;
    examples: string[];
    color?: string;
  }[];

  // Code Examples
  codeExamplesTitle?: string;
  codeExamples: {
    title: string;
    description: string;
    code: string;
    language?: string;
  }[];

  // Pros & Cons
  prosConsTitle?: string;
  pros: string[];
  cons: string[];

  // When to Use
  whenToUseTitle?: string;
  whenToUse: string[];
  whenNotToUse?: string[];

  // Related Pages
  relatedPages?: {
    title: string;
    path: string;
    description: string;
  }[];

  // Custom Children
  children?: React.ReactNode;
}

const Card: React.FC<{ children: React.ReactNode; style?: React.CSSProperties }> = ({ children, style }) => (
  <motion.div
    whileHover={{ y: -4 }}
    transition={{ duration: 0.2 }}
    className="glass-card"
    style={{
      padding: '2rem',
      borderRadius: '24px',
      border: '1px solid var(--glass-border)',
      ...style
    }}
  >
    {children}
  </motion.div>
);

const SectionTitle: React.FC<{ children: React.ReactNode; icon?: React.ReactNode }> = ({ children, icon }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2rem' }}>
    {icon && <div style={{ color: 'var(--primary)' }}>{icon}</div>}
    <h2 style={{ fontSize: '2rem', fontWeight: 800, color: 'white', letterSpacing: '-0.5px' }}>
      {children}
    </h2>
  </div>
);

const Section: React.FC<{ children: React.ReactNode; style?: React.CSSProperties }> = ({ children, style }) => (
  <section style={{ padding: '4rem 0', ...style }}>
    <div className="container">{children}</div>
  </section>
);

export const PageTemplate: React.FC<PageTemplateProps> = ({
  seoTitle,
  seoDescription,
  seoKeywords,
  canonicalUrl,
  heroTitle,
  heroSubtitle,
  heroIcon,
  heroColor = 'var(--primary)',
  overviewTitle,
  overviewDescription,
  overviewWhenToUse,
  coreConceptsTitle,
  coreConcepts,
  architectureTitle,
  architectureDescription,
  architectureLayers,
  codeExamplesTitle,
  codeExamples,
  prosConsTitle,
  pros,
  cons,
  whenToUseTitle,
  whenToUse,
  whenNotToUse,
  relatedPages,
  children
}) => {
  const { i18n } = useTranslation();
  const isEn = (i18n.resolvedLanguage || i18n.language || 'tr').startsWith('en');

  const resolvedOverviewTitle = overviewTitle || (isEn ? 'Overview' : 'Genel Bakış');
  const resolvedCoreConceptsTitle = coreConceptsTitle || (isEn ? 'Core Concepts' : 'Temel Kavramlar');
  const resolvedArchitectureTitle = architectureTitle || (isEn ? 'Architecture Structure' : 'Mimari Yapı');
  const resolvedCodeExamplesTitle = codeExamplesTitle || (isEn ? 'Code Examples' : 'Kod Örnekleri');
  const resolvedProsConsTitle = prosConsTitle || (isEn ? 'Advantages & Trade-offs' : 'Avantajlar & Dezavantajlar');
  const resolvedWhenToUseTitle = whenToUseTitle || (isEn ? 'When to Use' : 'Ne Zaman Kullanılır?');

  return (
    <>
      <SEO title={seoTitle} description={seoDescription} keywords={seoKeywords} canonicalUrl={canonicalUrl} />

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
        {/* Hero Section */}
        <div style={{
          padding: '6rem 0 4rem',
          background: `linear-gradient(135deg, ${heroColor}10 0%, rgba(15, 23, 42, 0.9) 100%)`,
          borderBottom: '1px solid var(--glass-border)'
        }}>
          <div className="container">
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '2rem', marginBottom: '2rem' }}>
              {heroIcon && (
                <div style={{
                  width: '64px',
                  height: '64px',
                  background: `${heroColor}20`,
                  borderRadius: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: heroColor,
                  flexShrink: 0
                }}>
                  {heroIcon}
                </div>
              )}
              <div>
                <h1 style={{ fontSize: '3.5rem', fontWeight: 900, color: 'white', letterSpacing: '-2px', lineHeight: 1.1 }}>
                  {heroTitle}
                </h1>
                <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', marginTop: '1rem', maxWidth: '600px', lineHeight: 1.7 }}>
                  {heroSubtitle}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Overview Section */}
        <Section>
          <Card>
            <SectionTitle icon={<BookOpen size={24} />}>{resolvedOverviewTitle}</SectionTitle>
            <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: '1.5rem' }}>
              {overviewDescription}
            </p>
            {overviewWhenToUse && (
              <div style={{
                padding: '1.5rem',
                background: 'rgba(59, 130, 246, 0.1)',
                borderRadius: '16px',
                border: '1px solid rgba(59, 130, 246, 0.2)'
              }}>
                <strong style={{ color: '#60a5fa' }}>{isEn ? "💡 When to Use:" : "💡 Ne Zaman Kullanılır:"}</strong>
                <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem', lineHeight: 1.7 }}>{overviewWhenToUse}</p>
              </div>
            )}
          </Card>
        </Section>

        {/* Core Concepts */}
        <Section>
          <SectionTitle icon={<Lightbulb size={24} />}>{resolvedCoreConceptsTitle}</SectionTitle>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
            {coreConcepts.map((concept, index) => (
              <Card key={index}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                  {concept.icon && (
                    <div style={{ color: 'var(--primary)', flexShrink: 0 }}>
                      {concept.icon}
                    </div>
                  )}
                  <div>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'white', marginBottom: '0.5rem' }}>
                      {concept.title}
                    </h3>
                    <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                      {concept.description}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </Section>

        {/* Architecture Structure */}
        {architectureLayers.length > 0 && (
          <Section>
            <SectionTitle icon={<Code2 size={24} />}>{resolvedArchitectureTitle}</SectionTitle>
            {architectureDescription && (
              <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', marginBottom: '2rem', lineHeight: 1.7 }}>
                {architectureDescription}
              </p>
            )}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {architectureLayers.map((layer, index) => (
                <div
                  key={index}
                  style={{
                    padding: '1.5rem',
                    background: 'rgba(255, 255, 255, 0.02)',
                    borderRadius: '16px',
                    border: '1px solid var(--glass-border)',
                    borderLeft: `4px solid ${layer.color || 'var(--primary)'}`
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'white' }}>{layer.name}</h3>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      {layer.examples.map((ex, i) => (
                        <span
                          key={i}
                          style={{
                            fontSize: '0.75rem',
                            padding: '2px 8px',
                            background: 'rgba(255, 255, 255, 0.05)',
                            borderRadius: '6px',
                            color: 'var(--text-secondary)'
                          }}
                        >
                          {ex}
                        </span>
                      ))}
                    </div>
                  </div>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                    {layer.description}
                  </p>
                </div>
              ))}
            </div>
          </Section>
        )}

        {/* Code Examples */}
        {codeExamples.length > 0 && (
          <Section>
            <SectionTitle icon={<Code2 size={24} />}>{resolvedCodeExamplesTitle}</SectionTitle>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
              {codeExamples.map((example, index) => (
                <Card key={index}>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'white', marginBottom: '0.5rem' }}>
                    {example.title}
                  </h3>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '1rem', lineHeight: 1.6 }}>
                    {example.description}
                  </p>
                  <div style={{
                    background: '#0a0f1d',
                    borderRadius: '12px',
                    padding: '1rem',
                    overflowX: 'auto',
                    border: '1px solid rgba(255, 255, 255, 0.05)'
                  }}>
                    <pre style={{ margin: 0, fontSize: '0.85rem', color: '#e2e8f0', fontFamily: 'monospace' }}>
                      <code>{example.code}</code>
                    </pre>
                  </div>
                </Card>
              ))}
            </div>
          </Section>
        )}

        {/* Pros & Cons */}
        <Section>
          <SectionTitle icon={<Scale size={24} />}>{resolvedProsConsTitle}</SectionTitle>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            <Card style={{ borderTop: '4px solid #10b981' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
                <CheckCircle2 color="#10b981" size={24} />
                <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#10b981' }}>
                  {isEn ? "Advantages" : "Avantajlar"}
                </h3>
              </div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {pros.map((pro, index) => (
                  <li key={index} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', fontSize: '0.95rem', color: 'var(--text-secondary)' }}>
                    <span style={{ color: '#10b981' }}>•</span>
                    {pro}
                  </li>
                ))}
              </ul>
            </Card>

            <Card style={{ borderTop: '4px solid #ef4444' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
                <XCircle color="#ef4444" size={24} />
                <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#ef4444' }}>
                  {isEn ? "Disadvantages & Trade-offs" : "Dezavantajlar"}
                </h3>
              </div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {cons.map((con, index) => (
                  <li key={index} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', fontSize: '0.95rem', color: 'var(--text-secondary)' }}>
                    <span style={{ color: '#ef4444' }}>•</span>
                    {con}
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        </Section>

        {/* When to Use */}
        <Section>
          <SectionTitle icon={<CheckCircle2 size={24} />}>{resolvedWhenToUseTitle}</SectionTitle>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            <Card style={{ background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.05) 0%, transparent 100%)' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#10b981', marginBottom: '1rem' }}>
                {isEn ? "🚀 Ideal Use Cases" : "🚀 En İdeal Senaryolar"}
              </h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {whenToUse.map((item, index) => (
                  <li key={index} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', fontSize: '0.95rem', color: 'var(--text-secondary)' }}>
                    <span style={{ color: '#10b981' }}>✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </Card>

            {whenNotToUse && whenNotToUse.length > 0 && (
              <Card style={{ background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.05) 0%, transparent 100%)' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#ef4444', marginBottom: '1rem' }}>
                  {isEn ? "⚠️ When to Avoid" : "⚠️ Tercih Edilmemesi Gereken Durumlar"}
                </h3>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {whenNotToUse.map((item, index) => (
                    <li key={index} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', fontSize: '0.95rem', color: 'var(--text-secondary)' }}>
                      <span style={{ color: '#ef4444' }}>✗</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </Card>
            )}
          </div>
        </Section>

        {/* Related Pages */}
        {relatedPages && relatedPages.length > 0 && (
          <Section>
            <SectionTitle icon={<Sparkles size={24} />}>{isEn ? "Related Architectures" : "İlgili Mimariler"}</SectionTitle>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
              {relatedPages.map((page, index) => (
                <Link key={index} to={page.path} style={{ textDecoration: 'none' }}>
                  <Card style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div>
                      <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'white', marginBottom: '0.5rem' }}>
                        {page.title}
                      </h3>
                      <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                        {page.description}
                      </p>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--primary)', fontWeight: 600, fontSize: '0.85rem', marginTop: '1.5rem' }}>
                      {isEn ? "Explore" : "İncele"} <ArrowRight size={14} />
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </Section>
        )}

        {/* Custom Content */}
        {children}
      </motion.div>
    </>
  );
};

export default PageTemplate;