import {
    getAgencies,
    updateAgency,
    createAgency,
    deleteAgency,
} from "@/action/admin/AdminManageAgencies";
import { AdminManageAgenciesStore, AgencyData } from "@/types/admin/adminAgenciesStore";
import toast from "react-hot-toast";
import { create } from "zustand";

const useAdminManageAgenciesStore = create<AdminManageAgenciesStore>(
    (set, get) => ({
        agencies: [],
        meta: {
            current_page: 1,
            last_page: 1,
            per_page: 10,
            total: 0,
            from: 0,
            to: 0,
        },
        isLoading: false,

        // Load initial agencies
        handleInitAgencies: async () => {
            try {
                set({ isLoading: true });
                const response = await getAgencies(1);
                set({
                    agencies: response.data.agencies,
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

        // Handle page changes
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

                const response = await getAgencies(page);

                set({
                    agencies: response.data.agencies,
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

        // Update Agency
        handleUpdateAgency: async (
            page: number,
            agencyId: number,
            agencyData: AgencyData
        ) => {
            try {
                const state = get();

                set({ isLoading: true });
                const response = await updateAgency(page, agencyId, agencyData);
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

        // Create Agency
        handleCreateAgency: async (
            page: number,
            agencyData: AgencyData
        ) => {
            try {
                const state = get();

                set({ isLoading: true });
                const response = await createAgency(page, agencyData);
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

        // Delete Agency
        handleDeleteAgency: async (
            agencyId: number,
            page: number
        ) => {
            try {
                const state = get();
                set({ isLoading: true });
                const response = await deleteAgency(agencyId, page);
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

export default useAdminManageAgenciesStore;
