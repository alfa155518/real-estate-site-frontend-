import { useEffect, useState } from "react";
import { PropertyType, SortOption } from "@/types/searchResults";
import useRealEstateStore from "@/store/RealestateStore";

export default function useSearchResults(query?: string) {
  const { handleFilters, properties } = useRealEstateStore();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterParams, setFilterParams] = useState<{
    type: PropertyType;
    sort: SortOption;
  }>({
    type: "",
    sort: "relevance",
  });
  const [filteredProperties, setFilteredProperties] = useState(properties);

  // Fetch search results from backend
  useEffect(() => {
    setSearchTerm(query || "");
    const fetchResults = async () => {
      await handleFilters({
        search: query || "",
      });
    };

    fetchResults();
  }, [handleFilters, query]);

  // Apply client-side filters (type and sort only, search is handled by backend)
  useEffect(() => {
    let results = [...properties];

    // Apply property type filter if set
    if (filterParams.type) {
      results = results.filter(
        (property) =>
          property.type.toLowerCase() === filterParams.type.toLowerCase()
      );
    }

    // Apply sorting
    if (filterParams.sort && filterParams.sort !== "relevance") {
      const getNumericPrice = (price: string | number): number => {
        if (typeof price === "number") return price;
        const normalized = price
          .replace(/[٠-٩]/g, (d) => "٠١٢٣٤٥٦٧٨٩".indexOf(d).toString())
          .replace(/[۰-۹]/g, (d) => "۰۱۲۳۴۵۶۷۸۹".indexOf(d).toString())
          .replace(/[^\d.-]/g, "");
        return parseFloat(normalized) || 0;
      };

      results.sort((a, b) => {
        switch (filterParams.sort) {
          case "price-asc":
            return getNumericPrice(a.price) - getNumericPrice(b.price);
          case "price-desc":
            return getNumericPrice(b.price) - getNumericPrice(a.price);
          case "newest":
            return (
              new Date(b.created_at).getTime() -
              new Date(a.created_at).getTime()
            );
          default:
            return 0;
        }
      });
    }

    setFilteredProperties(results);
  }, [properties, filterParams.type, filterParams.sort]);

  return {
    searchTerm,
    filterParams,
    filteredProperties,
    setFilterParams,
  };
}
