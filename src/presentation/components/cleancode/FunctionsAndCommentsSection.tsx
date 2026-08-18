import React from 'react';
import { motion } from 'framer-motion';
import { Divide, Sparkles } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const PrincipleCard = ({ title, desc, icon }: { title: string; desc: string; icon: React.ReactNode }) => (
  <motion.div 
    whileHover={{ y: -5 }}
    className="glass-card" 
    style={{ padding: '2rem', height: '100%' }}
  >
    <div style={{ 
      background: 'rgba(255,255,255,0.05)', 
      width: '50px', 
      height: '50px', 
      borderRadius: '12px', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      marginBottom: '1.5rem'
    }}>
      {icon}
    </div>
    <h3 style={{ fontSize: '1.4rem', marginBottom: '1rem' }}>{title}</h3>
    <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>{desc}</p>
  </motion.div>
);

export const FunctionsAndCommentsSection: React.FC = () => {
  const { i18n } = useTranslation();
  const isEn = (i18n.resolvedLanguage || i18n.language || 'tr').startsWith('en');

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '6rem' }}>
      <PrincipleCard 
        title={isEn ? "Functions: Single Level of Abstraction (SLAP)" : "Fonksiyonlar: Tek Bir Görev"} 
        desc={isEn 
          ? "The first rule of functions is that they should be small. The second rule is that they should be smaller than that. A function must do one thing, do it well, and do it only. If a function name includes 'And' (e.g. getUserAndSaveToDb), decompose it immediately." 
          : "Bir fonksiyonun ilk kuralı: KÜÇÜK olmalı. İkinci kuralı: DAHA DA KÜÇÜK olmalı. Bir fonksiyon sadece bir iş yapmalı. Eğer fonksiyonun adı 'getUserAndSaveToDbAndSendEmail' gibi oluyorsa, o fonksiyonu parçala. 've' bağlacı senin düşmanındır."
        }
        icon={<Divide color="#f59e0b" />} 
      />
      <PrincipleCard 
        title={isEn ? "Comments: An Admission of Expressive Failure" : "Yorumlar: Başarısızlığın İtirafı"} 
        desc={isEn 
          ? "Clear and expressive code with few comments is far superior to cluttered and complex code with lots of comments. Don't use comments to explain bad code; rewrite the code to be expressive. Comments lie because they decay as code evolves; code never lies." 
          : "Mükemmel kodun yoruma ihtiyacı yoktur. Yorum satırı yazıyorsan, aslında şunu diyorsun: 'Kodum o kadar karmaşık ki, ne yaptığımı Türkçe/İngilizce anlatmak zorundayım.' Kodu düzelt, yorumu sil. Yorumlar yalan söyler (güncellenmez), kod asla yalan söylemez."
        }
        icon={<Sparkles color="#a855f7" />} 
      />
    </div>
  );
};

export default FunctionsAndCommentsSection;
