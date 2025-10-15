"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, ArrowLeft, HeartOff } from "lucide-react";
import Link from "next/link";

import RealEstateCard from "@/components/common/RealEstateCard";
import SectionName from "@/components/common/SectionName";
import useFavoritePropertiesStore from "@/store/FavoritePropertiesStore";
import SkeletonRealEstateCard from "@/components/common/SkeletonRealEstateCard";
import styles from "@/sass/pages/favorites/favorites.module.scss";
export default function FavoritesPage() {
  // Favorite Properties Store
  const {
    favoriteProperties,
    handleGetFavoriteProperties,
    handleToggleFavorite,
    isLoading,
    loadingIds,
  } = useFavoritePropertiesStore();

  // Load favorite properties
  useEffect(() => {
    async function getFavoriteProperties() {
      await handleGetFavoriteProperties();
    }
    getFavoriteProperties();
  }, [handleGetFavoriteProperties]);

  if (isLoading) {
    return (
      <div className={styles.container}>
        <SectionName
          title="قائمة المفضلة"
          subtitle="تصفح العقارات المفضلة لديك بسهولة"
          className="mt-[8rem]"
        />
        <SkeletonRealEstateCard count={5} />
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <SectionName
        title="قائمة المفضلة"
        subtitle="تصفح العقارات المفضلة لديك بسهولة"
        className="mt-[8rem]"
      />

      {!favoriteProperties.length ? (
        <motion.div
          className={styles.noFavorites}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <HeartOff size={64} className={styles.icon} />
          <h2>لا توجد عقارات في المفضلة</h2>
          <p>
            يمكنك إضافة العقارات إلى المفضلة بالنقر على زر القلب في صفحة تفاصيل
            العقار
          </p>
          <Link href="/realstate" className={styles.browseButton}>
            <span>تصفح العقارات</span>
            <ArrowLeft size={18} />
          </Link>
        </motion.div>
      ) : (
        <AnimatePresence>
          <div className={styles.grid}>
            {favoriteProperties.map((property, index) => (
              <motion.div
                key={property.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: index * 0.05 }}
                layout
              >
                <RealEstateCard property={property} index={index} />
                <motion.button
                  className={styles.removeButton}
                  onClick={() => handleToggleFavorite(property.id)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {loadingIds.includes(property.id) ? (
                    <strong>.... جاري الازالة</strong>
                  ) : (
                    <>
                      <Heart size={18} fill="#ef4444" color="#ef4444" />
                      <span>إزالة من المفضلة</span>
                    </>
                  )}
                </motion.button>
              </motion.div>
            ))}
          </div>
        </AnimatePresence>
      )}
    </div>
  );
}
