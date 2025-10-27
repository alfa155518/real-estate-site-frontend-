"use client";

import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { User, Shield, AlertCircle, Save, X } from "lucide-react";
import styles from "@/sass/components/propertyForm.module.scss";
import { UserFormData } from "@/types/admin";

interface UserFormProps {
  initialData?: Partial<UserFormData>;
  onSubmit: (data: UserFormData) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export default function UserForm({
  initialData,
  onSubmit,
  onCancel,
  isLoading = false,
}: UserFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserFormData>({
    defaultValues: initialData || {
      role: "user",
      is_active: true,
    },
  });

  const isEditMode = !!initialData?.email;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring" as const,
        stiffness: 300,
        damping: 24,
      },
    },
  };

  return (
    <motion.form
      className={styles.propertyForm}
      onSubmit={handleSubmit(onSubmit)}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className={styles.formGrid}>
        {/* Personal Information */}
        <motion.div className={styles.formSection} variants={itemVariants}>
          <h3 className={styles.sectionTitle}>
            <User className={styles.sectionIcon} size={20} />
            المعلومات الشخصية
          </h3>
          <div className={styles.fieldsGrid}>
            <div className={`${styles.formField} ${styles.fullWidth}`}>
              <label htmlFor="name">
                <span className={styles.required}>*</span>
                الاسم الكامل
              </label>
              <input
                type="text"
                id="name"
                autoComplete="name"
                placeholder="أدخل الاسم الكامل"
                className={errors.name ? styles.error : ""}
                {...register("name", {
                  required: "الاسم مطلوب",
                  minLength: {
                    value: 3,
                    message: "الاسم يجب أن يكون 3 أحرف على الأقل",
                  },
                })}
              />
              {errors.name && (
                <motion.div
                  className={styles.errorMessage}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <AlertCircle size={14} />
                  {errors.name.message}
                </motion.div>
              )}
            </div>

            <div className={styles.formField}>
              <label htmlFor="email">
                <span className={styles.required}>*</span>
                البريد الإلكتروني
              </label>
              <input
                type="email"
                id="email"
                autoComplete="email"
                placeholder="example@domain.com"
                className={errors.email ? styles.error : ""}
                disabled={isEditMode}
                {...register("email", {
                  required: "البريد الإلكتروني مطلوب",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "البريد الإلكتروني غير صحيح",
                  },
                })}
              />
              {errors.email && (
                <motion.div
                  className={styles.errorMessage}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <AlertCircle size={14} />
                  {errors.email.message}
                </motion.div>
              )}
            </div>

            <div className={styles.formField}>
              <label htmlFor="phone">رقم الهاتف</label>
              <input
                type="tel"
                id="phone"
                autoComplete="phone"
                placeholder="+966 5XX XXX XXX"
                {...register("phone", {
                  pattern: {
                    value: /^[\d\s+()-]+$/,
                    message: "رقم الهاتف غير صحيح",
                  },
                })}
              />
              {errors.phone && (
                <motion.div
                  className={styles.errorMessage}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <AlertCircle size={14} />
                  {errors.phone.message}
                </motion.div>
              )}
            </div>
            <div className={styles.formField}>
              <label htmlFor="address">العنوان</label>
              <input
                type="text"
                id="address"
                autoComplete="address"
                placeholder="العنوان"
                {...register("address")}
              />
              {errors.address && (
                <motion.div
                  className={styles.errorMessage}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <AlertCircle size={14} />
                  {errors.address.message}
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>

        {/*  Role */}
        <motion.div className={styles.formSection} variants={itemVariants}>
          <h3 className={styles.sectionTitle}>
            <Shield className={styles.sectionIcon} size={20} />
            الصلاحيات
          </h3>
          <div className={styles.fieldsGrid}>
            <div className={styles.formField}>
              <label htmlFor="role">
                <span className={styles.required}>*</span>
                الدور الوظيفي
              </label>
              <select
                id="role"
                className={errors.role ? styles.error : ""}
                {...register("role", { required: "الدور الوظيفي مطلوب" })}
              >
                <option value="user">مستخدم عادي</option>
                <option value="moderator">مشرف</option>
                <option value="admin">مدير</option>
              </select>
              {errors.role && (
                <motion.div
                  className={styles.errorMessage}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <AlertCircle size={14} />
                  {errors.role.message}
                </motion.div>
              )}
            </div>

            <div className={styles.formField}>
              <label htmlFor="is_active">حالة الحساب</label>
              <div className={styles.checkboxGroup}>
                <div className={styles.checkboxItem}>
                  <input
                    type="checkbox"
                    id="is_active"
                    autoComplete="is_active"
                    {...register("is_active")}
                  />
                  <label htmlFor="is_active">حساب نشط</label>
                </div>
              </div>
              <div className={styles.hint}>
                إذا تم إلغاء التفعيل، لن يتمكن المستخدم من تسجيل الدخول
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Form Actions */}
      <motion.div className={styles.formActions} variants={itemVariants}>
        <motion.button
          type="button"
          className={styles.cancelBtn}
          onClick={onCancel}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <X size={18} />
          إلغاء
        </motion.button>
        <motion.button
          type="submit"
          className={styles.submitBtn}
          disabled={isLoading}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Save size={18} />
          {isLoading ? "جاري الحفظ..." : "حفظ المستخدم"}
        </motion.button>
      </motion.div>
    </motion.form>
  );
}
