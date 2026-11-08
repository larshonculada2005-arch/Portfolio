/**
 * animations.js — Scroll reveal + button ripple effects
 */

(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {

    /* ── Navbar mouse-tracking glow ── */
    const navbar = document.getElementById('navbar');
    if (navbar) {
      navbar.addEventListener('mousemove', function (e) {
        const rect = navbar.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        navbar.style.setProperty('--glow-x', x + '%');
      });
    }

    /* ── Scroll Reveal (IntersectionObserver) ── */
    const revealEls = document.querySelectorAll('.reveal');

    // Hero reveals are handled by CSS animation, skip them
    const nonHeroReveals = Array.from(revealEls).filter(function (el) {
      return !el.closest('.hero-content');
    });

    if ('IntersectionObserver' in window) {
      const revealObserver = new IntersectionObserver(
        function (entries, observer) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add('visible');
              observer.unobserve(entry.target); // fire once
            }
          });
        },
        {
          root: null,
          rootMargin: '0px 0px -60px 0px',
          threshold: 0.1,
        }
      );

      nonHeroReveals.forEach(function (el) {
        revealObserver.observe(el);
      });

    } else {
      // Fallback: show all immediately
      nonHeroReveals.forEach(function (el) {
        el.classList.add('visible');
      });
    }

    /* ── Button Ripple Effect ── */
    document.querySelectorAll('.btn').forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        // Don't add ripple to download/external links opened in new tab
        const ripple = document.createElement('span');
        ripple.classList.add('btn-ripple');

        const rect = btn.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        ripple.style.width  = size + 'px';
        ripple.style.height = size + 'px';
        ripple.style.left   = (e.clientX - rect.left - size / 2) + 'px';
        ripple.style.top    = (e.clientY - rect.top  - size / 2) + 'px';

        // Ensure button has position: relative
        if (getComputedStyle(btn).position === 'static') {
          btn.style.position = 'relative';
        }

        btn.appendChild(ripple);

        setTimeout(function () {
          ripple.remove();
        }, 700);
      });
    });

    /* ── Skill item entrance stagger ── */
    const skillItems = document.querySelectorAll('.skill-item');
    const skillObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            const items = entry.target.querySelectorAll('.skill-item');
            items.forEach(function (item, i) {
              item.style.transitionDelay = (i * 40) + 'ms';
              item.style.opacity = '0';
              item.style.transform = 'translateY(10px)';

              requestAnimationFrame(function () {
                setTimeout(function () {
                  item.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
                  item.style.opacity = '1';
                  item.style.transform = 'translateY(0)';
                }, i * 40);
              });
            });
            skillObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    document.querySelectorAll('.skill-category').forEach(function (cat) {
      skillObserver.observe(cat);
    });

  });

})();
