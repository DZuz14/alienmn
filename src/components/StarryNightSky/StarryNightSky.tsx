'use client';

import { useEffect, useState } from 'react';
import { Stars, Bubbles } from '@/components';

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
    <div className="bg-gradient-to-br from-violet-600 via-indigo-900 to-gray-900 h-screen w-screen flex fixed inset-0">
      {/* Static stars */}
      <Stars
        isClient={isClient}
        width={dimensions.width}
        height={dimensions.height}
      />

      {/* Floating bubbles */}
      <Bubbles
        isClient={isClient}
        width={dimensions.width}
        height={dimensions.height}
      />

      {/* Content */}
      <div className="z-10 relative w-full flex justify-center overflow-y-auto">
        <div className="max-w-7xl w-full px-4">{children}</div>
      </div>
    </div>
  );
}
