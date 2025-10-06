import { useState, useEffect, useCallback } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  velocityX: number;
  velocityY: number;
}

export const useMouseSparkles = (enabled = true) => {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [lastSparkleTime, setLastSparkleTime] = useState(0);

  const createParticle = useCallback((x: number, y: number) => {
    const now = Date.now();
    // Throttle particle creation to every 30ms
    if (now - lastSparkleTime < 30) return;
    
    setLastSparkleTime(now);
    
    const newParticles: Particle[] = [];
    // Create 2-3 particles per mouse move
    const count = Math.random() > 0.5 ? 2 : 3;
    
    for (let i = 0; i < count; i++) {
      newParticles.push({
        id: now + i,
        x: x + (Math.random() - 0.5) * 20,
        y: y + (Math.random() - 0.5) * 20,
        size: Math.random() * 4 + 4,
        opacity: 1,
        velocityX: (Math.random() - 0.5) * 2,
        velocityY: (Math.random() - 0.5) * 2 - 1,
      });
    }
    
    setParticles(prev => {
      const updated = [...prev, ...newParticles];
      // Limit max particles to 40
      return updated.slice(-40);
    });
  }, [lastSparkleTime]);

  useEffect(() => {
    if (!enabled) return;

    const handleMouseMove = (e: MouseEvent) => {
      createParticle(e.clientX, e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [enabled, createParticle]);

  useEffect(() => {
    if (!enabled) return;

    const animationInterval = setInterval(() => {
      setParticles(prev => {
        return prev
          .map(particle => ({
            ...particle,
            x: particle.x + particle.velocityX,
            y: particle.y + particle.velocityY,
            opacity: particle.opacity - 0.02,
          }))
          .filter(particle => particle.opacity > 0);
      });
    }, 16); // ~60fps

    return () => clearInterval(animationInterval);
  }, [enabled]);

  return particles;
};
