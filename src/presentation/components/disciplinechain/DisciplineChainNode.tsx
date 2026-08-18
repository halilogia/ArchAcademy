import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  BookOpen, ShieldCheck, Box, Layers, Code2, Beaker, 
  Scissors, Zap, Network, Target, Lock, FileText, Activity, CheckCircle2, Circle
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { DisciplineChainItem } from './useDisciplineStreak';

interface DisciplineChainNodeProps {
  item: DisciplineChainItem;
  isCompleted: boolean;
  isLastInColumn: boolean;
}

export const DisciplineChainNode: React.FC<DisciplineChainNodeProps> = ({
  item,
  isCompleted,
  isLastInColumn
}) => {
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  const isEn = (i18n.resolvedLanguage || i18n.language || 'tr').startsWith('en');

  const renderIcon = (name: string, color: string) => {
    const props = { size: 22, color };
    switch (name) {
      case 'BookOpen': return <BookOpen {...props} />;
      case 'ShieldCheck': return <ShieldCheck {...props} />;
      case 'Box': return <Box {...props} />;
      case 'Layers': return <Layers {...props} />;
      case 'Code2': return <Code2 {...props} />;
      case 'Beaker': return <Beaker {...props} />;
      case 'Scissors': return <Scissors {...props} />;
      case 'Zap': return <Zap {...props} />;
      case 'Network': return <Network {...props} />;
      case 'Target': return <Target {...props} />;
      case 'Lock': return <Lock {...props} />;
      case 'FileText': return <FileText {...props} />;
      case 'Activity': return <Activity {...props} />;
      default: return <Zap {...props} />;
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
      {/* Node Card */}
      <motion.div
        whileHover={{ scale: 1.03, y: -4 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => navigate(item.path)}
        style={{
          width: '100%',
          background: isCompleted ? 'rgba(16, 185, 129, 0.06)' : '#020617',
          padding: '1.25rem',
          borderRadius: '16px',
          border: `1px solid ${isCompleted ? 'rgba(16, 185, 129, 0.4)' : '#1e293b'}`,
          borderLeft: `4px solid ${item.color}`,
          cursor: 'pointer',
          boxShadow: isCompleted ? '0 0 20px rgba(16, 185, 129, 0.15)' : '0 4px 12px rgba(0,0,0,0.3)',
          transition: 'all 0.25s ease'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ padding: '6px', borderRadius: '10px', background: `${item.color}15` }}>
              {renderIcon(item.icon, item.color)}
            </div>
            <h4 style={{ color: 'white', fontWeight: 800, fontSize: '1rem', margin: 0 }}>
              {isEn ? item.name.en : item.name.tr}
            </h4>
          </div>

          <div>
            {isCompleted ? (
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '0.75rem', fontWeight: 800, color: '#34d399', background: 'rgba(16, 185, 129, 0.15)', padding: '3px 8px', borderRadius: '6px' }}>
                <CheckCircle2 size={14} /> {isEn ? "Forged" : "Bağlandı"}
              </span>
            ) : (
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748b', background: '#0f172a', padding: '3px 8px', borderRadius: '6px' }}>
                {isEn ? "Open Link" : "Açık Halka"}
              </span>
            )}
          </div>
        </div>

        <p style={{ color: '#94a3b8', fontSize: '0.82rem', lineHeight: 1.5, margin: 0 }}>
          {isEn ? item.desc.en : item.desc.tr}
        </p>
      </motion.div>

      {/* Vertical Connecting Chain Link (if not last) */}
      {!isLastInColumn && (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '4px 0' }}>
          <div style={{ width: '2px', height: '14px', background: isCompleted ? '#10b981' : '#334155' }} />
          <div style={{ width: '12px', height: '12px', borderRadius: '50%', border: `2px solid ${isCompleted ? '#10b981' : '#475569'}`, background: isCompleted ? '#064e3b' : '#020617' }} />
          <div style={{ width: '2px', height: '14px', background: isCompleted ? '#10b981' : '#334155' }} />
        </div>
      )}
    </div>
  );
};

export default DisciplineChainNode;
