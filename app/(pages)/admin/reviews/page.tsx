'use client';

import { useState } from 'react';
import { format, parseISO } from 'date-fns';
import { ar } from 'date-fns/locale';
import { motion } from 'framer-motion';
import {
  Star,
  ThumbsUp,
  ThumbsDown,
  Eye,
  Trash2,
  Filter,
  Search,
} from 'lucide-react';
import styles from '@/sass/pages/adminUsers.module.scss';

interface Review {
  id: number;
  user_name: string;
  property_title: string;
  rating: number;
  comment: string;
  status: 'approved' | 'pending' | 'rejected';
  created_at: string;
  likes: number;
}

const mockReviews: Review[] = [
  {
    id: 1,
    user_name: 'أحمد محمد',
    property_title: 'فيلا فاخرة في الرياض',
    rating: 5,
    comment: 'عقار ممتاز والموقع رائع، أنصح بشدة',
    status: 'approved',
    created_at: '2024-01-15',
    likes: 12,
  },
  {
    id: 2,
    user_name: 'سارة أحمد',
    property_title: 'شقة عصرية في جدة',
    rating: 4,
    comment: 'شقة جميلة لكن السعر مرتفع قليلاً',
    status: 'approved',
    created_at: '2024-01-14',
    likes: 8,
  },
  {
    id: 3,
    user_name: 'محمد علي',
    property_title: 'منزل في الدمام',
    rating: 3,
    comment: 'العقار جيد لكن يحتاج بعض التحسينات',
    status: 'pending',
    created_at: '2024-01-13',
    likes: 3,
  },
];

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>(mockReviews);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const handleApprove = (id: number) => {
    setReviews(reviews.map(r => r.id === id ? { ...r, status: 'approved' as const } : r));
  };

  const handleReject = (id: number) => {
    setReviews(reviews.map(r => r.id === id ? { ...r, status: 'rejected' as const } : r));
  };

  const handleDelete = (id: number) => {
    if (confirm('هل أنت متأكد من حذف هذا التقييم؟')) {
      setReviews(reviews.filter(r => r.id !== id));
    }
  };

  const filteredReviews = reviews.filter(review => {
    const matchesSearch = review.user_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         review.property_title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus === 'all' || review.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const totalReviews = reviews.length;
  const approvedReviews = reviews.filter(r => r.status === 'approved').length;
  const pendingReviews = reviews.filter(r => r.status === 'pending').length;

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        size={16}
        fill={i < rating ? '#fbd91b' : 'none'}
        color={i < rating ? '#fbd91b' : '#d1d5db'}
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
            <p className={styles.statValue}>{approvedReviews}</p>
            <p className={styles.statLabel}>التقييمات المعتمدة</p>
          </div>
        </motion.div>

        <motion.div className={styles.statCard} whileHover={{ y: -3 }}>
          <div className={`${styles.statIcon} ${styles.admins}`}>
            <Eye size={24} />
          </div>
          <div className={styles.statInfo}>
            <p className={styles.statValue}>{pendingReviews}</p>
            <p className={styles.statLabel}>قيد المراجعة</p>
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
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className={styles.searchIcon} size={20} />
          </div>
          <div className={styles.tableActions}>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              style={{
                padding: '0.75rem 1rem',
                border: '2px solid #e5e7eb',
                borderRadius: '10px',
                fontSize: '0.875rem',
                cursor: 'pointer',
              }}
            >
              <option value="all">جميع الحالات</option>
              <option value="approved">معتمد</option>
              <option value="pending">قيد المراجعة</option>
              <option value="rejected">مرفوض</option>
            </select>
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
                <th>الحالة</th>
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
                  <td data-label="العقار">{review.property_title}</td>
                  <td data-label="التقييم">
                    <div style={{ display: 'flex', gap: '0.25rem' }}>
                      {renderStars(review.rating)}
                    </div>
                  </td>
                  <td data-label="التعليق">
                    <div style={{ maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {review.comment}
                    </div>
                  </td>
                  <td data-label="الحالة">
                    <span
                      className={`${styles.statusBadge} ${
                        review.status === 'approved' ? styles.active : styles.inactive
                      }`}
                    >
                      <span className={styles.statusDot}></span>
                      {review.status === 'approved' ? 'معتمد' : review.status === 'pending' ? 'قيد المراجعة' : 'مرفوض'}
                    </span>
                  </td>
                  <td data-label="التاريخ">
                    {format(parseISO(review.created_at), 'dd MMMM yyyy', { locale: ar })}
                  </td>
                  <td data-label="الإجراءات">
                    <div className={styles.actions}>
                      {review.status === 'pending' && (
                        <>
                          <motion.button
                            className={styles.editBtn}
                            onClick={() => handleApprove(review.id)}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            title="اعتماد"
                          >
                            <ThumbsUp size={18} />
                          </motion.button>
                          <motion.button
                            className={styles.deleteBtn}
                            onClick={() => handleReject(review.id)}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            title="رفض"
                          >
                            <ThumbsDown size={18} />
                          </motion.button>
                        </>
                      )}
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

        <div className={styles.tablePagination}>
          <div className={styles.paginationInfo}>
            عرض 1-{filteredReviews.length} من {totalReviews} تقييم
          </div>
          <div className={styles.paginationButtons}>
            <button disabled>السابق</button>
            <button className={styles.active}>1</button>
            <button>2</button>
            <button>التالي</button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
