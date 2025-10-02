import { Star } from "lucide-react";
import styles from "@/sass/components/common/reviewCard.module.scss";

export const renderReviewStars = (rating: number) => {
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
