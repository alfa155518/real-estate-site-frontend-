"use server"

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const getProperty = async (slug: string) => {
    const response = await fetch(`${API_URL}/v1/properties/property/${slug}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        next: {
            tags: [`property-${slug}`],
        },
        cache: "force-cache",
    });
    const data = await response.json();
    return data;
};
