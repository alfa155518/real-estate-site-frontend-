export interface PropertyImage {
  id: number;
  image_url: string;
  is_primary: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface Owner {
  id: number;
  name: string;
  phone: string;
  email: string;
  type: string;
  created_at?: string;
  updated_at?: string;
}

export interface Agency {
  id: number;
  name: string;
  phone: string;
  website?: string;
  created_at?: string;
  updated_at?: string;
}

export interface Location {
  id: number;
  city: string;
  district: string;
  street: string;
  latitude: string;
  longitude: string;
  landmark?: string | null;
  created_at?: string;
  updated_at?: string;
}

export interface Video {
  id: number;
  property_id: number;
  video_url: string | undefined;
}

export interface RealEstate {
  id: number;
  title: string;
  slug: string;
  description: string;
  price: string;
  currency: string;
  discount: string;
  discounted_price: string | null;
  discount_percentage: string | null;
  type: 'sale' | 'rent';
  purpose: string;
  property_type: string;
  bedrooms: number;
  bathrooms: number;
  living_rooms: number;
  kitchens: number;
  balconies: number;
  area_total: string;
  features: string[];
  tags: string[];
  floor: number | null;
  total_floors: number | null;
  furnishing: string;
  status: string;
  views: number;
  likes: number;
  is_featured: boolean;
  created_at: string;
  updated_at: string;
  owner: Owner;
  agency: Agency | null;
  location: Location;
  images: PropertyImage[];
  videos?: Video[];
}

export interface RealEstateFilterParams {
  type?: "all" | "sale" | "rent";
  location?: string;
  minPrice?: number | "";
  maxPrice?: number | "";
  bedrooms?: number | "" | "6+";
  bathrooms?: number | "" | "5+";
  search?: string;
  is_featured?: boolean;
  status?: "available";
}

export interface RealEstateListProps {
  properties: RealEstate[];
  loading?: boolean;
}

export interface RealEstateCardProps {
  property: RealEstate;
  index: number;
  image?: string;
  children?: React.ReactNode;
}

export interface RealEstateActionsProps {
  property: RealEstate;
  handleEditProperty: (property: RealEstate) => void;
  handleDeleteProperty: (property: RealEstate) => void;
}

export type RealEstateList = RealEstate[];

