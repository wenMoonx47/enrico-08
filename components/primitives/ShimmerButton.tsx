'use client';

import { ReactNode } from 'react';

interface ShimmerButtonProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}

export function ShimmerButton({
  children,
  className = '',
  onClick,
  type = 'button',
  disabled = false,
}: ShimmerButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        shimmer-btn relative inline-flex items-center justify-center gap-2
        px-6 py-3 rounded-xl font-medium text-base
        bg-[var(--surface-glass)] text-[var(--text-primary)]
        border border-[var(--border-soft)]
        backdrop-blur-sm
        hover:border-[var(--border-glow)] hover:bg-[var(--surface-hover)]
        transition-colors duration-200
        disabled:opacity-50 disabled:cursor-not-allowed
        focus:outline-none focus:ring-2 focus:ring-violet-500/50
        ${className}
      `}
    >
      {children}
    </button>
  );
}
