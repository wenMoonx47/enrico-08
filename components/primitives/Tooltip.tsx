'use client';

import * as RadixTooltip from '@radix-ui/react-tooltip';
import { ReactNode } from 'react';

interface TooltipProps {
  content: string;
  children: ReactNode;
  side?: 'top' | 'bottom' | 'left' | 'right';
}

export function Tooltip({ content, children, side = 'top' }: TooltipProps) {
  return (
    <RadixTooltip.Provider delayDuration={300}>
      <RadixTooltip.Root>
        <RadixTooltip.Trigger asChild>
          {children}
        </RadixTooltip.Trigger>
        <RadixTooltip.Portal>
          <RadixTooltip.Content
            side={side}
            sideOffset={6}
            className="glass px-3 py-1.5 rounded-lg text-sm text-[var(--text-primary)] z-50 max-w-xs
              data-[state=delayed-open]:animate-fade-in data-[state=closed]:animate-fade-out"
          >
            {content}
            <RadixTooltip.Arrow className="fill-[rgba(255,255,255,0.05)]" />
          </RadixTooltip.Content>
        </RadixTooltip.Portal>
      </RadixTooltip.Root>
    </RadixTooltip.Provider>
  );
}
