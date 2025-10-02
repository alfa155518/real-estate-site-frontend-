import { motion } from "framer-motion";
import { ThumbsUp } from "lucide-react";
import { ReviewCardProps } from "@/types/reviews";
import { formatDate } from "@/utils/date";
import { renderReviewStars } from "@/utils/reviewsCardHelpers";
import { useReviewsCard } from "@/hooks/useReviewsCard";
import styles from "@/sass/components/common/reviewCard.module.scss";

const ReviewCard = ({ review, propertyId }: ReviewCardProps) => {
  const propertyIdNumber = Number(propertyId);
  // use reviews card custom hook
  const { handleLike, isLoading } = useReviewsCard(propertyIdNumber);

  return (
    <motion.div
      className={styles.reviewCard}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className={styles.header}>
        <div className={styles.userInfo}>
          <div className={styles.avatar}>{review.user_name.charAt(0)}</div>
          <div>
            <strong className={styles.userName}>{review.user_name}</strong>
            <div className={styles.rating}>
              {renderReviewStars(review.rating)}
              <span className={styles.ratingNumber}>
                {review.rating.toFixed(1)}
              </span>
            </div>
          </div>
        </div>
        <span className={styles.date}>{formatDate(review.created_at)}</span>
      </div>
      <p className={styles.comment}>{review.comment}</p>
      <div className={styles.helpful}>
        <button
          className={styles.helpfulButton}
          onClick={() => handleLike(review.id)}
          disabled={isLoading}
        >
          {isLoading ? (
            <span>...</span>
          ) : (
            <>
              <ThumbsUp size={16} />
              <span>مفيد ({review.likes_count})</span>
            </>
          )}
        </button>
      </div>
    </motion.div>
  );
};

export default ReviewCard;
