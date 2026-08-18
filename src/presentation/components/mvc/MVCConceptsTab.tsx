import React from 'react';
import { motion } from 'framer-motion';
import { Database, Layout, Settings, CheckCircle2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const MVCConceptsTab: React.FC = () => {
  const { i18n } = useTranslation();
  const isEn = (i18n.resolvedLanguage || i18n.language || 'tr').startsWith('en');

  return (
    <motion.div
      key="concepts"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
        <div className="glass-card">
          <h3 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '1rem', color: '#ec4899', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Database size={24} /> Model
          </h3>
          <p style={{ lineHeight: 1.6, color: 'var(--text-secondary)' }}>
            {isEn 
              ? "Encapsulates application state, domain data structures, and fundamental business rules. Completely unaware of visual presentation." 
              : "Uygulamanın verisini ve iş kurallarını temsil eder. Veritabanı sorguları, veri doğrulama ve hesaplamalar buradadır."
            }
            <br/><br/>
            <span style={{ color: 'white', fontWeight: 600 }}>{isEn ? "Example: " : "Örnek: "}</span><code>User</code> {isEn ? "domain class, " : "sınıfı, "}<code>Product</code> {isEn ? "database entity schema." : "veritabanı tablosu."}
          </p>
        </div>
        <div className="glass-card">
          <h3 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '1rem', color: '#3b82f6', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Layout size={24} /> View
          </h3>
          <p style={{ lineHeight: 1.6, color: 'var(--text-secondary)' }}>
            {isEn 
              ? "Renders formatted output to the user based on Model data provided by the Controller." 
              : "Verinin kullanıcıya nasıl gösterileceğinden sorumludur. Model'i görselleştirir."
            }
            <br/><br/>
            <span style={{ color: 'white', fontWeight: 600 }}>{isEn ? "Example: " : "Örnek: "}</span>HTML template, React Component, User Profile Screen.
          </p>
        </div>
        <div className="glass-card">
          <h3 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '1rem', color: '#f59e0b', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Settings size={24} /> Controller
          </h3>
          <p style={{ lineHeight: 1.6, color: 'var(--text-secondary)' }}>
            {isEn 
              ? "Receives user input (HTTP requests, form submissions), executes operations on the Model, and selects which View to render." 
              : "Kullanıcı girdisini (Input) alır, yorumlar ve Model'i günceller. Ardından hangi View'un gösterileceğine karar verir."
            }
            <br/><br/>
            <span style={{ color: 'white', fontWeight: 600 }}>{isEn ? "Example: " : "Örnek: "}</span><code>UserController.save()</code> backend routing endpoint.
          </p>
        </div>
      </div>

      <div style={{ marginTop: '3rem', padding: '2rem', background: 'var(--bg-dark)', borderRadius: '24px' }}>
        <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '1.5rem' }}>
          {isEn ? "Why MVC Remains Enduringly Vital" : "Neden MVC Hala Önemli?"}
        </h3>
        <ul style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <li style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
            <CheckCircle2 color="#10b981" size={20} style={{ marginTop: '2px' }} />
            <div>
              <strong style={{ color: 'white' }}>{isEn ? "Mental Simplicity:" : "Basitlik:"}</strong> {isEn ? "Predictable request flow: Request → Controller → Model Mutation → Render View." : "Veri akışını anlamak kolaydır. İstek gelir → Controller işler → Model güncellenir → View döner."}
            </div>
          </li>
          <li style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
            <CheckCircle2 color="#10b981" size={20} style={{ marginTop: '2px' }} />
            <div>
              <strong style={{ color: 'white' }}>{isEn ? "SEO & Performance (SSR):" : "SEO Dostu:"}</strong> {isEn ? "Server-rendered MVC frameworks deliver pre-rendered HTML payloads for optimal web indexability." : "Server-Side Rendering (SSR) yapan MVC frameworkleri, arama motorları için tamamlanmış HTML sunar."}
            </div>
          </li>
          <li style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
            <CheckCircle2 color="#10b981" size={20} style={{ marginTop: '2px' }} />
            <div>
              <strong style={{ color: 'white' }}>{isEn ? "Ubiquitous Standards:" : "Yaygınlık:"}</strong> {isEn ? "Forms the backbone of enterprise web engines: Ruby on Rails, Django, Laravel, ASP.NET MVC, Spring Boot." : "Ruby on Rails, Django, Laravel, ASP.NET MVC gibi devasa frameworklerin temelidir."}
            </div>
          </li>
        </ul>
      </div>
    </motion.div>
  );
};

export default MVCConceptsTab;
