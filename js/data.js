/**
 * data.js — Central configuration file
 * ─────────────────────────────────────────────────────────────
 * Edit this file to update personal info, projects, skills,
 * and education without touching HTML or other JS files.
 */

const PORTFOLIO_DATA = {

  /* ─── Personal Info ─────────────────────────────────────── */
  personal: {
    name:      'Lars Steve',
    initials:  'LS',
    tagline:   'Student Developer & Aspiring Software Engineer',
    email:     'larshonculada2005@gmail.com',
    github:    'https://github.com/yourusername',
    linkedin:  'https://linkedin.com/in/yourusername',
    location:  'Davao City, Philippines',
    resumeUrl: 'assets/resume.pdf',
    bio: [
      "I'm a 2nd year BSIT student at Holy Cross of Davao College with a strong passion for creating software that makes a difference.",
      "Building real-world projects in web, mobile, and software development while growing my skills every day.",
    ],
  },

  /* ─── Typewriter Strings ────────────────────────────────── */
  typewriterStrings: [
    'Student Developer',
    'Aspiring Software Engineer',
    'Web Developer',
    'Android Developer',
    'Problem Solver',
  ],

  /* ─── Skills ────────────────────────────────────────────── */
  // (Currently rendered in HTML for SVG icon support.
  //  Add/remove skills by editing the HTML skills section.)

  /* ─── Projects ──────────────────────────────────────────── */
  // (Currently rendered in HTML for layout flexibility.
  //  Update project cards directly in index.html.)

  /* ─── Education ─────────────────────────────────────────── */
  // (Currently rendered in HTML for timeline layout.
  //  Update timeline items directly in index.html.)

};

// Expose globally so other scripts can use it
window.PORTFOLIO_DATA = PORTFOLIO_DATA;
