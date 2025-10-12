import { getSliders } from "@/action/sliders";
import { create } from "zustand";
import toast from "react-hot-toast";
import { SlidersStore } from "@/types/slidrs";

const useSlidersStore = create<SlidersStore>((set) => ({
  sliders: { id: 0, images: [], name: "" },
  isLoading: false,
  defaultSlide: "/images/default-property.webp",

  handleGetSlider: async (sliderID: number) => {
    try {
      set({ isLoading: true });
      const response = await getSliders(sliderID);
      if (response.status === "success") {
        set({ sliders: response.data });
      }
    } catch {
      toast.error("حدث خطأ ما");
    } finally {
      set({ isLoading: false });
    }
  },
}));

export default useSlidersStore;
