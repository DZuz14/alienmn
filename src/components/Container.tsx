/**
 * Container component with glassmorphism styling
 * Provides a semi-transparent background with backdrop blur effect
 */

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

export default function Container({
  children,
  className = '',
}: ContainerProps) {
  return (
    <div
      className={`bg-white/20 backdrop-blur-sm rounded-xl p-8 relative shadow-lg border border-white/20 ${className}`}
    >
      {children}
    </div>
  );
}
