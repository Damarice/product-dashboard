// components/darkmode.tsx
'use client';

import { useEffect, useState } from 'react';

export default function DarkModeToggle() {
  const [isDark, setIsDark] = useState(false);
  const [isSystemDark, setIsSystemDark] = useState(false);

  // Load saved theme and system preference on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    setIsSystemDark(systemDark);
    
    if (savedTheme === 'dark') {
      setIsDark(true);
    } else if (savedTheme === 'light') {
      setIsDark(false);
    } else {
      setIsDark(systemDark);
    }
  }, []);

  // Apply theme to document root
  useEffect(() => {
    const root = window.document.documentElement;

    if (isDark) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  // Handle system theme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleSystemThemeChange = (e: MediaQueryListEvent) => {
      setIsSystemDark(e.matches);
      // Only follow system theme if no user preference is set
      if (!localStorage.getItem('theme')) {
        setIsDark(e.matches);
      }
    };

    mediaQuery.addEventListener('change', handleSystemThemeChange);
    return () => mediaQuery.removeEventListener('change', handleSystemThemeChange);
  }, []);

  return (
    <button
      onClick={() => setIsDark(!isDark)}
      className="fixed top-4 right-4 z-50 p-2 px-4 rounded-lg transition-all duration-300 
                 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-white 
                 hover:bg-gray-200 dark:hover:bg-gray-700 shadow-lg 
                 border border-gray-200 dark:border-gray-700"
    >
      <div className="flex items-center space-x-2">
        <span className="text-lg">
          {isDark ? '☀️' : '🌙'}
        </span>
        <span className="font-medium">
          {isDark ? 'Light Mode' : 'Dark Mode'}
        </span>
      </div>
    </button>
  );
}
