"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Search, ArrowLeft, HeartOff } from "lucide-react";
import Link from "next/link";
import RealEstateCard from "@/components/common/RealEstateCard";
import { RealEstate } from "@/types/real-estate";
import styles from "@/sass/pages/favorites/favorites.module.scss";

// Import real estate data
import { realEstateData } from "@/data/real-estate";
import SectionName from "@/components/common/SectionName";

// Use first 4 items as favorites for demonstration
const mockFavorites: RealEstate[] = realEstateData
  .slice(0, 5)
  .map((property) => ({
    ...property,
    type: property.type as "sale" | "rent", // Ensure type is correctly typed
  }));

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState<RealEstate[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Simulate loading favorites
  useEffect(() => {
    const timer = setTimeout(() => {
      setFavorites(mockFavorites);
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  // Filter favorites based on search query
  const filteredFavorites = favorites.filter(
    (property) =>
      // property?.title?.toLowerCase()?.includes(searchQuery.toLowerCase()) ||
      property?.title?.toLowerCase()?.includes(searchQuery.toLowerCase())
    // property?.location?.toLowerCase()?.includes(searchQuery.toLowerCase())
  );

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    if (selectedValue) {
      const filtered = favorites.filter(
        (property) => property.type === selectedValue
      );
      setFavorites(filtered);
    } else {
      setFavorites(mockFavorites);
    }
  };

  const paginatedFavorites = filteredFavorites.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleRemoveFavorite = (id: number) => {
    setFavorites((prev) => prev.filter((property) => property.id !== id));
  };

  if (isLoading) {
    return (
      <div className={styles.container}>
        <SectionName
          title="قائمة المفضلة"
          subtitle="تصفح العقارات المفضلة لديك بسهولة"
          className="mt-[8rem]"
        />
        <div className={styles.grid}>
          {[...Array(3)].map((_, index) => (
            <motion.div
              key={index}
              className={styles.skeletonCard}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className={styles.skeletonImage} />
              <div className={styles.skeletonContent}>
                <div className={styles.skeletonTitle} />
                <div className={styles.skeletonText} />
                <div className={styles.skeletonText} />
              </div>
            </motion.div>
          ))}
        </div>
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

      {favorites.length === 0 ? (
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
        <>
          <motion.div
            className={styles.filters}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className={styles.searchContainer}>
              <Search className={styles.searchIcon} />
              <input
                type="text"
                name="search"
                placeholder="ابحث في المفضلة..."
                className={styles.searchInput}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                dir="rtl"
              />
            </div>
            <div className={styles.filterGroup}>
              <select
                className={styles.filterSelect}
                name="type"
                onChange={(e) => handleFilterChange(e)}
              >
                <option value="">الكل</option>
                <option value="sale">للبيع</option>
                <option value="rent">للإيجار</option>
              </select>
              <select
                className={styles.filterSelect}
                name="bedrooms"
                onChange={(e) => handleFilterChange(e)}
              >
                <option value="">الكل</option>
                <option value="1">1+ غرف</option>
                <option value="2">2+ غرف</option>
                <option value="3">3+ غرف</option>
              </select>
            </div>
          </motion.div>

          <AnimatePresence>
            {filteredFavorites.length === 0 ? (
              <motion.div
                className={styles.noResults}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <p>لا توجد نتائج مطابقة لبحثك</p>
              </motion.div>
            ) : (
              <div className={styles.grid}>
                {paginatedFavorites.map((property, index) => (
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
                      onClick={() => handleRemoveFavorite(property.id)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Heart size={18} fill="#ef4444" color="#ef4444" />
                      <span>إزالة من المفضلة</span>
                    </motion.button>
                  </motion.div>
                ))}
              </div>
            )}
          </AnimatePresence>

          {/* {totalPages > 1 && (
            <motion.div 
              className={styles.pagination}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <button
                onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
                disabled={currentPage === 1}
              >
                <ArrowRight size={16} />
              </button>
              
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let pageNum;
                if (totalPages <= 5) {
                  pageNum = i + 1;
                } else if (currentPage <= 3) {
                  pageNum = i + 1;
                } else if (currentPage >= totalPages - 2) {
                  pageNum = totalPages - 4 + i;
                } else {
                  pageNum = currentPage - 2 + i;
                }
                
                return (
                  <button
                    key={pageNum}
                    onClick={() => setCurrentPage(pageNum)}
                    className={currentPage === pageNum ? styles.active : ''}
                  >
                    {pageNum}
                  </button>
                );
              })}
              
              <button
                onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
                disabled={currentPage === totalPages}
              >
                <ArrowLeft size={16} />
              </button>
            </motion.div>
          )} */}
        </>
      )}
    </div>
  );
}
