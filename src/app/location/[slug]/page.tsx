import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import Script from 'next/script'
import { getAllLocations, getLocationBySlug, locationGroups, type Location } from '@/data/locations'
import { offers } from '@/data/offers'

export async function generateStaticParams() {
  return getAllLocations().map((location) => ({
    slug: location.slug,
  }))
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const location = getLocationBySlug(params.slug)
  
  if (!location) {
    return {
      title: 'Location Not Found | HyperWrike',
    }
  }

  const title = `AI Lead Response Systems in ${location.city} | HyperWrike`
  const description = location.metaDescription

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
      url: `https://hyperwrike.com/location/${location.slug}`,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
    alternates: {
      canonical: `/location/${location.slug}`,
    },
  }
}

export default async function LocationPage({ params }: { params: { slug: string } }) {
  const location = getLocationBySlug(params.slug)

  if (!location) {
    notFound()
  }

  // Get country group for compliance info
  const countryGroup = Object.values(locationGroups).find(
    group => group.locations.some(loc => loc.slug === location.slug)
  )

  // Get relevant offers for this location's priority industries
  const relevantOffers = offers.filter(offer => 
    location.priorityIndustries.some(industry => 
      offer.slug.includes(industry) || offer.title.toLowerCase().includes(industry)
    )
  ).slice(0, 6)

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

      <main className="location-page">
        {/* Hero Section */}
        <section className="hero" style={{ padding: '4rem 0 3rem', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white' }}>
          <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
            <div style={{ marginBottom: '1rem', fontSize: '0.9rem', opacity: 0.9 }}>
              {location.country} • {location.state && `${location.state} • `}AI Automation Services
            </div>
            <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '1.5rem', lineHeight: '1.2' }}>
              AI Lead Response Systems in {location.city}
            </h1>
            
            {/* AEO Direct Answer Block */}
            <div style={{ background: 'rgba(255,255,255,0.15)', padding: '1.5rem', borderRadius: '12px', marginBottom: '2rem', backdropFilter: 'blur(10px)' }}>
              <p style={{ fontSize: '1.1rem', lineHeight: '1.6', margin: 0 }}>
                <strong>HyperWrike serves {location.city} businesses with AI lead response systems that respond within 60 seconds, book appointments automatically, and reactivate dead leads.</strong> {location.primaryChannel === 'WhatsApp' ? 'WhatsApp-first automation' : 'SMS and voice automation'} specifically built for {location.city} {location.priorityIndustries.slice(0, 3).map(i => i.replace('-', ' ')).join(', ')} businesses. Typical recovery: $50,000-$100,000 monthly.
              </p>
            </div>

            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <a href="#solutions" style={{ padding: '0.875rem 2rem', background: 'white', color: '#667eea', borderRadius: '8px', fontWeight: '600', textDecoration: 'none' }}>
                View Solutions
              </a>
              <a href="/#cta" style={{ padding: '0.875rem 2rem', background: 'rgba(255,255,255,0.2)', color: 'white', border: '2px solid white', borderRadius: '8px', fontWeight: '600', textDecoration: 'none' }}>
                Book Free Audit
              </a>
            </div>
          </div>
        </section>

        {/* Local Market Insight */}
        <section style={{ padding: '3rem 0', background: '#f7fafc' }}>
          <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
            <h2 style={{ fontSize: '2rem', marginBottom: '1.5rem', color: '#1a202c' }}>
              Why {location.city} Businesses Choose AI Automation
            </h2>
            <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: '#4a5568', marginBottom: '2rem' }}>
              {location.localInsight}
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem', marginTop: '2rem' }}>
              <div style={{ padding: '1.5rem', background: 'white', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
                <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#667eea', marginBottom: '0.5rem' }}>
                  60s
                </div>
                <div style={{ color: '#718096' }}>
                  Response time to every {location.city} lead
                </div>
              </div>
              <div style={{ padding: '1.5rem', background: 'white', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
                <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#667eea', marginBottom: '0.5rem' }}>
                  24/7
                </div>
                <div style={{ color: '#718096' }}>
                  {location.primaryChannel === 'WhatsApp' ? 'WhatsApp' : 'Phone & SMS'} coverage
                </div>
              </div>
              <div style={{ padding: '1.5rem', background: 'white', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
                <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#667eea', marginBottom: '0.5rem' }}>
                  5-7d
                </div>
                <div style={{ color: '#718096' }}>
                  Implementation for {location.city} businesses
                </div>
              </div>
              <div style={{ padding: '1.5rem', background: 'white', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
                <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#667eea', marginBottom: '0.5rem' }}>
                  {countryGroup?.compliance}
                </div>
                <div style={{ color: '#718096' }}>
                  Compliant data handling
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Solutions for This Location */}
        <section id="solutions" style={{ padding: '4rem 0' }}>
          <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
            <h2 style={{ fontSize: '2rem', marginBottom: '1rem', color: '#1a202c' }}>
              AI Solutions for {location.city} Businesses
            </h2>
            <p style={{ fontSize: '1.1rem', color: '#718096', marginBottom: '3rem' }}>
              Industry-specific automation built for {location.city}'s top sectors
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2rem' }}>
              {relevantOffers.map((offer) => (
                <div key={offer.slug} style={{ padding: '2rem', background: 'white', border: '1px solid #e2e8f0', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
                  <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#1a202c' }}>
                    {offer.title}
                  </h3>
                  <p style={{ color: '#718096', marginBottom: '1.5rem', lineHeight: '1.6' }}>
                    {offer.metaDescription.substring(0, 150)}...
                  </p>
                  <Link 
                    href={`/offers/${offer.slug}`}
                    style={{ color: '#667eea', fontWeight: '600', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
                  >
                    Learn More →
                  </Link>
                </div>
              ))}
            </div>

            <div style={{ marginTop: '3rem', textAlign: 'center' }}>
              <Link href="/#offers" style={{ padding: '1rem 2rem', background: '#667eea', color: 'white', borderRadius: '8px', fontWeight: '600', textDecoration: 'none', display: 'inline-block' }}>
                View All Solutions
              </Link>
            </div>
          </div>
        </section>

        {/* Local FAQ Section for AEO */}
        <section style={{ padding: '4rem 0', background: '#f7fafc' }}>
          <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
            <h2 style={{ fontSize: '2rem', marginBottom: '2rem', color: '#1a202c' }}>
              Frequently Asked Questions - {location.city}
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              <div>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem', color: '#1a202c' }}>
                  How much does AI lead response cost in {location.city}?
                </h3>
                <p style={{ color: '#4a5568', lineHeight: '1.6' }}>
                  HyperWrike's AI systems for {location.city} businesses typically cost {location.currency} equivalent of $8,000-$25,000/month depending on lead volume. Most {location.city} clients see 6-12x ROI within 90 days through recovered revenue.
                </p>
              </div>

              <div>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem', color: '#1a202c' }}>
                  What industries in {location.city} benefit most from AI automation?
                </h3>
                <p style={{ color: '#4a5568', lineHeight: '1.6' }}>
                  Top performing industries in {location.city}: {location.priorityIndustries.map(i => i.replace('-', ' ')).join(', ')}. These sectors see the highest ROI from instant lead response and dead-lead reactivation.
                </p>
              </div>

              <div>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem', color: '#1a202c' }}>
                  Does HyperWrike have an office in {location.city}?
                </h3>
                <p style={{ color: '#4a5568', lineHeight: '1.6' }}>
                  We serve {location.city} businesses remotely with dedicated account management and {location.timezone} timezone support. {location.primaryChannel === 'WhatsApp' ? 'WhatsApp-first communication' : 'Local phone and SMS'} ensures seamless coordination.
                </p>
              </div>

              <div>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem', color: '#1a202c' }}>
                  How long does implementation take for {location.city} businesses?
                </h3>
                <p style={{ color: '#4a5568', lineHeight: '1.6' }}>
                  Most {location.city} implementations are live within 5-7 business days. We integrate with your existing CRM and booking systems without requiring workflow changes.
                </p>
              </div>

              <div>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem', color: '#1a202c' }}>
                  Is the system {countryGroup?.compliance} compliant?
                </h3>
                <p style={{ color: '#4a5568', lineHeight: '1.6' }}>
                  Yes. All {location.city} deployments are fully {countryGroup?.compliance} compliant with proper data handling, consent management, and audit trails.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section style={{ padding: '4rem 0', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white', textAlign: 'center' }}>
          <div className="container" style={{ maxWidth: '800px', margin: '0 auto', padding: '0 2rem' }}>
            <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>
              Ready to Recover Lost Revenue in {location.city}?
            </h2>
            <p style={{ fontSize: '1.1rem', marginBottom: '2rem', opacity: 0.95 }}>
              Book a free 20-minute audit to see how much revenue your {location.city} business is losing to slow response times.
            </p>
            <a href="/#cta" style={{ padding: '1rem 2.5rem', background: 'white', color: '#667eea', borderRadius: '8px', fontWeight: '600', textDecoration: 'none', display: 'inline-block', fontSize: '1.1rem' }}>
              Book Free Audit →
            </a>
          </div>
        </section>
      </main>

      <footer style={{ padding: '2rem 0', background: '#1a202c', color: 'white', textAlign: 'center' }}>
        <div className="container">
          <p>&copy; 2025 HyperWrike. Serving {location.city}, {location.country}. All rights reserved.</p>
        </div>
      </footer>

      {/* Local Business Schema */}
      <Script id="location-schema" type="application/ld+json">
        {`
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfessionalService",
      "name": "HyperWrike - ${location.city}",
      "description": "AI lead response and revenue recovery systems serving ${location.city} businesses",
      "areaServed": {
        "@type": "City",
        "name": "${location.city}",
        ${location.state ? `"containedIn": {"@type": "State", "name": "${location.state}"},` : ''}
        "containedInPlace": {
          "@type": "Country",
          "name": "${location.country}"
        }
      },
      "priceRange": "${location.currency} equivalent $8000-$25000/month",
      "url": "https://hyperwrike.com/location/${location.slug}",
      "serviceType": ["AI Lead Response", "Revenue Recovery Systems", "Lead Automation"],
      "provider": {
        "@id": "https://hyperwrike.com/#org"
      }
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "How much does AI lead response cost in ${location.city}?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "HyperWrike's AI systems for ${location.city} businesses typically cost ${location.currency} equivalent of $8,000-$25,000/month depending on lead volume. Most ${location.city} clients see 6-12x ROI within 90 days."
          }
        },
        {
          "@type": "Question",
          "name": "What industries in ${location.city} benefit most from AI automation?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Top performing industries in ${location.city}: ${location.priorityIndustries.map(i => i.replace('-', ' ')).join(', ')}. These sectors see the highest ROI from instant lead response."
          }
        },
        {
          "@type": "Question",
          "name": "How long does implementation take for ${location.city} businesses?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Most ${location.city} implementations are live within 5-7 business days with integration to existing CRM and booking systems."
          }
        }
      ]
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
          "name": "Locations",
          "item": "https://hyperwrike.com/#locations"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "${location.city}",
          "item": "https://hyperwrike.com/location/${location.slug}"
        }
      ]
    }
  ]
}
        `}
      </Script>
    </>
  )
}
