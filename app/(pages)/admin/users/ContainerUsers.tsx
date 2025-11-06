"use client";

import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { UserData, UserFormData } from "@/types/admin/adminManageUsers";
import PresentationalUsers from "./PresentationalUsers";
import useAdminManageUsersStore from "@/store/admin/AdminManageUsers";
import styles from "@/sass/pages/admin/users.module.scss";

export default function ContainerUsers() {
  const {
    users,
    handleGetUsers,
    meta,
    admins_total,
    handlePageChange,
    handleDeleteUser,
    handleUpdateUser,
    loadingIds,
    isLoading,
  } = useAdminManageUsersStore();
  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState<UserData>();
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  // Load users Data
  useEffect(() => {
    async function fetchData() {
      await handleGetUsers();
    }
    fetchData();
  }, [handleGetUsers]);

  // Handle Edit User
  const handleEditUser = (user: UserData) => {
    setEditingUser(user);
    setShowModal(true);
  };

  // submit confirm Delete User
  const submitDeleteUser = async (id: number) => {
    toast(
      (t) => (
        <div className="flex flex-col gap-2">
          <p className="text-right">هل أنت متأكد من حذف هذا المستخدم؟</p>
          <div className="flex gap-2 justify-end">
            <button
              onClick={async () => {
                toast.dismiss(t.id);
              }}
              className="px-4 py-1 text-2xl bg-gray-200 rounded hover:bg-gray-300 cursor-pointer"
            >
              إلغاء
            </button>
            <button
              onClick={async () => {
                toast.dismiss(t.id);
                await handleDeleteUser(id, meta.current_page);
                await handleGetUsers(meta.current_page);
                router.refresh();
              }}
              className="px-4 py-1 text-2xl text-white bg-red-500 rounded hover:bg-red-600 cursor-pointer"
            >
              حذف
            </button>
          </div>
        </div>
      ),
      {
        duration: 10000, // 10 seconds
        style: {
          minWidth: "300px",
        },
      }
    );
  };

  // Handle Update User
  const handleSubmit = async (data: UserFormData) => {
    if (!editingUser?.id) return;
    await handleUpdateUser(editingUser.id, data, meta.current_page);
    await handleGetUsers(meta.current_page);
    setShowModal(false);
    setEditingUser(undefined);
  };

  // Get Role Label
  const getRoleLabel = (role: string) => {
    switch (role) {
      case "admin":
        return "مدير";
      case "user":
        return "مستخدم";
      default:
        return role;
    }
  };

  // Handle Filter Change
  const [filters, setFilters] = useState({
    sortBy: "newest",
    role: "all",
  });

  // Update the filteredUsers calculation
  const filteredUsers = users
    .filter((user) => {
      const matchesSearch =
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesRole = filters.role === "all" || user.role === filters.role;

      return matchesSearch && matchesRole;
    })
    .sort((a, b) => {
      if (filters.sortBy === "newest") {
        return (
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
      } else {
        return (
          new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
        );
      }
    });

  // Add this function to handle filter changes
  const handleFilterChange = (filterName: string, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [filterName]: value,
    }));
  };

  // Add this useEffect to your component
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const filterContainer = document.querySelector(
        `.${styles.filterContainer}`
      );
      if (filterContainer && !filterContainer.contains(event.target as Node)) {
        const dropdown = document.getElementById("filterDropdown");
        if (dropdown) {
          dropdown.classList.remove(styles.show);
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <PresentationalUsers
      isLoading={isLoading}
      totalUsers={meta.total}
      adminUsers={admins_total}
      meta={meta}
      handlePageChange={handlePageChange}
      loadingIds={loadingIds}
      handleEditUser={handleEditUser}
      submitDeleteUser={submitDeleteUser}
      searchQuery={searchQuery}
      setSearchQuery={setSearchQuery}
      filters={filters}
      handleFilterChange={handleFilterChange}
      showModal={showModal}
      setShowModal={setShowModal}
      editingUser={editingUser}
      handleSubmit={handleSubmit}
      getRoleLabel={getRoleLabel}
      filteredUsers={filteredUsers}
    />
  );
}
