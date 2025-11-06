import { useForm } from "react-hook-form";
import { User, Shield, AlertCircle, Save, X, Loader2 } from "lucide-react";
import { UserFormData, UserFormProps } from "@/types/admin/adminManageUsers";
import styles from "@/sass/components/common/userAndPropertyForm.module.scss";

export default function UserForm({
  initialData,
  onSubmit,
  onCancel,
}: UserFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isSubmitting },
  } = useForm<UserFormData>({
    defaultValues: initialData,
  });

  const isEditMode = !!initialData?.email;

  return (
    <form className={styles.propertyForm} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.formGrid}>
        {/* Personal Information */}
        <div className={styles.formSection}>
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
                disabled={isEditMode}
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
                <div className={styles.errorMessage}>
                  <AlertCircle size={14} />
                  {errors.name.message}
                </div>
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
                <div className={styles.errorMessage}>
                  <AlertCircle size={14} />
                  {errors.email.message}
                </div>
              )}
            </div>

            <div className={styles.formField}>
              <label htmlFor="phone">رقم الهاتف</label>
              <input
                type="tel"
                id="phone"
                autoComplete="phone"
                placeholder="+966 5XX XXX XXX"
                disabled={isEditMode}
                {...register("phone", {
                  pattern: {
                    value: /^[\d\s+()-]+$/,
                    message: "رقم الهاتف غير صحيح",
                  },
                })}
              />
              {errors.phone && (
                <div className={styles.errorMessage}>
                  <AlertCircle size={14} />
                  {errors.phone.message}
                </div>
              )}
            </div>
            <div className={styles.formField}>
              <label htmlFor="address">العنوان</label>
              <input
                type="text"
                disabled={isEditMode}
                id="address"
                autoComplete="address"
                placeholder="العنوان"
                {...register("address")}
              />
              {errors.address && (
                <div className={styles.errorMessage}>
                  <AlertCircle size={14} />
                  {errors.address.message}
                </div>
              )}
            </div>
          </div>
        </div>

        {/*  Role */}
        <div className={styles.formSection}>
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
                <option value="admin">مدير</option>
              </select>
              {errors.role && (
                <div className={styles.errorMessage}>
                  <AlertCircle size={14} />
                  {errors.role.message}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Form Actions */}
      <div className={styles.formActions}>
        <button
          type="button"
          className={styles.cancelBtn}
          disabled={isSubmitting}
          onClick={onCancel}
        >
          <X size={18} />
          إلغاء
        </button>
        <button
          type="submit"
          className={styles.submitBtn}
          disabled={isSubmitting || !isDirty}
        >
          <Save size={18} />
          {isSubmitting ? (
            <Loader2 size={18} className={styles.smallSpinner} />
          ) : (
            "حفظ المستخدم"
          )}
        </button>
      </div>
    </form>
  );
}
