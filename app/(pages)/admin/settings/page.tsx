"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import {
  Settings as SettingsIcon,
  Globe,
  Bell,
  Shield,
  Palette,
  Mail,
  Save,
  AlertCircle,
} from "lucide-react";
import styles from "@/sass/components/propertyForm.module.scss";

interface SettingsFormData {
  siteName: string;
  siteDescription: string;
  contactEmail: string;
  contactPhone: string;
  language: string;
  timezone: string;
  currency: string;
  emailNotifications: boolean;
  smsNotifications: boolean;
  pushNotifications: boolean;
  twoFactorAuth: boolean;
  maintenanceMode: boolean;
  theme: string;
}

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("general");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SettingsFormData>({
    defaultValues: {
      siteName: "منصة العقارات",
      siteDescription: "أفضل منصة لبيع وشراء العقارات في المملكة",
      contactEmail: "info@realestate.com",
      contactPhone: "+966 50 123 4567",
      language: "ar",
      timezone: "Asia/Riyadh",
      currency: "SAR",
      emailNotifications: true,
      smsNotifications: false,
      pushNotifications: true,
      twoFactorAuth: false,
      maintenanceMode: false,
      theme: "light",
    },
  });

  const onSubmit = (data: SettingsFormData) => {
    console.log("Settings data:", data);
    alert("تم حفظ الإعدادات بنجاح!");
  };

  const tabs = [
    { id: "general", label: "عام", icon: SettingsIcon },
    { id: "localization", label: "اللغة والمنطقة", icon: Globe },
    { id: "notifications", label: "الإشعارات", icon: Bell },
    { id: "security", label: "الأمان", icon: Shield },
    { id: "appearance", label: "المظهر", icon: Palette },
  ];

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
    <div style={{ maxWidth: "1200px" }}>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ marginBottom: "2rem" }}
      >
        <h1
          style={{
            fontSize: "2rem",
            fontWeight: 700,
            color: "#1a1f36",
            margin: "0 0 0.5rem 0",
          }}
        >
          الإعدادات
        </h1>
        <p style={{ color: "#6b7280", margin: 0 }}>
          إدارة إعدادات النظام والتفضيلات
        </p>
      </motion.div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "250px 1fr",
          gap: "2rem",
        }}
      >
        {/* Tabs Sidebar */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          style={{
            background: "white",
            borderRadius: "16px",
            padding: "1.5rem",
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
            height: "fit-content",
          }}
        >
          {tabs.map((tab) => (
            <motion.button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              whileHover={{ scale: 1.02, x: 5 }}
              whileTap={{ scale: 0.98 }}
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                gap: "1rem",
                padding: "1rem",
                border: "none",
                background:
                  activeTab === tab.id
                    ? "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
                    : "transparent",
                color: activeTab === tab.id ? "white" : "#4b5563",
                borderRadius: "10px",
                cursor: "pointer",
                marginBottom: "0.5rem",
                fontWeight: 600,
                fontSize: "0.9rem",
                transition: "all 0.3s ease",
              }}
            >
              <tab.icon size={20} />
              {tab.label}
            </motion.button>
          ))}
        </motion.div>

        {/* Settings Content */}
        <motion.form
          className={styles.propertyForm}
          onSubmit={handleSubmit(onSubmit)}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          style={{
            background: "white",
            borderRadius: "16px",
            padding: "2rem",
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
          }}
        >
          {/* General Settings */}
          {activeTab === "general" && (
            <motion.div variants={itemVariants}>
              <h3
                style={{
                  fontSize: "1.25rem",
                  fontWeight: 700,
                  marginBottom: "1.5rem",
                }}
              >
                الإعدادات العامة
              </h3>
              <div className={styles.fieldsGrid}>
                <div className={`${styles.formField} ${styles.fullWidth}`}>
                  <label>
                    <span className={styles.required}>*</span>
                    اسم الموقع
                  </label>
                  <input
                    type="text"
                    placeholder="أدخل اسم الموقع"
                    {...register("siteName", { required: "اسم الموقع مطلوب" })}
                  />
                </div>

                <div className={`${styles.formField} ${styles.fullWidth}`}>
                  <label>وصف الموقع</label>
                  <textarea
                    placeholder="أدخل وصف الموقع"
                    {...register("siteDescription")}
                  />
                </div>

                <div className={styles.formField}>
                  <label>
                    <span className={styles.required}>*</span>
                    البريد الإلكتروني للتواصل
                  </label>
                  <input
                    type="email"
                    placeholder="email@example.com"
                    {...register("contactEmail", {
                      required: "البريد الإلكتروني مطلوب",
                    })}
                  />
                </div>

                <div className={styles.formField}>
                  <label>رقم الهاتف للتواصل</label>
                  <input
                    type="tel"
                    placeholder="+966 5XX XXX XXX"
                    {...register("contactPhone")}
                  />
                </div>
              </div>
            </motion.div>
          )}

          {/* Localization Settings */}
          {activeTab === "localization" && (
            <motion.div variants={itemVariants}>
              <h3
                style={{
                  fontSize: "1.25rem",
                  fontWeight: 700,
                  marginBottom: "1.5rem",
                }}
              >
                إعدادات اللغة والمنطقة
              </h3>
              <div className={styles.fieldsGrid}>
                <div className={styles.formField}>
                  <label>اللغة الافتراضية</label>
                  <select {...register("language")}>
                    <option value="ar">العربية</option>
                    <option value="en">English</option>
                  </select>
                </div>

                <div className={styles.formField}>
                  <label>المنطقة الزمنية</label>
                  <select {...register("timezone")}>
                    <option value="Asia/Riyadh">الرياض (GMT+3)</option>
                    <option value="Asia/Dubai">دبي (GMT+4)</option>
                    <option value="Africa/Cairo">القاهرة (GMT+2)</option>
                  </select>
                </div>

                <div className={styles.formField}>
                  <label>العملة الافتراضية</label>
                  <select {...register("currency")}>
                    <option value="SAR">ريال سعودي (SAR)</option>
                    <option value="AED">درهم إماراتي (AED)</option>
                    <option value="USD">دولار أمريكي (USD)</option>
                    <option value="EUR">يورو (EUR)</option>
                  </select>
                </div>
              </div>
            </motion.div>
          )}

          {/* Notifications Settings */}
          {activeTab === "notifications" && (
            <motion.div variants={itemVariants}>
              <h3
                style={{
                  fontSize: "1.25rem",
                  fontWeight: 700,
                  marginBottom: "1.5rem",
                }}
              >
                إعدادات الإشعارات
              </h3>
              <div className={styles.fieldsGrid}>
                <div className={`${styles.formField} ${styles.fullWidth}`}>
                  <div className={styles.checkboxGroup}>
                    <div className={styles.checkboxItem}>
                      <input
                        type="checkbox"
                        id="emailNotifications"
                        {...register("emailNotifications")}
                      />
                      <label htmlFor="emailNotifications">
                        <div>
                          <strong>إشعارات البريد الإلكتروني</strong>
                          <p
                            style={{
                              fontSize: "0.85rem",
                              color: "#6b7280",
                              margin: "0.25rem 0 0 0",
                            }}
                          >
                            استقبال الإشعارات عبر البريد الإلكتروني
                          </p>
                        </div>
                      </label>
                    </div>

                    <div className={styles.checkboxItem}>
                      <input
                        type="checkbox"
                        id="smsNotifications"
                        {...register("smsNotifications")}
                      />
                      <label htmlFor="smsNotifications">
                        <div>
                          <strong>إشعارات الرسائل النصية</strong>
                          <p
                            style={{
                              fontSize: "0.85rem",
                              color: "#6b7280",
                              margin: "0.25rem 0 0 0",
                            }}
                          >
                            استقبال الإشعارات عبر الرسائل النصية
                          </p>
                        </div>
                      </label>
                    </div>

                    <div className={styles.checkboxItem}>
                      <input
                        type="checkbox"
                        id="pushNotifications"
                        {...register("pushNotifications")}
                      />
                      <label htmlFor="pushNotifications">
                        <div>
                          <strong>الإشعارات الفورية</strong>
                          <p
                            style={{
                              fontSize: "0.85rem",
                              color: "#6b7280",
                              margin: "0.25rem 0 0 0",
                            }}
                          >
                            استقبال الإشعارات الفورية في المتصفح
                          </p>
                        </div>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Security Settings */}
          {activeTab === "security" && (
            <motion.div variants={itemVariants}>
              <h3
                style={{
                  fontSize: "1.25rem",
                  fontWeight: 700,
                  marginBottom: "1.5rem",
                }}
              >
                إعدادات الأمان
              </h3>
              <div className={styles.fieldsGrid}>
                <div className={`${styles.formField} ${styles.fullWidth}`}>
                  <div className={styles.checkboxGroup}>
                    <div className={styles.checkboxItem}>
                      <input
                        type="checkbox"
                        id="twoFactorAuth"
                        {...register("twoFactorAuth")}
                      />
                      <label htmlFor="twoFactorAuth">
                        <div>
                          <strong>المصادقة الثنائية</strong>
                          <p
                            style={{
                              fontSize: "0.85rem",
                              color: "#6b7280",
                              margin: "0.25rem 0 0 0",
                            }}
                          >
                            تفعيل المصادقة الثنائية لمزيد من الأمان
                          </p>
                        </div>
                      </label>
                    </div>

                    <div className={styles.checkboxItem}>
                      <input
                        type="checkbox"
                        id="maintenanceMode"
                        {...register("maintenanceMode")}
                      />
                      <label htmlFor="maintenanceMode">
                        <div>
                          <strong>وضع الصيانة</strong>
                          <p
                            style={{
                              fontSize: "0.85rem",
                              color: "#6b7280",
                              margin: "0.25rem 0 0 0",
                            }}
                          >
                            تفعيل وضع الصيانة لإخفاء الموقع مؤقتاً
                          </p>
                        </div>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Appearance Settings */}
          {activeTab === "appearance" && (
            <motion.div variants={itemVariants}>
              <h3
                style={{
                  fontSize: "1.25rem",
                  fontWeight: 700,
                  marginBottom: "1.5rem",
                }}
              >
                إعدادات المظهر
              </h3>
              <div className={styles.fieldsGrid}>
                <div className={styles.formField}>
                  <label>المظهر</label>
                  <select {...register("theme")}>
                    <option value="light">فاتح</option>
                    <option value="dark">داكن</option>
                    <option value="auto">تلقائي</option>
                  </select>
                </div>
              </div>
            </motion.div>
          )}

          {/* Form Actions */}
          <motion.div
            className={styles.formActions}
            variants={itemVariants}
            style={{ marginTop: "2rem" }}
          >
            <motion.button
              type="submit"
              className={styles.submitBtn}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Save size={18} />
              حفظ الإعدادات
            </motion.button>
          </motion.div>
        </motion.form>
      </div>
    </div>
  );
}
