/**
 * contact.js — Contact form validation and submission handling
 *
 * By default the form logs the data and shows a success message
 * (no backend). To wire up a real backend or service like Formspree,
 * replace the contents of handleSubmit() with your fetch() call.
 */

(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {
    const form       = document.getElementById('contactForm');
    const submitBtn  = document.getElementById('submitBtn');
    const successBox = document.getElementById('formSuccess');
    if (!form) return;

    /* ── Field references ── */
    const fields = {
      name:    { el: document.getElementById('name'),    error: document.getElementById('nameError')    },
      email:   { el: document.getElementById('email'),   error: document.getElementById('emailError')   },
      subject: { el: document.getElementById('subject'), error: document.getElementById('subjectError') },
      message: { el: document.getElementById('message'), error: document.getElementById('messageError') },
    };

    /* ── Validators ── */
    const validators = {
      name:    function (v) { return v.trim().length >= 2 ? '' : 'Please enter your name (at least 2 characters).'; },
      email:   function (v) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) ? '' : 'Please enter a valid email address.'; },
      subject: function (v) { return v.trim().length >= 4 ? '' : 'Please enter a subject (at least 4 characters).'; },
      message: function (v) { return v.trim().length >= 10 ? '' : 'Please write a message (at least 10 characters).'; },
    };

    /* ── Show / clear field error ── */
    function setError(key, msg) {
      const { el, error } = fields[key];
      if (msg) {
        el.classList.add('invalid');
        error.textContent = msg;
      } else {
        el.classList.remove('invalid');
        error.textContent = '';
      }
    }

    /* ── Validate a single field ── */
    function validateField(key) {
      const value = fields[key].el.value;
      const msg   = validators[key](value);
      setError(key, msg);
      return msg === '';
    }

    /* ── Validate all fields ── */
    function validateAll() {
      return Object.keys(fields).map(validateField).every(Boolean);
    }

    /* ── Live validation on blur ── */
    Object.keys(fields).forEach(function (key) {
      fields[key].el.addEventListener('blur', function () {
        validateField(key);
      });
      fields[key].el.addEventListener('input', function () {
        if (fields[key].el.classList.contains('invalid')) {
          validateField(key);
        }
      });
    });

    /* ── Form submit ── */
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      if (!validateAll()) return;

      // Collect data
      const data = {
        name:    fields.name.el.value.trim(),
        email:   fields.email.el.value.trim(),
        subject: fields.subject.el.value.trim(),
        message: fields.message.el.value.trim(),
      };

      handleSubmit(data);
    });

    /* ── Submit handler ─────────────────────────────────────────
     * Replace this with a real backend call. Examples:
     *
     * Formspree (no backend needed):
     *   fetch('https://formspree.io/f/YOUR_FORM_ID', {
     *     method: 'POST',
     *     headers: { 'Accept': 'application/json' },
     *     body: JSON.stringify(data),
     *   }).then(...).catch(...)
     *
     * Your own PHP endpoint:
     *   fetch('mail.php', { method: 'POST', body: new FormData(form) })
     * ─────────────────────────────────────────────────────────── */
    function handleSubmit(data) {
      setLoading(true);

      var formData = new FormData();
      formData.append('name',    data.name);
      formData.append('email',   data.email);
      formData.append('subject', data.subject);
      formData.append('message', data.message);

      fetch('mail.php', {
        method: 'POST',
        body: formData,
      })
        .then(function (res) { return res.json(); })
        .then(function (result) {
          setLoading(false);
          if (result.success) {
            showSuccess('✓ Message sent! I\'ll get back to you soon.');
            form.reset();
            Object.keys(fields).forEach(function (key) {
              fields[key].el.classList.remove('invalid');
              fields[key].error.textContent = '';
            });
          } else {
            showSuccess('✗ ' + result.message);
          }
        })
        .catch(function () {
          setLoading(false);
          showSuccess('✗ Something went wrong. Please email me directly.');
        });
    }

    function setLoading(loading) {
      if (!submitBtn) return;
      submitBtn.disabled = loading;
      const icon = submitBtn.querySelector('i');
      const text = submitBtn.querySelector('span');
      if (loading) {
        if (icon) icon.className = 'ph ph-circle-notch';
        if (text) text.textContent = 'Sending…';
        submitBtn.style.opacity = '0.7';
      } else {
        if (icon) icon.className = 'ph ph-paper-plane-tilt';
        if (text) text.textContent = 'Send Message';
        submitBtn.style.opacity = '';
      }
    }

    function showSuccess(msg) {
      if (!successBox) return;
      successBox.textContent = msg || '✓ Message sent!';
      successBox.classList.add('show');
      setTimeout(function () {
        successBox.classList.remove('show');
      }, 5000);
    }

  });

})();
