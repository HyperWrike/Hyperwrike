# HyperWrike Complete SEO/AEO/GEO Optimization Plan

## Overview
Using claude-seo skill to run comprehensive audit and optimization across:
- Technical SEO
- Content & E-E-A-T
- Schema markup
- AI search optimization (GEO/AEO)
- Backlinks
- Local SEO

## Audit Commands to Run

```bash
# 1. Full site audit (runs 25 sub-skills in parallel)
/seo audit https://hyperwrike.com

# 2. Technical SEO deep dive
/seo technical https://hyperwrike.com

# 3. Content quality & E-E-A-T
/seo content https://hyperwrike.com

# 4. Schema markup validation
/seo schema https://hyperwrike.com

# 5. AI search optimization (GEO/AEO)
/seo geo https://hyperwrike.com

# 6. Backlinks analysis
/seo backlinks https://hyperwrike.com

# 7. Per-page analysis for each offer
/seo page https://hyperwrike.com/offers/med-spa-ai-booking-system
/seo page https://hyperwrike.com/offers/weight-loss-clinic-ai-nurture
# ... repeat for all 10 offers

# 8. Sitemap generation
/seo sitemap generate

# 9. Images optimization
/seo images https://hyperwrike.com
```

## Key Optimizations Needed

### 1. Structured Data (Schema.org)
- [ ] Organization schema with all contact points
- [ ] LocalBusiness schema (Chennai office)
- [ ] Service schema for each offer
- [ ] FAQPage schema
- [ ] Product schema for services
- [ ] Review/AggregateRating schema
- [ ] BreadcrumbList for navigation

### 2. GEO/AEO Optimization
- [ ] Question-based H2 headings
- [ ] 134-167 word answer blocks
- [ ] Primary source citations
- [ ] Entity presence (Wikipedia, LinkedIn)
- [ ] llms.txt file
- [ ] Passage citability scoring

### 3. Technical SEO
- [ ] Core Web Vitals optimization
- [ ] Mobile responsiveness
- [ ] Page speed optimization
- [ ] Canonical tags
- [ ] XML sitemap
- [ ] Robots.txt
- [ ] SSL/HTTPS
- [ ] Hreflang tags (IN, GB, US, EU)

### 4. Content E-E-A-T
- [ ] Author credentials
- [ ] Case studies & testimonials
- [ ] Industry expertise signals
- [ ] Trust signals (contact info, location)
- [ ] Transparent about AI usage

### 5. Local SEO (Chennai, India)
- [ ] Google Business Profile optimization
- [ ] NAP consistency
- [ ] Local schema markup
- [ ] Geographic keywords
- [ ] Service area targeting

## Implementation Status

### Task 1: Complete Homepage ✅
- All sections migrated to Next.js
- Interactive dashboard implemented
- Full content preserved

### Task 2: Offer Pages (0/10 complete)
Need to complete:
1. Med Spa AI
2. Weight Loss Clinic
3. Roofing
4. HVAC
5. Solar
6. Real Estate
7. Dental
8. Coach
9. Luxury Auto
10. Movers

### Task 3: Blog Pages (0/5 complete)
1. AI voice receptionist
2. Patient no-shows
3. Law firm intake
4. AI SDR
5. Custom CRM

### Task 4-7: SEO Audits
Run all claude-seo commands and implement fixes

### Task 8: Production Build
Test and verify all pages load correctly

## Success Metrics

- Lighthouse SEO score: 100/100
- Core Web Vitals: All green
- Schema validation: 0 errors
- Sitemap: All pages indexed
- Mobile usability: Pass
- Page speed: <2s FCP
- AI citability score: 90+

## Next Steps

1. Complete page migrations (Tasks 1-3)
2. Run full SEO audit suite
3. Implement recommendations
4. Test production build
5. Deploy optimized site
