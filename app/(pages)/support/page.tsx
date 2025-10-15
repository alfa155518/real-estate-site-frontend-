"use client";

import { Controller } from "react-hook-form";
import dynamic from "next/dynamic";
import Image from "next/image";

import SectionName from "@/components/common/SectionName";
import styles from "@/sass/pages/support.module.scss";
import useUsersSupport from "@/hooks/useUsersSupport";

// Dynamically import icons
const AlertCircle = dynamic(() =>
  import("lucide-react").then((mod) => mod.AlertCircle)
);
const Send = dynamic(() => import("lucide-react").then((mod) => mod.Send));
const AlertTriangle = dynamic(() =>
  import("lucide-react").then((mod) => mod.AlertTriangle)
);
const Upload = dynamic(() => import("lucide-react").then((mod) => mod.Upload));
const X = dynamic(() => import("lucide-react").then((mod) => mod.X));

export default function Support() {
  // user support custom hook
  const {
    MAX_IMAGES,
    register,
    handleSubmit,
    control,
    errors,
    isSubmitting,
    onSubmit,
    selectedFiles,
    previewUrls,
    handleFileChange,
    removeImage,
  } = useUsersSupport();
  return (
    <div className={styles.supportPage} dir="rtl">
      <SectionName
        title="تواصل مع الدعم الفني"
        subtitle="نحن هنا لمساعدتك! يرجى ملء النموذج أدناه وسنقوم بالرد عليك في أقرب وقت ممكن."
      />
      <div className={styles.container}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className={styles.formGrid}
          encType="multipart/form-data"
        >
          <div className={styles.formGroup}>
            <label htmlFor="name">الاسم الكامل *</label>
            <div
              className={`${styles.inputWrapper} ${
                errors.name ? styles.error : ""
              }`}
            >
              <input
                id="name"
                autoComplete="name"
                type="text"
                {...register("name", { required: "يرجى إدخال الاسم" })}
                placeholder="أدخل اسمك الكامل"
              />
              {errors.name && <AlertCircle className={styles.inputIcon} />}
            </div>
            {errors.name && (
              <span className={styles.errorMessage}>{errors.name.message}</span>
            )}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="email">البريد الإلكتروني *</label>
            <div
              className={`${styles.inputWrapper} ${
                errors.email ? styles.error : ""
              }`}
            >
              <input
                id="email"
                autoComplete="email"
                type="email"
                {...register("email", {
                  required: "يرجى إدخال البريد الإلكتروني",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "البريد الإلكتروني غير صالح",
                  },
                })}
                placeholder="example@example.com"
              />
              {errors.email && <AlertCircle className={styles.inputIcon} />}
            </div>
            {errors.email && (
              <span className={styles.errorMessage}>
                {errors.email.message}
              </span>
            )}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="phone">رقم الجوال *</label>
            <div className={styles.inputWrapper}>
              <input
                id="phone"
                autoComplete="phone"
                type="tel"
                {...register("phone", {
                  required: "يرجى إدخال رقم الجوال",
                  pattern: {
                    value: /^[0-9+\s-]+$/,
                    message: "رقم الجوال غير صالح",
                  },
                })}
                placeholder="0115637890"
              />
            </div>
            {errors.phone && (
              <span className={styles.errorMessage}>
                {errors.phone.message}
              </span>
            )}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="priority">أولوية الطلب *</label>
            <Controller
              name="priority"
              control={control}
              render={({ field }) => (
                <div className={styles.radioGroup}>
                  {[
                    { value: "low", label: "منخفضة", color: "#4CAF50" },
                    { value: "medium", label: "متوسطة", color: "#FFC107" },
                    { value: "high", label: "عاجل", color: "#F44336" },
                  ].map((option) => (
                    <label
                      htmlFor={`priority-${option.value}`}
                      key={option.value}
                      className={styles.radioLabel}
                    >
                      <input
                        type="radio"
                        autoComplete="priority"
                        id={`priority-${option.value}`}
                        {...field}
                        value={option.value}
                        checked={field.value === option.value}
                      />
                      <span
                        className={styles.radioCustom}
                        style={
                          {
                            "--radio-color": option.color,
                          } as React.CSSProperties
                        }
                      ></span>
                      {option.label}
                    </label>
                  ))}
                </div>
              )}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="subject">عنوان الرسالة *</label>
            <div
              className={`${styles.inputWrapper} ${
                errors.subject ? styles.error : ""
              }`}
            >
              <input
                id="subject"
                autoComplete="subject"
                type="text"
                {...register("subject", {
                  required: "يرجى إدخال عنوان الرسالة",
                })}
                placeholder="مثال: مشكلة في تسجيل الدخول"
              />
              {errors.subject && <AlertCircle className={styles.inputIcon} />}
            </div>
            {errors.subject && (
              <span className={styles.errorMessage}>
                {errors.subject.message}
              </span>
            )}
          </div>

          <div className={`${styles.formGroup} ${styles.fullWidth}`}>
            <label htmlFor="message">تفاصيل المشكلة أو الاستفسار *</label>
            <div
              className={`${styles.textareaWrapper} ${
                errors.message ? styles.error : ""
              }`}
            >
              <textarea
                id="message"
                autoComplete="message"
                rows={5}
                {...register("message", {
                  required: "يرجى إدخال تفاصيل المشكلة",
                  minLength: {
                    value: 10,
                    message: "يجب أن يكون النص 10 أحرف على الأقل",
                  },
                })}
                placeholder="يرجى وصف مشكلتك أو استفسارك بالتفصيل..."
              ></textarea>
              {errors.message && (
                <AlertCircle className={styles.textareaIcon} />
              )}
            </div>
            {errors.message && (
              <span className={styles.errorMessage}>
                {errors.message.message}
              </span>
            )}
          </div>

          <div className={`${styles.formGroup} ${styles.fullWidth}`}>
            <label htmlFor="images">
              إرفاق صور (اختياري - يمكن تحميل عدة صور)
            </label>
            <div className={styles.fileUpload}>
              <label className={styles.fileUploadLabel}>
                <div className={styles.uploadArea}>
                  <Upload size={30} />
                  <span>
                    اختر صور متعددة أو اسحبها هنا (الحد الأقصى {MAX_IMAGES} صور)
                  </span>
                </div>
                <input
                  id="images"
                  type="file"
                  className={styles.fileInput}
                  accept="image/*"
                  multiple
                  onChange={handleFileChange}
                />
              </label>
              {previewUrls.length > 0 && (
                <div className={styles.previewsContainer}>
                  <h4 className={styles.previewsTitle}>
                    معاينة الصور ({selectedFiles.length}/{MAX_IMAGES}):
                  </h4>
                  <div className={styles.previewsGrid}>
                    {previewUrls.map((url, index) => (
                      <div key={index} className={styles.imagePreviewContainer}>
                        <Image
                          src={url}
                          alt={`معاينة ${index + 1}`}
                          className={styles.imagePreview}
                          fill
                        />
                        <button
                          type="button"
                          className={styles.removeImageButton}
                          onClick={(e) => removeImage(index, e)}
                          aria-label="إزالة الصورة"
                        >
                          <X size={24} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              <p className={styles.fileInfo}>
                الصور المسموح بها: JPG, PNG, GIF, WEBP (الحد الأقصى 2 ميجابايت
                لكل صورة)
              </p>
            </div>
          </div>

          <div className={styles.formFooter}>
            <div className={styles.requiredInfo}>
              <AlertTriangle size={25} />
              <span>الحقول المميزة بعلامة (*) إلزامية</span>
            </div>
            <button
              type="submit"
              aria-label="submit"
              className={styles.submitButton}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <span className={styles.spinner}></span>
                  جاري الإرسال...
                </>
              ) : (
                <>
                  <Send size={18} />
                  إرسال الطلب
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
