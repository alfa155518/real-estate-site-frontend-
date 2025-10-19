"use client";

import { motion } from "framer-motion";
import { User, Mail, Phone, Lock, Loader2, ArrowRight } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import Link from "next/link";
import styles from "@/sass/pages/signup.module.scss";
import useSignup from "@/hooks/useSignup";
import {
  SignupContainer,
  SignupItem,
} from "@/components/animations/signupAnimations";

export default function SignupForm() {
  // Signup custom hook
  const {
    register,
    handleSubmit,
    handleGoogleSignIn,
    errors,
    isSubmitting,
    onSubmit,
    googleSubmitting,
  } = useSignup();

  return (
    <>
      <motion.form
        onSubmit={handleSubmit(onSubmit)}
        variants={SignupContainer}
        initial="hidden"
        animate="show"
      >
        <motion.div className={styles.formGroup} variants={SignupItem}>
          <label htmlFor="name">الاسم الكامل</label>
          <div className={styles.inputContainer}>
            <input
              id="name"
              type="text"
              autoComplete="name"
              placeholder="أدخل اسمك الكامل"
              {...register("name", {
                required: "الاسم مطلوب",
                minLength: {
                  value: 2,
                  message: "يجب أن يكون الاسم مكون من حرفين على الأقل",
                },
                maxLength: {
                  value: 50,
                  message: "يجب ألا يزيد الاسم عن 50 حرفًا",
                },
              })}
              disabled={isSubmitting}
            />
            <User className={styles.icon} size={20} />
          </div>
          {errors.name && <p className={styles.error}>{errors.name.message}</p>}
        </motion.div>

        <motion.div className={styles.formGroup} variants={SignupItem}>
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
            <Mail className={styles.icon} size={20} />
          </div>
          {errors.email && (
            <p className={styles.error}>{errors.email.message}</p>
          )}
        </motion.div>

        <motion.div className={styles.formGroup} variants={SignupItem}>
          <label htmlFor="phone">رقم الجوال</label>
          <div className={styles.inputContainer}>
            <input
              id="phone"
              type="tel"
              autoComplete="tel"
              placeholder="011XXXXXXXX"
              {...register("phone", {
                required: "رقم الهاتف مطلوب",
                minLength: {
                  value: 11,
                  message: "يجب أن يتكون رقم الهاتف من 11 أرقام على الأقل",
                },
                pattern: {
                  value: /^[0-9]+$/,
                  message: "يجب أن يحتوي رقم الهاتف على أرقام فقط",
                },
              })}
              disabled={isSubmitting}
            />
            <Phone className={styles.icon} size={20} />
          </div>
          {errors.phone && (
            <p className={styles.error}>{errors.phone.message}</p>
          )}
        </motion.div>

        <motion.div className={styles.formGroup} variants={SignupItem}>
          <label htmlFor="password">كلمة المرور</label>
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
            <Lock className={styles.icon} size={20} />
          </div>
          {errors.password && (
            <p className={styles.error}>{errors.password.message}</p>
          )}
        </motion.div>

        <motion.div className={styles.formGroup} variants={SignupItem}>
          <label htmlFor="confirm_password">تأكيد كلمة المرور</label>
          <div className={styles.inputContainer}>
            <input
              id="confirm_password"
              type="password"
              autoComplete="current-password"
              placeholder="••••••••"
              {...register("confirm_password", {
                required: "تأكيد كلمة المرور مطلوب",
              })}
              disabled={isSubmitting}
            />
            <Lock className={styles.icon} size={20} />
          </div>
          {errors.confirm_password && (
            <p className={styles.error}>{errors.confirm_password.message}</p>
          )}
        </motion.div>

        <motion.div variants={SignupItem}>
          <button
            type="submit"
            className={styles.submitBtn}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <Loader2 className="animate-spin mx-auto" size={24} />
            ) : (
              <span>
                إنشاء حساب <ArrowRight className="inline mr-1" size={18} />
              </span>
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
            <Loader2 className="animate-spin mx-auto" size={24} />
          ) : (
            <>
              <FcGoogle className={styles.googleIcon} />
              <span>التسجيل بحساب جوجل</span>
            </>
          )}
        </button>
      </motion.div>

      <motion.p
        className={styles.loginLink}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        لديك حساب بالفعل؟
        <Link href="/login">تسجيل الدخول</Link>
      </motion.p>
    </>
  );
}
