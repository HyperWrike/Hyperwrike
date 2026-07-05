/* ============================================================
   HYPERWRIKE AGENT — chat widget client
   Talks to POST /api/chat  ->  { ok, reply }
   Request: { messages: [{ role:'user'|'assistant', content }] }
   Opened by the FAB, the nav search button (#navSearch), and any
   element with [data-open-agent]. Degrades gracefully if the
   backend / model is unavailable.
   ============================================================ */
(function () {
  'use strict';

  var CALENDAR = 'https://calendar.app.google/BQf3Egpa9gxmyxPb8';
  var EMAIL = 'team@hyperwrike.com';

  var root = document.getElementById('hwChat');
  var fab = document.getElementById('hwChatFab');
  var log = document.getElementById('hwChatLog');
  var form = document.getElementById('hwChatForm');
  var input = document.getElementById('hwChatInput');
  if (!root || !fab || !log || !form || !input) return;

  var sendBtn = form.querySelector('button');
  var history = [];
  var greeted = false;
  var busy = false;

  var WELCOME = "Hi — I'm the Hyperwrike Agent. I help businesses figure out which AI system will recover the most revenue or save the most hours — voice agents, custom CRM, ecommerce AI, or lead generation. What are you working on, and what's eating the most time right now?";
  var CHIPS = [
    'How do AI voice agents work?',
    'Automate my operations / CRM',
    'Book a strategy call'
  ];

  function scrollBottom() { log.scrollTop = log.scrollHeight; }

  // Match URLs and emails, excluding quotes/brackets so nothing can break an attribute.
  var LINK_RE = /(https?:\/\/[^\s<>"'`]+|[^\s<>"'`@]+@[^\s<>"'`@]+\.[^\s<>"'`@]+)/g;

  // Build an <a> safely (validated scheme) or a plain text node — never innerHTML.
  function linkNode(token) {
    var isEmail = token.indexOf('@') !== -1 && token.indexOf('://') === -1;
    var a = document.createElement('a');
    try {
      if (isEmail) {
        a.href = 'mailto:' + token;
      } else {
        var u = new URL(token);
        if (u.protocol !== 'http:' && u.protocol !== 'https:') return document.createTextNode(token);
        a.href = u.toString();
      }
    } catch (e) {
      return document.createTextNode(token);
    }
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
    a.textContent = token;          // text only — no markup
    return a;
  }

  // Render text + auto-linked URLs/emails using DOM nodes only (no innerHTML).
  function renderInto(el, text) {
    text = String(text);
    var last = 0, m;
    LINK_RE.lastIndex = 0;
    while ((m = LINK_RE.exec(text)) !== null) {
      if (m.index > last) el.appendChild(document.createTextNode(text.slice(last, m.index)));
      el.appendChild(linkNode(m[0]));
      last = m.index + m[0].length;
    }
    if (last < text.length) el.appendChild(document.createTextNode(text.slice(last)));
  }

  function addMsg(role, text) {
    var d = document.createElement('div');
    d.className = 'hw-msg ' + (role === 'user' ? 'user' : 'bot');
    renderInto(d, text);
    log.appendChild(d);
    scrollBottom();
    return d;
  }

  function addChips() {
    var wrap = document.createElement('div');
    wrap.className = 'hw-chips';
    CHIPS.forEach(function (c) {
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'hw-chip';
      b.textContent = c;
      b.addEventListener('click', function () {
        wrap.remove();
        if (/book/i.test(c)) { window.open(CALENDAR, '_blank', 'noopener'); send('I want to book a strategy call.'); }
        else send(c);
      });
      wrap.appendChild(b);
    });
    log.appendChild(wrap);
    scrollBottom();
  }

  function showTyping() {
    var t = document.createElement('div');
    t.className = 'hw-typing';
    t.id = 'hwTyping';
    t.innerHTML = '<i></i><i></i><i></i>';
    log.appendChild(t);
    scrollBottom();
  }
  function hideTyping() {
    var t = document.getElementById('hwTyping');
    if (t) t.remove();
  }

  function greet() {
    if (greeted) return;
    greeted = true;
    addMsg('bot', WELCOME);
    addChips();
  }

  function open() {
    root.classList.add('open');
    greet();
    setTimeout(function () { input.focus(); }, 250);
  }
  function close() { root.classList.remove('open'); }
  function toggle() { root.classList.contains('open') ? close() : open(); }

  fab.addEventListener('click', toggle);
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && root.classList.contains('open')) close();
  });

  // Nav "search" button + any [data-open-agent] element open the agent.
  var navSearch = document.getElementById('navSearch');
  if (navSearch) navSearch.addEventListener('click', function (e) { e.preventDefault(); open(); });
  document.querySelectorAll('[data-open-agent]').forEach(function (el) {
    el.addEventListener('click', function (e) { e.preventDefault(); open(); });
  });
  // Public hook
  window.HyperwrikeAgent = { open: open, close: close, toggle: toggle };

  function fallback() {
    return "I can't reach my brain right now — but I don't want to keep you waiting. Book a free strategy call at " +
      CALENDAR + ", message us on WhatsApp (+91 94444 20367), or email " + EMAIL + " and a founder will reply within one business day.";
  }

  function send(text) {
    text = (text || '').trim();
    if (!text || busy) return;
    busy = true;
    sendBtn.disabled = true;
    addMsg('user', text);
    history.push({ role: 'user', content: text });
    showTyping();

    fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages: history.slice(-14) })
    })
      .then(function (r) { return r.json().catch(function () { return { ok: false }; }); })
      .then(function (data) {
        hideTyping();
        var reply = (data && data.ok && data.reply) ? data.reply : (data && data.error) || fallback();
        addMsg('bot', reply);
        if (data && data.ok && data.reply) history.push({ role: 'assistant', content: data.reply });
      })
      .catch(function () {
        hideTyping();
        addMsg('bot', fallback());
      })
      .finally(function () {
        busy = false;
        sendBtn.disabled = false;
        input.focus();
      });
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var v = input.value;
    input.value = '';
    send(v);
  });
})();
