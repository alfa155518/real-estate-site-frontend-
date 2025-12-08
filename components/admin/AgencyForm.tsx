import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import {
    Building2,
    Globe,
    X,
    Save,
    AlertCircle,
} from "lucide-react";
import { AgencyFormProps, AgencyData } from "@/types/admin/adminAgenciesStore";
import styles from "@/sass/components/common/userAndPropertyForm.module.scss";

export default function AgencyForm({
    initialData,
    onSubmit,
    onCancel,
    isLoading = false,
}: AgencyFormProps) {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting, isDirty },
    } = useForm<AgencyData>({
        defaultValues: initialData || {
            name: "",
            phone: "",
            website: "",
        },
    });

    const formVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.3,
                staggerChildren: 0.1,
            },
        },
    };

    const fieldVariants = {
        hidden: { opacity: 0, x: -20 },
        visible: { opacity: 1, x: 0 },
    };

    return (
        <motion.form
            className={styles.propertyForm}
            onSubmit={handleSubmit(onSubmit)}
            variants={formVariants}
            initial="hidden"
            animate="visible"
        >
            <div className={styles.formGrid}>
                {/* Basic Information Section */}
                <motion.div className={styles.formSection} variants={fieldVariants}>
                    <h3 className={styles.sectionTitle}>
                        <Building2 className={styles.sectionIcon} size={24} />
                        معلومات الوكالة
                    </h3>

                    <div className={styles.fieldsGrid}>
                        {/* Name */}
                        <div className={styles.formField}>
                            <label>
                                اسم الوكالة <span className={styles.required}>*</span>
                            </label>
                            <input
                                type="text"
                                placeholder="أدخل اسم الوكالة"
                                className={errors.name ? styles.error : ""}
                                {...register("name", {
                                    required: "اسم الوكالة مطلوب",
                                    minLength: {
                                        value: 2,
                                        message: "اسم الوكالة يجب أن يكون على الأقل حرفين",
                                    },
                                })}
                            />
                            {errors.name && (
                                <span className={styles.errorMessage}>
                                    <AlertCircle size={16} />
                                    {errors.name.message}
                                </span>
                            )}
                        </div>

                        {/* Phone */}
                        <div className={styles.formField}>
                            <label>
                                رقم الهاتف <span className={styles.required}>*</span>
                            </label>
                            <input
                                type="tel"
                                placeholder="05xxxxxxxx"
                                className={errors.phone ? styles.error : ""}
                                {...register("phone", {
                                    required: "رقم الهاتف مطلوب",
                                    pattern: {
                                        value: /^[0-9]{10}$/,
                                        message: "رقم الهاتف غير صحيح",
                                    },
                                    maxLength: {
                                        value: 20,
                                        message: "رقم الهاتف طويل جداً",
                                    },
                                })}
                            />
                            {errors.phone && (
                                <span className={styles.errorMessage}>
                                    <AlertCircle size={16} />
                                    {errors.phone.message}
                                </span>
                            )}
                        </div>

                        {/* Website */}
                        <div className={styles.formField}>
                            <label>
                                <Globe size={18} style={{ display: "inline", marginLeft: "0.5rem" }} />
                                الموقع الإلكتروني
                            </label>
                            <input
                                type="url"
                                placeholder="https://example.com"
                                className={errors.website ? styles.error : ""}
                                {...register("website", {
                                    pattern: {
                                        value: /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/,
                                        message: "رابط الموقع غير صحيح",
                                    },
                                })}
                            />
                            {errors.website && (
                                <span className={styles.errorMessage}>
                                    <AlertCircle size={16} />
                                    {errors.website.message}
                                </span>
                            )}
                            <span className={styles.hint}>اختياري</span>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Form Actions */}
            <motion.div className={styles.formActions} variants={fieldVariants}>
                <button
                    type="button"
                    className={styles.cancelBtn}
                    onClick={onCancel}
                    disabled={isSubmitting || isLoading}
                >
                    <X size={20} />
                    إلغاء
                </button>
                <button
                    type="submit"
                    className={styles.submitBtn}
                    disabled={isSubmitting || isLoading || !isDirty}
                >
                    {isSubmitting || isLoading ? (
                        <>
                            <span className={styles.smallSpinner}></span>
                            جاري الحفظ...
                        </>
                    ) : (
                        <>
                            <Save size={20} />
                            حفظ
                        </>
                    )}
                </button>
            </motion.div>
        </motion.form>
    );
}
