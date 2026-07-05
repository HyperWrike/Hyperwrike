import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import Script from 'next/script'
import blogsData from '@/data/blogs.json'

interface BlogPost {
  slug: string
  title: string
  metaTitle: string
  metaDescription: string
  category: string
  h1: string
  subtitle: string
  leadParagraph: string
  content: Array<{
    type: string
    text?: string
    items?: string[] | Array<{ value: string; label: string }>
  }>
  relatedBlogs: string[]
}

const blogs = blogsData as BlogPost[]

export async function generateStaticParams() {
  return blogs.map((blog) => ({
    slug: blog.slug,
  }))
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const blog = blogs.find(b => b.slug === params.slug)
  
  if (!blog) {
    return { 
      title: 'Blog Post Not Found | HyperWrike',
      description: 'The requested blog post could not be found.'
    }
  }

  return {
    title: blog.metaTitle,
    description: blog.metaDescription,
    openGraph: {
      title: blog.metaTitle,
      description: blog.metaDescription,
      type: 'article',
      url: `https://hyperwrike.com/blog/${blog.slug}`,
    },
    twitter: {
      card: 'summary_large_image',
      title: blog.metaTitle,
      description: blog.metaDescription,
    },
  }
}

export default async function BlogPost({ params }: { params: { slug: string } }) {
  const blog = blogs.find(b => b.slug === params.slug)
  
  if (!blog) {
    notFound()
  }

  const relatedPosts = blogs.filter(b => blog.relatedBlogs.includes(b.slug))

  return (
    <>
      <nav className="nav-bar">
        <div className="nav-container">
          <Link href="/" className="logo">
            <img src="/assets/logo/hyperwrike-lockup-light.svg" alt="HyperWrike" />
          </Link>
          <ul className="nav-links">
            <li><Link href="/">Home</Link></li>
            <li><Link href="/#how-it-works">How It Works</Link></li>
            <li><Link href="/#offers">Solutions</Link></li>
            <li><a href="/#cta" className="cta-button">Book Your Free Audit</a></li>
          </ul>
        </div>
      </nav>

      <header className="sp-hero">
        <div className="sp-hero-inner">
          <div className="reveal">
            <div className="sp-crumb">
              <Link href="/#services">Services</Link>
              <span className="sl">/</span>
              {blog.category}
            </div>
            <h1 dangerouslySetInnerHTML={{ __html: blog.h1 }} />
            <p className="sp-sub">{blog.subtitle}</p>
            <div className="sp-cta-row">
              <a className="btn btn-dark" href="/#cta">
                Book a free strategy call
                <span className="nub">→</span>
              </a>
            </div>
          </div>
        </div>
      </header>

      <article className="sp-body">
        <p className="sp-lead reveal">{blog.leadParagraph}</p>

        {blog.content.map((section, index) => {
          if (section.type === 'heading') {
            return <h2 key={index} className="reveal">{section.text}</h2>
          }
          
          if (section.type === 'paragraph') {
            return <p key={index} className="reveal">{section.text}</p>
          }
          
          if (section.type === 'list' && section.items && Array.isArray(section.items)) {
            return (
              <ol key={index} className="reveal">
                {(section.items as string[]).map((item, i) => {
                  const parts = item.split(' — ')
                  if (parts.length === 2) {
                    return (
                      <li key={i}>
                        <b>{parts[0]}</b> — {parts[1]}
                      </li>
                    )
                  }
                  return <li key={i}>{item}</li>
                })}
              </ol>
            )
          }
          
          if (section.type === 'stats' && section.items) {
            return (
              <div key={index} className="sp-stats reveal">
                {(section.items as Array<{ value: string; label: string }>).map((stat, i) => (
                  <div key={i} className="s">
                    <div className="sv">{stat.value}</div>
                    <div className="sk">{stat.label}</div>
                  </div>
                ))}
              </div>
            )
          }
          
          return null
        })}

        <div className="sp-inline-cta reveal">
          <div className="t">Ready to transform your operations?</div>
          <a className="btn btn-dark" href="/#cta">
            Book your free call
            <span className="nub">→</span>
          </a>
        </div>
      </article>

      {relatedPosts.length > 0 && (
        <section className="section sp-related">
          <div className="container">
            <span className="eyebrow reveal">More playbooks</span>
            <div className="sp-related-grid stagger">
              {relatedPosts.map((post) => (
                <Link key={post.slug} href={`/blog/${post.slug}`} className="sp-rel">
                  <div className="rk">{post.category}</div>
                  <h4>{post.title}</h4>
                  <span className="ra">Read playbook →</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <footer className="footer">
        <div className="container">
          <div className="foot-bot" style={{ marginTop: 0, border: 'none', paddingTop: 0 }}>
            <Link href="/" className="logo on-ink">
              <span className="wm">Hyperwrike</span>
            </Link>
            <span>© 2025 Hyperwrike · Engineered revenue · India · UK · US · EU</span>
          </div>
        </div>
      </footer>

      <Script id="blog-schema" type="application/ld+json">
        {`
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      "headline": "${blog.title}",
      "description": "${blog.metaDescription}",
      "url": "https://hyperwrike.com/blog/${blog.slug}",
      "datePublished": "2025-01-15T00:00:00+00:00",
      "dateModified": "2025-01-15T00:00:00+00:00",
      "author": {
        "@type": "Organization",
        "name": "Hyperwrike",
        "@id": "https://hyperwrike.com/#org"
      },
      "publisher": {
        "@type": "Organization",
        "name": "Hyperwrike",
        "@id": "https://hyperwrike.com/#org",
        "logo": {
          "@type": "ImageObject",
          "url": "https://hyperwrike.com/assets/logo/hyperwrike-mark-dark-1024.png"
        }
      },
      "image": "https://hyperwrike.com/assets/logo/hyperwrike-mark-dark-1024.png",
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": "https://hyperwrike.com/blog/${blog.slug}"
      },
      "articleSection": "${blog.category}",
      "keywords": ["AI automation", "${blog.category}", "revenue recovery", "business automation"]
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
          "name": "Blog",
          "item": "https://hyperwrike.com/#services"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "${blog.title}",
          "item": "https://hyperwrike.com/blog/${blog.slug}"
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
