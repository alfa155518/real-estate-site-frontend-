"use client"




import { userLogout } from "@/action/userProfile";
import { deleteCookie, getCookie } from "cookies-next";
import toast from "react-hot-toast";
import { create } from "zustand";



const useProfileStore = create((set) => ({
  user: {},
  token: null,
  isLoading: false,

  initialize: () => {
    if (typeof window !== 'undefined') {
      const token = getCookie("userToken");
      set({ token });
      return token;
    }
    return null;
  },

  setUser: (user) => set({ user }),

  handleLogout: async () => {
    try {
      set({ isLoading: true });
      const response = await userLogout();
      if (response.status === "success") {
        toast.success(response.message);
        set({ user: null, token: null });
        deleteCookie("userToken");
        window.location.href = "/signup";
      } else {
        toast.error(response.message);
      }
    } catch {
      toast.error("حدث خطأ اثناء تسجيل الخروج");
    } finally {
      set({ isLoading: false });
    }
  },
}));

export default useProfileStore;
