"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import Image from "next/image";
import {
  Settings as SettingsIcon,
  Save,
  MapPin,
  Image as ImageIcon,
  QrCode,
  Twitter,
} from "lucide-react";
import styles from "@/sass/pages/admin/settings.module.scss";

interface ContactInfoFormData {
  location: string;
  phone: string;
  email: string;
  openingTime: string;
  logo: FileList | null;
  facebook: string;
  twitter: string;
  instagram: string;
  linkedin: string;
}

export default function SettingsPage() {
  const [logoPreview, setLogoPreview] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<ContactInfoFormData>({
    defaultValues: {
      location: "الرياض، المملكة العربية السعودية",
      phone: "+966 50 123 4567",
      email: "info@realestate.com",
      openingTime: "الأحد - الخميس: 9 ص - 5 م",
      facebook: "",
      twitter: "",
      instagram: "",
      linkedin: "",
    },
  });

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      setValue("logo", e.target.files);
    }
  };

  const onSubmit = (data: ContactInfoFormData) => {
    console.log("Contact info submitted:", data);
    // Here you would typically send this data to your API
    alert("تم حفظ معلومات التواصل بنجاح!");
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <h1>إعدادات الموقع</h1>
          <p>إدارة معلومات التواصل وروابط وسائل التواصل الاجتماعي</p>
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.sidebar}>
          <button className={`${styles.tabButton} ${styles.active}`}>
            <SettingsIcon size={20} />
            معلومات التواصل
          </button>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className={styles.formContainer}
        >
          <h2 className={styles.sectionTitle}>
            <SettingsIcon size={25} />
            معلومات الموقع
          </h2>

          <div className={styles.formGrid}>
            <div className={styles.formGroup}>
              <label htmlFor="location">
                الموقع <span className={styles.required}>*</span>
              </label>
              <input
                type="text"
                autoComplete="location"
                id="location"
                placeholder="أدخل عنوان الموقع"
                {...register("location", { required: "حقل الموقع مطلوب" })}
              />
              {errors.location && (
                <span className={styles.error}>{errors.location.message}</span>
              )}
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="phone">
                رقم الهاتف <span className={styles.required}>*</span>
              </label>
              <div>
                <input
                  type="tel"
                  autoComplete="phone"
                  id="phone"
                  placeholder="+20111 XXX XXXX"
                  {...register("phone", { required: "رقم الهاتف مطلوب" })}
                />
              </div>
              {errors.phone && (
                <span className={styles.error}>{errors.phone.message}</span>
              )}
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="email">
                البريد الإلكتروني <span className={styles.required}>*</span>
              </label>
              <div>
                <input
                  type="email"
                  autoComplete="email"
                  id="email"
                  placeholder="email@example.com"
                  {...register("email", {
                    required: "البريد الإلكتروني مطلوب",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "البريد الإلكتروني غير صالح",
                    },
                  })}
                />
              </div>
              {errors.email && (
                <span className={styles.error}>{errors.email.message}</span>
              )}
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="openingTime">
                أوقات العمل <span className={styles.required}>*</span>
              </label>
              <div>
                <input
                  type="text"
                  autoComplete="openingTime"
                  id="openingTime"
                  placeholder="مثال: الأحد - الخميس: 9 ص - 5 م"
                  {...register("openingTime", {
                    required: "حقل أوقات العمل مطلوب",
                  })}
                />
              </div>
              {errors.openingTime && (
                <span className={styles.error}>
                  {errors.openingTime.message}
                </span>
              )}
            </div>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="logo">شعار الموقع</label>
            <div className={styles.logoUpload}>
              {logoPreview ? (
                <Image
                  src={logoPreview}
                  alt="Logo Preview"
                  width={120}
                  height={120}
                  className={styles.logoPreview}
                />
              ) : (
                <div className={styles.logoPreview}>
                  <ImageIcon size={32} />
                </div>
              )}
              <label htmlFor="logo" className={styles.uploadButton}>
                اختر صورة
                <input
                  type="file"
                  accept="image/*"
                  id="logo"
                  style={{ display: "none" }}
                  onChange={handleLogoChange}
                />
              </label>
            </div>
          </div>

          <h2 className={`${styles.sectionTitle} text-left`}>
            <QrCode size={25} />
            وسائل التواصل الاجتماعي
          </h2>

          <div className={styles.formGrid}>
            <div className={styles.formGroup}>
              <label htmlFor="facebook">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="#3b82f6"
                  color="#3b82f6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-facebook-icon lucide-facebook"
                >
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </label>
              <input
                type="url"
                autoComplete="facebook"
                id="facebook"
                placeholder="https://facebook.com/username"
                {...register("facebook")}
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="twitter">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="#3b82f6"
                  color="#3b82f6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-twitter-icon lucide-twitter"
                >
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                </svg>
              </label>
              <input
                type="url"
                autoComplete="twitter"
                id="twitter"
                placeholder="https://twitter.com/username"
                {...register("twitter")}
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="linkedin">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="#3b82f6"
                  color="#3b82f6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-linkedin-icon lucide-linkedin"
                >
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect width="4" height="12" x="2" y="9" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </label>
              <input
                type="url"
                autoComplete="linkedin"
                id="linkedin"
                placeholder="https://linkedin.com/company/name"
                {...register("linkedin")}
              />
            </div>
          </div>

          <button type="submit" className={styles.submitButton}>
            <Save size={18} />
            حفظ التغييرات
          </button>
        </form>
      </div>
    </div>
  );
}
