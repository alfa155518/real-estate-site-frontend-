import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import useProfileStore from "@/store/ProfileStore";
import {
  getUserProfile,
  updatePassword,
  updateUserProfile,
} from "@/action/userProfile";
import {
  PasswordProfileFormData,
  PersonalInfoFormData,
  ProfileTabType,
} from "@/types/user-profile";

export default function useUserProfile() {
  const [activeTab, setActiveTab] = useState<ProfileTabType>("personal");
  const [isEditing, setIsEditing] = useState(false);

  // user profile store
  const { user, setUser } = useProfileStore();

  // Personal Info Form
  const {
    register: registerPersonal,
    handleSubmit: handlePersonalSubmit,
    formState: { errors: personalErrors, isSubmitting: isSubmittingPersonal },
    reset: resetPersonal,
    setValue,
  } = useForm<PersonalInfoFormData>();

  // Update form values when user data is loaded or changes
  useEffect(() => {
    if (user) {
      setValue("name", user.name || "");
      setValue("email", user.email || "");
      setValue("phone", user.phone || "");
      setValue("address", user.address || "");
    }
  }, [user, setValue]);

  // Get user profile
  useEffect(() => {
    async function handleGetUserProfile() {
      try {
        const response = await getUserProfile();
        if (response.status === "success") {
          await setUser(response.data);
        }
      } catch {
        toast.error("حدث خطا في السيرفر");
      }
    }
    handleGetUserProfile();
  }, [isSubmittingPersonal, setUser]);

  // Password Form
  const {
    register: registerPassword,
    handleSubmit: handlePasswordSubmit,
    formState: { errors: passwordErrors, isSubmitting: isSubmittingPassword },
    reset: resetPassword,
  } = useForm<PasswordProfileFormData>();

  // Update user profile info
  const onPersonalSubmit: SubmitHandler<PersonalInfoFormData> = async (
    data
  ) => {
    try {
      const response = await updateUserProfile(data);
      if (response.status === "success") {
        toast.success(response.message);
      } else {
        toast.error(response.message);
        resetPersonal();
      }
    } catch {
      toast.error("حدث خطا في السيرفر");
      resetPersonal();
    } finally {
      setIsEditing(false);
    }
  };

  // Update user password
  const onPasswordSubmit: SubmitHandler<PasswordProfileFormData> = async (
    data
  ) => {
    try {
      const response = await updatePassword(data);
      if (response.status === "success") {
        toast.success(response.message);
        resetPassword();
      } else {
        toast.error(response.message);
        resetPassword();
      }
    } catch {
      toast.error("حدث خطا في السيرفر");
      resetPassword();
    } finally {
      setIsEditing(false);
    }
  };

  // Cancel edit
  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  return {
    activeTab,
    setActiveTab,
    isEditing,
    setIsEditing,
    user,
    registerPersonal,
    handlePersonalSubmit,
    personalErrors,
    isSubmittingPersonal,
    registerPassword,
    handlePasswordSubmit,
    passwordErrors,
    isSubmittingPassword,
    handleCancelEdit,
    onPersonalSubmit,
    onPasswordSubmit,
  };
}
