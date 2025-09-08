'use client';

import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { Mail, Lock, Loader2, LogIn } from 'lucide-react';
import { FcGoogle } from 'react-icons/fc';
import Link from 'next/link';
import styles from '@/sass/pages/login.module.scss';

type FormData = {
  email: string;
  password: string;
  rememberMe: boolean;
};

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  });

  const onSubmit = async (data: FormData) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    console.log('Form submitted:', data);
    // Here you would typically send the data to your API
  };

  const handleGoogleSignIn = () => {
    // Implement Google Sign In
    console.log('Sign in with Google');
  };

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className={styles.container}>
      <motion.div 
        className={styles.card}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div 
          className={styles.logo}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h1>تسجيل الدخول</h1>
          <p>مرحباً بعودتك! يرجى تسجيل الدخول إلى حسابك</p>
        </motion.div>

        <motion.form 
          onSubmit={handleSubmit(onSubmit)}
          variants={container}
          initial="hidden"
          animate="show"
        >
          <motion.div className={styles.formGroup} variants={item}>
            <label htmlFor="email">البريد الإلكتروني</label>
            <div className={styles.inputContainer}>
              <input
                id="email"
                type="email"
                autoComplete='email'
                placeholder="example@example.com"
                {...register('email', {
                  required: 'البريد الإلكتروني مطلوب',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'البريد الإلكتروني غير صالح'
                  }
                })}
                disabled={isSubmitting}
              />
              <Mail className={styles.icon} size={18} />
            </div>
            {errors.email && (
              <span className={styles.error}>{errors.email.message}</span>
            )}
          </motion.div>

          <motion.div className={styles.formGroup} variants={item}>
            <div className={styles.inputLabelContainer}>
              <label htmlFor="password">كلمة المرور</label>
              <Link href="/forget-password" className={styles.forgotPassword}>
                نسيت كلمة المرور؟
              </Link>
            </div>
            <div className={styles.inputContainer}>
              <input
                id="password"
                type="password"
                autoComplete='current-password'
                placeholder="••••••••"
                {...register('password', {
                  required: 'كلمة المرور مطلوبة',
                  minLength: {
                    value: 8,
                    message: 'يجب أن تتكون كلمة المرور من 8 أحرف على الأقل'
                  }
                })}
                disabled={isSubmitting}
              />
              <Lock className={styles.icon} size={18} />
            </div>
            {errors.password && (
              <span className={styles.error}>{errors.password.message}</span>
            )}
          </motion.div>

          <motion.div className={styles.rememberMe} variants={item}>
            <label className={styles.checkboxContainer}>
              <input
                type="checkbox"
                {...register('rememberMe')}
                disabled={isSubmitting}
              />
              <span className={styles.checkmark}></span>
              تذكرني
            </label>
          </motion.div>

          <motion.div variants={item}>
            <button
              type="submit"
              className={styles.submitBtn}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="animate-spin" />
                    جاري تسجيل الدخول...
                </>
              ) : (
                <>
                  <LogIn size={18} />
                  تسجيل الدخول
                </>
              )}
            </button>
          </motion.div>
        </motion.form>

        <motion.div 
          className={styles.divider}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <span>أو</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <button
            type="button"
            className={styles.googleBtn}
            onClick={handleGoogleSignIn}
            disabled={isSubmitting}
          >
            <FcGoogle size={20} />
            تسجيل الدخول بحساب جوجل
          </button>
        </motion.div>

        <motion.p 
          className={styles.signupLink}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          ليس لديك حساب؟{' '}
          <Link href="/signup">
            إنشاء حساب جديد
          </Link>
        </motion.p>
      </motion.div>
    </div>
  );
};

export default Login;