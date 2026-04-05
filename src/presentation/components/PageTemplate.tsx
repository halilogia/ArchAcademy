import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Code2, Lightbulb, Scale, CheckCircle2 } from 'lucide-react';
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

  // Custom Content (optional)
  children?: React.ReactNode;
}

const Section: React.FC<{ id?: string; className?: string; children: React.ReactNode }> = ({ id, className = '', children }) => (
  <section id={id} className={`container ${className}`} style={{ padding: '4rem 0' }}>
    {children}
  </section>
);

const SectionTitle: React.FC<{ children: React.ReactNode; icon?: React.ReactNode }> = ({ children, icon }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '2rem' }}>
    {icon && <div style={{ color: 'var(--primary)' }}>{icon}</div>}
    <h2 style={{ fontSize: '2rem', fontWeight: 800, color: 'white', letterSpacing: '-1px' }}>{children}</h2>
  </div>
);

const Card: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <div className={`glass-card ${className}`} style={{
    padding: '2rem',
    borderRadius: '20px',
    border: '1px solid var(--glass-border)',
    background: 'rgba(255,255,255,0.02)'
  }}>
    {children}
  </div>
);

const PageTemplate: React.FC<PageTemplateProps> = ({
  seoTitle,
  seoDescription,
  seoKeywords,
  canonicalUrl,
  heroTitle,
  heroSubtitle,
  heroIcon,
  heroColor = 'var(--primary)',
  overviewTitle = 'Genel Bakış',
  overviewDescription,
  overviewWhenToUse,
  coreConceptsTitle = 'Temel Kavramlar',
  coreConcepts,
  architectureTitle = 'Mimari Yapı',
  architectureDescription,
  architectureLayers,
  codeExamplesTitle = 'Kod Örnekleri',
  codeExamples,
  prosConsTitle = 'Avantajlar & Dezavantajlar',
  pros,
  cons,
  whenToUseTitle = 'Ne Zaman Kullanılır?',
  whenToUse,
  whenNotToUse,
  relatedPages,
  children
}) => {
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
            <SectionTitle icon={<BookOpen size={24} />}>{overviewTitle}</SectionTitle>
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
                <strong style={{ color: '#60a5fa' }}>💡 Ne Zaman Kullanılır:</strong>
                <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem', lineHeight: 1.7 }}>{overviewWhenToUse}</p>
              </div>
            )}
          </Card>
        </Section>

        {/* Core Concepts */}
        <Section>
          <SectionTitle icon={<Lightbulb size={24} />}>{coreConceptsTitle}</SectionTitle>
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
            <SectionTitle icon={<Code2 size={24} />}>{architectureTitle}</SectionTitle>
            {architectureDescription && (
              <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', marginBottom: '2rem', lineHeight: 1.7 }}>
                {architectureDescription}
              </p>
            )}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {architectureLayers.map((layer, index) => (
                <Card key={index}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1.5rem' }}>
                    <div style={{
                      width: '48px',
                      height: '48px',
                      background: `${layer.color || heroColor}20`,
                      borderRadius: '14px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: layer.color || heroColor,
                      fontWeight: 800,
                      flexShrink: 0
                    }}>
                      {index + 1}
                    </div>
                    <div style={{ flex: 1 }}>
                      <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'white', marginBottom: '0.5rem' }}>
                        {layer.name}
                      </h3>
                      <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '1rem' }}>
                        {layer.description}
                      </p>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                        {layer.examples.map((example, i) => (
                          <span key={i} style={{
                            padding: '4px 12px',
                            background: 'rgba(255,255,255,0.05)',
                            borderRadius: '100px',
                            fontSize: '0.75rem',
                            color: 'var(--text-secondary)'
                          }}>
                            {example}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </Section>
        )}

        {/* Code Examples */}
        {codeExamples.length > 0 && (
          <Section>
            <SectionTitle icon={<Code2 size={24} />}>{codeExamplesTitle}</SectionTitle>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              {codeExamples.map((example, index) => (
                <Card key={index}>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'white', marginBottom: '0.5rem' }}>
                    {example.title}
                  </h3>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '1.5rem', lineHeight: 1.6 }}>
                    {example.description}
                  </p>
                  <pre style={{
                    background: 'rgba(0,0,0,0.3)',
                    padding: '1.5rem',
                    borderRadius: '12px',
                    overflow: 'auto',
                    fontSize: '0.85rem',
                    lineHeight: 1.6,
                    color: '#e2e8f0',
                    border: '1px solid rgba(255,255,255,0.05)'
                  }}>
                    <code>{example.code}</code>
                  </pre>
                </Card>
              ))}
            </div>
          </Section>
        )}

        {/* Pros & Cons */}
        <Section>
          <SectionTitle icon={<Scale size={24} />}>{prosConsTitle}</SectionTitle>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
            <Card>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#10b981', marginBottom: '1rem' }}>
                ✅ Avantajlar
              </h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {pros.map((pro, index) => (
                  <li key={index} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.8rem', marginBottom: '0.8rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                    <CheckCircle2 size={16} color="#10b981" style={{ flexShrink: 0, marginTop: '2px' }} />
                    {pro}
                  </li>
                ))}
              </ul>
            </Card>
            <Card>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#ef4444', marginBottom: '1rem' }}>
                ❌ Dezavantajlar
              </h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {cons.map((con, index) => (
                  <li key={index} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.8rem', marginBottom: '0.8rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                    <span style={{ color: '#ef4444', fontWeight: 700, flexShrink: 0 }}>•</span>
                    {con}
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        </Section>

        {/* When to Use */}
        <Section>
          <SectionTitle icon={<Lightbulb size={24} />}>{whenToUseTitle}</SectionTitle>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
            <Card>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#10b981', marginBottom: '1rem' }}>
                ✅ Kullanım Durumları
              </h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {whenToUse.map((item, index) => (
                  <li key={index} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.8rem', marginBottom: '0.8rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                    <CheckCircle2 size={16} color="#10b981" style={{ flexShrink: 0, marginTop: '2px' }} />
                    {item}
                  </li>
                ))}
              </ul>
            </Card>
            {whenNotToUse && whenNotToUse.length > 0 && (
              <Card>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#ef4444', marginBottom: '1rem' }}>
                  ❌ Kullanılmaması Gereken Durumlar
                </h3>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {whenNotToUse.map((item, index) => (
                    <li key={index} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.8rem', marginBottom: '0.8rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                      <span style={{ color: '#ef4444', fontWeight: 700, flexShrink: 0 }}>•</span>
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
            <SectionTitle icon={<BookOpen size={24} />}>İlgili Sayfalar</SectionTitle>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
              {relatedPages.map((page, index) => (
                <Link key={index} to={page.path} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <Card>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                      <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'white' }}>{page.title}</h3>
                      <ArrowRight size={16} color="var(--primary)" />
                    </div>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                      {page.description}
                    </p>
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