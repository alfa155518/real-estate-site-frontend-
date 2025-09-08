'use client';

import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { motion } from 'framer-motion';
import { AlertCircle, Send, AlertTriangle, CheckCircle, Upload, X } from 'lucide-react';
import { useState } from 'react';
import { SupportFormData } from '@/types/support';
import styles from '@/sass/pages/support.module.scss';
import SectionName from '@/components/common/SectionName';

export default function Support() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{ type: 'success' | 'error' | null; message: string }>({ type: null, message: '' });
  
  const { register, handleSubmit, control, formState: { errors }, reset } = useForm<SupportFormData>({
    defaultValues: {
      priority: 'medium',
    },
  });

  const onSubmit: SubmitHandler<SupportFormData> = async (data) => {
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: '' });
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // If you want to handle file uploads, you would do it here
      if (data.attachment && data.attachment.length > 0) {
        const file = data.attachment[0];
        console.log('File to upload:', file);
        // Handle file upload here
      }
      
      setSubmitStatus({
        type: 'success',
        message: 'تم استلام طلبك بنجاح! سنقوم بالرد عليك في أقرب وقت ممكن.'
      });
      reset();
    } catch (error) {
      setSubmitStatus({
        type: 'error',
        message: 'حدث خطأ أثناء إرسال النموذج. يرجى المحاولة مرة أخرى لاحقًا.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <>
   
    <div className={styles.supportPage} dir="rtl">
   <SectionName title="تواصل مع الدعم الفني" subtitle="نحن هنا لمساعدتك! يرجى ملء النموذج أدناه وسنقوم بالرد عليك في أقرب وقت ممكن." />
      <motion.div 
        className={styles.container}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >

        {/* {submitStatus.type && (
          <motion.div 
            className={`${styles.alert} ${submitStatus.type === 'success' ? styles.success : styles.error}`}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {submitStatus.type === 'success' ? (
              <CheckCircle size={20} />
            ) : (
              <AlertCircle size={20} />
            )}
            <span>{submitStatus.message}</span>
            <button onClick={() => setSubmitStatus({ type: null, message: '' })}>
              <X size={18} />
            </button>
          </motion.div>
        )} */}

        <motion.form onSubmit={handleSubmit(onSubmit)} variants={containerVariants}>
          <motion.div className={styles.formGrid} variants={containerVariants}>
            <motion.div className={styles.formGroup} variants={itemVariants}>
              <label htmlFor="name">الاسم الكامل *</label>
              <div className={`${styles.inputWrapper} ${errors.name ? styles.error : ''}`}>
                <input
                  id="name"
                  autoComplete='name'
                  type="text"
                  {...register('name', { required: 'يرجى إدخال الاسم' })}
                  placeholder="أدخل اسمك الكامل"
                />
                {errors.name && <AlertCircle className={styles.inputIcon} />}
              </div>
              {errors.name && <span className={styles.errorMessage}>{errors.name.message}</span>}
            </motion.div>

            <motion.div className={styles.formGroup} variants={itemVariants}>
              <label htmlFor="email">البريد الإلكتروني *</label>
              <div className={`${styles.inputWrapper} ${errors.email ? styles.error : ''}`}>
                <input
                  id="email"
                  autoComplete='email'
                  type="email"
                  {...register('email', {
                    required: 'يرجى إدخال البريد الإلكتروني',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'البريد الإلكتروني غير صالح',
                    },
                  })}
                  placeholder="example@example.com"
                />
                {errors.email && <AlertCircle className={styles.inputIcon} />}
              </div>
              {errors.email && <span className={styles.errorMessage}>{errors.email.message}</span>}
            </motion.div>

            <motion.div className={styles.formGroup} variants={itemVariants}>
              <label htmlFor="phone">رقم الجوال *</label>
              <div className={styles.inputWrapper}>
                <input
                  id="phone"
                  autoComplete='phone'
                  type="tel"
                  {...register('phone', {
                    required: 'يرجى إدخال رقم الجوال',
                    pattern: {
                      value: /^[0-9+\s-]+$/,
                      message: 'رقم الجوال غير صالح',
                    },
                  })}
                  placeholder="+20 5X XXX XXXX"
                />
              </div>
              {errors.phone && <span className={styles.errorMessage}>{errors.phone.message}</span>}
            </motion.div>

            <motion.div className={styles.formGroup} variants={itemVariants}>
              <label htmlFor="priority">أولوية الطلب *</label>
              <Controller
                name="priority"
                control={control}
                render={({ field }) => (
                  <div className={styles.radioGroup}>
                    {[
                      { value: 'low', label: 'منخفضة', color: '#4CAF50' },
                      { value: 'medium', label: 'متوسطة', color: '#FFC107' },
                      { value: 'high', label: 'عاجل', color: '#F44336' },
                    ].map((option) => (
                      <label htmlFor={`priority-${option.value}`} key={option.value} className={styles.radioLabel}>
                        <input
                          type="radio"
                          autoComplete='priority'
                          id={`priority-${option.value}`}
                          {...field}
                          value={option.value}
                          checked={field.value === option.value}
                        />
                        <span className={styles.radioCustom} style={{ '--radio-color': option.color } as React.CSSProperties}></span>
                        {option.label}
                      </label>
                    ))}
                  </div>
                )}
              />
            </motion.div>

            <motion.div className={styles.formGroup} variants={itemVariants}>
              <label htmlFor="subject">عنوان الرسالة *</label>
              <div className={`${styles.inputWrapper} ${errors.subject ? styles.error : ''}`}>
                <input
                  id="subject"
                  autoComplete='subject'
                  type="text"
                  {...register('subject', { required: 'يرجى إدخال عنوان الرسالة' })}
                  placeholder="مثال: مشكلة في تسجيل الدخول"
                />
                {errors.subject && <AlertCircle className={styles.inputIcon} />}
              </div>
              {errors.subject && <span className={styles.errorMessage}>{errors.subject.message}</span>}
            </motion.div>

            <motion.div className={`${styles.formGroup} ${styles.fullWidth}`} variants={itemVariants}>
              <label htmlFor="message">تفاصيل المشكلة أو الاستفسار *</label>
              <div className={`${styles.textareaWrapper} ${errors.message ? styles.error : ''}`}>
                <textarea
                  id="message"
                  autoComplete='message'
                  rows={5}
                  {...register('message', { 
                    required: 'يرجى إدخال تفاصيل المشكلة',
                    minLength: {
                      value: 10,
                      message: 'يجب أن يكون النص 10 أحرف على الأقل'
                    }
                  })}
                  placeholder="يرجى وصف مشكلتك أو استفسارك بالتفصيل..."
                ></textarea>
                {errors.message && <AlertCircle className={styles.textareaIcon} />}
              </div>
              {errors.message && <span className={styles.errorMessage}>{errors.message.message}</span>}
            </motion.div>

            <motion.div className={`${styles.formGroup} ${styles.fullWidth}`} variants={itemVariants}>
              <label htmlFor="attachment">إرفاق ملف (اختياري)</label>
              <div className={styles.fileUpload}>
                <label className={styles.fileUploadLabel}>
                  <Upload size={30}/>
                  <span>اختر ملفًا أو اسحبه هنا</span>
                  <input
                    id="attachment"
                    autoComplete='attachment'
                    type="file"
                    {...register('attachment')}
                    className={styles.fileInput}
                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                  />
                </label>
                <p className={styles.fileInfo}>الملفات المسموح بها: PDF, DOC, DOCX, JPG, PNG (الحد الأقصى 5 ميجابايت)</p>
              </div>
          </motion.div>

 

          <motion.div className={styles.formFooter} variants={itemVariants}>
            <div className={styles.requiredInfo}>
              <AlertTriangle size={25} />
              <span>الحقول المميزة بعلامة (*) إلزامية</span>
            </div>
            <button 
              type="submit" 
              aria-label='submit'
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
          </motion.div>
          </motion.div>
        </motion.form>
      </motion.div>
    </div>
     </>
  );
}