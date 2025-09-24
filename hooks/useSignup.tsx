import { useForm } from "react-hook-form";
import { signupFormData } from "../types/register";
import { signup } from "@/action/register";
import toast from "react-hot-toast";
import { setCookie } from "cookies-next";
import { useState } from "react";
import { googleAuth } from "@/action/auth";
export default function useSignup() {
  // google Submit state
  const [googleSubmitting, setGoogleSubmitting] = useState(false);

  // Form state
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<signupFormData>({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      confirm_password: "",
    },
  });

  // Signup function
  const onSubmit = async (data: signupFormData) => {
    try {
      const response = await signup(data);
      if (response.status === "success") {
        toast.success(response.message);
        setCookie("userToken", response.access_token, {
          maxAge: 60 * 60 * 24 * 365,
          path: "/",
          //   httpOnly: true,
          sameSite: "lax",
          secure: true,
        });
        reset();
        window.location.href = "/login";
      } else {
        toast.error(response.message);
      }
    } catch {
      toast.error("حدث خطأ اثناء التسجيل");
    }
  };

  // Google sign-in function
  const handleGoogleSignIn = async () => {
    try {
      setGoogleSubmitting(true);
      const result = await googleAuth();
      if (result.status === "success") {
        window.open(result.url, "_blank");
      } else {
        toast.error(result.message);
      }
    } catch {
      toast.error("حدث خطأ أثناء محاولة تسجيل الدخول بحساب جوجل");
    } finally {
      setGoogleSubmitting(false);
    }
  };

  return {
    register,
    handleSubmit,
    handleGoogleSignIn,
    errors,
    isSubmitting,
    onSubmit,
    googleSubmitting,
  };
}
