import type { Metadata } from 'next'
import Link from 'next/link'
import { offers } from '@/data/offers'
import { notFound } from 'next/navigation'
import Script from 'next/script'
import { offerSpecificFAQs, globalFAQs, generateFAQSchema, type FAQ } from '@/data/faqs'

export async function generateStaticParams() {
  return offers.map((offer) => ({
    slug: offer.slug,
  }))
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const offer = offers.find((o) => o.slug === params.slug)
  
  if (!offer) {
    return {
      title: 'Offer Not Found | HyperWrike',
    }
  }

  return {
    title: offer.metaTitle,
    description: offer.metaDescription,
    openGraph: {
      title: offer.metaTitle,
      description: offer.metaDescription,
      type: 'website',
    },
  }
}

export default function OfferPage({ params }: { params: { slug: string } }) {
  const offer = offers.find((o) => o.slug === params.slug)

  if (!offer) {
    notFound()
  }

  // Get FAQs for this offer
  const offerFAQs = offerSpecificFAQs[offer.slug] || []
  const displayFAQs = [...offerFAQs, ...globalFAQs.slice(0, 3)]

  return (
    <>
      <nav className="nav-bar">
        <div className="nav-container">
          <Link href="/" className="logo">
            <img src="/assets/logo/hyperwrike-lockup-light.svg" alt="HyperWrike" />
          </Link>
          <button className="mobile-menu-toggle" aria-label="Toggle menu">
            <span></span>
            <span></span>
            <span></span>
          </button>
          <ul className="nav-links">
            <li><a href="/#how-it-works">How It Works</a></li>
            <li><a href="/#offers">Solutions</a></li>
            <li><a href="/#testimonials">Results</a></li>
            <li><a href="/#cta" className="cta-button">Book Your Free Audit</a></li>
          </ul>
        </div>
      </nav>

      <main className="offer-page">
        <section className="hero">
          <div className="container">
            <h1>{offer.h1}</h1>
            <div className="direct-answer">
              <p><strong>{offer.directAnswer}</strong></p>
            </div>
          </div>
        </section>

        <section className="content-section">
          <div className="container">
            <h2>The Problem</h2>
            <div dangerouslySetInnerHTML={{ __html: offer.problem.replace(/\n\n/g, '</p><p>') }} />

            <h2>How We Solve It</h2>
            <div dangerouslySetInnerHTML={{ __html: offer.solution.replace(/\n\n/g, '</p><p>').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />

            <h2>What You Get</h2>
            <ul>
              {offer.whatYouGet.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>

            <h2>Why This Pays for Itself</h2>
            <p>{offer.whyItPays}</p>

            <h2>Who This Is For</h2>
            <p>{offer.whoFor}</p>

            {/* FAQ Section for AEO/GEO Optimization */}
            {displayFAQs.length > 0 && (
              <>
                <h2 style={{ marginTop: '3rem' }}>Frequently Asked Questions</h2>
                <div className="faq-section">
                  {displayFAQs.map((faq, index) => (
                    <div key={index} className="faq-item" style={{ marginBottom: '2rem' }}>
                      <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: '#1a202c' }}>
                        {faq.question}
                      </h3>
                      <p style={{ lineHeight: '1.6', color: '#4a5568' }}>
                        {faq.answer}
                      </p>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </section>

        <section className="cta-section">
          <div className="container">
            <h2>Ready to Get Started?</h2>
            <a href="/#cta" className="cta-button large">{offer.ctaText} →</a>
          </div>
        </section>
      </main>

      <footer>
        <div className="container">
          <p>&copy; 2024 HyperWrike. All rights reserved.</p>
        </div>
      </footer>

      <Script id="offer-schema" type="application/ld+json">
        {`
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "name": "${offer.title}",
      "description": "${offer.metaDescription}",
      "provider": {
        "@type": "Organization",
        "name": "HyperWrike",
        "url": "https://hyperwrike.com/",
        "@id": "https://hyperwrike.com/#org"
      },
      "url": "https://hyperwrike.com/offers/${offer.slug}",
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
        "url": "https://hyperwrike.com/offers/${offer.slug}",
        "priceRange": "$8000-$25000",
        "priceCurrency": "USD"
      }
    },
    {
      "@type": "WebPage",
      "@id": "https://hyperwrike.com/offers/${offer.slug}#webpage",
      "url": "https://hyperwrike.com/offers/${offer.slug}",
      "name": "${offer.metaTitle}",
      "description": "${offer.metaDescription}",
      "isPartOf": {
        "@id": "https://hyperwrike.com/#website"
      },
      "about": {
        "@id": "https://hyperwrike.com/offers/${offer.slug}#service"
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
          "name": "Solutions",
          "item": "https://hyperwrike.com/#offers"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "${offer.title}",
          "item": "https://hyperwrike.com/offers/${offer.slug}"
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

      <Script src="/subpage.js" strategy="afterInteractive" />
    </>
  )
}
