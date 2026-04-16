'use client';

import * as RadixDropdown from '@radix-ui/react-dropdown-menu';
import { ReactNode } from 'react';

interface DropdownItem {
  label: string;
  onClick: () => void;
  icon?: ReactNode;
  disabled?: boolean;
}

interface DropdownProps {
  trigger: ReactNode;
  items: DropdownItem[];
  align?: 'start' | 'center' | 'end';
}

export function Dropdown({ trigger, items, align = 'end' }: DropdownProps) {
  return (
    <RadixDropdown.Root>
      <RadixDropdown.Trigger asChild>
        {trigger}
      </RadixDropdown.Trigger>

      <RadixDropdown.Portal>
        <RadixDropdown.Content
          align={align}
          sideOffset={8}
          className="glass rounded-xl p-1.5 min-w-[180px] z-50 shadow-2xl
            data-[state=open]:animate-fade-up"
        >
          {items.map((item, i) => (
            <RadixDropdown.Item
              key={i}
              onClick={item.onClick}
              disabled={item.disabled}
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm
                text-[var(--text-muted)] hover:text-[var(--text-primary)]
                hover:bg-[var(--surface-hover)] cursor-pointer
                outline-none transition-colors
                disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {item.icon}
              {item.label}
            </RadixDropdown.Item>
          ))}
        </RadixDropdown.Content>
      </RadixDropdown.Portal>
    </RadixDropdown.Root>
  );
}
