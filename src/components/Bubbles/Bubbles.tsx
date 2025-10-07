'use client';

import { useCallback, useMemo } from 'react';

/**
 * Configuration object for Bubbles component
 * Adjust these values to customize the floating bubbles appearance and behavior
 */
const BUBBLES_CONFIG = {
  // Bubble density - higher values = fewer bubbles
  // Formula: (width * height) / densityFactor
  densityFactor: 8000,

  // Bubble size settings
  size: {
    min: 1, // Minimum bubble size in pixels
    range: 0, // Additional random size range
    // Final size = min + (random * range) = 8-28px
  },

  // Visual appearance (configured in className)
  // Currently using: w-2 h-2 (8px), border-2 border-white

  // Opacity settings
  opacity: {
    min: 0.05, // Minimum opacity
    range: 0.15, // Additional opacity range
    // Final opacity = min + (random * range) = 0.05-0.20
  },

  // Animation settings
  animation: {
    duration: {
      min: 30, // Minimum animation duration in seconds
      range: 15, // Additional random duration range
      // Final duration = min + (random * range) = 30-45s
    },
    delayMultiplier: 0.3, // Delay between bubbles (i * multiplier) % 10
    maxDelay: 10, // Maximum delay in seconds
  },
} as const;

interface Bubble {
  id: number;
  size: number;
  top: string;
  left: string;
  opacity: number;
  animationDuration: string;
  animationDelay: string;
}

interface BubblesProps {
  isClient: boolean;
  width: number;
  height: number;
}

/**
 * Renders floating bubbles in the night sky
 */
export default function Bubbles({ isClient, width, height }: BubblesProps) {
  // Seeded random number generator for consistent results
  const seededRandom = useCallback((seed: number) => {
    const x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
  }, []);

  // Generate floating bubbles with consistent animation properties using seeded random
  const generateBubbles = useCallback(
    (width: number, height: number) => {
      const bubbleCount = Math.floor(
        (width * height) / BUBBLES_CONFIG.densityFactor
      );
      const newBubbles: Bubble[] = [];

      for (let i = 0; i < bubbleCount; i++) {
        // Use seeded random for consistent results
        const sizeRandom = seededRandom(i * 2000);
        const topRandom = seededRandom(i * 2001);
        const leftRandom = seededRandom(i * 2002);
        const opacityRandom = seededRandom(i * 2003);
        const durationRandom = seededRandom(i * 2004);

        const animationDuration = `${(
          durationRandom * BUBBLES_CONFIG.animation.duration.range +
          BUBBLES_CONFIG.animation.duration.min
        ).toFixed(1)}s`;
        const animationDelay = `${
          (i * BUBBLES_CONFIG.animation.delayMultiplier) %
          BUBBLES_CONFIG.animation.maxDelay
        }s`;

        newBubbles.push({
          id: i,
          size:
            sizeRandom * BUBBLES_CONFIG.size.range + BUBBLES_CONFIG.size.min,
          top: `${topRandom * 100}%`,
          left: `${leftRandom * 100}%`,
          opacity: Number(
            (
              opacityRandom * BUBBLES_CONFIG.opacity.range +
              BUBBLES_CONFIG.opacity.min
            ).toFixed(2)
          ),
          animationDuration,
          animationDelay,
        });
      }

      return newBubbles;
    },
    [seededRandom]
  );

  const bubbles = useMemo(
    () => (isClient ? generateBubbles(width, height) : []),
    [isClient, width, height, generateBubbles]
  );

  if (!isClient) return null;

  return (
    <>
      {bubbles.map((bubble) => (
        <div
          key={`bubble-${bubble.id}`}
          className="absolute rounded-full border border-white"
          style={{
            top: bubble.top,
            left: bubble.left,
            width: '3.5px',
            height: '3.5px',
            opacity: bubble.opacity,
            animationName: 'float, moveAround',
            animationDuration: `${bubble.animationDuration}, ${bubble.animationDuration}`,
            animationTimingFunction: 'ease-in-out, ease-in-out',
            animationIterationCount: 'infinite, infinite',
            animationDirection: 'alternate, alternate',
            animationDelay: `${bubble.animationDelay}, ${bubble.animationDelay}`,
            willChange: 'transform',
          }}
        />
      ))}
    </>
  );
}
