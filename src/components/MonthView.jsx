const MonthView = ({ currentDate, tasks, setTasks, onTaskClick }) => {
  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    return { daysInMonth, startingDayOfWeek, year, month };
  };

  const { daysInMonth, startingDayOfWeek, year, month } = getDaysInMonth(currentDate);

  const getTasksForDate = (day) => {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return tasks.filter(task => {
      // Handle both exact matches and tasks without time
      return task.scheduledDate === dateStr;
    });
  };

  const isToday = (day) => {
    const today = new Date();
    return today.getDate() === day &&
           today.getMonth() === month &&
           today.getFullYear() === year;
  };

  const handleDragStart = (e, task) => {
    e.dataTransfer.setData('taskId', task.id.toString());
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e, day) => {
    e.preventDefault();
    const taskId = parseInt(e.dataTransfer.getData('taskId'));
    const task = tasks.find(t => t.id === taskId);

    if (task) {
      const newDateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      setTasks(tasks.map(t =>
        t.id === taskId
          ? { ...t, scheduledDate: newDateStr }
          : t
      ));
    }
  };

  const renderCalendarDays = () => {
    const days = [];
    const totalCells = Math.ceil((daysInMonth + startingDayOfWeek) / 7) * 7;

    for (let i = 0; i < totalCells; i++) {
      const day = i - startingDayOfWeek + 1;
      const isValidDay = day > 0 && day <= daysInMonth;
      const dayTasks = isValidDay ? getTasksForDate(day) : [];

      days.push(
        <div
          key={i}
          className="min-h-24 p-2 border transition-all"
          style={{
            backgroundColor: isValidDay ? (isToday(day) ? 'var(--color-primary)10' : 'var(--color-surface)') : 'transparent',
            borderColor: 'var(--color-border)',
            opacity: isValidDay ? 1 : 0.3
          }}
          onDragOver={isValidDay ? handleDragOver : undefined}
          onDrop={isValidDay ? (e) => handleDrop(e, day) : undefined}
        >
          {isValidDay && (
            <>
              <div className="flex items-center justify-between mb-1">
                <span
                  className="text-sm font-semibold"
                  style={{
                    color: isToday(day) ? 'var(--color-primary)' : 'var(--color-textPrimary)'
                  }}
                >
                  {day}
                </span>
                {isToday(day) && (
                  <span className="text-xs px-2 py-0.5 rounded-full" style={{
                    backgroundColor: 'var(--color-primary)',
                    color: '#ffffff'
                  }}>
                    Today
                  </span>
                )}
              </div>

              {/* Task indicators */}
              <div className="space-y-1">
                {dayTasks.slice(0, 3).map((task) => (
                  <div
                    key={task.id}
                    draggable={!task.completed}
                    onDragStart={(e) => handleDragStart(e, task)}
                    onClick={() => onTaskClick && onTaskClick(task)}
                    className="text-xs px-2 py-1 rounded truncate cursor-pointer hover:opacity-90 transition-opacity"
                    style={{
                      backgroundColor: task.categoryColor || 'var(--color-primary)',
                      color: '#ffffff',
                      opacity: task.completed ? 0.5 : 1,
                      cursor: task.completed ? 'pointer' : 'move'
                    }}
                    title={task.text}
                  >
                    {task.text}
                  </div>
                ))}
                {dayTasks.length > 3 && (
                  <div className="text-xs px-2 py-1" style={{ color: 'var(--color-textSecondary)' }}>
                    +{dayTasks.length - 3} more
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      );
    }

    return days;
  };

  return (
    <div>
      {/* Day headers */}
      <div className="grid grid-cols-7 gap-0 mb-2">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <div
            key={day}
            className="text-center text-sm font-semibold py-2"
            style={{ color: 'var(--color-textSecondary)' }}
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-0 border rounded-xl overflow-hidden" style={{
        borderColor: 'var(--color-border)'
      }}>
        {renderCalendarDays()}
      </div>
    </div>
  );
};

export default MonthView;
