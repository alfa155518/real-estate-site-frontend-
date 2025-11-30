interface PropertyImage {
    id: number;
    image_url: string;
    is_primary: boolean;
    created_at: string;
    updated_at: string;
}

interface Owner {
    id: number;
    name: string;
    phone: string;
    email: string;
    type: "individual" | "company";
    website?: string;
    created_at: string;
    updated_at: string;
}

interface Location {
    id: number;
    city: string;
    district: string;
    street: string;
    latitude: string;
    longitude: string;
    landmark: string | null;
    created_at: string;
    updated_at: string;
}

interface Video {
    id: number;
    property_id: number;
    video_url: string;
}

type agency = {
    id: number;
    name: string;
    phone: string;
    website?: string;
    created_at?: string;
    updated_at?: string;
}

export interface Property {
    id: number;
    title: string;
    slug: string;
    description: string;
    price: number;
    currency: string;
    discount: string | number;
    discounted_price: string | null;
    discount_percentage?: string | number;
    type: "sale" | "rent";
    purpose: string;
    property_type: string;
    bedrooms: number;
    bathrooms: number;
    living_rooms: number;
    kitchens: number;
    balconies: number;
    area_total: string;
    floor: number | null;
    total_floors: number | null;
    furnishing: "furnished" | "semi_furnished" | "unfurnished";
    status: string;
    views: number;
    likes: number;
    is_featured: boolean;
    features: string[];
    tags: string[];
    created_at: string;
    updated_at: string;
    owner: Owner;
    agency: agency;
    location: Location;
    images: PropertyImage[];
    videos?: Video[];
    latitude?: string | number;
    longitude?: string | number;
}

export interface PropertyProps {
    property: Property,
}

export interface PropertyStore {
    property: Property | null;
    isLoading: boolean;
    initProperty: (slug: string) => Promise<void>;
}