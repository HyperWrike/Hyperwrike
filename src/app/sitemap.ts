import { MetadataRoute } from 'next'
import { offers } from '@/data/offers'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://hyperwrike.com'
  
  // Static pages
  const routes = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1.0,
    },
  ]

  // Service pages
  const serviceRoutes = offers.map((offer) => ({
    url: `${baseUrl}/services/${offer.slug}`,
    lastModified: new Date('2026-07-04'),
    changeFrequency: 'monthly' as const,
    priority: 0.9,
  }))

  // Blog pages
  const blogPosts = [
    'ai-voice-receptionist-missed-calls',
    'reduce-patient-no-shows-ai',
    'law-firm-ai-intake-software',
    'ai-sdr-b2b-lead-generation',
    'custom-crm-chit-funds'
  ]

  const blogRoutes = blogPosts.map((slug) => ({
    url: `${baseUrl}/blog/${slug}`,
    lastModified: new Date('2026-06-07'),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  return [...routes, ...serviceRoutes, ...blogRoutes]
}
