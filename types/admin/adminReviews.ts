import { JSX } from "react";
import { Review } from "../reviews";


export interface AdminReviewStore {
    reviews: Review[];
    isLoading: boolean;
    loadingIds: number[];
    handleGetReviews: (page?: number) => Promise<void>;
    currentPage: number;
    hasMore: boolean;
    totalReviews: number;
    totalLikesCount: number;
    handleDeleteReview: (
        reviewId: number,
        page: number,
        propertyId: number
    ) => Promise<void>;
    loadMoreReviews: () => Promise<void>;
}


export interface PresentationalReviewsProps {
    totalReviews: number;
    totalLikesCount: number;
    hasMore: boolean;
    isLoading: boolean;
    loadMoreReviews: () => Promise<void>;
    loadingIds: number[];
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    renderStars: (rating: number) => JSX.Element[];
    filteredReviews: Review[];
    submitDelete: (id: number, propertyId: number) => Promise<void>;

}