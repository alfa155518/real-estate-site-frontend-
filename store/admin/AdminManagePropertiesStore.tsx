import {
  getProperties,
  updateProperty,
  createProperty,
  deleteProperty,
} from "@/action/admin/AdminManageProperties";
import { AdminManagePropertiesStore, PropertyData } from "@/types/admin/adminPropertiesStore";
import toast from "react-hot-toast";
import { create } from "zustand";



const useAdminManagePropertiesStore = create<AdminManagePropertiesStore>(
  (set, get) => ({
    properties: [],
    meta: {
      current_page: 1,
      last_page: 1,
      per_page: 10,
      total: 0,
      from: 0,
      to: 0,
    },
    isLoading: false,

    // Load initial properties
    handleInitProperties: async () => {
      try {
        set({ isLoading: true });
        const response = await getProperties(1);
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

        const response = await getProperties(page);

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

    // Update Property
    handleUpdateProperty: async (
      page: number,
      propertyId: number,
      propertyData: PropertyData
    ) => {
      try {
        const state = get();

        set({ isLoading: true });
        const response = await updateProperty(page, propertyId, propertyData);
        if (response.status === "success") {
          await state.handlePageChange(page);
          toast.success(response.message);
        } else {
          toast.error(response.message);
        }
      } catch {
        toast.error("حدث خطأ ما");
      } finally {
        set({ isLoading: false });
      }
    },

    // Create Property
    handleCreateProperty: async (
      page: number,
      propertyData: PropertyData
    ) => {
      try {
        const state = get();

        set({ isLoading: true });
        const response = await createProperty(page, propertyData);
        if (response.status === "success") {
          await state.handlePageChange(page);
          toast.success(response.message);
        } else {
          toast.error(response.message);
        }
      } catch {
        toast.error("حدث خطأ ما");
      } finally {
        set({ isLoading: false });
      }
    },

    // Delete Property
    handleDeleteProperty: async (
      propertyId: number,
      page: number
    ) => {
      try {
        const state = get();
        set({ isLoading: true });
        const response = await deleteProperty(propertyId, page);
        if (response.status === "success") {
          await state.handlePageChange(page);
          toast.success(response.message);
        } else {
          toast.error(response.message);
        }
      } catch {
        toast.error("حدث خطأ ما");
      } finally {
        set({ isLoading: false });
      }
    },
  })
);

export default useAdminManagePropertiesStore;
