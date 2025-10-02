import { motion } from "framer-motion";
import { Star } from "lucide-react";
import useReviews from "@/hooks/useReviews";
import { PropertyIdProps } from "@/types/reviews";
import styles from "@/sass/pages/single-realestate/singleRealEstate.module.scss";
export default function PostReviewForm({ propertyId }: PropertyIdProps) {
  // use reviews custom hook
  const {
    ratingValue,
    errors,
    isSubmitting,
    register,
    handleSubmit,
    setValue,
    handleReviewSubmit,
  } = useReviews(propertyId);

  return (
    <motion.div
      className={styles.addReview}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
    >
      <h3>أضف تقييمك</h3>
      <form onSubmit={handleSubmit(handleReviewSubmit)}>
        <div className={styles.formGroup}>
          <label htmlFor="rating">التقييم</label>
          <div className={styles.starRating}>
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                size={28}
                fill={star <= ratingValue ? "#FFD700" : "none"}
                color={star <= ratingValue ? "#FFD700" : "#ddd"}
                onClick={() =>
                  setValue("rating", star, { shouldValidate: true })
                }
                style={{ cursor: "pointer" }}
              />
            ))}
            <input
              id="rating"
              {...register("rating", {
                required: "الرجاء تحديد التقييم",
              })}
            />
          </div>
          {errors.rating && (
            <p className={styles.error}>{errors.rating.message}</p>
          )}
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="comment">تعليقك</label>
          <textarea
            id="comment"
            autoComplete="comment"
            {...register("comment", {
              required: "الرجاء إدخال تعليقك",
              minLength: {
                value: 10,
                message: "يجب أن يكون التعليق 10 أحرف على الأقل",
              },
            })}
            placeholder="اكتب تعليقك هنا..."
            className={errors.comment ? styles.inputError : ""}
          />
          {errors.comment && (
            <p className={styles.error}>{errors.comment.message}</p>
          )}
        </div>
        <button
          type="submit"
          aria-label="Send review"
          className={styles.submitButton}
          disabled={isSubmitting}
        >
          {isSubmitting ? "جاري الإرسال..." : "إرسال التقييم"}
        </button>
      </form>
    </motion.div>
  );
}
