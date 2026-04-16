'use client';

import { ReactNode } from 'react';

interface GradientTextProps {
  children: ReactNode;
  gradient?: 'primary' | 'cool' | 'warm';
  className?: string;
  as?: 'span' | 'h1' | 'h2' | 'h3' | 'h4' | 'p';
  animate?: boolean;
}

const gradientClasses = {
  primary: 'gradient-text-primary',
  cool: 'gradient-text-cool',
  warm: 'gradient-text-warm',
};

export function GradientText({
  children,
  gradient = 'primary',
  className = '',
  as: Tag = 'span',
  animate = false,
}: GradientTextProps) {
  return (
    <Tag className={`${gradientClasses[gradient]} ${animate ? 'animate-shimmer-gradient' : ''} ${className}`}>
      {children}
    </Tag>
  );
}
