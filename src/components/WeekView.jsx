const WeekView = ({ currentDate, tasks, setTasks, onTaskClick }) => {
  const getWeekDays = () => {
    const startOfWeek = new Date(currentDate);
    startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());

    const days = [];
    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek);
      day.setDate(startOfWeek.getDate() + i);
      days.push(day);
    }
    return days;
  };

  const weekDays = getWeekDays();
  const hours = Array.from({ length: 24 }, (_, i) => i); // All 24 hours (12 AM to 11 PM)

  const getTasksForDateTime = (date, hour) => {
    const dateStr = date.toISOString().split('T')[0];
    const timeStr = `${String(hour).padStart(2, '0')}:00`;

    return tasks.filter(task => {
      if (!task.scheduledDate || !task.scheduledTime) return false;
      const taskHour = parseInt(task.scheduledTime.split(':')[0]);
      return task.scheduledDate === dateStr && taskHour === hour;
    });
  };

  const isToday = (date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const handleDragStart = (e, task) => {
    e.dataTransfer.setData('taskId', task.id.toString());
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e, date, hour) => {
    e.preventDefault();
    const taskId = parseInt(e.dataTransfer.getData('taskId'));
    const task = tasks.find(t => t.id === taskId);

    if (task) {
      const dateStr = date.toISOString().split('T')[0];
      const timeStr = `${String(hour).padStart(2, '0')}:00`;
      setTasks(tasks.map(t =>
        t.id === taskId
          ? { ...t, scheduledDate: dateStr, scheduledTime: timeStr }
          : t
      ));
    }
  };

  return (
    <div className="overflow-x-auto">
      <div className="min-w-full">
        {/* Header - Days of week */}
        <div className="grid grid-cols-8 gap-0" style={{
          backgroundColor: 'var(--color-modalBg)'
        }}>
          <div className="p-2 border-b" style={{ borderColor: 'var(--color-border)' }}>
            {/* Empty corner cell */}
          </div>
          {weekDays.map((day, idx) => (
            <div
              key={idx}
              className="p-2 text-center border-b"
              style={{
                borderColor: 'var(--color-border)',
                backgroundColor: isToday(day) ? 'var(--color-primary)10' : 'transparent'
              }}
            >
              <div className="text-xs" style={{ color: 'var(--color-textSecondary)' }}>
                {day.toLocaleDateString('en-US', { weekday: 'short' })}
              </div>
              <div
                className="text-lg font-bold"
                style={{
                  color: isToday(day) ? 'var(--color-primary)' : 'var(--color-textPrimary)'
                }}
              >
                {day.getDate()}
              </div>
            </div>
          ))}
        </div>

        {/* Time slots */}
        {hours.map((hour) => (
          <div key={hour} className="grid grid-cols-8 gap-0 border-b" style={{
            borderColor: 'var(--color-border)'
          }}>
            {/* Time label */}
            <div className="p-2 text-sm font-medium text-right pr-3" style={{
              color: 'var(--color-textSecondary)',
              backgroundColor: 'var(--color-surface)'
            }}>
              {hour === 0 ? '12 AM' : hour < 12 ? `${hour} AM` : hour === 12 ? '12 PM' : `${hour - 12} PM`}
            </div>

            {/* Day columns */}
            {weekDays.map((day, dayIdx) => {
              const dayTasks = getTasksForDateTime(day, hour);
              const taskCount = dayTasks.length;

              return (
                <div
                  key={dayIdx}
                  className="min-h-16 p-1 border-l relative"
                  style={{
                    borderColor: 'var(--color-border)',
                    backgroundColor: 'var(--color-surface)'
                  }}
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, day, hour)}
                >
                  {taskCount > 0 && (
                    <div className="flex gap-1 h-full">
                      {dayTasks.map((task, taskIdx) => (
                        <div
                          key={task.id}
                          draggable={!task.completed}
                          onDragStart={(e) => handleDragStart(e, task)}
                          onClick={() => onTaskClick && onTaskClick(task)}
                          className="flex-1 p-1 rounded text-xs overflow-hidden hover:z-10 hover:scale-105 transition-all cursor-pointer"
                          style={{
                            backgroundColor: task.categoryColor || 'var(--color-primary)',
                            color: '#ffffff',
                            minWidth: taskCount > 1 ? '40px' : 'auto',
                            cursor: task.completed ? 'pointer' : 'move'
                          }}
                          title={`${task.text}\n${task.scheduledTime} - ${task.duration || 60} min`}
                        >
                          <div className="font-semibold truncate">
                            {taskCount > 1 ? task.text.substring(0, 10) + '...' : task.text}
                          </div>
                          <div className="text-xs opacity-90">
                            {task.scheduledTime}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeekView;
