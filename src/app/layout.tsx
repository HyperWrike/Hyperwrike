import type { Metadata } from 'next'
import '../styles/globals.css'
import '../styles/chat.css'
import '../styles/hyperwrike-brand.css'

export const metadata: Metadata = {
  title: 'Hyperwrike — AI Voice Agents, Custom CRM & Automation Agency | India · UK · US',
  description: 'Hyperwrike builds custom AI systems that print revenue: AI voice agents that never miss a call, CRM saving 100+ hrs/month, and automated lead generation — for businesses in India, UK, US & Europe.',
  keywords: 'AI voice agent India, AI receptionist India, custom CRM India, AI automation agency, AI lead generation, AI SDR, ecommerce AI, business automation India, Hyperwrike',
  authors: [{ name: 'Hyperwrike' }],
  creator: 'Hyperwrike',
  publisher: 'Hyperwrike',
  metadataBase: new URL('https://hyperwrike.com'),
  alternates: {
    canonical: '/',
    languages: {
      'en': '/',
      'en-IN': '/',
      'en-GB': '/',
      'en-US': '/',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://hyperwrike.com',
    siteName: 'Hyperwrike',
    title: 'Hyperwrike — AI Systems That Print Revenue | India · UK · US',
    description: 'Custom AI voice agents, CRM automation, ecommerce AI and lead generation — engineered to recover revenue and save 100+ hours a month.',
    images: [
      {
        url: '/assets/logo/hyperwrike-mark-dark-1024.png',
        width: 1024,
        height: 1024,
        alt: 'Hyperwrike — AI automation agency',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@hyperwrike',
    title: 'Hyperwrike — AI Systems That Print Revenue',
    description: 'Custom AI voice agents, CRM automation, ecommerce AI and lead generation — recover revenue and save 100+ hours a month.',
    images: ['/assets/logo/hyperwrike-mark-dark-1024.png'],
  },
  icons: {
    icon: '/assets/logo/hyperwrike-mark-dark-512.png',
    apple: '/assets/logo/hyperwrike-mark-dark-1024.png',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
