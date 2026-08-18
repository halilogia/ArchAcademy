import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const BoyScoutRuleSection: React.FC = () => {
  const { i18n } = useTranslation();
  const isEn = (i18n.resolvedLanguage || i18n.language || 'tr').startsWith('en');

  return (
    <div style={{ marginBottom: '6rem' }}>
      <h2 style={{ fontSize: '2rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <CheckCircle2 color="#10b981" /> {isEn ? "The Boy Scout Rule" : "İzcilik Kuralı (Boy Scout Rule)"}
      </h2>
      <div className="glass-card" style={{ padding: '2.5rem', background: 'rgba(16, 185, 129, 0.05)', border: '1px solid rgba(16, 185, 129, 0.1)' }}>
        <p style={{ fontSize: '1.1rem', lineHeight: 1.7, color: '#e2e8f0', marginBottom: '1.5rem' }}>
          {isEn 
            ? 'Robert C. Martin\'s (Uncle Bob) golden heuristic is simple: "Always leave the campground cleaner than you found it."' 
            : 'Robert C. Martin\'in en sevdiğim kuralı basittir: "Kamp alanını bulduğundan daha temiz bırak."'
          }
        </p>
        <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>
          {isEn 
            ? 'When opening a legacy file to fix a single bug and spotting a poorly named variable, do not ignore it. Refactor it right then and there. Continuous micro-cleanups permanently prevent technical debt from accumulating into unmanageable legacy mudballs.' 
            : 'Bir dosyayı açtın ve sadece bir bug düzelteceksin. Gözüne kötü isimlendirilmiş bir değişken takıldı. "Aman şimdi kim uğraşacak, testler patlar" deme. Düzelt. O an düzelt. Eğer her yazılımcı girdiği dosyayı birazcık temizleseydi, teknik borç (technical debt) diye bir kavram olmazdı. Büyük refactoring haftaları düzenlemeye gerek kalmazdı. Ufak dokunuşlar, büyük kaosları önler.'
          }
        </p>
      </div>
    </div>
  );
};

export default BoyScoutRuleSection;
