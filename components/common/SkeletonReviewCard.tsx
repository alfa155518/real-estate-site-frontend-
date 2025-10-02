import Skeleton from "react-loading-skeleton";
import { motion } from "framer-motion";
import cardStyles from "@/sass/components/common/reviewCard.module.scss";
import containerStyles from "@/sass/pages/home/reviews.module.scss";
import "react-loading-skeleton/dist/skeleton.css";

export default function SkeletonReviewCard({ count }: { count: number }) {
  return (
    <div className={containerStyles.reviewsGrid}>
      {Array.from({ length: count }, (_, index) => (
        <motion.div
          className={cardStyles.reviewCard}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          key={index}
        >
          <div className={cardStyles.header}>
            <div className={cardStyles.userInfo}>
              <Skeleton circle width={40} height={40} />
              <div style={{ width: "100%", marginRight: "12px" }}>
                <div style={{ marginBottom: "4px" }}>
                  <Skeleton width={120} height={20} />
                </div>
                <div className={cardStyles.rating}>
                  <Skeleton width={100} height={16} />
                </div>
              </div>
            </div>
            <Skeleton width={80} height={16} />
          </div>

          <div style={{ margin: "16px 0" }}>
            <Skeleton count={2} />
            <Skeleton width="80%" />
          </div>

          <div className={cardStyles.helpful}>
            <Skeleton width={80} height={32} borderRadius={20} />
          </div>
        </motion.div>
      ))}
    </div>
  );
}
