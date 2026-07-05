import type { Metadata } from 'next'
import Navigation from '@/components/Navigation'
import HeroDashboard from '@/components/HeroDashboard'
import Script from 'next/script'

export const metadata: Metadata = {
  title: 'Hyperwrike — AI Voice Agents, Custom CRM & Automation Agency | India · UK · US',
  description: 'Hyperwrike builds custom AI systems that print revenue: AI voice agents that never miss a call, CRM saving 100+ hrs/month, and automated lead generation — for businesses in India, UK, US & Europe.',
}

export default function Home() {
  return (
    <>
      <div className="scrollbar" id="scrollbar"></div>

      {/* HERO FRAME */}
      <div className="frame">
        <section className="hero" data-screen-label="Hero">
          {/* animated engineered background */}
          <div className="hero-bg">
            <div className="grid"></div>
            <div className="glow g1"></div>
            <div className="glow g2"></div>
            <div className="glow g3"></div>
            <svg className="nodes" id="nodes" preserveAspectRatio="none"></svg>
          </div>

          <Navigation />

          {/* HERO CONTENT */}
          <div className="hero-content">
            <div className="badge">
              <span className="pin"></span><b>Hyperwrike</b><span className="sep">·</span>5 AI systems live across India, UK &amp; US
            </div>

            <h1 className="h-hero">
              We engineer AI systems<br />that <span className="serif-it">print revenue</span>
            </h1>

            <p className="desc">
              Custom AI voice agents, CRM automation, ecommerce AI and lead generation — <br className="br-d"/>engineered to recover revenue and save <b>100+ hours a month</b>.
            </p>

            <div className="hero-actions">
              <a className="btn btn-primary btn-lg" href="#services">
                <span>Explore AI systems</span>
                <span className="nub" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m9 6 6 6-6 6"/>
                  </svg>
                </span>
              </a>
              <a className="btn btn-secondary btn-lg" href="https://calendar.app.google/BQf3Egpa9gxmyxPb8" target="_blank" rel="noopener">
                <span>Book 20-min strategy call</span>
              </a>
            </div>
          </div>

          {/* DASHBOARD CLUSTER */}
          <HeroDashboard />

          {/* HERO BOTTOM */}
          <div className="hero-bottom">
            <p className="label">Businesses using our AI systems</p>
            <div className="logos">
              <img src="/assets/logo-jammi.png" alt="Jammi" loading="lazy"/>
              <img src="/assets/logo-vs-hospitals.png" alt="VS Hospitals" loading="lazy"/>
              <img src="/assets/logo-panasuna.png" alt="Panasuna" loading="lazy"/>
              <img src="/assets/logo-smartstart.png" alt="SmartStart" loading="lazy"/>
            </div>
          </div>
        </section>
      </div>

      <Script src="/chat.js" strategy="afterInteractive" />
      <Script src="/app.js" strategy="afterInteractive" />

      <Script id="structured-data" type="application/ld+json">
        {`
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["Organization", "ProfessionalService"],
      "@id": "https://hyperwrike.com/#org",
      "name": "Hyperwrike",
      "alternateName": "HyperWrike",
      "url": "https://hyperwrike.com/",
      "logo": {
        "@type": "ImageObject",
        "url": "https://hyperwrike.com/assets/logo/hyperwrike-mark-dark-1024.png",
        "width": 1024,
        "height": 1024
      },
      "image": "https://hyperwrike.com/assets/logo/hyperwrike-mark-dark-1024.png",
      "description": "AI systems agency engineering custom AI voice agents, CRM automation, ecommerce AI and lead generation for businesses in India, UK, US and Europe. We build custom AI systems that recover revenue and save 100+ hours per month.",
      "slogan": "AI systems that print revenue",
      "areaServed": [
        {
          "@type": "Country",
          "name": "India"
        },
        {
          "@type": "Country",
          "name": "United Kingdom"
        },
        {
          "@type": "Country",
          "name": "United States"
        },
        {
          "@type": "Place",
          "name": "Europe"
        }
      ],
      "serviceType": [
        "AI Voice Agent Development",
        "Custom CRM Development",
        "AI Automation Systems",
        "Lead Generation Automation",
        "Revenue Recovery Systems",
        "Business Process Automation"
      ],
      "knowsAbout": [
        "Artificial Intelligence",
        "Voice AI",
        "CRM Systems",
        "Business Automation",
        "Lead Generation",
        "Revenue Optimization",
        "Conversational AI",
        "Machine Learning Applications"
      ],
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.9",
        "reviewCount": "127",
        "bestRating": "5",
        "worstRating": "1"
      }
    },
    {
      "@type": "Service",
      "@id": "https://hyperwrike.com/#ai-voice-agents",
      "serviceType": "AI Voice Agent Development",
      "name": "AI Voice Receptionist & Automation",
      "description": "24/7 AI voice agents that answer calls, qualify leads, and book appointments automatically. Never miss a call again.",
      "provider": {
        "@id": "https://hyperwrike.com/#org"
      },
      "areaServed": [
        "India",
        "United Kingdom",
        "United States",
        "Europe"
      ],
      "category": "Business Automation"
    },
    {
      "@type": "Service",
      "@id": "https://hyperwrike.com/#custom-crm",
      "serviceType": "Custom CRM Development",
      "name": "Custom CRM & Operations AI",
      "description": "Purpose-built CRM systems that eliminate 100+ hours of manual work per month. Replace spreadsheets with intelligent automation.",
      "provider": {
        "@id": "https://hyperwrike.com/#org"
      },
      "areaServed": [
        "India",
        "United Kingdom",
        "United States",
        "Europe"
      ],
      "category": "Business Software"
    },
    {
      "@type": "Service",
      "@id": "https://hyperwrike.com/#ai-sdr",
      "serviceType": "AI SDR & Lead Generation",
      "name": "AI SDR & Automated Lead Generation",
      "description": "Automated B2B lead generation systems that research 1,000+ accounts daily and book 30-60 qualified meetings per month at 60-80% lower cost.",
      "provider": {
        "@id": "https://hyperwrike.com/#org"
      },
      "areaServed": [
        "India",
        "United Kingdom",
        "United States",
        "Europe"
      ],
      "category": "Sales Automation"
    },
    {
      "@type": "WebSite",
      "@id": "https://hyperwrike.com/#website",
      "url": "https://hyperwrike.com/",
      "name": "Hyperwrike",
      "description": "AI automation systems that print revenue",
      "publisher": {
        "@id": "https://hyperwrike.com/#org"
      },
      "potentialAction": {
        "@type": "SearchAction",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": "https://hyperwrike.com/offers/{search_term_string}"
        },
        "query-input": "required name=search_term_string"
      }
    }
  ]
}
        `}
      </Script>
    </>
  )
}
