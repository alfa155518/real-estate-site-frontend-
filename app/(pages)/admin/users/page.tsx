"use client";

import { useEffect, useState } from "react";
import { format, parseISO } from "date-fns";
import { ar } from "date-fns/locale";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Filter,
  Download,
  Edit,
  Trash2,
  Users as UsersIcon,
  UserCheck,
  Shield,
  X,
} from "lucide-react";
import styles from "@/sass/pages/adminUsers.module.scss";
import UserForm from "./UserForm";
import { AdminUser, UserFormData } from "@/types/admin";

// Mock data
const mockUsers: AdminUser[] = [
  {
    id: 1,
    name: "أحمد محمد",
    email: "ahmed@example.com",
    role: "admin",
    phone: "01012345678",
    address: "٢٢ شارع الإسكندرية، طنطا",
    created_at: "2024-01-15",
    updated_at: "2024-01-15",
    is_active: true,
  },
  {
    id: 2,
    name: "سارة أحمد",
    email: "sara@example.com",
    role: "moderator",
    created_at: "2024-01-14",
    updated_at: "2024-01-14",
    is_active: true,
  },
  {
    id: 3,
    name: "محمد علي",
    email: "mohammed@example.com",
    role: "user",
    phone: "01512345678",
    created_at: "2024-01-13",
    updated_at: "2024-01-13",
    is_active: true,
  },
  {
    id: 4,
    name: "فاطمة خالد",
    email: "fatima@example.com",
    role: "user",
    phone: "01112345678",
    created_at: "2024-01-12",
    updated_at: "2024-01-12",
    is_active: false,
  },
  {
    id: 5,
    name: "عبدالله حسن",
    email: "abdullah@example.com",
    role: "user",
    phone: "01212345678",
    created_at: "2024-01-11",
    updated_at: "2024-01-11",
    is_active: true,
  },
];

export default function UsersPage() {
  const [users, setUsers] = useState<AdminUser[]>(mockUsers);
  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState<AdminUser | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const totalUsers = users.length;
  const activeUsers = users.filter((u) => u.is_active).length;
  const adminUsers = users.filter((u) => u.role === "admin").length;

  const handleEditUser = (user: AdminUser) => {
    setEditingUser(user);
    setShowModal(true);
  };

  const handleDeleteUser = (user: AdminUser) => {
    if (confirm(`هل أنت متأكد من حذف المستخدم "${user.name}"؟`)) {
      setUsers(users.filter((u) => u.id !== user.id));
    }
  };

  const handleSubmit = (data: UserFormData) => {
    console.log("Form data:", data);
    // Here you would typically send the data to your API
    setShowModal(false);
    setEditingUser(null);
  };

  // const filteredUsers = users.filter(
  //   (user) =>
  //     user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
  //     user.email.toLowerCase().includes(searchQuery.toLowerCase())
  // );

  const getRoleLabel = (role: string) => {
    switch (role) {
      case "admin":
        return "مدير";
      case "moderator":
        return "مشرف";
      case "user":
        return "مستخدم";
      default:
        return role;
    }
  };

  const [filters, setFilters] = useState({
    sortBy: "newest", // 'newest' or 'oldest'
    status: "all", // 'all', 'active', or 'inactive'
    role: "all", // 'all', 'admin', 'moderator', 'user'
  });

  // Update the filteredUsers calculation
  const filteredUsers = users
    .filter((user) => {
      const matchesSearch =
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus =
        filters.status === "all" ||
        (filters.status === "active" && user.is_active) ||
        (filters.status === "inactive" && !user.is_active);

      const matchesRole = filters.role === "all" || user.role === filters.role;

      return matchesSearch && matchesStatus && matchesRole;
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
    <div className={styles.usersPage}>
      {/* Page Header */}
      <motion.div
        className={styles.pageHeader}
        initial={{ y: -20 }}
        animate={{ y: 0 }}
      >
        <div className={styles.headerLeft}>
          <h1>إدارة المستخدمين</h1>
          <p>عرض وإدارة جميع المستخدمين في النظام</p>
        </div>
      </motion.div>

      {/* Stats Cards */}
      <motion.div className={styles.statsCards}>
        <motion.div className={styles.statCard}>
          <div className={`${styles.statIcon} ${styles.total}`}>
            <UsersIcon size={24} />
          </div>
          <div className={styles.statInfo}>
            <p className={styles.statValue}>{totalUsers}</p>
            <p className={styles.statLabel}>إجمالي المستخدمين</p>
          </div>
        </motion.div>

        <motion.div className={styles.statCard}>
          <div className={`${styles.statIcon} ${styles.active}`}>
            <UserCheck size={24} />
          </div>
          <div className={styles.statInfo}>
            <p className={styles.statValue}>{activeUsers}</p>
            <p className={styles.statLabel}>المستخدمين النشطين</p>
          </div>
        </motion.div>

        <motion.div className={styles.statCard}>
          <div className={`${styles.statIcon} ${styles.admins}`}>
            <Shield size={24} />
          </div>
          <div className={styles.statInfo}>
            <p className={styles.statValue}>{adminUsers}</p>
            <p className={styles.statLabel}>المديرين</p>
          </div>
        </motion.div>
      </motion.div>

      {/* Users Table */}
      <motion.div
        className={styles.usersTable}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <div className={styles.tableHeader}>
          <div className={styles.searchBar}>
            <input
              type="text"
              placeholder="ابحث عن مستخدم..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className={styles.searchIcon} size={20} />
          </div>
          <div className={styles.tableActions}>
            <div className={styles.filterContainer}>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() =>
                  document
                    .getElementById("filterDropdown")
                    ?.classList.toggle(styles.show)
                }
              >
                <Filter size={18} />
                تصفية
              </motion.button>

              <div id="filterDropdown" className={styles.filterDropdown}>
                <div className={styles.filterGroup}>
                  <label>ترتيب حسب:</label>
                  <select
                    value={filters.sortBy}
                    onChange={(e) =>
                      handleFilterChange("sortBy", e.target.value)
                    }
                  >
                    <option value="newest">الأحدث</option>
                    <option value="oldest">الأقدم</option>
                  </select>
                </div>

                <div className={styles.filterGroup}>
                  <label>حالة الحساب:</label>
                  <select
                    value={filters.status}
                    onChange={(e) =>
                      handleFilterChange("status", e.target.value)
                    }
                  >
                    <option value="all">الكل</option>
                    <option value="active">نشط</option>
                    <option value="inactive">غير نشط</option>
                  </select>
                </div>

                <div className={styles.filterGroup}>
                  <label>الدور:</label>
                  <select
                    value={filters.role}
                    onChange={(e) => handleFilterChange("role", e.target.value)}
                  >
                    <option value="all">الكل</option>
                    <option value="admin">مدير</option>
                    <option value="moderator">مشرف</option>
                    <option value="user">مستخدم</option>
                  </select>
                </div>
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Download size={18} />
              تصدير
            </motion.button>
          </div>
        </div>

        <div className={styles.tableContent}>
          <table>
            <thead>
              <tr>
                <th>المستخدم</th>
                <th>رقم الهاتف</th>
                <th>العنوان</th>
                <th>الدور</th>
                <th>الحالة</th>
                <th>تاريخ التسجيل</th>
                <th>الإجراءات</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user, index) => (
                <motion.tr
                  key={user.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <td data-label="المستخدم">
                    <div className={styles.userInfo}>
                      <motion.div
                        className={styles.userAvatar}
                        whileHover={{ scale: 1.1, rotate: 5 }}
                      >
                        {user.name.charAt(0)}
                      </motion.div>
                      <div className={styles.userDetails}>
                        <p className={styles.userName}>{user.name}</p>
                        <p className={styles.userEmail}>{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td data-label="رقم الهاتف">{user.phone || "-"}</td>
                  <td data-label="العنوان">
                    {user.address ? <span>{user.address}</span> : "-"}
                  </td>
                  <td data-label="الدور">
                    <span
                      className={`${styles.roleBadge} ${styles[user.role]}`}
                    >
                      {getRoleLabel(user.role)}
                    </span>
                  </td>
                  <td data-label="الحالة">
                    <span
                      className={`${styles.statusBadge} ${
                        user.is_active ? styles.active : styles.inactive
                      }`}
                    >
                      <span className={styles.statusDot}></span>
                      {user.is_active ? "نشط" : "غير نشط"}
                    </span>
                  </td>
                  <td data-label="تاريخ التسجيل">
                    {format(parseISO(user.created_at), "dd MMMM yyyy", {
                      locale: ar,
                    })}
                  </td>
                  <td data-label="الإجراءات">
                    <div className={styles.actions}>
                      <motion.button
                        className={styles.editBtn}
                        onClick={() => handleEditUser(user)}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        title="تعديل"
                      >
                        <Edit size={20} />
                      </motion.button>
                      <motion.button
                        className={styles.deleteBtn}
                        onClick={() => handleDeleteUser(user)}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        title="حذف"
                      >
                        <Trash2 size={20} />
                      </motion.button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Add Pagination */}
      </motion.div>

      {/* User Form Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            className={styles.modal}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowModal(false)}
          >
            <motion.div
              className={styles.modalContent}
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className={styles.modalHeader}>
                <h2>تعديل المستخدم</h2>
                <motion.button
                  className={styles.closeBtn}
                  onClick={() => setShowModal(false)}
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X size={20} />
                </motion.button>
              </div>
              <div className={styles.modalBody}>
                <UserForm
                  initialData={editingUser || undefined}
                  onSubmit={handleSubmit}
                  onCancel={() => setShowModal(false)}
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
