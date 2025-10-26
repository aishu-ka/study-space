import { useState } from 'react';
import AddTaskModal from './AddTaskModal';

const SpreadsheetView = ({ tasks, setTasks }) => {
  const [sortBy, setSortBy] = useState('date'); // 'date', 'time', 'category', 'status'
  const [sortOrder, setSortOrder] = useState('asc'); // 'asc' or 'desc'
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [isAddingTask, setIsAddingTask] = useState(false);

  // Get unique categories from tasks
  const categories = [...new Set(tasks.map(t => t.category).filter(Boolean))];

  const handleSort = (column) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortOrder('asc');
    }
  };

  const handleAddTask = (newTask) => {
    setTasks([...tasks, newTask]);
  };

  const exportToCSV = () => {
    const headers = ['Date', 'Time', 'Task', 'Category', 'Duration', 'Pomodoros', 'Status'];
    const rows = filteredAndSortedTasks.map(task => [
      task.scheduledDate || '-',
      task.scheduledTime || '-',
      task.text,
      task.category || 'General',
      `${task.duration || 60} min`,
      task.pomodoroEstimate || '-',
      task.completed ? 'Done' : 'Todo'
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `aishu-tasks-${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  // Filter and sort tasks
  const filteredAndSortedTasks = tasks
    .filter(task => {
      const categoryMatch = filterCategory === 'all' || task.category === filterCategory;
      const statusMatch = filterStatus === 'all' ||
        (filterStatus === 'completed' && task.completed) ||
        (filterStatus === 'active' && !task.completed);
      return categoryMatch && statusMatch;
    })
    .sort((a, b) => {
      let comparison = 0;

      if (sortBy === 'date') {
        const dateA = a.scheduledDate || '9999-12-31';
        const dateB = b.scheduledDate || '9999-12-31';
        comparison = dateA.localeCompare(dateB);
      } else if (sortBy === 'time') {
        const timeA = a.scheduledTime || '99:99';
        const timeB = b.scheduledTime || '99:99';
        comparison = timeA.localeCompare(timeB);
      } else if (sortBy === 'category') {
        const catA = a.category || 'zzz';
        const catB = b.category || 'zzz';
        comparison = catA.localeCompare(catB);
      } else if (sortBy === 'status') {
        comparison = (a.completed ? 1 : 0) - (b.completed ? 1 : 0);
      }

      return sortOrder === 'asc' ? comparison : -comparison;
    });

  // Separate scheduled and unscheduled tasks
  const scheduledTasks = filteredAndSortedTasks.filter(t => t.scheduledDate);
  const unscheduledTasks = filteredAndSortedTasks.filter(t => !t.scheduledDate);

  const getCategoryColor = (category) => {
    // This should match the colors from your CATEGORIES constant
    const colors = {
      general: '#6b7280',
      work: '#ef4444',
      study: '#3b82f6',
      personal: '#10b981',
      health: '#ec4899',
      creative: '#8b5cf6'
    };
    return colors[category] || '#6b7280';
  };

  const getCategoryIcon = (category) => {
    const icons = {
      general: '📋',
      work: '💼',
      study: '📚',
      personal: '🏠',
      health: '💪',
      creative: '🎨'
    };
    return icons[category] || '📋';
  };

  const SortIcon = ({ column }) => {
    if (sortBy !== column) {
      return <span className="text-xs opacity-30">⇅</span>;
    }
    return <span className="text-xs">{sortOrder === 'asc' ? '↑' : '↓'}</span>;
  };

  return (
    <div className="space-y-4">
      {/* Filters and Export */}
      <div className="flex items-center justify-between gap-4 p-4 rounded-xl" style={{
        backgroundColor: 'var(--color-surface)',
        borderColor: 'var(--color-border)'
      }}>
        <div className="flex items-center gap-3">
          {/* Add Task Button */}
          <button
            onClick={() => setIsAddingTask(true)}
            className="p-2 rounded-xl transition-all hover:scale-105 shadow-md"
            style={{
              background: 'linear-gradient(to right, var(--color-primary), var(--color-secondary))',
              color: '#ffffff'
            }}
            title="Add new task"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </button>

          {/* Divider */}
          <div className="h-8 w-px" style={{ backgroundColor: 'var(--color-border)' }}></div>
          {/* Category Filter */}
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="px-3 py-2 rounded-lg text-sm"
            style={{
              backgroundColor: 'var(--color-inputBg)',
              borderColor: 'var(--color-border)',
              color: 'var(--color-textPrimary)',
              border: '1px solid'
            }}
          >
            <option value="all">All Categories</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{getCategoryIcon(cat)} {cat}</option>
            ))}
          </select>

          {/* Status Filter */}
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-2 rounded-lg text-sm"
            style={{
              backgroundColor: 'var(--color-inputBg)',
              borderColor: 'var(--color-border)',
              color: 'var(--color-textPrimary)',
              border: '1px solid'
            }}
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        {/* Export Button */}
        <button
          onClick={exportToCSV}
          className="px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2"
          style={{
            backgroundColor: 'var(--color-primary)',
            color: '#ffffff'
          }}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          Export CSV
        </button>
      </div>

      {/* Scheduled Tasks Table */}
      <div className="rounded-xl border overflow-hidden" style={{ borderColor: 'var(--color-border)' }}>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr style={{ backgroundColor: 'var(--color-surface)' }}>
                <th
                  className="px-4 py-3 text-left text-sm font-semibold cursor-pointer hover:bg-opacity-80"
                  onClick={() => handleSort('date')}
                  style={{ color: 'var(--color-textPrimary)' }}
                >
                  <div className="flex items-center gap-2">
                    Date <SortIcon column="date" />
                  </div>
                </th>
                <th
                  className="px-4 py-3 text-left text-sm font-semibold cursor-pointer hover:bg-opacity-80"
                  onClick={() => handleSort('time')}
                  style={{ color: 'var(--color-textPrimary)' }}
                >
                  <div className="flex items-center gap-2">
                    Time <SortIcon column="time" />
                  </div>
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold" style={{ color: 'var(--color-textPrimary)' }}>
                  Task
                </th>
                <th
                  className="px-4 py-3 text-left text-sm font-semibold cursor-pointer hover:bg-opacity-80"
                  onClick={() => handleSort('category')}
                  style={{ color: 'var(--color-textPrimary)' }}
                >
                  <div className="flex items-center gap-2">
                    Category <SortIcon column="category" />
                  </div>
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold" style={{ color: 'var(--color-textPrimary)' }}>
                  Duration
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold" style={{ color: 'var(--color-textPrimary)' }}>
                  Pomodoros
                </th>
                <th
                  className="px-4 py-3 text-left text-sm font-semibold cursor-pointer hover:bg-opacity-80"
                  onClick={() => handleSort('status')}
                  style={{ color: 'var(--color-textPrimary)' }}
                >
                  <div className="flex items-center gap-2">
                    Status <SortIcon column="status" />
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {scheduledTasks.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-4 py-8 text-center text-sm" style={{ color: 'var(--color-textSecondary)' }}>
                    No scheduled tasks
                  </td>
                </tr>
              ) : (
                scheduledTasks.map((task, idx) => (
                  <tr
                    key={task.id}
                    className="border-t hover:bg-opacity-50 transition-colors"
                    style={{
                      borderColor: 'var(--color-border)',
                      backgroundColor: `${getCategoryColor(task.category)}15`
                    }}
                  >
                    <td className="px-4 py-3 text-sm" style={{ color: 'var(--color-textPrimary)' }}>
                      {new Date(task.scheduledDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </td>
                    <td className="px-4 py-3 text-sm" style={{ color: 'var(--color-textPrimary)' }}>
                      {task.scheduledTime}
                    </td>
                    <td className="px-4 py-3 text-sm font-medium" style={{ color: 'var(--color-textPrimary)' }}>
                      {task.text}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium"
                        style={{
                          backgroundColor: getCategoryColor(task.category),
                          color: '#ffffff'
                        }}
                      >
                        {getCategoryIcon(task.category)} {task.category}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm" style={{ color: 'var(--color-textPrimary)' }}>
                      {task.duration || 60} min
                    </td>
                    <td className="px-4 py-3 text-sm" style={{ color: 'var(--color-textPrimary)' }}>
                      {task.pomodoroEstimate || '-'}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className="inline-flex px-2 py-1 rounded-full text-xs font-medium"
                        style={{
                          backgroundColor: task.completed ? 'var(--color-success)' : 'var(--color-warning)',
                          color: '#ffffff'
                        }}
                      >
                        {task.completed ? '✓ Done' : 'Todo'}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Unscheduled Tasks Section */}
      {unscheduledTasks.length > 0 && (
        <div className="rounded-xl border overflow-hidden" style={{ borderColor: 'var(--color-border)' }}>
          <div className="px-4 py-3 font-semibold" style={{
            backgroundColor: 'var(--color-surface)',
            color: 'var(--color-textPrimary)'
          }}>
            Unscheduled Tasks
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <tbody>
                {unscheduledTasks.map((task) => (
                  <tr
                    key={task.id}
                    className="border-t hover:bg-opacity-50 transition-colors"
                    style={{
                      borderColor: 'var(--color-border)',
                      backgroundColor: `${getCategoryColor(task.category)}15`
                    }}
                  >
                    <td className="px-4 py-3 text-sm text-center" style={{ color: 'var(--color-textSecondary)' }}>
                      -
                    </td>
                    <td className="px-4 py-3 text-sm text-center" style={{ color: 'var(--color-textSecondary)' }}>
                      -
                    </td>
                    <td className="px-4 py-3 text-sm font-medium" style={{ color: 'var(--color-textPrimary)' }}>
                      {task.text}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium"
                        style={{
                          backgroundColor: getCategoryColor(task.category),
                          color: '#ffffff'
                        }}
                      >
                        {getCategoryIcon(task.category)} {task.category}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm" style={{ color: 'var(--color-textPrimary)' }}>
                      {task.duration || 60} min
                    </td>
                    <td className="px-4 py-3 text-sm" style={{ color: 'var(--color-textPrimary)' }}>
                      {task.pomodoroEstimate || '-'}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className="inline-flex px-2 py-1 rounded-full text-xs font-medium"
                        style={{
                          backgroundColor: task.completed ? 'var(--color-success)' : 'var(--color-warning)',
                          color: '#ffffff'
                        }}
                      >
                        {task.completed ? '✓ Done' : 'Todo'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Add Task Modal */}
      <AddTaskModal
        isOpen={isAddingTask}
        onClose={() => setIsAddingTask(false)}
        onAddTask={handleAddTask}
        defaultDate={new Date().toISOString().split('T')[0]}
        defaultTime="23:59"
      />
    </div>
  );
};

export default SpreadsheetView;
