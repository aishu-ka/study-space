import { useState } from 'react';
import MonthView from './MonthView';
import WeekView from './WeekView';
import DayView from './DayView';
import ScheduleTaskModal from './ScheduleTaskModal';
import AddTaskModal from './AddTaskModal';
import TaskDetailsModal from './TaskDetailsModal';

const CalendarView = ({ tasks, setTasks }) => {
  const [viewMode, setViewMode] = useState('month'); // 'month', 'week', 'day'
  const [currentDate, setCurrentDate] = useState(new Date());
  const [schedulingTask, setSchedulingTask] = useState(null);
  const [isAddingTask, setIsAddingTask] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const navigatePrevious = () => {
    const newDate = new Date(currentDate);
    if (viewMode === 'month') {
      newDate.setMonth(newDate.getMonth() - 1);
    } else if (viewMode === 'week') {
      newDate.setDate(newDate.getDate() - 7);
    } else if (viewMode === 'day') {
      newDate.setDate(newDate.getDate() - 1);
    }
    setCurrentDate(newDate);
  };

  const navigateNext = () => {
    const newDate = new Date(currentDate);
    if (viewMode === 'month') {
      newDate.setMonth(newDate.getMonth() + 1);
    } else if (viewMode === 'week') {
      newDate.setDate(newDate.getDate() + 7);
    } else if (viewMode === 'day') {
      newDate.setDate(newDate.getDate() + 1);
    }
    setCurrentDate(newDate);
  };

  const navigateToday = () => {
    setCurrentDate(new Date());
  };

  const handleScheduleTask = (taskId, scheduleData) => {
    setTasks(tasks.map(task =>
      task.id === taskId
        ? { ...task, ...scheduleData }
        : task
    ));
  };

  const handleAddTask = (newTask) => {
    setTasks([...tasks, newTask]);
  };

  const handleUpdateTask = (updatedTask) => {
    setTasks(tasks.map(task => task.id === updatedTask.id ? updatedTask : task));
  };

  const handleDeleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  const getDateRangeText = () => {
    const options = { month: 'long', year: 'numeric' };

    if (viewMode === 'month') {
      return currentDate.toLocaleDateString('en-US', options);
    } else if (viewMode === 'week') {
      const startOfWeek = new Date(currentDate);
      startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());
      const endOfWeek = new Date(startOfWeek);
      endOfWeek.setDate(startOfWeek.getDate() + 6);

      return `${startOfWeek.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${endOfWeek.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`;
    } else if (viewMode === 'day') {
      return currentDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
    }
  };

  return (
    <div className="flex flex-col">
      {/* Barrier to prevent content from showing through */}
      <div className="sticky top-0 z-20 h-8" style={{ backgroundColor: 'var(--color-modalBg)' }}></div>

      {/* Sticky Header Section */}
      <div className="sticky top-8 z-10" style={{ backgroundColor: 'var(--color-modalBg)' }}>
        {/* Sub-tabs for Month/Week/Day */}
        <div className="flex items-center justify-between mb-4">
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

            <div className="flex gap-2">
            <button
              onClick={() => setViewMode('month')}
              className="px-4 py-2 rounded-lg text-sm font-medium transition-all"
              style={{
                backgroundColor: viewMode === 'month' ? 'var(--color-primary)' : 'var(--color-surface)',
                color: viewMode === 'month' ? '#ffffff' : 'var(--color-textPrimary)',
              }}
            >
              Month
            </button>
            <button
              onClick={() => setViewMode('week')}
              className="px-4 py-2 rounded-lg text-sm font-medium transition-all"
              style={{
                backgroundColor: viewMode === 'week' ? 'var(--color-primary)' : 'var(--color-surface)',
                color: viewMode === 'week' ? '#ffffff' : 'var(--color-textPrimary)',
              }}
            >
              Week
            </button>
            <button
              onClick={() => setViewMode('day')}
              className="px-4 py-2 rounded-lg text-sm font-medium transition-all"
              style={{
                backgroundColor: viewMode === 'day' ? 'var(--color-primary)' : 'var(--color-surface)',
                color: viewMode === 'day' ? '#ffffff' : 'var(--color-textPrimary)',
              }}
            >
              Day
            </button>
            </div>
          </div>
        </div>

        {/* Date Navigation */}
        <div className="flex items-center justify-between p-4 rounded-xl" style={{
          backgroundColor: 'var(--color-surface)',
          borderColor: 'var(--color-border)'
        }}>
          <button
            onClick={navigatePrevious}
            className="p-2 rounded-lg hover:bg-opacity-10 transition-all"
            style={{ color: 'var(--color-textPrimary)' }}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <div className="flex items-center gap-3">
            <h3 className="text-lg font-bold" style={{ color: 'var(--color-textPrimary)' }}>
              {getDateRangeText()}
            </h3>
            <button
              onClick={navigateToday}
              className="px-3 py-1 rounded-lg text-sm font-medium transition-all"
              style={{
                backgroundColor: 'var(--color-primary)',
                color: '#ffffff'
              }}
            >
              Today
            </button>
          </div>

          <button
            onClick={navigateNext}
            className="p-2 rounded-lg hover:bg-opacity-10 transition-all"
            style={{ color: 'var(--color-textPrimary)' }}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Calendar Content */}
      <div className="relative">
        {viewMode === 'month' && (
          <MonthView
            currentDate={currentDate}
            tasks={tasks}
            setTasks={setTasks}
            onTaskClick={setSelectedTask}
          />
        )}
        {viewMode === 'week' && (
          <WeekView
            currentDate={currentDate}
            tasks={tasks}
            setTasks={setTasks}
            onTaskClick={setSelectedTask}
          />
        )}
        {viewMode === 'day' && (
          <DayView
            currentDate={currentDate}
            tasks={tasks}
            setTasks={setTasks}
            onTaskClick={setSelectedTask}
          />
        )}
      </div>

      {/* Unscheduled Tasks Section */}
      <div className="mt-6 p-4 rounded-xl border" style={{
        backgroundColor: 'var(--color-surface)',
        borderColor: 'var(--color-border)'
      }}>
        <h4 className="text-sm font-bold mb-3" style={{ color: 'var(--color-textPrimary)' }}>
          Unscheduled Tasks
        </h4>
        <div className="space-y-2">
          {tasks.filter(task => !task.scheduledDate && !task.completed).length === 0 ? (
            <p className="text-sm text-center py-4" style={{ color: 'var(--color-textSecondary)' }}>
              All tasks are scheduled! 🎉
            </p>
          ) : (
            tasks.filter(task => !task.scheduledDate && !task.completed).map(task => (
              <div
                key={task.id}
                draggable
                onDragStart={(e) => {
                  e.dataTransfer.setData('taskId', task.id.toString());
                  e.dataTransfer.effectAllowed = 'move';
                }}
                className="flex items-center justify-between p-3 rounded-lg transition-all hover:scale-[1.02]"
                style={{
                  backgroundColor: 'var(--color-inputBg)',
                  cursor: 'move'
                }}
              >
                <div className="flex items-center gap-3">
                  {/* Drag indicator lines */}
                  <div className="flex flex-col gap-1">
                    <div className="w-4 h-0.5 rounded" style={{ backgroundColor: 'var(--color-textSecondary)', opacity: 0.4 }}></div>
                    <div className="w-4 h-0.5 rounded" style={{ backgroundColor: 'var(--color-textSecondary)', opacity: 0.4 }}></div>
                    <div className="w-4 h-0.5 rounded" style={{ backgroundColor: 'var(--color-textSecondary)', opacity: 0.4 }}></div>
                  </div>
                  <span className="text-lg">{task.categoryIcon || '📋'}</span>
                  <span className="text-sm" style={{ color: 'var(--color-textPrimary)' }}>
                    {task.text}
                  </span>
                </div>
                <button
                  onClick={() => setSchedulingTask(task)}
                  className="px-3 py-1 rounded-lg text-xs font-medium transition-all hover:opacity-90"
                  style={{
                    backgroundColor: 'var(--color-primary)',
                    color: '#ffffff'
                  }}
                >
                  Schedule
                </button>
              </div>
            ))
          )}
        </div>
      </div>

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

      {/* Add Task Modal */}
      <AddTaskModal
        isOpen={isAddingTask}
        onClose={() => setIsAddingTask(false)}
        onAddTask={handleAddTask}
        defaultDate={currentDate.toISOString().split('T')[0]}
        defaultTime="23:59"
      />

      {/* Task Details Modal */}
      <TaskDetailsModal
        isOpen={!!selectedTask}
        onClose={() => setSelectedTask(null)}
        task={selectedTask}
        onUpdateTask={handleUpdateTask}
        onDeleteTask={handleDeleteTask}
      />
    </div>
  );
};

export default CalendarView;
