import { createContext, useContext, useState, useEffect } from 'react';
import { applyTheme, getSavedTheme, themes, createCustomTheme } from '../config/themes';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState(getSavedTheme());
  const [autoMode, setAutoMode] = useState(() => {
    const saved = localStorage.getItem('autoThemeMode');
    return saved === 'true';
  });
  const [customColors, setCustomColors] = useState(() => {
    const saved = localStorage.getItem('customThemeColors');
    return saved ? JSON.parse(saved) : { primary: '#ef4444', secondary: '#ec4899' };
  });

  // Auto theme switching based on time
  useEffect(() => {
    if (!autoMode) return;

    const checkTime = () => {
      const hour = new Date().getHours();
      const isDaytime = hour >= 6 && hour < 18; // 6 AM to 6 PM is day
      const newTheme = isDaytime ? 'light' : 'dark';

      if (currentTheme !== newTheme && (currentTheme === 'light' || currentTheme === 'dark')) {
        setCurrentTheme(newTheme);
        localStorage.setItem('theme', newTheme);
      }
    };

    checkTime();
    const interval = setInterval(checkTime, 60000); // Check every minute

    return () => clearInterval(interval);
  }, [autoMode, currentTheme]);

  useEffect(() => {
    // Apply theme on mount and when it changes
    if (currentTheme === 'custom') {
      applyCustomTheme(customColors.primary, customColors.secondary);
    } else {
      applyTheme(currentTheme);
    }
  }, [currentTheme, customColors]);

  const changeTheme = (themeId) => {
    if (themes[themeId]) {
      setCurrentTheme(themeId);
      localStorage.setItem('theme', themeId);
    }
  };

  const applyCustomTheme = (primaryColor, secondaryColor) => {
    const customThemeColors = createCustomTheme(primaryColor, secondaryColor);
    const root = document.documentElement;

    Object.entries(customThemeColors).forEach(([key, value]) => {
      root.style.setProperty(`--color-${key}`, value);
    });
  };

  const updateCustomColors = (primaryColor, secondaryColor) => {
    const newColors = { primary: primaryColor, secondary: secondaryColor };
    setCustomColors(newColors);
    localStorage.setItem('customThemeColors', JSON.stringify(newColors));

    if (currentTheme === 'custom') {
      applyCustomTheme(primaryColor, secondaryColor);
    }
  };

  const toggleAutoMode = () => {
    const newAutoMode = !autoMode;
    setAutoMode(newAutoMode);
    localStorage.setItem('autoThemeMode', newAutoMode.toString());
  };

  const value = {
    currentTheme,
    changeTheme,
    themes,
    themeConfig: themes[currentTheme],
    customColors,
    updateCustomColors,
    autoMode,
    toggleAutoMode,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};
