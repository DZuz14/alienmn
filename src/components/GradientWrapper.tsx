'use client';

/**
 * Wraps the children in a gradient background
 * @param children - The children to wrap
 * @param className - Additional class names to apply to the wrapper
 * @returns The wrapped children
 */
export default function GradientWrapper({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`bg-gradient-to-br from-violet-600 via-indigo-900 to-gray-900 min-h-screen w-full flex flex-col items-center justify-center ${className}`}
    >
      {children}
    </div>
  );
}
