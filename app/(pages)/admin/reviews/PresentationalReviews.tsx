import { format, parseISO } from "date-fns";
import { ar } from "date-fns/locale";
import { motion } from "framer-motion";
import { Star, ThumbsUp, Trash2, Search, Loader2 } from "lucide-react";
import { ReviewRowSkeleton } from "@/components/common/ReviewRowSkeleton";
import { PresentationalReviewsProps } from "@/types/admin/adminReviews";
import styles from "@/sass/pages/adminReviews.module.scss";

export default function PresentationalReviews({
  totalReviews,
  totalLikesCount,
  hasMore,
  isLoading,
  loadMoreReviews,
  loadingIds,
  searchQuery,
  setSearchQuery,
  renderStars,
  filteredReviews,
  submitDelete,
}: PresentationalReviewsProps) {
  return (
    <>
      <div className={styles.usersPage}>
        <motion.div
          className={styles.pageHeader}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className={styles.headerLeft}>
            <h1>إدارة التقييمات</h1>
            <p>عرض وإدارة جميع تقييمات العقارات</p>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          className={styles.statsCards}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <motion.div className={styles.statCard} whileHover={{ y: -3 }}>
            <div className={`${styles.statIcon} ${styles.total}`}>
              <Star size={24} />
            </div>
            <div className={styles.statInfo}>
              <p className={styles.statValue}>{totalReviews}</p>
              <p className={styles.statLabel}>إجمالي التقييمات</p>
            </div>
          </motion.div>

          <motion.div className={styles.statCard} whileHover={{ y: -3 }}>
            <div className={`${styles.statIcon} ${styles.active}`}>
              <ThumbsUp size={24} />
            </div>
            <div className={styles.statInfo}>
              <p className={styles.statValue}>{totalLikesCount}</p>
              <p className={styles.statLabel}>إجمالي اعجابات التقييمات</p>
            </div>
          </motion.div>
        </motion.div>

        {/* Reviews Table */}
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
                placeholder="ابحث عن تقييم..."
                name="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className={styles.searchIcon} size={20} />
            </div>
          </div>

          <div className={styles.tableContent}>
            <table>
              <thead>
                <tr>
                  <th>المستخدم</th>
                  <th>العقار</th>
                  <th>التقييم</th>
                  <th>التعليق</th>
                  <th>اعجابات</th>
                  <th>التاريخ</th>
                  <th>الإجراءات</th>
                </tr>
              </thead>
              <tbody>
                {isLoading
                  ? // Show 5 skeleton rows when loading
                    Array.from({ length: 8 }).map((_, index) => (
                      <ReviewRowSkeleton key={`skeleton-${index}`} />
                    ))
                  : filteredReviews?.length > 0 &&
                    filteredReviews.map((review, index) => (
                      <motion.tr
                        key={`${review.id}-${index}`}
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
                              {review.user_name.charAt(0)}
                            </motion.div>
                            <div className={styles.userDetails}>
                              <p className={styles.userName}>
                                {review.user_name}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td data-label="العقار">
                          <div className="text-2xl">
                            {review.property_title}
                          </div>
                        </td>
                        <td data-label="التقييم">
                          <div className="text-2xl flex gap-1.5">
                            {renderStars(review.rating)}
                          </div>
                        </td>
                        <td data-label="التعليق">
                          <div className="text-2xl text-ellipsis max-w-[200px] overflow-hidden whitespace-nowrap">
                            {review.comment}
                          </div>
                        </td>
                        <td data-label="اعجابات">
                          <span className="text-2xl">
                            <span className={styles.statusDot}></span>
                            {review.likes_count}
                          </span>
                        </td>
                        <td data-label="التاريخ" className="text-2xl">
                          {format(parseISO(review.created_at), "dd MMMM yyyy", {
                            locale: ar,
                          })}
                        </td>
                        <td data-label="الإجراءات">
                          <div className={styles.actions}>
                            <motion.button
                              className={styles.deleteBtn}
                              onClick={() =>
                                submitDelete(review.id, review.property_id)
                              }
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              title="حذف"
                              disabled={loadingIds.includes(review.id)}
                            >
                              {loadingIds.includes(review.id) ? (
                                <Loader2
                                  size={18}
                                  className={styles.smallSpinner}
                                />
                              ) : (
                                <Trash2 size={18} />
                              )}
                            </motion.button>
                          </div>
                        </td>
                      </motion.tr>
                    ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
      {/* Load more button */}
      {hasMore && (
        <motion.div
          className={styles.loadMoreContainer}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <button
            onClick={loadMoreReviews}
            className={styles.loadMoreButton}
            disabled={isLoading}
            aria-label="تحميل المزيد من الآراء"
          >
            عرض المزيد من الآراء
          </button>
        </motion.div>
      )}
    </>
  );
}
