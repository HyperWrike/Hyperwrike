// Location-specific data for multi-country SEO/AEO optimization
// Optimized for ranking in Google + AI answer engines (ChatGPT, Perplexity, Claude, Gemini)

export interface Location {
  slug: string
  city: string
  state?: string
  country: string
  countryCode: string
  timezone: string
  primaryChannel: 'SMS' | 'WhatsApp' | 'Mixed'
  currency: string
  localPhone?: string
  metaDescription: string
  localInsight: string // City-specific market insight for AEO
  priorityIndustries: string[] // Best-fit industries for this city
}

export interface LocationGroup {
  region: string
  currency: string
  primaryChannel: 'SMS' | 'WhatsApp' | 'Mixed'
  compliance: string
  locations: Location[]
}

// Priority cities by country - Top 5 per region for initial launch
export const locationGroups: Record<string, LocationGroup> = {
  US: {
    region: 'United States',
    currency: 'USD',
    primaryChannel: 'SMS',
    compliance: 'TCPA',
    locations: [
      {
        slug: 'dallas-tx',
        city: 'Dallas',
        state: 'Texas',
        country: 'United States',
        countryCode: 'US',
        timezone: 'America/Chicago',
        primaryChannel: 'SMS',
        currency: 'USD',
        metaDescription: 'AI lead response systems for Dallas businesses. Recover lost revenue with 60-second response times. Serving Dallas-Fort Worth solar, roofing, HVAC, real estate, and medical practices.',
        localInsight: 'Dallas-Fort Worth metro experiences extreme summer heat driving peak HVAC and solar demand, plus rapid population growth creating high real estate and home services volume.',
        priorityIndustries: ['solar', 'roofing', 'hvac', 'real-estate', 'medspa']
      },
      {
        slug: 'phoenix-az',
        city: 'Phoenix',
        state: 'Arizona',
        country: 'United States',
        countryCode: 'US',
        timezone: 'America/Phoenix',
        primaryChannel: 'SMS',
        currency: 'USD',
        metaDescription: 'AI automation for Phoenix businesses. Capture missed leads with instant response systems. Serving Phoenix solar companies, roofing contractors, HVAC, and aesthetic clinics.',
        localInsight: 'Phoenix has the highest solar adoption rate in the US and extreme summer temperatures driving year-round HVAC emergency demand.',
        priorityIndustries: ['solar', 'hvac', 'roofing', 'medspa', 'real-estate']
      },
      {
        slug: 'miami-fl',
        city: 'Miami',
        state: 'Florida',
        country: 'United States',
        countryCode: 'US',
        timezone: 'America/New_York',
        primaryChannel: 'SMS',
        currency: 'USD',
        metaDescription: 'AI lead generation for Miami businesses. Automated response systems for luxury real estate, medspas, roofing, and home services across South Florida.',
        localInsight: 'Miami leads the nation in luxury real estate volume and high-end medspa density, with hurricane season driving consistent roofing and home improvement demand.',
        priorityIndustries: ['real-estate', 'medspa', 'roofing', 'solar', 'luxury-auto']
      },
      {
        slug: 'atlanta-ga',
        city: 'Atlanta',
        state: 'Georgia',
        country: 'United States',
        countryCode: 'US',
        timezone: 'America/New_York',
        primaryChannel: 'SMS',
        currency: 'USD',
        metaDescription: 'AI lead response for Atlanta businesses. Automated systems for real estate, home services, insurance, and medical practices across metro Atlanta.',
        localInsight: 'Atlanta is a major insurance and financial services hub with rapid suburban expansion driving home services and real estate demand.',
        priorityIndustries: ['real-estate', 'insurance', 'hvac', 'roofing', 'mortgage']
      },
      {
        slug: 'denver-co',
        city: 'Denver',
        state: 'Colorado',
        country: 'United States',
        countryCode: 'US',
        timezone: 'America/Denver',
        primaryChannel: 'SMS',
        currency: 'USD',
        metaDescription: 'AI automation for Denver businesses. Instant lead response systems for Denver solar companies, real estate teams, home services, and medical practices.',
        localInsight: 'Denver combines high solar incentives with premium real estate market and tech-savvy consumer base, making AI adoption natural fit.',
        priorityIndustries: ['solar', 'real-estate', 'hvac', 'medspa', 'coaching']
      }
    ]
  },
  UK: {
    region: 'United Kingdom',
    currency: 'GBP',
    primaryChannel: 'SMS',
    compliance: 'UK GDPR',
    locations: [
      {
        slug: 'london',
        city: 'London',
        country: 'United Kingdom',
        countryCode: 'GB',
        timezone: 'Europe/London',
        primaryChannel: 'Mixed',
        currency: 'GBP',
        metaDescription: 'AI lead response systems for London businesses. Automated booking for estate agents, trades, aesthetic clinics, and mortgage brokers across Greater London.',
        localInsight: 'London has the highest concentration of luxury medspas and premium estate agents in the UK, with strong demand for instant-response systems.',
        priorityIndustries: ['real-estate', 'medspa', 'trades', 'mortgage', 'law']
      },
      {
        slug: 'manchester',
        city: 'Manchester',
        country: 'United Kingdom',
        countryCode: 'GB',
        timezone: 'Europe/London',
        primaryChannel: 'SMS',
        currency: 'GBP',
        metaDescription: 'AI automation for Manchester businesses. Instant lead capture for trades, estate agents, and home improvement companies across Greater Manchester.',
        localInsight: 'Manchester leads the UK in home improvement and trade business density outside London, with growing tech sector adoption.',
        priorityIndustries: ['trades', 'real-estate', 'hvac', 'home-improvement', 'medspa']
      },
      {
        slug: 'birmingham',
        city: 'Birmingham',
        country: 'United Kingdom',
        countryCode: 'GB',
        timezone: 'Europe/London',
        primaryChannel: 'SMS',
        currency: 'GBP',
        metaDescription: 'AI lead generation for Birmingham businesses. Automated response systems for West Midlands trades, estate agents, and service businesses.',
        localInsight: 'Birmingham is the UK\'s second-largest city with strong manufacturing and home services sectors, high trade business concentration.',
        priorityIndustries: ['trades', 'real-estate', 'home-improvement', 'auto', 'insurance']
      },
      {
        slug: 'leeds',
        city: 'Leeds',
        country: 'United Kingdom',
        countryCode: 'GB',
        timezone: 'Europe/London',
        primaryChannel: 'SMS',
        currency: 'GBP',
        metaDescription: 'AI response systems for Leeds businesses. Instant booking automation for Yorkshire estate agents, trades, and medical practices.',
        localInsight: 'Leeds combines strong financial services sector with growing aesthetic clinic market and established trade business networks.',
        priorityIndustries: ['real-estate', 'trades', 'mortgage', 'medspa', 'insurance']
      },
      {
        slug: 'bristol',
        city: 'Bristol',
        country: 'United Kingdom',
        countryCode: 'GB',
        timezone: 'Europe/London',
        primaryChannel: 'SMS',
        currency: 'GBP',
        metaDescription: 'AI lead response for Bristol businesses. Automated systems for South West estate agents, home improvement, and medical practices.',
        localInsight: 'Bristol has high renewable energy adoption and premium property market, with growing demand for tech-enabled business solutions.',
        priorityIndustries: ['real-estate', 'trades', 'home-improvement', 'medspa', 'solar']
      }
    ]
  },
  AU: {
    region: 'Australia',
    currency: 'AUD',
    primaryChannel: 'SMS',
    compliance: 'Privacy Act 1988',
    locations: [
      {
        slug: 'sydney',
        city: 'Sydney',
        state: 'New South Wales',
        country: 'Australia',
        countryCode: 'AU',
        timezone: 'Australia/Sydney',
        primaryChannel: 'SMS',
        currency: 'AUD',
        metaDescription: 'AI lead response systems for Sydney businesses. Automated booking for real estate agents, trades, aesthetic clinics, and financial services across Greater Sydney.',
        localInsight: 'Sydney leads Australia in luxury real estate and medspa density, with premium market commanding instant-response expectations.',
        priorityIndustries: ['real-estate', 'medspa', 'trades', 'mortgage', 'solar']
      },
      {
        slug: 'melbourne',
        city: 'Melbourne',
        state: 'Victoria',
        country: 'Australia',
        countryCode: 'AU',
        timezone: 'Australia/Melbourne',
        primaryChannel: 'SMS',
        currency: 'AUD',
        metaDescription: 'AI automation for Melbourne businesses. Instant lead capture for Victorian estate agents, trades, medical practices, and home services.',
        localInsight: 'Melbourne has strong trade business culture and growing solar adoption, with tech-forward consumer base.',
        priorityIndustries: ['real-estate', 'trades', 'solar', 'medspa', 'home-improvement']
      },
      {
        slug: 'brisbane',
        city: 'Brisbane',
        state: 'Queensland',
        country: 'Australia',
        countryCode: 'AU',
        timezone: 'Australia/Brisbane',
        primaryChannel: 'SMS',
        currency: 'AUD',
        metaDescription: 'AI lead generation for Brisbane businesses. Automated response for Queensland solar companies, trades, estate agents, and medical practices.',
        localInsight: 'Brisbane and Gold Coast lead Australia in solar installation volume driven by climate and government incentives.',
        priorityIndustries: ['solar', 'real-estate', 'trades', 'hvac', 'medspa']
      },
      {
        slug: 'perth',
        city: 'Perth',
        state: 'Western Australia',
        country: 'Australia',
        countryCode: 'AU',
        timezone: 'Australia/Perth',
        primaryChannel: 'SMS',
        currency: 'AUD',
        metaDescription: 'AI response systems for Perth businesses. Instant booking automation for WA trades, solar companies, and service businesses.',
        localInsight: 'Perth mining economy drives high-ticket spending on home services, solar, and premium lifestyle services.',
        priorityIndustries: ['solar', 'trades', 'real-estate', 'hvac', 'home-improvement']
      },
      {
        slug: 'gold-coast',
        city: 'Gold Coast',
        state: 'Queensland',
        country: 'Australia',
        countryCode: 'AU',
        timezone: 'Australia/Brisbane',
        primaryChannel: 'SMS',
        currency: 'AUD',
        metaDescription: 'AI automation for Gold Coast businesses. Automated lead response for Queensland solar, aesthetic clinics, trades, and real estate.',
        localInsight: 'Gold Coast leads in solar adoption and aesthetic clinic density, with tourism-driven premium services market.',
        priorityIndustries: ['solar', 'medspa', 'real-estate', 'trades', 'hvac']
      }
    ]
  },
  UAE: {
    region: 'United Arab Emirates',
    currency: 'AED',
    primaryChannel: 'WhatsApp',
    compliance: 'Federal Decree-Law No. 45/2021',
    locations: [
      {
        slug: 'dubai',
        city: 'Dubai',
        country: 'United Arab Emirates',
        countryCode: 'AE',
        timezone: 'Asia/Dubai',
        primaryChannel: 'WhatsApp',
        currency: 'AED',
        metaDescription: 'AI lead response systems for Dubai businesses. WhatsApp automation for real estate, luxury auto, aesthetic clinics, and financial services across UAE.',
        localInsight: 'Dubai has the highest luxury real estate and premium auto dealership density in the Middle East, with WhatsApp as dominant business channel.',
        priorityIndustries: ['real-estate', 'luxury-auto', 'medspa', 'mortgage', 'insurance']
      },
      {
        slug: 'abu-dhabi',
        city: 'Abu Dhabi',
        country: 'United Arab Emirates',
        countryCode: 'AE',
        timezone: 'Asia/Dubai',
        primaryChannel: 'WhatsApp',
        currency: 'AED',
        metaDescription: 'AI automation for Abu Dhabi businesses. WhatsApp booking systems for real estate, financial services, and premium service businesses.',
        localInsight: 'Abu Dhabi combines government sector presence with premium real estate and financial services market, strong WhatsApp business adoption.',
        priorityIndustries: ['real-estate', 'mortgage', 'medspa', 'luxury-auto', 'insurance']
      },
      {
        slug: 'sharjah',
        city: 'Sharjah',
        country: 'United Arab Emirates',
        countryCode: 'AE',
        timezone: 'Asia/Dubai',
        primaryChannel: 'WhatsApp',
        currency: 'AED',
        metaDescription: 'AI lead generation for Sharjah businesses. WhatsApp automation for UAE real estate, trades, and service businesses.',
        localInsight: 'Sharjah serves as residential hub for Dubai workforce, with growing real estate and home services demand.',
        priorityIndustries: ['real-estate', 'trades', 'home-improvement', 'medspa', 'auto']
      }
    ]
  },
  IN: {
    region: 'India',
    currency: 'INR',
    primaryChannel: 'WhatsApp',
    compliance: 'DPDP Act 2023',
    locations: [
      {
        slug: 'bangalore',
        city: 'Bangalore',
        state: 'Karnataka',
        country: 'India',
        countryCode: 'IN',
        timezone: 'Asia/Kolkata',
        primaryChannel: 'WhatsApp',
        currency: 'INR',
        metaDescription: 'AI lead response systems for Bangalore businesses. WhatsApp automation for real estate builders, IVF clinics, interior design, and ed-tech across Bengaluru.',
        localInsight: 'Bangalore leads India in tech adoption and premium real estate development, with WhatsApp as primary business communication channel.',
        priorityIndustries: ['real-estate', 'ivf-clinic', 'interior-design', 'coaching', 'medspa']
      },
      {
        slug: 'hyderabad',
        city: 'Hyderabad',
        state: 'Telangana',
        country: 'India',
        countryCode: 'IN',
        timezone: 'Asia/Kolkata',
        primaryChannel: 'WhatsApp',
        currency: 'INR',
        metaDescription: 'AI automation for Hyderabad businesses. WhatsApp booking for real estate, IVF clinics, coaching institutes, and jewellery businesses across Telangana.',
        localInsight: 'Hyderabad combines strong real estate market with high IVF clinic density and established coaching institute sector.',
        priorityIndustries: ['real-estate', 'ivf-clinic', 'coaching', 'jewellery', 'medspa']
      },
      {
        slug: 'chennai',
        city: 'Chennai',
        state: 'Tamil Nadu',
        country: 'India',
        countryCode: 'IN',
        timezone: 'Asia/Kolkata',
        primaryChannel: 'WhatsApp',
        currency: 'INR',
        metaDescription: 'AI lead generation for Chennai businesses. WhatsApp automation for Tamil Nadu real estate, hospitals, manufacturing, and education consultants.',
        localInsight: 'Chennai has strong hospital and medical services sector with growing premium real estate and education consulting demand.',
        priorityIndustries: ['real-estate', 'hospital', 'coaching', 'medspa', 'manufacturing']
      },
      {
        slug: 'delhi',
        city: 'Delhi',
        state: 'Delhi NCR',
        country: 'India',
        countryCode: 'IN',
        timezone: 'Asia/Kolkata',
        primaryChannel: 'WhatsApp',
        currency: 'INR',
        metaDescription: 'AI response systems for Delhi businesses. WhatsApp automation for NCR real estate, IVF clinics, jewellery, and coaching institutes.',
        localInsight: 'Delhi NCR has highest real estate transaction volume in India with strong premium services and education sector.',
        priorityIndustries: ['real-estate', 'ivf-clinic', 'jewellery', 'coaching', 'medspa']
      },
      {
        slug: 'mumbai',
        city: 'Mumbai',
        state: 'Maharashtra',
        country: 'India',
        countryCode: 'IN',
        timezone: 'Asia/Kolkata',
        primaryChannel: 'WhatsApp',
        currency: 'INR',
        metaDescription: 'AI automation for Mumbai businesses. WhatsApp booking for Maharashtra real estate, financial services, hospitals, and premium services.',
        localInsight: 'Mumbai is India\'s financial capital with highest luxury real estate prices and premium services concentration.',
        priorityIndustries: ['real-estate', 'mortgage', 'hospital', 'ivf-clinic', 'medspa']
      }
    ]
  }
}

// Get all locations as flat array
export function getAllLocations(): Location[] {
  return Object.values(locationGroups).flatMap(group => group.locations)
}

// Get locations by country code
export function getLocationsByCountry(countryCode: string): Location[] {
  const group = locationGroups[countryCode]
  return group ? group.locations : []
}

// Get location by slug
export function getLocationBySlug(slug: string): Location | undefined {
  return getAllLocations().find(loc => loc.slug === slug)
}

// Industry-specific keyword mapping by location
export const localKeywords: Record<string, Record<string, string[]>> = {
  US: {
    solar: ['solar lead management', 'solar CRM automation', 'solar installation lead response', 'EnergySage lead recovery'],
    roofing: ['roofing CRM automation', 'storm restoration leads', 'missed roofing calls', 'JobNimbus automation'],
    hvac: ['HVAC missed call solution', 'ServiceTitan automation', 'emergency HVAC leads', '24/7 HVAC answering'],
    'real-estate': ['real estate CRM automation', 'Zillow lead follow up', 'dead real estate leads', 'Follow Up Boss automation'],
    medspa: ['medspa booking automation', 'aesthetic clinic CRM', 'Boulevard automation', 'patient reactivation system']
  },
  UK: {
    'real-estate': ['estate agent CRM automation', 'property enquiry automation', 'lettings automation', 'rightmove lead follow up'],
    trades: ['tradesman answering service', 'builder lead automation', 'missed call solution trades', 'quote follow up automation'],
    medspa: ['aesthetics clinic automation UK', 'patient booking automation', 'clinic CRM UK', 'reduce no-shows clinic']
  },
  AU: {
    solar: ['solar lead automation Australia', 'solar quote follow up', 'solar CRM automation NSW QLD', 'solar installation leads'],
    'real-estate': ['real estate CRM automation Australia', 'property lead follow up', 'realestate.com.au automation'],
    trades: ['tradie answering service', 'tradie lead automation', 'missed call solution Australia']
  },
  UAE: {
    'real-estate': ['Dubai real estate lead automation', 'WhatsApp automation property', 'off plan property leads', 'Dubai CRM automation'],
    'luxury-auto': ['luxury car dealership Dubai', 'auto lead response UAE', 'WhatsApp automation dealership']
  },
  IN: {
    'real-estate': ['builder lead automation India', 'real estate WhatsApp automation', 'property CRM India', 'NRI property leads'],
    'ivf-clinic': ['IVF clinic lead automation', 'fertility clinic WhatsApp booking', 'patient follow up system India'],
    coaching: ['coaching institute automation', 'NEET JEE enquiry automation', 'education CRM India', 'admission automation']
  }
}
