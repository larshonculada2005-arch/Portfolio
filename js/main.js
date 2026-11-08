/**
 * main.js — Initialisation, footer year, misc utilities
 */

(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {

    /* ── Footer: current year ── */
    const yearEl = document.getElementById('footerYear');
    if (yearEl) {
      yearEl.textContent = new Date().getFullYear();
    }

    /* ── Preloader: remove loading class when page is ready ── */
    document.body.classList.add('loaded');

    /* ── Lazy-load images (if real images are added later) ── */
    if ('loading' in HTMLImageElement.prototype) {
      document.querySelectorAll('img[data-src]').forEach(function (img) {
        img.src = img.getAttribute('data-src');
        img.removeAttribute('data-src');
      });
    }

    /* ── Add aria-current to active nav link on load ── */
    const hash = window.location.hash;
    if (hash) {
      const link = document.querySelector('.nav-link[href="' + hash + '"]');
      if (link) link.setAttribute('aria-current', 'page');
    }

    /* ── Console easter egg ── */
    console.log(
      '%c👋 Hey there, fellow developer!',
      'color: #4f8ef7; font-size: 16px; font-weight: bold;'
    );
    console.log(
      '%cThis portfolio was built with vanilla HTML, CSS & JavaScript.',
      'color: #8892a4; font-size: 12px;'
    );

  });

})();
