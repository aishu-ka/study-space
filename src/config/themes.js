export const themes = {
  light: {
    id: 'light',
    name: 'Light',
    icon: '☀️',
    colors: {
      // Background colors
      background: '#f3f4f6',
      surface: '#ffffff',
      surfaceHover: '#f9fafb',

      // Text colors
      textPrimary: '#1f2937',
      textSecondary: '#6b7280',
      textTertiary: '#9ca3af',

      // Accent colors
      primary: '#ef4444',
      primaryHover: '#dc2626',
      secondary: '#ec4899',

      // Border colors
      border: '#e5e7eb',
      borderHover: '#d1d5db',

      // Component backgrounds
      cardBg: 'rgba(255, 255, 255, 0.6)',
      modalBg: '#ffffff',
      inputBg: '#f9fafb',

      // Status colors
      success: '#10b981',
      warning: '#f59e0b',
      error: '#ef4444',
    }
  },

  dark: {
    id: 'dark',
    name: 'Dark',
    icon: '🌙',
    colors: {
      background: '#111827',
      surface: '#1f2937',
      surfaceHover: '#374151',

      textPrimary: '#f9fafb',
      textSecondary: '#d1d5db',
      textTertiary: '#9ca3af',

      primary: '#ef4444',
      primaryHover: '#dc2626',
      secondary: '#ec4899',

      border: '#374151',
      borderHover: '#4b5563',

      cardBg: 'rgba(31, 41, 55, 0.6)',
      modalBg: '#1f2937',
      inputBg: '#374151',

      success: '#10b981',
      warning: '#f59e0b',
      error: '#ef4444',
    }
  },

  sunset: {
    id: 'sunset',
    name: 'Sunset',
    icon: '🌅',
    colors: {
      background: '#1a1320',
      surface: '#2d1b3d',
      surfaceHover: '#3d2651',

      textPrimary: '#fef3c7',
      textSecondary: '#fcd34d',
      textTertiary: '#f59e0b',

      primary: '#f97316',
      primaryHover: '#ea580c',
      secondary: '#ec4899',

      border: '#3d2651',
      borderHover: '#4d3161',

      cardBg: 'rgba(45, 27, 61, 0.6)',
      modalBg: '#2d1b3d',
      inputBg: '#3d2651',

      success: '#fbbf24',
      warning: '#f59e0b',
      error: '#dc2626',
    }
  },

  ocean: {
    id: 'ocean',
    name: 'Ocean',
    icon: '🌊',
    colors: {
      background: '#0c1e2e',
      surface: '#153448',
      surfaceHover: '#1e4a62',

      textPrimary: '#e0f2fe',
      textSecondary: '#bae6fd',
      textTertiary: '#7dd3fc',

      primary: '#0ea5e9',
      primaryHover: '#0284c7',
      secondary: '#06b6d4',

      border: '#1e4a62',
      borderHover: '#276080',

      cardBg: 'rgba(21, 52, 72, 0.6)',
      modalBg: '#153448',
      inputBg: '#1e4a62',

      success: '#14b8a6',
      warning: '#f59e0b',
      error: '#ef4444',
    }
  },

  forest: {
    id: 'forest',
    name: 'Forest',
    icon: '🌲',
    colors: {
      background: '#0f1f13',
      surface: '#1a3621',
      surfaceHover: '#24472e',

      textPrimary: '#ecfccb',
      textSecondary: '#d9f99d',
      textTertiary: '#bef264',

      primary: '#22c55e',
      primaryHover: '#16a34a',
      secondary: '#84cc16',

      border: '#24472e',
      borderHover: '#2d563a',

      cardBg: 'rgba(26, 54, 33, 0.6)',
      modalBg: '#1a3621',
      inputBg: '#24472e',

      success: '#22c55e',
      warning: '#eab308',
      error: '#ef4444',
    }
  },

  monochrome: {
    id: 'monochrome',
    name: 'Monochrome',
    icon: '⚫',
    colors: {
      background: '#171717',
      surface: '#262626',
      surfaceHover: '#404040',

      textPrimary: '#fafafa',
      textSecondary: '#d4d4d4',
      textTertiary: '#a3a3a3',

      primary: '#737373',
      primaryHover: '#525252',
      secondary: '#a3a3a3',

      border: '#404040',
      borderHover: '#525252',

      cardBg: 'rgba(38, 38, 38, 0.6)',
      modalBg: '#262626',
      inputBg: '#404040',

      success: '#d4d4d4',
      warning: '#a3a3a3',
      error: '#737373',
    }
  },

  highContrast: {
    id: 'highContrast',
    name: 'High Contrast',
    icon: '◐',
    colors: {
      background: '#000000',
      surface: '#1a1a1a',
      surfaceHover: '#2a2a2a',

      textPrimary: '#ffffff',
      textSecondary: '#ffff00',
      textTertiary: '#00ffff',

      primary: '#ffff00',
      primaryHover: '#ffff33',
      secondary: '#00ffff',

      border: '#ffffff',
      borderHover: '#ffff00',

      cardBg: 'rgba(26, 26, 26, 0.9)',
      modalBg: '#000000',
      inputBg: '#1a1a1a',

      success: '#00ff00',
      warning: '#ffff00',
      error: '#ff0000',
    }
  },

  custom: {
    id: 'custom',
    name: 'Custom',
    icon: '🎨',
    isCustom: true,
    colors: {
      background: '#f3f4f6',
      surface: '#ffffff',
      surfaceHover: '#f9fafb',

      textPrimary: '#1f2937',
      textSecondary: '#6b7280',
      textTertiary: '#9ca3af',

      primary: '#ef4444',
      primaryHover: '#dc2626',
      secondary: '#ec4899',

      border: '#e5e7eb',
      borderHover: '#d1d5db',

      cardBg: 'rgba(255, 255, 255, 0.6)',
      modalBg: '#ffffff',
      inputBg: '#f9fafb',

      success: '#10b981',
      warning: '#f59e0b',
      error: '#ef4444',
    }
  }
};

export const defaultTheme = 'light';

// Generate custom theme colors based on user selections
export const createCustomTheme = (primaryColor, secondaryColor) => {
  // Convert hex to RGB for creating variations
  const hexToRgb = (hex) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  };

  const rgbToHex = (r, g, b) => {
    return "#" + [r, g, b].map(x => {
      const hex = Math.max(0, Math.min(255, x)).toString(16);
      return hex.length === 1 ? "0" + hex : hex;
    }).join('');
  };

  const darken = (hex, amount) => {
    const rgb = hexToRgb(hex);
    if (!rgb) return hex;
    return rgbToHex(
      Math.floor(rgb.r * (1 - amount)),
      Math.floor(rgb.g * (1 - amount)),
      Math.floor(rgb.b * (1 - amount))
    );
  };

  const lighten = (hex, amount) => {
    const rgb = hexToRgb(hex);
    if (!rgb) return hex;
    return rgbToHex(
      Math.floor(rgb.r + (255 - rgb.r) * amount),
      Math.floor(rgb.g + (255 - rgb.g) * amount),
      Math.floor(rgb.b + (255 - rgb.b) * amount)
    );
  };

  // Determine if the primary color is light or dark for text colors
  const rgb = hexToRgb(primaryColor);
  const brightness = rgb ? (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000 : 128;
  const isDark = brightness < 128;

  return {
    background: isDark ? '#111827' : '#f3f4f6',
    surface: isDark ? '#1f2937' : '#ffffff',
    surfaceHover: isDark ? '#374151' : '#f9fafb',

    textPrimary: isDark ? '#f9fafb' : '#1f2937',
    textSecondary: isDark ? '#d1d5db' : '#6b7280',
    textTertiary: isDark ? '#9ca3af' : '#9ca3af',

    primary: primaryColor,
    primaryHover: darken(primaryColor, 0.1),
    secondary: secondaryColor,

    border: isDark ? '#374151' : '#e5e7eb',
    borderHover: isDark ? '#4b5563' : '#d1d5db',

    cardBg: isDark ? 'rgba(31, 41, 55, 0.6)' : 'rgba(255, 255, 255, 0.6)',
    modalBg: isDark ? '#1f2937' : '#ffffff',
    inputBg: isDark ? '#374151' : '#f9fafb',

    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444',
  };
};

// Apply theme colors to CSS variables
export const applyTheme = (themeId) => {
  const theme = themes[themeId] || themes[defaultTheme];
  const root = document.documentElement;

  Object.entries(theme.colors).forEach(([key, value]) => {
    root.style.setProperty(`--color-${key}`, value);
  });

  // Store theme preference
  localStorage.setItem('theme', themeId);
};

// Get saved theme or default
export const getSavedTheme = () => {
  return localStorage.getItem('theme') || defaultTheme;
};
