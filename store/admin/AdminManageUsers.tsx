import {
  getUsersData,
  deleteUser,
  updateUser,
} from "@/action/admin/AdminManageUsers";
import {
  UserFormData,
  AdminManageUsersStore,
} from "@/types/admin/adminManageUsers";
import toast from "react-hot-toast";
import { create } from "zustand";

const useAdminManageUsersStore = create<AdminManageUsersStore>((set, get) => ({
  users: [],
  meta: {
    current_page: 1,
    last_page: 1,
    per_page: 10,
    total: 0,
    from: 0,
    to: 0,
  },
  admins_total: 0,
  isLoading: false,
  loadingIds: [],

  // Get Users Data
  handleGetUsers: async (page = 1) => {
    try {
      set({ isLoading: true });
      const response = await getUsersData(page);
      if (response.status === "error") {
        toast.error(response.message);
      }
      set({
        users: response.data.users,
        meta: {
          current_page: response.data.pagination.current_page,
          last_page: response.data.pagination.last_page,
          per_page: response.data.pagination.per_page,
          total: response.data.pagination.total,
          from: response.data.pagination.from,
          to: response.data.pagination.to,
        },
        admins_total: response.data.admins_total,
      });
    } catch {
      toast.error("حدث خطأ ما");
    } finally {
      set({ isLoading: false });
    }
  },
  // Handle Page Change Pagination
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

      const response = await getUsersData(page);
      if (response.status === "error") {
        toast.error(response.message);
      }

      set({
        users: response.data.users,
        meta: {
          current_page: response.data.pagination.current_page,
          last_page: response.data.pagination.last_page,
          per_page: response.data.pagination.per_page,
          total: response.data.pagination.total,
          from: response.data.pagination.from,
          to: response.data.pagination.to,
        },
        admins_total: response.data.admins_total,
        isLoading: false,
      });
    } catch {
      toast.error("حدث خطأ ما");
    } finally {
      set({ isLoading: false });
    }
  },
  // Update User
  handleUpdateUser: async (
    userId: number,
    formData: UserFormData,
    page: number
  ) => {
    try {
      set({
        loadingIds: get().loadingIds.filter(
          (loadingId) => loadingId !== userId
        ),
      });
      const response = await updateUser(userId, formData, page);
      if (response.status === "success") {
        toast.success(response.message);
      } else {
        toast.error(response.message);
      }
      set({ loadingIds: get().loadingIds.filter((id) => id !== userId) });
    } catch {
      toast.error("حدث خطأ ما");
    } finally {
      set({
        loadingIds: get().loadingIds.filter((id) => id !== userId),
      });
    }
  },
  // Delete User
  handleDeleteUser: async (id: number, page: number) => {
    try {
      set({ loadingIds: [...get().loadingIds, id], isLoading: true });
      const response = await deleteUser(id, page);
      if (response.status === "success") {
        toast.success(response.message);
      } else {
        toast.error(response.message);
      }
      set({ loadingIds: get().loadingIds.filter((id) => id !== id) });
    } catch {
      toast.error("حدث خطأ ما");
    } finally {
      set({
        loadingIds: get().loadingIds.filter((id) => id !== id),
        isLoading: false,
      });
    }
  },
}));

export default useAdminManageUsersStore;
