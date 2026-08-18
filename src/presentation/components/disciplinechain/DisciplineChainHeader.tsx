import React from 'react';
import { motion } from 'framer-motion';
import { Flame, Link2, Trophy, Award } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface DisciplineChainHeaderProps {
  completedCount: number;
  totalLinks: number;
  streakPercent: number;
  isChainMaster: boolean;
}

export const DisciplineChainHeader: React.FC<DisciplineChainHeaderProps> = ({
  completedCount,
  totalLinks,
  streakPercent,
  isChainMaster
}) => {
  const { i18n } = useTranslation();
  const isEn = (i18n.resolvedLanguage || i18n.language || 'tr').startsWith('en');

  return (
    <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
      {/* Badge */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          background: isChainMaster ? 'linear-gradient(90deg, rgba(234, 179, 8, 0.2) 0%, rgba(249, 115, 22, 0.2) 100%)' : 'rgba(239, 68, 68, 0.15)',
          color: isChainMaster ? '#facc15' : '#fb7185',
          padding: '8px 20px',
          borderRadius: '100px',
          fontSize: '0.9rem',
          fontWeight: 800,
          border: `1px solid ${isChainMaster ? 'rgba(234, 179, 8, 0.4)' : 'rgba(239, 68, 68, 0.3)'}`,
          marginBottom: '1.25rem'
        }}
      >
        <Flame size={18} className="animate-pulse" />
        {isEn ? "DON'T BREAK THE CHAIN PROTOCOL" : "ZİNCİRİ KIRMA ALIŞKANLIK PROTOKOLÜ"}
      </motion.div>

      {/* Main Title */}
      <h1 style={{ fontSize: 'clamp(2.2rem, 5vw, 3.4rem)', fontWeight: 900, color: 'white', letterSpacing: '-1px', marginBottom: '1rem' }}>
        {isEn ? "The Engineering Discipline Chain" : "Mühendislik Disiplinleri Zinciri"}
      </h1>

      <p style={{ color: '#94a3b8', fontSize: '1.15rem', maxWidth: '750px', margin: '0 auto 2.5rem', lineHeight: 1.7 }}>
        {isEn 
          ? "Great software architecture is not an event—it's a daily chain of unbroken engineering habits. Complete each link to forge your architectural mastery." 
          : "Büyük yazılım mimarisi tek seferlik bir olay değil, her gün uygulanan kırılmaz bir mühendislik alışkanlıkları zinciridir. Halkaları tamamlayarak ustalığınızı pekiştirin."
        }
      </p>

      {/* Streak Metric Bar */}
      <div style={{ maxWidth: '650px', margin: '0 auto', background: '#020617', padding: '1.5rem 2rem', borderRadius: '20px', border: '1px solid #1e293b', boxShadow: '0 10px 30px rgba(0,0,0,0.5)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'white', fontWeight: 800, fontSize: '0.95rem' }}>
            <Link2 size={18} color="#38bdf8" />
            {isEn ? "Active Chain Mastery Streak" : "Aktif Zincir Tamamlanma Serisi"}
          </div>
          <div style={{ fontWeight: 900, color: isChainMaster ? '#facc15' : '#38bdf8', fontSize: '1.1rem' }}>
            {completedCount} / {totalLinks} ({streakPercent}%)
          </div>
        </div>

        {/* Progress bar */}
        <div style={{ height: '10px', background: '#0f172a', borderRadius: '10px', overflow: 'hidden', border: '1px solid #1e293b' }}>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${streakPercent}%` }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            style={{
              height: '100%',
              background: isChainMaster 
                ? 'linear-gradient(90deg, #facc15 0%, #f97316 100%)' 
                : 'linear-gradient(90deg, #38bdf8 0%, #10b981 100%)',
              boxShadow: '0 0 15px rgba(56, 189, 248, 0.5)'
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default DisciplineChainHeader;
