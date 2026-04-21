/* cursor-effects.js — Spotlight + Magnetic Tilt */

(function () {
  // Skip on touch-only devices
  if (window.matchMedia('(hover: none)').matches) return;

  /* ── Spotlight ─────────────────────────────────── */
  const spotStyle = document.createElement('style');
  spotStyle.textContent =
    '#cursor-spotlight{' +
      'position:fixed;inset:0;pointer-events:none;z-index:0;' +
      'background:radial-gradient(520px circle at var(--mx,-9999px) var(--my,-9999px),' +
        'rgba(192,112,64,.13) 0%,transparent 70%);' +
    '}';
  document.head.appendChild(spotStyle);

  const spot = document.createElement('div');
  spot.id = 'cursor-spotlight';
  document.body.appendChild(spot);

  document.addEventListener('mousemove', function (e) {
    spot.style.setProperty('--mx', e.clientX + 'px');
    spot.style.setProperty('--my', e.clientY + 'px');
  }, { passive: true });

  /* ── Magnetic Tilt ──────────────────────────────── */
  document.querySelectorAll('.card').forEach(function (card) {
    card.addEventListener('mouseenter', function () {
      // Remove transform from transition so tilt is instant
      card.style.transition = 'opacity 0.5s ease, box-shadow 0.15s ease';
    });

    card.addEventListener('mousemove', function (e) {
      var r = card.getBoundingClientRect();
      var x = ((e.clientX - r.left) / r.width  - 0.5) * 12;
      var y = ((e.clientY - r.top)  / r.height - 0.5) * 12;
      card.style.transform =
        'perspective(700px) rotateY(' + x + 'deg) rotateX(' + (-y) + 'deg)';
      card.style.boxShadow =
        (-x * 1.5) + 'px ' + (y * 1.5) + 'px 28px rgba(192,112,64,.18)';
    }, { passive: true });

    card.addEventListener('mouseleave', function () {
      card.style.transition =
        'opacity 0.5s ease, transform 0.45s ease, box-shadow 0.45s ease';
      card.style.transform = '';
      card.style.boxShadow = '';
      // Restore CSS-controlled transitions after reset completes
      setTimeout(function () { card.style.transition = ''; }, 460);
    });
  });
})();
