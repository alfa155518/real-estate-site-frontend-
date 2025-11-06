import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import styles from "@/sass/pages/admin/users.module.scss";
import UserForm from "./UserForm";
import { UserFormData, UserModalProps } from "@/types/admin/adminManageUsers";

export default function UserModal({
  showModal,
  setShowModal,
  editingUser,
  handleSubmit,
}: UserModalProps) {
  return (
    <AnimatePresence>
      {showModal && (
        <motion.div
          className={styles.modal}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setShowModal(false)}
        >
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.modalHeader}>
              <h2>تعديل المستخدم</h2>
              <button
                className={styles.closeBtn}
                onClick={() => setShowModal(false)}
              >
                <X size={20} />
              </button>
            </div>
            <div className={styles.modalBody}>
              <UserForm
                initialData={editingUser ?? ({} as Partial<UserFormData>)}
                onSubmit={handleSubmit}
                onCancel={() => setShowModal(false)}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
