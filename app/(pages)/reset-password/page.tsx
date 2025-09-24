"use client";

import { motion, Variants } from "framer-motion";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import styles from "@/sass/pages/reset-password.module.scss";
import useResetPassword from "@/hooks/useResetPassword";

const ResetPassword = () => {
  // reset password custom hook
  const {
    showPassword,
    showConfirmPassword,
    setShowPassword,
    setShowConfirmPassword,
    password,
    register,
    handleSubmit,
    errors,
    isSubmitting,
    onSubmit,
  } = useResetPassword();

  const containerVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1] as const, // Using const assertion to ensure type safety
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 10 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.1 * i,
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1] as const, // Using const assertion to ensure type safety
      },
    }),
  };

  return (
    <div className={styles.container}>
      <motion.div
        className={styles.card}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1 className={styles.title} variants={itemVariants} custom={0}>
          إعادة تعيين كلمة المرور
        </motion.h1>

        <motion.p
          className="text-gray-600 text-center mb-8 text-2xl"
          variants={itemVariants}
          custom={1}
        >
          الرجاء إدخال كلمة المرور الجديدة
        </motion.p>

        <form onSubmit={handleSubmit(onSubmit)}>
          <motion.div
            className={styles.formGroup}
            variants={itemVariants}
            custom={2}
          >
            <label htmlFor="password" className={styles.label}>
              كلمة المرور الجديدة
            </label>
            <div className={styles.inputContainer}>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                className={`${styles.input} ${
                  errors.password ? "border-red-500" : ""
                }`}
                placeholder="أدخل كلمة المرور الجديدة"
                {...register("password", {
                  required: "كلمة المرور مطلوبة",
                  minLength: {
                    value: 8,
                    message: "يجب أن تكون كلمة المرور 8 أحرف على الأقل",
                  },
                })}
                dir="ltr"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className={styles.togglePassword}
                aria-label={
                  showPassword ? "إخفاء كلمة المرور" : "إظهار كلمة المرور"
                }
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {errors.password && (
              <span className={styles.error}>{errors.password.message}</span>
            )}
          </motion.div>

          <motion.div
            className={styles.formGroup}
            variants={itemVariants}
            custom={3}
          >
            <label htmlFor="confirm_password" className={styles.label}>
              تأكيد كلمة المرور
            </label>
            <div className={styles.inputContainer}>
              <input
                id="confirm_password"
                type={showConfirmPassword ? "text" : "password"}
                className={`${styles.input} ${
                  errors.confirm_password ? "border-red-500" : ""
                }`}
                placeholder="تأكيد كلمة المرور الجديدة"
                {...register("confirm_password", {
                  required: "يرجى تأكيد كلمة المرور",
                  validate: (value) =>
                    value === password || "كلمة المرور غير متطابقة",
                })}
                dir="ltr"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className={styles.togglePassword}
                aria-label={
                  showConfirmPassword
                    ? "إخفاء كلمة المرور"
                    : "إظهار كلمة المرور"
                }
              >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {errors.confirm_password && (
              <span className={styles.error}>
                {errors.confirm_password.message}
              </span>
            )}
          </motion.div>

          <motion.div variants={itemVariants} custom={4}>
            <button
              type="submit"
              className={styles.button}
              disabled={isSubmitting}
            >
              <span>
                {isSubmitting && (
                  <Loader2 className="animate-spin mx-auto" size={24} />
                )}
                {isSubmitting ? "جاري التحديث..." : "تحديث كلمة المرور"}
              </span>
            </button>
          </motion.div>
        </form>
      </motion.div>
    </div>
  );
};

export default ResetPassword;
