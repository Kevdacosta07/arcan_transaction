"use client";

import { useEffect, useRef, useState } from "react";

interface ScrollLineProps {
  direction?: "horizontal" | "vertical";
  className?: string;
  color?: string;
  delay?: number;
}

export default function ScrollLine({ 
  direction = "horizontal", 
  className = "", 
  color = "bg-secondary",
  delay = 0
}: ScrollLineProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsVisible(true);
          }, delay);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [delay]);

  const baseClasses = `absolute transition-transform duration-1000 ease-out ${color} ${className}`;
  
  // Horizontal: grows from left to right (width 0 -> 100%)
  // Vertical: grows from top to bottom (height 0 -> 100%)
  const activeClasses = direction === "horizontal"
    ? (isVisible ? "w-full" : "w-0")
    : (isVisible ? "h-full" : "h-0");

  return (
    <div ref={ref} className={`${direction === "horizontal" ? "h-px w-full" : "w-px h-full"} relative overflow-hidden`}>
        <div className={`${baseClasses} ${activeClasses} ${direction === "horizontal" ? "h-full left-0" : "w-full top-0"}`} />
    </div>
  );
}
