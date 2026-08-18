import React from 'react';
import { motion } from 'framer-motion';

export interface CardProps {
  children: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({ children, style, className = '', onClick }) => (
  <motion.div
    whileHover={{ y: -4 }}
    transition={{ duration: 0.2 }}
    className={`glass-card ${className}`}
    onClick={onClick}
    style={{
      padding: '2rem',
      borderRadius: '24px',
      border: '1px solid var(--glass-border)',
      ...style
    }}
  >
    {children}
  </motion.div>
);

export default Card;
