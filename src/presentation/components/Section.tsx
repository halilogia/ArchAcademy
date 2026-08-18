import React from 'react';

export interface SectionProps {
  children: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
}

export const Section: React.FC<SectionProps> = ({ children, style, className = '' }) => (
  <section className={className} style={{ padding: '4rem 0', ...style }}>
    <div className="container">{children}</div>
  </section>
);

export default Section;
