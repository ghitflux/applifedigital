import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useColorScheme } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { ThemeMode, getColors } from '@/constants/theme';

interface ThemeContextType {
  theme: ThemeMode;
  colors: ReturnType<typeof getColors>;
  toggleTheme: () => void;
  setTheme: (theme: ThemeMode) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const THEME_STORAGE_KEY = 'app_theme_preference';

export function ThemeProvider({ children }: { children: ReactNode }) {
  const systemColorScheme = useColorScheme();
  const [theme, setThemeState] = useState<ThemeMode>('dark');

  // Load saved theme preference
  useEffect(() => {
    loadThemePreference();
  }, []);

  const loadThemePreference = async () => {
    try {
      const savedTheme = await SecureStore.getItemAsync(THEME_STORAGE_KEY);
      if (savedTheme === 'light' || savedTheme === 'dark') {
        setThemeState(savedTheme);
      } else {
        // Use system preference if no saved preference
        setThemeState(systemColorScheme === 'dark' ? 'dark' : 'light');
      }
    } catch (error) {
      console.error('Error loading theme preference:', error);
      setThemeState(systemColorScheme === 'dark' ? 'dark' : 'light');
    }
  };

  const saveThemePreference = async (newTheme: ThemeMode) => {
    try {
      await SecureStore.setItemAsync(THEME_STORAGE_KEY, newTheme);
    } catch (error) {
      console.error('Error saving theme preference:', error);
    }
  };

  const setTheme = (newTheme: ThemeMode) => {
    setThemeState(newTheme);
    saveThemePreference(newTheme);
  };

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
  };

  const colors = getColors(theme);

  return (
    <ThemeContext.Provider value={{ theme, colors, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

