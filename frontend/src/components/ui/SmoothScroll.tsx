"use client";

import { useEffect } from "react";

/**
 * Hook para smooth scroll behavior global
 * SEO-friendly: solo CSS, sin afectar el contenido
 */
export function SmoothScroll() {
  useEffect(() => {
    // Inyectar CSS para smooth scroll behavior
    const style = document.createElement("style");
    style.textContent = `
      html {
        scroll-behavior: smooth;
      }
      
      @media (prefers-reduced-motion: reduce) {
        html {
          scroll-behavior: auto;
        }
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return null;
}
