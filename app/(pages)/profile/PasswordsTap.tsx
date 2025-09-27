import { Lock } from "lucide-react";
import styles from "@/sass/pages/profile/profile.module.scss";
import useUserProfile from "@/hooks/useUserProfile";

export default function PasswordsTap() {
  // User Profile Custom Hook
  const {
    registerPassword,
    handlePasswordSubmit,
    passwordErrors,
    isSubmittingPassword,
    onPasswordSubmit,
  } = useUserProfile();
  return (
    <form onSubmit={handlePasswordSubmit(onPasswordSubmit)}>
      <div className={styles.formGroup}>
        <label htmlFor="current_password">
          <Lock size={18} />
          كلمة المرور الحالية
        </label>
        <input
          id="current_password"
          type="password"
          autoComplete="current-password"
          {...registerPassword("current_password", {
            required: "كلمة المرور الحالية مطلوبة",
            minLength: {
              value: 6,
              message: "يجب أن تكون كلمة المرور 6 أحرف على الأقل",
            },
          })}
          className={`${styles.input} ${
            passwordErrors.current_password ? styles.error : ""
          }`}
        />
        {passwordErrors.current_password && (
          <span className={styles.errorMessage}>
            {passwordErrors.current_password.message}
          </span>
        )}
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="password">
          <Lock size={18} />
          كلمة المرور الجديدة
        </label>
        <input
          id="password"
          type="password"
          autoComplete="new-password"
          {...registerPassword("password", {
            required: "كلمة المرور الجديدة مطلوبة",
            minLength: {
              value: 6,
              message: "يجب أن تكون كلمة المرور 6 أحرف على الأقل",
            },
          })}
          className={`${styles.input} ${
            passwordErrors.password ? styles.error : ""
          }`}
        />
        {passwordErrors.password && (
          <span className={styles.errorMessage}>
            {passwordErrors.password.message}
          </span>
        )}
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="confirm_password">
          <Lock size={18} />
          تأكيد كلمة المرور
        </label>
        <input
          id="confirm_password"
          type="password"
          autoComplete="new-password"
          {...registerPassword("confirm_password", {
            required: "تأكيد كلمة المرور مطلوب",
          })}
          className={`${styles.input} ${
            passwordErrors.confirm_password ? styles.error : ""
          }`}
        />
        {passwordErrors.confirm_password && (
          <span className={styles.errorMessage}>
            {passwordErrors.confirm_password.message}
          </span>
        )}
      </div>

      <div className={styles.formActions}>
        <button
          type="submit"
          className={`${styles.button} ${styles.saveButton}`}
          disabled={isSubmittingPassword}
        >
          {isSubmittingPassword ? "جاري التحديث..." : "تغيير كلمة المرور"}
        </button>
      </div>
    </form>
  );
}
