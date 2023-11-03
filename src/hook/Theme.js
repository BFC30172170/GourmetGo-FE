import { useEffect, useState } from "react";

export default function useTheme() {
    const [theme, setTheme] = useState(localStorage.theme || 'light');
  
    useEffect(() => {
      const oldTheme = theme === 'dark' ? 'light' : 'dark';
      const root = window.document.documentElement;
      console.log(theme);
      root.classList.remove(oldTheme);
      root.classList.add(theme);
  
      localStorage.setItem('theme', theme);
    }, [theme]);
  
    return [theme, setTheme];
  }