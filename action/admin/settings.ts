"use server";

import { SettingsData } from "@/types/admin/settingsStore";
import { revalidateTag } from "next/cache";
import { getCookie } from "@/utils/getCookie";
const API_URL = process.env.NEXT_PUBLIC_API_URL;

// Get Settings Data
export default async function getSettingsData() {
    const token = await getCookie("userToken");
    const response = await fetch(`${API_URL}/admin/v1/settings`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        cache: "force-cache",
        next: {
            tags: ["settings"],
        },
    });
    const data = await response.json();
    return data;
}

// Update Settings Data
export async function updateSettingsData(clientData: SettingsData) {
    const token = await getCookie("userToken");

    const serverData = new FormData();
    serverData.append("logo", clientData.logo![0]);
    serverData.append("location", clientData.location);
    serverData.append("phone", clientData.phone);
    serverData.append("email", clientData.email);
    serverData.append("opening_hours", clientData.opening_hours);
    serverData.append("facebook", clientData.facebook!);
    serverData.append("twitter", clientData.twitter!);
    serverData.append("instagram", clientData.instagram!);
    serverData.append("linkedin", clientData.linkedin!);
    serverData.append("_method", "PATCH");

    const response = await fetch(`${API_URL}/admin/v1/settings`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
        },
        body: serverData,
    });
    const data = await response.json();
    revalidateTag("settings");
    return data;
}
