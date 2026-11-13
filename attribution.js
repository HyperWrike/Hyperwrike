/* Hyperwrike first-touch attribution.
 * Captures where this session came from (referrer, landing page, UTM tags, AI engine)
 * once per browser session, so leads sent to /api/lead carry their source.
 * No personal data is collected here. */
(function () {
  'use strict';
  var KEY = 'hw_ft';
  var AI = {
    'chatgpt.com': 'chatgpt', 'chat.openai.com': 'chatgpt', 'openai.com': 'chatgpt',
    'perplexity.ai': 'perplexity', 'www.perplexity.ai': 'perplexity',
    'gemini.google.com': 'gemini', 'bard.google.com': 'gemini',
    'copilot.microsoft.com': 'copilot', 'edgeservices.bing.com': 'copilot',
    'claude.ai': 'claude', 'you.com': 'you', 'phind.com': 'phind', 'meta.ai': 'meta-ai'
  };
  function aiFrom(host, utm) {
    host = (host || '').toLowerCase().replace(/^www\./, '');
    for (var h in AI) { if (host === h.replace(/^www\./, '') || host.slice(-(h.length + 1)) === '.' + h) return AI[h]; }
    var u = (utm || '').toLowerCase();
    for (var k in AI) { if (u && (u === AI[k] || u.indexOf(AI[k]) !== -1)) return AI[k]; }
    return '';
  }
  function read() { try { return JSON.parse(sessionStorage.getItem(KEY) || 'null'); } catch (e) { return null; } }
  function capture() {
    var existing = read();
    if (existing) return existing;
    var p; try { p = new URLSearchParams(location.search); } catch (e) { p = { get: function () { return ''; } }; }
    var ref = document.referrer || '', refHost = '';
    try { refHost = ref ? new URL(ref).hostname : ''; } catch (e) {}
    if (refHost === location.hostname) { ref = ''; refHost = ''; }
    var data = {
      referrer: ref.slice(0, 300),
      landing_page: (location.pathname + location.search).slice(0, 300),
      utm_source: (p.get('utm_source') || '').slice(0, 100),
      utm_medium: (p.get('utm_medium') || '').slice(0, 100),
      utm_campaign: (p.get('utm_campaign') || '').slice(0, 100),
      utm_term: (p.get('utm_term') || '').slice(0, 100),
      utm_content: (p.get('utm_content') || '').slice(0, 100),
      ai_source: aiFrom(refHost, p.get('utm_source')),
      first_seen: new Date().toISOString()
    };
    try { sessionStorage.setItem(KEY, JSON.stringify(data)); } catch (e) {}
    return data;
  }
  var ft = capture();
  window.hwAttribution = { get: function () { return read() || ft; } };
})();
