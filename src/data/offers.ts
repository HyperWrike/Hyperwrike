import offersData from './offers.json'

export interface Offer {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  directAnswer: string;
  problem: string;
  solution: string;
  whatYouGet: string[];
  whyItPays: string;
  whoFor: string;
  ctaText: string;
}

export const offers: Offer[] = offersData as Offer[];
