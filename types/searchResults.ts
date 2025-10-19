export type SortOption = "relevance" | "price-asc" | "price-desc" | "newest";
export type PropertyType = "" | "sale" | "rent";

export interface SearchResultsFilterParams {
    searchTerm: string;
    filterParams: { type: PropertyType; sort: SortOption };
    setFilterParams: (params: { type: PropertyType; sort: SortOption }) => void;
}