"use client";

import {
  getReviews,
  getReviewsByProperty,
  postReview,
  reviewLike,
} from "@/action/reviews";
import {
  GetReviewsResponse,
  ReviewFormData,
  ReviewLikeResponse,
  ReviewStore,
} from "@/types/reviews";
import { toast } from "react-hot-toast";
import { create } from "zustand";

// ---------- Store ----------
const useReviewStore = create<ReviewStore>((set, get) => ({
  reviews: [],
  reviewsByProperty: [],
  reviewsByPropertyCount: 1,
  currentPage: 1,
  hasMore: false,
  totalReviews: 0,
  isLoading: false,

  // Get reviews
  handleGetReviews: async (page = 1) => {
    try {
      set({ isLoading: true });
      const response: GetReviewsResponse = await getReviews(page);

      if (response.status === "error") {
        toast.error(response.message);
        return null;
      }

      set((state) => ({
        reviews:
          page === 1
            ? response.reviews
            : [...state.reviews, ...response.reviews],
        currentPage: page,
        hasMore: response.has_more,
        totalReviews: response.total_reviews,
      }));

      return response;
    } catch {
      toast.error("حدث خطأ في السيرفر");
      return null;
    } finally {
      set({ isLoading: false });
    }
  },

  // Get reviews by property
  handleGetReviewsByProperty: async (propertyId: number) => {
    const state = get();
    try {
      set({ isLoading: true });
      const response: GetReviewsResponse = await getReviewsByProperty(
        propertyId,
        state.currentPage
      );

      if (response.status === "error") {
        toast.error(response.message);
        return null;
      }

      set(() => ({
        reviewsByProperty: response.reviews,
      }));

      return response;
    } catch {
      toast.error("حدث خطأ في السيرفر");
      return null;
    } finally {
      set({ isLoading: false });
    }
  },

  // Load more reviews
  loadMoreReviews: async () => {
    const state = get();
    if (state.hasMore && !state.isLoading) {
      return state.handleGetReviews(state.currentPage + 1);
    }
    return null;
  },

  // Post review
  handlePostReview: async (reviewData: ReviewFormData, propertyId: number) => {
    const state = get();
    set({ isLoading: true });
    try {
      const response: ReviewLikeResponse = await postReview(
        reviewData,
        state.currentPage,
        propertyId
      );

      if (response.status === "success") {
        toast.success(response.message);
        // Refresh the reviews list in general and property-specific
        await state.handleGetReviewsByProperty(propertyId);
        await state.handleGetReviews(1);
      } else if (response.status === "error") {
        toast.error(response.message);
      }
      return response;
    } catch {
      toast.error("حدث خطأ في السيرفر");
      return null;
    } finally {
      set({ isLoading: false });
    }
  },

  // Handle review like
  handleReviewLike: async (reviewId, token, propertyId) => {
    try {
      set({ isLoading: true });
      const state = get();
      const response: ReviewLikeResponse = await reviewLike(
        Number(reviewId),
        token,
        state.currentPage,
        propertyId
      );
      if (response.status === "success") {
        toast.success(response.message);
        // Update the specific review in both reviews and reviewsByProperty
        set((state) => ({
          reviews: state.reviews.map((review) =>
            review.id === reviewId
              ? {
                  ...review,
                  likes_count: response.review.likes.length,
                  likes: response.review.likes,
                }
              : review
          ),
          reviewsByProperty: state.reviewsByProperty.map((review) =>
            review.id === reviewId
              ? {
                  ...review,
                  likes_count: response.review.likes.length,
                  likes: response.review.likes,
                }
              : review
          ),
        }));
        return response;
      } else {
        toast.error(response.message);
        return null;
      }
    } catch {
      toast.error("حدث خطأ في السيرفر");
      return null;
    } finally {
      set({ isLoading: false });
    }
  },
}));

export default useReviewStore;
