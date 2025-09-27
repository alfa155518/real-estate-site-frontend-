"use server";

import {
  PasswordProfileFormData,
  PersonalInfoFormData,
} from "@/types/user-profile";
import { getCookie } from "@/utils/getCookie";
import { revalidateTag } from "next/cache";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
export const getUserProfile = async () => {
  const token = await getCookie("userToken");
  const response = await fetch(`${API_URL}/v1/user/profile`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    next: {
      tags: ["user-profile-data"],
    },
    cache: "force-cache",
  });
  const data = await response.json();
  return data;
};

export const updateUserProfile = async (formData: PersonalInfoFormData) => {
  const token = await getCookie("userToken");
  const response = await fetch(`${API_URL}/v1/user/profile`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(formData),
  });
  const data = await response.json();
  revalidateTag("user-profile-data");
  return data;
};

export const updatePassword = async (formData: PasswordProfileFormData) => {
  const token = await getCookie("userToken");
  const response = await fetch(`${API_URL}/v1/user/profile/password`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(formData),
  });
  const data = await response.json();
  revalidateTag("user-profile-data");
  return data;
};

export const userLogout = async () => {
  const token = await getCookie("userToken");
  console.log(token);
  const response = await fetch(`${API_URL}/v1/user/logout`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json();
  revalidateTag("user-profile-data");
  return data;
};
