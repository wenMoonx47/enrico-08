'use client';

import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface GradientLineProps {
  className?: string;
  vertical?: boolean;
}

export function GradientLine({ className = '', vertical = true }: GradientLineProps) {
  const pathRef = useRef<SVGPathElement>(null);
  const containerRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const path = pathRef.current;
    if (!path) return;

    const length = path.getTotalLength();
    gsap.set(path, {
      strokeDasharray: length,
      strokeDashoffset: length,
    });

    const ctx = gsap.context(() => {
      gsap.to(path, {
        strokeDashoffset: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
          end: 'bottom 20%',
          scrub: 1,
        },
      });
    });

    return () => ctx.revert();
  }, []);

  if (!vertical) {
    return (
      <svg
        ref={containerRef}
        className={className}
        width="100%"
        height="2"
        viewBox="0 0 100 2"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="hGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#7C3AED" stopOpacity="0" />
            <stop offset="30%" stopColor="#A78BFA" />
            <stop offset="70%" stopColor="#F472B6" />
            <stop offset="100%" stopColor="#FBBF24" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path
          ref={pathRef}
          d="M 0 1 L 100 1"
          stroke="url(#hGradient)"
          strokeWidth="1"
          fill="none"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    );
  }

  return (
    <svg
      ref={containerRef}
      className={className}
      width="2"
      height="100%"
      viewBox="0 0 2 100"
      preserveAspectRatio="none"
    >
      <defs>
        <linearGradient id="vGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#7C3AED" />
          <stop offset="40%" stopColor="#D946EF" />
          <stop offset="70%" stopColor="#F472B6" />
          <stop offset="100%" stopColor="#FBBF24" />
        </linearGradient>
      </defs>
      <path
        ref={pathRef}
        d="M 1 0 L 1 100"
        stroke="url(#vGradient)"
        strokeWidth="1.5"
        fill="none"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}
