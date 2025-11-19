'use client';

import { useState, useEffect } from 'react';
import styles from './ThemeToggle.module.css';

export default function ThemeToggle() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Verificar preferencia guardada al cargar
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark-mode') {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark-mode');
    }
  }, []);

  const toggleTheme = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    
    if (newDarkMode) {
      document.documentElement.classList.add('dark-mode');
      localStorage.setItem('theme', 'dark-mode');
    } else {
      document.documentElement.classList.remove('dark-mode');
      localStorage.setItem('theme', '');
    }
  };

  return (
    <div className={styles.themeToggle} onClick={toggleTheme}>
      <div className={styles.themeToggleTrack}>
        <div className={styles.themeToggleSun}>☀️</div>
        <div className={styles.themeToggleMoon}>🌙</div>
      </div>
      <div className={`${styles.themeToggleThumb} ${isDarkMode ? styles.dark : ''}`}></div>
    </div>
  );
}