import { useEffect, useState } from "react";
import Link from "next/link";
import RealEstateCard from "@/components/common/RealEstateCard";
import SectionName from "@/components/common/SectionName";
import useRealEstateStore from "@/store/RealestateStore";
import RealEstateCardSkeleton from "@/components/common/SkeletonRealEstateCard";
import styles from "@/sass/pages/home/SomeRealStateItems.module.scss";

const SomeRealStateItems = () => {
  const { handleFeaturedProperties, featuredProperties } = useRealEstateStore();
  const [activeFilter, setActiveFilter] = useState<"all" | "sale" | "rent">(
    "all"
  );

  // get featured properties
  useEffect(() => {
    async function getFeaturedProperties() {
      await handleFeaturedProperties();
    }
    getFeaturedProperties();
  }, [handleFeaturedProperties]);

  // Filter properties based on type
  const filteredProperties = featuredProperties.filter((property) => {
    if (activeFilter === "all") return true;
    return property.type === activeFilter;
  });

  return (
    <section className={styles.section}>
      <div>
        <SectionName title="العقارات المميزة" />
        {!featuredProperties.length ? (
          <RealEstateCardSkeleton count={6} />
        ) : (
          <>
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
                >
                  <RealEstateCard.contact property={property} />
                  <RealEstateCard.favorite property={property} />
                  <RealEstateCard.details property={property} />
                </RealEstateCard>
              ))}
            </div>

            <div className={styles.loadMoreContainer}>
              <Link href="/realstate" className={styles.loadMoreButton}>
                عرض المزيد من العقارات
              </Link>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default SomeRealStateItems;
