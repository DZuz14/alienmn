'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';

interface Star {
  id: number;
  top: string;
  left: string;
  opacity: number;
}

/**
 * Renders static stars in the night sky with well-distributed positioning
 */
export default function Stars() {
  const [isClient, setIsClient] = useState(false);
  const [dimensions, setDimensions] = useState({
    width: 1920,
    height: 1080,
  });

  // Seeded random number generator for consistent results
  const seededRandom = useCallback((seed: number) => {
    const x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
  }, []);

  // Generate well-distributed stars using grid-based approach
  const generateWellDistributedStars = useCallback(
    (width: number, height: number) => {
      // Much higher density: aim for ~1 star per 3000-5000 pixels
      const starCount = Math.floor((width * height) / 4000);
      const stars: Star[] = [];
      const minDistance = Math.min(width, height) * 0.008; // Reduced from 2% to 0.8%
      const edgeBuffer = 0; // No edge buffer - stars can appear at screen edges

      // Create grid cells for better distribution
      const cols = Math.ceil(Math.sqrt(starCount * 1.2));
      const rows = Math.ceil(starCount / cols);
      const cellWidth = width / cols;
      const cellHeight = height / rows;

      for (let i = 0; i < starCount; i++) {
        let attempts = 0;
        let placed = false;

        while (!placed && attempts < 100) {
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

            stars.push({
              id: i,
              top: `${((y / height) * 100).toFixed(1)}%`,
              left: `${((x / width) * 100).toFixed(1)}%`,
              opacity: Number((opacityRandom * 0.5 + 0.3).toFixed(2)), // 0.3-0.8 opacity range
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
    () => generateWellDistributedStars(dimensions.width, dimensions.height),
    [dimensions.width, dimensions.height, generateWellDistributedStars]
  );

  // Initialize client-side dimensions and handle resize
  useEffect(() => {
    // Set initial dimensions on client mount
    setIsClient(true);
    setDimensions({
      width: window.innerWidth,
      height: window.innerHeight,
    });

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
  }, []);

  // Don't render stars until client-side hydration is complete
  if (!isClient) {
    return <div className="absolute inset-0" />;
  }

  return (
    <div className="absolute inset-0">
      {stars.map((star) => (
        <div
          key={`star-${star.id}`}
          className="absolute bg-white rounded-full w-0.5 h-0.5"
          style={{
            top: star.top,
            left: star.left,
            opacity: star.opacity,
          }}
        />
      ))}
    </div>
  );
}
