import { create } from "zustand";
import toast from "react-hot-toast";
import getSettingsData, { updateSettingsData } from "@/action/admin/settings";
import { SettingsData, SettingStore } from "@/types/admin/settingsStore";

const useSettingsStore = create<SettingStore>((set, get) => ({
  settings: {
    logo: null,
    location: "",
    phone: "",
    email: "",
    opening_hours: "",
    facebook: "",
    twitter: "",
    instagram: "",
    linkedin: "",
  },
  isLoading: false,

  // Get Settings
  handleGetSettings: async () => {
    try {
      set({ isLoading: true });
      const response = await getSettingsData();
      set({ settings: response.data });
    } catch {
      toast.error("حدث خطأ ما");
    } finally {
      set({ isLoading: false });
    }
  },

  // Update Settings
  handleUpdateSettings: async (data: SettingsData) => {
    try {
      const response = await updateSettingsData(data);
      if (response.status == "success") {
        toast.success(response.message);
      } else {
        toast.error(response.message);
      }
    } catch {
      toast.error("حدث خطأ ما");
    }
  },
}));

export default useSettingsStore;
