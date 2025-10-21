"use client";

import { useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import {
  Plus,
  Filter,
  Edit,
  Trash2,
  Eye,
  MapPin,
  Bed,
  Bath,
  Maximize,
  X,
} from "lucide-react";
import styles from "@/sass/pages/adminProperties.module.scss";
import PropertyForm from "@/components/admin/PropertyForm";
import { PropertyFormData } from "@/types/admin";
import { RealEstate } from "@/types/real-estate";

// Mock data
const mockProperties: RealEstate[] = [
  {
    id: 1,
    title: "فيلا فاخرة في حي الياسمين",
    slug: "luxury-villa-yasmin",
    description: "فيلا رائعة مع حديقة واسعة ومسبح خاص",
    price: "2500000",
    currency: "SAR",
    discount: "0",
    discounted_price: null,
    discount_percentage: null,
    type: "sale",
    purpose: "residential",
    property_type: "villa",
    bedrooms: 5,
    bathrooms: 4,
    living_rooms: 2,
    kitchens: 1,
    balconies: 3,
    area_total: "450",
    features: ["مسبح", "حديقة", "موقف سيارات"],
    tags: ["فاخر", "عائلي"],
    floor: null,
    total_floors: 2,
    furnishing: "furnished",
    status: "available",
    views: 1234,
    likes: 89,
    is_featured: true,
    created_at: "2024-01-15",
    updated_at: "2024-01-15",
    owner: {
      id: 1,
      name: "أحمد محمد",
      phone: "+966501234567",
      email: "ahmed@example.com",
      type: "individual",
    },
    agency: null,
    location: {
      id: 1,
      city: "الرياض",
      district: "الياسمين",
      street: "شارع الملك فهد",
      latitude: "24.7136",
      longitude: "46.6753",
      landmark: "بالقرب من برج المملكة",
    },
    images: [],
  },
  {
    id: 2,
    title: "شقة عصرية في برج الفيصلية",
    slug: "modern-apartment-faisaliah",
    description: "شقة بإطلالة رائعة على المدينة",
    price: "850000",
    currency: "SAR",
    discount: "50000",
    discounted_price: "800000",
    discount_percentage: "5.88",
    type: "sale",
    purpose: "residential",
    property_type: "apartment",
    bedrooms: 3,
    bathrooms: 2,
    living_rooms: 1,
    kitchens: 1,
    balconies: 1,
    area_total: "180",
    features: ["إطلالة بانورامية", "أمن 24 ساعة", "نادي رياضي"],
    tags: ["عصري", "مركزي"],
    floor: 15,
    total_floors: 30,
    furnishing: "semi-furnished",
    status: "available",
    views: 987,
    likes: 67,
    is_featured: false,
    created_at: "2024-01-14",
    updated_at: "2024-01-14",
    owner: {
      id: 2,
      name: "سارة أحمد",
      phone: "+966507654321",
      email: "sara@example.com",
      type: "individual",
    },
    agency: null,
    location: {
      id: 2,
      city: "الرياض",
      district: "العليا",
      street: "شارع العليا العام",
      latitude: "24.6877",
      longitude: "46.6857",
      landmark: "برج الفيصلية",
    },
    images: [],
  },
];

export default function PropertiesPage() {
  const [properties, setProperties] = useState<RealEstate[]>(mockProperties);
  const [showModal, setShowModal] = useState(false);
  const [editingProperty, setEditingProperty] = useState<RealEstate | null>(
    null
  );
  const [showFilters, setShowFilters] = useState(false);

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
    // Here you would typically send the data to your API
    setShowModal(false);
    setEditingProperty(null);
  };

  // Convert RealEstate to PropertyFormData format
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
        landmark: property.location.landmark ?? undefined, // Convert null to undefined
      },
    };
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
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
          >
            <div className={styles.filtersGrid}>
              <div className={styles.filterGroup}>
                <label>نوع العقار</label>
                <select>
                  <option value="">الكل</option>
                  <option value="apartment">شقة</option>
                  <option value="villa">فيلا</option>
                  <option value="house">منزل</option>
                  <option value="land">أرض</option>
                </select>
              </div>
              <div className={styles.filterGroup}>
                <label>نوع العرض</label>
                <select>
                  <option value="">الكل</option>
                  <option value="sale">للبيع</option>
                  <option value="rent">للإيجار</option>
                </select>
              </div>
              <div className={styles.filterGroup}>
                <label>الحالة</label>
                <select>
                  <option value="">الكل</option>
                  <option value="available">متاح</option>
                  <option value="sold">مباع</option>
                  <option value="rented">مؤجر</option>
                </select>
              </div>
              <div className={styles.filterGroup}>
                <label>المدينة</label>
                <input type="text" placeholder="ابحث عن مدينة..." />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Properties Grid */}
      {properties.length > 0 ? (
        <motion.div
          className={styles.propertiesGrid}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {properties.map((property) => (
            <motion.div
              key={property.id}
              className={styles.propertyCard}
              variants={itemVariants}
              whileHover={{ y: -5 }}
            >
              <div className={styles.propertyImage}>
                <span
                  className={`${styles.badge} ${
                    property.is_featured
                      ? styles.featured
                      : styles[property.type]
                  }`}
                >
                  {property.is_featured
                    ? "⭐ مميز"
                    : property.type === "sale"
                    ? "للبيع"
                    : "للإيجار"}
                </span>
              </div>

              <div className={styles.propertyContent}>
                <div className={styles.propertyHeader}>
                  <h3 className={styles.propertyTitle}>{property.title}</h3>
                  <div className={styles.propertyLocation}>
                    <MapPin size={14} />
                    {property.location.city}, {property.location.district}
                  </div>
                </div>

                <div className={styles.propertyFeatures}>
                  <div className={styles.feature}>
                    <Bed size={16} />
                    {property.bedrooms}
                  </div>
                  <div className={styles.feature}>
                    <Bath size={16} />
                    {property.bathrooms}
                  </div>
                  <div className={styles.feature}>
                    <Maximize size={16} />
                    {property.area_total} م²
                  </div>
                </div>

                <div className={styles.propertyFooter}>
                  <div className={styles.propertyPrice}>
                    {property.discounted_price || property.price}{" "}
                    {property.currency === "SAR" ? "ر.س" : property.currency}
                  </div>
                  <div className={styles.propertyActions}>
                    <motion.button
                      className={styles.editBtn}
                      onClick={() => handleEditProperty(property)}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Edit size={18} />
                    </motion.button>
                    <motion.button
                      className={styles.deleteBtn}
                      onClick={() => handleDeleteProperty(property)}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Trash2 size={18} />
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <motion.div
          className={styles.emptyState}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <div className={styles.emptyIcon}>🏠</div>
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
