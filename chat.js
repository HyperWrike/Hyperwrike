(function () {
  'use strict';

  var CALENDAR = 'https://calendar.app.google/BQf3Egpa9gxmyxPb8';
  var WHATSAPP = 'https://wa.me/919444420367?text=Hi%20Hyperwrike%2C%20I%27d%20like%20to%20talk%20about%20an%20AI%20system%20for%20my%20business.';
  var WHATSAPP2 = 'https://wa.me/918978027188?text=Hi%20Hyperwrike%2C%20I%27d%20like%20to%20talk%20about%20an%20AI%20system.';
  var EMAIL = 'team@hyperwrike.com';
  var PHONE = '+91 94444 20367';
  var PHONE2 = '+91 89780 27188';

  var KNOWLEDGE = {
    offers: [
      { id: 'med-spa', name: 'Med Spas & Aesthetic Clinics', url: 'offers/med-spa-ai.html', price: '$10K–$25K/month', tagline: 'AI receptionist answers every call, books into your system, runs reminder sequences, and reactivates lapsed patients.', result: 'Instant replies · fewer no-shows · lapsed patients rebooked' },
      { id: 'roofing', name: 'Roofing Companies', url: 'offers/roofing-ai.html', price: '$5K–$15K/month', tagline: 'AI voice agent answers every storm call, qualifies damage, and books inspections in geographic clusters.', result: 'Every storm call answered · every estimate followed up' },
      { id: 'hvac', name: 'HVAC Companies', url: 'offers/hvac-ai.html', price: '$5K–$12K/month', tagline: 'AI voice agent answers every call, routes emergencies, and books maintenance contracts 24/7.', result: '24/7 emergency coverage · maintenance contracts booked' },
      { id: 'dental', name: 'Private Dental Clinics', url: 'offers/dental-ai.html', price: '$8K–$20K/month', tagline: 'AI dental receptionist captures every call, runs systematic recall, and prevents no-shows.', result: 'Every new-patient call captured · recall on autopilot' },
      { id: 'freight', name: 'Freight Brokers & 3PLs', url: 'offers/freight-ai.html', price: '$15K–$40K/month', tagline: 'AI document processing for bills of lading, PODs and invoices, keyed straight into your TMS.', result: 'Less manual data entry · faster quotes' },
      { id: 'mortgage', name: 'Mortgage Brokers', url: 'offers/mortgage-ai.html', price: '$10K–$25K/month', tagline: 'AI calls every new enquiry within 60 seconds, pre-qualifies, and collects documents automatically.', result: 'Every new enquiry called within 60 seconds' },
      { id: 'real-estate', name: 'Real Estate & Property Managers', url: 'offers/real-estate-ai.html', price: '$10K–$25K/month', tagline: 'AI responds instantly to after-hours enquiries, qualifies buyers, and books viewings.', result: 'Instant WhatsApp replies · viewings booked 24/7' }
    ],
    industries: {
      india: [
        { n: 'Hospitals & Clinics', d: 'Live', p: 'AI voice agent — appointment booking, reminders & refill outreach in Tanglish. (VS Hospitals)' },
        { n: 'Chit Funds & NBFCs', d: 'Live', p: 'Purpose-built CRM replacing 100+ manual hours a month. (Panasuna)' },
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
        { n: 'Steuerberater (Tax Advisors)', d: '€15K–28K', p: 'Client portal, document AI, Elster filing assistant & deadline tracker.' },
        { n: 'NL Accountants', d: '€15K–30K', p: 'Peppol e-invoice AI, BTW reconciler & client onboarding bot.' },
        { n: 'FR Estate Agents', d: '€12K–25K', p: 'Mandat AI manager, diagnostic tracker & Loi Alur compliance AI.' },
        { n: 'Scandi Social Care', d: '€20K–40K', p: 'Care journal AI, municipal billing AI & GDPR-safe client portal.' },
        { n: 'Benelux HR & Payroll', d: '€20K–38K', p: 'Dimona/NSSO AI filer, payroll reconciler & multi-client dashboard.' }
      ]
    },
    process: [
      { num: '01', days: 'Day 1–2', title: 'Discovery', desc: 'We map your workflow, find every manual task, cost each one, and rank by impact. You know what we will fix before we start.' },
      { num: '02', days: 'Day 3–5', title: 'Architecture', desc: 'A complete blueprint — every component, integration, and workflow — approved by you before any build begins.' },
      { num: '03', days: 'Day 6–18', title: 'Build', desc: 'Fast, visible progress. Every module ships as a 2-minute Loom. You test in staging before anything goes live.' },
      { num: '04', days: 'Day 19–21', title: 'Deploy & Train', desc: 'Go live with a recorded training library and a full handover doc. The system runs from day one.' },
      { num: '05', days: 'Ongoing', title: 'Retainer', desc: 'We stay. We monitor, optimise, and expand the system as your business grows. We are your AI operations team.' }
    ],
    testimonials: [
      { name: 'VS Hospitals', role: 'Healthcare · India', quote: 'Zero missed calls since day one. AI voice agent handles patients in their own language.' },
      { name: 'Jammi Pharma', role: 'Pharma Ecommerce · India', quote: '100+ hours saved every month with AI chatbot and abandoned-cart recovery.' },
      { name: 'Panasuna Chits', role: 'Chit Fund · India', quote: 'The system does in seconds what took our team hours.' },
      { name: 'Smart Start Business', role: 'Startup Services · India', quote: 'AI automation that actually works — lead capture and qualification on autopilot.' }
    ],
    clients: ['VS Hospitals', 'Panasuna Chits', 'Jammi Advanced Ayurveda', 'Fixdirectly', 'SmartStart Business Solutions'],
    blogs: [
      { title: 'AI Voice Receptionist — Stop Missing Calls', url: 'blog/ai-voice-receptionist-missed-calls.html' },
      { title: 'Custom CRM for Chit Funds — Save 100+ Hours/Month', url: 'blog/custom-crm-chit-funds.html' },
      { title: 'AI SDR — Automated B2B Lead Generation', url: 'blog/ai-sdr-b2b-lead-generation.html' },
      { title: 'AI Intake Software for Law Firms', url: 'blog/law-firm-ai-intake-software.html' },
      { title: 'Reduce Patient No-Shows with AI', url: 'blog/reduce-patient-no-shows-ai.html' }
    ]
  };

  var INTENTS = [
    { patterns: [/voice\s*agent|receptionist|answer.*call|missed\s*call|24\/7|after.?hour/i], key: 'voice_agent', label: 'AI Voice Agents' },
    { patterns: [/crm|operations|automate.*manual|workflow|spreadsheet/i], key: 'crm', label: 'CRM & Operations' },
    { patterns: [/lead\s*gen|sdr|outbound|prospect|generate.*lead/i], key: 'lead_gen', label: 'Lead Generation' },
    { patterns: [/ecommerce|shop|store|cart|abandoned/i], key: 'ecommerce', label: 'Ecommerce AI' },
    { patterns: [/pric(e|ing)|cost|invest|budget|how\s*much|fee|rate|pay/i], key: 'pricing', label: 'Pricing' },
    { patterns: [/book|schedule|calendar|appointment|strategy\s*call|consult/i], key: 'booking', label: 'Book a Call' },
    { patterns: [/testimonial|review|case\s*stud|client|result|success|proof/i], key: 'testimonials', label: 'Testimonials & Results' },
    { patterns: [/process|how.*work|methodology|approach|step|timeline|21\s*day/i], key: 'process', label: 'Our Process' },
    { patterns: [/portfolio|work.*done|project|built|developed|example|showcase/i], key: 'portfolio', label: 'Portfolio & Use Cases' },
    { patterns: [/about|who.*are|team|company|founded|history|story/i], key: 'about', label: 'About Hyperwrike' },
    { patterns: [/contact|reach|phone|whatsapp|email|message|call\s*us/i], key: 'contact', label: 'Contact Us' },
    { patterns: [/med\s*spa|aesthetic|botox|filler|laser|skin|clinic/i], key: 'offer_med-spa', label: 'Med Spa AI' },
    { patterns: [/roof|storm|hail|shingle|roofer/i], key: 'offer_roofing', label: 'Roofing AI' },
    { patterns: [/hvac|heating|cooling|ac|furnace|thermostat|plumb/i], key: 'offer_hvac', label: 'HVAC AI' },
    { patterns: [/dental|dentist|tooth|implant|ortho|oral/i], key: 'offer_dental', label: 'Dental AI' },
    { patterns: [/freight|logistics|3pl|ship|cargo|forward|broker/i], key: 'offer_freight', label: 'Freight AI' },
    { patterns: [/mortgage|loan|broker|refinance|rate|underwrit/i], key: 'offer_mortgage', label: 'Mortgage AI' },
    { patterns: [/real\s*estate|property|agent|realtor|buyer|viewing|tenant/i], key: 'offer_real-estate', label: 'Real Estate AI' },
    { patterns: [/review|feedback|rate.*us|rating/i], key: 'review', label: 'Leave a Review' },
    { patterns: [/redirect|page|go\s*to|take\s*me|navigate|show\s*me/i], key: 'redirect', label: 'Page Guide' }
  ];

  var OFFER_MAP = {};
  KNOWLEDGE.offers.forEach(function (o) { OFFER_MAP['offer_' + o.id] = o; });

  var root = document.getElementById('hwChat');
  var fab = document.getElementById('hwChatFab');
  var log = document.getElementById('hwChatLog');
  var form = document.getElementById('hwChatForm');
  var input = document.getElementById('hwChatInput');
  if (!root || !fab || !log || !form || !input) return;

  var sendBtn = form.querySelector('button');
  var greeted = false;
  var busy = false;
  var leadData = {};
  var leadStage = null;

  function scrollBottom() { log.scrollTop = log.scrollHeight; }

  function safeText(t) { return document.createTextNode(t); }

  function linkNode(href, text) {
    var a = document.createElement('a');
    try {
      var u = new URL(href, window.location.href);
      a.href = u.toString();
    } catch (e) { a.href = href; }
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
    a.textContent = text || href;
    return a;
  }

  function renderText(el, text) {
    var LINK_RE = /(https?:\/\/[^\s<>"'`]+)/g;
    var last = 0, m;
    LINK_RE.lastIndex = 0;
    while ((m = LINK_RE.exec(text)) !== null) {
      if (m.index > last) el.appendChild(safeText(text.slice(last, m.index)));
      el.appendChild(linkNode(m[0], m[0]));
      last = m.index + m[0].length;
    }
    if (last < text.length) el.appendChild(safeText(text.slice(last)));
  }

  function addMsg(role, text) {
    var d = document.createElement('div');
    d.className = 'hw-msg ' + (role === 'user' ? 'user' : 'bot');
    renderText(d, text);
    log.appendChild(d);
    scrollBottom();
    return d;
  }

  function addHTML(role, html) {
    var d = document.createElement('div');
    d.className = 'hw-msg ' + (role === 'user' ? 'user' : 'bot');
    d.innerHTML = html;
    log.appendChild(d);
    scrollBottom();
    return d;
  }

  function addCard(title, lines, url, urlLabel) {
    var card = document.createElement('div');
    card.className = 'hw-card';
    var h = document.createElement('div');
    h.className = 'hw-card-h';
    h.textContent = title;
    card.appendChild(h);
    lines.forEach(function (l) {
      var p = document.createElement('div');
      p.className = 'hw-card-l';
      p.textContent = l;
      card.appendChild(p);
    });
    if (url) {
      var a = document.createElement('a');
      a.className = 'hw-card-a';
      a.href = url;
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
      a.textContent = urlLabel || 'Learn more →';
      card.appendChild(a);
    }
    log.appendChild(card);
    scrollBottom();
    return card;
  }

  function addButton(text, cb) {
    var wrap = document.createElement('div');
    wrap.className = 'hw-chips';
    var b = document.createElement('button');
    b.type = 'button';
    b.className = 'hw-chip';
    b.textContent = text;
    b.addEventListener('click', function () {
      wrap.remove();
      cb();
    });
    wrap.appendChild(b);
    log.appendChild(wrap);
    scrollBottom();
    return wrap;
  }

  function addButtons(buttons) {
    var wrap = document.createElement('div');
    wrap.className = 'hw-chips hw-chips-multi';
    buttons.forEach(function (btn) {
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'hw-chip';
      b.textContent = btn.label;
      b.addEventListener('click', function () {
        wrap.remove();
        btn.action();
      });
      wrap.appendChild(b);
    });
    log.appendChild(wrap);
    scrollBottom();
    return wrap;
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

  function isLikelyName(text) {
    return text.split(' ').length <= 4 && /^[A-Za-z\s.'-]+$/.test(text.trim());
  }

  function isLikelyCompany(text) {
    return text.length > 2 && text.split(' ').length <= 6;
  }

  function detectIntent(text) {
    for (var i = 0; i < INTENTS.length; i++) {
      var intent = INTENTS[i];
      for (var j = 0; j < intent.patterns.length; j++) {
        if (intent.patterns[j].test(text)) return intent;
      }
    }
    return null;
  }

  function showOffers() {
    var msg = 'Here are our **7 core offers** — each one closes a specific revenue leak:\n\n';
    addMsg('bot', 'Here are the 7 AI systems we build — each targeting a specific revenue leak:');
    KNOWLEDGE.offers.forEach(function (o) {
      addCard(o.name, [o.tagline, '💵 ' + o.price, '✅ ' + o.result], o.url, 'See full offer →');
    });
    addMsg('bot', 'Which industry fits your business? Or tell me what you are trying to fix and I will match you.');
  }

  function showProcess() {
    addMsg('bot', 'From first call to live system — in 21 days. Here is how we work:');
    KNOWLEDGE.process.forEach(function (s) {
      addCard(s.title, [s.days + ' — ' + s.desc]);
    });
    addMsg('bot', 'Every system ships with reporting, training, and a retainer so we stay and optimise. Want to start with a free 20-minute strategy call?');
    addButton('Book a free strategy call', function () { window.open(CALENDAR, '_blank', 'noopener'); sendToBot('I want to book a strategy call.'); });
  }

  function showTestimonials() {
    addMsg('bot', 'Here is what our clients say:');
    KNOWLEDGE.testimonials.forEach(function (t) {
      addCard(t.name + ' — ' + t.role, ['"' + t.quote + '"']);
    });
    addMsg('bot', 'We have video testimonials from Jammi Pharma and Smart Start Business too. Want to see them?');
    addButton('Watch testimonials →', function () {
      var sec = document.getElementById('testimonials');
      if (sec) sec.scrollIntoView({ behavior: 'smooth' });
      sendToBot('Show me the video testimonials.');
    });
  }

  function showPortfolio() {
    addMsg('bot', 'Here are the systems we have built and deployed:');
    addCard('🏥 VS Hospitals — Healthcare', ['AI voice agent for appointment booking, reminders & refill outreach in Tanglish.', 'Result: Zero missed calls, 40% fewer no-shows.']);
    addCard('💊 Jammi Pharma — Ecommerce', ['AI chatbot with abandoned-cart recovery & product recommendations.', 'Result: 100+ hours saved every month.']);
    addCard('💰 Panasuna Chits — Chit Fund CRM', ['Purpose-built CRM replacing spreadsheets, WhatsApp templates, receipt/intimation automation.', 'Result: 100+ manual hours saved per month.']);
    addCard('🚀 Smart Start Business — SME Services', ['AI chatbot for lead capture and qualification.', 'Result: Lead qualification on autopilot.']);
    addCard('📊 Fixdirectly — B2B Lead Gen (US)', ['Fully automated SDR platform — scraping, personalised outreach & calendar booking.']);
    addMsg('bot', 'Want to see how we can build something similar for your business?');
    addButton('Yes — book a strategy call', function () { window.open(CALENDAR, '_blank', 'noopener'); sendToBot('I want to book a strategy call.'); });
    addButton('Tell me about pricing', function () { sendToBot('What are your pricing options?'); });
  }

  function showContact() {
    addCard('📞 Contact Hyperwrike', [
      'WhatsApp: ' + PHONE,
      'WhatsApp: ' + PHONE2,
      'Email: ' + EMAIL
    ]);
    addMsg('bot', 'Or book a free 20-minute strategy call and we will tell you exactly what we can automate and what it costs.');
    addButton('Book a strategy call', function () { window.open(CALENDAR, '_blank', 'noopener'); sendToBot('Booking a call now.'); });
  }

  function showOfferDetail(key) {
    var o = OFFER_MAP[key];
    if (!o) return;
    addCard('🏆 ' + o.name, [o.tagline, '💰 ' + o.price, '📈 ' + o.result], o.url, 'Read full offer →');
    addMsg('bot', 'Want to explore this for your business?');
    addButton('Yes — book a strategy call', function () { window.open(CALENDAR, '_blank', 'noopener'); sendToBot('I want to discuss ' + o.name + '.'); });
    addButton('Compare with other offers', function () { sendToBot('What other offers do you have?'); });
  }

  function showPageGuide() {
    addMsg('bot', 'Here is a map of everything on this site:');
    addCard('📍 Quick Links', [
      '🏠 Home — ' + window.location.origin,
      '📋 All 7 Offers — /offers/ (med-spa, roofing, hvac, dental, freight, mortgage, real-estate)',
      '📝 Blog — /blog/ (voice agent, CRM, SDR, law firm, no-shows)',
      '📍 Locations — /location/ (Chennai, Mumbai, London, Dubai, etc.)',
      '👥 Testimonials — scroll to the testimonials section on the home page',
      '📞 Contact — WhatsApp +91 94444 20367 or book a call'
    ]);
    addMsg('bot', 'What would you like me to guide you to? Just say the page name.');
  }

  function showPricing() {
    addMsg('bot', 'We do not sell off-the-shelf packages. Every system is custom-scoped to your exact workflow. Here is what our 7 offers typically run:');
    KNOWLEDGE.offers.forEach(function (o) {
      addCard(o.name, ['💰 ' + o.price, '✅ ' + o.result], o.url, 'See offer →');
    });
    addMsg('bot', 'The pricing depends on complexity, integrations, and scope. A free 20-minute strategy call gives you a clear number — no pitch, no pressure.');
    addButton('Book your free scoping call', function () { window.open(CALENDAR, '_blank', 'noopener'); sendToBot('I want to discuss pricing.'); });
  }

  function showBlogs() {
    addMsg('bot', 'Here are our latest articles:');
    KNOWLEDGE.blogs.forEach(function (b) {
      addCard(b.title, [], b.url, 'Read article →');
    });
  }

  function showIndustries() {
    addMsg('bot', 'We serve businesses across 4 regions. Pick your region:');
    addButtons([
      { label: '🇮🇳 India', action: function () { showRegion('india'); } },
      { label: '🇬🇧 United Kingdom', action: function () { showRegion('uk'); } },
      { label: '🇺🇸 United States', action: function () { showRegion('us'); } },
      { label: '🇪🇺 Europe', action: function () { showRegion('eu'); } }
    ]);
  }

  function showRegion(region) {
    var items = KNOWLEDGE.industries[region];
    if (!items) return;
    var labels = { india: 'India · Live', uk: 'United Kingdom', us: 'United States', eu: 'Europe' };
    addMsg('bot', '📍 **' + labels[region] + '** — industries we serve:');
    items.forEach(function (item) {
      addCard(item.n, [item.p, item.d !== 'Live' ? '💰 ' + item.d : '✅ ' + item.d]);
    });
    addMsg('bot', 'See anything that matches your business?');
    addButton('Book a strategy call', function () { window.open(CALENDAR, '_blank', 'noopener'); sendToBot('I want to discuss my industry.'); });
  }

  function showReviewPrompt() {
    addMsg('bot', 'We would love to hear your feedback! You can:');
    addCard('Leave a Review', [
      '⭐ Email us at ' + EMAIL,
      '💬 Message us on WhatsApp: ' + PHONE,
      '🔗 Connect on LinkedIn: https://linkedin.com/company/hyperwrike'
    ]);
    addMsg('bot', 'What aspect of our work would you like to review?');
  }

  function startLeadQualification() {
    leadStage = 'name';
    addMsg('bot', 'Great, let me find the right solution for you. First — what should I call you?');
  }

  function handleLeadInput(text) {
    if (leadStage === 'name') {
      leadData.name = text.trim();
      leadStage = 'company';
      addMsg('bot', 'Nice to meet you, ' + leadData.name + '! What company or business are you with?');
      return;
    }
    if (leadStage === 'company') {
      leadData.company = text.trim();
      leadStage = 'industry';
      addMsg('bot', 'Thanks! And what industry are you in — or what is the biggest operational challenge you are facing right now?');
      return;
    }
    if (leadStage === 'industry') {
      leadData.need = text.trim();
      leadStage = 'contact';
      addMsg('bot', 'Got it. What is the best email or WhatsApp number to send your plan to? (Type "skip" if you would rather not share it.)');
      return;
    }
    if (leadStage === 'contact') {
      leadStage = null;
      var raw = text.trim();
      var email = (raw.match(/[^\s@]+@[^\s@]+\.[^\s@]+/) || [])[0] || '';
      var phone = email ? '' : ((raw.replace(/[^\d+]/g, '').length >= 7) ? raw : '');
      if (email || phone) {
        leadData.email = email; leadData.phone = phone;
        submitLead();
        addMsg('bot', 'Thank you — the team will reach out within one business day.');
      }
      finishLead(leadData.need || '');
      return;
    }
  }

  function submitLead() {
    var attr = (window.hwAttribution && window.hwAttribution.get()) || {};
    var body = {
      name: leadData.name || '', email: leadData.email || '', phone: leadData.phone || '',
      intent: 'chat · ' + (leadData.company || '') + ' · ' + (leadData.need || ''),
      transcript: Array.prototype.map.call(log.querySelectorAll('.hw-msg'), function (m) { return m.textContent; }).join('\n').slice(0, 5000),
      page: location.pathname
    };
    for (var k in attr) if (Object.prototype.hasOwnProperty.call(attr, k)) body[k] = attr[k];
    try {
      fetch('/api/lead', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) })
        .then(function (r) { if (r.ok && window.hwTrack) window.hwTrack('lead_submit', { method: 'chat', ai_source: attr.ai_source || '' }); })
        .catch(function () {});
    } catch (e) {}
  }

  function finishLead(text) {
    {
      var intent = detectIntent(text);
      var response = 'Thanks, ' + leadData.name + '! Based on what you have shared, here is what I recommend:';
      addMsg('bot', response);
      if (intent && intent.key.indexOf('offer_') === 0) {
        showOfferDetail(intent.key);
      } else {
        showOffers();
      }
      addMsg('bot', 'Want to book a free 20-minute strategy call? We will come back with a clear plan and number.');
      addButton('Yes, book my call', function () { window.open(CALENDAR, '_blank', 'noopener'); sendToBot('Booking my free strategy call now.'); });
      addButton('I have more questions', function () { sendToBot('I have a few more questions.'); });
    }
  }

  function greet() {
    if (greeted) return;
    greeted = true;
    addMsg('bot', '👋 Hi — I am the Hyperwrike Agent. I help businesses figure out exactly which AI system will recover the most revenue or save the most hours.');
    var chips = document.createElement('div');
    chips.className = 'hw-chips hw-chips-multi';
    var opts = [
      { label: '💰 See our 7 offers', action: function () { chips.remove(); sendToBot('Show me your offers.'); } },
      { label: '📋 View portfolio', action: function () { chips.remove(); sendToBot('Show me your portfolio.'); } },
      { label: '📅 Book a strategy call', action: function () { chips.remove(); window.open(CALENDAR, '_blank', 'noopener'); sendToBot('I want to book a strategy call.'); } },
      { label: '❓ I have questions', action: function () { chips.remove(); sendToBot('I have questions.'); } }
    ];
    opts.forEach(function (opt) {
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'hw-chip';
      b.textContent = opt.label;
      b.addEventListener('click', opt.action);
      chips.appendChild(b);
    });
    log.appendChild(chips);
    scrollBottom();
  }

  function open() {
    if (!root.classList.contains('open') && window.hwTrack) window.hwTrack('chat_open', {});
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

  var navSearch = document.getElementById('navSearch');
  if (navSearch) navSearch.addEventListener('click', function (e) { e.preventDefault(); open(); });
  document.querySelectorAll('[data-open-agent]').forEach(function (el) {
    el.addEventListener('click', function (e) { e.preventDefault(); open(); });
  });
  window.HyperwrikeAgent = { open: open, close: close, toggle: toggle };

  function sendToBot(text) {
    addMsg('user', text);
    handleResponse(text);
  }

  function handleResponse(text) {
    var lower = text.toLowerCase().trim();
    if (!lower) return;

    if (leadStage) {
      handleLeadInput(text);
      return;
    }

    var intent = detectIntent(text);

    if (!intent) {
      if (isLikelyName(text) && !leadData.name) {
        leadData.name = text.trim();
        leadStage = 'company';
        addMsg('bot', 'Great to meet you, ' + leadData.name + '! And what company are you with?');
        return;
      }
      if (lower.indexOf('yes') === 0 || lower.indexOf('sure') === 0 || lower.indexOf('ok') === 0) {
        addMsg('bot', 'Awesome! What would you like to know? I can help with offers, pricing, portfolio, process, or book a call.');
        return;
      }
      if (lower.indexOf('no') === 0 || lower.indexOf('not') === 0) {
        addMsg('bot', 'No problem! Is there anything else I can help you with? I can show you our offers, portfolio, process, or you can book a call when ready.');
        return;
      }
      if (lower.indexOf('thank') === 0 || lower.indexOf('thanks') === 0) {
        addMsg('bot', 'You are welcome! Feel free to reach out anytime. You can also book a strategy call if you want to discuss your business in detail.');
        addButton('Book a strategy call →', function () { window.open(CALENDAR, '_blank', 'noopener'); sendToBot('Booking now.'); });
        return;
      }
      if (lower.indexOf('hi') === 0 || lower.indexOf('hello') === 0 || lower.indexOf('hey') === 0) {
        greet();
        return;
      }
      addMsg('bot', 'I am not sure I understood that. Let me help you with what I know best:');
      addButtons([
        { label: '💰 Our 7 offers', action: function () { sendToBot('Show me your offers.'); } },
        { label: '📋 Portfolio', action: function () { sendToBot('Show me your portfolio.'); } },
        { label: '🔄 Our process', action: function () { sendToBot('How do you work?'); } },
        { label: '📅 Book a call', action: function () { window.open(CALENDAR, '_blank', 'noopener'); sendToBot('Booking a call.'); } }
      ]);
      return;
    }

    switch (intent.key) {
      case 'voice_agent':
        addMsg('bot', 'AI voice agents are one of our core specialties. They answer every call 24/7, book appointments, run reminders, and never miss a lead.');
        addCard('How AI Voice Agents Work', [
          '📞 Answers every call within seconds — never goes to voicemail',
          '🗣️ Natural conversation in English, Tanglish, and more',
          '📅 Books directly into your calendar or CRM',
          '📲 Runs automated reminders (48h, 2h before appointments)',
          '📊 Reports every call, outcome, and conversion'
        ]);
        addMsg('bot', 'We built the voice agent for VS Hospitals (40% fewer no-shows) and build systems for med spas, dental clinics, roofing companies and more.');
        addButtons([
          { label: 'See relevant offer', action: function () { sendToBot('Which offer is for voice agents?'); } },
          { label: 'Book a strategy call', action: function () { window.open(CALENDAR, '_blank', 'noopener'); sendToBot('I want to discuss voice agents.'); } }
        ]);
        break;

      case 'crm':
        addMsg('bot', 'We build custom CRM and operations automation that replaces 100+ hours of manual work per month.');
        addCard('CRM & Automation', [
          '🔄 Replaces spreadsheets with purpose-built systems',
          '📊 Real-time dashboards for every metric that matters',
          '📱 WhatsApp/Meta integration for communication',
          '📄 Auto-generated receipts, reminders, intimations',
          '📈 Reporting layer so you see money and hours recovered weekly'
        ]);
        addMsg('bot', 'Our flagship: Panasuna Chits CRM replaced 100+ manual hours per month. We can build the same for your business.');
        addButton('Tell me more', function () { sendToBot('Tell me about your CRM work.'); });
        break;

      case 'lead_gen':
        addMsg('bot', 'We build AI lead generation and SDR systems that identify prospects, personalise outreach, and book meetings on autopilot.');
        addCard('AI Lead Generation', [
          '🎯 Prospect identification from your target market',
          '✉️ Personalised multi-channel outreach (email, LinkedIn, WhatsApp)',
          '📅 Automated meeting booking to your calendar',
          '📊 Weekly reporting: leads captured, meetings booked, conversion'
        ]);
        addMsg('bot', 'Our US client Fixdirectly runs a fully automated SDR platform. Want to see how it works?');
        addButton('Yes, show me more', function () { sendToBot('Tell me about your lead gen work.'); });
        break;

      case 'ecommerce':
        addMsg('bot', 'We build AI for ecommerce — chatbots, abandoned-cart recovery, and product recommendations.');
        addCard('Ecommerce AI', [
          '🛒 AI chatbot for customer support and product discovery',
          '🛍️ Abandoned-cart recovery sequences',
          '🎯 Personalised product recommendations',
          '📦 Inventory and order management automation'
        ]);
        addMsg('bot', 'See how we helped Jammi Pharma — 100+ hours saved monthly with AI automation.');
        addButton('See the case study', function () { sendToBot('Tell me about Jammi Pharma.'); });
        break;

      case 'pricing':
        showPricing();
        break;

      case 'booking':
        addMsg('bot', 'Let us get you a clear answer. Book a free 20-minute strategy call and we will tell you exactly what we can automate, what it costs, and what you will recover. No pitch. No pressure.');
        addButton('Open calendar →', function () { window.open(CALENDAR, '_blank', 'noopener'); sendToBot('Opening the calendar now.'); });
        break;

      case 'testimonials':
        showTestimonials();
        break;

      case 'process':
        showProcess();
        break;

      case 'portfolio':
        showPortfolio();
        break;

      case 'about':
        addMsg('bot', 'Hyperwrike is an AI systems agency based in Chennai, India — serving businesses in the UK, US, Europe, and India.');
        addCard('About Hyperwrike', [
          '🏢 Founded: 2024',
          '📍 HQ: Chennai, Tamil Nadu, India',
          '🌍 Regions: India · UK · US · Europe',
          '🔧 We build: AI voice agents, custom CRM, ecommerce AI, lead gen systems, and operations automation',
          '⏱️ 21-day delivery cycle',
          '🔄 Ongoing retainer — we monitor, optimise, and expand'
        ]);
        addMsg('bot', 'Every system we build ships with a reporting layer, training library, and a full handover doc. You own it. We stay on retainer to keep it running and evolving.');
        break;

      case 'contact':
        showContact();
        break;

      case 'redirect':
        showPageGuide();
        break;

      case 'review':
        showReviewPrompt();
        break;

      default:
        if (intent.key.indexOf('offer_') === 0) {
          showOfferDetail(intent.key);
        } else {
          addMsg('bot', 'I can help you with offers, pricing, portfolio, our process, testimonials, or booking a call. What would you like?');
        }
    }
  }

  function send(text) {
    text = (text || '').trim();
    if (!text || busy) return;
    busy = true;
    sendBtn.disabled = true;
    addMsg('user', text);
    showTyping();
    setTimeout(function () {
      hideTyping();
      handleResponse(text);
      busy = false;
      sendBtn.disabled = false;
      input.focus();
    }, 400 + Math.random() * 300);
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var v = input.value;
    input.value = '';
    send(v);
  });
})();
