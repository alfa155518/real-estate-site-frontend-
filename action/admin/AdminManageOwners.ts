"use server";

import { OwnerData } from "@/types/admin/adminOwnersStore";
import { getCookie } from "@/utils/getCookie";
import { revalidatePath } from "next/cache";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const ADMIN_URL = process.env.NEXT_PUBLIC_ADMIN_URL;

// Get Owners Data
export async function getOwners(page?: number) {
    const token = await getCookie("userToken");
    const response = await fetch(`${API_URL}/${ADMIN_URL}/owners?page=${page}`, {
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

// Create Owner
export async function createOwner(page: number, clientData: OwnerData) {
    const token = await getCookie("userToken");

    const response = await fetch(`${API_URL}/${ADMIN_URL}/owners?page=${page}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            "page": page.toString()
        },
        body: JSON.stringify(clientData),
    });

    revalidatePath("/admin/owners");
    const data = await response.json();
    return data;
}

// Update Owner
export async function updateOwner(page: number = 1, ownerId: number, clientData: OwnerData) {
    const token = await getCookie("userToken");

    const response = await fetch(`${API_URL}/${ADMIN_URL}/owners/${ownerId}?page=${page}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            "page": page.toString()
        },
        body: JSON.stringify(clientData),
    });

    revalidatePath("/admin/owners");
    const data = await response.json();
    return data;
}

// Delete Owner
export async function deleteOwner(ownerId: number, page: number = 1) {
    const token = await getCookie("userToken");

    const response = await fetch(`${API_URL}/${ADMIN_URL}/owners/${ownerId}?page=${page}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            "page": page.toString()
        },
    });

    revalidatePath("/admin/owners");
    const data = await response.json();
    return data;
}
