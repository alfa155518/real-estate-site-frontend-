"use client";

import { motion } from "framer-motion";
import { Home, Building2 } from "lucide-react";

import RealEstateFilters from "./RealEstateFilters";
import RealEstateList from "./RealEstateList";
import useRealEstateStore from "@/store/RealestateStore";
import useRealestate from "@/hooks/useRealestate";
import Pagination from "@/components/common/Pagination";
import styles from "@/sass/pages/real-estate/realEstatePage.module.scss";

export default function RealEstateContent() {
  // real estate store
  const { properties, isLoading, meta, handlePageChange } =
    useRealEstateStore();

  // real estate custom hook
  const { featuredProperties } = useRealestate();
  return (
    <>
      {/* Hero Section */}
      <motion.section
        className={styles.heroSection}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className={styles.heroContent}>
          <motion.h1
            className={styles.heroTitle}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            ابحث عن منزل أحلامك
          </motion.h1>
          <motion.p
            className={styles.heroSubtitle}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            اكتشف مجموعة واسعة من العقارات المناسبة لك ولعائلتك
          </motion.p>
        </div>
      </motion.section>

      {/* Search and Filters */}
      <motion.section
        className={styles.searchSection}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.8 }}
      >
        <div className={styles.searchContainer}>
          <RealEstateFilters />
        </div>
      </motion.section>

      {/* Property Listings */}
      <section className={styles.listingsSection}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>
            <Home className={styles.sectionIcon} />
            أحدث العقارات
          </h2>
        </div>

        <RealEstateList properties={properties} loading={isLoading} />
      </section>

      {/* RealEstate Pagination */}
      <Pagination meta={meta} onPageChange={handlePageChange} />

      {/* Featured Properties */}
      <section className={styles.featuredSection}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>
            <Building2 className={styles.sectionIcon} />
            عقارات مميزة
          </h2>
        </div>

        <RealEstateList properties={featuredProperties} loading={isLoading} />
      </section>
    </>
  );
}
