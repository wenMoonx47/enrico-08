'use client';

import { ReactNode } from 'react';

interface BadgeProps {
  children: ReactNode;
  variant?: 'default' | 'gradient' | 'warm' | 'success';
  size?: 'sm' | 'md';
  pulse?: boolean;
  className?: string;
}

const variantStyles = {
  default: 'glass border-[var(--border-soft)] text-[var(--text-muted)]',
  gradient: 'border border-violet-500/30 text-violet-300 bg-violet-500/10',
  warm: 'border border-amber-500/30 text-amber-300 bg-amber-500/10',
  success: 'border border-emerald-500/30 text-emerald-300 bg-emerald-500/10',
};

const sizeStyles = {
  sm: 'px-2.5 py-0.5 text-xs',
  md: 'px-3 py-1 text-sm',
};

export function Badge({
  children,
  variant = 'default',
  size = 'md',
  pulse = false,
  className = '',
}: BadgeProps) {
  return (
    <span
      className={`
        inline-flex items-center gap-1.5
        rounded-full font-medium
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        ${className}
      `}
    >
      {pulse && (
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
        </span>
      )}
      {children}
    </span>
  );
}
