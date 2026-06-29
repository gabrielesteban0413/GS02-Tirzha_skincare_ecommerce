"use client";

import React, { ReactNode } from "react";
import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

type AnimationVariant = 
  | "fade-in"
  | "fade-in-up"
  | "fade-in-down"
  | "fade-in-left"
  | "fade-in-right"
  | "slide-in-left"
  | "slide-in-right"
  | "scale-up"
  | "blur-in"
  | "rotate-in";

interface ScrollIntoViewProps {
  children: ReactNode;
  variant?: AnimationVariant;
  delay?: number;
  duration?: number;
  className?: string;
  threshold?: number;
  triggerOnce?: boolean;
  staggerChildren?: boolean;
}

const animationVariants = {
  "fade-in": {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
  "fade-in-up": {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
  },
  "fade-in-down": {
    hidden: { opacity: 0, y: -40 },
    visible: { opacity: 1, y: 0 },
  },
  "fade-in-left": {
    hidden: { opacity: 0, x: -40 },
    visible: { opacity: 1, x: 0 },
  },
  "fade-in-right": {
    hidden: { opacity: 0, x: 40 },
    visible: { opacity: 1, x: 0 },
  },
  "slide-in-left": {
    hidden: { opacity: 0, x: -100 },
    visible: { opacity: 1, x: 0 },
  },
  "slide-in-right": {
    hidden: { opacity: 0, x: 100 },
    visible: { opacity: 1, x: 0 },
  },
  "scale-up": {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1 },
  },
  "blur-in": {
    hidden: { opacity: 0, filter: "blur(10px)" },
    visible: { opacity: 1, filter: "blur(0px)" },
  },
  "rotate-in": {
    hidden: { opacity: 0, rotate: -10 },
    visible: { opacity: 1, rotate: 0 },
  },
};

/**
 * Componente reutilizable para animaciones por scroll
 * SEO-friendly: no afecta el DOM, solo animaciones visuales
 */
export function ScrollIntoView({
  children,
  variant = "fade-in-up",
  delay = 0,
  duration = 0.6,
  className = "",
  threshold = 0.1,
  triggerOnce = true,
  staggerChildren = false,
}: ScrollIntoViewProps) {
  const { ref, isVisible, hasBeenVisible } = useScrollAnimation({
    threshold,
    triggerOnce,
  });

  const selectedVariant = animationVariants[variant];
  const shouldAnimate = triggerOnce ? hasBeenVisible : isVisible;

  const transition = {
    duration,
    delay,
    ease: [0.25, 0.46, 0.45, 0.94], // Custom easing para animación suave
  };

  // Si está usando staggerChildren, pasar control al Motion.div
  if (staggerChildren && React.isValidElement(children)) {
    return (
      <motion.div
        ref={ref}
        initial="hidden"
        animate={shouldAnimate ? "visible" : "hidden"}
        variants={{
          visible: {
            transition: {
              staggerChildren: 0.1,
              delayChildren: delay,
            },
          },
        }}
        className={className}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={shouldAnimate ? "visible" : "hidden"}
      variants={selectedVariant}
      transition={transition}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/**
 * Componente para animar items dentro de un contenedor (child animations)
 */
export function ScrollIntoViewItem({
  children,
  variant = "fade-in-up",
  duration = 0.6,
  className = "",
}: Omit<ScrollIntoViewProps, "threshold" | "triggerOnce" | "staggerChildren">) {
  const selectedVariant = animationVariants[variant];

  return (
    <motion.div
      variants={selectedVariant}
      transition={{
        duration,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
