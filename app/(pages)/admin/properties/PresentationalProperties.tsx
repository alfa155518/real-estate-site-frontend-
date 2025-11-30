import { motion, AnimatePresence, Variants } from "framer-motion";
import { Plus, Filter, X, Home } from "lucide-react";
import PropertyForm from "@/components/admin/PropertyForm";
import DeleteConfirmModal from "@/components/admin/DeleteConfirmModal";
import RealEstateCard from "@/components/common/RealEstateCard";
import SkeletonRealEstateCard from "@/components/common/SkeletonRealEstateCard";
import Pagination from "@/components/common/Pagination";
import { PresentationalPropertiesProps } from "@/types/admin/adminPropertiesStore";
import styles from "@/sass/pages/adminProperties.module.scss";



export default function PresentationalProperties({
    filteredProperties,
    meta,
    isLoading,
    showModal,
    showDeleteModal,
    editingProperty,
    propertyToDelete,
    isDeleting,
    showFilters,
    filters,
    handleAddProperty,
    handleEditProperty,
    handleDeleteClick,
    handleConfirmDelete,
    handleCancelDelete,
    handleSubmit,
    handlePageChange,
    handleFilterChange,
    resetFilters,
    setShowFilters,
    setShowModal,
    convertToFormData,
}: PresentationalPropertiesProps) {

    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    };

    return (
        <div className={styles.propertiesPage}>
            {/* Page Header */}
            <motion.div
                className={styles.pageHeader}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <div className={styles.headerLeft}>
                    <h1>إدارة العقارات</h1>
                    <p>عرض وإدارة جميع العقارات في النظام</p>
                </div>
                <div className={styles.headerRight}>
                    <motion.button
                        className={styles.filterBtn}
                        onClick={() => setShowFilters(!showFilters)}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <Filter size={18} />
                        تصفية
                    </motion.button>
                    <motion.button
                        className={styles.addBtn}
                        onClick={handleAddProperty}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <Plus size={18} />
                        إضافة عقار جديد
                    </motion.button>
                </div>
            </motion.div>

            {/* Filters Bar */}
            <AnimatePresence>
                {showFilters && (
                    <motion.div
                        className={styles.filtersBar}
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className={styles.filtersGrid}>
                            <div className={styles.filterGroup}>
                                <label htmlFor="property_type">نوع العقار</label>
                                <select
                                    id="property_type"
                                    name="property_type"
                                    value={filters.property_type}
                                    onChange={handleFilterChange}
                                >
                                    <option value="">الكل</option>
                                    <option value="apartment">شقة</option>
                                    <option value="villa">فيلا</option>
                                    <option value="chalet">شاليه</option>
                                    <option value="office">مكتب</option>
                                    <option value="studio">استوديو</option>
                                </select>
                            </div>
                            <div className={styles.filterGroup}>
                                <label htmlFor="type">نوع العرض</label>
                                <select
                                    id="type"
                                    name="type"
                                    value={filters.type}
                                    onChange={handleFilterChange}
                                >
                                    <option value="">الكل</option>
                                    <option value="sale">للبيع</option>
                                    <option value="rent">للإيجار</option>
                                </select>
                            </div>
                            <div className={styles.filterGroup}>
                                <label htmlFor="status">الحالة</label>
                                <select
                                    id="status"
                                    name="status"
                                    value={filters.status}
                                    onChange={handleFilterChange}
                                >
                                    <option value="">الكل</option>
                                    <option value="available">متاح</option>
                                    <option value="sold">مباع</option>
                                    <option value="rented">مؤجر</option>
                                </select>
                            </div>
                            <div className={styles.filterGroup}>
                                <label htmlFor="city">المدينة</label>
                                <input
                                    type="text"
                                    id="city"
                                    name="city"
                                    value={filters.city}
                                    onChange={handleFilterChange}
                                    placeholder="ابحث عن مدينة..."
                                />
                            </div>
                            <div className={styles.filterActions}>
                                <button className={styles.resetBtn} onClick={resetFilters}>
                                    إعادة تعيين
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Properties Grid */}
            {isLoading ? (
                <SkeletonRealEstateCard count={meta.per_page} gridClassName={styles.propertiesGrid} />
            ) : filteredProperties.length > 0 ? (
                <>
                    <motion.div
                        className={styles.propertiesGrid}
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        {filteredProperties.map((property, index) => (
                            <RealEstateCard
                                property={property}
                                image={property.images[0].image_url}
                                key={property.id}
                                index={index}
                            >
                                <RealEstateCard.actions
                                    property={property}
                                    handleEditProperty={handleEditProperty}
                                    handleDeleteProperty={handleDeleteClick}
                                />
                            </RealEstateCard>
                        ))}
                    </motion.div>
                    <Pagination meta={meta} onPageChange={handlePageChange} />
                </>
            ) : (
                <motion.div
                    className={styles.emptyState}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className={styles.emptyIcon}>
                        <Home size={80} />
                    </div>
                    <h3>لا توجد عقارات</h3>
                    <p>ابدأ بإضافة عقار جديد للنظام</p>
                    <motion.button
                        className={styles.addBtn}
                        onClick={handleAddProperty}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Plus size={18} />
                        إضافة عقار جديد
                    </motion.button>
                </motion.div>
            )}

            {/* Property Form Modal */}
            <AnimatePresence>
                {showModal && (
                    <motion.div
                        className={styles.modal}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setShowModal(false)}
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
                                <h2>{editingProperty ? "تعديل العقار" : "إضافة عقار جديد"}</h2>
                                <motion.button
                                    className={styles.closeBtn}
                                    onClick={() => setShowModal(false)}
                                    whileHover={{ scale: 1.1, rotate: 90 }}
                                    whileTap={{ scale: 0.9 }}
                                >
                                    <X size={20} />
                                </motion.button>
                            </div>
                            <div className={styles.modalBody}>
                                <PropertyForm
                                    initialData={
                                        editingProperty
                                            ? convertToFormData(editingProperty)
                                            : undefined
                                    }
                                    onSubmit={handleSubmit}
                                    onCancel={() => setShowModal(false)}
                                />
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Delete Confirmation Modal */}
            <AnimatePresence>
                {showDeleteModal && propertyToDelete && (
                    <DeleteConfirmModal
                        isOpen={showDeleteModal}
                        onClose={handleCancelDelete}
                        onConfirm={handleConfirmDelete}
                        propertyTitle={propertyToDelete.title}
                        isDeleting={isDeleting}
                    />
                )}
            </AnimatePresence>
        </div>
    );
}
