/**
 * certModal.js — Certificate image modal viewer
 */

(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {

    var modal    = document.getElementById('certModal');
    var backdrop = document.getElementById('certModalBackdrop');
    var closeBtn = document.getElementById('certModalClose');
    var img      = document.getElementById('certModalImg');
    var title    = document.getElementById('certModalTitle');
    var issuer   = document.getElementById('certModalIssuer');
    var date     = document.getElementById('certModalDate');

    if (!modal) return;

    /* ── Open ── */
    function openModal(card) {
      img.src        = card.dataset.certImg   || '';
      img.alt        = card.dataset.certTitle || 'Certificate';
      title.textContent  = card.dataset.certTitle  || '';
      issuer.textContent = card.dataset.certIssuer || '';
      date.textContent   = card.dataset.certDate   || '';

      modal.classList.add('open');
      document.body.style.overflow = 'hidden';
      closeBtn.focus();
    }

    /* ── Close ── */
    function closeModal() {
      modal.classList.remove('open');
      document.body.style.overflow = '';
      img.src = ''; // free memory
    }

    /* ── Trigger on cert card click ── */
    document.querySelectorAll('.cert-card[data-cert-img]').forEach(function (card) {
      card.addEventListener('click', function () {
        openModal(card);
      });

      // Keyboard support — Enter or Space
      card.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openModal(card);
        }
      });
    });

    /* ── Close on backdrop click ── */
    backdrop.addEventListener('click', closeModal);

    /* ── Close on X button ── */
    closeBtn.addEventListener('click', closeModal);

    /* ── Close on Escape key ── */
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && modal.classList.contains('open')) {
        closeModal();
      }
    });

  });

})();
