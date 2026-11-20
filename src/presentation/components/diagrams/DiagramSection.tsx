import React, { ReactNode } from 'react';

export interface DiagramSectionProps {
  id?: string;
  children: ReactNode;
}

/**
 * Page-level wrapper for a diagram scene. Keeps spacing and scroll anchors
 * identical across lessons without each page inventing its own shell.
 */
export const DiagramSection: React.FC<DiagramSectionProps> = ({ id, children }) => (
  <section id={id} style={{ scrollMarginTop: 100, padding: '2.5rem 0 0' }}>
    <div className="container">{children}</div>
  </section>
);

export default DiagramSection;
