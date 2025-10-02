"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare } from "lucide-react";
import ReviewCard from "@/components/common/ReviewCard";
import styles from "@/sass/pages/home/reviews.module.scss";
import useReviewStore from "@/store/ReviewStore";
import { Review } from "@/types/reviews";
import SkeletonReviewCard from "@/components/common/SkeletonReviewCard";

const Reviews = () => {
  // Use ReviewStore for reviews
  const { reviews, isLoading, hasMore, handleGetReviews, loadMoreReviews } =
    useReviewStore();

  // Load reviews
  useEffect(() => {
    handleGetReviews(1);
  }, [handleGetReviews]);

  return (
    <section className={styles.reviewsSection} dir="rtl">
      <div>
        <motion.div
          className={styles.sectionHeader}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className={styles.titleWrapper}>
            <MessageSquare className={styles.icon} />
            <h2 className={styles.sectionTitle}>آراء العملاء</h2>
          </div>
          <p className={styles.sectionSubtitle}>
            اكتشف ما يقوله عملاؤنا عن تجربتهم معنا
          </p>
        </motion.div>

        <div className={styles.reviewsGrid}>
          <AnimatePresence>
            {reviews.map((review: Review, index: number) => (
              <motion.div
                key={`${review.id}-${index}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3 }}
              >
                <ReviewCard review={review} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {isLoading && (
          <>
            <SkeletonReviewCard count={6} />
          </>
        )}

        {hasMore && !isLoading && (
          <motion.div
            className={styles.cta}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <button
              onClick={loadMoreReviews}
              className={styles.ctaButton}
              disabled={isLoading}
              aria-label="تحميل المزيد من الآراء"
            >
              عرض المزيد من الآراء
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Reviews;
