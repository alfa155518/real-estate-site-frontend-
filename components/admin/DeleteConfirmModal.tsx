"use client";

import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { AlertTriangle, X } from "lucide-react";
import styles from "@/sass/components/common/deletePropertyConfirmModal.module.scss";

interface DeleteConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  propertyTitle: string;
  isDeleting?: boolean;
}

interface DeleteFormData {
  confirmText: string;
}

export default function DeleteConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  propertyTitle,
  isDeleting = false,
}: DeleteConfirmModalProps) {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<DeleteFormData>();

  const confirmText = watch("confirmText");
  const isConfirmValid = confirmText === "حذف";

  const onSubmit = () => {
    if (isConfirmValid) {
      onConfirm();
      reset();
    }
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <motion.div
      className={styles.modalOverlay}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={handleClose}
    >
      <motion.div
        className={styles.modalContent}
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.modalHeader}>
          <div className={styles.iconWrapper}>
            <AlertTriangle size={24} />
          </div>
          <h2>تأكيد الحذف</h2>
          <button
            className={styles.closeBtn}
            onClick={handleClose}
            aria-label="إغلاق"
            type="button"
          >
            <X size={20} />
          </button>
        </div>

        <div className={styles.modalBody}>
          <p className={styles.warningText}>
            هل أنت متأكد من حذف العقار التالي؟
          </p>
          <div className={styles.propertyName}>
            <strong>{propertyTitle}</strong>
          </div>
          <p className={styles.cautionText}>
            ⚠️ هذا الإجراء لا يمكن التراجع عنه. سيتم حذف جميع البيانات المرتبطة
            بهذا العقار نهائياً.
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className={styles.confirmForm}>
            <div className={styles.formField}>
              <label htmlFor="confirmText">
                للتأكيد، اكتب كلمة <strong>&quot;حذف&quot;</strong> في الحقل أدناه:
              </label>
              <input
                type="text"
                id="confirmText"
                placeholder='اكتب "حذف" للتأكيد'
                className={errors.confirmText ? styles.error : ""}
                {...register("confirmText", {
                  required: "يجب كتابة كلمة حذف للتأكيد",
                  validate: (value) =>
                    value === "حذف" || 'يجب كتابة "حذف" بالضبط',
                })}
                autoComplete="off"
                disabled={isDeleting}
              />
              {errors.confirmText && (
                <span className={styles.errorMessage}>
                  {errors.confirmText.message}
                </span>
              )}
            </div>

            <div className={styles.modalActions}>
              <button
                type="button"
                className={styles.cancelBtn}
                onClick={handleClose}
                disabled={isDeleting}
              >
                إلغاء
              </button>
              <button
                type="submit"
                className={styles.deleteBtn}
                disabled={!isConfirmValid || isDeleting}
              >
                {isDeleting ? "جاري الحذف..." : "حذف نهائياً"}
              </button>
            </div>
          </form>
        </div>
      </motion.div>
    </motion.div>
  );
}
