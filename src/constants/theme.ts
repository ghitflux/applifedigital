// Theme Colors
export const darkColors = {
  primary: '#4A90E2',
  secondary: '#5856D6',
  success: '#4CAF50',
  warning: '#FFC107',
  error: '#E53E3E',

  // Dark theme backgrounds
  background: '#1A1A2E',
  backgroundSecondary: '#16213E',
  card: '#2C2C4A',
  cardSecondary: '#3A506B',

  // Dark theme text
  text: '#FFFFFF',
  textSecondary: '#B0B0B0',
  textTertiary: '#8E8E93',

  // Dark theme borders and dividers
  border: '#3A506B',
  divider: '#2C2C4A',
  placeholder: '#6B7280',

  // Accent colors
  accent: '#4A90E2',
  accentLight: '#6BA3E8',
};

export const lightColors = {
  primary: '#4A90E2',
  secondary: '#5856D6',
  success: '#4CAF50',
  warning: '#FFC107',
  error: '#E53E3E',

  // Light theme backgrounds
  background: '#FFFFFF',
  backgroundSecondary: '#F5F5F7',
  card: '#FFFFFF',
  cardSecondary: '#F5F5F7',

  // Light theme text
  text: '#1A1A1A',
  textSecondary: '#6B7280',
  textTertiary: '#9CA3AF',

  // Light theme borders and dividers
  border: '#E5E7EB',
  divider: '#F3F4F6',
  placeholder: '#9CA3AF',

  // Accent colors
  accent: '#4A90E2',
  accentLight: '#6BA3E8',
};

export type ThemeMode = 'light' | 'dark';

export const getColors = (mode: ThemeMode) => {
  return mode === 'dark' ? darkColors : lightColors;
};

// Default export for backward compatibility (dark mode)
export const colors = darkColors;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
};

export const borderRadius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
};

export const typography = {
  h1: {
    fontSize: 32,
    fontWeight: 'bold' as const,
  },
  h2: {
    fontSize: 24,
    fontWeight: 'bold' as const,
  },
  h3: {
    fontSize: 20,
    fontWeight: '600' as const,
  },
  body: {
    fontSize: 16,
    fontWeight: 'normal' as const,
  },
  caption: {
    fontSize: 14,
    fontWeight: 'normal' as const,
  },
  small: {
    fontSize: 12,
    fontWeight: 'normal' as const,
  },
};
