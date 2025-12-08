import { PropertyData } from "@/types/admin/adminPropertiesStore";

/**
 * Transforms PropertyData object into FormData format for API submission
 * Handles all property fields including nested location data and file uploads
 * 
 * @param clientData - The property data from the client form
 * @returns FormData object ready for API submission
 */
export function buildPropertyFormData(clientData: PropertyData): FormData {
    const serverData = new FormData();

    if (clientData.owner_id) {
        serverData.append('owner_id', String(clientData.owner_id));
    }

    if (clientData.agency_id) {
        serverData.append('agency_id', String(clientData.agency_id));
    }

    // Basic Information
    serverData.append('title', clientData.title);
    serverData.append('description', clientData.description);
    serverData.append('property_type', clientData.property_type);
    serverData.append('type', clientData.type);
    serverData.append('purpose', clientData.purpose);

    // Property Details
    serverData.append('bedrooms', String(clientData.bedrooms ?? 0));
    serverData.append('bathrooms', String(clientData.bathrooms ?? 0));
    serverData.append('living_rooms', String(clientData.living_rooms ?? 0));
    serverData.append('kitchens', String(clientData.kitchens ?? 0));
    serverData.append('balconies', String(clientData.balconies ?? 0));
    serverData.append('area_total', String(clientData.area_total ?? 0));
    serverData.append('floor', String(clientData.floor ?? 0));
    serverData.append('total_floors', String(clientData.total_floors ?? 0));
    serverData.append('furnishing', clientData.furnishing || "unfurnished");
    serverData.append('status', clientData.status || "available");
    serverData.append('is_featured', clientData.is_featured ? '1' : '0');

    // Arrays (features and tags)
    if (clientData.features && clientData.features.length > 0) {
        clientData.features.forEach((feature: string) => {
            serverData.append(`features[]`, feature);
        });
    } else {
        serverData.append('features', JSON.stringify([]));
    }

    if (clientData.tags && clientData.tags.length > 0) {
        clientData.tags.forEach((tag: string) => {
            serverData.append(`tags[]`, tag);
        });
    } else {
        serverData.append('tags', JSON.stringify([]));
    }

    // Price Information
    serverData.append('price', String(clientData.price));
    serverData.append('discount', String(clientData.discount ?? 0));
    serverData.append('discounted_price', String(clientData.discounted_price ?? 0));

    // Location
    serverData.append('city', clientData.location.city);
    serverData.append('district', clientData.location.district);
    serverData.append('street', clientData.location.street);
    serverData.append('landmark', clientData.location.landmark || "");
    serverData.append('latitude', String(clientData.location.latitude ?? 0));
    serverData.append('longitude', String(clientData.location.longitude ?? 0));

    // Media - Images (only append new File objects, skip existing URLs)
    if (clientData.images && Array.isArray(clientData.images)) {
        clientData.images.forEach((image) => {
            // Only append if it's a File object (new upload)
            if (image instanceof File) {
                serverData.append("images[]", image);
            }
            // Skip string URLs (existing images that haven't changed)
        });
    }

    // Videos
    if (clientData.videos) {
        clientData.videos.forEach((video) => {
            if (video instanceof File) {
                serverData.append("videos[]", video);
            } else {
                serverData.append("videos[]", video);
            }
        });
    }

    return serverData;
}
