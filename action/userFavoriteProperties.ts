
"use server";

import { getCookie } from "@/utils/getCookie";
const API_URL = process.env.NEXT_PUBLIC_API_URL;


// get User Favorite Properties
export const getUserFavoriteProperties = async () => {
    const token = await getCookie("userToken");
    const response = await fetch(`${API_URL}/v1/favorites`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        cache: "no-store",
    });
    const data = await response.json();
    return data;
};

// toggle User Favorite Properties
export const toggleFavorite = async (propertyId: number) => {
    const token = await getCookie("userToken");
    const response = await fetch(`${API_URL}/v1/favorites/${propertyId}/toggle`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });
    const data = await response.json();
    return data;
};
