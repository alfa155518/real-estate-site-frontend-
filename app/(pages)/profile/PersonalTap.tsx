import { User, Mail, Phone, MapPin, Edit2, Check, X } from "lucide-react";

import styles from "@/sass/pages/profile/profile.module.scss";
import useUserProfile from "@/hooks/useUserProfile";

export default function PersonalTap() {
  // user profile custom hook
  const {
    isEditing,
    setIsEditing,
    registerPersonal,
    handlePersonalSubmit,
    personalErrors,
    isSubmittingPersonal,
    handleCancelEdit,
    onPersonalSubmit,
  } = useUserProfile();
  return (
    <form onSubmit={handlePersonalSubmit(onPersonalSubmit)}>
      <div className={styles.formGroup}>
        <label htmlFor="name">
          <User size={18} />
          الاسم الكامل
        </label>
        <input
          id="name"
          type="text"
          disabled={!isEditing}
          autoComplete="name"
          {...registerPersonal("name", {
            required: "الاسم مطلوب",
            minLength: {
              value: 3,
              message: "يجب أن يكون الاسم 3 أحرف على الأقل",
            },
          })}
          className={`${styles.input} ${
            personalErrors.name ? styles.error : ""
          }`}
        />
        {personalErrors.name && (
          <span className={styles.errorMessage}>
            {personalErrors.name.message}
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
          autoComplete="email"
          {...registerPersonal("email", {
            required: "البريد الإلكتروني مطلوب",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "البريد الإلكتروني غير صالح",
            },
          })}
          className={`${styles.input} ${
            personalErrors.email ? styles.error : ""
          }`}
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
          autoComplete="tel"
          {...registerPersonal("phone", {
            required: "رقم الهاتف مطلوب",
            minLength: {
              value: 10,
              message: "رقم الهاتف غير صالح",
            },
          })}
          className={`${styles.input} ${
            personalErrors.phone ? styles.error : ""
          }`}
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
          autoComplete="address"
          {...registerPersonal("address", {
            required: "العنوان مطلوب",
            minLength: {
              value: 5,
              message: "العنوان قصير جداً",
            },
          })}
          className={`${styles.input} ${
            personalErrors.address ? styles.error : ""
          }`}
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
              disabled={isSubmittingPersonal}
            >
              <X size={18} />
              إلغاء
            </button>
            <button
              type="submit"
              className={`${styles.button} ${styles.saveButton}`}
              disabled={isSubmittingPersonal}
            >
              {isSubmittingPersonal ? (
                "جاري الحفظ..."
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
  );
}
