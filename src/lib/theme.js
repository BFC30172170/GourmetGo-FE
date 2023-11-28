import React, { useEffect, useState, useContext, createContext } from 'react';

const themeContext = createContext();

export function ThemeProvider({ children }) {
    const theme = useProvideTheme();
    return <themeContext.Provider value={theme}>{children}</themeContext.Provider>;
}

export const useTheme = () => {
    return useContext(themeContext);
};

function useProvideTheme() {
  const [theme, setTheme] = useState(localStorage.theme || 'light');

  useEffect(() => {
    const oldTheme = theme === 'dark' ? 'light' : 'dark';
    const root = window.document.documentElement;
    console.log(theme);
    root.classList.remove(oldTheme);
    root.classList.add(theme);

    localStorage.setItem('theme', theme);
  }, [theme]);

  return {
    theme,
    setTheme
  }
};
