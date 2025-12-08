import { motion, AnimatePresence } from "framer-motion";
import { Plus, X, Search, } from "lucide-react";
import { PresentationalOwnersProps } from "@/types/admin/adminOwnersStore";
import styles from "@/sass/pages/admin/owners.module.scss";
import OwnerForm from "@/components/admin/OwnerForm";
import Pagination from "@/components/common/Pagination";
import { useOwners } from "@/hooks/useOwners";
import OwnersTable from "./OwnersTable";
import ConfirmationDeleteModal from "@/components/admin/ConfirmationDeleteModal";


export default function PresentationalOwners({
    owners,
    meta,
    isLoading,
    onPageChange,
    onSubmitOwner,
    onDeleteOwner,
    convertOwnerToFormData,
}: PresentationalOwnersProps) {

    // Custom hook for owners management
    const {
        showModal,
        editingOwner,
        showDeleteModal,
        deleteTarget,
        isDeleting,
        searchTerm,
        filteredOwners,
        setSearchTerm,
        handleAddOwner,
        handleEditOwner,
        handleCloseModal,
        handleDeleteClick,
        handleConfirmDelete,
        handleCancelDelete,
        handleSubmit,
    } = useOwners({ owners, onSubmitOwner, onDeleteOwner });

    return (
        <div className={styles.container}>
            {/* Header */}
            <div className={styles.header}>
                <h1>إدارة الملاك</h1>
                <p>إدارة معلومات ملاك العقارات</p>
            </div>

            {/* Actions */}
            <div className={styles.actions}>
                <button className={styles.addButton} onClick={handleAddOwner}>
                    <Plus size={20} />
                    إضافة مالك جديد
                </button>

                <div className={styles.searchBox}>
                    <Search size={20} />
                    <input
                        type="text"
                        placeholder="البحث عن مالك..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            {/* Table */}
            <OwnersTable
                owners={filteredOwners}
                loading={isLoading}
                onEdit={handleEditOwner}
                onDelete={handleDeleteClick}
            />

            {/* Pagination */}
            {!isLoading && owners.length > 0 && (
                <Pagination meta={meta} onPageChange={onPageChange} />
            )}

            {/* Owner Modal */}
            <AnimatePresence>
                {showModal && (
                    <motion.div
                        className={styles.modal}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={handleCloseModal}
                    >
                        <motion.div
                            className={styles.modalContent}
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className={styles.modalHeader}>
                                <h2>{editingOwner ? "تعديل مالك" : "إضافة مالك جديد"}</h2>
                                <button
                                    className={styles.closeBtn}
                                    onClick={handleCloseModal}
                                >
                                    <X size={24} />
                                </button>
                            </div>
                            <OwnerForm
                                initialData={editingOwner ? convertOwnerToFormData(editingOwner) : undefined}
                                onSubmit={handleSubmit}
                                onCancel={handleCloseModal}
                                isLoading={isLoading}
                            />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Delete Confirmation Modal */}
            <AnimatePresence>
                {showDeleteModal && deleteTarget && (
                    <ConfirmationDeleteModal
                        deleteTarget={deleteTarget}
                        handleCancelDelete={handleCancelDelete}
                        handleConfirmDelete={handleConfirmDelete}
                        isDeleting={isDeleting}
                    />
                )}
            </AnimatePresence>
        </div>
    );
}

