// modules/theme.js
import { themeIcon } from './domElements.js';

export function updateThemeIcon(isDarkMode) {
  themeIcon.classList.toggle("fa-sun", isDarkMode);
  themeIcon.classList.toggle("fa-moon", !isDarkMode);
}

export function initializeTheme() {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme) {
    document.body.classList.toggle("dark-mode", savedTheme === "dark");
    updateThemeIcon(savedTheme === "dark");
  }
}
