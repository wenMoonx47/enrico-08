'use client';

import { ReactNode } from 'react';
import Tilt from 'react-parallax-tilt';
import { GradientSpotlight } from '@/components/effects/GradientSpotlight';

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  maxTilt?: number;
  perspective?: number;
  glareEnabled?: boolean;
}

export function TiltCard({
  children,
  className = '',
  maxTilt = 6,
  perspective = 1000,
  glareEnabled = false,
}: TiltCardProps) {
  return (
    <Tilt
      tiltMaxAngleX={maxTilt}
      tiltMaxAngleY={maxTilt}
      perspective={perspective}
      glareEnable={glareEnabled}
      glareMaxOpacity={0.1}
      scale={1.01}
      transitionSpeed={400}
      className={className}
    >
      <GradientSpotlight className="h-full w-full">
        {children}
      </GradientSpotlight>
    </Tilt>
  );
}
