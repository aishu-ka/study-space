import { useState } from 'react';
import CalendarView from './CalendarView';
import SpreadsheetView from './SpreadsheetView';

const CalendarModal = ({ isOpen, onClose, tasks, setTasks }) => {
  const [activeTab, setActiveTab] = useState('calendar'); // 'calendar' or 'spreadsheet'

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div
        className="rounded-3xl shadow-2xl w-full max-w-6xl max-h-[90vh] flex flex-col transform transition-all"
        style={{ backgroundColor: 'var(--color-modalBg)' }}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 pb-4 border-b" style={{ borderColor: 'var(--color-border)' }}>
          <h2 className="text-2xl font-bold" style={{ color: 'var(--color-textPrimary)' }}>
            Aishu's Study Space - Calendar
          </h2>
          <button
            onClick={onClose}
            className="transition-colors p-2 rounded-lg hover:bg-opacity-10"
            style={{ color: 'var(--color-textSecondary)' }}
            onMouseOver={(e) => {
              e.currentTarget.style.color = 'var(--color-textPrimary)';
              e.currentTarget.style.backgroundColor = 'var(--color-surface)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.color = 'var(--color-textSecondary)';
              e.currentTarget.style.backgroundColor = 'transparent';
            }}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Main Tabs */}
        <div className="flex gap-4 px-6 pt-4">
          <button
            onClick={() => setActiveTab('calendar')}
            className="px-6 py-3 rounded-xl font-semibold transition-all"
            style={{
              background: activeTab === 'calendar'
                ? `linear-gradient(to right, var(--color-primary), var(--color-secondary))`
                : 'var(--color-surface)',
              color: activeTab === 'calendar' ? '#ffffff' : 'var(--color-textPrimary)',
              boxShadow: activeTab === 'calendar' ? '0 4px 12px rgba(0,0,0,0.1)' : 'none'
            }}
          >
            📅 Calendar
          </button>
          <button
            onClick={() => setActiveTab('spreadsheet')}
            className="px-6 py-3 rounded-xl font-semibold transition-all"
            style={{
              background: activeTab === 'spreadsheet'
                ? `linear-gradient(to right, var(--color-primary), var(--color-secondary))`
                : 'var(--color-surface)',
              color: activeTab === 'spreadsheet' ? '#ffffff' : 'var(--color-textPrimary)',
              boxShadow: activeTab === 'spreadsheet' ? '0 4px 12px rgba(0,0,0,0.1)' : 'none'
            }}
          >
            📊 Spreadsheet
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto px-6 pb-6">
          {activeTab === 'calendar' ? (
            <CalendarView tasks={tasks} setTasks={setTasks} />
          ) : (
            <SpreadsheetView tasks={tasks} setTasks={setTasks} />
          )}
        </div>
      </div>
    </div>
  );
};

export default CalendarModal;
