export default function GlowingText({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      style={{
        textShadow: '0 0 14px rgba(255, 255, 255, 0.85)',
      }}
    >
      {children}
    </div>
  );
}
