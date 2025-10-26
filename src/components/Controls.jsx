const Controls = ({ isRunning, onStart, onPause, onReset, onSkip }) => {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
      {/* Play/Pause Button */}
      <button
        onClick={isRunning ? onPause : onStart}
        className="px-8 py-4 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center gap-2"
        style={{
          background: `linear-gradient(to right, var(--color-primary), var(--color-secondary))`
        }}
      >
        {isRunning ? (
          <>
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            Pause
          </>
        ) : (
          <>
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
            </svg>
            Start
          </>
        )}
      </button>

      {/* Reset Button */}
      <button
        onClick={onReset}
        className="px-6 py-4 font-semibold rounded-2xl shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200 border flex items-center gap-2"
        style={{
          backgroundColor: 'var(--color-surface)',
          color: 'var(--color-textPrimary)',
          borderColor: 'var(--color-border)'
        }}
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
        Reset
      </button>

      {/* Skip Button */}
      <button
        onClick={onSkip}
        className="px-6 py-4 font-semibold rounded-2xl shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200 border flex items-center gap-2"
        style={{
          backgroundColor: 'var(--color-surface)',
          color: 'var(--color-textPrimary)',
          borderColor: 'var(--color-border)'
        }}
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
        </svg>
        Skip
      </button>
    </div>
  );
};

export default Controls;
