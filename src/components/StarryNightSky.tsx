'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';

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
 * Creates a starry night sky background with static stars and floating bubbles
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
    () => (isClient ? generateBubbles(dimensions.width) : []),
    [isClient, dimensions.width, generateBubbles]
  );

  // Generate static stars with consistent positioning using seeded random
  const generateStaticStars = useCallback(() => {
    const starCount = 100;
    const stars = [];

    for (let i = 0; i < starCount; i++) {
      const topRandom = seededRandom(i * 1000);
      const leftRandom = seededRandom(i * 1001);
      const sizeRandom = seededRandom(i * 1002);
      const opacityRandom = seededRandom(i * 1003);

      const size = sizeRandom < 0.5 ? 1 : 2;
      const top = `${(topRandom * 90 + 5).toFixed(0)}%`;
      const left = `${(leftRandom * 90 + 5).toFixed(0)}%`;
      const opacity = Number((opacityRandom * 0.3 + 0.6).toFixed(2));

      stars.push({
        id: i,
        size,
        top,
        left,
        opacity,
      });
    }

    return stars;
  }, [seededRandom]);

  const staticStars = useMemo(
    () => (isClient ? generateStaticStars() : []),
    [isClient, generateStaticStars]
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
    <div className="bg-gradient-to-br from-violet-600 via-indigo-900 to-gray-900 min-h-screen w-full p-20">
      {/* Only render static stars on client */}
      {isClient && (
        <div className="absolute inset-0">
          {staticStars.map((star) => (
            <div
              key={`star-${star.id}`}
              className={`absolute bg-white rounded-full ${
                star.size === 1 ? 'w-0.5 h-0.5' : 'w-1 h-1'
              }`}
              style={{
                top: star.top,
                left: star.left,
                opacity: star.opacity,
              }}
            />
          ))}
        </div>
      )}

      {/* Only render bubbles on client */}
      {isClient && (
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
      )}

      {/* Content */}
      <div className="z-10 relative">{children}</div>
    </div>
  );
}
