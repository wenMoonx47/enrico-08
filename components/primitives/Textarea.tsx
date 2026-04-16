'use client';

import { forwardRef, TextareaHTMLAttributes } from 'react';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  className?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, className = '', ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label className="text-sm font-medium text-[var(--text-muted)]">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          {...props}
          className={`
            w-full px-4 py-3 rounded-xl
            bg-[var(--surface-glass)] backdrop-blur-sm
            border border-[var(--border-soft)]
            text-[var(--text-primary)] placeholder-[var(--text-dim)]
            text-base resize-none
            transition-all duration-200
            focus:outline-none focus:border-[var(--border-glow)] focus:ring-1 focus:ring-violet-500/30
            hover:border-[var(--border-glow)]
            disabled:opacity-50 disabled:cursor-not-allowed
            ${error ? 'border-red-500/50 focus:border-red-500/70' : ''}
            ${className}
          `}
        />
        {error && (
          <p className="text-xs text-red-400">{error}</p>
        )}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';
