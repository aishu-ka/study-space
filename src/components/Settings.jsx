import { useState, useEffect } from 'react';
import { useTheme } from '../contexts/ThemeContext';

const Settings = ({ isOpen, onClose, settings, onSave, userName, onUserNameChange }) => {
  const { currentTheme, changeTheme, themes, customColors, updateCustomColors, autoMode, toggleAutoMode } = useTheme();
  const [localSettings, setLocalSettings] = useState(settings);
  const [localCustomColors, setLocalCustomColors] = useState(customColors);
  const [localUserName, setLocalUserName] = useState(userName);

  useEffect(() => {
    setLocalSettings(settings);
    setLocalCustomColors(customColors);
    setLocalUserName(userName);
  }, [settings, customColors, userName, isOpen]);

  const handleSave = () => {
    onSave(localSettings);
    if (currentTheme === 'custom') {
      updateCustomColors(localCustomColors.primary, localCustomColors.secondary);
    }
    if (localUserName.trim()) {
      onUserNameChange(localUserName.trim());
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="rounded-3xl shadow-2xl max-w-md w-full max-h-[90vh] flex flex-col transform transition-all" style={{ backgroundColor: 'var(--color-modalBg)' }}>
        {/* Header - Fixed */}
        <div className="flex items-center justify-between p-8 pb-4">
          <h2 className="text-2xl font-bold" style={{ color: 'var(--color-textPrimary)' }}>Settings</h2>
          <button
            onClick={onClose}
            className="transition-colors"
            style={{ color: 'var(--color-textSecondary)' }}
            onMouseOver={(e) => e.currentTarget.style.color = 'var(--color-textPrimary)'}
            onMouseOut={(e) => e.currentTarget.style.color = 'var(--color-textSecondary)'}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto px-8 flex-1">
          {/* User Name */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2" style={{ color: 'var(--color-textPrimary)' }}>
              Your Name
            </label>
            <input
              type="text"
              value={localUserName}
              onChange={(e) => setLocalUserName(e.target.value)}
              placeholder="Enter your name"
              className="w-full px-4 py-3 rounded-xl focus:outline-none focus:ring-2"
              style={{
                backgroundColor: 'var(--color-inputBg)',
                borderColor: 'var(--color-border)',
                color: 'var(--color-textPrimary)',
                border: '1px solid'
              }}
            />
            <p className="text-xs mt-1" style={{ color: 'var(--color-textSecondary)' }}>
              This will be displayed in your study space title
            </p>
          </div>

          {/* Theme Selector */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-3" style={{ color: 'var(--color-textPrimary)' }}>
              Theme
            </label>
            <div className="grid grid-cols-2 gap-3">
              {Object.values(themes).map((theme) => (
                <button
                  key={theme.id}
                  onClick={() => changeTheme(theme.id)}
                  className={`p-4 rounded-xl transition-all border-2 ${
                    currentTheme === theme.id
                      ? 'scale-105 shadow-lg'
                      : 'hover:scale-102'
                  }`}
                  style={{
                    backgroundColor: currentTheme === theme.id ? 'var(--color-primary)' : 'var(--color-surface)',
                    borderColor: currentTheme === theme.id ? 'var(--color-primary)' : 'var(--color-border)',
                    color: currentTheme === theme.id ? '#ffffff' : 'var(--color-textPrimary)',
                  }}
                >
                  <div className="text-2xl mb-1">{theme.icon}</div>
                  <div className="text-sm font-medium">{theme.name}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Auto Day/Night Mode Toggle */}
          <div className="mb-6 p-4 rounded-xl border" style={{
            backgroundColor: 'var(--color-surface)',
            borderColor: 'var(--color-border)'
          }}>
            <label className="flex items-center justify-between cursor-pointer">
              <div>
                <span className="text-sm font-medium block" style={{ color: 'var(--color-textPrimary)' }}>
                  Auto Day/Night Mode
                </span>
                <span className="text-xs block mt-1" style={{ color: 'var(--color-textSecondary)' }}>
                  Automatically switch between light and dark themes
                </span>
              </div>
              <div className="relative">
                <input
                  type="checkbox"
                  checked={autoMode}
                  onChange={toggleAutoMode}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-300 dark:peer-focus:ring-red-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-red-500"></div>
              </div>
            </label>
          </div>

          {/* Custom Color Picker - Only show when custom theme is selected */}
          {currentTheme === 'custom' && (
            <div className="mb-6 p-4 rounded-xl border" style={{
              backgroundColor: 'var(--color-surface)',
              borderColor: 'var(--color-border)'
            }}>
              <h4 className="text-sm font-medium mb-3" style={{ color: 'var(--color-textPrimary)' }}>
                Customize Colors
              </h4>
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-medium mb-2" style={{ color: 'var(--color-textSecondary)' }}>
                    Primary Color
                  </label>
                  <div className="flex items-center gap-3">
                    <input
                      type="color"
                      value={localCustomColors.primary}
                      onChange={(e) => {
                        const newColors = { ...localCustomColors, primary: e.target.value };
                        setLocalCustomColors(newColors);
                        updateCustomColors(newColors.primary, newColors.secondary);
                      }}
                      className="w-16 h-10 rounded-lg cursor-pointer border"
                      style={{ borderColor: 'var(--color-border)' }}
                    />
                    <input
                      type="text"
                      value={localCustomColors.primary}
                      onChange={(e) => {
                        const value = e.target.value;
                        if (/^#[0-9A-Fa-f]{0,6}$/.test(value)) {
                          const newColors = { ...localCustomColors, primary: value };
                          setLocalCustomColors(newColors);
                          if (value.length === 7) {
                            updateCustomColors(newColors.primary, newColors.secondary);
                          }
                        }
                      }}
                      className="flex-1 px-3 py-2 rounded-lg text-sm font-mono"
                      style={{
                        backgroundColor: 'var(--color-inputBg)',
                        borderColor: 'var(--color-border)',
                        color: 'var(--color-textPrimary)',
                        border: '1px solid'
                      }}
                      placeholder="#ef4444"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium mb-2" style={{ color: 'var(--color-textSecondary)' }}>
                    Secondary Color
                  </label>
                  <div className="flex items-center gap-3">
                    <input
                      type="color"
                      value={localCustomColors.secondary}
                      onChange={(e) => {
                        const newColors = { ...localCustomColors, secondary: e.target.value };
                        setLocalCustomColors(newColors);
                        updateCustomColors(newColors.primary, newColors.secondary);
                      }}
                      className="w-16 h-10 rounded-lg cursor-pointer border"
                      style={{ borderColor: 'var(--color-border)' }}
                    />
                    <input
                      type="text"
                      value={localCustomColors.secondary}
                      onChange={(e) => {
                        const value = e.target.value;
                        if (/^#[0-9A-Fa-f]{0,6}$/.test(value)) {
                          const newColors = { ...localCustomColors, secondary: value };
                          setLocalCustomColors(newColors);
                          if (value.length === 7) {
                            updateCustomColors(newColors.primary, newColors.secondary);
                          }
                        }
                      }}
                      className="flex-1 px-3 py-2 rounded-lg text-sm font-mono"
                      style={{
                        backgroundColor: 'var(--color-inputBg)',
                        borderColor: 'var(--color-border)',
                        color: 'var(--color-textPrimary)',
                        border: '1px solid'
                      }}
                      placeholder="#ec4899"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Time Settings */}
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: 'var(--color-textPrimary)' }}>
                Work Duration (minutes)
              </label>
              <input
                type="number"
                min="1"
                max="60"
                value={localSettings.workDuration}
                onChange={(e) => setLocalSettings({ ...localSettings, workDuration: parseInt(e.target.value) || 1 })}
                className="w-full px-4 py-3 rounded-xl focus:outline-none focus:ring-2"
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
                Short Break (minutes)
              </label>
              <input
                type="number"
                min="1"
                max="30"
                value={localSettings.shortBreakDuration}
                onChange={(e) => setLocalSettings({ ...localSettings, shortBreakDuration: parseInt(e.target.value) || 1 })}
                className="w-full px-4 py-3 rounded-xl focus:outline-none focus:ring-2"
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
                Long Break (minutes)
              </label>
              <input
                type="number"
                min="1"
                max="60"
                value={localSettings.longBreakDuration}
                onChange={(e) => setLocalSettings({ ...localSettings, longBreakDuration: parseInt(e.target.value) || 1 })}
                className="w-full px-4 py-3 rounded-xl focus:outline-none focus:ring-2"
                style={{
                  backgroundColor: 'var(--color-inputBg)',
                  borderColor: 'var(--color-border)',
                  color: 'var(--color-textPrimary)',
                  border: '1px solid'
                }}
              />
            </div>

            {/* Auto-start toggles */}
            <div className="pt-4 border-t" style={{ borderColor: 'var(--color-border)' }}>
              <label className="flex items-center justify-between cursor-pointer">
                <span className="text-sm font-medium" style={{ color: 'var(--color-textPrimary)' }}>
                  Auto-start Breaks
                </span>
                <div className="relative">
                  <input
                    type="checkbox"
                    checked={localSettings.autoStartBreaks}
                    onChange={(e) => setLocalSettings({ ...localSettings, autoStartBreaks: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-300 dark:peer-focus:ring-red-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-red-500"></div>
                </div>
              </label>
            </div>

            <div className="pb-4">
              <label className="flex items-center justify-between cursor-pointer">
                <span className="text-sm font-medium" style={{ color: 'var(--color-textPrimary)' }}>
                  Auto-start Pomodoros
                </span>
                <div className="relative">
                  <input
                    type="checkbox"
                    checked={localSettings.autoStartPomodoros}
                    onChange={(e) => setLocalSettings({ ...localSettings, autoStartPomodoros: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-300 dark:peer-focus:ring-red-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-red-500"></div>
                </div>
              </label>
            </div>
          </div>
        </div>

        {/* Action Buttons - Fixed at bottom */}
        <div className="flex gap-3 p-8 pt-4 border-t" style={{ borderColor: 'var(--color-border)' }}>
          <button
            onClick={onClose}
            className="flex-1 px-6 py-3 font-semibold rounded-xl transition-colors"
            style={{
              backgroundColor: 'var(--color-surface)',
              color: 'var(--color-textPrimary)',
            }}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'var(--color-surfaceHover)'}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'var(--color-surface)'}
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="flex-1 px-6 py-3 text-white font-semibold rounded-xl transition-all shadow-lg"
            style={{
              background: `linear-gradient(to right, var(--color-primary), var(--color-secondary))`
            }}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
