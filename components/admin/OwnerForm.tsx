import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import {
    User,
    Building2,
    X,
    Save,
    AlertCircle,
} from "lucide-react";
import { OwnerFormProps, OwnerData } from "@/types/admin/adminOwnersStore";
import styles from "@/sass/components/common/userAndPropertyForm.module.scss";
import { useEffect, useState } from "react";
import useAdminManageAgenciesStore from "@/store/admin/AdminManageAgenciesStore";

export default function OwnerForm({
    initialData,
    onSubmit,
    onCancel,
    isLoading = false,
}: OwnerFormProps) {
    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: { errors, isSubmitting, isDirty },
    } = useForm<OwnerData>({
        defaultValues: initialData || {
            name: "",
            phone: "",
            email: "",
            type: "individual",
            agency_id: null,
        },
    });

    const ownerType = watch("type");
    const [loadingAgencies, setLoadingAgencies] = useState(false);

    const { agencies, handleInitAgencies } = useAdminManageAgenciesStore();

    // Reset agency_id to null when type changes to individual
    useEffect(() => {
        if (ownerType === "individual") {
            setValue("agency_id", null, { shouldDirty: true });
        }
    }, [ownerType, setValue]);

    useEffect(() => {
        if (ownerType === "company" && agencies.length === 0) {
            setLoadingAgencies(true);
            handleInitAgencies().finally(() => setLoadingAgencies(false));
        }

    }, [ownerType, agencies.length, handleInitAgencies]);

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
                        <User className={styles.sectionIcon} size={24} />
                        معلومات المالك
                    </h3>

                    <div className={styles.fieldsGrid}>
                        {/* Name */}
                        <div className={styles.formField}>
                            <label>
                                الاسم <span className={styles.required}>*</span>
                            </label>
                            <input
                                type="text"
                                placeholder="أدخل اسم المالك"
                                className={errors.name ? styles.error : ""}
                                {...register("name", {
                                    required: "الاسم مطلوب",
                                    minLength: {
                                        value: 2,
                                        message: "الاسم يجب أن يكون على الأقل حرفين",
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
                                placeholder="+2011xxxxxxxxx"
                                className={errors.phone ? styles.error : ""}
                                {...register("phone", {
                                    required: "رقم الهاتف مطلوب",
                                    pattern: {
                                        value: /^(\+20|0)?1[0125][0-9]{8}$/,
                                        message: "رقم الهاتف غير صحيح (مثال: +201012345678 أو 01012345678)",
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

                        {/* Email */}
                        <div className={styles.formField}>
                            <label>
                                البريد الإلكتروني <span className={styles.required}>*</span>
                            </label>
                            <input
                                type="email"
                                placeholder="example@domain.com"
                                className={errors.email ? styles.error : ""}
                                {...register("email", {
                                    required: "البريد الإلكتروني مطلوب",
                                    pattern: {
                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                        message: "البريد الإلكتروني غير صحيح",
                                    },
                                })}
                            />
                            {errors.email && (
                                <span className={styles.errorMessage}>
                                    <AlertCircle size={16} />
                                    {errors.email.message}
                                </span>
                            )}
                        </div>

                        {/* Owner Type */}
                        <div className={styles.formField}>
                            <label>
                                نوع المالك <span className={styles.required}>*</span>
                            </label>
                            <select
                                className={errors.type ? styles.error : ""}
                                {...register("type", { required: "نوع المالك مطلوب" })}
                            >
                                <option value="individual">فرد</option>
                                <option value="company">شركة</option>
                            </select>
                            {errors.type && (
                                <span className={styles.errorMessage}>
                                    <AlertCircle size={16} />
                                    {errors.type.message}
                                </span>
                            )}
                        </div>

                        {/* Agency Selection - Only show when type is company */}
                        {ownerType === "company" && (
                            <motion.div
                                className={styles.formField}
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                <label>
                                    <Building2 size={18} style={{ display: "inline", marginLeft: "0.5rem" }} />
                                    الوكالة
                                </label>
                                <select
                                    {...register("agency_id", {
                                        valueAsNumber: true,
                                    })}
                                    disabled={loadingAgencies}
                                >
                                    <option value="">اختر وكالة (اختياري)</option>
                                    {agencies.map((agency) => (
                                        <option key={agency.id} value={agency.id}>
                                            {agency.name} - {agency.phone}
                                        </option>
                                    ))}
                                </select>
                                {loadingAgencies && (
                                    <span className={styles.hint}>جاري تحميل الوكالات...</span>
                                )}
                            </motion.div>
                        )}
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
                    className={styles.submitBtn + " " + (isSubmitting || isLoading || !isDirty ? styles.disabled : "")}
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
