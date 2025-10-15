"use server";

import { SupportFormData } from "@/types/support";
import { getCookie } from "@/utils/getCookie";
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function userSupport(data: SupportFormData, selectedFiles: File[]) {
    const token = await getCookie("userToken");
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("phone", data.phone);
    formData.append("priority", data.priority);
    formData.append("subject", data.subject);
    formData.append("message", data.message);

    if (selectedFiles.length > 0) {
        selectedFiles.forEach((file) => {
            formData.append("images[]", file);
        });
    }
    const response = await fetch(`${API_URL}/v1/support`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
        },
        body: formData,
    });
    const result = await response.json();
    return result;
}
