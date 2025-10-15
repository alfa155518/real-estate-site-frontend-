import { userSupport } from "@/action/userSupport";
import { SupportFormData } from "@/types/support";
import { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";
export default function useUsersSupport() {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const validFiles: File[] = [];
  const validPreviews: string[] = [];
  const MAX_IMAGES = 5;
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<SupportFormData>({
    defaultValues: {
      priority: "medium",
    },
  });

  // Handle submit
  const onSubmit: SubmitHandler<SupportFormData> = async (data) => {
    try {
      const result = await userSupport(data, selectedFiles);
      if (result.status == "error") {
        toast.error(result.message);
        return;
      }
      toast.success(result.message);
      reset();
      setSelectedFiles([]);
      setPreviewUrls([]);
    } catch {
      toast.error("حدث خطا ما");
    }
  };

  // Handle file change
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFiles = Array.from(e.target.files || []);
    if (newFiles.length === 0) return;

    if (selectedFiles.length + newFiles.length > MAX_IMAGES) {
      toast.error(
        `لا يمكن تحميل أكثر من ${MAX_IMAGES} صور. لديك ${selectedFiles.length} صورة بالفعل.`
      );
      return;
    }

    // File Validation
    newFiles.forEach((file) => {
      if (file.size > 2 * 1024 * 1024) {
        // 2MB limit
        toast.error(`حجم الملف ${file.name} يجب أن لا يتجاوز 2 ميجابايت`);
        return;
      }

      if (!file.type.match("image.*")) {
        alert(`الملف ${file.name} يجب أن يكون صورة صالحة`);
        return;
      }

      validFiles.push(file);
      const fileUrl = URL.createObjectURL(file);
      validPreviews.push(fileUrl);
    });

    if (validFiles.length > 0) {
      setSelectedFiles((prev) => [...prev, ...validFiles]);
      setPreviewUrls((prev) => [...prev, ...validPreviews]);
    }

    // Reset input
    e.target.value = "";
  };

  // Handle remove image
  const removeImage = (index: number, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const urlToRemove = previewUrls[index];
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
    setPreviewUrls((prev) => prev.filter((_, i) => i !== index));
    URL.revokeObjectURL(urlToRemove);
  };

  useEffect(() => {
    return () => {
      previewUrls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [previewUrls]);

  return {
    MAX_IMAGES,
    register,
    handleSubmit,
    control,
    errors,
    isSubmitting,
    onSubmit,
    selectedFiles,
    previewUrls,
    handleFileChange,
    removeImage,
  };
}
