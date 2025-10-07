'use client';

import { useEffect, useState } from 'react';
import { ChevronUp } from 'lucide-react';

/**
 * Back to top button that appears after scrolling down a certain amount
 * Positioned in the bottom right corner of the screen
 */
export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      // Find the scrollable container (StarryNightSky content div)
      const scrollContainer = document.querySelector('.overflow-y-auto');
      if (scrollContainer) {
        if (scrollContainer.scrollTop > 50) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      }
    };

    // Find the scrollable container and listen for scroll events
    const scrollContainer = document.querySelector('.overflow-y-auto');
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', toggleVisibility);

      // Clean up the event listener
      return () =>
        scrollContainer.removeEventListener('scroll', toggleVisibility);
    }
  }, []);

  const scrollToTop = () => {
    const scrollContainer = document.querySelector('.overflow-y-auto');
    if (scrollContainer) {
      scrollContainer.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
  };

  return (
    <button
      className={`
        fixed bottom-6 right-6 z-50
        bg-indigo-600 hover:bg-indigo-700
        text-white rounded-full p-3
        shadow-lg hover:shadow-xl
        transition-all duration-300 ease-in-out
        transform hover:scale-110
        cursor-pointer
        ${
          isVisible
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-4 pointer-events-none'
        }
      `}
      onClick={scrollToTop}
      aria-label="Back to top"
    >
      <ChevronUp size={24} />
    </button>
  );
}
