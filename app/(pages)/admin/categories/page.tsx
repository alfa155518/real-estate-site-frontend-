'use client';

import { useState } from 'react';
import { format, parseISO } from 'date-fns';
import { ar } from 'date-fns/locale';
import { motion, AnimatePresence } from 'framer-motion';
import { Tag, Plus, Edit, Trash2, X, Save, AlertCircle } from 'lucide-react';
import { useForm } from 'react-hook-form';
import styles from '@/sass/pages/admin/users.module.scss';
import modalStyles from '@/sass/pages/adminProperties.module.scss';
import formStyles from '@/sass/components/common/userAndPropertyForm.module.scss';

interface Category {
  id: number;
  name: string;
  slug: string;
  properties_count: number;
  created_at: string;
}

interface CategoryFormData {
  name: string;
  slug: string;
}

const mockCategories: Category[] = [
  { id: 1, name: 'شقق', slug: 'apartments', properties_count: 45, created_at: '2024-01-01' },
  { id: 2, name: 'فلل', slug: 'villas', properties_count: 32, created_at: '2024-01-02' },
  { id: 3, name: 'منازل', slug: 'houses', properties_count: 28, created_at: '2024-01-03' },
  { id: 4, name: 'أراضي', slug: 'lands', properties_count: 15, created_at: '2024-01-04' },
  { id: 5, name: 'تجاري', slug: 'commercial', properties_count: 12, created_at: '2024-01-05' },
];

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>(mockCategories);
  const [showModal, setShowModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  const { register, handleSubmit, reset, formState: { errors } } = useForm<CategoryFormData>();

  const handleAdd = () => {
    setEditingCategory(null);
    reset({ name: '', slug: '' });
    setShowModal(true);
  };

  const handleEdit = (category: Category) => {
    setEditingCategory(category);
    reset({ name: category.name, slug: category.slug });
    setShowModal(true);
  };

  const handleDelete = (id: number) => {
    if (confirm('هل أنت متأكد من حذف هذا التصنيف؟')) {
      setCategories(categories.filter(c => c.id !== id));
    }
  };

  const onSubmit = (data: CategoryFormData) => {
    if (editingCategory) {
      setCategories(categories.map(c => c.id === editingCategory.id ? { ...c, ...data } : c));
    } else {
      const newCategory: Category = {
        id: Math.max(...categories.map(c => c.id)) + 1,
        ...data,
        properties_count: 0,
        created_at: new Date().toISOString(),
      };
      setCategories([...categories, newCategory]);
    }
    setShowModal(false);
    reset();
  };

  return (
    <div className={styles.usersPage}>
      <motion.div className={styles.pageHeader} initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <div className={styles.headerLeft}>
          <h1>إدارة التصنيفات</h1>
          <p>عرض وإدارة تصنيفات العقارات</p>
        </div>
        <div className={styles.headerRight}>
          <motion.button
            style={{
              background: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)',
              color: 'white',
              border: 'none',
              padding: '0.875rem 1.5rem',
              borderRadius: '12px',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
            }}
            onClick={handleAdd}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Plus size={18} />
            إضافة تصنيف جديد
          </motion.button>
        </div>
      </motion.div>

      <motion.div className={styles.statsCards} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
        <motion.div className={styles.statCard} whileHover={{ y: -3 }}>
          <div className={`${styles.statIcon} ${styles.total}`}>
            <Tag size={24} />
          </div>
          <div className={styles.statInfo}>
            <p className={styles.statValue}>{categories.length}</p>
            <p className={styles.statLabel}>إجمالي التصنيفات</p>
          </div>
        </motion.div>
      </motion.div>

      <motion.div className={styles.usersTable} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
        <div className={styles.tableContent}>
          <table>
            <thead>
              <tr>
                <th>الاسم</th>
                <th>الرابط</th>
                <th>عدد العقارات</th>
                <th>تاريخ الإنشاء</th>
                <th>الإجراءات</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category, index) => (
                <motion.tr
                  key={category.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <td data-label="الاسم"><strong>{category.name}</strong></td>
                  <td data-label="الرابط">{category.slug}</td>
                  <td data-label="عدد العقارات">{category.properties_count}</td>
                  <td data-label="تاريخ الإنشاء">{format(parseISO(category.created_at), 'dd MMMM yyyy', { locale: ar })}</td>
                  <td data-label="الإجراءات">
                    <div className={styles.actions}>
                      <motion.button
                        className={styles.editBtn}
                        onClick={() => handleEdit(category)}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        title="تعديل"
                      >
                        <Edit size={18} />
                      </motion.button>
                      <motion.button
                        className={styles.deleteBtn}
                        onClick={() => handleDelete(category.id)}
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
      </motion.div>

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
                <h2>{editingCategory ? 'تعديل التصنيف' : 'إضافة تصنيف جديد'}</h2>
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
                <form className={formStyles.propertyForm} onSubmit={handleSubmit(onSubmit)}>
                  <div className={formStyles.formGrid}>
                    <div className={formStyles.formSection}>
                      <div className={formStyles.fieldsGrid}>
                        <div className={`${formStyles.formField} ${formStyles.fullWidth}`}>
                          <label>
                            <span className={formStyles.required}>*</span>
                            اسم التصنيف
                          </label>
                          <input
                            type="text"
                            placeholder="مثال: شقق"
                            className={errors.name ? formStyles.error : ''}
                            {...register('name', { required: 'اسم التصنيف مطلوب' })}
                          />
                          {errors.name && (
                            <div className={formStyles.errorMessage}>
                              <AlertCircle size={14} />
                              {errors.name.message}
                            </div>
                          )}
                        </div>

                        <div className={`${formStyles.formField} ${formStyles.fullWidth}`}>
                          <label>
                            <span className={formStyles.required}>*</span>
                            الرابط (Slug)
                          </label>
                          <input
                            type="text"
                            placeholder="مثال: apartments"
                            className={errors.slug ? formStyles.error : ''}
                            {...register('slug', { required: 'الرابط مطلوب' })}
                          />
                          {errors.slug && (
                            <div className={formStyles.errorMessage}>
                              <AlertCircle size={14} />
                              {errors.slug.message}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className={formStyles.formActions}>
                    <motion.button
                      type="button"
                      className={formStyles.cancelBtn}
                      onClick={() => setShowModal(false)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <X size={18} />
                      إلغاء
                    </motion.button>
                    <motion.button
                      type="submit"
                      className={formStyles.submitBtn}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Save size={18} />
                      حفظ التصنيف
                    </motion.button>
                  </div>
                </form>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
