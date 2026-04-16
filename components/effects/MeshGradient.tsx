'use client';

import { useReducedMotion } from 'framer-motion';

export function MeshGradient() {
  const prefersReduced = useReducedMotion();

  return (
    <div
      aria-hidden="true"
      className={`fixed inset-0 -z-10 overflow-hidden ${prefersReduced ? 'static-gradient' : 'animated-mesh'}`}
    >
      {/* Top-edge ambient glow — very subtle */}
      <div
        className="absolute inset-0 opacity-40"
        style={{
          background: 'radial-gradient(ellipse 80% 40% at 50% 0%, rgba(124, 58, 237, 0.08) 0%, transparent 100%)',
        }}
      />
    </div>
  );
}
