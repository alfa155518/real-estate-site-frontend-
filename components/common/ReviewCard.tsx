// components/common/ReviewCard/ReviewCard.tsx
import { motion } from 'framer-motion';
import { Star, ThumbsUp } from 'lucide-react';
import { format } from 'date-fns';
import { ar } from 'date-fns/locale/ar';
import { Review } from '@/types/reviews';
import styles from '@/sass/components/common/reviewCard.module.scss';

interface ReviewCardProps {
  review: Review;
}

const ReviewCard = ({ review }: ReviewCardProps) => {
  const formatDate = (dateString: string) => {
    return format(new Date(dateString), 'd MMMM yyyy', { locale: ar });
  };

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(<Star key={i} className={styles.star} fill="#FFD700" />);
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(<Star key={i} className={styles.star} fill="#FFD700" />);
      } else {
        stars.push(<Star key={i} className={styles.star} fill="#E0E0E0" />);
      }
    }

    return stars;
  };

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
          <div className={styles.avatar}>
            {review.name.charAt(0)}
          </div>
          <div>
            <strong className={styles.userName}>{review.name}</strong>
            <div className={styles.rating}>
              {renderStars(review.rating)}
              <span className={styles.ratingNumber}>{review.rating.toFixed(1)}</span>
            </div>
          </div>
        </div>
        <span className={styles.date}>{formatDate(review.reviewed_at)}</span>
      </div>
      <p className={styles.comment}>{review.comment}</p>
      <div className={styles.helpful}>
        <button className={styles.helpfulButton}>
          <ThumbsUp size={16} />
          <span>مفيد ({review.helpful_votes})</span>
        </button>
      </div>
    </motion.div>
  );
};

export default ReviewCard;