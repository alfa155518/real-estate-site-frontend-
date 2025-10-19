"use client";

import SectionName from "@/components/common/SectionName";
import useRealEstateStore from "@/store/RealestateStore";
import Pagination from "@/components/common/Pagination";
import NoSearchResults from "./NoSearchResults";
import { SpinnerOne } from "@/components/ui/loader";
import SearchResultsList from "./SearchResultsList";
import Filters from "./Filters";
import useSearchResults from "@/hooks/useSearchResults";
import styles from "@/sass/pages/search/index.module.scss";

export default function SearchResults({ params }: { params: { q: string } }) {
  //  Properties Store
  const { isLoading, meta, handlePageChange } = useRealEstateStore();

  //  search results custom hook
  const { searchTerm, filterParams, filteredProperties, setFilterParams } =
    useSearchResults(params.q);

  if (isLoading) {
    return (
      <div className={styles.container}>
        <SpinnerOne text="جاري تحميل العقارات..." />
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <SectionName
        title={`نتائج البحث عن: ${searchTerm || "الكل"}`}
        subtitle={`${filteredProperties.length} نتيجة`}
        className="mt-[7rem]"
      />
      {/* Filters */}
      <Filters
        searchTerm={searchTerm}
        filterParams={filterParams}
        setFilterParams={setFilterParams}
      />
      {filteredProperties.length > 0 ? (
        <>
          <SearchResultsList filteredProperties={filteredProperties} />
          {/* RealEstate Pagination */}
          <Pagination meta={meta} onPageChange={handlePageChange} />
        </>
      ) : (
        <NoSearchResults />
      )}
    </div>
  );
}
