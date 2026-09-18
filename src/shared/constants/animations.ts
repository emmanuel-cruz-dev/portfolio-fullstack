import type { Variants } from "motion/react";

const EASE_OUT_SMOOTH = [0.25, 0.1, 0.25, 1] as const;

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: (delay = 0) => ({
    opacity: 1,
    transition: { duration: 0.6, ease: "easeOut", delay },
  }),
};

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: EASE_OUT_SMOOTH, delay },
  }),
};

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: EASE_OUT_SMOOTH },
  },
};

function createSlideFade(distanceX: number, delay = 0.2): Variants {
  return {
    hidden: { opacity: 0, x: distanceX },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: EASE_OUT_SMOOTH, delay },
    },
  };
}

function createSlideScaleFade(distanceX: number, delay = 0.2): Variants {
  return {
    hidden: { opacity: 0, x: distanceX, scale: 0.95 },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: { duration: 0.6, ease: EASE_OUT_SMOOTH, delay },
    },
  };
}

export const fadeInFromRight: Variants = createSlideFade(40);

export const fadeInFromLeft: Variants = createSlideFade(-40);

export const fadeInFromLeftScale: Variants = createSlideScaleFade(-40);

export const fadeInFromRightScale: Variants = createSlideScaleFade(40);
