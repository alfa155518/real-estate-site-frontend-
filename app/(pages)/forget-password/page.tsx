"use client";

import { motion, Variants } from "framer-motion";
import Link from "next/link";
import { Mail, ArrowRight } from "lucide-react";
import styles from "@/sass/pages/forget-password.module.scss";
import useForgetPassword from "@/hooks/useForgetPassword";

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
      type: "spring",
      stiffness: 100,
      damping: 15,
    },
  },
};

export default function ForgetPassword() {
  // forget password custom hook
  const { register, handleSubmit, isSubmitting, onSubmit, emailError } =
    useForgetPassword();

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
        transition={{ duration: 0.5, ease: "easeOut" }}
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
                autoComplete="email"
                {...register("email", {
                  required: "البريد الإلكتروني مطلوب",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "البريد الإلكتروني غير صالح",
                  },
                })}
                disabled={isSubmitting}
                aria-invalid={emailError ? "true" : "false"}
                aria-describedby={emailError ? "email-error" : undefined}
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
            disabled={isSubmitting}
            whileTap={{ scale: 0.98 }}
            whileHover={{ scale: 1.02 }}
            variants={itemVariants}
          >
            {isSubmitting ? (
              "جاري الإرسال..."
            ) : (
              <>
                إرسال رابط التعيين
                <ArrowRight size={18} style={{ marginRight: "8px" }} />
              </>
            )}
          </motion.button>
        </motion.form>

        <motion.div
          className={styles.loginLink}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          تذكرت كلمة المرور؟{" "}
          <Link href="/login" className="hover:underline">
            تسجيل الدخول
          </Link>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
