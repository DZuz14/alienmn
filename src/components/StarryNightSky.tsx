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
  // Use state only for window dimensions to minimize rerenders
  const [dimensions, setDimensions] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 1920,
    height: typeof window !== 'undefined' ? window.innerHeight : 1080,
  });

  // Generate random stars with consistent animation properties
  const generateStars = useCallback((width: number, height: number) => {
    const starCount = Math.floor((width * height) / 10000) + 30;
    const newStars: Star[] = [];

    for (let i = 0; i < starCount; i++) {
      // Use more consistent animation durations
      const animationDuration = `${(Math.random() * 2 + 3).toFixed(1)}s`;
      // Spread out animation delays more evenly
      const animationDelay = `${(i * 0.1) % 5}s`;

      newStars.push({
        id: i,
        size: Math.random() * 2.5 + 1,
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        animationDelay,
        animationDuration,
      });
    }

    return newStars;
  }, []);

  // Generate floating bubbles with consistent animation properties
  const generateBubbles = useCallback((width: number) => {
    const bubbleCount = Math.floor(width / 50) + 15;
    const newBubbles: Bubble[] = [];

    for (let i = 0; i < bubbleCount; i++) {
      // Use more consistent animation durations
      const animationDuration = `${(Math.random() * 15 + 30).toFixed(1)}s`;
      // Spread out animation delays more evenly
      const animationDelay = `${(i * 0.3) % 10}s`;

      newBubbles.push({
        id: i,
        size: Math.random() * 10 + 3,
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        opacity: Number((Math.random() * 0.15 + 0.05).toFixed(2)),
        animationDuration,
        animationDelay,
      });
    }

    return newBubbles;
  }, []);

  // Memoize stars and bubbles based on dimensions
  const stars = useMemo(
    () => generateStars(dimensions.width, dimensions.height),
    [dimensions, generateStars]
  );
  const bubbles = useMemo(
    () => generateBubbles(dimensions.width),
    [dimensions.width, generateBubbles]
  );

  // Handle resize with debounce to prevent excessive updates
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setDimensions({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      }, 200); // Debounce resize events
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <div className="bg-gradient-to-br from-violet-600 via-indigo-900 to-gray-900 min-h-screen w-full flex flex-col items-center justify-center relative overflow-hidden">
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
          className="absolute rounded-full border border-indigo-200/30"
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

      {/* Content */}
      <div className="z-10 relative">{children}</div>

      {/* CSS for animations */}
      <style jsx global>{`
        @keyframes twinkle {
          0% {
            opacity: 0.3;
          }
          50% {
            opacity: 0.9;
          }
          100% {
            opacity: 0.3;
          }
        }

        @keyframes float {
          0% {
            transform: translateY(0px);
          }
          100% {
            transform: translateY(-15px);
          }
        }

        @keyframes moveAround {
          0% {
            transform: translate(0px, 0px);
          }
          33% {
            transform: translate(20px, -15px);
          }
          66% {
            transform: translate(-15px, 8px);
          }
          100% {
            transform: translate(8px, -20px);
          }
        }
      `}</style>
    </div>
  );
}
