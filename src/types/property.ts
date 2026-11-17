export type PropertyCategory =
  | 'Apartments'
  | 'Houses'
  | 'Villas'
  | 'Condos'
  | 'Townhouses'
  | 'Land';

export type ListingStatus = 'For Sale' | 'For Rent';

export interface Property {
  id: string;
  title: string;
  location: string;
  city: string;
  state: string;
  address: string;
  price: number;
  priceFormatted: string;
  status: ListingStatus;
  category: PropertyCategory;
  beds: number;
  baths: number;
  sqft: number;
  lotSize?: string;
  yearBuilt: number;
  parking: string;
  image: string;
  gallery: string[];
  featured?: boolean;
  heroFeatured?: boolean;
  description: string;
  amenities: string[];
  agentId: string;
  neighborhoodScore?: {
    walkability: string;
    schools: string;
    transit: string;
  };
}

export interface Agent {
  id: string;
  name: string;
  role: string;
  city: string;
  specialty: 'Luxury Estates' | 'Urban Condos' | 'Family Homes' | 'Investment & Land';
  experienceYears: number;
  closedDeals: number;
  activeListings: number;
  rating: number;
  phone: string;
  email: string;
  avatar: string;
  bio: string;
  languages: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  avatar: string;
  rating: number;
  quote: string;
  transactionType: string;
}

export interface BlogArticle {
  id: string;
  title: string;
  category: string;
  date: string;
  readTime: string;
  author: string;
  authorAvatar: string;
  image: string;
  excerpt: string;
  content: string[];
}

export interface SearchFilters {
  location: string;
  category: PropertyCategory | 'Any Type';
  status: ListingStatus | 'All';
  priceRange: string;
  beds: string;
  baths: string;
  sortBy: 'featured' | 'price-asc' | 'price-desc' | 'sqft-desc';
}

export type ScreenId =
  | 'home'
  | 'properties'
  | 'property-detail'
  | 'agents'
  | 'sell'
  | 'blog'
  | 'contact'
  | 'signin';
