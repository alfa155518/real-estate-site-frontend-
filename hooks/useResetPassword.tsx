import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { ResetPasswordFormData } from "@/types/auth";
import toast from "react-hot-toast";
import { useSearchParams } from "next/navigation";
import { resetPassword } from "@/action/auth";
export default function useResetPassword() {
  // states
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // get token and email from url
  const params = useSearchParams();
  const token = params.get("token");
  const email = params.get("email");

  // reset password form
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ResetPasswordFormData>({
    mode: "onBlur",
    defaultValues: {
      password: "",
      confirm_password: "",
    },
  });

  const password = watch("password");

  // reset password handler
  const onSubmit: SubmitHandler<ResetPasswordFormData> = async (data) => {
    if (!token || !email) {
      toast.error("يجب ادخال البريدالالكروني لاعادة تعيين كلمة المرور");
      return;
    }
    try {
      data.token = token;
      data.email = email;
      const result = await resetPassword(data);
      if (result.status === "success") {
        toast.success(result.message);
        reset();
        window.location.href = "/login";
      } else {
        toast.error(result.message);
      }
    } catch {
      toast.error("حدث خطأ اثناء إعادة التعيين");
    }
  };

  return {
    showPassword,
    showConfirmPassword,
    setShowPassword,
    setShowConfirmPassword,
    password,
    register,
    handleSubmit,
    errors,
    isSubmitting,
    onSubmit,
  };
}
