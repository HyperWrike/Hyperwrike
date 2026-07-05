'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="nav-wrap">
      <nav className="nav">
        <Link className="logo on-ink" href="/" aria-label="Hyperwrike home">
          <span className="mark" aria-hidden="true">
            <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="3" y="20" width="5" height="9" rx="2" fill="currentColor"/>
              <rect x="13.5" y="14" width="5" height="15" rx="2" fill="currentColor"/>
              <rect x="24" y="3" width="5" height="26" rx="2" fill="#C8EF4A"/>
              <path d="M5.5 19 L16 12 L26.5 4.5" stroke="#C8EF4A" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
              <circle cx="26.5" cy="4.5" r="3.4" fill="#0B0D10" stroke="#C8EF4A" strokeWidth="2.2"/>
            </svg>
          </span>
          <span className="wm">Hyperwrike</span>
        </Link>

        <div className="nav-links">
          <a href="#services" className="active"><span className="dot"></span>Services</a>
          <a href="#industries">Industries</a>
          <a href="#process">How we work</a>
          <a href="#testimonials">Testimonials</a>
        </div>

        <div className="right">
          <button className="icon-btn" id="navSearch" aria-label="Ask the Hyperwrike Agent" title="Ask the Hyperwrike Agent">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <circle cx="11" cy="11" r="7"/>
              <path d="m20 20-3.5-3.5"/>
            </svg>
          </button>
          <a className="nav-cta" href="https://calendar.app.google/BQf3Egpa9gxmyxPb8" target="_blank" rel="noopener">
            <span className="lbl-lg">Book a call</span>
            <span className="lbl-sm">Book</span>
            <span className="nub">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                <path d="m9 6 6 6-6 6"/>
              </svg>
            </span>
          </a>
          <button 
            className="burger" 
            id="burger" 
            aria-label="Menu"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
              <path d="M3 6h18M3 12h18M3 18h18"/>
            </svg>
          </button>
        </div>

        <div className={`mobile-menu ${mobileMenuOpen ? 'open' : ''}`} id="mobileMenu">
          <a href="#services">Services</a>
          <a href="#industries">Industries</a>
          <a href="#process">How we work</a>
          <a href="#testimonials">Testimonials</a>
          <a href="#contact">Book a call</a>
        </div>
      </nav>
    </div>
  );
}
