import { useState, useEffect } from 'react';
import { SESSION_TYPES } from '../hooks/useTimer';

const MOTIVATIONAL_QUOTES = [
  "Believe you can and you're halfway there",
  "The secret of getting ahead is getting started",
  "Success is the sum of small efforts repeated daily",
  "Dream big, work hard, stay focused",
  "Your only limit is you",
  "Great things never come from comfort zones",
  "Don't watch the clock; do what it does. Keep going",
  "The harder you work, the luckier you get",
  "Focus on being productive instead of busy",
  "Small progress is still progress",
  "You are capable of amazing things",
  "One step at a time, one day at a time",
  "Stay patient and trust your journey",
  "Difficult roads often lead to beautiful destinations",
  "The best time to start was yesterday. The next best time is now",
];

const Timer = ({ timeLeft, sessionType, progress }) => {
  const [currentQuote, setCurrentQuote] = useState(() => {
    // Get quote index based on current hour
    const hour = new Date().getHours();
    return MOTIVATIONAL_QUOTES[hour % MOTIVATIONAL_QUOTES.length];
  });

  // Update quote every hour
  useEffect(() => {
    const updateQuote = () => {
      const hour = new Date().getHours();
      setCurrentQuote(MOTIVATIONAL_QUOTES[hour % MOTIVATIONAL_QUOTES.length]);
    };

    // Calculate time until next hour
    const now = new Date();
    const nextHour = new Date(now);
    nextHour.setHours(now.getHours() + 1, 0, 0, 0);
    const timeUntilNextHour = nextHour - now;

    // Set timeout for next hour, then set interval for subsequent hours
    const initialTimeout = setTimeout(() => {
      updateQuote();
      const hourlyInterval = setInterval(updateQuote, 60 * 60 * 1000);
      return () => clearInterval(hourlyInterval);
    }, timeUntilNextHour);

    return () => clearTimeout(initialTimeout);
  }, []);

  // Format time as MM:SS
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  // Get session label and color using CSS variables
  const getSessionInfo = () => {
    switch (sessionType) {
      case SESSION_TYPES.WORK:
        return {
          label: currentQuote,
          ringColor: 'var(--color-primary)',
          bgOpacity: 0.1,
        };
      case SESSION_TYPES.SHORT_BREAK:
        return {
          label: 'Short Break',
          ringColor: 'var(--color-success)',
          bgOpacity: 0.1,
        };
      case SESSION_TYPES.LONG_BREAK:
        return {
          label: 'Long Break',
          ringColor: 'var(--color-secondary)',
          bgOpacity: 0.1,
        };
      default:
        return {
          label: currentQuote,
          ringColor: 'var(--color-primary)',
          bgOpacity: 0.1,
        };
    }
  };

  const sessionInfo = getSessionInfo();
  const radius = 140;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="flex flex-col items-center justify-center">
      {/* Session Type Label / Motivational Quote */}
      <div
        className="mb-8 px-6 py-3 rounded-2xl backdrop-blur-sm max-w-md text-center"
        style={{
          backgroundColor: `${sessionInfo.ringColor}${Math.round(sessionInfo.bgOpacity * 255).toString(16).padStart(2, '0')}`
        }}
      >
        <p
          className="text-base font-semibold leading-relaxed"
          style={{ color: sessionInfo.ringColor, fontFamily: '"Product Sans", sans-serif' }}
        >
          {sessionInfo.label}
        </p>
      </div>

      {/* Circular Timer */}
      <div className="relative">
        <svg
          className="transform -rotate-90"
          width="320"
          height="320"
        >
          {/* Background circle */}
          <circle
            cx="160"
            cy="160"
            r={radius}
            strokeWidth="12"
            fill="none"
            style={{ stroke: 'var(--color-border)' }}
          />
          {/* Progress circle */}
          <circle
            cx="160"
            cy="160"
            r={radius}
            strokeWidth="12"
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-linear"
            style={{ stroke: sessionInfo.ringColor }}
          />
        </svg>

        {/* Time display in center */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div
              className="text-7xl font-bold tracking-tight"
              style={{ color: 'var(--color-textPrimary)' }}
            >
              {formatTime(timeLeft)}
            </div>
            <div
              className="text-sm mt-2"
              style={{ color: 'var(--color-textSecondary)' }}
            >
              {Math.floor(progress)}% complete
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Timer;
