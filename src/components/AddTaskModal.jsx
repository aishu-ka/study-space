import { useState, useEffect } from 'react';

const CATEGORIES = {
  general: { name: 'General', color: '#6b7280', icon: '📋' },
  work: { name: 'Work', color: '#ef4444', icon: '💼' },
  study: { name: 'Study', color: '#3b82f6', icon: '📚' },
  personal: { name: 'Personal', color: '#10b981', icon: '🏠' },
  health: { name: 'Health', color: '#ec4899', icon: '💪' },
  creative: { name: 'Creative', color: '#8b5cf6', icon: '🎨' },
};

const AddTaskModal = ({ isOpen, onClose, onAddTask, defaultDate = '', defaultTime = '' }) => {
  const [taskText, setTaskText] = useState('');
  const [category, setCategory] = useState('general');
  const [scheduledDate, setScheduledDate] = useState(defaultDate);
  const [scheduledTime, setScheduledTime] = useState(defaultTime);
  const [duration, setDuration] = useState(60);
  const [pomodoroEstimate, setPomodoroEstimate] = useState(0);
  const [notes, setNotes] = useState('');

  // Update scheduledDate when modal opens with new defaultDate
  useEffect(() => {
    if (isOpen) {
      setScheduledDate(defaultDate);
      setScheduledTime(defaultTime);
    }
  }, [isOpen, defaultDate, defaultTime]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (taskText.trim() === '') {
      alert('Please enter a task name');
      return;
    }

    const newTask = {
      id: Date.now(),
      text: taskText.trim(),
      completed: false,
      createdAt: new Date().toISOString(),
      pomodoroCount: 0,
      category,
      scheduledDate: scheduledDate || null,
      scheduledTime: scheduledTime || null,
      duration: parseInt(duration),
      pomodoroEstimate: parseInt(pomodoroEstimate),
      notes,
      categoryColor: CATEGORIES[category]?.color || '#6b7280',
      categoryIcon: CATEGORIES[category]?.icon || '📋'
    };

    onAddTask(newTask);

    // Reset form
    setTaskText('');
    setCategory('general');
    setScheduledDate(defaultDate);
    setScheduledTime(defaultTime);
    setDuration(60);
    setPomodoroEstimate(0);
    setNotes('');

    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[60] p-4">
      <div
        className="rounded-2xl shadow-2xl w-full max-w-md transform transition-all"
        style={{ backgroundColor: 'var(--color-modalBg)' }}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 pb-4 border-b" style={{ borderColor: 'var(--color-border)' }}>
          <h3 className="text-xl font-bold" style={{ color: 'var(--color-textPrimary)' }}>
            Add New Task
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
          {/* Task Name */}
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: 'var(--color-textPrimary)' }}>
              Task Name *
            </label>
            <input
              type="text"
              value={taskText}
              onChange={(e) => setTaskText(e.target.value)}
              placeholder="What do you need to do?"
              required
              autoFocus
              className="w-full px-4 py-2 rounded-xl text-sm focus:outline-none focus:ring-2"
              style={{
                backgroundColor: 'var(--color-inputBg)',
                borderColor: 'var(--color-border)',
                color: 'var(--color-textPrimary)',
                border: '1px solid'
              }}
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: 'var(--color-textPrimary)' }}>
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-2 rounded-xl text-sm focus:outline-none focus:ring-2"
              style={{
                backgroundColor: 'var(--color-inputBg)',
                borderColor: 'var(--color-border)',
                color: 'var(--color-textPrimary)',
                border: '1px solid'
              }}
            >
              {Object.entries(CATEGORIES).map(([key, cat]) => (
                <option key={key} value={key}>
                  {cat.icon} {cat.name}
                </option>
              ))}
            </select>
          </div>

          {/* Date and Time */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: 'var(--color-textPrimary)' }}>
                Date
              </label>
              <input
                type="date"
                value={scheduledDate}
                onChange={(e) => setScheduledDate(e.target.value)}
                className="w-full px-4 py-2 rounded-xl text-sm focus:outline-none focus:ring-2"
                style={{
                  backgroundColor: 'var(--color-inputBg)',
                  borderColor: 'var(--color-border)',
                  color: 'var(--color-textPrimary)',
                  border: '1px solid'
                }}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: 'var(--color-textPrimary)' }}>
                Time
              </label>
              <input
                type="time"
                value={scheduledTime}
                onChange={(e) => setScheduledTime(e.target.value)}
                className="w-full px-4 py-2 rounded-xl text-sm focus:outline-none focus:ring-2"
                style={{
                  backgroundColor: 'var(--color-inputBg)',
                  borderColor: 'var(--color-border)',
                  color: 'var(--color-textPrimary)',
                  border: '1px solid'
                }}
              />
            </div>
          </div>

          {/* Duration and Pomodoro Estimate */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: 'var(--color-textPrimary)' }}>
                Duration (min)
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
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: 'var(--color-textPrimary)' }}>
                Pomodoros
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
              className="flex-1 px-4 py-2 rounded-xl font-medium text-sm text-white transition-all hover:opacity-90"
              style={{
                background: 'linear-gradient(to right, var(--color-primary), var(--color-secondary))'
              }}
            >
              Add Task
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl font-medium text-sm transition-all hover:opacity-80"
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

export default AddTaskModal;
