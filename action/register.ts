"use server";

import { signupFormData, loginFormData } from "@/types/register";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// Signup action
export const signup = async (formData: signupFormData) => {
  const response = await fetch(`${API_URL}/v1/user/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });
  return response.json();
};

// Login action
export const login = async (formData: loginFormData) => {
  const response = await fetch(`${API_URL}/v1/user/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });
  return response.json();
};
