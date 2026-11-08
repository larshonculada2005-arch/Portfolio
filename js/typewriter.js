/**
 * typewriter.js — Animated typewriter effect for hero role text
 * Uses PORTFOLIO_DATA.typewriterStrings if available, else fallback array.
 */

(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {
    const el = document.getElementById('typewriter');
    if (!el) return;

    const strings = (
      window.PORTFOLIO_DATA &&
      window.PORTFOLIO_DATA.typewriterStrings
    ) || [
      'Student Developer',
      'Aspiring Software Engineer',
      'Web Developer',
      'Android Developer',
    ];

    let strIndex   = 0;
    let charIndex  = 0;
    let isDeleting = false;
    let isPaused   = false;

    const TYPING_SPEED  = 80;   // ms per character typed
    const DELETE_SPEED  = 45;   // ms per character deleted
    const PAUSE_END     = 1800; // ms to wait at end of word
    const PAUSE_START   = 300;  // ms to wait before typing next word

    // Set aria-label to current string for screen readers
    function updateAria() {
      el.setAttribute('aria-label', strings[strIndex]);
    }

    function type() {
      const currentStr = strings[strIndex];

      if (isPaused) {
        isPaused = false;
        setTimeout(type, isDeleting ? PAUSE_START : PAUSE_END);
        return;
      }

      if (!isDeleting) {
        // Typing forward
        el.textContent = currentStr.substring(0, charIndex + 1);
        charIndex++;

        if (charIndex === currentStr.length) {
          // Finished typing — pause before deleting
          isPaused = true;
          isDeleting = true;
          updateAria();
          setTimeout(type, PAUSE_END);
          return;
        }
      } else {
        // Deleting
        el.textContent = currentStr.substring(0, charIndex - 1);
        charIndex--;

        if (charIndex === 0) {
          // Finished deleting — move to next string
          isDeleting = false;
          strIndex = (strIndex + 1) % strings.length;
          isPaused = true;
          setTimeout(type, PAUSE_START);
          return;
        }
      }

      setTimeout(type, isDeleting ? DELETE_SPEED : TYPING_SPEED);
    }

    // Small initial delay so page loads first
    setTimeout(type, 600);
  });

})();
