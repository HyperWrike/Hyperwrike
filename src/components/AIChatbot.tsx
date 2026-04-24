import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle, X, Send, Sparkles, Loader2 } from 'lucide-react';

type Msg = { role: 'user' | 'assistant'; content: string };

const SUGGESTED: string[] = [
  'How much does an AI voice agent cost?',
  'How fast can you deploy?',
  'Do you work with HVAC / dental / roofing?',
  'Can I book a free call?',
];

const WELCOME: Msg = {
  role: 'assistant',
  content:
    "Hi, I'm Hyper — Hyperwrike's AI assistant. I can answer questions about our AI voice agents, pricing, timelines, or book you a free 30-minute call with a founder. What brings you here today?",
};

export default function AIChatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([WELCOME]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const endRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [messages, loading, open]);

  // Subtle pulse to draw attention on first load
  const [pulse, setPulse] = useState(true);
  useEffect(() => {
    const t = setTimeout(() => setPulse(false), 8000);
    return () => clearTimeout(t);
  }, []);

  async function sendMessage(text: string) {
    const trimmed = text.trim();
    if (!trimmed || loading) return;
    setError(null);
    const next: Msg[] = [...messages, { role: 'user', content: trimmed }];
    setMessages(next);
    setInput('');
    setLoading(true);
    try {
      const resp = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: next }),
      });
      const data = await resp.json().catch(() => ({}));
      if (!resp.ok || !data?.ok) {
        throw new Error(data?.error || 'Chat service unavailable.');
      }
      setMessages((m) => [...m, { role: 'assistant', content: String(data.reply) }]);
    } catch (e: any) {
      setError(e?.message || 'Something went wrong.');
      setMessages((m) => [
        ...m,
        {
          role: 'assistant',
          content:
            "I'm having trouble reaching our servers. Please email team@hyperwrike.com or book a call: https://calendar.app.google/WpbBqVNkm1YGfunz5",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {/* Floating launcher */}
      <AnimatePresence>
        {!open && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ type: 'spring', stiffness: 260, damping: 20 }}
            onClick={() => setOpen(true)}
            aria-label="Open Hyperwrike AI chat"
            className="fixed bottom-5 right-5 md:bottom-6 md:right-6 z-[90] flex items-center gap-2 rounded-full bg-gradient-to-br from-[#3ca2fa] to-blue-700 text-white px-5 py-3.5 shadow-xl shadow-blue-500/30 hover:scale-105 active:scale-95 transition-transform group"
          >
            <span className={`relative flex h-5 w-5 items-center justify-center`}>
              {pulse && (
                <span className="absolute inline-flex h-full w-full rounded-full bg-white/60 opacity-75 animate-ping" />
              )}
              <Sparkles className="relative h-5 w-5" />
            </span>
            <span className="hidden md:inline font-semibold text-sm">Ask Hyper AI</span>
            <span className="md:hidden font-semibold text-sm">Chat</span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            transition={{ type: 'spring', stiffness: 260, damping: 24 }}
            role="dialog"
            aria-label="Hyperwrike AI chatbot"
            className="fixed bottom-5 right-5 md:bottom-6 md:right-6 z-[90] w-[92vw] max-w-[400px] h-[70vh] max-h-[620px] rounded-3xl overflow-hidden flex flex-col bg-white shadow-2xl border border-black/5"
          >
            {/* Header */}
            <div className="relative bg-gradient-to-br from-[#0b0b0e] via-[#0f1226] to-[#0b1b3a] text-white px-5 py-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#3ca2fa] to-blue-600 flex items-center justify-center ring-2 ring-white/20">
                <Sparkles className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-semibold">Hyper</span>
                  <span className="inline-flex items-center gap-1 text-[10px] uppercase tracking-wider bg-emerald-500/20 text-emerald-300 px-1.5 py-0.5 rounded-full">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> Online
                  </span>
                </div>
                <div className="text-xs text-white/60">Hyperwrike AI · replies instantly</div>
              </div>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close chat"
                className="p-2 rounded-full hover:bg-white/10 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-4 bg-[#fafafa] space-y-3">
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] text-sm leading-relaxed px-4 py-2.5 rounded-2xl whitespace-pre-wrap ${
                      m.role === 'user'
                        ? 'bg-black text-white rounded-br-sm'
                        : 'bg-white text-gray-900 rounded-bl-sm border border-black/5 shadow-sm'
                    }`}
                  >
                    {m.content}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="bg-white border border-black/5 shadow-sm rounded-2xl rounded-bl-sm px-4 py-3 flex items-center gap-2 text-sm text-gray-500">
                    <Loader2 className="w-4 h-4 animate-spin" /> Thinking…
                  </div>
                </div>
              )}
              {/* Suggested chips appear only on first turn */}
              {messages.length === 1 && !loading && (
                <div className="flex flex-wrap gap-2 pt-2">
                  {SUGGESTED.map((s) => (
                    <button
                      key={s}
                      onClick={() => sendMessage(s)}
                      className="text-xs font-medium px-3 py-1.5 rounded-full bg-white border border-black/10 text-gray-700 hover:bg-black hover:text-white transition-colors"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}
              {error && (
                <div className="text-xs text-red-600 px-1">{error}</div>
              )}
              <div ref={endRef} />
            </div>

            {/* Composer */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                sendMessage(input);
              }}
              className="border-t border-black/5 p-3 bg-white flex items-center gap-2"
            >
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about pricing, timelines, your industry…"
                disabled={loading}
                className="flex-1 px-4 py-2.5 rounded-full bg-gray-100 text-sm outline-none focus:bg-white focus:ring-2 focus:ring-[#3ca2fa] transition-all disabled:opacity-60"
                aria-label="Type your message"
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                aria-label="Send message"
                className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center hover:scale-105 active:scale-95 transition-transform disabled:opacity-40 disabled:hover:scale-100"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
            <div className="text-[10px] text-center text-gray-400 pb-2">
              Powered by Hyperwrike · AI may make mistakes
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
