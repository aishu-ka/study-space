import { useState, useEffect, useRef } from 'react';
import Confetti from './Confetti';
import ScheduleTaskModal from './ScheduleTaskModal';

const CATEGORIES = {
  general: { name: 'General', color: '#6b7280', icon: '📋' },
  work: { name: 'Work', color: '#ef4444', icon: '💼' },
  study: { name: 'Study', color: '#3b82f6', icon: '📚' },
  personal: { name: 'Personal', color: '#10b981', icon: '🏠' },
  health: { name: 'Health', color: '#ec4899', icon: '💪' },
  creative: { name: 'Creative', color: '#8b5cf6', icon: '🎨' },
};

const TodoList = ({ tasks, setTasks, selectedTaskId, onTaskSelect, currentSession }) => {
  const [newTaskText, setNewTaskText] = useState('');
  const [newTaskCategory, setNewTaskCategory] = useState('general');
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState('');
  const [filter, setFilter] = useState('active'); // active, completed, all
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [confetti, setConfetti] = useState(null);
  const [glowingTaskId, setGlowingTaskId] = useState(null);
  const [draggedTaskId, setDraggedTaskId] = useState(null);
  const [dragOverTaskId, setDragOverTaskId] = useState(null);
  const [schedulingTask, setSchedulingTask] = useState(null);
  const previousPomodoroCountsRef = useRef({});

  // Track pomodoro count changes for glow effect
  useEffect(() => {
    tasks.forEach(task => {
      const previousCount = previousPomodoroCountsRef.current[task.id] || 0;
      const currentCount = task.pomodoroCount || 0;

      if (currentCount > previousCount) {
        // Pomodoro count increased, trigger glow
        setGlowingTaskId(task.id);
        setTimeout(() => setGlowingTaskId(null), 1000);
      }

      previousPomodoroCountsRef.current[task.id] = currentCount;
    });
  }, [tasks]);

  const addTask = (e) => {
    e.preventDefault();
    if (newTaskText.trim() === '') return;

    const newTask = {
      id: Date.now(),
      text: newTaskText.trim(),
      completed: false,
      createdAt: new Date().toISOString(),
      pomodoroCount: 0,
      category: newTaskCategory,
      // Scheduling fields
      scheduledDate: null,
      scheduledTime: null,
      duration: 60, // Default 60 minutes
      pomodoroEstimate: 0,
      notes: '',
      categoryColor: CATEGORIES[newTaskCategory]?.color || '#6b7280',
      categoryIcon: CATEGORIES[newTaskCategory]?.icon || '📋'
    };

    setTasks([...tasks, newTask]);
    setNewTaskText('');
    setNewTaskCategory('general');
  };

  const toggleComplete = (id, event) => {
    const task = tasks.find(t => t.id === id);

    // Trigger confetti when completing a task
    if (task && !task.completed && event) {
      const rect = event.target.getBoundingClientRect();
      setConfetti({
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
      });
    }

    setTasks(tasks.map(task =>
      task.id === id
        ? {
            ...task,
            completed: !task.completed,
            completedAt: !task.completed ? new Date().toISOString() : null
          }
        : task
    ));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
    if (selectedTaskId === id) {
      setSelectedTaskId(null);
      onTaskSelect?.(null);
    }
  };

  const startEditing = (task) => {
    setEditingId(task.id);
    setEditText(task.text);
  };

  const saveEdit = (id) => {
    if (editText.trim() === '') {
      deleteTask(id);
      return;
    }

    setTasks(tasks.map(task =>
      task.id === id ? { ...task, text: editText.trim() } : task
    ));
    setEditingId(null);
    setEditText('');
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditText('');
  };

  const selectTask = (taskId) => {
    onTaskSelect(taskId === selectedTaskId ? null : taskId);
  };

  const handleScheduleTask = (taskId, scheduleData) => {
    setTasks(tasks.map(task =>
      task.id === taskId
        ? { ...task, ...scheduleData }
        : task
    ));
  };

  // Drag and drop handlers
  const handleDragStart = (e, taskId) => {
    setDraggedTaskId(taskId);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e, taskId) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setDragOverTaskId(taskId);
  };

  const handleDragLeave = () => {
    setDragOverTaskId(null);
  };

  const handleDrop = (e, dropTaskId) => {
    e.preventDefault();

    if (!draggedTaskId || draggedTaskId === dropTaskId) {
      setDraggedTaskId(null);
      setDragOverTaskId(null);
      return;
    }

    const draggedIndex = tasks.findIndex(t => t.id === draggedTaskId);
    const dropIndex = tasks.findIndex(t => t.id === dropTaskId);

    if (draggedIndex === -1 || dropIndex === -1) return;

    const newTasks = [...tasks];
    const [draggedTask] = newTasks.splice(draggedIndex, 1);
    newTasks.splice(dropIndex, 0, draggedTask);

    setTasks(newTasks);
    setDraggedTaskId(null);
    setDragOverTaskId(null);
  };

  const handleDragEnd = () => {
    setDraggedTaskId(null);
    setDragOverTaskId(null);
  };

  const filteredTasks = tasks.filter(task => {
    // Filter by completion status
    let statusMatch = true;
    if (filter === 'active') statusMatch = !task.completed;
    if (filter === 'completed') statusMatch = task.completed;

    // Filter by category
    const categoryMatch = categoryFilter === 'all' || task.category === categoryFilter;

    return statusMatch && categoryMatch;
  });

  const stats = {
    total: tasks.length,
    active: tasks.filter(t => !t.completed).length,
    completed: tasks.filter(t => t.completed).length
  };

  return (
    <div className="w-full max-w-md">
      <div
        className="backdrop-blur-md rounded-2xl p-6 shadow-lg border"
        style={{
          backgroundColor: 'var(--color-cardBg)',
          borderColor: 'var(--color-border)'
        }}
      >
        {/* Header */}
        <div className="mb-4">
          <h2 className="text-xl font-bold mb-2" style={{ color: 'var(--color-textPrimary)' }}>
            Tasks
          </h2>
          <div className="flex gap-2 text-xs" style={{ color: 'var(--color-textSecondary)' }}>
            <span>{stats.active} active</span>
            <span>•</span>
            <span>{stats.completed} completed</span>
          </div>
        </div>

        {/* Add Task Form */}
        <form onSubmit={addTask} className="mb-4">
          <div className="flex gap-2">
            <div className="flex-1 flex flex-col gap-2">
              <input
                type="text"
                value={newTaskText}
                onChange={(e) => setNewTaskText(e.target.value)}
                placeholder="Add a new task..."
                className="w-full px-4 py-2 rounded-xl text-sm focus:outline-none focus:ring-2"
                style={{
                  backgroundColor: 'var(--color-inputBg)',
                  borderColor: 'var(--color-border)',
                  color: 'var(--color-textPrimary)',
                  border: '1px solid'
                }}
              />
              {/* Category Dropdown */}
              <select
                value={newTaskCategory}
                onChange={(e) => setNewTaskCategory(e.target.value)}
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
            <button
              type="submit"
              className="px-4 py-2 rounded-xl font-medium text-sm text-white transition-all self-start"
              style={{
                background: 'linear-gradient(to right, var(--color-primary), var(--color-secondary))'
              }}
            >
              Add
            </button>
          </div>
        </form>

        {/* Filter Tabs */}
        <div className="mb-4 space-y-3">
          {/* Status Filter */}
          <div className="flex gap-2">
            {['active', 'completed', 'all'].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className="px-4 py-2 rounded-lg text-xs font-medium transition-all capitalize"
                style={{
                  backgroundColor: filter === f ? 'var(--color-primary)' : 'var(--color-surface)',
                  color: filter === f ? '#ffffff' : 'var(--color-textSecondary)'
                }}
              >
                {f}
              </button>
            ))}
          </div>

          {/* Category Filter */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium" style={{ color: 'var(--color-textSecondary)' }}>
              Category:
            </span>
            <div className="flex gap-2 flex-wrap">
              <button
                onClick={() => setCategoryFilter('all')}
                className="px-3 py-1.5 rounded-lg text-sm transition-all hover:scale-105"
                style={{
                  backgroundColor: categoryFilter === 'all' ? 'var(--color-primary)' : 'var(--color-surface)',
                  color: categoryFilter === 'all' ? '#ffffff' : 'var(--color-textSecondary)'
                }}
                title="All Categories"
              >
                All
              </button>
              {Object.entries(CATEGORIES).map(([key, cat]) => (
                <button
                  key={key}
                  onClick={() => setCategoryFilter(key)}
                  className="w-8 h-8 rounded-lg text-base transition-all hover:scale-110 flex items-center justify-center"
                  style={{
                    backgroundColor: categoryFilter === key ? cat.color : 'var(--color-surface)',
                    border: `2px solid ${categoryFilter === key ? cat.color : 'var(--color-border)'}`,
                    transform: categoryFilter === key ? 'scale(1.1)' : 'scale(1)'
                  }}
                  title={cat.name}
                >
                  {cat.icon}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Task List */}
        <div className="space-y-2 max-h-96 overflow-y-auto">
          {filteredTasks.length === 0 ? (
            <div className="text-center py-8" style={{ color: 'var(--color-textSecondary)' }}>
              <p className="text-sm">
                {filter === 'active' && 'No active tasks'}
                {filter === 'completed' && 'No completed tasks'}
                {filter === 'all' && 'No tasks yet'}
              </p>
            </div>
          ) : (
            filteredTasks.map((task, index) => (
              <div
                key={task.id}
                draggable={!task.completed && !editingId}
                onDragStart={(e) => handleDragStart(e, task.id)}
                onDragOver={(e) => handleDragOver(e, task.id)}
                onDragLeave={handleDragLeave}
                onDrop={(e) => handleDrop(e, task.id)}
                onDragEnd={handleDragEnd}
                className={`flex items-center gap-3 p-3 rounded-xl transition-all duration-300 hover:scale-[1.02] ${
                  selectedTaskId === task.id ? 'ring-2' : ''
                } ${draggedTaskId === task.id ? 'opacity-50' : ''} ${
                  dragOverTaskId === task.id && draggedTaskId !== task.id ? 'scale-105 ring-2' : ''
                } ${!task.completed && !editingId ? 'cursor-move' : ''}`}
                style={{
                  backgroundColor: 'var(--color-surface)',
                  animation: 'slideIn 0.3s ease-out',
                  animationDelay: `${index * 0.05}s`,
                  animationFillMode: 'backwards',
                  ...(selectedTaskId === task.id && {
                    ringColor: 'var(--color-primary)'
                  }),
                  ...(dragOverTaskId === task.id && draggedTaskId !== task.id && {
                    ringColor: 'var(--color-secondary)',
                    borderColor: 'var(--color-secondary)'
                  })
                }}
              >
                {/* Checkbox */}
                <button
                  onClick={(e) => toggleComplete(task.id, e)}
                  className="flex-shrink-0 w-5 h-5 rounded border-2 flex items-center justify-center transition-all duration-300 hover:scale-110"
                  style={{
                    borderColor: task.completed ? 'var(--color-primary)' : 'var(--color-border)',
                    backgroundColor: task.completed ? 'var(--color-primary)' : 'transparent',
                    transform: task.completed ? 'scale(1.1)' : 'scale(1)'
                  }}
                >
                  {task.completed && (
                    <svg
                      className="w-3 h-3 text-white animate-checkmark"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      style={{
                        animation: 'checkmark 0.3s ease-in-out'
                      }}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </button>

                {/* Task Text */}
                {editingId === task.id ? (
                  <input
                    type="text"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    onBlur={() => saveEdit(task.id)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') saveEdit(task.id);
                      if (e.key === 'Escape') cancelEdit();
                    }}
                    autoFocus
                    className="flex-1 px-2 py-1 rounded text-sm focus:outline-none"
                    style={{
                      backgroundColor: 'var(--color-inputBg)',
                      color: 'var(--color-textPrimary)'
                    }}
                  />
                ) : (
                  <div className="flex-1 flex items-center gap-3">
                    {/* Category Badge - Icon Only */}
                    {task.category && CATEGORIES[task.category] && (
                      <span
                        className="text-lg flex-shrink-0"
                        title={CATEGORIES[task.category].name}
                      >
                        {CATEGORIES[task.category].icon}
                      </span>
                    )}
                    <div className="flex-1">
                      <span
                        className={`text-sm ${task.completed ? 'line-through' : ''}`}
                        style={{
                          color: task.completed ? 'var(--color-textSecondary)' : 'var(--color-textPrimary)'
                        }}
                        onDoubleClick={() => !task.completed && startEditing(task)}
                      >
                        {task.text}
                      </span>
                    </div>
                    {task.pomodoroCount > 0 && (
                      <span
                        className="text-xs px-2 py-0.5 rounded-full transition-all duration-300"
                        style={{
                          backgroundColor: 'var(--color-primary)',
                          color: '#ffffff',
                          boxShadow: glowingTaskId === task.id
                            ? '0 0 20px var(--color-primary), 0 0 40px var(--color-primary)'
                            : 'none',
                          animation: glowingTaskId === task.id ? 'badgePop 0.5s ease-out' : 'none'
                        }}
                      >
                        {task.pomodoroCount} 🍅
                      </span>
                    )}
                  </div>
                )}

                {/* Actions */}
                <div className="flex gap-1 flex-shrink-0">
                  {!task.completed && (
                    <>
                      <button
                        onClick={() => selectTask(task.id)}
                        className="p-1 rounded transition-all duration-300 hover:scale-110 hover:bg-opacity-10"
                        style={{
                          color: selectedTaskId === task.id ? 'var(--color-primary)' : 'var(--color-textSecondary)',
                          animation: selectedTaskId === task.id ? 'pulse 2s infinite' : 'none',
                          backgroundColor: selectedTaskId === task.id ? 'rgba(239, 68, 68, 0.1)' : 'transparent'
                        }}
                        title="Link to current session"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                            d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                          />
                        </svg>
                      </button>
                      <button
                        onClick={() => setSchedulingTask(task)}
                        className="p-1 rounded transition-all duration-300 hover:scale-110 hover:bg-opacity-10"
                        style={{
                          color: task.scheduledDate ? 'var(--color-primary)' : 'var(--color-textSecondary)'
                        }}
                        title={task.scheduledDate ? `Scheduled for ${task.scheduledDate} ${task.scheduledTime}` : "Schedule this task"}
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </button>
                    </>
                  )}
                  <button
                    onClick={() => deleteTask(task.id)}
                    className="p-1 rounded transition-all duration-300 hover:scale-110 hover:text-red-500"
                    style={{ color: 'var(--color-textSecondary)' }}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Confetti Effect */}
      {confetti && (
        <Confetti
          x={confetti.x}
          y={confetti.y}
          onComplete={() => setConfetti(null)}
        />
      )}

      {/* Schedule Task Modal */}
      <ScheduleTaskModal
        isOpen={!!schedulingTask}
        onClose={() => setSchedulingTask(null)}
        task={schedulingTask}
        onSchedule={(scheduleData) => {
          if (schedulingTask) {
            handleScheduleTask(schedulingTask.id, scheduleData);
          }
        }}
      />
    </div>
  );
};

export default TodoList;
