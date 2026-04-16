'use client';

import { motion } from 'framer-motion';

interface SplitTextProps {
  text: string;
  by?: 'word' | 'char';
  delay?: number;
  className?: string;
  wordClassName?: string;
  staggerChildren?: number;
}

export function SplitText({
  text,
  by = 'word',
  delay = 0,
  className = '',
  wordClassName = '',
  staggerChildren = 0.06,
}: SplitTextProps) {
  const items = by === 'word' ? text.split(' ') : text.split('');

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren,
        delayChildren: delay,
      },
    },
  };

  const child = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut' as const,
      },
    },
  };

  return (
    <motion.span
      className={`inline-block overflow-hidden ${className}`}
      variants={container}
      initial="hidden"
      animate="visible"
    >
      {items.map((item, i) => (
        <motion.span
          key={i}
          variants={child}
          className={`inline-block ${wordClassName}`}
          style={{ display: 'inline-block' }}
        >
          {item}
          {by === 'word' && i < items.length - 1 ? '\u00A0' : ''}
        </motion.span>
      ))}
    </motion.span>
  );
}
