'use client';

import { useState } from 'react';
import { format, parseISO } from 'date-fns';
import { ar } from 'date-fns/locale';
import { motion } from 'framer-motion';
import { Heart, Trash2, Eye, Search, TrendingUp } from 'lucide-react';
import styles from '@/sass/pages/admin/users.module.scss';

interface Favorite {
  id: number;
  user_name: string;
  property_title: string;
  property_price: string;
  added_date: string;
}

const mockFavorites: Favorite[] = [
  {
    id: 1,
    user_name: 'أحمد محمد',
    property_title: 'فيلا فاخرة في الرياض',
    property_price: '2,500,000 ر.س',
    added_date: '2024-01-15',
  },
  {
    id: 2,
    user_name: 'سارة أحمد',
    property_title: 'شقة عصرية في جدة',
    property_price: '850,000 ر.س',
    added_date: '2024-01-14',
  },
  {
    id: 3,
    user_name: 'محمد علي',
    property_title: 'منزل في الدمام',
    property_price: '1,200,000 ر.س',
    added_date: '2024-01-13',
  },
];

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState<Favorite[]>(mockFavorites);
  const [searchQuery, setSearchQuery] = useState('');

  const handleDelete = (id: number) => {
    if (confirm('هل أنت متأكد من حذف هذا المفضل؟')) {
      setFavorites(favorites.filter(f => f.id !== id));
    }
  };

  const filteredFavorites = favorites.filter(fav =>
    fav.user_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    fav.property_title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className={styles.usersPage}>
      <motion.div
        className={styles.pageHeader}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className={styles.headerLeft}>
          <h1>إدارة المفضلات</h1>
          <p>عرض وإدارة العقارات المفضلة للمستخدمين</p>
        </div>
      </motion.div>

      <motion.div className={styles.statsCards} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
        <motion.div className={styles.statCard} whileHover={{ y: -3 }}>
          <div className={`${styles.statIcon} ${styles.total}`}>
            <Heart size={24} />
          </div>
          <div className={styles.statInfo}>
            <p className={styles.statValue}>{favorites.length}</p>
            <p className={styles.statLabel}>إجمالي المفضلات</p>
          </div>
        </motion.div>

        <motion.div className={styles.statCard} whileHover={{ y: -3 }}>
          <div className={`${styles.statIcon} ${styles.active}`}>
            <TrendingUp size={24} />
          </div>
          <div className={styles.statInfo}>
            <p className={styles.statValue}>+15%</p>
            <p className={styles.statLabel}>الزيادة هذا الشهر</p>
          </div>
        </motion.div>
      </motion.div>

      <motion.div className={styles.usersTable} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
        <div className={styles.tableHeader}>
          <div className={styles.searchBar}>
            <input
              type="text"
              placeholder="ابحث في المفضلات..."
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
                <th>السعر</th>
                <th>تاريخ الإضافة</th>
                <th>الإجراءات</th>
              </tr>
            </thead>
            <tbody>
              {filteredFavorites.map((fav, index) => (
                <motion.tr
                  key={fav.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <td data-label="المستخدم">
                    <div className={styles.userInfo}>
                      <motion.div className={styles.userAvatar} whileHover={{ scale: 1.1, rotate: 5 }}>
                        {fav.user_name.charAt(0)}
                      </motion.div>
                      <div className={styles.userDetails}>
                        <p className={styles.userName}>{fav.user_name}</p>
                      </div>
                    </div>
                  </td>
                  <td data-label="العقار">{fav.property_title}</td>
                  <td data-label="السعر"><strong>{fav.property_price}</strong></td>
                  <td data-label="تاريخ الإضافة">{format(parseISO(fav.added_date), 'dd MMMM yyyy', { locale: ar })}</td>
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
                        className={styles.deleteBtn}
                        onClick={() => handleDelete(fav.id)}
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
            عرض 1-{filteredFavorites.length} من {favorites.length} مفضلة
          </div>
          <div className={styles.paginationButtons}>
            <button disabled>السابق</button>
            <button className={styles.active}>1</button>
            <button>التالي</button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
