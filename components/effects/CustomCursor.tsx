'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export function CustomCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const [isPointer, setIsPointer] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [label, setLabel] = useState('');
  const isMobile = useRef(false);

  const springConfig = { damping: 25, stiffness: 700 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  const ringSpringConfig = { damping: 20, stiffness: 250 };
  const ringXSpring = useSpring(cursorX, ringSpringConfig);
  const ringYSpring = useSpring(cursorY, ringSpringConfig);

  useEffect(() => {
    // Detect mobile/touch
    isMobile.current = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isMobile.current) return;

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const checkPointer = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive =
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') !== null ||
        target.closest('button') !== null ||
        target.closest('[data-cursor="pointer"]') !== null ||
        window.getComputedStyle(target).cursor === 'pointer';

      setIsPointer(isInteractive);

      // Check for card hover label
      const cardEl = target.closest('[data-cursor-label]') as HTMLElement | null;
      setLabel(cardEl?.dataset.cursorLabel ?? '');
    };

    const handleMouseLeave = () => setIsHidden(true);
    const handleMouseEnter = () => setIsHidden(false);

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mousemove', checkPointer);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mousemove', checkPointer);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [cursorX, cursorY]);

  // Don't render on mobile
  if (typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0)) {
    return null;
  }

  return (
    <>
      {/* Dot */}
      <motion.div
        className="fixed pointer-events-none z-[9999] rounded-full bg-accent-primary"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: '-50%',
          translateY: '-50%',
          width: isPointer ? 0 : 8,
          height: isPointer ? 0 : 8,
          opacity: isHidden ? 0 : 1,
          mixBlendMode: 'screen',
        }}
        transition={{ duration: 0.15 }}
      />

      {/* Ring */}
      <motion.div
        className="fixed pointer-events-none z-[9998] rounded-full border border-accent-primary/60 flex items-center justify-center"
        style={{
          x: ringXSpring,
          y: ringYSpring,
          translateX: '-50%',
          translateY: '-50%',
          opacity: isHidden ? 0 : 0.8,
        }}
        animate={{
          width: isPointer ? 48 : 32,
          height: isPointer ? 48 : 32,
          backgroundColor: isPointer ? 'rgba(167, 139, 250, 0.08)' : 'transparent',
        }}
        transition={{ duration: 0.2 }}
      >
        {label && (
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-[9px] text-accent-primary font-medium whitespace-nowrap"
          >
            {label}
          </motion.span>
        )}
      </motion.div>
    </>
  );
}
