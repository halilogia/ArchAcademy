import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { DisciplineChainCategory } from './useDisciplineStreak';
import { DisciplineChainNode } from './DisciplineChainNode';

interface DisciplineChainColumnProps {
  category: DisciplineChainCategory;
  isCompleted: (path: string) => boolean;
  columnIndex: number;
}

export const DisciplineChainColumn: React.FC<DisciplineChainColumnProps> = ({
  category,
  isCompleted,
  columnIndex
}) => {
  const { i18n } = useTranslation();
  const isEn = (i18n.resolvedLanguage || i18n.language || 'tr').startsWith('en');

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: columnIndex * 0.15 }}
      style={{
        background: '#090d16',
        borderRadius: '24px',
        padding: '1.5rem',
        border: '1px solid #1e293b',
        borderTop: `4px solid ${category.color}`,
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5rem'
      }}
    >
      {/* Category Header */}
      <div style={{ marginBottom: '1.25rem', textAlign: 'center' }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'white', margin: 0 }}>
          {isEn ? category.title.en : category.title.tr}
        </h3>
      </div>

      {/* Chain Nodes */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
        {category.items.map((item, i) => (
          <DisciplineChainNode
            key={item.id}
            item={item}
            isCompleted={isCompleted(item.path)}
            isLastInColumn={i === category.items.length - 1}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default DisciplineChainColumn;
