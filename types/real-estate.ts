export interface PropertyImage {
  id: number;
  image_url: string;
  is_primary: boolean;
}

export interface RealEstate {
  id: number;
  title: string;
  description: string;
  price: number;
  discount: number;
  discounted_price: number;
  type: 'sale' | 'rent';
  bedrooms: number;
  bathrooms: number;
  living_rooms: number;
  area: number;
  location: string;
  latitude: number;
  longitude: number;
  status: string;
  images: PropertyImage[];
  features: string[];
  is_featured?: boolean;
  created_at: string;
  updated_at: string;
}

export interface RealEstateFilterParams {
  type?: 'all' | 'sale' | 'rent';
  minPrice?: number;
  maxPrice?: number;
  bedrooms?: number;
  bathrooms?: number;
}

export type RealEstateList = RealEstate[];

