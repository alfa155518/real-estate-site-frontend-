"use client";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { motion } from "framer-motion";
import styles from "@/sass/pages/home/SomeRealStateItems.module.scss";
const SkeletonRealEstateCard = ({ count = 1 }: { count?: number }) => {
  return (
    <div className={styles.grid}>
      {Array(count)
        .fill(0)
        .map((_, index) => (
          <motion.div
            key={index}
            className="bg-white rounded-lg shadow-sm overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            {/* Image */}
            <div className="relative aspect-video bg-gray-100">
              <Skeleton className="w-full h-full" />
            </div>

            <div className="p-4">
              {/* Price & Badge */}
              <div className="flex justify-between items-start mb-2">
                <Skeleton width={120} height={24} />
                <Skeleton width={60} height={20} />
              </div>

              {/* Title */}
              <Skeleton width="80%" height={20} className="mb-3" />

              {/* Location */}
              <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                <Skeleton width={16} height={16} circle />
                <Skeleton width={150} height={16} />
              </div>

              {/* Features */}
              <div className="grid grid-cols-3 gap-2 mb-4">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <Skeleton key={i} width="100%" height={16} />
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex justify-between">
                <Skeleton width={100} height={36} />
                <Skeleton width={36} height={36} circle />
              </div>
            </div>
          </motion.div>
        ))}
    </div>
  );
};

export default SkeletonRealEstateCard;
