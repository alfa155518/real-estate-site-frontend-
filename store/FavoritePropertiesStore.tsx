import {
  getUserFavoriteProperties,
  toggleFavorite,
} from "@/action/userFavoriteProperties";
import { FavoritePropertiesStore } from "@/types/favoritePropertiesStore";
import toast from "react-hot-toast";
import { create } from "zustand";

const useFavoritePropertiesStore = create<FavoritePropertiesStore>(
  (set, get) => ({
    favoriteProperties: [],
    loadingIds: [],
    isLoading: false,

    // Get User Favorite Properties
    handleGetFavoriteProperties: async () => {
      try {
        set({ loadingIds: [] });
        set({ isLoading: true });
        const response = await getUserFavoriteProperties();
        set({ favoriteProperties: response.data[0] });
        set({ isLoading: false });
      } catch {
        toast.error("حدث خطأ ما");
      }
    },

    // Toggle User Favorite Properties
    handleToggleFavorite: async (propertyId: number) => {
      const { handleGetFavoriteProperties, loadingIds } = get();

      set({ loadingIds: [...loadingIds, propertyId] });
      set({ isLoading: true });

      try {
        const result = await toggleFavorite(propertyId);

        if (result.status === "success") {
          toast.success(result.message);
          await handleGetFavoriteProperties();
        } else {
          toast.error(result.message);
        }
      } catch {
        toast.error("حدث خطأ ما");
      } finally {
        set({ loadingIds: get().loadingIds.filter((id) => id !== propertyId) });
        set({ isLoading: false });
      }
    },
  })
);

export default useFavoritePropertiesStore;
