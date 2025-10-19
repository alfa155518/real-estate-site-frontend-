"use client";

import { filtersProperties, getProperties } from "@/action/realestate";
import toast from "react-hot-toast";
import { create } from "zustand";
import { RealEstateFilterParams } from "@/types/real-estate";
import { RealEstateStore } from "@/types/realestateStore";

const useRealEstateStore = create<RealEstateStore>((set, get) => ({
  properties: [],
  featuredProperties: [],
  meta: {
    current_page: 1,
    last_page: 1,
    per_page: 10,
    total: 0,
    from: 0,
    to: 0,
  },
  filters: {},
  isLoading: false,

  // Load initial properties
  handleInitProperties: async () => {
    try {
      set({ isLoading: true });
      const response = await getProperties();
      set({
        properties: response.data.properties,
        meta: {
          current_page: response.data.pagination.current_page,
          last_page: response.data.pagination.last_page,
          per_page: response.data.pagination.per_page,
          total: response.data.pagination.total,
          from: response.data.pagination.from,
          to: response.data.pagination.to,
        },
        isLoading: false,
      });
    } catch {
      toast.error("حدث خطأ ما");
      set({ isLoading: false });
    }
  },

  // Handle page properties changes
  handlePageChange: async (page: number) => {
    const state = get();
    try {
      set({
        isLoading: true,
        meta: {
          ...state.meta,
          current_page: page,
        },
      });

      const response =
        Object.keys(state.filters || {}).length > 0
          ? await filtersProperties(state.filters, page)
          : await getProperties(page);

      set({
        properties: response.data.properties,
        meta: {
          current_page: response.data.pagination.current_page,
          last_page: response.data.pagination.last_page,
          per_page: response.data.pagination.per_page,
          total: response.data.pagination.total,
          from: response.data.pagination.from,
          to: response.data.pagination.to,
        },
        isLoading: false,
      });
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      toast.error("حدث خطأ ما");
      set({ isLoading: false });
    }
  },

  // Handle filters properties changes
  handleFilters: async (filters: Partial<RealEstateFilterParams>) => {
    try {
      set({
        isLoading: true,
        filters,
        meta: {
          ...get().meta,
          current_page: 1,
        },
      });

      const response = await filtersProperties(filters, 1);

      if (response.status === "error") {
        toast.error(response.message);
        return;
      }

      set({
        properties: response.data.properties,
        meta: {
          current_page: response.data.pagination.current_page,
          last_page: response.data.pagination.last_page,
          per_page: response.data.pagination.per_page,
          total: response.data.pagination.total,
          from: response.data.pagination.from,
          to: response.data.pagination.to,
        },
        isLoading: false,
      });
      return response;
    } catch {
      toast.error("حدث خطأ ما");
    } finally {
      set({ isLoading: false });
    }
  },
  handleFeaturedProperties: async () => {
    try {
      const response = await filtersProperties(
        { is_featured: true, status: "available" },
        1
      );
      set({ featuredProperties: response.data.properties });
    } catch {
      toast.error("حدث خطأ ما");
    }
  },

  //   Handle reset filters
  handleResetFilters: async () => {
    const state = get();
    set({
      filters: {},
    });
    await state.handleInitProperties();
  },
}));

export default useRealEstateStore;
