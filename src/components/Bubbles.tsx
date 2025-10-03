'use client';

import { useCallback, useMemo } from 'react';

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
}

/**
 * Renders floating bubbles in the night sky
 */
export default function Bubbles({ isClient, width }: BubblesProps) {
  // Seeded random number generator for consistent results
  const seededRandom = useCallback((seed: number) => {
    const x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
  }, []);

  // Generate floating bubbles with consistent animation properties using seeded random
  const generateBubbles = useCallback(
    (width: number) => {
      const bubbleCount = Math.floor(width / 100) + 15;
      const newBubbles: Bubble[] = [];

      for (let i = 0; i < bubbleCount; i++) {
        // Use seeded random for consistent results
        const sizeRandom = seededRandom(i * 2000);
        const topRandom = seededRandom(i * 2001);
        const leftRandom = seededRandom(i * 2002);
        const opacityRandom = seededRandom(i * 2003);
        const durationRandom = seededRandom(i * 2004);

        const animationDuration = `${(durationRandom * 15 + 30).toFixed(1)}s`;
        const animationDelay = `${(i * 0.3) % 10}s`;

        newBubbles.push({
          id: i,
          size: sizeRandom * 10 + 3,
          top: `${topRandom * 100}%`,
          left: `${leftRandom * 100}%`,
          opacity: Number((opacityRandom * 0.15 + 0.05).toFixed(2)),
          animationDuration,
          animationDelay,
        });
      }

      return newBubbles;
    },
    [seededRandom]
  );

  const bubbles = useMemo(
    () => (isClient ? generateBubbles(width) : []),
    [isClient, width, generateBubbles]
  );

  if (!isClient) return null;

  return (
    <>
      {bubbles.map((bubble) => (
        <div
          key={`bubble-${bubble.id}`}
          className="absolute rounded-full border-2 border-white w-0.5 h-0.5"
          style={{
            top: bubble.top,
            left: bubble.left,
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
