export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  tagline: string;
  description: string;
  iconName: string;
  features: string[];
  image: string;
}

export interface FeaturedEvent {
  id: string;
  title: string;
  category: string;
  location: string;
  year: string;
  description: string;
  extendedDescription?: string;
  attendees?: string;
  highlights?: string[];
  image: string;
  featured?: boolean;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'All' | 'Corporate' | 'Weddings' | 'Concerts' | 'Activations';
  location: string;
  image: string;
  aspectRatio: 'square' | 'wide' | 'tall';
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  event: string;
  rating: number;
  avatar: string;
}

export interface ProcessStep {
  step: string;
  title: string;
  subtitle: string;
  description: string;
  deliverables: string[];
}

export interface Principle {
  number: string;
  title: string;
  description: string;
  iconName: string;
}

export interface SiteConfig {
  name: string;
  legalName: string;
  tagline: string;
  headline: {
    line1: string;
    line2: string;
    line3: string;
  };
  description: string;
  contact: {
    email: string;
    inquiryEmail: string;
    phone: string;
    intlPhone: string;
    address: {
      line1: string;
      city: string;
      country: string;
    };
    locations: { city: string; country: string; address: string }[];
  };
  socials: {
    name: string;
    url: string;
    icon: string;
  }[];
  stats: {
    value: string;
    label: string;
    description: string;
  }[];
}
