/* ============================================================
   HYPERWRIKE — sub-page interactions (lean)
   ============================================================ */
(function () {
  'use strict';

  /* mobile menu (if present) */
  var burger = document.getElementById('burger');
  var menu = document.getElementById('mobileMenu');
  if (burger && menu) {
    burger.addEventListener('click', function () { menu.classList.toggle('open'); });
  }

  /* count-up */
  function countUp(el) {
    if (el._c) return; el._c = true;
    var target = parseFloat(el.getAttribute('data-count'));
    if (isNaN(target)) return;
    var suffix = el.getAttribute('data-suffix') || '';
    var prefix = el.getAttribute('data-prefix') || '';
    var dur = 1100, start = performance.now(), comma = target >= 1000;
    function fmt(n) { var v = Math.round(n); return comma ? v.toLocaleString('en-US') : String(v); }
    function tick(now) {
      var p = Math.min(1, (now - start) / dur), e = 1 - Math.pow(1 - p, 3);
      el.textContent = prefix + fmt(target * e) + suffix;
      if (p < 1) requestAnimationFrame(tick); else el.textContent = prefix + fmt(target) + suffix;
    }
    requestAnimationFrame(tick);
  }

  /* reveal + stagger + count */
  (function () {
    var els = document.querySelectorAll('.reveal, .stagger');
    function activate(t) {
      t.classList.add('in');
      if (t.classList.contains('stagger')) {
        var kids = t.children;
        for (var i = 0; i < kids.length; i++) {
          (function (k, idx) { setTimeout(function () { k.classList.add('in'); }, idx * 85); })(kids[i], i);
        }
      }
      t.querySelectorAll('[data-count]').forEach(countUp);
      if (t.hasAttribute('data-count')) countUp(t);
    }
    if (!('IntersectionObserver' in window)) { els.forEach(activate); return; }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { activate(en.target); io.unobserve(en.target); } });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    els.forEach(function (e) { io.observe(e); });
  })();

  /* scroll progress */
  (function () {
    var bar = document.getElementById('scrollbar');
    if (!bar) return;
    function upd() {
      var h = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.transform = 'scaleX(' + (h > 0 ? (window.scrollY / h) : 0).toFixed(4) + ')';
    }
    window.addEventListener('scroll', upd, { passive: true });
    window.addEventListener('resize', upd); upd();
  })();

  /* nav shadow on scroll */
  (function () {
    var nav = document.querySelector('.sp-nav');
    if (!nav) return;
    window.addEventListener('scroll', function () {
      nav.classList.toggle('scrolled', window.scrollY > 20);
    }, { passive: true });
  })();

})();
