import { PaginationMeta } from "../pagination";
import { RealEstate } from "../real-estate";


export interface AdminManagePropertiesStore {
    properties: RealEstate[];
    meta: PaginationMeta;
    isLoading: boolean;

    // Load initial properties
    handleInitProperties: () => Promise<void>;

    // Handle page properties changes
    handlePageChange: (page: number) => Promise<void>;

    handleUpdateProperty: (
        page: number,
        propertyId: number,
        propertyData: PropertyData
    ) => Promise<void>;

    handleCreateProperty: (
        page: number,
        propertyData: PropertyData
    ) => Promise<void>;

    handleDeleteProperty: (
        propertyId: number,
        page: number
    ) => Promise<void>;
}


export interface PropertyFormProps {
    initialData?: Partial<PropertyData>;
    onSubmit: (data: PropertyData) => void;
    onCancel: () => void;
    isLoading?: boolean;
}

export interface PropertyData {
    id?: number;
    slug?: string;
    owner_id?: number;
    title: string;
    description: string;
    property_type: 'house' | 'villa' | 'apartment' | 'land' | 'commercial' | 'office' | string;
    type: 'sale' | 'rent' | string;
    purpose: 'residential' | 'commercial' | string;

    // Property Details
    bedrooms: number | string;
    bathrooms: number | string;
    living_rooms: number | string;
    kitchens: number | string;
    balconies: number | string;
    area_total: number | string;
    floor: number | string;
    total_floors: number | string;
    furnishing: 'furnished' | 'semi-furnished' | 'unfurnished' | string;
    status: 'available' | 'sold' | 'rented' | string;
    is_featured: boolean | number;
    features: string[];
    tags: string[];

    // Price Information
    price: number | string;
    discount: number | string | null;
    discounted_price?: number | string | null;

    // Location
    location: {
        city: string;
        district: string;
        street: string;
        landmark?: string | null;
        latitude?: string | number | null;
        longitude?: string | number | null;
    };

    // Media
    images: (File | string)[];
    videos?: (string | File)[] | null;
}


export interface PresentationalPropertiesProps {
    // Data
    filteredProperties: RealEstate[];
    meta: PaginationMeta;
    isLoading: boolean;

    // Modal states
    showModal: boolean;
    showDeleteModal: boolean;
    editingProperty: RealEstate | null;
    propertyToDelete: RealEstate | null;
    isDeleting: boolean;

    // Filter states
    showFilters: boolean;
    filters: {
        property_type: string;
        type: string;
        status: string;
        city: string;
    };

    // Handlers
    handleAddProperty: () => void;
    handleEditProperty: (property: RealEstate) => void;
    handleDeleteClick: (property: RealEstate) => void;
    handleConfirmDelete: () => void;
    handleCancelDelete: () => void;
    handleSubmit: (data: PropertyData) => void;
    handlePageChange: (page: number) => void;
    handleFilterChange: (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => void;
    resetFilters: () => void;
    setShowFilters: (show: boolean) => void;
    setShowModal: (show: boolean) => void;
    convertToFormData: (property: RealEstate) => Partial<PropertyData>;
}
