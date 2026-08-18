import React from 'react';
import { motion } from 'framer-motion';
import { AlignLeft, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export interface CodeSpecComparisonTabProps {
  activeTab: 'bad' | 'good';
  onTabChange: (tab: 'bad' | 'good') => void;
}

export const CodeSpecComparisonTab: React.FC<CodeSpecComparisonTabProps> = ({
  activeTab,
  onTabChange
}) => {
  const { i18n } = useTranslation();
  const isEn = (i18n.resolvedLanguage || i18n.language || 'tr').startsWith('en');

  return (
    <div style={{ marginBottom: '6rem' }}>
      <h2 style={{ fontSize: '2rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <AlignLeft color="#facc15" /> {isEn ? "Code Specification & Consistent Standards" : "Code Specification"}
      </h2>
      <div className="glass-card" style={{ padding: '2rem' }}>
        <p style={{ color: '#cbd5e1', marginBottom: '1.5rem', lineHeight: 1.7 }}>
          {isEn 
            ? "Clean Code is not just about intuitive names; it is about rigorous stylistic consistency. Establish a team-wide linter standard (e.g. Airbnb / Google Style Guide) and enforce it in CI pipelines." 
            : "Clean Code sadece güzel isimler vermek değildir; aynı zamanda tutarlı olmaktır. Ekip içinde (veya kendi projelerinizde) bir stil rehberi (Style Guide) belirleyin ve ona uyun. Tab vs Space tartışmasını bırakın, Linter'a ne diyorsanız onu yapın."
          }
        </p>

        <div style={{ display: 'flex', gap: '20px', marginBottom: '20px', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '20px' }}>
          <button 
            onClick={() => onTabChange('bad')}
            style={{ 
              background: activeTab === 'bad' ? 'rgba(239, 68, 68, 0.2)' : 'transparent', 
              color: activeTab === 'bad' ? '#fca5a5' : '#94a3b8',
              border: 'none', padding: '10px 20px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold'
            }}
          >
            <AlertTriangle size={16} style={{ marginRight: '5px', verticalAlign: 'text-bottom' }} />
            {isEn ? "Spaghetti Code (No Spec / Cryptic)" : "Spaghetti Code (No Spec)"}
          </button>
          <button 
            onClick={() => onTabChange('good')}
            style={{ 
              background: activeTab === 'good' ? 'rgba(16, 185, 129, 0.2)' : 'transparent', 
              color: activeTab === 'good' ? '#6ee7b7' : '#94a3b8',
              border: 'none', padding: '10px 20px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold'
            }}
          >
            <CheckCircle2 size={16} style={{ marginRight: '5px', verticalAlign: 'text-bottom' }} />
            {isEn ? "Clean Code (Standardized & Typed)" : "Clean Code (Standardized)"}
          </button>
        </div>

        <div style={{ fontFamily: 'monospace', fontSize: '0.9rem', background: '#020617', padding: '20px', borderRadius: '12px', minHeight: '300px', overflowX: 'auto' }}>
          {activeTab === 'bad' ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div style={{ color: '#94a3b8' }}>// ❌ {isEn ? "Inconsistent formatting, cryptic names, missing types" : "Karışık syntax, tutarsız isimlendirme"}</div>
              <br/>
              <div style={{ color: '#fca5a5' }}>var</div> u = <span style={{ color: '#eab308' }}>"John"</span>; <span style={{ color: '#64748b' }}>// {isEn ? "Cryptic variable name" : "Çok kısa değişken"}</span>
              <br/>
              <div style={{ color: '#fca5a5' }}>function</div> <span style={{ color: '#60a5fa' }}>GT_USR_DT</span>(id) {'{'} <span style={{ color: '#64748b' }}>// {isEn ? "Unreadable function name" : "Anlaşılmaz fonksiyon ismi"}</span>
              <br/>
              &nbsp;&nbsp;<div style={{ color: '#fca5a5' }}>if</div>(id==0) <div style={{ color: '#fca5a5' }}>return</div> <span style={{ color: '#fca5a5' }}>null</span>  <span style={{ color: '#64748b' }}>// {isEn ? "Missing curly braces" : "Süslü parantez yok"}</span>
              <br/>
              &nbsp;&nbsp;&nbsp;&nbsp;let  x=   db.fetch(id) <span style={{ color: '#64748b' }}>// {isEn ? "Irregular whitespace, missing semicolon" : "Gereksiz boşluklar, noktalı virgül eksik"}</span>
              <br/>
              &nbsp;&nbsp;<div style={{ color: '#fca5a5' }}>return</div> x;
              <br/>
              {'}'}
            </motion.div>
          ) : (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div style={{ color: '#94a3b8' }}>// ✅ {isEn ? "Airbnb / Google TypeScript Style Guide compliant" : "Airbnb Style Guide uyumlu"}</div>
              <br/>
              <div style={{ color: '#c084fc' }}>const</div> <span style={{ color: '#facc15' }}>DEFAULT_USER_NAME</span> = <span style={{ color: '#eab308' }}>'John'</span>;
              <br/>
              <br/>
              <div style={{ color: '#64748b' }}>/**</div>
              <br/>
              <div style={{ color: '#64748b' }}> * Retrieves user domain model by unique identifier.</div>
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
  );
};

export default CodeSpecComparisonTab;
