import { SESSION_TYPES } from '../hooks/useTimer';
import PomodoroIcon from './PomodoroIcon';

const SessionHistory = ({ completedPomodoros, sessionHistory }) => {
  const formatTime = (date) => {
    return new Date(date).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getSessionIcon = (type) => {
    switch (type) {
      case SESSION_TYPES.WORK:
        return '🍅';
      case SESSION_TYPES.SHORT_BREAK:
        return '☕';
      case SESSION_TYPES.LONG_BREAK:
        return '🌴';
      default:
        return '⏱️';
    }
  };

  const getSessionLabel = (type) => {
    switch (type) {
      case SESSION_TYPES.WORK:
        return 'Focus';
      case SESSION_TYPES.SHORT_BREAK:
        return 'Short Break';
      case SESSION_TYPES.LONG_BREAK:
        return 'Long Break';
      default:
        return 'Session';
    }
  };

  return (
    <div className="w-full max-w-md">
      {/* Stats Card */}
      <div className="backdrop-blur-md rounded-2xl p-6 shadow-lg border mb-4" style={{
        backgroundColor: 'var(--color-cardBg)',
        borderColor: 'var(--color-border)'
      }}>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm" style={{ color: 'var(--color-textSecondary)' }}>Completed Today</p>
            <p className="text-4xl font-bold mt-1" style={{ color: 'var(--color-primary)' }}>{completedPomodoros}</p>
          </div>
          <div>
            <PomodoroIcon size={72} />
          </div>
        </div>

        {/* Progress bar */}
        <div className="mt-4">
          <div className="flex justify-between text-xs mb-1" style={{ color: 'var(--color-textSecondary)' }}>
            <span>Goal: 8 pomodoros</span>
            <span>{Math.min(Math.round((completedPomodoros / 8) * 100), 100)}%</span>
          </div>
          <div className="h-2 rounded-full overflow-hidden" style={{ backgroundColor: 'var(--color-surface)' }}>
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{
                width: `${Math.min((completedPomodoros / 8) * 100, 100)}%`,
                background: `linear-gradient(to right, var(--color-primary), var(--color-secondary))`
              }}
            />
          </div>
        </div>
      </div>

      {/* Session History */}
      {sessionHistory.length > 0 && (
        <div className="backdrop-blur-md rounded-2xl p-6 shadow-lg border" style={{
          backgroundColor: 'var(--color-cardBg)',
          borderColor: 'var(--color-border)'
        }}>
          <h3 className="text-lg font-semibold mb-4" style={{ color: 'var(--color-textPrimary)' }}>
            Recent Sessions
          </h3>
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {sessionHistory.slice().reverse().map((session, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 rounded-xl"
                style={{ backgroundColor: 'var(--color-surface)' }}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{getSessionIcon(session.type)}</span>
                  <div>
                    <p className="text-sm font-medium" style={{ color: 'var(--color-textPrimary)' }}>
                      {getSessionLabel(session.type)}
                    </p>
                    <p className="text-xs" style={{ color: 'var(--color-textSecondary)' }}>
                      {formatTime(session.completedAt)}
                    </p>
                  </div>
                </div>
                <div className="text-xs" style={{ color: 'var(--color-textSecondary)' }}>
                  {Math.floor(session.duration / 60)}m
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SessionHistory;
