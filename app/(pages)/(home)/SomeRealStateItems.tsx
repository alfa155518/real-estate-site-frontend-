"use client";

import RealEstateCard from "@/components/common/RealEstateCard";
import styles from "@/sass/pages/home/SomeRealStateItems.module.scss";

import { realEstateData } from "@/data/real-estate";

import { useState } from "react";
import Link from "next/link";
import SectionName from "@/components/common/SectionName";

const SomeRealStateItems = () => {
  const [activeFilter, setActiveFilter] = useState<"all" | "sale" | "rent">(
    "all"
  );

  const filteredProperties = realEstateData.filter((property) => {
    if (activeFilter === "all") return true;
    return property.type === activeFilter;
  });

  return (
    <section className={styles.section}>
      <div>
        <SectionName title="العقارات المتاحة" />
        <div className={styles.filters}>
          <button
            className={`${styles.filterButton} ${
              activeFilter === "all" ? styles.active : ""
            }`}
            onClick={() => setActiveFilter("all")}
          >
            الكل
          </button>
          <button
            className={`${styles.filterButton} ${
              activeFilter === "sale" ? styles.active : ""
            }`}
            onClick={() => setActiveFilter("sale")}
          >
            للبيع
          </button>
          <button
            className={`${styles.filterButton} ${
              activeFilter === "rent" ? styles.active : ""
            }`}
            onClick={() => setActiveFilter("rent")}
          >
            للايجار
          </button>
        </div>

        <div className={styles.grid}>
          {filteredProperties.map((property, index) => (
            <RealEstateCard
              key={property.id}
              property={{
                ...property,
                type: property.type as "sale" | "rent",
              }}
              index={index % 4}
            />
          ))}
        </div>

        <div className={styles.loadMoreContainer}>
          <Link href="/realstate" className={styles.loadMoreButton}>
            عرض المزيد من العقارات
          </Link>
        </div>
      </div>
    </section>
  );
};

export default SomeRealStateItems;
