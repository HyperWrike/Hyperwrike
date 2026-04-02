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
  Save
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import HoverFooter from './components/HoverFooter';
import Testimonials from './components/Testimonials';
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
            <button onClick={() => scrollTo('services')} className="text-sm font-medium text-[#6F6F6F] hover:text-[#000000] transition-colors">Studio</button>
            <button onClick={() => scrollTo('benefits')} className="text-sm font-medium text-[#6F6F6F] hover:text-[#000000] transition-colors">About</button>
            <button onClick={() => scrollTo('trust')} className="text-sm font-medium text-[#6F6F6F] hover:text-[#000000] transition-colors">Journal</button>
            <button onClick={() => scrollTo('audit')} className="text-sm font-medium text-[#6F6F6F] hover:text-[#000000] transition-colors">Reach Us</button>
          </div>

          <div className="flex items-center gap-4">
            <button 
              onClick={() => scrollTo('audit')}
              className="hidden sm:block rounded-full px-6 py-2.5 text-sm font-medium bg-[#000000] text-white transition-transform hover:scale-[1.03] active:scale-95"
            >
              Begin Journey
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
                <button onClick={() => scrollTo('services')} className="text-left text-lg font-medium">Studio</button>
                <button onClick={() => scrollTo('benefits')} className="text-left text-lg font-medium">About</button>
                <button onClick={() => scrollTo('trust')} className="text-left text-lg font-medium">Journal</button>
                <button onClick={() => scrollTo('audit')} className="text-left text-lg font-medium">Reach Us</button>
                <button 
                  onClick={() => scrollTo('audit')}
                  className="w-full mt-4 rounded-full py-4 text-center font-medium bg-[#000000] text-white"
                >
                  Begin Journey
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
          <h1 
            className="text-4xl sm:text-6xl md:text-8xl font-serif font-normal tracking-tight text-[#000000] animate-fade-rise"
            style={{ lineHeight: '1.1', letterSpacing: '-1.5px' }}
          >
            <CMSContent id="hero_title" defaultText="Hyperwrike — " cmsMode={cmsMode} />
            <span className="italic text-[#6F6F6F]">
              <CMSContent id="hero_subtitle_italic" defaultText="AI Automation & Custom Software Agency" cmsMode={cmsMode} />
            </span>
          </h1>
          
          <p className="text-base sm:text-lg max-w-2xl mx-auto mt-8 leading-relaxed text-[#6F6F6F] animate-fade-rise-delay px-4">
            <CMSContent id="hero_description" defaultText="We automate your business and build software that scales. Through the noise, we craft digital havens for deep work and pure flows." cmsMode={cmsMode} />
          </p>

          <div className="mt-12 animate-fade-rise-delay-2">
            <button 
              onClick={() => scrollTo('audit')}
              className="rounded-full px-10 md:px-14 py-4 md:py-5 text-base font-medium bg-[#000000] text-white transition-transform hover:scale-[1.03] active:scale-95"
            >
              Begin Journey
            </button>
          </div>

          <div className="mt-8 text-xs md:text-sm text-[#6F6F6F] flex items-center justify-center gap-4 animate-fade-rise-delay-2">
            <span>100+ Projects</span>
            <span>·</span>
            <span>98% Satisfaction</span>
            <span>·</span>
            <span>Worldwide</span>
          </div>
        </div>
      </header>

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

      {/* Services Section (What We Do) */}
      <section id="services" className="py-20 md:py-32 px-6 md:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 md:mb-20">
            <h2 className="text-4xl md:text-6xl font-serif mb-6 text-[#000000]">
              <CMSContent id="services_title" defaultText="What Hyperwrike Does" cmsMode={cmsMode} />
            </h2>
            <p className="text-lg md:text-xl text-[#6F6F6F] max-w-3xl mx-auto leading-relaxed">
              <CMSContent id="services_subtitle" defaultText="We design, develop, and implement automation tools that help you work smarter, not harder." cmsMode={cmsMode} />
            </p>
          </div>

          <div className="space-y-12 md:space-y-24">
            <ServiceBlock 
              badge="AI Automation"
              title="Automate repetitive tasks"
              description="We help you streamline internal operations by automating manual workflows like data entry, reporting, and approval chains, saving time and cutting down errors."
              tags={["Internal Task Bots", "100+ Automations", "Error Reduction"]}
              imageSide="left"
              visual={<TaskListMockup />}
            />

            <ServiceBlock 
              badge="Custom Software"
              title="Built for you, not everyone"
              description="We design and develop bespoke software solutions tailored to your unique business needs. No templates, no compromises — just high-performance technology that scales with you."
              tags={["Scalable Architecture", "Bespoke Design", "Full Ownership"]}
              imageSide="right"
              visual={<DashboardMockup />}
            />

            <ServiceBlock 
              badge="Workflow Automation"
              title="Your entire operation on autopilot"
              description="Connect your existing tools and create seamless, automated workflows that keep your business moving 24/7. From lead capture to fulfillment, we automate the journey."
              tags={["System Integrations", "24/7 Operations", "Seamless Flows"]}
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

      {/* Benefits Section (Why Choose Hyperwrike) */}
      <Section 
        id="benefits" 
        className="bg-[#FAFAFA]"
        cmsMode={cmsMode}
        titleComponent={
          <div className="text-center mb-4">
            <h2 className="text-3xl md:text-6xl font-serif text-gray-900">
              <CMSContent id="benefits_title_1" defaultText="Why Choose " cmsMode={cmsMode} />
              <span className="text-blue-600 italic">
                <CMSContent id="benefits_title_2" defaultText="Hyperwrike" cmsMode={cmsMode} />
              </span>
            </h2>
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
            <h2 className="text-3xl md:text-6xl font-serif mb-6 md:mb-8">
              <CMSContent id="audit_title" defaultText="Work With Hyperwrike" cmsMode={cmsMode} />
            </h2>
            <p className="text-lg md:text-xl text-gray-400 mb-8 leading-relaxed">
              <CMSContent id="audit_desc" defaultText="Got a manual process? A software idea? A broken workflow? Hyperwrike fixes it. Book a free 30-min call — no commitment, no jargon." cmsMode={cmsMode} />
            </p>
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/10 flex items-center justify-center font-serif text-lg md:text-xl">1</div>
                <p className="text-gray-300 text-sm md:text-base">Submit your biggest challenge</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/10 flex items-center justify-center font-serif text-lg md:text-xl">2</div>
                <p className="text-gray-300 text-sm md:text-base">Our team audits your workflow</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/10 flex items-center justify-center font-serif text-lg md:text-xl">3</div>
                <p className="text-gray-300 text-sm md:text-base">Receive your custom roadmap</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 md:p-10 rounded-3xl text-black shadow-2xl">
            <form className="space-y-4 md:space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label className="block text-sm font-bold mb-2">Name *</label>
                <input type="text" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-black outline-none transition-colors" required />
              </div>
              <div>
                <label className="block text-sm font-bold mb-2">Business Email *</label>
                <input type="email" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-black outline-none transition-colors" required />
              </div>
              <div>
                <label className="block text-sm font-bold mb-2">Biggest operational challenge? (one line)</label>
                <input type="text" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-black outline-none transition-colors" />
              </div>
              <button className="w-full py-4 bg-black text-white rounded-xl font-bold hover:scale-[1.02] transition-transform active:scale-95">
                Book My Free Hyperwrike Call →
              </button>
              <p className="text-xs text-gray-500 text-center">
                Free. Fast. No obligation.
              </p>
            </form>
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

          {/* Right Side: Accordion */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            {[
              { id: "faq_1", q: "What is Hyperwrike and how does it work?", a: "Hyperwrike is an intelligent AI automation agency designed to help you work smarter, not harder. We build custom software and automate repetitive tasks to streamline your entire operation." },
              { id: "faq_2", q: "How fast can we see results?", a: "Most clients see significant operational cost savings within the first 90 days. Automations can often be deployed in as little as 2-4 weeks." },
              { id: "faq_3", q: "Is my data private and secure?", a: "Absolutely. We prioritize security in every build. You own 100% of the code and data we create for you." },
              { id: "faq_4", q: "Do I need any technical skills to use Hyperwrike?", a: "No. We handle all the technical heavy lifting. We build intuitive interfaces that your team can use without any specialized training." }
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
    </div>
  );
}



