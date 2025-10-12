import { RealEstateFilterParams, RealEstateList } from "./real-estate";


interface PaginationMeta {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    from: number;
    to: number;
}

interface RealEstateState {
    properties: RealEstateList;
    meta: PaginationMeta;
    filters: Partial<RealEstateFilterParams>;
    isLoading: boolean;
    featuredProperties: RealEstateList;
}

export interface RealEstateFilterResponse {
    status: string;
    message: string;
    data: {
        properties: RealEstateList;
        pagination: PaginationMeta;
    };
}

interface RealEstateActions {
    handleInitProperties: () => Promise<void>;
    handlePageChange: (page: number) => Promise<void>;
    handleFilters: (filters: Partial<RealEstateFilterParams>) => Promise<RealEstateFilterResponse>;
    handleResetFilters: () => Promise<void>;
    handleFeaturedProperties: () => Promise<void>;
}

export type RealEstateStore = RealEstateState & RealEstateActions;