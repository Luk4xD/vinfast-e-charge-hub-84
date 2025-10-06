import { useMouseSparkles } from '@/hooks/useMouseSparkles';

export const MouseSparkles = () => {
  const particles = useMouseSparkles(true);

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            left: particle.x,
            top: particle.y,
            width: particle.size,
            height: particle.size,
            opacity: particle.opacity,
            background: `radial-gradient(circle, hsl(var(--electric-blue)) 0%, hsl(var(--electric-blue) / 0.5) 50%, transparent 100%)`,
            boxShadow: `0 0 ${particle.size * 2}px hsl(var(--electric-blue) / 0.6)`,
            transform: `translate(-50%, -50%) scale(${particle.opacity})`,
            transition: 'transform 0.1s ease-out',
          }}
        />
      ))}
    </div>
  );
};
