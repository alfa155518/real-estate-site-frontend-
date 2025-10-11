import toast from "react-hot-toast";
import { create } from "zustand";
import { PropertyStore } from "@/types/propertyStore";
import { getProperty } from "@/action/property";

const usePropertyStore = create<PropertyStore>((set) => ({
  property: null,
  isLoading: false,

  initProperty: async (slug: string) => {
    try {
      set({ isLoading: true });
      const response = await getProperty(slug);
      if (response.status === "error") {
        toast.error(response.message);
      }
      set({ property: response.data });
    } catch {
      toast.error("حدث خطأ ما");
    } finally {
      set({ isLoading: false });
    }
  },
}));

export default usePropertyStore;
