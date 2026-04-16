'use client';

import { useRef } from 'react';

interface MarqueeScrollProps {
  items: React.ReactNode[];
  speed?: number;
  pauseOnHover?: boolean;
  className?: string;
  gap?: number;
}

export function MarqueeScroll({
  items,
  speed = 40,
  pauseOnHover = true,
  className = '',
  gap = 48,
}: MarqueeScrollProps) {
  const trackRef = useRef<HTMLDivElement>(null);

  const duration = `${speed}s`;

  return (
    <div className={`overflow-hidden relative ${className}`}>
      {/* Fade edges */}
      <div className="absolute inset-y-0 left-0 w-24 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to right, #0B0118, transparent)' }}
      />
      <div className="absolute inset-y-0 right-0 w-24 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to left, #0B0118, transparent)' }}
      />

      <div
        ref={trackRef}
        className="flex"
        style={{
          width: 'max-content',
          animation: `marquee ${duration} linear infinite`,
          gap: `${gap}px`,
        }}
        onMouseEnter={() => {
          if (pauseOnHover && trackRef.current) {
            trackRef.current.style.animationPlayState = 'paused';
          }
        }}
        onMouseLeave={() => {
          if (pauseOnHover && trackRef.current) {
            trackRef.current.style.animationPlayState = 'running';
          }
        }}
      >
        {/* Duplicate for seamless loop */}
        {[...items, ...items].map((item, i) => (
          <div key={i} className="flex-shrink-0">
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}
