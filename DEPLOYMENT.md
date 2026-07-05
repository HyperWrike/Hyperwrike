# HyperWrike Deployment Guide

## Pre-Deployment Checklist

- [ ] All dependencies installed (`npm install`)
- [ ] Build succeeds locally (`npm run build`)
- [ ] Test production build locally (`npm start`)
- [ ] All 10 offer pages load correctly
- [ ] Sitemap generates properly (`/sitemap.xml`)
- [ ] Robots.txt accessible (`/robots.txt`)
- [ ] All images display correctly
- [ ] Chat widget functions properly
- [ ] Mobile responsive on all pages
- [ ] SEO metadata verified

## Build Commands

### Local Production Build
```bash
npm run build
```
This creates a static export in the `/out` directory.

### Preview Production Build
```bash
npm start
```
Serves the `/out` directory on http://localhost:3000

## Deployment Platforms

### 1. Vercel (Recommended - Easiest)

**Initial Setup:**
```bash
npm install -g vercel
vercel login
```

**Deploy:**
```bash
vercel
```

**Production Deploy:**
```bash
vercel --prod
```

**Configuration:**
- Build Command: `npm run build`
- Output Directory: `out`
- Install Command: `npm install`
- Framework Preset: Next.js

**Custom Domain:**
```bash
vercel domains add hyperwrike.com
```

### 2. Netlify

**Via Netlify CLI:**
```bash
npm install -g netlify-cli
netlify login
netlify init
netlify deploy --prod
```

**Via Web Dashboard:**
1. Connect your Git repository
2. Set build settings:
   - Build command: `npm run build`
   - Publish directory: `out`
3. Deploy

**Custom Domain:**
Add in Netlify dashboard → Domain settings

### 3. AWS S3 + CloudFront

**Prerequisites:**
- AWS CLI installed and configured
- S3 bucket created
- CloudFront distribution set up

**Deploy:**
```bash
# Build
npm run build

# Sync to S3
aws s3 sync out/ s3://hyperwrike-website --delete

# Invalidate CloudFront cache
aws cloudfront create-invalidation \
  --distribution-id YOUR_DISTRIBUTION_ID \
  --paths "/*"
```

**S3 Bucket Configuration:**
- Enable static website hosting
- Set index.html as index document
- Set public read permissions

**CloudFront Configuration:**
- Origin: Your S3 bucket
- Viewer Protocol Policy: Redirect HTTP to HTTPS
- Compress Objects: Yes
- Custom SSL certificate for hyperwrike.com

### 4. GitHub Pages

**Setup:**
1. Add to `package.json`:
```json
{
  "homepage": "https://your-username.github.io/hyperwrike"
}
```

2. Install gh-pages:
```bash
npm install --save-dev gh-pages
```

3. Add deploy script to `package.json`:
```json
{
  "scripts": {
    "deploy": "npm run build && gh-pages -d out"
  }
}
```

4. Deploy:
```bash
npm run deploy
```

### 5. Cloudflare Pages

**Via CLI:**
```bash
npm install -g wrangler
wrangler login
wrangler pages publish out
```

**Via Dashboard:**
1. Connect Git repository
2. Build settings:
   - Build command: `npm run build`
   - Build output directory: `out`
3. Deploy

### 6. DigitalOcean App Platform

**Via CLI:**
```bash
doctl apps create --spec .do/app.yaml
```

**app.yaml example:**
```yaml
name: hyperwrike
services:
- name: web
  github:
    repo: your-username/hyperwrike
    branch: main
  build_command: npm run build
  output_dir: out
  http_port: 3000
```

## Environment Variables

For production, set these environment variables:

```env
# Optional - if using server-side features later
NODE_ENV=production

# Public variables (can be in .env.local)
NEXT_PUBLIC_CALENDAR_URL=https://calendar.app.google/BQf3Egpa9gxmyxPb8
NEXT_PUBLIC_CONTACT_EMAIL=team@hyperwrike.com
```

## Post-Deployment Verification

### Automated Checks
```bash
# Check if site is accessible
curl -I https://hyperwrike.com

# Check sitemap
curl https://hyperwrike.com/sitemap.xml

# Check robots.txt
curl https://hyperwrike.com/robots.txt
```

### Manual Checks
- [ ] Homepage loads (https://hyperwrike.com)
- [ ] All 10 offer pages load:
  - `/offers/med-spa-ai-booking-system`
  - `/offers/weight-loss-clinic-ai-nurture`
  - `/offers/roofing-ai-quote-followup`
  - `/offers/hvac-plumbing-ai-answering`
  - `/offers/solar-ai-cancellation-prevention`
  - `/offers/real-estate-ai-database-reactivation`
  - `/offers/dental-implant-ai-case-acceptance`
  - `/offers/coach-ai-speed-to-lead`
  - `/offers/luxury-auto-ai-lead-response`
  - `/offers/movers-property-ai-instant-quote`
- [ ] Blog pages accessible
- [ ] Navigation works
- [ ] Chat widget loads
- [ ] Mobile responsive
- [ ] Images load correctly
- [ ] Forms work (if any)
- [ ] Calendar booking links work

### SEO Verification
- [ ] Google Search Console: Submit sitemap
- [ ] Meta tags visible in page source
- [ ] Open Graph preview (Facebook Debugger)
- [ ] Twitter Card preview (Twitter Card Validator)
- [ ] Lighthouse score 90+ on all metrics

## Performance Optimization

### CDN Configuration

**Recommended CDN Settings:**
- Cache static assets (images, CSS, JS): 1 year
- Cache HTML pages: 1 hour
- Enable Brotli compression
- Enable HTTP/2

**Cloudflare Example:**
```
Cache Level: Standard
Browser Cache TTL: 4 hours
Always Use HTTPS: On
Auto Minify: HTML, CSS, JS
Brotli: On
```

### Image Optimization

Since we're using static export, images aren't automatically optimized. Consider:

1. **Manual optimization** before deployment:
```bash
# Using imagemin-cli
npm install -g imagemin-cli
imagemin public/assets/*.png --out-dir=public/assets/optimized
```

2. **CDN-based optimization** (Cloudflare Images, Imgix, etc.)

3. **External service** (TinyPNG API, Squoosh, etc.)

## Continuous Deployment

### GitHub Actions Example

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          
      - name: Install dependencies
        run: npm ci
        
      - name: Build
        run: npm run build
        
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
          vercel-args: '--prod'
```

## Rollback Strategy

### Vercel
```bash
# List deployments
vercel ls

# Promote a previous deployment
vercel promote <deployment-url>
```

### Netlify
Via dashboard or CLI:
```bash
netlify deploy --prod --dir=<previous-build-dir>
```

### AWS S3
Keep previous builds and swap S3 content:
```bash
aws s3 sync s3://backup-bucket/version-1/ s3://hyperwrike-website/ --delete
```

## Monitoring

### Recommended Tools
- **Uptime**: UptimeRobot, Pingdom
- **Performance**: Google Lighthouse, WebPageTest
- **Analytics**: Google Analytics, Plausible
- **Error Tracking**: Sentry (if adding JS tracking)

### Basic Monitoring Script
```bash
#!/bin/bash
# monitor.sh - Simple uptime check

URL="https://hyperwrike.com"
STATUS=$(curl -o /dev/null -s -w "%{http_code}\n" $URL)

if [ $STATUS -eq 200 ]; then
  echo "✅ Site is up (Status: $STATUS)"
else
  echo "❌ Site is down (Status: $STATUS)"
  # Send alert (email, Slack, etc.)
fi
```

## Troubleshooting

### Build Fails
```bash
# Clear cache
rm -rf .next out node_modules
npm install
npm run build
```

### 404 on Routes
- Verify static export is configured
- Check that pages are in `out` directory
- Ensure hosting platform supports client-side routing

### Slow Load Times
- Enable CDN
- Compress images
- Enable Brotli/Gzip compression
- Check bundle size: `npm run build` shows sizes

### Chat Widget Not Loading
- Verify `public/chat.js` is included in build
- Check browser console for errors
- Ensure script tags are in correct location

## Support & Maintenance

### Regular Tasks
- [ ] Weekly: Check uptime and performance
- [ ] Monthly: Update dependencies (`npm update`)
- [ ] Quarterly: Review and optimize images
- [ ] Annually: Review hosting costs and options

### Emergency Contacts
- Hosting Provider: [Your contact]
- Domain Registrar: [Your contact]
- Development Team: team@hyperwrike.com

---

**Last Updated**: July 4, 2026  
**Next Review**: October 2026
