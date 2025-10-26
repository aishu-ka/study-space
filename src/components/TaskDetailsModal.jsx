import { useState, useEffect } from 'react';

const CATEGORIES = {
  general: { name: 'General', color: '#6b7280', icon: '📋' },
  work: { name: 'Work', color: '#ef4444', icon: '💼' },
  study: { name: 'Study', color: '#3b82f6', icon: '📚' },
  personal: { name: 'Personal', color: '#10b981', icon: '🏠' },
  health: { name: 'Health', color: '#ec4899', icon: '💪' },
  creative: { name: 'Creative', color: '#8b5cf6', icon: '🎨' },
};

const TaskDetailsModal = ({ isOpen, onClose, task, onUpdateTask, onDeleteTask }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [taskText, setTaskText] = useState('');
  const [category, setCategory] = useState('general');
  const [scheduledDate, setScheduledDate] = useState('');
  const [scheduledTime, setScheduledTime] = useState('');
  const [duration, setDuration] = useState(60);
  const [pomodoroEstimate, setPomodoroEstimate] = useState(0);
  const [notes, setNotes] = useState('');

  useEffect(() => {
    if (isOpen && task) {
      setTaskText(task.text || '');
      setCategory(task.category || 'general');
      setScheduledDate(task.scheduledDate || '');
      setScheduledTime(task.scheduledTime || '');
      setDuration(task.duration || 60);
      setPomodoroEstimate(task.pomodoroEstimate || 0);
      setNotes(task.notes || '');
      setIsEditing(false);
    }
  }, [isOpen, task]);

  const handleSave = () => {
    if (taskText.trim() === '') {
      alert('Please enter a task name');
      return;
    }

    const updatedTask = {
      ...task,
      text: taskText.trim(),
      category,
      scheduledDate: scheduledDate || null,
      scheduledTime: scheduledTime || null,
      duration: parseInt(duration),
      pomodoroEstimate: parseInt(pomodoroEstimate),
      notes,
      categoryColor: CATEGORIES[category]?.color || '#6b7280',
      categoryIcon: CATEGORIES[category]?.icon || '📋'
    };

    onUpdateTask(updatedTask);
    setIsEditing(false);
    onClose();
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      onDeleteTask(task.id);
      onClose();
    }
  };

  const toggleCompleted = () => {
    const updatedTask = {
      ...task,
      completed: !task.completed
    };
    onUpdateTask(updatedTask);
    // Close modal to show updated state in calendar
    setTimeout(() => {
      onClose();
    }, 300);
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
            {isEditing ? 'Edit Task' : 'Task Details'}
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

        {/* Content */}
        <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
          {isEditing ? (
            <>
              {/* Edit Mode */}
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: 'var(--color-textPrimary)' }}>
                  Task Name *
                </label>
                <input
                  type="text"
                  value={taskText}
                  onChange={(e) => setTaskText(e.target.value)}
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

              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: 'var(--color-textPrimary)' }}>
                  Notes
                </label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows="3"
                  className="w-full px-4 py-2 rounded-xl text-sm focus:outline-none focus:ring-2 resize-none"
                  style={{
                    backgroundColor: 'var(--color-inputBg)',
                    borderColor: 'var(--color-border)',
                    color: 'var(--color-textPrimary)',
                    border: '1px solid'
                  }}
                />
              </div>
            </>
          ) : (
            <>
              {/* View Mode */}
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <h4 className="text-lg font-bold" style={{ color: 'var(--color-textPrimary)' }}>
                    {task.text}
                  </h4>
                  <span
                    className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium"
                    style={{
                      backgroundColor: task.categoryColor || CATEGORIES[task.category]?.color || '#6b7280',
                      color: '#ffffff'
                    }}
                  >
                    {task.categoryIcon || CATEGORIES[task.category]?.icon || '📋'} {CATEGORIES[task.category]?.name || task.category}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-xs font-medium mb-1" style={{ color: 'var(--color-textSecondary)' }}>
                      Date
                    </div>
                    <div className="text-sm" style={{ color: 'var(--color-textPrimary)' }}>
                      {task.scheduledDate ? new Date(task.scheduledDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'Not scheduled'}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs font-medium mb-1" style={{ color: 'var(--color-textSecondary)' }}>
                      Time
                    </div>
                    <div className="text-sm" style={{ color: 'var(--color-textPrimary)' }}>
                      {task.scheduledTime || 'Not set'}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-xs font-medium mb-1" style={{ color: 'var(--color-textSecondary)' }}>
                      Duration
                    </div>
                    <div className="text-sm" style={{ color: 'var(--color-textPrimary)' }}>
                      {task.duration || 60} minutes
                    </div>
                  </div>
                  <div>
                    <div className="text-xs font-medium mb-1" style={{ color: 'var(--color-textSecondary)' }}>
                      Pomodoros
                    </div>
                    <div className="text-sm" style={{ color: 'var(--color-textPrimary)' }}>
                      {task.pomodoroEstimate || 0} sessions
                    </div>
                  </div>
                </div>

                {task.notes && (
                  <div>
                    <div className="text-xs font-medium mb-1" style={{ color: 'var(--color-textSecondary)' }}>
                      Notes
                    </div>
                    <div className="text-sm p-3 rounded-lg" style={{
                      color: 'var(--color-textPrimary)',
                      backgroundColor: 'var(--color-surface)'
                    }}>
                      {task.notes}
                    </div>
                  </div>
                )}

                <div>
                  <div className="text-xs font-medium mb-1" style={{ color: 'var(--color-textSecondary)' }}>
                    Status
                  </div>
                  <button
                    onClick={toggleCompleted}
                    className="inline-flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all"
                    style={{
                      backgroundColor: task.completed ? 'var(--color-success)' : 'var(--color-warning)',
                      color: '#ffffff'
                    }}
                  >
                    {task.completed ? '✓ Completed' : 'Mark as Complete'}
                  </button>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-3 p-6 pt-4 border-t" style={{ borderColor: 'var(--color-border)' }}>
          {isEditing ? (
            <>
              <button
                onClick={handleSave}
                className="flex-1 px-4 py-2 rounded-xl font-medium text-sm text-white transition-all hover:opacity-90"
                style={{
                  background: 'linear-gradient(to right, var(--color-primary), var(--color-secondary))'
                }}
              >
                Save Changes
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 rounded-xl font-medium text-sm transition-all hover:opacity-80"
                style={{
                  backgroundColor: 'var(--color-surface)',
                  color: 'var(--color-textSecondary)'
                }}
              >
                Cancel
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => setIsEditing(true)}
                className="flex-1 px-4 py-2 rounded-xl font-medium text-sm transition-all hover:opacity-90"
                style={{
                  backgroundColor: 'var(--color-primary)',
                  color: '#ffffff'
                }}
              >
                Edit
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 rounded-xl font-medium text-sm transition-all hover:opacity-90"
                style={{
                  backgroundColor: '#ef4444',
                  color: '#ffffff'
                }}
              >
                Delete
              </button>
              <button
                onClick={onClose}
                className="px-4 py-2 rounded-xl font-medium text-sm transition-all hover:opacity-80"
                style={{
                  backgroundColor: 'var(--color-surface)',
                  color: 'var(--color-textSecondary)'
                }}
              >
                Close
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskDetailsModal;
