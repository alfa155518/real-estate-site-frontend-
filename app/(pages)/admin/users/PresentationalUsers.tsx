import { format, parseISO } from "date-fns";
import { ar } from "date-fns/locale";
import { motion } from "framer-motion";
import {
  Search,
  Filter,
  Download,
  Edit,
  Trash2,
  Users as UsersIcon,
  Shield,
  Loader2,
} from "lucide-react";
import Pagination from "@/components/common/Pagination";
import UserModal from "./UserModal";
import { PresentationalUsersProps } from "@/types/admin/adminManageUsers";
import SkeletonUserRow from "@/components/common/SkeletonUserRow";
import styles from "@/sass/pages/admin/users.module.scss";

export default function PresentationalUsers({
  isLoading,
  totalUsers,
  adminUsers,
  meta,
  handlePageChange,
  loadingIds,
  handleEditUser,
  submitDeleteUser,
  searchQuery,
  setSearchQuery,
  filters,
  handleFilterChange,
  showModal,
  setShowModal,
  editingUser,
  handleSubmit,
  getRoleLabel,
  filteredUsers,
}: PresentationalUsersProps) {
  return (
    <div className={styles.usersPage}>
      {/* Page Header */}
      <div className={styles.pageHeader}>
        <div className={styles.headerLeft}>
          <h1>إدارة المستخدمين</h1>
          <p>عرض وإدارة جميع المستخدمين في النظام</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className={styles.statsCards}>
        <div className={styles.statCard}>
          <div className={`${styles.statIcon} ${styles.total}`}>
            <UsersIcon size={24} />
          </div>
          <div className={styles.statInfo}>
            <p className={styles.statValue}>{totalUsers}</p>
            <p className={styles.statLabel}>إجمالي المستخدمين</p>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={`${styles.statIcon} ${styles.admins}`}>
            <Shield size={24} />
          </div>
          <div className={styles.statInfo}>
            <p className={styles.statValue}>{adminUsers}</p>
            <p className={styles.statLabel}>المديرين</p>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className={styles.usersTable}>
        <div className={styles.tableHeader}>
          <div className={styles.searchBar}>
            <label htmlFor="search"></label>
            <input
              type="text"
              id="search"
              placeholder="ابحث عن مستخدم..."
              name="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className={styles.searchIcon} size={20} />
          </div>
          <div className={styles.tableActions}>
            <div className={styles.filterContainer}>
              <button
                onClick={() =>
                  document
                    .getElementById("filterDropdown")
                    ?.classList.toggle(styles.show)
                }
              >
                <Filter size={18} />
                تصفية
              </button>

              <div id="filterDropdown" className={styles.filterDropdown}>
                <div className={styles.filterGroup}>
                  <label htmlFor="sortBy">ترتيب حسب:</label>
                  <select
                    name="sortBy"
                    id="sortBy"
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
                  <label htmlFor="role">الدور:</label>
                  <select
                    name="role"
                    id="role"
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
            <button>
              <Download size={18} />
              تصدير
            </button>
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
                <th>تاريخ التسجيل</th>
                <th>الإجراءات</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <SkeletonUserRow count={8} />
              ) : filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-gray-500">
                    لا يوجد مستخدمين
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user, index) => (
                  <motion.tr
                    key={user.id}
                    initial={{ x: -20 }}
                    animate={{ x: 0 }}
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
                    <td data-label="تاريخ التسجيل">
                      {format(parseISO(user.created_at), "dd MMMM yyyy", {
                        locale: ar,
                      })}
                    </td>
                    <td data-label="الإجراءات">
                      <div className={styles.actions}>
                        <button
                          className={styles.editBtn}
                          onClick={() => handleEditUser(user)}
                          title="تعديل"
                        >
                          <Edit size={20} />
                        </button>
                        <button
                          className={styles.deleteBtn}
                          onClick={() => submitDeleteUser(user.id)}
                          disabled={loadingIds.includes(user.id)}
                          title="حذف"
                        >
                          {loadingIds.includes(user.id) ? (
                            <Loader2
                              size={18}
                              className={styles.smallSpinner}
                            />
                          ) : (
                            <Trash2 size={20} />
                          )}
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Add Pagination */}
        <Pagination meta={meta} onPageChange={handlePageChange} />
      </div>

      {/* User Form Modal */}
      <UserModal
        showModal={showModal}
        setShowModal={setShowModal}
        editingUser={editingUser}
        handleSubmit={handleSubmit}
      />
    </div>
  );
}
