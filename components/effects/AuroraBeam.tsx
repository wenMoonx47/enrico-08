'use client';

interface AuroraBeamProps {
  color?: string;
  className?: string;
  intensity?: number;
}

export function AuroraBeam({
  color = '#7C3AED',
  className = '',
  intensity = 0.3,
}: AuroraBeamProps) {
  return (
    <div
      aria-hidden="true"
      className={`absolute pointer-events-none overflow-hidden ${className}`}
    >
      {/* Primary beam */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(135deg, ${color}${Math.round(intensity * 255).toString(16).padStart(2, '0')} 0%, transparent 60%)`,
          filter: 'blur(60px)',
          transform: 'rotate(-20deg) scale(1.5)',
        }}
      />
      {/* Secondary beam for depth */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(45deg, rgba(217, 70, 239, ${intensity * 0.5}) 0%, transparent 60%)`,
          filter: 'blur(80px)',
          transform: 'rotate(20deg) scale(1.5)',
        }}
      />
    </div>
  );
}
