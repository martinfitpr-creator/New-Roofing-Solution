export type PageId =
  | 'home'
  | 'about'
  | 'services-overview'
  | 'projects'
  | 'service-areas'
  | 'faqs'
  | 'blog'
  | 'contact'
  | 'roof-installations'
  | 'roof-repairs'
  | 'roof-replacements'
  | 'roof-waterproofing'
  | 'roof-leak-repairs'
  | 'roof-maintenance'
  | 'roof-inspections'
  | 'roof-painting-coatings'
  | 'gutter-installation-repairs'
  | 'roof-cleaning'
  | 'residential-roofing'
  | 'commercial-roofing'
  | 'industrial-roofing';

export interface ServiceDetail {
  slug: PageId;
  title: string;
  shortDesc: string;
  description: string;
  iconName: string;
  benefits: string[];
  process: { step: string; title: string; desc: string }[];
  faqs: { q: string; a: string }[];
  seoKeywords: string;
  imageAlt: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  category: string;
  date?: string;
  readTime: string;
  excerpt: string;
  content: string[];
  imageAlt: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  category: 'residential' | 'commercial' | 'industrial' | 'repairs' | 'waterproofing';
  location: string;
  description: string;
  beforeImg: string;
  afterImg: string;
  year?: string;
}

export interface LeadSubmission {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  service: string;
  message: string;
  date: string;
  status: 'new' | 'contacted' | 'completed';
}
