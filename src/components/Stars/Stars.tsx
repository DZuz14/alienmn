'use client';

import { useCallback, useMemo } from 'react';

/**
 * Configuration object for Stars component
 * Adjust these values to customize the starry night sky appearance
 */
const STARS_CONFIG = {
  // Star density - lower values = more stars
  // Formula: (width * height) / densityFactor
  densityFactor: 4000,

  // Star appearance
  size: '2.5px', // Size of each star (CSS value)

  // Minimum distance between stars (as percentage of screen size)
  minDistancePercent: 0.008, // 0.8% of screen size

  // Opacity settings for non-twinkling stars
  opacity: {
    min: 0.3, // Minimum opacity
    max: 0.8, // Maximum opacity (min + range)
    range: 0.5, // Opacity range (max - min)
  },

  // Twinkling star settings
  twinkle: {
    probability: 0.25, // 25% of stars will twinkle
    opacity: 0.6, // Fixed opacity for twinkling stars
    duration: {
      min: 2, // Minimum twinkle duration in seconds
      range: 3, // Additional random duration range
    },
    delay: {
      min: 1, // Minimum delay before twinkling starts
      range: 8, // Additional random delay range
    },
  },

  // Grid distribution settings
  grid: {
    oversampling: 1.2, // Multiplier for grid cells (higher = better distribution)
  },

  // Performance settings
  maxPlacementAttempts: 100, // Max attempts to place each star
  edgeBuffer: 0, // Buffer from screen edges (0 = stars can appear at edges)
} as const;

interface Star {
  id: number;
  top: string;
  left: string;
  opacity: number;
  shouldTwinkle: boolean;
  twinkleDuration?: string;
  twinkleDelay?: string;
}

interface StarsProps {
  isClient: boolean;
  width: number;
  height: number;
}

/**
 * Renders stars in the night sky with well-distributed positioning and twinkling effects
 */
export default function Stars({ isClient, width, height }: StarsProps) {
  // Seeded random number generator for consistent results
  const seededRandom = useCallback((seed: number) => {
    const x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
  }, []);

  // Generate well-distributed stars using grid-based approach
  const generateWellDistributedStars = useCallback(
    (width: number, height: number) => {
      // Calculate star count based on config density factor
      const starCount = Math.floor(
        (width * height) / STARS_CONFIG.densityFactor
      );
      const stars: Star[] = [];
      const minDistance =
        Math.min(width, height) * STARS_CONFIG.minDistancePercent;
      const edgeBuffer = STARS_CONFIG.edgeBuffer;

      // Create grid cells for better distribution
      const cols = Math.ceil(
        Math.sqrt(starCount * STARS_CONFIG.grid.oversampling)
      );
      const rows = Math.ceil(starCount / cols);
      const cellWidth = width / cols;
      const cellHeight = height / rows;

      for (let i = 0; i < starCount; i++) {
        let attempts = 0;
        let placed = false;

        while (!placed && attempts < STARS_CONFIG.maxPlacementAttempts) {
          // Pick a random cell
          const col = Math.floor(seededRandom(i * 1000 + attempts) * cols);
          const row = Math.floor(seededRandom(i * 1001 + attempts) * rows);

          // Random position within cell (no edge buffer)
          const x =
            col * cellWidth + seededRandom(i * 1002 + attempts) * cellWidth;
          const y =
            row * cellHeight + seededRandom(i * 1003 + attempts) * cellHeight;

          // Check distance from existing stars
          const tooClose = stars.some((star) => {
            const starX = (parseFloat(star.left) * width) / 100;
            const starY = (parseFloat(star.top) * height) / 100;
            const distance = Math.sqrt((x - starX) ** 2 + (y - starY) ** 2);
            return distance < minDistance;
          });

          if (!tooClose) {
            const opacityRandom = seededRandom(i * 1004 + attempts);
            const twinkleRandom = seededRandom(i * 1005 + attempts);
            const durationRandom = seededRandom(i * 1006 + attempts);
            const delayRandom = seededRandom(i * 1007 + attempts);

            const shouldTwinkle =
              twinkleRandom < STARS_CONFIG.twinkle.probability;

            stars.push({
              id: i,
              top: `${((y / height) * 100).toFixed(1)}%`,
              left: `${((x / width) * 100).toFixed(1)}%`,
              opacity: shouldTwinkle
                ? STARS_CONFIG.twinkle.opacity
                : Number(
                    (
                      opacityRandom * STARS_CONFIG.opacity.range +
                      STARS_CONFIG.opacity.min
                    ).toFixed(2)
                  ),
              shouldTwinkle,
              twinkleDuration: shouldTwinkle
                ? `${(
                    durationRandom * STARS_CONFIG.twinkle.duration.range +
                    STARS_CONFIG.twinkle.duration.min
                  ).toFixed(1)}s`
                : undefined,
              twinkleDelay: shouldTwinkle
                ? `${(
                    delayRandom * STARS_CONFIG.twinkle.delay.range +
                    STARS_CONFIG.twinkle.delay.min
                  ).toFixed(1)}s`
                : undefined,
            });
            placed = true;
          }
          attempts++;
        }
      }

      return stars;
    },
    [seededRandom]
  );

  const stars = useMemo(
    () => (isClient ? generateWellDistributedStars(width, height) : []),
    [isClient, width, height, generateWellDistributedStars]
  );

  if (!isClient) return null;

  return (
    <div className="absolute inset-0">
      {stars.map((star) => (
        <div
          key={`star-${star.id}`}
          className="absolute bg-white rounded-full"
          style={{
            top: star.top,
            left: star.left,
            width: STARS_CONFIG.size,
            height: STARS_CONFIG.size,
            opacity: star.opacity,
            ...(star.shouldTwinkle && {
              animationName: 'twinkle',
              animationDuration: star.twinkleDuration,
              animationDelay: star.twinkleDelay,
              animationIterationCount: 'infinite',
              animationTimingFunction: 'ease-in-out',
            }),
          }}
        />
      ))}
    </div>
  );
}
