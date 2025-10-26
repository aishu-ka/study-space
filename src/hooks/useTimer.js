import { useState, useEffect, useRef, useCallback } from 'react';

export const SESSION_TYPES = {
  WORK: 'work',
  SHORT_BREAK: 'short_break',
  LONG_BREAK: 'long_break',
};

export const useTimer = (initialSettings = {}) => {
  const [settings, setSettings] = useState({
    workDuration: initialSettings.workDuration || 25,
    shortBreakDuration: initialSettings.shortBreakDuration || 5,
    longBreakDuration: initialSettings.longBreakDuration || 15,
    autoStartBreaks: initialSettings.autoStartBreaks || false,
    autoStartPomodoros: initialSettings.autoStartPomodoros || false,
  });

  const [sessionType, setSessionType] = useState(SESSION_TYPES.WORK);
  const [timeLeft, setTimeLeft] = useState(settings.workDuration * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [completedPomodoros, setCompletedPomodoros] = useState(0);
  const [sessionHistory, setSessionHistory] = useState([]);

  const intervalRef = useRef(null);
  const notificationCallbackRef = useRef(null);

  // Get the duration for current session type
  const getSessionDuration = useCallback((type) => {
    switch (type) {
      case SESSION_TYPES.WORK:
        return settings.workDuration * 60;
      case SESSION_TYPES.SHORT_BREAK:
        return settings.shortBreakDuration * 60;
      case SESSION_TYPES.LONG_BREAK:
        return settings.longBreakDuration * 60;
      default:
        return settings.workDuration * 60;
    }
  }, [settings]);

  // Timer tick effect
  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            handleSessionComplete();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, timeLeft]);

  // Handle session completion
  const handleSessionComplete = useCallback(() => {
    setIsRunning(false);

    // Call notification callback if set
    if (notificationCallbackRef.current) {
      notificationCallbackRef.current(sessionType);
    }

    // Add to history
    const completedSession = {
      type: sessionType,
      completedAt: new Date().toISOString(),
      duration: getSessionDuration(sessionType),
    };
    setSessionHistory((prev) => [...prev, completedSession]);

    // Determine next session
    let nextSession;
    if (sessionType === SESSION_TYPES.WORK) {
      const newPomodoroCount = completedPomodoros + 1;
      setCompletedPomodoros(newPomodoroCount);

      // Every 4 pomodoros, take a long break
      if (newPomodoroCount % 4 === 0) {
        nextSession = SESSION_TYPES.LONG_BREAK;
      } else {
        nextSession = SESSION_TYPES.SHORT_BREAK;
      }

      // Auto-start break if enabled
      if (settings.autoStartBreaks) {
        setTimeout(() => {
          setSessionType(nextSession);
          setTimeLeft(getSessionDuration(nextSession));
          setIsRunning(true);
        }, 1000);
        return;
      }
    } else {
      // Break completed, next is work
      nextSession = SESSION_TYPES.WORK;

      // Auto-start pomodoro if enabled
      if (settings.autoStartPomodoros) {
        setTimeout(() => {
          setSessionType(nextSession);
          setTimeLeft(getSessionDuration(nextSession));
          setIsRunning(true);
        }, 1000);
        return;
      }
    }

    // Manual transition
    setSessionType(nextSession);
    setTimeLeft(getSessionDuration(nextSession));
  }, [sessionType, completedPomodoros, settings, getSessionDuration]);

  // Control functions
  const start = useCallback(() => {
    setIsRunning(true);
  }, []);

  const pause = useCallback(() => {
    setIsRunning(false);
  }, []);

  const reset = useCallback(() => {
    setIsRunning(false);
    setTimeLeft(getSessionDuration(sessionType));
  }, [sessionType, getSessionDuration]);

  const skip = useCallback(() => {
    handleSessionComplete();
  }, [handleSessionComplete]);

  const switchSession = useCallback((type) => {
    setIsRunning(false);
    setSessionType(type);
    setTimeLeft(getSessionDuration(type));
  }, [getSessionDuration]);

  const updateSettings = useCallback((newSettings) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
    // If currently on a session, update the time left
    setTimeLeft(getSessionDuration(sessionType));
  }, [sessionType, getSessionDuration]);

  const setNotificationCallback = useCallback((callback) => {
    notificationCallbackRef.current = callback;
  }, []);

  // Calculate progress percentage
  const progress = ((getSessionDuration(sessionType) - timeLeft) / getSessionDuration(sessionType)) * 100;

  return {
    // State
    timeLeft,
    sessionType,
    isRunning,
    completedPomodoros,
    sessionHistory,
    settings,
    progress,

    // Actions
    start,
    pause,
    reset,
    skip,
    switchSession,
    updateSettings,
    setNotificationCallback,

    // Helpers
    getSessionDuration,
  };
};
