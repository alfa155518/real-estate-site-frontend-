"use server";


const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const getSliders = async (sliderID: number) => {
    const response = await fetch(`${API_URL}/v1/sliders/${sliderID}`, {
        method: "GET",
        headers: {
            Accept: "application/json",
        },
        next: {
            tags: [`sliders_${sliderID}`],
        },
        cache: "force-cache",
    });
    const data = await response.json();
    return data;
};
