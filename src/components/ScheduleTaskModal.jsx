import { useState, useEffect } from 'react';

const ScheduleTaskModal = ({ isOpen, onClose, task, onSchedule }) => {
  const [scheduledDate, setScheduledDate] = useState('');
  const [scheduledTime, setScheduledTime] = useState('');
  const [duration, setDuration] = useState(60);
  const [pomodoroEstimate, setPomodoroEstimate] = useState(0);
  const [notes, setNotes] = useState('');

  // Pre-fill form if task already has scheduling data
  useEffect(() => {
    if (task) {
      setScheduledDate(task.scheduledDate || '');
      setScheduledTime(task.scheduledTime || '');
      setDuration(task.duration || 60);
      setPomodoroEstimate(task.pomodoroEstimate || 0);
      setNotes(task.notes || '');
    }
  }, [task]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!scheduledDate || !scheduledTime) {
      alert('Please select both date and time');
      return;
    }

    onSchedule({
      scheduledDate,
      scheduledTime,
      duration: parseInt(duration),
      pomodoroEstimate: parseInt(pomodoroEstimate),
      notes
    });

    onClose();
  };

  const handleClearSchedule = () => {
    onSchedule({
      scheduledDate: null,
      scheduledTime: null,
      duration: 60,
      pomodoroEstimate: 0,
      notes: ''
    });
    onClose();
  };

  if (!isOpen || !task) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[60] p-4">
      <div
        className="rounded-2xl shadow-2xl w-full max-w-md transform transition-all"
        style={{ backgroundColor: 'var(--color-modalBg)' }}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 pb-4 border-b" style={{ borderColor: 'var(--color-border)' }}>
          <h3 className="text-xl font-bold" style={{ color: 'var(--color-textPrimary)' }}>
            Schedule Task
          </h3>
          <button
            onClick={onClose}
            className="transition-colors p-2 rounded-lg hover:bg-opacity-10"
            style={{ color: 'var(--color-textSecondary)' }}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Task Info */}
          <div className="p-3 rounded-lg" style={{ backgroundColor: 'var(--color-surface)' }}>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-lg">{task.categoryIcon}</span>
              <span className="font-medium" style={{ color: 'var(--color-textPrimary)' }}>
                {task.text}
              </span>
            </div>
            <span className="text-xs" style={{ color: 'var(--color-textSecondary)' }}>
              {task.category}
            </span>
          </div>

          {/* Date Input */}
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: 'var(--color-textPrimary)' }}>
              Date
            </label>
            <input
              type="date"
              value={scheduledDate}
              onChange={(e) => setScheduledDate(e.target.value)}
              required
              className="w-full px-4 py-2 rounded-xl text-sm focus:outline-none focus:ring-2"
              style={{
                backgroundColor: 'var(--color-inputBg)',
                borderColor: 'var(--color-border)',
                color: 'var(--color-textPrimary)',
                border: '1px solid'
              }}
            />
          </div>

          {/* Time Input */}
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: 'var(--color-textPrimary)' }}>
              Time
            </label>
            <input
              type="time"
              value={scheduledTime}
              onChange={(e) => setScheduledTime(e.target.value)}
              required
              className="w-full px-4 py-2 rounded-xl text-sm focus:outline-none focus:ring-2"
              style={{
                backgroundColor: 'var(--color-inputBg)',
                borderColor: 'var(--color-border)',
                color: 'var(--color-textPrimary)',
                border: '1px solid'
              }}
            />
          </div>

          {/* Duration */}
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: 'var(--color-textPrimary)' }}>
              Duration (minutes)
            </label>
            <input
              type="number"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              min="15"
              max="480"
              step="15"
              className="w-full px-4 py-2 rounded-xl text-sm focus:outline-none focus:ring-2"
              style={{
                backgroundColor: 'var(--color-inputBg)',
                borderColor: 'var(--color-border)',
                color: 'var(--color-textPrimary)',
                border: '1px solid'
              }}
            />
          </div>

          {/* Pomodoro Estimate */}
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: 'var(--color-textPrimary)' }}>
              Estimated Pomodoros
            </label>
            <input
              type="number"
              value={pomodoroEstimate}
              onChange={(e) => setPomodoroEstimate(e.target.value)}
              min="0"
              max="20"
              className="w-full px-4 py-2 rounded-xl text-sm focus:outline-none focus:ring-2"
              style={{
                backgroundColor: 'var(--color-inputBg)',
                borderColor: 'var(--color-border)',
                color: 'var(--color-textPrimary)',
                border: '1px solid'
              }}
            />
          </div>

          {/* Notes */}
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: 'var(--color-textPrimary)' }}>
              Notes (optional)
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows="3"
              placeholder="Add any notes about this task..."
              className="w-full px-4 py-2 rounded-xl text-sm focus:outline-none focus:ring-2 resize-none"
              style={{
                backgroundColor: 'var(--color-inputBg)',
                borderColor: 'var(--color-border)',
                color: 'var(--color-textPrimary)',
                border: '1px solid'
              }}
            />
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              className="flex-1 px-4 py-2 rounded-xl font-medium text-sm text-white transition-all"
              style={{
                background: 'linear-gradient(to right, var(--color-primary), var(--color-secondary))'
              }}
            >
              Schedule
            </button>
            {(task.scheduledDate || task.scheduledTime) && (
              <button
                type="button"
                onClick={handleClearSchedule}
                className="px-4 py-2 rounded-xl font-medium text-sm transition-all"
                style={{
                  backgroundColor: 'var(--color-surface)',
                  color: 'var(--color-textSecondary)'
                }}
              >
                Clear
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl font-medium text-sm transition-all"
              style={{
                backgroundColor: 'var(--color-surface)',
                color: 'var(--color-textSecondary)'
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ScheduleTaskModal;
