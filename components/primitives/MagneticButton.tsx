'use client';

import { useRef, useState, ReactNode } from 'react';
import { motion } from 'framer-motion';

interface MagneticButtonProps {
  children: ReactNode;
  variant?: 'gradient' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  onClick?: () => void;
  href?: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  magnetic?: boolean;
}

const variantClasses = {
  gradient: 'bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white hover:from-violet-500 hover:to-fuchsia-500',
  outline: 'border border-[var(--border-glow)] text-[var(--text-primary)] hover:bg-[var(--surface-hover)] backdrop-blur-sm',
  ghost: 'text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-hover)]',
};

const sizeClasses = {
  sm: 'px-4 py-2 text-sm rounded-xl',
  md: 'px-6 py-3 text-base rounded-xl',
  lg: 'px-8 py-4 text-lg rounded-2xl',
};

export function MagneticButton({
  children,
  variant = 'gradient',
  size = 'md',
  className = '',
  onClick,
  href,
  type = 'button',
  disabled = false,
  magnetic = true,
}: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement & HTMLAnchorElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!magnetic || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setPosition({
      x: Math.max(-8, Math.min(8, x * 0.2)),
      y: Math.max(-8, Math.min(8, y * 0.2)),
    });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  const baseClasses = `
    relative inline-flex items-center justify-center gap-2
    font-medium transition-all duration-200
    disabled:opacity-50 disabled:cursor-not-allowed
    focus:outline-none focus:ring-2 focus:ring-violet-500/50
    ${variantClasses[variant]}
    ${sizeClasses[size]}
    ${className}
  `;

  const motionProps = {
    ref,
    animate: { x: position.x, y: position.y },
    transition: { type: 'spring' as const, stiffness: 400, damping: 25 },
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave,
    className: baseClasses,
  };

  if (href) {
    return (
      <motion.a {...motionProps} href={href}>
        {variant === 'gradient' && (
          <span className="absolute inset-0 rounded-xl bg-white/10 opacity-0 hover:opacity-100 transition-opacity" />
        )}
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      {...motionProps}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {variant === 'gradient' && (
        <span className="absolute inset-0 rounded-xl bg-white/10 opacity-0 hover:opacity-100 transition-opacity" />
      )}
      {children}
    </motion.button>
  );
}
