"use client";
import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light'); // Set initial state to 'light'

  useEffect(() => {
    // Access localStorage only after component mounts
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme) {
      setTheme(storedTheme); // Update state with stored theme, if any
    }
  }, []);

  useEffect(() => {
    // Update localStorage and document attribute when theme changes
    localStorage.setItem('theme', theme);
    document.documentElement.setAttribute('data-theme', theme); 
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'light' : 'dark'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
