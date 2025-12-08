import {
    getOwners,
    updateOwner,
    createOwner,
    deleteOwner,
} from "@/action/admin/AdminManageOwners";
import { AdminManageOwnersStore, OwnerData } from "@/types/admin/adminOwnersStore";
import toast from "react-hot-toast";
import { create } from "zustand";

const useAdminManageOwnersStore = create<AdminManageOwnersStore>(
    (set, get) => ({
        owners: [],
        meta: {
            current_page: 1,
            last_page: 1,
            per_page: 10,
            total: 0,
            from: 0,
            to: 0,
        },
        isLoading: false,

        // Load initial owners
        handleInitOwners: async () => {
            try {
                set({ isLoading: true });
                const response = await getOwners(1);
                set({
                    owners: response.data.owners,
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

                const response = await getOwners(page);

                set({
                    owners: response.data.owners,
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

        // Update Owner
        handleUpdateOwner: async (
            page: number,
            ownerId: number,
            ownerData: OwnerData
        ) => {
            try {
                const state = get();

                set({ isLoading: true });
                const response = await updateOwner(page, ownerId, ownerData);
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

        // Create Owner
        handleCreateOwner: async (
            page: number,
            ownerData: OwnerData
        ) => {
            try {
                const state = get();

                set({ isLoading: true });
                const response = await createOwner(page, ownerData);
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

        // Delete Owner
        handleDeleteOwner: async (
            ownerId: number,
            page: number
        ) => {
            try {
                const state = get();
                set({ isLoading: true });
                const response = await deleteOwner(ownerId, page);
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

export default useAdminManageOwnersStore;
