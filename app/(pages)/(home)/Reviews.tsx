'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare } from 'lucide-react';
import ReviewCard from '@/components/common/ReviewCard';
import { reviews } from '@/data/reviews';
import styles from '@/sass/pages/home/reviews.module.scss';

const ITEMS_PER_PAGE = 8;

const Reviews = () => {
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
  
  // Sort reviews by helpful votes (highest first)
  const sortedReviews = useMemo(() => {
    return [...reviews].sort((a, b) => b.helpful_votes - a.helpful_votes);
  }, []);

  // Get visible reviews based on current count
  const visibleReviews = useMemo(() => {
    return sortedReviews.slice(0, visibleCount);
  }, [sortedReviews, visibleCount]);

  const hasMore = visibleCount < sortedReviews.length;

  const loadMore = () => {
    setVisibleCount(prev => Math.min(prev + ITEMS_PER_PAGE, sortedReviews.length));
  };

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
            {visibleReviews.map((review) => (
              <motion.div
                key={review.review_id}
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

        {hasMore && (
          <motion.div
            className={styles.cta}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <button 
              onClick={loadMore} 
              className={styles.ctaButton}
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