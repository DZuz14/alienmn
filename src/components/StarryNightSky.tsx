'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';

interface Star {
  id: number;
  size: number;
  top: string;
  left: string;
  animationDelay: string;
  animationDuration: string;
}

interface Bubble {
  id: number;
  size: number;
  top: string;
  left: string;
  opacity: number;
  animationDuration: string;
  animationDelay: string;
}

/**
 * Creates a starry night sky background with twinkling stars and floating bubbles
 * @param children - The children to wrap
 * @returns The wrapped children with a starry night sky background
 */
export default function StarryNightSky({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isClient, setIsClient] = useState(false);
  const [dimensions, setDimensions] = useState({
    width: 1920,
    height: 1080,
  });

  // Ensure component only renders dynamic content on client
  useEffect(() => {
    setIsClient(true);
    setDimensions({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  }, []);

  // Seeded random number generator for consistent results
  const seededRandom = useCallback((seed: number) => {
    const x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
  }, []);

  // Generate random stars with consistent animation properties using seeded random
  const generateStars = useCallback(
    (width: number, height: number) => {
      const starCount = Math.floor((width * height) / 7000) + 80;
      const newStars: Star[] = [];

      for (let i = 0; i < starCount; i++) {
        // Use seeded random for consistent results
        const sizeRandom = seededRandom(i * 1000);
        const topRandom = seededRandom(i * 1001);
        const leftRandom = seededRandom(i * 1002);
        const durationRandom = seededRandom(i * 1003);

        const animationDuration = `${(durationRandom * 3 + 4).toFixed(1)}s`;
        const animationDelay = `${(seededRandom(i * 1004) * 20).toFixed(1)}s`;

        newStars.push({
          id: i,
          size: sizeRandom * 2.5 + 1,
          top: `${topRandom * 100}%`,
          left: `${leftRandom * 100}%`,
          animationDelay,
          animationDuration,
        });
      }

      return newStars;
    },
    [seededRandom]
  );

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

  // Memoize stars and bubbles based on dimensions
  const stars = useMemo(
    () => (isClient ? generateStars(dimensions.width, dimensions.height) : []),
    [isClient, dimensions, generateStars]
  );

  const bubbles = useMemo(
    () => (isClient ? generateBubbles(dimensions.width) : []),
    [isClient, dimensions.width, generateBubbles]
  );

  // Handle resize with debounce to prevent excessive updates
  useEffect(() => {
    if (!isClient) return;

    let timeoutId: NodeJS.Timeout;

    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setDimensions({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      }, 200);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timeoutId);
    };
  }, [isClient]);

  return (
    <div className="bg-gradient-to-br from-violet-600 via-indigo-900 to-gray-900 min-h-screen w-full flex flex-col items-center justify-center relative overflow-hidden">
      {/* Only render stars and bubbles on client */}
      {isClient && (
        <>
          {/* Stars */}
          {stars.map((star) => (
            <div
              key={`star-${star.id}`}
              className="absolute rounded-full bg-white opacity-80"
              style={{
                width: `${star.size}px`,
                height: `${star.size}px`,
                top: star.top,
                left: star.left,
                animationName: 'twinkle',
                animationDuration: star.animationDuration,
                animationTimingFunction: 'ease-in-out',
                animationIterationCount: 'infinite',
                animationDelay: star.animationDelay,
                willChange: 'opacity',
              }}
            />
          ))}

          {/* Floating Bubbles */}
          {bubbles.map((bubble) => (
            <div
              key={`bubble-${bubble.id}`}
              className="absolute rounded-full border-2 border-white"
              style={{
                width: `${bubble.size}px`,
                height: `${bubble.size}px`,
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
      )}

      {/* Content */}
      <div className="z-10 relative">{children}</div>
    </div>
  );
}
