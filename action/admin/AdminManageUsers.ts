"use server";

import { revalidatePath } from "next/cache";
import { getCookie } from "@/utils/getCookie";
import { UserFormData } from "@/types/admin/adminManageUsers";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// Get Users Data
export async function getUsersData(page?: number) {
    const token = await getCookie("userToken");
    const response = await fetch(`${API_URL}/admin/v1/users?page=${page}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        cache: "force-cache",
        next: {
            revalidate: 7000,
        },
    });
    const data = await response.json();
    return data;
}

// update user
export async function updateUser(userId: number, formData: UserFormData, page: number) {
    const token = await getCookie("userToken");

    const serverData = new FormData();
    serverData.append("name", formData.name);
    serverData.append("email", formData.email);
    serverData.append("phone", formData.phone || "");
    serverData.append("address", formData.address || "");
    serverData.append("role", formData.role);
    serverData.append("_method", "PATCH");

    const response = await fetch(`${API_URL}/admin/v1/users/${userId}?current_page=${page}`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
        },
        body: serverData,
    });
    const data = await response.json();
    revalidatePath("/admin/users");
    return data;
}

// Delete User
export async function deleteUser(id: number, page: number) {
    const token = await getCookie("userToken");
    const response = await fetch(`${API_URL}/admin/v1/users/${id}?current_page=${page}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });
    const data = await response.json();
    revalidatePath("/admin/users");
    return data;
}
