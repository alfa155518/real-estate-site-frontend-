import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import useSettingsStore from "@/store/admin/AdminSettingsStore";
import { ContactInfoFormData } from "@/types/admin/adminSettingsStore";

export default function useAdminSettings() {
  const [logoPreview, setLogoPreview] = useState<string | null>(null);

  const { settings, handleGetSettings, handleUpdateSettings, isLoading } =
    useSettingsStore();

  useEffect(() => {
    handleGetSettings();
  }, [handleGetSettings]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isDirty },
    setValue,
    reset,
  } = useForm<ContactInfoFormData>();

  // Set Data that come from store
  useEffect(() => {
    if (settings) reset(settings);
  }, [settings, reset]);

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setLogoPreview(reader.result as string);
      reader.readAsDataURL(file);
      setValue("logo", e.target.files, { shouldDirty: true });
    }
  };

  const onSubmit = async (data: ContactInfoFormData) => {
    await handleUpdateSettings(data);
  };

  return {
    logoPreview,
    handleLogoChange,
    onSubmit,
    register,
    handleSubmit,
    errors,
    isSubmitting,
    isDirty,
    settings,
    isLoading,
  };
}
