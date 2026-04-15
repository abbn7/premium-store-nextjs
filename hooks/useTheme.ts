'use client';

import { useEffect } from 'react';
import { useThemeStore } from '@/store/theme-store';

export function useTheme() {
  const { theme, toggleTheme, setTheme } = useThemeStore();

  useEffect(() => {
    // Apply theme on mount
    const savedTheme = localStorage.getItem('store-theme');
    if (savedTheme) {
      try {
        const parsed = JSON.parse(savedTheme);
        const t = parsed?.state?.theme || 'light';
        document.documentElement.classList.toggle('dark', t === 'dark');
      } catch {
        document.documentElement.classList.remove('dark');
      }
    }
  }, []);

  const isDark = theme === 'dark';

  return {
    theme,
    isDark,
    toggleTheme,
    setTheme,
  };
}
