import React from 'react';

export interface SectionTitleProps {
  children: React.ReactNode;
  icon?: React.ReactNode;
  style?: React.CSSProperties;
}

export const SectionTitle: React.FC<SectionTitleProps> = ({ children, icon, style }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2rem', ...style }}>
    {icon && <div style={{ color: 'var(--primary)' }}>{icon}</div>}
    <h2 style={{ fontSize: '2rem', fontWeight: 800, color: 'white', letterSpacing: '-0.5px' }}>
      {children}
    </h2>
  </div>
);

export default SectionTitle;
