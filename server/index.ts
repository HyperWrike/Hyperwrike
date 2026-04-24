/**
 * Hyperwrike backend
 * -----------------------------------------------------------
 * Keeps Brevo + Groq API keys server-side so they are NEVER
 * exposed in the browser bundle. Vite dev-proxies /api/*
 * to this process.
 *
 * Endpoints:
 *   POST /api/contact  — form submission → Brevo email
 *   POST /api/chat     — conversation → Groq chat completion
 *   GET  /api/health   — healthcheck
 */

import express, { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env.local first (preferred), then fall back to .env
dotenv.config({ path: path.resolve(__dirname, '..', '.env.local') });
dotenv.config({ path: path.resolve(__dirname, '..', '.env') });

const PORT = Number(process.env.SERVER_PORT || 8787);
const BREVO_API_KEY = process.env.BREVO_API_KEY || '';
const BREVO_SENDER_EMAIL = process.env.BREVO_SENDER_EMAIL || 'team@hyperwrike.com';
const BREVO_SENDER_NAME = process.env.BREVO_SENDER_NAME || 'Hyperwrike';
const BREVO_NOTIFICATION_INBOX = process.env.BREVO_NOTIFICATION_INBOX || 'team@hyperwrike.com';
const GROQ_API_KEY = process.env.GROQ_API_KEY || '';
const GROQ_MODEL = process.env.GROQ_MODEL || 'llama-3.3-70b-versatile';

if (!BREVO_API_KEY) console.warn('[warn] BREVO_API_KEY is not set — /api/contact will fail');
if (!GROQ_API_KEY) console.warn('[warn] GROQ_API_KEY is not set — /api/chat will fail');

const app = express();
app.use(express.json({ limit: '128kb' }));

// Minimal CORS (only needed when not using Vite proxy — e.g. prod same-origin is fine)
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(204).end();
  next();
});

// ---------- Rate limiting (very lightweight, in-memory) ----------
const rlBuckets = new Map<string, { count: number; reset: number }>();
function rateLimit(max: number, windowMs: number) {
  return (req: Request, res: Response, next: NextFunction) => {
    const ip = (req.headers['x-forwarded-for'] as string)?.split(',')[0].trim() || req.socket.remoteAddress || 'unknown';
    const now = Date.now();
    const bucket = rlBuckets.get(ip);
    if (!bucket || now > bucket.reset) {
      rlBuckets.set(ip, { count: 1, reset: now + windowMs });
      return next();
    }
    bucket.count += 1;
    if (bucket.count > max) {
      return res.status(429).json({ ok: false, error: 'Too many requests. Please slow down.' });
    }
    next();
  };
}

// ---------- Validation helpers ----------
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const sanitize = (s: unknown, max = 500) => {
  if (typeof s !== 'string') return '';
  return s.replace(/[\u0000-\u001F\u007F]/g, '').trim().slice(0, max);
};
const esc = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

// ---------- Healthcheck ----------
app.get('/api/health', (_req, res) => {
  res.json({
    ok: true,
    services: {
      brevo: Boolean(BREVO_API_KEY),
      groq: Boolean(GROQ_API_KEY),
    },
  });
});

// ---------- /api/contact — Brevo transactional email ----------
app.post('/api/contact', rateLimit(6, 60_000), async (req, res) => {
  try {
    const name = sanitize(req.body?.name, 120);
    const email = sanitize(req.body?.email, 160);
    const industry = sanitize(req.body?.industry, 60);
    const challenge = sanitize(req.body?.challenge, 500);
    const source = sanitize(req.body?.source, 60) || 'website-form';
    // Honeypot field — real users won't fill this
    if (sanitize(req.body?.company_website, 100)) {
      return res.json({ ok: true }); // silently succeed for bots
    }
    if (!name || !EMAIL_RE.test(email) || !industry) {
      return res.status(400).json({ ok: false, error: 'Missing or invalid fields.' });
    }

    const subject = `New Hyperwrike Lead — ${name} (${industry})`;
    const htmlContent = `
      <h2 style="font-family:Arial,sans-serif;margin:0 0 12px">New consultation request</h2>
      <table style="font-family:Arial,sans-serif;font-size:14px;border-collapse:collapse" cellpadding="8">
        <tr><td><strong>Name</strong></td><td>${esc(name)}</td></tr>
        <tr><td><strong>Email</strong></td><td><a href="mailto:${esc(email)}">${esc(email)}</a></td></tr>
        <tr><td><strong>Industry</strong></td><td>${esc(industry)}</td></tr>
        <tr><td><strong>Bottleneck</strong></td><td>${esc(challenge || '—')}</td></tr>
        <tr><td><strong>Source</strong></td><td>${esc(source)}</td></tr>
        <tr><td><strong>Received</strong></td><td>${new Date().toISOString()}</td></tr>
      </table>
      <p style="font-family:Arial,sans-serif;font-size:12px;color:#666;margin-top:16px">
        Reply directly to this email to respond to the prospect.
      </p>
    `.trim();

    // 1) Notification to team inbox
    const notify = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'content-type': 'application/json',
        'api-key': BREVO_API_KEY,
      },
      body: JSON.stringify({
        sender: { name: BREVO_SENDER_NAME, email: BREVO_SENDER_EMAIL },
        to: [{ email: BREVO_NOTIFICATION_INBOX, name: 'Hyperwrike Team' }],
        replyTo: { email, name },
        subject,
        htmlContent,
      }),
    });

    if (!notify.ok) {
      const errBody = await notify.text();
      console.error('[brevo notify] failed', notify.status, errBody);
      return res.status(502).json({ ok: false, error: 'Email delivery failed. Please email team@hyperwrike.com directly.' });
    }

    // 2) Auto-reply confirmation to the lead (best-effort; don't fail the request if this fails)
    const confirmHtml = `
      <div style="font-family:Arial,sans-serif;max-width:560px;margin:auto;padding:24px;border:1px solid #eee;border-radius:12px">
        <h2 style="margin:0 0 12px">Thanks, ${esc(name)} — we've got your request.</h2>
        <p>A Hyperwrike founder will personally reply within <strong>1 business day</strong> with next steps and a calendar link.</p>
        <p>In the meantime, feel free to book directly:
          <a href="https://calendar.app.google/WpbBqVNkm1YGfunz5" style="color:#3ca2fa">calendar.app.google/WpbBqVNkm1YGfunz5</a>
        </p>
        <hr style="border:none;border-top:1px solid #eee;margin:20px 0"/>
        <p style="font-size:13px;color:#666">
          Hyperwrike — AI Automation Agency in Chennai<br/>
          Reply to this email or write to <a href="mailto:team@hyperwrike.com">team@hyperwrike.com</a>
        </p>
      </div>
    `.trim();

    fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'content-type': 'application/json',
        'api-key': BREVO_API_KEY,
      },
      body: JSON.stringify({
        sender: { name: BREVO_SENDER_NAME, email: BREVO_SENDER_EMAIL },
        to: [{ email, name }],
        replyTo: { email: BREVO_NOTIFICATION_INBOX, name: BREVO_SENDER_NAME },
        subject: 'We got your request — Hyperwrike',
        htmlContent: confirmHtml,
      }),
    }).catch((e) => console.warn('[brevo autoreply] non-fatal failure', e));

    res.json({ ok: true });
  } catch (err: any) {
    console.error('[/api/contact] error', err);
    res.status(500).json({ ok: false, error: 'Unexpected server error.' });
  }
});

// ---------- /api/chat — Groq chat completion ----------
// Accepts: { messages: [{ role: 'user'|'assistant', content: string }] }
// Returns: { ok: true, reply: string }
const SYSTEM_PROMPT = `
You are "Hyper", the AI sales assistant for Hyperwrike — an AI automation agency in Chennai, Tamil Nadu (India) that builds AI voice agents and workflow automation for US small businesses (HVAC, dental, roofing, plumbing, car rental, and custom).

GOALS (in priority order):
1. Qualify the visitor quickly: industry, biggest bottleneck, business size.
2. Push gently toward the free 30-minute call (https://calendar.app.google/WpbBqVNkm1YGfunz5) or the form at #audit.
3. Answer questions using the facts below. If unsure, say so and offer to connect a human at team@hyperwrike.com.

KEY FACTS:
- AI Voice Agent setup starts under $1,000 with predictable monthly plans. Most clients recoup cost in 30–60 days from captured missed calls.
- Delivery timeline: 2–4 weeks standard voice agent, 4–8 weeks complex automations.
- Full code ownership, no vendor lock-in. NDAs signed on request.
- 100% remote delivery worldwide; primarily serves US small businesses.
- Contact: team@hyperwrike.com · Calendar: https://calendar.app.google/WpbBqVNkm1YGfunz5
- Client example: Jammi Pharma (jammi.in) — AI automation transformed customer interactions and order flow.

STYLE:
- Be warm, concise, confident. Short paragraphs. Use occasional bullet points.
- Never invent features, pricing, or guarantees. If asked for something specific, offer to connect them with a founder.
- Always close by proposing a next step: "Want me to book a free 30-min call?" or "Shall I take your email so a founder can follow up?"
- Keep replies under 120 words unless the user asks for detail.
- Do not use emojis unless the user does first.
`.trim();

app.post('/api/chat', rateLimit(40, 60_000), async (req, res) => {
  try {
    if (!GROQ_API_KEY) {
      return res.status(500).json({ ok: false, error: 'Chatbot not configured.' });
    }
    const rawMessages = Array.isArray(req.body?.messages) ? req.body.messages : [];
    if (rawMessages.length === 0) {
      return res.status(400).json({ ok: false, error: 'No messages.' });
    }
    // Sanitize + cap history
    const messages = rawMessages.slice(-12).map((m: any) => ({
      role: m?.role === 'assistant' ? 'assistant' : 'user',
      content: sanitize(m?.content, 2000),
    })).filter((m: any) => m.content);

    if (messages.length === 0) {
      return res.status(400).json({ ok: false, error: 'Empty messages.' });
    }

    const groqResp = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${GROQ_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: GROQ_MODEL,
        temperature: 0.6,
        max_tokens: 400,
        messages: [{ role: 'system', content: SYSTEM_PROMPT }, ...messages],
      }),
    });

    if (!groqResp.ok) {
      const errBody = await groqResp.text();
      console.error('[groq] failed', groqResp.status, errBody);
      return res.status(502).json({ ok: false, error: "Our AI is taking a break. Please email team@hyperwrike.com." });
    }

    const data: any = await groqResp.json();
    const reply: string = data?.choices?.[0]?.message?.content?.trim() || "Sorry, I didn't catch that. Could you rephrase?";
    res.json({ ok: true, reply });
  } catch (err: any) {
    console.error('[/api/chat] error', err);
    res.status(500).json({ ok: false, error: 'Unexpected server error.' });
  }
});

// ---------- Start ----------
app.listen(PORT, () => {
  console.log(`\n  Hyperwrike backend running at http://localhost:${PORT}`);
  console.log(`  Brevo: ${BREVO_API_KEY ? 'configured' : 'MISSING'} · Groq: ${GROQ_API_KEY ? 'configured' : 'MISSING'}\n`);
});
