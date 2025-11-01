"use server"

import { getCookie } from "@/utils/getCookie";
import { revalidateTag } from "next/cache";
const API_URL = process.env.NEXT_PUBLIC_API_URL;

// Get Reviews
export const getReviews = async (page: number) => {
    const token = await getCookie("userToken");
    const response = await fetch(`${API_URL}/admin/v1/reviews?page=${page}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
        next: {
            tags: [`reviews-data-${page}`],
        },
        cache: "force-cache",
    });
    const data = await response.json();
    return data;
};

// Delete Review
export const deleteReview = async (reviewId: number, page: number, propertyId: number) => {
    const token = await getCookie("userToken");
    const response = await fetch(`${API_URL}/admin/v1/reviews/${reviewId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
    });

    const data = await response.json();
    revalidateTag(`reviews-data-${page}`);
    revalidateTag(`reviews-by-property-${propertyId}`);
    return data;
};
