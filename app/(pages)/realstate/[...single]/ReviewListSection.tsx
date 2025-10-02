import ReviewCard from "@/components/common/ReviewCard";
import useReviews from "@/hooks/useReviews";
import { PropertyIdProps } from "@/types/reviews";
import { renderReviewStars } from "@/utils/reviewsCardHelpers";
import styles from "@/sass/pages/single-realestate/singleRealEstate.module.scss";

export default function ReviewListSection({ propertyId }: PropertyIdProps) {
  // use reviews custom hook
  const { reviewsByProperty, isLoadingReviews, averageRating } = useReviews();

  return (
    <>
      <div className={styles.header}>
        <h2>التقييمات والآراء</h2>
        {!isLoadingReviews && (
          <div className={styles.rating}>
            <div className={styles.stars}>
              {renderReviewStars(Math.round(averageRating))}
            </div>
            <span className={styles.count}>
              ({reviewsByProperty.length}{" "}
              {reviewsByProperty.length === 1 ? "تقييم" : "تقييمات"})
            </span>
          </div>
        )}
      </div>

      <div className={styles.reviews}>
        {isLoadingReviews ? (
          <div className={styles.loading}>جاري تحميل التقييمات...</div>
        ) : reviewsByProperty.length > 0 ? (
          <>
            {reviewsByProperty.map((review) => (
              <ReviewCard
                key={review.id}
                review={review}
                propertyId={propertyId}
              />
            ))}
          </>
        ) : (
          <p className={styles.noReviews}>
            لا يوجد تقييمات حالياً كن اول من يضيف تقييم
          </p>
        )}
      </div>
    </>
  );
}
