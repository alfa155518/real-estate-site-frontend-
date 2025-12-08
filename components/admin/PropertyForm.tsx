import { useForm } from "react-hook-form";
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
  Video as VideoIcon,
} from "lucide-react";
import Image from "next/image";
import { PropertyData, PropertyFormProps } from "@/types/admin/adminPropertiesStore";
import useAdminPropertiesForm from "@/hooks/useAdminPropertiesForm";
import styles from "@/sass/components/common/userAndPropertyForm.module.scss";




export default function PropertyForm({
  initialData,
  onSubmit,
  onCancel,
}: PropertyFormProps) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting, isDirty },
  } = useForm<PropertyData>({
    defaultValues: initialData || {
      type: "sale",
      features: [],
      tags: [],
      is_featured: false,
    },
  });

  // Register images field with validation
  register("images", {
    validate: (value) => {
      // Only require images when creating a new property (no initialData)
      if (!initialData && (!value || value.length === 0)) {
        return "يجب تحميل صورة واحدة على الأقل للعقار";
      }
      return true;
    },
  });

  // Use useAdminPropertiesForm custom hook with form methods
  const {
    handleImageChange,
    handleRemoveImage,
    handleVideoChange,
    handleRemoveVideo,
    videoInputRef,
    fileInputRef,
    imagePreviews,
    videoPreviews,
    features,
    tags,
    addFeature,
    removeFeature,
    addTag,
    removeTag } = useAdminPropertiesForm({ initialData, setValue, watch });


  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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
        {/* Media Upload */}
        <motion.div className={styles.formSection}>
          <h3 className={styles.sectionTitle}>
            <ImageIcon className={styles.sectionIcon} size={20} />
            الوسائط
          </h3>
          <div className={styles.fieldsGrid}>
            {/* Image Upload */}
            <div className={`${styles.formField} ${styles.fullWidth}`}>
              <label>
                {!initialData && <span className={styles.required}>*</span>}
                صور العقار
              </label>
              <div className={styles.uploadContainer}>
                <input
                  type="file"
                  id="property-images"
                  className={styles.fileInput}
                  accept="image/*"
                  multiple
                  onChange={(e) => {
                    handleImageChange(e);
                    // Manually trigger validation
                    setValue("images", watch("images") || [], { shouldValidate: true });
                  }}
                  ref={fileInputRef}
                />
                <label
                  htmlFor="property-images"
                  className={styles.uploadButton}
                >
                  <Upload size={18} />
                  <span>اختر الصور</span>
                </label>
                <span className={styles.hint}>
                  {!initialData
                    ? "يمكنك تحميل حتى 10 صور (JPG, PNG, WEBP) بحد أقصى 5 ميجابايت لكل صورة"
                    : "اختياري - يمكنك تحميل صور جديدة أو الاحتفاظ بالصور الحالية"}
                </span>
              </div>
              {errors.images && (
                <motion.div
                  className={styles.errorMessage}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <AlertCircle size={14} />
                  {errors.images.message as string}
                </motion.div>
              )}
              {/* Image Previews */}
              {imagePreviews.length > 0 && (
                <div className={styles.imagePreviews}>
                  {imagePreviews.map((preview, index) => (
                    <div key={index} className={styles.imagePreview}>
                      <Image
                        src={preview}
                        alt={`Preview ${index + 1}`}
                        width={100}
                        height={100}
                      />
                      <button
                        type="button"
                        className={styles.removeImage}
                        onClick={() => handleRemoveImage(index)}
                        aria-label="حذف الصورة"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Video Upload */}
            <div className={`${styles.formField} ${styles.fullWidth}`}>
              <label>فيديو العقار (اختياري)</label>
              <div className={styles.uploadContainer}>
                <input
                  type="file"
                  id="property-videos"
                  name="videos"
                  className={styles.fileInput}
                  accept="video/*"
                  multiple
                  onChange={handleVideoChange}
                  ref={videoInputRef}
                />
                <label
                  htmlFor="property-videos"
                  className={styles.uploadButton}
                >
                  <VideoIcon size={18} />
                  <span>اختر الفيديوهات</span>
                </label>
                <span className={styles.hint}>
                  يمكنك تحميل عدة فيديوهات (MP4, WEBM) بحد أقصى 50 ميجابايت لكل
                  فيديو
                </span>
              </div>

              {/* Video Previews */}
              {videoPreviews.length > 0 && (
                <div className={styles.videoPreviews}>
                  {videoPreviews.map((preview, index) => (
                    <div key={index} className={styles.videoPreview}>
                      <video controls>
                        <source src={preview} type="video/mp4" />
                        متصفحك لا يدعم تشغيل الفيديو
                      </video>
                      <button
                        type="button"
                        className={styles.removeVideo}
                        onClick={() => handleRemoveVideo(index)}
                        aria-label="حذف الفيديو"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </motion.div>

        {/* Basic Information */}
        <motion.div className={styles.formSection} >
          <h3 className={styles.sectionTitle}>
            <FileText className={styles.sectionIcon} size={20} />
            المعلومات الأساسية
          </h3>
          <div className={styles.fieldsGrid}>
            <div className={`${styles.formField} ${styles.fullWidth}`}>
              <label htmlFor="title">
                <span className={styles.required}>*</span>
                عنوان العقار
              </label>
              <input
                type="text"
                id="title"
                placeholder="أدخل عنوان العقار"
                className={errors.title ? styles.error : ""}
                {...register("title", {
                  required: "العنوان مطلوب.",
                  maxLength: {
                    value: 255,
                    message: "العنوان يجب ألا يتجاوز 255 حرفًا.",
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
              <label htmlFor="owner_id">
                <span className={styles.required}>*</span>
                معرف المالك
              </label>
              <input
                type="number"
                id="owner_id"
                placeholder="أدخل معرف المالك"
                className={errors.owner_id ? styles.error : ""}
                {...register("owner_id", {
                  required: "معرف المالك مطلوب.",
                  valueAsNumber: true,
                  min: { value: 1, message: "معرف المالك يجب أن يكون رقم صحيح." },
                })}
              />
              {errors.owner_id && (
                <motion.div
                  className={styles.errorMessage}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <AlertCircle size={14} />
                  {errors.owner_id.message}
                </motion.div>
              )}
            </div>

            <div className={`${styles.formField} ${styles.fullWidth}`}>
              <label htmlFor="agency_id">
                معرف الوكالة (اختياري)
              </label>
              <input
                type="number"
                id="agency_id"
                placeholder="أدخل معرف الوكالة (اختياري)"
                className={errors.agency_id ? styles.error : ""}
                {...register("agency_id", {
                  setValueAs: (value) => value === "" || value === null ? null : Number(value),
                  min: { value: 1, message: "معرف الوكالة يجب أن يكون رقم صحيح." },
                })}
              />
              {errors.agency_id && (
                <motion.div
                  className={styles.errorMessage}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <AlertCircle size={14} />
                  {errors.agency_id.message}
                </motion.div>
              )}
            </div>

            <div className={`${styles.formField} ${styles.fullWidth}`}>
              <label htmlFor="description">
                <span className={styles.required}>*</span>
                الوصف
              </label>
              <textarea
                id="description"
                placeholder="أدخل وصف تفصيلي للعقار"
                className={errors.description ? styles.error : ""}
                {...register("description", {
                  required: "الوصف مطلوب.",
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
        <motion.div className={styles.formSection} >
          <h3 className={styles.sectionTitle}>
            <Building2 className={styles.sectionIcon} size={20} />
            تفاصيل العقار
          </h3>
          <div className={`${styles.fieldsGrid} ${styles.threeColumns}`}>
            <div className={styles.formField}>
              <label htmlFor="property_type">
                <span className={styles.required}>*</span>
                نوع العقار
              </label>
              <select
                id="property_type"
                className={errors.property_type ? styles.error : ""}
                {...register("property_type", { required: "نوع العقار مطلوب." })}
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
              <label htmlFor="type">
                <span className={styles.required}>*</span>
                نوع العرض
              </label>
              <select
                id="type"
                className={errors.type ? styles.error : ""}
                {...register("type", { required: "نوع العملية مطلوب." })}
              >
                <option value="sale">للبيع</option>
                <option value="rent">للإيجار</option>
              </select>
            </div>

            <div className={styles.formField}>
              <label htmlFor="purpose">
                <span className={styles.required}>*</span>
                الغرض
              </label>
              <select
                id="purpose"
                className={errors.purpose ? styles.error : ""}
                {...register("purpose", { required: "الغرض مطلوب." })}
              >
                <option value="">اختر الغرض</option>
                <option value="residential">سكني</option>
                <option value="commercial">تجاري</option>
                <option value="industrial">صناعي</option>
              </select>
              {errors.purpose && (
                <motion.div
                  className={styles.errorMessage}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <AlertCircle size={14} />
                  {errors.purpose.message}
                </motion.div>
              )}
            </div>

            <div className={styles.formField}>
              <label htmlFor="bedrooms">
                <span className={styles.required}>*</span>
                عدد غرف النوم
              </label>
              <input
                id="bedrooms"
                type="number"
                min="1"
                placeholder="1"
                className={errors.bedrooms ? styles.error : ""}
                {...register("bedrooms", {
                  required: "عدد الغرف مطلوب.",
                  valueAsNumber: true,
                  min: { value: 1, message: "عدد الغرف لا يمكن أن يكون أقل من 1." },
                })}
              />
              {errors.bedrooms && (
                <motion.div
                  className={styles.errorMessage}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <AlertCircle size={14} />
                  {errors.bedrooms.message}
                </motion.div>
              )}
            </div>

            <div className={styles.formField}>
              <label htmlFor="bathrooms">
                <span className={styles.required}>*</span>
                عدد دورات المياه
              </label>
              <input
                id="bathrooms"
                type="number"
                min="1"
                placeholder="1"
                className={errors.bathrooms ? styles.error : ""}
                {...register("bathrooms", {
                  required: "عدد الحمامات مطلوب.",
                  valueAsNumber: true,
                  min: { value: 1, message: "عدد الحمامات لا يمكن أن يكون أقل من 1." },
                })}
              />
              {errors.bathrooms && (
                <motion.div
                  className={styles.errorMessage}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <AlertCircle size={14} />
                  {errors.bathrooms.message}
                </motion.div>
              )}
            </div>

            <div className={styles.formField}>
              <label htmlFor="living_rooms">
                <span className={styles.required}>*</span>
                عدد غرف المعيشة
              </label>
              <input
                id="living_rooms"
                type="number"
                min="1"
                placeholder="1"
                className={errors.living_rooms ? styles.error : ""}
                {...register("living_rooms", {
                  required: "عدد غرف المعيشة مطلوب.",
                  valueAsNumber: true,
                  min: { value: 1, message: "عدد غرف المعيشة لا يمكن أن يكون أقل من 1." },
                })}
              />
              {errors.living_rooms && (
                <motion.div
                  className={styles.errorMessage}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <AlertCircle size={14} />
                  {errors.living_rooms.message}
                </motion.div>
              )}
            </div>

            <div className={styles.formField}>
              <label htmlFor="kitchens">
                <span className={styles.required}>*</span>
                عدد المطابخ
              </label>
              <input
                id="kitchens"
                type="number"
                min="1"
                placeholder="1"
                className={errors.kitchens ? styles.error : ""}
                {...register("kitchens", {
                  required: "عدد المطابخ مطلوب.",
                  valueAsNumber: true,
                  min: { value: 1, message: "عدد المطابخ لا يمكن أن يكون أقل من 1." },
                })}
              />
              {errors.kitchens && (
                <motion.div
                  className={styles.errorMessage}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <AlertCircle size={14} />
                  {errors.kitchens.message}
                </motion.div>
              )}
            </div>

            <div className={styles.formField}>
              <label htmlFor="balconies">
                <span className={styles.required}>*</span>
                عدد الشرفات
              </label>
              <input
                id="balconies"
                type="number"
                min="0"
                placeholder="0"
                className={errors.balconies ? styles.error : ""}
                {...register("balconies", {
                  required: "عدد الشرفات مطلوب.",
                  valueAsNumber: true,
                  min: { value: 0, message: "عدد الشرفات لا يمكن أن يكون أقل من 0." },
                })}
              />
              {errors.balconies && (
                <motion.div
                  className={styles.errorMessage}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <AlertCircle size={14} />
                  {errors.balconies.message}
                </motion.div>
              )}
            </div>

            <div className={styles.formField}>
              <label htmlFor="area_total">
                <span className={styles.required}>*</span>
                المساحة الإجمالية (م²)
              </label>
              <input
                id="area_total"
                type="number"
                placeholder="مثال: 250"
                className={errors.area_total ? styles.error : ""}
                {...register("area_total", {
                  required: "المساحة الإجمالية مطلوبة.",
                  valueAsNumber: true,
                  min: { value: 30, message: "المساحة يجب أن تكون 30 متر مربع على الأقل." },
                })}
              />
              {errors.area_total && (
                <motion.div
                  className={styles.errorMessage}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <AlertCircle size={14} />
                  {errors.area_total.message}
                </motion.div>
              )}
            </div>

            <div className={styles.formField}>
              <label htmlFor="floor">الطابق</label>
              <input
                id="floor"
                type="number"
                placeholder="مثال: 2"
                className={errors.floor ? styles.error : ""}
                {...register("floor", {
                  valueAsNumber: true,
                  min: { value: 0, message: "رقم الدور لا يمكن أن يكون سالب." },
                })}
              />
              {errors.floor && (
                <motion.div
                  className={styles.errorMessage}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <AlertCircle size={14} />
                  {errors.floor.message}
                </motion.div>
              )}
            </div>

            <div className={styles.formField}>
              <label htmlFor="total_floors">إجمالي الطوابق</label>
              <input
                id="total_floors"
                type="number"
                placeholder="مثال: 5"
                className={errors.total_floors ? styles.error : ""}
                {...register("total_floors", {
                  valueAsNumber: true,
                  min: { value: 1, message: "إجمالي الأدوار يجب أن يكون 1 أو أكثر." },
                })}
              />
              {errors.total_floors && (
                <motion.div
                  className={styles.errorMessage}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <AlertCircle size={14} />
                  {errors.total_floors.message}
                </motion.div>
              )}
            </div>

            <div className={styles.formField}>
              <label htmlFor="furnishing">
                <span className={styles.required}>*</span>
                حالة الأثاث
              </label>
              <select
                id="furnishing"
                className={errors.furnishing ? styles.error : ""}
                {...register("furnishing", { required: "حالة الأثاث مطلوبة." })}
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
        <motion.div className={styles.formSection} >
          <h3 className={styles.sectionTitle}>
            <DollarSign className={styles.sectionIcon} size={20} />
            معلومات السعر
          </h3>
          <div className={`${styles.fieldsGrid} ${styles.threeColumns}`}>
            <div className={styles.formField}>
              <label htmlFor="price">
                <span className={styles.required}>*</span>
                السعر
              </label>
              <input
                id="price"
                type="number"
                placeholder="مثال: 500000"
                className={errors.price ? styles.error : ""}
                {...register("price", {
                  required: "السعر مطلوب.",
                  valueAsNumber: true,
                  min: { value: 100000, message: "السعر يجب أن يكون 100000 على الأقل." },
                })}
              />
              {errors.price && (
                <motion.div
                  className={styles.errorMessage}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <AlertCircle size={14} />
                  {errors.price.message}
                </motion.div>
              )}
            </div>
            <div className={styles.formField}>
              <label htmlFor="discounted_price">السعر قبل الخصم</label>
              <input
                id="discounted_price"
                type="text"
                placeholder="مثال: 1000000"
                {...register("discounted_price")}
              />
            </div>
          </div>
        </motion.div>

        {/* Location */}
        <motion.div className={styles.formSection}>
          <h3 className={styles.sectionTitle}>
            <MapPin className={styles.sectionIcon} size={20} />
            الموقع
          </h3>
          <div className={`${styles.fieldsGrid} ${styles.twoColumns}`}>
            <div className={styles.formField}>
              <label htmlFor="city">
                <span className={styles.required}>*</span>
                المدينة
              </label>
              <input
                id="city"
                type="text"
                placeholder="مثال: الرياض"
                {...register("location.city", { required: "المدينة مطلوبة." })}
              />
              {errors.location?.city && (
                <motion.div
                  className={styles.errorMessage}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <AlertCircle size={14} />
                  {errors.location.city.message}
                </motion.div>
              )}
            </div>

            <div className={styles.formField}>
              <label htmlFor="district">
                <span className={styles.required}>*</span>
                الحي
              </label>
              <input
                id="district"
                type="text"
                placeholder="مثال: العليا"
                {...register("location.district", { required: "الحي مطلوب." })}
              />
              {
                errors.location?.district && (
                  <motion.div
                    className={styles.errorMessage}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <AlertCircle size={14} />
                    {errors.location.district.message}
                  </motion.div>
                )
              }
            </div>

            <div className={styles.formField}>
              <label htmlFor="street">
                <span className={styles.required}>*</span>
                الشارع
              </label>
              <input
                id="street"
                type="text"
                placeholder="مثال: شارع الملك فهد"
                {...register("location.street", { required: "الشارع مطلوب." })}
              />
              {
                errors.location?.street && (
                  <motion.div
                    className={styles.errorMessage}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <AlertCircle size={14} />
                    {errors.location.street.message}
                  </motion.div>
                )
              }
            </div>

            <div className={styles.formField}>
              <label htmlFor="landmark">معلم قريب</label>
              <input
                id="landmark"
                type="text"
                placeholder="مثال: بالقرب من برج المملكة"
                {...register("location.landmark")}
              />
              {
                errors.location?.landmark && (
                  <motion.div
                    className={styles.errorMessage}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <AlertCircle size={14} />
                    {errors.location.landmark.message}
                  </motion.div>
                )
              }
            </div>

            <div className={styles.formField}>
              <label htmlFor="latitude">خط العرض</label>
              <input
                id="latitude"
                type="text"
                placeholder="مثال: 24.7136"
                {...register("location.latitude")}
              />
              {
                errors.location?.latitude && (
                  <motion.div
                    className={styles.errorMessage}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <AlertCircle size={14} />
                    {errors.location.latitude.message}
                  </motion.div>
                )
              }
            </div>

            <div className={styles.formField}>
              <label htmlFor="longitude">خط الطول</label>
              <input
                id="longitude"
                type="text"
                placeholder="مثال: 46.6753"
                {...register("location.longitude")}
              />
              {
                errors.location?.longitude && (
                  <motion.div
                    className={styles.errorMessage}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <AlertCircle size={14} />
                    {errors.location.longitude.message}
                  </motion.div>
                )
              }
            </div>
          </div>
        </motion.div>

        {/* Features & Tags */}
        <motion.div className={styles.formSection} >
          <h3 className={styles.sectionTitle}>
            <Building2 className={styles.sectionIcon} size={20} />
            المميزات والوسوم
          </h3>
          <div className={styles.fieldsGrid}>
            <div className={`${styles.formField} ${styles.fullWidth}`}>
              <label htmlFor="features">المميزات</label>
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
                  id="features"
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
              <label htmlFor="tags">الوسوم</label>
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
                  id="tags"
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
              <label htmlFor="status">الحالة</label>
              <select id="status" {...register("status", { required: "حالة العقار مطلوبة." })}>
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
      <motion.div className={styles.formActions} >
        <motion.button
          type="button"
          className={styles.cancelBtn}
          disabled={isSubmitting}
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
          disabled={isSubmitting || !isDirty}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Save size={18} />
          {isSubmitting ? "جاري الحفظ..." : "حفظ العقار"}
        </motion.button>
      </motion.div>
    </motion.form>
  );
}
