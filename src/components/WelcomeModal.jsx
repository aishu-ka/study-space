import { useState } from 'react';

const WelcomeModal = ({ isOpen, onClose, onNameSubmit }) => {
  const [name, setName] = useState('');

  if (!isOpen) return null;

  const handleSubmit = () => {
    if (name.trim()) {
      onNameSubmit(name.trim());
      onClose();
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && name.trim()) {
      handleSubmit();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="rounded-3xl shadow-2xl max-w-lg w-full transform transition-all" style={{ backgroundColor: 'var(--color-modalBg)' }}>
        {/* Header */}
        <div className="p-8 pb-6 text-center">
          <div className="text-6xl mb-4">🍅</div>
          <h2 className="text-3xl font-bold mb-2" style={{
            background: `linear-gradient(to right, var(--color-primary), var(--color-secondary))`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            Welcome to Your Study Space!
          </h2>
          <p className="text-sm" style={{ color: 'var(--color-textSecondary)' }}>
            Your productivity companion for focused work sessions
          </p>
        </div>

        {/* Name Input */}
        <div className="px-8 pb-4">
          <div className="p-4 rounded-xl border" style={{
            backgroundColor: 'var(--color-surface)',
            borderColor: 'var(--color-border)'
          }}>
            <label className="block text-sm font-medium mb-2" style={{ color: 'var(--color-textPrimary)' }}>
              What's your name?
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Enter your name"
              className="w-full px-4 py-3 rounded-xl focus:outline-none focus:ring-2"
              style={{
                backgroundColor: 'var(--color-inputBg)',
                borderColor: 'var(--color-border)',
                color: 'var(--color-textPrimary)',
                border: '1px solid'
              }}
              autoFocus
            />
            <p className="text-xs mt-2" style={{ color: 'var(--color-textSecondary)' }}>
              This will personalize your study space (you can change it later in settings)
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="px-8 pb-6">
          <div className="space-y-4">
            {/* Feature 1 */}
            <div className="flex gap-4 items-start p-4 rounded-xl" style={{ backgroundColor: 'var(--color-surface)' }}>
              <div className="text-3xl flex-shrink-0">⏱️</div>
              <div>
                <h3 className="font-bold mb-1" style={{ color: 'var(--color-textPrimary)' }}>
                  Focus Timer
                </h3>
                <p className="text-sm" style={{ color: 'var(--color-textSecondary)' }}>
                  Work in 25-minute focused sessions followed by refreshing breaks
                </p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="flex gap-4 items-start p-4 rounded-xl" style={{ backgroundColor: 'var(--color-surface)' }}>
              <div className="text-3xl flex-shrink-0">✅</div>
              <div>
                <h3 className="font-bold mb-1" style={{ color: 'var(--color-textPrimary)' }}>
                  Task Management
                </h3>
                <p className="text-sm" style={{ color: 'var(--color-textSecondary)' }}>
                  Organize your tasks with categories and track completed pomodoros
                </p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="flex gap-4 items-start p-4 rounded-xl" style={{ backgroundColor: 'var(--color-surface)' }}>
              <div className="text-3xl flex-shrink-0">🎨</div>
              <div>
                <h3 className="font-bold mb-1" style={{ color: 'var(--color-textPrimary)' }}>
                  Customizable
                </h3>
                <p className="text-sm" style={{ color: 'var(--color-textSecondary)' }}>
                  Choose from beautiful themes and customize session durations
                </p>
              </div>
            </div>

            {/* Feature 4 */}
            <div className="flex gap-4 items-start p-4 rounded-xl" style={{ backgroundColor: 'var(--color-surface)' }}>
              <div className="text-3xl flex-shrink-0">🎵</div>
              <div>
                <h3 className="font-bold mb-1" style={{ color: 'var(--color-textPrimary)' }}>
                  Ambient Sounds
                </h3>
                <p className="text-sm" style={{ color: 'var(--color-textSecondary)' }}>
                  Enhance focus with soothing background sounds
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="px-8 pb-8">
          <div className="p-4 rounded-xl mb-4" style={{
            backgroundColor: 'var(--color-surface)',
            border: '2px solid var(--color-border)'
          }}>
            <p className="text-sm text-center" style={{ color: 'var(--color-textSecondary)' }}>
              <strong style={{ color: 'var(--color-textPrimary)' }}>Pro Tip:</strong> Click the
              <svg className="w-4 h-4 inline mx-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ verticalAlign: 'middle' }}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              info button anytime to view detailed instructions
            </p>
          </div>

          <button
            onClick={handleSubmit}
            disabled={!name.trim()}
            className="w-full px-6 py-3 text-white font-semibold rounded-xl transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-xl hover:scale-105 disabled:hover:scale-100"
            style={{
              background: name.trim() ? `linear-gradient(to right, var(--color-primary), var(--color-secondary))` : '#999'
            }}
          >
            Get Started!
          </button>
        </div>
      </div>
    </div>
  );
};

export default WelcomeModal;
