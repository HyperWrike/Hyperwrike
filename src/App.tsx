/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef, useState, ReactNode } from 'react';
import {
  Clock,
  DollarSign,
  TrendingUp,
  Cpu,
  Layers,
  BarChart3,
  Handshake,
  Bot,
  Code,
  GitMerge,
  Lightbulb,
  Plug,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  ShieldCheck,
  Star,
  Zap,
  Globe,
  Lock,
  LayoutGrid,
  Users,
  List,
  Calendar,
  Database,
  Menu,
  X,
  Save,
  Phone,
  Wrench,
  Stethoscope,
  Home as HomeIcon,
  Droplet,
  Car,
  PlayCircle,
  Quote
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import HoverFooter from './components/HoverFooter';
import Testimonials from './components/Testimonials';
import AIChatbot from './components/AIChatbot';
import { db } from './firebase';
import { doc, onSnapshot, setDoc, serverTimestamp } from 'firebase/firestore';

// CMS Component
const CMSContent = ({ id, defaultText, className, cmsMode, as: Component = 'span' }: { id: string, defaultText: string, className?: string, cmsMode: boolean, as?: any }) => {
  const [text, setText] = useState(defaultText);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const unsub = onSnapshot(doc(db, 'content', id), (doc) => {
      if (doc.exists()) {
        setText(doc.data().text);
      }
    });
    return () => unsub();
  }, [id]);

  const handleSave = async (newText: string) => {
    if (newText === text) return;
    setIsSaving(true);
    try {
      await setDoc(doc(db, 'content', id), {
        text: newText,
        updatedAt: serverTimestamp()
      }, { merge: true });
    } catch (err) {
      console.error("CMS Save Error:", err);
    } finally {
      setIsSaving(false);
    }
  };

  if (cmsMode) {
    return (
      <div className={`relative group/cms inline-block w-full ${className}`}>
        <Component 
          contentEditable
          suppressContentEditableWarning
          onBlur={(e: any) => handleSave(e.currentTarget.textContent || "")}
          className="outline-none focus:ring-2 focus:ring-blue-500 rounded px-1 min-w-[20px] cursor-text"
        >
          {text}
        </Component>
        <div className="absolute -top-6 right-0 bg-blue-500 text-white text-[10px] px-1 rounded opacity-0 group-hover/cms:opacity-100 pointer-events-none z-50 flex items-center gap-1">
          {isSaving ? <Clock className="w-2 h-2 animate-spin" /> : <Save className="w-2 h-2" />}
          ID: {id}
        </div>
      </div>
    );
  }

  return <Component className={className}>{text}</Component>;
};

const Section = ({ id, title, subtitle, children, className = "", dark = false, titleComponent, cmsMode }: { id: string, title?: string, subtitle?: string, children: ReactNode, className?: string, dark?: boolean, titleComponent?: ReactNode, cmsMode?: boolean }) => (
  <section id={id} className={`py-16 md:py-24 px-6 md:px-8 ${dark ? 'bg-[#000000] text-white' : 'bg-white text-[#000000]'} ${className} relative overflow-hidden`}>
    <div className="max-w-7xl mx-auto relative z-10">
      <div className="mb-12 md:mb-16 animate-fade-rise text-center">
        {titleComponent ? titleComponent : (
          <h2 className="text-3xl md:text-5xl font-serif mb-4">
            {cmsMode ? <CMSContent id={`${id}_title`} defaultText={title || ""} cmsMode={cmsMode} /> : title}
          </h2>
        )}
        {subtitle && (
          <p className={`${dark ? 'text-gray-400' : 'text-[#6F6F6F]'} text-base md:text-lg max-w-2xl mx-auto`}>
            {cmsMode ? <CMSContent id={`${id}_subtitle`} defaultText={subtitle} cmsMode={cmsMode} /> : subtitle}
          </p>
        )}
      </div>
      <div className="animate-fade-rise-delay">
        {children}
      </div>
    </div>
  </section>
);

const AccordionItem = ({ question, answer }: { question: string, answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-gray-200 py-6">
      <button 
        className="flex justify-between items-center w-full text-left group"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-xl font-medium group-hover:text-[#6F6F6F] transition-colors">{question}</span>
        {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
      </button>
      {isOpen && (
        <div className="mt-4 text-[#6F6F6F] leading-relaxed animate-fade-rise">
          {answer}
        </div>
      )}
    </div>
  );
};

const BenefitCard = ({ icon, title, desc, color, rotation, delay, yOffset = 0 }: { icon: ReactNode, title: string, desc: string, color: string, rotation: string, delay: number, yOffset?: number, key?: any }) => {
  const colorMap: Record<string, { bg: string, iconBg: string, dot: string, border: string }> = {
    yellow: { bg: 'bg-[#FFFDF0]', iconBg: 'text-[#EAB308]', dot: 'bg-[#EAB308]', border: 'border-[#FEF9C3]' },
    purple: { bg: 'bg-[#F8F7FF]', iconBg: 'text-[#8B5CF6]', dot: 'bg-[#8B5CF6]', border: 'border-[#EDE9FE]' },
    pink: { bg: 'bg-[#FFF5F7]', iconBg: 'text-[#EC4899]', dot: 'bg-[#EC4899]', border: 'border-[#FCE7F3]' },
    blue: { bg: 'bg-[#F0F9FF]', iconBg: 'text-[#3B82F6]', dot: 'bg-[#3B82F6]', border: 'border-[#E0F2FE]' },
  };

  const style = colorMap[color] || colorMap.yellow;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 + yOffset }}
      whileInView={{ opacity: 1, y: yOffset }}
      whileHover={{ y: yOffset - 12, scale: 1.03, transition: { duration: 0.4, ease: "easeOut" } }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay }}
      style={{ rotate: rotation + 'deg' }}
      className="relative bg-white p-2.5 rounded-[3rem] shadow-[0_30px_70px_-20px_rgba(0,0,0,0.1)] w-full max-w-[340px] mx-auto group cursor-default"
    >
      {/* Top Floating Dot - Refined fastener look */}
      <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-white p-1.5 shadow-xl z-20 border border-gray-50">
        <div className={`w-full h-full rounded-full ${style.dot} shadow-inner relative overflow-hidden`}>
          <div className="absolute inset-0 bg-gradient-to-tr from-black/30 to-transparent" />
          <div className="absolute top-1 left-1 w-2 h-2 bg-white/50 rounded-full blur-[1px]" />
        </div>
      </div>
      
      <div className={`${style.bg} ${style.border} border p-10 rounded-[2.5rem] h-full flex flex-col items-start text-left min-h-[320px] transition-all duration-500 group-hover:bg-white group-hover:border-gray-100`}>
        <div className={`mb-8 ${style.iconBg} p-4 rounded-2xl bg-white shadow-md border border-gray-50 transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-3`}>
          {icon}
        </div>
        <h3 className="text-2xl font-bold mb-4 text-gray-900 tracking-tight leading-tight">{title}</h3>
        <p className="text-gray-500 text-[15px] leading-relaxed font-medium opacity-80 group-hover:opacity-100 transition-opacity duration-500">{desc}</p>
      </div>
    </motion.div>
  );
};

interface ServiceBlockProps {
  badge: string;
  title: string;
  description: string;
  tags: string[];
  imageSide: 'left' | 'right';
  visual: ReactNode;
}

const ServiceBlock = ({ badge, title, description, tags, imageSide, visual }: ServiceBlockProps) => {
  return (
    <div className={`flex flex-col ${imageSide === 'left' ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-12 lg:gap-20 py-20`}>
      {/* Visual Element */}
      <div className="w-full lg:w-1/2">
        <div className="relative rounded-3xl overflow-hidden bg-gray-50 border border-gray-100 shadow-2xl transition-transform duration-700 hover:scale-[1.02]">
          {visual}
        </div>
      </div>

      {/* Text Content */}
      <div className="w-full lg:w-1/2 text-left">
        <span className="inline-block px-4 py-1.5 rounded-full bg-gray-100 text-[#6F6F6F] text-xs font-semibold uppercase tracking-wider mb-6">
          {badge}
        </span>
        <h3 className="text-4xl md:text-5xl font-serif mb-6 leading-tight text-[#000000]">
          {title}
        </h3>
        <p className="text-lg text-[#6F6F6F] leading-relaxed mb-8">
          {description}
        </p>
        <div className="flex flex-wrap gap-3">
          {tags.map((tag, i) => (
            <span key={i} className="px-5 py-2 rounded-full border border-gray-200 text-sm font-medium text-[#000000] bg-white">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

const TaskListMockup = () => (
  <div className="p-8 bg-[#151619] text-white font-sans min-h-[400px]">
    <div className="flex items-center justify-between mb-8 border-b border-white/10 pb-4">
      <div className="flex gap-4">
        <span className="text-sm font-medium text-white">All Tasks</span>
        <span className="text-sm font-medium text-gray-500">Waiting for approval</span>
      </div>
      <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
        <div className="w-4 h-4 rounded-full border-2 border-white/20 border-t-white animate-spin" />
      </div>
    </div>
    <div className="space-y-4">
      {[
        { title: "Lead list", status: "70% prepared", icon: <List className="w-4 h-4" /> },
        { title: "Payment reminder", status: "Sent to selected clients", icon: <Clock className="w-4 h-4" />, checked: true },
        { title: "Payroll management", status: "Due on 2nd July", icon: <DollarSign className="w-4 h-4" /> },
        { title: "Employee Tracking", status: "2 days ago", icon: <Users className="w-4 h-4" />, checked: true },
        { title: "Social media post", status: "Scheduled", icon: <Calendar className="w-4 h-4" /> }
      ].map((task, i) => (
        <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center text-gray-400">
              {task.icon}
            </div>
            <div>
              <div className="text-sm font-medium">{task.title}</div>
              <div className="text-xs text-gray-500">{task.status}</div>
            </div>
          </div>
          <div className={`w-6 h-6 rounded-md flex items-center justify-center ${task.checked ? 'bg-green-500/20 text-green-500' : 'border border-white/20 text-gray-600'}`}>
            {task.checked && <CheckCircle2 className="w-4 h-4" />}
          </div>
        </div>
      ))}
    </div>
  </div>
);

const DashboardMockup = () => (
  <div className="p-8 bg-white text-[#000000] font-sans min-h-[400px]">
    <div className="flex items-center justify-between mb-10">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-black flex items-center justify-center text-white">
          <Zap className="w-6 h-6" />
        </div>
        <span className="text-xl font-serif font-bold tracking-tight">Hyperwrike OS</span>
      </div>
      <div className="flex gap-2">
        <div className="w-3 h-3 rounded-full bg-red-400" />
        <div className="w-3 h-3 rounded-full bg-yellow-400" />
        <div className="w-3 h-3 rounded-full bg-green-400" />
      </div>
    </div>
    <div className="grid grid-cols-2 gap-6">
      <div className="p-6 rounded-2xl bg-gray-50 border border-gray-100">
        <div className="text-xs text-gray-500 uppercase tracking-wider mb-2">Growth Rate</div>
        <div className="text-3xl font-serif">+42.8%</div>
        <div className="mt-4 h-2 w-full bg-gray-200 rounded-full overflow-hidden">
          <div className="h-full bg-black w-[42.8%]" />
        </div>
      </div>
      <div className="p-6 rounded-2xl bg-gray-50 border border-gray-100">
        <div className="text-xs text-gray-500 uppercase tracking-wider mb-2">Active Flows</div>
        <div className="text-3xl font-serif">12</div>
        <div className="flex gap-1 mt-4">
          {[1, 1, 1, 1, 0, 0, 0].map((v, i) => (
            <div key={i} className={`h-6 w-2 rounded-full ${v ? 'bg-black' : 'bg-gray-200'}`} />
          ))}
        </div>
      </div>
      <div className="col-span-2 p-6 rounded-2xl bg-black text-white">
        <div className="flex justify-between items-center mb-4">
          <span className="text-sm font-medium">System Health</span>
          <span className="text-xs text-green-400">Optimal</span>
        </div>
        <div className="h-24 flex items-end gap-1">
          {[40, 60, 45, 80, 55, 90, 70, 85, 60, 75, 95, 80].map((h, i) => (
            <div key={i} className="flex-1 bg-white/20 rounded-t-sm" style={{ height: `${h}%` }} />
          ))}
        </div>
      </div>
    </div>
  </div>
);

const IntegrationMockup = () => (
  <div className="p-8 bg-gray-50 text-[#000000] font-sans min-h-[400px] flex flex-col items-center justify-center">
    <div className="relative w-full max-w-md">
      <div className="absolute top-1/2 left-0 w-full h-px bg-gray-200 -translate-y-1/2" />
      <div className="relative flex justify-between items-center">
        <div className="w-16 h-16 rounded-2xl bg-white shadow-lg flex items-center justify-center border border-gray-100 z-10">
          <div className="w-10 h-10 rounded-lg bg-blue-500/10 text-blue-500 flex items-center justify-center">
            <Globe className="w-6 h-6" />
          </div>
        </div>
        <div className="w-24 h-24 rounded-full bg-white shadow-xl flex items-center justify-center border border-gray-100 z-20">
          <div className="w-16 h-16 rounded-full bg-black text-white flex items-center justify-center animate-pulse">
            <Zap className="w-8 h-8" />
          </div>
        </div>
        <div className="w-16 h-16 rounded-2xl bg-white shadow-lg flex items-center justify-center border border-gray-100 z-10">
          <div className="w-10 h-10 rounded-lg bg-purple-500/10 text-purple-500 flex items-center justify-center">
            <Database className="w-6 h-6" />
          </div>
        </div>
      </div>
      <div className="mt-12 grid grid-cols-3 gap-4">
        {[1, 1, 1].map((_, i) => (
          <div key={i} className="h-1 bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full bg-black animate-progress" style={{ animationDelay: `${i * 0.5}s` }} />
          </div>
        ))}
      </div>
    </div>
    <div className="mt-12 text-center">
      <div className="text-sm font-medium text-gray-400 mb-2 uppercase tracking-widest">Syncing Data</div>
      <div className="text-xs text-gray-500">1,240 events processed today</div>
    </div>
  </div>
);

// Contact form — POSTs to /api/contact which relays via Brevo to team@hyperwrike.com
function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', industry: '', challenge: '', company_website: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState<string>('');

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (status === 'loading') return;
    setStatus('loading');
    setErrorMsg('');
    try {
      const resp = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, source: 'audit-form' }),
      });
      const data = await resp.json().catch(() => ({}));
      if (!resp.ok || !data?.ok) throw new Error(data?.error || 'Submission failed.');
      setStatus('success');
      setForm({ name: '', email: '', industry: '', challenge: '', company_website: '' });
    } catch (err: any) {
      setStatus('error');
      setErrorMsg(err?.message || 'Something went wrong. Please email team@hyperwrike.com.');
    }
  }

  if (status === 'success') {
    return (
      <div className="text-center py-8">
        <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 className="w-8 h-8 text-green-600" />
        </div>
        <h3 className="text-2xl font-bold mb-2">You're in. 🎉</h3>
        <p className="text-gray-600 mb-6">A Hyperwrike founder will personally reply within 1 business day with next steps and a calendar link.</p>
        <a
          href="https://calendar.app.google/WpbBqVNkm1YGfunz5"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-black text-white font-semibold hover:scale-[1.02] transition-transform"
        >
          Or book directly now <ArrowRight className="w-4 h-4" />
        </a>
        <button
          onClick={() => setStatus('idle')}
          className="block mx-auto mt-4 text-xs text-gray-500 underline hover:text-black"
        >
          Submit another request
        </button>
      </div>
    );
  }

  return (
    <form
      className="space-y-4 md:space-y-6"
      onSubmit={handleSubmit}
      aria-label="Hyperwrike free consultation request form"
    >
      <div className="flex items-center gap-2 mb-2 text-xs font-semibold text-green-600 uppercase tracking-wider">
        <CheckCircle2 className="w-4 h-4" /> Free · 30 Minutes · No Sales Pitch
      </div>
      <div>
        <label htmlFor="name" className="block text-sm font-bold mb-2">Full Name *</label>
        <input
          id="name" name="name" type="text" autoComplete="name" placeholder="Jane Smith"
          value={form.name} onChange={onChange}
          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-black outline-none transition-colors" required
        />
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-bold mb-2">Business Email *</label>
        <input
          id="email" name="email" type="email" autoComplete="email" placeholder="you@company.com"
          value={form.email} onChange={onChange}
          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-black outline-none transition-colors" required
        />
      </div>
      <div>
        <label htmlFor="industry" className="block text-sm font-bold mb-2">Industry *</label>
        <select
          id="industry" name="industry" value={form.industry} onChange={onChange} required
          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-black outline-none transition-colors bg-white"
        >
          <option value="" disabled>Select your industry…</option>
          <option value="hvac">HVAC</option>
          <option value="dental">Dental</option>
          <option value="roofing">Roofing</option>
          <option value="plumbing">Plumbing</option>
          <option value="car-rental">Car Rental</option>
          <option value="other">Other / Custom</option>
        </select>
      </div>
      <div>
        <label htmlFor="challenge" className="block text-sm font-bold mb-2">Biggest bottleneck? (one line)</label>
        <input
          id="challenge" name="challenge" type="text" placeholder="e.g. Missing after-hours calls"
          value={form.challenge} onChange={onChange}
          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-black outline-none transition-colors"
        />
      </div>
      {/* Honeypot — hidden from humans, bots will fill it */}
      <input
        type="text" name="company_website" tabIndex={-1} autoComplete="off"
        value={form.company_website} onChange={onChange}
        aria-hidden="true"
        style={{ position: 'absolute', left: '-10000px', width: '1px', height: '1px', opacity: 0 }}
      />
      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full py-4 bg-black text-white rounded-xl font-bold hover:scale-[1.02] transition-transform active:scale-95 flex items-center justify-center gap-2 disabled:opacity-70 disabled:hover:scale-100"
      >
        {status === 'loading' ? 'Sending…' : (<>Book My Free AI Automation Call <ArrowRight className="w-5 h-5" /></>)}
      </button>
      {status === 'error' && (
        <p className="text-xs text-red-600 text-center">{errorMsg}</p>
      )}
      <p className="text-xs text-gray-500 text-center">
        Used by HVAC, dental, roofing, plumbing & car rental companies across the US. 100% confidential — we sign NDAs on request.
      </p>
    </form>
  );
}

export default function App() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoOpacity, setVideoOpacity] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cmsMode, setCmsMode] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [loginData, setLoginData] = useState({ username: '', password: '' });
  const [loginError, setLoginError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginData.username === 'Peri' && loginData.password === '1234@') {
      setCmsMode(true);
      setShowLogin(false);
      setLoginError('');
    } else {
      setLoginError('Invalid credentials');
    }
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let rafId: number;

    const updateOpacity = () => {
      if (!video.duration) {
        rafId = requestAnimationFrame(updateOpacity);
        return;
      }

      const currentTime = video.currentTime;
      const duration = video.duration;
      const fadeDuration = 0.5;

      let opacity = 1;

      if (currentTime < fadeDuration) {
        opacity = currentTime / fadeDuration;
      } else if (currentTime > duration - fadeDuration) {
        opacity = (duration - currentTime) / fadeDuration;
      }

      setVideoOpacity(Math.max(0, Math.min(1, opacity)));
      rafId = requestAnimationFrame(updateOpacity);
    };

    rafId = requestAnimationFrame(updateOpacity);

    const handleEnded = () => {
      setVideoOpacity(0);
      setTimeout(() => {
        if (video) {
          video.currentTime = 0;
          video.play().catch(err => console.error("Video play error:", err));
        }
      }, 100);
    };

    video.addEventListener('ended', handleEnded);

    return () => {
      cancelAnimationFrame(rafId);
      video.removeEventListener('ended', handleEnded);
    };
  }, []);

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  return (
    <div className="relative min-h-screen w-full bg-white font-sans text-[#000000] selection:bg-[#000000] selection:text-white flex flex-col">
      {/* CMS Badge */}
      <AnimatePresence>
        {cmsMode && (
          <motion.div 
            initial={{ y: -50 }}
            animate={{ y: 0 }}
            exit={{ y: -50 }}
            className="fixed top-0 left-1/2 -translate-x-1/2 z-[100] bg-blue-600 text-white px-4 py-1 rounded-b-lg text-xs font-bold shadow-lg flex items-center gap-2"
          >
            <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
            CMS MODE ACTIVE
            <button onClick={() => setCmsMode(false)} className="ml-2 hover:underline">Exit</button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100">
        <div className="flex justify-between items-center px-6 md:px-8 py-4 md:py-6 max-w-7xl mx-auto w-full">
          <div 
            className="text-2xl md:text-3xl tracking-tight font-serif cursor-pointer font-bold text-[#000000]"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            Hyperwrike<sup className="text-xs">®</sup>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="text-sm font-medium text-[#000000] transition-colors">Home</button>
            <button onClick={() => scrollTo('services')} className="text-sm font-medium text-[#6F6F6F] hover:text-[#000000] transition-colors">Services</button>
            <button onClick={() => scrollTo('industries')} className="text-sm font-medium text-[#6F6F6F] hover:text-[#000000] transition-colors">Industries</button>
            <button onClick={() => scrollTo('trust')} className="text-sm font-medium text-[#6F6F6F] hover:text-[#000000] transition-colors">Results</button>
            <button onClick={() => scrollTo('faq')} className="text-sm font-medium text-[#6F6F6F] hover:text-[#000000] transition-colors">FAQ</button>
            <button onClick={() => scrollTo('audit')} className="text-sm font-medium text-[#6F6F6F] hover:text-[#000000] transition-colors">Contact</button>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => scrollTo('audit')}
              className="hidden sm:block rounded-full px-6 py-2.5 text-sm font-medium bg-[#000000] text-white transition-transform hover:scale-[1.03] active:scale-95"
            >
              Book Free Call
            </button>
            
            {/* Mobile Menu Toggle */}
            <button 
              className="md:hidden p-2 text-black"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white border-b border-gray-100 overflow-hidden"
            >
              <div className="flex flex-col p-6 gap-4">
                <button onClick={() => { window.scrollTo({ top: 0, behavior: 'smooth' }); setIsMenuOpen(false); }} className="text-left text-lg font-medium">Home</button>
                <button onClick={() => scrollTo('services')} className="text-left text-lg font-medium">Services</button>
                <button onClick={() => scrollTo('industries')} className="text-left text-lg font-medium">Industries</button>
                <button onClick={() => scrollTo('trust')} className="text-left text-lg font-medium">Results</button>
                <button onClick={() => scrollTo('faq')} className="text-left text-lg font-medium">FAQ</button>
                <button onClick={() => scrollTo('audit')} className="text-left text-lg font-medium">Contact</button>
                <button
                  onClick={() => scrollTo('audit')}
                  className="w-full mt-4 rounded-full py-4 text-center font-medium bg-[#000000] text-white"
                >
                  Book Free Call
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section */}
      <header 
        className="relative min-h-screen w-full overflow-hidden flex flex-col items-center justify-center text-center px-6 pb-20 md:pb-40"
        style={{ paddingTop: 'calc(8rem - 75px)' }}
      >
        {/* Background Video Layer */}
        <div 
          className="absolute inset-x-0 bottom-0 z-0 overflow-hidden"
          style={{ top: '300px' }}
        >
          <video
            ref={videoRef}
            src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260328_083109_283f3553-e28f-428b-a723-d639c617eb2b.mp4"
            autoPlay
            muted
            playsInline
            className="h-full w-full object-cover"
            style={{ opacity: videoOpacity }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-white pointer-events-none" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto">
          {/* Trust/urgency badge above H1 */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/5 border border-black/10 backdrop-blur-sm mb-6 text-xs md:text-sm font-medium text-[#000000] animate-fade-rise">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span>Chennai-based · Serving US small businesses · 3 new client slots this month</span>
          </div>

          {/* H1 — primary keyword FIRST (Audit Hack #81 + #191) */}
          <h1
            className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-serif font-normal tracking-tight text-[#000000] animate-fade-rise"
            style={{ lineHeight: '1.05', letterSpacing: '-1.5px' }}
          >
            <CMSContent id="hero_title" defaultText="AI Automation Agency " cmsMode={cmsMode} />
            <span className="italic text-[#6F6F6F]">
              <CMSContent id="hero_subtitle_italic" defaultText="in Chennai" cmsMode={cmsMode} />
            </span>
            <br />
            <span className="text-[#000000]">
              <CMSContent id="hero_title_2" defaultText="Built for US Small Businesses." cmsMode={cmsMode} />
            </span>
          </h1>

          {/* Conversion subheadline: pain → solution → proof (Audit Hack #3) */}
          <p className="text-base sm:text-lg md:text-xl max-w-3xl mx-auto mt-8 leading-relaxed text-[#6F6F6F] animate-fade-rise-delay px-4">
            <CMSContent id="hero_description" defaultText="Missed calls are killing your revenue. Hyperwrike builds AI voice agents that answer 24/7, book appointments and follow up on leads — so HVAC, dental, roofing, plumbing and car rental businesses never lose another customer." cmsMode={cmsMode} />
          </p>

          <div className="mt-12 animate-fade-rise-delay-2 flex flex-col sm:flex-row gap-4 items-center justify-center">
            <button
              onClick={() => scrollTo('audit')}
              className="rounded-full px-10 md:px-14 py-4 md:py-5 text-base font-medium bg-[#000000] text-white transition-transform hover:scale-[1.03] active:scale-95 flex items-center gap-2 shadow-xl shadow-black/20"
              aria-label="Book a free 30 minute AI automation call with Hyperwrike"
            >
              Book My Free 30-Min Call <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => scrollTo('services')}
              className="rounded-full px-8 md:px-10 py-4 md:py-5 text-base font-medium bg-transparent text-[#000000] border border-black/20 hover:bg-black hover:text-white transition-colors"
            >
              See How It Works
            </button>
          </div>

          <div className="mt-10 text-xs md:text-sm text-[#6F6F6F] flex flex-wrap items-center justify-center gap-x-4 gap-y-2 animate-fade-rise-delay-2">
            <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-green-600" /> 4.7× average ROI</span>
            <span className="hidden sm:inline">·</span>
            <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-green-600" /> Live in 2–4 weeks</span>
            <span className="hidden sm:inline">·</span>
            <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-green-600" /> 100% code ownership</span>
            <span className="hidden sm:inline">·</span>
            <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-green-600" /> No vendor lock-in</span>
          </div>
        </div>
      </header>

      {/* Featured Testimonial — immediately after hero */}
      <section id="featured-testimonial" className="py-16 md:py-20 px-6 md:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="rounded-3xl border border-gray-200 bg-gray-50 p-8 md:p-12 shadow-[0_30px_70px_-40px_rgba(0,0,0,0.25)]">
            <div className="text-center mb-10">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-gray-200 text-xs font-semibold uppercase tracking-wider text-[#6F6F6F] mb-6">
                <Quote className="w-3.5 h-3.5 text-[#000000]" /> Client Transformation
              </span>
              <h2 className="text-3xl md:text-5xl font-serif text-[#000000]">
                “Hyperwrike fixed the exact bottlenecks holding us back.”
              </h2>
            </div>

            <blockquote className="max-w-4xl mx-auto">
              <p className="text-lg md:text-xl leading-relaxed text-[#6F6F6F] text-center">
                “Before Hyperwrike, our support was slow, our backend workflows were manual, and our website wasn’t converting.
                They helped us launch an AI chatbot for faster customer response, automated the repetitive backend work, and rebuilt
                our website around conversion. The biggest win? We got enterprise-level execution without hiring a large team or paying agency overhead.”
              </p>
            </blockquote>

            <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="rounded-2xl bg-white border border-gray-200 p-6">
                <div className="text-xs font-bold uppercase tracking-wider text-[#6F6F6F] mb-2">Support</div>
                <p className="text-sm md:text-base text-[#000000] leading-relaxed">
                  Slow response times <strong>→</strong> AI chatbot-enabled instant replies
                </p>
              </div>
              <div className="rounded-2xl bg-white border border-gray-200 p-6">
                <div className="text-xs font-bold uppercase tracking-wider text-[#6F6F6F] mb-2">Operations</div>
                <p className="text-sm md:text-base text-[#000000] leading-relaxed">
                  Manual backend tasks <strong>→</strong> automated workflows
                </p>
              </div>
              <div className="rounded-2xl bg-white border border-gray-200 p-6">
                <div className="text-xs font-bold uppercase tracking-wider text-[#6F6F6F] mb-2">Growth</div>
                <p className="text-sm md:text-base text-[#000000] leading-relaxed">
                  Low-converting site <strong>→</strong> conversion-focused rebuild
                </p>
              </div>
            </div>

            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => scrollTo('audit')}
                className="rounded-full px-10 py-4 text-base font-medium bg-[#000000] text-white transition-transform hover:scale-[1.03] active:scale-95 flex items-center gap-2"
              >
                Book a Strategy Call <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => scrollTo('trust')}
                className="rounded-full px-8 py-4 text-base font-medium bg-transparent text-[#000000] border border-black/20 hover:bg-black hover:text-white transition-colors"
              >
                See More Client Results
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Strip Section */}
      <section className="py-16 md:py-20 px-6 md:px-8 bg-gray-50 border-y border-gray-100">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-2xl md:text-4xl font-serif mb-6">
            <CMSContent id="cta_strip_title" defaultText="Stop doing it manually. Let Hyperwrike handle it." cmsMode={cmsMode} />
          </h3>
          <p className="text-base md:text-lg text-[#6F6F6F] mb-10">
            <CMSContent id="cta_strip_desc" defaultText="Book a free 30-min call. Walk away with a clear automation roadmap — no commitment." cmsMode={cmsMode} />
          </p>
          <button 
            onClick={() => scrollTo('audit')}
            className="rounded-full px-8 md:px-10 py-3 md:py-4 text-base md:text-lg font-medium bg-[#000000] text-white transition-transform hover:scale-105 active:scale-95 flex items-center gap-2 mx-auto"
          >
            Book My Free Call <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </section>

      {/* Services Section — SEO-targeted (keyword-rich H2) */}
      <section id="services" className="py-20 md:py-32 px-6 md:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 md:mb-20">
            <span className="inline-block px-4 py-1.5 rounded-full bg-gray-100 text-[#6F6F6F] text-xs font-semibold uppercase tracking-wider mb-6">Services</span>
            <h2 className="text-4xl md:text-6xl font-serif mb-6 text-[#000000]">
              <CMSContent id="services_title" defaultText="AI Voice Agents & Workflow Automation That Pay for Themselves" cmsMode={cmsMode} />
            </h2>
            <p className="text-lg md:text-xl text-[#6F6F6F] max-w-3xl mx-auto leading-relaxed">
              <CMSContent id="services_subtitle" defaultText="Hyperwrike is an AI automation agency in Chennai that builds three things US small businesses actually use: AI voice agents, workflow automation, and custom software — delivered in weeks, not months." cmsMode={cmsMode} />
            </p>
          </div>

          <div className="space-y-12 md:space-y-24">
            <ServiceBlock
              badge="AI Voice Agent"
              title="Never miss another call. Or another lead."
              description="Our AI voice agents answer every incoming call 24/7 — even at 2 AM on a Sunday. They qualify leads, book appointments directly into your calendar, answer FAQs, and hand off to your team only when it actually matters. Most clients recover the setup cost from recaptured missed calls in the first 30 days."
              tags={["Answers in <2s", "Books Appointments", "CRM Sync", "Natural Voice AI"]}
              imageSide="left"
              visual={<TaskListMockup />}
            />

            <ServiceBlock
              badge="Workflow Automation"
              title="Your entire back-office on autopilot"
              description="Stop paying humans to copy data between tools. We connect your CRM, phone system, email, calendar, invoicing and reporting into one seamless flow. Lead comes in → qualified → scheduled → invoiced → followed up — without anyone touching a spreadsheet. Save 40–70% on operational costs within 90 days."
              tags={["CRM + Calendar Sync", "Lead Follow-up", "Invoice Automation", "Daily Reports"]}
              imageSide="right"
              visual={<DashboardMockup />}
            />

            <ServiceBlock
              badge="Custom Software"
              title="Custom software, built for how your business actually works"
              description="Off-the-shelf tools force your business to bend around them. We build bespoke software and internal AI tools that match your exact workflow — scalable, secure, and 100% owned by you. No templates, no vendor lock-in, no per-seat pricing nightmares."
              tags={["100% Ownership", "No Vendor Lock-in", "Scalable Architecture", "Full Source Code"]}
              imageSide="left"
              visual={<IntegrationMockup />}
            />
          </div>

          {/* Additional Services Grid - Redesigned to match Image 1 */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mt-20">
            {/* AI Consulting - Large Glass Card */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="md:col-span-7 p-10 rounded-[2rem] bg-blue-50/50 backdrop-blur-xl border border-blue-100 relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                <div className="flex space-x-[-10px]">
                  <div className="w-12 h-12 rounded-full border-2 border-blue-600" />
                  <div className="w-12 h-12 rounded-full border-2 border-blue-600" />
                  <div className="w-12 h-12 rounded-full border-2 border-blue-600" />
                </div>
              </div>
              
              <div className="relative z-10">
                <h4 className="text-3xl font-bold tracking-tight mb-2 uppercase">AI SYNERGY</h4>
                <h4 className="text-3xl font-bold tracking-tight mb-8 uppercase">SOLUTION SYSTEMS:</h4>
                
                <p className="text-blue-900/70 font-medium max-w-md mb-12 uppercase text-sm tracking-widest leading-relaxed">
                  We are committed to revolutionizing the way businesses operate in the digital era. Harnessing the power of cutting-edge artificial intelligence technologies.
                </p>
                
                <div className="mt-auto">
                  <div className="flex justify-between items-end mb-4">
                    <span className="text-5xl font-light">60 %</span>
                    <span className="text-[10px] font-bold tracking-tighter bg-blue-100 px-3 py-1 rounded-full uppercase">Development Stage</span>
                  </div>
                  <div className="h-2 w-full bg-blue-200/50 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: '60%' }}
                      transition={{ duration: 1.5, ease: "easeOut" }}
                      className="h-full bg-blue-600"
                    />
                  </div>
                </div>
              </div>
              
              <div className="absolute bottom-6 left-10">
                <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
                  <div className="w-3 h-3 bg-white rounded-sm rotate-45" />
                </div>
              </div>
            </motion.div>

            {/* System Integrations - Dark Card */}
            <div className="md:col-span-5 flex flex-col gap-6">
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex-1 p-8 rounded-[2rem] bg-[#0A0A0A] text-white border border-white/10 relative overflow-hidden group"
              >
                <div className="flex justify-between items-start mb-6">
                  <span className="text-xs font-medium opacity-60">CogniBot</span>
                  <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-[10px]">1</div>
                </div>
                <h4 className="text-2xl font-medium mb-6 underline underline-offset-8 decoration-white/20">Customer Support</h4>
                <p className="text-sm text-white/50 leading-relaxed mb-8">
                  It can handle customer queries, provide personalized recommendations, and deliver an exceptional user experience, all while reducing support costs.
                </p>
                <div className="flex gap-1">
                  <div className="w-3 h-3 bg-white/10 rounded-sm" />
                  <div className="w-3 h-3 bg-blue-600 rounded-sm" />
                  <div className="w-3 h-3 bg-white/10 rounded-sm" />
                  <div className="w-3 h-3 bg-white/10 rounded-sm" />
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                viewport={{ once: true }}
                className="flex-1 p-8 rounded-[2rem] bg-gray-50 border border-gray-200 relative overflow-hidden group"
              >
                <div className="flex justify-between items-start mb-6">
                  <span className="text-xs font-bold text-black">SecureSense</span>
                  <div className="w-8 h-8 rounded-full border border-black/10 flex items-center justify-center text-[10px]">2</div>
                </div>
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-6 h-6 rounded-full border border-black/20 flex items-center justify-center">
                    <div className="w-2 h-2 bg-black rounded-full" />
                  </div>
                  <h4 className="text-2xl font-medium underline underline-offset-8 decoration-black/10">Cybersecurity</h4>
                </div>
                <p className="text-sm text-black/50 leading-relaxed">
                  Powered by advanced threat detection algorithms and behavioral analytics, SecureSense proactively identifies and mitigates security threats.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* INDUSTRIES SECTION — Targets niche keywords (AI voice agent for HVAC/dental/roofing/plumbing/car rental) */}
      <section id="industries" className="py-20 md:py-32 px-6 md:px-8 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <span className="inline-block px-4 py-1.5 rounded-full bg-black text-white text-xs font-semibold uppercase tracking-wider mb-6">Industries We Serve</span>
            <h2 className="text-4xl md:text-6xl font-serif mb-6 text-[#000000]">
              <CMSContent id="industries_title" defaultText="AI Voice Agents Built for Your Industry" cmsMode={cmsMode} />
            </h2>
            <p className="text-lg md:text-xl text-[#6F6F6F] max-w-3xl mx-auto leading-relaxed">
              <CMSContent id="industries_subtitle" defaultText="Generic chatbots miss the nuance of a plumbing emergency or a dental no-show. We train industry-specific AI voice agents that know your vocabulary, your workflows, and your customers." cmsMode={cmsMode} />
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: <Wrench className="w-8 h-8" />,
                title: "AI Voice Agent for HVAC Companies",
                desc: "Book same-day service calls, dispatch technicians, and capture after-hours emergencies that your competitors miss.",
                keyword: "HVAC",
                stat: "+38% booked jobs",
              },
              {
                icon: <Stethoscope className="w-8 h-8" />,
                title: "AI Voice Agent for Dental Clinics",
                desc: "Handle new-patient intake, confirm appointments, and cut no-shows with automated reminders and rescheduling.",
                keyword: "Dental",
                stat: "-52% no-shows",
              },
              {
                icon: <HomeIcon className="w-8 h-8" />,
                title: "AI Voice Agent for Roofing Companies",
                desc: "Qualify storm-damage leads 24/7, book inspections, and never lose a job to a faster-responding competitor again.",
                keyword: "Roofing",
                stat: "3× lead response",
              },
              {
                icon: <Droplet className="w-8 h-8" />,
                title: "AI Voice Agent for Plumbers",
                desc: "Instantly answer emergency calls, triage urgency, and dispatch the right plumber — even at 3 AM.",
                keyword: "Plumbing",
                stat: "24/7 coverage",
              },
              {
                icon: <Car className="w-8 h-8" />,
                title: "AI Voice Agent for Car Rental",
                desc: "Automate bookings, upsells, damage-claim intake, and return reminders — across every time zone.",
                keyword: "Car Rental",
                stat: "+22% upsell rate",
              },
              {
                icon: <Phone className="w-8 h-8" />,
                title: "Custom — Built for Your Niche",
                desc: "Law firms, clinics, contractors, real estate. If your business runs on phone calls, we can automate the first answer.",
                keyword: "Custom",
                stat: "Book a scoping call",
                cta: true,
              },
            ].map((ind, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                viewport={{ once: true }}
                onClick={() => scrollTo('audit')}
                className={`group p-8 rounded-3xl border transition-all duration-300 cursor-pointer ${
                  ind.cta
                    ? 'bg-black text-white border-black hover:bg-gray-900'
                    : 'bg-white border-gray-200 hover:border-black hover:shadow-2xl hover:-translate-y-1'
                }`}
              >
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${
                  ind.cta ? 'bg-white text-black' : 'bg-black text-white group-hover:bg-blue-600'
                } transition-colors`}>
                  {ind.icon}
                </div>
                <h3 className={`text-xl font-bold mb-3 leading-tight ${ind.cta ? 'text-white' : 'text-[#000000]'}`}>
                  {ind.title}
                </h3>
                <p className={`text-sm leading-relaxed mb-6 ${ind.cta ? 'text-white/70' : 'text-[#6F6F6F]'}`}>
                  {ind.desc}
                </p>
                <div className={`flex items-center justify-between pt-4 border-t ${ind.cta ? 'border-white/10' : 'border-gray-100'}`}>
                  <span className={`text-xs font-bold uppercase tracking-wider ${ind.cta ? 'text-white/50' : 'text-[#6F6F6F]'}`}>
                    {ind.keyword}
                  </span>
                  <span className={`text-sm font-semibold flex items-center gap-1 ${ind.cta ? 'text-white' : 'text-[#000000] group-hover:text-blue-600'} transition-colors`}>
                    {ind.stat} <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Tamil Nadu / Chennai local callout (Audit Section 6) */}
          <div className="mt-16 text-center">
            <p className="text-sm text-[#6F6F6F] max-w-2xl mx-auto">
              Headquartered in <strong className="text-[#000000]">Chennai, Tamil Nadu</strong> · Serving clients across the United States & India · Remote delivery worldwide
            </p>
          </div>
        </div>
      </section>

      {/* VIDEO TESTIMONIAL — Above-the-fold trust anchor (Audit: conversion + E-E-A-T) */}
      <section id="video-testimonial" className="py-20 md:py-32 px-6 md:px-8 bg-black text-white relative overflow-hidden">
        {/* Background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-xs font-semibold uppercase tracking-wider mb-6">
              <Quote className="w-3 h-3" /> Real Client · Real Results
            </span>
            <h2 className="text-4xl md:text-6xl font-serif mb-6">
              <CMSContent id="video_title" defaultText="Don't take our word for it." cmsMode={cmsMode} />
            </h2>
            <p className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto leading-relaxed">
              <CMSContent id="video_subtitle" defaultText="Hear directly from a Hyperwrike client about how our AI voice agent transformed their operations." cmsMode={cmsMode} />
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-center">
            {/* Video Player — 9:16 vertical (portrait) */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-2 relative rounded-3xl overflow-hidden shadow-2xl shadow-blue-500/20 border border-white/10 bg-black mx-auto w-full max-w-sm"
            >
              <video
                src="/client-testimonial.mp4"
                controls
                playsInline
                preload="metadata"
                poster=""
                className="w-full h-auto aspect-[9/16] object-cover"
                aria-label="Hyperwrike client testimonial video from Jammi Pharma"
              >
                Your browser does not support the video tag. Please contact us at team@hyperwrike.com.
              </video>
              {/* Live verified client badge */}
              <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-black/60 backdrop-blur-sm text-xs font-medium flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" /> VERIFIED CLIENT
              </div>
              {/* Client brand chip overlay */}
              <div className="absolute bottom-4 left-4 right-4 px-3 py-2 rounded-xl bg-black/70 backdrop-blur-sm text-xs font-medium flex items-center justify-between">
                <span className="text-white">Jammi Pharma</span>
                <a
                  href="https://jammi.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-300 hover:text-blue-200 underline underline-offset-2"
                >
                  jammi.in →
                </a>
              </div>
            </motion.div>

            {/* Side trust stack */}
            <div className="lg:col-span-3 space-y-6">
              <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                <div className="flex gap-1 mb-3">
                  {[1,2,3,4,5].map(i => <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />)}
                </div>
                <p className="text-lg leading-relaxed text-white/90 mb-4">
                  "Hyperwrike's AI automation transformed how we handle customer interactions and order flow. The system paid for itself fast — we're now scaling it across the business."
                </p>
                <div className="text-sm text-white/60">
                  <div className="font-semibold text-white">Jammi Pharma</div>
                  <div>
                    Verified Client ·{" "}
                    <a
                      href="https://jammi.in"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline underline-offset-2 hover:text-white"
                    >
                      jammi.in
                    </a>
                    {" "}· Hyperwrike customer since 2026
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                  <div className="text-3xl font-serif text-white">4.9★</div>
                  <div className="text-xs text-white/50 mt-1 uppercase tracking-wider">Avg Rating</div>
                </div>
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                  <div className="text-3xl font-serif text-white">4.7×</div>
                  <div className="text-xs text-white/50 mt-1 uppercase tracking-wider">Average ROI</div>
                </div>
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                  <div className="text-3xl font-serif text-white">30 days</div>
                  <div className="text-xs text-white/50 mt-1 uppercase tracking-wider">Avg Payback</div>
                </div>
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                  <div className="text-3xl font-serif text-white">24/7</div>
                  <div className="text-xs text-white/50 mt-1 uppercase tracking-wider">Coverage</div>
                </div>
              </div>

              <button
                onClick={() => scrollTo('audit')}
                className="w-full rounded-full py-4 text-base font-semibold bg-white text-black hover:bg-gray-100 transition-colors flex items-center justify-center gap-2"
              >
                Book My Free Call <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section (Why Choose Hyperwrike) */}
      <Section 
        id="benefits" 
        className="bg-[#FAFAFA]"
        cmsMode={cmsMode}
        titleComponent={
          <div className="text-center mb-4">
            <span className="inline-block px-4 py-1.5 rounded-full bg-black text-white text-xs font-semibold uppercase tracking-wider mb-6">Why Hyperwrike</span>
            <h2 className="text-3xl md:text-6xl font-serif text-gray-900">
              <CMSContent id="benefits_title_1" defaultText="The AI Automation Agency " cmsMode={cmsMode} />
              <span className="text-blue-600 italic">
                <CMSContent id="benefits_title_2" defaultText="that actually delivers" cmsMode={cmsMode} />
              </span>
            </h2>
            <p className="text-base md:text-lg text-[#6F6F6F] mt-4 max-w-2xl mx-auto">
              Most agencies sell strategy slides. We ship working automations that save money, time, and missed revenue — measurable from day one.
            </p>
          </div>
        }
      >
        {/* Background Decorative Lines */}
        <div className="absolute inset-0 pointer-events-none opacity-40">
          <div className="absolute top-[20%] left-0 w-full h-px bg-gray-200" />
          <div className="absolute top-[40%] left-0 w-full h-px bg-gray-200" />
          <div className="absolute top-[60%] left-0 w-full h-px bg-gray-200" />
          <div className="absolute top-[80%] left-0 w-full h-px bg-gray-200" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12 md:gap-y-24 pt-10 md:pt-20 relative z-10 max-w-5xl mx-auto">
          {[
            { id: "benefit_1", icon: <DollarSign className="w-10 h-10" />, title: "Save 40–70%", desc: "On operational costs within 90 days through intelligent automation.", color: "yellow", rotation: "-3", yOffset: 0 },
            { id: "benefit_2", icon: <LayoutGrid className="w-10 h-10" />, title: "100% Custom", desc: "Nothing off the shelf. Everything built specifically for your business needs.", color: "purple", rotation: "2", yOffset: 40 },
            { id: "benefit_3", icon: <TrendingUp className="w-10 h-10" />, title: "4.7x ROI", desc: "Average return on investment across all Hyperwrike projects.", color: "pink", rotation: "-2", yOffset: 0 },
            { id: "benefit_4", icon: <ShieldCheck className="w-10 h-10" />, title: "Full Ownership", desc: "You own everything we build. Always. No vendor lock-in.", color: "blue", rotation: "3", yOffset: 40 }
          ].map((benefit, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30, rotate: i % 2 === 0 ? -5 : 5 }}
              whileInView={{ opacity: 1, y: 0, rotate: 0 }}
              transition={{ duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true }}
              className="w-full flex justify-center"
            >
              <BenefitCard 
                icon={benefit.icon}
                title={cmsMode ? <CMSContent id={`${benefit.id}_title`} defaultText={benefit.title} cmsMode={cmsMode} as="span" /> : benefit.title}
                desc={cmsMode ? <CMSContent id={`${benefit.id}_desc`} defaultText={benefit.desc} cmsMode={cmsMode} as="span" /> : benefit.desc}
                color={benefit.color}
                rotation={benefit.rotation}
                yOffset={typeof window !== 'undefined' && window.innerWidth > 768 ? benefit.yOffset : 0}
                delay={0}
              />
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Trust Section (Results) */}
      <Testimonials />

      {/* Reach Us Section (Get Started) */}
      <section id="audit" className="py-16 md:py-24 px-6 md:px-8 bg-black text-white relative overflow-hidden">
        {/* Decorative background element */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-white/5 skew-x-12 translate-x-1/2 pointer-events-none" />
        
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-center relative z-10">
          <div>
            <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-xs font-semibold uppercase tracking-wider mb-6">Book Free Call</span>
            <h2 className="text-3xl md:text-6xl font-serif mb-6 md:mb-8">
              <CMSContent id="audit_title" defaultText="Get Your Free AI Automation Roadmap" cmsMode={cmsMode} />
            </h2>
            <p className="text-lg md:text-xl text-gray-400 mb-8 leading-relaxed">
              <CMSContent id="audit_desc" defaultText="A 30-minute working call with our founders. We'll audit one workflow, identify your highest-ROI automation, and send you a tailored roadmap — free, no sales pitch, no obligation." cmsMode={cmsMode} />
            </p>
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/10 flex items-center justify-center font-serif text-lg md:text-xl">1</div>
                <p className="text-gray-300 text-sm md:text-base">Tell us your biggest operational bottleneck</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/10 flex items-center justify-center font-serif text-lg md:text-xl">2</div>
                <p className="text-gray-300 text-sm md:text-base">We audit the workflow and identify AI opportunities</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/10 flex items-center justify-center font-serif text-lg md:text-xl">3</div>
                <p className="text-gray-300 text-sm md:text-base">Receive a custom roadmap with ROI projections</p>
              </div>
            </div>

            {/* Alt contact CTA */}
            <div className="mt-10 pt-10 border-t border-white/10 space-y-3 text-sm text-gray-400">
              <p>Prefer email? <a href="mailto:team@hyperwrike.com" className="text-white underline underline-offset-4 hover:text-blue-400 transition-colors">team@hyperwrike.com</a></p>
              <p>Or book directly on our <a href="https://calendar.app.google/WpbBqVNkm1YGfunz5" target="_blank" rel="noopener noreferrer" className="text-white underline underline-offset-4 hover:text-blue-400 transition-colors">Google Calendar</a></p>
            </div>
          </div>
          <div className="bg-white p-6 md:p-10 rounded-3xl text-black shadow-2xl">
            <ContactForm />
          </div>
        </div>
      </section>

      {/* FAQ Section - Redesigned to match Image 2 */}
      <section id="faq" className="bg-[#050505] py-20 md:py-32 px-6 md:px-8 relative overflow-hidden">
        {/* Purple Glow Background */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[800px] h-[300px] md:h-[800px] bg-purple-600/10 blur-[60px] md:blur-[120px] rounded-full pointer-events-none" />
        
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-16 relative z-10">
          {/* Left Side: Title & Description */}
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-6xl font-bold tracking-tight text-white mb-6 md:mb-8">
                <CMSContent id="faq_title" defaultText="Got Questions? We've Got Answers." cmsMode={cmsMode} />
              </h2>
              <p className="text-base md:text-lg text-white/50 leading-relaxed max-w-md">
                <CMSContent id="faq_subtitle" defaultText="Everything you need to know about Hyperwrike — from features and pricing to support and security." cmsMode={cmsMode} />
              </p>
            </motion.div>
          </div>

          {/* Right Side: Accordion — PAA-aligned, matches FAQPage schema in index.html */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            {[
              { id: "faq_1", q: "What is Hyperwrike and what does it do?", a: "Hyperwrike is an AI automation agency in Chennai that builds AI voice agents and workflow automation for US small businesses — including HVAC, dental, roofing, plumbing, and car rental companies. We help you never miss a lead and cut manual operations by 40–70%." },
              { id: "faq_2", q: "How much does an AI voice agent cost for a small business?", a: "Hyperwrike builds AI voice agents starting under $1,000 setup with predictable monthly plans. Most clients recover the cost within the first 30–60 days from captured missed calls alone." },
              { id: "faq_3", q: "How fast can Hyperwrike deploy an AI voice agent?", a: "Standard AI voice agent deployments go live in 2–4 weeks. Complex custom automations with CRM and telephony integrations typically take 4–8 weeks. Most clients see measurable operational savings within the first 90 days." },
              { id: "faq_4", q: "Does Hyperwrike work with businesses outside Chennai?", a: "Yes. Hyperwrike is headquartered in Chennai, Tamil Nadu but primarily serves US small businesses in home services (HVAC, plumbing, roofing), dental clinics, and car rental operators. All delivery is fully remote." },
              { id: "faq_5", q: "Do I own the code and automations Hyperwrike builds?", a: "Yes — 100% ownership. There is no vendor lock-in. All code, workflows, prompts, and integrations are handed over in full. You can host, modify, or migrate them anywhere, anytime." },
              { id: "faq_6", q: "Is my data private and secure with Hyperwrike?", a: "Absolutely. Hyperwrike uses encrypted data pipelines, region-locked storage, and role-based access controls. We sign NDAs on request and never train third-party models on your private data." }
            ].map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                <details className="group bg-[#111111] border border-white/5 rounded-2xl overflow-hidden hover:border-purple-500/30 transition-all duration-300">
                  <summary className="list-none w-full p-5 md:p-6 text-left flex justify-between items-center cursor-pointer hover:bg-white/5 transition-colors">
                    <span className="text-base md:text-lg font-medium text-white/90">
                      {cmsMode ? <CMSContent id={`${faq.id}_q`} defaultText={faq.q} cmsMode={cmsMode} as="span" /> : faq.q}
                    </span>
                    <div className="w-6 h-6 rounded-full border border-white/10 flex items-center justify-center group-hover:border-purple-500/50 transition-colors">
                      <ChevronDown className="w-4 h-4 text-white/40 group-hover:text-purple-400 transition-transform group-open:rotate-180" />
                    </div>
                  </summary>
                  <div className="px-5 md:px-6 pb-5 md:pb-6 text-white/50 leading-relaxed text-sm">
                    {cmsMode ? <CMSContent id={`${faq.id}_a`} defaultText={faq.a} cmsMode={cmsMode} as="span" /> : faq.a}
                  </div>
                </details>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <HoverFooter onLogoClick={() => setShowLogin(true)} />

      {/* Floating AI chatbot — Groq-powered, server-proxied */}
      <AIChatbot />
    </div>
  );
}



