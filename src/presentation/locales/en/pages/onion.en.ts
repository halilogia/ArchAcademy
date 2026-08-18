The user wants me to translate Turkish software architecture component content into English. The content is a React/TypeScript file `onion.tsx` containing Turkish text strings that need to be translated to English, while preserving all code structure, JSX, imports, CSS, etc.

Let me identify the Turkish text to translate:

1. "Mimari Çekirdek Kuralları" → "Architectural Core Rules"
2. "Bağımlılıkların yönü her zaman merkeze doğrudur." → "Dependency direction always points toward the center."
3. "1. Bağımlılık Yönü (Dependency)" → "1. Dependency Direction"
4. "Tüm katmanlar sadece kendisinden daha "içte" olan katmana erişebilir. Dış katmanlar iç katmanları bilir, ancak iç katmanlar dış dünya hakkında hiçbir fikre sahip değildir." → "All layers can only access layers further "inside" than themselves. Outer layers know inner layers, but inner layers have no knowledge of the outside world."
5. "Örn:" → "E.g.:"
6. "Domain katmanı veritabanını (Persistence) veya Web API'yi bilmez." → "The Domain layer knows nothing about the database (Persistence) or the Web API."
7. "2. Soyutlama (Abstraction)" → "2. Abstraction"
8. "İç katmanlar (Domain/Core), dış dünyadaki sistemlerle (DB, API, Mail) haberleşmek için <strong>Interface</strong> tanımlar. Bu arayüzlerin gerçek implementasyonları en dış katmanda (Infrastructure) yapılır." → "Inner layers (Domain/Core) define <strong>Interfaces</strong> to communicate with external systems (DB, API, Mail). Actual implementations of these interfaces live in the outermost layer (Infrastructure)."
9. "Katman Hiyerarşisi" → "Layer Hierarchy"
10. "Infrastructure (Dış)" → "Infrastructure (Outer)" ... though "Infrastructure (Dış)" has the parenthetical
11. "Veritabanı, Web API Framework, Dosya Sistemi." → "Database, Web API Framework, File System."
12. "Application Services" → stays
13. "UseCase koordinasyonu, Interface implementasyonları." → "UseCase coordination, Interface implementations."
14. "Domain Services" → stays
15. "Birden fazla Entity'yi ilgilendiren iş mantığı." → "Business logic spanning multiple Entities."
16. "Domain Model (Merkez)" → "Domain Model (Center)"
17. "Saf iş kuralları, Entityler ve Value Objectler." → "Pure business rules, Entities, and Value Objects."
18. "Özet: Katmanların Gücü" → "Summary: The Power of Layers"
19. "Onion Architecture, yazılımın teknik detaylarını (UI, DATABASE) en dışta bırakarak "İş Kurallarını" koruma altına alır. Bu mimaride kodunuz bir soğana benzer; dış katmanları soysanız dahi, en içteki değerli çekirdek (Business Logic) hiçbir zarar görmeden çalışmaya devam eder." → "Onion Architecture shields "Business Rules" by keeping technical details (UI, DATABASE) at the outermost edge. In this architecture your code resembles an onion; even if you peel away the outer layers, the valuable core (Business Logic) at the center keeps running without harm."
20. "2008 yılında Jeffrey Palermo tarafından ortaya atılan "Onion Architecture", bağımlılıkların yönünü tersine çevirerek modern mimarinin temellerini atmıştır." → 'Coined by Jeffrey Palermo in 2008, "Onion Architecture" inverted the direction of dependencies and laid the foundations of modern architecture.'
21. "The Origin" → stays (already English)

Wait, the instructions say to respond like terse caveman. But this is a translation task where the output should be the translated code. The caveman style applies to the conversational framing, but the actual deliverable is the translated TypeScript file. The instruction says "Output ONLY clean, valid TypeScript / code as requested, with NO markdown backtick wrapping unless specifically requested." So I should output the full translated file without backticks.

Let me re-read the system prompt carefully:

"STRICT TECHNICAL RULES:
1. PRESERVE TECHNICAL TERMS: Do NOT translate industry-standard software terms literally. Keep terms like:
   - "Bounded Context", "Aggregate Root", "Domain-Driven Design", "Single Responsibility", "Open-Closed",
   - "Dependency Inversion", "Tight Coupling", "High Cohesion", "Event Sourcing", "CQRS", "Outbox Pattern",
   - "Vertical Slice", "Clean Architecture", "Hexagonal Architecture", "Port & Adapter", "Vibe Coding".
2. PRESERVE CODE & SYNTAX: Never alter JSX, TypeScript types, variables, HTML tags, or code blocks.
3. OUTPUT FORMAT: Output ONLY clean, valid TypeScript / code as requested, with NO markdown backtick wrapping unless specifically requested.
4. TONE: Authoritative, senior-level, crystal clear, concise software engineering tone."

"Respond like terse caveman. All technical substance stay exact, only fluff die. Drop: articles (a/an/the), filler..."

Hmm, the caveman style instruction conflicts with translating prose text. The prose inside the component should be idiomatic English, not caveman. The caveman style is for my own conversational responses, not for the translated content. The task says "translate into flawless, idiomatic American English" — so the translation itself must be idiomatic. The caveman style governs my meta-communication around the task. But since the output format says "Output ONLY clean, valid TypeScript / code as requested", I should just output the translated file.

Actually, considering the tension: The primary directive is the translation task. The caveman style is a general response style. For this specific output, the code must be clean and idiomatic. I'll output just the translated file without commentary, without markdown backticks. That satisfies "Output ONLY clean, valid TypeScript".

Let me now produce the translation carefully, preserving all code structure.

Original file:

```tsx
import React from 'react';
import { motion } from 'framer-motion';
import OnionHero from '../components/OnionHero';
import OnionDiagram from '../components/OnionDiagram';
import OnionPractical from '../components/OnionPractical';
import { theme } from '../themes/theme';

const OnionPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{ background: theme.colors.bgDark }}
    >
      <OnionHero />
      <OnionDiagram />
      <OnionPractical />

      <section style={{ padding: '80px 0', background: 'rgba(2, 6, 23, 0.3)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 className="section-title">Mimari Çekirdek Kuralları</h2>
            <p style={{ color: theme.colors.textSecondary }}>Bağımlılıkların yönü her zaman merkeze doğrudur.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem' }}>
            <div className="glass-card" style={{ borderLeft: `4px solid ${theme.colors.layers.entities}` }}>
              <h3 style={{ marginBottom: '1.5rem', color: theme.colors.layers.entities }}>1. Bağımlılık Yönü (Dependency)</h3>
              <p style={{ color: theme.colors.textSecondary, lineHeight: 1.8 }}>
                Tüm katmanlar sadece kendisinden daha "içte" olan katmana erişebilir.
                Dış katmanlar iç katmanları bilir, ancak iç katmanlar dış dünya hakkında hiçbir fikre sahip değildir.
                <br /><br />
                <span style={{ color: theme.colors.textPrimary, fontWeight: 600 }}>Örn:</span> Domain katmanı veritabanını (Persistence) veya Web API'yi bilmez.
              </p>
            </div>

            <div className="glass-card" style={{ borderLeft: `4px solid ${theme.colors.layers.entities}` }}>
              <h3 style={{ marginBottom: '1.5rem', color: theme.colors.layers.entities }}>2. Soyutlama (Abstraction)</h3>
              <p style={{ color: theme.colors.textSecondary, lineHeight: 1.8 }}>
                İç katmanlar (Domain/Core), dış dünyadaki sistemlerle (DB, API, Mail) haberleşmek için
                <strong>Interface</strong> tanımlar. Bu arayüzlerin gerçek implementasyonları en dış katmanda (Infrastructure) yapılır.
              </p>
            </div>
          </div>

          <div style={{ marginTop: '4rem' }}>
            <h3 style={{ textAlign: 'center', marginBottom: '2rem' }}>Katman Hiyerarşisi</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {[
                { name: 'Infrastructure (Dış)', color: theme.colors.surfaceLight, desc: 'Veritabanı, Web API Framework, Dosya Sistemi.' },
                { name: 'Application Services', color: '#475569', desc: 'UseCase koordinasyonu, Interface implementasyonları.' },
                { name: 'Domain Services', color: theme.colors.surface, desc: "Birden fazla Entity'yi ilgilendiren iş mantığı." },
                { name: 'Domain Model (Merkez)', color: theme.colors.layers.entities, desc: 'Saf iş kuralları, Entityler ve Value Objectler.' },
              ].map((layer, i) => (
                <div key={i} style={{
                  padding: '20px',
                  background: layer.color,
                  borderRadius: '12px',
                  border: '1px solid rgba(255,255,255,0.05)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <strong style={{ color: theme.colors.textPrimary }}>{layer.name}</strong>
                  <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem' }}>{layer.desc}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section style={{ padding: '80px 0', borderTop: '1px solid var(--glass-border)' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <div className="glass-card" style={{
            background: 'linear-gradient(135deg, rgba(244, 63, 94, 0.1) 0%, rgba(251, 113, 133, 0.1) 100%)',
            padding: '4rem'
          }}>
            <h3 style={{ marginBottom: '1.5rem' }}>Özet: Katmanların Gücü</h3>
            <p style={{ maxWidth: '800px', margin: '0 auto', color: 'var(--text-secondary)', lineHeight: 1.8 }}>
              Onion Architecture, yazılımın teknik detaylarını (UI, DATABASE) en dışta bırakarak
              "İş Kurallarını" koruma altına alır. Bu mimaride kodunuz bir soğana benzer;
              dış katmanları soysanız dahi, en içteki değerli çekirdek (Business Logic)
              hiçbir zarar görmeden çalışmaya devam eder.
            </p>
          </div>
        </div>
      </section>

      <section style={{ padding: '4rem 0', background: 'rgba(0,0,0,0.3)', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
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
              The Origin
            </div>
            <p style={{ color: '#94a3b8', marginBottom: '2rem', fontSize: '1.1rem', lineHeight: 1.6 }}>
              2008 yılında Jeffrey Palermo tarafından ortaya atılan "Onion Architecture", bağımlılıkların yönünü tersine çevirerek modern mimarinin temellerini atmıştır.
            </p>

            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <a
                href="https://jeffreypalermo.com/2008/07/the-onion-architecture-part-1/"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex', alignItems: 'center', gap: '8px',
                  background: 'rgba(244, 63, 94, 0.15)', color: '#fda4af',
                  padding: '12px 24px', borderRadius: '12px', textDecoration: 'none', fontWeight: 600,
                  border: '1px solid rgba(244, 63, 94, 0.2)', transition: 'all 0.2s'
                }}
              >
                The Onion Architecture (Jeffrey Palermo) <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" /></svg>
              </a>
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default OnionPage;
```

Now translations:

- "Mimari Çekirdek Kuralları" → "Architectural Core Rules"
- "Bağımlılıkların yönü her zaman merkeze doğrudur." → "Dependency direction always points toward the center."
- "1. Bağımlılık Yönü (Dependency)" → "1. Dependency Direction" — the original has "(Dependency)" as parenthetical clarification. Since it's already an English word, keep as is: "1. Dependency Direction (Dependency)"? Hmm. The original Turkish heading includes "(Dependency)" for clarity. Since we're translating to English and "Dependency Direction" is already clear, keeping "(Dependency)" would be redundant but harmless. The rule says preserve technical terms. I think best approach: "1. Dependency Direction" — drop redundant parenthetical since it's redundant in English. Actually the original author included "(Dependency)" as the English term. Once translated, "Bağımlılık Yönü" → "Dependency Direction", so the parenthetical is redundant. Translating it as "1. Dependency Direction (Dependency)" would look odd. I'll drop it. Same for "2. Soyutlama (Abstraction)" → "2. Abstraction".

Wait, but "flawless idiomatic" — yes, drop the redundant parentheticals.

- Body paragraph: "Tüm katmanlar sadece kendisinden daha "içte" olan katmana erişebilir. Dış katmanlar iç katmanları bilir, ancak iç katmanlar dış dünya hakkında hiçbir fikre sahip değildir." → "All layers can access only layers further "inside" than themselves. Outer layers are aware of inner layers, but inner layers have no knowledge of the outside world."

Note: The quotes around "içte" — in Turkish typography they use straight quotes or curly. I'll keep with curly quotes: "inside". Actually original uses "içte" with curly quotes in source. Keep equivalent.

- "Örn:" → "E.g.:" — with colon, or "Example:"? "Örn:" is abbreviation for "Örnek" = "Example". Use "E.g.:" or "Example:". I'll use "Example:".

- "Domain katmanı veritabanını (Persistence) veya Web API'yi bilmez." → "The Domain layer knows nothing about the database (Persistence) or the Web API." Note the apostrophe in "Web API'yi" is Turkish suffix; translated out.

- "İç katmanlar (Domain/Core), dış dünyadaki sistemlerle (DB, API, Mail) haberleşmek için