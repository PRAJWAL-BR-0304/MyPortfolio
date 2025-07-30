
'use client';

import { useState, useEffect, type HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

interface TypewriterProps extends HTMLAttributes<HTMLSpanElement> {
  text: string;
  speed?: number;
  cursorClassName?: string;
}

export function Typewriter({
  text,
  speed = 100,
  className,
  cursorClassName,
  ...props
}: TypewriterProps) {
  const [displayText, setDisplayText] = useState('');
  const [typingComplete, setTypingComplete] = useState(false);

  useEffect(() => {
    setDisplayText('');
    setTypingComplete(false);
    let i = 0;
    const typingInterval = setInterval(() => {
      if (i < text.length) {
        setDisplayText(prev => prev + text.charAt(i));
        i++;
      } else {
        clearInterval(typingInterval);
        setTypingComplete(true);
      }
    }, speed);

    return () => clearInterval(typingInterval);
  }, [text, speed]);

  return (
    <span className={cn(className)} {...props}>
      {displayText}
      {!typingComplete && (
        <span
          className={cn(
            'animate-pulse ml-1',
            cursorClassName
          )}
        >
          |
        </span>
      )}
    </span>
  );
}
