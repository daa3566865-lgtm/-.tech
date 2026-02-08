export interface PurchaseOption {
  id: string;
  name: string;
  price: number;
  term: string;
  sections: {
    title: string;
    items: string[];
  }[];
}

export interface Project {
  id: string;
  title: string;
  price: number;
  area: number;
  floors: number;
  image: string;
  rooms: number;
  bedrooms: number;
  bathrooms: number;
  dimensions: string;
  features: string[];
  description: string;
  images: string[];
  purchaseOptions: PurchaseOption[];
}

export interface PageBlock {
  id: string;
  type: 'text_image' | 'features' | 'hero' | 'text';
  title?: string;
  content?: string;
  image?: string;
  imagePosition?: 'left' | 'right';
  items?: string[]; // For features list
}

export interface Page {
  slug: string;
  title: string;
  content: string;
  blocks?: PageBlock[];
  images: string[];
}

export interface MenuItem {
  id: string;
  label: string;
  href: string;
  order: number;
  type: 'link' | 'dropdown';
}

export interface FilterState {
  area: [number, number];
  price: [number, number];
  floors: number | 'all';
  rooms: [number, number];
  bedrooms: [number, number];
}
