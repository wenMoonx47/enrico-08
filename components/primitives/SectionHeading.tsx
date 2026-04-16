'use client';

import { motion } from 'framer-motion';

interface SectionHeadingProps {
  label?: string;
  heading: string;
  accent?: string;
  align?: 'left' | 'center' | 'right';
  className?: string;
}

export function SectionHeading({
  label,
  heading,
  accent,
  align = 'left',
  className = '',
}: SectionHeadingProps) {
  const alignClass = {
    left: 'text-left',
    center: 'text-center items-center',
    right: 'text-right items-end',
  }[align];

  return (
    <motion.div
      className={`flex flex-col gap-3 ${alignClass} ${className}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10%' }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      {label && (
        <span className="text-sm font-medium tracking-widest uppercase text-[var(--text-muted)]">
          {label}
        </span>
      )}
      <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-[var(--text-primary)] leading-tight">
        {heading}
        {accent && (
          <>
            {' '}
            <em className="not-italic gradient-text-primary">
              {accent}
            </em>
          </>
        )}
      </h2>
    </motion.div>
  );
}
