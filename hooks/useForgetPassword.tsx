import { useForm, SubmitHandler } from "react-hook-form";
import { ForgetPasswordFormData } from "@/types/auth";
import { forgetPassword } from "@/action/auth";
import toast from "react-hot-toast";
export default function useForgetPassword() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ForgetPasswordFormData>({
    mode: "onBlur",
    defaultValues: {
      email: "",
    },
  });

  // forget password Handler
  const onSubmit: SubmitHandler<ForgetPasswordFormData> = async (
    data: ForgetPasswordFormData
  ) => {
    try {
      const result = await forgetPassword(data);
      if (result.status === "success") {
        toast.success(result.message);
        reset();
      } else {
        toast.error(result.message);
      }
    } catch {
      toast.error("حدث خطأ اثناء إعادة التعيين");
    }
  };

  // Get typed error for email field
  const emailError = errors.email;

  return {
    register,
    handleSubmit,
    isSubmitting,
    onSubmit,
    emailError,
  };
}
