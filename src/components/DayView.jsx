const DayView = ({ currentDate, tasks, setTasks, onTaskClick }) => {
  const hours = Array.from({ length: 24 }, (_, i) => i); // All 24 hours (12 AM to 11 PM)

  const dateStr = currentDate.toISOString().split('T')[0];

  const getTasksForHour = (hour) => {
    const timeStr = `${String(hour).padStart(2, '0')}:00`;

    return tasks.filter(task => {
      if (!task.scheduledDate || !task.scheduledTime) return false;
      const taskHour = parseInt(task.scheduledTime.split(':')[0]);
      return task.scheduledDate === dateStr && taskHour === hour;
    });
  };

  const handleDragStart = (e, task) => {
    e.dataTransfer.setData('taskId', task.id.toString());
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e, hour) => {
    e.preventDefault();
    const taskId = parseInt(e.dataTransfer.getData('taskId'));
    const task = tasks.find(t => t.id === taskId);

    if (task) {
      const timeStr = `${String(hour).padStart(2, '0')}:00`;
      setTasks(tasks.map(t =>
        t.id === taskId
          ? { ...t, scheduledDate: dateStr, scheduledTime: timeStr }
          : t
      ));
    }
  };

  return (
    <div className="space-y-0 relative">
      {hours.map((hour) => {
        const hourTasks = getTasksForHour(hour);
        const taskCount = hourTasks.length;

        return (
          <div
            key={hour}
            className="grid grid-cols-12 border-b"
            style={{ borderColor: 'var(--color-border)' }}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, hour)}
          >
            {/* Time label */}
            <div className="col-span-2 p-3 text-sm font-medium text-right pr-4" style={{
              color: 'var(--color-textSecondary)',
              backgroundColor: 'var(--color-surface)'
            }}>
              {hour === 0 ? '12 AM' : hour < 12 ? `${hour} AM` : hour === 12 ? '12 PM' : `${hour - 12} PM`}
            </div>

            {/* Task area */}
            <div
              className="col-span-10 min-h-20 p-2 relative"
              style={{
                backgroundColor: 'var(--color-surface)'
              }}
            >

              {taskCount > 0 && (
                <div className="flex gap-2 h-full">
                  {hourTasks.map((task) => (
                    <div
                      key={task.id}
                      draggable={!task.completed}
                      onDragStart={(e) => handleDragStart(e, task)}
                      onClick={() => onTaskClick && onTaskClick(task)}
                      className="flex-1 p-3 rounded-lg hover:shadow-lg transition-all cursor-pointer"
                      style={{
                        backgroundColor: task.categoryColor || 'var(--color-primary)',
                        color: '#ffffff',
                        minWidth: taskCount > 1 ? '120px' : 'auto',
                        maxWidth: taskCount > 1 ? `${100 / taskCount}%` : '100%',
                        cursor: task.completed ? 'pointer' : 'move'
                      }}
                      title={`${task.text}\n${task.scheduledTime}\nDuration: ${task.duration || 60} min`}
                    >
                      <div className="flex items-start justify-between mb-1">
                        <span className="font-semibold text-sm">
                          {taskCount > 1 ? (task.text.length > 15 ? task.text.substring(0, 15) + '...' : task.text) : task.text}
                        </span>
                        {task.pomodoroEstimate && (
                          <span className="text-xs opacity-90">
                            {task.pomodoroEstimate} 🍅
                          </span>
                        )}
                      </div>
                      <div className="text-xs opacity-90">
                        {task.scheduledTime} • {task.duration || 60} min
                      </div>
                      {task.notes && (
                        <div className="text-xs mt-1 opacity-75 truncate">
                          {task.notes}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        );
      })}

      {/* Current time indicator - only show for today */}
      <CurrentTimeIndicator hours={hours} currentDate={currentDate} />
    </div>
  );
};

const CurrentTimeIndicator = ({ hours, currentDate }) => {
  const now = new Date();
  const currentHour = now.getHours();
  const currentMinute = now.getMinutes();

  // Only show indicator if viewing today's date
  const today = new Date();
  const isToday = currentDate.toDateString() === today.toDateString();

  if (!isToday || currentHour < hours[0] || currentHour > hours[hours.length - 1]) {
    return null;
  }

  const hourIndex = currentHour - hours[0];
  const minutePercentage = currentMinute / 60;
  const topPosition = (hourIndex + minutePercentage) * 80; // 80px is min-h-20 * 4

  return (
    <div
      className="absolute flex items-center pointer-events-none"
      style={{
        top: `${topPosition}px`,
        left: '16.67%', // Start after the time label column (2/12 of grid)
        right: 0,
        zIndex: 5
      }}
    >
      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: 'var(--color-primary)' }} />
      <div className="flex-1 h-0.5" style={{ backgroundColor: 'var(--color-primary)' }} />
    </div>
  );
};

export default DayView;
