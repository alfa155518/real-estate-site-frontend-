"use client";

import { useState } from "react";
import { format, parseISO } from "date-fns";
import { ar } from "date-fns/locale";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Search,
  Filter,
  Download,
  Eye,
  Edit,
  Trash2,
  Users as UsersIcon,
  UserCheck,
  Shield,
  X,
} from "lucide-react";
import styles from "@/sass/pages/adminUsers.module.scss";
import modalStyles from "@/sass/pages/adminProperties.module.scss";
import UserForm from "@/components/admin/UserForm";
import { AdminUser, UserFormData } from "@/types/admin";

// Mock data
const mockUsers: AdminUser[] = [
  {
    id: 1,
    name: "أحمد محمد",
    email: "ahmed@example.com",
    role: "admin",
    phone: "+966501234567",
    created_at: "2024-01-15",
    updated_at: "2024-01-15",
    is_active: true,
  },
  {
    id: 2,
    name: "سارة أحمد",
    email: "sara@example.com",
    role: "moderator",
    phone: "+966507654321",
    created_at: "2024-01-14",
    updated_at: "2024-01-14",
    is_active: true,
  },
  {
    id: 3,
    name: "محمد علي",
    email: "mohammed@example.com",
    role: "user",
    phone: "+966509876543",
    created_at: "2024-01-13",
    updated_at: "2024-01-13",
    is_active: true,
  },
  {
    id: 4,
    name: "فاطمة خالد",
    email: "fatima@example.com",
    role: "user",
    phone: "+966502345678",
    created_at: "2024-01-12",
    updated_at: "2024-01-12",
    is_active: false,
  },
  {
    id: 5,
    name: "عبدالله حسن",
    email: "abdullah@example.com",
    role: "user",
    phone: "+966508765432",
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

  const handleAddUser = () => {
    setEditingUser(null);
    setShowModal(true);
  };

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

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring" as const,
        stiffness: 300,
        damping: 24,
      },
    },
  };

  return (
    <div className={styles.usersPage}>
      {/* Page Header */}
      <motion.div
        className={styles.pageHeader}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className={styles.headerLeft}>
          <h1>إدارة المستخدمين</h1>
          <p>عرض وإدارة جميع المستخدمين في النظام</p>
        </div>
        <div className={styles.headerRight}>
          <motion.button
            className={styles.addBtn}
            onClick={handleAddUser}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Plus size={18} />
            إضافة مستخدم جديد
          </motion.button>
        </div>
      </motion.div>

      {/* Stats Cards */}
      <motion.div
        className={styles.statsCards}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div className={styles.statCard} variants={itemVariants}>
          <div className={`${styles.statIcon} ${styles.total}`}>
            <UsersIcon size={24} />
          </div>
          <div className={styles.statInfo}>
            <p className={styles.statValue}>{totalUsers}</p>
            <p className={styles.statLabel}>إجمالي المستخدمين</p>
          </div>
        </motion.div>

        <motion.div className={styles.statCard} variants={itemVariants}>
          <div className={`${styles.statIcon} ${styles.active}`}>
            <UserCheck size={24} />
          </div>
          <div className={styles.statInfo}>
            <p className={styles.statValue}>{activeUsers}</p>
            <p className={styles.statLabel}>المستخدمين النشطين</p>
          </div>
        </motion.div>

        <motion.div className={styles.statCard} variants={itemVariants}>
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
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Filter size={18} />
              تصفية
            </motion.button>
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
                        className={styles.viewBtn}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        title="عرض"
                      >
                        <Eye size={18} />
                      </motion.button>
                      <motion.button
                        className={styles.editBtn}
                        onClick={() => handleEditUser(user)}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        title="تعديل"
                      >
                        <Edit size={18} />
                      </motion.button>
                      <motion.button
                        className={styles.deleteBtn}
                        onClick={() => handleDeleteUser(user)}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        title="حذف"
                      >
                        <Trash2 size={18} />
                      </motion.button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className={styles.tablePagination}>
          <div className={styles.paginationInfo}>
            عرض 1-{filteredUsers.length} من {totalUsers} مستخدم
          </div>
          <div className={styles.paginationButtons}>
            <button disabled>السابق</button>
            <button className={styles.active}>1</button>
            <button>2</button>
            <button>3</button>
            <button>التالي</button>
          </div>
        </div>
      </motion.div>

      {/* User Form Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            className={modalStyles.modal}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowModal(false)}
          >
            <motion.div
              className={modalStyles.modalContent}
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className={modalStyles.modalHeader}>
                <h2>{editingUser ? "تعديل المستخدم" : "إضافة مستخدم جديد"}</h2>
                <motion.button
                  className={modalStyles.closeBtn}
                  onClick={() => setShowModal(false)}
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X size={20} />
                </motion.button>
              </div>
              <div className={modalStyles.modalBody}>
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
