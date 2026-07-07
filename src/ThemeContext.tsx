import React, { createContext, useContext, useState } from 'react';
import type { Theme } from './types';

const THEME_STORAGE_KEY = 'dashboard-theme';

interface ThemeContextValue {
  theme: Theme;
  setTheme: (t: Theme) => void;
}

const ThemeContext = createContext<ThemeContextValue>({ theme: 'dark', setTheme: () => {} });

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(() => {
    return (sessionStorage.getItem(THEME_STORAGE_KEY) as Theme) ?? 'dark';
  });

  const setTheme = (t: Theme) => {
    sessionStorage.setItem(THEME_STORAGE_KEY, t);
    setThemeState(t);
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
