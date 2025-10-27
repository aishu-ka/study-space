import { useState, useEffect } from 'react';

const Instructions = ({ isOpen, onClose }) => {
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const savedName = localStorage.getItem('userName') || 'Your';
    setUserName(savedName);
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] flex flex-col transform transition-all" style={{ backgroundColor: 'var(--color-modalBg)' }}>
        {/* Header */}
        <div className="flex items-center justify-between p-8 pb-4">
          <h2 className="text-2xl font-bold" style={{ color: 'var(--color-textPrimary)' }}>
            How to Use {userName}'s Study Space
          </h2>
          <button
            onClick={onClose}
            className="transition-colors"
            style={{ color: 'var(--color-textSecondary)' }}
            onMouseOver={(e) => e.currentTarget.style.color = 'var(--color-textPrimary)'}
            onMouseOut={(e) => e.currentTarget.style.color = 'var(--color-textSecondary)'}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto px-8 pb-8 flex-1">
          {/* What is Pomodoro */}
          <section className="mb-6">
            <h3 className="text-lg font-bold mb-2 flex items-center gap-2" style={{ color: 'var(--color-textPrimary)' }}>
              <span className="text-2xl">🍅</span>
              What is the Pomodoro Technique?
            </h3>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--color-textSecondary)' }}>
              The Pomodoro Technique is a time management method that uses a timer to break work into focused intervals
              (traditionally 25 minutes) separated by short breaks. This helps maintain concentration and prevent burnout.
            </p>
          </section>

          {/* Timer Instructions */}
          <section className="mb-6">
            <h3 className="text-lg font-bold mb-3 flex items-center gap-2" style={{ color: 'var(--color-textPrimary)' }}>
              <span className="text-2xl">⏱️</span>
              Using the Timer
            </h3>
            <ul className="space-y-2 text-sm" style={{ color: 'var(--color-textSecondary)' }}>
              <li className="flex gap-2">
                <span className="flex-shrink-0">•</span>
                <span><strong>Work Session:</strong> Focus on your task for 25 minutes (default)</span>
              </li>
              <li className="flex gap-2">
                <span className="flex-shrink-0">•</span>
                <span><strong>Short Break:</strong> Take a 5-minute break after each work session</span>
              </li>
              <li className="flex gap-2">
                <span className="flex-shrink-0">•</span>
                <span><strong>Long Break:</strong> After 4 work sessions, take a longer 15-minute break</span>
              </li>
              <li className="flex gap-2">
                <span className="flex-shrink-0">•</span>
                <span><strong>Controls:</strong> Use Start/Pause to control the timer, Reset to restart, or Skip to move to next session</span>
              </li>
            </ul>
          </section>

          {/* Tasks Instructions */}
          <section className="mb-6">
            <h3 className="text-lg font-bold mb-3 flex items-center gap-2" style={{ color: 'var(--color-textPrimary)' }}>
              <span className="text-2xl">✅</span>
              Managing Tasks
            </h3>
            <ul className="space-y-2 text-sm" style={{ color: 'var(--color-textSecondary)' }}>
              <li className="flex gap-2">
                <span className="flex-shrink-0">•</span>
                <span><strong>Add Tasks:</strong> Type your task and select a category, then click Add</span>
              </li>
              <li className="flex gap-2">
                <span className="flex-shrink-0">•</span>
                <span><strong>Categories:</strong> Choose from Work 💼, Study 📚, Personal 🏠, Health 💪, Creative 🎨, or General 📋</span>
              </li>
              <li className="flex gap-2">
                <span className="flex-shrink-0">•</span>
                <span><strong>Reorder:</strong> Drag and drop tasks to prioritize them</span>
              </li>
              <li className="flex gap-2">
                <span className="flex-shrink-0">•</span>
                <span><strong>Link to Session:</strong> Click the link icon to track pomodoros for that specific task</span>
              </li>
              <li className="flex gap-2">
                <span className="flex-shrink-0">•</span>
                <span><strong>Edit:</strong> Double-click on a task to edit it</span>
              </li>
              <li className="flex gap-2">
                <span className="flex-shrink-0">•</span>
                <span><strong>Pomodoro Count:</strong> Completed work sessions automatically increment the 🍅 counter</span>
              </li>
            </ul>
          </section>

          {/* Ambient Sounds */}
          <section className="mb-6">
            <h3 className="text-lg font-bold mb-3 flex items-center gap-2" style={{ color: 'var(--color-textPrimary)' }}>
              <span className="text-2xl">🎵</span>
              Ambient Sounds
            </h3>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--color-textSecondary)' }}>
              Use the ambient sounds panel to play background noise that helps with focus. Adjust the volume slider
              to your preference. Choose from rain, coffee shop ambiance, forest sounds, and more.
            </p>
          </section>

          {/* Themes */}
          <section className="mb-6">
            <h3 className="text-lg font-bold mb-3 flex items-center gap-2" style={{ color: 'var(--color-textPrimary)' }}>
              <span className="text-2xl">🎨</span>
              Customization
            </h3>
            <ul className="space-y-2 text-sm" style={{ color: 'var(--color-textSecondary)' }}>
              <li className="flex gap-2">
                <span className="flex-shrink-0">•</span>
                <span><strong>Themes:</strong> Choose from Light, Dark, Sunset, or create your own Custom theme in Settings</span>
              </li>
              <li className="flex gap-2">
                <span className="flex-shrink-0">•</span>
                <span><strong>Auto Mode:</strong> Enable automatic switching between light and dark themes based on time of day</span>
              </li>
              <li className="flex gap-2">
                <span className="flex-shrink-0">•</span>
                <span><strong>Session Durations:</strong> Customize work, short break, and long break durations in Settings</span>
              </li>
              <li className="flex gap-2">
                <span className="flex-shrink-0">•</span>
                <span><strong>Auto-start:</strong> Enable automatic transitions between sessions in Settings</span>
              </li>
            </ul>
          </section>

          {/* Tips */}
          <section className="mb-4">
            <h3 className="text-lg font-bold mb-3 flex items-center gap-2" style={{ color: 'var(--color-textPrimary)' }}>
              <span className="text-2xl">💡</span>
              Pro Tips
            </h3>
            <ul className="space-y-2 text-sm" style={{ color: 'var(--color-textSecondary)' }}>
              <li className="flex gap-2">
                <span className="flex-shrink-0">•</span>
                <span>Eliminate distractions during work sessions - close unnecessary tabs and apps</span>
              </li>
              <li className="flex gap-2">
                <span className="flex-shrink-0">•</span>
                <span>Use breaks to stretch, hydrate, or step away from your screen</span>
              </li>
              <li className="flex gap-2">
                <span className="flex-shrink-0">•</span>
                <span>Plan your tasks at the start of each day for better focus</span>
              </li>
              <li className="flex gap-2">
                <span className="flex-shrink-0">•</span>
                <span>Enable browser notifications to stay informed when sessions end</span>
              </li>
            </ul>
          </section>
        </div>

        {/* Footer Button */}
        <div className="p-8 pt-4 border-t" style={{ borderColor: 'var(--color-border)' }}>
          <button
            onClick={onClose}
            className="w-full px-6 py-3 text-white font-semibold rounded-xl transition-all shadow-lg"
            style={{
              background: `linear-gradient(to right, var(--color-primary), var(--color-secondary))`
            }}
          >
            Got it!
          </button>
        </div>
      </div>
    </div>
  );
};

export default Instructions;
