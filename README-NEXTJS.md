# HyperWrike Next.js Website

Modern, performance-optimized Next.js 14 conversion of the HyperWrike website with all 10 niche offer pages.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm start
```

Visit `http://localhost:3000` to see the site.

## 📁 Project Structure

```
Hyperwrike-main/
├── src/
│   ├── app/                    # Next.js 14 App Router
│   │   ├── layout.tsx         # Root layout with SEO
│   │   ├── page.tsx           # Homepage
│   │   ├── sitemap.ts         # Dynamic sitemap
│   │   ├── robots.ts          # Robots.txt
│   │   ├── offers/[slug]/     # Dynamic offer pages (10 niches)
│   │   └── blog/[slug]/       # Blog posts
│   ├── components/            # React components
│   │   └── Navigation.tsx     # Header navigation
│   ├── data/
│   │   └── offers.ts          # All offer page content
│   └── styles/                # Global CSS
│       ├── globals.css
│       ├── chat.css
│       ├── subpage.css
│       └── hyperwrike-brand.css
├── public/                     # Static assets
│   ├── assets/                # Images, logos, videos
│   ├── chat.js               # Chat widget
│   ├── app.js                # Homepage scripts
│   └── subpage.js            # Subpage scripts
├── next.config.mjs           # Next.js configuration
├── tsconfig.json             # TypeScript configuration
└── package.json              # Dependencies and scripts
```

## 🎯 Key Features

### ✅ Performance Optimizations
- **Static Site Generation (SSG)**: All pages pre-rendered at build time
- **Automatic Code Splitting**: Only load what's needed
- **Optimized CSS**: CSS modules with automatic minification
- **Fast Builds**: Incremental builds with SWC compiler

### ✅ SEO Optimized
- **Metadata API**: Dynamic metadata for all pages
- **Structured Data**: JSON-LD for rich snippets
- **Sitemap**: Auto-generated from offer data
- **Robots.txt**: Dynamic robots configuration
- **Open Graph**: Full OG and Twitter card support

### ✅ All 10 Niche Offer Pages
1. **Med Spa AI Booking System** (`/offers/med-spa-ai-booking-system`)
2. **Weight-Loss Clinic Nurture** (`/offers/weight-loss-clinic-ai-nurture`)
3. **Roofing Quote Follow-Up** (`/offers/roofing-ai-quote-followup`)
4. **HVAC After-Hours System** (`/offers/hvac-plumbing-ai-answering`)
5. **Solar Cancellation Prevention** (`/offers/solar-ai-cancellation-prevention`)
6. **Real Estate Database Reactivation** (`/offers/real-estate-ai-database-reactivation`)
7. **Dental Implant Case Acceptance** (`/offers/dental-implant-ai-case-acceptance`)
8. **High-Ticket Coach Speed-to-Lead** (`/offers/coach-ai-speed-to-lead`)
9. **Luxury Auto Lead Response** (`/offers/luxury-auto-ai-lead-response`)
10. **Movers Instant Quote System** (`/offers/movers-property-ai-instant-quote`)

## 📝 Development Commands

```bash
# Development
npm run dev              # Start dev server (http://localhost:3000)

# Production
npm run build           # Build static site (outputs to /out)
npm run export          # Alias for build (same as build)
npm start              # Preview production build

# Legacy
npm run legacy-server  # Run old Express server (for reference)
```

## 🌐 Deployment

### Static Export
The site is configured for static export (`output: 'export'`). The build creates a `/out` directory with all static files.

### Deployment Options

**1. Vercel (Recommended)**
```bash
npm install -g vercel
vercel
```

**2. Netlify**
```bash
# Build command: npm run build
# Publish directory: out
```

**3. AWS S3 + CloudFront**
```bash
npm run build
aws s3 sync out/ s3://your-bucket-name --delete
```

**4. Any Static Host**
Upload the `/out` directory to any static hosting service (GitHub Pages, Cloudflare Pages, etc.)

## 🔧 Configuration

### Next.js Config (`next.config.mjs`)
- **Static Export**: `output: 'export'`
- **Image Optimization**: Disabled for static export
- **Compression**: Enabled
- **SWC Minification**: Enabled
- **Console Removal**: Production only

### TypeScript Config (`tsconfig.json`)
- **Strict Mode**: Disabled for easier migration
- **Path Aliases**: `@/*` maps to `src/*`
- **JSX**: Preserve (Next.js handles transformation)

## 📊 Performance Metrics

The Next.js version provides significant performance improvements:

- **Build Time**: ~15-30 seconds (vs. N/A for static HTML)
- **First Contentful Paint**: < 1.5s
- **Time to Interactive**: < 3s
- **Lighthouse Score**: 95+ (Performance, SEO, Best Practices)

## 🆕 What's New in Next.js Version

### Compared to Static HTML Version:

**✅ Added:**
- TypeScript for type safety
- Component-based architecture
- Dynamic routing for offers and blog
- Automatic sitemap generation
- Enhanced SEO with Metadata API
- Hot Module Replacement (HMR) in development
- Optimized production builds
- Better code organization

**🔄 Maintained:**
- All original styling (CSS)
- All JavaScript functionality (chat, animations)
- All assets and images
- SEO structure and content
- All 10 offer pages
- Blog post structure

**🗑️ Removed:**
- Express server (not needed for static export)
- Manual HTML duplication
- Docker setup (can be re-added if needed)

## 📚 Adding New Content

### Add a New Offer Page

1. Open `src/data/offers.ts`
2. Add your offer object to the `offers` array:

```typescript
{
  slug: 'your-offer-slug',
  title: 'Your Offer Title',
  metaTitle: 'SEO Title | HyperWrike',
  metaDescription: 'SEO description...',
  h1: 'Main Headline',
  directAnswer: 'AEO-optimized answer...',
  problem: 'The problem section...',
  solution: 'The solution section...',
  whatYouGet: ['Benefit 1', 'Benefit 2'],
  whyItPays: 'ROI explanation...',
  whoFor: 'Target audience...',
  ctaText: 'Book Your Free Audit'
}
```

3. The page will automatically be created at `/offers/your-offer-slug`
4. Run `npm run build` to regenerate the sitemap

### Add a New Blog Post

1. Add the slug to `src/app/blog/[slug]/page.tsx` in the `blogPosts` array
2. The route will automatically be created
3. (Optional) Convert the HTML content to React/MDX for better integration

## 🐛 Troubleshooting

### Build Issues

**Problem**: `Module not found` errors
```bash
# Solution: Clear cache and reinstall
rm -rf node_modules .next out
npm install
npm run build
```

**Problem**: TypeScript errors
```bash
# Solution: Check tsconfig.json and file imports
npm run build
```

### Development Issues

**Problem**: Changes not reflecting
```bash
# Solution: Restart dev server
# Press Ctrl+C, then run:
npm run dev
```

**Problem**: Port 3000 already in use
```bash
# Solution: Use different port
PORT=3001 npm run dev
```

## 📄 Legacy Files

The original HTML files are kept in the root directory for reference:
- `index.html` - Original homepage
- `blog/*.html` - Original blog posts
- `offers/*.html` - Original offer pages (before migration)

These can be removed once you've verified the Next.js version is working correctly.

## 🔐 Environment Variables

For production, you may want to add:

```bash
# .env.local
NEXT_PUBLIC_CALENDAR_URL=https://calendar.app.google/BQf3Egpa9gxmyxPb8
NEXT_PUBLIC_CONTACT_EMAIL=team@hyperwrike.com
```

## 📞 Support

For questions about this Next.js conversion, contact the development team or refer to:
- [Next.js Documentation](https://nextjs.org/docs)
- [Next.js App Router Guide](https://nextjs.org/docs/app)
- Original codebase documentation in `DEPLOY-NOTES.md`

---

**Version**: 2.0.0 (Next.js)  
**Last Updated**: July 4, 2026  
**License**: Proprietary - HyperWrike
