"use client";

import { useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { Plus, Filter, X, Video, Play, Home } from "lucide-react";
import styles from "@/sass/pages/adminProperties.module.scss";
import PropertyForm from "@/components/admin/PropertyForm";
import { PropertyFormData } from "@/types/admin";
import { RealEstate } from "@/types/real-estate";
import RealEstateCard from "@/components/common/RealEstateCard";

// Updated mock data
import { realEstateData } from "@/data/real-estate";

export default function PropertiesPage() {
  const [properties, setProperties] = useState<RealEstate[]>(realEstateData);
  const [showModal, setShowModal] = useState(false);
  const [editingProperty, setEditingProperty] = useState<RealEstate | null>(
    null
  );
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    property_type: "",
    type: "",
    status: "",
    city: "",
  });

  const handleAddProperty = () => {
    setEditingProperty(null);
    setShowModal(true);
  };

  const handleEditProperty = (property: RealEstate) => {
    setEditingProperty(property);
    setShowModal(true);
  };

  const handleDeleteProperty = (property: RealEstate) => {
    if (confirm(`هل أنت متأكد من حذف العقار "${property.title}"؟`)) {
      setProperties(properties.filter((p) => p.id !== property.id));
    }
  };

  const handleSubmit = (data: PropertyFormData) => {
    console.log("Form data:", data);
    setShowModal(false);
    setEditingProperty(null);
  };

  // Handle filter changes
  const handleFilterChange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Apply filters to properties
  const filteredProperties = properties.filter((property) => {
    return (
      (filters.property_type === "" ||
        property.property_type === filters.property_type) &&
      (filters.type === "" || property.type === filters.type) &&
      (filters.status === "" || property.status === filters.status) &&
      (filters.city === "" ||
        property.location.city
          .toLowerCase()
          .includes(filters.city.toLowerCase()))
    );
  });

  // Reset all filters
  const resetFilters = () => {
    setFilters({
      property_type: "",
      type: "",
      status: "",
      city: "",
    });
  };

  // Convert RealEstate to PropertyFormData format (updated for new fields if needed)
  const convertToFormData = (
    property: RealEstate
  ): Partial<PropertyFormData> => {
    return {
      title: property.title,
      description: property.description,
      price: property.price,
      currency: property.currency,
      discount: property.discount,
      type: property.type,
      purpose: property.purpose,
      property_type: property.property_type,
      bedrooms: property.bedrooms,
      bathrooms: property.bathrooms,
      living_rooms: property.living_rooms,
      kitchens: property.kitchens,
      balconies: property.balconies,
      area_total: property.area_total,
      features: property.features,
      tags: property.tags,
      floor: property.floor,
      total_floors: property.total_floors,
      furnishing: property.furnishing,
      status: property.status,
      is_featured: property.is_featured,
      owner_id: property.owner.id,
      agency_id: property.agency?.id,
      location: {
        city: property.location.city,
        district: property.location.district,
        street: property.location.street,
        latitude: property.location.latitude,
        longitude: property.location.longitude,
        landmark: property.location.landmark ?? undefined,
      },
      // Add video if form supports it
      video_url: property.videos?.[0]?.video_url,
    };
  };

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
      {filteredProperties.length > 0 ? (
        <motion.div
          className={styles.propertiesGrid}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {filteredProperties.slice(0, 3).map((property, index) => (
            <RealEstateCard
              property={property}
              image={property.images[0].image_url}
              key={property.id}
              index={index}
            >
              <RealEstateCard.actions
                property={property}
                handleEditProperty={handleEditProperty}
                handleDeleteProperty={handleDeleteProperty}
              />
            </RealEstateCard>
          ))}
        </motion.div>
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
    </div>
  );
}
