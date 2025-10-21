"use client";

import { useForm, Controller } from "react-hook-form";
import { motion } from "framer-motion";
import {
  Building2,
  MapPin,
  DollarSign,
  FileText,
  Image as ImageIcon,
  X,
  Upload,
  AlertCircle,
  Save,
} from "lucide-react";
import styles from "@/sass/components/propertyForm.module.scss";
import { PropertyFormData } from "@/types/admin";

interface PropertyFormProps {
  initialData?: Partial<PropertyFormData>;
  onSubmit: (data: PropertyFormData) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export default function PropertyForm({
  initialData,
  onSubmit,
  onCancel,
  isLoading = false,
}: PropertyFormProps) {
  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useForm<PropertyFormData>({
    defaultValues: initialData || {
      type: "sale",
      currency: "SAR",
      features: [],
      tags: [],
      is_featured: false,
    },
  });

  const features = watch("features") || [];
  const tags = watch("tags") || [];

  const addFeature = (feature: string) => {
    if (feature && !features.includes(feature)) {
      setValue("features", [...features, feature]);
    }
  };

  const removeFeature = (feature: string) => {
    setValue(
      "features",
      features.filter((f) => f !== feature)
    );
  };

  const addTag = (tag: string) => {
    if (tag && !tags.includes(tag)) {
      setValue("tags", [...tags, tag]);
    }
  };

  const removeTag = (tag: string) => {
    setValue(
      "tags",
      tags.filter((t) => t !== tag)
    );
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

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring" as const,
        stiffness: 300,
        damping: 24,
      },
    },
  };

  return (
    <motion.form
      className={styles.propertyForm}
      onSubmit={handleSubmit(onSubmit)}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className={styles.formGrid}>
        {/* Basic Information */}
        <motion.div className={styles.formSection} variants={itemVariants}>
          <h3 className={styles.sectionTitle}>
            <FileText className={styles.sectionIcon} size={20} />
            المعلومات الأساسية
          </h3>
          <div className={styles.fieldsGrid}>
            <div className={`${styles.formField} ${styles.fullWidth}`}>
              <label>
                <span className={styles.required}>*</span>
                عنوان العقار
              </label>
              <input
                type="text"
                placeholder="أدخل عنوان العقار"
                className={errors.title ? styles.error : ""}
                {...register("title", {
                  required: "عنوان العقار مطلوب",
                  minLength: {
                    value: 10,
                    message: "العنوان يجب أن يكون 10 أحرف على الأقل",
                  },
                })}
              />
              {errors.title && (
                <motion.div
                  className={styles.errorMessage}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <AlertCircle size={14} />
                  {errors.title.message}
                </motion.div>
              )}
            </div>

            <div className={`${styles.formField} ${styles.fullWidth}`}>
              <label>
                <span className={styles.required}>*</span>
                الوصف
              </label>
              <textarea
                placeholder="أدخل وصف تفصيلي للعقار"
                className={errors.description ? styles.error : ""}
                {...register("description", {
                  required: "الوصف مطلوب",
                  minLength: {
                    value: 50,
                    message: "الوصف يجب أن يكون 50 حرف على الأقل",
                  },
                })}
              />
              {errors.description && (
                <motion.div
                  className={styles.errorMessage}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <AlertCircle size={14} />
                  {errors.description.message}
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>

        {/* Property Details */}
        <motion.div className={styles.formSection} variants={itemVariants}>
          <h3 className={styles.sectionTitle}>
            <Building2 className={styles.sectionIcon} size={20} />
            تفاصيل العقار
          </h3>
          <div className={`${styles.fieldsGrid} ${styles.threeColumns}`}>
            <div className={styles.formField}>
              <label>
                <span className={styles.required}>*</span>
                نوع العقار
              </label>
              <select
                className={errors.property_type ? styles.error : ""}
                {...register("property_type", { required: "نوع العقار مطلوب" })}
              >
                <option value="">اختر نوع العقار</option>
                <option value="apartment">شقة</option>
                <option value="villa">فيلا</option>
                <option value="house">منزل</option>
                <option value="land">أرض</option>
                <option value="commercial">تجاري</option>
                <option value="office">مكتب</option>
              </select>
              {errors.property_type && (
                <motion.div
                  className={styles.errorMessage}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <AlertCircle size={14} />
                  {errors.property_type.message}
                </motion.div>
              )}
            </div>

            <div className={styles.formField}>
              <label>
                <span className={styles.required}>*</span>
                نوع العرض
              </label>
              <select
                className={errors.type ? styles.error : ""}
                {...register("type", { required: "نوع العرض مطلوب" })}
              >
                <option value="sale">للبيع</option>
                <option value="rent">للإيجار</option>
              </select>
            </div>

            <div className={styles.formField}>
              <label>
                <span className={styles.required}>*</span>
                الغرض
              </label>
              <select
                className={errors.purpose ? styles.error : ""}
                {...register("purpose", { required: "الغرض مطلوب" })}
              >
                <option value="">اختر الغرض</option>
                <option value="residential">سكني</option>
                <option value="commercial">تجاري</option>
                <option value="industrial">صناعي</option>
              </select>
            </div>

            <div className={styles.formField}>
              <label>
                <span className={styles.required}>*</span>
                عدد غرف النوم
              </label>
              <input
                type="number"
                min="0"
                placeholder="0"
                className={errors.bedrooms ? styles.error : ""}
                {...register("bedrooms", {
                  required: "عدد غرف النوم مطلوب",
                  min: { value: 0, message: "القيمة يجب أن تكون 0 أو أكثر" },
                })}
              />
            </div>

            <div className={styles.formField}>
              <label>
                <span className={styles.required}>*</span>
                عدد دورات المياه
              </label>
              <input
                type="number"
                min="0"
                placeholder="0"
                className={errors.bathrooms ? styles.error : ""}
                {...register("bathrooms", {
                  required: "عدد دورات المياه مطلوب",
                  min: { value: 0, message: "القيمة يجب أن تكون 0 أو أكثر" },
                })}
              />
            </div>

            <div className={styles.formField}>
              <label>عدد غرف المعيشة</label>
              <input
                type="number"
                min="0"
                placeholder="0"
                {...register("living_rooms")}
              />
            </div>

            <div className={styles.formField}>
              <label>عدد المطابخ</label>
              <input
                type="number"
                min="0"
                placeholder="0"
                {...register("kitchens")}
              />
            </div>

            <div className={styles.formField}>
              <label>عدد الشرفات</label>
              <input
                type="number"
                min="0"
                placeholder="0"
                {...register("balconies")}
              />
            </div>

            <div className={styles.formField}>
              <label>
                <span className={styles.required}>*</span>
                المساحة الإجمالية (م²)
              </label>
              <input
                type="text"
                placeholder="مثال: 250"
                className={errors.area_total ? styles.error : ""}
                {...register("area_total", { required: "المساحة مطلوبة" })}
              />
            </div>

            <div className={styles.formField}>
              <label>الطابق</label>
              <input
                type="number"
                placeholder="مثال: 2"
                {...register("floor")}
              />
            </div>

            <div className={styles.formField}>
              <label>إجمالي الطوابق</label>
              <input
                type="number"
                placeholder="مثال: 5"
                {...register("total_floors")}
              />
            </div>

            <div className={styles.formField}>
              <label>
                <span className={styles.required}>*</span>
                حالة الأثاث
              </label>
              <select
                className={errors.furnishing ? styles.error : ""}
                {...register("furnishing", { required: "حالة الأثاث مطلوبة" })}
              >
                <option value="">اختر حالة الأثاث</option>
                <option value="furnished">مفروش</option>
                <option value="semi-furnished">نصف مفروش</option>
                <option value="unfurnished">غير مفروش</option>
              </select>
            </div>
          </div>
        </motion.div>

        {/* Price Information */}
        <motion.div className={styles.formSection} variants={itemVariants}>
          <h3 className={styles.sectionTitle}>
            <DollarSign className={styles.sectionIcon} size={20} />
            معلومات السعر
          </h3>
          <div className={`${styles.fieldsGrid} ${styles.threeColumns}`}>
            <div className={styles.formField}>
              <label>
                <span className={styles.required}>*</span>
                السعر
              </label>
              <input
                type="text"
                placeholder="مثال: 500000"
                className={errors.price ? styles.error : ""}
                {...register("price", { required: "السعر مطلوب" })}
              />
            </div>

            <div className={styles.formField}>
              <label>
                <span className={styles.required}>*</span>
                العملة
              </label>
              <select {...register("currency")}>
                <option value="SAR">ريال سعودي (SAR)</option>
                <option value="USD">دولار أمريكي (USD)</option>
                <option value="EUR">يورو (EUR)</option>
              </select>
            </div>

            <div className={styles.formField}>
              <label>نسبة الخصم (%)</label>
              <input
                type="text"
                placeholder="مثال: 10"
                {...register("discount")}
              />
            </div>
          </div>
        </motion.div>

        {/* Location */}
        <motion.div className={styles.formSection} variants={itemVariants}>
          <h3 className={styles.sectionTitle}>
            <MapPin className={styles.sectionIcon} size={20} />
            الموقع
          </h3>
          <div className={`${styles.fieldsGrid} ${styles.twoColumns}`}>
            <div className={styles.formField}>
              <label>
                <span className={styles.required}>*</span>
                المدينة
              </label>
              <input
                type="text"
                placeholder="مثال: الرياض"
                {...register("location.city", { required: "المدينة مطلوبة" })}
              />
            </div>

            <div className={styles.formField}>
              <label>
                <span className={styles.required}>*</span>
                الحي
              </label>
              <input
                type="text"
                placeholder="مثال: العليا"
                {...register("location.district", { required: "الحي مطلوب" })}
              />
            </div>

            <div className={styles.formField}>
              <label>
                <span className={styles.required}>*</span>
                الشارع
              </label>
              <input
                type="text"
                placeholder="مثال: شارع الملك فهد"
                {...register("location.street", { required: "الشارع مطلوب" })}
              />
            </div>

            <div className={styles.formField}>
              <label>معلم قريب</label>
              <input
                type="text"
                placeholder="مثال: بالقرب من برج المملكة"
                {...register("location.landmark")}
              />
            </div>

            <div className={styles.formField}>
              <label>خط العرض</label>
              <input
                type="text"
                placeholder="مثال: 24.7136"
                {...register("location.latitude")}
              />
            </div>

            <div className={styles.formField}>
              <label>خط الطول</label>
              <input
                type="text"
                placeholder="مثال: 46.6753"
                {...register("location.longitude")}
              />
            </div>
          </div>
        </motion.div>

        {/* Features & Tags */}
        <motion.div className={styles.formSection} variants={itemVariants}>
          <h3 className={styles.sectionTitle}>
            <Building2 className={styles.sectionIcon} size={20} />
            المميزات والوسوم
          </h3>
          <div className={styles.fieldsGrid}>
            <div className={`${styles.formField} ${styles.fullWidth}`}>
              <label>المميزات</label>
              <div className={styles.tagsInput}>
                {features.map((feature) => (
                  <motion.span
                    key={feature}
                    className={styles.tag}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                  >
                    {feature}
                    <button
                      type="button"
                      onClick={() => removeFeature(feature)}
                    >
                      <X size={14} />
                    </button>
                  </motion.span>
                ))}
                <input
                  type="text"
                  placeholder="أضف ميزة واضغط Enter"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      const value = e.currentTarget.value.trim();
                      if (value) {
                        addFeature(value);
                        e.currentTarget.value = "";
                      }
                    }
                  }}
                />
              </div>
              <div className={styles.hint}>
                مثال: مسبح، حديقة، موقف سيارات، أمن 24 ساعة
              </div>
            </div>

            <div className={`${styles.formField} ${styles.fullWidth}`}>
              <label>الوسوم</label>
              <div className={styles.tagsInput}>
                {tags.map((tag) => (
                  <motion.span
                    key={tag}
                    className={styles.tag}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                  >
                    {tag}
                    <button type="button" onClick={() => removeTag(tag)}>
                      <X size={14} />
                    </button>
                  </motion.span>
                ))}
                <input
                  type="text"
                  placeholder="أضف وسم واضغط Enter"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      const value = e.currentTarget.value.trim();
                      if (value) {
                        addTag(value);
                        e.currentTarget.value = "";
                      }
                    }
                  }}
                />
              </div>
            </div>

            <div className={styles.formField}>
              <label>الحالة</label>
              <select {...register("status")}>
                <option value="available">متاح</option>
                <option value="sold">مباع</option>
                <option value="rented">مؤجر</option>
                <option value="pending">قيد الانتظار</option>
              </select>
            </div>

            <div className={styles.formField}>
              <div className={styles.checkboxGroup}>
                <div className={styles.checkboxItem}>
                  <input
                    type="checkbox"
                    id="is_featured"
                    {...register("is_featured")}
                  />
                  <label htmlFor="is_featured">عقار مميز</label>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Form Actions */}
      <motion.div className={styles.formActions} variants={itemVariants}>
        <motion.button
          type="button"
          className={styles.cancelBtn}
          onClick={onCancel}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <X size={18} />
          إلغاء
        </motion.button>
        <motion.button
          type="submit"
          className={styles.submitBtn}
          disabled={isLoading}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Save size={18} />
          {isLoading ? "جاري الحفظ..." : "حفظ العقار"}
        </motion.button>
      </motion.div>
    </motion.form>
  );
}
