import toast from "react-hot-toast";
import { login } from "@/action/register";
import { loginFormData } from "@/types/register";
import { useForm } from "react-hook-form";
import { setCookie } from "cookies-next";
export default function useLogin() {
  // Form state
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<loginFormData>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // Login function
  const onSubmit = async (data: loginFormData) => {
    try {
      const response = await login(data);
      if (response.status === "success") {
        toast.success(response.message);
        reset();
        setCookie("userToken", response.access_token);
        window.location.href = "/";
      } else {
        toast.error(response.message);
      }
    } catch {
      toast.error("حدث خطأ اثناء التسجيل");
    }
  };

  return {
    register,
    handleSubmit,
    errors,
    isSubmitting,
    onSubmit,
  };
}
