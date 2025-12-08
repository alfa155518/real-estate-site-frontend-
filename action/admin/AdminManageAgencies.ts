"use server";

import { AgencyData } from "@/types/admin/adminAgenciesStore";
import { getCookie } from "@/utils/getCookie";
import { revalidatePath } from "next/cache";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const ADMIN_URL = process.env.NEXT_PUBLIC_ADMIN_URL;

// Get Agencies Data
export async function getAgencies(page?: number) {
    const token = await getCookie("userToken");
    const response = await fetch(`${API_URL}/${ADMIN_URL}/agencies?page=${page}`, {
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

// Create Agency
export async function createAgency(page: number, clientData: AgencyData) {
    const token = await getCookie("userToken");

    const response = await fetch(`${API_URL}/${ADMIN_URL}/agencies?page=${page}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            "page": page.toString()
        },
        body: JSON.stringify(clientData),
    });

    revalidatePath("/admin/agencies");
    const data = await response.json();
    return data;
}

// Update Agency
export async function updateAgency(page: number = 1, agencyId: number, clientData: AgencyData) {
    const token = await getCookie("userToken");

    const response = await fetch(`${API_URL}/${ADMIN_URL}/agencies/${agencyId}?page=${page}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            "page": page.toString()
        },
        body: JSON.stringify(clientData),
    });

    revalidatePath("/admin/agencies");
    const data = await response.json();
    return data;
}

// Delete Agency
export async function deleteAgency(agencyId: number, page: number = 1) {
    const token = await getCookie("userToken");

    const response = await fetch(`${API_URL}/${ADMIN_URL}/agencies/${agencyId}?page=${page}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            "page": page.toString()
        },
    });

    revalidatePath("/admin/agencies");
    const data = await response.json();
    return data;
}
