(function () {
  'use strict';

  // ============================================
  // HEADER & MOBILE MENU
  // ============================================
  var header = document.querySelector('.site-header');
  var btn = document.querySelector('.menu-btn');
  var nav = document.getElementById('nav');

  function setMenu(open) {
    if (!nav || !btn) return;
    nav.classList.toggle('open', open);
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    btn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  }

  if (btn) {
    btn.addEventListener('click', function () {
      setMenu(!nav.classList.contains('open'));
    });
  }

  if (nav) {
    nav.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') setMenu(false);
    });
  }

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') setMenu(false);
  });

  // Sticky header shadow/blur state on scroll
  if (header) {
    window.addEventListener('scroll', function () {
      header.classList.toggle('stuck', window.scrollY > 20);
    }, { passive: true });
  }

  // ============================================
  // YEAR IN FOOTER
  // ============================================
  var yr = document.getElementById('yr');
  if (yr) yr.textContent = new Date().getFullYear();

  // ============================================
  // SCROLL REVEAL
  // ============================================
  var rv = document.querySelectorAll('.rv');
  if ('IntersectionObserver' in window && rv.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          en.target.classList.add('in');
          io.unobserve(en.target);
        }
      });
    }, { threshold: 0.15 });
    rv.forEach(function (el) { io.observe(el); });
  } else {
    rv.forEach(function (el) { el.classList.add('in'); });
  }

  // ============================================
  // COUNT-UP STATS
  // ============================================
  var counted = false;
  var stats = document.querySelector('.stats');

  function count() {
    document.querySelectorAll('[data-n]').forEach(function (el) {
      var end = +el.dataset.n;
      var suf = el.dataset.s || '';
      var t0 = null;
      function step(t) {
        if (!t0) t0 = t;
        var p = Math.min((t - t0) / 1400, 1);
        el.textContent = Math.round(end * p) + suf;
        if (p < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    });
  }

  if (stats) {
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (e, o) {
        if (e[0].isIntersecting && !counted) {
          counted = true;
          count();
          o.disconnect();
        }
      }).observe(stats);
    } else {
      count();
    }
  }

  // ============================================
  // SMOOTH SCROLL FOR ANCHOR LINKS
  // (Handles "Back to top", logo home link, and all nav links)
  // ============================================
  // Native CSS `scroll-behavior: smooth` handles this, but we add
  // a small helper for the logo and back-to-top so the fixed header
  // offset (scroll-padding-top) is respected.
  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener('click', function (e) {
      var href = link.getAttribute('href');
      if (!href || href === '#' || href === '#top') {
        // For #top, scroll to the very top of the document
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
        // If mobile menu is open, close it
        setMenu(false);
        // Move focus to main content for accessibility
        var main = document.getElementById('main');
        if (main) {
          main.setAttribute('tabindex', '-1');
          main.focus({ preventScroll: true });
        }
        return;
      }
      var target = document.querySelector(href);
      if (target) {
        // Let CSS scroll-padding-top handle the offset
        // Close mobile menu if open
        setMenu(false);
      }
    });
  });

  // ============================================
  // FORMSPREE AJAX FORMS
  // ============================================
  document.querySelectorAll('[data-form]').forEach(function (form) {
    var status = form.querySelector('.status');
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (status) status.textContent = 'Sending...';

      // Basic client-side validation guard
      if (!form.checkValidity()) {
        if (status) status.textContent = 'Please fill in all required fields.';
        form.reportValidity();
        return;
      }

      fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' }
      })
        .then(function (r) {
          if (r.ok) {
            form.reset();
            if (status) status.textContent = 'Thank you. We received your message and will reply soon.';
          } else {
            if (status) status.textContent = 'Something went wrong. Please email Jgjanitorialcleaningservices@gmail.com or call 437 226 9239.';
          }
        })
        .catch(function () {
          if (status) status.textContent = 'Network error. Please try again or call 437 226 9239.';
        });
    });
  });

  // ============================================
  // ACTIVE NAV LINK HIGHLIGHT (optional, progressive enhancement)
  // ============================================
  var sections = document.querySelectorAll('section[id]');
  var navLinks = document.querySelectorAll('nav a[href^="#"]');

  if ('IntersectionObserver' in window && sections.length && navLinks.length) {
    var activeObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var id = entry.target.getAttribute('id');
          navLinks.forEach(function (link) {
            var isActive = link.getAttribute('href') === '#' + id;
            link.classList.toggle('is-active', isActive);
            if (isActive) {
              link.setAttribute('aria-current', 'location');
            } else {
              link.removeAttribute('aria-current');
            }
          });
        }
      });
    }, { rootMargin: '-40% 0px -50% 0px', threshold: 0 });
    sections.forEach(function (s) { activeObserver.observe(s); });
  }
})();