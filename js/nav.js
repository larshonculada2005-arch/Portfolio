/**
 * nav.js — Navigation: scroll effects, active link, hamburger
 */

(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {
    const navbar     = document.getElementById('navbar');
    const hamburger  = document.getElementById('hamburger');
    const navLinks   = document.getElementById('navLinks');
    const allLinks   = document.querySelectorAll('.nav-link');
    const backToTop  = document.getElementById('backToTop');

    /* ── Scroll: navbar shadow + back-to-top ── */
    function onScroll() {
      const scrollY = window.scrollY;

      // Navbar shadow
      if (navbar) {
        navbar.classList.toggle('scrolled', scrollY > 20);
      }

      // Back to top button
      if (backToTop) {
        backToTop.classList.toggle('visible', scrollY > 500);
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // run once on load

    /* ── Back to top ── */
    if (backToTop) {
      backToTop.addEventListener('click', function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }

    /* ── Hamburger menu ── */
    if (hamburger && navLinks) {
      hamburger.addEventListener('click', function () {
        const isOpen = navLinks.classList.toggle('open');
        hamburger.classList.toggle('open', isOpen);
        hamburger.setAttribute('aria-expanded', String(isOpen));
        document.body.style.overflow = isOpen ? 'hidden' : '';
      });

      // Close on link click
      navLinks.addEventListener('click', function (e) {
        if (e.target.classList.contains('nav-link')) {
          closeMenu();
        }
      });

      // Close on outside click
      document.addEventListener('click', function (e) {
        if (!navbar.contains(e.target)) {
          closeMenu();
        }
      });

      // Close on Escape
      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') closeMenu();
      });
    }

    function closeMenu() {
      if (!navLinks) return;
      navLinks.classList.remove('open');
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }

    /* ── Active link on scroll ── */
    const sections = Array.from(
      document.querySelectorAll('section[id], .hero[id]')
    );

    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            allLinks.forEach(function (link) {
              const href = link.getAttribute('href');
              link.classList.toggle('active', href === '#' + id);
            });
          }
        });
      },
      {
        root: null,
        rootMargin: '-40% 0px -55% 0px',
        threshold: 0,
      }
    );

    sections.forEach(function (section) {
      observer.observe(section);
    });

    /* ── Smooth scroll for anchor links ── */
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
      anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const target = document.querySelector(targetId);
        if (!target) return;

        e.preventDefault();
        const navH = navbar ? navbar.offsetHeight : 0;
        const targetY = target.getBoundingClientRect().top + window.scrollY - navH;
        window.scrollTo({ top: targetY, behavior: 'smooth' });
      });
    });

  });

})();
