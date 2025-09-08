'use client';

import { useForm, SubmitHandler, FieldError } from 'react-hook-form';
import { motion, Variants } from 'framer-motion';
import { useState } from 'react';
import Link from 'next/link';
import { Mail, ArrowRight, CheckCircle } from 'lucide-react';
import styles from '@/sass/pages/forget-password.module.scss';

// Define form data type with TypeScript
type FormData = {
  email: string;
};

// Define error type for form fields
type FormFieldError = FieldError | undefined;

// Define animation variants with proper typing
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
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    mode: 'onBlur', // Validate on blur
    defaultValues: {
      email: '',
    },
  });

  const onSubmit: SubmitHandler<FormData> = async (data: FormData) => {
    try {
      setIsLoading(true);
      // Simulate API call
      await new Promise<void>((resolve) => setTimeout(resolve, 1500));
      console.log('Password reset requested for:', data.email);
      setIsSubmitted(true);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Get typed error for email field
  const emailError: FormFieldError = errors.email;

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
          <h1>إعادة تعيين كلمة المرور</h1>
          <p>أدخل بريدك الإلكتروني لإرسال رابط إعادة التعيين</p>
        </motion.div>

        {isSubmitted ? (
          <motion.div
            className={styles.successMessage}
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <CheckCircle size={20} />
            <span>تم إرسال رابط إعادة تعيين كلمة المرور إلى بريدك الإلكتروني</span>
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
              <label htmlFor="email">البريد الإلكتروني</label>
              <div className={styles.inputContainer}>
                <input
                  id="email"
                  type="email"
                  placeholder="example@example.com"
                  {...register('email', {
                    required: 'البريد الإلكتروني مطلوب',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'البريد الإلكتروني غير صالح',
                    },
                  })}
                  disabled={isLoading}
                  aria-invalid={emailError ? 'true' : 'false'}
                  aria-describedby={emailError ? 'email-error' : undefined}
                />
                <Mail size={20} className={styles.icon} />
              </div>
              {emailError && (
                <motion.span 
                  id="email-error"
                  className={styles.error}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  role="alert"
                >
                  {emailError.message}
                </motion.span>
              )}
            </motion.div>

            <motion.button
              type="submit"
              className={styles.submitBtn}
              disabled={isLoading}
              whileTap={{ scale: 0.98 }}
              whileHover={{ scale: 1.02 }}
              variants={itemVariants}
            >
              {isLoading ? (
                'جاري الإرسال...'
              ) : (
                <>
                  إرسال رابط التعيين
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