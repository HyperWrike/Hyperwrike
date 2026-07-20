/* ============================================================
   HYPERWRIKE — interactions
   ============================================================ */
(function () {
  'use strict';

  /* ---------- mobile menu ---------- */
  var burger = document.getElementById('burger');
  var menu = document.getElementById('mobileMenu');
  if (burger && menu) {
    burger.addEventListener('click', function () { menu.classList.toggle('open'); });
    menu.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { menu.classList.remove('open'); });
    });
  }

  /* ---------- gauges (animated fill on view) ---------- */
  function buildGauge(el) {
    var value = +el.getAttribute('data-value') || 0;
    var color = el.getAttribute('data-color') || '#C8EF4A';
    var min = el.getAttribute('data-min');
    var max = el.getAttribute('data-max');
    var TICKS = 40, cx = 100, cy = 100, rOuter = 80, rInner = 70;
    var active = Math.round(value / 100 * TICKS);
    var svg = '<svg viewBox="0 0 200 120" style="width:100%;max-width:230px;display:block;margin:auto;">';
    for (var i = 0; i < TICKS; i++) {
      var t = i / (TICKS - 1);
      var ang = Math.PI + t * Math.PI; // 180deg sweep
      var x1 = cx + rInner * Math.cos(ang), y1 = cy + rInner * Math.sin(ang);
      var x2 = cx + rOuter * Math.cos(ang), y2 = cy + rOuter * Math.sin(ang);
      var on = i < active;
      var cls = on ? ' class="g-on"' : '';
      var dl = on ? ' style="transition-delay:' + (i * 22) + 'ms"' : '';
      svg += '<line' + cls + dl + ' x1="' + x1.toFixed(1) + '" y1="' + y1.toFixed(1) + '" x2="' + x2.toFixed(1) + '" y2="' + y2.toFixed(1) +
        '" stroke="' + (on ? color : '#E2DDD0') + '" stroke-width="2.6" stroke-linecap="round"/>';
    }
    svg += '<text class="g-val" data-count="' + value + '" data-suffix="%" x="100" y="103" text-anchor="middle" font-family="Bricolage Grotesque, sans-serif" font-size="26" font-weight="700" fill="#0B0D10" letter-spacing="-0.02em">0%</text>';
    svg += '</svg>';
    if (min != null && max != null) {
      svg += '<div class="lbls"><span>' + min + '</span><span>' + max + '</span></div>';
    }
    el.innerHTML = svg;
  }
  document.querySelectorAll('.gauge').forEach(buildGauge);

  /* ---------- hero node network ---------- */
  (function () {
    var svg = document.getElementById('nodes');
    if (!svg) return;
    var W = 1200, H = 800;
    svg.setAttribute('viewBox', '0 0 ' + W + ' ' + H);
    var N = 26;
    var pts = [];
    for (var i = 0; i < N; i++) {
      pts.push({ x: Math.random() * W, y: Math.random() * H, vx: (Math.random() - .5) * 0.18, vy: (Math.random() - .5) * 0.18 });
    }
    var lineEls = [], dotEls = [];
    var ns = 'http://www.w3.org/2000/svg';
    // links
    for (var a = 0; a < N; a++) {
      for (var b = a + 1; b < N; b++) {
        var l = document.createElementNS(ns, 'line');
        l.setAttribute('stroke', 'rgba(200,239,74,0.55)');
        l.setAttribute('stroke-width', '0.7');
        l._a = a; l._b = b;
        svg.appendChild(l); lineEls.push(l);
      }
    }
    for (var d = 0; d < N; d++) {
      var c = document.createElementNS(ns, 'circle');
      c.setAttribute('r', d % 5 === 0 ? '2.6' : '1.6');
      c.setAttribute('fill', d % 5 === 0 ? '#C8EF4A' : 'rgba(241,237,227,0.55)');
      svg.appendChild(c); dotEls.push(c);
    }
    var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    function frame() {
      for (var i = 0; i < N; i++) {
        var p = pts[i];
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > W) p.vx *= -1;
        if (p.y < 0 || p.y > H) p.vy *= -1;
        dotEls[i].setAttribute('cx', p.x.toFixed(1));
        dotEls[i].setAttribute('cy', p.y.toFixed(1));
      }
      for (var k = 0; k < lineEls.length; k++) {
        var L = lineEls[k], pa = pts[L._a], pb = pts[L._b];
        var dx = pa.x - pb.x, dy = pa.y - pb.y;
        var dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 220) {
          L.setAttribute('x1', pa.x.toFixed(1)); L.setAttribute('y1', pa.y.toFixed(1));
          L.setAttribute('x2', pb.x.toFixed(1)); L.setAttribute('y2', pb.y.toFixed(1));
          L.setAttribute('opacity', (0.5 * (1 - dist / 220)).toFixed(2));
        } else {
          L.setAttribute('opacity', '0');
        }
      }
      if (!reduce) requestAnimationFrame(frame);
    }
    frame();
  })();

  /* ---------- marquee (clients) ---------- */
  (function () {
    var track = document.getElementById('mqTrack');
    if (!track) return;
    var clients = [
      { logo: 'assets/logo-vs-hospitals.png', alt: 'VS Hospitals' },
      { logo: 'assets/logo-panasuna.png', alt: 'Panasuna Chits' },
      { logo: 'assets/logo-jammi.png', alt: 'Jammi Advanced Ayurveda' },
      { word: 'Fixdirectly', sub: 'Lead Gen · US' },
      { logo: 'assets/logo-smartstart.png', alt: 'SmartStart Business Solutions' }
    ];
    var html = '';
    clients.forEach(function (c) {
      if (c.logo) {
        html += '<div class="mq-item"><img class="mq-logo" src="' + c.logo + '" alt="' + c.alt + '"/></div>';
      } else {
        html += '<div class="mq-item mq-text"><span class="mq-word">' + c.word + '</span><span class="mq-sub">' + c.sub + '</span></div>';
      }
    });
    var set = html + html;            // one half — wide enough to cover viewport
    track.innerHTML = set + set;      // two identical halves → seamless -50% loop
  })();

  /* ---------- industries ---------- */
  (function () {
    var grid = document.getElementById('indGrid');
    var tabs = document.getElementById('regionTabs');
    if (!grid || !tabs) return;
    var DATA = {
      india: [
        { n: 'Hospitals & Clinics', d: 'Live', p: 'AI voice agent — appointment booking, reminders & refill outreach in Tanglish. (VS Hospitals)' },
        { n: 'Chit Funds & NBFCs', d: 'Live', p: 'Purpose-built CRM replacing 100+ manual hours a month. (Pannasuna)' },
        { n: 'Pharma Ecommerce', d: 'Live', p: 'Chatbot, abandoned-cart recovery & product recommendations. (Jammi Pharma)' },
        { n: 'IT & B2B Lead Gen', d: 'Live', p: 'Prospect identification, personalised outreach & meeting booking systems.' },
        { n: 'Startup & SME Services', d: 'Live', p: 'AI chatbot for lead capture and qualification. (Smart Start)' },
        { n: 'IT & B2B Services', d: 'Live', p: 'Web scraper for high-intent customer identification.' }
      ],
      uk: [
        { n: 'Law Firms', d: '£12K–30K', p: '24/7 AI intake, case tracker, document AI & automated client updates.' },
        { n: 'Letting & Estate Agents', d: '£8K–20K', p: 'Enquiry capture, compliance calendar AI, renewal bot, landlord portal.' },
        { n: 'IFAs & Mortgage Brokers', d: '£18K–35K', p: 'Lead qualifier, AI proposal builder, onboarding & nurture automation.' },
        { n: 'Care Homes & Domiciliary', d: '£15K–30K', p: 'AI shift scheduler, CQC compliance tracker & family update portal.' },
        { n: 'Recruitment Agencies', d: '£15K–30K', p: 'AI CV screener, candidate pipeline CRM & client outreach automation.' },
        { n: 'Veterinary Clinics', d: '£10K–20K', p: 'Charge-capture AI, recall bot, voice receptionist & no-show reducer.' }
      ],
      us: [
        { n: 'B2B Lead Generation', d: 'Live', p: 'Fully automated SDR platform — scraping, personalised outreach & calendar booking. (Fixdirectly)' },
        { n: 'Home Health Agencies', d: '$18K–35K', p: 'AI shift scheduler, caregiver matching & compliance auto-reporter.' },
        { n: 'Immigration Law Firms', d: '$15K–30K', p: 'Case status bot, document intake AI & USCIS tracker.' },
        { n: 'Freight Brokers', d: '$20K–40K', p: 'AI quote engine, accessorial capture & billing reconciler.' },
        { n: 'Specialty Subcontractors', d: '$15K–30K', p: 'AI bid estimator, change-order tracker & invoice automation.' },
        { n: 'Mental Health Practices', d: '$10K–22K', p: 'Intake AI, waitlist manager & HIPAA-safe notes summariser.' },
        { n: 'Accountancy Firms', d: '$15K–30K', p: 'Client portal, document AI, auto-proposal & deadline tracker.' }
      ],
      eu: [
        { n: 'Mittelstand Manufacturers', d: '€20K–45K', p: 'ISO compliance AI, QA report generator & supplier audit tracker.' },
        { n: 'Steuerberater', d: '€15K–28K', p: 'Client portal, document AI, Elster filing assistant & deadline tracker.' },
        { n: 'NL Accountants', d: '€15K–30K', p: 'Peppol e-invoice AI, BTW reconciler & client onboarding bot.' },
        { n: 'FR Estate Agents', d: '€12K–25K', p: 'Mandat AI manager, diagnostic tracker & Loi Alur compliance AI.' },
        { n: 'Scandi Social Care', d: '€20K–40K', p: 'Care journal AI, municipal billing AI & GDPR-safe client portal.' },
        { n: 'Benelux HR & Payroll', d: '€20K–38K', p: 'Dimona/NSSO AI filer, payroll reconciler & multi-client dashboard.' }
      ]
    };
    function render(region) {
      var items = DATA[region] || [];
      grid.innerHTML = items.map(function (it) {
        return '<div class="ind"><div class="iname">' + it.n + '<span class="ideal">' + it.d + '</span></div><div class="ipain">' + it.p + '</div></div>';
      }).join('');
    }
    render('india');
    tabs.querySelectorAll('.region-tab').forEach(function (t) {
      t.addEventListener('click', function () {
        tabs.querySelectorAll('.region-tab').forEach(function (x) { x.classList.remove('on'); });
        t.classList.add('on');
        render(t.getAttribute('data-region'));
      });
    });
  })();

  /* ---------- count-up helper ---------- */
  function countUp(el) {
    if (el._counted) return; el._counted = true;
    var target = parseFloat(el.getAttribute('data-count'));
    if (isNaN(target)) return;
    var suffix = el.getAttribute('data-suffix') || '';
    var prefix = el.getAttribute('data-prefix') || '';
    var dur = 1100, start = performance.now();
    var hasComma = target >= 1000;
    function fmt(n) {
      var v = Math.round(n);
      return hasComma ? v.toLocaleString('en-US') : String(v);
    }
    function tick(now) {
      var p = Math.min(1, (now - start) / dur);
      var e = 1 - Math.pow(1 - p, 3); // easeOutCubic
      el.textContent = prefix + fmt(target * e) + suffix;
      if (p < 1) requestAnimationFrame(tick);
      else el.textContent = prefix + fmt(target) + suffix;
    }
    requestAnimationFrame(tick);
  }

  /* ---------- scroll reveal + stagger + gauge + count ---------- */
  (function () {
    var els = document.querySelectorAll('.reveal, .stagger, .gauge');
    function activate(t) {
      t.classList.add('in');
      // stagger children
      if (t.classList.contains('stagger')) {
        var kids = t.children, n = 0;
        for (var i = 0; i < kids.length; i++) {
          (function (k, idx) { setTimeout(function () { k.classList.add('in'); }, idx * 90); })(kids[i], n++);
        }
      }
      // gauge fill
      if (t.classList.contains('gauge')) {
        t.classList.add('lit');
        var v = t.querySelector('.g-val'); if (v) countUp(v);
      }
      // count-ups inside
      t.querySelectorAll('[data-count]').forEach(countUp);
      if (t.hasAttribute('data-count')) countUp(t);
    }
    if (!('IntersectionObserver' in window)) {
      els.forEach(activate); return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { activate(en.target); io.unobserve(en.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    els.forEach(function (e) { io.observe(e); });
  })();

  /* ---------- scroll progress bar ---------- */
  (function () {
    var bar = document.getElementById('scrollbar');
    if (!bar) return;
    function upd() {
      var h = document.documentElement.scrollHeight - window.innerHeight;
      var p = h > 0 ? (window.scrollY / h) : 0;
      bar.style.transform = 'scaleX(' + p.toFixed(4) + ')';
    }
    window.addEventListener('scroll', upd, { passive: true });
    window.addEventListener('resize', upd);
    upd();
  })();

  /* ---------- hero parallax on dashboard ---------- */
  (function () {
    var dash = document.querySelector('.dash');
    var hero = document.querySelector('.hero');
    if (!dash || !hero || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    var ticking = false;
    function upd() {
      var r = hero.getBoundingClientRect();
      var prog = Math.max(0, Math.min(1, -r.top / (r.height || 1)));
      dash.style.transform = 'translateY(' + (prog * -42) + 'px)';
      ticking = false;
    }
    window.addEventListener('scroll', function () {
      if (!ticking) { ticking = true; requestAnimationFrame(upd); }
    }, { passive: true });
    upd();
  })();

  /* ---------- nav condense on scroll ---------- */
  (function () {
    var nav = document.querySelector('.nav');
    if (!nav) return;
    window.addEventListener('scroll', function () {
      if (window.scrollY > 40) nav.classList.add('scrolled');
      else nav.classList.remove('scrolled');
    }, { passive: true });
  })();

  /* ---------- testimonial video carousel ---------- */
  (function () {
    var track = document.querySelector('.testimonial-carousel-track');
    if (!track) return;

    var originalCards = Array.from(track.children);
    if (originalCards.length === 0) return;

    // Clone the set of cards twice to ensure seamless infinite scrolling even on large screens
    for (var i = 0; i < 2; i++) {
      originalCards.forEach(function (card) {
        var clone = card.cloneNode(true);
        track.appendChild(clone);
      });
    }

    // Add scrolling class to trigger CSS keyframe animation
    track.classList.add('scrolling');

    // Set up hover-to-play, hover-to-scale, and click-to-mute/unmute
    var cards = track.querySelectorAll('.testimonial-video-card');
    cards.forEach(function (card) {
      var video = card.querySelector('video');
      if (!video) return;

      video.loop = true;
      video.playsInline = true;
      video.controls = false;

      // Hover controls
      card.addEventListener('mouseenter', function () {
        video.muted = false; // Attempt to play with sound
        video.play().catch(function (err) {
          console.warn("Testimonial video play with sound blocked. Falling back to muted:", err);
          video.muted = true;
          video.play().catch(function(e) {
             console.warn("Muted playback also blocked:", e);
          });
        });
      });

      card.addEventListener('mouseleave', function () {
        video.pause();
      });

      // Click to toggle mute/unmute
      card.addEventListener('click', function () {
        video.muted = !video.muted;
      });
    });
  })();

})();

