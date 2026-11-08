/**
 * theme.js — Dark / Light Mode
 * ─────────────────────────────────────────────────────────────
 * Persists user preference in localStorage.
 * Applies theme before paint to avoid flash of wrong theme.
 */

(function () {
  'use strict';

  const STORAGE_KEY = 'portfolio-theme';
  const DEFAULT_THEME = 'dark';

  /* ── Apply theme immediately (prevents FOUC) ── */
  function getStoredTheme() {
    try {
      return localStorage.getItem(STORAGE_KEY);
    } catch {
      return null;
    }
  }

  function getSystemPreference() {
    return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
  }

  // Apply early
  const stored = getStoredTheme();
  applyTheme(stored || getSystemPreference() || DEFAULT_THEME);

  /* ── Toggle handler ── */
  document.addEventListener('DOMContentLoaded', function () {
    const toggleBtn = document.getElementById('themeToggle');
    if (!toggleBtn) return;

    toggleBtn.addEventListener('click', function () {
      const current = document.documentElement.getAttribute('data-theme');
      const next = current === 'dark' ? 'light' : 'dark';

      // Brief transition class for smooth color swap
      document.body.classList.add('theme-transition');

      applyTheme(next);

      try {
        localStorage.setItem(STORAGE_KEY, next);
      } catch { /* storage unavailable */ }

      // Announce to screen readers
      toggleBtn.setAttribute(
        'aria-label',
        next === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'
      );

      // Remove transition class after animation
      setTimeout(function () {
        document.body.classList.remove('theme-transition');
      }, 450);
    });

    // Keep button label accurate on load
    const current = document.documentElement.getAttribute('data-theme');
    toggleBtn.setAttribute(
      'aria-label',
      current === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'
    );
  });

})();
