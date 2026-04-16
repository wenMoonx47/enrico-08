'use client';

import { ReactNode, CSSProperties } from 'react';
import { motion } from 'framer-motion';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  interactive?: boolean;
  glow?: boolean;
  padding?: 'sm' | 'md' | 'lg' | 'none';
  onClick?: () => void;
  'data-cursor-label'?: string;
}

const paddingMap = {
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
  none: '',
};

export function GlassCard({
  children,
  className = '',
  style,
  interactive = false,
  glow = false,
  padding = 'md',
  onClick,
  'data-cursor-label': cursorLabel,
}: GlassCardProps) {
  const paddingClass = paddingMap[padding];

  const baseClasses = `relative rounded-2xl glass ${paddingClass} ${className}`;

  if (interactive) {
    return (
      <motion.div
        className={`${baseClasses} cursor-pointer`}
        onClick={onClick}
        whileHover={{
          scale: 1.01,
          borderColor: 'rgba(167, 139, 250, 0.35)',
        }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
        style={{
          boxShadow: glow ? '0 0 40px rgba(167, 139, 250, 0.15)' : 'none',
          ...style,
        }}
        data-cursor-label={cursorLabel}
      >
        {glow && (
          <div
            className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity"
            style={{
              background: 'radial-gradient(circle at 50% 0%, rgba(167, 139, 250, 0.08) 0%, transparent 60%)',
            }}
          />
        )}
        {children}
      </motion.div>
    );
  }

  return (
    <div
      className={baseClasses}
      style={{
        boxShadow: glow ? '0 0 40px rgba(167, 139, 250, 0.1)' : 'none',
        ...style,
      }}
    >
      {children}
    </div>
  );
}
