import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import {
  PropertyType,
  SearchResultsFilterParams,
  SortOption,
} from "@/types/searchResults";
import { useDebounce } from "@/hooks/useDebounce";

import styles from "@/sass/pages/search/index.module.scss";

export default function Filters({
  searchTerm,
  filterParams,
  setFilterParams,
}: SearchResultsFilterParams) {
  const router = useRouter();
  const [searchInput, setSearchInput] = useState(searchTerm);
  
  // Debounce search input with 500ms delay
  const debouncedSearchInput = useDebounce(searchInput, 800);

  // Effect to navigate when debounced value changes
  useEffect(() => {
    if (debouncedSearchInput !== searchTerm && debouncedSearchInput.trim()) {
      router.push(`/search?q=${encodeURIComponent(debouncedSearchInput)}`);
    }
  }, [debouncedSearchInput, router, searchTerm]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const searchQuery = formData.get("search") as string;
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <>
      <form onSubmit={handleSearch} className={styles.searchForm}>
        <div className={styles.searchInputContainer}>
          <input
            type="text"
            name="search"
            placeholder="ابحث عن عقار..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
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

      <form className={styles.filters}>
        <div className={styles.filterGroup}>
          <label htmlFor="sort">ترتيب حسب:</label>
          <select
            id="sort"
            value={filterParams.sort}
            onChange={(e) => {
              setFilterParams({
                ...filterParams,
                sort: e.target.value as SortOption,
              });
            }}
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
            value={filterParams.type}
            onChange={(e) => {
              setFilterParams({
                ...filterParams,
                type: e.target.value as PropertyType,
              });
            }}
          >
            <option value="">الكل</option>
            <option value="sale">للبيع</option>
            <option value="rent">للايجار</option>
          </select>
        </div>
      </form>
    </>
  );
}
