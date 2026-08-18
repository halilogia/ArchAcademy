import React from 'react';
import { Divide, XCircle, CheckCircle2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const NamingConventionsSection: React.FC = () => {
  const { i18n } = useTranslation();
  const isEn = (i18n.resolvedLanguage || i18n.language || 'tr').startsWith('en');

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '4rem', marginBottom: '6rem', alignItems: 'center' }}>
      <div>
        <h2 style={{ fontSize: '2rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <Divide color="#3b82f6" /> {isEn ? "Naming: The Hardest Craft in Software" : "İsimlendirme: En Zor Sanat"}
        </h2>
        <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: '1.5rem', fontSize: '1.05rem' }}>
          {isEn 
            ? "There are only two hard things in Computer Science: cache invalidation and naming things. Variable names must unambiguously convey intent, scope, and domain semantics without needing explanatory comments." 
            : "Yazılımda en zor iki şey vardır: 1. Cache Invalidation, 2. Şeylere isim vermek. Değişken ismin, o değişkenin ne işe yaradığını, neden var olduğunu ve nasıl kullanıldığını anlatmalı. Yorum satırına ihtiyaç duyuyorsan, isimlendirmen kötüdür."
          }
        </p>
        
        <div style={{ background: 'rgba(0,0,0,0.3)', padding: '1.5rem', borderRadius: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px', color: '#f87171' }}>
            <XCircle size={18} /> 
            <code style={{ fontSize: '0.9rem' }}>const d; // elapsed time in days</code>
            <span style={{ fontSize: '0.8rem', opacity: 0.6 }}>({isEn ? "If you must explain with a comment, you failed" : "Bunu yorumla açıklamak zorundaysan kaybettin"})</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#4ade80' }}>
            <CheckCircle2 size={18} /> 
            <code style={{ fontSize: '0.9rem' }}>const daysSinceModification;</code>
            <span style={{ fontSize: '0.8rem', opacity: 0.6 }}>({isEn ? "Self-explanatory and crystal clear" : "İsim her şeyi anlatıyor"})</span>
          </div>
        </div>
      </div>
      <div className="glass-card" style={{ padding: '2rem' }}>
        <h4 style={{ color: 'var(--primary)', marginBottom: '1rem' }}>
          {isEn ? "Forbidden Code Smells & Naming Anti-Patterns 🚫" : "Yasaklı Kelimeler Listesi 🚫"}
        </h4>
        <ul style={{ listStyle: 'none', padding: 0, color: 'var(--text-secondary)', lineHeight: 2 }}>
          <li>❌ <b>data, info, item:</b> {isEn ? "Ambiguous noise words. Which domain model?" : "Çok genel. Hangi data? Kullanıcı mı, Ürün mü?"}</li>
          <li>❌ <b>Manager, Processor:</b> {isEn ? "God Class smell; violates Single Responsibility." : "Tanrı sınıfı (God Class) kokusu alıyorum."}</li>
          <li>❌ <b>flag:</b> {isEn ? "Vague boolean. Name the condition (e.g. isVisible, hasPermission)." : "Boolean ama neyi kontrol ediyor? isVisible de."}</li>
          <li>❌ <b>utils, helpers:</b> {isEn ? "Architectural dumpster for unorganized code." : "Kodun çöplüğü. Oraya atılan bir daha bulunmaz."}</li>
        </ul>
      </div>
    </div>
  );
};

export default NamingConventionsSection;
