import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import Script from 'next/script'
import Navigation from '@/components/Navigation'
import VideoTestimonialCarousel from '@/components/VideoTestimonialCarousel'
import { offerSpecificFAQs, globalFAQs, generateFAQSchema } from '@/data/faqs'
import '@/styles/service-page.css'

// Import offers data
import offersData from '@/data/offers.json'

export async function generateStaticParams() {
  return offersData.map((offer) => ({
    slug: offer.slug,
  }))
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const offer = offersData.find((o) => o.slug === params.slug)
  
  if (!offer) {
    return {
      title: 'Service Not Found | HyperWrike',
    }
  }

  return {
    title: offer.metaTitle,
    description: offer.metaDescription,
    openGraph: {
      title: offer.metaTitle,
      description: offer.metaDescription,
      type: 'website',
      url: `https://hyperwrike.com/services/${offer.slug}`,
      images: [
        {
          url: 'https://hyperwrike.com/assets/logo/hyperwrike-mark-dark-1024.png',
          width: 1024,
          height: 1024,
          alt: 'HyperWrike',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: offer.metaTitle,
      description: offer.metaDescription,
      images: ['https://hyperwrike.com/assets/logo/hyperwrike-mark-dark-1024.png'],
    },
  }
}

export default function ServicePage({ params }: { params: { slug: string } }) {
  const offer = offersData.find((o) => o.slug === params.slug)

  if (!offer) {
    notFound()
  }

  // Get FAQs for this offer
  const offerFAQs = offerSpecificFAQs[offer.slug] || []
  const displayFAQs = [...offerFAQs, ...globalFAQs.slice(0, 3)]

  return (
    <>
      <div className="scrollbar" id="scrollbar"></div>

      {/* Navigation */}
      <div className="frame">
        <Navigation />
      </div>

      {/* Service Hero */}
      <section className="service-hero">
        <div className="container">
          <div className="breadcrumb">
            <Link href="/">Home</Link>
            <span className="separator">→</span>
            <Link href="/#services">Services</Link>
            <span className="separator">→</span>
            <span className="current">{offer.title}</span>
          </div>

          <h1 className="h1-service">{offer.h1}</h1>
          
          {/* AEO Direct Answer Block */}
          <div className="direct-answer">
            <div className="answer-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                <path d="M2 17l10 5 10-5"/>
                <path d="M2 12l10 5 10-5"/>
              </svg>
            </div>
            <p className="answer-text">{offer.directAnswer}</p>
          </div>
        </div>
      </section>

      {/* The Problem */}
      <section className="content-section problem">
        <div className="container">
          <div className="section-label">The Problem</div>
          <h2>The Challenge You're Facing</h2>
          <div className="problem-content">
            {offer.problem.split('\n\n').map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </div>
      </section>

      {/* The Solution */}
      <section className="content-section solution">
        <div className="container">
          <div className="section-label">How We Solve It</div>
          <h2>Our AI-Powered Solution</h2>
          <div className="solution-content">
            {offer.solution.split('\n\n').map((paragraph, index) => {
              // Check if paragraph contains numbered list
              if (paragraph.match(/^\d+\./m)) {
                return (
                  <div key={index} className="solution-features">
                    {paragraph.split('\n').map((line, idx) => {
                      const match = line.match(/^(\d+)\.\s+\*\*(.*?)\*\*\s+—\s+(.*)/)
                      if (match) {
                        return (
                          <div key={idx} className="feature-item">
                            <div className="feature-number">{match[1]}</div>
                            <div className="feature-content">
                              <h3>{match[2]}</h3>
                              <p>{match[3]}</p>
                            </div>
                          </div>
                        )
                      }
                      return null
                    })}
                  </div>
                )
              }
              return <p key={index}>{paragraph}</p>
            })}
          </div>
        </div>
      </section>

      {/* What You Get */}
      <section className="content-section what-you-get">
        <div className="container">
          <div className="section-label">What's Included</div>
          <h2>What You Get</h2>
          <div className="benefits-grid">
            {offer.whatYouGet.map((item, index) => (
              <div key={index} className="benefit-card">
                <div className="check-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                    <path d="M20 6L9 17l-5-5"/>
                  </svg>
                </div>
                <p>{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ROI Section */}
      <section className="content-section roi">
        <div className="container">
          <div className="roi-card">
            <div className="roi-icon">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
              </svg>
            </div>
            <h2>Why This Pays for Itself</h2>
            <p className="roi-text">{offer.whyItPays}</p>
          </div>
        </div>
      </section>

      {/* Who This Is For */}
      <section className="content-section who-for">
        <div className="container">
          <div className="section-label">Ideal Client Profile</div>
          <h2>Who This Is For</h2>
          <div className="who-for-card">
            <p>{offer.whoFor}</p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      {displayFAQs.length > 0 && (
        <section className="content-section faq">
          <div className="container">
            <div className="section-label">Common Questions</div>
            <h2>Frequently Asked Questions</h2>
            <div className="faq-grid">
              {displayFAQs.map((faq, index) => (
                <div key={index} className="faq-item">
                  <h3 className="faq-question">{faq.question}</h3>
                  <p className="faq-answer">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Client Testimonials Carousel */}
      <VideoTestimonialCarousel />

      {/* Trusted By Section */}
      <section className="trusted-by">
        <div className="container">
          <p className="trusted-label">Trusted by leading businesses</p>
          <div className="client-logos">
            <img src="/assets/logo-jammi.png" alt="Jammi" loading="lazy" />
            <img src="/assets/logo-vs-hospitals.png" alt="VS Hospitals" loading="lazy" />
            <img src="/assets/logo-panasuna.png" alt="Panasuna" loading="lazy" />
            <img src="/assets/logo-smartstart.png" alt="SmartStart" loading="lazy" />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-card">
            <h2>Ready to Get Started?</h2>
            <p>Let's discuss how we can implement this system for your business</p>
            <div className="cta-actions">
              <a href="https://calendar.app.google/BQf3Egpa9gxmyxPb8" className="btn btn-primary btn-lg" target="_blank" rel="noopener">
                <span>{offer.ctaText}</span>
                <span className="nub">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
                    <path d="m9 6 6 6-6 6"/>
                  </svg>
                </span>
              </a>
              <Link href="/#services" className="btn btn-secondary btn-lg">
                <span>View All Services</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Structured Data */}
      <Script id="service-schema" type="application/ld+json">
        {`
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "@id": "https://hyperwrike.com/services/${offer.slug}#service",
      "name": "${offer.title}",
      "description": "${offer.metaDescription}",
      "provider": {
        "@type": "Organization",
        "name": "Hyperwrike",
        "url": "https://hyperwrike.com/",
        "@id": "https://hyperwrike.com/#org"
      },
      "url": "https://hyperwrike.com/services/${offer.slug}",
      "serviceType": "${offer.title}",
      "areaServed": [
        {"@type": "Country", "name": "United States"},
        {"@type": "Country", "name": "United Kingdom"},
        {"@type": "Country", "name": "Australia"},
        {"@type": "Country", "name": "Germany"},
        {"@type": "Country", "name": "United Arab Emirates"},
        {"@type": "Country", "name": "India"}
      ],
      "offers": {
        "@type": "Offer",
        "availability": "https://schema.org/InStock",
        "url": "https://hyperwrike.com/services/${offer.slug}",
        "priceRange": "$8000-$25000",
        "priceCurrency": "USD"
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.9",
        "reviewCount": "127",
        "bestRating": "5"
      }
    },
    {
      "@type": "WebPage",
      "@id": "https://hyperwrike.com/services/${offer.slug}#webpage",
      "url": "https://hyperwrike.com/services/${offer.slug}",
      "name": "${offer.metaTitle}",
      "description": "${offer.metaDescription}",
      "isPartOf": {
        "@id": "https://hyperwrike.com/#website"
      },
      "about": {
        "@id": "https://hyperwrike.com/services/${offer.slug}#service"
      },
      "primaryImageOfPage": {
        "@type": "ImageObject",
        "url": "https://hyperwrike.com/assets/logo/hyperwrike-mark-dark-1024.png"
      }
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://hyperwrike.com/"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Services",
          "item": "https://hyperwrike.com/#services"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "${offer.title}",
          "item": "https://hyperwrike.com/services/${offer.slug}"
        }
      ]
    }
  ]
}
        `}
      </Script>

      <Script id="faq-schema" type="application/ld+json">
        {generateFAQSchema(offer.slug)}
      </Script>

      <Script src="/app.js" strategy="afterInteractive" />
      <Script src="/chat.js" strategy="afterInteractive" />
    </>
  )
}
