import { useState, useEffect } from 'react';
import { useTimer, SESSION_TYPES } from './hooks/useTimer';
import Timer from './components/Timer';
import Controls from './components/Controls';
import Settings from './components/Settings';
import SessionHistory from './components/SessionHistory';
import AmbientSounds from './components/AmbientSounds';
import TodoList from './components/TodoList';
import AnimatedBackground from './components/AnimatedBackground';
import ParticleEffects from './components/ParticleEffects';
import Instructions from './components/Instructions';
import WelcomeModal from './components/WelcomeModal';
import CalendarModal from './components/CalendarModal';

function App() {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isInstructionsOpen, setIsInstructionsOpen] = useState(false);
  const [isWelcomeOpen, setIsWelcomeOpen] = useState(false);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState(null);
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('pomodoroTasks');
    return saved ? JSON.parse(saved) : [];
  });
  const [userName, setUserName] = useState(() => {
    return localStorage.getItem('pomodoroUserName') || '';
  });
  const timer = useTimer();

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('pomodoroTasks', JSON.stringify(tasks));
  }, [tasks]);

  // Play notification sound on session complete and update task pomodoro count
  useEffect(() => {
    timer.setNotificationCallback((sessionType) => {
      // If a work session completed and a task is selected, increment its pomodoro count
      if (sessionType === SESSION_TYPES.WORK && selectedTaskId) {
        setTasks(prevTasks =>
          prevTasks.map(task =>
            task.id === selectedTaskId
              ? { ...task, pomodoroCount: (task.pomodoroCount || 0) + 1 }
              : task
          )
        );
      }

      // Play browser notification sound
      const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBCyAzvLZiTYIG2m98OScTgwOUKnk77RgGgU7k9n1ynYpBSh+zPLaizsHGGS36uihUhELTqXh8bdjGwU7k9j0y3kpBSh9y/DajDwIF2W56+mjUBILS6Xg77hjHAU/ltv1xXMnBDF+zO/bhjoIGGa46uekTxILS6Xf8LhjHQU/l9v1xXInBDF9y+/bhjsIGWi56+mjUBELTKPh8LhjHQU/l9r1xnQmBDF9yu/ahjoIG2m56+ihUBELTaPg8LdjHQZAl9z1xXMnBDB9yu/ahjsIHGi46uijUhEKTqPh8bZgGgZBmNz1xHInBDJ9ye/ahjsIG2m56+mjTxILTaLf77VhGwY/mdr1yHMmBDJ9ye/ahjsIG2m56+mjTxILTaLg8LRgGgZAl9r1yHMnBDF+y+/bhzwIGmm56+ijUBEKTqPh77VgGgU/mNv1yHMnBDF+yu/ahzwIGmm56+ijUBEKT6Pg8LVgGgU/mNv1yHQnBDF9yu/bhzwIGWm66+ijUBEKT6Pg8LVgGgU/mNr1x3QmBDF+yu/ahjsIHGq56+mgUBEKT6Ph8LdjHQZBmNr1xnMnBDF9yu/ahjwIGmm56uijUBEKTqPh8LVhHAU/mNv1xnMnBDF+yu/ahjwIGWm66+igUBELTaPg8LVhGwU/mNv1yHQnBDF+yu/ahjwIGWm56+igUBILTaPg8LVhGwU/mNr1yHMnBDF+yu/ahjwIGWm56+mgUBILTaPg8LVhGwU/mNr1yHMnBDF+yu/ahjwIGWm56+mgUBILTaPg8LVhGwU/mNr1yHQnBDF+yu/ahjwIGWm56+ijUBEKT6Pg8LdjHQU/mNv1yHQnBDF+yu/ahzwIGWm66+ijUBEKT6Pg8bdjHQU/l9r1yHQnBDF+yu/ahzwIGWm66+ijUBEKT6Pg8bdjHQU/l9r1yHQnBDF+yu/ahzwIGWm66+ijUBEKT6Pg8bdjHQU/l9r1yHQnBDF+yu/ahzwIGWm66+ijUBEKT6Pg8bdjHQU/l9r1yHQnBDF+yu/ahzwIGWm66+ijUBEKT6Pg8bdjHQU/l9r1yHQnBDF+yu/ahzwI');
      audio.play().catch(err => console.log('Notification sound failed:', err));

      // Show browser notification if permitted
      if ('Notification' in window && Notification.permission === 'granted') {
        const sessionName = sessionType === SESSION_TYPES.WORK ? 'Focus Session' : 'Break';
        new Notification(`${sessionName} Complete!`, {
          body: 'Great work! Time for your next session.',
          icon: '/vite.svg',
        });
      }
    });
  }, [timer, selectedTaskId]);

  // Request notification permission on mount
  useEffect(() => {
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }
  }, []);

  // Save userName to localStorage whenever it changes
  useEffect(() => {
    if (userName) {
      localStorage.setItem('pomodoroUserName', userName);
    }
  }, [userName]);

  // Check if first visit and show welcome modal
  useEffect(() => {
    const hasVisited = localStorage.getItem('hasVisitedPomodoro');
    const savedName = localStorage.getItem('pomodoroUserName');
    if (!hasVisited || !savedName) {
      setIsWelcomeOpen(true);
      localStorage.setItem('hasVisitedPomodoro', 'true');
    }
  }, []);

  const handleNameSubmit = (name) => {
    setUserName(name);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 relative">
      {/* Animated Background */}
      <AnimatedBackground />
      <ParticleEffects />

      {/* Header */}
      <div className="absolute top-4 right-4 flex gap-3">
        <button
          onClick={() => setIsCalendarOpen(true)}
          className="p-3 rounded-xl shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200 border"
          style={{
            backgroundColor: 'var(--color-surface)',
            borderColor: 'var(--color-border)',
          }}
          aria-label="Calendar"
          title="Calendar & Schedule"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: 'var(--color-textPrimary)' }}>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </button>
        <button
          onClick={() => setIsInstructionsOpen(true)}
          className="p-3 rounded-xl shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200 border"
          style={{
            backgroundColor: 'var(--color-surface)',
            borderColor: 'var(--color-border)',
          }}
          aria-label="Instructions"
          title="How to use"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: 'var(--color-textPrimary)' }}>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </button>
        <button
          onClick={() => setIsSettingsOpen(true)}
          className="p-3 rounded-xl shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200 border"
          style={{
            backgroundColor: 'var(--color-surface)',
            borderColor: 'var(--color-border)',
          }}
          aria-label="Settings"
          title="Settings"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: 'var(--color-textPrimary)' }}>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </button>
      </div>

      {/* Main Content */}
      <div className="flex flex-col xl:flex-row items-start justify-center gap-8 w-full max-w-7xl">
        {/* Left Side - Stats and Ambient Sounds */}
        <div className="flex flex-col gap-4 w-full xl:w-auto">
          <SessionHistory
            completedPomodoros={timer.completedPomodoros}
            sessionHistory={timer.sessionHistory}
          />
          <AmbientSounds />
        </div>

        {/* Center - Timer and Controls */}
        <div className="flex flex-col items-center">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-center mb-4 pb-1" style={{
              background: `linear-gradient(to right, var(--color-primary), var(--color-secondary))`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              lineHeight: '1.2'
            }}>
              {userName ? `${userName}'s Study Space` : 'Study Space'}
            </h1>
          </div>

          <Timer
            timeLeft={timer.timeLeft}
            sessionType={timer.sessionType}
            progress={timer.progress}
          />

          <Controls
            isRunning={timer.isRunning}
            onStart={timer.start}
            onPause={timer.pause}
            onReset={timer.reset}
            onSkip={timer.skip}
          />
        </div>

        {/* Right Side - Todo List */}
        <div className="w-full xl:w-auto flex flex-col gap-4">
          <TodoList
            tasks={tasks}
            setTasks={setTasks}
            selectedTaskId={selectedTaskId}
            onTaskSelect={setSelectedTaskId}
            currentSession={timer.sessionType}
          />

          {/* Motivational GIF */}
          <div className="flex justify-center">
            <img
              src="https://i.gifer.com/origin/e4/e4f92c58bd13741fd633be8fa5de45bf_w200.gif"
              alt="Study motivation"
              className="rounded-xl shadow-lg"
              style={{
                maxWidth: '200px',
                width: '100%',
                height: 'auto'
              }}
            />
          </div>
        </div>
      </div>

      {/* Settings Modal */}
      <Settings
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        settings={timer.settings}
        onSave={timer.updateSettings}
        userName={userName}
        onUserNameChange={setUserName}
      />

      {/* Instructions Modal */}
      <Instructions
        isOpen={isInstructionsOpen}
        onClose={() => setIsInstructionsOpen(false)}
      />

      {/* Welcome Modal */}
      <WelcomeModal
        isOpen={isWelcomeOpen}
        onClose={() => setIsWelcomeOpen(false)}
        onNameSubmit={handleNameSubmit}
      />

      {/* Calendar Modal */}
      <CalendarModal
        isOpen={isCalendarOpen}
        onClose={() => setIsCalendarOpen(false)}
        tasks={tasks}
        setTasks={setTasks}
      />
    </div>
  );
}

export default App;
