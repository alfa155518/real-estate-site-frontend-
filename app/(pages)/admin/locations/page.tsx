'use client';

import { useState } from 'react';
import { format, parseISO } from 'date-fns';
import { ar } from 'date-fns/locale';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Plus, Edit, Trash2, X, Save, AlertCircle } from 'lucide-react';
import { useForm } from 'react-hook-form';
import styles from '@/sass/pages/adminUsers.module.scss';
import modalStyles from '@/sass/pages/adminProperties.module.scss';
import formStyles from '@/sass/components/propertyForm.module.scss';

interface Location {
  id: number;
  city: string;
  district: string;
  properties_count: number;
  created_at: string;
}

interface LocationFormData {
  city: string;
  district: string;
}

const mockLocations: Location[] = [
  { id: 1, city: 'الرياض', district: 'العليا', properties_count: 25, created_at: '2024-01-01' },
  { id: 2, city: 'الرياض', district: 'الملقا', properties_count: 18, created_at: '2024-01-02' },
  { id: 3, city: 'جدة', district: 'الروضة', properties_count: 22, created_at: '2024-01-03' },
  { id: 4, city: 'جدة', district: 'الحمراء', properties_count: 15, created_at: '2024-01-04' },
  { id: 5, city: 'الدمام', district: 'الفيصلية', properties_count: 12, created_at: '2024-01-05' },
];

export default function LocationsPage() {
  const [locations, setLocations] = useState<Location[]>(mockLocations);
  const [showModal, setShowModal] = useState(false);
  const [editingLocation, setEditingLocation] = useState<Location | null>(null);

  const { register, handleSubmit, reset, formState: { errors } } = useForm<LocationFormData>();

  const handleAdd = () => {
    setEditingLocation(null);
    reset({ city: '', district: '' });
    setShowModal(true);
  };

  const handleEdit = (location: Location) => {
    setEditingLocation(location);
    reset({ city: location.city, district: location.district });
    setShowModal(true);
  };

  const handleDelete = (id: number) => {
    if (confirm('هل أنت متأكد من حذف هذا الموقع؟')) {
      setLocations(locations.filter(l => l.id !== id));
    }
  };

  const onSubmit = (data: LocationFormData) => {
    if (editingLocation) {
      setLocations(locations.map(l => l.id === editingLocation.id ? { ...l, ...data } : l));
    } else {
      const newLocation: Location = {
        id: Math.max(...locations.map(l => l.id)) + 1,
        ...data,
        properties_count: 0,
        created_at: new Date().toISOString(),
      };
      setLocations([...locations, newLocation]);
    }
    setShowModal(false);
    reset();
  };

  const cities = [...new Set(locations.map(l => l.city))];

  return (
    <div className={styles.usersPage}>
      <motion.div className={styles.pageHeader} initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <div className={styles.headerLeft}>
          <h1>إدارة المواقع</h1>
          <p>عرض وإدارة مواقع العقارات</p>
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
            إضافة موقع جديد
          </motion.button>
        </div>
      </motion.div>

      <motion.div className={styles.statsCards} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
        <motion.div className={styles.statCard} whileHover={{ y: -3 }}>
          <div className={`${styles.statIcon} ${styles.total}`}>
            <MapPin size={24} />
          </div>
          <div className={styles.statInfo}>
            <p className={styles.statValue}>{locations.length}</p>
            <p className={styles.statLabel}>إجمالي المواقع</p>
          </div>
        </motion.div>

        <motion.div className={styles.statCard} whileHover={{ y: -3 }}>
          <div className={`${styles.statIcon} ${styles.active}`}>
            <MapPin size={24} />
          </div>
          <div className={styles.statInfo}>
            <p className={styles.statValue}>{cities.length}</p>
            <p className={styles.statLabel}>عدد المدن</p>
          </div>
        </motion.div>
      </motion.div>

      <motion.div className={styles.usersTable} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
        <div className={styles.tableContent}>
          <table>
            <thead>
              <tr>
                <th>المدينة</th>
                <th>الحي</th>
                <th>عدد العقارات</th>
                <th>تاريخ الإضافة</th>
                <th>الإجراءات</th>
              </tr>
            </thead>
            <tbody>
              {locations.map((location, index) => (
                <motion.tr
                  key={location.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <td data-label="المدينة"><strong>{location.city}</strong></td>
                  <td data-label="الحي">{location.district}</td>
                  <td data-label="عدد العقارات">{location.properties_count}</td>
                  <td data-label="تاريخ الإضافة">{format(parseISO(location.created_at), 'dd MMMM yyyy', { locale: ar })}</td>
                  <td data-label="الإجراءات">
                    <div className={styles.actions}>
                      <motion.button
                        className={styles.editBtn}
                        onClick={() => handleEdit(location)}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        title="تعديل"
                      >
                        <Edit size={18} />
                      </motion.button>
                      <motion.button
                        className={styles.deleteBtn}
                        onClick={() => handleDelete(location.id)}
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
                <h2>{editingLocation ? 'تعديل الموقع' : 'إضافة موقع جديد'}</h2>
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
                            المدينة
                          </label>
                          <input
                            type="text"
                            placeholder="مثال: الرياض"
                            className={errors.city ? formStyles.error : ''}
                            {...register('city', { required: 'المدينة مطلوبة' })}
                          />
                          {errors.city && (
                            <div className={formStyles.errorMessage}>
                              <AlertCircle size={14} />
                              {errors.city.message}
                            </div>
                          )}
                        </div>

                        <div className={`${formStyles.formField} ${formStyles.fullWidth}`}>
                          <label>
                            <span className={formStyles.required}>*</span>
                            الحي
                          </label>
                          <input
                            type="text"
                            placeholder="مثال: العليا"
                            className={errors.district ? formStyles.error : ''}
                            {...register('district', { required: 'الحي مطلوب' })}
                          />
                          {errors.district && (
                            <div className={formStyles.errorMessage}>
                              <AlertCircle size={14} />
                              {errors.district.message}
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
                      حفظ الموقع
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
