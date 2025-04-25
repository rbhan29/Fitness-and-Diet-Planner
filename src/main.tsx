
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Add the theme attribute to the HTML element for theme initialization
const initializeTheme = () => {
  const theme = localStorage.getItem('vite-ui-theme') || 'system';
  
  const root = window.document.documentElement;
  const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  
  root.classList.remove('light', 'dark');
  root.classList.add(theme === 'system' ? systemTheme : theme);
};

// Initialize theme before rendering to prevent flash of default theme
initializeTheme();

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
