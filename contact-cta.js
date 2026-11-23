/* Hyperwrike contact bar: call / text / WhatsApp on every page.
 * Loaded by /analytics.js (which every page already includes), so no HTML edits are needed.
 * Clicks are tracked by the listener in analytics.js (phone_click / sms_click / whatsapp_click).
 *
 * Numbers:
 *   US    +1 681 200 9906  -> TEXT (SMS) ONLY. No calls, no WhatsApp on this number.
 *   India +91 94444 20367  -> call + WhatsApp.
 * Visitors in the Americas see "Text us" (US number) first; everyone else sees "Call" (India) first. */
(function () {
  'use strict';
  if (window.__hwContactBar) return;
  window.__hwContactBar = true;

  var US_SMS = { num: '+16812009906', label: '+1 (681) 200-9906' };
  var INDIA = { tel: '+919444420367', label: '+91 94444 20367', wa: '919444420367' };
  var KEY = 'hw_cta_closed';

  function closed() { try { return sessionStorage.getItem(KEY) === '1'; } catch (e) { return false; } }
  if (closed()) return;

  var tz = '';
  try { tz = Intl.DateTimeFormat().resolvedOptions().timeZone || ''; } catch (e) {}
  var americas = /^America\//.test(tz) || /^Canada\//.test(tz) || /^US\//.test(tz);

  var page = location.pathname;
  var msg = "Hi Hyperwrike, I'd like to talk about an AI project for my business. Page: " + page;
  // "?&body=" works on both iOS and Android messaging apps.
  var smsHref = 'sms:' + US_SMS.num + '?&body=' + encodeURIComponent(msg);
  var telHref = 'tel:' + INDIA.tel;
  var waHref = 'https://wa.me/' + INDIA.wa + '?text=' + encodeURIComponent(msg);

  var ICON_PHONE = '<svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><path fill="currentColor" d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1A17 17 0 0 1 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1l-2.3 2.2z"/></svg>';
  var ICON_SMS = '<svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><path fill="currentColor" d="M4 3h16a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H8l-5 4V5a2 2 0 0 1 1-2zm3 6v2h2V9H7zm4 0v2h2V9h-2zm4 0v2h2V9h-2z"/></svg>';
  var ICON_WA = '<svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><path fill="currentColor" d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2c-1.5 0-3-.4-4.3-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.3-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.4.1-.7.3-.2.3-.9.9-.9 2.1s.9 2.4 1 2.6c.1.2 1.8 2.7 4.3 3.8 1.6.7 2.2.7 3 .6.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2-.1-.1-.3-.2-.5-.3z"/></svg>';

  var BTN_TEXT = '<a class="hw-cta-main" href="' + smsHref + '" aria-label="Text Hyperwrike US ' + US_SMS.label + ' (text only)">' +
    ICON_SMS + '<span>Text us</span><span class="hw-cta-num">' + US_SMS.label + '</span></a>';
  var BTN_CALL = '<a class="hw-cta-main" href="' + telHref + '" aria-label="Call Hyperwrike ' + INDIA.label + '">' +
    ICON_PHONE + '<span>Call</span><span class="hw-cta-num">' + INDIA.label + '</span></a>';
  var BTN_WA = '<a class="hw-cta-wa" href="' + waHref + '" target="_blank" rel="noopener" aria-label="WhatsApp Hyperwrike ' + INDIA.label + '">' +
    ICON_WA + '<span>WhatsApp</span></a>';
  var ALT = americas
    ? '<a class="hw-cta-alt" href="' + telHref + '" aria-label="Call Hyperwrike ' + INDIA.label + '">Call ' + INDIA.label + '</a>'
    : '<a class="hw-cta-alt" href="' + smsHref + '" aria-label="Text Hyperwrike US ' + US_SMS.label + ' (text only)">US text only ' + US_SMS.label + '</a>';

  var css = '' +
    '.hw-cta{position:fixed;left:20px;bottom:20px;z-index:8990;display:flex;align-items:center;gap:6px;' +
    'padding:6px;border-radius:999px;background:#0B0D10;color:#F1EDE3;box-shadow:0 18px 40px -20px rgba(11,13,16,.45),0 0 0 1px rgba(241,237,227,.13);' +
    "font-family:var(--ff-body,'Hanken Grotesk',system-ui,sans-serif);font-size:14px;line-height:1;max-width:calc(100vw - 40px)}" +
    '.hw-cta-lead{padding:0 8px 0 12px;font-weight:600;white-space:nowrap;color:#9DA1A8;font-size:13px}' +
    '.hw-cta a{display:inline-flex;align-items:center;gap:7px;padding:10px 14px;border-radius:999px;text-decoration:none;font-weight:700;white-space:nowrap;' +
    'transition:background .15s ease}' +
    '.hw-cta a:focus-visible,.hw-cta button:focus-visible{outline:2px solid #C8EF4A;outline-offset:2px}' +
    '.hw-cta .hw-cta-main{background:#C8EF4A;color:#0B0D10}.hw-cta .hw-cta-main:hover{background:#D7F76A}' +
    '.hw-cta .hw-cta-wa{background:#1E222A;color:#F1EDE3}.hw-cta .hw-cta-wa:hover{background:#2a2f39}' +
    '.hw-cta .hw-cta-alt{background:transparent;color:#9DA1A8;font-weight:600}.hw-cta .hw-cta-alt:hover{color:#F1EDE3}' +
    '.hw-cta-x{background:transparent;border:0;color:#8A867C;cursor:pointer;width:28px;height:28px;border-radius:50%;font-size:18px;line-height:1;padding:0;flex:none}' +
    '.hw-cta-x:hover{color:#F1EDE3;background:#1E222A}' +
    '@media (max-width:900px){.hw-cta .hw-cta-lead,.hw-cta .hw-cta-alt{display:none}}' +
    '@media (max-width:640px){.hw-cta{left:12px;bottom:12px;max-width:calc(100vw - 24px)}' +
    '.hw-cta.hw-cta-narrow{max-width:calc(100vw - 88px)}' +
    '.hw-cta a{padding:11px 12px;font-size:13px}.hw-cta .hw-cta-num{display:none}}' +
    '@media print{.hw-cta{display:none}}';

  function build() {
    if (document.querySelector('.hw-cta')) return;
    var style = document.createElement('style');
    style.textContent = css;
    document.head.appendChild(style);

    var bar = document.createElement('div');
    bar.className = 'hw-cta';
    bar.setAttribute('role', 'region');
    bar.setAttribute('aria-label', 'Contact Hyperwrike');
    bar.innerHTML =
      '<span class="hw-cta-lead">Talk to an AI consultant</span>' +
      (americas ? BTN_TEXT : BTN_CALL) + BTN_WA + ALT +
      '<button class="hw-cta-x" type="button" aria-label="Hide contact bar">&times;</button>';

    bar.querySelector('.hw-cta-x').addEventListener('click', function () {
      try { sessionStorage.setItem(KEY, '1'); } catch (e) {}
      bar.remove();
    });

    // Leave room for the homepage chat and voice buttons (bottom-right) on phones.
    if (document.querySelector('.hw-chat, .hw-voice')) bar.classList.add('hw-cta-narrow');

    document.body.appendChild(bar);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', build);
  else build();
})();
