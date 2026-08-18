import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

export const InterpreterConceptTab: React.FC = () => {
  const { i18n } = useTranslation();
  const isEn = (i18n.resolvedLanguage || i18n.language || 'tr').startsWith('en');

  return (
    <motion.div
      key="concept"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
        <div>
          <h3 style={{ color: '#db2777', fontSize: '1.8rem', marginBottom: '1.5rem' }}>
            {isEn ? '"A Program within a Program"' : '"Program içinde Program"'}
          </h3>
          <p style={{ lineHeight: '1.7', color: '#cbd5e1', marginBottom: '20px' }}>
            {isEn 
              ? "Imagine an e-commerce platform. If discount logic ('10% off carts > $1000') is hardcoded inside compiled backend services, changing marketing rules requires engineering cycles, PR reviews, and redeployments." 
              : "Bir e-ticaret siteniz olduğunu düşünün. 'Sepette 1000 TL üzeri alana %10 indirim' kuralını Java/C# kodunun içine gömerseniz (Hardcode), kuralı değiştirmek için yazılımcıya ihtiyaç duyarsınız ve uygulamayı tekrar deploy etmeniz gerekir."
            }
          </p>
          <p style={{ lineHeight: '1.7', color: '#cbd5e1' }}>
            {isEn ? "With the Interpreter Pattern, business rules live in readable text/DSL:" : "Interpreter deseninde ise bu kural bir metin dosyasında saklanır:"} <br/>
            <code style={{ color: '#db2777' }}>IF CartTotal &gt; 1000 THEN ApplyDiscount(10)</code>
          </p>
          <p style={{ lineHeight: '1.7', color: '#cbd5e1' }}>
            {isEn 
              ? "Your app parses the syntax tree at runtime and executes it safely in a sandbox, empowering non-engineers to change business rules dynamically." 
              : "Uygulamanız bu metni okur, yorumlar ve çalıştırır. Böylece pazarlama ekibi bile kuralları anında değiştirebilir."
            }
          </p>
        </div>
        <div className="glass-card" style={{ border: '1px solid #db2777', background: 'rgba(219, 39, 119, 0.05)' }}>
          <h4 style={{ color: 'white', marginBottom: '20px' }}>
            {isEn ? "Real-World Examples" : "Gerçek Hayat Örnekleri"}
          </h4>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            <li style={{ marginBottom: '15px', display: 'flex', gap: '15px' }}>
              <div style={{ minWidth: '40px', height: '40px', background: '#334155', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>SQL</div>
              <div>
                <strong style={{ color: '#fff' }}>Database Engines</strong>
                <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
                  {isEn ? "SQL is raw text. The RDBMS parses it into an AST, generates execution plans, and queries tables." : "SQL bir metindir. Veritabanı motoru bunu yorumlar ve veriyi getirir."}
                </div>
              </div>
            </li>
            <li style={{ marginBottom: '15px', display: 'flex', gap: '15px' }}>
              <div style={{ minWidth: '40px', height: '40px', background: '#334155', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>RegEx</div>
              <div>
                <strong style={{ color: '#fff' }}>Regular Expressions</strong>
                <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
                  {isEn ? "Express complex string validation and search grammars in a single interpreted pattern string." : "Karmaşık metin arama kurallarını tek bir satırla tanımlamanızı sağlar."}
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </motion.div>
  );
};

export default InterpreterConceptTab;
