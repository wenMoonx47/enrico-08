'use client';

import { useEffect, useState } from 'react';

interface TypewriterTextProps {
  text: string;
  speed?: number;
  delay?: number;
  showCursor?: boolean;
  onComplete?: () => void;
  className?: string;
}

export function TypewriterText({
  text,
  speed = 40,
  delay = 0,
  showCursor = true,
  onComplete,
  className = '',
}: TypewriterTextProps) {
  const [displayed, setDisplayed] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const delayTimer = setTimeout(() => {
      setStarted(true);
    }, delay);
    return () => clearTimeout(delayTimer);
  }, [delay]);

  useEffect(() => {
    if (!started) return;
    setDisplayed('');
    setIsComplete(false);

    let i = 0;
    const timer = setInterval(() => {
      if (i < text.length) {
        setDisplayed(text.slice(0, i + 1));
        i++;
      } else {
        setIsComplete(true);
        clearInterval(timer);
        onComplete?.();
      }
    }, speed);

    return () => clearInterval(timer);
  }, [text, speed, started, onComplete]);

  return (
    <span className={className}>
      {displayed}
      {showCursor && (
        <span
          className={`inline-block w-0.5 h-[1em] bg-accent-primary align-text-bottom ml-0.5 ${
            isComplete ? 'animate-cursor-blink' : ''
          }`}
        />
      )}
    </span>
  );
}
