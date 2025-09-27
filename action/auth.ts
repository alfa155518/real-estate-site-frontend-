"use server";

import { ForgetPasswordFormData, ResetPasswordFormData } from "@/types/auth";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// Google auth action
export const googleAuth = async () => {
  const response = await fetch(`${API_URL}/v1/auth/google/redirect`, {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
    credentials: "include", // Keep this for CORS
  });
  const data = await response.json();
  if (!response.ok) {
    return {
      status: "error",
      message: data.message,
    };
  }
  return {
    status: "success",
    url: data.url,
  };
};

// Forget password action
export const forgetPassword = async (formData: ForgetPasswordFormData) => {
  const serverData = new FormData();
  serverData.append("email", formData.email);
  const response = await fetch(`${API_URL}/v1/auth/forgot-password`, {
    method: "POST",
    body: serverData,
  });
  const data = await response.json();
  return data;
};

// Reset password action
export const resetPassword = async (formData: ResetPasswordFormData) => {
  const serverData = new FormData();
  serverData.append("token", formData.token!);
  serverData.append("email", formData.email!);
  serverData.append("password", formData.password);
  serverData.append("confirm_password", formData.confirm_password);
  const response = await fetch(`${API_URL}/v1/auth/reset-password`, {
    method: "POST",
    body: serverData,
  });
  const data = await response.json();
  return data;
};
