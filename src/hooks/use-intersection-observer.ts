
'use client';

import { useState, useEffect, type RefObject } from 'react';

interface UseIntersectionObserverOptions {
  threshold?: number;
  once?: boolean;
}

export function useIntersectionObserver(
  ref: RefObject<HTMLElement>,
  options: UseIntersectionObserverOptions = {}
): boolean {
  const { threshold = 0.1, once = true } = options;
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) {
            observer.unobserve(element);
          }
        }
      },
      { threshold }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [ref, threshold, once]);

  return isVisible;
}
