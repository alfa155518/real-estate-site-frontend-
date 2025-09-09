'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Lock, Mail, Phone, MapPin, UserCircle, Edit2, Check, X } from 'lucide-react';
import { useForm, SubmitHandler } from 'react-hook-form';
import styles from '@/sass/pages/profile/profile.module.scss';

// Types
type TabType = 'personal' | 'password';

type PersonalInfoFormData = {
  fullName: string;
  email: string;
  phone: string;
  address: string;
};

type PasswordFormData = {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<TabType>('personal');
  const [isEditing, setIsEditing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Mock user data - replace with actual data from your auth context
  const userData = {
    fullName: 'أحمد محمد',
    email: 'ahmed@example.com',
    phone: '01001234567',
    address: 'القاهرة، مصر',
    avatar: '/images/avatar-placeholder.jpg',
  };

  // Personal Info Form
  const { 
    register: registerPersonal, 
    handleSubmit: handlePersonalSubmit, 
    formState: { errors: personalErrors },
    reset: resetPersonal
  } = useForm<PersonalInfoFormData>({
    defaultValues: {
      fullName: userData.fullName,
      email: userData.email,
      phone: userData.phone,
      address: userData.address,
    },
  });

  // Password Form
  const { 
    register: registerPassword, 
    handleSubmit: handlePasswordSubmit, 
    formState: { errors: passwordErrors },
    reset: resetPassword,
    watch,
    setError
  } = useForm<PasswordFormData>();

  const onPersonalSubmit: SubmitHandler<PersonalInfoFormData> = async (data) => {
    // Basic validation
    if (!data.fullName || data.fullName.length < 3) {
      return;
    }
    if (!data.email || !/\S+@\S+\.\S+/.test(data.email)) {
      return;
    }
    if (!data.phone || data.phone.length < 10) {
      return;
    }
    if (!data.address || data.address.length < 5) {
      return;
    }

    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Personal info updated:', data);
      setIsEditing(false);
      // Update user data in context/state here
    } catch (error) {
      console.error('Error updating profile:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const onPasswordSubmit: SubmitHandler<PasswordFormData> = async (data) => {
    if (data.newPassword !== data.confirmPassword) {
      setError('confirmPassword', {
        type: 'manual',
        message: 'كلمات المرور غير متطابقة'
      });
      return;
    }

    if (data.newPassword.length < 6) {
      setError('newPassword', {
        type: 'manual',
        message: 'كلمة المرور يجب أن تكون 6 أحرف على الأقل'
      });
      return;
    }

    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Password updated:', data);
      resetPassword();
      // Show success message
    } catch (error) {
      console.error('Error updating password:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancelEdit = () => {
    resetPersonal({
      fullName: userData.fullName,
      email: userData.email,
      phone: userData.phone,
      address: userData.address,
    });
    setIsEditing(false);
  };

  return (
    <div className={styles.profileContainer}>
      <motion.div 
        className={styles.profileHeader}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className={styles.avatarContainer}>
          <UserCircle className={styles.avatar} />
          <div className={styles.userInfo}>
            <h2>{userData.fullName}</h2>
            <p>{userData.email}</p>
          </div>
        </div>
      </motion.div>

      <div className={styles.tabsContainer}>
        <div className={styles.tabs}>
          <button
            className={`${styles.tab} ${activeTab === 'personal' ? styles.active : ''}`}
            onClick={() => setActiveTab('personal')}
          >
            <User size={20} />
            <span>البيانات الشخصية</span>
          </button>
          <button
            className={`${styles.tab} ${activeTab === 'password' ? styles.active : ''}`}
            onClick={() => setActiveTab('password')}
          >
            <Lock size={20} />
            <span>تغيير كلمة المرور</span>
          </button>
        </div>

        <div className={styles.tabContent}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className={styles.formContainer}
            >
              {activeTab === 'personal' ? (
                <form onSubmit={handlePersonalSubmit(onPersonalSubmit)}>
                  <div className={styles.formGroup}>
                    <label htmlFor="fullName">
                      <User size={18} />
                      الاسم الكامل
                    </label>
                    <input
                      id="fullName"
                      type="text"
                      disabled={!isEditing}
                      {...registerPersonal('fullName', {
                        required: 'الاسم مطلوب',
                        minLength: {
                          value: 3,
                          message: 'يجب أن يكون الاسم 3 أحرف على الأقل'
                        }
                      })}
                      className={`${styles.input} ${personalErrors.fullName ? styles.error : ''}`}
                    />
                    {personalErrors.fullName && (
                      <span className={styles.errorMessage}>
                        {personalErrors.fullName.message}
                      </span>
                    )}
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="email">
                      <Mail size={18} />
                      البريد الإلكتروني
                    </label>
                    <input
                      id="email"
                      type="email"
                      disabled={!isEditing}
                      {...registerPersonal('email', {
                        required: 'البريد الإلكتروني مطلوب',
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: 'البريد الإلكتروني غير صالح'
                        }
                      })}
                      className={`${styles.input} ${personalErrors.email ? styles.error : ''}`}
                    />
                    {personalErrors.email && (
                      <span className={styles.errorMessage}>
                        {personalErrors.email.message}
                      </span>
                    )}
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="phone">
                      <Phone size={18} />
                      رقم الهاتف
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      disabled={!isEditing}
                      {...registerPersonal('phone', {
                        required: 'رقم الهاتف مطلوب',
                        minLength: {
                          value: 10,
                          message: 'رقم الهاتف غير صالح'
                        }
                      })}
                      className={`${styles.input} ${personalErrors.phone ? styles.error : ''}`}
                    />
                    {personalErrors.phone && (
                      <span className={styles.errorMessage}>
                        {personalErrors.phone.message}
                      </span>
                    )}
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="address">
                      <MapPin size={18} />
                      العنوان
                    </label>
                    <input
                      id="address"
                      type="text"
                      disabled={!isEditing}
                      {...registerPersonal('address', {
                        required: 'العنوان مطلوب',
                        minLength: {
                          value: 5,
                          message: 'العنوان قصير جداً'
                        }
                      })}
                      className={`${styles.input} ${personalErrors.address ? styles.error : ''}`}
                    />
                    {personalErrors.address && (
                      <span className={styles.errorMessage}>
                        {personalErrors.address.message}
                      </span>
                    )}
                  </div>

                  <div className={styles.formActions}>
                    {!isEditing ? (
                      <button
                        type="button"
                        className={`${styles.button} ${styles.editButton}`}
                        onClick={() => setIsEditing(true)}
                      >
                        <Edit2 size={18} />
                        تعديل البيانات
                      </button>
                    ) : (
                      <>
                        <button
                          type="button"
                          className={`${styles.button} ${styles.cancelButton}`}
                          onClick={handleCancelEdit}
                          disabled={isSubmitting}
                        >
                          <X size={18} />
                          إلغاء
                        </button>
                        <button
                          type="submit"
                          className={`${styles.button} ${styles.saveButton}`}
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? (
                            'جاري الحفظ...'
                          ) : (
                            <>
                              <Check size={18} />
                              حفظ التغييرات
                            </>
                          )}
                        </button>
                      </>
                    )}
                  </div>
                </form>
              ) : (
                <form onSubmit={handlePasswordSubmit(onPasswordSubmit)}>
                  <div className={styles.formGroup}>
                    <label htmlFor="currentPassword">
                      <Lock size={18} />
                      كلمة المرور الحالية
                    </label>
                    <input
                      id="currentPassword"
                      type="password"
                      {...registerPassword('currentPassword', {
                        required: 'كلمة المرور الحالية مطلوبة',
                        minLength: {
                          value: 6,
                          message: 'يجب أن تكون كلمة المرور 6 أحرف على الأقل'
                        }
                      })}
                      className={`${styles.input} ${passwordErrors.currentPassword ? styles.error : ''}`}
                    />
                    {passwordErrors.currentPassword && (
                      <span className={styles.errorMessage}>
                        {passwordErrors.currentPassword.message}
                      </span>
                    )}
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="newPassword">
                      <Lock size={18} />
                      كلمة المرور الجديدة
                    </label>
                    <input
                      id="newPassword"
                      type="password"
                      {...registerPassword('newPassword', {
                        required: 'كلمة المرور الجديدة مطلوبة',
                        minLength: {
                          value: 6,
                          message: 'يجب أن تكون كلمة المرور 6 أحرف على الأقل'
                        }
                      })}
                      className={`${styles.input} ${passwordErrors.newPassword ? styles.error : ''}`}
                    />
                    {passwordErrors.newPassword && (
                      <span className={styles.errorMessage}>
                        {passwordErrors.newPassword.message}
                      </span>
                    )}
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="confirmPassword">
                      <Lock size={18} />
                      تأكيد كلمة المرور
                    </label>
                    <input
                      id="confirmPassword"
                      type="password"
                      {...registerPassword('confirmPassword', {
                        required: 'تأكيد كلمة المرور مطلوب'
                      })}
                      className={`${styles.input} ${passwordErrors.confirmPassword ? styles.error : ''}`}
                    />
                    {passwordErrors.confirmPassword && (
                      <span className={styles.errorMessage}>
                        {passwordErrors.confirmPassword.message}
                      </span>
                    )}
                  </div>

                  <div className={styles.formActions}>
                    <button
                      type="submit"
                      className={`${styles.button} ${styles.saveButton}`}
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'جاري التحديث...' : 'تغيير كلمة المرور'}
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}