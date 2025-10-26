import { useEffect, useRef } from 'react';

const Confetti = ({ x, y, onComplete }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const particles = [];
    const particleCount = 15;
    const colors = ['#ef4444', '#ec4899', '#f59e0b', '#10b981', '#3b82f6', '#8b5cf6'];

    // Create particles with tighter spread
    for (let i = 0; i < particleCount; i++) {
      const angle = (Math.PI * 2 * i) / particleCount + (Math.random() - 0.5) * 0.5;
      const speed = Math.random() * 2 + 1.5;

      particles.push({
        x: 0,
        y: 0,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 1,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: Math.random() * 3 + 1.5,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 15,
        gravity: 0.2,
        life: 1,
        decay: Math.random() * 0.02 + 0.02,
      });
    }

    let animationId;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      let allDead = true;

      particles.forEach((particle) => {
        if (particle.life <= 0) return;

        allDead = false;

        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.vy += particle.gravity;
        particle.rotation += particle.rotationSpeed;
        particle.life -= particle.decay;

        // Draw particle
        ctx.save();
        ctx.translate(particle.x, particle.y);
        ctx.rotate((particle.rotation * Math.PI) / 180);
        ctx.globalAlpha = particle.life;
        ctx.fillStyle = particle.color;

        // Draw as a small square
        ctx.fillRect(-particle.size / 2, -particle.size / 2, particle.size, particle.size);
        ctx.restore();
      });

      if (allDead) {
        cancelAnimationFrame(animationId);
        onComplete?.();
      } else {
        animationId = requestAnimationFrame(animate);
      }
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [onComplete]);

  return (
    <canvas
      ref={canvasRef}
      width={120}
      height={120}
      style={{
        position: 'fixed',
        left: x - 60,
        top: y - 60,
        pointerEvents: 'none',
        zIndex: 9999,
      }}
    />
  );
};

export default Confetti;
