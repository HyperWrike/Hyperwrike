/* Hyperwrike analytics (GA4).
 * OWNER: set GA4_ID to your measurement ID (e.g. 'G-ABC123XYZ') to switch tracking on.
 * While it is empty, nothing loads and no cookies are set; hwTrack() is a safe no-op.
 * Consent Mode v2: ads storage always denied; analytics storage denied by default for
 * UK/EEA/Swiss visitors (cookieless pings only) and granted elsewhere. */
(function () {
  'use strict';
  var GA4_ID = '';

  window.dataLayer = window.dataLayer || [];
  function gtag() { window.dataLayer.push(arguments); }
  window.gtag = window.gtag || gtag;

  var attr = (window.hwAttribution && window.hwAttribution.get()) || {};
  window.hwTrack = function (name, params) {
    if (!GA4_ID) return;
    params = params || {};
    if (attr.ai_source && !params.ai_source) params.ai_source = attr.ai_source;
    window.gtag('event', name, params);
  };

  if (GA4_ID) {
    var EEA_UK = ['AT','BE','BG','HR','CY','CZ','DK','EE','FI','FR','DE','GR','HU','IE','IT','LV','LT','LU','MT','NL','PL','PT','RO','SK','SI','ES','SE','IS','LI','NO','GB','CH'];
    gtag('consent', 'default', { ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied', analytics_storage: 'granted' });
    gtag('consent', 'default', { analytics_storage: 'denied', region: EEA_UK });
    gtag('js', new Date());
    gtag('config', GA4_ID, { anonymize_ip: true, ai_source: attr.ai_source || undefined });
    if (attr.ai_source) gtag('set', 'user_properties', { first_ai_source: attr.ai_source });
    var s = document.createElement('script');
    s.async = true; s.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(GA4_ID);
    document.head.appendChild(s);
  }

  // Outbound conversion clicks
  document.addEventListener('click', function (e) {
    var a = e.target && e.target.closest ? e.target.closest('a[href]') : null;
    if (!a) return;
    var h = a.getAttribute('href') || '';
    if (h.indexOf('wa.me/') !== -1) window.hwTrack('whatsapp_click', { link_url: h.split('?')[0], page: location.pathname });
    else if (h.indexOf('calendar.app.google') !== -1) window.hwTrack('calendar_click', { page: location.pathname });
    else if (h.indexOf('mailto:') === 0) window.hwTrack('email_click', { page: location.pathname });
    else if (h.indexOf('tel:') === 0) window.hwTrack('phone_click', { page: location.pathname });
  }, true);
})();
