import { motion, AnimatePresence } from "framer-motion";
import {
    Plus,
    X,
    Search,
} from "lucide-react";
import { PresentationalAgenciesProps } from "@/types/admin/adminAgenciesStore";
import styles from "@/sass/pages/admin/agencies.module.scss";
import AgencyForm from "@/components/admin/AgencyForm";
import Pagination from "@/components/common/Pagination";
import ConfirmationDeleteModal from "@/components/admin/ConfirmationDeleteModal";
import AgenciesTable from "./AgenciesTable";
import { useAgencies } from "@/hooks/useAgencies";


export default function PresentationalAgencies({
    agencies,
    meta,
    isLoading,
    onPageChange,
    onSubmitAgency,
    onDeleteAgency,
    convertAgencyToFormData,
}: PresentationalAgenciesProps) {
    const {
        showModal,
        editingAgency,
        showDeleteModal,
        deleteTarget,
        isDeleting,
        searchTerm,
        filteredAgencies,
        setSearchTerm,
        handleAddAgency,
        handleEditAgency,
        handleCloseModal,
        handleDeleteClick,
        handleConfirmDelete,
        handleCancelDelete,
        handleSubmit,
    } = useAgencies({ agencies, onSubmitAgency, onDeleteAgency });

    return (
        <div className={styles.container}>
            {/* Header */}
            <div className={styles.header}>
                <h1>إدارة الوكالات</h1>
                <p>إدارة معلومات الوكالات العقارية</p>
            </div>

            {/* Actions */}
            <div className={styles.actions}>
                <button className={styles.addButton} onClick={handleAddAgency}>
                    <Plus size={20} />
                    إضافة وكالة جديدة
                </button>

                <div className={styles.searchBox}>
                    <Search size={20} />
                    <input
                        type="text"
                        placeholder="البحث عن وكالة..."
                        name="search"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            {/* Table */}
            <AgenciesTable
                agencies={filteredAgencies}
                loading={isLoading}
                onEdit={handleEditAgency}
                onDelete={handleDeleteClick}
            />

            {/* Pagination */}
            {!isLoading && agencies.length > 0 && (
                <Pagination meta={meta} onPageChange={onPageChange} />
            )}

            {/* Agency Modal */}
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
                                <h2>{editingAgency ? "تعديل وكالة" : "إضافة وكالة جديدة"}</h2>
                                <button
                                    className={styles.closeBtn}
                                    onClick={handleCloseModal}
                                >
                                    <X size={24} />
                                </button>
                            </div>
                            <AgencyForm
                                initialData={editingAgency ? convertAgencyToFormData(editingAgency) : undefined}
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

