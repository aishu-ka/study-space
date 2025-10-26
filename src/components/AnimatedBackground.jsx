import { useEffect, useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';

const AnimatedBackground = () => {
  const { currentTheme, themeConfig } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Animated gradient orbs */}
      <div
        className="absolute w-96 h-96 rounded-full blur-3xl opacity-30 animate-float"
        style={{
          top: '10%',
          left: '10%',
          background: `radial-gradient(circle, var(--color-primary), transparent)`,
          animation: 'float 20s ease-in-out infinite'
        }}
      />
      <div
        className="absolute w-96 h-96 rounded-full blur-3xl opacity-30 animate-float-delay"
        style={{
          top: '60%',
          right: '10%',
          background: `radial-gradient(circle, var(--color-secondary), transparent)`,
          animation: 'floatDelay 25s ease-in-out infinite'
        }}
      />
      <div
        className="absolute w-80 h-80 rounded-full blur-3xl opacity-20 animate-float-slow"
        style={{
          bottom: '10%',
          left: '50%',
          background: `radial-gradient(circle, var(--color-primary), transparent)`,
          animation: 'floatSlow 30s ease-in-out infinite'
        }}
      />

      {/* Subtle gradient overlay */}
      <div
        className="absolute inset-0 opacity-50"
        style={{
          background: `linear-gradient(135deg, var(--color-background) 0%, var(--color-surface) 100%)`
        }}
      />
    </div>
  );
};

export default AnimatedBackground;
