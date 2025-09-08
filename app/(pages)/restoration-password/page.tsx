'use client';

import { useForm, SubmitHandler } from 'react-hook-form';
import { motion, Variants } from 'framer-motion';
import { useState } from 'react';
import Link from 'next/link';
import { Lock, CheckCircle, ArrowRight } from 'lucide-react';
import styles from '@/sass/pages/restoration-password.module.scss';

type FormData = {
  newPassword: string;
  confirmPassword: string;
};


const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 15,
    },
  },
};

export default function RestorationPassword() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    mode: 'onBlur',
    defaultValues: {
      newPassword: '',
      confirmPassword: '',
    },
  });

  const newPassword = watch('newPassword');
  const confirmPassword = watch('confirmPassword');

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      setIsLoading(true);
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      console.log('Password updated:', data.newPassword);
      setIsSubmitted(true);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const validatePasswordMatch = (value: string) => {
    return value === newPassword || 'كلمتا المرور غير متطابقتين';
  };

  return (
    <motion.div
      className={styles.container}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      dir="rtl"
    >
      <motion.div
        className={styles.card}
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <motion.div 
          className={styles.logo}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h1>تعيين كلمة مرور جديدة</h1>
          <p>الرجاء إدخال كلمة المرور الجديدة</p>
        </motion.div>

        {isSubmitted ? (
          <motion.div
            className={styles.successMessage}
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <CheckCircle size={20} />
            <span>تم تحديث كلمة المرور بنجاح</span>
          </motion.div>
        ) : (
          <motion.form
            onSubmit={handleSubmit(onSubmit)}
            className={styles.form}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div className={styles.formGroup} variants={itemVariants}>
              <label htmlFor="newPassword">كلمة المرور الجديدة</label>
              <div className={styles.inputContainer}>
                <input
                  id="newPassword"
                  type="password"
                  placeholder="أدخل كلمة المرور الجديدة"
                  {...register('newPassword', {
                    required: 'حقل مطلوب',
                    minLength: {
                      value: 8,
                      message: 'يجب أن تتكون كلمة المرور من 8 أحرف على الأقل',
                    },
                  })}
                  disabled={isLoading}
                  aria-invalid={errors.newPassword ? 'true' : 'false'}
                  aria-describedby={errors.newPassword ? 'newPassword-error' : undefined}
                />
                <Lock size={20} className={styles.icon} />
              </div>
              {errors.newPassword && (
                <motion.span 
                  id="newPassword-error"
                  className={styles.error}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  role="alert"
                >
                  {errors.newPassword.message}
                </motion.span>
              )}
            </motion.div>

            <motion.div className={styles.formGroup} variants={itemVariants}>
              <label htmlFor="confirmPassword">تأكيد كلمة المرور</label>
              <div className={styles.inputContainer}>
                <input
                  id="confirmPassword"
                  type="password"
                  placeholder="أعد إدخال كلمة المرور"
                  {...register('confirmPassword', {
                    required: 'حقل مطلوب',
                    validate: validatePasswordMatch,
                  })}
                  disabled={isLoading}
                  aria-invalid={errors.confirmPassword ? 'true' : 'false'}
                  aria-describedby={errors.confirmPassword ? 'confirmPassword-error' : undefined}
                />
                <Lock size={20} className={styles.icon} />
              </div>
              {errors.confirmPassword && (
                <motion.span 
                  id="confirmPassword-error"
                  className={styles.error}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  role="alert"
                >
                  {errors.confirmPassword.message}
                </motion.span>
              )}
            </motion.div>

            <motion.button
              type="submit"
              className={styles.submitBtn}
              disabled={isLoading || !newPassword || !confirmPassword}
              whileTap={{ scale: 0.98 }}
              whileHover={{ scale: 1.02 }}
              variants={itemVariants}
            >
              {isLoading ? (
                'جاري الحفظ...'
              ) : (
                <>
                  حفظ كلمة المرور
                  <ArrowRight size={18} style={{ marginRight: '8px' }} />
                </>
              )}
            </motion.button>
          </motion.form>
        )}

        <motion.div 
          className={styles.loginLink}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          تذكرت كلمة المرور؟{' '}
          <Link href="/login" className="hover:underline">
            تسجيل الدخول
          </Link>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}