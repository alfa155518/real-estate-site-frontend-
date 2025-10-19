"use client";

import { motion } from "framer-motion";
import { Mail, Lock, Loader2, LogIn } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import Link from "next/link";
import styles from "@/sass/pages/login.module.scss";
import useSignup from "@/hooks/useSignup";
import useLogin from "@/hooks/useLogin";
import {
  LoginContainer,
  LoginItem,
} from "@/components/animations/loginAnimations";

export default function LoginForm() {
  // Login custom hook
  const { register, handleSubmit, errors, isSubmitting, onSubmit } = useLogin();

  // Signup custom hook
  const { handleGoogleSignIn, googleSubmitting } = useSignup();
  return (
    <>
      <motion.form
        onSubmit={handleSubmit(onSubmit)}
        variants={LoginContainer}
        initial="hidden"
        animate="show"
      >
        <motion.div className={styles.formGroup} variants={LoginItem}>
          <label htmlFor="email">البريد الإلكتروني</label>
          <div className={styles.inputContainer}>
            <input
              id="email"
              type="email"
              autoComplete="email"
              placeholder="example@example.com"
              {...register("email", {
                required: "البريد الإلكتروني مطلوب",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "البريد الإلكتروني غير صالح",
                },
              })}
              disabled={isSubmitting}
            />
            <Mail className={styles.icon} size={18} />
          </div>
          {errors.email && (
            <span className={styles.error}>{errors.email.message}</span>
          )}
        </motion.div>

        <motion.div className={styles.formGroup} variants={LoginItem}>
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
              autoComplete="current-password"
              placeholder="••••••••"
              {...register("password", {
                required: "كلمة المرور مطلوبة",
                minLength: {
                  value: 8,
                  message: "يجب أن تتكون كلمة المرور من 8 أحرف على الأقل",
                },
              })}
              disabled={isSubmitting}
            />
            <Lock className={styles.icon} size={18} />
          </div>
          {errors.password && (
            <span className={styles.error}>{errors.password.message}</span>
          )}
        </motion.div>
        <motion.div variants={LoginItem}>
          <button
            type="submit"
            className={styles.submitBtn}
            disabled={isSubmitting || googleSubmitting}
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
          disabled={googleSubmitting || isSubmitting}
        >
          {googleSubmitting ? (
            <Loader2 className="animate-spin" />
          ) : (
            <>
              <FcGoogle size={20} />
              تسجيل الدخول بحساب جوجل
            </>
          )}
        </button>
      </motion.div>

      <motion.p
        className={styles.signupLink}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        ليس لديك حساب؟ <Link href="/signup">إنشاء حساب جديد</Link>
      </motion.p>
    </>
  );
}
