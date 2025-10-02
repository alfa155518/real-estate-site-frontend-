"use server"
import { ReviewFormData } from "@/types/reviews";
import { getCookie } from "@/utils/getCookie";
import { revalidateTag } from "next/cache";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// Get Reviews
export const getReviews = async (page: number) => {
    const response = await fetch(`${API_URL}/v1/reviews?page=${page}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        next: {
            tags: [`reviews-data-${page}`],
        },
        cache: "force-cache",
    });
    const data = await response.json();
    return data;
};

// Get Reviews By Property
export const getReviewsByProperty = async (propertyId: number, page?: number) => {
    const response = await fetch(`${API_URL}/v1/reviews/${propertyId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        next: {
            tags: [`reviews-by-property-${propertyId}`],
        },
        cache: "force-cache",
    });
    if (page) {
        revalidateTag(`reviews-data-${page}`);
    }
    const data = await response.json();
    return data;
};

// Post Review
export const postReview = async (reviewData: ReviewFormData, page: number, propertyId: number) => {
    const serverData = new FormData();
    serverData.append("property_id", propertyId.toString());
    serverData.append("rating", reviewData.rating.toString());
    serverData.append("comment", reviewData.comment);
    const token = await getCookie("userToken");
    const response = await fetch(`${API_URL}/v1/reviews`, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${token}`,
        },
        body: serverData,
    });
    revalidateTag(`reviews-data-${page}`);
    revalidateTag(`reviews-by-property-${propertyId}`);

    const data = await response.json();
    return data;
};

// Review Like
export const reviewLike = async (reviewId: number, token: string, page: number, propertyId?: number) => {
    const response = await fetch(`${API_URL}/v1/reviews/${reviewId}/toggle-like`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        }
    });
    revalidateTag(`reviews-data-${page}`);
    if (propertyId) {
        revalidateTag(`reviews-by-property-${propertyId}`);
    }
    const data = await response.json();
    return data;
};