"use client";

import { useState } from "react";
import { format, parseISO } from "date-fns";
import { ar } from "date-fns/locale";
import { motion } from "framer-motion";
import { Star, ThumbsUp, Trash2, Search } from "lucide-react";
import styles from "@/sass/pages/adminReviews.module.scss";
interface Review {
  id: number;
  user_name: string;
  property_title: string;
  rating: number;
  comment: string;
  created_at: string;
  likes: number;
}

const mockReviews: Review[] = [
  {
    id: 1,
    user_name: "أحمد محمد",

    property_title: "فيلا فاخرة في الرياض",
    rating: 5,
    comment: "عقار ممتاز والموقع رائع، أنصح بشدة",
    created_at: "2024-01-15",
    likes: 12,
  },
  {
    id: 2,
    user_name: "سارة أحمد",
    property_title: "شقة عصرية في جدة",
    rating: 4,
    comment: "شقة جميلة لكن السعر مرتفع قليلاً",

    created_at: "2024-01-14",
    likes: 8,
  },
  {
    id: 3,
    user_name: "محمد علي",
    property_title: "منزل في الدمام",
    rating: 3,
    comment: "العقار جيد لكن يحتاج بعض التحسينات",

    created_at: "2024-01-13",
    likes: 3,
  },
];

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>(mockReviews);
  const [searchQuery, setSearchQuery] = useState("");

  const handleDelete = (id: number) => {
    if (confirm("هل أنت متأكد من حذف هذا التقييم؟")) {
      setReviews(reviews.filter((r) => r.id !== id));
    }
  };

  const filteredReviews = reviews.filter((review) => {
    const matchesSearch =
      review.user_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      review.property_title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  const totalReviews = reviews.length;

  const rviewsLikes = reviews.reduce(
    (total, review) => total + review.likes,
    0
  );

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        size={16}
        fill={i < rating ? "#f59e0b" : "none"}
        color={i < rating ? "#f59e0b" : "#e5e7eb"}
      />
    ));
  };

  return (
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
            <p className={styles.statValue}>{rviewsLikes}</p>
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
              {filteredReviews.map((review, index) => (
                <motion.tr
                  key={review.id}
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
                        <p className={styles.userName}>{review.user_name}</p>
                      </div>
                    </div>
                  </td>
                  <td data-label="العقار">
                    <div className="text-2xl">{review.property_title}</div>
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
                      {review.likes}
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
                        onClick={() => handleDelete(review.id)}
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
        {/* Pagination */}
      </motion.div>
    </div>
  );
}
