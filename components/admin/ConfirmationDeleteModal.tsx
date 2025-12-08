import { motion } from "framer-motion";
import { AlertTriangle } from "lucide-react";
import styles from "@/sass/components/ui/confirmationDeleteModal.module.scss";



export default function ConfirmationDeleteModal({
    deleteTarget,
    handleCancelDelete,
    handleConfirmDelete,
    isDeleting,
}: {
    deleteTarget: {
        name: string;
    };
    handleCancelDelete: () => void;
    handleConfirmDelete: () => void;
    isDeleting: boolean;
}) {
    return (
        <motion.div
            className={`${styles.modal} ${styles.deleteModal}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleCancelDelete}
        >
            <motion.div
                className={styles.modalContent}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
            >
                <div className={styles.deleteIcon}>
                    <AlertTriangle size={40} />
                </div>
                <h2>تأكيد الحذف</h2>
                <p>
                    هل أنت متأكد من حذف <strong>{deleteTarget.name}</strong>؟
                    <br />
                    لا يمكن التراجع عن هذا الإجراء.
                </p>
                <div className={styles.deleteActions}>
                    <button
                        className={styles.cancelBtn}
                        onClick={handleCancelDelete}
                        disabled={isDeleting}
                    >
                        إلغاء
                    </button>
                    <button
                        className={styles.confirmBtn}
                        onClick={handleConfirmDelete}
                        disabled={isDeleting}
                    >
                        {isDeleting ? (
                            <>
                                جاري الحذف...
                            </>
                        ) : (
                            "حذف"
                        )}
                    </button>
                </div>
            </motion.div>
        </motion.div>
    );
}