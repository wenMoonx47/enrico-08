'use client';

import { motion, useReducedMotion } from 'framer-motion';

interface OrbProps {
  x: string;
  y: string;
  size: number;
  color: string;
  delay: number;
  duration: number;
}

function Orb({ x, y, size, color, delay, duration }: OrbProps) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{
        left: x,
        top: y,
        width: size,
        height: size,
        background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
        filter: 'blur(60px)',
        transform: 'translate(-50%, -50%)',
      }}
      animate={{
        x: [0, 20, -12, 8, 0],
        y: [0, -24, 14, -8, 0],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    />
  );
}

export function FloatingOrbs() {
  const prefersReduced = useReducedMotion();

  // Hidden on mobile, very subtle on desktop
  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 overflow-hidden pointer-events-none hidden md:block"
    >
      {!prefersReduced && (
        <>
          <Orb x="10%" y="30%" size={500} color="rgba(124, 58, 237, 0.06)" delay={0} duration={14} />
          <Orb x="75%" y="45%" size={400} color="rgba(217, 70, 239, 0.05)" delay={3} duration={17} />
          <Orb x="50%" y="80%" size={350} color="rgba(245, 158, 11, 0.04)" delay={6} duration={20} />
        </>
      )}
    </div>
  );
}
