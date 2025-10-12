"use server"

import { RealEstateFilterParams } from "@/types/real-estate";
const API_URL = process.env.NEXT_PUBLIC_API_URL;

// Get Reviews
export const getProperties = async (page?: number) => {
    const response = await fetch(`${API_URL}/v1/properties?page=${page}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "page": page?.toString() || "1"
        },
        cache: "no-store",
    });
    const data = await response.json();
    return data;
};

// Filters Properties Depends on Filters params
export const filtersProperties = async (filters: RealEstateFilterParams, page: number) => {
    const params = new URLSearchParams();

    // Add page parameter
    params.append('page', page.toString());

    // Add optional parameters only if they exist
    if (filters.search) params.append('search', filters.search);
    if (filters.type) params.append('type', filters.type);
    if (filters.location) params.append('location', filters.location);
    if (filters.minPrice) params.append('minPrice', filters.minPrice.toString());
    if (filters.maxPrice) params.append('maxPrice', filters.maxPrice.toString());
    if (filters.bedrooms) params.append('bedrooms', filters.bedrooms.toString());
    if (filters.bathrooms) params.append('bathrooms', filters.bathrooms.toString());
    if (filters.is_featured) params.append('is_featured', filters.is_featured.toString());
    if (filters.status) params.append('status', filters.status);

    const queryString = params.toString();
    const response = await fetch(`${API_URL}/v1/properties/filter?${queryString}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        cache: "no-store",
    });
    const data = await response.json();
    return data;
};