"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Home } from "lucide-react";
import RealEstateCard from "@/components/common/RealEstateCard";
import { RealEstate } from "@/types/real-estate";
import styles from "@/sass/pages/search/index.module.scss";
import SectionName from "@/components/common/SectionName";

const ITEMS_PER_PAGE = 12;

type SortOption = "relevance" | "price-asc" | "price-desc" | "newest";
type PropertyType = "all" | "sale" | "rent";

export default function SearchResults() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState<RealEstate[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState<SortOption>("relevance");
  const [propertyType, setPropertyType] = useState<PropertyType>("all");

  // Fetch search results
  useEffect(() => {
    const PRICE_RANGE: [number, number] = [0, 10000000];
    const query = searchParams.get("q") || "";
    setSearchTerm(query);

    const fetchResults = async () => {
      try {
        setIsLoading(true);
        // In a real app, you would fetch from your API
        // const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
        // const data = await response.json();

        // For now, we'll filter the local data
        // Import and type assert the real estate data
        const allProperties = (await import("@/data/real-estate"))
          .realEstateData as Array<RealEstate & { type: string }>;

        const searchLower = query.toLowerCase();

        const filteredResults = allProperties.filter((property) => {
          const matchesSearch =
            property.title.toLowerCase().includes(searchLower) ||
            property.description.toLowerCase().includes(searchLower);
          // property.location.toLowerCase().includes(searchLower);
          // property.location?.toLowerCase().includes(searchLower);

          const matchesType =
            propertyType === "all" || property.type === propertyType;
          const matchesPrice = "sa555";
          // property.price >= PRICE_RANGE[0] &&
          // property.price <= PRICE_RANGE[1];

          return matchesSearch && matchesType && matchesPrice;
        }) as unknown as RealEstate[];

        // Sort results
        const sortedResults = [...filteredResults].sort((a, b) => {
          switch (sortBy) {
            case "price-asc":
              // return a.price - b.price;
              return 0;
            case "price-desc":
              // return b.price - a.price;
              return 0;
            case "newest":
              return (
                new Date(b.created_at).getTime() -
                new Date(a.created_at).getTime()
              );
            default: // relevance
              return 0;
          }
        });

        setResults(sortedResults);
      } catch (error) {
        console.error("Error fetching search results:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (query) {
      fetchResults();
    } else {
      setIsLoading(false);
    }
  }, [searchParams, sortBy, propertyType]);

  // Handle search form submission
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const searchQuery = formData.get("search") as string;
    router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
  };

  // Handle pagination
  const totalPages = Math.ceil(results.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedResults = results.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };

  if (isLoading) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>
          <div className={styles.spinner} />
        </div>
      </div>
    );
  }

  return (
    <Suspense fallback={<div>جاري التحميل...</div>}>
      <div className={styles.container}>
        <SectionName
          title={`نتائج البحث عن: ${searchTerm || "الكل"}`}
          subtitle={`${results.length} نتيجة`}
          className="mt-[7rem]"
        />

        <form onSubmit={handleSearch} className={styles.searchForm}>
          <div className={styles.searchInputContainer}>
            <input
              type="text"
              name="search"
              placeholder="ابحث عن عقار..."
              defaultValue={searchTerm}
              className={styles.searchInput}
              aria-label="بحث"
            />
            <button
              type="submit"
              className={styles.searchButton}
              aria-label="بحث"
            >
              <Search size={20} />
            </button>
          </div>
        </form>

        <div className={styles.filters}>
          <div className={styles.filterGroup}>
            <label htmlFor="sort">ترتيب حسب:</label>
            <select
              id="sort"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
            >
              <option value="relevance">الأكثر صلة</option>
              <option value="price-asc">السعر: من الأقل للأعلى</option>
              <option value="price-desc">السعر: من الأعلى للأقل</option>
              <option value="newest">الأحدث</option>
            </select>
          </div>

          <div className={styles.filterGroup}>
            <label htmlFor="type">نوع العقار:</label>
            <select
              id="type"
              value={propertyType}
              onChange={(e) => setPropertyType(e.target.value as PropertyType)}
            >
              <option value="all">الكل</option>
              <option value="sale">للبيع</option>
              <option value="rent">للايجار</option>
            </select>
          </div>
        </div>

        {results.length > 0 ? (
          <>
            <motion.div
              className={styles.resultsGrid}
              variants={containerVariants}
              initial="hidden"
              animate="show"
            >
              <AnimatePresence>
                {paginatedResults.map((property, index) => (
                  <motion.div key={property.id} variants={itemVariants} layout>
                    <RealEstateCard
                      property={property}
                      index={index % 10} // Reuse animation patterns
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>

            {totalPages > 1 && (
              <div className={styles.pagination}>
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                >
                  السابق
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
                      className={currentPage === pageNum ? styles.active : ""}
                      onClick={() => setCurrentPage(pageNum)}
                    >
                      {pageNum}
                    </button>
                  );
                })}

                <button
                  onClick={() =>
                    setCurrentPage((p) => Math.min(totalPages, p + 1))
                  }
                  disabled={currentPage === totalPages}
                >
                  التالي
                </button>
              </div>
            )}
          </>
        ) : (
          <div className={styles.noResults}>
            <div className={styles.icon}>
              <Search size={48} />
            </div>
            <h2>لا توجد نتائج</h2>
            <p>عذراً، لم نتمكن من العثور على أي عقارات تطابق بحثك.</p>
            <button
              className={styles.searchAgain}
              onClick={() => router.push("/")}
            >
              <Home size={18} />
              العودة للرئيسية
            </button>
          </div>
        )}
      </div>
    </Suspense>
  );
}
