"use server";

import { PropertyData } from "@/types/admin/adminPropertiesStore";
import { getCookie } from "@/utils/getCookie";
import { buildPropertyFormData } from "@/utils/handlerFormDataProperty";
import { revalidatePath, revalidateTag } from "next/cache";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const ADMIN_URL = process.env.NEXT_PUBLIC_ADMIN_URL;

// Get Properties Data
export async function getProperties(page?: number) {
    const token = await getCookie("userToken");
    const response = await fetch(`${API_URL}/${ADMIN_URL}/properties?page=${page}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            "page": page?.toString() || "1",
        },
        cache: "force-cache",
        next: {
            revalidate: 7000,
        },
    });
    const data = await response.json();
    return data;
}


// Update Property
export async function updateProperty(page: number = 1, propertyId: number, clientData: PropertyData) {
    const token = await getCookie("userToken");

    // Use helper to build base FormData
    const serverData = buildPropertyFormData(clientData);

    // Add method spoofing for Laravel PATCH request
    serverData.append("_method", "PATCH");

    const response = await fetch(`${API_URL}/${ADMIN_URL}/properties/${propertyId}?page=${page}`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
            "page": page.toString()
        },
        body: serverData,
    });
    revalidatePath("/admin/properties");
    if (clientData.slug) {
        revalidateTag(`property-${clientData.slug}`);
    }
    const data = await response.json();
    return data;
}

// Create Property
export async function createProperty(page: number, clientData: PropertyData) {
    const token = await getCookie("userToken");

    // Use helper to build FormData
    const serverData = buildPropertyFormData(clientData);

    const response = await fetch(`${API_URL}/${ADMIN_URL}/properties?page=${page}`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
            "page": page.toString()
        },
        body: serverData,
    });

    revalidatePath("/admin/properties");
    const data = await response.json();
    return data;
}

// Delete Property
export async function deleteProperty(propertyId: number, page: number = 1) {
    const token = await getCookie("userToken");

    const response = await fetch(`${API_URL}/${ADMIN_URL}/properties/${propertyId}?page=${page}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            "page": page.toString()
        },
    });

    revalidatePath("/admin/properties");
    const data = await response.json();
    return data;
}