/* ============================================================
   Park Kyungsun — portfolio interactions
   ============================================================ */
(function () {
  'use strict';

  var top = document.getElementById('top');
  var toggle = document.getElementById('navToggle');
  var nav = document.getElementById('nav');
  var links = Array.prototype.slice.call(document.querySelectorAll('.nav__link'));

  /* ---------- mobile nav toggle ---------- */
  function closeMenu() {
    top.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
  }
  toggle.addEventListener('click', function () {
    var open = top.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(open));
  });
  nav.addEventListener('click', function (e) {
    if (e.target.closest('.nav__link')) closeMenu();
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeMenu();
  });

  /* ---------- scrollspy: highlight active nav link ---------- */
  var linkById = {};
  links.forEach(function (l) {
    var id = l.getAttribute('href').slice(1);
    if (id) linkById[id] = l;
  });
  var sections = Object.keys(linkById)
    .map(function (id) { return document.getElementById(id); })
    .filter(Boolean);

  if ('IntersectionObserver' in window) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          links.forEach(function (l) { l.classList.remove('is-active'); });
          var active = linkById[entry.target.id];
          if (active) active.classList.add('is-active');
        }
      });
    }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });
    sections.forEach(function (s) { spy.observe(s); });
  }

  /* ---------- reveal on scroll ---------- */
  var reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var revObs = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in');
          obs.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    reveals.forEach(function (r) { revObs.observe(r); });
  } else {
    reveals.forEach(function (r) { r.classList.add('is-in'); });
  }
})();
