"use client";

import { useEffect, useRef, useState, memo } from "react";

interface ScrollLineProps {
  direction?: "horizontal" | "vertical";
  className?: string;
  color?: string;
  delay?: number;
}

function ScrollLine({ 
  direction = "horizontal", 
  className = "", 
  color = "bg-secondary",
  delay = 0
}: ScrollLineProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Check if reduced motion is preferred
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setIsVisible(true);
      return;
    }

    let timeoutId: NodeJS.Timeout;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          timeoutId = setTimeout(() => setIsVisible(true), delay);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(element);

    return () => {
      clearTimeout(timeoutId);
      observer.disconnect();
    };
  }, [delay]);

  return (
    <div ref={ref} className={`${direction === "horizontal" ? "h-px w-full" : "w-px h-full"} relative overflow-hidden`}>
        <div 
          className={`absolute ${color} ${className} ${direction === "horizontal" ? "h-full left-0" : "w-full top-0"}`}
          style={{
            transition: 'transform 700ms ease-out',
            transform: direction === "horizontal" 
              ? (isVisible ? 'scaleX(1)' : 'scaleX(0)')
              : (isVisible ? 'scaleY(1)' : 'scaleY(0)'),
            transformOrigin: direction === "horizontal" ? 'left' : 'top',
            width: direction === "horizontal" ? '100%' : undefined,
            height: direction === "vertical" ? '100%' : undefined,
          }}
        />
    </div>
  );
}

export default memo(ScrollLine);
