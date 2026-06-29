"use client";

import { useEffect, useRef, ReactNode } from "react";

interface ParallaxScrollProps {
  children: ReactNode;
  speed?: number;
  className?: string;
}

/**
 * Componente para efecto parallax suave en scroll
 * SEO-friendly: usa transform en GPU para mejor rendimiento
 */
export function ParallaxScroll({
  children,
  speed = 0.5,
  className = "",
}: ParallaxScrollProps) {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    // Reducir el efecto si el usuario prefiere movimiento reducido
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const effectiveSpeed = prefersReduced ? 0 : speed;

    const handleScroll = () => {
      if (!element) return;

      const rect = element.getBoundingClientRect();
      const elementTop = rect.top;
      const windowHeight = window.innerHeight;

      // Calcular la cantidad de parallax basado en posición visible
      const scrollAmount = (windowHeight - elementTop) * effectiveSpeed * 0.1;
      element.style.transform = `translateY(${scrollAmount}px)`;
    };

    const scrollHandler = () => {
      requestAnimationFrame(handleScroll);
    };

    window.addEventListener("scroll", scrollHandler, { passive: true });
    return () => window.removeEventListener("scroll", scrollHandler);
  }, [speed]);

  return (
    <div ref={elementRef} className={className} style={{ willChange: "transform" }}>
      {children}
    </div>
  );
}
